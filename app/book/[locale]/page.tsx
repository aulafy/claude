import { previewBook } from "@/lib/living-book/preview";
import { ContentsView } from "@/components/living-book/BookViews";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const context = previewBook((await params).locale);
  return <ContentsView {...context} />;
}
