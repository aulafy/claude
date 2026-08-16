import assert from "node:assert/strict";
import { isExternalLearningSource } from "../lib/external-learning-link.ts";

const origin = "https://www.aulafy.net";
assert.equal(isExternalLearningSource("https://www.nist.gov/itl/ai-risk-management-framework", origin), true);
assert.equal(isExternalLearningSource("https://docs.anthropic.com/en/docs", origin), true);
assert.equal(isExternalLearningSource("https://github.com/modelcontextprotocol/specification", origin), true);
assert.equal(isExternalLearningSource("/cursos/ia-desde-cero", origin), false, "Internal routes are not external sources");
assert.equal(isExternalLearningSource("https://www.aulafy.net/blog", origin), false, "Canonical internal URLs are not external sources");
assert.equal(isExternalLearningSource("mailto:editor@example.com", origin), false);
assert.equal(isExternalLearningSource("javascript:alert(1)", origin), false);
assert.equal(isExternalLearningSource("https://x.com/learntouseai", origin), false, "Social links are not learning sources");
assert.equal(isExternalLearningSource("https://www.linkedin.com/in/example", origin), false, "Profile links are not learning sources");
assert.equal(isExternalLearningSource("https://github.com/aulafy/claude/issues/new?title=Error", origin), false, "Error reporting is not a source consultation");

console.log("External learning-source contract passed: documentation counts; internal, social, reporting, mail, and unsafe links do not.");
