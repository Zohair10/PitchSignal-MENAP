import { NextResponse } from "next/server";
import { extractPdfText } from "../../../lib/services/extractPdfText";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are supported" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const text = await extractPdfText(buffer);

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: "Could not extract meaningful text from PDF. Please paste your pitch text." },
        { status: 422 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("PDF extraction failed:", error);
    return NextResponse.json(
      { error: "Could not extract PDF text. Please paste your pitch text." },
      { status: 500 }
    );
  }
}
