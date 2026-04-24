import { z } from "zod";

// Step 1: Intake output
export const IntakeOutputSchema = z.object({
  startupSummary: z.string(),
  founderProfile: z.string(),
  keyClaims: z.array(z.string()),
  sectorCategory: z.string(),
  stageAssessment: z.string(),
  extractedFields: z.object({
    sector: z.string().optional(),
    stage: z.string().optional(),
    oneLinePitch: z.string().optional(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    targetCustomer: z.string().optional(),
    businessModel: z.string().optional(),
    traction: z.string().optional(),
    revenue: z.string().optional(),
    fundingAsk: z.string().optional(),
    useOfFunds: z.string().optional(),
  }),
  missingFields: z.array(z.string()),
});

export type IntakeOutput = z.infer<typeof IntakeOutputSchema>;

// Step 2: Story review output
export const StoryReviewOutputSchema = z.object({
  clarityScore: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  improvedOneLiner: z.string(),
  narrativeAssessment: z.string(),
});

export type StoryReviewOutput = z.infer<typeof StoryReviewOutputSchema>;

// Step 3: Market & Traction output
export const MarketTractionOutputSchema = z.object({
  regionalMarketFit: z.number().min(0).max(100),
  tractionCredibility: z.number().min(0).max(100),
  marketObservations: z.array(z.string()),
  tractionObservations: z.array(z.string()),
  regionalRedFlags: z.array(z.string()),
});

export type MarketTractionOutput = z.infer<typeof MarketTractionOutputSchema>;

// Step 4: Objections output
export const ObjectionsOutputSchema = z.object({
  topInvestorObjections: z
    .array(
      z.object({
        objection: z.string(),
        whyItMatters: z.string(),
        howToFix: z.string(),
      })
    )
    .length(5),
});

export type ObjectionsOutput = z.infer<typeof ObjectionsOutputSchema>;
