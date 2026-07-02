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
  {
    title: "Legal",
    links: [
      ["/licencia", "Licencia"],
      ["/privacidad", "Privacidad"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/50 mt-12">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-10">
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

          {/* Redes del autor */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:learntouseai@gmail.com"
              aria-label="Enviar un email"
              className="text-zinc-500 hover:text-orange-400 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a
              href="https://x.com/learntouseai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-zinc-500 hover:text-orange-400 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/rguillamon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-500 hover:text-orange-400 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="https://github.com/raym33/claude"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Codigo fuente en GitHub"
              className="text-zinc-500 hover:text-orange-400 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.59 2 12.253c0 4.529 2.865 8.371 6.839 9.727.5.095.683-.222.683-.493 0-.244-.009-.89-.014-1.747-2.782.62-3.369-1.375-3.369-1.375-.455-1.185-1.11-1.5-1.11-1.5-.908-.637.069-.624.069-.624 1.004.073 1.532 1.057 1.532 1.057.892 1.566 2.341 1.114 2.91.852.091-.663.349-1.114.635-1.37-2.221-.26-4.555-1.139-4.555-5.068 0-1.12.39-2.036 1.03-2.753-.104-.26-.447-1.305.098-2.718 0 0 .84-.276 2.75 1.052A9.382 9.382 0 0 1 12 6.966c.85.004 1.705.118 2.504.346 1.909-1.328 2.747-1.052 2.747-1.052.546 1.413.203 2.458.1 2.718.64.717 1.028 1.633 1.028 2.753 0 3.939-2.337 4.805-4.566 5.06.359.318.679.944.679 1.902 0 1.373-.012 2.48-.012 2.817 0 .274.18.593.688.492C19.138 20.62 22 16.78 22 12.253 22 6.59 17.523 2 12 2z" />
              </svg>
            </a>
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
