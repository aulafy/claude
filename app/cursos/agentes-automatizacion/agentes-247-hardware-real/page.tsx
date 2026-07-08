import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Agentes 24/7 offline en hardware real",
  description:
    "Diseña agentes 24/7 locales para Mac M-series, RTX 3090/4090, mini PC o VPS: colas, watchdog, límites de compute, logs y recuperación.",
  keywords: [
    "agente autonomo local 24/7 low vram",
    "agente offline privado solopreneur",
    "agentes 24/7 Mac M4 RTX 3090",
    "watchdog agente local Ollama",
  ],
  alternates: { canonical: "/cursos/agentes-automatizacion/agentes-247-hardware-real" },
};

export default function Page() {
  return (
    <Chapter
      crumb="24/7 local"
      title="Agentes 24/7 offline en hardware real"
      icon="robot"
      lead={<>Un agente 24/7 local no falla solo por tokens: falla por calor, RAM, VRAM, reinicios, modelos que tardan en cargar, discos llenos y tareas que nadie corta. Diseña operación antes de venderte autonomía.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Elegir arquitectura según Mac, PC con GPU, mini PC o VPS.</li>
          <li>Separar bandeja de entrada, worker y modelo.</li>
          <li>Crear watchdog, logs y límites de recursos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="watchdog">
        Es un proceso o regla que observa si el agente sigue vivo, si avanza y si consume demasiado. Si algo va mal, pausa o reinicia con registro.
      </Cristiano>

      <div className="prose">
        <h2>Arquitecturas honestas</h2>
        <ul>
          <li><strong>Mac M-series</strong>: cómodo, silencioso y buen entorno dev; vigila prefill y memoria unificada.</li>
          <li><strong>RTX 3090/4090</strong>: más VRAM y CUDA; vigila calor, consumo y drivers.</li>
          <li><strong>Mini PC</strong>: útil para orquestación, no para modelos grandes.</li>
          <li><strong>VPS barato</strong>: bien para n8n/colas; mal para inferencia pesada sin GPU.</li>
        </ul>
      </div>

      <Terminal>{`agent-runtime:
  inbox: sqlite_or_postgres
  worker_concurrency: 1
  max_runtime_minutes: 20
  max_steps: 12
  idle_sleep_seconds: 10
  healthcheck:
    - ollama_api_alive
    - disk_free_gt_10gb
    - memory_free_gt_2gb
    - no_repeated_error_3x
  on_failure:
    - pause_task
    - save_trace
    - notify_human`}</Terminal>

      <Idea>
        Para solopreneurs y pymes, un agente 24/7 suele ser una bandeja de tareas con aprobación humana, no un robot tocando sistemas críticos sin permiso.
      </Idea>

      <div className="prose">
        <h2>Checklist de operación local</h2>
        <ul>
          <li>Un solo worker al principio.</li>
          <li>Cola persistente para no perder tareas al reiniciar.</li>
          <li>Logs por tarea, no solo logs globales.</li>
          <li>Resumen final con comandos, archivos y errores.</li>
          <li>Límite de GPU/CPU/tiempo antes de repetir.</li>
        </ul>
      </div>

      <Cuidado>
        Si el modelo tarda más en cargar que el intervalo de auto-restart, puedes crear un bucle que mata el servicio justo antes de que arranque. Mide tiempo de carga antes de configurar watchdogs agresivos.
      </Cuidado>

      <Comprueba>
        Simula tres fallos: Ollama apagado, disco lleno y tool que falla dos veces. El agente debe pausar y avisar, no repetir hasta el infinito.
      </Comprueba>

      <Guardar>
        Un agente 24/7 local no es “siempre activo”; es recuperable, observable y capaz de detenerse sin romper nada.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.ollama.com/api" target="_blank" rel="noopener noreferrer">Ollama API</a></li>
          <li><a href="https://docs.langchain.com/oss/python/langgraph/persistence" target="_blank" rel="noopener noreferrer">LangGraph Persistence</a></li>
          <li><a href="https://docs.n8n.io/hosting/scaling/queue-mode/" target="_blank" rel="noopener noreferrer">n8n queue mode</a></li>
          <li><a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">Docker Compose</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/agente-247", label: "Agente 24/7" }}
        next={{ href: "/cursos/agentes-automatizacion/oom-memory", label: "OOM y memoria" }}
      />
    </Chapter>
  );
}
