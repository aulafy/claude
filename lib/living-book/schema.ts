import { z } from "zod";

export const locales = ["es", "en"] as const;
export type BookLocale = typeof locales[number];
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const translated = z.object({ es: z.string().min(1), en: z.string().min(1) }).strict();
const level = z.enum(["beginner", "intermediate", "advanced"]);
const approval = z.object({ reviewer: z.string().min(1), role: z.enum(["editorial", "technical"]), contentHash: hash, reviewedAt: z.iso.datetime() }).strict();
const localized = z.object({
  title: z.string().min(1), summary: z.string().min(1), outcomes: z.array(z.string().min(1)).min(1),
  exercise: z.object({ question: z.string().min(1), options: z.array(z.string().min(1)).min(2).max(5), correct: z.number().int().nonnegative(), explanation: z.string().min(1) }).strict().refine(value => value.correct < value.options.length, "Answer must reference an option"),
}).strict();

export const catalogSchema = z.object({
  schemaVersion: z.literal(1), title: translated, sourceLocale: z.enum(locales),
  parts: z.array(z.object({ id, title: translated, outcome: translated, level, chapters: z.array(z.object({ id, title: translated }).strict()).min(1) }).strict()).min(1),
}).strict();
export const chapterSchema = z.object({
  schemaVersion: z.literal(1), id, sourceLocale: z.enum(locales), level,
  minutes: z.number().int().positive(), risk: z.enum(["low", "technical", "high"]),
  prerequisites: z.array(id), claimIds: z.array(id),
  legacyPaths: z.array(z.string().min(1)),
  localized: z.object({ es: localized, en: localized }).strict(),
  translationFrom: z.object({ es: hash.nullable(), en: hash.nullable() }).strict(),
  approvals: z.object({ es: z.array(approval), en: z.array(approval) }).strict(),
}).strict();
export const sourcesSchema = z.array(z.object({
  id, label: z.string().min(1), kind: z.enum(["documentation", "release", "community"]),
  url: z.url().refine(value => { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; }, "HTTPS without credentials required"),
  intervalHours: z.number().int().positive(), owner: z.string().min(1),
}).strict());
export const claimsSchema = z.array(z.object({ id, description: translated, sourceIds: z.array(id).min(1), chapterIds: z.array(id).min(1), volatile: z.boolean() }).strict());
export const signalSchema = z.object({
  schemaVersion: z.literal(1), channel: z.enum(["manual", "markdown", "grok", "github", "rss", "llm"]),
  title: z.string().trim().min(1).max(200), summary: z.string().trim().min(1).max(100000),
  sourceIds: z.array(id).max(20), targetIds: z.array(id).max(20), observedAt: z.iso.datetime(),
}).strict();
export type ChapterMetadata = z.infer<typeof chapterSchema>;
export type BookCatalog = z.infer<typeof catalogSchema>;
export type BookSource = z.infer<typeof sourcesSchema>[number];
export type BookClaim = z.infer<typeof claimsSchema>[number];
export type EditorialSignal = z.infer<typeof signalSchema>;
export type SourceSnapshot = { sourceId: string; fetchedAt: string; hash: string; status: "ok" | "failed"; extractorVersion: string };
export type ClaimReview = { claimId: string; sourceHashes: Record<string, string>; verifiedAt: string; reviewer: string; verdict: "supported" | "unsupported" };

export interface SignalConnector {
  readonly id: string;
  collect(input: { since: string; deadline: number; maxItems: number }): Promise<EditorialSignal[]>;
}
export interface SourceConnector {
  readonly kind: BookSource["kind"];
  fetch(source: BookSource, input: { deadline: number; maxBytes: number }): Promise<SourceSnapshot>;
}
export interface EditorialModel {
  readonly id: string;
  propose(input: { schemaVersion: 1; baseHash: string; task: string; evidence: readonly { sourceId: string; hash: string; text: string }[]; maxCost: number; deadline: number }): Promise<{ baseHash: string; markdown: string; sourceIds: string[]; model: string; promptVersion: string; usage: { inputTokens: number; outputTokens: number } }>;
}
