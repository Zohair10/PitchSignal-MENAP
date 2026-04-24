import { EvaluationReport } from "../schemas/evaluationReport.schema";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

export function encodeReport(report: EvaluationReport): string {
  const json = JSON.stringify(report);
  return compressToEncodedURIComponent(json);
}

export function decodeReport(data: string): EvaluationReport | null {
  try {
    const json = decompressFromEncodedURIComponent(data);
    if (!json) return null;
    return JSON.parse(json);
  } catch {
    return null;
  }
}
