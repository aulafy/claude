import englishLessonContent from "@/lib/english-lesson-content.json";

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

const lessonsByKey = new Map(content.lessons.map((lesson) => [`${lesson.courseSlug}/${lesson.slug}`, lesson]));

export function getEnglishLesson(courseSlug: string, lessonSlug: string) {
  return lessonsByKey.get(`${courseSlug}/${lessonSlug}`);
}

export function getEnglishLessons() {
  return content.lessons;
}

export function getEnglishLessonsByCourse(courseSlug: string) {
  return content.lessons.filter((lesson) => lesson.courseSlug === courseSlug);
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
