import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const textFiles = [
  "app",
  "components",
  "lib",
  "README.md",
].flatMap((entry) => collect(entry));

function collect(entry) {
  const full = path.join(root, entry);
  if (!fs.existsSync(full)) return [];
  const stat = fs.statSync(full);
  if (stat.isFile()) return [entry];
  return fs.readdirSync(full).flatMap((child) => collect(path.join(entry, child)));
}

function isTextFile(file) {
  return /\.(tsx?|jsx?|json|md|mjs|cjs|css)$/.test(file);
}

const corpus = textFiles
  .filter(isTextFile)
  .map((file) => fs.readFileSync(path.join(root, file), "utf8"))
  .join("\n");

assert.ok(!corpus.includes("github.com/raym33/"), "Old raym33 GitHub URLs must not remain in site sources.");
assert.ok(!corpus.includes("raym33/"), "Old raym33 repository labels must not remain in site sources.");
assert.ok(!corpus.includes("/acerca-de"), "Broken /acerca-de link must not remain.");

const requiredPublicUrls = [
  "https://github.com/aulafy/claude",
  "https://github.com/aulafy/r",
  "https://github.com/aulafy/lexia",
];

for (const url of requiredPublicUrls) {
  const response = await fetch(url, { method: "HEAD", redirect: "follow" });
  assert.ok(response.ok, `Main public link failed: ${url} -> ${response.status}`);
}

console.log(`Verified ${requiredPublicUrls.length} public GitHub links and no stale raym33 references.`);
