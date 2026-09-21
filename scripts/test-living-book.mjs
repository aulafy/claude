import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { loadBook, revisionHash, canonical, validateBook, normalizeSignal, planUpdate, publicationProblems, impactOfSource, bookReport } from "../lib/living-book/engine.ts";
import { chapterSchema, signalSchema } from "../lib/living-book/schema.ts";

const now = Date.parse("2026-09-12T12:00:00Z");
const book = () => structuredClone(loadBook());
const signal = () => ({ schemaVersion: 1, channel: "manual", title: "Review the exercise", summary: "A local candidate, not verified content.", sourceIds: [], targetIds: ["first-task"], observedAt: "2026-09-12T10:00:00Z" });
function approve(chapter, locale = "es", role = "editorial") { chapter.metadata.approvals[locale].push({ reviewer: "fixture-reviewer", contentHash: chapter.hashes[locale], role, reviewedAt: "2026-09-12T10:00:00Z" }); }
function rehash(chapter) { for (const locale of ["es", "en"]) chapter.hashes[locale] = revisionHash(chapter.metadata, locale, chapter.bodies[locale]); }

test("pilot contains a truthful 24-chapter plan and twenty-four bilingual drafts", () => {
  const data = book(); const report = bookReport(data);
  assert.equal(data.catalog.parts.length, 8); assert.equal(report.planned, 24);
  assert.equal(data.chapters.length, 24); assert.equal(report.chapters.length, 48);
  assert.ok(report.chapters.every(item => item.blockers.includes("editorial-review")));
  assert.equal(report.automation, "not-active");
});
test("declared legacy provenance files exist", () => {
  const data = book();
  for (const chapter of data.chapters) for (const legacyPath of chapter.metadata.legacyPaths) {
    assert.ok(fs.existsSync(path.resolve(legacyPath)), `${chapter.metadata.id}: missing ${legacyPath}`);
  }
});
test("schemas reject unknown versions, extra fields and invalid quiz answers", () => {
  assert.throws(() => signalSchema.parse({ ...signal(), schemaVersion: 2 }));
  assert.throws(() => signalSchema.parse({ ...signal(), publish: true }));
  const chapter = book().chapters[0].metadata; chapter.localized.es.exercise.correct = 80;
  assert.throws(() => chapterSchema.parse(chapter));
});
test("stable hashes ignore object key order but include content and shared contracts", () => {
  assert.equal(canonical({ b: 1, a: [2] }), canonical({ a: [2], b: 1 }));
  const chapter = book().chapters[0]; const before = chapter.hashes.es;
  approve(chapter); assert.equal(revisionHash(chapter.metadata, "es", chapter.bodies.es), before);
  chapter.metadata.minutes++; rehash(chapter); assert.notEqual(chapter.hashes.es, before);
});
test("an edit invalidates review and the translation source binding", () => {
  const data = book(); const chapter = data.chapters[0]; approve(chapter); approve(chapter, "en");
  assert.deepEqual(publicationProblems(data, chapter, "es", [], [], now), []);
  assert.deepEqual(publicationProblems(data, chapter, "en", [], [], now), []);
  chapter.bodies.es += "\nA changed instruction."; rehash(chapter);
  assert.ok(publicationProblems(data, chapter, "es", [], [], now).includes("editorial-review"));
  assert.ok(publicationProblems(data, chapter, "en", [], [], now).includes("translation-outdated"));
});
test("technical chapters cannot pass with editorial approval alone", () => {
  const data = book(); const chapter = data.chapters[0]; chapter.metadata.risk = "technical"; rehash(chapter); approve(chapter);
  assert.ok(publicationProblems(data, chapter, "es", [], [], now).includes("technical-review"));
  approve(chapter, "es", "technical"); assert.deepEqual(publicationProblems(data, chapter, "es", [], [], now), []);
});
test("future-dated review is not approval", () => {
  const data = book(); const chapter = data.chapters[0]; approve(chapter);
  chapter.metadata.approvals.es[0].reviewedAt = "2027-01-01T00:00:00Z";
  assert.ok(publicationProblems(data, chapter, "es", [], [], now).includes("editorial-review"));
});
test("a chapter cannot pass while its prerequisites are unreviewed", () => {
  const data = book(); const chapter = data.chapters[1]; approve(chapter);
  assert.ok(publicationProblems(data, chapter, "es", [], [], now).includes("prerequisite-not-ready:first-task"));
  approve(data.chapters[0]); assert.deepEqual(publicationProblems(data, chapter, "es", [], [], now), []);
});
test("source changes, expiry and later failed fetches block evidence gates", () => {
  const data = book(); const chapter = data.chapters[0];
  chapter.metadata.claimIds = ["allocated-context"]; data.claims[0].chapterIds.push(chapter.metadata.id); rehash(chapter); approve(chapter);
  const snapshots = [{ sourceId: "ollama-context", hash: "a".repeat(64), fetchedAt: "2026-09-12T09:00:00Z", status: "ok", extractorVersion: "fixture/v1" }];
  const reviews = [{ claimId: "allocated-context", sourceHashes: { "ollama-context": "a".repeat(64) }, verifiedAt: "2026-09-12T10:00:00Z", reviewer: "fixture-reviewer", verdict: "supported" }];
  assert.deepEqual(publicationProblems(data, chapter, "es", snapshots, reviews, now), []);
  snapshots[0].hash = "b".repeat(64);
  assert.ok(publicationProblems(data, chapter, "es", snapshots, reviews, now).includes("claim-review:allocated-context"));
  snapshots[0].hash = "a".repeat(64); snapshots[0].fetchedAt = "2026-09-10T09:00:00Z";
  assert.ok(publicationProblems(data, chapter, "es", snapshots, reviews, now).includes("source-overdue:ollama-context"));
  snapshots.push({ ...snapshots[0], fetchedAt: "2026-09-12T11:00:00Z", status: "failed" });
  assert.ok(publicationProblems(data, chapter, "es", snapshots, reviews, now).includes("source-unverified:ollama-context"));
});
test("a later unsupported verdict supersedes old supporting evidence", () => {
  const data = book(); const chapter = data.chapters[0]; data.claims[0].chapterIds.push(chapter.metadata.id); approve(chapter);
  const snapshot = { sourceId: "ollama-context", hash: "a".repeat(64), fetchedAt: "2026-09-12T09:00:00Z", status: "ok", extractorVersion: "fixture/v1" };
  const supported = { claimId: "allocated-context", sourceHashes: { "ollama-context": snapshot.hash }, verifiedAt: "2026-09-12T10:00:00Z", reviewer: "fixture", verdict: "supported" };
  assert.ok(publicationProblems(data, chapter, "es", [snapshot], [supported, { ...supported, verifiedAt: "2026-09-12T11:00:00Z", verdict: "unsupported" }], now).includes("claim-review:allocated-context"));
});
test("duplicate IDs, broken references and prerequisite cycles are rejected", () => {
  const data = book(); data.catalog.parts[0].chapters.push(data.catalog.parts[0].chapters[0]);
  data.chapters[0].metadata.prerequisites = ["data-boundaries", "missing"];
  const errors = validateBook(data);
  assert.ok(errors.some(item => item.includes("Duplicate")));
  assert.ok(errors.some(item => item.includes("Unknown prerequisite")));
  assert.ok(errors.some(item => item.includes("cycle")));
});
test("Markdown parsing rejects raw HTML without rejecting fenced code examples", () => {
  const data = book(); data.chapters[0].bodies.es += "\n```text\n<api-key>\n```\n";
  assert.deepEqual(validateBook(data), []);
  data.chapters[0].bodies.es += "\n<script>alert(1)</script>\n";
  assert.ok(validateBook(data).some(item => item.includes("Raw HTML")));
});
test("intake is deduplicated, bounded and never confers trust", () => {
  const data = book(); const first = normalizeSignal(signal(), data, now);
  const second = normalizeSignal({ ...signal(), observedAt: "2026-09-12T11:00:00Z" }, data, now);
  assert.equal(first.id, second.id); assert.equal(first.trust, "unverified");
  assert.throws(() => normalizeSignal({ ...signal(), targetIds: ["../../file"] }, data, now));
  assert.throws(() => normalizeSignal({ ...signal(), sourceIds: ["unknown"] }, data, now));
  assert.throws(() => normalizeSignal({ ...signal(), observedAt: "2027-01-01T00:00:00Z" }, data, now));
  assert.throws(() => normalizeSignal({ ...signal(), summary: "x".repeat(100001) }, data, now));
});
test("source impact includes linked chapter IDs and transitive prerequisites", () => {
  const data = book(); data.claims[0].chapterIds.push("first-task");
  const impact = impactOfSource(data, "ollama-context");
  assert.ok(impact.direct.includes("local-context")); assert.ok(impact.affected.includes("data-boundaries"));
  assert.deepEqual(impact.locales, ["es", "en"]);
});
test("the update plan is tied to revisions and cannot publish", () => {
  const data = book(); const proposal = planUpdate(data, { ...signal(), observedAt: new Date().toISOString() });
  assert.equal(proposal.mayPublish, false); assert.equal(proposal.state, "needs-evidence");
  assert.equal(proposal.baseHashes["first-task"].es, data.chapters[0].hashes.es);
  assert.ok(proposal.affected.includes("verify-output"));
  assert.ok(proposal.affected.includes("data-boundaries"));
});
