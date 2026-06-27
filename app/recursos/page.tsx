import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recursos — Aprende Claude Code",
  description:
    "Enlaces oficiales y de la comunidad para profundizar en Claude Code, Skills, MCP, cursos y tutoriales.",
};

const resourceSections = [
  {
    title: "Documentación oficial",
    links: [
      ["Quickstart oficial", "https://code.claude.com/docs/en/quickstart"],
      ["Documentación principal", "https://code.claude.com/docs"],
      ["Claude Code 101 (curso oficial Anthropic)", "https://anthropic.skilljar.com/claude-code-101"],
      [
        "Cómo usan Claude Code los equipos de Anthropic (PDF)",
        "https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf",
      ],
    ],
  },
  {
    title: "Skills",
    links: [
      [
        "Guía completa para crear Skills (PDF oficial Anthropic)",
        "https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf",
      ],
      ["Repositorio oficial de Skills (Anthropic)", "https://github.com/anthropics/skills"],
      ["Awesome Claude Skills (curado, +1000)", "https://github.com/ComposioHQ/awesome-claude-skills"],
      ["Colección de skills (337+)", "https://github.com/alirezarezvani/claude-skills"],
      ["superpowers (framework: convierte Claude Code en dev senior)", "https://github.com/obra/superpowers"],
      ["awesome-claude-code-toolkit (agentes + skills + hooks + MCP)", "https://github.com/rohitg00/awesome-claude-code-toolkit"],
      ["claude-mem", "https://github.com/thedotmack/claude-mem"],
      ["obsidian-skills", "https://github.com/kepano/obsidian-skills"],
    ],
  },
  {
    title: "Herramientas",
    links: [
      ["Repomix (empaqueta tu repo en un archivo para dar contexto)", "https://github.com/yamadashy/repomix"],
    ],
  },
  {
    title: "MCP (Model Context Protocol)",
    links: [
      ["Sitio oficial de MCP", "https://modelcontextprotocol.io/"],
      ["Repositorio oficial de servidores MCP", "https://github.com/modelcontextprotocol/servers"],
      ["GitHub MCP Server (el más usado)", "https://github.com/github/github-mcp-server"],
    ],
  },
  {
    title: "Cursos y tutoriales en español (YouTube)",
    links: [
      ["Claude Code 2026: Curso Completo (Benjamín Cordero)", "https://www.youtube.com/watch?v=73eFWU-edO4"],
      [
        "Claude Code Desde Cero, Curso Completo (Agustín Medina)",
        "https://www.youtube.com/playlist?list=PLwjjPKgjif66EDzC_QaRANOjwjo-mmJ7_",
      ],
      ["Claude Code: Curso Completo 2 Horas", "https://www.youtube.com/watch?v=K4e2l49RSrY"],
    ],
  },
  {
    title: "Tutoriales en inglés",
    links: [
      ["The Claude Code Handbook (FreeCodeCamp)", "https://www.freecodecamp.org/news/claude-code-handbook/"],
      ["Net Ninja – Claude Code (playlist)", "https://www.youtube.com/playlist?list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY"],
      ["Programming with Mosh – Claude Code", "https://www.youtube.com/watch?v=IuyVVtr1uhY"],
    ],
  },
];

const xAccounts = [
  ["@bcherny (creador de Claude Code)", "https://x.com/bcherny"],
  ["@trq212 (desarrollador de Claude Code)", "https://x.com/trq212"],
  ["@rubenhassid (guías gratuitas)", "https://x.com/rubenhassid"],
  ["@charliejhills (recopilaciones de skills)", "https://x.com/charliejhills"],
];

export default function Recursos() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Recursos</span>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">📚 Recursos</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Enlaces oficiales y de la comunidad, actualizados (2026), para profundizar
          en Claude Code.
        </p>
      </div>

      <div className="callout callout-info mb-8">
        <strong>Enlaces externos:</strong> estas páginas no dependen de esta guía y
        pueden cambiar, moverse o actualizarse con el tiempo.
      </div>

      {resourceSections.map((section) => (
        <div className="prose" key={section.title}>
          <h2>{section.title}</h2>
          <ul>
            {section.links.map(([label, href]) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="prose">
        <h2>Cuentas de X para estar al día</h2>
        <ul>
          {xAccounts.map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/problemas" className="text-sm text-zinc-500 hover:text-zinc-300">← Solución de problemas</Link>
        <Link href="/comparativa" className="text-sm text-orange-400 hover:text-orange-300">Comparativa →</Link>
      </div>
    </div>
  );
}
