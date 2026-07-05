import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Recuperación de errores y fallos 503 — Agentes en producción",
  description:
    "Patrones para que un agente LangGraph o n8n no entre en bucle cuando falla una API: retries, backoff, timeouts, estado y escalado humano.",
  keywords: ["langgraph error recovery agent", "agent 503 retry backoff", "n8n agent transient errors", "agentes IA producción"],
  alternates: { canonical: "/cursos/agentes-produccion/recuperacion-errores" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Recuperación de errores"
      title="Recuperación de errores y fallos 503"
      icon="warning"
      lead={<>Un agente de producción no puede entrar en crisis porque una API devuelve 503 durante diez segundos. Tiene que distinguir error transitorio, error recuperable, error humano y fallo definitivo.</>}
      courseHref="/cursos/agentes-produccion"
      courseLabel="Agentes en producción"
    >
      <Objetivos>
        <ul>
          <li>Clasificar errores antes de reintentar.</li>
          <li>Diseñar retries con backoff, jitter y límite.</li>
          <li>Escalar a revisión humana sin perder estado.</li>
        </ul>
      </Objetivos>

      <Cristiano term="fallo transitorio">
        Es un error temporal: rate limit, 503, red lenta, timeout o servicio arrancando. No significa que el mundo se haya terminado; significa que toca esperar y reintentar con cabeza.
      </Cristiano>

      <div className="prose">
        <h2>Clasifica antes de actuar</h2>
        <ul>
          <li><strong>Transitorio</strong>: 429, 503, timeout, conexión rota. Reintento con backoff.</li>
          <li><strong>LLM-recuperable</strong>: formato JSON incorrecto, campo faltante. Reintento con corrección explícita.</li>
          <li><strong>Usuario-recuperable</strong>: falta dato, permiso o aprobación. Preguntar o pausar.</li>
          <li><strong>Definitivo</strong>: credencial inválida, recurso no existe, política bloqueada. Parar y reportar.</li>
        </ul>
      </div>

      <Terminal>{`type AgentError =
  | { kind: "transient"; code: 429 | 503 | "timeout"; retryAfterMs?: number }
  | { kind: "model_format"; message: string }
  | { kind: "needs_human"; reason: string }
  | { kind: "fatal"; reason: string };

const retryPolicy = {
  maxAttempts: 4,
  initialDelayMs: 1000,
  backoff: 2,
  jitter: true,
};`}</Terminal>

      <Idea>
        Un retry sin memoria es una repetición. Un retry con estado sabe qué intentó, cuándo, con qué entrada y por qué vuelve a probar.
      </Idea>

      <div className="prose">
        <h2>Estado mínimo para no entrar en spiral</h2>
      </div>

      <Terminal>{`{
  "task_id": "research-2026-07-05-001",
  "step": "fetch_sources",
  "attempts": 2,
  "last_error": "503 from search API",
  "next_retry_at": "2026-07-05T10:31:00Z",
  "fallback": "use cached sources",
  "human_review": false
}`}</Terminal>

      <Cuidado>
        No dejes que el modelo decida solo si reintenta una acción externa irreversible. Enviar emails, pagar, borrar registros o publicar contenido necesita idempotencia y aprobación.
      </Cuidado>

      <div className="prose">
        <h2>Patrón de recuperación recomendado</h2>
        <ol>
          <li>Ejecuta herramienta con timeout.</li>
          <li>Si falla, clasifica el error en código, no en texto libre.</li>
          <li>Si es transitorio, espera con backoff y registra intento.</li>
          <li>Si agota intentos, cambia a fallback o escala a humano.</li>
          <li>Resume el estado, no todo el historial, para continuar.</li>
        </ol>
      </div>

      <Comprueba>
        Simula una API que devuelve 503 dos veces y luego 200. El agente debe esperar, reintentar y continuar sin enviar un informe alarmista ni repetir acciones externas.
      </Comprueba>

      <Guardar>
        Un agente fiable no es el que nunca falla; es el que falla de forma legible, recuperable y auditable.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.langchain.com/oss/python/langgraph/persistence" target="_blank" rel="noopener noreferrer">LangGraph persistence</a></li>
          <li><a href="https://docs.langchain.com/oss/python/langgraph/thinking-in-langgraph" target="_blank" rel="noopener noreferrer">LangGraph: Thinking in LangGraph</a></li>
          <li><a href="https://docs.langchain.com/oss/python/langchain/human-in-the-loop" target="_blank" rel="noopener noreferrer">LangChain/LangGraph human-in-the-loop</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/agentes-produccion/human-in-the-loop", label: "Aprobaciones humanas" }}
        next={{ href: "/cursos/agentes-produccion/evals-logs", label: "Evals, logs y observabilidad" }}
      />
    </Chapter>
  );
}
