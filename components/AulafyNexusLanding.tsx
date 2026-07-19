"use client";

import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import LandingLearningGuide from "@/components/LandingLearningGuide";
import styles from "@/components/AulafyNexusLanding.module.css";

type LandingLocale = "es" | "en";

const copy = {
  es: {
    skip: "Saltar al contenido",
    learn: "Cómo aprender",
    courses: "Cursos",
    title: <>Aprende IA<br /><span>sin perderte.</span></>,
    lead: "Aulafy convierte cientos de lecciones en un siguiente paso claro. Empieza desde cero, practica una tarea y avanza solo cuando lo necesites.",
    assurances: ["Gratis", "Sin registro", "En español"],
    pathEyebrow: "UN CAMINO · TRES NIVELES",
    pathTitle: "No tienes que aprenderlo todo.",
    pathLead: "Sigue el nivel que te corresponde hoy. Los temas avanzados pueden esperar.",
    levels: [
      { number: "1", label: "Empezar", title: "Entiende y usa la IA", text: "Para quien nunca ha usado un asistente o no sabe qué puede delegar.", result: "Primera tarea útil y verificada", href: "/cursos/ia-desde-cero", action: "Empezar desde cero" },
      { number: "2", label: "Construir", title: "Resuelve un problema real", text: "Elige trabajo, estudios, una web o programación y construye un proyecto pequeño.", result: "Proyecto que puedes enseñar", href: "/que-aprender-ia", action: "Elegir un objetivo" },
      { number: "3", label: "Profundizar", title: "Diseña sistemas fiables", text: "RAG, agentes, modelos locales, seguridad y operación para perfiles técnicos.", result: "Sistema probado y mantenible", href: "/rutas", action: "Ver nivel avanzado" },
    ],
    methodEyebrow: "MÉTODO AULAFY",
    methodTitle: "Una lección, una acción.",
    method: [
      { number: "01", title: "Entiende", text: "Lee solo lo necesario para tomar una decisión." },
      { number: "02", title: "Practica", text: "Haz una misión corta con un resultado visible." },
      { number: "03", title: "Comprueba", text: "Revisa fuentes, errores y qué podrías mejorar." },
    ],
    labTitle: "Aprende dentro de una situación real",
    labText: "En el laboratorio practicas una tarea de oficina o universidad recorriendo libreta, pantalla y revisión.",
    labAction: "Abrir laboratorio interactivo",
    count: (courses: number, lessons: number) => `${courses} cursos · ${lessons} lecciones abiertas`,
    footer: "Educación abierta para aprender inteligencia artificial con criterio.",
    sources: "Fuentes",
    about: "Acerca de Aulafy",
  },
  en: {
    skip: "Skip to content",
    learn: "How to learn",
    courses: "Courses",
    title: <>Learn AI<br /><span>without getting lost.</span></>,
    lead: "Aulafy turns hundreds of lessons into one clear next step. Start from zero, practise one task, and go deeper only when you need to.",
    assurances: ["Free", "No sign-up", "Open learning"],
    pathEyebrow: "ONE PATH · THREE LEVELS",
    pathTitle: "You do not need to learn everything.",
    pathLead: "Follow the level that fits you today. Advanced topics can wait.",
    levels: [
      { number: "1", label: "Start", title: "Understand and use AI", text: "For anyone new to assistants or unsure what should be delegated.", result: "A useful, verified first task", href: "/en/courses/ia-desde-cero", action: "Start from zero" },
      { number: "2", label: "Build", title: "Solve a real problem", text: "Choose work, study, web creation or coding and build a small project.", result: "A project you can show", href: "/en/paths", action: "Choose an outcome" },
      { number: "3", label: "Deepen", title: "Design reliable systems", text: "RAG, agents, local models, security and operations for technical learners.", result: "A tested, maintainable system", href: "/en/paths", action: "View advanced paths" },
    ],
    methodEyebrow: "THE AULAFY METHOD",
    methodTitle: "One lesson, one action.",
    method: [
      { number: "01", title: "Understand", text: "Read only what you need to make a decision." },
      { number: "02", title: "Practise", text: "Complete a short mission with a visible result." },
      { number: "03", title: "Verify", text: "Review sources, mistakes, and what to improve." },
    ],
    labTitle: "Learn inside a real situation",
    labText: "The Spanish interactive lab lets you practise an office or university task through notes, prompting and review.",
    labAction: "Open the interactive lab",
    count: (courses: number, lessons: number) => `${courses} courses · ${lessons} open lessons`,
    footer: "Open education for learning artificial intelligence with judgment.",
    sources: "Sources",
    about: "About Aulafy",
  },
} as const;

export default function AulafyNexusLanding({ courseCount, lessonCount, locale = "es" }: {
  courseCount: number;
  lessonCount: number;
  locale?: LandingLocale;
}) {
  const text = copy[locale];
  const english = locale === "en";

  return (
    <div className={styles.page} lang={locale}>
      <a className={styles.skip} href="#main-content">{text.skip}</a>
      <header className={styles.header}>
        <Link className={styles.brand} href={english ? "/en" : "/"} aria-label="Aulafy">
          <BrandMark /><strong>Aulafy</strong>
        </Link>
        <nav aria-label={english ? "Main navigation" : "Navegación principal"}>
          <a href="#camino">{text.learn}</a>
          <Link href={english ? "/en/courses" : "/cursos"}>{text.courses}</Link>
          <Link href={english ? "/" : "/en"}>{english ? "ES" : "EN"}</Link>
        </nav>
      </header>

      <main id="main-content">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>AULAFY · OPEN LEARNING</p>
            <h1>{text.title}</h1>
            <p className={styles.lead}>{text.lead}</p>
            <ul className={styles.assurances} aria-label={english ? "Access conditions" : "Condiciones de acceso"}>
              {text.assurances.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <LandingLearningGuide locale={locale} />
        </section>

        <section className={styles.paths} id="camino" aria-labelledby="path-title">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>{text.pathEyebrow}</p>
            <h2 id="path-title">{text.pathTitle}</h2>
            <p>{text.pathLead}</p>
          </div>
          <div className={styles.levelGrid}>
            {text.levels.map((level) => (
              <article className={styles.level} key={level.number}>
                <div><span>{level.number}</span><small>{level.label}</small></div>
                <h3>{level.title}</h3>
                <p>{level.text}</p>
                <strong>{level.result}</strong>
                <Link href={level.href}>{level.action} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.method} aria-labelledby="method-title">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>{text.methodEyebrow}</p>
            <h2 id="method-title">{text.methodTitle}</h2>
          </div>
          <ol className={styles.methodSteps}>
            {text.method.map((step) => (
              <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>
            ))}
          </ol>
          <div className={styles.labCard}>
            <div aria-hidden="true" className={styles.labVisual}><span>1</span><span>2</span><span>3</span></div>
            <div><h3>{text.labTitle}</h3><p>{text.labText}</p></div>
            <Link href="/laboratorio/ia-en-accion">{text.labAction} <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <p className={styles.count}>{text.count(courseCount, lessonCount)}</p>
      </main>

      <footer className={styles.footer}>
        <p>{text.footer}</p>
        <nav aria-label={english ? "Project information" : "Información del proyecto"}>
          <Link href={english ? "/en/courses/codex-from-zero" : "/curso-codex-espanol"}>Codex</Link>
          <Link href="/fuentes">{text.sources}</Link>
          <Link href="/acerca">{text.about}</Link>
          <a href="https://github.com/aulafy/claude" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}
