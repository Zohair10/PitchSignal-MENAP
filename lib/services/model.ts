import { ChatOpenAI } from "@langchain/openai";

export function getModel() {
  return new ChatOpenAI({
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    temperature: 0.3,
    apiKey: process.env.GROQ_API_KEY,
    configuration: {
      baseURL: "https://api.groq.com/openai/v1",
    },
  });
}
