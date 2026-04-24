import { NextResponse } from "next/server";
import { FounderInputSchema } from "../../../lib/schemas/founderInput.schema";
import { PAYBRIDGE_FALLBACK_REPORT } from "../../../lib/data/fallbackReport";
import { evaluateStartup } from "../../../lib/services/evaluateStartup";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const parsed = FounderInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Run the evaluation pipeline
    const report = await evaluateStartup(parsed.data);

    return NextResponse.json(report);
  } catch (error) {
    console.error("Evaluation failed:", error instanceof Error ? error.message : error);
    console.error("Stack:", error instanceof Error ? error.stack : "No stack");
    // Always return the fallback report instead of an error
    return NextResponse.json(PAYBRIDGE_FALLBACK_REPORT);
  }
}
