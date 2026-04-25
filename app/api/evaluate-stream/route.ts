import { NextRequest } from "next/server";
import { FounderInputSchema } from "@/lib/schemas/founderInput.schema";
import { ReviewState } from "@/lib/schemas/reviewState.schema";
import { regionalKnowledgePack, RegionalKnowledgeKey } from "@/lib/data/regionalKnowledgePack";
import { runIntakeChain } from "@/lib/chains/intakeChain";
import { runStoryReviewChain } from "@/lib/chains/storyReviewChain";
import { runMarketTractionChain } from "@/lib/chains/marketTractionChain";
import { runObjectionsChain } from "@/lib/chains/objectionsChain";
import { runFinalMemoChain } from "@/lib/chains/finalMemoChain";
import { PAYBRIDGE_FALLBACK_REPORT } from "@/lib/data/fallbackReport";
import { getSectorKnowledge } from "@/lib/data/sectorKnowledgePack";

interface StepEvent {
  step: number;
  message: string;
  agent: string;
  timestamp: string;
  insight?: string;
}

const STEPS: Omit<StepEvent, "timestamp" | "insight">[] = [
  { step: 0, message: "Reading founder input...", agent: "Intake Agent" },
  { step: 1, message: "Extracting startup profile and key details...", agent: "Intake Agent" },
  { step: 2, message: "Applying MENAP knowledge pack...", agent: "Regional Analyst" },
  { step: 3, message: "Reviewing story and traction...", agent: "Story & Market Reviewer" },
  { step: 4, message: "Generating investor objections...", agent: "Investor Simulator" },
  { step: 5, message: "Building shareable report...", agent: "Memo Writer" },
];

function getKnowledgePack(country: string): ReviewState["menapKnowledgePack"] {
  const key = country.toLowerCase() as RegionalKnowledgeKey;
  return regionalKnowledgePack[key] || regionalKnowledgePack.pakistan;
}

function sseEvent(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = FounderInputSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const founderInput = parsed.data;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(event: string, data: unknown) {
        controller.enqueue(encoder.encode(sseEvent(event, data)));
      }

      function stepEvent(stepIndex: number, insight?: string): StepEvent {
        const s = STEPS[stepIndex];
        return { ...s, timestamp: new Date().toISOString(), insight };
      }

      try {
        let state: ReviewState = {
          founderInput,
          pitchText: founderInput.pitchText,
        };

        // Step 0-1: Intake
        send("step", stepEvent(0));
        send("step", stepEvent(1));
        try {
          state = await runIntakeChain(state);
        } catch (err) {
          console.error("Intake chain failed:", err);
          // If intake fails, we can't continue — throw to fallback
          throw new Error(`Intake failed: ${err instanceof Error ? err.message : "unknown error"}`);
        }

        // Inject sector knowledge
        const detectedSector = state.intakeProfile?.sectorCategory || "Other";
        state.detectedSector = detectedSector;
        state.sectorKnowledge = getSectorKnowledge(detectedSector);

        // Send intake insight
        const intake = state.intakeProfile;
        if (intake) {
          const fieldCount = Object.values(intake.extractedFields).filter(Boolean).length;
          const missingCount = intake.missingFields.length;
          send("step", stepEvent(1, `Detected: ${detectedSector} startup. Loaded ${detectedSector}-specific evaluation criteria. Extracted ${fieldCount} fields.${missingCount > 0 ? ` ${missingCount} missing.` : ""}`));
        }

        // Step 2: Knowledge pack
        state.menapKnowledgePack = getKnowledgePack(founderInput.country);
        send("step", stepEvent(2));

        // Step 3: Story + Market review
        send("step", stepEvent(3));
        try {
          state = await runStoryReviewChain(state);
        } catch (err) {
          console.error("Story review chain failed:", err);
          // Continue with defaults if story review fails
        }

        // Send story insight
        if (state.storyReview) {
          send("step", stepEvent(3, `Clarity: ${state.storyReview.clarityScore}/100. ${state.storyReview.strengths.length} strengths, ${state.storyReview.weaknesses.length} weaknesses.`));
        }

        try {
          state = await runMarketTractionChain(state);
        } catch (err) {
          console.error("Market/traction chain failed:", err);
          // Continue with defaults
        }

        // Send market insight
        if (state.marketTractionReview) {
          const mr = state.marketTractionReview;
          send("step", stepEvent(3, `Market fit: ${mr.regionalMarketFit}/100. ${mr.regionalRedFlags.length} regional red flags.`));
        }

        // Step 4: Objections
        send("step", stepEvent(4));
        try {
          state = await runObjectionsChain(state);
        } catch (err) {
          console.error("Objections chain failed:", err);
          // Continue — final memo will generate objections
        }

        // Send objections insight
        if (state.investorObjections) {
          send("step", stepEvent(4, `Generated ${state.investorObjections.topInvestorObjections.length} investor objections.`));
        }

        // Step 5: Final memo
        send("step", stepEvent(5));
        state = await runFinalMemoChain(state);

        if (!state.finalReport) {
          throw new Error("Failed to generate evaluation report");
        }

        send("step", stepEvent(5, `Report complete. Score: ${state.finalReport.overallScore}/100.`));
        send("result", { report: state.finalReport });
      } catch (error) {
        console.error("Pipeline error:", error);
        send("step", {
          step: -1,
          message: `Analysis error: ${error instanceof Error ? error.message : "Unknown error"}. Retrying with simpler pipeline...`,
          agent: "System",
          timestamp: new Date().toISOString(),
        });

        // Try the sync endpoint as a last resort before falling back to hardcoded
        try {
          const { evaluateStartup } = await import("@/lib/services/evaluateStartup");
          const report = await evaluateStartup(founderInput);
          send("result", { report });
        } catch (fallbackErr) {
          console.error("Sync fallback also failed:", fallbackErr);
          send("result", {
            report: {
              ...PAYBRIDGE_FALLBACK_REPORT,
              startupName: founderInput.startupName,
              verdict: "Analysis incomplete — showing sample report",
            },
          });
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
