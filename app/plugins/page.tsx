import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import Prompt from "@/components/Prompt";

export const metadata: Metadata = {
  title: "Plugins y marketplace",
  description:
    "Instala y gestiona plugins en Claude Code: añade marketplaces, instala bundles de skills, agentes, hooks y servidores MCP. Guía 2026.",
  alternates: { canonical: "/cursos/claude-code/plugins" },
};

export default function Plugins() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Plugins</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="plug">Plugins y marketplace</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Los plugins son paquetes que añaden funcionalidad a Claude Code de golpe:
          agrupan skills, subagentes, comandos, hooks y servidores MCP. Es la forma
          más rápida de potenciar tu instalación con trabajo ya hecho por otros.
        </p>
      </div>

      <div className="prose">
        <h2>¿Qué es un plugin?</h2>
        <p>
          Un plugin empaqueta varias extensiones en una sola unidad instalable:
        </p>
        <ul>
          <li><Icon name="grid" className="text-orange-400" /> <strong>Skills</strong> — flujos y procedimientos especializados.</li>
          <li><Icon name="robot" className="text-orange-400" /> <strong>Subagentes</strong> — ayudantes con roles concretos.</li>
          <li><Icon name="command" className="text-orange-400" /> <strong>Comandos</strong> — slash commands listos para usar.</li>
          <li><Icon name="hook" className="text-orange-400" /> <strong>Hooks</strong> — automatizaciones de eventos.</li>
          <li><Icon name="link" className="text-orange-400" /> <strong>Servidores MCP</strong> — conexiones a herramientas externas.</li>
        </ul>
        <p>
          Un <strong>marketplace</strong> es un repositorio (normalmente en GitHub) con
          un registro de plugins. Añades el marketplace una vez y luego instalas los
          plugins que quieras de él.
        </p>

        <h2>Añadir un marketplace</h2>
        <p>El marketplace oficial de Anthropic:</p>
        <pre><code>{`/plugin marketplace add anthropics/claude-plugins-official`}</code></pre>
        <p>También puedes añadir uno de la comunidad o uno privado de tu empresa:</p>
        <pre><code>{`/plugin marketplace add https://github.com/usuario/mi-marketplace`}</code></pre>

        <h2>Instalar un plugin</h2>
        <pre><code>{`# Desde un marketplace añadido
/plugin install github@claude-plugins-official

# Directamente desde un repo
/plugin install https://github.com/usuario/mi-plugin`}</code></pre>
        <p>
          O usa la interfaz interactiva: escribe <code>/plugin</code> y entra en{" "}
          <strong>Discover</strong> para explorar, ver qué incluye cada plugin y su
          coste estimado de contexto antes de instalar.
        </p>

        <h2>Gestionar plugins</h2>
        <pre><code>{`/plugin           # Abre el panel: listar, activar, desactivar
/plugin list      # Ver plugins instalados`}</code></pre>

        <h2>Plugins útiles que la gente instala</h2>
        <ul>
          <li>Integración con <strong>GitHub</strong> (issues, PRs, commits).</li>
          <li><strong>Toolkits de revisión de PRs</strong> (pr-review-toolkit).</li>
          <li>Flujos de <strong>commit y despliegue</strong>.</li>
          <li>Bundles de <strong>skills científicas</strong> (biología, química con bases de datos).</li>
          <li><code>skill-creator</code> para crear y evaluar tus propias skills.</li>
        </ul>

        <div className="callout callout-info">
          <strong>Coste de contexto:</strong> cada plugin que activas consume parte del
          contexto de Claude (sus skills, agentes y descripciones se cargan). Activa solo
          los que vayas a usar; el panel <code>/plugin</code> te muestra el coste estimado.
        </div>

        <h2>Empezar rápido con plugins</h2>
        <Prompt>{`Soy nuevo con Claude Code. Añade el marketplace oficial de Anthropic, enséñame qué plugins hay disponibles que sean útiles para alguien que está aprendiendo a programar, y recomiéndame 2 o 3 para empezar explicándome qué hace cada uno.`}</Prompt>

        <h2>Crear tu propio plugin</h2>
        <p>
          Si tienes skills, subagentes o comandos que usas en varios proyectos, puedes
          empaquetarlos en un plugin y compartirlo (con tu equipo o públicamente) creando
          un repositorio con la estructura de marketplace. Pídeselo a Claude Code:
        </p>
        <Prompt>{`Tengo varias skills y subagentes en .claude/ que quiero reutilizar en otros proyectos. Ayúdame a empaquetarlos como un plugin de Claude Code en un repositorio nuevo, con la estructura correcta para poder instalarlo con /plugin install. Explícame los pasos.`}</Prompt>

        <div className="callout callout-tip">
          <strong>Verifica siempre lo que instalas.</strong> Un plugin puede traer hooks
          y comandos que se ejecutan en tu máquina. Instala solo de fuentes en las que
          confíes (oficial, tu empresa, autores conocidos) y revisa qué incluye.
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/subagentes" className="text-sm text-zinc-500 hover:text-zinc-300">← Subagentes</Link>
        <Link href="/cursos/claude-code/flujos" className="text-sm text-orange-400 hover:text-orange-300">Flujos de trabajo pro →</Link>
      </div>
    </div>
  );
}
