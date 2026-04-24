import { z } from "zod";

export const FounderInputSchema = z.object({
  startupName: z.string().min(1, "Startup name is required"),
  country: z.string().min(1, "Country is required"),
  sector: z.string().min(1, "Sector is required"),
  stage: z.string().min(1, "Stage is required"),
  oneLinePitch: z.string().min(1, "One-line pitch is required"),
  problem: z.string().min(1, "Problem is required"),
  solution: z.string().min(1, "Solution is required"),
  targetCustomer: z.string().min(1, "Target customer is required"),
  businessModel: z.string().optional(),
  traction: z.string().optional(),
  revenue: z.string().optional(),
  fundingAsk: z.string().optional(),
  useOfFunds: z.string().optional(),
  pitchText: z.string().min(20, "Pitch text must be at least 20 characters"),
});

export type FounderInput = z.infer<typeof FounderInputSchema>;
