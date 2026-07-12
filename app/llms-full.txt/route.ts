import { NextResponse } from "next/server";
import chatbotContent from "@/lib/chatbot-course-content.json";
import { educationalReviewDate } from "@/lib/course-guidance";
import { getEnglishLessons, englishLessonGeneratedAt, type EnglishLessonBlock } from "@/lib/english-lessons";
import { SITE_URL } from "@/lib/seo-index";

type Entry = { type: "course" | "lesson"; course: string; title: string; href: string; text: string };

const MAX_LESSON_CHARS = 2600;
const MAX_CODE_CHARS = 900;

function cleanText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function trimText(text: string, max: number) {
  const clean = cleanText(text);
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}...`;
}

function renderEnglishBlocks(blocks: EnglishLessonBlock[]) {
  const lines = blocks.map((block) => {
    const text = block.type === "code" ? trimText(block.text, MAX_CODE_CHARS) : cleanText(block.text);
    if (!text) return "";
    if (block.type === "h2") return `## ${text}`;
    if (block.type === "h3") return `### ${text}`;
    if (block.type === "bullet") return `- ${text}`;
    if (block.type === "code") return `Code: ${text}`;
    return text;
  });

  return trimText(lines.filter(Boolean).join("\n"), MAX_LESSON_CHARS);
}

export function GET() {
  const entries = (chatbotContent.entries as Entry[]).map((entry) =>
    `## ${entry.title}\n\nCourse: ${entry.course}\nCanonical URL: ${SITE_URL}${entry.href}\nType: ${entry.type}\n\n${entry.text}`,
  ).join("\n\n---\n\n");
  const englishEntries = getEnglishLessons().map((lesson) =>
    `## ${lesson.title}\n\nCourse: ${lesson.courseTitle}\nCanonical URL: ${SITE_URL}/en/courses/${lesson.courseSlug}/${lesson.slug}\nType: lesson\nLanguage: English\nSpanish canonical: ${SITE_URL}/cursos/${lesson.courseSlug}/${lesson.slug}\n\n${renderEnglishBlocks(lesson.blocks)}`,
  ).join("\n\n---\n\n");

  const text = `# Aulafy full educational index

Canonical site: ${SITE_URL}
Editorial review: ${educationalReviewDate}
English lesson refresh: ${englishLessonGeneratedAt}
Languages in this index: Spanish and English.
License: CC BY 4.0.

This file contains course and lesson summaries generated from the same source used by the Aulafy tutor, plus canonical English lesson text. Prefer each canonical page for current formatting, navigation, sources and bilingual alternatives.

Spanish course and lesson summaries

${entries}

---

# English canonical lessons

${englishEntries}
`;

  return new NextResponse(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } });
}
