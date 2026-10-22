import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebappsLessonView } from "@/components/WebappsLesson";
import { getWebappsLesson, getWebappsLessons, webappsLessonPath } from "@/lib/webapps-pymes";

export function generateStaticParams() {
  return getWebappsLessons("es").map((lesson) => ({ lesson: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> {
  const { lesson: slug } = await params;
  const lesson = getWebappsLesson("es", slug);
  if (!lesson) return {};
  return {
    title: `${lesson.heading} — Web apps para pymes con Claude`,
    description: lesson.lead,
    alternates: {
      canonical: webappsLessonPath("es", slug),
      languages: { "es-ES": webappsLessonPath("es", slug), "en-US": webappsLessonPath("en", slug), "x-default": webappsLessonPath("es", slug) },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: slug } = await params;
  const lesson = getWebappsLesson("es", slug);
  if (!lesson) notFound();
  return <WebappsLessonView lesson={lesson} locale="es" />;
}
