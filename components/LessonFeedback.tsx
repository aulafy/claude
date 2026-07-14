"use client";

import Icon from "@/components/Icon";
import type { Locale } from "@/lib/i18n";

const ISSUE_BASE = "https://github.com/aulafy/claude/issues/new";

const copy = {
  es: {
    label: "Reportar error",
    title: "Error en una lección de Aulafy",
    body: "Describe qué has encontrado, qué esperabas ver y, si puedes, añade captura o comando de verificación.",
    context: "Contexto",
  },
  en: {
    label: "Report issue",
    title: "Issue in an Aulafy lesson",
    body: "Describe what you found, what you expected, and add a screenshot or verification command if possible.",
    context: "Context",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function LessonFeedback({
  courseSlug,
  lessonSlug,
  locale = "es",
}: {
  courseSlug: string;
  lessonSlug: string;
  locale?: Locale;
}) {
  const text = copy[locale];
  const path = locale === "en"
    ? `/en/courses/${courseSlug}/${lessonSlug}`
    : `/cursos/${courseSlug}/${lessonSlug}`;
  const url = `https://www.aulafy.net${path}`;
  const params = new URLSearchParams({
    title: `${text.title}: ${courseSlug}/${lessonSlug}`,
    labels: "content,lesson",
    body: [
      `## ${text.context}`,
      `- URL: ${url}`,
      `- Curso: ${courseSlug}`,
      `- Lección: ${lessonSlug}`,
      `- Idioma: ${locale}`,
      "",
      "## Detalle",
      text.body,
    ].join("\n"),
  });

  return (
    <aside className="aula-shell max-w-4xl mx-auto px-6 sm:px-8 pb-10">
      <a href={`${ISSUE_BASE}?${params.toString()}`} className="aula-button aula-button-secondary" target="_blank" rel="noreferrer">
        <Icon name="warning" /> {text.label}
      </a>
    </aside>
  );
}
