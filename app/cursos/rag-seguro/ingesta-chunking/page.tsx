import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Ingesta, limpieza y chunking — RAG avanzado y seguro",
  description:
    "Cómo preparar documentos para RAG: extracción, limpieza, metadatos, chunking por estructura y control de calidad antes de indexar.",
  alternates: { canonical: "/cursos/rag-seguro/ingesta-chunking" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Ingesta y chunking"
      title="Ingesta, limpieza y chunking"
      icon="document"
      lead={<>El chunking no es cortar texto cada mil caracteres. Es preservar sentido, títulos, tablas, fechas, permisos y origen para que la recuperación encuentre contexto útil.</>}
      courseHref="/cursos/rag-seguro"
      courseLabel="RAG avanzado y seguro"
    >
      <Objetivos>
        <ul>
          <li>Preparar documentos antes de convertirlos en vectores.</li>
          <li>Elegir estrategia de chunking según tipo de documento.</li>
          <li>Guardar metadatos para permisos, citas y auditoría.</li>
        </ul>
      </Objetivos>

      <Cristiano term="chunk">
        Es un fragmento de documento. Debe ser suficientemente pequeño para recuperarse bien y suficientemente grande para conservar significado.
      </Cristiano>

      <div className="prose">
        <h2>Metadatos mínimos</h2>
      </div>

      <Terminal>{`{
  "document_id": "contrato-2026-001",
  "title": "Contrato proveedor",
  "source": "drive/legal/contrato.pdf",
  "page": 12,
  "section": "penalizaciones",
  "owner": "legal",
  "visibility": "internal",
  "updated_at": "2026-07-02"
}`}</Terminal>

      <Idea>
        Los metadatos son lo que permite responder “según la página 12 del contrato” y también impedir que alguien lea documentos que no debe.
      </Idea>

      <div className="prose">
        <h2>Estrategias de chunking</h2>
        <ul>
          <li><strong>Por títulos</strong>: manuales, políticas, documentación técnica.</li>
          <li><strong>Por página</strong>: contratos, expedientes, PDFs con citas por página.</li>
          <li><strong>Por tabla</strong>: facturas, catálogos, inventarios.</li>
          <li><strong>Con solape</strong>: texto narrativo donde una idea cruza párrafos.</li>
        </ul>
      </div>

      <Cuidado>
        No indexas documentos; indexas interpretaciones de documentos. Si la extracción rompe tablas, columnas o notas al pie, el RAG puede responder con contexto incompleto.
      </Cuidado>

      <Comprueba>
        Elige tres chunks al azar y pregúntate: ¿puedo entenderlos sin abrir el PDF completo? ¿sé de qué documento salen? ¿puedo citarlos?
      </Comprueba>

      <Guardar>
        Antes de generar embeddings, guarda una carpeta o tabla de “chunks revisables”. Si no puedes inspeccionar lo que indexas, no puedes depurar el RAG.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/rag-seguro/mapa-rag", label: "RAG útil" }}
        next={{ href: "/cursos/rag-seguro/ocr-tablas", label: "OCR y tablas en PDFs reales" }}
      />
    </Chapter>
  );
}
