import IaBasicsLessonPage, { iaBasicsLessonMetadata } from "@/components/IaBasicsLessonPage";
import { iaBasicsLessons } from "@/lib/ia-basics-course-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return iaBasicsLessons.map((lesson) => ({ lesson: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson } = await params;
  return iaBasicsLessonMetadata(lesson);
}

export default async function Page({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson } = await params;
  return <IaBasicsLessonPage slug={lesson} />;
}
