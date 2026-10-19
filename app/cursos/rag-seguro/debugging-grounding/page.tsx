import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Debugging RAG: grounding y prompt completo",
  description:
    "Cómo depurar un RAG que recupera documentos correctos pero alucina: logging del prompt completo, grounding estricto, citas y tests.",
  keywords: ["rag alucinaciones fix grounding prompt", "debug rag full prompt logging", "RAG recupera bien pero alucina", "grounding RAG"],
  alternates: { canonical: "/cursos/rag-seguro/debugging-grounding" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["debugging-grounding"]} />;
}
