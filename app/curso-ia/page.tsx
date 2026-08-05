import type { Metadata } from "next";
import UnifiedCourse from "@/components/UnifiedCourse";

export const metadata: Metadata = {
  title: "Curso completo de inteligencia artificial — 28 lecciones",
  description: "Curso continuo y gratuito de IA en español: 7 módulos, 28 lecciones y 7 proyectos, desde los fundamentos hasta producción.",
  alternates: { canonical: "/curso-ia", languages: { "es-ES": "/curso-ia", "en-US": "/en/ai-course", "x-default": "/curso-ia" } },
};

export default function CompleteAiCourse() { return <UnifiedCourse locale="es" />; }
