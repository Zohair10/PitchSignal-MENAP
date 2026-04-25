import { ReviewState } from "../schemas/reviewState.schema";
import { ObjectionsOutputSchema } from "../schemas/chainOutputs.schema";
import { callStructuredModel } from "../services/structuredOutput";

export async function runObjectionsChain(
  state: ReviewState
): Promise<ReviewState> {
  const result = await callStructuredModel(
    `You are a Pakistan/MENAP investor who reviews early-stage startups. You MUST respond with ONLY valid JSON, no markdown, no explanation. Return a JSON object with field topInvestorObjections as an array of exactly 5 objects, each with: objection (string), whyItMatters (string), howToFix (string), severity (string: "critical", "moderate", or "watch").`,
    `Predict the TOP 5 objections a real Pakistan/MENAP investor would raise about this startup.

Startup Profile:
${JSON.stringify(state.intakeProfile, null, 2)}

Story Review:
${JSON.stringify(state.storyReview, null, 2)}

Market & Traction Review:
${JSON.stringify(state.marketTractionReview, null, 2)}

Regional Red Flags:
${JSON.stringify(state.marketTractionReview?.regionalRedFlags || [], null, 2)}

Pitch Text:
${state.pitchText}

Regional Knowledge Pack:
${JSON.stringify(state.menapKnowledgePack, null, 2)}
${state.sectorKnowledge ? `
Sector Context (${state.detectedSector}):
Sector concerns: ${state.sectorKnowledge.redFlags.join("; ")}
What ${state.detectedSector} investors scrutinize: ${state.sectorKnowledge.investorExpectations.join("; ")}
MENAP ${state.detectedSector} challenges: ${state.sectorKnowledge.regionalNuances.join("; ")}
` : ""}
Generate exactly 5 objections. Each must be:
1. Specific to this startup and region - NOT generic advice
2. Written from investor perspective
3. Include why it matters and how to fix
4. Ordered from most critical to least

Prioritize: Pakistan/MENAP market dynamics, traction gaps, regulatory blind spots, distribution weaknesses, willingness-to-pay proof.

Return ONLY the JSON object with topInvestorObjections array.`,
    ObjectionsOutputSchema
  );

  return {
    ...state,
    investorObjections: result,
  };
}
