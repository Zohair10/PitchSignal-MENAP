import { FounderInput } from "../schemas/founderInput.schema";
import { ReviewState } from "../schemas/reviewState.schema";
import { EvaluationReport } from "../schemas/evaluationReport.schema";
import { regionalKnowledgePack, RegionalKnowledgeKey } from "../data/regionalKnowledgePack";
import { runIntakeChain } from "../chains/intakeChain";
import { runStoryReviewChain } from "../chains/storyReviewChain";
import { runMarketTractionChain } from "../chains/marketTractionChain";
import { runObjectionsChain } from "../chains/objectionsChain";
import { runFinalMemoChain } from "../chains/finalMemoChain";

function getKnowledgePack(country: string): ReviewState["menapKnowledgePack"] {
  const key = country.toLowerCase() as RegionalKnowledgeKey;
  if (regionalKnowledgePack[key]) {
    return regionalKnowledgePack[key];
  }
  // Default to Pakistan for MENAP countries not specifically listed
  return regionalKnowledgePack.pakistan;
}

export async function evaluateStartup(
  founderInput: FounderInput
): Promise<EvaluationReport> {
  let state: ReviewState = {
    founderInput,
    pitchText: founderInput.pitchText,
  };

  // Step 1: Intake
  state = await runIntakeChain(state);

  // Step 2: Inject regional knowledge pack
  state.menapKnowledgePack = getKnowledgePack(founderInput.country);

  // Step 3: Story review
  state = await runStoryReviewChain(state);

  // Step 4: Market & traction review
  state = await runMarketTractionChain(state);

  // Step 5: Generate investor objections
  state = await runObjectionsChain(state);

  // Step 6: Final memo and report
  state = await runFinalMemoChain(state);

  if (!state.finalReport) {
    throw new Error("Failed to generate evaluation report");
  }

  return state.finalReport;
}
