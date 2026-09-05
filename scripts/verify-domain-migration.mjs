import assert from "node:assert/strict";
import fs from "node:fs";

const sql = fs.readFileSync("supabase/migrations/20260905120000_aulafy_m01_domain_foundation.sql", "utf8");
const tables = ["aulafy_courses","aulafy_modules","aulafy_lessons","aulafy_concepts","aulafy_concept_relations","aulafy_lesson_concepts","aulafy_skills","aulafy_lesson_skills","aulafy_projects","aulafy_exercises","aulafy_evaluations","aulafy_user_lesson_progress","aulafy_user_concept_mastery","aulafy_user_skill_mastery","aulafy_evidence","aulafy_evidence_targets","aulafy_knowledge_sources","aulafy_knowledge_documents","aulafy_knowledge_chunks","aulafy_knowledge_chunk_concepts","aulafy_ingestion_runs","aulafy_evaluation_runs","aulafy_dataset_candidates","aulafy_dataset_candidate_sources","aulafy_learning_paths","aulafy_learning_path_items"];
for (const table of tables) assert.match(sql, new RegExp(`create table if not exists public\\.${table}\\b`), `Missing table ${table}`);
for (const invariant of ["source_concept_id <> target_concept_id","unique(source_concept_id,target_concept_id,relation_type)","mastery_score between 0 and 1","confidence_score between 0 and 1","num_nonnulls(lesson_id,exercise_id,project_id,evaluation_id) = 1","unique(document_id,chunk_index)"]) assert.ok(sql.includes(invariant), `Missing invariant ${invariant}`);
assert.match(sql, /auth\.users\(id\) on delete cascade/);
assert.match(sql, /enable row level security/);
assert.match(sql, /auth\.uid\(\) = user_id/);
assert.doesNotMatch(sql, /create extension.*vector/i);
console.log(`Static domain migration verified: ${tables.length} tables, constraints, auth references, RLS and no vector extension.`);
