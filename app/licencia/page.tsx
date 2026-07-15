import type { Metadata } from "next";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Licencia y reutilización - Aulafy",
  description:
    "Licencia del contenido educativo y del código fuente de Aulafy.",
  alternates: { canonical: "/licencia" },
};

export default function Licencia() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="legal" className="mt-1 text-2xl text-violet-400 flex-none" />
        <h1 className="min-w-0 text-3xl sm:text-4xl font-bold leading-tight text-white">Licencia y reutilización</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: 14 de julio de 2026</p>
      <div className="prose">
        <p>
          Aulafy es un proyecto educativo abierto. Puedes estudiar, compartir y
          adaptar sus materiales citando la fuente.
        </p>

        <h2>Contenido educativo</h2>
        <p>
          Los textos, guías, ejemplos didácticos, PDFs y materiales del curso se
          publican bajo Creative Commons Attribution 4.0 International (CC BY
          4.0). La atribución recomendada es: Ramón Guillamón, Aulafy, con
          enlace a <a href="https://www.aulafy.net">https://www.aulafy.net</a>.
        </p>

        <h2>Código fuente</h2>
        <p>
          El código de la web se publica bajo licencia MIT. Puedes revisarlo,
          reutilizarlo y adaptarlo respetando el aviso de copyright y la licencia.
        </p>

        <h2>Contenido publicado por la comunidad</h2>
        <p>
          Las publicaciones de los usuarios no pasan automáticamente a estar bajo
          CC BY 4.0. Cada autor conserva sus derechos y concede a Aulafy únicamente
          el permiso necesario para alojar y mostrar el contenido dentro de la
          plataforma, conforme a las normas de la comunidad. Los repositorios y
          materiales enlazados mantienen la licencia indicada por sus titulares.
        </p>

        <h2>Marcas y productos mencionados</h2>
        <p>
          Claude, Claude Code y otros nombres de productos pertenecen a sus
          respectivos titulares. Aulafy es una guia educativa independiente y no
          oficial.
        </p>
      </div>
    </div>
  );
}
