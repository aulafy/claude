import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import Prompt from "@/components/Prompt";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Para perfiles técnicos y equipos",
  description:
    "Recetas avanzadas de Claude Code para equipos: code review, refactors, testing/TDD, CI/CD headless, .claude/ e integraciones MCP.",
  alternates: { canonical: "/cursos/claude-code/equipos" },
};

const sections: Array<{ href: string; icon: IconName; label: string }> = [
  { href: "#codebase", icon: "folder", label: "Bases de código grandes" },
  { href: "#review", icon: "search", label: "Revisión de código automatizada" },
  { href: "#refactor", icon: "recycle", label: "Refactors y migraciones" },
  { href: "#testing", icon: "testTube", label: "Testing y TDD" },
  { href: "#cicd", icon: "robot", label: "CI/CD y modo headless" },
  { href: "#equipo", icon: "users", label: "Estandarizar el equipo" },
  { href: "#integraciones", icon: "link", label: "Integraciones" },
];

export default function Equipos() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Para perfiles técnicos y equipos</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="users">Para perfiles técnicos y equipos</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Recetas concretas para exprimir Claude Code en proyectos serios y en
          equipo: revisión de código, refactors grandes, testing, CI/CD y
          estandarización. Cada una con el prompt o comando listo.
        </p>
      </div>

      <div className="mb-12 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">En esta página</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm">
          {sections.map((item) => (
            <a key={item.href} href={item.href} className="inline-flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors">
              <Icon name={item.icon} />
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="prose">
        <SectionHeading id="codebase" icon="folder">Bases de código grandes</SectionHeading>
        <p>
          Usa <code>CLAUDE.md</code> en la raíz y por módulo para dar contexto;
          <code>/init</code> para generarlo; <code>/compact</code> en sesiones
          largas. Ajusta más detalles en <Link href="/cursos/claude-code/configuracion">Configuración</Link>.
        </p>

        <h3>Generar contexto inicial del repositorio</h3>
        <Prompt>{`Explora este repositorio y genera un CLAUDE.md con el stack, los comandos clave (build, test, lint), la estructura de carpetas y las convenciones. Mantenlo conciso.`}</Prompt>

        <SectionHeading id="review" icon="search">Revisión de código automatizada</SectionHeading>
        <p>
          Usa <code>/code-review</code> y <code>/security-review</code> sobre el
          diff; en CI puedes automatizarlo con <code>claude -p</code>.
        </p>

        <h3>Revisar el diff local</h3>
        <Prompt>{`Revisa el diff actual en busca de bugs, problemas de seguridad y deuda técnica. Ordena los hallazgos por gravedad y propón el arreglo de los críticos.`}</Prompt>

        <h3>Revisión desde GitHub CLI</h3>
        <pre><code>{`gh pr diff 123 | claude -p "haz un code review y comenta problemas por gravedad"`}</code></pre>

        <SectionHeading id="refactor" icon="recycle">Refactors y migraciones a gran escala</SectionHeading>
        <p>
          Combina Plan Mode para revisar antes de tocar código con subagentes en
          paralelo. Profundiza en <Link href="/cursos/claude-code/flujos">Flujos de trabajo pro</Link>{" "}
          y <Link href="/cursos/claude-code/subagentes">Subagentes</Link>.
        </p>

        <h3>Migración con plan previo</h3>
        <Prompt>{`Quiero migrar todos los componentes de clase a componentes de función con hooks. Primero hazme un plan por fases y dime los riesgos. No cambies nada hasta que lo apruebe.`}</Prompt>

        <SectionHeading id="testing" icon="testTube">Testing y TDD</SectionHeading>
        <p>
          Pide pruebas concretas y haz que Claude Code las ejecute para cerrar el
          ciclo con evidencia.
        </p>

        <h3>Tests unitarios para un módulo</h3>
        <Prompt>{`Genera tests unitarios para [módulo], cubriendo casos límite y errores. Ejecútalos y, si fallan, arregla el código o el test explicándome la causa.`}</Prompt>

        <h3>Trabajar en TDD</h3>
        <Prompt>{`Trabajemos en TDD: escribe primero un test que falle para [funcionalidad], y luego implementa el código mínimo para que pase.`}</Prompt>

        <SectionHeading id="cicd" icon="robot">CI/CD y modo headless</SectionHeading>
        <p>
          Usa <code>claude -p</code> para scripts y <code>--output-format json</code>{" "}
          cuando necesites parsear la salida desde otro proceso.
        </p>

        <h3>Ejemplo en GitHub Actions</h3>
        <pre><code>{`- name: Claude review
  run: claude -p "revisa los cambios del PR y resume riesgos" --output-format json > review.json
  env:
    ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}`}</code></pre>

        <SectionHeading id="equipo" icon="users">Estandarizar el equipo</SectionHeading>
        <p>
          Versiona la carpeta <code>.claude/</code> en el repo con settings,
          skills y agents para que todo el equipo comparta configuración,
          permisos y flujos. Empaqueta lo común como plugin interno. Mira{" "}
          <Link href="/cursos/claude-code/skills">Skills</Link> y <Link href="/cursos/claude-code/plugins">Plugins</Link>.
        </p>

        <h3>Skill interna para antes del PR</h3>
        <Prompt>{`Crea en .claude/ una skill de 'revisión previa a PR' que compruebe lint, tests y que no haya console.log ni secretos. Que el equipo pueda invocarla con /pre-pr.`}</Prompt>

        <SectionHeading id="integraciones" icon="link">Integraciones</SectionHeading>
        <p>
          Conecta MCP a tu base de datos u observabilidad; usa hooks para
          formatear al guardar. Sigue con <Link href="/cursos/claude-code/mcp">Servidores MCP</Link>{" "}
          y <Link href="/cursos/claude-code/hooks">Hooks</Link>.
        </p>

        <h3>Consultar datos mediante MCP</h3>
        <Prompt>{`Conéctate a la base de datos vía MCP y dime el esquema de la tabla [pedidos], luego escríbeme una consulta para ver los 10 pedidos de mayor importe del último mes.`}</Prompt>

        <div className="callout callout-tip">
          <strong>El cambio de mentalidad para equipos:</strong> pasar de
          escribir cada línea a dirigir y revisar; estandariza con{" "}
          <code>.claude/</code> versionado para que el equipo trabaje igual.
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/pymes" className="text-sm text-zinc-500 hover:text-zinc-300">← Claude Code para pymes y oficina</Link>
        <Link href="/" className="text-sm text-orange-400 hover:text-orange-300">Volver al inicio →</Link>
      </div>
    </div>
  );
}
