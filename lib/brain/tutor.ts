import type { ModelProvider } from "./provider.ts";
import { buildGroundedMessages } from "./provider.ts";
import type { RetrievalResult } from "./retrieval.ts";

export type TutorAnswer = {
  status: "answered" | "abstained" | "not_configured";
  answer?: string;
  citations: RetrievalResult["provenance"];
  lessons: string[];
  provider?: string;
  model?: string;
};

export async function answerWithAulafyTutor(question: string, retrieval: RetrievalResult, provider?: ModelProvider): Promise<TutorAnswer> {
  if (!retrieval.hits.length) return { status: "abstained", citations: [], lessons: [] };
  if (!provider) return { status: "not_configured", citations: retrieval.provenance, lessons: retrieval.lessons };
  const response = await provider.generate(buildGroundedMessages(question, retrieval.hits));
  return { status: "answered", answer: response.text, provider: response.provider, model: response.model, citations: retrieval.provenance, lessons: retrieval.lessons };
}
