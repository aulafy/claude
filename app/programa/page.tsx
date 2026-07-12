import type { Metadata } from "next";
import AiProgramPage from "@/components/AiProgramPage";

export const metadata: Metadata = {
  title: "Programa completo para aprender IA | Aulafy",
  description:
    "Hoja de ruta completa de Aulafy para aprender IA desde perfiles no técnicos hasta ingeniería de sistemas, agentes, RAG, MLOps, seguridad y proyectos evaluables.",
  alternates: { canonical: "/programa", languages: { "es-ES": "/programa", "en-US": "/en/program" } },
};

export default function Page() {
  return <AiProgramPage locale="es" />;
}
