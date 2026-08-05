import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { cursos, totalLecciones } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Aulafy — Aprende inteligencia artificial desde cero",
  description: "Cursos gratuitos de inteligencia artificial en español. Elige una ruta por objetivo o sigue un curso continuo de 28 lecciones, sin registro.",
  alternates: { canonical: "/", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Aprende IA con una ruta clara",
    description: "Empieza sin programar, construye un proyecto o avanza hacia RAG, agentes, seguridad y modelos locales.",
    type: "website", locale: "es_ES", url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, educación abierta para aprender inteligencia artificial" }],
  },
  twitter: {
    card: "summary_large_image", title: "Aulafy — Aprende IA con una ruta clara",
    description: "Cursos y proyectos gratuitos en español, desde cero hasta sistemas de IA fiables.", creator: "@learntouseai", images: ["/opengraph-image"],
  },
};

export default function Home() {
  const lessons = cursos.reduce((sum, course) => sum + totalLecciones(course), 0);
  return <AulafyNexusLanding courseCount={cursos.length} lessonCount={lessons} />;
}
