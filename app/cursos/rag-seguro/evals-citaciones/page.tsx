import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Evaluar un RAG: citas, abstención, permisos y trazabilidad",
  description:
    "Tutorial y laboratorio en español para medir recuperación, citas válidas, abstención, prompt injection y aislamiento entre usuarios en un sistema RAG.",
  keywords: [
    "evaluar RAG en español",
    "métricas RAG citas",
    "RAG abstención",
    "RAG permisos usuarios",
    "evaluar chatbot con documentos",
    "RAG prompt injection",
  ],
  alternates: { canonical: "/cursos/rag-seguro/evals-citaciones" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["evals-citaciones"]} />;
}
