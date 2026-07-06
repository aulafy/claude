import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "GraphRAG local y memoria con grafos — RAG avanzado y seguro",
  description:
    "Aprende cuándo usar GraphRAG local, cómo extraer entidades y relaciones, combinar búsqueda vectorial con grafos y evaluar si mejora un RAG privado.",
  keywords: ["GraphRAG local", "RAG con grafos", "memoria agentes grafos", "knowledge graph RAG", "RAG avanzado español"],
  alternates: { canonical: "/cursos/rag-seguro/graphrag-local" },
};

export default function Page() {
  return (
    <Chapter
      crumb="GraphRAG local"
      title="GraphRAG local y memoria con grafos"
      icon="network"
      lead={<>GraphRAG no es una palabra mágica. Sirve cuando las relaciones importan: personas, empresas, contratos, expedientes, dependencias técnicas o eventos que cambian con el tiempo.</>}
      courseHref="/cursos/rag-seguro"
      courseLabel="RAG avanzado y seguro"
    >
      <Objetivos>
        <ul>
          <li>Distinguir cuándo basta búsqueda vectorial y cuándo aporta un grafo.</li>
          <li>Extraer entidades y relaciones verificables desde documentos.</li>
          <li>Combinar grafo, chunks y citaciones sin perder trazabilidad.</li>
        </ul>
      </Objetivos>

      <Cristiano term="grafo de conocimiento">
        Es una red de nodos y relaciones. Por ejemplo: cliente, contrato, factura, proveedor y vencimiento, conectados por relaciones explícitas.
      </Cristiano>

      <Terminal>{`Entidad:
  id: "cliente:acme"
  tipo: "cliente"
  nombre: "ACME S.L."
  fuente: "contrato-marco.pdf#p4"

Relacion:
  origen: "cliente:acme"
  tipo: "tiene_contrato"
  destino: "contrato:2026-03"
  evidencia: "contrato-marco.pdf#p4"`}</Terminal>

      <Idea>
        El grafo no sustituye al RAG: lo ordena. Recuperas relaciones candidatas y después traes los chunks fuente para responder con evidencia.
      </Idea>

      <div className="prose">
        <h2>Cuándo merece la pena</h2>
        <ul>
          <li>Preguntas que cruzan varios documentos o fechas.</li>
          <li>Auditoría de contratos, facturas, proveedores o expedientes.</li>
          <li>Memoria de agentes donde importa quién hizo qué y cuándo.</li>
          <li>Documentación técnica con dependencias entre servicios.</li>
        </ul>
      </div>

      <Cuidado>
        No aceptes relaciones generadas por IA sin evidencia. Cada arista debe guardar fuente, página o fragmento que permita auditarla.
      </Cuidado>

      <Comprueba>
        Crea 25 preguntas: 10 vectoriales simples, 10 relacionales y 5 trampa. GraphRAG solo merece quedarse si mejora las relacionales sin empeorar las demás.
      </Comprueba>

      <Guardar>
        Empieza con NetworkX o tablas SQL antes de levantar infraestructura compleja. Si el prototipo demuestra valor, ya podrás migrar a Neo4j u otro motor.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/rag-seguro/chunking-avanzado", label: "Chunking avanzado" }}
        next={{ href: "/cursos/rag-seguro/ocr-tablas", label: "OCR y tablas" }}
      />
    </Chapter>
  );
}
