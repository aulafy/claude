import Link from "next/link";

const cards = [
  {
    href: "/instalacion",
    icon: "📦",
    title: "Instalación",
    desc: "Instala Claude Code en macOS, Linux o Windows en menos de 2 minutos.",
  },
  {
    href: "/primeros-pasos",
    icon: "🚀",
    title: "Primeros pasos",
    desc: "Tu primera sesión: cómo hablar con Claude Code y entender la interfaz.",
  },
  {
    href: "/donde-usar",
    icon: "🖥️",
    title: "CLI, app y móvil",
    desc: "Terminal, app de escritorio, web, IDE y cómo controlarlo desde el móvil.",
  },
  {
    href: "/recetas",
    icon: "🍳",
    title: "Recetas prácticas",
    desc: "Más de 40 ejemplos reales del día a día, con prompts listos para copiar.",
  },
  {
    href: "/proyectos",
    icon: "🏗️",
    title: "Proyectos guiados",
    desc: "Construye una web, una app y un script paso a paso, con todos los prompts.",
  },
  {
    href: "/prompts",
    icon: "🎯",
    title: "Escribir buenos prompts",
    desc: "Cómo pedir las cosas para obtener mejores resultados. Antes y después.",
  },
  {
    href: "/glosario",
    icon: "📖",
    title: "Glosario",
    desc: "Términos técnicos explicados con palabras normales y analogías.",
  },
  {
    href: "/skills",
    icon: "🧩",
    title: "Skills",
    desc: "Enseña a Claude tareas a tu manera con archivos SKILL.md reutilizables.",
  },
  {
    href: "/subagentes",
    icon: "🤖",
    title: "Subagentes",
    desc: "Ayudantes especializados que trabajan en paralelo mientras tú revisas.",
  },
  {
    href: "/plugins",
    icon: "🔌",
    title: "Plugins",
    desc: "Instala bundles de skills, agentes y MCP desde el marketplace.",
  },
  {
    href: "/flujos",
    icon: "🧭",
    title: "Flujos de trabajo pro",
    desc: "Plan mode, rewind, tareas en background y los trucos más recomendados.",
  },
  {
    href: "/comandos",
    icon: "⌨️",
    title: "Comandos",
    desc: "Todos los slash commands y flags disponibles con ejemplos reales.",
  },
  {
    href: "/configuracion",
    icon: "⚙️",
    title: "Configuración",
    desc: "Personaliza el comportamiento, modelos y memoria con settings.json.",
  },
  {
    href: "/mcp",
    icon: "🔌",
    title: "Servidores MCP",
    desc: "Conecta herramientas externas: bases de datos, APIs, navegador y más.",
  },
  {
    href: "/hooks",
    icon: "🪝",
    title: "Hooks",
    desc: "Automatiza acciones antes y después de cada herramienta o respuesta.",
  },
  {
    href: "/permisos",
    icon: "🔐",
    title: "Permisos",
    desc: "Controla qué puede hacer Claude Code en tu máquina con seguridad.",
  },
  {
    href: "/avanzado",
    icon: "⚡",
    title: "Uso avanzado",
    desc: "Subagentes, worktrees, modo headless y flujos de trabajo pro.",
  },
  {
    href: "/faq",
    icon: "❓",
    title: "Preguntas frecuentes",
    desc: "Precio, seguridad, privacidad y las dudas más comunes al empezar.",
  },
  {
    href: "/problemas",
    icon: "🔧",
    title: "Solución de problemas",
    desc: "Errores comunes de instalación y uso, y cómo resolverlos rápido.",
  },
  {
    href: "/recursos",
    icon: "📚",
    title: "Recursos",
    desc: "Enlaces oficiales, repos de skills, MCP y cursos actualizados.",
  },
  {
    href: "/comparativa",
    icon: "🆚",
    title: "Comparativa",
    desc: "Claude Code frente a Cursor, Windsurf, Copilot y ChatGPT.",
  },
  {
    href: "/pymes",
    icon: "🏢",
    title: "Pymes y oficina",
    desc: "Automatiza Excel, facturas, informes y tareas de oficina sin programar.",
  },
  {
    href: "/equipos",
    icon: "🧑‍💻",
    title: "Perfiles técnicos",
    desc: "Code review, refactors, testing, CI/CD y estandarización de equipo.",
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      {/* Hero */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium mb-6">
          <span>✦</span>
          Actualizado junio 2026 · Claude Code 2.x
        </div>
        <h1 className="text-5xl font-bold text-white leading-tight mb-5">
          Aprende{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            Claude Code
          </span>
          <br />
          desde cero
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
          La guía más completa en español para dominar Claude Code, la CLI de
          Anthropic que convierte tu terminal en un asistente de IA experto.
          Sin conocimientos previos necesarios.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/instalacion"
            className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-medium text-sm transition-colors"
          >
            Empezar ahora →
          </Link>
          <Link
            href="/recetas"
            className="px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium text-sm transition-colors"
          >
            🍳 Ver recetas prácticas
          </Link>
        </div>
      </div>

      {/* Quick install */}
      <div className="mb-14 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
          Instalación rápida
        </p>
        <div className="flex items-center gap-3">
          <pre className="flex-1 m-0 bg-transparent border-none p-0 text-emerald-400 text-sm">
            <code>npm install -g @anthropic-ai/claude-code</code>
          </pre>
        </div>
        <p className="text-xs text-zinc-600 mt-2">
          Requiere Node.js 20+ · Funciona en macOS, Linux y WSL
        </p>
      </div>

      {/* Cards grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-5">
          Contenido del tutorial
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 hover:bg-zinc-900/60 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl leading-none mt-0.5">{card.icon}</span>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-orange-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* What is Claude Code */}
      <div className="mt-16 border-t border-zinc-800 pt-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          ¿Qué es Claude Code?
        </h2>
        <p className="text-zinc-400 leading-relaxed mb-4">
          <strong className="text-zinc-200">Claude Code</strong> es una CLI
          (interfaz de línea de comandos) desarrollada por Anthropic que te
          permite interactuar con el modelo Claude directamente desde tu
          terminal o desde tu editor de código favorito (VS Code, JetBrains,
          etc.).
        </p>
        <p className="text-zinc-400 leading-relaxed mb-4">
          A diferencia de los chatbots web, Claude Code tiene acceso{" "}
          <strong className="text-zinc-200">directo a tus archivos</strong>,
          puede ejecutar comandos de terminal, leer y escribir código, hacer
          git commits, buscar en tu base de código y mucho más — todo con tu
          supervisión.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            {
              label: "Agente de código",
              desc: "Lee, edita y crea archivos directamente en tu proyecto",
            },
            {
              label: "Extensible",
              desc: "Conecta herramientas externas via Model Context Protocol",
            },
            {
              label: "Seguro",
              desc: "Tú controlas cada permiso. Nada ocurre sin tu aprobación",
            },
          ].map((f) => (
            <div
              key={f.label}
              className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4"
            >
              <div className="text-orange-400 font-semibold text-sm mb-1">
                {f.label}
              </div>
              <div className="text-zinc-500 text-xs leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
