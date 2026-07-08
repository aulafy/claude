import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "RAG útil: mucho más que chat con PDF",
  description:
    "Aprende qué piezas necesita un sistema RAG fiable: ingesta, chunking, embeddings, vector DB, reranking, citaciones, permisos y evaluación.",
  keywords: ["RAG avanzado", "RAG local español", "chatbot documentos privados", "RAG producción"],
  alternates: { canonical: "/cursos/rag-seguro/mapa-rag" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Mapa RAG"
      title="RAG útil: mucho más que chat con PDF"
      icon="database"
      lead={<>Un RAG serio no consiste en subir un PDF y esperar milagros. Es una tubería de datos: limpia documentos, recupera contexto relevante, cita fuentes y se niega a responder cuando no sabe.</>}
      courseHref="/cursos/rag-seguro"
      courseLabel="RAG avanzado y seguro"
    >
      <Objetivos>
        <ul>
          <li>Entender las piezas reales de un sistema RAG.</li>
          <li>Distinguir una demo bonita de un sistema usable en una pyme.</li>
          <li>Definir criterios de calidad antes de indexar documentos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="RAG">
        Es una forma de responder con tus documentos. Primero busca fragmentos relevantes, luego se los pasa al modelo y finalmente genera una respuesta basada en ese contexto.
      </Cristiano>

      <div className="prose">
        <h2>La tubería completa</h2>
      </div>

      <Terminal>{`Documentos
  -> ingesta y limpieza
  -> chunking
  -> embeddings
  -> base vectorial
  -> recuperación
  -> reranking
  -> generación con citas
  -> evaluación y logs`}</Terminal>

      <Idea>
        La calidad del RAG se decide antes de preguntar. Si tus documentos entran sucios, troceados sin criterio y sin metadatos, el modelo solo maquillará el desorden.
      </Idea>

      <div className="prose">
        <h2>Preguntas de diseño</h2>
        <ul>
          <li>¿Qué documentos puede consultar cada usuario?</li>
          <li>¿Cada respuesta necesita cita exacta?</li>
          <li>¿Qué pasa si no encuentra evidencia?</li>
          <li>¿Cómo se actualizan documentos antiguos?</li>
          <li>¿Qué entradas podrían contener instrucciones maliciosas?</li>
        </ul>
      </div>

      <Cuidado>
        “Responde siempre” es una mala regla para RAG. Un sistema fiable debe poder decir: “no tengo evidencia suficiente en los documentos”.
      </Cuidado>

      <Comprueba>
        Antes de construir, escribe tres preguntas que tu RAG debe responder y tres que debe rechazar. Ese pequeño test evitará muchas falsas demos.
      </Comprueba>

      <Guardar>
        Un RAG bueno tiene cuatro compromisos: recupera bien, cita bien, limita permisos y deja evidencia. Si falta uno, no está listo para datos sensibles.
      </Guardar>

      <ChapterNav next={{ href: "/cursos/rag-seguro/ingesta-chunking", label: "Ingesta, limpieza y chunking" }} />
    </Chapter>
  );
}
