import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "MCP para herramientas locales — Agentes y automatización",
  description:
    "Diseña herramientas MCP locales para agentes: lectura de archivos, comandos permitidos, búsquedas, permisos mínimos, trazas y aprobación humana.",
  keywords: ["mcp herramientas locales", "MCP tools agentes locales", "MCP filesystem seguro", "agentes locales tools"],
  alternates: { canonical: "/cursos/agentes-automatizacion/mcp-herramientas-locales" },
};

export default function Page() {
  return (
    <Chapter
      crumb="MCP local"
      title="MCP para herramientas locales"
      icon="plug"
      lead={<>MCP es útil cuando el agente necesita contexto y herramientas reales, pero cada tool local es una puerta. Empieza por lectura, allowlists y trazas antes de exponer comandos o escritura.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Diseñar tools pequeñas, auditables y con permisos mínimos.</li>
          <li>Separar lectura, búsqueda, escritura y ejecución.</li>
          <li>Crear un contrato claro para aprobar acciones peligrosas.</li>
        </ul>
      </Objetivos>

      <Cristiano term="tool MCP">
        Es una función que un servidor MCP ofrece al agente: buscar archivos, consultar una base de datos, leer documentación o ejecutar una acción acotada.
      </Cristiano>

      <Terminal>{`tools:
  search_notes:
    mode: read
    allowed_paths: ["./docs", "./notes"]
    max_results: 10

  read_file:
    mode: read
    allowed_extensions: [".md", ".txt", ".json"]
    max_bytes: 20000

  run_check:
    mode: execute
    allowed_commands:
      - "npm run lint"
      - "npm test"
    requires_human_approval: false

  delete_file:
    enabled: false`}</Terminal>

      <Idea>
        La primera versión de un MCP interno debería leer y verificar, no modificar. La escritura llega después de tener logs y revisión humana.
      </Idea>

      <div className="prose">
        <h2>Diseño por riesgo</h2>
        <ul>
          <li><strong>Riesgo bajo</strong>: buscar, leer, listar, resumir.</li>
          <li><strong>Riesgo medio</strong>: crear borradores, escribir en carpeta temporal.</li>
          <li><strong>Riesgo alto</strong>: borrar, publicar, enviar, cobrar, tocar producción.</li>
        </ul>
      </div>

      <Cuidado>
        No expongas una shell genérica como tool “porque es cómodo”. Si el agente puede ejecutar cualquier comando, el control ya no está en el prompt.
      </Cuidado>

      <Terminal>{`trace:
  task_id: "agent-2026-07-05-001"
  tool: "read_file"
  args:
    path: "docs/precios.md"
  decision: "allowed"
  reason: "extension .md, path inside ./docs"
  bytes_returned: 4821`}</Terminal>

      <Comprueba>
        Intenta acceder a `../.env`, borrar un archivo y ejecutar `curl`. Un MCP local bien diseñado debe rechazar esas acciones por diseño, no por buena voluntad del modelo.
      </Comprueba>

      <Guardar>
        MCP bien usado no da más poder al agente: le da poder más estrecho, observable y reversible.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noopener noreferrer">MCP introduction</a></li>
          <li><a href="https://modelcontextprotocol.io/specification/2025-06-18/server/tools" target="_blank" rel="noopener noreferrer">MCP specification: tools</a></li>
          <li><a href="https://modelcontextprotocol.io/specification/draft" target="_blank" rel="noopener noreferrer">MCP specification</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/mcp-seguro", label: "MCP seguro" }}
        next={{ href: "/cursos/agentes-automatizacion/github-routines", label: "GitHub Actions" }}
      />
    </Chapter>
  );
}
