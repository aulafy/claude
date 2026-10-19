import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Chunking avanzado para RAG privado",
  description:
    "Diseña chunking semántico para RAG privado: overlap, headings, metadatos, separación por secciones, documentos en español y evaluación de recuperación.",
  keywords: ["chunking avanzado RAG", "semantic chunking Qdrant", "chunking documentos español RAG", "RAG overlap metadata headings"],
  alternates: { canonical: "/cursos/rag-seguro/chunking-avanzado" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["chunking-avanzado"]} />;
}
