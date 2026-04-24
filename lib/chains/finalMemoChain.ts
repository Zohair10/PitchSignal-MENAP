import { ReviewState } from "../schemas/reviewState.schema";
import { EvaluationReportSchema } from "../schemas/evaluationReport.schema";
import { callStructuredModel } from "../services/structuredOutput";

export async function runFinalMemoChain(
  state: ReviewState
): Promise<ReviewState> {
  const storyClarity = state.storyReview?.clarityScore ?? 50;
  const regionalMarketFit =
    state.marketTractionReview?.regionalMarketFit ?? 50;
  const tractionCredibility =
    state.marketTractionReview?.tractionCredibility ?? 50;
  const overallScore = Math.round(
    storyClarity * 0.3 + regionalMarketFit * 0.35 + tractionCredibility * 0.35
  );

  const result = await callStructuredModel(
    `You are a senior Pakistan/MENAP venture analyst writing a structured investment memo. You MUST respond with ONLY valid JSON, no markdown, no explanation.`,
    `Assemble the final evaluation report for ${state.founderInput.startupName}.

Startup Profile:
${JSON.stringify(state.intakeProfile, null, 2)}

Story Review:
${JSON.stringify(state.storyReview, null, 2)}

Market & Traction Review:
${JSON.stringify(state.marketTractionReview, null, 2)}

Investor Objections:
${JSON.stringify(state.investorObjections?.topInvestorObjections || [], null, 2)}

Use these EXACT scores:
- overallScore: ${overallScore}
- storyClarity: ${storyClarity}
- regionalMarketFit: ${regionalMarketFit}
- tractionCredibility: ${tractionCredibility}

Return a JSON object with these fields:
- startupName: "${state.founderInput.startupName}"
- verdict: one of "Investor-ready" / "Promising but needs sharper proof" / "Too early" / "High risk / not ready"
- overallScore: ${overallScore}
- scores: object with storyClarity, regionalMarketFit, tractionCredibility
- topInvestorObjections: array of exactly 5 objects with objection, whyItMatters, howToFix (refine the objections above)
- vcMemo: object with summary (2-3 sentences), whatWorks (array of 3 strings), whatBreaksThePitch (array of 3 strings)
- topThreeFixes: array of exactly 3 objects with title, action, expectedImpact
- improvedPitch: object with oneLiner (string) and elevatorPitch (2-sentence string)
- regionalSignalsUsed: array of 4-6 Pakistan/MENAP-specific signal strings

Return ONLY the JSON object.`,
    EvaluationReportSchema
  );

  return {
    ...state,
    finalReport: {
      ...result,
      aiInsights: {
        startupSummary: state.intakeProfile?.startupSummary ?? "",
        founderProfile: state.intakeProfile?.founderProfile ?? "",
        keyClaims: state.intakeProfile?.keyClaims ?? [],
        sectorCategory: state.intakeProfile?.sectorCategory ?? "",
        stageAssessment: state.intakeProfile?.stageAssessment ?? "",
        strengths: state.storyReview?.strengths ?? [],
        weaknesses: state.storyReview?.weaknesses ?? [],
        marketObservations: state.marketTractionReview?.marketObservations ?? [],
        tractionObservations: state.marketTractionReview?.tractionObservations ?? [],
        regionalRedFlags: state.marketTractionReview?.regionalRedFlags ?? [],
        missingFields: state.intakeProfile?.missingFields ?? [],
        extractedFields: state.intakeProfile?.extractedFields
          ? Object.fromEntries(
              Object.entries(state.intakeProfile.extractedFields).filter(([, v]) => v)
            )
          : undefined,
      },
    },
  };
}
