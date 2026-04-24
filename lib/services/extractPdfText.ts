import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractPdfText(
  buffer: Buffer
): Promise<string> {
  const uint8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const doc = await getDocument({ data: uint8, useSystemFonts: true }).promise;
  const textParts: string[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => item.str || "")
      .join(" ");
    textParts.push(pageText);
  }

  return textParts.join("\n\n");
}
