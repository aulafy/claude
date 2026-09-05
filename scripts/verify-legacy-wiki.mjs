import assert from "node:assert/strict";
import { cursos, lecciones } from "../lib/cursos.ts";
import { blogPosts } from "../lib/blog.ts";
import { getEnglishLessonSlug } from "../lib/course-lesson-routing.ts";

const base = process.env.LEGACY_WIKI_BASE_URL ?? "http://127.0.0.1:4197";
const destinations = new Set();
for (const english of [false, true]) {
  const route = english ? "/en/wiki" : "/wiki";
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200, route);
  assert.equal(response.headers.has("set-cookie"), false);
  const html = await response.text();
  for (const course of cursos) {
    const translated = english && course.availableInEnglish !== false;
    const prefix = `${translated ? "/en/courses" : "/cursos"}/${course.slug}`;
    for (const href of [prefix, ...lecciones(course).map((lesson) => `${prefix}/${translated ? getEnglishLessonSlug(course.slug, lesson.slug) : lesson.slug}`)]) {
      assert.ok(html.includes(`href="${href}"`), `Missing wiki link: ${href}`);
      destinations.add(href);
    }
  }
  for (const post of blogPosts) {
    const href = `/blog/${post.slug}`;
    assert.ok(html.includes(`href="${href}"`), `Missing article: ${href}`);
    destinations.add(href);
  }
  const filtered = await (await fetch(`${base}${route}?q=Ollama`)).text();
  assert.ok(filtered.includes('name="robots" content="noindex, follow"'));
  assert.ok(filtered.includes("Ollama"));
  const empty = await (await fetch(`${base}${route}?q=zzzznotatopic`)).text();
  assert.ok(empty.includes(english ? "No matching content" : "No hay contenido que coincida"));
  const home = await fetch(`${base}${english ? "/en" : "/"}`);
  assert.equal(home.status, 503);
  assert.ok((await home.text()).includes(`href="${route}"`));
}
if (process.argv.includes("--links")) {
  const pending = [...destinations];
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (pending.length) {
      const href = pending.pop();
      const response = await fetch(`${base}${href}`);
      await response.arrayBuffer();
      assert.equal(response.status, 200, href);
    }
  }));
}
console.log(`Wiki verified: every catalog course, lesson and article linked in ES/EN; ${destinations.size} unique destinations; search, empty state, cookie-free responses and maintenance entry links.`);
