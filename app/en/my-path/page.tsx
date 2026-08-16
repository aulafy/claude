import type { Metadata } from "next";
import Link from "next/link";
import SevenDayPath from "@/components/SevenDayPath";

export const metadata: Metadata = {
  title: "My 7-day path to start with AI - Aulafy",
  description: "Seven free missions to start with AI, verify results, protect data, and build a first repeatable workflow.",
  alternates: { canonical: "/en/my-path", languages: { "es-ES": "/mi-ruta", "en-US": "/en/my-path" } },
};

export default function EnglishMyPathPage() {
  return <div className="aula-shell mx-auto max-w-5xl px-6 py-14">
    <Link href="/en" className="aula-meta hover:text-[var(--accent)]">← Aulafy</Link>
    <span className="aula-section-label mt-8"><span aria-hidden="true">7</span> Beginner path</span>
    <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold text-white sm:text-6xl">Seven days to use AI with judgment</h1>
    <p className="lesson-lead mt-5 max-w-3xl">One 15-to-35-minute mission per day. Start by doing something useful and finish with a workflow you can explain, verify, and repeat.</p>
    <SevenDayPath locale="en" />
  </div>;
}
