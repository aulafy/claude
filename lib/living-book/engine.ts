import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { catalogSchema, chapterSchema, sourcesSchema, claimsSchema, signalSchema, locales } from "./schema.ts";
import type { BookLocale, ChapterMetadata, BookCatalog, BookSource, BookClaim, EditorialSignal, SourceSnapshot, ClaimReview } from "./schema.ts";

export const sha = (text: string) => crypto.createHash("sha256").update(text).digest("hex");
export function canonical(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (value && typeof value === "object") return "{" + Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => JSON.stringify(key) + ":" + canonical(item)).join(",") + "}";
  return JSON.stringify(value);
}
export type BookChapter = { metadata: ChapterMetadata; bodies: Record<BookLocale, string>; hashes: Record<BookLocale, string> };
export type LivingBook = { catalog: BookCatalog; chapters: BookChapter[]; sources: BookSource[]; claims: BookClaim[] };
export function revisionHash(metadata: ChapterMetadata, locale: BookLocale, body: string) {
  return sha(canonical({ id: metadata.id, sourceLocale: metadata.sourceLocale, level: metadata.level, minutes: metadata.minutes, risk: metadata.risk, prerequisites: metadata.prerequisites, claimIds: metadata.claimIds, localized: metadata.localized[locale], locale, body }));
}
function readJson(root: string, name: string) { return JSON.parse(fs.readFileSync(path.join(root, "book", name), "utf8")); }
export function loadBook(root = process.cwd()): LivingBook {
  const catalog = catalogSchema.parse(readJson(root, "catalog.json"));
  const sources = sourcesSchema.parse(readJson(root, "sources.json"));
  const claims = claimsSchema.parse(readJson(root, "claims.json"));
  const chapters: BookChapter[] = [];
  for (const entry of catalog.parts.flatMap(part => part.chapters)) {
    const directory = path.join(root, "book", "chapters", entry.id);
    if (!fs.existsSync(path.join(directory, "chapter.json"))) continue;
    const metadata = chapterSchema.parse(JSON.parse(fs.readFileSync(path.join(directory, "chapter.json"), "utf8")));
    if (metadata.id !== entry.id) throw new Error(`Chapter identity mismatch: ${entry.id}`);
    const bodies = Object.fromEntries(locales.map(locale => [locale, fs.readFileSync(path.join(directory, `${locale}.md`), "utf8")])) as Record<BookLocale, string>;
    const hashes = Object.fromEntries(locales.map(locale => [locale, revisionHash(metadata, locale, bodies[locale])])) as Record<BookLocale, string>;
    chapters.push({ metadata, bodies, hashes });
  }
  const book = { catalog, chapters, sources, claims };
  const errors = validateBook(book);
  if (errors.length) throw new Error(errors.join("\n"));
  return book;
}
export function validateBook(book: LivingBook): string[] {
  const errors: string[] = [];
  const plans = book.catalog.parts.flatMap(part => part.chapters);
  const planned = new Set(plans.map(chapter => chapter.id));
  const sourceIds = new Set(book.sources.map(source => source.id));
  const claimIds = new Set(book.claims.map(claim => claim.id));
  const chapters = new Map(book.chapters.map(chapter => [chapter.metadata.id, chapter]));
  for (const [label, ids] of [["part", book.catalog.parts.map(part => part.id)], ["chapter", plans.map(chapter => chapter.id)], ["source", book.sources.map(source => source.id)], ["claim", book.claims.map(claim => claim.id)]] as const) {
    if (new Set(ids).size !== ids.length) errors.push(`Duplicate ${label} ID`);
  }
  for (const claim of book.claims) {
    for (const source of claim.sourceIds) if (!sourceIds.has(source)) errors.push(`Unknown source ${source}`);
    for (const chapter of claim.chapterIds) if (!planned.has(chapter)) errors.push(`Unknown claim target ${chapter}`);
  }
  for (const chapter of book.chapters) {
    if (!planned.has(chapter.metadata.id)) errors.push(`Unplanned chapter ${chapter.metadata.id}`);
    for (const prerequisite of chapter.metadata.prerequisites) if (!planned.has(prerequisite)) errors.push(`Unknown prerequisite ${prerequisite}`);
    for (const id of chapter.metadata.claimIds) {
      if (!claimIds.has(id)) errors.push(`Unknown claim ${id}`);
      else if (!book.claims.find(claim => claim.id === id)?.chapterIds.includes(chapter.metadata.id)) errors.push(`Claim mapping mismatch ${id}`);
    }
    for (const locale of locales) {
      if (!chapter.bodies[locale].trim()) errors.push(`Empty chapter ${chapter.metadata.id}/${locale}`);
      type MarkdownNode = { type: string; depth?: number; value?: string; children?: MarkdownNode[] };
      const tree = unified().use(remarkParse).parse(chapter.bodies[locale]) as MarkdownNode;
      let steps = 0;
      const inspect = (node: MarkdownNode) => {
        if (node.type === "html") errors.push(`Raw HTML is not allowed in ${chapter.metadata.id}/${locale}`);
        if (node.type === "heading" && node.depth === 2 && /^\d+\./.test(node.children?.[0]?.value || "")) steps++;
        for (const child of node.children || []) inspect(child);
      };
      inspect(tree);
      if (steps < 2) errors.push(`At least two numbered steps required: ${chapter.metadata.id}/${locale}`);
    }
  }
  const visiting = new Set<string>(), visited = new Set<string>();
  const visit = (id: string) => {
    if (visiting.has(id)) { errors.push(`Prerequisite cycle at ${id}`); return; }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const parent of chapters.get(id)?.metadata.prerequisites || []) visit(parent);
    visiting.delete(id); visited.add(id);
  };
  for (const id of chapters.keys()) visit(id);
  return errors;
}

export function publicationProblems(book: LivingBook, chapter: BookChapter, locale: BookLocale, snapshots: SourceSnapshot[] = [], reviews: ClaimReview[] = [], now = Date.now(), seen = new Set<string>()): string[] {
  const reasons: string[] = [];
  const metadata = chapter.metadata;
  if (seen.has(metadata.id)) return ["prerequisite-cycle"];
  const visited = new Set(seen).add(metadata.id);
  const validDate = (date: string) => Number.isFinite(Date.parse(date)) && Date.parse(date) <= now;
  const approvals = metadata.approvals[locale].filter(approval => approval.contentHash === chapter.hashes[locale] && validDate(approval.reviewedAt));
  if (!approvals.some(approval => approval.role === "editorial")) reasons.push("editorial-review");
  if (metadata.risk !== "low" && !approvals.some(approval => approval.role === "technical")) reasons.push("technical-review");
  if (locale !== metadata.sourceLocale && metadata.translationFrom[locale] !== chapter.hashes[metadata.sourceLocale]) reasons.push("translation-outdated");
  for (const id of metadata.prerequisites) {
    const parent = book.chapters.find(item => item.metadata.id === id);
    if (!parent) reasons.push(`prerequisite-unavailable:${id}`);
    else if (publicationProblems(book, parent, locale, snapshots, reviews, now, visited).length) reasons.push(`prerequisite-not-ready:${id}`);
  }
  const relevantClaims = book.claims.filter(claim => metadata.claimIds.includes(claim.id) || claim.chapterIds.includes(metadata.id));
  for (const claim of relevantClaims) {
    const review = [...reviews].filter(item => item.claimId === claim.id && validDate(item.verifiedAt)).sort((a, b) => b.verifiedAt.localeCompare(a.verifiedAt))[0];
    for (const sourceId of claim.sourceIds) {
      const source = book.sources.find(item => item.id === sourceId);
      const snapshot = [...snapshots].filter(item => item.sourceId === sourceId).sort((a, b) => b.fetchedAt.localeCompare(a.fetchedAt))[0];
      if (!source || !snapshot || snapshot.status !== "ok" || !validDate(snapshot.fetchedAt)) { reasons.push(`source-unverified:${sourceId}`); continue; }
      if (now - Date.parse(snapshot.fetchedAt) > source.intervalHours * 3600000) reasons.push(`source-overdue:${sourceId}`);
      if (!review || review.verdict !== "supported" || review.sourceHashes[sourceId] !== snapshot.hash || now - Date.parse(review.verifiedAt) > source.intervalHours * 3600000) reasons.push(`claim-review:${claim.id}`);
    }
  }
  return [...new Set(reasons)];
}

function expandDependents(book: LivingBook, direct: Set<string>) {
  const affected = new Set(direct);
  let changed = true;
  while (changed) {
    changed = false;
    for (const chapter of book.chapters) if (!affected.has(chapter.metadata.id) && chapter.metadata.prerequisites.some(id => affected.has(id))) { affected.add(chapter.metadata.id); changed = true; }
  }
  return [...affected];
}
export function impactOfSource(book: LivingBook, sourceId: string) {
  if (!book.sources.some(source => source.id === sourceId)) throw new Error(`Unknown source ${sourceId}`);
  const direct = new Set(book.claims.filter(claim => claim.sourceIds.includes(sourceId)).flatMap(claim => claim.chapterIds));
  return { sourceId, direct: [...direct], affected: expandDependents(book, direct), locales: [...locales] };
}
export function normalizeSignal(input: unknown, book: LivingBook, now = Date.now()) {
  const signal = signalSchema.parse(input);
  if (Date.parse(signal.observedAt) > now + 300000) throw new Error("Signal date is in the future");
  const targets = new Set(book.catalog.parts.flatMap(part => part.chapters.map(chapter => chapter.id)));
  for (const id of signal.targetIds) if (!targets.has(id)) throw new Error(`Unknown target ${id}`);
  for (const id of signal.sourceIds) if (!book.sources.some(source => source.id === id)) throw new Error(`Unknown source ${id}`);
  const normalized = { ...signal, sourceIds: [...new Set(signal.sourceIds)].sort(), targetIds: [...new Set(signal.targetIds)].sort() };
  const { observedAt: _observedAt, ...identity } = normalized;
  void _observedAt;
  return { ...normalized, id: sha(canonical(identity)), trust: "unverified" as const, state: "received" as const };
}
export function planUpdate(book: LivingBook, signal: EditorialSignal) {
  const valid = normalizeSignal(signal, book);
  const affected = new Set(expandDependents(book, new Set([...valid.targetIds, ...valid.sourceIds.flatMap(id => impactOfSource(book, id).affected)])));
  return { signalId: valid.id, state: affected.size ? "needs-evidence" : "needs-scoping", affected: [...affected], baseHashes: Object.fromEntries(book.chapters.filter(chapter => affected.has(chapter.metadata.id)).map(chapter => [chapter.metadata.id, chapter.hashes])), mayPublish: false, required: ["primary-evidence", "revision-diff", "technical-checks", "human-review"] };
}
export function bookReport(book: LivingBook) {
  return {
    schemaVersion: 1, mode: "local-preview", automation: "not-active", generatedAt: new Date().toISOString(),
    planned: book.catalog.parts.flatMap(part => part.chapters).length,
    chapters: book.chapters.flatMap(chapter => locales.map(locale => ({ id: chapter.metadata.id, locale, hash: chapter.hashes[locale], blockers: publicationProblems(book, chapter, locale) }))),
    sources: book.sources.map(source => ({ ...source, lastCheckedAt: null, impact: impactOfSource(book, source.id) })),
  };
}
