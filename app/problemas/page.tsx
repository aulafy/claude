import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import Prompt from "@/components/Prompt";

export const metadata: Metadata = {
  title: "Solución de problemas — Aprende Claude Code",
  description:
    "Cómo resolver los errores y problemas más comunes al instalar y usar Claude Code: API key, Node.js, permisos, comandos no encontrados y más.",
};

export default function Problemas() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Solución de problemas</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="tools">Solución de problemas</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Los tropiezos más habituales al empezar y cómo resolverlos. Si algo no te
          funciona, probablemente esté aquí.
        </p>
      </div>

      <div className="prose">
        <div className="callout callout-tip">
          <strong>Lo primero que debes probar:</strong> el comando de diagnóstico. Dentro
          de Claude Code escribe <code>/doctor</code> (o <code>claude doctor</code> desde
          la terminal). Comprueba instalación, autenticación y entorno, y te dice qué falla.
        </div>

        <h2>Al instalar</h2>

        <h3>"command not found: claude"</h3>
        <p>
          Instalaste Claude Code pero la terminal no lo encuentra. Causas habituales:
        </p>
        <ul>
          <li>La instalación de npm no terminó bien. Reinstala: <code>npm install -g @anthropic-ai/claude-code</code></li>
          <li>La carpeta global de npm no está en tu <code>PATH</code>. Cierra y abre la terminal de nuevo.</li>
          <li>Aún sin solución: comprueba dónde instala npm con <code>npm config get prefix</code> y asegúrate de que esa ruta <code>/bin</code> esté en tu PATH.</li>
        </ul>

        <h3>"EACCES: permission denied" al instalar</h3>
        <p>
          npm no tiene permisos para instalar globalmente. <strong>No uses <code>sudo</code></strong>
          (causa más problemas). En su lugar, lo ideal es instalar Node.js con un gestor
          de versiones como <code>nvm</code>, que evita estos problemas de permisos.
        </p>
        <Prompt>{`Al instalar Claude Code con npm me sale "EACCES: permission denied". Estoy en macOS. Ayúdame a arreglarlo de la forma correcta, sin usar sudo. Si recomiendas instalar nvm, guíame paso a paso.`}</Prompt>

        <h3>"Node.js version too old" / versión incompatible</h3>
        <p>
          Claude Code necesita <strong>Node.js 20 o superior</strong>. Comprueba tu
          versión con <code>node --version</code>. Si es menor, actualiza Node.js
          (con nvm: <code>nvm install 20 &amp;&amp; nvm use 20</code>).
        </p>

        <h2>Al iniciar sesión / autenticación</h2>

        <h3>"Invalid API key" o errores de autenticación</h3>
        <ul>
          <li>Comprueba que copiaste la clave entera, sin espacios al principio o final.</li>
          <li>Verifica que la variable está bien puesta: <code>echo $ANTHROPIC_API_KEY</code> debe mostrarla.</li>
          <li>Si la pusiste en <code>~/.zshrc</code>, recarga con <code>source ~/.zshrc</code> o abre una terminal nueva.</li>
          <li>La clave puede estar revocada o agotada. Genera una nueva en <code>console.anthropic.com</code>.</li>
        </ul>

        <h3>"Rate limit exceeded" / "Too many requests"</h3>
        <p>
          Has hecho demasiadas peticiones en poco tiempo, o alcanzaste el límite de tu
          plan. Espera unos minutos. Si es recurrente, revisa los límites de tu plan o,
          en API, tu nivel de uso (tier) en el panel de Anthropic.
        </p>

        <h3>"Insufficient credit" / saldo agotado</h3>
        <p>
          Si usas API, se acabaron tus créditos. Añade saldo o un método de pago en{" "}
          <code>console.anthropic.com</code>. Si usas suscripción, puede que hayas
          alcanzado el límite de uso de tu plan; espera a que se renueve o sube de plan.
        </p>

        <h2>Durante el uso</h2>

        <h3>Claude Code va lento o se "atasca"</h3>
        <ul>
          <li>
            <strong>Sesión muy larga:</strong> el contexto se ha llenado. Usa{" "}
            <code>/compact</code> para resumirlo, o <code>/clear</code> para empezar
            limpio (perderás el contexto de la conversación, no tus archivos).
          </li>
          <li>
            <strong>Tarea muy grande:</strong> divídela en partes más pequeñas. Mira{" "}
            <Link href="/cursos/claude-code/prompts">cómo escribir buenos prompts</Link>.
          </li>
          <li><strong>Conexión:</strong> Claude Code necesita internet estable.</li>
        </ul>

        <h3>Hace cambios que yo no quería</h3>
        <ul>
          <li>Usa <code>/rewind</code> (o <kbd>Esc</kbd> <kbd>Esc</kbd>) para deshacer al estado anterior. Ver <Link href="/cursos/claude-code/flujos">Flujos de trabajo</Link>.</li>
          <li>Si usas git: <code>git restore .</code> revierte los cambios no guardados.</li>
          <li>Para el futuro: usa <strong>Plan Mode</strong> (<kbd>Shift</kbd>+<kbd>Tab</kbd>) y revisa el plan antes de que actúe.</li>
        </ul>

        <h3>No me pide permiso / me pide demasiado permiso</h3>
        <p>
          Ajusta la lista de permisos. Si te pregunta por cosas que siempre permites
          (como <code>npm run</code>), añádelas a la lista <code>allow</code>. Si quieres
          más control, revisa tu configuración. Todo en <Link href="/cursos/claude-code/permisos">Permisos</Link>.
        </p>

        <h3>Una función de la documentación no me aparece</h3>
        <p>
          Probablemente tienes una versión antigua. Claude Code se actualiza muy a menudo:
        </p>
        <pre><code>{`claude --version
npm update -g @anthropic-ai/claude-code`}</code></pre>

        <h3>Un servidor MCP no conecta</h3>
        <ul>
          <li>Revisa la lista con <code>/mcp</code> dentro de Claude Code.</li>
          <li>Comprueba que el comando del servidor es correcto y que tiene las variables de entorno necesarias (tokens, rutas).</li>
          <li>Mira los detalles en <Link href="/cursos/claude-code/mcp">Servidores MCP</Link>.</li>
        </ul>

        <h2>El comodín que siempre funciona</h2>
        <p>
          Si te bloqueas con cualquier error, <strong>pregúntale a Claude Code directamente</strong>.
          Es literalmente experto en resolver problemas técnicos. Pégale el error completo:
        </p>
        <Prompt>{`Estoy teniendo este problema con Claude Code (o con mi proyecto):

[describe qué intentabas hacer y pega el error completo]

Explícame qué significa y cómo solucionarlo paso a paso. Soy principiante.`}</Prompt>

        <div className="callout callout-info">
          <strong>¿Sigue sin funcionar?</strong> Ejecuta <code>/doctor</code> y, si el
          problema persiste, busca en el repositorio oficial de Claude Code en GitHub
          (sección Issues) por si es un fallo conocido con solución.
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/faq" className="text-sm text-zinc-500 hover:text-zinc-300">← Preguntas frecuentes</Link>
        <Link href="/" className="text-sm text-orange-400 hover:text-orange-300">Volver al inicio →</Link>
      </div>
    </div>
  );
}
