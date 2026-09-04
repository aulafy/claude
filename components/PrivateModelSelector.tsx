"use client";

import { useMemo, useState } from "react";

type Task = "general" | "vision" | "code" | "simple";
type Context = "short" | "medium" | "long";
type Hardware = "consumer" | "workstation" | "server";

const selectClass = "h-11 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 text-sm text-white outline-none focus:border-cyan-400";

export default function PrivateModelSelector() {
  const [task, setTask] = useState<Task>("general");
  const [context, setContext] = useState<Context>("medium");
  const [hardware, setHardware] = useState<Hardware>("workstation");
  const [needsVision, setNeedsVision] = useState(false);
  const [strictPrivacy, setStrictPrivacy] = useState(true);

  const recommendation = useMemo(() => {
    if (task === "simple") {
      return {
        name: "Usa un modelo local más pequeño",
        tone: "text-amber-300",
        reason: "La clasificación, la extracción y los resúmenes breves rara vez justifican cargar un sistema de 180B o 284B. Un modelo de 7B-30B suele ser más barato, rápido y sencillo de operar.",
      };
    }
    if (hardware === "consumer") {
      return {
        name: strictPrivacy ? "Usa un modelo self-hosted más pequeño" : "Usa una API gestionada o un modelo local menor",
        tone: "text-amber-300",
        reason: "Ningún checkpoint completo encaja de forma práctica en una sola GPU de consumo. La cuantización y el offload permiten experimentar, pero no los convierten en modelos corrientes de portátil.",
      };
    }
    if (needsVision || task === "vision") {
      return {
        name: "Qwen3.8-Flash-Next",
        tone: "text-cyan-300",
        reason: "Qwen acepta texto, imágenes y vídeo, mientras el checkpoint estándar de DeepSeek V4 Flash solo acepta texto. Valida la cuantización y el flujo visual con tus propios documentos.",
      };
    }
    if (task === "code" || context === "long") {
      return {
        name: "DeepSeek V4 Flash 0731",
        tone: "text-emerald-300",
        reason: "DeepSeek está optimizado para agentes de código, publica mejores resultados de terminal y soporta flujos de hasta un millón de tokens. El modelo completo exige infraestructura de servidor seria.",
      };
    }
    return {
      name: "Evalúa ambos detrás de un router",
      tone: "text-fuchsia-300",
      reason: "Para texto general sin una modalidad o contexto decisivos, envía un conjunto representativo a ambos sistemas y elige por coste por tarea aceptada, latencia y tasa de fallos.",
    };
  }, [context, hardware, needsVision, strictPrivacy, task]);

  return (
    <section aria-labelledby="private-model-selector-title" className="not-prose my-12 border-y border-zinc-800 py-8">
      <p className="font-mono text-xs font-bold uppercase text-cyan-300">Selector interactivo</p>
      <h2 id="private-model-selector-title" className="mt-2 font-display text-2xl font-bold text-white">¿Qué despliegue deberías probar primero?</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">Es una preselección, no el resultado de un benchmark. Funciona por completo en tu navegador y mantiene visibles los criterios de decisión.</p>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_.8fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-zinc-200">
            Carga de trabajo principal
            <select value={task} onChange={(event) => setTask(event.target.value as Task)} className={selectClass}>
              <option value="general">Trabajo general de conocimiento</option>
              <option value="vision">Documentos y entrada visual</option>
              <option value="code">Código y agentes de terminal</option>
              <option value="simple">Extracción o clasificación</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-zinc-200">
            Contexto habitual
            <select value={context} onChange={(event) => setContext(event.target.value as Context)} className={selectClass}>
              <option value="short">Menos de 128K tokens</option>
              <option value="medium">De 128K a 256K tokens</option>
              <option value="long">Más de 256K tokens</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-zinc-200">
            Infraestructura disponible
            <select value={hardware} onChange={(event) => setHardware(event.target.value as Hardware)} className={selectClass}>
              <option value="consumer">Portátil o una GPU de consumo</option>
              <option value="workstation">Estación con mucha memoria</option>
              <option value="server">Servidor multi-GPU o clúster</option>
            </select>
          </label>
          <div className="grid content-start gap-4 pt-1 text-sm font-semibold text-zinc-200">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={needsVision} onChange={(event) => setNeedsVision(event.target.checked)} className="size-4 accent-cyan-400" />
              Necesito imágenes o vídeo
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={strictPrivacy} onChange={(event) => setStrictPrivacy(event.target.checked)} className="size-4 accent-cyan-400" />
              Los datos deben permanecer alojados localmente
            </label>
          </div>
        </div>

        <div aria-live="polite" className="self-start rounded-md border border-zinc-700 bg-zinc-950 p-5">
          <div className="text-xs font-semibold uppercase text-zinc-500">Primera prueba recomendada</div>
          <div className={`mt-2 font-display text-2xl font-bold ${recommendation.tone}`}>{recommendation.name}</div>
          <p className="mt-4 text-sm leading-6 text-zinc-300">{recommendation.reason}</p>
          <p className="mt-4 border-t border-zinc-800 pt-4 text-xs leading-5 text-zinc-500">Antes de producción, compara al menos 20 tareas representativas y registra calidad, latencia, memoria, energía, reintentos y revisión humana.</p>
        </div>
      </div>
    </section>
  );
}
