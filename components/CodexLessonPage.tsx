import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chapter, ChapterNav, Terminal } from "@/components/Book";
import Icon from "@/components/Icon";
import {
  codexLessons,
  getCodexLesson,
  getCodexLessonPractice,
  type CodexLessonBlock,
  type CodexLessonPractice,
} from "@/lib/codex-course-content";

const COURSE_HREF = "/cursos/codex-programadores";
const COURSE_LABEL = "Codex para programadores";

export function codexLessonMetadata(slug: string): Metadata {
  const lesson = getCodexLesson(slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title.es} — Codex para programadores`,
    description: lesson.lead.es,
    keywords: [lesson.title.es, "tutorial Codex", "Codex para programadores", "OpenAI Codex español"],
    alternates: {
      canonical: `${COURSE_HREF}/${slug}`,
      languages: {
        "es-ES": `${COURSE_HREF}/${slug}`,
        "en-US": `/en/courses/codex-programadores/${slug}`,
      },
    },
  };
}

function renderBlocks(blocks: CodexLessonBlock[]) {
  const nodes: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    nodes.push(<ul key={`list-${nodes.length}`}>{bullets.map((item) => <li key={item}>{item}</li>)}</ul>);
    bullets = [];
  };

  blocks.forEach((block) => {
    if (block.type === "bullet") {
      bullets.push(block.text);
      return;
    }
    flushBullets();
    if (block.type === "h2") nodes.push(<h2 key={`h2-${nodes.length}`}>{block.text}</h2>);
    if (block.type === "h3") nodes.push(<h3 key={`h3-${nodes.length}`}>{block.text}</h3>);
    if (block.type === "p") nodes.push(<p key={`p-${nodes.length}`}>{block.text}</p>);
    if (block.type === "code") nodes.push(<Terminal key={`code-${nodes.length}`}>{block.text}</Terminal>);
  });
  flushBullets();
  return nodes;
}

function PracticeCard({ practice }: { practice: CodexLessonPractice }) {
  return (
    <section className="aula-panel p-6 sm:p-8 mt-10" aria-labelledby="codex-practice">
      <span className="aula-section-label"><Icon name="testTube" /> Práctica verificable</span>
      <h2 id="codex-practice" className="font-display text-2xl font-bold text-white mt-3">Entrega de la lección</h2>

      <div className="mt-6 grid gap-5">
        <div>
          <h3 className="text-white font-semibold">Qué vas a construir</h3>
          <p className="mt-2 text-zinc-300 leading-relaxed">{practice.build.es}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold">Por qué es importante</h3>
          <p className="mt-2 text-zinc-300 leading-relaxed">{practice.why.es}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold">Repositorio o archivos iniciales</h3>
          <p className="mt-2 text-zinc-300 leading-relaxed">{practice.starter.es}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold">Pasos</h3>
          <ol className="mt-3 grid gap-2 text-zinc-300">
            {practice.steps.es.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
          </ol>
        </div>
        <div>
          <h3 className="text-white font-semibold">Encargo listo para Codex</h3>
          <Terminal>{practice.codexPrompt.es}</Terminal>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-white font-semibold">Resultado esperado</h3>
            <p className="mt-2 text-zinc-300 leading-relaxed">{practice.expected.es}</p>
          </div>
          <div>
            <h3 className="text-white font-semibold">Comando de verificación</h3>
            <Terminal>{practice.verify}</Terminal>
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold">Comprobación manual</h3>
          <p className="mt-2 text-zinc-300 leading-relaxed">{practice.manualCheck.es}</p>
        </div>
        <div className="callout callout-warning">
          <strong>Error frecuente.</strong> {practice.commonError.es}
        </div>
        <div>
          <h3 className="text-white font-semibold">Mini ejercicio</h3>
          <p className="mt-2 text-zinc-300 leading-relaxed">{practice.exercise.es}</p>
          <details className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-4">
            <summary className="cursor-pointer text-fuchsia-300 font-semibold">Ver solución</summary>
            <p className="mt-3 text-zinc-300 leading-relaxed">{practice.solution.es}</p>
          </details>
        </div>
        <div>
          <h3 className="text-white font-semibold">Evidencia que debes guardar</h3>
          <p className="mt-2 text-zinc-300 leading-relaxed">{practice.evidence.es}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold">Fuentes oficiales y versión probada</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {practice.sources.map((source) => (
              <a key={source.href} href={source.href} className="aula-chip" target="_blank" rel="noreferrer">
                <Icon name="external" /> {source.label}
              </a>
            ))}
            <span className="aula-chip" data-tone="green">Probado: {practice.tested}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CodexLessonPage({ slug }: { slug: string }) {
  const lesson = getCodexLesson(slug);
  if (!lesson) notFound();
  const index = codexLessons.findIndex((item) => item.slug === slug);
  const prev = codexLessons[index - 1];
  const next = codexLessons[index + 1];
  const practice = getCodexLessonPractice(lesson);

  return (
    <Chapter
      crumb={lesson.title.es}
      title={lesson.title.es}
      icon="laptopCode"
      lead={lesson.lead.es}
      courseHref={COURSE_HREF}
      courseLabel={COURSE_LABEL}
    >
      <div className="prose">{renderBlocks(lesson.blocks.es)}</div>
      <PracticeCard practice={practice} />
      <ChapterNav
        prev={prev ? { href: `${COURSE_HREF}/${prev.slug}`, label: prev.title.es } : undefined}
        next={next ? { href: `${COURSE_HREF}/${next.slug}`, label: next.title.es } : undefined}
      />
    </Chapter>
  );
}
