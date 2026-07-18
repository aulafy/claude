"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";

export type KnowledgeCheckQuestion = {
  prompt: string;
  options: readonly string[];
  correct: number;
  explanation: string;
};

type KnowledgeCheckProps = {
  eyebrow: string;
  title: string;
  description: string;
  questions: readonly KnowledgeCheckQuestion[];
  successTitle: string;
  successDescription: string;
  developingTitle: string;
  developingDescription: string;
  primaryHref: string;
  primaryLabel: string;
  advancedHref?: string;
  advancedLabel?: string;
};

export default function KnowledgeCheck({
  eyebrow,
  title,
  description,
  questions,
  successTitle,
  successDescription,
  developingTitle,
  developingDescription,
  primaryHref,
  primaryLabel,
  advancedHref,
  advancedLabel,
}: KnowledgeCheckProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answered = Object.keys(answers).length;
  const score = useMemo(
    () => questions.reduce((sum, question, index) => sum + Number(answers[index] === question.correct), 0),
    [answers, questions],
  );
  const complete = answered === questions.length;
  const advanced = score === questions.length;
  const destination = advanced && advancedHref ? advancedHref : primaryHref;
  const destinationLabel = advanced && advancedLabel ? advancedLabel : primaryLabel;

  return (
    <section className="aula-panel p-6 sm:p-8 mb-12" aria-labelledby="knowledge-check-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="aula-section-label"><Icon name="listCheck" /> {eyebrow}</span>
          <h2 id="knowledge-check-title" className="mt-3 font-display text-2xl font-bold text-white">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">{description}</p>
        </div>
        <span className="aula-chip" data-tone="cyan">{answered}/{questions.length}</span>
      </div>

      <div className="mt-7 grid gap-6">
        {questions.map((question, questionIndex) => {
          const selected = answers[questionIndex];
          const hasAnswer = selected !== undefined;
          const isCorrect = selected === question.correct;
          return (
            <fieldset key={question.prompt} className="rounded-lg border border-zinc-800 bg-zinc-950/35 p-4 sm:p-5">
              <legend className="px-1 font-semibold text-zinc-100">{questionIndex + 1}. {question.prompt}</legend>
              <div className="mt-3 grid gap-2">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected === optionIndex}
                    onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                    className={`rounded-md border px-4 py-3 text-left text-sm leading-relaxed transition-colors ${selected === optionIndex ? "border-cyan-400/65 bg-cyan-400/10 text-white" : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {hasAnswer && (
                <p className={`mt-3 text-sm leading-relaxed ${isCorrect ? "text-emerald-300" : "text-amber-300"}`} role="status">
                  <strong>{isCorrect ? "Bien razonado." : "Revísalo."}</strong> {question.explanation}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>

      {complete && (
        <div className="mt-7 rounded-lg border border-emerald-400/30 bg-emerald-400/8 p-5" aria-live="polite">
          <span className="aula-section-label text-emerald-300"><Icon name="check" /> Resultado orientativo: {score}/{questions.length}</span>
          <h3 className="mt-3 font-display text-xl font-bold text-white">{advanced ? successTitle : developingTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{advanced ? successDescription : developingDescription}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={destination} className="aula-button aula-button-primary"><Icon name="rocket" /> {destinationLabel}</Link>
            <button type="button" onClick={() => setAnswers({})} className="aula-button aula-button-secondary"><Icon name="refresh" /> Repetir</button>
          </div>
        </div>
      )}
    </section>
  );
}
