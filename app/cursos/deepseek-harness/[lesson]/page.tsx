import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chapter, ChapterNav, Comprueba, Guardar, Objetivos, Terminal } from "@/components/Book";
import { dshLessons, getDshLesson } from "@/lib/deepseek-harness-lessons";

export function generateStaticParams() {
  return dshLessons.map((lesson) => ({ lesson: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> {
  const { lesson: slug } = await params;
  const lesson = getDshLesson(slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — DeepSeek Harness (DSH)`,
    description: lesson.lead,
    alternates: { canonical: `/cursos/deepseek-harness/${lesson.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: slug } = await params;
  const lesson = getDshLesson(slug);
  if (!lesson) notFound();
  const index = dshLessons.findIndex((item) => item.slug === slug);
  const previous = index === 0 ? { href: "/cursos/deepseek-harness/introduccion", label: "Qué es DSH y por qué importa" } : dshLessons[index - 1];
  const next = dshLessons[index + 1];
  const previousNav = "slug" in previous
    ? { href: `/cursos/deepseek-harness/${previous.slug}`, label: previous.title }
    : previous;

  return (
    <Chapter
      crumb={`DeepSeek Harness · Fase ${index + 2}`}
      title={lesson.title}
      icon="terminal"
      lead={lesson.lead}
      courseHref="/cursos/deepseek-harness"
      courseLabel="DeepSeek Harness (DSH)"
    >
      <Objetivos><ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></Objetivos>
      {lesson.sections.map((section) => (
        <div className="prose" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
          {section.code ? <Terminal>{section.code}</Terminal> : null}
        </div>
      ))}
      <Comprueba>{lesson.check}</Comprueba>
      <Guardar>{lesson.takeaway}</Guardar>
      <ChapterNav
        prev={previousNav}
        next={next ? { href: `/cursos/deepseek-harness/${next.slug}`, label: next.title } : undefined}
      />
    </Chapter>
  );
}
