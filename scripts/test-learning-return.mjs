import assert from "node:assert/strict";
import { getLearningReturnEvent } from "../lib/learning-return.ts";

const DAY = 86_400_000;
const now = Date.parse("2026-08-16T12:00:00.000Z");
const before = (days) => new Date(now - days * DAY).toISOString();
const current = new Date(now).toISOString();

assert.equal(getLearningReturnEvent(undefined, current), null, "A first visit is not a return");
assert.equal(getLearningReturnEvent("invalid", current), null, "Invalid dates must fail closed");
assert.equal(getLearningReturnEvent(before(6.99), current), null, "A visit before seven elapsed days is not a return");
assert.equal(getLearningReturnEvent(before(7), current), "return_7d", "Seven elapsed days is a weekly return");
assert.equal(getLearningReturnEvent(before(29), current), "return_7d", "Weekly returns remain exclusive until day 30");
assert.equal(getLearningReturnEvent(before(30), current), "return_30d", "Thirty elapsed days is a monthly return");
assert.equal(getLearningReturnEvent(new Date(now + DAY).toISOString(), current), null, "Clock reversal must not create a return");

console.log("Learning return contract passed: first visit, invalid dates, 7-day and exclusive 30-day windows.");
