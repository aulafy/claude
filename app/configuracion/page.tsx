import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Configuración — Aprende Claude Code",
  description: "Personaliza Claude Code con settings.json, CLAUDE.md, modelos y variables de entorno.",
};

export default function Configuracion() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Configuración</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="gear">Configuración</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Claude Code es altamente configurable. Aprende a personalizar su comportamiento,
          modelo, memoria y preferencias globales o por proyecto.
        </p>
      </div>

      <div className="prose">
        <h2>Archivo de configuración principal</h2>
        <p>
          Claude Code guarda su configuración en <code>~/.claude/settings.json</code>
          (configuración global) y en <code>.claude/settings.json</code> dentro
          de cada proyecto (configuración local, tiene prioridad).
        </p>

        <pre><code>{`# Ver configuración actual dentro de Claude Code:
/config

# O editar directamente:
nano ~/.claude/settings.json`}</code></pre>

        <h3>Ejemplo de settings.json</h3>
        <pre><code>{`{
  "model": "sonnet",
  "theme": "dark",
  "autoUpdates": true,
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Read(**)",
      "Edit(**)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "WebFetch(domain:evil.com)"
    ]
  },
  "env": {
    "NODE_ENV": "development"
  }
}`}</code></pre>

        <div className="callout callout-info">
          La configuración del proyecto (<code>.claude/settings.json</code>) sobreescribe
          la global. Puedes añadir este archivo al repositorio para compartir configuración
          con tu equipo.
        </div>

        <h2>CLAUDE.md — Memoria del proyecto</h2>
        <p>
          El archivo <code>CLAUDE.md</code> en la raíz de tu proyecto es la
          "memoria" de Claude Code. Cuando inicias una sesión, Claude lee este
          archivo automáticamente para entender el contexto de tu proyecto.
        </p>

        <h3>Crear CLAUDE.md automáticamente</h3>
        <pre><code>{`# Dentro de Claude Code:
/init`}</code></pre>
        <p>
          Claude Code analizará tu proyecto y generará un CLAUDE.md con la
          estructura, stack tecnológico, comandos importantes y convenciones.
        </p>

        <h3>Estructura recomendada de CLAUDE.md</h3>
        <pre><code>{`# Proyecto: Mi App

## Stack
- Frontend: Next.js 16 + TypeScript + Tailwind CSS
- Backend: Node.js + Express + PostgreSQL
- Tests: Vitest + Playwright

## Comandos esenciales
\`\`\`bash
npm run dev          # Iniciar dev server (puerto 3000)
npm run test         # Ejecutar tests
npm run build        # Build de producción
npm run db:migrate   # Ejecutar migraciones
\`\`\`

## Estructura del proyecto
- /app — Páginas Next.js (App Router)
- /components — Componentes reutilizables
- /lib — Utilidades y configuración
- /prisma — Schema de base de datos

## Convenciones
- Usa kebab-case para nombres de archivos
- Los componentes llevan sufijo .tsx
- Los tests van junto al archivo que prueban (*.test.ts)

## Notas importantes
- La rama main está protegida, trabaja en feature branches
- La DB local está en localhost:5432, usuario: dev, sin contraseña
`}</code></pre>

        <h2>Variables de entorno</h2>
        <p>
          Claude Code lee variables de entorno de tu shell. Las más importantes:
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ANTHROPIC_API_KEY", "Tu API key de Anthropic (obligatoria)"],
                ["ANTHROPIC_MODEL", "Modelo por defecto para la sesión"],
                ["ANTHROPIC_BASE_URL", "URL base para proxies o endpoints personalizados"],
                ["CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC", "Desactiva telemetría (pon 1)"],
                ["NO_COLOR", "Desactiva el color en la salida (pon 1)"],
                ["CLAUDE_MAX_TOKENS", "Tokens máximos por respuesta"],
              ].map(([v, d]) => (
                <tr key={v as string}>
                  <td><code>{v as string}</code></td>
                  <td>{d as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Modelo por defecto</h2>
        <p>
          Puedes cambiar el modelo que Claude Code usa en cada sesión. El valor
          por defecto depende de tu cuenta y proveedor; para evitar IDs obsoletos,
          usa aliases como <code>sonnet</code>, <code>opus</code> o <code>haiku</code>.
        </p>
        <pre><code>{`# En settings.json:
{ "model": "opus" }

# O como variable de entorno:
export ANTHROPIC_MODEL="opus"

# O al iniciar Claude Code:
claude --model opus`}</code></pre>

        <h2>Integración con VS Code</h2>
        <p>
          Instala la extensión <strong>Claude Code</strong> desde el Marketplace de VS Code.
          Tras instalarla, Claude Code aparece en el panel lateral y funciona con el mismo
          contexto de tu proyecto abierto.
        </p>
        <ul>
          <li>Atajos de teclado: <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> → "Claude Code"</li>
          <li>Inline suggestions al escribir código</li>
          <li>Panel de chat integrado con contexto del archivo activo</li>
          <li>Diff view para revisar cambios propuestos</li>
        </ul>

        <h2>Integración con JetBrains</h2>
        <p>
          Disponible en el Marketplace de JetBrains para IntelliJ IDEA, PyCharm,
          WebStorm, etc. Mismas capacidades que la extensión de VS Code.
        </p>

        <h2>Configuración de proxy</h2>
        <p>Si trabajas detrás de un proxy corporativo:</p>
        <pre><code>{`export HTTPS_PROXY="https://proxy.empresa.com:8080"
export HTTP_PROXY="http://proxy.empresa.com:8080"
# Luego inicia Claude Code normalmente
claude`}</code></pre>

        <h2>Múltiples perfiles / proyectos</h2>
        <p>
          Para usar diferentes API keys o configuraciones en distintos proyectos,
          crea un <code>.claude/settings.json</code> en cada proyecto con sus
          propios valores. Claude Code los detecta automáticamente.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/comandos" className="text-sm text-zinc-500 hover:text-zinc-300">← Comandos</Link>
        <Link href="/cursos/claude-code/mcp" className="text-sm text-orange-400 hover:text-orange-300">Servidores MCP →</Link>
      </div>
    </div>
  );
}
