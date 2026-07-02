import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aulafy — Cursos de Inteligencia Artificial en español",
  description:
    "Aprende a usar la IA y a construir tus propias aplicaciones con cursos prácticos en español, gratis y de código abierto. El primer curso es Claude Code.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aulafy — Cursos de IA en español",
    description:
      "De cero a construir tus propias herramientas de IA. Gratis y de código abierto.",
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
  { icon: "🧠", title: "IA local: tu IA privada", desc: "Ejecuta modelos en tu propio equipo con Ollama y LM Studio. Sin cuotas y sin enviar tus datos a la nube.", level: "Intermedio", status: "Disponible", statusColor: "text-[#22d3ee]" },
  { icon: "🎯", title: "Ingeniería de prompts", desc: "Escribe instrucciones que funcionan a la primera. La habilidad que multiplica todo lo demás.", level: "Todos los niveles", status: "Disponible", statusColor: "text-[#22d3ee]" },
  { icon: "🤖", title: "Agentes y automatización", desc: "Crea agentes que hacen tareas por ti y automatiza flujos repetitivos con IA.", level: "Intermedio", status: "Próximamente", statusColor: "text-[#e879f9]" },
  { icon: "📄", title: "Chatbots con tus documentos", desc: "Monta un asistente que responde citando tus PDF y datos (RAG), 100% local.", level: "Intermedio", status: "Próximamente", statusColor: "text-[#e879f9]" },
  { icon: "🎨", title: "IA generativa: imagen y voz", desc: "Genera imágenes, voz y vídeo con herramientas open source y en la nube.", level: "Principiante", status: "Próximamente", statusColor: "text-[#e879f9]" },
  { icon: "💼", title: "IA para tu trabajo", desc: "Aplica la IA a tareas reales de oficina, autónomos y pymes. Sin ser técnico.", level: "Principiante", status: "Próximamente", statusColor: "text-[#e879f9]" },
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
            <a href="#instructor" className="hover:text-white transition-colors">Instructor</a>
          </nav>
          <a href="#cursos" className="text-sm font-medium text-white px-4 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] hover:opacity-90 transition-opacity">Ver cursos</a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#a78bfa] bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-full px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
          Cursos de IA en español · Gratis y de código abierto
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl leading-tight text-white max-w-4xl mx-auto">
          Aprende a usar la IA<br /><span className="grad-text">y a construir con ella</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          De cero a crear tus propias herramientas de inteligencia artificial. Proyectos reales, sin humo, y muchos ejecutándose en <strong className="text-zinc-200">tu propio ordenador</strong>.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#cursos" className="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] hover:opacity-90 transition-opacity glow">Ver los cursos →</a>
          <a href="#curso-claude" className="px-6 py-3 rounded-xl font-medium text-zinc-200 glass hover:border-white/20 transition-colors">🔥 Empezar con Claude Code</a>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-zinc-500">
          <span>✓ Gratis para siempre</span>
          <span>✓ Código abierto</span>
          <span>✓ En español</span>
          <span>✓ Local-first y privado</span>
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
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-display font-bold text-2xl text-white">Claude Code, de 0 a pro</h3>
              <p className="mt-3 text-zinc-400 max-w-xl leading-relaxed">Aprende a construir software y aplicaciones hablando con la IA en tu terminal. Desde la instalación hasta skills, subagentes, MCP y flujos profesionales. Incluye el módulo <strong className="text-zinc-200">Claude Code + IA Local</strong>: apps que corren en tu ordenador.</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300">Nivel: principiante → avanzado</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300">Proyectos reales</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300">Guía + PDF</span>
              </div>
            </div>
            <div className="flex md:flex-col gap-3 md:w-48">
              <Link href="/guia" className="flex-1 text-center px-5 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] hover:opacity-90 transition-opacity">Ver el curso</Link>
              <a href="/guia-claude-code-vol2.pdf" className="flex-1 text-center px-5 py-3 rounded-xl font-medium text-zinc-200 glass hover:border-white/20 transition-colors">Descargar PDF</a>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cursos.map((c) => (
            <div key={c.title} className="glass rounded-2xl p-6 card-hover">
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="font-display font-semibold text-lg text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{c.desc}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>{c.level}</span><span className={c.statusColor}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Por qué */}
      <section id="porque" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display font-bold text-3xl text-white">Por qué Aulafy</h2>
          <p className="mt-3 text-zinc-400">Cursos hechos para que aprendas de verdad y salgas construyendo.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { e: "🇪🇸", t: "En español y claro", d: "Sin jerga innecesaria. Cada concepto explicado en cristiano." },
            { e: "🛠️", t: "Práctico, no teórico", d: "Terminas cada curso con proyectos reales funcionando." },
            { e: "🔒", t: "Local-first y privado", d: "Aprende a que tus datos no salgan de tu ordenador. Sin cuotas." },
            { e: "🔄", t: "Siempre al día", d: "Contenido actualizado con los últimos modelos y herramientas." },
          ].map((f) => (
            <div key={f.t} className="p-6">
              <div className="text-2xl mb-3">{f.e}</div>
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
            { n: "2", c: "#e879f9", t: "Construye paso a paso", d: "Te llevamos de la mano: entender → construir → ejecutar." },
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

      {/* Instructor */}
      <section id="instructor" className="max-w-6xl mx-auto px-6 py-16">
        <div className="glass rounded-2xl p-8 sm:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-center">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] flex items-center justify-center font-display font-extrabold text-4xl text-white mx-auto">RG</div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a78bfa] mb-2">Tu instructor</p>
            <h2 className="font-display font-bold text-2xl text-white">Ramón Guillamón</h2>
            <p className="text-sm text-zinc-500 mb-3">AI Automation Consultant</p>
            <p className="text-zinc-400 leading-relaxed max-w-2xl">Consultor de automatización con IA y autor de guías gratuitas que han ayudado a miles de personas a empezar con Claude Code y la IA local. En Aulafy comparte lo que funciona de verdad: nada de humo, solo proyectos que puedes construir hoy.</p>
            <div className="mt-4 flex items-center gap-4 text-zinc-500">
              <a href="https://www.linkedin.com/in/rguillamon/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
              </a>
              <a href="https://x.com/learntouseai" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gratis y open source */}
      <section id="opensource" className="max-w-4xl mx-auto px-6 py-20">
        <div className="glass rounded-3xl p-10 sm:p-14 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/20 rounded-full px-3 py-1 mb-6">⭐ 100% gratis · Código abierto</div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Gratis y de código abierto. Siempre.</h2>
          <p className="mt-4 text-zinc-400 leading-relaxed max-w-2xl mx-auto">Todos los cursos de Aulafy son <strong className="text-zinc-200">gratuitos para siempre</strong> y su contenido es <strong className="text-zinc-200">abierto</strong>. Sin muros de pago, sin cuotas y sin registro. Aprende, compártelo con quien quieras y empieza hoy mismo.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#cursos" className="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] hover:opacity-90 transition-opacity">Ver los cursos →</a>
            <Link href="/guia" className="px-6 py-3 rounded-xl font-medium text-zinc-200 glass hover:border-white/20 transition-colors">Empezar con Claude Code</Link>
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
          <div className="flex items-center gap-5 text-zinc-500">
            <a href="mailto:learntouseai@gmail.com" aria-label="Email" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </a>
            <a href="https://x.com/learntouseai" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/rguillamon/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
            </a>
          </div>
          <p className="text-xs text-zinc-600">© {year} Aulafy · Cursos de IA en español</p>
        </div>
      </footer>
    </div>
  );
}
