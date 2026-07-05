import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Migrar un agente cloud a local sin romperlo — MLOps local",
  description:
    "Plan para mover un agente de APIs cloud a modelos locales con Ollama, vLLM o LiteLLM: compatibilidad, tool calling, evals, latencia, privacidad y fallback.",
  keywords: ["migrar agente cloud a local ollama", "cloud a local LLM", "LiteLLM migración local", "agente local fallback cloud"],
  alternates: { canonical: "/cursos/mlops-local/migrar-cloud-local" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Cloud a local"
      title="Migrar un agente cloud a local sin romperlo"
      icon="route"
      lead={<>Migrar a local no es cambiar una URL y celebrar. Cambian latencia, contexto, tool calling, calidad, observabilidad y límites de hardware. Hazlo por etapas y conserva una salida de emergencia.</>}
      courseHref="/cursos/mlops-local"
      courseLabel="MLOps local"
    >
      <Objetivos>
        <ul>
          <li>Inventariar dependencias cloud antes de migrar.</li>
          <li>Probar compatibilidad de prompts, tools y contexto.</li>
          <li>Decidir qué queda local y qué mantiene fallback externo.</li>
        </ul>
      </Objetivos>

      <Cristiano term="fallback">
        Es una ruta alternativa cuando el modelo local no basta: puede ser otro modelo local, vLLM en GPU o un proveedor cloud con aprobación y trazas.
      </Cristiano>

      <Terminal>{`migration_matrix:
  tasks:
    classify_email:
      target: "local"
      model: "ollama/qwen2.5:7b"
      risk: "low"
    draft_legal_reply:
      target: "hybrid"
      local_first: true
      cloud_requires_approval: true
    edit_codebase:
      target: "local_with_review"
      requires_tests: true`}</Terminal>

      <Idea>
        Migra primero tareas tolerantes a error: clasificación, borradores, resúmenes internos. Deja decisiones críticas para híbrido hasta tener evals.
      </Idea>

      <div className="prose">
        <h2>Pruebas antes de cambiar producción</h2>
        <ul>
          <li>Mismo input contra cloud y local.</li>
          <li>Comparar calidad, latencia y formato.</li>
          <li>Probar tool calling mínimo.</li>
          <li>Medir contexto real y truncado.</li>
          <li>Registrar fallos que exigen fallback.</li>
        </ul>
      </div>

      <Cuidado>
        Si el agente dependía de tool calling robusto, el modelo local puede fallar aunque responda bien en chat. Prueba tools antes de migrar flujos con acciones.
      </Cuidado>

      <Comprueba>
        Ejecuta 30 tareas reales antiguas contra local y etiqueta: correcta, aceptable con edición, incorrecta, no sabe, formato roto. Sin esa tabla, migrar es fe.
      </Comprueba>

      <Guardar>
        Migrar bien no significa apagar la nube de golpe. Significa mover lo que ya puede vivir local, medirlo y dejar frontera clara para lo que todavía necesita más calidad.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.litellm.ai/docs/routing-load-balancing" target="_blank" rel="noopener noreferrer">LiteLLM routing and load balancing</a></li>
          <li><a href="https://docs.litellm.ai/docs/proxy/reliability" target="_blank" rel="noopener noreferrer">LiteLLM reliability and fallbacks</a></li>
          <li><a href="https://docs.ollama.com/api" target="_blank" rel="noopener noreferrer">Ollama API</a></li>
          <li><a href="https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html" target="_blank" rel="noopener noreferrer">vLLM OpenAI-compatible server</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/mlops-local/routing-hibrido-litellm", label: "Routing híbrido" }}
        next={{ href: "/cursos/mlops-local/observabilidad", label: "Observabilidad" }}
      />
    </Chapter>
  );
}
