import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Flujos de trabajo pro",
  description:
    "Plan mode, checkpoints/rewind, tareas en background, output styles y los flujos de trabajo más recomendados con Claude Code en 2026.",
  alternates: { canonical: "/cursos/claude-code/flujos" },
};

export default function Flujos() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Flujos de trabajo pro</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="route">Flujos de trabajo pro</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Las funciones y rutinas que diferencian a quien usa Claude Code de vez en
          cuando de quien lo exprime de verdad: planificar antes de actuar, deshacer
          sin miedo y trabajar en paralelo.
        </p>
        <p className="mt-3 text-sm text-zinc-500">Revisado el 16 de agosto de 2026 · Claude Code v2.1.233</p>
      </div>

      <div className="prose">
        <SectionHeading icon="route">Plan Mode (modo planificación)</SectionHeading>
        <p>
          En Plan Mode, Claude <strong>explora e investiga tu código y propone un plan
          detallado, pero sin tocar ningún archivo</strong>. Tú lo revisas y, si te
          convence, le das luz verde para ejecutarlo. Es la mejor red de seguridad para
          tareas grandes.
        </p>
        <h3>Cómo activarlo</h3>
        <ul>
          <li>Pulsa <kbd>Shift</kbd>+<kbd>Tab</kbd> para alternar el modo (vuelve a pulsar para salir).</li>
          <li>O al iniciar: <code>claude --permission-mode plan</code></li>
        </ul>
        <div className="callout callout-tip">
          <strong>Patrón recomendado:</strong> usa un modelo potente (Opus) para
          <em> planificar</em> y uno rápido (Sonnet) para <em>ejecutar</em>. Primero
          planificas con calma, luego ejecutas con velocidad.
        </div>

        <SectionHeading icon="recycle">Checkpoints y Rewind (deshacer)</SectionHeading>
        <p>
          Cada vez que envías un mensaje, Claude Code crea un <strong>checkpoint</strong>
          (un punto de guardado). Si un cambio sale mal, puedes <strong>volver atrás</strong>
          tanto la conversación como el código a un estado anterior.
        </p>
        <h3>Cómo deshacer</h3>
        <ul>
          <li>Comando <code>/rewind</code> para elegir a qué punto volver.</li>
          <li>Pulsa <kbd>Esc</kbd> <kbd>Esc</kbd> (dos veces) como "botón de pánico".</li>
        </ul>
        <div className="callout callout-warning">
          El rewind es tu seguro para refactorizaciones arriesgadas: si Claude se
          desvía o rompe algo, vuelves al estado bueno en segundos. Aun así, trabajar
          con <Link href="/cursos/claude-code/glosario">git</Link> sigue siendo la mejor red de seguridad.
        </div>

        <SectionHeading icon="automation">Tareas en background</SectionHeading>
        <p>
          Puedes lanzar tareas o subagentes que corran <strong>en segundo plano</strong>
          mientras tú sigues trabajando en otra cosa en la sesión principal. Perfecto
          para procesos largos (tests pesados, builds, investigación extensa).
        </p>
        <h3>Cómo usarlo</h3>
        <ul>
          <li>Lanzar en background: <code>claude --bg "tu tarea"</code></li>
          <li>Pulsa <kbd>Ctrl</kbd>+<kbd>B</kbd> o pídele "ejecuta esto en background".</li>
          <li>Gestiona los procesos con <code>claude agents</code> (ver, adjuntar, logs, parar).</li>
        </ul>

        <SectionHeading icon="palette">Output styles (formato de salida)</SectionHeading>
        <p>
          Controla cómo responde Claude Code, útil sobre todo para scripts y automatizaciones:
        </p>

        <pre><code>{`# Salida en texto normal (por defecto)
claude -p "resume los cambios" --output-format text

# Salida en JSON (para procesar con scripts)
claude -p "lista los TODO" --output-format json

# Salida en streaming JSON (para integraciones en vivo)
claude -p "analiza el repo" --output-format stream-json`}</code></pre>
        <p>
          También puedes definir estilos personalizados (p. ej. un modo "explicativo"
          que enseñe más, ideal para aprender) mediante la configuración o el system prompt.
        </p>

        <SectionHeading icon="chat">Mensajes entre sesiones</SectionHeading>
        <p>
          Claude Code v2.1.232 permite escribir <code>@</code> en el prompt y mencionar
          otra sesión activa por su nombre. Claude utiliza <code>SendMessage</code> para
          entregarle el hallazgo sin que tengas que copiar toda la conversación.
        </p>
        <pre><code>{`@revision-api Comprueba si el contrato cambió y devuélveme archivos y líneas.

# Consulta las sesiones disponibles y sus nombres
claude agents`}</code></pre>
        <p>
          Úsalo para pasar una conclusión breve, no para compartir secretos ni para
          ocultar decisiones. En <code>/config</code> puedes controlar si los mensajes
          entrantes se aceptan, se retienen para aprobarlos o se rechazan. Los mensajes
          entre máquinas requieren las superficies y sistemas compatibles indicados por
          Anthropic.
        </p>

        <SectionHeading icon="star">Los flujos que más se recomiendan</SectionHeading>
        <p>
          Esto es lo que la comunidad de Claude Code está compartiendo y recomendando
          como mejores prácticas:
        </p>
        <ol>
          <li>
            <strong>Plan Mode primero, siempre.</strong> Antes de cualquier tarea seria:
            <kbd>Shift</kbd>+<kbd>Tab</kbd> → revisar el plan → ejecutar. Evita sorpresas.
          </li>
          <li>
            <strong>Subagentes en paralelo + background.</strong> Delega investigación,
            código, tests y revisión a la vez. Monitoriza con <code>claude agents</code>.
          </li>
          <li>
            <strong>Skills estandarizadas.</strong> Crea o instala{" "}
            <Link href="/cursos/claude-code/skills">skills</Link> para revisar, desplegar, testear. Usa{" "}
            <code>disable-model-invocation: true</code> en las que tengan efectos
            (como deploy) para que no se lancen solas.
          </li>
          <li>
            <strong>Rewind / Esc Esc como botón de pánico</strong> cuando algo se tuerce.
          </li>
          <li>
            <strong>Hooks + MCP</strong> para integrar tu entorno: formateo automático
            tras editar, conexión con Slack o tu gestor de tickets.
          </li>
          <li>
            <strong>Revisión intensiva antes de producción.</strong> Una pasada de
            revisión exigente (con un modelo potente) antes de subir cambios importantes.
          </li>
          <li>
            <strong><code>CLAUDE.md</code> ligero + skills específicas</strong>, y{" "}
            versiona la carpeta <code>.claude/</code> en tu repositorio para que el equipo
            comparta la misma configuración.
          </li>
        </ol>

        <div className="callout callout-orange">
          <strong>El gran cambio de mentalidad:</strong> el flujo que domina ahora mismo
          no es "escribir código línea a línea", sino <strong>asignar tareas y revisar
          los cambios</strong> que proponen Claude y sus subagentes. Tu valor está en
          dirigir bien y revisar con criterio.
        </div>

        <h2>Comprueba tu versión</h2>
        <p>
          Claude Code se actualiza muy a menudo (releases frecuentes). Si una función de
          aquí no te aparece, actualiza:
        </p>
        <pre><code>{`claude --version
claude update`}</code></pre>

        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://github.com/anthropics/claude-code/releases/tag/v2.1.232" target="_blank" rel="noreferrer">Claude Code v2.1.232 · sesiones, SendMessage y subagentes</a></li>
          <li><a href="https://github.com/anthropics/claude-code/releases/tag/v2.1.224" target="_blank" rel="noreferrer">Claude Code v2.1.224 · mensajería entre sesiones</a></li>
          <li><a href="https://docs.anthropic.com/en/docs/claude-code/cli-reference" target="_blank" rel="noreferrer">Anthropic · CLI reference</a></li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/plugins" className="text-sm text-zinc-500 hover:text-zinc-300">← Plugins</Link>
        <Link href="/cursos/claude-code/avanzado" className="text-sm text-violet-400 hover:text-fuchsia-300">Uso avanzado →</Link>
      </div>
    </div>
  );
}
