import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";
import ThemeToggle from "@/components/ThemeToggle";
import BrandMark from "@/components/BrandMark";
import ContinueLearning from "@/components/ContinueLearning";
import Icon from "@/components/Icon";
import type { Locale } from "@/lib/i18n";

export default function SiteHeader({ locale = "es" }: { locale?: Locale }) {
  const isEnglish = locale === "en";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--panel-soft)] backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={isEnglish ? "/en" : "/"} className="flex items-center gap-2.5" aria-label={isEnglish ? "Aulafy home" : "Aulafy — inicio"}>
          <BrandMark className="w-8 h-8 text-[var(--accent)]" />
          <span className="flex flex-col leading-none">
            <span className="font-display font-bold text-[var(--text)] text-lg">Aulafy</span>
            <span className="hidden sm:block aula-meta text-[10px]">{isEnglish ? "open learning" : "educación abierta"}</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2" aria-label={isEnglish ? "Main navigation" : "Navegación principal"}>
          <ContinueLearning locale={locale} compact />
          <Link
            href={isEnglish ? "/en/my-path" : "/mi-ruta"}
            className="hidden! sm:inline-flex! min-h-9 items-center px-3 py-2 text-sm text-[var(--text)] hover:text-[var(--accent)]"
          >
            {isEnglish ? "My path" : "Mi ruta"}
          </Link>
          <Link
            href={isEnglish ? "/en/courses" : "/cursos"}
            className="hidden! md:inline-flex! min-h-9 items-center px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
          >
            {isEnglish ? "Courses" : "Cursos"}
          </Link>
          <Link
            href={isEnglish ? "/en/search" : "/buscar"}
            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--accent)]"
            aria-label={isEnglish ? "Search Aulafy" : "Buscar en Aulafy"}
            title={isEnglish ? "Search" : "Buscar"}
          >
            <Icon name="search" />
          </Link>
          <LanguageSwitch />
          <ThemeToggle compact />
        </nav>
      </div>
    </header>
  );
}
