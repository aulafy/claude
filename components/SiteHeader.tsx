import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";
import ThemeToggle from "@/components/ThemeToggle";
import BrandMark from "@/components/BrandMark";
import ContinueLearning from "@/components/ContinueLearning";
import Icon from "@/components/Icon";
import type { Locale } from "@/lib/i18n";
import { siteNav } from "@/lib/site-nav";

export default function SiteHeader({ locale = "es" }: { locale?: Locale }) {
  const isEnglish = locale === "en";
  const nav = siteNav(locale);

  return (
    <header className="editorial-site-header">
      <div className="editorial-site-header__inner">
        <Link href={nav.home.href} className="editorial-site-header__brand" aria-label={isEnglish ? "Aulafy home" : "Aulafy — inicio"}>
          <BrandMark className="w-8 h-8 text-[var(--accent)]" />
          <span className="editorial-site-header__wordmark">
            <strong>Aulafy</strong>
            <small>{isEnglish ? "Open AI education" : "Educación abierta en IA"}</small>
          </span>
        </Link>
        <nav className="editorial-site-header__nav" aria-label={isEnglish ? "Main navigation" : "Navegación principal"}>
          <ContinueLearning locale={locale} compact />
          <Link
            href={nav.start.href}
            className="editorial-site-header__link editorial-site-header__start"
          >
            {nav.start.label}
          </Link>
          <Link
            href={nav.courses.href}
            className="editorial-site-header__link"
          >
            {nav.courses.label}
          </Link>
          <Link
            href={nav.search.href}
            className="editorial-site-header__icon"
            aria-label={isEnglish ? "Search Aulafy" : "Buscar en Aulafy"}
            title={nav.search.label}
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
