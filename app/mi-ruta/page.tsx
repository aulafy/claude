import type { Metadata } from "next";
import Link from "next/link";
import SevenDayPath from "@/components/SevenDayPath";

export const metadata: Metadata = {
  title: "Mi ruta de 7 días para empezar con IA - Aulafy",
  description: "Siete misiones gratuitas para empezar con IA, comprobar resultados, proteger datos y construir un primer flujo repetible.",
  alternates: { canonical: "/mi-ruta", languages: { "es-ES": "/mi-ruta", "en-US": "/en/my-path" } },
};

export default function MyPathPage() {
  return <div className="aula-shell mx-auto max-w-5xl px-6 py-14">
    <Link href="/" className="aula-meta hover:text-[var(--accent)]">← Aulafy</Link>
    <span className="aula-section-label mt-8"><span aria-hidden="true">7</span> Ruta básica</span>
    <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold text-white sm:text-6xl">Siete días para usar IA con criterio</h1>
    <p className="lesson-lead mt-5 max-w-3xl">Una misión por día, de 15 a 35 minutos. Empiezas haciendo algo útil y terminas con un flujo que puedes explicar, comprobar y repetir.</p>
    <Link href="/brain" className="aula-button aula-button-secondary mt-6 inline-flex">Continuar en Aulafy Brain</Link>
    <SevenDayPath />
  </div>;
}
