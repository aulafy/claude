import { previewBook } from "@/lib/living-book/preview";
import { EditionView } from "@/components/living-book/BookViews";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { return <EditionView {...previewBook((await params).locale)} editorial={false} />; }
