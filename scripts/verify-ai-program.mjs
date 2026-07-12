import assert from "node:assert/strict";
import { aiProgram } from "../lib/ai-program.ts";
import { cursos } from "../lib/cursos.ts";

const courseSlugs = new Set(cursos.map((course) => course.slug));

for (const locale of ["es", "en"]) {
  const program = aiProgram[locale];
  assert.ok(program.stages.length >= 6, `Program needs at least six stages: ${locale}`);
  assert.ok(program.tracks.length >= 3, `Program needs profile tracks: ${locale}`);
  assert.ok(program.promise.length >= 120, `Program promise is too weak: ${locale}`);

  const stageIds = new Set(program.stages.map((stage) => stage.id));
  for (const stage of program.stages) {
    assert.ok(stage.title.length >= 8, `Weak stage title: ${locale}/${stage.id}`);
    assert.ok(stage.objective.length >= 80, `Weak stage objective: ${locale}/${stage.id}`);
    assert.ok(stage.evidence.length >= 3, `Stage needs evidence items: ${locale}/${stage.id}`);
    assert.ok(stage.gate.length >= 60, `Stage needs an exit gate: ${locale}/${stage.id}`);
    assert.ok(stage.courses.every((slug) => courseSlugs.has(slug)), `Unknown course in stage: ${locale}/${stage.id}`);
  }

  for (const track of program.tracks) {
    assert.ok(track.stages.every((stage) => stageIds.has(stage)), `Unknown stage in track: ${locale}/${track.id}`);
  }
}

console.log("Verified complete AI program roadmap in ES/EN.");
