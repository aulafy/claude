"use client";

import { useMemo, useState } from "react";

type FieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
};

function NumberField({ label, value, onChange, min = 0, max, step = 1, suffix }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-zinc-200">
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Math.max(min, Number(event.target.value) || 0))}
          className="h-11 min-w-0 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 font-mono text-sm text-white outline-none focus:border-cyan-400"
        />
        {suffix ? <span className="min-w-12 text-xs text-zinc-500">{suffix}</span> : null}
      </span>
    </label>
  );
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: value < 1 ? 4 : 2 }).format(value);
}

export default function AiCostCalculator() {
  const [inputTokens, setInputTokens] = useState(100_000);
  const [cachedTokens, setCachedTokens] = useState(400_000);
  const [outputTokens, setOutputTokens] = useState(30_000);
  const [inputPrice, setInputPrice] = useState(10);
  const [cachePrice, setCachePrice] = useState(1);
  const [outputPrice, setOutputPrice] = useState(50);
  const [toolCost, setToolCost] = useState(0.25);
  const [successRate, setSuccessRate] = useState(80);
  const [acceptanceRate, setAcceptanceRate] = useState(70);
  const [reviewMinutes, setReviewMinutes] = useState(3);
  const [hourlyCost, setHourlyCost] = useState(60);

  const result = useMemo(() => {
    const model = (inputTokens / 1_000_000) * inputPrice
      + (cachedTokens / 1_000_000) * cachePrice
      + (outputTokens / 1_000_000) * outputPrice
      + toolCost;
    const review = (reviewMinutes / 60) * hourlyCost;
    return {
      model,
      review,
      successful: model / Math.max(successRate / 100, 0.01),
      accepted: (model + review) / Math.max(acceptanceRate / 100, 0.01),
    };
  }, [acceptanceRate, cachePrice, cachedTokens, hourlyCost, inputPrice, inputTokens, outputPrice, outputTokens, reviewMinutes, successRate, toolCost]);

  return (
    <section aria-labelledby="ai-cost-calculator-title" className="not-prose my-12 border-y border-zinc-800 py-8">
      <div className="mb-6">
        <p className="font-mono text-xs font-bold uppercase text-cyan-300">Interactive calculator</p>
        <h2 id="ai-cost-calculator-title" className="mt-2 font-display text-2xl font-bold text-white">Calculate cost per accepted AI result</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">Enter averages from one workflow. Prices are per million tokens. The calculator runs locally in your browser and does not send these values anywhere.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.35fr_.65fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField label="Uncached input tokens" value={inputTokens} onChange={setInputTokens} step={1000} suffix="tokens" />
          <NumberField label="Cached input tokens" value={cachedTokens} onChange={setCachedTokens} step={1000} suffix="tokens" />
          <NumberField label="Output tokens" value={outputTokens} onChange={setOutputTokens} step={1000} suffix="tokens" />
          <NumberField label="Other tool cost per run" value={toolCost} onChange={setToolCost} step={0.01} suffix="USD" />
          <NumberField label="Input price" value={inputPrice} onChange={setInputPrice} step={0.01} suffix="$/1M" />
          <NumberField label="Cache-read price" value={cachePrice} onChange={setCachePrice} step={0.01} suffix="$/1M" />
          <NumberField label="Output price" value={outputPrice} onChange={setOutputPrice} step={0.01} suffix="$/1M" />
          <NumberField label="Successful runs" value={successRate} onChange={setSuccessRate} min={1} max={100} suffix="%" />
          <NumberField label="Accepted outputs" value={acceptanceRate} onChange={setAcceptanceRate} min={1} max={100} suffix="%" />
          <NumberField label="Human review per run" value={reviewMinutes} onChange={setReviewMinutes} step={0.5} suffix="min" />
          <NumberField label="Reviewer cost" value={hourlyCost} onChange={setHourlyCost} step={1} suffix="$/h" />
        </div>

        <div aria-live="polite" className="grid content-start gap-3">
          <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
            <div className="text-xs font-semibold uppercase text-zinc-500">Model + tools per run</div>
            <div className="mt-2 font-mono text-2xl font-bold text-white">{money(result.model)}</div>
          </div>
          <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
            <div className="text-xs font-semibold uppercase text-zinc-500">AI + tools per success</div>
            <div className="mt-2 font-mono text-2xl font-bold text-cyan-300">{money(result.successful)}</div>
          </div>
          <div className="rounded-md border border-emerald-400/30 bg-emerald-400/5 p-4">
            <div className="text-xs font-semibold uppercase text-emerald-300">Operational cost per accepted result</div>
            <div className="mt-2 font-mono text-3xl font-bold text-emerald-300">{money(result.accepted)}</div>
            <p className="mt-3 text-xs leading-5 text-zinc-400">Includes {money(result.review)} of human review per run and divides total operational spend by the acceptance rate.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
