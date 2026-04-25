import { ReviewState } from "../schemas/reviewState.schema";
import { MarketTractionOutputSchema } from "../schemas/chainOutputs.schema";
import { callStructuredModel } from "../services/structuredOutput";

export async function runMarketTractionChain(
  state: ReviewState
): Promise<ReviewState> {
  const result = await callStructuredModel(
    `You are a Pakistan/MENAP startup evaluator specializing in market fit and traction analysis. You MUST respond with ONLY valid JSON, no markdown, no explanation. Return a JSON object with these exact fields: regionalMarketFit (number 0-100), tractionCredibility (number 0-100), marketObservations (array of 3-5 strings), tractionObservations (array of 3-5 strings), regionalRedFlags (array of 2-4 strings).`,
    `Evaluate this startup's regional market fit and traction credibility for Pakistan/MENAP.

Startup Profile:
${JSON.stringify(state.intakeProfile, null, 2)}

Pitch Text:
${state.pitchText}

Regional Knowledge Pack:
${JSON.stringify(state.menapKnowledgePack, null, 2)}

Evaluation Rules:
- Waitlist-only traction: penalty -15
- No distribution strategy: penalty -15
- Has pilot users: bonus +10
- Has revenue: bonus +15
${state.sectorKnowledge ? `
Sector-Specific Criteria (${state.detectedSector}):
Focus: ${state.sectorKnowledge.evaluationLens}
Sector Red Flags: ${state.sectorKnowledge.redFlags.join("; ")}
Investor Expectations: ${state.sectorKnowledge.investorExpectations.join("; ")}
MENAP Nuances: ${state.sectorKnowledge.regionalNuances.join("; ")}
Bonus Signals: ${state.sectorKnowledge.bonusSignals.join("; ")}
` : ""}
Be strict about waitlist-only traction, missing distribution strategy, lack of willingness-to-pay evidence, and sector-specific gaps.

Return ONLY the JSON object.`,
    MarketTractionOutputSchema
  );

  return {
    ...state,
    marketTractionReview: result,
  };
}
