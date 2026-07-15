import WebAiLessonPage, { webAiLessonMetadata } from "@/components/WebAiLessonPage";
import { webAiLessons } from "@/lib/web-ai-course-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return webAiLessons.map((lesson) => ({ lesson: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson } = await params;
  return webAiLessonMetadata(lesson);
}

export default async function Page({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson } = await params;
  return <WebAiLessonPage slug={lesson} />;
}
