import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Chapter, ChapterNav } from "@/components/Book";
import Icon from "@/components/Icon";
import SessionlessPractice from "@/components/SessionlessPractice";
import LessonQualityCard from "@/components/LessonQualityCard";
import {
  IA_BASICS_COURSE_SLUG,
  getIaBasicsLesson,
  iaBasicsLessons,
} from "@/lib/ia-basics-course-content";
import { getSessionlessPractice } from "@/lib/sessionless-practices";
import { getIaBasicsQuality } from "@/lib/ia-basics-quality";

const COURSE_HREF = `/cursos/${IA_BASICS_COURSE_SLUG}`;
const COURSE_LABEL = "IA desde cero";

export function iaBasicsLessonMetadata(slug: string): Metadata {
  const lesson = getIaBasicsLesson(slug);
  if (!lesson) return {};
  const quality = getIaBasicsQuality(slug);

  return {
    title: `${lesson.title} — IA desde cero`,
    description: lesson.lead,
    keywords: [
      lesson.title,
      "aprender inteligencia artificial desde cero",
      "curso IA en español",
      "IA generativa para principiantes",
    ],
    alternates: { canonical: `${COURSE_HREF}/${slug}` },
    openGraph: {
      title: lesson.title,
      description: lesson.lead,
      url: `${COURSE_HREF}/${slug}`,
      type: "article",
      modifiedTime: quality?.reviewedAt,
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
  criterio: "Criterio y seguridad",
  practica: "Práctica guiada",
};

export default function IaBasicsLessonPage({ slug }: { slug: string }) {
  const lesson = getIaBasicsLesson(slug);
  if (!lesson) notFound();

  const index = iaBasicsLessons.findIndex((item) => item.slug === slug);
  const prev = iaBasicsLessons[index - 1];
  const next = iaBasicsLessons[index + 1];
  const practice = getSessionlessPractice(slug);
  const quality = getIaBasicsQuality(slug);

  return (
    <Chapter
      crumb={lesson.title}
      title={lesson.title}
      icon="sparkle"
      lead={lesson.lead}
      courseHref={COURSE_HREF}
      courseLabel={COURSE_LABEL}
    >
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="aula-chip" data-tone="cyan">
          <Icon name="book" /> Lección {lesson.number} de {iaBasicsLessons.length}
        </span>
        <span className="aula-chip" data-tone="green">
          <Icon name="calendar" /> ≈ {lesson.minutes} min
        </span>
        <span className="aula-chip">
          <Icon name="route" /> {kindLabel[lesson.kind]}
        </span>
        <span className="aula-chip" data-tone="amber">
          <Icon name="shield" /> Sin herramienta obligatoria
        </span>
      </div>

      {practice ? <SessionlessPractice practice={practice} /> : null}

      {quality ? <LessonQualityCard {...quality} /> : null}

      <h2 className="mb-4 mt-10 font-display text-2xl font-bold text-white">Explicación, ejemplos y práctica completa</h2>

      <div className="prose codex-zero-prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            a({ href, children }) {
              const external = href?.startsWith("http://") || href?.startsWith("https://");
              return <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
            },
            blockquote({ children }) {
              return <blockquote className="callout callout-info">{children}</blockquote>;
            },
            table({ children }) {
              return <div className="aula-table-scroll" role="region" aria-label="Tabla desplazable horizontalmente" tabIndex={0}><table>{children}</table></div>;
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
