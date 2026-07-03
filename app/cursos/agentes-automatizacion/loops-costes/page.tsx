import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Loops infinitos y control de costes — Agentes y automatización",
  description:
    "Cómo detectar loops, cortar ejecuciones repetidas y poner presupuestos duros a agentes con herramientas, n8n o LangGraph.",
  keywords: ["loops infinitos agentes IA", "control costes agentes IA", "budget guardrails LLM", "circuit breaker agentes"],
  alternates: { canonical: "/cursos/agentes-automatizacion/loops-costes" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Loops y costes"
      title="Loops infinitos y control de costes"
      icon="warning"
      lead={<>Un agente que repite la misma llamada cien veces no parece peligroso hasta que llega la factura o bloquea un servicio externo.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Detectar loops por repetición de intención, tool y argumentos.</li>
          <li>Aplicar presupuestos por tarea, usuario, modelo y ventana temporal.</li>
          <li>Diseñar circuit breakers que detienen el sistema antes del desastre.</li>
        </ul>
      </Objetivos>

      <Cristiano term="circuit breaker">
        Es una regla que corta llamadas cuando detecta demasiados fallos, coste excesivo o repetición sospechosa.
      </Cristiano>

      <Terminal>{`guardrails:
  max_steps_per_task: 12
  max_tool_calls_per_tool: 4
  max_cost_usd_per_task: 0.80
  max_repeated_fingerprint: 3
  max_runtime_seconds: 300

fingerprint:
  campos:
    - normalized_goal
    - tool_name
    - sorted_args_hash
  si_repite_3_veces:
    parar
    guardar_traza
    pedir_revision_humana`}</Terminal>

      <div className="prose">
        <h2>Señales de loop</h2>
        <ul>
          <li>La misma tool recibe argumentos casi iguales.</li>
          <li>El agente dice “voy a comprobar” muchas veces sin nueva evidencia.</li>
          <li>El coste sube pero no cambia el estado de la tarea.</li>
          <li>Los errores son recuperables, pero la estrategia no cambia.</li>
        </ul>
      </div>

      <Idea>
        `max_iterations` ayuda, pero no basta. Un loop puede estar por debajo del máximo y seguir siendo caro o inútil.
      </Idea>

      <Cuidado>
        No esperes al resumen final para calcular coste. Mide durante la ejecución y corta en caliente.
      </Cuidado>

      <Comprueba>
        Define tres presupuestos: por tarea, por día y por acción crítica. Después decide qué mensaje verá el usuario cuando el sistema corte.
      </Comprueba>

      <Guardar>
        Un agente responsable sabe rendirse con evidencia.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/estado-recuperacion", label: "Estado persistente" }}
        next={{ href: "/cursos/agentes-automatizacion/mcp-governance", label: "Governance MCP" }}
      />
    </Chapter>
  );
}
