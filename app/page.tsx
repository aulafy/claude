import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { cursos, totalLecciones } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Aulafy — Aprende IA paso a paso, de cero a proyectos reales",
  description: "Aprende inteligencia artificial desde cero con rutas prácticas, cursos gratuitos y fuentes visibles. Para principiantes, profesionales, desarrolladores y pymes.",
  alternates: { canonical: "/", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" }, types: { "application/rss+xml": "/feed.xml" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Aprende IA paso a paso",
    description: "Rutas y cursos gratuitos para aprender IA desde cero, aplicarla en el trabajo y construir proyectos fiables.",
    type: "website", locale: "es_ES", url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, educación abierta para aprender inteligencia artificial" }],
  },
  twitter: {
    card: "summary_large_image", title: "Aulafy — Aprende IA paso a paso",
    description: "Cursos abiertos para aprender IA desde cero, aplicarla en el trabajo y construir proyectos reales.", creator: "@learntouseai", images: ["/opengraph-image"],
  },
};

export default function Home() {
  const lessons = cursos.reduce((sum, course) => sum + totalLecciones(course), 0);
  return <AulafyNexusLanding courseCount={cursos.length} lessonCount={lessons} />;
}
