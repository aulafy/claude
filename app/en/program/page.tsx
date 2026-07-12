import type { Metadata } from "next";
import AiProgramPage from "@/components/AiProgramPage";

export const metadata: Metadata = {
  title: "Complete AI learning program | Aulafy",
  description:
    "A complete Aulafy roadmap for learning AI from non-technical profiles to systems engineering, agents, RAG, MLOps, security, and evaluated projects.",
  alternates: { canonical: "/en/program", languages: { "es-ES": "/programa", "en-US": "/en/program" } },
};

export default function Page() {
  return <AiProgramPage locale="en" />;
}
