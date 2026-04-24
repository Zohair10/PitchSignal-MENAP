import { PDFParse } from "pdf-parse";

export async function extractPdfText(
  buffer: Buffer
): Promise<string> {
  const pdf = new PDFParse(buffer);
  const result = await pdf.getText();
  return typeof result === "string" ? result : JSON.stringify(result);
}
