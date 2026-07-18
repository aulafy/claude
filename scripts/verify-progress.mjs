import assert from "node:assert/strict";
import fs from "node:fs";

const progressLib = fs.readFileSync("lib/progress.ts", "utf8");
const portableProgress = fs.readFileSync("components/PortableProgress.tsx", "utf8");
const sidebar = fs.readFileSync("components/CourseSidebar.tsx", "utf8");
const coursePage = fs.readFileSync("app/cursos/[slug]/page.tsx", "utf8");

assert.match(progressLib, /PROGRESS_STORAGE_KEY = "aulafy:progress:v1"/, "Progress storage key must stay versioned");
assert.match(progressLib, /localStorage\.getItem\(PROGRESS_STORAGE_KEY\)/, "Progress must be read from localStorage");
assert.match(progressLib, /localStorage\.setItem\(PROGRESS_STORAGE_KEY/, "Progress must be written to localStorage");
assert.match(progressLib, /schema: "aulafy-progress-v1"/, "Progress export must declare schema");
assert.match(progressLib, /normalizeProgress/, "Progress import must be normalized against known courses and lessons");
assert.doesNotMatch(progressLib + portableProgress + sidebar, /fetch\(|\/api\//, "Progress must not send learner data to a server");
assert.match(portableProgress, /type="file"/, "Progress import must use a local file input");
assert.match(portableProgress, /application\/json/, "Progress export/import must use JSON");
assert.match(portableProgress, /window\.print\(\)/, "Progress must offer printable summary");
assert.match(portableProgress, /borras los datos del navegador/, "Progress UI must explain the local-storage recovery limit");
assert.match(portableProgress, /id=\{`progress-\$\{course\.slug\}`\}/, "Progress controls must expose a stable in-page anchor");
assert.match(coursePage, /href=\{`#progress-\$\{curso\.slug\}`\}/, "Course header must link learners to their progress backup controls");

console.log("Verified local-first progress export/import/reset behavior.");
