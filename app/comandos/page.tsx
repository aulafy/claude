import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comandos",
  description: "Referencia completa de todos los slash commands y flags de Claude Code.",
  alternates: { canonical: "/cursos/claude-code/comandos" },
};

const slashCommands = [
  { cmd: "/help", desc: "Muestra la lista de comandos disponibles y ayuda general." },
  { cmd: "/clear", desc: "Limpia la pantalla del terminal." },
  { cmd: "/reset", desc: "Reinicia la conversación actual (borra el contexto de la sesión)." },
  { cmd: "/exit", desc: "Sale de Claude Code." },
  { cmd: "/plan", desc: "Activa el modo planificación: Claude muestra el plan antes de actuar." },
  { cmd: "/permissions", desc: "Abre el diálogo de gestión de permisos interactivo." },
  { cmd: "/config", desc: "Abre la configuración de Claude Code." },
  { cmd: "/agents", desc: "Lista y gestiona los subagentes activos en la sesión." },
  { cmd: "/doctor", desc: "Diagnostica la instalación, autenticación y entorno." },
  { cmd: "/hooks", desc: "Gestiona los hooks de automatización de la sesión actual." },
  { cmd: "/memory", desc: "Muestra o edita el archivo de memoria (CLAUDE.md)." },
  { cmd: "/status", desc: "Muestra el estado actual de la sesión, modelo y costos." },
  { cmd: "/model", desc: "Abre el selector de modelo o cambia el modelo de la sesión." },
  { cmd: "/compact", desc: "Compacta el contexto de la conversación para ahorrar tokens." },
  { cmd: "/review", desc: "Solicita a Claude que revise el código actual o los cambios recientes." },
  { cmd: "/init", desc: "Inicializa CLAUDE.md en el proyecto actual con instrucciones base." },
  { cmd: "/rewind", desc: "Vuelve a un punto anterior (checkpoint): deshace conversación y/o código." },
  { cmd: "/plugin", desc: "Gestiona plugins: añadir marketplaces, instalar, activar y desactivar." },
  { cmd: "/mcp", desc: "Muestra y gestiona los servidores MCP conectados a la sesión." },
  { cmd: "/skills", desc: "Lista las skills disponibles (también las invocas por su nombre: /nombre)." },
];

const cliFlags = [
  { flag: "-p / --print", desc: "Modo no interactivo: responde una vez y sale. Ideal para scripts." },
  { flag: "--permission-mode bypassPermissions", desc: "Omite prompts de permisos. Solo para entornos aislados, desechables y sin secretos." },
  { flag: "--model <alias|id>", desc: "Especifica el modelo a usar. Ej: --model opus" },
  { flag: "--max-tokens <n>", desc: "Limita los tokens de salida por respuesta." },
  { flag: "--no-color", desc: "Desactiva el color en la salida del terminal." },
  { flag: "--version", desc: "Muestra la versión instalada de Claude Code." },
  { flag: "--help", desc: "Muestra la ayuda de la CLI." },
  { flag: "--verbose", desc: "Activa salida detallada para depuración." },
  { flag: "--output-format json", desc: "Devuelve la respuesta en JSON. Útil para scripts." },
];

export default function Comandos() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Comandos</span>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">⌨️ Comandos</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Referencia completa de slash commands y flags de CLI disponibles en Claude Code.
        </p>
      </div>

      <div className="prose">
        <h2>Slash commands</h2>
        <p>
          Los slash commands se escriben dentro de la sesión interactiva de Claude Code.
          Empiezan con <code>/</code> y se ejecutan al instante.
        </p>
      </div>

      <div className="overflow-x-auto mb-8">
        <table>
          <thead>
            <tr>
              <th style={{ width: "32%" }}>Comando</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {slashCommands.map((row) => (
              <tr key={row.cmd}>
                <td><code>{row.cmd}</code></td>
                <td>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>Flags de la CLI</h2>
        <p>
          Los flags se pasan al ejecutar <code>claude</code> desde el terminal,
          antes o después del prompt.
        </p>
        <pre><code>{`claude [flags] [prompt]
claude --model opus "refactoriza este archivo"
claude -p "¿qué hace esta función?" < mi_archivo.py`}</code></pre>
      </div>

      <div className="overflow-x-auto mb-8">
        <table>
          <thead>
            <tr>
              <th style={{ width: "36%" }}>Flag</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {cliFlags.map((row) => (
              <tr key={row.flag}>
                <td><code>{row.flag}</code></td>
                <td>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>Modelos disponibles</h2>
        <p>
          Puedes cambiar el modelo con <code>--model</code>, <code>/model</code>{" "}
          o en la configuración. No hay una tabla de IDs universal: el valor
          disponible depende de tu cuenta, proveedor y fecha. Compruébalo en el
          selector de tu sesión antes de automatizarlo.
        </p>
      </div>

      <div className="overflow-x-auto mb-8">
        <table>
          <thead>
            <tr>
              <th>Decisión</th>
              <th>Cómo comprobarla</th>
              <th>Qué comparar</th>
              <th>Regla práctica</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Modelo disponible</td>
              <td>Abre <code>/model</code> o la configuración de tu proveedor.</td>
              <td>Capacidad, coste, latencia y límites de uso.</td>
              <td>No asumas que el alias de otra cuenta existe en la tuya.</td>
            </tr>
            <tr>
              <td>Tarea exigente</td>
              <td>Prueba primero con un caso representativo y una revisión humana.</td>
              <td>Calidad frente a tiempo y consumo.</td>
              <td>Sube esfuerzo solo si una evaluación muestra que hace falta.</td>
            </tr>
            <tr>
              <td>Trabajo cotidiano</td>
              <td>Compara dos encargos reales con la misma rúbrica.</td>
              <td>Errores, tiempo, coste y necesidad de correcciones.</td>
              <td>El modelo más rápido no siempre reduce el trabajo total.</td>
            </tr>
            <tr>
              <td>Automatización repetitiva</td>
              <td>Fija un presupuesto, límite de reintentos y casos de abstención.</td>
              <td>Consistencia de formato y fallos recuperables.</td>
              <td>No des permisos externos solo porque el modelo sea barato.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>Atajos de teclado en sesión interactiva</h2>
      </div>

      <div className="overflow-x-auto mb-8">
        <table>
          <thead>
            <tr>
              <th>Atajo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["↑ / ↓", "Navegar por el historial de prompts"],
              ["Ctrl+C", "Interrumpir la respuesta actual o salir"],
              ["Ctrl+D", "Salir de Claude Code"],
              ["Ctrl+L", "Limpiar pantalla"],
              ["Tab", "Autocompletar slash commands"],
              ["Shift+Enter", "Nueva línea sin enviar el mensaje"],
              ["Esc", "Cancelar edición actual"],
            ].map(([key, action]) => (
              <tr key={key as string}>
                <td><kbd>{key as string}</kbd></td>
                <td>{action as string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>Comandos de ejemplo</h2>
        <h3>Sesión headless en CI/CD</h3>
        <pre><code>{`# Generar un resumen del PR en JSON
claude -p --output-format json "resume los cambios del último commit"

# Revisar seguridad de un archivo
claude -p "revisa posibles vulnerabilidades en src/api/auth.ts" < /dev/null`}</code></pre>

        <h3>Cambiar modelo para una sesión</h3>
        <pre><code>{`# Sustituye el marcador por un alias que aparezca en /model
claude --model <alias-disponible-en-tu-cuenta>
# Registra en el proyecto la fecha y el ID elegido si afecta a un resultado reproducible.`}</code></pre>

        <h3>Ver diagnóstico de instalación</h3>
        <pre><code>{`# Dentro de Claude Code:
/doctor

# Desde la terminal:
claude doctor`}</code></pre>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/primeros-pasos" className="text-sm text-zinc-500 hover:text-zinc-300">← Primeros pasos</Link>
        <Link href="/cursos/claude-code/configuracion" className="text-sm text-violet-400 hover:text-fuchsia-300">Configuración →</Link>
      </div>
    </div>
  );
}
