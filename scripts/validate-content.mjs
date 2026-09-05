import { createContentRegistry, loadContentRegistry } from "../lib/content/registry.ts";
import { validateContent } from "../lib/content/validation.ts";

const root = process.cwd();
const documents = loadContentRegistry(root);
const issues = validateContent(documents);
const counts = Object.fromEntries(["course", "lesson", "project"].map((type) => [type, documents.filter((document) => document.type === type).length]));
console.log("Aulafy Content Validation");
console.log(`Documents: ${documents.length}`);
console.log(`Courses: ${counts.course}  Lessons: ${counts.lesson}  Projects: ${counts.project}`);
for (const issue of issues) console.log(`${issue.severity.toUpperCase()} ${issue.sourcePath}\n  ${issue.message}`);
console.log(`Errors: ${issues.filter((issue) => issue.severity === "error").length}`);
console.log(`Warnings: ${issues.filter((issue) => issue.severity === "warning").length}`);
if (issues.some((issue) => issue.severity === "error")) process.exitCode = 1;
else console.log("PASS");

// Keep the command's registry construction explicit: this is the object M0.4 will consume.
createContentRegistry(documents);
