import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { totalLecciones } from "@/lib/cursos";
import { getLocalizedCursos } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Aulafy — Learn artificial intelligence from zero",
  description: "Free practical AI courses in English. Choose a path by outcome or follow one continuous 28-lesson course without signing up.",
  alternates: { canonical: "/en", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Learn AI through a clear path",
    description: "Start without coding, build a project, or progress into RAG, agents, safety, and local models.",
    type: "website", locale: "en_US", url: "/en",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, free and open practical AI education" }],
  },
  twitter: {
    card: "summary_large_image", title: "Aulafy — Learn AI through a clear path",
    description: "Free courses and projects, from zero to reliable AI systems.", creator: "@learntouseai", images: ["/opengraph-image"],
  },
};

export default function EnglishHome() {
  const courses = getLocalizedCursos("en");
  const lessons = courses.reduce((sum, course) => sum + totalLecciones(course), 0);
  return <AulafyNexusLanding courseCount={courses.length} lessonCount={lessons} locale="en" />;
}
