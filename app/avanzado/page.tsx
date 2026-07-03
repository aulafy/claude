import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Uso avanzado — Aprende Claude Code",
  description: "Subagentes, git worktrees, modo headless, CI/CD y flujos de trabajo avanzados con Claude Code.",
};

export default function Avanzado() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Uso avanzado</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="advanced">Uso avanzado</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Técnicas avanzadas para sacar el máximo partido a Claude Code:
          subagentes, worktrees, integración en CI/CD, modo headless y más.
        </p>
      </div>

      <div className="prose">
        <h2>Subagentes</h2>
        <p>
          Claude Code puede lanzar <strong>subagentes</strong>: instancias
          paralelas de Claude que trabajan de forma independiente en subtareas.
          Esto es especialmente útil para tareas que se pueden paralelizar.
        </p>
        <p>Ejemplos donde los subagentes brillan:</p>
        <ul>
          <li>Refactorizar 20 archivos en paralelo.</li>
          <li>Generar tests para múltiples módulos simultáneamente.</li>
          <li>Investigar distintas soluciones a la vez y elegir la mejor.</li>
        </ul>
        <p>Lanzar subagentes con el SDK de Claude:</p>
        <pre><code>{`# Dentro de Claude Code, Claude decide cuándo paralelizar
> "Genera tests unitarios para cada archivo en src/components. Hazlo en paralelo."

# Claude lanzará un subagente por archivo automáticamente`}</code></pre>

        <div className="callout callout-info">
          Los subagentes se gestionan automáticamente. Claude decide cuándo
          crear uno basándose en la complejidad y paralelizabilidad de la tarea.
          Puedes ver los activos con <code>/agents</code>.
        </div>

        <h2>Git worktrees</h2>
        <p>
          Los <strong>git worktrees</strong> permiten trabajar en múltiples
          ramas del mismo repositorio simultáneamente, en directorios distintos.
          Puedes usarlos para aislar cambios grandes antes de abrir Claude Code:
        </p>
        <pre><code>{`# Crear un worktree para una feature branch
git worktree add ../mi-proyecto-feature feature/nueva-api

# Entrar en ese directorio y abrir Claude Code allí
cd ../mi-proyecto-feature
claude`}</code></pre>
        <p>
          Así separas los cambios de tu rama principal con una herramienta de Git
          estable y verificable. Cuando termines, revisa el diff, ejecuta tests y
          fusiona o elimina el worktree según convenga.
        </p>

        <h2>Modo headless / CI-CD</h2>
        <p>
          Claude Code puede ejecutarse sin interfaz interactiva, ideal para
          pipelines de CI/CD, scripts y automatizaciones:
        </p>
        <pre><code>{`# Modo headless básico
claude -p "revisa el código en busca de vulnerabilidades SQL"

# Con output JSON para parsear
claude -p --output-format json "lista todos los TODO del proyecto" | jq '.result'

# En un Makefile o script CI
claude -p --dangerously-skip-permissions \\
  "ejecuta los tests, si hay fallos corrígelos y haz commit"

# En GitHub Actions
- name: Claude Code Review
  run: |
    claude -p "revisa los cambios del PR y comenta problemas de seguridad" \\
      --output-format json > review.json
  env:
    ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}`}</code></pre>

        <h2>Elegir modelo y esfuerzo</h2>
        <p>
          En vez de memorizar IDs concretos, usa aliases de modelo. Claude Code
          resuelve <code>sonnet</code>, <code>opus</code>, <code>haiku</code> o{" "}
          <code>fable</code> según tu proveedor y permisos.
        </p>
        <pre><code>{`# Modelo equilibrado para el día a día
claude --model sonnet

# Más razonamiento en la sesión actual
claude --model opus --effort high

# Dentro de la sesión puedes abrir el selector
/model`}</code></pre>

        <h2>Sesiones largas y compactación</h2>
        <p>
          En sesiones largas, el contexto se llena y Claude Code puede volverse
          más lento o perder coherencia. Soluciones:
        </p>
        <h3>Compactar el contexto</h3>
        <pre><code>{`# Dentro de Claude Code
/compact

# Claude resume la conversación hasta el momento
# y la reemplaza por un resumen compacto`}</code></pre>
        <h3>Reanudar una sesión</h3>
        <pre><code>{`# Ver sesiones recientes
claude resume

# Continuar la última sesión
claude resume --last

# El contexto se restaura automáticamente`}</code></pre>

        <h2>CLAUDE.md en subdirectorios</h2>
        <p>
          Puedes tener archivos <code>CLAUDE.md</code> en subdirectorios de tu
          proyecto. Claude los leerá automáticamente cuando trabaje en esa carpeta,
          dándole instrucciones específicas para esa parte del código:
        </p>
        <pre><code>{`mi-proyecto/
├── CLAUDE.md              ← instrucciones globales
├── frontend/
│   └── CLAUDE.md          ← instrucciones para el frontend
├── backend/
│   └── CLAUDE.md          ← instrucciones para el backend
└── docs/
    └── CLAUDE.md          ← instrucciones para documentación`}</code></pre>

        <h2>Flujos de trabajo con git</h2>
        <h3>Crear feature branches automáticamente</h3>
        <pre><code>{`> "Implementa el sistema de notificaciones push. Crea una feature branch,
   haz los cambios necesarios y al terminar prepara el PR."

# Claude hará:
# 1. git checkout -b feature/push-notifications
# 2. Implementar los cambios
# 3. git add + git commit con mensaje descriptivo
# 4. Preparar el cuerpo del PR para que lo apruebes`}</code></pre>

        <h3>Code review automatizado</h3>
        <pre><code>{`# Revisar el diff del último commit
claude -p "revisa este diff en busca de bugs y problemas de rendimiento" \\
  <<< "$(git diff HEAD~1)"

# Revisar todo un PR
gh pr diff 123 | claude -p "haz un code review completo"`}</code></pre>

        <h2>Integración con tmux / pantallas divididas</h2>
        <p>
          Un flujo de trabajo popular es tener Claude Code en un panel y tu
          editor en otro:
        </p>
        <pre><code>{`# Crear sesión tmux con dos paneles
tmux new-session -d -s dev
tmux split-window -h
tmux send-keys -t dev:0.0 "claude" Enter  # Claude Code a la izquierda
tmux send-keys -t dev:0.1 "nvim ." Enter  # Editor a la derecha`}</code></pre>

        <h2>Tips de productividad</h2>
        <ul>
          <li>
            <strong>Sé específico con el contexto:</strong> menciona el archivo,
            la función y el error exacto. Cuanto más específico, mejor resultado.
          </li>
          <li>
            <strong>Un alias útil:</strong> <code>alias ai="claude -p"</code>
            para consultas rápidas sin entrar al modo interactivo.
          </li>
          <li>
            <strong>Memoria entre sesiones:</strong> mantén tu CLAUDE.md actualizado
            con las decisiones de arquitectura y convenciones del proyecto.
          </li>
          <li>
            <strong>Tareas grandes:</strong> divide el trabajo en subtareas menores.
            Claude trabaja mejor con objetivos acotados y claros.
          </li>
          <li>
            <strong>Revisar antes de aceptar:</strong> usa siempre el diff view
            para entender exactamente qué va a cambiar antes de confirmar.
          </li>
        </ul>

        <h2>Exportar la sesión</h2>
        <pre><code>{`# Guardar el transcript de la sesión actual
claude -p --output-format json "resumen del trabajo de hoy" > sesion-$(date +%Y%m%d).json`}</code></pre>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/permisos" className="text-sm text-zinc-500 hover:text-zinc-300">← Permisos</Link>
        <Link href="/" className="text-sm text-orange-400 hover:text-orange-300">Volver al inicio →</Link>
      </div>
    </div>
  );
}
