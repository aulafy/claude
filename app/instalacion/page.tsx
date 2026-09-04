import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Instalar Claude Code en 2026",
  description: "Instala Claude Code en macOS, Linux, WSL y Windows, inicia sesión y comprueba que funciona.",
  alternates: { canonical: "/cursos/claude-code/instalacion" },
};

export default function Instalacion() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link><span className="mx-2">/</span><span className="text-zinc-400">Instalación</span>
      </div>
      <div className="mb-10">
        <PageTitle icon="install">Instalar Claude Code en 2026</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">Instálalo, inicia sesión en el navegador y deja una prueba de que todo funciona. No necesitas crear una API key para el uso normal.</p>
      </div>
      <div className="prose">
        <div className="callout callout-info"><strong>Revisado el 4 de septiembre de 2026.</strong> El instalador nativo es el método recomendado por Anthropic y se actualiza automáticamente.</div>
        <h2>Antes de empezar</h2>
        <ul>
          <li>Una terminal o símbolo del sistema.</li>
          <li>Una carpeta de proyecto en la que puedas practicar.</li>
          <li>Una suscripción Claude Pro, Max, Team o Enterprise, una cuenta de Claude Console con saldo, o acceso mediante un proveedor cloud compatible.</li>
        </ul>
        <p>El plan gratuito de Claude no incluye Claude Code. Console funciona con consumo de API y saldo prepago; una suscripción funciona con los límites de su plan. Son dos formas de acceso diferentes.</p>

        <h2>1. Instala Claude Code</h2>
        <h3>macOS, Linux o WSL: instalador nativo recomendado</h3>
        <pre><code>{`curl -fsSL https://claude.ai/install.sh | bash`}</code></pre>
        <h3>Windows PowerShell: instalador nativo recomendado</h3>
        <pre><code>{`irm https://claude.ai/install.ps1 | iex`}</code></pre>
        <p>Si usas el Símbolo del sistema (CMD), no PowerShell:</p>
        <pre><code>{`curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`}</code></pre>
        <h3>Gestores de paquetes</h3>
        <pre><code>{`# macOS con Homebrew (canal estable)
brew install --cask claude-code

# Windows con WinGet
winget install Anthropic.ClaudeCode`}</code></pre>
        <h3>Alternativa: npm</h3>
        <p>npm sigue siendo una vía válida. Úsala si ya trabajas con Node.js y prefieres gestionar Claude Code con su ecosistema. Para este curso recomendamos <strong>Node.js 22 LTS o superior</strong>.</p>
        <pre><code>{`npm install -g @anthropic-ai/claude-code`}</code></pre>
        <div className="callout callout-warning">No uses <code>sudo npm install -g</code>. Si aparece un error de permisos, usa el instalador nativo o instala Node.js con un gestor como nvm.</div>

        <h2>2. Comprueba la instalación</h2>
        <pre><code>{`claude --version
claude doctor`}</code></pre>
        <p>El primer comando debe mostrar una versión. <code>claude doctor</code> revisa la instalación y ayuda a detectar problemas del entorno.</p>

        <h2>3. Inicia sesión</h2>
        <p>Entra en una carpeta de proyecto y abre Claude Code:</p>
        <pre><code>{`cd ruta/a/tu-proyecto
claude`}</code></pre>
        <p>En el primer uso, Claude Code abre el navegador para autenticarte. Elige tu suscripción de Claude o tu cuenta de Console y sigue los pasos. Para cambiar de cuenta más adelante, escribe <code>/login</code> dentro de Claude Code.</p>
        <div className="callout callout-info">Una <code>ANTHROPIC_API_KEY</code> es opcional y está pensada para quien quiere facturación por API o una integración automatizada. Si ya tienes una definida, Claude Code te pedirá aprobarla en lugar de abrir el inicio de sesión normal.</div>

        <h2>Windows: Git para Windows o WSL</h2>
        <p>En Windows nativo, Git para Windows está <strong>recomendado</strong> para que Claude Code pueda usar Bash, pero no es obligatorio: sin él puede utilizar PowerShell. Otra opción es trabajar dentro de WSL; en ese caso no necesitas Git para Windows.</p>

        <h2>4. Haz una prueba segura</h2>
        <pre><code>{`¿Qué contiene esta carpeta? No modifiques nada.
Después dime qué archivo parece ser el punto de entrada.`}</code></pre>
        <p>Revisa que la respuesta describa tu carpeta y que no haya cambiado archivos. Ya tienes una primera sesión funcional.</p>

        <h2>Actualizar Claude Code</h2>
        <ul>
          <li><strong>Instalador nativo:</strong> se actualiza automáticamente en segundo plano.</li>
          <li><strong>Homebrew:</strong> <code>brew upgrade claude-code</code>.</li>
          <li><strong>WinGet:</strong> <code>winget upgrade Anthropic.ClaudeCode</code>.</li>
          <li><strong>npm:</strong> <code>npm install -g @anthropic-ai/claude-code@latest</code>.</li>
        </ul>
        <h2>Guarda la evidencia</h2>
        <pre><code>{`Sistema operativo: ____________________
Método de instalación: ________________
Versión de Claude Code: _______________
Inicio de sesión completado: sí / no
claude doctor sin errores: sí / no
Fecha de comprobación: ________________`}</code></pre>
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://code.claude.com/docs/en/quickstart" target="_blank" rel="noreferrer">Anthropic · Quickstart de Claude Code</a></li>
          <li><a href="https://code.claude.com/docs/en/setup" target="_blank" rel="noreferrer">Anthropic · Instalación y configuración</a></li>
        </ul>
      </div>
      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code" className="text-sm text-zinc-500 hover:text-zinc-300">← Curso</Link>
        <Link href="/cursos/claude-code/primeros-pasos" className="text-sm text-violet-400 hover:text-fuchsia-300">Primeros pasos →</Link>
      </div>
    </div>
  );
}
