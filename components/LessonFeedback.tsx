"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { Locale } from "@/lib/i18n";
import { trackLearningEvent } from "@/lib/learning-events";

const ISSUE_BASE = "https://github.com/aulafy/claude/issues/new";

const copy = {
  es: {
    label: "Reportar error",
    title: "Error en una lección de Aulafy",
    body: "Describe qué has encontrado, qué esperabas ver y, si puedes, añade captura o comando de verificación.",
    context: "Contexto",
    question: "¿Te ha servido esta lección?",
    useful: "Sí, me ha servido",
    thanks: "Gracias. La valoración queda solo como contador en este dispositivo.",
  },
  en: {
    label: "Report issue",
    title: "Issue in an Aulafy lesson",
    body: "Describe what you found, what you expected, and add a screenshot or verification command if possible.",
    context: "Context",
    question: "Was this lesson useful?",
    useful: "Yes, it was useful",
    thanks: "Thanks. This rating stays only as a counter on this device.",
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
  const [rated, setRated] = useState(false);
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
    <aside className="lesson-feedback aula-shell max-w-4xl mx-auto px-6 sm:px-8 pb-10" aria-label={text.question}>
      <div>
        <div className="lesson-feedback__question">
          <Icon name="chat" />
          <div>
            <strong>{text.question}</strong>
            <span>{rated ? text.thanks : (locale === "en" ? "One click, no text or account." : "Un clic, sin texto ni cuenta.")}</span>
          </div>
        </div>
        <div className="lesson-feedback__actions">
          <button type="button" disabled={rated} onClick={() => { trackLearningEvent("feedback_useful"); setRated(true); }} className="aula-button aula-button-primary">
            <Icon name={rated ? "check" : "star"} /> {rated ? (locale === "en" ? "Rated" : "Valorada") : text.useful}
          </button>
          <a href={`${ISSUE_BASE}?${params.toString()}`} className="aula-button aula-button-secondary" target="_blank" rel="noreferrer">
            <Icon name="warning" /> {text.label}
          </a>
        </div>
      </div>
    </aside>
  );
}
