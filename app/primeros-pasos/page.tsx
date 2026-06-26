import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Primeros pasos — Aprende Claude Code",
  description: "Tu primera sesión con Claude Code: cómo iniciar, interactuar y entender la interfaz.",
};

export default function PrimerospasoS() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Primeros pasos</span>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">🚀 Primeros pasos</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Aprende a iniciar Claude Code, entender su interfaz y completar tus
          primeras tareas de programación con IA.
        </p>
      </div>

      <div className="prose">
        <h2>Iniciar una sesión</h2>
        <p>
          Abre tu terminal, navega al directorio de tu proyecto y ejecuta:
        </p>
        <pre><code>{`claude`}</code></pre>
        <p>
          Verás un prompt interactivo como este:
        </p>
        <pre><code>{`╔══════════════════════════════════╗
║  Claude Code  ·  claude-sonnet  ║
╚══════════════════════════════════╝
> _`}</code></pre>
        <p>
          Claude Code está listo para recibir instrucciones en lenguaje natural.
          Puedes escribirle como si fuera un compañero de trabajo.
        </p>

        <h2>Tu primera tarea</h2>
        <p>Prueba algo sencillo para empezar. Escribe:</p>
        <pre><code>{`> ¿Qué archivos hay en este directorio?`}</code></pre>
        <p>
          Claude Code ejecutará <code>ls</code> o <code>find</code> y te
          mostrará el resultado. Observarás que antes de ejecutar cualquier
          herramienta te pide confirmación o te muestra lo que va a hacer.
        </p>

        <h2>Entender el flujo de trabajo</h2>
        <p>Claude Code opera en ciclos de:</p>
        <ol>
          <li><strong>Pensar</strong> — analiza tu petición y planifica los pasos.</li>
          <li><strong>Actuar</strong> — usa herramientas (leer archivos, ejecutar comandos, editar código).</li>
          <li><strong>Mostrar</strong> — te presenta los resultados y cambios realizados.</li>
          <li><strong>Esperar</strong> — vuelve a esperar tu siguiente instrucción.</li>
        </ol>

        <div className="callout callout-tip">
          <strong>Consejo:</strong> Sé específico en tus instrucciones. En lugar de
          "arregla el código", di "el test en <code>auth.test.ts</code> falla con
          un error 401, revísalo y corrígelo".
        </div>

        <h2>Modos de operación</h2>

        <h3>Modo normal (por defecto)</h3>
        <p>
          Claude Code te pide confirmación antes de editar archivos o ejecutar
          comandos importantes. Ideal para empezar y mantener control.
        </p>

        <h3>Modo auto</h3>
        <p>
          Claude completa tareas de forma autónoma sin pedir confirmación en
          cada paso. Útil cuando confías en la tarea y quieres velocidad:
        </p>
        <pre><code>{`claude --dangerously-skip-permissions`}</code></pre>
        <div className="callout callout-warning">
          Usa el modo auto con precaución. Claude puede modificar archivos,
          instalar paquetes o ejecutar comandos sin pausa. Úsalo en entornos
          controlados o con proyectos que tengan git para revertir cambios.
        </div>

        <h3>Modo plan</h3>
        <p>
          Escribe <code>/plan</code> antes de tu petición para que Claude te
          muestre el plan antes de ejecutar nada. Ideal para tareas complejas:
        </p>
        <pre><code>{`> /plan refactoriza el módulo de autenticación para usar JWT`}</code></pre>

        <h2>Ejemplos de primeras tareas</h2>

        <h3>Entender un proyecto existente</h3>
        <pre><code>{`> Explícame la estructura de este proyecto y qué hace cada carpeta`}</code></pre>
        <pre><code>{`> ¿Qué hace la función processPayment en src/payments.ts?`}</code></pre>

        <h3>Crear un archivo nuevo</h3>
        <pre><code>{`> Crea un componente React llamado Button con variantes primary y secondary en TypeScript`}</code></pre>

        <h3>Arreglar un error</h3>
        <pre><code>{`> Tengo este error en la consola: [pegar el error] — ayúdame a resolverlo`}</code></pre>

        <h3>Ejecutar tests</h3>
        <pre><code>{`> Ejecuta los tests y si hay fallos, corrígelos`}</code></pre>

        <h2>Salir de Claude Code</h2>
        <p>
          Puedes salir con <kbd>Ctrl</kbd>+<kbd>C</kbd>, <kbd>Ctrl</kbd>+<kbd>D</kbd>
          , o escribiendo:
        </p>
        <pre><code>{`> /exit`}</code></pre>

        <h2>Iniciar con un prompt directo</h2>
        <p>
          Si sabes exactamente qué quieres, puedes pasarlo directamente al
          comando sin entrar al modo interactivo:
        </p>
        <pre><code>{`claude "explica el archivo package.json"
claude "añade tipos TypeScript al archivo utils.js"`}</code></pre>

        <h2>Modo "print" (salida directa)</h2>
        <p>Para usar Claude Code en scripts o pipelines:</p>
        <pre><code>{`claude -p "resume los cambios en este diff" < cambios.diff`}</code></pre>
        <p>La bandera <code>-p</code> hace que Claude responda una vez y salga, ideal para automatizaciones.</p>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/instalacion" className="text-sm text-zinc-500 hover:text-zinc-300">← Instalación</Link>
        <Link href="/comandos" className="text-sm text-orange-400 hover:text-orange-300">Comandos →</Link>
      </div>
    </div>
  );
}
