import englishLessonContent from "@/lib/english-lesson-content.json";
import { aiRouterLessons } from "@/lib/ai-router-course-content";
import { codexLessons } from "@/lib/codex-course-content";
import { foundationLessons } from "@/lib/foundation-course-content";

export type EnglishLessonBlock = {
  type: "h2" | "h3" | "p" | "bullet" | "code";
  text: string;
};

export type EnglishLesson = {
  courseSlug: string;
  courseTitle: string;
  slug: string;
  title: string;
  href: string;
  blocks: EnglishLessonBlock[];
};

const content = englishLessonContent as {
  generatedAt: string;
  source: string;
  lessons: EnglishLesson[];
};

const codexEnglishLessons: EnglishLesson[] = codexLessons.map((lesson) => ({
  courseSlug: "codex-programadores",
  courseTitle: "Codex for programmers",
  slug: lesson.slug,
  title: lesson.title.en,
  href: `/en/courses/codex-programadores/${lesson.slug}`,
  blocks: [{ type: "p", text: lesson.lead.en }, ...lesson.blocks.en],
}));

const foundationEnglishLessons: EnglishLesson[] = foundationLessons.map((lesson) => ({
  courseSlug: "fundamentos-aulafy",
  courseTitle: "Aulafy foundations",
  slug: lesson.slug,
  title: lesson.title.en,
  href: `/en/courses/fundamentos-aulafy/${lesson.slug}`,
  blocks: [{ type: "p", text: lesson.lead.en }, ...lesson.blocks.en],
}));

const aiRouterEnglishLessons: EnglishLesson[] = aiRouterLessons.map((lesson) => ({
  courseSlug: "ai-router",
  courseTitle: "AI Router and content system",
  slug: lesson.slug,
  title: lesson.title.en,
  href: `/en/courses/ai-router/${lesson.slug}`,
  blocks: [{ type: "p", text: lesson.lead.en }, ...lesson.blocks.en],
}));

const allLessons = [...content.lessons, ...codexEnglishLessons, ...foundationEnglishLessons, ...aiRouterEnglishLessons];
const lessonsByKey = new Map(allLessons.map((lesson) => [`${lesson.courseSlug}/${lesson.slug}`, lesson]));

export function getEnglishLesson(courseSlug: string, lessonSlug: string) {
  return lessonsByKey.get(`${courseSlug}/${lessonSlug}`);
}

export function getEnglishLessons() {
  return allLessons;
}

export function getEnglishLessonsByCourse(courseSlug: string) {
  return allLessons.filter((lesson) => lesson.courseSlug === courseSlug);
}

export function getEnglishLessonTitle(courseSlug: string, lessonSlug: string, fallback: string) {
  return getEnglishLesson(courseSlug, lessonSlug)?.title ?? fallback;
}

export function getEnglishLessonDescription(lesson: EnglishLesson) {
  const firstParagraph = lesson.blocks.find((block) => block.type === "p")?.text ?? lesson.title;
  if (firstParagraph.length <= 155) return firstParagraph;
  const trimmed = firstParagraph.slice(0, 152);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 110 ? lastSpace : 152)}...`;
}

export const englishLessonGeneratedAt = content.generatedAt;
