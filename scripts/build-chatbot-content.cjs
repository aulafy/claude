const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const ebookPath = path.join(root, "tmp", "ebook", "ebook-content.json");
const outputPath = path.join(root, "lib", "chatbot-course-content.json");

require("./collect-ebook-content.cjs");

const ebook = JSON.parse(fs.readFileSync(ebookPath, "utf8"));

const MAX_LESSON_CHARS = 2600;
const MAX_CODE_CHARS = 900;

function cleanText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function trimText(text, max) {
  const clean = cleanText(text);
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

function renderBlocks(blocks) {
  const lines = [];
  for (const block of blocks || []) {
    const text = cleanText(block.text);
    if (!text) continue;
    if (block.type === "h2") lines.push(`## ${text}`);
    else if (block.type === "h3") lines.push(`### ${text}`);
    else if (block.type === "bullet") lines.push(`- ${text}`);
    else if (block.type === "code") lines.push(`Codigo: ${trimText(text, MAX_CODE_CHARS)}`);
    else lines.push(text);
  }
  return trimText(lines.join("\n"), MAX_LESSON_CHARS);
}

const generatedAt = new Date().toISOString().slice(0, 10);
const courses = ebook.courses.map((course) => ({
  slug: course.slug,
  title: course.title,
  short: cleanText(course.short),
  desc: cleanText(course.desc),
  level: course.level,
  href: `/cursos/${course.slug}`,
  lessonCount: course.lessons.length,
}));

const entries = [];

for (const course of ebook.courses) {
  entries.push({
    type: "course",
    course: course.title,
    title: course.title,
    href: `/cursos/${course.slug}`,
    text: trimText(
      [
        course.short,
        course.desc,
        `Nivel: ${course.level}.`,
        `Lecciones: ${course.lessons.map((lesson) => lesson.title).join("; ")}.`,
      ].join("\n"),
      2200
    ),
  });

  for (const lesson of course.lessons) {
    entries.push({
      type: "lesson",
      course: course.title,
      title: lesson.title,
      href: lesson.href,
      text: renderBlocks(lesson.blocks),
    });
  }
}

const data = {
  generatedAt,
  source: "scripts/collect-ebook-content.cjs",
  courses,
  entries,
};

fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Wrote ${outputPath} with ${courses.length} courses and ${entries.length} entries`);
