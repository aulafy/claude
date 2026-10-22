import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebappsLessonView } from "@/components/WebappsLesson";
import { getWebappsLesson, getWebappsLessons, webappsLessonPath } from "@/lib/webapps-pymes";

export function generateStaticParams() {
  return getWebappsLessons("en").map((lesson) => ({ lesson: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> {
  const { lesson: slug } = await params;
  const lesson = getWebappsLesson("en", slug);
  if (!lesson) return {};
  return {
    title: `${lesson.heading} — Small-business web apps with Claude`,
    description: lesson.lead,
    alternates: {
      canonical: webappsLessonPath("en", slug),
      languages: { "es-ES": webappsLessonPath("es", slug), "en-US": webappsLessonPath("en", slug), "x-default": webappsLessonPath("es", slug) },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: slug } = await params;
  const lesson = getWebappsLesson("en", slug);
  if (!lesson) notFound();
  return <WebappsLessonView lesson={lesson} locale="en" />;
}
