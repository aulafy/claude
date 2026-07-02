import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Qdrant multiusuario y permisos — RAG avanzado y seguro",
  description:
    "Diseña RAG multiusuario con Qdrant usando payloads, filtros, tenant_id, document_id y permisos antes de recuperar contexto.",
  keywords: ["Qdrant multiusuario", "Qdrant permisos RAG", "RAG multiusuario", "payload filtering Qdrant", "RAG permisos por usuario"],
  alternates: { canonical: "/cursos/rag-seguro/qdrant-permisos" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Qdrant y permisos"
      title="Qdrant multiusuario y permisos"
      icon="userShield"
      lead={<>El fallo más peligroso en RAG multiusuario no es responder mal: es recuperar el documento correcto de la persona equivocada. Los permisos deben aplicarse antes de mandar contexto al modelo.</>}
      courseHref="/cursos/rag-seguro"
      courseLabel="RAG avanzado y seguro"
    >
      <Objetivos>
        <ul>
          <li>Diseñar payloads para aislar clientes, usuarios y documentos.</li>
          <li>Aplicar filtros antes de recuperar chunks.</li>
          <li>Evitar una colección por cliente cuando no hace falta.</li>
        </ul>
      </Objetivos>

      <Cristiano term="payload">
        Son los metadatos que acompañan a cada vector: cliente, usuario, documento, página, permisos, fecha o tipo de contenido.
      </Cristiano>

      <div className="prose">
        <h2>Payload mínimo</h2>
      </div>

      <Terminal>{`{
  "tenant_id": "cliente_acme",
  "workspace_id": "legal",
  "document_id": "contrato-001",
  "page": 12,
  "visibility": "internal",
  "allowed_roles": ["admin", "legal"],
  "source": "contratos/contrato-001.pdf"
}`}</Terminal>

      <Idea>
        Qdrant recomienda normalmente una colección por modelo de embeddings y separar tenants con payload/filtros. Es más manejable que crear cientos de colecciones pequeñas sin necesidad.
      </Idea>

      <div className="prose">
        <h2>Filtro antes de buscar</h2>
      </div>

      <Terminal>{`from qdrant_client import QdrantClient, models

client = QdrantClient("http://localhost:6333")

filtro = models.Filter(
    must=[
        models.FieldCondition(
            key="tenant_id",
            match=models.MatchValue(value="cliente_acme"),
        ),
        models.FieldCondition(
            key="allowed_roles",
            match=models.MatchAny(any=["legal"]),
        ),
    ]
)

resultados = client.query_points(
    collection_name="documentos",
    query=[0.01, 0.02, 0.03],
    query_filter=filtro,
    limit=5,
)`}</Terminal>

      <Cuidado>
        No recuperes todo y filtres después en el prompt. Si el texto prohibido llega al modelo, ya perdiste el aislamiento.
      </Cuidado>

      <div className="prose">
        <h2>Prueba de fuga</h2>
      </div>

      <Terminal>{`Caso:
- Usuario A pertenece a cliente_acme
- Usuario B pertenece a cliente_beta
- Ambos tienen una pregunta parecida

Test:
1. Indexa documentos con tenant_id distinto.
2. Pregunta como usuario A.
3. Verifica que ningún chunk de cliente_beta aparece en la traza.`}</Terminal>

      <Comprueba>
        Antes de producción, crea tests con documentos casi iguales en dos tenants. Si el sistema mezcla resultados, para y corrige filtros.
      </Comprueba>

      <Guardar>
        Permisos en RAG significan “filtrar antes de recuperar”. El prompt puede reforzar, pero no sustituye al control de acceso.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/rag-seguro/hybrid-reranking", label: "Búsqueda híbrida y reranking" }}
        next={{ href: "/cursos/rag-seguro/prompt-injection", label: "Prompt injection en RAG" }}
      />
    </Chapter>
  );
}
