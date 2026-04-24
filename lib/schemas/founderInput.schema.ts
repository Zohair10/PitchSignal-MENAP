import { z } from "zod";

export const FounderInputSchema = z.object({
  startupName: z.string().min(1, "Startup name is required"),
  country: z.string().min(1, "Country is required"),
  pitchText: z.string().min(20, "Pitch text must be at least 20 characters"),
  // Fields extracted by AI intake agent from pitch text
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
});

export type FounderInput = z.infer<typeof FounderInputSchema>;
