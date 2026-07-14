import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Chapter, ChapterNav } from "@/components/Book";
import Icon from "@/components/Icon";
import {
  CODEX_ZERO_COURSE_SLUG,
  codexZeroLessons,
  getCodexZeroLesson,
} from "@/lib/codex-zero-course-content";

const COURSE_HREF = `/cursos/${CODEX_ZERO_COURSE_SLUG}`;
const COURSE_LABEL = "Codex desde cero";

export function codexZeroLessonMetadata(slug: string): Metadata {
  const lesson = getCodexZeroLesson(slug);
  if (!lesson) return {};

  return {
    title: `${lesson.title} — Codex desde cero`,
    description: lesson.lead,
    keywords: [lesson.title, "curso Codex desde cero", "tutorial Codex en español", "OpenAI Codex"],
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

export default function CodexZeroLessonPage({ slug }: { slug: string }) {
  const lesson = getCodexZeroLesson(slug);
  if (!lesson) notFound();

  const index = codexZeroLessons.findIndex((item) => item.slug === slug);
  const prev = codexZeroLessons[index - 1];
  const next = codexZeroLessons[index + 1];

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
          <Icon name="book" /> Lección {lesson.number} de {codexZeroLessons.length}
        </span>
        <a href="/manual-codex-desde-cero-aulafy.pdf" className="aula-chip" data-tone="amber">
          <Icon name="pdf" /> Manual completo en PDF
        </a>
      </div>

      <div className="prose codex-zero-prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            a({ href, children }) {
              const external = href?.startsWith("http://") || href?.startsWith("https://");
              return (
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
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
                <div
                  className="aula-table-scroll"
                  role="region"
                  aria-label="Tabla desplazable horizontalmente"
                  tabIndex={0}
                >
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
