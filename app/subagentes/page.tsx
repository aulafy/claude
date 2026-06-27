import type { Metadata } from "next";
import Link from "next/link";
import Prompt from "@/components/Prompt";

export const metadata: Metadata = {
  title: "Subagentes — Aprende Claude Code",
  description:
    "Crea subagentes especializados en Claude Code: definición en .claude/agents, frontmatter, paralelismo y ejecución en background. Guía 2026.",
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
        <h1 className="text-4xl font-bold text-white mb-4">🤖 Subagentes</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Los subagentes son "ayudantes especializados" que Claude Code puede lanzar
          para trabajar en paralelo: uno revisa código, otro investiga, otro escribe
          tests... mientras el agente principal coordina y tú solo revisas resultados.
        </p>
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
          Un patrón muy comentado en 2026: lanzar <strong>7 o más subagentes en
          paralelo</strong> (imágenes, auditoría de seguridad, importación de datos,
          tests...) mientras tú solo asignas tareas y revisas los <em>diffs</em>. El rol
          del programador cambia: de escribir código a <strong>asignar y revisar</strong>.
        </div>

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

        <h2>Crear uno sin saber YAML</h2>
        <Prompt>{`Quiero crear un subagente para mi proyecto que se dedique solo a escribir tests. Debe poder leer y editar archivos, usar el modelo sonnet, y centrarse en cubrir casos límite. Créalo en .claude/agents/ y explícame cómo lanzarlo.`}</Prompt>

        <h2>Subagentes en paralelo (ejemplo real)</h2>
        <Prompt>{`Tengo que añadir una función de notificaciones a la app. Reparte el trabajo en subagentes en paralelo: uno que investigue cómo está montado el sistema actual, otro que escriba el código, y otro que prepare los tests. Coordínalos tú y al final enséñame un resumen con los cambios para que los revise.`}</Prompt>

        <div className="callout callout-tip">
          <strong>Consejo de seguridad:</strong> limita el campo <code>tools</code> de
          cada subagente a lo mínimo. Un revisor solo necesita leer (<code>Read, Grep</code>);
          no le des permiso para editar o ejecutar comandos si no hace falta.
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/skills" className="text-sm text-zinc-500 hover:text-zinc-300">← Skills</Link>
        <Link href="/plugins" className="text-sm text-orange-400 hover:text-orange-300">Plugins →</Link>
      </div>
    </div>
  );
}
