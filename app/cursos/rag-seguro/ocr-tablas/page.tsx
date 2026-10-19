import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "OCR y tablas en PDFs reales",
  description:
    "Cómo preparar PDFs escaneados, facturas y tablas para RAG con OCR, lectura de layout, extracción estructurada y revisión antes de indexar.",
  keywords: ["OCR RAG", "tablas PDF RAG", "Docling OCR", "extraer tablas PDF IA", "RAG facturas PDF"],
  alternates: { canonical: "/cursos/rag-seguro/ocr-tablas" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["ocr-tablas"]} />;
}
