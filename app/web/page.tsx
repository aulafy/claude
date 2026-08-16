import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Icon from "@/components/Icon";
import WebCourseActions from "@/components/WebCourseActions";
import { getIaBasicsLesson, iaBasicsCourseMinutes, iaBasicsLessons } from "@/lib/ia-basics-course-content";
import { getIaBasicsQuality } from "@/lib/ia-basics-quality";
import { getSessionlessPractice } from "@/lib/sessionless-practices";
import styles from "./web.module.css";

export const metadata: Metadata = {
  title: "Curso completo de IA desde cero en una página — Aulafy",
  description: "Lee, imprime o descarga en HTML el curso completo de inteligencia artificial desde cero de Aulafy: 12 lecciones, prácticas, fuentes y proyecto final.",
  alternates: { canonical: "/web" },
  openGraph: {
    title: "IA desde cero: curso completo en una página",
    description: "Edición web íntegra, gratuita y descargable del curso fundamental de Aulafy.",
    url: "/web",
    type: "article",
    locale: "es_ES",
    siteName: "Aulafy",
  },
};

const formatMinutes = (minutes: number) => `${Math.floor(minutes / 60)} h ${minutes % 60} min`;

export default function CompleteWebCoursePage() {
  const lessons = iaBasicsLessons.map((lesson) => ({
    ...lesson,
    markdown: getIaBasicsLesson(lesson.slug)?.markdown ?? "",
    practice: getSessionlessPractice(lesson.slug),
    quality: getIaBasicsQuality(lesson.slug),
  }));
  const sources = Array.from(
    new Map(lessons.flatMap((lesson) => lesson.quality?.sources ?? []).map((source) => [source.href, source])).values(),
  );

  return (
    <main className={`${styles.page} web-course-page`} id="curso-completo">
      <header className="web-course-cover">
        <Link href="/" className="web-course-brand"><span>A</span> Aulafy</Link>
        <p className="web-course-kicker">Edición web completa · lectura continua</p>
        <h1>Curso completo de IA desde cero</h1>
        <p className="web-course-subtitle">Aprende a usar inteligencia artificial con criterio, práctica y evidencias. Todo el curso en una sola página, preparado para leer, imprimir o conservar sin conexión.</p>
        <div className="web-course-metadata">
          <span><Icon name="book" /> 12 lecciones</span>
          <span><Icon name="calendar" /> {formatMinutes(iaBasicsCourseMinutes())}</span>
          <span><Icon name="shield" /> Revisado el 4 de agosto de 2026</span>
          <span>CC BY-SA 4.0 · código MIT</span>
        </div>
        <WebCourseActions />
        <p className="web-course-note">Contenido educativo abierto. No es una formación oficial. Las funciones, precios y condiciones de herramientas externas pueden cambiar: comprueba siempre la fuente enlazada.</p>
      </header>

      <div className="web-course-layout">
        <nav className="web-course-toc" aria-label="Índice del curso">
          <strong>Índice</strong>
          <ol>
            {lessons.map((lesson) => <li key={lesson.slug}><a href={`#${lesson.slug}`}><span>{lesson.number}</span>{lesson.title}</a></li>)}
          </ol>
          <a href="#bibliografia">Fuentes y bibliografía</a>
        </nav>

        <article className="web-course-book">
          <section className="web-course-introduction">
            <p className="web-course-kicker">Cómo utilizar esta edición</p>
            <h2>Lee menos, practica más</h2>
            <p>Recorre las lecciones en orden si empiezas desde cero. En cada capítulo encontrarás capacidades concretas, vocabulario, explicación, una práctica y una evidencia. Avanza cuando puedas explicar tu decisión y repetir la práctica sin copiar el ejemplo.</p>
            <ol>
              <li><strong>Entiende:</strong> identifica la idea que cambia tu forma de trabajar.</li>
              <li><strong>Practica:</strong> usa datos ficticios o de bajo riesgo.</li>
              <li><strong>Comprueba:</strong> contrasta la salida con una fuente o criterio visible.</li>
              <li><strong>Conserva:</strong> guarda la evidencia en tus propios apuntes.</li>
            </ol>
          </section>

          {lessons.map((lesson, index) => (
            <section id={lesson.slug} className="web-course-chapter" key={lesson.slug}>
              <div className="web-course-chapter-number">Lección {lesson.number} de {lessons.length} · ≈ {lesson.minutes} min</div>
              <h2>{lesson.title}</h2>
              <p className="web-course-chapter-lead">{lesson.lead}</p>

              <div className="web-course-contract">
                <div><strong>Al terminar podrás</strong><ul>{lesson.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>
                <div><strong>Vocabulario</strong><p>{lesson.keyTerms.join(" · ")}</p><strong>Para avanzar</strong><p>Completa la práctica, explica tu decisión y conserva una evidencia.</p></div>
              </div>

              <div className="prose web-course-prose">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{
                  a({ href, children }) {
                    const external = href?.startsWith("http");
                    return <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
                  },
                  table({ children }) { return <div className="aula-table-scroll"><table>{children}</table></div>; },
                }}>{lesson.markdown}</ReactMarkdown>
              </div>

              {lesson.practice ? (
                <aside className="web-course-practice">
                  <p className="web-course-kicker">Práctica de la lección</p>
                  <h3>{lesson.practice.mission}</h3>
                  <p><strong>Resultado:</strong> {lesson.practice.result}</p>
                  <ol>{lesson.practice.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                  <details><summary>Pregunta de comprobación y solución</summary><p>{lesson.practice.question}</p><ul>{lesson.practice.options.map((option) => <li key={option.label}><strong>{option.correct ? "Respuesta correcta: " : ""}{option.label}</strong> — {option.explanation}</li>)}</ul></details>
                  <details><summary>Plantilla de evidencia</summary><pre>{lesson.practice.evidence}</pre></details>
                </aside>
              ) : null}

              <footer className="web-course-chapter-footer">
                <span>Revisión: {lesson.quality?.reviewedAt ?? "2026-08-04"}</span>
                {index < lessons.length - 1 ? <a href={`#${lessons[index + 1].slug}`}>Siguiente lección ↓</a> : <a href="#bibliografia">Ir a las fuentes ↓</a>}
              </footer>
            </section>
          ))}

          <section id="bibliografia" className="web-course-bibliography">
            <p className="web-course-kicker">Fuentes primarias y ampliación</p>
            <h2>Bibliografía del curso</h2>
            <p>Estas referencias sostienen los criterios generales del curso. Las lecciones volátiles deben volver a comprobarse antes de aplicar funciones, condiciones o políticas concretas.</p>
            <ul>{sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul>
            <p><Link href="/fuentes">Consulta también el método editorial y el directorio completo de fuentes de Aulafy.</Link></p>
          </section>
        </article>
      </div>
    </main>
  );
}
