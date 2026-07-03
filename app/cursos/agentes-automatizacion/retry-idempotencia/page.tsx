import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Retries, idempotencia y exactly-once — Agentes y automatización",
  description:
    "Aprende por qué reintentar un agente no es como reintentar una API y cómo evitar acciones duplicadas con idempotency keys.",
  keywords: ["retry logic agentes IA", "idempotencia LangGraph", "exactly once agents", "tool calling duplicado"],
  alternates: { canonical: "/cursos/agentes-automatizacion/retry-idempotencia" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Retries"
      title="Retries, idempotencia y exactly-once"
      icon="recycle"
      lead={<>Reintentar una llamada LLM puede cambiar el razonamiento, elegir otra herramienta o ejecutar dos veces una acción crítica. En agentes, retry ciego es deuda de producción.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Distinguir retry de modelo, retry de tool y retry de workflow.</li>
          <li>Diseñar acciones idempotentes para pagos, emails, tickets y cambios de datos.</li>
          <li>Crear una tabla de ejecuciones que bloquee duplicados.</li>
        </ul>
      </Objetivos>

      <Cristiano term="idempotencia">
        Es la propiedad de que repetir una operación con la misma clave no produzca efectos duplicados.
      </Cristiano>

      <Terminal>{`tabla_tool_executions:
  idempotency_key: "invoice-email:cliente-42:2026-07"
  tool: "send_email"
  status: "completed"
  result_id: "msg_abc123"

regla:
  si existe completed con misma key:
    devolver result_id anterior
    no ejecutar tool otra vez
  si existe running:
    esperar o marcar conflicto
  si falla:
    guardar error y decidir retry con humano`}</Terminal>

      <div className="prose">
        <h2>Patrón seguro</h2>
        <ul>
          <li>Genera una `idempotency_key` antes de llamar la tool.</li>
          <li>Registra `running` antes del efecto externo.</li>
          <li>Marca `completed` solo cuando el proveedor confirma.</li>
          <li>En retry, consulta la tabla antes de actuar.</li>
          <li>Para acciones irreversibles, añade aprobación humana.</li>
        </ul>
      </div>

      <Idea>
        Reintenta el sistema, no el razonamiento completo. Si la tool falló por red, reintenta la tool con la misma clave; no pidas al agente que “lo piense otra vez” desde cero.
      </Idea>

      <Cuidado>
        “Exactly-once” real es difícil en sistemas distribuidos. En práctica educativa, busca “efecto externo una sola vez” mediante claves, registros y reconciliación.
      </Cuidado>

      <Comprueba>
        Lista tus tools peligrosas: enviar email, cobrar, borrar, publicar, crear usuario, tocar CRM. Cada una necesita clave de idempotencia.
      </Comprueba>

      <Guardar>
        Cualquier tool con efecto externo debe poder responder: “¿ya hice esto antes?”.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/oom-memory", label: "OOM y memoria" }}
        next={{ href: "/cursos/agentes-automatizacion/estado-recuperacion", label: "Estado persistente" }}
      />
    </Chapter>
  );
}
