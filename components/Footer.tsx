import Link from "next/link";

const cols = [
  {
    title: "Empezar",
    links: [
      ["/instalacion", "Instalación"],
      ["/primeros-pasos", "Primeros pasos"],
      ["/proyectos", "Proyectos guiados"],
    ],
  },
  {
    title: "Práctica",
    links: [
      ["/recetas", "Recetas prácticas"],
      ["/prompts", "Buenos prompts"],
      ["/glosario", "Glosario"],
    ],
  },
  {
    title: "Potenciar",
    links: [
      ["/skills", "Skills"],
      ["/subagentes", "Subagentes"],
      ["/plugins", "Plugins"],
    ],
  },
  {
    title: "Ayuda",
    links: [
      ["/faq", "Preguntas frecuentes"],
      ["/problemas", "Solución de problemas"],
      ["/comandos", "Comandos"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/50 mt-12">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-400 hover:text-orange-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
              C
            </div>
            <span className="text-sm text-zinc-400">
              Aprende Claude Code · Guía en español
            </span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Guía educativa no oficial. Claude y Claude Code son productos de Anthropic.
            Verifica siempre las funciones con tu versión: <code className="text-zinc-500">claude --version</code>
          </p>
        </div>
      </div>
    </footer>
  );
}
