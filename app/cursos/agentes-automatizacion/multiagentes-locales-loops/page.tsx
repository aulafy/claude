import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Multi-agentes locales, memoria y control de loops — Agentes y automatización",
  description:
    "Diseña sistemas multi-agente locales con subagentes, memoria persistente, presupuestos de compute, reglas de parada y trazas para evitar loops infinitos.",
  keywords: [
    "multi agente local subagentes persistencia",
    "runaway agent loop fix local ollama",
    "agentes locales memoria persistente",
    "control loops agentes IA",
    "subagentes IA local",
  ],
  alternates: { canonical: "/cursos/agentes-automatizacion/multiagentes-locales-loops" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Multi-agentes locales"
      title="Multi-agentes locales, memoria y control de loops"
      icon="robot"
      lead={<>Varios agentes en paralelo no multiplican automáticamente la inteligencia. También multiplican VRAM, RAM, CPU, logs, estados inconsistentes y posibilidades de loop. Diseña límites antes de diseñar subagentes.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Decidir cuándo merece la pena usar subagentes locales.</li>
          <li>Crear memoria persistente sin convertirla en un cajón caótico.</li>
          <li>Aplicar límites de pasos, herramientas, tiempo y compute.</li>
        </ul>
      </Objetivos>

      <Cristiano term="multi-agente">
        Es un sistema donde varias unidades con rol propio colaboran: planner, investigador, ejecutor, verificador. Si no comparten estado y límites, se pisan entre sí.
      </Cristiano>

      <div className="prose">
        <h2>Empieza por roles estrechos</h2>
        <ul>
          <li><strong>Planner</strong>: decide plan y criterio de éxito, no edita.</li>
          <li><strong>Retriever</strong>: busca contexto en archivos, RAG o documentación.</li>
          <li><strong>Executor</strong>: aplica cambios acotados.</li>
          <li><strong>Verifier</strong>: corre pruebas, revisa diff y detecta regresiones.</li>
        </ul>
      </div>

      <Idea>
        Si un solo agente con buen prompt puede resolver la tarea, no metas cuatro. Multi-agente es útil cuando hay separación real de responsabilidades.
      </Idea>

      <Terminal>{`task:
  goal: "Añadir una validación sin romper API pública"
  max_total_steps: 16
  max_parallel_agents: 2
  memory_file: ".agent/state.md"

agents:
  planner:
    can_edit: false
    max_steps: 3
  executor:
    can_edit: true
    allowed_paths: ["src/", "tests/"]
    max_steps: 6
  verifier:
    can_edit: false
    commands: ["npm run lint", "npm test"]
    max_steps: 4`}</Terminal>

      <Cuidado>
        En local, el cuello de botella no es solo tokens. También compiten navegador, IDE, Docker, Qdrant, n8n, Ollama y los propios agentes. Dos agentes lentos pueden ser mejor que seis agentes bloqueando la máquina.
      </Cuidado>

      <div className="prose">
        <h2>Memoria persistente mínima</h2>
        <p>
          La memoria debe guardar decisiones y estado, no todo el chat. Si guardas ruido, el agente recuperará ruido.
        </p>
      </div>

      <Terminal>{`# .agent/state.md
## Objetivo actual
Corregir validación de email sin cambiar contratos públicos.

## Decisiones
- No tocar base de datos.
- Mantener nombres de funciones exportadas.

## Evidencia
- npm run lint: pendiente
- npm test: pendiente

## Bloqueos
- Falta confirmar comportamiento con emails internacionales.`}</Terminal>

      <div className="prose">
        <h2>Cortes contra runaway loops</h2>
      </div>

      <Terminal>{`loop_guards:
  repeated_tool_call:
    same_tool_same_args: 2
    action: stop_and_summarize
  no_state_change:
    steps_without_new_evidence: 3
    action: ask_human
  compute_budget:
    max_runtime_minutes: 20
    max_gpu_memory_percent: 90
    action: pause
  failed_command:
    same_error: 2
    action: change_strategy_or_stop`}</Terminal>

      <Comprueba>
        Haz un ensayo con una tarea pequeña y una tool falsa que falla. El sistema debe parar, explicar el bloqueo y no repetir la misma llamada hasta agotar recursos.
      </Comprueba>

      <Guardar>
        El mejor multi-agente local es pequeño, observable y aburrido: roles estrechos, memoria breve, límites duros y una salida clara cuando no sabe avanzar.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener noreferrer">Hermes Agent documentation</a></li>
          <li><a href="https://docs.langchain.com/oss/python/langgraph/overview" target="_blank" rel="noopener noreferrer">LangGraph Docs</a></li>
          <li><a href="https://docs.langchain.com/oss/python/langgraph/persistence" target="_blank" rel="noopener noreferrer">LangGraph Persistence</a></li>
          <li><a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener noreferrer">Model Context Protocol</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/loops-costes", label: "Loops y costes" }}
        next={{ href: "/cursos/agentes-automatizacion/mcp-governance", label: "Governance MCP" }}
      />
    </Chapter>
  );
}
