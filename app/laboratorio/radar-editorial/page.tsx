import type { Metadata } from "next";
import EditorialRadar from "@/components/editorial-radar/EditorialRadar";

export const metadata: Metadata = {
  title: "Radar editorial de IA — evalúa ideas para Aulafy",
  description:
    "Pega textos y enlaces sobre inteligencia artificial para evaluar si permiten crear o actualizar un tutorial verificable de Aulafy.",
  alternates: { canonical: "/laboratorio/radar-editorial" },
  robots: { index: false, follow: false },
};

export default function EditorialRadarPage() {
  return <EditorialRadar />;
}
