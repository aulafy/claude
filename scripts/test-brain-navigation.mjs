import assert from "node:assert/strict";
import fs from "node:fs";

const footer = fs.readFileSync("components/Footer.tsx", "utf8");
const spanishPath = fs.readFileSync("app/mi-ruta/page.tsx", "utf8");
const englishPath = fs.readFileSync("app/en/my-path/page.tsx", "utf8");
assert.match(footer, /\["\/brain", "Aulafy Brain"\]/);
assert.match(footer, /\["\/en\/brain", "Aulafy Brain"\]/);
assert.match(spanishPath, /href="\/brain"/);
assert.match(englishPath, /href="\/en\/brain"/);
console.log("Brain navigation contract passed: bilingual footer and starter-path links.");
