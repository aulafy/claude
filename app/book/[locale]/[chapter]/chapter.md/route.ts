import { previewBook } from "@/lib/living-book/preview";
export async function GET(_request: Request, { params }: { params: Promise<{ locale: string; chapter: string }> }) {
  const parameters = await params;
  const { book, locale } = previewBook(parameters.locale);
  const chapter = book.chapters.find(chapter => chapter.metadata.id === parameters.chapter);
  if (!chapter) return new Response("Not found", { status: 404 });
  const text = `# ${chapter.metadata.localized[locale].title}\n\nAulafy / Local draft / ${locale}\nRevision: ${chapter.hashes[locale]}\nEditorial approval pending.\n\n${chapter.bodies[locale]}`;
  return new Response(text, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Content-Disposition": `attachment; filename="aulafy-${chapter.metadata.id}-${locale}.md"`, "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" } });
}
