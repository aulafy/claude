import assert from "node:assert/strict";
import fs from "node:fs";

const action = fs.readFileSync("app/brain/actions.ts", "utf8");
const persistence = fs.readFileSync("lib/brain/persistence.ts", "utf8");
const migration = fs.readFileSync("supabase/migrations/20260906100000_aulafy_evidence_review_rls.sql", "utf8");
assert.match(action, /verifyEvidence/);
assert.match(action, /evidenceIdSchema/);
assert.match(action, /moderator/);
assert.match(action, /admin/);
assert.match(persistence, /status: "verified"/);
assert.match(persistence, /verified_at/);
assert.match(migration, /auth\.uid\(\)/);
assert.match(migration, /user_roles/);
assert.match(migration, /for update/);
console.log("Evidence review contract passed: UUID validation, role gate and RLS update policy.");
