import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chapter, ChapterNav, Terminal } from "@/components/Book";
import { codexLessons, getCodexLesson, type CodexLessonBlock } from "@/lib/codex-course-content";

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

export default function CodexLessonPage({ slug }: { slug: string }) {
  const lesson = getCodexLesson(slug);
  if (!lesson) notFound();
  const index = codexLessons.findIndex((item) => item.slug === slug);
  const prev = codexLessons[index - 1];
  const next = codexLessons[index + 1];

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
      <ChapterNav
        prev={prev ? { href: `${COURSE_HREF}/${prev.slug}`, label: prev.title.es } : undefined}
        next={next ? { href: `${COURSE_HREF}/${next.slug}`, label: next.title.es } : undefined}
      />
    </Chapter>
  );
}
