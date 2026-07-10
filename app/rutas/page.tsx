import type { Metadata } from "next";
import LearningPathsPage from "@/components/LearningPathsPage";

export const metadata: Metadata = {
  title: "Rutas para aprender inteligencia artificial",
  description: "Itinerarios gratuitos y ordenados para aprender programación con IA, RAG, agentes, modelos locales, MLOps, seguridad y automatización.",
  alternates: { canonical: "/rutas", languages: { "es-ES": "/rutas", "en-US": "/en/paths" } },
};

export default function Page() { return <LearningPathsPage locale="es" />; }
