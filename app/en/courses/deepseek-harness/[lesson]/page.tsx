import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chapter, ChapterNav, Comprueba, Guardar, Objetivos, Terminal } from "@/components/Book";
import { dshEnglishLessons, getDshEnglishLesson } from "@/lib/deepseek-harness-lessons-en";

export function generateStaticParams() {
  return dshEnglishLessons.map((lesson) => ({ lesson: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> {
  const { lesson: slug } = await params;
  const lesson = getDshEnglishLesson(slug);
  if (!lesson) return {};
  return { title: `${lesson.title} — DeepSeek Harness (DSH)`, description: lesson.lead, alternates: { canonical: `/en/courses/deepseek-harness/${lesson.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: slug } = await params;
  const lesson = getDshEnglishLesson(slug);
  if (!lesson) notFound();
  const index = dshEnglishLessons.findIndex((item) => item.slug === slug);
  const previous = index === 0 ? { href: "/en/courses/deepseek-harness/introduction", label: "What is DSH and why does it matter?" } : dshEnglishLessons[index - 1];
  const previousNav = "slug" in previous ? { href: `/en/courses/deepseek-harness/${previous.slug}`, label: previous.title } : previous;
  const next = dshEnglishLessons[index + 1];
  return (
    <Chapter crumb={`DeepSeek Harness · Phase ${index + 2}`} title={lesson.title} icon="terminal" lead={lesson.lead} courseHref="/en/courses/deepseek-harness" courseLabel="DeepSeek Harness (DSH)">
      <Objetivos><ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></Objetivos>
      {lesson.sections.map((section) => <div className="prose" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}{section.code ? <Terminal>{section.code}</Terminal> : null}</div>)}
      <Comprueba>{lesson.check}</Comprueba>
      <Guardar>{lesson.takeaway}</Guardar>
      <ChapterNav prev={previousNav} next={next ? { href: `/en/courses/deepseek-harness/${next.slug}`, label: next.title } : undefined} />
    </Chapter>
  );
}
