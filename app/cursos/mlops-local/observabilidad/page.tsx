import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Observabilidad con Langfuse y OpenTelemetry — MLOps local",
  description:
    "Observabilidad para apps LLM: trazas, métricas, logs, latencia, coste, errores, request_id y depuración con Langfuse y OpenTelemetry.",
  keywords: ["observabilidad LLM", "Langfuse self hosted", "OpenTelemetry IA", "tracing LLM"],
  alternates: { canonical: "/cursos/mlops-local/observabilidad" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Observabilidad"
      title="Observabilidad con Langfuse y OpenTelemetry"
      icon="chart"
      lead={<>Si una respuesta sale mal y no puedes reconstruir qué prompt, modelo, contexto y herramienta se usó, no tienes producción: tienes una caja negra con interfaz bonita.</>}
      courseHref="/cursos/mlops-local"
      courseLabel="MLOps local"
    >
      <Objetivos>
        <ul>
          <li>Registrar trazas útiles sin filtrar datos sensibles.</li>
          <li>Medir latencia, errores, coste y calidad por ruta.</li>
          <li>Usar request_id para seguir una petición completa.</li>
        </ul>
      </Objetivos>

      <Cristiano term="traza">
        Es la historia de una petición: entrada, recuperación, llamada al modelo, herramientas, salida, latencia y errores.
      </Cristiano>

      <div className="prose">
        <h2>Qué registrar</h2>
        <ul>
          <li><strong>Identidad técnica</strong>: request_id, ruta, versión de app.</li>
          <li><strong>Modelo</strong>: proveedor, nombre, versión y parámetros.</li>
          <li><strong>Rendimiento</strong>: latencia total, tokens, errores y reintentos.</li>
          <li><strong>RAG</strong>: documentos recuperados, no necesariamente texto completo.</li>
          <li><strong>Calidad</strong>: eval asociada, feedback y resultado esperado.</li>
        </ul>
      </div>

      <Idea>
        Langfuse es una plataforma open source para trazas, prompts, evals y depuración LLM. OpenTelemetry aporta un estándar vendor-neutral para logs, métricas y trazas.
      </Idea>

      <div className="prose">
        <h2>Evento mínimo</h2>
      </div>

      <Terminal>{`{
  "request_id": "req_20260703_001",
  "route": "/api/chat",
  "model": "local-qwen",
  "prompt_version": "support-v3",
  "latency_ms": 1840,
  "input_tokens": 620,
  "output_tokens": 210,
  "retrieved_docs": ["manual-001#p4", "faq-009#p1"],
  "error": null
}`}</Terminal>

      <Cuidado>
        Observabilidad no significa guardar todo. Si guardas prompts completos con datos personales, acabas creando otra base sensible.
      </Cuidado>

      <Comprueba>
        Haz una pregunta de prueba y verifica que puedes responder: qué modelo contestó, cuánto tardó, qué contexto usó y si hubo error.
      </Comprueba>

      <Guardar>
        Una app LLM observable permite depurar, evaluar y mejorar. Una app opaca solo permite adivinar.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/mlops-local/litellm-gateway", label: "LiteLLM gateway" }}
        next={{ href: "/cursos/mlops-local/colas-costes", label: "Colas y costes" }}
      />
    </Chapter>
  );
}
