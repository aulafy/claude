import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { getLocalizedCursos } from "@/lib/i18n";
import { totalLecciones } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Aulafy — Learn AI from first task to production",
  description: "Free practical AI guides in English for beginners, developers, consultants, and small businesses. Assess, build, test, deploy, and operate AI responsibly.",
  alternates: { canonical: "/en", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" }, types: { "application/rss+xml": "/en/feed.xml" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Practical AI from zero to production",
    description: "Learn AI with open courses, verifiable projects, and a step-by-step implementation guide for small businesses.",
    type: "website", locale: "en_US", url: "/en",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, free and open practical AI education" }],
  },
  twitter: {
    card: "summary_large_image", title: "Aulafy — Practical AI from zero to production",
    description: "Open AI courses and a practical implementation guide for learners, developers, consultants, and small businesses.", creator: "@learntouseai", images: ["/opengraph-image"],
  },
};

export default function EnglishHome() {
  const courses = getLocalizedCursos("en");
  const lessons = courses.reduce((sum, course) => sum + totalLecciones(course), 0);
  return <AulafyNexusLanding courseCount={courses.length} lessonCount={lessons} locale="en" />;
}
