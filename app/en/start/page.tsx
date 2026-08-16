import type { Metadata } from "next";
import Link from "next/link";
import FirstAIMission from "@/components/FirstAIMission";

export const metadata: Metadata = {
  title: "Your first useful AI task in 15 minutes - Aulafy",
  description: "A free guided mission to use AI for the first time, verify the result, and keep the final decision human.",
  alternates: { canonical: "/en/start", languages: { "es-ES": "/empezar", "en-US": "/en/start" } },
};

export default function EnglishStartPage() {
  return <div className="aula-shell mx-auto max-w-4xl px-6 py-14">
    <Link href="/en" className="aula-meta hover:text-[var(--accent)]">← Aulafy</Link>
    <span className="aula-section-label mt-8">First mission · 15 minutes</span>
    <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-6xl">Your first useful AI task</h1>
    <p className="lesson-lead mt-5 max-w-2xl">You do not need to know about models, prompts, or coding. Make one small request, review the result, and keep the final decision.</p>
    <FirstAIMission locale="en" />
  </div>;
}
