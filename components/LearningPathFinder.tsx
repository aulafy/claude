"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/Icon";
import type { Locale } from "@/lib/i18n";
import { getPathRecommendation, type AdvisorGoal, type AdvisorProfile } from "@/lib/path-advisor";
import { LEARNING_PROGRESS_EVENT, readLearningProgress, setSelectedLearningPath } from "@/lib/learning-progress";
import { trackLearningEvent } from "@/lib/learning-events";

export type AdvisorPace = "sesion" | "constante" | "intensivo";
export type AdvisorSensitivity = "publico" | "interno" | "sensible";

type Option<T extends string> = { id: T; label: string; detail?: string };

const options: Record<Locale, { profiles: Option<AdvisorProfile>[]; goals: Option<AdvisorGoal>[]; paces: Option<AdvisorPace>[]; sensitivities: Option<AdvisorSensitivity>[] }> = {
  es: {
    profiles: [
      { id: "cero", label: "Empiezo desde cero", detail: "No programo o nunca he usado una herramienta de IA con autonomía." },
      { id: "trabajo", label: "Quiero aplicarla a mi trabajo", detail: "Busco ahorrar tiempo o resolver una necesidad real de mi actividad." },
      { id: "tecnico", label: "Tengo perfil técnico", detail: "Programo o administro sistemas y quiero construir con más rigor." },
    ],
    goals: [
      { id: "fundamentos", label: "Aprender a usar IA con criterio" }, { id: "web", label: "Crear una web o una demo SaaS" },
      { id: "trabajo", label: "Mejorar un proceso de trabajo" }, { id: "programar", label: "Programar con agentes de IA" }, { id: "sistemas", label: "Construir sistemas de IA" },
    ],
    paces: [
      { id: "sesion", label: "Solo quiero probar", detail: "Una primera sesión de 30–60 minutos." },
      { id: "constante", label: "2–4 horas por semana", detail: "Un ritmo sostenible junto al trabajo o los estudios." },
      { id: "intensivo", label: "5 horas o más", detail: "Quiero avanzar por proyectos varias veces por semana." },
    ],
    sensitivities: [
      { id: "publico", label: "Información pública o inventada", detail: "Puedo practicar sin datos reales ni confidenciales." },
      { id: "interno", label: "Documentos internos", detail: "No son públicos, aunque no contienen datos especialmente sensibles." },
      { id: "sensible", label: "Datos personales o críticos", detail: "Hay clientes, empleados, salud, finanzas, credenciales o sistemas esenciales." },
    ],
  },
  en: {
    profiles: [
      { id: "cero", label: "I am starting from zero", detail: "I do not code or have not used an autonomous AI tool." },
      { id: "trabajo", label: "I want to use AI at work", detail: "I need to save time or improve a real workflow." },
      { id: "tecnico", label: "I have a technical background", detail: "I code or operate systems and want a rigorous workflow." },
    ],
    goals: [
      { id: "fundamentos", label: "Use AI with sound judgement" }, { id: "web", label: "Create a website or SaaS demo" },
      { id: "trabajo", label: "Improve a work process" }, { id: "programar", label: "Program with AI agents" }, { id: "sistemas", label: "Build AI systems" },
    ],
    paces: [
      { id: "sesion", label: "I only want to try it", detail: "One initial 30–60 minute session." },
      { id: "constante", label: "2–4 hours per week", detail: "A sustainable pace around work or study." },
      { id: "intensivo", label: "5 hours or more", detail: "I want to progress through projects several times a week." },
    ],
    sensitivities: [
      { id: "publico", label: "Public or invented information", detail: "I can practise without real or confidential data." },
      { id: "interno", label: "Internal documents", detail: "They are not public, but do not contain highly sensitive information." },
      { id: "sensible", label: "Personal or critical data", detail: "Customers, employees, health, finance, credentials, or essential systems are involved." },
    ],
  },
};

const ui = {
  es: {
    eyebrow: "Orientador de un minuto", title: "Recibe un único primer paso", lead: "No es un examen ni pide datos personales. Las respuestas se quedan en este navegador.", answers: "respuestas",
    questions: ["1. ¿Desde dónde partes?", "2. ¿Qué quieres conseguir primero?", "3. ¿Qué ritmo es realista para ti?", "4. ¿Qué clase de datos tocaría tu proyecto?"],
    recommendation: "Tu recomendación", start: "Empieza por", firstWin: "Primer logro", pace: "Ritmo recomendado", data: "Límite de datos", startNow: "Empezar ahora", fullPath: "Ver la ruta completa", save: "Guardar como mi ruta", saved: "Guardada en Mi ruta", share: "Copiar enlace de la ruta", copied: "Enlace copiado", route: "Ruta sugerida", change: "Puedes cambiar cualquier respuesta; se actualiza al instante.",
  },
  en: {
    eyebrow: "One-minute path finder", title: "Get one clear first step", lead: "This is not a test and asks for no personal data. Your answers stay in this browser.", answers: "answers",
    questions: ["1. Where are you starting from?", "2. What do you want to achieve first?", "3. What pace is realistic?", "4. What kind of data would the project touch?"],
    recommendation: "Your recommendation", start: "Start with", firstWin: "First win", pace: "Recommended pace", data: "Data boundary", startNow: "Start now", fullPath: "View the full path", save: "Save as my path", saved: "Saved in My path", share: "Copy path link", copied: "Link copied", route: "Suggested path", change: "Change any answer to update the recommendation.",
  },
};

function ChoiceButton({ selected, onClick, label, detail }: { selected: boolean; onClick: () => void; label: string; detail?: string }) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={`min-h-16 rounded-lg border p-4 text-left transition-colors ${selected ? "border-cyan-400/70 bg-cyan-400/10 text-white" : "border-zinc-800 bg-zinc-950/45 text-zinc-300 hover:border-zinc-600"}`}><strong className="block text-sm">{label}</strong>{detail && <span className="mt-1.5 block text-xs leading-relaxed text-zinc-500">{detail}</span>}</button>;
}

export default function LearningPathFinder({ initialProfile, locale = "es" }: { initialProfile?: string; locale?: Locale }) {
  const text = ui[locale]; const available = options[locale];
  const [profile, setProfile] = useState<AdvisorProfile | null>(() => available.profiles.some((item) => item.id === initialProfile) ? initialProfile as AdvisorProfile : null);
  const [goal, setGoal] = useState<AdvisorGoal | null>(null); const [pace, setPace] = useState<AdvisorPace | null>(null); const [sensitivity, setSensitivity] = useState<AdvisorSensitivity | null>(null); const [copied, setCopied] = useState(false); const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const result = useMemo(() => profile && goal ? getPathRecommendation(profile, goal, locale) : null, [goal, locale, profile]);
  const completed = Number(Boolean(profile)) + Number(Boolean(goal)) + Number(Boolean(pace)) + Number(Boolean(sensitivity));
  const paceText = pace === "sesion" ? (locale === "en" ? "Complete only the first practice, then decide whether returning is worthwhile." : "Haz solo la primera práctica y decide después si merece la pena continuar.") : pace === "intensivo" ? (locale === "en" ? "Work in practice blocks and keep evidence: outputs, tests, and decisions." : "Trabaja por bloques y conserva resultados, pruebas y decisiones.") : (locale === "en" ? "Complete one or two lessons per session and repeat the practice before moving on." : "Completa una o dos lecciones por sesión y repite la práctica antes de avanzar.");
  const dataText = sensitivity === "publico" ? (locale === "en" ? "Practise with public or invented data and keep that boundary when trying new tools." : "Practica con datos públicos o inventados y conserva ese límite al probar herramientas.") : sensitivity === "interno" ? (locale === "en" ? "Use a synthetic copy first. Confirm provider retention and access rules before real internal documents." : "Usa primero una copia sintética. Confirma retención y accesos antes de usar documentos internos reales.") : (locale === "en" ? "Do not upload real data for the pilot. Use synthetic examples and complete the privacy step before connecting any system." : "No subas datos reales al piloto. Usa ejemplos sintéticos y completa el paso de privacidad antes de conectar sistemas.");
  const pathHref = result ? `${locale === "en" ? "/en/paths" : "/rutas"}?ruta=${result.pathSlug}#${result.pathSlug}` : "";
  useEffect(() => {
    const update = () => setSavedSlug(readLearningProgress()?.selectedPath?.locale === locale ? readLearningProgress()?.selectedPath?.slug ?? null : null);
    update(); window.addEventListener(LEARNING_PROGRESS_EVENT, update); window.addEventListener("storage", update);
    return () => { window.removeEventListener(LEARNING_PROGRESS_EVENT, update); window.removeEventListener("storage", update); };
  }, [locale]);
  async function copyPath() { if (!result) return; await navigator.clipboard.writeText(new URL(pathHref, window.location.origin).toString()); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
  function savePath() { if (!result) return; if (setSelectedLearningPath({ slug: result.pathSlug, title: result.pathTitle, href: pathHref, firstTitle: result.title, firstHref: result.href, locale })) trackLearningEvent("route_selected"); }
  const groups = [available.profiles, available.goals, available.paces, available.sensitivities] as const;
  return <section id="orientador" className="aula-frame mb-12 scroll-mt-24 p-6 sm:p-8" aria-labelledby="orientador-title">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><span className="aula-section-label"><Icon name="route" /> {text.eyebrow}</span><h2 id="orientador-title" className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">{text.title}</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">{text.lead}</p></div><span className="aula-chip" data-tone="cyan">{completed}/4 {text.answers}</span></div>
    <div className="mt-7 grid gap-7">
      <fieldset><legend className="font-display font-semibold text-white">{text.questions[0]}</legend><div className="mt-3 grid gap-3 md:grid-cols-3">{groups[0].map((item) => <ChoiceButton key={item.id} selected={profile === item.id} onClick={() => setProfile(item.id)} label={item.label} detail={item.detail} />)}</div></fieldset>
      {profile && <fieldset><legend className="font-display font-semibold text-white">{text.questions[1]}</legend><div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{groups[1].map((item) => <ChoiceButton key={item.id} selected={goal === item.id} onClick={() => setGoal(item.id)} label={item.label} />)}</div></fieldset>}
      {goal && <fieldset><legend className="font-display font-semibold text-white">{text.questions[2]}</legend><div className="mt-3 grid gap-3 md:grid-cols-3">{groups[2].map((item) => <ChoiceButton key={item.id} selected={pace === item.id} onClick={() => setPace(item.id)} label={item.label} detail={item.detail} />)}</div></fieldset>}
      {pace && <fieldset><legend className="font-display font-semibold text-white">{text.questions[3]}</legend><div className="mt-3 grid gap-3 md:grid-cols-3">{groups[3].map((item) => <ChoiceButton key={item.id} selected={sensitivity === item.id} onClick={() => setSensitivity(item.id)} label={item.label} detail={item.detail} />)}</div></fieldset>}
    </div>
    {result && pace && sensitivity && <div className="mt-8 rounded-lg border border-emerald-400/30 bg-emerald-400/8 p-5 sm:p-6" aria-live="polite"><span className="aula-section-label text-emerald-300"><Icon name="check" /> {text.recommendation}</span><h3 className="mt-3 font-display text-2xl font-bold text-white">{text.start} «{result.title}»</h3><p className="mt-3 max-w-3xl leading-relaxed text-zinc-300">{result.reason}</p><div className="mt-5 grid gap-3 lg:grid-cols-3"><ResultNote label={text.firstWin} text={result.firstWin} /><ResultNote label={text.pace} text={paceText} /><ResultNote label={text.data} text={dataText} warning={sensitivity === "sensible"} /></div><div className="mt-6 flex flex-wrap gap-3"><Link href={result.href} className="aula-button aula-button-primary"><Icon name="rocket" /> {text.startNow}</Link><button type="button" onClick={savePath} className="aula-button aula-button-secondary" aria-pressed={savedSlug === result.pathSlug}><Icon name={savedSlug === result.pathSlug ? "check" : "save"} /> {savedSlug === result.pathSlug ? text.saved : text.save}</button><Link href={pathHref} className="aula-button aula-button-secondary"><Icon name="route" /> {text.fullPath}</Link><button type="button" onClick={copyPath} className="aula-button aula-button-secondary"><Icon name={copied ? "check" : "link"} /> {copied ? text.copied : text.share}</button></div><p className="mt-4 text-xs leading-relaxed text-zinc-500">{text.route}: {result.pathTitle}. {text.change}</p></div>}
  </section>;
}

function ResultNote({ label, text, warning = false }: { label: string; text: string; warning?: boolean }) {
  return <div className={`rounded-md border p-4 ${warning ? "border-amber-400/40 bg-amber-400/8" : "border-zinc-800 bg-zinc-950/45"}`}><div className={`aula-meta ${warning ? "text-amber-300" : "text-zinc-500"}`}>{label}</div><p className="mt-2 text-sm leading-relaxed text-zinc-300">{text}</p></div>;
}
