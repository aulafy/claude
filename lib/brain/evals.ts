import type { RetrievalResult } from "./retrieval.ts";
import type { TutorAnswer } from "./tutor.ts";

export type RetrievalEvalCase = { id: string; query: string; expectedLessonId: string };
export type RetrievalEvalResult = { caseId: string; passed: boolean; expectedLessonId: string; retrievedLessonIds: string[]; reciprocalRank: number };

export const retrievalEvalCases: readonly RetrievalEvalCase[] = [
  { id: "ollama-context", query: "How does an Ollama context window work?", expectedLessonId: "ollama-context-window" },
  { id: "first-local-model", query: "Run a first local model with Ollama", expectedLessonId: "ollama-first-model" },
  { id: "llm-basics", query: "What does a language model predict?", expectedLessonId: "llm-basics" },
];

export function evaluateRetrieval(retrieve: (query: string, topK?: number) => RetrievalResult, cases = retrievalEvalCases) {
  const results = cases.map((testCase) => {
    const result = retrieve(testCase.query, 5);
    const rank = result.lessons.indexOf(testCase.expectedLessonId);
    return { caseId: testCase.id, passed: rank >= 0, expectedLessonId: testCase.expectedLessonId, retrievedLessonIds: result.lessons, reciprocalRank: rank >= 0 ? 1 / (rank + 1) : 0 };
  });
  const passed = results.filter((result) => result.passed).length;
  return { results, passed, total: results.length, recallAt5: results.length ? passed / results.length : 0, meanReciprocalRank: results.length ? results.reduce((sum, result) => sum + result.reciprocalRank, 0) / results.length : 0 };
}

export function evaluateTutorGrounding(answer: TutorAnswer, retrieval: RetrievalResult) {
  const citationsMatch = answer.citations.length === retrieval.provenance.length && answer.citations.every((citation) => retrieval.provenance.some((source) => source.contentHash === citation.contentHash && source.sourcePath === citation.sourcePath));
  const abstentionIsHonest = answer.status !== "answered" || Boolean(answer.answer?.trim());
  return { passed: citationsMatch && abstentionIsHonest, citationsMatch, abstentionIsHonest };
}
