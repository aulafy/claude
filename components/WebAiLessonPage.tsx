import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Chapter, ChapterNav } from "@/components/Book";
import Icon from "@/components/Icon";
import {
  WEB_AI_COURSE_SLUG,
  getWebAiLesson,
  webAiLessons,
} from "@/lib/web-ai-course-content";

const COURSE_HREF = `/cursos/${WEB_AI_COURSE_SLUG}`;
const COURSE_LABEL = "Crea webs profesionales con IA desde cero";

export function webAiLessonMetadata(slug: string): Metadata {
  const lesson = getWebAiLesson(slug);
  if (!lesson) return {};

  return {
    title: `${lesson.title} — Crea webs con IA`,
    description: lesson.lead,
    keywords: [
      lesson.title,
      "crear una web con IA",
      "tutorial Codex en español",
      "GPT-5.6 Sol",
      "curso desarrollo web desde cero",
    ],
    alternates: { canonical: `${COURSE_HREF}/${slug}` },
    openGraph: {
      title: lesson.title,
      description: lesson.lead,
      url: `${COURSE_HREF}/${slug}`,
      type: "article",
      siteName: "Aulafy",
      locale: "es_ES",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${lesson.title} en Aulafy` }],
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.title,
      description: lesson.lead,
      creator: "@learntouseai",
      images: ["/opengraph-image"],
    },
  };
}

const kindLabel = {
  base: "Fundamentos",
  professional: "Construcción profesional",
  lab: "Laboratorio reproducible",
  workshop: "Taller sectorial",
  project: "Proyecto final",
};

export default function WebAiLessonPage({ slug }: { slug: string }) {
  const lesson = getWebAiLesson(slug);
  if (!lesson) notFound();

  const index = webAiLessons.findIndex((item) => item.slug === slug);
  const prev = webAiLessons[index - 1];
  const next = webAiLessons[index + 1];

  return (
    <Chapter
      crumb={lesson.title}
      title={lesson.title}
      icon="laptopCode"
      lead={lesson.lead}
      courseHref={COURSE_HREF}
      courseLabel={COURSE_LABEL}
    >
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="aula-chip" data-tone="cyan">
          <Icon name="book" /> Lección {lesson.number} de {webAiLessons.length}
        </span>
        <span className="aula-chip" data-tone="green">
          <Icon name="calendar" /> ≈ {lesson.minutes} min
        </span>
        <span className="aula-chip">
          <Icon name="route" /> {kindLabel[lesson.kind]}
        </span>
        <span className="aula-chip" data-tone="amber">
          <Icon name="star" /> Codex + GPT-5.6 Sol
        </span>
      </div>

      <div className="prose web-ai-prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h3({ children }) {
              return <h2>{children}</h2>;
            },
            h4({ children }) {
              return <h3>{children}</h3>;
            },
            h5({ children }) {
              return <h4>{children}</h4>;
            },
            a({ href, children }) {
              const external = href?.startsWith("http://") || href?.startsWith("https://");
              return (
                <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {children}
                </a>
              );
            },
            blockquote({ children }) {
              return <blockquote className="callout callout-info">{children}</blockquote>;
            },
            details({ children }) {
              return <details className="codex-answer">{children}</details>;
            },
            summary({ children }) {
              return <summary>{children}</summary>;
            },
            table({ children }) {
              return (
                <div className="aula-table-scroll" role="region" aria-label="Tabla desplazable horizontalmente" tabIndex={0}>
                  <table>{children}</table>
                </div>
              );
            },
          }}
        >
          {lesson.markdown}
        </ReactMarkdown>
      </div>

      <ChapterNav
        prev={prev ? { href: `${COURSE_HREF}/${prev.slug}`, label: prev.title } : undefined}
        next={next ? { href: `${COURSE_HREF}/${next.slug}`, label: next.title } : undefined}
      />
    </Chapter>
  );
}
