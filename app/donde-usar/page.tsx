import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "CLI, app de escritorio, web y móvil",
  description:
    "Formas de usar Claude Code: terminal, app de escritorio, web, extensiones de IDE y móvil. Diferencias y cuándo usar cada una.",
  alternates: { canonical: "/cursos/claude-code/donde-usar" },
};

const surfaces = [
  {
    icon: "terminal" as IconName,
    surface: "Terminal (CLI)",
    description: "La versión completa, en tu terminal.",
    ideal: "Máximo control, scripts, automatización y modo headless.",
  },
  {
    icon: "desktop" as IconName,
    surface: "App de escritorio",
    description: "App independiente para Mac y Windows, con interfaz visual.",
    ideal:
      "Revisar diffs visualmente, varias sesiones a la vez, tareas programadas y lanzar sesiones en la nube.",
  },
  {
    icon: "globe" as IconName,
    surface: "Web (claude.ai/code)",
    description: "En el navegador, sin instalar nada.",
    ideal:
      "Tareas largas en la nube, trabajar en repos que no tienes en local y varias tareas en paralelo.",
  },
  {
    icon: "code" as IconName,
    surface: "VS Code / Cursor",
    description: "Extensión para tu editor.",
    ideal:
      "Diffs en línea, @-menciones, revisión de plan e historial dentro del editor.",
  },
  {
    icon: "plug" as IconName,
    surface: "JetBrains",
    description: "Plugin para IntelliJ, PyCharm, WebStorm, etc. (requiere la CLI).",
    ideal: "Lo mismo dentro de los IDE de JetBrains.",
  },
];

export default function DondeUsarPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">CLI, app y móvil</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="desktop">CLI, app de escritorio, web y móvil</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Claude Code no vive solo en la terminal. Puedes usarlo en varias
          superficies y todas comparten el MISMO motor: tus archivos CLAUDE.md,
          tus ajustes y tus servidores MCP funcionan igual en todas. Elige la
          que mejor encaje contigo (o combínalas).
        </p>
      </div>

      <div className="callout callout-info">
        <strong>Dato clave:</strong> como todas las superficies usan el mismo
        motor, puedes empezar una tarea en un sitio y continuarla en otro.
      </div>

      <div className="prose">
        <h2>Las superficies de Claude Code</h2>
      </div>

      <div className="overflow-x-auto mb-8">
        <table>
          <thead>
            <tr>
              <th>Superficie</th>
              <th>Qué es</th>
              <th>Ideal para</th>
            </tr>
          </thead>
          <tbody>
            {surfaces.map((item) => (
              <tr key={item.surface}>
                <td>
                  <strong className="inline-flex items-center gap-2">
                    <Icon name={item.icon} className="text-violet-400" />
                    {item.surface}
                  </strong>
                </td>
                <td>{item.description}</td>
                <td>{item.ideal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <SectionHeading icon="terminal">Terminal (CLI)</SectionHeading>
        <p>
          La forma original y más potente. Instalación recomendada (instalador
          nativo):
        </p>
        <pre><code>{`# macOS, Linux, WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows (PowerShell)
irm https://claude.ai/install.ps1 | iex

# Con Homebrew (Mac)
brew install --cask claude-code`}</code></pre>
        <p>
          También puedes instalarlo con npm (<code>npm install -g @anthropic-ai/claude-code</code>).
          Tras instalar, ve a tu proyecto y ejecuta <code>claude</code>. Más
          detalle en <Link href="/cursos/claude-code/instalacion">Instalación</Link>. Es la mejor
          opción para automatización, scripts y flujos headless (ver{" "}
          <Link href="/cursos/claude-code/equipos">Perfiles técnicos</Link>).
        </p>

        <SectionHeading icon="desktop">App de escritorio (Mac y Windows)</SectionHeading>
        <p>
          App independiente con interfaz gráfica. Permite revisar diffs
          visualmente, ejecutar varias sesiones en paralelo lado a lado,
          programar tareas recurrentes y lanzar sesiones en la nube. Ideal si
          prefieres una interfaz visual a la terminal. Requiere una suscripción
          de pago. Se descarga desde la web oficial; tras instalar, inicia
          sesión y pulsa la pestaña &quot;Code&quot;.
        </p>
      </div>

      <div className="callout callout-tip">
        <strong>Consejo:</strong> si la terminal te intimida, la app de
        escritorio es la forma más cómoda de empezar con la misma potencia.
      </div>

      <div className="prose">
        <SectionHeading icon="globe">Web (claude.ai/code)</SectionHeading>
        <p>
          Ejecuta Claude Code en el navegador, sin instalar nada en tu
          ordenador. Perfecta para lanzar tareas largas y volver cuando
          terminen, trabajar en repositorios que no tienes en local, o correr
          varias tareas a la vez en la nube. Disponible en navegadores de
          escritorio y en la app de Claude para iOS. Empieza en{" "}
          <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer">
            claude.ai/code
          </a>.
        </p>

        <SectionHeading icon="code">Extensiones de IDE (VS Code, JetBrains)</SectionHeading>
        <p>
          Si trabajas en VS Code (o Cursor) o en un IDE de JetBrains, hay
          extensión/plugin oficial que integra Claude Code en el editor con
          diffs en línea, @-menciones y revisión de plan. La de JetBrains
          requiere tener la CLI instalada. Ver{" "}
          <Link href="/cursos/claude-code/configuracion">Configuración</Link>.
        </p>

        <SectionHeading icon="mobile">Controlar Claude Code desde el móvil</SectionHeading>
        <p>
          Sí, puedes usar y supervisar Claude Code desde el teléfono. Estas son
          las formas:
        </p>
        <ul>
          <li>
            <strong>App de Claude para iOS + web:</strong> lanza una tarea
            larga desde claude.ai/code o la app de iOS y revísala o continúala
            desde el móvil.
          </li>
          <li>
            <strong>Remote Control:</strong> continúa una sesión que tienes en
            tu ordenador desde el móvil u otro dispositivo.
          </li>
          <li>
            <strong>Dispatch:</strong> encarga una tarea desde el móvil; se crea
            una sesión de escritorio que abres luego en tu ordenador.
          </li>
          <li>
            <strong>Teleport:</strong> empieza una tarea en la web o en iOS y
            tráela a tu terminal con el comando <code>claude --teleport</code>{" "}
            (requiere suscripción de claude.ai).
          </li>
          <li>
            <strong>Channels:</strong> envía tareas a una sesión desde Telegram,
            Discord, iMessage o tus propios webhooks.
          </li>
          <li>
            <strong>Slack:</strong> menciona a @Claude con un reporte de bug y
            te devuelve un pull request.
          </li>
        </ul>
      </div>

      <div className="callout callout-warning">
        <strong>Importante:</strong> el móvil brilla para LANZAR, SUPERVISAR y
        APROBAR tareas, no para escribir código intensivo. Lo ideal: encargar
        desde el móvil y revisar a fondo en el ordenador.
      </div>

      <div className="prose">
        <h2>¿Cuál elijo?</h2>
        <ul>
          <li>¿Te manejas en terminal y quieres todo el poder? → Terminal (CLI).</li>
          <li>¿Prefieres una interfaz visual sin terminal? → App de escritorio.</li>
          <li>¿No quieres instalar nada o trabajar desde varios sitios? → Web.</li>
          <li>¿Ya vives en tu editor? → Extensión de VS Code o JetBrains.</li>
          <li>
            ¿Quieres lanzar o supervisar sobre la marcha? → Móvil (iOS/web) +
            Remote Control.
          </li>
        </ul>
      </div>

      <div className="callout callout-orange">
        <strong>No tienes que elegir solo una.</strong> Como todas comparten el
        mismo motor (CLAUDE.md, ajustes, MCP), mucha gente usa la CLI o la app
        en el ordenador y el móvil para supervisar.
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/primeros-pasos" className="text-sm text-zinc-500 hover:text-zinc-300">← Primeros pasos</Link>
        <Link href="/cursos/claude-code/comandos" className="text-sm text-violet-400 hover:text-fuchsia-300">Comandos →</Link>
      </div>
    </div>
  );
}
