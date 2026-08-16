import assert from "node:assert/strict";
import { isLearningDay, recentLearningDays, summarizeLearningStreak } from "../lib/learning-streak.ts";

assert.equal(isLearningDay("2026-02-29"), false, "Impossible calendar dates must fail");
assert.equal(isLearningDay("2024-02-29"), true, "Leap days must be valid");
assert.deepEqual(summarizeLearningStreak([], "2026-08-16"), { current: 0, best: 0, totalDays: 0, lastActiveDay: null });

const days = ["2026-08-10", "2026-08-11", "2026-08-13", "2026-08-14", "2026-08-15", "2026-08-15"];
assert.deepEqual(summarizeLearningStreak(days, "2026-08-16"), { current: 3, best: 3, totalDays: 5, lastActiveDay: "2026-08-15" }, "Yesterday keeps the current streak alive");
assert.equal(summarizeLearningStreak(days, "2026-08-17").current, 0, "A full missed day ends the current streak");
assert.equal(summarizeLearningStreak([...days, "2026-08-16"], "2026-08-16").current, 4, "Activity today extends the streak");
assert.equal(summarizeLearningStreak([...days, "2027-01-01"], "2026-08-16").totalDays, 5, "Future dates must not inflate visible activity");

const recent = recentLearningDays(["2026-08-10", "2026-08-16"], new Date(2026, 7, 16));
assert.equal(recent.length, 7);
assert.equal(recent[0]?.value, "2026-08-10");
assert.equal(recent[0]?.active, true);
assert.equal(recent[6]?.active, true);

console.log("Learning streak contract passed: valid dates, deduplication, grace through today, best run, and seven-day window.");
