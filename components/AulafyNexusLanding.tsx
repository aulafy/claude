"use client";

import Link from "next/link";
import AulafyCoreScene from "@/components/AulafyCoreScene";
import type { LearningPath } from "@/lib/learning-paths";

type CoursePreview = { slug: string; title: string; short: string; level: string; lessons: number };

export default function AulafyNexusLanding({ courseCount, lessonCount, paths, courses }: {
  courseCount: number;
  lessonCount: number;
  paths: LearningPath[];
  courses: CoursePreview[];
}) {
  return (
    <div className="nexus-landing">
      <a className="nx-skip" href="#contenido">Saltar al contenido</a>
      <header className="nx-header">
        <Link className="nx-brand" href="/" aria-label="Aulafy, inicio">
          <span className="nx-mark">A</span><span>AULAFY</span><small>EDU / 01</small>
        </Link>
        <nav aria-label="Navegación principal">
          <a href="#rutas">Rutas</a><a href="#cursos">Cursos</a><Link href="/fuentes">Fuentes</Link>
        </nav>
        <div className="nx-status"><i /> AULA ABIERTA</div>
      </header>

      <main id="contenido">
        <section className="nx-hero" aria-labelledby="nx-title">
          <div className="nx-grid" aria-hidden="true" />
          <div className="nx-hero-copy">
            <p className="nx-kicker">INTELIGENCIA ARTIFICIAL / FORMACIÓN ABIERTA</p>
            <h1 id="nx-title">APRENDE IA.<br /><span>CONSTRUYE</span><br />SISTEMAS REALES.</h1>
            <p className="nx-lead">Cursos prácticos y gratuitos para pasar de entender las herramientas a usarlas con criterio, seguridad y código real.</p>
            <div className="nx-actions">
              <Link className="nx-primary" href="/rutas">Explorar rutas <span>↗</span></Link>
              <Link className="nx-secondary" href="/cursos/codex-programadores">Empezar con Codex</Link>
            </div>
          </div>
          <div className="nx-core" role="img" aria-label="Red tridimensional de conocimiento y herramientas de inteligencia artificial">
            <AulafyCoreScene />
            <div className="nx-core-label nx-core-label-a">MODELOS / 04</div>
            <div className="nx-core-label nx-core-label-b">AGENTES / 07</div>
            <div className="nx-core-label nx-core-label-c">SISTEMAS / LIVE</div>
          </div>
          <div className="nx-telemetry" aria-label="Datos de Aulafy">
            <span><b>{String(courseCount).padStart(2, "0")}</b> CURSOS</span>
            <span><b>{lessonCount}</b> LECCIONES</span>
            <span><b>ES / EN</b> ACCESO ABIERTO</span>
            <span><b>2026</b> CONTENIDO ACTUAL</span>
          </div>
        </section>

        <div className="nx-ticker" aria-hidden="true"><div>CODEX · CLAUDE CODE · IA LOCAL · RAG · AGENTES · MLOPS · SEGURIDAD · AUTOMATIZACIÓN · MODELOS ABIERTOS ·</div></div>

        <section className="nx-manifesto">
          <p className="nx-section-code">[ 01 / PRINCIPIO ]</p>
          <h2>LA IA NO SE MEMORIZA.<br />SE PRUEBA, SE ROMPE<br />Y SE VUELVE A <span>CONSTRUIR.</span></h2>
          <p>Aprendizaje orientado a proyectos, fuentes oficiales y decisiones que sobreviven fuera del tutorial.</p>
        </section>

        <section className="nx-paths" id="rutas">
          <div className="nx-section-heading"><p>[ 02 / ARQUITECTURA ]</p><h2>Elige una dirección.<br />Nosotros ordenamos el recorrido.</h2></div>
          <div className="nx-path-grid">
            {paths.map((path, index) => (
              <Link className="nx-path" href={`/rutas#${path.slug}`} key={path.slug}>
                <span className="nx-path-number">0{index + 1}</span>
                <h3>{path.title}</h3><p>{path.description}</p>
                <div><span>{path.duration}</span><span>{path.courses.length} cursos</span><b>↗</b></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="nx-console" aria-labelledby="console-title">
          <div className="nx-console-bar"><span>aulafy://ruta/programacion</span><span>SEÑAL 100%</span></div>
          <div className="nx-console-body">
            <div className="nx-console-index"><span>01</span><span>02</span><span className="active">03</span><span>04</span></div>
            <div className="nx-console-copy"><p>RUTA ACTIVA / PROGRAMACIÓN CON AGENTES</p><h2 id="console-title">De la petición<br />al cambio verificado.</h2><p>Explora el repositorio, define una tarea comprobable, implementa con Codex y revisa cada decisión antes de entregar.</p><Link href="/cursos/codex-programadores">Abrir curso <span>↗</span></Link></div>
            <div className="nx-terminal" aria-label="Ejemplo de flujo de trabajo">
              <div><i /><i /><i /><span>~/aulafy/proyecto</span></div>
              <pre><code><em>$</em> codex<br /><span>› analiza el repositorio</span><br /><span>› implementa la tarea</span><br /><span>› ejecuta las pruebas</span><br /><b>✓ cambio verificado</b></code></pre>
            </div>
          </div>
        </section>

        <section className="nx-courses" id="cursos">
          <div className="nx-section-heading"><p>[ 03 / TRANSMISIONES ]</p><h2>Cursos para construir<br />con herramientas actuales.</h2></div>
          <div className="nx-course-list">
            {courses.map((course, index) => <Link href={`/cursos/${course.slug}`} key={course.slug} className="nx-course-row"><span>0{index + 1}</span><h3>{course.title}</h3><p>{course.short}</p><small>{course.lessons} LECCIONES</small><b>↗</b></Link>)}
          </div>
          <Link className="nx-all-courses" href="/cursos">Ver catálogo completo <span>↗</span></Link>
        </section>

        <section className="nx-final">
          <p>[ SIGUIENTE TRANSMISIÓN ]</p><h2>EMPIEZA POR UNA<br />PREGUNTA REAL.</h2><Link href="/rutas">Encontrar mi ruta <span>↗</span></Link>
          <div className="nx-final-orbit" aria-hidden="true"><span>A</span></div>
        </section>
      </main>
      <footer className="nx-footer"><Link className="nx-brand" href="/"><span className="nx-mark">A</span><span>AULAFY</span></Link><p>Educación abierta sobre inteligencia artificial.</p><div><Link href="/fuentes">Fuentes</Link><Link href="/acerca-de">Acerca de</Link><Link href="/en">English</Link></div></footer>
    </div>
  );
}
