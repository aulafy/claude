import type { Metadata } from "next";
import Link from "next/link";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Observabilidad de agentes de IA: trazas, logs y Langfuse",
  description:
    "Aprende observabilidad de agentes de IA con trazas, logs, tools, RAG, Langfuse, OpenTelemetry, latencia, errores, coste y aprobación humana.",
  keywords: ["observabilidad de agentes", "observabilidad agentes IA", "Langfuse agentes", "tracing agentes IA", "OpenTelemetry agentes LLM"],
  alternates: { canonical: "/cursos/agentes-produccion/observabilidad-agentes-locales" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Observabilidad local"
      title="Observabilidad de agentes de IA"
      icon="chart"
      lead={<>Si no puedes reconstruir qué pensó, qué herramienta llamó y por qué falló, no tienes un agente mantenible: tienes una caja negra con permisos. La observabilidad convierte una demo en un sistema que se puede depurar, auditar y mejorar.</>}
      courseHref="/cursos/agentes-produccion"
      courseLabel="Agentes en producción"
    >
      <Objetivos>
        <ul>
          <li>Definir trazas útiles para agentes con tools y RAG.</li>
          <li>Separar logs técnicos, decisiones y evidencias.</li>
          <li>Detectar loops, latencia, errores repetidos y falta de grounding.</li>
        </ul>
      </Objetivos>

      <Cristiano term="traza">
        Es el recorrido completo de una petición: entrada, pasos del agente, llamadas a herramientas, contexto recuperado, respuesta, coste y errores.
      </Cristiano>

      <Terminal>{`trace:
  request_id: "support-1042"
  user_id: "u_123"
  model: "local-qwen"
  route: "local"
  steps:
    - tool: "search_qdrant"
      latency_ms: 182
      chunks: 5
    - tool: "draft_reply"
      latency_ms: 4210
  guardrails:
    repeated_tool_calls: 0
    human_approval_required: true
  outcome: "draft_created"`}</Terminal>

      <Idea>
        Para agentes locales, coste no es solo euros: también es tiempo, GPU ocupada, RAM, bloqueo de cola y fatiga de revisión humana.
      </Idea>

      <div className="prose">
        <p>
          Si necesitas una explicación más amplia antes de instrumentar código, empieza por la página pilar:
          {" "}<Link href="/observabilidad-agentes-locales-langfuse">observabilidad de agentes de IA con Langfuse y OpenTelemetry</Link>.
          Después vuelve aquí para convertir el mapa en una checklist práctica.
        </p>
      </div>

      <div className="prose">
        <h2>Qué registrar siempre</h2>
        <ul>
          <li>Modelo, runtime y ruta elegida.</li>
          <li>Tools llamadas, argumentos y resultado resumido.</li>
          <li>Chunks RAG usados y fuente.</li>
          <li>Errores repetidos y cambios de estrategia.</li>
          <li>Si hubo aprobación humana o corte automático.</li>
        </ul>
      </div>

      <Cuidado>
        No guardes datos sensibles completos en trazas por defecto. Registra identificadores, hashes o extractos mínimos cuando sea suficiente.
      </Cuidado>

      <Comprueba>
        Toma una respuesta mala y reconstruye la causa solo con logs. Si no puedes saber si falló recuperación, modelo, tool o permisos, falta observabilidad.
      </Comprueba>

      <Guardar>
        Observabilidad no es decoración. Es la diferencia entre mejorar un agente y discutir con una anécdota.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://langfuse.com/docs/observability/overview" target="_blank" rel="noopener noreferrer">Langfuse observability overview</a></li>
          <li><a href="https://langfuse.com/docs/observability/get-started" target="_blank" rel="noopener noreferrer">Langfuse tracing</a></li>
          <li><a href="https://opentelemetry.io/docs/concepts/signals/traces/" target="_blank" rel="noopener noreferrer">OpenTelemetry traces</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/agentes-produccion/evals-logs", label: "Evals y logs" }}
        next={{ href: "/cursos/agentes-produccion/proyecto-inbox", label: "Proyecto inbox" }}
      />
    </Chapter>
  );
}
