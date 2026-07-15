"use client";

import Link from "next/link";
import AulafyCoreScene from "@/components/AulafyCoreScene";
import type { LearningPath } from "@/lib/learning-paths";
import { spanishSearchIntents } from "@/lib/seo-strategy";

type CoursePreview = { slug: string; title: string; short: string; level: string; lessons: number };

type LandingLocale = "es" | "en";

const copy = {
  es: {
    skip: "Saltar al contenido", navigation: "Navegación principal", paths: "Rutas", courses: "Cursos", sources: "Fuentes", language: "Idioma", status: "AULA ABIERTA",
    kicker: "INTELIGENCIA ARTIFICIAL / FORMACIÓN ABIERTA", title: <>APRENDE IA.<br /><span>CONSTRUYE</span><br />SISTEMAS REALES.</>, lead: "Cursos prácticos y gratuitos para pasar de entender las herramientas a usarlas con criterio, seguridad y código real.",
    explore: "Encontrar mi itinerario", startCodex: "Empiezo desde cero", coreLabel: "Red tridimensional de conocimiento y herramientas de inteligencia artificial", coreA: "MODELOS / 04", coreB: "AGENTES / 07", coreC: "SISTEMAS / LIVE",
    telemetry: ["CURSOS", "LECCIONES", "ACCESO ABIERTO", "CONTENIDO ACTUAL"], ticker: "CODEX · CLAUDE CODE · IA LOCAL · RAG · AGENTES · MLOPS · SEGURIDAD · AUTOMATIZACIÓN · MODELOS ABIERTOS ·",
    principle: "[ 01 / PRINCIPIO ]", manifesto: <>LA IA NO SE MEMORIZA.<br />SE PRUEBA, SE ROMPE<br />Y SE VUELVE A <span>CONSTRUIR.</span></>, manifestoText: "Aprendizaje orientado a proyectos, fuentes oficiales y decisiones que sobreviven fuera del tutorial.",
    architecture: "[ 02 / PUNTO DE PARTIDA ]", architectureTitle: <>Dinos dónde estás.<br />Te mostramos el primer paso.</>, entry: "NIVEL DE ENTRADA", startsWith: "EMPIEZA CON", result: "RESULTADO", routeAction: "Ver itinerario", allPaths: "Comparar todos los itinerarios", courseUnit: ["curso", "cursos"], activeRoute: "EJEMPLO / PROGRAMACIÓN CON AGENTES", consoleTitle: <>De la petición<br />al cambio verificado.</>, consoleText: "Explora el repositorio, define una tarea comprobable, implementa con Codex y revisa cada decisión antes de entregar.", openCourse: "Abrir curso", terminal: ["› analiza el repositorio", "› implementa la tarea", "› ejecuta las pruebas", "✓ cambio verificado"],
    transmissions: "[ 03 / TRANSMISIONES ]", courseTitle: <>Cursos para construir<br />con herramientas actuales.</>, lessons: "LECCIONES", catalog: "Ver catálogo completo", discovery: "[ 04 / OBJETIVOS FRECUENTES ]", discoveryTitle: <>¿Qué quieres aprender<br />con inteligencia artificial?</>, next: "[ SIGUIENTE TRANSMISIÓN ]", finalTitle: <>EMPIEZA POR UNA<br />PREGUNTA REAL.</>, finalAction: "Encontrar mi ruta", footer: "Educación abierta sobre inteligencia artificial.", about: "Acerca de",
  },
  en: {
    skip: "Skip to content", navigation: "Main navigation", paths: "Paths", courses: "Courses", sources: "Sources", language: "Language", status: "OPEN LEARNING",
    kicker: "ARTIFICIAL INTELLIGENCE / OPEN LEARNING", title: <>LEARN AI.<br /><span>BUILD</span><br />REAL SYSTEMS.</>, lead: "Free, practical courses that take you from understanding the tools to using them with judgment, security, and real code.",
    explore: "Find my learning path", startCodex: "Start with Codex", coreLabel: "Three-dimensional network of artificial intelligence knowledge and tools", coreA: "MODELS / 04", coreB: "AGENTS / 07", coreC: "SYSTEMS / LIVE",
    telemetry: ["COURSES", "LESSONS", "OPEN ACCESS", "CURRENT CONTENT"], ticker: "CODEX · CLAUDE CODE · LOCAL AI · RAG · AGENTS · MLOPS · SECURITY · AUTOMATION · OPEN MODELS ·",
    principle: "[ 01 / PRINCIPLE ]", manifesto: <>AI IS NOT MEMORIZED.<br />IT IS TESTED, BROKEN<br />AND <span>BUILT AGAIN.</span></>, manifestoText: "Project-led learning, official sources, and decisions that still hold up beyond the tutorial.",
    architecture: "[ 02 / STARTING POINT ]", architectureTitle: <>Tell us where you are.<br />We will show the first step.</>, entry: "ENTRY LEVEL", startsWith: "START WITH", result: "OUTCOME", routeAction: "View path", allPaths: "Compare every learning path", courseUnit: ["course", "courses"], activeRoute: "EXAMPLE / PROGRAMMING WITH AGENTS", consoleTitle: <>From the request<br />to a verified change.</>, consoleText: "Explore the repository, define a verifiable task, implement with Codex, and review every decision before shipping.", openCourse: "Open course", terminal: ["› analyse the repository", "› implement the task", "› run the tests", "✓ verified change"],
    transmissions: "[ 03 / TRANSMISSIONS ]", courseTitle: <>Courses to build with<br />current tools.</>, lessons: "LESSONS", catalog: "View full catalogue", discovery: "[ 04 / COMMON GOALS ]", discoveryTitle: <>What do you want to learn<br />with artificial intelligence?</>, next: "[ NEXT TRANSMISSION ]", finalTitle: <>START WITH A<br />REAL QUESTION.</>, finalAction: "Find my path", footer: "Open education about artificial intelligence.", about: "About",
  },
} as const;

export default function AulafyNexusLanding({ courseCount, lessonCount, paths, courses, locale = "es" }: {
  courseCount: number;
  lessonCount: number;
  paths: LearningPath[];
  courses: CoursePreview[];
  locale?: LandingLocale;
}) {
  const text = copy[locale];
  const english = locale === "en";
  const pathsUrl = english ? "/en/paths" : "/rutas";
  const coursesUrl = english ? "/en/courses" : "/cursos";
  const courseUrl = (slug: string) => `${coursesUrl}/${slug}`;
  const landingPaths = paths.filter((path) => path.featured);
  return (
    <div className="nexus-landing" lang={locale}>
      <a className="nx-skip" href="#contenido">{text.skip}</a>
      <header className="nx-header">
        <Link className="nx-brand" href={english ? "/en" : "/"} aria-label="Aulafy home">
          <span className="nx-mark">A</span><span>AULAFY</span><small>EDU / 01</small>
        </Link>
        <nav aria-label={text.navigation}>
          <a href="#rutas">{text.paths}</a><a href="#cursos">{text.courses}</a><Link href="/fuentes">{text.sources}</Link>
        </nav>
        <div className="nx-header-tools">
          <nav className="nx-language" aria-label={text.language}>
            <Link href="/" aria-current={english ? undefined : "page"}>ES</Link>
            <Link href="/en" aria-current={english ? "page" : undefined}>EN</Link>
          </nav>
          <div className="nx-status"><i /> {text.status}</div>
        </div>
      </header>

      <main id="contenido">
        <section className="nx-hero" aria-labelledby="nx-title">
          <div className="nx-grid" aria-hidden="true" />
          <div className="nx-hero-copy">
            <p className="nx-kicker">{text.kicker}</p>
            <h1 id="nx-title">{text.title}</h1>
            <p className="nx-lead">{text.lead}</p>
            <div className="nx-actions">
              <Link className="nx-primary" href="#rutas">{text.explore} <span>↓</span></Link>
              <Link className="nx-secondary" href={courseUrl(english ? "codex-programadores" : "codex-desde-cero")}>{text.startCodex}</Link>
            </div>
          </div>
          <div className="nx-core" role="img" aria-label={text.coreLabel}>
            <AulafyCoreScene />
            <div className="nx-core-label nx-core-label-a">{text.coreA}</div>
            <div className="nx-core-label nx-core-label-b">{text.coreB}</div>
            <div className="nx-core-label nx-core-label-c">{text.coreC}</div>
          </div>
          <div className="nx-telemetry" aria-label="Datos de Aulafy">
            <span><b>{String(courseCount).padStart(2, "0")}</b> {text.telemetry[0]}</span>
            <span><b>{lessonCount}</b> {text.telemetry[1]}</span>
            <span><b>ES / EN</b> {text.telemetry[2]}</span>
            <span><b>2026</b> {text.telemetry[3]}</span>
          </div>
        </section>

        <div className="nx-ticker" aria-hidden="true"><div>{text.ticker}</div></div>

        <section className="nx-manifesto">
          <p className="nx-section-code">{text.principle}</p><h2>{text.manifesto}</h2><p>{text.manifestoText}</p>
        </section>

        <section className="nx-paths" id="rutas">
          <div className="nx-section-heading"><p>{text.architecture}</p><h2>{text.architectureTitle}</h2></div>
          <div className="nx-path-grid">
            {landingPaths.map((path, index) => (
              <Link className="nx-path" href={`${pathsUrl}#${path.slug}`} key={path.slug}>
                <span className="nx-path-number">0{index + 1}</span>
                <h3>{path.title}</h3><p>{path.description}</p>
                <dl>
                  <div><dt>{text.entry}</dt><dd>{path.entry}</dd></div>
                  <div><dt>{text.startsWith}</dt><dd>{path.firstStep}</dd></div>
                  <div><dt>{text.result}</dt><dd>{path.outcome}</dd></div>
                </dl>
                <div><span>{path.duration}</span><span>{path.courses.length} {text.courseUnit[path.courses.length === 1 ? 0 : 1]}</span><strong>{text.routeAction}</strong><b>↗</b></div>
              </Link>
            ))}
          </div>
          <Link className="nx-all-paths" href={pathsUrl}>{text.allPaths} <span>↗</span></Link>
        </section>

        <section className="nx-console" aria-labelledby="console-title">
          <div className="nx-console-bar"><span>{english ? "aulafy://path/programming" : "aulafy://ruta/programacion"}</span><span>{english ? "SIGNAL 100%" : "SEÑAL 100%"}</span></div>
          <div className="nx-console-body">
            <div className="nx-console-index"><span>01</span><span>02</span><span className="active">03</span><span>04</span></div>
            <div className="nx-console-copy"><p>{text.activeRoute}</p><h2 id="console-title">{text.consoleTitle}</h2><p>{text.consoleText}</p><Link href={courseUrl("codex-programadores")}>{text.openCourse} <span>↗</span></Link></div>
            <div className="nx-terminal" aria-label={english ? "Example workflow" : "Ejemplo de flujo de trabajo"}>
              <div><i /><i /><i /><span>~/aulafy/proyecto</span></div>
              <pre><code><em>$</em> codex<br /><span>{text.terminal[0]}</span><br /><span>{text.terminal[1]}</span><br /><span>{text.terminal[2]}</span><br /><b>{text.terminal[3]}</b></code></pre>
            </div>
          </div>
        </section>

        <section className="nx-courses" id="cursos">
          <div className="nx-section-heading"><p>{text.transmissions}</p><h2>{text.courseTitle}</h2></div>
          <div className="nx-course-list">
            {courses.map((course, index) => <Link href={courseUrl(course.slug)} key={course.slug} className="nx-course-row"><span>0{index + 1}</span><h3>{course.title}</h3><p>{course.short}</p><small>{course.lessons} {text.lessons}</small><b>↗</b></Link>)}
          </div>
          <Link className="nx-all-courses" href={coursesUrl}>{text.catalog} <span>↗</span></Link>
        </section>

        {!english && (
          <section className="nx-discovery" aria-labelledby="nx-discovery-title">
            <div className="nx-section-heading">
              <p>{text.discovery}</p>
              <h2 id="nx-discovery-title">{text.discoveryTitle}</h2>
            </div>
            <div className="nx-discovery-grid">
              {spanishSearchIntents.map((item) => (
                <Link href={item.linkHref} key={item.canonical}>
                  <h3>{item.linkLabel}</h3>
                  <p>{item.linkDescription}</p>
                  <span>Explorar →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="nx-final">
          <p>{text.next}</p><h2>{text.finalTitle}</h2><Link href={pathsUrl}>{text.finalAction} <span>↗</span></Link>
          <div className="nx-final-orbit" aria-hidden="true"><span>A</span></div>
        </section>
      </main>
      <footer className="nx-footer"><Link className="nx-brand" href={english ? "/en" : "/"}><span className="nx-mark">A</span><span>AULAFY</span></Link><p>{text.footer}</p><div><Link href="/fuentes">{text.sources}</Link><Link href="/acerca">{text.about}</Link><Link href={english ? "/" : "/en"}>{english ? "Español" : "English"}</Link></div></footer>
    </div>
  );
}
