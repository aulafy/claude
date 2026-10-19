import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Respuestas estructuradas con citas en RAG",
  description:
    "Define contratos de respuesta para RAG profesional: answer, confidence, citations, missing_fields, no sé, evidencias y validación antes de responder.",
  keywords: ["RAG respuestas estructuradas citas", "RAG citations confidence JSON", "fix RAG hallucinations citations", "RAG no sé"],
  alternates: { canonical: "/cursos/rag-seguro/respuestas-estructuradas-citas" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["respuestas-estructuradas-citas"]} />;
}
