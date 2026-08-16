import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import Prompt from "@/components/Prompt";

export const metadata: Metadata = {
  title: "Subagentes",
  description:
    "Crea subagentes especializados en Claude Code: definición en .claude/agents, frontmatter, paralelismo y ejecución en background. Guía 2026.",
  alternates: { canonical: "/cursos/claude-code/subagentes" },
};

export default function Subagentes() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Subagentes</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="robot">Subagentes</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Los subagentes son "ayudantes especializados" que Claude Code puede lanzar
          para trabajar en paralelo: uno revisa código, otro investiga, otro escribe
          tests... mientras el agente principal coordina y tú solo revisas resultados.
        </p>
        <p className="mt-3 text-sm text-zinc-500">Revisado el 16 de agosto de 2026 · Claude Code v2.1.233</p>
      </div>

      <div className="prose">
        <h2>¿Para qué sirven?</h2>
        <p>
          En tareas grandes, en vez de hacerlo todo de forma lineal, Claude Code puede
          repartir el trabajo entre varios subagentes con roles concretos (revisor,
          planificador, depurador, investigador). Ventajas:
        </p>
        <ul>
          <li><strong>Paralelismo:</strong> varios trabajando a la vez = más rápido.</li>
          <li><strong>Contexto limpio:</strong> cada subagente tiene su propia "memoria", sin mezclar.</li>
          <li><strong>Especialización:</strong> cada uno con sus instrucciones y herramientas.</li>
          <li><strong>Background:</strong> pueden correr de fondo sin bloquearte.</li>
        </ul>

        <div className="callout callout-orange">
          Más agentes no implican un resultado mejor. Cada agente añade contexto, coste,
          coordinación y posibles conflictos. Empieza con uno para investigar o revisar;
          paraleliza solo tareas independientes y define quién integra el resultado.
        </div>

        <h2>Qué cambió en v2.1.232</h2>
        <p>
          Desde esa versión, un subagente con <code>subagent_type: "fork"</code> puede
          heredar la conversación completa y reutilizar el prompt cache. Además, los
          agentes que no son <em>teammates</em> y se lanzan desde una sesión interactiva
          pasan a segundo plano por defecto.
        </p>
        <p>
          Esto no convierte todos los subagentes en copias del principal. Un subagente
          normal sigue siendo útil para aislar contexto; usa un fork solo cuando necesite
          el historial completo. Revisa también archivos, permisos, modelo y directorio
          de trabajo efectivos antes de confiar en su resultado.
        </p>

        <h2>Crear un subagente</h2>
        <p>
          Un subagente es un archivo Markdown con frontmatter YAML (configuración) y un
          cuerpo que es su <em>system prompt</em> (sus instrucciones de personalidad y rol).
        </p>
        <pre><code>{`.claude/agents/
├── revisor.md
├── depurador.md
└── investigador.md`}</code></pre>

        <h3>Ejemplo: un subagente revisor de código</h3>
        <pre><code>{`---
name: revisor
description: Revisa código en busca de bugs y malas prácticas. Úsalo tras escribir o cambiar código.
tools: Read, Grep, Glob
model: sonnet
color: blue
---

Eres un revisor de código senior. Tu trabajo es leer los cambios y encontrar:
- Bugs potenciales y casos límite no cubiertos.
- Nombres poco claros y código difícil de mantener.
- Problemas de seguridad.

No edites archivos: solo informa de lo que encuentres, ordenado por gravedad.
Sé directo pero constructivo.`}</code></pre>

        <h3>Campos del frontmatter</h3>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Campo</th>
                <th>Para qué sirve</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["name", "Nombre del subagente. Obligatorio."],
                ["description", "Cuándo usarlo. El agente principal lo lee para delegar. Obligatorio."],
                ["tools", "Lista blanca de herramientas que puede usar (p. ej. Read, Grep). Limítalas por seguridad."],
                ["model", "Modelo a usar: sonnet, opus, fable o inherit (heredar del principal)."],
                ["permissionMode", "Modo de permisos para este subagente."],
                ["color", "Color con el que se muestra en la interfaz."],
                ["hooks", "Hooks específicos de este subagente."],
                ["skills", "Skills que se precargan al lanzarlo."],
                ["background", "Si es true, corre en segundo plano."],
                ["effort", "Nivel de esfuerzo/razonamiento."],
              ].map(([f, d]) => (
                <tr key={f as string}>
                  <td><code>{f as string}</code></td>
                  <td>{d as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Dónde se guardan</h2>
        <ul>
          <li><strong>Proyecto (recomendado):</strong> <code>.claude/agents/&lt;nombre&gt;.md</code></li>
          <li><strong>Personal:</strong> <code>~/.claude/agents/&lt;nombre&gt;.md</code></li>
          <li><strong>Vía plugin:</strong> dentro del plugin (<code>agents/...</code>)</li>
          <li><strong>Solo para una sesión:</strong> con el flag <code>--agents '&#123;...&#125;'</code> (no se guarda en disco)</li>
        </ul>

        <h2>Cómo invocarlos</h2>
        <h3>Delegación natural</h3>
        <p>Simplemente pídeselo al agente principal:</p>
        <Prompt>{`Usa el subagente "revisor" para revisar los cambios que acabas de hacer y dime qué encuentra.`}</Prompt>
        <h3>Mención directa</h3>
        <pre><code>{`@"revisor (agent)" revisa src/pagos.ts`}</code></pre>
        <h3>Asistente interactivo</h3>
        <p>
          Usa el comando <code>/agents</code> para abrir un asistente que te guía en la
          creación y gestión de subagentes sin escribir el YAML a mano.
        </p>
        <h3>Desde la terminal</h3>
        <pre><code>{`# Lanzar con un subagente concreto
claude --agent revisor

# Ver, monitorizar y gestionar subagentes en paralelo
claude agents`}</code></pre>

        <h2>No confundas tres mecanismos</h2>
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>Mecanismo</th><th>Úsalo cuando</th><th>Contexto</th></tr></thead>
            <tbody>
              <tr><td>Subagente aislado</td><td>Investigar o revisar sin llenar el hilo principal</td><td>Propio y acotado</td></tr>
              <tr><td><code>subagent_type: "fork"</code></td><td>Necesita el historial completo para continuar una rama</td><td>Hereda conversación y prompt cache</td></tr>
              <tr><td><code>/fork</code></td><td>Quieres otra sesión visible que continúe en paralelo</td><td>Copia la conversación a una sesión de background</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Crear uno sin saber YAML</h2>
        <Prompt>{`Quiero crear un subagente para mi proyecto que se dedique solo a escribir tests. Debe poder leer y editar archivos, usar el modelo sonnet, y centrarse en cubrir casos límite. Créalo en .claude/agents/ y explícame cómo lanzarlo.`}</Prompt>

        <h2>Subagentes en paralelo (ejemplo real)</h2>
        <Prompt>{`Tengo que añadir una función de notificaciones a la app. Reparte el trabajo en subagentes en paralelo: uno que investigue cómo está montado el sistema actual, otro que escriba el código, y otro que prepare los tests. Coordínalos tú y al final enséñame un resumen con los cambios para que los revise.`}</Prompt>

        <div className="callout callout-tip">
          <strong>Consejo de seguridad:</strong> limita el campo <code>tools</code> de
          cada subagente a lo mínimo. Un revisor solo necesita leer (<code>Read, Grep</code>);
          no le des permiso para editar o ejecutar comandos si no hace falta.
        </div>

        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.anthropic.com/en/docs/claude-code/sub-agents" target="_blank" rel="noreferrer">Anthropic · Subagents</a></li>
          <li><a href="https://github.com/anthropics/claude-code/releases/tag/v2.1.232" target="_blank" rel="noreferrer">Claude Code v2.1.232 · forking y background</a></li>
          <li><a href="https://github.com/anthropics/claude-code/releases/tag/v2.1.212" target="_blank" rel="noreferrer">Claude Code v2.1.212 · cambio de /fork</a></li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/skills" className="text-sm text-zinc-500 hover:text-zinc-300">← Skills</Link>
        <Link href="/cursos/claude-code/plugins" className="text-sm text-violet-400 hover:text-fuchsia-300">Plugins →</Link>
      </div>
    </div>
  );
}
