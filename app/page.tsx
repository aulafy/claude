import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { cursos, totalLecciones } from "@/lib/cursos";
import { getLearningPaths } from "@/lib/learning-paths";
import "./laboratorio/landing/landing.css";

export const metadata: Metadata = {
  title: "Aulafy — Educación abierta para aprender IA construyendo",
  description:
    "Aprende inteligencia artificial con cursos, rutas y proyectos gratuitos sobre Codex, Claude Code, IA local, RAG, agentes, seguridad, MLOps y automatización.",
  alternates: { canonical: "/", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Aprende IA construyendo sistemas reales",
    description:
      "Educación abierta y gratuita para aprender IA con proyectos verificables, herramientas locales y servicios comerciales cuando aportan valor.",
    type: "website",
    locale: "es_ES",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, cursos gratuitos de inteligencia artificial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aulafy — Aprende IA construyendo sistemas reales",
    description: "Cursos, rutas y proyectos gratuitos para aprender IA construyendo sistemas reales.",
    creator: "@learntouseai",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  const lessons = cursos.reduce((sum, course) => sum + totalLecciones(course), 0);
  const featured = cursos.slice(0, 6).map((course) => ({
    slug: course.slug,
    title: course.title,
    short: course.short,
    level: course.level,
    lessons: totalLecciones(course),
  }));

  return (
    <AulafyNexusLanding
      courseCount={cursos.length}
      lessonCount={lessons}
      paths={getLearningPaths("es")}
      courses={featured}
    />
  );
}
