import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Ingesta, limpieza y chunking",
  description:
    "Cómo preparar documentos para RAG: extracción, limpieza, metadatos, chunking por estructura y control de calidad antes de indexar.",
  alternates: { canonical: "/cursos/rag-seguro/ingesta-chunking" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["ingesta-chunking"]} />;
}
