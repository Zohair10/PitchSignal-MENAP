import { FounderInput } from "./founderInput.schema";
import { IntakeOutput, StoryReviewOutput, MarketTractionOutput, ObjectionsOutput } from "./chainOutputs.schema";
import { EvaluationReport } from "./evaluationReport.schema";
import { SectorKnowledge } from "../data/sectorKnowledgePack";

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
  detectedSector?: string;
  sectorKnowledge?: SectorKnowledge;
  intakeProfile?: IntakeOutput;
  storyReview?: StoryReviewOutput;
  marketTractionReview?: MarketTractionOutput;
  investorObjections?: ObjectionsOutput;
  finalReport?: EvaluationReport;
}
