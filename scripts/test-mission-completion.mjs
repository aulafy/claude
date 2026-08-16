import assert from "node:assert/strict";
import { canCompleteMission } from "../lib/mission-completion.ts";

assert.equal(canCompleteMission([], true), false, "A mission without steps cannot be completed");
assert.equal(canCompleteMission([true, true, false], true), false, "Every practice step must be checked");
assert.equal(canCompleteMission([true, true, true], false), false, "A wrong criterion answer must not complete the mission");
assert.equal(canCompleteMission([true, true, true], undefined), false, "An unanswered criterion check must not complete the mission");
assert.equal(canCompleteMission([true, true, true], true), true, "Completed steps and a correct criterion answer unlock completion");

console.log("Mission completion contract passed: non-empty steps, all checked, and a correct criterion answer are required.");
