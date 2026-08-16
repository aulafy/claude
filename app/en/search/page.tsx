import type { Metadata } from "next";
import SiteSearch from "@/components/SiteSearch";

export const metadata: Metadata = {
  title: "Search AI courses, guides and solutions - Aulafy",
  description: "Search by outcome, tool, or error across Aulafy's free courses and guides.",
  alternates: { canonical: "/en/search", languages: { "es-ES": "/buscar", "en-US": "/en/search" } },
};

export default function EnglishSearchPage() {
  return (
    <div className="aula-shell mx-auto max-w-4xl px-6 py-14">
      <span className="aula-section-label"><span aria-hidden="true">⌕</span> Aulafy library</span>
      <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">Find an answer, not another endless list</h1>
      <p className="lesson-lead mt-4 max-w-2xl">Describe what you want to achieve or the error you need to solve. Search runs in your browser and does not send the text to an AI provider.</p>
      <SiteSearch locale="en" />
    </div>
  );
}
