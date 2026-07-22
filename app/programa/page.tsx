import type { Metadata } from "next";
import AiProgramPage from "@/components/AiProgramPage";

export const metadata: Metadata = {
  title: "Programa modular de Inteligencia Artificial Aplicada | Aulafy",
  description:
    "Programa abierto de 7 módulos para aprender IA aplicada desde cero: orientación, pymes, programación, webs, RAG, agentes, modelos locales y proyectos verificables.",
  alternates: { canonical: "/programa", languages: { "es-ES": "/programa", "en-US": "/en/program" } },
};

export default function Page() {
  return <AiProgramPage locale="es" />;
}
