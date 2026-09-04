"use client";

import { useEffect } from "react";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import ContinueLearning from "@/components/ContinueLearning";
import LanguageSwitch from "@/components/LanguageSwitch";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "@/components/AulafyNexusLanding.module.css";
import { trackLearningEvent } from "@/lib/learning-events";
import { siteNav } from "@/lib/site-nav";

type LandingLocale = "es" | "en";

const copy = {
  es: {
    skip: "Saltar al contenido",
    edition: "Educación abierta e independiente",
    topic: "Inteligencia artificial · Guías prácticas · Español e inglés",
    title: "Aprende inteligencia artificial haciendo algo útil hoy.",
    lead: "En 15 minutos completarás una primera tarea, revisarás el resultado y sabrás cuál es tu siguiente paso. Sin registro y sin necesidad de programar.",
    primaryCta: "Empezar ahora",
    secondaryCta: "Explorar los cursos",
    assurances: ["Gratis", "Sin registro", "Progreso en tu navegador", "Fuentes visibles"],
    briefLabel: "Tu primera sesión",
    briefTitle: "Una tarea pequeña. Un resultado comprobable.",
    briefSteps: ["Elige algo que necesites resolver hoy.", "Pide un borrador, no una decisión final.", "Revisa, corrige y guarda la evidencia."],
    briefAction: "Abrir la misión guiada",
    sectionLabel: "Empieza por aquí",
    sectionTitle: "¿Qué quieres conseguir con IA?",
    sectionLead: "Elige por tu objetivo, no por el nombre de una tecnología.",
    choices: [
      {
        number: "01",
        label: "Principiantes",
        title: "Entender la IA desde cero",
        text: "Aprende qué puede hacer, cómo pedir resultados útiles y cómo detectar errores antes de confiar.",
        href: "/empezar",
        action: "Crear mi primera ruta",
      },
      {
        number: "02",
        label: "Trabajo y empresa",
        title: "Aplicarla en mi trabajo",
        text: "Evalúa procesos, documentos, datos y automatizaciones con privacidad y revisión humana.",
        href: "/cursos/ia-pymes/diagnostico-piloto",
        action: "Empezar el diagnóstico",
      },
      {
        number: "03",
        label: "Perfil técnico",
        title: "Construir software con IA",
        text: "Programa con agentes, conecta modelos locales y crea sistemas RAG y automatizaciones fiables.",
        href: "/cursos/claude-code",
        action: "Ver la ruta técnica",
      },
    ],
    count: (courses: number, lessons: number) => `${courses} cursos · ${lessons} lecciones abiertas`,
    catalogue: "Ver el catálogo completo",
    footer: "Aulafy publica educación abierta para aprender IA con criterio.",
    programme: "Programa de 28 lecciones",
    codex: "Curso de Codex",
    paths: "Rutas",
    about: "Acerca de Aulafy",
  },
  en: {
    skip: "Skip to content",
    edition: "Independent open education",
    topic: "Artificial intelligence · Practical guides · English and Spanish",
    title: "Learn artificial intelligence by doing something useful today.",
    lead: "In 15 minutes, complete a first task, review the result, and know your next step. No sign-up and no coding required.",
    primaryCta: "Start now",
    secondaryCta: "Explore courses",
    assurances: ["Free", "No sign-up", "Progress in your browser", "Visible sources"],
    briefLabel: "Your first session",
    briefTitle: "One small task. One result you can verify.",
    briefSteps: ["Choose something you need to solve today.", "Ask for a draft, not a final decision.", "Review, correct, and save the evidence."],
    briefAction: "Open the guided mission",
    sectionLabel: "Start here",
    sectionTitle: "What do you want to achieve with AI?",
    sectionLead: "Choose by outcome, not by the name of a technology.",
    choices: [
      {
        number: "01",
        label: "Beginners",
        title: "Understand AI from zero",
        text: "Learn what it can do, how to request useful results, and how to spot mistakes before relying on them.",
        href: "/en/start",
        action: "Create my first path",
      },
      {
        number: "02",
        label: "Work and business",
        title: "Apply it at work",
        text: "Evaluate processes, documents, data, and automation with privacy and human review.",
        href: "/en/courses/ia-pymes",
        action: "Start the assessment",
      },
      {
        number: "03",
        label: "Technical learners",
        title: "Build software with AI",
        text: "Code with agents, connect local models, and build reliable RAG systems and automations.",
        href: "/en/courses/claude-code",
        action: "View the technical path",
      },
    ],
    count: (courses: number, lessons: number) => `${courses} courses · ${lessons} open lessons`,
    catalogue: "View the full catalogue",
    footer: "Aulafy publishes open education for learning AI with judgment.",
    programme: "28-lesson programme",
    codex: "Codex course",
    paths: "Paths",
    about: "About Aulafy",
  },
} as const;

export default function AulafyNexusLanding({
  courseCount,
  lessonCount,
  locale = "es",
}: {
  courseCount: number;
  lessonCount: number;
  locale?: LandingLocale;
}) {
  const text = copy[locale];
  const nav = siteNav(locale);
  const english = locale === "en";

  useEffect(() => {
    trackLearningEvent("landing_view");
  }, []);

  return (
    <div className={styles.page} lang={locale}>
      <a className={styles.skip} href="#main-content">{text.skip}</a>

      <header className={styles.header}>
        <div className={styles.utility}>
          <span>{text.edition}</span>
          <span>{text.topic}</span>
        </div>
        <div className={styles.masthead}>
          <Link className={styles.brand} href={nav.home.href} aria-label="Aulafy">
            <BrandMark />
            <strong>Aulafy</strong>
          </Link>
        </div>
        <div className={styles.navRow}>
          <nav aria-label={english ? "Main navigation" : "Navegación principal"}>
            <ContinueLearning locale={locale} compact />
            <Link href={nav.start.href}>{nav.start.label}</Link>
            <Link href={nav.courses.href}>{nav.courses.label}</Link>
            <Link href={nav.search.href}>{nav.search.label}</Link>
          </nav>
          <div className={styles.controls}>
            <LanguageSwitch />
            <ThemeToggle compact />
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className={styles.hero}>
          <article className={styles.leadStory}>
            <p className={styles.kicker}>{text.sectionLabel}</p>
            <h1>{text.title}</h1>
            <p className={styles.lead}>{text.lead}</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href={nav.start.href}>{text.primaryCta}</Link>
              <Link className={styles.secondaryAction} href={nav.courses.href}>{text.secondaryCta}</Link>
            </div>
            <ul className={styles.assurances} aria-label={english ? "Access conditions" : "Condiciones de acceso"}>
              {text.assurances.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <aside className={styles.brief} aria-labelledby="first-session-title">
            <p>{text.briefLabel}</p>
            <h2 id="first-session-title">{text.briefTitle}</h2>
            <ol>
              {text.briefSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <Link href={nav.start.href}>{text.briefAction} <span aria-hidden="true">→</span></Link>
          </aside>
        </section>

        <div className={styles.continueWrap}><ContinueLearning locale={locale} /></div>

        <section className={styles.start} aria-labelledby="start-title">
          <header className={styles.sectionHeader}>
            <p>{text.sectionLabel}</p>
            <h2 id="start-title">{text.sectionTitle}</h2>
            <span>{text.sectionLead}</span>
          </header>
          <div className={styles.choiceGrid}>
            {text.choices.map((choice) => (
              <article className={styles.choice} key={choice.number}>
                <div><span>{choice.number}</span><small>{choice.label}</small></div>
                <h3>{choice.title}</h3>
                <p>{choice.text}</p>
                <Link href={choice.href}>{choice.action} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.catalogueLine} aria-label={text.catalogue}>
          <strong>{text.count(courseCount, lessonCount)}</strong>
          <span>{english ? "Free · Bilingual · No account" : "Gratis · Bilingüe · Sin cuenta"}</span>
          <Link href={nav.courses.href}>{text.catalogue} <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>{text.footer}</p>
        <nav aria-label={english ? "Project information" : "Información del proyecto"}>
          <Link href={english ? "/en/ai-course" : "/curso-ia"}>{text.programme}</Link>
          <Link href={english ? "/en/courses/codex-programadores" : "/curso-codex-espanol"}>{text.codex}</Link>
          <Link href={english ? "/en/paths" : "/rutas"}>{text.paths}</Link>
          <Link href="/acerca">{text.about}</Link>
          <a href="https://github.com/aulafy/claude" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}
