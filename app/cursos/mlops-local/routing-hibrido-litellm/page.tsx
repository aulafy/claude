import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Routing híbrido local/cloud con LiteLLM — MLOps local",
  description:
    "Diseña un gateway híbrido con LiteLLM para usar Ollama/vLLM en local y escalar a modelos frontier solo cuando haga falta, con fallbacks, límites y presupuestos.",
  keywords: [
    "routing híbrido LiteLLM Ollama",
    "LiteLLM local cloud fallback",
    "stack local cloud LLM routing",
    "gateway modelos locales frontier",
  ],
  alternates: { canonical: "/cursos/mlops-local/routing-hibrido-litellm" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Routing híbrido"
      title="Routing híbrido local/cloud con LiteLLM"
      icon="network"
      lead={<>El objetivo no es usar local para todo. El objetivo es usar local para lo rutinario, privado o barato, y escalar a un modelo externo solo cuando el caso lo justifique y quede registrado.</>}
      courseHref="/cursos/mlops-local"
      courseLabel="MLOps local"
    >
      <Objetivos>
        <ul>
          <li>Diseñar grupos de modelos por tarea, coste y sensibilidad.</li>
          <li>Usar fallbacks sin ocultar errores importantes.</li>
          <li>Registrar cuándo una tarea salió de local a cloud.</li>
        </ul>
      </Objetivos>

      <Cristiano term="routing híbrido">
        Es una capa que decide qué modelo usar: local para tareas normales, vLLM para concurrencia, y cloud para tareas complejas o revisión final.
      </Cristiano>

      <Terminal>{`model_list:
  - model_name: local-fast
    litellm_params:
      model: ollama/qwen2.5:7b
      api_base: http://localhost:11434

  - model_name: local-gpu
    litellm_params:
      model: openai/Qwen/Qwen2.5-14B-Instruct
      api_base: http://localhost:8000/v1
      api_key: none

  - model_name: frontier-review
    litellm_params:
      model: openai/gpt-4.1-mini
      api_key: os.environ/OPENAI_API_KEY`}</Terminal>

      <Idea>
        La política importa más que el YAML: qué datos pueden salir, quién aprueba, cuánto puede gastar y qué logs se guardan.
      </Idea>

      <div className="prose">
        <h2>Política práctica</h2>
        <ul>
          <li><strong>Local-fast</strong>: borradores, clasificación, resumen de documentos no sensibles.</li>
          <li><strong>Local-gpu</strong>: tareas largas, RAG interno y agentes con más contexto.</li>
          <li><strong>Frontier-review</strong>: revisión final, razonamiento difícil o fallo repetido local.</li>
        </ul>
      </div>

      <Terminal>{`routing_rules:
  sensitive_data: local_only
  max_local_retries: 2
  allow_cloud_fallback:
    - public_code_review
    - generic_planning
    - final_quality_check
  require_human_approval:
    - customer_data
    - legal_docs
    - financial_docs`}</Terminal>

      <Cuidado>
        Un fallback automático puede convertirse en fuga de datos. Si local falla sobre datos sensibles, la acción correcta puede ser parar, no mandar el prompt a otro proveedor.
      </Cuidado>

      <Comprueba>
        Crea una traza por petición: modelo elegido, motivo, coste estimado, si hubo fallback y si había datos sensibles. Sin esa traza, no hay control real.
      </Comprueba>

      <Guardar>
        Híbrido no significa “todo conectado”. Significa tener una política explícita para decidir cuándo local basta y cuándo merece la pena escalar.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.litellm.ai/" target="_blank" rel="noopener noreferrer">LiteLLM Docs</a></li>
          <li><a href="https://docs.litellm.ai/docs/routing-load-balancing" target="_blank" rel="noopener noreferrer">LiteLLM routing and load balancing</a></li>
          <li><a href="https://docs.litellm.ai/docs/proxy/reliability" target="_blank" rel="noopener noreferrer">LiteLLM fallbacks</a></li>
          <li><a href="https://docs.ollama.com/api" target="_blank" rel="noopener noreferrer">Ollama API</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/mlops-local/litellm-gateway", label: "LiteLLM gateway" }}
        next={{ href: "/cursos/mlops-local/observabilidad", label: "Observabilidad" }}
      />
    </Chapter>
  );
}
