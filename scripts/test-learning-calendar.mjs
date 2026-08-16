import assert from "node:assert/strict";
import { createLearningCalendar, createLearningSchedule, createLocalStart } from "../lib/learning-calendar.ts";
import { sevenDayPath } from "../lib/seven-day-path.ts";

assert.equal(createLocalStart("2026-02-30", "18:00"), null, "Impossible dates must fail");
assert.equal(createLocalStart("2026-08-16", "25:00"), null, "Impossible times must fail");

const start = new Date("2026-08-16T16:00:00.000Z");
const schedule = createLearningSchedule(start, sevenDayPath.es);
assert.equal(schedule.length, 7, "The calendar must contain seven sessions");
assert.equal(schedule[0].endsAt.getTime() - schedule[0].startsAt.getTime(), 15 * 60_000);
assert.equal(schedule[6].startsAt.getUTCDate(), 22, "Sessions must run on consecutive days");

const calendar = createLearningCalendar(schedule, "es", new Date("2026-08-16T10:00:00.000Z"));
assert.equal((calendar.match(/BEGIN:VEVENT/g) ?? []).length, 7);
assert.match(calendar, /DTSTART:20260816T160000Z/);
assert.match(calendar, /DTEND:20260816T161500Z/);
assert.match(calendar, /URL:https:\/\/www\.aulafy\.net\/empezar/);
assert.ok(calendar.endsWith("\r\n"), "iCalendar must use a final CRLF");
assert.ok(!/(?<!\r)\n/.test(calendar), "iCalendar must use CRLF line endings");
for (const line of calendar.split("\r\n")) {
  assert.ok(new TextEncoder().encode(line).length <= 75, `Folded line exceeds 75 bytes: ${line}`);
}
assert.doesNotMatch(calendar, /email|account|browser-id/i, "The export must not contain personal identifiers");

const escaped = createLearningCalendar(createLearningSchedule(start, [{ day: 1, title: "A, B; C", result: "Line one\nLine two", minutes: 10, href: "/empezar" }]), "en", start);
assert.match(escaped, /SUMMARY:Day 1: A\\, B\\; C/);
assert.match(escaped, /DESCRIPTION:Line one\\nLine two/);

console.log("Learning calendar contract passed: seven UTC events, durations, URLs, escaping, folding, and no personal identifiers.");
