import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon, { type IconName } from "@/components/Icon";
import { cursos, lecciones } from "@/lib/cursos";
import { getLocalizedCurso } from "@/lib/i18n";
import {
  getEnglishLesson,
  getEnglishLessonDescription,
  getEnglishLessons,
  getEnglishLessonTitle,
  type EnglishLessonBlock,
} from "@/lib/english-lessons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export function generateStaticParams() {
  return getEnglishLessons().map((lesson) => ({ slug: lesson.courseSlug, lesson: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}): Promise<Metadata> {
  const { slug, lesson: lessonSlug } = await params;
  const course = getLocalizedCurso(slug, "en");
  const lesson = getEnglishLesson(slug, lessonSlug);
  if (!course || !lesson) return {};

  const description = getEnglishLessonDescription(lesson);

  return {
    title: lesson.title,
    description,
    keywords: [lesson.title, course.title, "free AI course", "open-source AI lesson", "Aulafy"],
    alternates: {
      canonical: `/en/courses/${slug}/${lessonSlug}`,
      languages: {
        "es-ES": `/cursos/${slug}/${lessonSlug}`,
        "en-US": `/en/courses/${slug}/${lessonSlug}`,
      },
    },
    openGraph: {
      title: lesson.title,
      description,
      url: `/en/courses/${slug}/${lessonSlug}`,
      type: "article",
      siteName: "Aulafy",
      locale: "en_US",
      images: [{ url: "/og-image.png", width: 512, height: 512, alt: `${lesson.title} on Aulafy` }],
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.title,
      description,
      creator: "@learntouseai",
      images: ["/og-image.png"],
    },
  };
}

function groupedBlocks(blocks: EnglishLessonBlock[]) {
  const groups: Array<EnglishLessonBlock | { type: "bullets"; items: EnglishLessonBlock[] }> = [];

  for (const block of blocks) {
    if (block.type === "bullet") {
      const previous = groups[groups.length - 1];
      if (previous && previous.type === "bullets") previous.items.push(block);
      else groups.push({ type: "bullets", items: [block] });
    } else {
      groups.push(block);
    }
  }

  return groups;
}

function renderBlocks(blocks: EnglishLessonBlock[]) {
  return groupedBlocks(blocks).map((block, index) => {
    if (block.type === "bullets") {
      return (
        <ul key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={`${index}-${itemIndex}`}>{item.text}</li>
          ))}
        </ul>
      );
    }

    if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
    if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
    if (block.type === "p") return <p key={index}>{block.text}</p>;

    return (
      <div key={index} className="aula-terminal my-5">
        <div className="aula-terminal-bar">
          <span className="flex items-center gap-1.5">
            <Icon name="terminal" /> Terminal
          </span>
          <span className="aula-chip">Code</span>
        </div>
        <pre className="px-4 py-3 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap overflow-x-auto font-[family-name:var(--font-code)]">
          {block.text}
        </pre>
      </div>
    );
  });
}

function lessonNavigation(courseSlug: string, lessonSlug: string) {
  const course = cursos.find((item) => item.slug === courseSlug);
  if (!course) return {};
  const courseLessons = lecciones(course);
  const index = courseLessons.findIndex((lesson) => lesson.slug === lessonSlug);
  if (index < 0) return {};

  const prev = courseLessons[index - 1];
  const next = courseLessons[index + 1];

  return {
    prev: prev
      ? {
          href: `/en/courses/${courseSlug}/${prev.slug}`,
          label: getEnglishLessonTitle(courseSlug, prev.slug, prev.title),
        }
      : undefined,
    next: next
      ? {
          href: `/en/courses/${courseSlug}/${next.slug}`,
          label: getEnglishLessonTitle(courseSlug, next.slug, next.title),
        }
      : undefined,
  };
}

export default async function EnglishLessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson: lessonSlug } = await params;
  const course = getLocalizedCurso(slug, "en");
  const lesson = getEnglishLesson(slug, lessonSlug);
  if (!course || !lesson) notFound();

  const [lead, ...body] = lesson.blocks;
  const nav = lessonNavigation(slug, lessonSlug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${SITE_URL}/en/courses/${slug}/${lessonSlug}#learning-resource`,
    name: lesson.title,
    description: getEnglishLessonDescription(lesson),
    url: `${SITE_URL}/en/courses/${slug}/${lessonSlug}`,
    inLanguage: "en",
    isAccessibleForFree: true,
    learningResourceType: "Lesson",
    isPartOf: { "@id": `${SITE_URL}/en/courses/${slug}#course`, name: course.title },
    provider: { "@type": "Organization", name: "Aulafy", url: SITE_URL },
    isBasedOn: { "@id": `${SITE_URL}/cursos/${slug}/${lessonSlug}#learning-resource` },
  };

  return (
    <div className="aula-shell max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-14" lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-4 aula-meta">
        <Link href="/en/courses" className="hover:text-zinc-400">Courses</Link>
        <span className="mx-2">/</span>
        <Link href={`/en/courses/${slug}`} className="hover:text-zinc-400">{course.title}</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{lesson.title}</span>
      </div>

      <header className="aula-frame p-6 sm:p-8 mb-10">
        <div
          className="aula-course-art mb-5 w-14 h-14 rounded-lg flex items-center justify-center text-white text-xl"
          style={{ background: `linear-gradient(120deg, ${course.gradient[0]}, ${course.gradient[1]})` }}
        >
          <Icon name={course.icon as IconName} />
        </div>
        <span className="aula-section-label">
          <Icon name="book" /> Lesson
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4 leading-tight">
          {lesson.title}
        </h1>
        {lead?.type === "p" ? <p className="lesson-lead">{lead.text}</p> : null}
      </header>

      <article className="aula-reading mx-auto">
        <div className="prose">
          {renderBlocks(lead?.type === "p" ? body : lesson.blocks)}
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        {nav.prev ? (
          <Link href={nav.prev.href} className="aula-button aula-button-secondary justify-start">
            <Icon name="chevronRight" className="rotate-180" /> {nav.prev.label}
          </Link>
        ) : <span />}
        {nav.next ? (
          <Link href={nav.next.href} className="aula-button aula-button-primary justify-start sm:justify-center">
            {nav.next.label} <Icon name="chevronRight" />
          </Link>
        ) : (
          <Link href={`/en/courses/${slug}`} className="aula-button aula-button-secondary justify-start sm:justify-center">
            Back to course <Icon name="grid" />
          </Link>
        )}
      </div>
    </div>
  );
}
