"use client";

import { useState } from "react";
import Link from "next/link";
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
    answer: "Orientación propuesta",
  },
  en: {
    eyebrow: "AULAFY GUIDE / NO SIGN-UP",
    title: "What do you need to achieve?",
    intro: "Choose a situation or tell the tutor. You will reach a specific lesson, not another catalogue.",
    custom: "My goal is different",
    label: "Describe your goal",
    placeholder: "For example: I work in operations and want to save time reviewing invoices…",
    answer: "Suggested direction",
  },
} satisfies Record<Locale, Record<string, string>>;

function chooseStartingPoint(text: string, points: StartingPoint[], locale: Locale) {
  const normalized = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const rules = locale === "es"
    ? [
        { index: 1, words: ["empresa", "pyme", "trabajo", "oficina", "factura", "cliente", "negocio", "autonomo", "administracion", "clinica", "abogado"] },
        { index: 2, words: ["programar", "codigo", "codex", "repo", "github", "app", "automatizar", "developer"] },
        { index: 3, words: ["web", "landing", "pagina", "saas", "vercel", "supabase", "tienda"] },
        { index: 0, words: ["cero", "principiante", "empezar", "estudiante", "universidad", "prompt", "chatgpt", "claude"] },
      ]
    : [
        { index: 1, words: ["business", "work", "office", "invoice", "customer", "company", "clinic", "legal"] },
        { index: 2, words: ["code", "coding", "codex", "repo", "github", "developer", "automation"] },
        { index: 3, words: ["web", "landing", "website", "saas", "vercel", "supabase"] },
        { index: 0, words: ["zero", "beginner", "start", "student", "university", "prompt", "chatgpt", "claude"] },
      ];

  const match = rules.find((rule) => rule.words.some((word) => normalized.includes(word)));
  return points[match?.index ?? 0];
}

export default function LandingLearningGuide({ locale = "es" }: { locale?: Locale }) {
  const copy = COPY[locale];
  const points = STARTING_POINTS[locale];
  const [selected, setSelected] = useState<number | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [question, setQuestion] = useState("");
  const typedRecommendation = question.trim() ? chooseStartingPoint(question, points, locale) : null;

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
          <form>
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
              <span>{locale === "es" ? "Orientación local" : "Local guidance"}</span>
            </div>
          </form>
          <p className={styles.privacy}>
            {locale === "es"
              ? "Esta caja no envía nada a una API: solo ayuda a elegir una puerta de entrada. No pegues datos personales."
              : "This box does not send anything to an API: it only helps choose an entry point. Do not paste personal data."}
          </p>
        </div>
      ) : null}

      {typedRecommendation ? (
        <div className={styles.answer} aria-live="polite">
          <strong>{copy.answer}</strong>
          <p>{typedRecommendation.detail}</p>
          <Link href={typedRecommendation.href}>{typedRecommendation.action} <span aria-hidden="true">↗</span></Link>
        </div>
      ) : null}
    </section>
  );
}
