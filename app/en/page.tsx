import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { totalLecciones } from "@/lib/cursos";
import { getLocalizedCursos } from "@/lib/i18n";
import { getLearningPaths } from "@/lib/learning-paths";
import "../laboratorio/landing/landing.css";

export const metadata: Metadata = {
  title: "Aulafy — Free open-source AI courses in English",
  description:
    "Free practical AI courses in English: OpenAI Codex, Claude Code, local AI, RAG, agents, security, MLOps and automation.",
  alternates: { canonical: "/en", languages: { "es-ES": "/", "en-US": "/en" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Learn AI by building real systems",
    description: "Free practical open-source AI courses: Codex, Claude Code, local AI, RAG, agents, security, and automation.",
    type: "website",
    locale: "en_US",
    url: "/en",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, free open-source AI courses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aulafy — Learn AI by building real systems",
    description: "Free practical open-source AI courses in English.",
    creator: "@learntouseai",
    images: ["/opengraph-image"],
  },
};

export default function EnglishHome() {
  const courses = getLocalizedCursos("en");
  const lessons = courses.reduce((sum, course) => sum + totalLecciones(course), 0);
  const featured = courses.slice(0, 6).map((course) => ({
    slug: course.slug,
    title: course.title,
    short: course.short,
    level: course.level,
    lessons: totalLecciones(course),
  }));

  return <AulafyNexusLanding courseCount={courses.length} lessonCount={lessons} paths={getLearningPaths("en")} courses={featured} locale="en" />;
}
