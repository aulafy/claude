"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { renderAssistantContent } from "@/components/ChatWidget";
import type { Locale } from "@/lib/i18n";
import styles from "@/components/LandingLearningGuide.module.css";

type StartingPoint = {
  label: string;
  detail: string;
  href: string;
  action: string;
};

const STARTING_POINTS: Record<Locale, StartingPoint[]> = {
  es: [
    {
      label: "Empiezo desde cero",
      detail: "Entiende qué puede hacer la IA y completa una primera tarea segura.",
      href: "/cursos/ia-desde-cero/que-puede-hacer-ia-generativa",
      action: "Abrir la primera lección",
    },
    {
      label: "Quiero usarla en mi trabajo",
      detail: "Detecta un problema útil y diseña un piloto pequeño para tu actividad.",
      href: "/cursos/ia-pymes/diagnostico-piloto",
      action: "Empezar el diagnóstico",
    },
    {
      label: "Quiero programar con IA",
      detail: "Aprende qué es un agente de código antes de darle acceso a tus archivos.",
      href: "/cursos/codex-desde-cero/que-es-codex",
      action: "Conocer Codex",
    },
    {
      label: "Quiero crear una web",
      detail: "Elige un problema, define el alcance y construye una web verificable.",
      href: "/cursos/crear-webs-con-ia/elegir-tipo-web",
      action: "Diseñar mi primera web",
    },
  ],
  en: [
    {
      label: "I am starting from zero",
      detail: "Understand what generative AI can do and complete a safe first task.",
      href: "/en/courses/ia-desde-cero",
      action: "Open AI basics",
    },
    {
      label: "I want to use AI at work",
      detail: "Find a useful problem and design a small, controlled pilot.",
      href: "/en/courses/ia-pymes",
      action: "Explore the business path",
    },
    {
      label: "I want to code with AI",
      detail: "Learn how to work with a coding agent while keeping control of changes.",
      href: "/en/courses/codex-programadores",
      action: "Open the Codex path",
    },
    {
      label: "I want to build a website",
      detail: "Start with the problem and scope before choosing tools or features.",
      href: "/en/paths",
      action: "Find a building path",
    },
  ],
};

const COPY = {
  es: {
    eyebrow: "ORIENTADOR AULAFY / SIN REGISTRO",
    title: "¿Qué necesitas conseguir?",
    intro: "Elige una situación o cuéntasela al tutor. Llegarás a una lección concreta, no a otro catálogo.",
    custom: "No encajo en esas opciones",
    label: "Describe tu objetivo",
    placeholder: "Por ejemplo: trabajo en administración y quiero ahorrar tiempo con facturas…",
    ask: "Preguntar al tutor",
    asking: "Buscando la mejor ruta…",
    answer: "Orientación propuesta",
    error: "El tutor no está disponible ahora. Puedes usar uno de los cuatro accesos anteriores.",
    privacy: "Aulafy no guarda esta conversación ni usa cookies. Groq procesa el texto para responder. No incluyas datos personales o confidenciales.",
    privacyLink: "Privacidad",
  },
  en: {
    eyebrow: "AULAFY GUIDE / NO SIGN-UP",
    title: "What do you need to achieve?",
    intro: "Choose a situation or tell the tutor. You will reach a specific lesson, not another catalogue.",
    custom: "My goal is different",
    label: "Describe your goal",
    placeholder: "For example: I work in operations and want to save time reviewing invoices…",
    ask: "Ask the tutor",
    asking: "Finding the best path…",
    answer: "Suggested direction",
    error: "The tutor is not available right now. You can still use one of the four direct routes above.",
    privacy: "Aulafy does not save this conversation or use cookies. Groq processes the text to answer. Do not include personal or confidential data.",
    privacyLink: "Privacy",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function LandingLearningGuide({ locale = "es" }: { locale?: Locale }) {
  const copy = COPY[locale];
  const points = STARTING_POINTS[locale];
  const [selected, setSelected] = useState<number | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function askTutor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = question.trim();
    if (!content || loading) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content }], locale }),
      });

      if (!response.ok || !response.body) throw new Error("Tutor unavailable");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setAnswer(accumulated);
      }

      if (!accumulated.trim()) throw new Error("Empty tutor response");
    } catch {
      setError(copy.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.guide} aria-labelledby="nx-guide-title">
      <div className={styles.head}>
        <p>{copy.eyebrow}</p>
        <span><i /> {locale === "es" ? "LISTO PARA ORIENTAR" : "READY TO GUIDE"}</span>
      </div>
      <h2 id="nx-guide-title">{copy.title}</h2>
      <p className={styles.intro}>{copy.intro}</p>

      <div className={styles.choices}>
        {points.map((point, index) => (
          <button
            type="button"
            key={point.label}
            aria-pressed={selected === index}
            className={selected === index ? styles.selected : ""}
            onClick={() => {
              setSelected(index);
              setShowQuestion(false);
            }}
          >
            <span>0{index + 1}</span>
            <strong>{point.label}</strong>
          </button>
        ))}
      </div>

      {selected !== null ? (
        <div className={styles.recommendation}>
          <p>{points[selected].detail}</p>
          <Link href={points[selected].href}>{points[selected].action} <span aria-hidden="true">↗</span></Link>
        </div>
      ) : null}

      <button
        type="button"
        className={styles.custom}
        aria-expanded={showQuestion}
        onClick={() => {
          setSelected(null);
          setShowQuestion((value) => !value);
        }}
      >
        {copy.custom} <span aria-hidden="true">{showQuestion ? "−" : "+"}</span>
      </button>

      {showQuestion ? (
        <div className={styles.question}>
          <form onSubmit={askTutor}>
            <label htmlFor="aulafy-learning-goal">{copy.label}</label>
            <textarea
              id="aulafy-learning-goal"
              value={question}
              maxLength={500}
              rows={3}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={copy.placeholder}
            />
            <div>
              <small>{question.length}/500</small>
              <button type="submit" disabled={loading || !question.trim()}>
                {loading ? copy.asking : copy.ask}
              </button>
            </div>
          </form>
          <p className={styles.privacy}>{copy.privacy} <Link href={locale === "es" ? "/privacidad" : "/en"}>{copy.privacyLink}</Link>.</p>
        </div>
      ) : null}

      {answer || error ? (
        <div className={`${styles.answer} ${error ? styles.error : ""}`} aria-live="polite">
          <strong>{copy.answer}</strong>
          <div>{error || renderAssistantContent(answer, locale)}</div>
        </div>
      ) : null}
    </section>
  );
}
