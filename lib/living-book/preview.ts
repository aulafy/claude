import { notFound } from "next/navigation";
import { loadBook } from "./engine";
import type { BookLocale } from "./schema";

export function previewBook(locale: string) {
  if (process.env.AULAFY_BOOK_PREVIEW !== "1" || (locale !== "es" && locale !== "en")) notFound();
  return { book: loadBook(), locale: locale as BookLocale };
}
