import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Búsqueda híbrida y reranking — RAG avanzado y seguro",
  description:
    "Mejora la precisión del RAG combinando búsqueda semántica, búsqueda por palabras clave, filtros y reranking antes de generar respuestas.",
  keywords: ["búsqueda híbrida RAG", "reranking RAG", "Qdrant hybrid search", "RAG precisión"],
  alternates: { canonical: "/cursos/rag-seguro/hybrid-reranking" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Hybrid search"
      title="Búsqueda híbrida y reranking"
      icon="search"
      lead={<>La búsqueda semántica encuentra ideas parecidas; la búsqueda por palabras clave encuentra nombres, códigos, fechas y términos exactos. Un RAG bueno usa ambas y reordena antes de responder.</>}
      courseHref="/cursos/rag-seguro"
      courseLabel="RAG avanzado y seguro"
    >
      <Objetivos>
        <ul>
          <li>Entender cuándo falla la búsqueda puramente vectorial.</li>
          <li>Combinar dense search, sparse search y filtros.</li>
          <li>Usar reranking para mejorar los fragmentos finales.</li>
        </ul>
      </Objetivos>

      <Cristiano term="reranking">
        Es una segunda revisión de los resultados encontrados. Primero recuperas candidatos; luego un modelo o algoritmo más preciso decide cuáles son los mejores para responder.
      </Cristiano>

      <div className="prose">
        <h2>Pipeline recomendado</h2>
      </div>

      <Terminal>{`query
  -> reescritura opcional
  -> filtros de permisos
  -> dense retrieval
  -> sparse retrieval
  -> fusión de resultados
  -> reranking
  -> top chunks con citas
  -> generación`}</Terminal>

      <Idea>
        La búsqueda híbrida es especialmente buena para documentos de empresa: combina significado con códigos de contrato, referencias de factura, nombres propios y fechas exactas.
      </Idea>

      <div className="prose">
        <h2>Señales para usar híbrida</h2>
        <ul>
          <li>Los usuarios preguntan por códigos, IDs o cláusulas exactas.</li>
          <li>Hay mucha terminología interna.</li>
          <li>Los documentos mezclan tablas, texto y referencias.</li>
          <li>La búsqueda semántica trae respuestas “casi correctas”.</li>
        </ul>
      </div>

      <Cuidado>
        Más recuperación no siempre mejora. Si mandas demasiados chunks al modelo, metes ruido, subes coste y aumentas la superficie de prompt injection.
      </Cuidado>

      <Comprueba>
        Prepara diez preguntas con respuesta conocida y compara: vectorial sola, keyword sola e híbrida con reranking. Quédate con evidencia, no con intuición.
      </Comprueba>

      <Guardar>
        El objetivo no es recuperar mucho; es recuperar lo justo, permitido y citable.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/rag-seguro/embeddings-vector-db", label: "Embeddings y vector DB" }}
        next={{ href: "/cursos/rag-seguro/qdrant-permisos", label: "Qdrant multiusuario y permisos" }}
      />
    </Chapter>
  );
}
