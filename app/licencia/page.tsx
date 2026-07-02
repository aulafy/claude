import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Licencia y reutilizacion - Aulafy",
  description:
    "Licencia del contenido educativo y del codigo fuente de Aulafy.",
  alternates: { canonical: "/licencia" },
};

export default function Licencia() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <h1 className="text-4xl font-bold text-white mb-4">Licencia y reutilizacion</h1>
      <div className="prose">
        <p>
          Aulafy es un proyecto educativo abierto. Puedes estudiar, compartir y
          adaptar sus materiales citando la fuente.
        </p>

        <h2>Contenido educativo</h2>
        <p>
          Los textos, guias, ejemplos didacticos, PDFs y materiales del curso se
          publican bajo Creative Commons Attribution 4.0 International (CC BY
          4.0). La atribucion recomendada es: Ramon Guillamon, Aulafy, con
          enlace a <a href="https://aulafy.net">https://aulafy.net</a>.
        </p>

        <h2>Codigo fuente</h2>
        <p>
          El codigo de la web se publica bajo licencia MIT. Puedes revisarlo,
          reutilizarlo y adaptarlo respetando el aviso de copyright y la licencia.
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
