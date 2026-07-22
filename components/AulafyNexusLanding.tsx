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
    title: <>Tu primera misión con IA<br /><span>empieza ahora.</span></>,
    lead: "Una entrada simple para oficinistas, estudiantes y personas no técnicas: elige una situación, haz una misión corta y aprende IA sin perderte entre herramientas.",
    primaryCta: "Empezar en 10 minutos",
    secondaryCta: "Ver todos los caminos",
    assurances: ["Gratis", "Sin registro", "Proyectos verificables", "Fuentes visibles"],
    choiceTitle: "Elige por qué has venido",
    choiceLead: "No necesitas saber qué es RAG, agentes o modelos locales. Empieza por tu situación real.",
    quickChoices: [
      {
        emoji: "💼",
        title: "Trabajo en oficina",
        text: "Emails, informes, facturas, clientes, reuniones o tareas repetitivas.",
        href: "/cursos/ia-pymes/diagnostico-piloto",
        action: "Ahorrar tiempo en el trabajo",
      },
      {
        emoji: "🎓",
        title: "Soy estudiante",
        text: "Estudiar mejor, resumir, preparar exámenes y usar IA sin hacer trampas.",
        href: "/blog/usar-ia-estudiar-sin-hacer-trampas-2026",
        action: "Aprender a estudiar con IA",
      },
      {
        emoji: "🌱",
        title: "Empiezo desde cero",
        text: "No sé qué herramienta usar ni qué puedo pedirle a una IA.",
        href: "/cursos/ia-desde-cero/que-puede-hacer-ia-generativa",
        action: "Hacer la primera misión",
      },
    ],
    firstMission: {
      eyebrow: "MISIÓN 0 · 10 MINUTOS",
      title: "Consigue una victoria rápida antes de leer teoría",
      steps: [
        "Elige una tarea pequeña de hoy.",
        "Pide a la IA un borrador, no una decisión final.",
        "Revisa el resultado y guarda qué cambiaste.",
      ],
      href: "/cursos/ia-desde-cero/que-puede-hacer-ia-generativa",
      action: "Abrir misión guiada",
    },
    roadmapTitle: "Roadmap rápido",
    roadmap: [
      "Elige tu situación",
      "Haz una misión corta",
      "Guarda evidencia",
    ],
    showcaseEyebrow: "RESULTADOS, NO CATÁLOGO",
    showcaseTitle: "Qué puedes construir en Aulafy",
    showcaseLead: "Cada ejemplo conecta con una ruta real. La idea es que el alumno vea un resultado antes de abrir veinte pestañas.",
    projects: [
      { title: "Asistente para documentos", tag: "RAG seguro", text: "Responde con fuentes, se abstiene si no sabe y protege lo que no debe ver.", href: "/cursos/rag-seguro" },
      { title: "Web seria para un negocio", tag: "Web + Codex", text: "Landing publicada, CTA clara, revisión móvil, SEO básico y costes entendidos.", href: "/cursos/crear-webs-con-ia" },
      { title: "Automatización para pyme", tag: "n8n + humano", text: "Clasifica emails, prepara respuestas y pide aprobación antes de actuar.", href: "/cursos/ia-pymes" },
      { title: "Agente controlado", tag: "Trazas + permisos", text: "Usa herramientas, registra pasos, falla de forma controlada y sabe parar.", href: "/cursos/agentes-produccion" },
    ],
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
    title: <>Your first AI mission<br /><span>starts now.</span></>,
    lead: "A simple entry point for office workers, students and non-technical learners: choose one real situation, complete a short mission, and learn AI without getting lost in tools.",
    primaryCta: "Start in 10 minutes",
    secondaryCta: "See all paths",
    assurances: ["Free", "No sign-up", "Verifiable projects", "Visible sources"],
    choiceTitle: "Choose why you came",
    choiceLead: "You do not need to know what RAG, agents or local models are. Start from your real situation.",
    quickChoices: [
      {
        emoji: "💼",
        title: "I work in an office",
        text: "Emails, reports, invoices, customers, meetings or repetitive tasks.",
        href: "/en/courses/ia-pymes",
        action: "Save time at work",
      },
      {
        emoji: "🎓",
        title: "I am a student",
        text: "Study better, summarize, prepare exams and use AI without cheating.",
        href: "/en/courses/ia-desde-cero",
        action: "Study with AI",
      },
      {
        emoji: "🌱",
        title: "I start from zero",
        text: "I do not know which tool to use or what I can ask an AI.",
        href: "/en/courses/ia-desde-cero",
        action: "Do the first mission",
      },
    ],
    firstMission: {
      eyebrow: "MISSION 0 · 10 MINUTES",
      title: "Get a quick win before reading theory",
      steps: [
        "Choose one small task from today.",
        "Ask AI for a draft, not a final decision.",
        "Review the result and save what you changed.",
      ],
      href: "/en/courses/ia-desde-cero",
      action: "Open guided mission",
    },
    roadmapTitle: "Quick roadmap",
    roadmap: [
      "Choose your situation",
      "Complete one short mission",
      "Save evidence",
    ],
    showcaseEyebrow: "RESULTS, NOT A CATALOGUE",
    showcaseTitle: "What you can build with Aulafy",
    showcaseLead: "Each example connects to a real path. Learners should see an outcome before opening twenty tabs.",
    projects: [
      { title: "Document assistant", tag: "Safe RAG", text: "Answers with sources, abstains when evidence is missing, and protects what it should not see.", href: "/en/courses/rag-seguro" },
      { title: "Serious business website", tag: "Web + Codex", text: "Published landing page, clear CTA, mobile review, basic SEO, and cost awareness.", href: "/en/courses/fundamentos-aulafy" },
      { title: "Small business automation", tag: "n8n + human", text: "Classifies emails, drafts replies, and asks for approval before acting.", href: "/en/courses/ia-pymes" },
      { title: "Controlled agent", tag: "Traces + permissions", text: "Uses tools, logs steps, fails safely, and knows when to stop.", href: "/en/courses/agentes-produccion" },
    ],
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
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href={english ? "/en/courses/fundamentos-aulafy" : "/cursos/ia-desde-cero/que-puede-hacer-ia-generativa"}>{text.primaryCta}</Link>
              <Link className={styles.secondaryAction} href={english ? "/en/paths" : "/que-aprender-ia"}>{text.secondaryCta}</Link>
            </div>
            <ul className={styles.assurances} aria-label={english ? "Access conditions" : "Condiciones de acceso"}>
              {text.assurances.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className={styles.heroProduct} aria-label={text.roadmapTitle}>
            <div className={styles.missionCard}>
              <span>{text.roadmapTitle}</span>
              <ol>
                {text.roadmap.map((item) => <li key={item}>{item}</li>)}
              </ol>
              <p>{english ? "Output: one useful task completed and reviewed." : "Resultado: una tarea útil terminada y revisada."}</p>
            </div>
            <LandingLearningGuide locale={locale} />
          </div>
        </section>

        <section className={styles.quickStart} aria-labelledby="quick-start-title">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>{english ? "START HERE" : "EMPIEZA AQUÍ"}</p>
            <h2 id="quick-start-title">{text.choiceTitle}</h2>
            <p>{text.choiceLead}</p>
          </div>
          <div className={styles.choiceGrid}>
            {text.quickChoices.map((choice) => (
              <Link key={choice.title} href={choice.href} className={styles.choiceCard}>
                <span aria-hidden="true">{choice.emoji}</span>
                <h3>{choice.title}</h3>
                <p>{choice.text}</p>
                <strong>{choice.action} →</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.firstMission} aria-labelledby="first-mission-title">
          <div>
            <p className={styles.eyebrow}>{text.firstMission.eyebrow}</p>
            <h2 id="first-mission-title">{text.firstMission.title}</h2>
          </div>
          <ol>
            {text.firstMission.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <Link href={text.firstMission.href}>{text.firstMission.action} <span aria-hidden="true">→</span></Link>
        </section>

        <section className={styles.showcase} aria-labelledby="showcase-title">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>{text.showcaseEyebrow}</p>
            <h2 id="showcase-title">{text.showcaseTitle}</h2>
            <p>{text.showcaseLead}</p>
          </div>
          <div className={styles.projectGrid}>
            {text.projects.map((project) => (
              <Link key={project.title} href={project.href} className={styles.projectCard}>
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <strong>{english ? "Open path" : "Abrir ruta"} →</strong>
              </Link>
            ))}
          </div>
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
