import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";
import BrandMark from "@/components/BrandMark";
import ContinueLearning from "@/components/ContinueLearning";
import Icon from "@/components/Icon";
import type { Locale } from "@/lib/i18n";
import { siteNav } from "@/lib/site-nav";
import { primaryDestinations } from "@/lib/information-architecture";

export default function SiteHeader({ locale = "es" }: { locale?: Locale }) {
  const isEnglish = locale === "en";
  const nav = siteNav(locale);
  const destinations = primaryDestinations(locale);

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
          {destinations.map((item) => (
            <Link key={item.id} href={item.href} className="editorial-site-header__link">
              {item.label}
            </Link>
          ))}
          <Link
            href={nav.search.href}
            className="editorial-site-header__icon"
            aria-label={isEnglish ? "Search Aulafy" : "Buscar en Aulafy"}
            title={nav.search.label}
          >
            <Icon name="search" />
          </Link>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}
