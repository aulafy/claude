import type { Metadata } from "next";
import LearningPathsPage from "@/components/LearningPathsPage";

export const metadata: Metadata = {
  title: "Aprender IA desde cero: rutas gratuitas por nivel",
  description: "Aprende inteligencia artificial desde cero con un itinerario gratuito en español según tu nivel: sin programar, webs con IA, negocio, RAG, agentes o MLOps.",
  alternates: { canonical: "/rutas", languages: { "es-ES": "/rutas", "en-US": "/en/paths" } },
};

export default function Page() { return <LearningPathsPage locale="es" />; }
