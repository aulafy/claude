import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Chunking avanzado para RAG privado — RAG avanzado y seguro",
  description:
    "Diseña chunking semántico para RAG privado: overlap, headings, metadatos, separación por secciones, documentos en español y evaluación de recuperación.",
  keywords: ["chunking avanzado RAG", "semantic chunking Qdrant", "chunking documentos español RAG", "RAG overlap metadata headings"],
  alternates: { canonical: "/cursos/rag-seguro/chunking-avanzado" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Chunking avanzado"
      title="Chunking avanzado para RAG privado"
      icon="database"
      lead={<>Muchos RAG fallan antes de llegar al modelo: cortan párrafos por la mitad, pierden títulos, mezclan temas y no guardan metadatos. Chunking avanzado significa preservar sentido, no solo contar tokens.</>}
      courseHref="/cursos/rag-seguro"
      courseLabel="RAG avanzado y seguro"
    >
      <Objetivos>
        <ul>
          <li>Evitar chunks fijos que cortan ideas.</li>
          <li>Guardar headings, página, documento, fecha y permisos.</li>
          <li>Evaluar recuperación con preguntas reales.</li>
        </ul>
      </Objetivos>

      <Cristiano term="chunk">
        Es un fragmento de documento que se convierte en embedding y luego se recupera para responder. Si el chunk está mal hecho, el RAG recupera ruido.
      </Cristiano>

      <Terminal>{`chunk:
  text: "El cliente puede devolver el producto durante 14 días..."
  metadata:
    document_id: "politica-devoluciones"
    heading_path: ["Atención al cliente", "Devoluciones"]
    page: 3
    language: "es"
    updated_at: "2026-07-05"
    tenant_id: "acme"
    source_url: "docs/devoluciones.pdf"`}</Terminal>

      <Idea>
        El título y la ruta de sección son parte del significado. Un chunk sin heading suele quedar huérfano.
      </Idea>

      <div className="prose">
        <h2>Reglas prácticas</h2>
        <ul>
          <li>Corta por secciones, párrafos y frases antes que por tamaño fijo.</li>
          <li>Usa overlap cuando una explicación continúa entre chunks.</li>
          <li>No mezcles tablas, notas legales y narrativa en el mismo fragmento.</li>
          <li>Guarda metadatos para filtrar antes de buscar.</li>
          <li>Evalúa con preguntas que el usuario haría de verdad.</li>
        </ul>
      </div>

      <Cuidado>
        Más chunks no significa mejor RAG. Puede subir recall y bajar precisión si llenas la base de fragmentos redundantes.
      </Cuidado>

      <Terminal>{`eval_recuperacion:
  pregunta: "¿Cuántos días tengo para devolver un producto?"
  debe_recuperar:
    - document_id: "politica-devoluciones"
      heading: "Devoluciones"
  no_debe_recuperar:
    - "garantias"
    - "envios"`}</Terminal>

      <Comprueba>
        Reindexa el mismo documento con dos estrategias y compara top-5 resultados para 20 preguntas. Si no mides recuperación, solo estás cambiando trozos.
      </Comprueba>

      <Guardar>
        Un buen chunk conserva sentido, fuente y permisos. El embedding solo es tan bueno como el texto y metadatos que le das.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://qdrant.tech/documentation/" target="_blank" rel="noopener noreferrer">Qdrant documentation</a></li>
          <li><a href="https://qdrant.tech/documentation/concepts/filtering/" target="_blank" rel="noopener noreferrer">Qdrant filtering</a></li>
          <li><a href="https://github.com/lumina-ai-inc/chunkr" target="_blank" rel="noopener noreferrer">Chunkr GitHub</a></li>
          <li><a href="https://legacy-docs.chunkr.ai/introduction" target="_blank" rel="noopener noreferrer">Chunkr docs</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/rag-seguro/ingesta-chunking", label: "Ingesta y chunking" }}
        next={{ href: "/cursos/rag-seguro/embeddings-vector-db", label: "Embeddings" }}
      />
    </Chapter>
  );
}
