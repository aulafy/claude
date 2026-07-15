import type { Metadata } from "next";
import LearningPathsPage from "@/components/LearningPathsPage";

export const metadata: Metadata = {
  title: "Rutas para aprender inteligencia artificial",
  description: "Itinerarios gratuitos por nivel y objetivo: empezar sin programar, crear webs y SaaS, aplicar IA a un negocio o avanzar en RAG, agentes y MLOps.",
  alternates: { canonical: "/rutas", languages: { "es-ES": "/rutas", "en-US": "/en/paths" } },
};

export default function Page() { return <LearningPathsPage locale="es" />; }
