import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Búsqueda híbrida y reranking",
  description:
    "Mejora la precisión del RAG combinando búsqueda semántica, búsqueda por palabras clave, filtros y reranking antes de generar respuestas.",
  keywords: ["búsqueda híbrida RAG", "reranking RAG", "Qdrant hybrid search", "RAG precisión"],
  alternates: { canonical: "/cursos/rag-seguro/hybrid-reranking" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["hybrid-reranking"]} />;
}
