import { z } from "zod";

export const EvaluationReportSchema = z.object({
  startupName: z.string(),
  sectorCategory: z.string(),
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
        severity: z.enum(["critical", "moderate", "watch"]),
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

  aiInsights: z.object({
    startupSummary: z.string(),
    founderProfile: z.string(),
    keyClaims: z.array(z.string()),
    sectorCategory: z.string(),
    stageAssessment: z.string(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    marketObservations: z.array(z.string()),
    tractionObservations: z.array(z.string()),
    regionalRedFlags: z.array(z.string()),
    missingFields: z.array(z.string()),
    extractedFields: z.record(z.string(), z.string()).optional(),
  }).optional(),
});

export type EvaluationReport = z.infer<typeof EvaluationReportSchema>;
