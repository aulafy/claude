import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { cursos, totalLecciones } from "@/lib/cursos";
import { getLearningPaths } from "@/lib/learning-paths";
import "./laboratorio/landing/landing.css";

export const metadata: Metadata = {
  title: "Aulafy — Aprende IA desde cero o avanza como profesional",
  description:
    "Elige un itinerario gratuito según tu nivel: empieza sin programar, crea una web o avanza en Codex, RAG, agentes, seguridad y MLOps.",
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
