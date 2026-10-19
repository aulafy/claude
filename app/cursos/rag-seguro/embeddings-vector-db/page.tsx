import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Embeddings y bases vectoriales",
  description:
    "Qué son los embeddings, cuándo usar Chroma, Qdrant o FAISS, y cómo diseñar una base vectorial para RAG local y privado.",
  keywords: ["embeddings locales", "Qdrant RAG", "Chroma RAG", "FAISS español"],
  alternates: { canonical: "/cursos/rag-seguro/embeddings-vector-db" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["embeddings-vector-db"]} />;
}
