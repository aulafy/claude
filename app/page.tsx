import type { Metadata } from "next";
import UnifiedCourse from "@/components/UnifiedCourse";

export const metadata: Metadata = {
  title: "Curso completo de inteligencia artificial en español — Aulafy",
  description:
    "Curso abierto y continuo de inteligencia artificial en español: fundamentos, trabajo, datos, RAG, software, IA local, agentes, seguridad y producción.",
  alternates: { canonical: "/", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Curso completo de inteligencia artificial en español — Aulafy",
    description:
      "28 lecciones y 7 proyectos para aprender IA desde los fundamentos hasta RAG, software, modelos locales, agentes, seguridad y producción.",
    type: "article",
    locale: "es_ES",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, cursos gratuitos de inteligencia artificial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curso completo de inteligencia artificial en español — Aulafy",
    description: "28 lecciones y 7 proyectos integradores, gratis, abiertos y sin registro.",
    creator: "@learntouseai",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return <UnifiedCourse locale="es" />;
}
