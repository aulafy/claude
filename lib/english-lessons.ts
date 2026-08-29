import englishLessonContent from "@/lib/english-lesson-content.json";
import { aiRouterLessons } from "@/lib/ai-router-course-content";
import { codexLessons } from "@/lib/codex-course-content";
import { foundationLessons } from "@/lib/foundation-course-content";
import { ollamaContextWindowLesson } from "@/lib/ollama-context-window-lesson";
import type { Curso, Seccion } from "@/lib/cursos";

export type EnglishLessonBlock = {
  type: "h2" | "h3" | "p" | "bullet" | "code" | "link";
  text: string;
  href?: string;
  external?: boolean;
};

export type EnglishLesson = {
  courseSlug: string;
  courseTitle: string;
  slug: string;
  title: string;
  heading?: string;
  description?: string;
  href: string;
  alternateRoute?: string | null;
  blocks: EnglishLessonBlock[];
};

const content = englishLessonContent as {
  generatedAt: string;
  source: string;
  lessons: EnglishLesson[];
};

const titleOverrides: Record<string, string> = {
  "claude-code/prompts": "Writing good prompts for Claude Code",
  "ia-local/ollama-gpu-windows": "Ollama Not Using GPU on Windows? NVIDIA, AMD & WSL2 Fixes",
  "ia-local/prompts": "Writing good prompts for local AI",
};

const descriptionOverrides: Record<string, string> = {
  "ia-local/ollama-gpu-windows": "Diagnose and fix Ollama running on CPU in Windows. Check NVIDIA or AMD drivers, VRAM, WSL2, Docker and logs step by step.",
};

const claudeCodeAugustUpdates: Record<string, EnglishLessonBlock[]> = {
  permisos: [
    { type: "h2", text: "August 2026 update: Auto mode is not bypass" },
    { type: "p", text: "Auto mode uses a classifier to decide whether an action can run or must stop. Availability and activation may depend on your account and managed policy. Do not assume every session starts in Auto mode: check /permissions or /config for the effective mode." },
    { type: "p", text: "Auto mode is a decision layer, not a safety guarantee. Keep secrets out of context, inspect git diff before publishing, and use an isolated environment for tasks that can delete data or modify production." },
    { type: "h3", text: "Verified sources" },
    { type: "p", text: "Review the current Anthropic IAM and CLI reference together with the Claude Code v2.1.233 release notes. This lesson was reviewed on August 16, 2026." },
  ],
  subagentes: [
    { type: "h2", text: "What changed in v2.1.232" },
    { type: "p", text: "A subagent with subagent_type: \"fork\" can inherit the full conversation and prompt cache. Non-teammate agent spawns from interactive sessions now run in the background by default." },
    { type: "p", text: "Do not treat every subagent as a fork. Use isolated subagents for bounded research or review, use a fork when the full history is necessary, and use /fork when you want a separate visible background session. More agents add cost and coordination; start with one." },
    { type: "h3", text: "Verified source" },
    { type: "p", text: "Claude Code v2.1.232 release notes, reviewed August 16, 2026." },
  ],
  flujos: [
    { type: "h2", text: "Cross-session messages" },
    { type: "p", text: "Since Claude Code v2.1.232, type @ in the prompt to mention another live session by name. Claude uses SendMessage to pass the finding directly. Use claude agents to inspect available sessions." },
    { type: "p", text: "Use /config to accept, hold, or refuse incoming messages. Send a concise finding rather than secrets or hidden decisions, and verify the receiving session's result before integration." },
    { type: "h3", text: "Verified source" },
    { type: "p", text: "Claude Code v2.1.232 and v2.1.224 release notes, reviewed August 16, 2026." },
  ],
};

const translatedLessons = content.lessons.map((lesson) => ({
  ...lesson,
  title: titleOverrides[`${lesson.courseSlug}/${lesson.slug}`] ?? lesson.title,
  blocks: lesson.courseSlug === "claude-code" && claudeCodeAugustUpdates[lesson.slug]
    ? [...lesson.blocks, ...claudeCodeAugustUpdates[lesson.slug]]
    : lesson.blocks,
}));

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

const troubleshootingBacklink: EnglishLessonBlock = {
  type: "link",
  text: "Model works but forgets earlier files or instructions? Check the context window Ollama actually loaded.",
  href: "/en/courses/ia-local/ollama-context-window-32k",
};

const lessonsWithContextBacklink = translatedLessons.map((lesson) =>
  lesson.courseSlug === "ia-local" && lesson.slug === "troubleshooting-ollama"
    ? { ...lesson, blocks: [...lesson.blocks, troubleshootingBacklink] }
    : lesson,
);

const allLessons = [
  ...lessonsWithContextBacklink,
  ollamaContextWindowLesson,
  ...codexEnglishLessons,
  ...foundationEnglishLessons,
  ...aiRouterEnglishLessons,
];
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

export function getEnglishLessonHeading(courseSlug: string, lessonSlug: string, fallback: string) {
  const lesson = getEnglishLesson(courseSlug, lessonSlug);
  return lesson?.heading ?? lesson?.title ?? fallback;
}

export function getEnglishCourseSections(course: Curso): Seccion[] {
  if (course.slug !== "ia-local") return course.secciones;

  return course.secciones.map((section) => {
    const insertionIndex = section.lecciones.findIndex((lesson) => lesson.slug === "troubleshooting-ollama");
    if (insertionIndex < 0) return section;
    return {
      ...section,
      lecciones: [
        ...section.lecciones.slice(0, insertionIndex + 1),
        { slug: ollamaContextWindowLesson.slug, title: ollamaContextWindowLesson.heading ?? ollamaContextWindowLesson.title },
        ...section.lecciones.slice(insertionIndex + 1),
      ],
    };
  });
}

export function getEnglishLessonDescription(lesson: EnglishLesson) {
  if (lesson.description) return lesson.description;
  const override = descriptionOverrides[`${lesson.courseSlug}/${lesson.slug}`];
  if (override) return override;
  const firstParagraph = lesson.blocks.find((block) => block.type === "p")?.text ?? lesson.title;
  if (firstParagraph.length <= 155) return firstParagraph;
  const trimmed = firstParagraph.slice(0, 152);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 110 ? lastSpace : 152)}...`;
}

export const englishLessonGeneratedAt = content.generatedAt;
