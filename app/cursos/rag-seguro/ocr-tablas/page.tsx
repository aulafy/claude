import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "OCR y tablas en PDFs reales",
  description:
    "Cómo preparar PDFs escaneados, facturas y tablas para RAG con OCR, lectura de layout, extracción estructurada y revisión antes de indexar.",
  keywords: ["OCR RAG", "tablas PDF RAG", "Docling OCR", "extraer tablas PDF IA", "RAG facturas PDF"],
  alternates: { canonical: "/cursos/rag-seguro/ocr-tablas" },
};

export default function Page() {
  return (
    <Chapter
      crumb="OCR y tablas"
      title="OCR y tablas en PDFs reales"
      icon="fileContract"
      lead={<>Los PDFs fáciles ya tienen texto seleccionable. Los PDFs reales de empresa traen escaneos, columnas, sellos, tablas partidas y facturas torcidas. Si no procesas bien esa capa, el RAG nace confundido.</>}
      courseHref="/cursos/rag-seguro"
      courseLabel="RAG avanzado y seguro"
    >
      <Objetivos>
        <ul>
          <li>Decidir cuándo necesitas OCR y cuándo basta extracción de texto.</li>
          <li>Preservar tablas, páginas y metadatos antes de indexar.</li>
          <li>Crear una salida intermedia revisable antes de embeddings.</li>
        </ul>
      </Objetivos>

      <Cristiano term="document understanding">
        Es entender la estructura del documento, no solo leer letras: columnas, tablas, encabezados, pies, orden de lectura, páginas y relación entre campos.
      </Cristiano>

      <div className="prose">
        <h2>Pipeline recomendado</h2>
      </div>

      <Terminal>{`PDF o imagen
  -> detectar si hay texto seleccionable
  -> OCR si hace falta
  -> reconstruir orden de lectura
  -> extraer tablas como HTML/Markdown/JSON
  -> añadir metadatos: documento, página, sección
  -> revisión de muestra
  -> chunking e indexación`}</Terminal>

      <Idea>
        Nunca indexes directamente el primer texto que salga del OCR. Guarda Markdown/JSON intermedio y revisa varias páginas al azar.
      </Idea>

      <div className="prose">
        <h2>Ejemplo con Docling</h2>
        <p>Docling está pensado para convertir documentos complejos en estructura útil para IA: texto, tablas, layout y formatos exportables.</p>
      </div>

      <Terminal>{`pip install docling

docling factura.pdf --to md --output salida_docling/

# Revisa antes de indexar:
ls salida_docling
cat salida_docling/factura.md`}</Terminal>

      <div className="prose">
        <h2>Formato de salida para facturas</h2>
      </div>

      <Terminal>{`{
  "document_id": "factura-2026-001",
  "page": 1,
  "type": "invoice",
  "supplier": "Proveedor S.L.",
  "invoice_number": "F-2026-001",
  "date": "2026-07-02",
  "total": 242.00,
  "currency": "EUR",
  "table_rows": [
    {"concept": "Servicio mensual", "base": 200.00, "vat": 42.00}
  ],
  "source_text": "fragmento verificable..."
}`}</Terminal>

      <Cuidado>
        Las tablas son el punto donde más fallan los RAG. Si una fila se desplaza de columna, una respuesta aparentemente correcta puede usar importes equivocados.
      </Cuidado>

      <Comprueba>
        Prueba con tres PDFs: uno digital, uno escaneado y uno con tabla partida en dos páginas. La extracción debe conservar página, tabla y fuente; si no, no lo indexes todavía.
      </Comprueba>

      <Guardar>
        Regla de oro: OCR primero, revisión después, embeddings al final. El vector no arregla una tabla rota.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/rag-seguro/ingesta-chunking", label: "Ingesta y chunking" }}
        next={{ href: "/cursos/rag-seguro/embeddings-vector-db", label: "Embeddings y bases vectoriales" }}
      />
    </Chapter>
  );
}
