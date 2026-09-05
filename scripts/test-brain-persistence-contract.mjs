import assert from "node:assert/strict";
import fs from "node:fs";

const action = fs.readFileSync("app/brain/actions.ts", "utf8");
const persistence = fs.readFileSync("lib/brain/persistence.ts", "utf8");
assert.match(action, /"use server"/);
assert.match(action, /auth\.getClaims/);
assert.match(action, /contentIdSchema/);
assert.match(action, /evidenceSchema/);
assert.match(persistence, /aulafy_user_lesson_progress/);
assert.match(persistence, /aulafy_evidence/);
assert.match(persistence, /aulafy_evidence_targets/);
assert.match(persistence, /eq\("user_id", userId\)/);
assert.match(persistence, /status: "submitted"/);
console.log("Brain persistence contract passed: server auth, validation, owner scoping and evidence status.");
