import { ReviewState } from "../schemas/reviewState.schema";
import { StoryReviewOutputSchema } from "../schemas/chainOutputs.schema";
import { callStructuredModel } from "../services/structuredOutput";

export async function runStoryReviewChain(
  state: ReviewState
): Promise<ReviewState> {
  const result = await callStructuredModel(
    `You are a Pakistan/MENAP startup pitch reviewer evaluating story clarity. You MUST respond with ONLY valid JSON, no markdown, no explanation. Return a JSON object with these exact fields: clarityScore (number 0-100), strengths (array of 2-4 strings), weaknesses (array of 2-4 strings), improvedOneLiner (string), narrativeAssessment (string).`,
    `Evaluate the startup's story and clarity.

Startup Profile:
${JSON.stringify(state.intakeProfile, null, 2)}

Pitch Text:
${state.pitchText}

Consider:
- Is the problem statement clear and specific to the target market?
- Does the solution directly address the stated problem?
- Is the value proposition easy to understand?
- Does the pitch flow logically from problem to solution to market?
- Is the one-line pitch compelling and specific?

Be critical but fair. Score 70+ means clear and well-structured. Below 50 means confusing, generic, or inconsistent.

${state.sectorKnowledge ? `Sector Context (${state.detectedSector}):
Evaluation focus: ${state.sectorKnowledge.evaluationLens}
Key metrics to assess clarity on: ${state.sectorKnowledge.keyMetrics.join(", ")}
` : ""}
Return ONLY the JSON object.`,
    StoryReviewOutputSchema
  );

  return {
    ...state,
    storyReview: result,
  };
}
