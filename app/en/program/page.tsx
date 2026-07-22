import type { Metadata } from "next";
import AiProgramPage from "@/components/AiProgramPage";

export const metadata: Metadata = {
  title: "Modular program in Applied Artificial Intelligence | Aulafy",
  description:
    "A seven-module open program for learning applied AI: orientation, small businesses, programming, web, RAG, agents, local models, and verifiable projects.",
  alternates: { canonical: "/en/program", languages: { "es-ES": "/programa", "en-US": "/en/program" } },
};

export default function Page() {
  return <AiProgramPage locale="en" />;
}
