import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Memoria persistente compartida para agentes locales — Agentes y automatización",
  description:
    "Diseña memoria persistente para multi-agentes locales con capas hot/warm/cold, Qdrant, Obsidian, task board, decay, permisos y trazas.",
  keywords: ["memoria persistente agentes locales", "multi agent memory Qdrant Obsidian", "shared memory agents", "Hermes ToolBridge Obsidian"],
  alternates: { canonical: "/cursos/agentes-automatizacion/memoria-persistente-compartida" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Memoria compartida"
      title="Memoria persistente compartida para agentes locales"
      icon="database"
      lead={<>Cuando varios agentes trabajan durante días, el contexto del chat no basta. Necesitas memoria externa: estado de tareas, decisiones, documentos recuperables y una forma de olvidar lo que ya no sirve.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Separar memoria de trabajo, memoria vectorial y wiki humana.</li>
          <li>Evitar que varios agentes escriban verdades contradictorias.</li>
          <li>Diseñar decay, permisos y trazas para memoria compartida.</li>
        </ul>
      </Objetivos>

      <Cristiano term="memoria compartida">
        Es un almacén externo que varios agentes pueden consultar o actualizar: tareas, decisiones, notas, embeddings, documentos y resúmenes.
      </Cristiano>

      <Terminal>{`memory_layers:
  hot:
    storage: "task_board"
    content: "estado actual, bloqueos, owner"
  warm:
    storage: "qdrant"
    content: "decisiones, conversaciones resumidas, documentos"
  cold:
    storage: "obsidian"
    content: "wiki revisada, fuentes y reglas estables"
  rules:
    write_requires_source: true
    conflicting_fact: "create_review_task"
    decay_days: 30`}</Terminal>

      <Idea>
        La memoria útil no es “guardar todo”. Es guardar lo que cambia decisiones futuras y poder explicar de dónde salió.
      </Idea>

      <div className="prose">
        <h2>Qué guardar</h2>
        <ul>
          <li>Decisiones tomadas y motivo.</li>
          <li>Errores repetidos y solución aplicada.</li>
          <li>Preferencias explícitas del usuario.</li>
          <li>Estado de tareas y handoffs.</li>
          <li>Fuentes estables con fecha.</li>
        </ul>
      </div>

      <Cuidado>
        No dejes que todos los agentes escriban en la wiki final. Usa un borrador y un verificador, o la memoria se llenará de medias verdades.
      </Cuidado>

      <Terminal>{`memory_event:
  type: "decision"
  scope: "project:aulafy"
  fact: "Las lecciones deben citar fuentes oficiales cuando tratan herramientas vivas."
  source: "editorial_policy"
  confidence: 0.95
  expires_at: null
  writer_agent: "planner"`}</Terminal>

      <Comprueba>
        Crea dos agentes que intentan guardar conclusiones opuestas. El sistema debe detectar conflicto y pedir revisión, no elegir una al azar.
      </Comprueba>

      <Guardar>
        La memoria persistente es una base de datos editorial. Sin permisos, fechas y revisión, se convierte en una fábrica de ruido.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.langchain.com/oss/python/langgraph/persistence" target="_blank" rel="noopener noreferrer">LangGraph Persistence</a></li>
          <li><a href="https://qdrant.tech/documentation/" target="_blank" rel="noopener noreferrer">Qdrant documentation</a></li>
          <li><a href="https://obsidian.md/help/obsidian-flavored-markdown" target="_blank" rel="noopener noreferrer">Obsidian Flavored Markdown</a></li>
          <li><a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener noreferrer">Hermes Agent documentation</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/multiagentes-locales-loops", label: "Multi-agentes" }}
        next={{ href: "/cursos/agentes-automatizacion/mcp-verificacion", label: "MCP de verificación" }}
      />
    </Chapter>
  );
}
