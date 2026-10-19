import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Prompt injection indirecta en PDF, webs y agentes",
  description:
    "Tutorial práctico en español para impedir que instrucciones ocultas en documentos, webs, hojas o tools controlen un agente de IA.",
  keywords: [
    "prompt injection indirecta español",
    "prompt injection PDF",
    "seguridad agentes IA",
    "prompt injection MCP",
    "documentos maliciosos RAG",
    "OWASP LLM01",
  ],
  alternates: { canonical: "/cursos/rag-seguro/prompt-injection" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["prompt-injection"]} />;
}
