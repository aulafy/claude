import type { Metadata } from "next";
import Link from "next/link";
import FirstAIMission from "@/components/FirstAIMission";

export const metadata: Metadata = {
  title: "Tu primera tarea útil con IA en 15 minutos - Aulafy",
  description: "Una misión guiada y gratuita para usar IA por primera vez, comprobar el resultado y mantener la decisión en manos humanas.",
  alternates: { canonical: "/empezar", languages: { "es-ES": "/empezar", "en-US": "/en/start" } },
};

export default function StartPage() {
  return <div className="aula-shell mx-auto max-w-4xl px-6 py-14">
    <Link href="/" className="aula-meta hover:text-[var(--accent)]">← Aulafy</Link>
    <span className="aula-section-label mt-8">Misión inicial · 15 minutos</span>
    <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-6xl">Tu primera tarea útil con IA</h1>
    <p className="lesson-lead mt-5 max-w-2xl">No necesitas saber de modelos, prompts ni programación. Harás una petición pequeña, revisarás el resultado y conservarás la decisión final.</p>
    <FirstAIMission />
  </div>;
}
