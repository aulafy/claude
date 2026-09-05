import type { Metadata } from "next";
import LegacyWiki from "@/components/LegacyWiki";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: "Aulafy Wiki | Previous courses, lessons and articles", description: "Aulafy's open library: AI fundamentals, professional applications, code, Ollama, RAG, agents and security. Browse earlier content without an account.", alternates: { canonical: "/en/wiki", languages: { es: "/wiki", en: "/en/wiki" } }, ...(q ? { robots: { index: false, follow: true } } : {}) };
}

export default async function WikiPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <LegacyWiki english query={typeof q === "string" ? q.slice(0, 160) : ""} />;
}
