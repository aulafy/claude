import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "MCP sin regalar tus llaves — Agentes y automatización",
  description:
    "Buenas prácticas para usar servidores MCP con agentes: allowlists, OAuth, variables de entorno, permisos por servidor y revisión de herramientas.",
  keywords: ["MCP seguro", "Model Context Protocol seguridad", "Claude Code MCP permisos", "MCP OAuth"],
  alternates: { canonical: "/cursos/agentes-automatizacion/mcp-seguro" },
};

export default function Page() {
  return (
    <Chapter
      crumb="MCP seguro"
      title="MCP sin regalar tus llaves"
      icon="plug"
      lead={<>MCP vuelve útil a un agente porque lo conecta con GitHub, bases de datos, navegadores y servicios internos. Esa misma potencia amplía la superficie de ataque.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Entender qué riesgo añade cada servidor MCP.</li>
          <li>Separar credenciales, permisos y entornos de prueba.</li>
          <li>Diseñar allowlists y reglas de uso para equipos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="MCP">
        Model Context Protocol es un estándar para que un modelo use herramientas externas con esquemas definidos.
      </Cristiano>

      <Terminal>{`{
  "mcpServers": {
    "github-readonly": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_READONLY_TOKEN}"
      }
    }
  }
}`}</Terminal>

      <div className="prose">
        <h2>Buenas prácticas</h2>
        <ul>
          <li>Usa tokens de solo lectura cuando el flujo no necesita escribir.</li>
          <li>Separa tokens de desarrollo, preview y producción.</li>
          <li>No pongas secretos en repositorios, prompts ni capturas.</li>
          <li>Revisa qué tools expone cada MCP antes de aprobarlo.</li>
          <li>Limita servidores permitidos en equipos mediante settings gestionados si los tienes.</li>
        </ul>
      </div>

      <Idea>
        El nombre del servidor no basta. Mira las herramientas que expone: leer issues no es lo mismo que cerrar PRs, borrar ramas o escribir en producción.
      </Idea>

      <Cuidado>
        Un agente con MCP a base de datos real y permisos de escritura necesita las mismas defensas que una aplicación interna: mínimos privilegios, logs y entorno de pruebas.
      </Cuidado>

      <Comprueba>
        Haz inventario de tus MCP: servidor, credencial, herramientas disponibles, permisos reales, entorno y persona responsable.
      </Comprueba>

      <Guardar>
        MCP no es solo una integración. Es una puerta. Decide quién tiene llave, para qué y con qué registro.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/skills-seguras", label: "Skills seguras" }}
        next={{ href: "/cursos/agentes-automatizacion/github-routines", label: "GitHub y routines" }}
      />
    </Chapter>
  );
}
