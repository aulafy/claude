import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    tagline: "Aprende IA construyendo y comprobando.",
    links: [["/que-aprender-ia", "Empezar"], ["/cursos", "Cursos"], ["/curso-codex-espanol", "Codex"], ["/proyectos", "Proyectos"], ["/fuentes", "Fuentes"], ["/acerca", "Acerca de Aulafy"]],
    note: "Educación abierta · contenido CC BY-SA 4.0 · código MIT",
    privacy: "Privacidad",
  },
  en: {
    tagline: "Learn AI by building and verifying.",
    links: [["/en/paths", "Start"], ["/en/courses", "Courses"], ["/proyectos", "Projects"], ["/fuentes", "Sources"], ["/acerca", "About Aulafy"]],
    note: "Open education · content CC BY-SA 4.0 · code MIT",
    privacy: "Privacy",
  },
} satisfies Record<Locale, { tagline: string; links: string[][]; note: string; privacy: string }>;

export default function Footer({ locale = "es" }: { locale?: Locale }) {
  const content = copy[locale];
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--panel)] mt-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <Link href={locale === "en" ? "/en" : "/"} className="inline-flex items-center gap-2.5 font-display font-bold text-[var(--text)]">
              <BrandMark className="h-7 w-7 text-[var(--accent)]" />
              Aulafy
            </Link>
            <p className="text-sm text-[var(--muted)] mt-1">{content.tagline}</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label={locale === "en" ? "Footer" : "Pie de página"}>
            {content.links.map(([href, label]) => <Link key={href} href={href} className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">{label}</Link>)}
          </nav>
        </div>
        <div className="mt-7 pt-5 border-t border-[var(--border)] flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <p className="text-xs text-[var(--muted)]">{content.note}</p>
          <div className="flex gap-4 text-xs">
            <Link href="/privacidad" className="text-[var(--muted)] hover:text-[var(--accent)]">{content.privacy}</Link>
            <a href="https://github.com/aulafy/claude" target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)]">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
