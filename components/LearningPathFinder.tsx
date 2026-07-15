"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";

type Profile = "cero" | "trabajo" | "tecnico";
type Goal = "fundamentos" | "web" | "trabajo" | "programar" | "sistemas";
type Pace = "sesion" | "constante" | "intensivo";

const profiles: { id: Profile; label: string; detail: string }[] = [
  { id: "cero", label: "Empiezo desde cero", detail: "No programo o nunca he usado una herramienta de IA con autonomía." },
  { id: "trabajo", label: "Quiero aplicarla a mi trabajo", detail: "Busco ahorrar tiempo o resolver una necesidad real de mi actividad." },
  { id: "tecnico", label: "Tengo perfil técnico", detail: "Programo o administro sistemas y quiero construir con más rigor." },
];

const goals: { id: Goal; label: string }[] = [
  { id: "fundamentos", label: "Aprender a usar IA con criterio" },
  { id: "web", label: "Crear una web o una demo SaaS" },
  { id: "trabajo", label: "Mejorar un proceso de trabajo" },
  { id: "programar", label: "Programar con agentes de IA" },
  { id: "sistemas", label: "Construir sistemas de IA" },
];

const paces: { id: Pace; label: string; detail: string }[] = [
  { id: "sesion", label: "Solo quiero probar", detail: "Una primera sesión de 30–60 minutos." },
  { id: "constante", label: "2–4 horas por semana", detail: "Un ritmo sostenible junto al trabajo o los estudios." },
  { id: "intensivo", label: "5 horas o más", detail: "Quiero avanzar por proyectos y practicar varias veces por semana." },
];

const courses = {
  "codex-desde-cero": {
    title: "Codex desde cero",
    firstWin: "Trabajar en una carpeta de práctica y obtener un resultado verificable sin arriesgar tus originales.",
  },
  "crear-webs-con-ia": {
    title: "Crea webs profesionales con IA desde cero",
    firstWin: "Convertir una idea en un briefing comprobable y preparar un primer prototipo local.",
  },
  "ia-pymes": {
    title: "IA práctica para pymes",
    firstWin: "Elegir un proceso concreto, medir su coste actual y diseñar una mejora con revisión humana.",
  },
  "fundamentos-aulafy": {
    title: "Fundamentos para Aulafy",
    firstWin: "Preparar un entorno reproducible y entender qué hace cada herramienta antes de automatizar.",
  },
  "codex-programadores": {
    title: "Codex para programadores",
    firstWin: "Explorar un repositorio y convertir una petición en un cambio pequeño que pueda verificarse.",
  },
} as const;

type CourseSlug = keyof typeof courses;

function recommendation(profile: Profile, goal: Goal) {
  let pathSlug = "desde-cero";
  let pathTitle = "Empieza desde cero, sin programar";
  let courseSlug: CourseSlug = "codex-desde-cero";
  let reason = "Primero ganarás control sobre archivos, permisos y verificación; después podrás especializarte sin depender de recetas.";

  if (goal === "web") {
    pathSlug = "web-saas";
    pathTitle = "Crea una web o una demo SaaS";
    courseSlug = profile === "tecnico" ? "crear-webs-con-ia" : "codex-desde-cero";
    reason = profile === "tecnico"
      ? "Ya puedes entrar por el briefing, el prototipo y la revisión técnica de una web real."
      : "Empezarás con un entorno seguro y llegarás a la web con una base que evita copiar código sin entenderlo.";
  } else if (goal === "trabajo") {
    pathSlug = "negocio-creativo";
    pathTitle = "Aplica IA a tu trabajo o negocio";
    courseSlug = profile === "cero" ? "codex-desde-cero" : "ia-pymes";
    reason = profile === "cero"
      ? "Aprenderás a delegar tareas sin entregar el control de tus datos ni de tu equipo."
      : "Partirás de un proceso y una métrica reales, no de una herramienta elegida de antemano.";
  } else if (goal === "programar") {
    pathSlug = "programacion";
    pathTitle = "Programación con agentes de IA";
    courseSlug = profile === "tecnico" ? "codex-programadores" : profile === "cero" ? "codex-desde-cero" : "fundamentos-aulafy";
    reason = profile === "tecnico"
      ? "Entrarás directamente en el flujo repositorio → cambio → pruebas → revisión."
      : "Construirás primero la base necesaria para que el agente no oculte lo que ocurre en tu proyecto.";
  } else if (goal === "sistemas") {
    pathSlug = "sistemas";
    pathTitle = "Ingeniería de sistemas de IA";
    courseSlug = profile === "tecnico" ? "fundamentos-aulafy" : "codex-desde-cero";
    reason = profile === "tecnico"
      ? "Prepararás un entorno común antes de entrar en RAG, agentes, evaluación, observabilidad y operación."
      : "La ruta es viable, pero conviene aprender primero permisos, verificación y fundamentos técnicos sin saltos.";
  } else if (profile === "tecnico") {
    pathSlug = "programacion";
    pathTitle = "Programación con agentes de IA";
    courseSlug = "codex-programadores";
    reason = "Aprovecharás tu base técnica para aprender un flujo de agente verificable sin repetir conceptos introductorios.";
  } else if (profile === "trabajo") {
    pathSlug = "negocio-creativo";
    pathTitle = "Aplica IA a tu trabajo o negocio";
    courseSlug = "ia-pymes";
    reason = "Aprenderás a escoger una tarea rentable y segura antes de automatizarla.";
  }

  return { pathSlug, pathTitle, courseSlug, reason, ...courses[courseSlug] };
}

function ChoiceButton({ selected, onClick, label, detail }: { selected: boolean; onClick: () => void; label: string; detail?: string }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`min-h-16 rounded-lg border p-4 text-left transition-colors ${selected ? "border-cyan-400/70 bg-cyan-400/10 text-white" : "border-zinc-800 bg-zinc-950/45 text-zinc-300 hover:border-zinc-600"}`}
    >
      <strong className="block text-sm">{label}</strong>
      {detail && <span className="mt-1.5 block text-xs leading-relaxed text-zinc-500">{detail}</span>}
    </button>
  );
}

export default function LearningPathFinder({ initialProfile }: { initialProfile?: string }) {
  const [profile, setProfile] = useState<Profile | null>(() => profiles.some((item) => item.id === initialProfile) ? initialProfile as Profile : null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [pace, setPace] = useState<Pace | null>(null);

  const result = useMemo(() => profile && goal ? recommendation(profile, goal) : null, [profile, goal]);
  const completedSteps = Number(Boolean(profile)) + Number(Boolean(goal)) + Number(Boolean(pace));
  const paceText = pace === "sesion"
    ? "Haz solo la primera práctica. Si te resulta útil, vuelve y continúa sin ningún compromiso."
    : pace === "intensivo"
      ? "Trabaja por bloques de práctica y conserva evidencias: capturas, resultados, pruebas y decisiones."
      : "Completa una o dos lecciones por sesión y no avances hasta poder repetir la práctica sin copiarla.";

  return (
    <section id="orientador" className="aula-frame scroll-mt-24 p-6 sm:p-8 mb-12" aria-labelledby="orientador-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="aula-section-label"><Icon name="route" /> Orientador de 30 segundos</span>
          <h2 id="orientador-title" className="mt-3 font-display text-2xl sm:text-3xl font-bold text-white">Recibe un único primer paso</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">No es un examen ni pide datos personales. Tres respuestas bastan para recomendarte por dónde empezar hoy.</p>
        </div>
        <span className="aula-chip" data-tone="cyan">{completedSteps}/3 respuestas</span>
      </div>

      <div className="mt-7 grid gap-7">
        <fieldset>
          <legend className="font-display font-semibold text-white">1. ¿Desde dónde partes?</legend>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {profiles.map((item) => <ChoiceButton key={item.id} selected={profile === item.id} onClick={() => setProfile(item.id)} label={item.label} detail={item.detail} />)}
          </div>
        </fieldset>

        {profile && (
          <fieldset>
            <legend className="font-display font-semibold text-white">2. ¿Qué quieres conseguir primero?</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {goals.map((item) => <ChoiceButton key={item.id} selected={goal === item.id} onClick={() => setGoal(item.id)} label={item.label} />)}
            </div>
          </fieldset>
        )}

        {goal && (
          <fieldset>
            <legend className="font-display font-semibold text-white">3. ¿Qué ritmo es realista para ti?</legend>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {paces.map((item) => <ChoiceButton key={item.id} selected={pace === item.id} onClick={() => setPace(item.id)} label={item.label} detail={item.detail} />)}
            </div>
          </fieldset>
        )}
      </div>

      {result && pace && (
        <div className="mt-8 rounded-lg border border-emerald-400/30 bg-emerald-400/8 p-5 sm:p-6" aria-live="polite">
          <span className="aula-section-label text-emerald-300"><Icon name="check" /> Tu recomendación</span>
          <h3 className="mt-3 font-display text-2xl font-bold text-white">Empieza por «{result.title}»</h3>
          <p className="mt-3 max-w-3xl text-zinc-300 leading-relaxed">{result.reason}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-zinc-800 bg-zinc-950/45 p-4">
              <div className="aula-meta text-zinc-500">Primer logro</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{result.firstWin}</p>
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-950/45 p-4">
              <div className="aula-meta text-zinc-500">Ritmo recomendado</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{paceText}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/cursos/${result.courseSlug}`} className="aula-button aula-button-primary"><Icon name="rocket" /> Empezar ahora</Link>
            <a href={`#${result.pathSlug}`} className="aula-button aula-button-secondary"><Icon name="route" /> Ver la ruta completa</a>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-zinc-500">Ruta sugerida: {result.pathTitle}. Puedes cambiar cualquier respuesta; la recomendación se actualiza al instante.</p>
        </div>
      )}
    </section>
  );
}
