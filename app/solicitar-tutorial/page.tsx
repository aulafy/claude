import type { Metadata } from "next";
import PublicTutorialRequest from "@/components/editorial-radar/PublicTutorialRequest";

export const metadata: Metadata = {
  title: "Solicita un tutorial de inteligencia artificial — Aulafy",
  description:
    "Propón públicamente un tutorial o una actualización para los cursos abiertos de inteligencia artificial de Aulafy.",
  alternates: { canonical: "/solicitar-tutorial" },
  openGraph: {
    title: "¿Qué tutorial de IA necesitas?",
    description:
      "Envía una petición pública y estructurada para mejorar los cursos abiertos de Aulafy.",
    url: "/solicitar-tutorial",
    type: "website",
  },
};

export default function RequestTutorialPage() {
  return <PublicTutorialRequest />;
}
