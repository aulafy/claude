import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Hooks",
  description: "Automatiza comportamientos de Claude Code con hooks: PreToolUse, PostToolUse, Stop y más.",
  alternates: { canonical: "/cursos/claude-code/hooks" },
};

export default function Hooks() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Hooks</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="hook">Hooks</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Los hooks son scripts de shell que se ejecutan automáticamente en
          respuesta a eventos de Claude Code. Te dan control total sobre el
          comportamiento de la herramienta.
        </p>
      </div>

      <div className="prose">
        <h2>¿Qué son los hooks?</h2>
        <p>
          Los hooks te permiten interceptar y reaccionar a eventos del ciclo de
          vida de Claude Code: antes de ejecutar una herramienta, después de
          hacerlo, cuando Claude termina una respuesta, etc.
        </p>
        <p>Casos de uso comunes:</p>
        <ul>
          <li>Formatear automáticamente el código tras cada edición.</li>
          <li>Registrar en un log todas las operaciones de Claude.</li>
          <li>Bloquear operaciones peligrosas con lógica personalizada.</li>
          <li>Enviar notificaciones cuando Claude termina una tarea larga.</li>
          <li>Ejecutar tests automáticamente después de cada cambio.</li>
        </ul>

        <h2>Tipos de hooks</h2>
      </div>

      <div className="overflow-x-auto mb-8">
        <table>
          <thead>
            <tr>
              <th>Evento</th>
              <th>Cuándo se dispara</th>
              <th>Puede bloquear</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["PreToolUse", "Antes de ejecutar cualquier herramienta", "Sí"],
              ["PostToolUse", "Después de ejecutar cualquier herramienta", "No"],
              ["Stop", "Cuando Claude termina una respuesta completa", "No"],
              ["SubagentStop", "Cuando un subagente termina su tarea", "No"],
              ["Notification", "Cuando Claude emite una notificación al usuario", "No"],
            ].map(([event, when, canBlock]) => (
              <tr key={event as string}>
                <td><code>{event as string}</code></td>
                <td>{when as string}</td>
                <td>
                  <span className={(canBlock === "Sí" ? "text-emerald-400" : "text-zinc-500")}>
                    {canBlock as string}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>Configurar hooks</h2>
        <p>
          Los hooks se configuran en <code>.claude/settings.json</code> (proyecto)
          o <code>~/.claude/settings.json</code> (global):
        </p>
        <pre><code>{`{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $CLAUDE_FILE_PATH"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude terminó\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}`}</code></pre>

        <h2>Variables de entorno disponibles en hooks</h2>
      </div>

      <div className="overflow-x-auto mb-8">
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["CLAUDE_TOOL_NAME", "Nombre de la herramienta que se ejecutó"],
              ["CLAUDE_TOOL_INPUT", "Input de la herramienta (JSON)"],
              ["CLAUDE_TOOL_OUTPUT", "Output de la herramienta (PostToolUse)"],
              ["CLAUDE_FILE_PATH", "Ruta del archivo afectado (Edit/Write/Read)"],
              ["CLAUDE_SESSION_ID", "ID único de la sesión actual"],
              ["CLAUDE_PROJECT_DIR", "Directorio raíz del proyecto"],
              ["CLAUDE_HOOK_TYPE", "Tipo de hook (PreToolUse, PostToolUse, Stop...)"],
            ].map(([v, d]) => (
              <tr key={v as string}>
                <td><code>{v as string}</code></td>
                <td>{d as string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>El matcher</h2>
        <p>
          El campo <code>matcher</code> es una expresión regular que se compara
          con el nombre de la herramienta. Si no se especifica, el hook se
          aplica a todas las herramientas.
        </p>
        <pre><code>{`# Solo edición de archivos TypeScript
"matcher": "Edit"

# Herramientas de bash y edición
"matcher": "Bash|Edit|Write"

# Cualquier herramienta de lectura
"matcher": "^Read"`}</code></pre>

        <h2>Hook de tipo command</h2>
        <p>
          El tipo más común. Ejecuta un comando de shell. El hook puede leer
          información del evento via variables de entorno o via stdin (JSON):
        </p>
        <pre><code>{`{
  "type": "command",
  "command": "bash /ruta/a/mi-hook.sh",
  "timeout": 30
}`}</code></pre>

        <h3>Ejemplo: hook que lee datos del evento por stdin</h3>
        <pre><code>{`#!/bin/bash
# mi-hook.sh — recibe el evento completo como JSON por stdin
EVENT=$(cat)
TOOL=$(echo $EVENT | jq -r '.tool_name')
FILE=$(echo $EVENT | jq -r '.tool_input.path // ""')

echo "Herramienta: $TOOL, Archivo: $FILE" >> ~/.claude/hook.log`}</code></pre>

        <h2>Bloquear operaciones con PreToolUse</h2>
        <p>
          Un hook <code>PreToolUse</code> puede devolver un código de salida
          distinto de 0 para bloquear la operación:
        </p>
        <pre><code>{`#!/bin/bash
# Bloquear rm -rf
TOOL=$(cat | jq -r '.tool_name')
CMD=$(cat | jq -r '.tool_input.command // ""')

if [[ "$CMD" == *"rm -rf"* ]]; then
  echo "BLOQUEADO: rm -rf no permitido"
  exit 1  # exit 1 = bloquear la operación
fi

exit 0  # exit 0 = permitir`}</code></pre>
        <p>Configúralo así en settings.json:</p>
        <pre><code>{`{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "bash ~/.claude/hooks/bloquear-rm.sh"
      }]
    }]
  }
}`}</code></pre>

        <h2>Ejemplos prácticos</h2>

        <h3>Formatear con Prettier tras edición</h3>
        <pre><code>{`{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
      }]
    }]
  }
}`}</code></pre>

        <h3>Ejecutar tests tras cambios</h3>
        <pre><code>{`{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "npm test --watchAll=false 2>&1 | tail -20"
      }]
    }]
  }
}`}</code></pre>

        <h3>Log de todas las operaciones</h3>
        <pre><code>{`{
  "hooks": {
    "PostToolUse": [{
      "hooks": [{
        "type": "command",
        "command": "echo \"$(date) - $CLAUDE_TOOL_NAME: $CLAUDE_FILE_PATH\" >> ~/.claude/audit.log"
      }]
    }]
  }
}`}</code></pre>

        <div className="callout callout-tip">
          <strong>Consejo:</strong> Usa <code>2&gt;/dev/null || true</code> al final de tus
          comandos de hook para evitar que errores menores interrumpan el flujo de Claude.
        </div>

        <h2>Gestionar hooks desde la CLI</h2>
        <pre><code>{`# Ver hooks configurados (dentro de Claude Code)
/hooks

# O abre settings.json directamente:
claude config`}</code></pre>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/mcp" className="text-sm text-zinc-500 hover:text-zinc-300">← Servidores MCP</Link>
        <Link href="/cursos/claude-code/permisos" className="text-sm text-violet-400 hover:text-fuchsia-300">Permisos →</Link>
      </div>
    </div>
  );
}
