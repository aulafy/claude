import type { Metadata } from "next";
import SiteSearch from "@/components/SiteSearch";

export const metadata: Metadata = {
  title: "Buscar cursos, guías y soluciones de IA - Aulafy",
  description: "Busca por objetivo, herramienta o error dentro de los cursos y guías gratuitas de Aulafy.",
  alternates: { canonical: "/buscar", languages: { "es-ES": "/buscar", "en-US": "/en/search" } },
};

export default function SearchPage() {
  return (
    <div className="aula-shell mx-auto max-w-4xl px-6 py-14">
      <span className="aula-section-label"><span aria-hidden="true">⌕</span> Biblioteca de Aulafy</span>
      <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">Encuentra una respuesta, no otra lista infinita</h1>
      <p className="lesson-lead mt-4 max-w-2xl">Escribe lo que quieres conseguir o el error que necesitas resolver. La búsqueda ocurre en tu navegador y no envía el texto a un proveedor de IA.</p>
      <SiteSearch />
    </div>
  );
}
