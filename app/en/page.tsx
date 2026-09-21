import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { getLocalizedCursos } from "@/lib/i18n";
import { totalLecciones } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Aulafy — Learn AI step by step, from basics to real projects",
  description: "Learn artificial intelligence from scratch with free practical paths, visible sources, and real projects for beginners, professionals, developers, and small businesses.",
  alternates: { canonical: "/en", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" }, types: { "application/rss+xml": "/en/feed.xml" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Learn AI step by step",
    description: "Free learning paths to understand AI, apply it at work, and build reliable real-world projects.",
    type: "website", locale: "en_US", url: "/en",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, free and open practical AI education" }],
  },
  twitter: {
    card: "summary_large_image", title: "Aulafy — Learn AI step by step",
    description: "Open courses to understand AI, apply it at work, and build reliable real-world projects.", creator: "@learntouseai", images: ["/opengraph-image"],
  },
};

export default function EnglishHome() {
  const courses = getLocalizedCursos("en");
  const lessons = courses.reduce((sum, course) => sum + totalLecciones(course), 0);
  return <AulafyNexusLanding courseCount={courses.length} lessonCount={lessons} locale="en" />;
}
