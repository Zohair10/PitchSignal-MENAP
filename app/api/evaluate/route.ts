import { NextResponse } from "next/server";
import { FounderInputSchema } from "../../../lib/schemas/founderInput.schema";
import { PAYBRIDGE_FALLBACK_REPORT } from "../../../lib/data/fallbackReport";
import { evaluateStartup } from "../../../lib/services/evaluateStartup";

export async function POST(req: Request) {
  let startupName = "Unknown Startup";
  try {
    const body = await req.json();
    startupName = body?.startupName || startupName;

    // Validate input
    const parsed = FounderInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Run the evaluation pipeline
    const report = await evaluateStartup(parsed.data);

    return NextResponse.json(report);
  } catch (error) {
    console.error("Evaluation failed:", error instanceof Error ? error.message : error);
    console.error("Stack:", error instanceof Error ? error.stack : "No stack");
    // Return fallback report with the submitted startup name
    return NextResponse.json({
      ...PAYBRIDGE_FALLBACK_REPORT,
      startupName,
      verdict: "Analysis incomplete — showing sample report",
    });
  }
}
