import { z } from "zod";

export const EvaluationReportSchema = z.object({
  startupName: z.string(),
  verdict: z.string(),
  overallScore: z.number().min(0).max(100),

  scores: z.object({
    storyClarity: z.number().min(0).max(100),
    regionalMarketFit: z.number().min(0).max(100),
    tractionCredibility: z.number().min(0).max(100),
  }),

  topInvestorObjections: z
    .array(
      z.object({
        objection: z.string(),
        whyItMatters: z.string(),
        howToFix: z.string(),
      })
    )
    .length(5),

  vcMemo: z.object({
    summary: z.string(),
    whatWorks: z.array(z.string()),
    whatBreaksThePitch: z.array(z.string()),
  }),

  topThreeFixes: z
    .array(
      z.object({
        title: z.string(),
        action: z.string(),
        expectedImpact: z.string(),
      })
    )
    .length(3),

  improvedPitch: z.object({
    oneLiner: z.string(),
    elevatorPitch: z.string(),
  }),

  regionalSignalsUsed: z.array(z.string()),
});

export type EvaluationReport = z.infer<typeof EvaluationReportSchema>;
