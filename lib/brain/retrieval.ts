import type { IngestionSnapshot, KnowledgeChunk } from "./ingestion.ts";
import type { CanonicalContentDocument } from "../content/types.ts";

export type RetrievalHit = {
  chunk: KnowledgeChunk;
  score: number;
  lessonId: string;
  title: string;
  concepts: string[];
  provenance: { sourceType: "aulafy_canonical"; sourcePath: string; contentHash: string };
};

export type RetrievalResult = {
  query: string;
  hits: RetrievalHit[];
  lessons: string[];
  concepts: string[];
  provenance: RetrievalHit["provenance"][];
};

const stopWords = new Set(["a", "al", "con", "de", "el", "en", "la", "las", "los", "para", "por", "que", "un", "una", "y", "and", "how", "is", "the", "to", "with"]);
function terms(value: string) {
  return value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[^a-z0-9-]+/).filter((term) => term.length > 1 && !stopWords.has(term));
}

export function createRetriever(snapshot: IngestionSnapshot, documents: CanonicalContentDocument[]) {
  const byId = new Map(documents.map((document) => [document.id, document]));
  const retrieve = (query: string, topK = 5): RetrievalResult => {
    const queryTerms = new Set(terms(query));
    const scored = snapshot.chunks.flatMap((chunk) => {
      const document = byId.get(chunk.documentExternalId);
      if (!document) return [];
      const searchable = new Set([...terms(chunk.content), ...terms(document.title), ...chunk.concepts.flatMap(terms)]);
      const matches = [...queryTerms].filter((term) => searchable.has(term));
      const titleMatches = [...queryTerms].filter((term) => terms(document.title).includes(term)).length;
      const conceptMatches = [...queryTerms].filter((term) => chunk.concepts.some((concept) => terms(concept).includes(term))).length;
      const score = queryTerms.size ? Math.min(1, (matches.length + titleMatches * 2 + conceptMatches * 2) / (queryTerms.size + 4)) : 0;
      return matches.length > 0 ? [{ chunk, score, document, matches }] : [];
    }).sort((left, right) => right.score - left.score || left.chunk.externalId.localeCompare(right.chunk.externalId)).slice(0, topK);
    const hits = scored.map(({ chunk, score, document }) => ({ chunk, score, lessonId: document.id, title: document.title, concepts: [...document.concepts], provenance: { sourceType: "aulafy_canonical" as const, sourcePath: document.sourcePath, contentHash: document.contentHash } }));
    return { query, hits, lessons: [...new Set(hits.map((hit) => hit.lessonId))], concepts: [...new Set(hits.flatMap((hit) => hit.concepts))], provenance: hits.map((hit) => hit.provenance) };
  };
  return { retrieve };
}
