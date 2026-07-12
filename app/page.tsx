import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { cursos, totalLecciones } from "@/lib/cursos";
import { getLearningPaths } from "@/lib/learning-paths";
import "./laboratorio/landing/landing.css";

export const metadata: Metadata = {
  title: "Aulafy — Cursos gratis de IA open source en español",
  description:
    "Aprende inteligencia artificial con cursos gratuitos y prácticos sobre OpenAI Codex, Claude Code, IA local, RAG, agentes, seguridad, MLOps y automatización.",
  alternates: { canonical: "/", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Aprende IA construyendo sistemas reales",
    description:
      "Cursos gratuitos y prácticos de IA open source en español: Codex, Claude Code, IA local, RAG, agentes y automatización.",
    type: "website",
    locale: "es_ES",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, cursos gratuitos de inteligencia artificial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aulafy — Aprende IA construyendo sistemas reales",
    description: "Cursos gratuitos y prácticos de IA open source en español.",
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
