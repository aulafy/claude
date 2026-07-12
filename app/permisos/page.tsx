import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Permisos",
  description: "Controla qué puede hacer Claude Code en tu máquina con el sistema de permisos.",
  alternates: { canonical: "/cursos/claude-code/permisos" },
};

export default function Permisos() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Permisos</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="lock">Permisos</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          El sistema de permisos de Claude Code garantiza que nada ocurra sin
          tu conocimiento. Aprende a configurar qué puede y qué no puede hacer Claude.
        </p>
      </div>

      <div className="prose">
        <h2>Filosofía de permisos</h2>
        <p>
          Claude Code sigue el principio de <strong>mínimo privilegio</strong>: por
          defecto pide confirmación para cualquier acción potencialmente irreversible
          o que afecte a recursos fuera de tu proyecto. Tú decides cuándo darle más
          autonomía.
        </p>

        <h2>Herramientas y sus permisos</h2>
        <p>
          Claude Code tiene acceso a estas herramientas, cada una con su nivel de
          riesgo por defecto:
        </p>
      </div>

      <div className="overflow-x-auto mb-8">
        <table>
          <thead>
            <tr>
              <th>Herramienta</th>
              <th>Qué hace</th>
              <th>Confirmación por defecto</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Read", "Leer archivos de tu proyecto", "No"],
              ["Edit", "Editar archivos existentes", "Sí (muestra diff)"],
              ["Write", "Crear nuevos archivos", "Sí"],
              ["Bash", "Ejecutar comandos de terminal", "Sí"],
              ["WebFetch", "Hacer peticiones HTTP", "Sí"],
              ["WebSearch", "Buscar en internet", "No"],
              ["TodoRead/Write", "Gestionar lista de tareas interna", "No"],
            ].map(([tool, desc, confirm]) => (
              <tr key={tool as string}>
                <td><code>{tool as string}</code></td>
                <td>{desc as string}</td>
                <td>
                  <span className={confirm === "No" ? "text-emerald-400" : "text-amber-400"}>
                    {confirm as string}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>Permitir y denegar operaciones</h2>
        <p>
          Configura permisos en <code>.claude/settings.json</code> para no
          tener que confirmar operaciones frecuentes:
        </p>
        <pre><code>{`{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",
      "Bash(git:*)",
      "Bash(npx:*)",
      "Read(**)",
      "Edit(**)",
      "Write(**)",
      "WebFetch(domain:api.github.com)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "WebFetch(domain:*.evil.com)"
    ]
  }
}`}</code></pre>

        <h3>Sintaxis de permisos</h3>
        <p>
          Los permisos usan el formato <code>Herramienta(patrón:valor)</code>:
        </p>
        <ul>
          <li><code>Bash(npm:*)</code> — permite cualquier comando npm</li>
          <li><code>Bash(git commit:*)</code> — permite git commit con cualquier argumento</li>
          <li><code>Read(**)</code> — permite leer cualquier archivo (<code>**</code> = cualquier ruta)</li>
          <li><code>WebFetch(domain:api.example.com)</code> — permite fetch solo a ese dominio</li>
          <li><code>Edit(src/**)</code> — permite editar solo archivos bajo <code>src/</code></li>
        </ul>

        <h2>Gestión interactiva de permisos</h2>
        <p>Dentro de Claude Code, usa el comando:</p>
        <pre><code>{`/permissions`}</code></pre>
        <p>
          Esto abre un panel interactivo donde puedes ver, añadir o revocar
          permisos de la sesión actual.
        </p>

        <h2>Permisos durante una sesión</h2>
        <p>
          Cuando Claude Code solicita hacer algo que no tienes pre-autorizado,
          te mostrará un diálogo como este:
        </p>
        <pre><code>{`Claude quiere ejecutar:
  git push origin main

¿Permitir? [s/N/siempre/nunca] _`}</code></pre>
        <ul>
          <li><kbd>s</kbd> — permitir solo esta vez.</li>
          <li><kbd>N</kbd> — denegar (Claude buscará otra alternativa).</li>
          <li><kbd>siempre</kbd> — añadir a la lista de permisos permanentes.</li>
          <li><kbd>nunca</kbd> — añadir a la lista de denegados permanentes.</li>
        </ul>

        <h2>Modo sin permisos (peligroso)</h2>
        <p>
          Claude Code llama a esto <code>bypassPermissions</code>. No es un modo automático normal: desactiva los
          prompts de permisos y debe tratarse como una excepción para entornos desechables, aislados y sin secretos.
        </p>
        <pre><code>{`claude --permission-mode bypassPermissions "implementa los tests unitarios"`}</code></pre>
        <div className="callout callout-warning">
          <strong>Solo para entornos aislados.</strong> Con este modo, Claude puede ejecutar comandos sin confirmación.
          No lo uses en tu máquina principal, en repositorios con secretos, ni en proyectos con acceso a servicios reales.
        </div>

        <h2>Buenas prácticas de seguridad</h2>
        <ul>
          <li>
            <strong>Usa git:</strong> trabajar en un repositorio git te permite
            revertir cualquier cambio que Claude haya hecho con <code>git restore</code>.
          </li>
          <li>
            <strong>Limita el scope en producción:</strong> en servidores de producción,
            no le des permisos de escritura a Claude.
          </li>
          <li>
            <strong>Revisa los diffs:</strong> Claude siempre muestra un diff antes de
            editar. Léelo antes de aceptar.
          </li>
          <li>
            <strong>Permisos por dominio:</strong> si usas WebFetch, especifica los
            dominios exactos en lugar de <code>WebFetch(*)</code>.
          </li>
          <li>
            <strong>Variables de entorno:</strong> Claude no puede leer tus secretos
            a menos que estén en el entorno o se los pases explícitamente.
          </li>
        </ul>

        <h2>Configuración de permisos para equipo</h2>
        <p>
          Añade <code>.claude/settings.json</code> a tu repositorio para que
          todo el equipo use la misma configuración de permisos base:
        </p>
        <pre><code>{`# .gitignore — NO ignorar settings.json del equipo
# (sí ignorar settings.local.json para configs personales)
.claude/settings.local.json`}</code></pre>

        <div className="callout callout-info">
          Existe un archivo <code>settings.local.json</code> para configuraciones
          personales que no deben compartirse (como tu API key o rutas locales).
          Claude Code lo lee y tiene prioridad sobre <code>settings.json</code>.
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/hooks" className="text-sm text-zinc-500 hover:text-zinc-300">← Hooks</Link>
        <Link href="/cursos/claude-code/avanzado" className="text-sm text-violet-400 hover:text-fuchsia-300">Uso avanzado →</Link>
      </div>
    </div>
  );
}
