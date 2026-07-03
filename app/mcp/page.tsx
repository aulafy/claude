import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Servidores MCP — Aprende Claude Code",
  description: "Conecta herramientas externas a Claude Code con el Model Context Protocol (MCP).",
};

export default function Mcp() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Servidores MCP</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="plug">Servidores MCP</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          El Model Context Protocol (MCP) permite conectar Claude Code con herramientas
          externas: bases de datos, APIs, navegadores, servicios en la nube y mucho más.
        </p>
      </div>

      <div className="prose">
        <h2>¿Qué es MCP?</h2>
        <p>
          <strong>MCP (Model Context Protocol)</strong> es un estándar abierto creado
          por Anthropic que define cómo los modelos de IA se comunican con herramientas
          externas. Es como un "USB para IA": un conector universal que cualquier
          herramienta puede implementar.
        </p>
        <p>
          Con MCP, Claude Code puede acceder a recursos que van más allá de tu
          sistema de archivos local: bases de datos PostgreSQL, APIs REST, el
          navegador web, Slack, GitHub, Jira, y cualquier servicio que tenga un
          servidor MCP.
        </p>

        <div className="callout callout-orange">
          <strong>MCP en Claude Code 2026:</strong> Claude Code ahora soporta MCP
          nativo sin necesidad de configuración manual. Muchos servidores se
          activan automáticamente según el contexto del proyecto.
        </div>

        <h2>Cómo funciona</h2>
        <p>Un servidor MCP es un proceso (local o remoto) que expone:</p>
        <ul>
          <li><strong>Herramientas (tools):</strong> funciones que Claude puede llamar (ej: ejecutar SQL, buscar en Slack).</li>
          <li><strong>Recursos (resources):</strong> datos que Claude puede leer (ej: esquema de la DB, documentación).</li>
          <li><strong>Prompts:</strong> instrucciones especializadas para tareas concretas.</li>
        </ul>

        <h2>Añadir un servidor MCP</h2>
        <p>Los servidores MCP se configuran en <code>.claude/settings.json</code>:</p>
        <pre><code>{`{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres",
               "postgresql://localhost/midb"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxx"
      }
    }
  }
}`}</code></pre>

        <p>O añade servidores directamente desde la CLI:</p>
        <pre><code>{`claude mcp add <nombre> -- <comando> [args...]

# Ejemplo: servidor de PostgreSQL
claude mcp add postgres -- npx -y @modelcontextprotocol/server-postgres \\
  "postgresql://localhost/midb"

# Ejemplo: servidor de filesystem (solo lectura)
claude mcp add files -- npx -y @modelcontextprotocol/server-filesystem \\
  /ruta/al/directorio`}</code></pre>

        <h2>Servidores MCP populares</h2>
      </div>

      <div className="overflow-x-auto mb-8">
        <table>
          <thead>
            <tr>
              <th>Servidor</th>
              <th>Paquete npm</th>
              <th>Para qué sirve</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["PostgreSQL", "@modelcontextprotocol/server-postgres", "Consultas SQL directas a tu base de datos"],
              ["SQLite", "@modelcontextprotocol/server-sqlite", "Base de datos SQLite local"],
              ["GitHub", "@modelcontextprotocol/server-github", "Issues, PRs, repos de GitHub"],
              ["Brave Search", "@modelcontextprotocol/server-brave-search", "Búsquedas web en tiempo real"],
              ["Puppeteer", "@modelcontextprotocol/server-puppeteer", "Control de navegador web"],
              ["Slack", "@modelcontextprotocol/server-slack", "Leer/enviar mensajes de Slack"],
              ["Google Drive", "@modelcontextprotocol/server-gdrive", "Acceso a archivos de Google Drive"],
              ["Filesystem", "@modelcontextprotocol/server-filesystem", "Acceso controlado al sistema de archivos"],
              ["Memory", "@modelcontextprotocol/server-memory", "Memoria persistente entre sesiones"],
              ["Sentry", "@modelcontextprotocol/server-sentry", "Errores y performance de Sentry"],
            ].map(([name, pkg, desc]) => (
              <tr key={name as string}>
                <td><strong>{name as string}</strong></td>
                <td><code style={{ fontSize: "0.75em" }}>{pkg as string}</code></td>
                <td>{desc as string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>Gestionar servidores MCP</h2>
        <pre><code>{`# Listar servidores configurados
claude mcp list

# Ver detalles de un servidor
claude mcp get postgres

# Eliminar un servidor
claude mcp remove postgres

# Dentro de Claude Code, ver servidores activos:
/mcp`}</code></pre>

        <h2>Ámbito de los servidores MCP</h2>
        <p>Los servidores MCP tienen tres ámbitos posibles:</p>
        <ul>
          <li>
            <strong>Local</strong> (por defecto): disponible solo en el proyecto actual.
            Se guarda en <code>.claude/settings.json</code>.
          </li>
          <li>
            <strong>Usuario</strong>: disponible en todos tus proyectos.
            Se guarda en <code>~/.claude/settings.json</code>.
            Añade <code>--scope user</code> al comando.
          </li>
          <li>
            <strong>Proyecto</strong>: compartido con el equipo via control de versiones.
          </li>
        </ul>
        <pre><code>{`# Añadir servidor a nivel de usuario (global)
claude mcp add --scope user github -- npx -y @modelcontextprotocol/server-github`}</code></pre>

        <h2>Crear tu propio servidor MCP</h2>
        <p>
          Cualquier script que implemente el protocolo MCP puede ser un servidor.
          Anthropic proporciona SDKs para Python y TypeScript:
        </p>
        <pre><code>{`# TypeScript
npm install @modelcontextprotocol/sdk

# Python
pip install mcp`}</code></pre>

        <h3>Ejemplo mínimo en TypeScript</h3>
        <pre><code>{`import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "mi-servidor", version: "1.0.0" }, {
  capabilities: { tools: {} }
});

server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "saludar",
    description: "Saluda al usuario",
    inputSchema: {
      type: "object",
      properties: { nombre: { type: "string" } },
      required: ["nombre"]
    }
  }]
}));

server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "saludar") {
    return { content: [{ type: "text", text: \`Hola, \${request.params.arguments.nombre}!\` }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);`}</code></pre>

        <h2>MCP en la nube vs local</h2>
        <p>
          Los servidores MCP pueden ejecutarse localmente (como proceso en tu máquina)
          o en la nube (conectados via HTTP/SSE). Claude Code soporta ambos:
        </p>
        <pre><code>{`# Servidor local (stdio)
{
  "command": "node",
  "args": ["./mi-servidor-mcp.js"]
}

# Servidor remoto (HTTP/SSE)
{
  "url": "https://mi-servidor.com/mcp",
  "headers": { "Authorization": "Bearer TOKEN" }
}`}</code></pre>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/configuracion" className="text-sm text-zinc-500 hover:text-zinc-300">← Configuración</Link>
        <Link href="/cursos/claude-code/hooks" className="text-sm text-orange-400 hover:text-orange-300">Hooks →</Link>
      </div>
    </div>
  );
}
