import assert from "node:assert/strict";
import { aiProgram } from "../lib/ai-program.ts";
import { cursos } from "../lib/cursos.ts";

const courseSlugs = new Set(cursos.map((course) => course.slug));

for (const locale of ["es", "en"]) {
  const program = aiProgram[locale];
  assert.equal(program.stages.length, 7, `Program must have seven modules: ${locale}`);
  assert.ok(program.tracks.length >= 3, `Program needs profile tracks: ${locale}`);
  assert.ok(program.promise.length >= 120, `Program promise is too weak: ${locale}`);
  assert.ok(program.method.length >= 4, `Program needs a practical learning method: ${locale}`);
  assert.ok(program.horizon.length >= 120, `Program long-term vision is too weak: ${locale}`);
  assert.ok(program.updateSources.length >= 5, `Program needs update sources: ${locale}`);

  const stageIds = new Set(program.stages.map((stage) => stage.id));
  for (const stage of program.stages) {
    assert.ok(stage.title.length >= 8, `Weak stage title: ${locale}/${stage.id}`);
    assert.ok(stage.objective.length >= 80, `Weak stage objective: ${locale}/${stage.id}`);
    assert.ok(stage.evidence.length >= 3, `Stage needs evidence items: ${locale}/${stage.id}`);
    assert.ok(stage.project.length >= 70, `Stage needs a reviewable project: ${locale}/${stage.id}`);
    assert.ok(stage.gate.length >= 60, `Stage needs an exit gate: ${locale}/${stage.id}`);
    assert.ok(stage.courses.every((slug) => courseSlugs.has(slug)), `Unknown course in stage: ${locale}/${stage.id}`);
  }

  for (const track of program.tracks) {
    assert.ok(track.stages.every((stage) => stageIds.has(stage)), `Unknown stage in track: ${locale}/${track.id}`);
  }
}

const spanishProgramCourses = new Set(aiProgram.es.stages.flatMap((stage) => stage.courses));
assert.ok(spanishProgramCourses.has("codex-desde-cero"), "Spanish program must include the zero-experience Codex course");
assert.ok(spanishProgramCourses.has("crear-webs-con-ia"), "Spanish program must include the web and SaaS course");

console.log("Verified complete AI program roadmap in ES/EN.");
