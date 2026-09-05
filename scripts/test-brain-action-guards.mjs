import assert from "node:assert/strict";
import fs from "node:fs";

const action = fs.readFileSync("app/brain/actions.ts", "utf8");
assert.match(action, /createLearningLoop\(loadContentRegistry\(\)\)/);
assert.match(action, /lesson\.prerequisites\.some/);
assert.match(action, /Complete the previous lessons first/);
assert.match(action, /loop\.path\.every/);
assert.match(action, /Complete the learning path before submitting evidence/);
assert.match(action, /eq\("user_id", session\.userId\)/);
console.log("Brain action guards passed: server-side prerequisites, path completion and owner scoping.");
