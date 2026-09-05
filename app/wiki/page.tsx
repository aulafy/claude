import type { Metadata } from "next";
import LegacyWiki from "@/components/LegacyWiki";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: "Wiki de Aulafy | Cursos, lecciones y artículos anteriores", description: "Biblioteca abierta de Aulafy: fundamentos de IA, aplicaciones profesionales, código, Ollama, RAG, agentes y seguridad. Consulta el contenido anterior sin registrarte.", alternates: { canonical: "/wiki", languages: { es: "/wiki", en: "/en/wiki" } }, ...(q ? { robots: { index: false, follow: true } } : {}) };
}

export default async function WikiPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <LegacyWiki query={typeof q === "string" ? q.slice(0, 160) : ""} />;
}
