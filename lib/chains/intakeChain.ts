import { ReviewState } from "../schemas/reviewState.schema";
import { IntakeOutputSchema } from "../schemas/chainOutputs.schema";
import { callStructuredModel } from "../services/structuredOutput";

export async function runIntakeChain(
  state: ReviewState
): Promise<ReviewState> {
  const result = await callStructuredModel(
    `You are a startup intake analyst for the Pakistan/MENAP region. You MUST respond with ONLY valid JSON, no markdown, no explanation. Return a JSON object with these exact fields: startupSummary (string), founderProfile (string), keyClaims (array of strings), sectorCategory (string), stageAssessment (string).`,
    `Analyze the following founder input and pitch text. Extract a structured startup profile.

Founder Input:
- Startup: ${state.founderInput.startupName}
- Country: ${state.founderInput.country}
- Sector: ${state.founderInput.sector}
- Stage: ${state.founderInput.stage}
- One-line pitch: ${state.founderInput.oneLinePitch}
- Problem: ${state.founderInput.problem}
- Solution: ${state.founderInput.solution}
- Target customer: ${state.founderInput.targetCustomer}
- Business model: ${state.founderInput.businessModel || "Not specified"}
- Traction: ${state.founderInput.traction || "Not specified"}
- Revenue: ${state.founderInput.revenue || "Not specified"}
- Funding ask: ${state.founderInput.fundingAsk || "Not specified"}
- Use of funds: ${state.founderInput.useOfFunds || "Not specified"}

Pitch Text:
${state.pitchText}

Provide:
1. startupSummary: A concise startup summary (2-3 sentences)
2. founderProfile: Type of founder this suggests
3. keyClaims: Factual assertions made in the pitch (not aspirations)
4. sectorCategory: Narrowed sector classification
5. stageAssessment: Whether claimed stage matches actual progress

Return ONLY the JSON object.`,
    IntakeOutputSchema
  );

  return {
    ...state,
    intakeProfile: result,
  };
}
