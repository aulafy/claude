import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chapter, ChapterNav, Terminal } from "@/components/Book";
import {
  aiRouterLessons,
  getAiRouterLesson,
  type AiRouterLessonBlock,
} from "@/lib/ai-router-course-content";

const COURSE_HREF = "/cursos/ai-router";
const COURSE_LABEL = "AI Router y sistema de contenido";

export function aiRouterLessonMetadata(slug: string): Metadata {
  const lesson = getAiRouterLesson(slug);
  if (!lesson) return {};

  return {
    title: `${lesson.title.es} — AI Router`,
    description: lesson.lead.es,
    keywords: [
      lesson.title.es,
      "AI Router",
      "LiteLLM routing",
      "Langfuse observabilidad",
      "model router IA",
      "Aulafy",
    ],
    alternates: {
      canonical: `${COURSE_HREF}/${slug}`,
      languages: {
        "es-ES": `${COURSE_HREF}/${slug}`,
        "en-US": `/en/courses/ai-router/${slug}`,
      },
    },
  };
}

function renderBlocks(blocks: AiRouterLessonBlock[]) {
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

export default function AiRouterLessonPage({ slug }: { slug: string }) {
  const lesson = getAiRouterLesson(slug);
  if (!lesson) notFound();

  const index = aiRouterLessons.findIndex((item) => item.slug === slug);
  const prev = aiRouterLessons[index - 1];
  const next = aiRouterLessons[index + 1];

  return (
    <Chapter
      crumb={lesson.title.es}
      title={lesson.title.es}
      icon="route"
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
