import type { Metadata } from "next";
import UnifiedCourse from "@/components/UnifiedCourse";

export const metadata: Metadata = {
  title: "Curso completo de inteligencia artificial en español — Aulafy",
  description:
    "Curso abierto y continuo de inteligencia artificial en español: fundamentos, trabajo, datos, RAG, software, IA local, agentes, seguridad y producción.",
  alternates: { canonical: "/", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Un itinerario de IA para cada punto de partida",
    description:
      "Empieza sin programar, crea una web o avanza hacia sistemas de IA con proyectos verificables, seguridad y código real.",
    type: "website",
    locale: "es_ES",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, cursos gratuitos de inteligencia artificial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aulafy — Un itinerario de IA para cada punto de partida",
    description: "Cursos y rutas gratuitas para empezar desde cero o avanzar hacia proyectos y sistemas de IA reales.",
    creator: "@learntouseai",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return <UnifiedCourse locale="es" />;
}
