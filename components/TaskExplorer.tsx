"use client";

import { useState } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { trackLearningEvent } from "@/lib/learning-events";

type Audience = "todos" | "personal" | "trabajo" | "estudio" | "crear" | "tecnico";

type Task = {
  title: string;
  situation: string;
  result: string;
  href: string;
  audience: Exclude<Audience, "todos">;
  icon: IconName;
  start: string;
};

const content = {
  es: {
    eyebrow: "Empieza por lo que necesitas hacer",
    title: "Elige una tarea, no una tecnología",
    lead: "Abre un resultado concreto. Ya te mostraremos qué curso, herramienta o concepto necesitas después.",
    route: "Prefiero una ruta guiada",
    filterLabel: "Filtrar tareas por situación",
    routeHref: "/mi-ruta",
    filters: [
      { id: "todos", label: "Todo", icon: "grid" },
      { id: "personal", label: "Empezar", icon: "seed" },
      { id: "trabajo", label: "Trabajo", icon: "briefcase" },
      { id: "estudio", label: "Estudio", icon: "userGraduate" },
      { id: "crear", label: "Crear", icon: "landing" },
      { id: "tecnico", label: "Resolver error", icon: "tools" },
    ],
    tasks: [
      { title: "Probar IA por primera vez", situation: "Nunca la he usado o no sé qué pedirle.", result: "Una petición pequeña, revisada y bajo tu control.", href: "/empezar", audience: "personal", icon: "seed", start: "15 min" },
      { title: "Mejorar un email sin inventar datos", situation: "Quiero ahorrar tiempo escribiendo, pero revisar antes de enviar.", result: "Un borrador con límites, huecos visibles y revisión humana.", href: "/cursos/ia-pymes/emails", audience: "trabajo", icon: "email", start: "Primera práctica" },
      { title: "Estudiar sin copiar la respuesta", situation: "Necesito entender, practicar y comprobar qué recuerdo.", result: "Un método de tutor, preguntas y recuperación sin ayuda.", href: "/cursos/ia-desde-cero/estudiar-con-ia-sin-dejar-de-aprender", audience: "estudio", icon: "userGraduate", start: "35 min" },
      { title: "Detectar si la IA se lo ha inventado", situation: "La respuesta parece convincente, pero no sé si confiar.", result: "Una afirmación clasificada como confirmada, dudosa o descartada.", href: "/cursos/ia-desde-cero/alucinaciones-verificar", audience: "personal", icon: "search", start: "30 min" },
      { title: "Preparar un piloto para una pyme", situation: "Quiero aplicar IA sin tocar todavía procesos críticos.", result: "Un caso acotado, reversible y con criterios de parada.", href: "/cursos/ia-pymes/diagnostico-piloto", audience: "trabajo", icon: "briefcase", start: "Diagnóstico" },
      { title: "Crear una primera web local", situation: "Tengo una idea y quiero verla funcionando sin publicarla aún.", result: "Una página adaptable que puedes revisar en tu ordenador.", href: "/cursos/codex-desde-cero/primera-web-local", audience: "crear", icon: "landing", start: "Proyecto guiado" },
      { title: "Arreglar un error de Ollama", situation: "Ollama no conecta, se cierra o no responde como esperaba.", result: "Un diagnóstico ordenado antes de reinstalar o cambiar todo.", href: "/cursos/ia-local/troubleshooting-ollama", audience: "tecnico", icon: "tools", start: "Diagnóstico" },
      { title: "Convertir un extracto en CSV con control", situation: "Necesito estructurar datos sin importar nada automáticamente.", result: "Un CSV revisable, conciliado y sin tocar el sistema contable.", href: "/cursos/ia-pymes/convertir-extracto-csv", audience: "trabajo", icon: "spreadsheet", start: "Laboratorio" },
      { title: "Comparar herramientas sin rankings", situation: "No sé si elegir ChatGPT, Claude, Gemini u otra opción.", result: "Una prueba igual para todas y una decisión documentada.", href: "/cursos/ia-desde-cero/elegir-modelo-herramienta", audience: "personal", icon: "compare", start: "25 min" },
    ],
  },
  en: {
    eyebrow: "Start with what you need to do",
    title: "Choose a task, not a technology",
    lead: "Open one concrete outcome. We will introduce the course, tool, or concept only when you need it.",
    route: "I prefer a guided path",
    filterLabel: "Filter tasks by situation",
    routeHref: "/en/my-path",
    filters: [
      { id: "todos", label: "All", icon: "grid" },
      { id: "personal", label: "Get started", icon: "seed" },
      { id: "trabajo", label: "Work", icon: "briefcase" },
      { id: "estudio", label: "Study", icon: "userGraduate" },
      { id: "crear", label: "Build", icon: "landing" },
      { id: "tecnico", label: "Fix an error", icon: "tools" },
    ],
    tasks: [
      { title: "Try AI for the first time", situation: "I have never used it or do not know what to ask.", result: "One small request, reviewed and under your control.", href: "/en/start", audience: "personal", icon: "seed", start: "15 min" },
      { title: "Improve an email without inventing facts", situation: "I want to write faster while reviewing before I send.", result: "A bounded draft with visible gaps and human review.", href: "/en/courses/ia-pymes/emails", audience: "trabajo", icon: "email", start: "First practice" },
      { title: "Study without copying the answer", situation: "I need to understand, practise, and check what I remember.", result: "A tutor method with questions and unaided recall.", href: "/en/courses/ia-desde-cero/estudiar-con-ia-sin-dejar-de-aprender", audience: "estudio", icon: "userGraduate", start: "35 min" },
      { title: "Detect when AI made something up", situation: "The answer sounds convincing, but I do not know whether to trust it.", result: "A claim classified as confirmed, uncertain, or rejected.", href: "/en/courses/ia-desde-cero/alucinaciones-verificar", audience: "personal", icon: "search", start: "30 min" },
      { title: "Prepare a small-business AI pilot", situation: "I want to apply AI without touching critical processes yet.", result: "A bounded, reversible case with explicit stop criteria.", href: "/en/courses/ia-pymes/diagnostico-piloto", audience: "trabajo", icon: "briefcase", start: "Assessment" },
      { title: "Build a first local website", situation: "I have an idea and want to see it working before publishing it.", result: "A responsive page you can inspect on your computer.", href: "/en/courses/codex-desde-cero/primera-web-local", audience: "crear", icon: "landing", start: "Guided project" },
      { title: "Fix an Ollama error", situation: "Ollama will not connect, closes, or does not respond as expected.", result: "An ordered diagnosis before you reinstall or change everything.", href: "/en/courses/ia-local/troubleshooting-ollama", audience: "tecnico", icon: "tools", start: "Diagnosis" },
      { title: "Turn a statement into CSV with control", situation: "I need structured data without importing anything automatically.", result: "A reviewable, reconciled CSV that leaves accounting untouched.", href: "/en/courses/ia-pymes/convertir-extracto-csv", audience: "trabajo", icon: "spreadsheet", start: "Lab" },
      { title: "Compare tools without rankings", situation: "I do not know whether to choose ChatGPT, Claude, Gemini, or something else.", result: "The same test for every tool and a documented decision.", href: "/en/courses/ia-desde-cero/elegir-modelo-herramienta", audience: "personal", icon: "compare", start: "25 min" },
    ],
  },
} satisfies Record<"es" | "en", {
  eyebrow: string;
  title: string;
  lead: string;
  route: string;
  filterLabel: string;
  routeHref: string;
  filters: Array<{ id: Audience; label: string; icon: IconName }>;
  tasks: Task[];
}>;

export default function TaskExplorer({ locale = "es" }: { locale?: "es" | "en" }) {
  const [filter, setFilter] = useState<Audience>("todos");
  const copy = content[locale];
  const visible = filter === "todos" ? copy.tasks : copy.tasks.filter((task) => task.audience === filter);

  return (
    <section className="task-explorer" aria-labelledby="task-explorer-title">
      <div className="task-explorer__head">
        <div>
          <span className="aula-section-label"><Icon name="prompt" /> {copy.eyebrow}</span>
          <h2 id="task-explorer-title">{copy.title}</h2>
          <p>{copy.lead}</p>
        </div>
        <Link href={copy.routeHref} className="aula-button aula-button-secondary"><Icon name="route" /> {copy.route}</Link>
      </div>
      <div className="task-explorer__filters" role="group" aria-label={copy.filterLabel}>
        {copy.filters.map((item) => <button type="button" key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}><Icon name={item.icon} /> {item.label}</button>)}
      </div>
      <div className="task-explorer__grid" aria-live="polite">
        {visible.map((task) => <Link href={task.href} key={task.title} onClick={() => trackLearningEvent("task_open")}>
          <span className="task-explorer__icon"><Icon name={task.icon} /></span>
          <div><small>{task.start}</small><h3>{task.title}</h3><p>{task.situation}</p><strong>{task.result}</strong></div>
          <Icon name="chevronRight" />
        </Link>)}
      </div>
    </section>
  );
}
