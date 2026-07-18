import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { cursos, totalLecciones } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Laboratorio de portada | Aulafy",
  description: "Prototipo visual de la nueva experiencia educativa de Aulafy.",
  robots: { index: false, follow: false },
};

export default function ExperimentalLandingPage() {
  const lessons = cursos.reduce((sum, course) => sum + totalLecciones(course), 0);
  return (
    <AulafyNexusLanding
      courseCount={cursos.length}
      lessonCount={lessons}
    />
  );
}
