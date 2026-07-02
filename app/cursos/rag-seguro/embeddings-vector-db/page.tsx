import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Embeddings y bases vectoriales — RAG avanzado y seguro",
  description:
    "Qué son los embeddings, cuándo usar Chroma, Qdrant o FAISS, y cómo diseñar una base vectorial para RAG local y privado.",
  keywords: ["embeddings locales", "Qdrant RAG", "Chroma RAG", "FAISS español"],
  alternates: { canonical: "/cursos/rag-seguro/embeddings-vector-db" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Embeddings y vector DB"
      title="Embeddings y bases vectoriales"
      icon="server"
      lead={<>Los embeddings convierten texto en números para buscar por significado. La base vectorial guarda esos números junto con metadatos, permisos y referencias al documento original.</>}
      courseHref="/cursos/rag-seguro"
      courseLabel="RAG avanzado y seguro"
    >
      <Objetivos>
        <ul>
          <li>Entender qué aporta un embedding en RAG.</li>
          <li>Elegir Chroma, Qdrant o FAISS según proyecto.</li>
          <li>Diseñar colecciones con metadatos y filtros.</li>
        </ul>
      </Objetivos>

      <Cristiano term="embedding">
        Es una huella numérica del significado de un texto. Textos parecidos quedan cerca en el espacio vectorial, aunque no usen las mismas palabras.
      </Cristiano>

      <div className="prose">
        <h2>Elección práctica</h2>
        <ul>
          <li><strong>Chroma</strong>: ideal para prototipos locales rápidos.</li>
          <li><strong>FAISS</strong>: rápido y ligero si controlas tú la capa de metadatos.</li>
          <li><strong>Qdrant</strong>: buena opción cuando necesitas filtros, APIs, payloads y crecimiento ordenado.</li>
          <li><strong>RAGFlow</strong>: útil cuando quieres una interfaz completa de ingesta y chat con citas.</li>
        </ul>
      </div>

      <Terminal>{`collection: documentos_empresa
vectors:
  dense: embedding_semantico
payload:
  document_id
  page
  section
  owner
  visibility
  updated_at`}</Terminal>

      <Idea>
        El filtro por permisos debe ocurrir antes de mandar contexto al modelo. No sirve de nada decirle al modelo “no reveles esto” si ya le diste el texto prohibido.
      </Idea>

      <Cuidado>
        No mezcles documentos de todos los clientes en una colección sin una estrategia de filtros estricta. El fallo típico de RAG multiusuario es recuperar contexto correcto pero de la persona equivocada.
      </Cuidado>

      <Comprueba>
        Haz una consulta como usuario A y verifica que ningún chunk de usuario B aparece entre los resultados recuperados, ni siquiera antes de reranking.
      </Comprueba>

      <Guardar>
        El vector encuentra significado; el payload mantiene control. Un RAG privado necesita ambos.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/rag-seguro/ingesta-chunking", label: "Ingesta y chunking" }}
        next={{ href: "/cursos/rag-seguro/hybrid-reranking", label: "Búsqueda híbrida y reranking" }}
      />
    </Chapter>
  );
}
