#!/usr/bin/env node
// Revisa las lecciones MDX publicadas contra docs/ESTANDAR-LECCION-RIGUROSA.md.
// Por defecto informa (avisos); con --strict falla si alguna lección publicada incumple.
import fs from "node:fs";
import path from "node:path";

const strict = process.argv.includes("--strict");
const root = path.resolve(process.cwd(), "content");
const files = [];
(function walk(d) { for (const e of fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }) : []) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name === "lesson.mdx") files.push(p); } })(root);

const REQUIRED = [["Objetivo", /^##\s+Objetivo/mi], ["Antes de empezar", /^##\s+Antes de empezar/mi], ["Pasos", /^##\s+Pasos/mi], ["Comprueba que funciona", /^##\s+Comprueba que funciona/mi], ["Errores frecuentes", /^##\s+Errores frecuentes/mi], ["Fuentes", /^##\s+Fuentes/mi]];
let published = 0, failing = 0;
for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  if (!/^status:\s*published/m.test(fm)) continue;
  published++;
  const body = raw.replace(/^---[\s\S]*?---/, "");
  const problems = [];
  for (const [name, re] of REQUIRED) if (!re.test(body)) problems.push(`falta la sección «${name}»`);
  const words = body.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  if (words < 600) problems.push(`solo ${words} palabras propias (mínimo 600)`);
  if (!/```/.test(body)) problems.push("no tiene ningún bloque de código ni de salida esperada");
  if (!/\d{4}-\d{2}-\d{2}/.test(body.split(/##\s+Fuentes/i)[1] ?? "")) problems.push("las fuentes no indican fecha de consulta");
  if (problems.length) { failing++; console.log(`✖ ${path.relative(process.cwd(), f)}\n   - ${problems.join("\n   - ")}`); }
}
console.log(`\nLecciones MDX publicadas: ${published} · que incumplen el estándar: ${failing}`);
if (strict && failing) process.exitCode = 1;
