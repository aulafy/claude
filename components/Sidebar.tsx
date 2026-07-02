"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Search from "@/components/Search";

const sections = [
  {
    title: "Empezar",
    items: [
      { href: "/", label: "Inicio", icon: "⬡" },
      { href: "/instalacion", label: "Instalación", icon: "📦" },
      { href: "/primeros-pasos", label: "Primeros pasos", icon: "🚀" },
      { href: "/donde-usar", label: "CLI, app y móvil", icon: "🖥️" },
    ],
  },
  {
    title: "Práctica diaria",
    items: [
      { href: "/recetas", label: "Recetas prácticas", icon: "🍳" },
      { href: "/proyectos", label: "Proyectos guiados", icon: "🏗️" },
      { href: "/prompts", label: "Escribir buenos prompts", icon: "🎯" },
      { href: "/glosario", label: "Glosario", icon: "📖" },
    ],
  },
  {
    title: "Según tu perfil",
    items: [
      { href: "/pymes", label: "Pymes y oficina", icon: "🏢" },
      { href: "/equipos", label: "Perfiles técnicos", icon: "🧑‍💻" },
    ],
  },
  {
    title: "Extender Claude Code",
    items: [
      { href: "/skills", label: "Skills", icon: "🧩" },
      { href: "/subagentes", label: "Subagentes", icon: "🤖" },
      { href: "/plugins", label: "Plugins", icon: "🔌" },
      { href: "/flujos", label: "Flujos de trabajo pro", icon: "🧭" },
    ],
  },
  {
    title: "Referencia",
    items: [
      { href: "/comandos", label: "Comandos", icon: "⌨️" },
      { href: "/configuracion", label: "Configuración", icon: "⚙️" },
      { href: "/mcp", label: "Servidores MCP", icon: "🔗" },
      { href: "/hooks", label: "Hooks", icon: "🪝" },
      { href: "/permisos", label: "Permisos", icon: "🔐" },
      { href: "/avanzado", label: "Uso avanzado", icon: "⚡" },
    ],
  },
  {
    title: "Ayuda",
    items: [
      { href: "/faq", label: "Preguntas frecuentes", icon: "❓" },
      { href: "/problemas", label: "Solución de problemas", icon: "🔧" },
      { href: "/recursos", label: "Recursos", icon: "📚" },
      { href: "/comparativa", label: "Comparativa", icon: "🆚" },
    ],
  },
  {
    title: "Volumen II · IA Local",
    items: [
      { href: "/volumen-2", label: "Presentación", icon: "🧠" },
      { href: "/volumen-2/terminal", label: "La terminal (CLI)", icon: "⌨️" },
      { href: "/volumen-2/proyectos", label: "Tus proyectos", icon: "🗂️" },
      { href: "/volumen-2/prompts", label: "Buenos encargos", icon: "🎯" },
      { href: "/volumen-2/ia-local", label: "IA local", icon: "🧠" },
      { href: "/volumen-2/depurar", label: "Depurar y proteger", icon: "🛟" },
      { href: "/volumen-2/chatbot-legal", label: "Chatbot legal (RAG)", icon: "⚖️" },
      { href: "/volumen-2/pdf", label: "Pregunta a tus PDF", icon: "📄" },
      { href: "/volumen-2/voz", label: "Chatbot con voz", icon: "🎙️" },
      { href: "/volumen-2/texto-a-audio", label: "Texto a audio", icon: "🔊" },
      { href: "/volumen-2/simulaciones-3d", label: "Simulaciones 3D", icon: "🪐" },
      { href: "/volumen-2/avatar", label: "Avatar que habla", icon: "🧑‍🏫" },
      { href: "/volumen-2/wordpress", label: "Tema de WordPress", icon: "🎨" },
      { href: "/volumen-2/landing", label: "Web en minutos", icon: "🌐" },
      { href: "/volumen-2/facturacion", label: "Asistente autónomos", icon: "🧾" },
      { href: "/volumen-2/estudio", label: "App para estudiar", icon: "📚" },
      { href: "/volumen-2/publicar", label: "Publicar en la red", icon: "🚀" },
      { href: "/volumen-2/cluster", label: "Clúster casero", icon: "🖧" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200"
        aria-label="Menú"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Backdrop on mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] flex flex-col border-r border-zinc-800 bg-zinc-950 z-40 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-zinc-800">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">C</div>
            <div>
              <div className="text-sm font-semibold text-white leading-tight">Claude Code</div>
              <div className="text-xs text-zinc-500">Guía en español</div>
            </div>
          </Link>
        </div>

        {/* Buscador */}
        <div className="px-3 pt-3">
          <Search />
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {sections.map((section) => (
            <div key={section.title} className="mb-5">
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                {section.title}
              </p>
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
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
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-600">Claude Code 2026 · Anthropic</p>
        </div>
      </aside>
    </>
  );
}
