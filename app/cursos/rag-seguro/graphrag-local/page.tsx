import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "GraphRAG local y memoria con grafos",
  description:
    "Aprende cuándo usar GraphRAG local, cómo extraer entidades y relaciones, combinar búsqueda vectorial con grafos y evaluar si mejora un RAG privado.",
  keywords: ["GraphRAG local", "RAG con grafos", "memoria agentes grafos", "knowledge graph RAG", "RAG avanzado español"],
  alternates: { canonical: "/cursos/rag-seguro/graphrag-local" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["graphrag-local"]} />;
}
