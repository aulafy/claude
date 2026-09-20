import { notFound } from "next/navigation";
import { previewBook } from "@/lib/living-book/preview";
import { ChapterView } from "@/components/living-book/BookViews";
export default async function Page({ params }: { params: Promise<{ locale: string; chapter: string }> }) {
  const parameters = await params;
  const context = previewBook(parameters.locale);
  const chapter = context.book.chapters.find(chapter => chapter.metadata.id === parameters.chapter);
  if (!chapter) notFound();
  return <ChapterView {...context} chapter={chapter} />;
}
