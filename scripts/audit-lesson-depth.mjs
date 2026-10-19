#!/usr/bin/env node
// Mide la profundidad real de las lecciones publicadas y regenera `lib/course-depth.ts`.
// Uso: node scripts/audit-lesson-depth.mjs [--base=https://www.aulafy.net] [--write] [--fail-on-regression]
// Una lección «propia» excluye las frases que se repiten en 8 o más lecciones (plantillas y cierres genéricos).
import fs from "node:fs";

const arg = (k, d) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || "").split("=")[1] ?? d;
const base = arg("base", "https://www.aulafy.net").replace(/\/$/, "");
const write = process.argv.includes("--write");
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, "")).filter((u) => /^\/cursos\/[^/]+\/[^/]+$/.test(u));

async function measure(path) {
  const html = await (await fetch(base + path)).text();
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0].replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<nav[\s\S]*?<\/nav>|<aside[\s\S]*?<\/aside>/g, "");
  const code = (main.match(/<pre/g) || []).length;
  const text = main.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, " ").split(/\s+/).filter(Boolean).join(" ");
  return { path, code, sents: text.split(/(?<=[.!?])\s+/).filter((s) => s.length > 40) };
}
const out = [];
for (let i = 0; i < urls.length; i += 10) out.push(...(await Promise.all(urls.slice(i, i + 10).map(measure))));
const seen = new Map();
for (const r of out) for (const s of new Set(r.sents)) seen.set(s, (seen.get(s) || 0) + 1);
const byCourse = {};
for (const r of out) {
  const own = r.sents.filter((s) => seen.get(s) < 8).reduce((a, s) => a + s.split(" ").length, 0);
  (byCourse[r.path.split("/")[2]] ||= []).push({ own, code: r.code });
}
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const measures = Object.fromEntries(Object.entries(byCourse).sort().map(([c, l]) => [c, { lessons: l.length, medianWords: median(l.map((x) => x.own)), minWords: Math.min(...l.map((x) => x.own)), codeBlocks: l.reduce((a, x) => a + x.code, 0), thinLessons: l.filter((x) => x.own < 250).length }]));
console.log("curso · lecciones · mediana · mín · código · <250");
for (const [c, m] of Object.entries(measures)) console.log(c, m.lessons, m.medianWords, m.minWords, m.codeBlocks, m.thinLessons);
if (write) {
  const p = new URL("../lib/course-depth.ts", import.meta.url);
  let s = fs.readFileSync(p, "utf8");
  s = s.replace(/const MEASURES[\s\S]*?;\n\nexport function depthOf/, `const MEASURES: Record<string, Omit<CourseDepthRecord, "depth" | "measuredAt">> = ${JSON.stringify(measures, null, 2)};\n\nexport function depthOf`);
  s = s.replace(/DEPTH_MEASURED_AT = "[^"]+"/, `DEPTH_MEASURED_AT = "${new Date().toISOString().slice(0, 10)}"`);
  fs.writeFileSync(p, s); console.log("lib/course-depth.ts actualizado");
}
