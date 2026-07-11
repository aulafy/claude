import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { cursos, totalLecciones } from "@/lib/cursos";
import { getLearningPaths } from "@/lib/learning-paths";
import "./landing.css";

export const metadata: Metadata = {
  title: "Laboratorio de portada | Aulafy",
  description: "Prototipo visual de la nueva experiencia educativa de Aulafy.",
  robots: { index: false, follow: false },
};

export default function ExperimentalLandingPage() {
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
