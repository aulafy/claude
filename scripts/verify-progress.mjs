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
const practiceUi = fs.readFileSync("components/SessionlessPractice.tsx", "utf8");
const proxy = fs.readFileSync("proxy.ts", "utf8");

assert.doesNotMatch(publicRuntime, /localStorage|sessionStorage|document\.cookie/, "Public UI must not persist learner state");
assert.doesNotMatch(proxy, /refreshSupabaseSession|response\.cookies|request\.cookies/, "Public middleware must not create or renew sessions");
assert.match(proxy, /if \(isSocialRoute\(request\.nextUrl\.pathname\)\)/, "Account and community routes must stay disabled in the static stage");
assert.match(practiceUi, /useState/, "Practices may keep answers only in temporary component memory");
assert.doesNotMatch(practiceUi, /fetch\(|\/api\//, "Practices must not send learner answers to a server");
assert.equal((practiceData.match(/^  "[a-z0-9-]+": \{$/gm) ?? []).length, 10, "IA desde cero needs ten sessionless practices");
assert.match(practiceUi, /Al recargar, olvida las respuestas/, "Practice UI must state its reset behavior");

console.log("Verified sessionless learning: no browser persistence, tracking cookies, account routes, or answer transmission.");
