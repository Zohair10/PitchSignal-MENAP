import { FounderInput } from "./founderInput.schema";
import { IntakeOutput, StoryReviewOutput, MarketTractionOutput, ObjectionsOutput } from "./chainOutputs.schema";
import { EvaluationReport } from "./evaluationReport.schema";

export interface MENAPContext {
  ecosystemReality: string[];
  marketStats: string[];
  investorExpectations: string[];
  commonRedFlags: string[];
  investorExamples: string[];
}

export interface ReviewState {
  founderInput: FounderInput;
  pitchText: string;
  menapKnowledgePack?: MENAPContext;
  intakeProfile?: IntakeOutput;
  storyReview?: StoryReviewOutput;
  marketTractionReview?: MarketTractionOutput;
  investorObjections?: ObjectionsOutput;
  finalReport?: EvaluationReport;
}
