import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Instalación — Aprende Claude Code",
  description: "Cómo instalar Claude Code paso a paso en macOS, Linux y Windows (WSL).",
};

export default function Instalacion() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Instalación</span>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">📦 Instalación</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Instala Claude Code en tu sistema en menos de 5 minutos.
          Necesitas Node.js y una API key de Anthropic.
        </p>
      </div>

      <div className="prose">
        <h2>Requisitos previos</h2>
        <ul>
          <li><strong>Node.js 20+</strong> — Claude Code requiere Node.js versión 20 o superior.</li>
          <li><strong>npm o npx</strong> — incluido con Node.js.</li>
          <li><strong>Sistema operativo:</strong> macOS, Linux, o Windows con WSL2.</li>
          <li><strong>API key de Anthropic</strong> — necesitarás una cuenta en <code>console.anthropic.com</code>.</li>
        </ul>

        <div className="callout callout-info">
          <strong>¿No tienes Node.js?</strong> Descárgalo desde{" "}
          <strong>nodejs.org</strong> y selecciona la versión LTS. Verifica tu
          versión con <code>node --version</code>.
        </div>

        <h2>Paso 1: Instalar Claude Code</h2>
        <p>Abre tu terminal y ejecuta:</p>
        <pre><code>{`npm install -g @anthropic-ai/claude-code`}</code></pre>
        <p>
          Esto instala el comando <code>claude</code> globalmente en tu sistema.
          Verifica que se instaló correctamente:
        </p>
        <pre><code>{`claude --version`}</code></pre>

        <h2>Paso 2: Obtener tu API key</h2>
        <ol>
          <li>Entra a <strong>console.anthropic.com</strong> y crea una cuenta si no tienes.</li>
          <li>Ve a <strong>API Keys</strong> en el panel lateral.</li>
          <li>Haz clic en <strong>Create Key</strong> y copia la clave generada.</li>
          <li>Guárdala en un lugar seguro — solo se muestra una vez.</li>
        </ol>

        <div className="callout callout-warning">
          <strong>Atención:</strong> Las API keys tienen costos por uso. Anthropic ofrece
          créditos gratuitos al registrarse. Revisa los precios en{" "}
          <strong>anthropic.com/pricing</strong>.
        </div>

        <h2>Paso 3: Configurar la API key</h2>
        <p>Tienes dos opciones para configurar tu clave:</p>

        <h3>Opción A: Variable de entorno (recomendado)</h3>
        <p>Añade esto a tu <code>~/.zshrc</code>, <code>~/.bashrc</code> o equivalente:</p>
        <pre><code>{`export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx"`}</code></pre>
        <p>Luego recarga tu shell:</p>
        <pre><code>{`source ~/.zshrc   # o ~/.bashrc`}</code></pre>

        <h3>Opción B: Al iniciar Claude Code</h3>
        <p>
          Si no configuraste la variable, Claude Code te pedirá la clave la
          primera vez que lo ejecutes y la guardará automáticamente.
        </p>

        <h2>Paso 4: Primera ejecución</h2>
        <p>Navega a un directorio de trabajo y ejecuta:</p>
        <pre><code>{`cd mi-proyecto
claude`}</code></pre>
        <p>
          La primera vez te puede pedir autorizaciones o confirmar la clave. Después
          verás el prompt interactivo de Claude Code listo para usar.
        </p>

        <h2>Instalación en Windows</h2>
        <p>
          Claude Code funciona en Windows a través de <strong>WSL2</strong> (Windows
          Subsystem for Linux). Sigue estos pasos:
        </p>
        <ol>
          <li>Instala WSL2: <code>wsl --install</code> en PowerShell como administrador.</li>
          <li>Instala Node.js dentro de WSL (usa nvm).</li>
          <li>Instala Claude Code desde la terminal WSL como en Linux.</li>
        </ol>
        <div className="callout callout-info">
          Claude Code también tiene extensión para <strong>VS Code</strong> y{" "}
          <strong>JetBrains</strong> IDE — las instalas desde el marketplace de tu
          editor. Ver sección de configuración para más detalles.
        </div>

        <h2>Actualizar Claude Code</h2>
        <p>Para actualizar a la última versión:</p>
        <pre><code>{`npm update -g @anthropic-ai/claude-code`}</code></pre>
        <p>Claude Code también puede auto-actualizarse. Puedes comprobarlo con:</p>
        <pre><code>{`claude --version`}</code></pre>

        <h2>Desinstalar</h2>
        <pre><code>{`npm uninstall -g @anthropic-ai/claude-code`}</code></pre>
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Inicio
        </Link>
        <Link href="/primeros-pasos" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
          Primeros pasos →
        </Link>
      </div>
    </div>
  );
}
