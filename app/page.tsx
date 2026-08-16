import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { cursos, totalLecciones } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Aulafy — Aprende inteligencia artificial desde cero",
  description: "Aprende inteligencia artificial desde cero con una primera misión útil de 15 minutos, rutas gratuitas y progreso privado en tu navegador.",
  alternates: { canonical: "/", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" }, types: { "application/rss+xml": "/feed.xml" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Aprende IA con una ruta clara",
    description: "Haz una primera tarea útil en 15 minutos y continúa con una ruta clara, gratuita y sin registro.",
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
