import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import Prompt from "@/components/Prompt";

export const metadata: Metadata = {
  title: "Skills (Agent Skills)",
  description:
    "Qué son las Skills de Claude Code, cómo crearlas con SKILL.md, invocarlas y compartirlas. Guía actualizada 2026.",
  alternates: { canonical: "/cursos/claude-code/skills" },
};

export default function Skills() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Skills</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="grid">Skills (Agent Skills)</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Las Skills son la forma más potente de enseñarle a Claude Code a hacer
          tareas concretas <em>a tu manera</em>: revisiones, despliegues, debugging,
          flujos repetitivos... Las defines una vez y Claude las usa cuando hacen falta.
        </p>
      </div>

      <div className="prose">
        <h2>¿Qué es una Skill?</h2>
        <p>
          Una Skill es un conjunto reutilizable de instrucciones y procedimientos
          (checklists, flujos de varios pasos, comportamientos especializados) que
          amplían lo que Claude sabe hacer. Siguen el estándar abierto{" "}
          <strong>Agent Skills</strong> más las extensiones de Claude Code.
        </p>
        <p>
          Claude carga una Skill <strong>automáticamente</strong> cuando es relevante
          (según su descripción), o tú la invocas <strong>manualmente</strong> con{" "}
          <code>/nombre-skill</code>. Puede incluir archivos auxiliares: scripts,
          plantillas, documentos de referencia.
        </p>

        <div className="callout callout-orange">
          <strong>Novedad importante:</strong> los antiguos comandos personalizados
          (<code>.claude/commands/</code>) se han <strong>unificado dentro de las
          Skills</strong>. Los archivos <code>.md</code> antiguos siguen funcionando,
          pero las Skills son la forma recomendada porque admiten frontmatter y
          archivos auxiliares.
        </div>

        <h2>Estructura de una Skill</h2>
        <p>
          Una Skill es una carpeta con un archivo <code>SKILL.md</code> dentro. Ese
          archivo tiene dos partes: un <strong>frontmatter</strong> en YAML (metadatos)
          y el cuerpo en Markdown (las instrucciones).
        </p>
        <pre><code>{`.claude/skills/
└── deploy/
    ├── SKILL.md          ← instrucciones + metadatos
    ├── checklist.md      ← archivo auxiliar (opcional)
    └── scripts/
        └── deploy.sh     ← script auxiliar (opcional)`}</code></pre>

        <h3>Ejemplo de SKILL.md</h3>
        <pre><code>{`---
name: deploy
description: Despliega la aplicación a producción. Úsala cuando el usuario pida "subir", "desplegar" o "hacer deploy".
disable-model-invocation: true
argument-hint: "[entorno]"
---

Despliega la aplicación al entorno $ARGUMENTS siguiendo estos pasos:

1. Ejecuta los tests. Si fallan, detente y avisa.
2. Comprueba que la rama es 'main' y está actualizada.
3. Ejecuta el build de producción.
4. Lanza el deploy con el script scripts/deploy.sh.
5. Verifica que el sitio responde y resume el resultado.`}</code></pre>

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
                ["name", "Nombre de la skill (así la invocas: /name). Obligatorio."],
                ["description", "Cuándo usarla. Claude lee esto para decidir si la activa sola. Obligatorio."],
                ["disable-model-invocation", "Si es true, solo se activa manualmente (ideal para acciones con efectos como deploy)."],
                ["argument-hint", "Pista de qué argumentos espera, p. ej. \"[entorno]\"."],
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
          <li><strong>Personal (todos tus proyectos):</strong> <code>~/.claude/skills/&lt;nombre&gt;/SKILL.md</code></li>
          <li><strong>Proyecto (recomendado, versionable):</strong> <code>.claude/skills/&lt;nombre&gt;/SKILL.md</code></li>
          <li><strong>Vía plugin:</strong> dentro del plugin, con nombre namespaced como <code>/plugin:skill</code></li>
          <li><strong>Monorepos:</strong> en subdirectorios, cualificadas como <code>/apps/web:deploy</code></li>
        </ul>
        <div className="callout callout-tip">
          Guarda las skills del proyecto en <code>.claude/skills/</code> y añádelas
          a git: así todo tu equipo comparte los mismos flujos de trabajo.
        </div>

        <h2>Cómo invocar una Skill</h2>
        <h3>Manualmente</h3>
        <pre><code>{`# Sin argumentos
/deploy

# Con argumentos (llegan como $ARGUMENTS)
/deploy produccion`}</code></pre>
        <h3>Automáticamente</h3>
        <p>
          Si no pones <code>disable-model-invocation: true</code>, Claude activará la
          skill por su cuenta cuando tu petición encaje con su <code>description</code>.
          Por eso la descripción es tan importante: escríbela pensando en{" "}
          <em>cuándo</em> debe usarse.
        </p>

        <h2>Crear tu primera Skill (sin saber)</h2>
        <p>Deja que Claude Code la cree por ti:</p>
        <Prompt>{`Quiero crear una skill de Claude Code para mi proyecto que haga siempre lo mismo cuando le pida "revisar": comprobar que el código no tiene console.log olvidados, que los nombres de variables son claros y que hay tests. Crea la carpeta y el SKILL.md en .claude/skills/ y explícame cómo invocarla.`}</Prompt>

        <h2>Skills oficiales incluidas</h2>
        <p>
          Claude Code trae skills listas para usar. Algunas que verás disponibles:
        </p>
        <ul>
          <li><code>/code-review</code> — revisión de código del diff actual.</li>
          <li><code>/security-review</code> — revisión de seguridad de tus cambios.</li>
          <li><code>/init</code> — genera el <code>CLAUDE.md</code> de tu proyecto.</li>
        </ul>
        <p>
          Existe además un plugin <code>skill-creator</code> que te ayuda a crear,
          iterar y evaluar tus propias skills.
        </p>

        <h2>Edición en vivo</h2>
        <p>
          Puedes editar un <code>SKILL.md</code> mientras Claude Code está abierto y
          los cambios tienen efecto <strong>inmediato</strong>, sin reiniciar. Ideal
          para ir afinando una skill mientras la pruebas.
        </p>

        <div className="callout callout-info">
          <strong>Buena práctica 2026:</strong> mantén un <code>CLAUDE.md</code> ligero
          (contexto general del proyecto) y mueve los procedimientos concretos a Skills
          específicas. Así Claude solo carga lo que necesita en cada momento.
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/avanzado" className="text-sm text-zinc-500 hover:text-zinc-300">← Uso avanzado</Link>
        <Link href="/cursos/claude-code/subagentes" className="text-sm text-violet-400 hover:text-fuchsia-300">Subagentes →</Link>
      </div>
    </div>
  );
}
