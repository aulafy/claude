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
import { getCodexLesson, getCodexLessonPractice, type CodexLessonPractice } from "@/lib/codex-course-content";

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
      images: [{ url: "/opengraph-image",
        width: 1200,
        height: 630, alt: `${lesson.title} on Aulafy` }],
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.title,
      description,
      creator: "@learntouseai",
      images: ["/opengraph-image"],
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

function EnglishPracticeCard({ practice }: { practice: CodexLessonPractice }) {
  return (
    <section className="aula-panel p-6 sm:p-8 mt-10" aria-labelledby="codex-practice">
      <span className="aula-section-label"><Icon name="testTube" /> Verifiable practice</span>
      <h2 id="codex-practice" className="font-display text-2xl font-bold text-white mt-3">Lesson deliverable</h2>
      <div className="mt-6 grid gap-5">
        <div><h3 className="text-white font-semibold">What you will build</h3><p className="mt-2 text-zinc-300 leading-relaxed">{practice.build.en}</p></div>
        <div><h3 className="text-white font-semibold">Why it matters</h3><p className="mt-2 text-zinc-300 leading-relaxed">{practice.why.en}</p></div>
        <div><h3 className="text-white font-semibold">Starter repository or files</h3><p className="mt-2 text-zinc-300 leading-relaxed">{practice.starter.en}</p></div>
        <div>
          <h3 className="text-white font-semibold">Steps</h3>
          <ol className="mt-3 grid gap-2 text-zinc-300">
            {practice.steps.en.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
          </ol>
        </div>
        <div>
          <h3 className="text-white font-semibold">Copy-ready Codex request</h3>
          <div className="aula-terminal my-5">
            <pre className="px-4 py-3 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap overflow-x-auto font-[family-name:var(--font-code)]">{practice.codexPrompt.en}</pre>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><h3 className="text-white font-semibold">Expected result</h3><p className="mt-2 text-zinc-300 leading-relaxed">{practice.expected.en}</p></div>
          <div>
            <h3 className="text-white font-semibold">Verification command</h3>
            <div className="aula-terminal my-5">
              <pre className="px-4 py-3 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap overflow-x-auto font-[family-name:var(--font-code)]">{practice.verify}</pre>
            </div>
          </div>
        </div>
        <div><h3 className="text-white font-semibold">Manual check</h3><p className="mt-2 text-zinc-300 leading-relaxed">{practice.manualCheck.en}</p></div>
        <div className="callout callout-warning"><strong>Common error.</strong> {practice.commonError.en}</div>
        <div>
          <h3 className="text-white font-semibold">Mini exercise</h3>
          <p className="mt-2 text-zinc-300 leading-relaxed">{practice.exercise.en}</p>
          <details className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-4">
            <summary className="cursor-pointer text-fuchsia-300 font-semibold">Show solution</summary>
            <p className="mt-3 text-zinc-300 leading-relaxed">{practice.solution.en}</p>
          </details>
        </div>
        <div><h3 className="text-white font-semibold">Evidence to save</h3><p className="mt-2 text-zinc-300 leading-relaxed">{practice.evidence.en}</p></div>
        <div>
          <h3 className="text-white font-semibold">Official sources and tested version</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {practice.sources.map((source) => (
              <a key={source.href} href={source.href} className="aula-chip" target="_blank" rel="noreferrer"><Icon name="external" /> {source.label}</a>
            ))}
            <span className="aula-chip" data-tone="green">Tested: {practice.tested}</span>
          </div>
        </div>
      </div>
    </section>
  );
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
  const codexLesson = slug === "codex-programadores" ? getCodexLesson(lessonSlug) : undefined;
  const codexPractice = codexLesson ? getCodexLessonPractice(codexLesson) : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "@id": `${SITE_URL}/en/courses/${slug}/${lessonSlug}#learning-resource`,
        name: lesson.title,
        description: getEnglishLessonDescription(lesson),
        url: `${SITE_URL}/en/courses/${slug}/${lessonSlug}`,
        inLanguage: "en",
        isAccessibleForFree: true,
        learningResourceType: "Lesson",
        isPartOf: { "@id": `${SITE_URL}/en/courses/${slug}#learning-resource`, name: course.title },
        provider: { "@id": `${SITE_URL}/#organization` },
        author: { "@id": `${SITE_URL}/#author` },
        isBasedOn: { "@id": `${SITE_URL}/cursos/${slug}/${lessonSlug}#learning-resource` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
          { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/en/courses` },
          { "@type": "ListItem", position: 3, name: course.title, item: `${SITE_URL}/en/courses/${slug}` },
          { "@type": "ListItem", position: 4, name: lesson.title, item: `${SITE_URL}/en/courses/${slug}/${lessonSlug}` },
        ],
      },
    ],
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
        {codexPractice ? <EnglishPracticeCard practice={codexPractice} /> : null}
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
