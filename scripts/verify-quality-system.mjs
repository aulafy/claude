import assert from "node:assert/strict";
import fs from "node:fs";
import { cursos } from "../lib/cursos.ts";
import { getCourseQuality } from "../lib/course-quality.ts";

const allowedStatuses = new Set(["Revisión editorial", "Probado parcialmente", "Necesita revisión"]);
const allowedVolatility = new Set(["estable", "revisable", "volátil"]);
const allowedReviewDays = new Set([7, 30, 180]);
const today = "2026-07-22";

function parseIsoDate(value, label) {
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/, `${label} must be ISO yyyy-mm-dd`);
  const date = new Date(`${value}T12:00:00Z`);
  assert.ok(!Number.isNaN(date.getTime()), `${label} must be a valid date`);
  return date;
}

for (const course of cursos) {
  const quality = getCourseQuality(course.slug);
  assert.ok(quality, `Missing quality record: ${course.slug}`);
  assert.ok(allowedStatuses.has(quality.status), `Invalid quality status: ${course.slug}`);
  assert.ok(allowedVolatility.has(quality.volatility), `Invalid volatility: ${course.slug}`);
  assert.ok(allowedReviewDays.has(quality.reviewDays), `Invalid review cadence: ${course.slug}`);
  assert.ok(quality.scope.length >= 90, `Quality scope too weak: ${course.slug}`);
  assert.ok(quality.evidence.length >= 3, `Quality record needs at least three evidence items: ${course.slug}`);
  assert.ok(quality.sources.length >= 2, `Quality record needs primary sources: ${course.slug}`);
  assert.ok(
    quality.sources.every((source) => source.href.startsWith("https://") && source.label.length >= 6),
    `Quality sources must be labelled HTTPS links: ${course.slug}`,
  );

  const reviewedAt = parseIsoDate(quality.reviewedAt, `${course.slug}.reviewedAt`);
  const nextReview = parseIsoDate(quality.nextReview, `${course.slug}.nextReview`);
  parseIsoDate(course.updatedAt, `${course.slug}.updatedAt`);
  assert.ok(nextReview > reviewedAt, `Next review must be after reviewed date: ${course.slug}`);

  const msPerDay = 24 * 60 * 60 * 1000;
  const reviewDistance = Math.round((nextReview.getTime() - reviewedAt.getTime()) / msPerDay);
  assert.equal(reviewDistance, quality.reviewDays, `Next review must match cadence: ${course.slug}`);

  if (quality.volatility === "volátil") {
    assert.equal(quality.reviewDays, 7, `Volatile courses must use weekly review: ${course.slug}`);
  }
  if (quality.status === "Probado parcialmente") {
    assert.match(
      quality.evidence.join(" "),
      /build|comando|prueba|ejecut/i,
      `Partially tested courses must name the executed evidence: ${course.slug}`,
    );
  }
}

const editorial = fs.readFileSync("docs/ESTANDAR-EDITORIAL.md", "utf8");
assert.match(editorial, /Jerarquía de fuentes/, "Editorial standard must keep source hierarchy");
assert.match(editorial, /No se usa «verificado»/, "Editorial standard must prevent vague verification claims");

const todayDate = parseIsoDate(today, "today");
void todayDate;

console.log(`Quality system verified for ${cursos.length} courses.`);
