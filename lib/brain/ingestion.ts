import crypto from "node:crypto";
import type { CanonicalContentDocument } from "../content/types.ts";

export type KnowledgeDocument = {
  externalId: string;
  sourceType: "aulafy_canonical";
  title: string;
  uri: string;
  contentHash: string;
  contentVersion: number;
  status: "active" | "archived";
  publishedAt: string;
};

export type KnowledgeChunk = {
  externalId: string;
  documentExternalId: string;
  chunkIndex: number;
  content: string;
  contentHash: string;
  concepts: string[];
  sourcePath: string;
};

export type IngestionSnapshot = {
  documents: KnowledgeDocument[];
  chunks: KnowledgeChunk[];
  inputHash: string;
};

function hash(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function splitSections(body: string) {
  const matches = [...body.matchAll(/^#{1,6} .+$/gm)];
  if (!matches.length) return [body.trim()].filter(Boolean);
  const sections: string[] = [];
  const first = body.slice(0, matches[0].index).trim();
  if (first) sections.push(first);
  for (let index = 0; index < matches.length; index += 1) {
    const start = matches[index].index ?? 0;
    const end = matches[index + 1]?.index ?? body.length;
    const section = body.slice(start, end).trim();
    if (section) sections.push(section);
  }
  return sections;
}

export function toKnowledgeDocument(document: CanonicalContentDocument): KnowledgeDocument {
  return {
    externalId: document.id,
    sourceType: "aulafy_canonical",
    title: document.title,
    uri: document.sourcePath,
    contentHash: document.contentHash,
    contentVersion: 1,
    status: document.status === "archived" ? "archived" : "active",
    publishedAt: document.updated,
  };
}

export function toKnowledgeChunks(document: CanonicalContentDocument): KnowledgeChunk[] {
  return splitSections(document.body).map((content, chunkIndex) => ({
    externalId: `${document.id}:chunk:${chunkIndex}`,
    documentExternalId: document.id,
    chunkIndex,
    content,
    contentHash: hash(`${document.contentHash}\n${chunkIndex}\n${content}`),
    concepts: [...document.concepts],
    sourcePath: document.sourcePath,
  }));
}

export function ingestCanonicalContent(documents: CanonicalContentDocument[]): IngestionSnapshot {
  const ordered = [...documents].sort((left, right) => left.id.localeCompare(right.id));
  const knowledgeDocuments = ordered.map(toKnowledgeDocument);
  const chunks = ordered.flatMap(toKnowledgeChunks);
  return {
    documents: knowledgeDocuments,
    chunks,
    inputHash: hash(ordered.map((document) => `${document.id}:${document.contentHash}`).join("\n")),
  };
}

export function diffIngestionSnapshots(previous: IngestionSnapshot, next: IngestionSnapshot) {
  const previousDocuments = new Map(previous.documents.map((document) => [document.externalId, document]));
  const nextDocuments = new Map(next.documents.map((document) => [document.externalId, document]));
  return {
    newDocuments: [...nextDocuments.keys()].filter((id) => !previousDocuments.has(id)),
    changedDocuments: [...nextDocuments.keys()].filter((id) => previousDocuments.has(id) && previousDocuments.get(id)?.contentHash !== nextDocuments.get(id)?.contentHash),
    removedDocuments: [...previousDocuments.keys()].filter((id) => !nextDocuments.has(id)),
  };
}
