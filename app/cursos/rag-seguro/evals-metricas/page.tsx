import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Evals RAG con métricas",
  description:
    "Cómo evaluar un RAG con métricas simples: recuperación, citas, abstención correcta, permisos y resistencia a prompt injection.",
  keywords: ["evals RAG", "métricas RAG", "evaluar RAG", "RAG faithfulness", "RAG retrieval quality"],
  alternates: { canonical: "/cursos/rag-seguro/evals-metricas" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["evals-metricas"]} />;
}
