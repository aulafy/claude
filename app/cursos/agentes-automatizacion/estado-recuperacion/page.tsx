import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Estado persistente y crash recovery — Agentes y automatización",
  description:
    "Diseña agentes 24/7 que sobreviven a reinicios con checkpointers, estado hot/warm/cold, active-tasks y durable execution.",
  keywords: ["persistent state agentes IA", "crash recovery LangGraph", "Temporal durable execution", "memoria agentes 24/7"],
  alternates: { canonical: "/cursos/agentes-automatizacion/estado-recuperacion" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Crash recovery"
      title="Estado persistente y crash recovery"
      icon="save"
      lead={<>Un agente 24/7 no es fiable porque nunca falla. Es fiable porque puede caer, arrancar de nuevo y saber qué estaba haciendo sin improvisar.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Separar memoria de conversación, estado de tarea y conocimiento duradero.</li>
          <li>Usar checkpoints para reanudar flujos y auditar decisiones.</li>
          <li>Saber cuándo mirar Temporal o durable execution en procesos largos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="crash recovery">
        Es la capacidad de continuar de forma controlada después de un reinicio, caída de worker o fallo de herramienta.
      </Cristiano>

      <Terminal>{`capas_estado:
  hot:
    uso: paso actual
    ejemplo: mensajes recientes
  warm:
    uso: tarea en curso
    ejemplo: active_tasks, checkpoint, tool_outputs resumidos
  cold:
    uso: memoria duradera
    ejemplo: preferencias, hechos validados, auditoria

boot:
  1: cargar active_tasks
  2: detectar tareas running antiguas
  3: reconciliar tool_executions
  4: pedir aprobacion si hay duda
  5: reanudar o cerrar con evidencia`}</Terminal>

      <Idea>
        LangGraph documenta checkpointers para persistir el estado del grafo por hilo. Temporal aborda otra capa: ejecución duradera de procesos que deben sobrevivir a caídas y continuar hasta completarse.
      </Idea>

      <Cuidado>
        Checkpoint no significa supervisión automática. Si un worker muere, necesitas algo externo que lo detecte: monitor, cron, supervisor, cola o plataforma de durable execution.
      </Cuidado>

      <Comprueba>
        Crea un archivo `active-tasks.md` o una tabla equivalente. Debe responder: tarea, dueño, estado, último paso, próxima acción, riesgo y cómo reanudar.
      </Comprueba>

      <Guardar>
        Estado persistente no es memoria infinita. Es continuidad mínima, verificable y recuperable.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/retry-idempotencia", label: "Retries" }}
        next={{ href: "/cursos/agentes-automatizacion/loops-costes", label: "Loops y costes" }}
      />
    </Chapter>
  );
}
