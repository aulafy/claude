import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "RAG útil: mucho más que chat con PDF",
  description:
    "Aprende qué piezas necesita un sistema RAG fiable: ingesta, chunking, embeddings, vector DB, reranking, citaciones, permisos y evaluación.",
  keywords: ["RAG avanzado", "RAG local español", "chatbot documentos privados", "RAG producción"],
  alternates: { canonical: "/cursos/rag-seguro/mapa-rag" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["mapa-rag"]} />;
}
