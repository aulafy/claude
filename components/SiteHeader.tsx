import Link from "next/link";
import Icon from "@/components/Icon";
import LanguageSwitch from "@/components/LanguageSwitch";
import ThemeToggle from "@/components/ThemeToggle";
import type { Locale } from "@/lib/i18n";
import { isSocialEnabled } from "@/lib/social/config";

function BrandIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="0.52" stopColor="#e879f9" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="116" fill={`url(#${id})`} />
      <g fill="none" stroke="#fff" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round">
        <path d="M256 132 L150 380" />
        <path d="M256 132 L362 380" />
        <path d="M198 300 L314 300" />
      </g>
      <circle cx="256" cy="120" r="15" fill="#fff" />
    </svg>
  );
}

export default function SiteHeader({ locale = "es" }: { locale?: Locale }) {
  const isEnglish = locale === "en";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/82 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={isEnglish ? "/en" : "/"} className="flex items-center gap-2.5" aria-label={isEnglish ? "Aulafy home" : "Aulafy — inicio"}>
          <BrandIcon id="lg-site" className="w-8 h-8" />
          <span className="flex flex-col leading-none">
            <span className="font-display font-bold text-white text-lg">Aulafy</span>
            <span className="hidden sm:block aula-meta text-[10px] text-zinc-500">open-source learning</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={isEnglish ? "/en/paths" : "/rutas"}
            className="hidden! md:inline-flex! aula-button aula-button-secondary min-h-9 px-3 py-2 text-sm"
          >
            <Icon name="route" />
            {isEnglish ? "Learn" : "Aprende"}
          </Link>
          <Link
            href={isEnglish ? "/en/courses" : "/cursos"}
            className="hidden! sm:inline-flex! aula-button aula-button-secondary min-h-9 px-3 py-2 text-sm"
          >
            <Icon name="book" />
            {isEnglish ? "Library" : "Biblioteca"}
          </Link>
          <Link
            href="/blog"
            className="hidden! xl:inline-flex! aula-button aula-button-secondary min-h-9 px-3 py-2 text-sm"
          >
            <Icon name="search" />
            {isEnglish ? "Spanish blog" : "Blog"}
          </Link>
          {!isEnglish && isSocialEnabled() && (
            <Link href="/comunidad" className="hidden! xl:inline-flex! aula-button aula-button-secondary min-h-9 px-3 py-2 text-sm">
              <Icon name="users" /> Comunidad
            </Link>
          )}
          <LanguageSwitch />
          <ThemeToggle compact />
          <Link
            href={isEnglish ? "/en/paths" : "/rutas#orientador"}
            className="aula-button aula-button-primary min-h-9 px-3 py-2 text-sm"
          >
            <Icon name="rocket" />
            {isEnglish ? "Start" : "Empieza aquí"}
          </Link>
        </div>
      </div>
    </header>
  );
}
