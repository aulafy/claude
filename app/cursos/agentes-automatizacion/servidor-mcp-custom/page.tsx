import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Crear un servidor MCP personalizado — Agentes y automatización",
  description:
    "Crea un servidor MCP custom para exponer herramientas propias a agentes: FastMCP, tools, allowlists, stdio, validación, logs y pruebas antes de usarlo con código real.",
  keywords: ["crear servidor MCP custom", "MCP server Python", "FastMCP tutorial español", "MCP tools custom"],
  alternates: { canonical: "/cursos/agentes-automatizacion/servidor-mcp-custom" },
};

export default function Page() {
  return (
    <Chapter
      crumb="MCP custom"
      title="Crear un servidor MCP personalizado"
      icon="plug"
      lead={<>Instalar servidores MCP públicos está bien para aprender. Pero el salto útil llega cuando expones tus propias herramientas: buscar en tu documentación, validar un repo, consultar una base interna o crear un informe acotado.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Diseñar un servidor MCP mínimo con tools estrechas.</li>
          <li>Separar lógica de negocio, validación y transporte MCP.</li>
          <li>Probarlo antes de conectarlo a Claude Code, Hermes u otro cliente.</li>
        </ul>
      </Objetivos>

      <Cristiano term="servidor MCP custom">
        Es un pequeño servicio que expone herramientas a una app de IA mediante el protocolo MCP. El agente no recibe acceso total: recibe funciones concretas con argumentos definidos.
      </Cristiano>

      <Terminal>{`# Estructura mínima
mcp-debug/
  server.py
  pyproject.toml
  tests/
    test_tools.py

# Tool útil:
# run_lint(project_path) -> ejecuta solo comandos permitidos
# search_docs(query) -> busca en una carpeta concreta`}</Terminal>

      <Idea>
        Tu primera tool debe leer o verificar. No empieces con borrar, publicar, enviar emails o tocar producción.
      </Idea>

      <Terminal>{`from mcp.server.fastmcp import FastMCP
from pathlib import Path
import subprocess

mcp = FastMCP("aulafy-debug-tools")
ROOT = Path("/Users/me/proyectos").resolve()

def safe_path(path: str) -> Path:
    target = Path(path).resolve()
    if ROOT not in target.parents and target != ROOT:
        raise ValueError("Path fuera del workspace permitido")
    return target

@mcp.tool()
def list_markdown_files(path: str) -> list[str]:
    base = safe_path(path)
    return [str(p.relative_to(base)) for p in base.rglob("*.md")][:100]

@mcp.tool()
def run_lint(path: str) -> str:
    base = safe_path(path)
    result = subprocess.run(
        ["npm", "run", "lint"],
        cwd=base,
        text=True,
        capture_output=True,
        timeout=120,
    )
    return result.stdout[-6000:] + result.stderr[-3000:]

if __name__ == "__main__":
    mcp.run()`}</Terminal>

      <Cuidado>
        Si aceptas `command: string` y lo pasas a una shell, has creado una puerta peligrosa. Usa listas de comandos permitidos, timeouts y rutas validadas.
      </Cuidado>

      <div className="prose">
        <h2>Checklist antes de conectar un agente</h2>
        <ul>
          <li>La tool rechaza rutas fuera del workspace.</li>
          <li>Hay timeout y límite de salida.</li>
          <li>No acepta comandos arbitrarios.</li>
          <li>Registra argumentos, decisión y resultado.</li>
          <li>Tiene pruebas con inputs maliciosos.</li>
        </ul>
      </div>

      <Comprueba>
        Prueba tres ataques: `../.env`, una ruta inexistente y un repo sin `package.json`. El servidor debe fallar claro y sin filtrar secretos.
      </Comprueba>

      <Guardar>
        Un MCP custom bueno es aburrido: pocas tools, validación fuerte, logs claros y permisos mínimos. Eso lo hace útil en proyectos reales.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noopener noreferrer">Model Context Protocol introduction</a></li>
          <li><a href="https://modelcontextprotocol.io/docs/develop/build-server" target="_blank" rel="noopener noreferrer">MCP: build a server</a></li>
          <li><a href="https://py.sdk.modelcontextprotocol.io/" target="_blank" rel="noopener noreferrer">MCP Python SDK</a></li>
          <li><a href="https://github.com/modelcontextprotocol/python-sdk" target="_blank" rel="noopener noreferrer">MCP Python SDK GitHub</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/mcp-herramientas-locales", label: "MCP local" }}
        next={{ href: "/cursos/agentes-automatizacion/github-routines", label: "GitHub Actions" }}
      />
    </Chapter>
  );
}
