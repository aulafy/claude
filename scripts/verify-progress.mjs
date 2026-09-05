import assert from "node:assert/strict";
import fs from "node:fs";

const publicRuntimeFiles = ["app", "components", "proxy.ts"];
const sourceFiles = publicRuntimeFiles.flatMap((entry) => {
  if (fs.statSync(entry).isFile()) return [entry];
  return fs.readdirSync(entry, { recursive: true })
    .filter((file) => /\.(?:ts|tsx|js|jsx)$/.test(file))
    .map((file) => `${entry}/${file}`);
});
const publicRuntime = sourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const practiceData = fs.readFileSync("lib/sessionless-practices.ts", "utf8");
const courseData = fs.readFileSync("lib/ia-basics-course-content.ts", "utf8");
const practiceUi = fs.readFileSync("components/SessionlessPractice.tsx", "utf8");
const proxy = fs.readFileSync("proxy.ts", "utf8");

assert.doesNotMatch(publicRuntime, /localStorage|sessionStorage|document\.cookie/, "Public UI must not persist learner state");
assert.doesNotMatch(proxy, /refreshSupabaseSession|response\.cookies|request\.cookies/, "Public middleware must not create or renew sessions");
assert.match(proxy, /if \(isSocialRoute\(request\.nextUrl\.pathname\)\)/, "Account and community routes must stay disabled in the static stage");
assert.match(practiceUi, /useState/, "Practices may keep answers only in temporary component memory");
assert.doesNotMatch(practiceUi, /fetch\(|\/api\//, "Practices must not send learner answers to a server");
const lessonSlugs = Array.from(courseData.matchAll(/^\s+slug: "([a-z0-9-]+)",$/gm), (match) => match[1]);
const practiceSlugs = Array.from(practiceData.matchAll(/^  "([a-z0-9-]+)": \{$/gm), (match) => match[1]);
assert.deepEqual(
  practiceSlugs.sort(),
  lessonSlugs.sort(),
  "Every IA desde cero lesson must have exactly one sessionless practice",
);
assert.match(practiceUi, /Los pasos y respuestas usan memoria temporal/, "Legacy practice UI must distinguish temporary answers from optional saved evidence");
const beginnerPractice = fs.readFileSync("components/beginner/Practice.tsx", "utf8");
assert.doesNotMatch(beginnerPractice, /localStorage|sessionStorage|document\.cookie|fetch\(|sendBeacon/, "Beginner exercises must not persist or transmit answers");
assert.match(beginnerPractice, /not saved automatically/, "Beginner practice must explain that work is not automatically saved");

console.log("Verified temporary beginner practice, legacy local-evidence disclosure, disabled account routes, and no answer transmission.");
