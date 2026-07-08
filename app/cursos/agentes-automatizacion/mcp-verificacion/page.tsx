import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "MCP de verificación antes de merge",
  description:
    "Diseña un workflow MCP seguro para que un agente edite código, cree una rama y otro proceso verifique dependencias, tests y logs antes de merge.",
  keywords: ["mcp server claude code local ollama", "mcp verify workflow", "github mcp agent code", "mcp seguridad agentes"],
  alternates: { canonical: "/cursos/agentes-automatizacion/mcp-verificacion" },
};

export default function Page() {
  return (
    <Chapter
      crumb="MCP verify"
      title="MCP de verificación antes de merge"
      icon="plug"
      lead={<>MCP permite conectar agentes con herramientas reales. Eso es potente y peligroso. El patrón sano para código es separar dos roles: un agente que propone cambios y un verificador que prueba en limpio antes de merge.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Entender el patrón editar → verificar → aprobar.</li>
          <li>Separar permisos de escritura y permisos de verificación.</li>
          <li>Diseñar un MCP interno sin regalar llaves del repo.</li>
        </ul>
      </Objetivos>

      <Cristiano term="MCP">
        Model Context Protocol es un estándar para que una aplicación de IA use herramientas y datos externos mediante servidores. Un servidor MCP puede exponer GitHub, archivos, bases de datos, documentación o un verificador propio.
      </Cristiano>

      <div className="prose">
        <h2>El error típico</h2>
        <p>
          El agente edita código, dice “ya está” y nadie ejecuta el proyecto desde cero. Puede haber dependencias
          rotas, tests que no corren, variables de entorno ausentes o un build que solo funcionaba en su contexto.
          MCP sirve para convertir esa intuición en un proceso verificable.
        </p>
      </div>

      <Terminal>{`# Flujo recomendado
1. Agente editor:
   - crea rama
   - aplica cambios
   - abre PR con resumen y riesgos

2. Agente/verificador:
   - clona el repo en carpeta limpia
   - instala dependencias
   - ejecuta lint, tests y build
   - adjunta logs al PR

3. Humano o policy:
   - aprueba solo si la verificación pasa`}</Terminal>

      <Idea>
        El verificador no necesita poder escribir en producción. Su poder es leer, ejecutar en sandbox y devolver evidencias.
      </Idea>

      <div className="prose">
        <h2>Diseño de permisos</h2>
        <ul>
          <li><strong>GitHub MCP</strong>: crear rama, commit y PR; nunca force-push a `main`.</li>
          <li><strong>Verify MCP</strong>: clone fresco, install, lint, test, build y logs.</li>
          <li><strong>Secrets</strong>: no pasar `.env` reales al verificador si no hacen falta.</li>
          <li><strong>Red</strong>: limitar salidas externas si el proyecto no las necesita.</li>
          <li><strong>Logs</strong>: guardar comando, exit code, versión de Node/Python y resumen.</li>
        </ul>
      </div>

      <Terminal>{`{
  "tool": "verify_repo",
  "input": {
    "repo": "github.com/empresa/app",
    "branch": "agent/fix-login",
    "commands": ["npm ci", "npm run lint", "npm test", "npm run build"],
    "timeout_seconds": 900
  },
  "output": {
    "status": "failed",
    "failed_command": "npm test",
    "exit_code": 1,
    "log_url": "https://..."
  }
}`}</Terminal>

      <Cuidado>
        MCP no convierte una herramienta insegura en segura. Si expones una shell sin límites, un servidor con permisos amplios o tokens con acceso total, el agente hereda ese riesgo.
      </Cuidado>

      <Comprueba>
        Antes de conectar GitHub real, prueba el verificador con un repo de juguete que falla a propósito. El workflow debe devolver error claro y bloquear merge.
      </Comprueba>

      <Guardar>
        La regla de oro: el agente puede proponer, pero el sistema debe verificar. La confianza se gana con logs, tests y permisos mínimos.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noopener noreferrer">Model Context Protocol introduction</a></li>
          <li><a href="https://modelcontextprotocol.io/specification/2025-03-26" target="_blank" rel="noopener noreferrer">MCP specification</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/loops-costes", label: "Loops y costes" }}
        next={{ href: "/cursos/agentes-automatizacion/mcp-governance", label: "Governance MCP" }}
      />
    </Chapter>
  );
}
