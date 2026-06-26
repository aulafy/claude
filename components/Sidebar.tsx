"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Inicio", icon: "⬡" },
  { href: "/instalacion", label: "Instalación", icon: "📦" },
  { href: "/primeros-pasos", label: "Primeros pasos", icon: "🚀" },
  { href: "/comandos", label: "Comandos", icon: "⌨️" },
  { href: "/configuracion", label: "Configuración", icon: "⚙️" },
  { href: "/mcp", label: "Servidores MCP", icon: "🔌" },
  { href: "/hooks", label: "Hooks", icon: "🪝" },
  { href: "/permisos", label: "Permisos", icon: "🔐" },
  { href: "/avanzado", label: "Uso avanzado", icon: "⚡" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed top-0 left-0 h-screen w-[260px] flex flex-col border-r border-zinc-800 bg-zinc-950 z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">C</div>
          <div>
            <div className="text-sm font-semibold text-white leading-tight">Claude Code</div>
            <div className="text-xs text-zinc-500">Guía en español</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors ${
                active
                  ? "bg-orange-500/15 text-orange-400 font-medium"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-zinc-800">
        <p className="text-xs text-zinc-600">Claude Code 2026 · Anthropic</p>
      </div>
    </aside>
  );
}
