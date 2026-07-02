"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon, { type IconName } from "@/components/Icon";
import Search from "@/components/Search";
import ThemeToggle from "@/components/ThemeToggle";

type NavItem = {
  href: string;
  label: string;
  icon: IconName;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    title: "Empezar",
    items: [
      { href: "/guia", label: "Inicio de la guía", icon: "aulafy" },
      { href: "/instalacion", label: "Instalación", icon: "install" },
      { href: "/primeros-pasos", label: "Primeros pasos", icon: "rocket" },
      { href: "/donde-usar", label: "CLI, app y móvil", icon: "desktop" },
    ],
  },
  {
    title: "Práctica diaria",
    items: [
      { href: "/recetas", label: "Recetas prácticas", icon: "recipe" },
      { href: "/proyectos", label: "Proyectos guiados", icon: "hammer" },
      { href: "/prompts", label: "Escribir buenos prompts", icon: "prompt" },
      { href: "/glosario", label: "Glosario", icon: "book" },
    ],
  },
  {
    title: "Según tu perfil",
    items: [
      { href: "/pymes", label: "Pymes y oficina", icon: "building" },
      { href: "/equipos", label: "Perfiles técnicos", icon: "users" },
    ],
  },
  {
    title: "Extender Claude Code",
    items: [
      { href: "/skills", label: "Skills", icon: "grid" },
      { href: "/subagentes", label: "Subagentes", icon: "robot" },
      { href: "/plugins", label: "Plugins", icon: "plug" },
      { href: "/flujos", label: "Flujos de trabajo pro", icon: "route" },
    ],
  },
  {
    title: "Referencia",
    items: [
      { href: "/comandos", label: "Comandos", icon: "command" },
      { href: "/configuracion", label: "Configuración", icon: "gear" },
      { href: "/mcp", label: "Servidores MCP", icon: "link" },
      { href: "/hooks", label: "Hooks", icon: "hook" },
      { href: "/permisos", label: "Permisos", icon: "lock" },
      { href: "/avanzado", label: "Uso avanzado", icon: "advanced" },
    ],
  },
  {
    title: "Ayuda",
    items: [
      { href: "/faq", label: "Preguntas frecuentes", icon: "circleQuestion" },
      { href: "/problemas", label: "Solución de problemas", icon: "tools" },
      { href: "/recursos", label: "Recursos", icon: "book" },
      { href: "/comparativa", label: "Comparativa", icon: "compare" },
    ],
  },
  {
    title: "Volumen II · IA Local",
    items: [
      { href: "/volumen-2", label: "Presentación", icon: "brain" },
      { href: "/volumen-2/terminal", label: "La terminal (CLI)", icon: "terminal" },
      { href: "/volumen-2/proyectos", label: "Tus proyectos", icon: "folder" },
      { href: "/volumen-2/prompts", label: "Buenos encargos", icon: "prompt" },
      { href: "/volumen-2/ia-local", label: "IA local", icon: "brain" },
      { href: "/volumen-2/depurar", label: "Depurar y proteger", icon: "shield" },
      { href: "/volumen-2/chatbot-legal", label: "Chatbot legal (RAG)", icon: "legal" },
      { href: "/volumen-2/pdf", label: "Pregunta a tus PDF", icon: "pdf" },
      { href: "/volumen-2/voz", label: "Chatbot con voz", icon: "microphone" },
      { href: "/volumen-2/texto-a-audio", label: "Texto a audio", icon: "audio" },
      { href: "/volumen-2/simulaciones-3d", label: "Simulaciones 3D", icon: "cube" },
      { href: "/volumen-2/avatar", label: "Avatar que habla", icon: "userGraduate" },
      { href: "/volumen-2/wordpress", label: "Tema de WordPress", icon: "wordpress" },
      { href: "/volumen-2/landing", label: "Web en minutos", icon: "globe" },
      { href: "/volumen-2/facturacion", label: "Asistente autónomos", icon: "document" },
      { href: "/volumen-2/estudio", label: "App para estudiar", icon: "book" },
      { href: "/volumen-2/publicar", label: "Publicar en la red", icon: "rocket" },
      { href: "/volumen-2/cluster", label: "Clúster casero", icon: "network" },
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
        <Icon name={open ? "close" : "menu"} />
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
          <Link href="/guia" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">C</div>
            <div>
              <div className="text-sm font-semibold text-white leading-tight">Claude Code</div>
              <div className="text-xs text-zinc-500">Curso de Aulafy</div>
            </div>
          </Link>
        </div>

        {/* Buscador */}
        <div className="px-3 pt-3">
          <Search />
        </div>

        <div className="px-3 pt-3">
          <ThemeToggle />
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
                    <Icon name={item.icon} className="text-[0.95rem]" />
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
