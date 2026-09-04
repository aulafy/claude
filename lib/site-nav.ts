export type SiteLocale = "es" | "en";

export function siteNav(locale: SiteLocale) {
  const english = locale === "en";

  return {
    home: { href: english ? "/en" : "/", label: english ? "Home" : "Inicio" },
    start: { href: english ? "/en/start" : "/empezar", label: english ? "Start" : "Empezar" },
    courses: { href: english ? "/en/courses" : "/cursos", label: english ? "Courses" : "Cursos" },
    search: { href: english ? "/en/search" : "/buscar", label: english ? "Search" : "Buscar" },
  };
}
