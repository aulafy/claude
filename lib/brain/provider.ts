import type { RetrievalHit } from "./retrieval.ts";

export type ModelMessage = { role: "system" | "user"; content: string };
export type ModelResponse = { text: string; model: string; provider: string };

export interface ModelProvider {
  readonly name: string;
  generate(messages: readonly ModelMessage[]): Promise<ModelResponse>;
}

export function buildGroundedMessages(question: string, hits: readonly RetrievalHit[]): ModelMessage[] {
  const context = hits.map((hit, index) => `[${index + 1}] ${hit.title}\n${hit.chunk.content}\nSource: ${hit.provenance.sourcePath}`).join("\n\n");
  return [
    { role: "system", content: "You are Aulafy Tutor. Answer only from the supplied canonical Aulafy context. If it is insufficient, say so. Never invent citations. Keep the answer concise and educational." },
    { role: "user", content: `Question: ${question}\n\nCanonical context:\n${context}` },
  ];
}
