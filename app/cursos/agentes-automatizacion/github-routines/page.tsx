import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "GitHub Actions y routines",
  description:
    "Diseña automatizaciones de IA con GitHub Actions, cron local, loops y tareas programadas, separando CI determinista de trabajo agéntico.",
  keywords: ["GitHub Actions agentes IA", "routines Claude Code", "loop agentes IA", "automatización PR IA"],
  alternates: { canonical: "/cursos/agentes-automatizacion/github-routines" },
};

export default function Page() {
  return (
    <Chapter
      crumb="GitHub y routines"
      title="GitHub Actions y routines"
      icon="calendar"
      lead={<>No todo lo programado debe ser agentic. Tests, lint y deploy son CI. Triage, revisión, investigación y propuestas de cambio pueden ser trabajo de agente con límites.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Elegir entre GitHub Actions, cron local, loops y tareas agénticas.</li>
          <li>Evitar automatizaciones que escriben sin revisión humana.</li>
          <li>Diseñar un flujo de PR review replicable por principiantes.</li>
        </ul>
      </Objetivos>

      <Cristiano term="routine">
        En este curso lo usamos como rutina automatizada: una tarea que se ejecuta por horario o evento y produce una salida revisable.
      </Cristiano>

      <div className="prose">
        <h2>Qué usar</h2>
        <ul>
          <li><strong>GitHub Actions</strong>: tests, build, lint, deploy, tareas repetibles sin criterio abierto.</li>
          <li><strong>Cron local o VPS</strong>: tareas privadas que necesitan archivos o servicios de tu máquina.</li>
          <li><strong>Loop</strong>: vigilancia temporal con condición de parada clara.</li>
          <li><strong>Agente programado</strong>: investigar, resumir, comentar PRs o preparar borradores.</li>
        </ul>
      </div>

      <Terminal>{`name: ai-pr-check
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  deterministic-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --runInBand`}</Terminal>

      <Idea>
        Combina lo mejor de cada mundo: CI determinista para comprobar y agente para explicar, priorizar y proponer.
      </Idea>

      <Cuidado>
        No empieces por “auto-merge”. Empieza por “comenta un diagnóstico con enlaces a líneas, tests fallidos y pasos de reproducción”.
      </Cuidado>

      <Comprueba>
        Diseña tu primer flujo: evento, datos de entrada, checks deterministas, comentario del agente, aprobación humana y acción final.
      </Comprueba>

      <Guardar>
        Una automatización educativa debe enseñar a confiar con evidencia, no a delegar a ciegas.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/mcp-seguro", label: "MCP seguro" }}
        next={{ href: "/cursos/agentes-automatizacion/agente-247", label: "Agente 24/7" }}
      />
    </Chapter>
  );
}
