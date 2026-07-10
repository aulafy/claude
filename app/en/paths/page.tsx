import type { Metadata } from "next";
import LearningPathsPage from "@/components/LearningPathsPage";

export const metadata: Metadata = {
  title: "AI learning paths",
  description: "Free ordered learning paths for AI-assisted programming, RAG, agents, local models, MLOps, security, and automation.",
  alternates: { canonical: "/en/paths", languages: { "es-ES": "/rutas", "en-US": "/en/paths" } },
};

export default function Page() { return <LearningPathsPage locale="en" />; }
