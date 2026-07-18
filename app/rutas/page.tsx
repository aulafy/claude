import type { Metadata } from "next";
import LearningPathsPage from "@/components/LearningPathsPage";

export const metadata: Metadata = {
  title: "Aprender IA desde cero: rutas gratuitas por nivel",
  description: "Aprende inteligencia artificial desde cero con un itinerario gratuito en español según tu nivel: sin programar, webs con IA, negocio, RAG, agentes o MLOps.",
  alternates: { canonical: "/rutas", languages: { "es-ES": "/rutas", "en-US": "/en/paths" } },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ perfil?: string | string[]; ruta?: string | string[] }> }) {
  const { perfil, ruta } = await searchParams;
  return <LearningPathsPage locale="es" initialProfile={typeof perfil === "string" ? perfil : undefined} initialPath={typeof ruta === "string" ? ruta : undefined} />;
}
