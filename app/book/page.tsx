import { redirect } from "next/navigation";
import { previewBook } from "@/lib/living-book/preview";
export default function Page() { const { book } = previewBook("es"); redirect(`/book/${book.catalog.sourceLocale}/first-task`); }
