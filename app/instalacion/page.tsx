import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Instalación",
  description: "Cómo instalar Claude Code paso a paso en macOS, Linux y Windows (WSL).",
  alternates: { canonical: "/cursos/claude-code/instalacion" },
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
        <PageTitle icon="install">Instalación</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Instala Claude Code en tu sistema en un par de minutos. Solo necesitas
          una cuenta de Anthropic (suscripción de Claude o cuenta de la consola).
        </p>
      </div>

      <div className="prose">
        <h2>Requisitos previos</h2>
        <ul>
          <li><strong>Sistema operativo:</strong> macOS, Linux, o Windows (con WSL o nativo).</li>
          <li><strong>Cuenta de Anthropic</strong> — una suscripción de Claude o una cuenta de la consola (<code>console.anthropic.com</code>).</li>
          <li><strong>Node.js 20+</strong> — <em>solo</em> si instalas por npm. Con el instalador nativo (recomendado) no hace falta.</li>
        </ul>

        <div className="callout callout-info">
          El método recomendado por Anthropic es el <strong>instalador nativo</strong>,
          que no depende de Node.js y se actualiza solo. Si prefieres npm, necesitarás
          Node.js 20+ (descárgalo desde <strong>nodejs.org</strong>, versión LTS).
        </div>

        <h2>Paso 1: Instalar Claude Code</h2>
        <p>
          Abre tu terminal y usa el <strong>instalador nativo</strong> (recomendado;
          no necesita Node.js y se actualiza solo):
        </p>
        <pre><code>{`# macOS, Linux o WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows (PowerShell)
irm https://claude.ai/install.ps1 | iex`}</code></pre>
        <p>En Mac también puedes usar Homebrew:</p>
        <pre><code>{`brew install --cask claude-code`}</code></pre>

        <h3>Alternativa: con npm</h3>
        <p>Si prefieres npm (requiere Node.js 20+):</p>
        <pre><code>{`npm install -g @anthropic-ai/claude-code`}</code></pre>

        <p>
          Cualquiera de los métodos instala el comando <code>claude</code>.
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
          En Windows tienes dos caminos:
        </p>
        <ol>
          <li>
            <strong>Nativo (más sencillo):</strong> abre PowerShell y ejecuta{" "}
            <code>irm https://claude.ai/install.ps1 | iex</code>. Se recomienda tener{" "}
            <strong>Git para Windows</strong> instalado para que Claude pueda usar Bash.
          </li>
          <li>
            <strong>Con WSL2:</strong> instala WSL con <code>wsl --install</code> y luego
            instala Claude Code dentro de WSL igual que en Linux.
          </li>
        </ol>
        <div className="callout callout-info">
          Claude Code también tiene extensión para <strong>VS Code</strong> y{" "}
          <strong>JetBrains</strong> IDE — las instalas desde el marketplace de tu
          editor. Ver sección de configuración para más detalles.
        </div>

        <h2>Actualizar Claude Code</h2>
        <p>
          Con el <strong>instalador nativo</strong> se actualiza solo en segundo plano:
          no tienes que hacer nada. Comprueba tu versión con:
        </p>
        <pre><code>{`claude --version`}</code></pre>
        <p>
          Con Homebrew: <code>brew upgrade claude-code</code>. Si instalaste por npm:
        </p>
        <pre><code>{`npm update -g @anthropic-ai/claude-code`}</code></pre>

        <h2>Desinstalar</h2>
        <p>Según cómo lo instalaste:</p>
        <pre><code>{`# Homebrew
brew uninstall --cask claude-code

# npm
npm uninstall -g @anthropic-ai/claude-code`}</code></pre>
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Inicio
        </Link>
        <Link href="/cursos/claude-code/primeros-pasos" className="text-sm text-violet-400 hover:text-fuchsia-300 transition-colors">
          Primeros pasos →
        </Link>
      </div>
    </div>
  );
}
