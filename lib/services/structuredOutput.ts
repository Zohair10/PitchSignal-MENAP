import { getModel } from "./model";
import { z } from "zod";

export async function callStructuredModel<T extends z.ZodType>(
  systemPrompt: string,
  userPrompt: string,
  schema: T
): Promise<z.infer<T>> {
  const model = getModel();

  const response = await model.invoke([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ]);

  const text = response.content as string;

  // Extract JSON from the response (handle markdown code blocks)
  let jsonStr = text;
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  // Try to find JSON object in the text
  if (!jsonStr.startsWith("{")) {
    const braceMatch = text.match(/\{[\s\S]*\}/);
    if (braceMatch) {
      jsonStr = braceMatch[0];
    }
  }

  const parsed = JSON.parse(jsonStr);
  return schema.parse(parsed);
}
