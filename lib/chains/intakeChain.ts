import { ReviewState } from "../schemas/reviewState.schema";
import { IntakeOutputSchema } from "../schemas/chainOutputs.schema";
import { callStructuredModel } from "../services/structuredOutput";

export async function runIntakeChain(
  state: ReviewState
): Promise<ReviewState> {
  const result = await callStructuredModel(
    `You are a startup intake analyst for the Pakistan/MENAP region. You MUST respond with ONLY valid JSON, no markdown, no explanation.`,
    `Analyze the following startup pitch and extract a structured profile.

Startup Name: ${state.founderInput.startupName}
Country: ${state.founderInput.country}

Pitch Text:
${state.pitchText}

Extract the following from the pitch text:

1. startupSummary: A concise startup summary (2-3 sentences)
2. founderProfile: Type of founder this suggests
3. keyClaims: Factual assertions made in the pitch (not aspirations)
4. sectorCategory: Classify into EXACTLY ONE of: Fintech, SaaS, E-commerce, Healthtech, Edtech, Logistics, AgriTech, CleanTech/Energy, PropTech, AI/ML, D2C, Other. Pick the BEST fit based on the primary revenue driver.
5. stageAssessment: Whether claimed stage matches actual progress
6. extractedFields: An object containing any of these fields you can find in the pitch:
   - sector (e.g. "Fintech", "Healthtech", "SaaS")
   - stage (e.g. "Ideation", "Pre-seed", "Seed", "Series A")
   - oneLinePitch (the core value proposition in one sentence)
   - problem (what problem they are solving)
   - solution (how they solve it)
   - targetCustomer (who specifically uses/pays for this)
   - businessModel (how they make money)
   - traction (users, revenue, partnerships, growth metrics)
   - revenue (current revenue status)
   - fundingAsk (how much they are raising)
   - useOfFunds (how they plan to use the funding)
   Only include fields you can confidently extract. Omit fields that are not mentioned.
7. missingFields: Array of field names from the list above that are NOT mentioned or cannot be extracted from the pitch text. This is critical for identifying gaps.

Return ONLY a valid JSON object with ALL of these fields.`,
    IntakeOutputSchema
  );

  // Merge extracted fields into founderInput for downstream chains
  const extracted = result.extractedFields;
  const updatedFounderInput = { ...state.founderInput };
  for (const [key, value] of Object.entries(extracted)) {
    if (value && !updatedFounderInput[key as keyof typeof updatedFounderInput]) {
      (updatedFounderInput as Record<string, string | undefined>)[key] = value;
    }
  }

  return {
    ...state,
    founderInput: updatedFounderInput,
    intakeProfile: result,
  };
}
