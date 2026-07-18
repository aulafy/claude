"use client";

import Link from "next/link";
import AulafyCoreScene from "@/components/AulafyCoreScene";
import type { LearningPath } from "@/lib/learning-paths";

type CoursePreview = { slug: string; title: string; short: string; level: string; lessons: number };

type LandingLocale = "es" | "en";

const copy = {
  es: {
    skip: "Saltar al contenido", navigation: "Navegación principal", start: "Empieza aquí", learn: "Rutas", library: "Cursos", projects: "Proyectos", paths: "Rutas", courses: "Cursos", sources: "Fuentes", language: "Idioma", status: "AULA ABIERTA",
    kicker: "INTELIGENCIA ARTIFICIAL / FORMACIÓN ABIERTA", title: <>APRENDE IA.<br /><span>CREA</span><br />RESULTADOS REALES.</>, lead: "Cursos prácticos y gratuitos para usar la IA con criterio, construir proyectos y avanzar solo cuando necesites más técnica.",
    explore: "Dime por dónde empezar", startCodex: "Ver IA desde cero", coreLabel: "Mapa de aprendizaje: usar, construir y profundizar", coreA: "USAR / 01", coreB: "CONSTRUIR / 02", coreC: "PROFUNDIZAR / 03",
    telemetry: ["CURSOS", "LECCIONES", "ACCESO ABIERTO", "CONTENIDO ACTUAL"], ticker: "PRIMEROS PASOS · USO RESPONSABLE · WEBS · TRABAJO Y NEGOCIO · CODEX · IA LOCAL · RAG · AGENTES · SEGURIDAD · AUTOMATIZACIÓN ·",
    principle: "[ 01 / PRINCIPIO ]", manifesto: <>LA IA NO SE MEMORIZA.<br />SE PRUEBA, SE ROMPE<br />Y SE VUELVE A <span>CONSTRUIR.</span></>, manifestoText: "Aprendizaje orientado a proyectos, fuentes oficiales y decisiones que sobreviven fuera del tutorial.",
    architecture: "[ 02 / PUNTO DE PARTIDA ]", architectureTitle: <>Dinos dónde estás.<br />Te mostramos el primer paso.</>, entry: "NIVEL DE ENTRADA", startsWith: "EMPIEZA CON", result: "RESULTADO", routeAction: "Ver primer paso", allPaths: "Comparar todos los itinerarios", courseUnit: ["curso", "cursos"], activeRoute: "EJEMPLO / PRIMER RESULTADO", consoleTitle: <>De una idea<br />a una web que puedes revisar.</>, consoleText: "Describe una necesidad sencilla, crea una primera versión en una carpeta de práctica y ábrela en el navegador antes de decidir qué mejorar.", openCourse: "Abrir la primera práctica", terminal: ["› crea una carpeta de práctica", "› escribe un briefing corto", "› abre la vista previa", "✓ resultado comprobado"],
    transmissions: "[ 03 / TRANSMISIONES ]", courseTitle: <>Cursos para construir<br />con herramientas actuales.</>, lessons: "LECCIONES", catalog: "Ver catálogo completo", next: "[ SIGUIENTE TRANSMISIÓN ]", finalTitle: <>EMPIEZA POR UNA<br />PREGUNTA REAL.</>, finalAction: "Encontrar mi ruta", footer: "Educación abierta sobre inteligencia artificial.", about: "Acerca de",
  },
  en: {
    skip: "Skip to content", navigation: "Main navigation", start: "Start", learn: "Learn", library: "Courses", projects: "Projects", paths: "Paths", courses: "Courses", sources: "Sources", language: "Language", status: "OPEN LEARNING",
    kicker: "ARTIFICIAL INTELLIGENCE / OPEN LEARNING", title: <>LEARN AI.<br /><span>BUILD</span><br />REAL SYSTEMS.</>, lead: "Free, practical courses that take you from understanding the tools to using them with judgment, security, and real code.",
    explore: "Find my learning path", startCodex: "Browse courses", coreLabel: "Learning map: use, build, and deepen", coreA: "USE / 01", coreB: "BUILD / 02", coreC: "DEEPEN / 03",
    telemetry: ["COURSES", "LESSONS", "OPEN ACCESS", "CURRENT CONTENT"], ticker: "FIRST STEPS · RESPONSIBLE USE · WEBS · WORKFLOWS · CODEX · LOCAL AI · RAG · AGENTS · SECURITY · AUTOMATION ·",
    principle: "[ 01 / PRINCIPLE ]", manifesto: <>AI IS NOT MEMORIZED.<br />IT IS TESTED, BROKEN<br />AND <span>BUILT AGAIN.</span></>, manifestoText: "Project-led learning, official sources, and decisions that still hold up beyond the tutorial.",
    architecture: "[ 02 / STARTING POINT ]", architectureTitle: <>Tell us where you are.<br />We will show the first step.</>, entry: "ENTRY LEVEL", startsWith: "START WITH", result: "OUTCOME", routeAction: "View path", allPaths: "Compare every learning path", courseUnit: ["course", "courses"], activeRoute: "EXAMPLE / PROGRAMMING WITH AGENTS", consoleTitle: <>From the request<br />to a verified change.</>, consoleText: "Explore the repository, define a verifiable task, implement with Codex, and review every decision before shipping.", openCourse: "Open course", terminal: ["› analyse the repository", "› implement the task", "› run the tests", "✓ verified change"],
    transmissions: "[ 03 / TRANSMISSIONS ]", courseTitle: <>Courses to build with<br />current tools.</>, lessons: "LESSONS", catalog: "View full catalogue", next: "[ NEXT TRANSMISSION ]", finalTitle: <>START WITH A<br />REAL QUESTION.</>, finalAction: "Find my path", footer: "Open education about artificial intelligence.", about: "About",
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
  const entryUrl = english ? pathsUrl : "/que-aprender-ia";
  const coursesUrl = english ? "/en/courses" : "/cursos";
  const secondaryEntryUrl = english ? coursesUrl : "/cursos/ia-desde-cero";
  const courseUrl = (slug: string) => `${coursesUrl}/${slug}`;
  const consoleCourseUrl = english ? courseUrl("codex-programadores") : "/cursos/codex-desde-cero/primera-web-local";
  const landingPathSlugs = english
    ? ["programming", "applied-ai", "systems"]
    : ["desde-cero", "negocio-creativo", "programacion"];
  const landingPaths = landingPathSlugs
    .map((slug) => paths.find((path) => path.slug === slug))
    .filter((path): path is LearningPath => Boolean(path));
  return (
    <div className="nexus-landing" lang={locale}>
      <a className="nx-skip" href="#contenido">{text.skip}</a>
      <header className="nx-header">
        <Link className="nx-brand" href={english ? "/en" : "/"} aria-label="Aulafy home">
          <span className="nx-mark">A</span><span>AULAFY</span><small>EDU / 01</small>
        </Link>
        <nav aria-label={text.navigation}>
          <Link href={entryUrl}>{text.start}</Link>
          <Link href={pathsUrl}>{text.learn}</Link>
          <Link href={coursesUrl}>{text.library}</Link>
          {!english && <Link href="/proyectos">{text.projects}</Link>}
        </nav>
        <div className="nx-header-tools">
          <nav className="nx-mobile-nav" aria-label={english ? "Quick navigation" : "Navegación rápida"}>
            <Link href={entryUrl}>{text.start}</Link>
            <Link href={coursesUrl}>{text.library}</Link>
            <Link href={english ? "/" : "/en"}>{english ? "ES" : "EN"}</Link>
          </nav>
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
              <Link className="nx-primary" href={entryUrl}>{text.explore} <span>↗</span></Link>
              <Link className="nx-secondary" href={secondaryEntryUrl}>{text.startCodex}</Link>
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
              <Link className="nx-path" href={english ? `${pathsUrl}#${path.slug}` : `${entryUrl}#ruta-${path.slug}`} key={path.slug}>
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
          <div className="nx-console-bar"><span>{english ? "aulafy://path/programming" : "aulafy://ruta/primer-resultado"}</span><span>{english ? "SIGNAL 100%" : "SEÑAL 100%"}</span></div>
          <div className="nx-console-body">
            <div className="nx-console-index"><span>01</span><span>02</span><span className="active">03</span><span>04</span></div>
            <div className="nx-console-copy"><p>{text.activeRoute}</p><h2 id="console-title">{text.consoleTitle}</h2><p>{text.consoleText}</p><Link href={consoleCourseUrl}>{text.openCourse} <span>↗</span></Link></div>
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

        <section className="nx-final">
          <p>{text.next}</p><h2>{text.finalTitle}</h2><Link href={entryUrl}>{text.finalAction} <span>↗</span></Link>
          <div className="nx-final-orbit" aria-hidden="true"><span>A</span></div>
        </section>
      </main>
      <footer className="nx-footer"><Link className="nx-brand" href={english ? "/en" : "/"}><span className="nx-mark">A</span><span>AULAFY</span></Link><p>{text.footer}</p><div>{!english && <Link href="/curso-codex-espanol">Codex en español</Link>}<Link href="/fuentes">{text.sources}</Link><Link href="/acerca">{text.about}</Link><Link href={english ? "/" : "/en"}>{english ? "Español" : "English"}</Link></div></footer>
    </div>
  );
}
