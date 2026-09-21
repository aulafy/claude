import type { Metadata } from "next";
import AulafyNexusLanding from "@/components/AulafyNexusLanding";
import { cursos, totalLecciones } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Aulafy — Aprende IA y aplícala en tu pyme paso a paso",
  description: "Aprende inteligencia artificial desde cero y sigue una guía práctica para diagnosticar, probar, medir y operar IA en una pyme. Gratis y sin registro.",
  alternates: { canonical: "/", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" }, types: { "application/rss+xml": "/feed.xml" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Aprende IA y aplícala en tu pyme",
    description: "Cursos abiertos y una guía paso a paso para diagnosticar, probar, medir y operar IA de forma responsable en una pyme.",
    type: "website", locale: "es_ES", url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, educación abierta para aprender inteligencia artificial" }],
  },
  twitter: {
    card: "summary_large_image", title: "Aulafy — Aprende IA y aplícala en tu pyme",
    description: "Cursos abiertos y una guía práctica para pasar del diagnóstico a un sistema de IA medible y operable.", creator: "@learntouseai", images: ["/opengraph-image"],
  },
};

export default function Home() {
  const lessons = cursos.reduce((sum, course) => sum + totalLecciones(course), 0);
  return <AulafyNexusLanding courseCount={cursos.length} lessonCount={lessons} />;
}
