import { NextResponse } from "next/server";

const VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

export async function POST(req: Request) {
  try {
    const { images } = await req.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    // Process up to 10 pages in parallel (batches of 3 to avoid rate limits)
    const pagesToProcess = images.slice(0, 10);
    const textParts: string[] = [];

    for (let i = 0; i < pagesToProcess.length; i += 3) {
      const batch = pagesToProcess.slice(i, i + 3);
      const results = await Promise.all(
        batch.map((img: string) => extractTextFromImage(img))
      );
      for (const text of results) {
        if (text) textParts.push(text);
      }
    }

    const fullText = textParts.join("\n\n");
    console.log(`OCR extracted ${fullText.length} chars from ${pagesToProcess.length} pages`);

    if (fullText.trim().length < 20) {
      return NextResponse.json(
        { error: "Could not extract meaningful text from PDF. Please paste your pitch text." },
        { status: 422 }
      );
    }

    return NextResponse.json({ text: fullText });
  } catch (error) {
    console.error("OCR extraction failed:", error);
    return NextResponse.json(
      { error: "OCR extraction failed. Please paste your pitch text." },
      { status: 500 }
    );
  }
}

async function extractTextFromImage(base64Image: string): Promise<string> {
  try {
    const imageUrl = base64Image.startsWith("data:")
      ? base64Image
      : `data:image/jpeg;base64,${base64Image}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract ALL text from this pitch deck slide. Return ONLY the text content, preserving the original structure with headings, bullet points, and numbers. Do not add any commentary or summary.",
              },
              {
                type: "image_url",
                image_url: { url: imageUrl },
              },
            ],
          },
        ],
        max_tokens: 4096,
        temperature: 0,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`Groq vision API error (${response.status}):`, err);
      return "";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (err) {
    console.error("Single page OCR failed:", err);
    return "";
  }
}
