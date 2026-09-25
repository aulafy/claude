"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import ContinueLearning from "@/components/ContinueLearning";
import LanguageSwitch from "@/components/LanguageSwitch";
import styles from "@/components/AulafyNexusLanding.module.css";
import { trackLearningEvent } from "@/lib/learning-events";
import { siteNav } from "@/lib/site-nav";
import { primaryDestinations } from "@/lib/information-architecture";

type LandingLocale = "es" | "en";

const businessGuide = {
  es: {
    eyebrow: "Guía para empresas",
    title: "Cómo implementar IA en una pyme, paso a paso.",
    lead: "Empieza por un problema medible y termina con un flujo que una persona pueda supervisar, detener y mejorar.",
    note: "Recorrido recomendado · 6 decisiones · datos ficticios para practicar",
    steps: [
      { number: "01", title: "Entiende el proceso", text: "Mapea quién hace qué, dónde se espera y qué error cuesta dinero antes de elegir una herramienta.", href: "/cursos/ia-pymes/diagnostico-piloto", action: "Hacer el diagnóstico" },
      { number: "02", title: "Protege los datos", text: "Clasifica la información, minimiza lo que envías y define qué debe permanecer local o restringido.", href: "/cursos/ia-pymes/rgpd-basico", action: "Definir límites" },
      { number: "03", title: "Diseña un piloto reversible", text: "Acota una tarea, fija fuentes y criterios de abstención, y conserva el proceso anterior como respaldo.", href: "/cursos/ia-pymes/flujo-fiable", action: "Construir el piloto" },
      { number: "04", title: "Mide antes de automatizar", text: "Prueba casos normales, ambiguos y adversos. Compara calidad, tiempo, coste y errores con la situación inicial.", href: "/cursos/ia-pymes/pruebas-metricas", action: "Preparar las pruebas" },
      { number: "05", title: "Opera con seguridad", text: "Asigna responsable, registros, copias, alertas, revisión humana y un modo degradado que siga funcionando.", href: "/cursos/ia-pymes/operacion-minima", action: "Preparar operación" },
      { number: "06", title: "Escala solo lo demostrado", text: "Amplía permisos y automatización cuando el piloto tenga evidencia, control de costes y una salida clara.", href: "/cursos/ia-pymes/permisos-agentes", action: "Decidir el siguiente paso" },
    ],
    primary: { href: "/cursos/ia-pymes", label: "Abrir la guía completa para pymes" },
    secondary: { href: "/en/courses/ai-consultant", label: "Ver AI Consultant en inglés" },
  },
  en: {
    eyebrow: "Small business guide",
    title: "How to implement AI in a small business, step by step.",
    lead: "Start with a measurable problem and finish with a workflow that a person can supervise, stop, and improve.",
    note: "Recommended path · 6 decisions · fictional data for practice",
    steps: [
      { number: "01", title: "Understand the process", text: "Map who does what, where work waits, and which failure costs money before choosing a tool.", href: "/en/courses/ai-consultant/read-a-business-before-ai", action: "Map the business" },
      { number: "02", title: "Protect the data", text: "Classify information, minimise what you send, and decide what must remain local or restricted.", href: "/en/courses/ia-pymes/rgpd-basico", action: "Set data boundaries" },
      { number: "03", title: "Design a reversible pilot", text: "Limit one task, define sources and abstention rules, and keep the previous process as a fallback.", href: "/en/courses/ia-pymes/flujo-fiable", action: "Design the pilot" },
      { number: "04", title: "Measure before automating", text: "Test normal, ambiguous, and adverse cases. Compare quality, time, cost, and errors with the baseline.", href: "/en/courses/ia-pymes/pruebas-metricas", action: "Build the test set" },
      { number: "05", title: "Operate it safely", text: "Assign an owner, logs, backups, alerts, human review, and a degraded mode that still works.", href: "/en/courses/ia-pymes/operacion-minima", action: "Prepare operations" },
      { number: "06", title: "Scale proven value", text: "Expand permissions and automation only when the pilot has evidence, cost controls, and a clear exit path.", href: "/en/courses/ai-consultant/ai-consultant-operating-model", action: "Plan the engagement" },
    ],
    primary: { href: "/en/courses/ai-consultant", label: "Open the AI Consultant course" },
    secondary: { href: "/en/courses/ia-pymes", label: "Explore AI for small businesses" },
  },
} as const;

const copy = {
  es: {
    skip: "Saltar al contenido",
    edition: "Educación abierta e independiente",
    topic: "Inteligencia artificial · Guías prácticas · Español e inglés",
    heroLabel: "Aprendizaje práctico, abierto y sin registro",
    title: "Aprende IA paso a paso, desde cero hasta aplicarla de verdad.",
    lead: "Elige lo que quieres conseguir y sigue una ruta clara con explicaciones, prácticas y fuentes. Empieza sin programar y avanza hasta proyectos, automatizaciones y sistemas reales.",
    primaryCta: "Elegir mi ruta",
    secondaryCta: "Buscar un tema",
    assurances: ["Gratis", "Sin registro", "Progreso en tu navegador", "Fuentes visibles"],
    briefLabel: "Tu primera sesión",
    briefTitle: "Una tarea pequeña. Un resultado comprobable.",
    briefSteps: ["Elige algo que necesites resolver hoy.", "Pide un borrador, no una decisión final.", "Revisa, corrige y guarda la evidencia."],
    briefAction: "Abrir la misión guiada",
    visualAlt: "Mapa visual de un flujo de inteligencia artificial para una pyme",
    visualLabel: "Ruta destacada",
    sectionLabel: "El camino de Aulafy",
    sectionTitle: "Aprende IA en 3 niveles",
    sectionLead: "Si nunca has usado IA, empieza por el nivel 1. Si ya tienes base, salta al 2 o al 3. Todo lo demás está en la Biblioteca.",
    choices: [
      {
        number: "01",
        label: "Nivel 1 · Empieza",
        title: "Entender la IA desde cero",
        text: "Aprende qué puede hacer, cómo pedir resultados útiles y cómo detectar errores antes de confiar.",
        href: "/empezar",
        action: "Crear mi primera ruta",
      },
      {
        number: "02",
        label: "Nivel 2 · Aplica",
        title: "Aplicarla en mi trabajo",
        text: "Evalúa procesos, documentos, datos y automatizaciones con privacidad y revisión humana.",
        href: "/cursos/ia-pymes/diagnostico-piloto",
        action: "Empezar el diagnóstico",
      },
      {
        number: "03",
        label: "Nivel 3 · Construye",
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
    heroLabel: "Practical, open learning with no sign-up",
    title: "Learn AI step by step, from the basics to real-world use.",
    lead: "Choose what you want to achieve and follow a clear path with explanations, practice, and sources. Start without coding and progress to projects, automation, and production systems.",
    primaryCta: "Choose my path",
    secondaryCta: "Search a topic",
    assurances: ["Free", "No sign-up", "Progress in your browser", "Visible sources"],
    briefLabel: "Your first session",
    briefTitle: "One small task. One result you can verify.",
    briefSteps: ["Choose something you need to solve today.", "Ask for a draft, not a final decision.", "Review, correct, and save the evidence."],
    briefAction: "Open the guided mission",
    visualAlt: "Visual map of an artificial intelligence workflow for a small business",
    visualLabel: "Featured path",
    sectionLabel: "Choose your path",
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
  const guide = businessGuide[locale];
  const nav = siteNav(locale);
  const destinations = primaryDestinations(locale);
  const english = locale === "en";
  const siteUrl = "https://www.aulafy.net";
  const pageUrl = `${siteUrl}${english ? "/en" : "/"}`;
  const guideStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: text.title,
        description: text.lead,
        inLanguage: locale,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#small-business-guide` },
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#small-business-guide`,
        name: guide.title,
        description: guide.lead,
        inLanguage: locale,
        isAccessibleForFree: true,
        url: `${pageUrl}#business-guide-title`,
        step: guide.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.text,
          url: `${siteUrl}${step.href}`,
        })),
      },
    ],
  };

  useEffect(() => {
    trackLearningEvent("landing_view");
  }, []);

  return (
    <div className={styles.page} lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideStructuredData) }} />
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
            {destinations.map((item) => <Link key={item.id} href={item.href}>{item.label}</Link>)}
            <Link href={nav.search.href}>{nav.search.label}</Link>
          </nav>
          <div className={styles.controls}>
            <LanguageSwitch />
          </div>
        </div>
        <nav className={styles.mobileNav} aria-label={english ? "Mobile navigation" : "Navegación móvil"}>
          {destinations.map((item) => <Link key={item.id} href={item.href}>{item.label}</Link>)}
          <Link href={nav.search.href}>{nav.search.label}</Link>
        </nav>
      </header>

      <main id="main-content">
        <section className={styles.hero}>
          <article className={styles.leadStory}>
            <p className={styles.kicker}>{text.heroLabel}</p>
            <h1>{text.title}</h1>
            <p className={styles.lead}>{text.lead}</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href={nav.start.href}>{text.primaryCta}</Link>
              <Link className={styles.secondaryAction} href={nav.search.href}>{text.secondaryCta}</Link>
            </div>
            <ul className={styles.assurances} aria-label={english ? "Access conditions" : "Condiciones de acceso"}>
              {text.assurances.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <aside className={styles.brief} aria-labelledby="first-session-title">
            <div className={styles.heroVisual}>
              <Image
                src="/blog/ia-para-pymes-autonomos-casos-uso-2026.png"
                alt={text.visualAlt}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 42vw"
              />
              <span>{text.visualLabel}</span>
            </div>
            <div className={styles.briefContent}>
              <p>{text.briefLabel}</p>
              <h2 id="first-session-title">{text.briefTitle}</h2>
              <ol>
                {text.briefSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <Link href={nav.start.href}>{text.briefAction} <span aria-hidden="true">→</span></Link>
            </div>
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

        <section className={styles.businessGuide} aria-labelledby="business-guide-title">
          <header className={styles.businessGuideHeader}>
            <div>
              <p>{guide.eyebrow}</p>
              <h2 id="business-guide-title">{guide.title}</h2>
            </div>
            <div>
              <p>{guide.lead}</p>
              <small>{guide.note}</small>
            </div>
          </header>
          <ol className={styles.businessSteps}>
            {guide.steps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
                <Link href={step.href}>{step.action} <span aria-hidden="true">→</span></Link>
              </li>
            ))}
          </ol>
          <div className={styles.businessActions}>
            <Link className={styles.primaryAction} href={guide.primary.href}>{guide.primary.label}</Link>
            <Link className={styles.secondaryAction} href={guide.secondary.href}>{guide.secondary.label}</Link>
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
          <Link href={nav.courses.href}>{text.catalogue}</Link>
          <Link href="/acerca">{text.about}</Link>
          <a href="https://github.com/aulafy/claude" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}
