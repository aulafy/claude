#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checkedOn = "2026-07-18";
const scanRoots = ["app", "components", "lib", "public/recursos", "docs", "scripts", "README.md"];
const ignoredDirectories = new Set(["node_modules", ".next", ".git", "output"]);

const auditPath = "docs/audits/modelos-y-herramientas-2026-07-18.md";
const forbiddenReferences = [
  "translategemma-4b-it",
  "qwen/qwen3-4b-instruct",
  "gemma-local-fast",
  "qwen-coder/local",
  'model: "qwen-coder"',
];

function walk(target) {
  const absolute = path.join(root, target);
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirectories.has(entry.name)) return [];
    return walk(path.join(target, entry.name));
  });
}

const failures = [];
const audit = fs.readFileSync(path.join(root, auditPath), "utf8");
if (!audit.includes(checkedOn) || !audit.includes("Fuente primaria")) {
  failures.push(`${auditPath}: falta fecha o fuentes primarias de la auditoría.`);
}
for (const file of scanRoots.flatMap(walk)) {
  if (!/\.(?:[cm]?[jt]sx?|json|md|txt)$/i.test(file) && path.basename(file) !== "README.md") continue;
  const relative = path.relative(root, file);
  if (relative === auditPath || relative === "scripts/verify-model-references.mjs") continue;
  const content = fs.readFileSync(file, "utf8");
  for (const reference of forbiddenReferences) {
    if (content.toLowerCase().includes(reference)) {
      failures.push(`${relative}: conserva una referencia no verificable (\"${reference}\").`);
    }
  }
}

if (failures.length) {
  console.error("Referencias de modelo sin fuente primaria registrada:");
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`OK: auditoría de modelos registrada y referencias no verificables bloqueadas (${checkedOn}).`);
