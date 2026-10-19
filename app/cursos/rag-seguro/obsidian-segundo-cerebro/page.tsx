import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Segundo cerebro local con Obsidian y RAG",
  description:
    "Convierte notas Markdown de Obsidian en un RAG local con limpieza, frontmatter, backlinks, permisos, Qdrant y respuestas con citas.",
  keywords: ["segundo cerebro local ollama obsidian rag", "Obsidian RAG local", "RAG notas Markdown", "Qdrant Obsidian"],
  alternates: { canonical: "/cursos/rag-seguro/obsidian-segundo-cerebro" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["obsidian-segundo-cerebro"]} />;
}
