"use client";

import type { IconName } from "@/components/Icon";
import { Chapter, ChapterNav, Terminal } from "@/components/Book";

export type RigorousData = {
  crumb: string;
  title: string;
  icon: IconName;
  lead: string;
  courseHref: string;
  courseLabel: string;
  objective: string;
  explanation: string[];
  before: string[];
  steps: { title: string; body?: string; code?: string }[];
  check: { command: string; expected: string; reading?: string };
  results?: { title: string; text: string; reading: string };
  errors: { symptom: string; cause: string; fix: string }[];
  sources: { label: string; url: string }[];
  verified: { date: string; env: string };
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
};

export function RigorousLesson({ d }: { d: RigorousData }) {
  return (
    <Chapter crumb={d.crumb} title={d.title} icon={d.icon} lead={d.lead} courseHref={d.courseHref} courseLabel={d.courseLabel} showMission={false}>
      <div className="prose" id="objetivos">
        <h2>Objetivo</h2>
        <p>{d.objective}</p>
        <h2>Cómo funciona</h2>
        {d.explanation.map((p, i) => <p key={i}>{p}</p>)}
        <h2>Antes de empezar</h2>
        <ul>{d.before.map((b, i) => <li key={i}>{b}</li>)}</ul>
      </div>

      <div className="prose" id="practica">
        <h2>Pasos</h2>
      </div>
      {d.steps.map((s, i) => (
        <section key={i}>
          <div className="prose"><h3>{i + 1}. {s.title}</h3>{s.body ? <p>{s.body}</p> : null}</div>
          {s.code ? <Terminal>{s.code}</Terminal> : null}
        </section>
      ))}

      <div className="prose"><h2>Comprueba que funciona</h2></div>
      <Terminal>{d.check.command}</Terminal>
      <div className="prose"><p>Salida esperada:</p></div>
      <Terminal>{d.check.expected}</Terminal>
      {d.check.reading ? <div className="prose"><p>{d.check.reading}</p></div> : null}

      {d.results ? (
        <>
          <div className="prose"><h2>{d.results.title}</h2></div>
          <Terminal>{d.results.text}</Terminal>
          <div className="prose"><p>{d.results.reading}</p></div>
        </>
      ) : null}

      <div className="prose">
        <h2>Errores frecuentes</h2>
        <ul>
          {d.errors.map((e, i) => (
            <li key={i}><strong>{e.symptom}.</strong> Causa: {e.cause} Solución: {e.fix}</li>
          ))}
        </ul>
        <h2>Fuentes</h2>
        <ul>
          {d.sources.map((s, i) => (
            <li key={i}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a> (consultada el {d.verified.date})</li>
          ))}
        </ul>
        <p><strong>Última ejecución:</strong> {d.verified.date}. {d.verified.env}</p>
      </div>

      <ChapterNav prev={d.prev} next={d.next} />
    </Chapter>
  );
}
