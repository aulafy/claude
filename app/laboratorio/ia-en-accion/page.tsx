import type { Metadata } from "next";
import InteractiveLearningLab from "@/components/learning-lab/InteractiveLearningLab";

export const metadata: Metadata = {
  title: "Laboratorio 3D: aprende a usar IA en situaciones reales",
  description: "Experiencia educativa interactiva y gratuita para practicar cómo dar instrucciones a una IA y verificar sus respuestas en una oficina o en la universidad.",
  alternates: { canonical: "/laboratorio/ia-en-accion" },
  openGraph: {
    title: "Laboratorio 3D de IA en situaciones reales",
    description: "Practica cómo dirigir y verificar una IA mediante dos misiones interactivas, sin cuenta, cookies ni envío de datos.",
    url: "/laboratorio/ia-en-accion",
    type: "website",
    siteName: "Aulafy",
    locale: "es_ES",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Laboratorio interactivo de IA de Aulafy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laboratorio 3D de IA en situaciones reales",
    description: "Aprende a construir instrucciones y detectar respuestas no verificadas mediante una misión interactiva.",
    images: ["/opengraph-image"],
  },
};

export default function AiActionLabPage() {
  return <InteractiveLearningLab />;
}
