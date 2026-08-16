import assert from "node:assert/strict";
import { validateLearningLabProgress } from "../lib/learning-lab-progress.ts";

const valid = validateLearningLabProgress({
  version: 1,
  scenarios: {
    pyme: {
      activeStation: "prompt",
      objectiveComplete: true,
      promptComplete: { objetivo: true, formato: true },
      reviewComplete: false,
      updatedAt: "2026-08-16T12:00:00.000Z",
    },
  },
});

assert.ok(valid, "A bounded lab state should validate");
assert.equal(valid.scenarios.pyme?.activeStation, "prompt");
assert.equal(validateLearningLabProgress({ ...valid, version: 2 }), null, "Unknown versions must fail closed");
assert.equal(validateLearningLabProgress({ version: 1, scenarios: { intruso: valid.scenarios.pyme } }), null, "Unknown scenarios must be rejected");
assert.equal(validateLearningLabProgress({ version: 1, scenarios: { pyme: { ...valid.scenarios.pyme, activeStation: "admin" } } }), null, "Unknown stations must be rejected");
assert.equal(validateLearningLabProgress({ version: 1, scenarios: { pyme: { ...valid.scenarios.pyme, promptComplete: { objetivo: false } } } }), null, "Only completed decisions may be persisted");

console.log("Learning lab progress contract passed: bounded scenarios, stations, decisions, version, and fail-closed validation.");
