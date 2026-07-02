import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Aulafy — Cursos de IA open source en español",
  description:
    "Cursos gratuitos de inteligencia artificial open source en español: IA local, Claude Code, RAG, prompts, automatización y proyectos prácticos paso a paso.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aulafy — Cursos de IA open source en español",
    description:
      "Tutoriales prácticos para aprender IA local, Claude Code, RAG, prompts y automatización. Gratis, en español y de código abierto.",
    type: "website",
    locale: "es_ES",
    url: "/",
  },
};

function BrandIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="0.52" stopColor="#e879f9" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="116" fill={`url(#${id})`} />
      <g fill="none" stroke="#fff" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round">
        <path d="M256 132 L150 380" />
        <path d="M256 132 L362 380" />
        <path d="M198 300 L314 300" />
      </g>
      <circle cx="256" cy="120" r="15" fill="#fff" />
    </svg>
  );
}

const cursos = [
  { icon: "brain", title: "IA local: tu IA privada", desc: "Ejecuta modelos en tu propio equipo con Ollama y LM Studio. Sin cuotas y sin enviar tus datos a la nube.", level: "Intermedio", status: "Disponible", statusColor: "text-[#22d3ee]", href: "/cursos/ia-local/ia-local" },
  { icon: "prompt", title: "Ingeniería de prompts", desc: "Escribe instrucciones que funcionan a la primera. La habilidad que multiplica todo lo demás.", level: "Todos los niveles", status: "Disponible", statusColor: "text-[#22d3ee]", href: "/cursos/claude-code/prompts" },
  { icon: "robot", title: "Agentes y automatización", desc: "Crea agentes que hacen tareas por ti y automatiza flujos repetitivos con IA.", level: "Intermedio", status: "Disponible", statusColor: "text-[#22d3ee]", href: "/cursos/agentes-automatizacion" },
  { icon: "network", title: "Agentes en producción", desc: "LangGraph, n8n, herramientas, aprobaciones humanas, logs y seguridad para flujos reales.", level: "Intermedio", status: "Nuevo", statusColor: "text-[#10b981]", href: "/cursos/agentes-produccion" },
  { icon: "database", title: "RAG avanzado y seguro", desc: "Chatbots con documentos privados, citaciones, búsqueda híbrida, evals y defensa ante prompt injection.", level: "Intermedio", status: "Nuevo", statusColor: "text-[#10b981]", href: "/cursos/rag-seguro" },
  { icon: "palette", title: "IA generativa: imagen y voz", desc: "Genera imágenes, voz y vídeo con herramientas open source y en la nube.", level: "Principiante", status: "Disponible", statusColor: "text-[#22d3ee]", href: "/cursos/ia-local/texto-a-audio" },
  { icon: "briefcase", title: "IA para tu trabajo", desc: "Aplica la IA a tareas reales de oficina, autónomos y pymes. Sin ser técnico.", level: "Principiante", status: "Disponible", statusColor: "text-[#22d3ee]", href: "/cursos/claude-code/pymes" },
] satisfies Array<{
  icon: IconName;
  title: string;
  desc: string;
  level: string;
  status: string;
  statusColor: string;
  href?: string;
}>;

const rutas = [
  {
    title: "Empieza desde cero",
    desc: "Instala Claude Code, aprende a pedir bien y crea tus primeros proyectos guiados.",
    href: "/cursos/claude-code/instalacion",
    steps: ["Instalación", "Primeros pasos", "Proyectos guiados"],
  },
  {
    title: "Construye con IA local",
    desc: "Monta apps con modelos en tu ordenador: RAG, PDF, voz y herramientas privadas.",
    href: "/cursos/ia-local",
    steps: ["IA local", "PDF y RAG", "Voz y audio"],
  },
  {
    title: "Llévalo a tu trabajo",
    desc: "Automatiza tareas de oficina, documentos, informes y flujos de equipo con IA.",
    href: "/cursos/claude-code/pymes",
    steps: ["Pymes", "Recetas", "Flujos pro"],
  },
];

const metodo = [
  {
    icon: "capsule" as IconName,
    title: "Cápsulas reutilizables",
    desc: "Cada lección funciona como una cápsula: objetivo claro, entrada, práctica guiada y resultado que puedes adaptar.",
  },
  {
    icon: "experiment" as IconName,
    title: "Experimentos reproducibles",
    desc: "Configuración, ejecución y evidencia quedan explícitas para que puedas repetir, comparar y mejorar sin perder el hilo.",
  },
  {
    icon: "terminal" as IconName,
    title: "Salida práctica",
    desc: "No termina en teoría: cada módulo te deja prompts, comandos, archivos o una miniapp funcionando en tu máquina.",
  },
];

const ventajas = [
  { icon: "globe" as IconName, t: "En español y claro", d: "Sin jerga innecesaria. Cada concepto explicado en cristiano." },
  { icon: "tools" as IconName, t: "Práctico, no teórico", d: "Terminas cada curso con proyectos reales funcionando." },
  { icon: "lock" as IconName, t: "Local-first y privado", d: "Aprende a que tus datos no salgan de tu ordenador. Sin cuotas." },
  { icon: "recycle" as IconName, t: "Siempre al día", d: "Contenido actualizado con los últimos modelos y herramientas." },
];

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <div className="relative bg-[#0a0a12] text-zinc-200 min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 aurora" />

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a12]/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5" aria-label="Aulafy — inicio">
            <BrandIcon id="lg-nav" className="w-8 h-8" />
            <span className="font-display font-bold text-white text-lg">Aulafy</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#cursos" className="hover:text-white transition-colors">Cursos</a>
            <a href="#porque" className="hover:text-white transition-colors">Por qué Aulafy</a>
            <a href="#como" className="hover:text-white transition-colors">Cómo funciona</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle compact />
            <a href="#cursos" className="inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] hover:opacity-90 transition-opacity">
              <Icon name="book" />
              Ver cursos
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#a78bfa] bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-full px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
          Cursos de IA open source en español · Gratis y prácticos
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl leading-tight text-white max-w-4xl mx-auto">
          Aprende a usar la IA<br /><span className="grad-text">y a construir con ella</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          De cero a crear tus propias herramientas de inteligencia artificial. Tutoriales de IA local, RAG, prompts y automatización, con proyectos reales y muchos ejecutándose en <strong className="text-zinc-200">tu propio ordenador</strong>.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#cursos" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] hover:opacity-90 transition-opacity glow">
            <Icon name="book" />
            Ver los cursos
          </a>
          <a href="#curso-claude" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-zinc-200 glass hover:border-white/20 transition-colors">
            <Icon name="terminal" />
            Empezar con Claude Code
          </a>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-zinc-500">
          {["Gratis para siempre", "Código abierto", "En español", "Local-first y privado"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <Icon name="check" className="text-[#22d3ee]" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Rutas */}
      <section id="rutas" className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8 text-center">
          <h2 className="font-display font-bold text-3xl text-white">Elige tu ruta</h2>
          <p className="mt-3 text-zinc-400">Aprende en orden, con práctica desde el primer día.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {rutas.map((ruta) => (
            <Link
              key={ruta.title}
              href={ruta.href}
              className="glass rounded-2xl p-6 card-hover block"
            >
              <h3 className="font-display font-semibold text-lg text-white">{ruta.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{ruta.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {ruta.steps.map((step) => (
                  <span key={step} className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-zinc-300">
                    {step}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Método */}
      <section id="metodo" className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="font-display font-bold text-3xl text-white">Método Aulafy</h2>
          <p className="mt-3 text-zinc-400">
            Inspirado en las cápsulas de HubLab y en la disciplina de experimentos reproducibles de Sacred.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {metodo.map((item) => (
            <div key={item.title} className="glass rounded-2xl p-6">
              <Icon name={item.icon} className="text-2xl text-[#22d3ee] mb-4" />
              <h3 className="font-display font-semibold text-lg text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cursos */}
      <section id="cursos" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display font-bold text-3xl text-white">Nuestros cursos</h2>
          <p className="mt-3 text-zinc-400">Rutas prácticas para pasar de curioso a construir de verdad.</p>
        </div>

        {/* Destacado */}
        <div id="curso-claude" className="glass rounded-2xl p-8 mb-8 relative overflow-hidden card-hover">
          <div className="absolute top-5 right-5 text-xs font-semibold text-[#0a0a12] bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] px-3 py-1 rounded-full">MÁS POPULAR</div>
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <Icon name="advanced" className="text-4xl mb-3 text-[#22d3ee]" />
              <h3 className="font-display font-bold text-2xl text-white">Claude Code, de 0 a pro</h3>
              <p className="mt-3 text-zinc-400 max-w-xl leading-relaxed">Aprende a construir software y aplicaciones hablando con la IA en tu terminal. Desde la instalación hasta skills, subagentes, MCP y flujos profesionales. Incluye el módulo <strong className="text-zinc-200">Claude Code + IA Local</strong>: apps que corren en tu ordenador.</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300">Nivel: de principiante a avanzado</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300">Proyectos reales</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300">Guía + PDF</span>
              </div>
            </div>
            <div className="flex md:flex-col gap-3 md:w-48">
              <Link href="/cursos/claude-code" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] hover:opacity-90 transition-opacity">
                <Icon name="book" />
                Ver el curso
              </Link>
              <a href="/guia-claude-code-vol2.pdf" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-zinc-200 glass hover:border-white/20 transition-colors">
                <Icon name="filePdf" />
                Descargar PDF
              </a>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cursos.map((c) => {
            const content = (
              <>
              <Icon name={c.icon} className="text-3xl mb-3 text-[#22d3ee]" />
              <h3 className="font-display font-semibold text-lg text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{c.desc}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>{c.level}</span>
                <span className={c.statusColor}>{c.status}</span>
              </div>
              </>
            );

            return c.href ? (
              <Link key={c.title} href={c.href} className="glass rounded-2xl p-6 card-hover block">
                {content}
              </Link>
            ) : (
              <div key={c.title} className="glass rounded-2xl p-6">
                {content}
              </div>
            );
          })}
        </div>
      </section>

      {/* Por qué */}
      <section id="porque" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display font-bold text-3xl text-white">Por qué Aulafy</h2>
          <p className="mt-3 text-zinc-400">Cursos hechos para que aprendas de verdad y salgas construyendo.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ventajas.map((f) => (
            <div key={f.t} className="p-6">
              <Icon name={f.icon} className="text-2xl mb-3 text-[#22d3ee]" />
              <h3 className="font-display font-semibold text-white mb-1">{f.t}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display font-bold text-3xl text-white">Cómo funciona</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { n: "1", c: "#8b5cf6", t: "Elige tu curso", d: "Empieza por donde estés. No necesitas conocimientos previos." },
            { n: "2", c: "#e879f9", t: "Construye paso a paso", d: "Te llevamos de la mano: entender, construir y ejecutar." },
            { n: "3", c: "#22d3ee", t: "Aplícalo a lo tuyo", d: "Lleva lo aprendido a tu trabajo, tus estudios o tu negocio." },
          ].map((s) => (
            <div key={s.n} className="glass rounded-2xl p-7 text-center">
              <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-display font-bold mb-4" style={{ background: `${s.c}22`, border: `1px solid ${s.c}66`, color: s.c }}>{s.n}</div>
              <h3 className="font-display font-semibold text-white mb-2">{s.t}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gratis y open source */}
      <section id="opensource" className="max-w-4xl mx-auto px-6 py-20">
        <div className="glass rounded-3xl p-10 sm:p-14 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/20 rounded-full px-3 py-1 mb-6">
            <Icon name="star" />
            100% gratis · Código abierto
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Gratis y de código abierto. Siempre.</h2>
          <p className="mt-4 text-zinc-400 leading-relaxed max-w-2xl mx-auto">Todos los cursos de Aulafy son <strong className="text-zinc-200">gratuitos para siempre</strong> y su contenido es <strong className="text-zinc-200">abierto</strong>. Sin muros de pago, sin cuotas y sin registro. Aprende, compártelo con quien quieras y empieza hoy mismo.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#cursos" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] hover:opacity-90 transition-opacity">
              <Icon name="book" />
              Ver los cursos
            </a>
            <Link href="/cursos/claude-code" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-zinc-200 glass hover:border-white/20 transition-colors">
              <Icon name="terminal" />
              Empezar con Claude Code
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2.5">
            <BrandIcon id="lg-foot" className="w-7 h-7" />
            <span className="text-sm text-zinc-400">Aulafy · Cursos de IA en español</span>
          </a>
          <div className="flex flex-wrap items-center justify-center gap-5 text-zinc-500">
            <Link href="/cursos/claude-code" className="text-xs hover:text-white transition-colors">
              Guía
            </Link>
            <Link href="/aviso-legal" className="text-xs hover:text-white transition-colors">
              Aviso legal
            </Link>
            <Link href="/licencia" className="text-xs hover:text-white transition-colors">
              Licencia
            </Link>
            <Link href="/privacidad" className="text-xs hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/cookies" className="text-xs hover:text-white transition-colors">
              Cookies
            </Link>
            <a
              href="https://github.com/raym33/claude"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-white transition-colors"
            >
              Código
            </a>
            <a href="mailto:contacto@aulafy.net" aria-label="Email" className="hover:text-white transition-colors">
              <Icon name="email" className="text-lg" />
            </a>
            <a href="https://x.com/learntouseai" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-white transition-colors">
              <Icon name="xTwitter" family="brands" className="text-lg" />
            </a>
            <a href="https://www.linkedin.com/in/rguillamon/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <Icon name="linkedin" family="brands" className="text-lg" />
            </a>
          </div>
          <p className="text-xs text-zinc-600">© {year} Aulafy · Contenido CC BY 4.0 · Código MIT</p>
        </div>
      </footer>
    </div>
  );
}
