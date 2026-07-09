"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathForLocale, type Locale } from "@/lib/i18n";

const labels: Array<{ locale: Locale; label: string }> = [
  { locale: "es", label: "ES" },
  { locale: "en", label: "EN" },
];

export default function LanguageSwitch() {
  const pathname = usePathname();
  const currentLocale: Locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";

  return (
    <div className="flex items-center gap-1" aria-label="Language">
      {labels.map(({ locale, label }) => {
        const active = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={pathForLocale(pathname, locale)}
            className={`aula-chip px-2.5 py-1 text-[11px] transition ${
              active ? "" : "opacity-65 hover:opacity-100"
            }`}
            data-tone={active ? "cyan" : undefined}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
