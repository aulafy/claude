import assert from "node:assert/strict";
import fs from "node:fs";

const content = JSON.parse(fs.readFileSync("lib/english-lesson-content.json", "utf8"));
const allowedTypes = new Set(["h2", "h3", "p", "bullet", "code"]);
const spanishInReadingText = /[¿¡]|\b(para|con|sin|desde|después|antes|cómo|qué|crear|ejecuta|prueba|revisa|archivo|proyecto|cambios|respuesta|usuario|herramienta|configuración|instrucciones)\b/i;
const keys = new Set();

assert.ok(content.lessons.length > 0, "English lesson content must not be empty");
for (const lesson of content.lessons) {
  const key = `${lesson.courseSlug}/${lesson.slug}`;
  assert.ok(!keys.has(key), `Duplicate English lesson: ${key}`);
  keys.add(key);
  assert.ok(lesson.title.trim(), `Missing English title: ${key}`);
  assert.ok(Array.isArray(lesson.blocks) && lesson.blocks.length > 0, `Missing blocks: ${key}`);
  for (const block of lesson.blocks) {
    assert.ok(allowedTypes.has(block.type), `Invalid block type in ${key}`);
    assert.ok(block.text.trim(), `Empty block in ${key}`);
    if (block.type !== "code") {
      assert.ok(!spanishInReadingText.test(block.text), `Spanish reading text remains in ${key}`);
    }
  }
}

console.log(`Verified ${content.lessons.length} English lessons.`);
