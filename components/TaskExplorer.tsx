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

const tasks: Task[] = [
  { title: "Probar IA por primera vez", situation: "Nunca la he usado o no sé qué pedirle.", result: "Una petición pequeña, revisada y bajo tu control.", href: "/empezar", audience: "personal", icon: "seed", start: "15 min" },
  { title: "Mejorar un email sin inventar datos", situation: "Quiero ahorrar tiempo escribiendo, pero revisar antes de enviar.", result: "Un borrador con límites, huecos visibles y revisión humana.", href: "/cursos/ia-pymes/emails", audience: "trabajo", icon: "email", start: "Primera práctica" },
  { title: "Estudiar sin copiar la respuesta", situation: "Necesito entender, practicar y comprobar qué recuerdo.", result: "Un método de tutor, preguntas y recuperación sin ayuda.", href: "/cursos/ia-desde-cero/estudiar-con-ia-sin-dejar-de-aprender", audience: "estudio", icon: "userGraduate", start: "35 min" },
  { title: "Detectar si la IA se lo ha inventado", situation: "La respuesta parece convincente, pero no sé si confiar.", result: "Una afirmación clasificada como confirmada, dudosa o descartada.", href: "/cursos/ia-desde-cero/alucinaciones-verificar", audience: "personal", icon: "search", start: "30 min" },
  { title: "Preparar un piloto para una pyme", situation: "Quiero aplicar IA sin tocar todavía procesos críticos.", result: "Un caso acotado, reversible y con criterios de parada.", href: "/cursos/ia-pymes/diagnostico-piloto", audience: "trabajo", icon: "briefcase", start: "Diagnóstico" },
  { title: "Crear una primera web local", situation: "Tengo una idea y quiero verla funcionando sin publicarla aún.", result: "Una página adaptable que puedes revisar en tu ordenador.", href: "/cursos/codex-desde-cero/primera-web-local", audience: "crear", icon: "landing", start: "Proyecto guiado" },
  { title: "Arreglar un error de Ollama", situation: "Ollama no conecta, se cierra o no responde como esperaba.", result: "Un diagnóstico ordenado antes de reinstalar o cambiar todo.", href: "/cursos/ia-local/troubleshooting-ollama", audience: "tecnico", icon: "tools", start: "Diagnóstico" },
  { title: "Convertir un extracto en CSV con control", situation: "Necesito estructurar datos sin importar nada automáticamente.", result: "Un CSV revisable, conciliado y sin tocar el sistema contable.", href: "/cursos/ia-pymes/convertir-extracto-csv", audience: "trabajo", icon: "spreadsheet", start: "Laboratorio" },
  { title: "Comparar herramientas sin rankings", situation: "No sé si elegir ChatGPT, Claude, Gemini u otra opción.", result: "Una prueba igual para todas y una decisión documentada.", href: "/cursos/ia-desde-cero/elegir-modelo-herramienta", audience: "personal", icon: "compare", start: "25 min" },
];

const filters: Array<{ id: Audience; label: string; icon: IconName }> = [
  { id: "todos", label: "Todo", icon: "grid" },
  { id: "personal", label: "Empezar", icon: "seed" },
  { id: "trabajo", label: "Trabajo", icon: "briefcase" },
  { id: "estudio", label: "Estudio", icon: "userGraduate" },
  { id: "crear", label: "Crear", icon: "landing" },
  { id: "tecnico", label: "Resolver error", icon: "tools" },
];

export default function TaskExplorer() {
  const [filter, setFilter] = useState<Audience>("todos");
  const visible = filter === "todos" ? tasks : tasks.filter((task) => task.audience === filter);

  return (
    <section className="task-explorer" aria-labelledby="task-explorer-title">
      <div className="task-explorer__head">
        <div>
          <span className="aula-section-label"><Icon name="prompt" /> Empieza por lo que necesitas hacer</span>
          <h2 id="task-explorer-title">Elige una tarea, no una tecnología</h2>
          <p>Abre un resultado concreto. Ya te mostraremos qué curso, herramienta o concepto necesitas después.</p>
        </div>
        <Link href="/mi-ruta" className="aula-button aula-button-secondary"><Icon name="route" /> Prefiero una ruta guiada</Link>
      </div>
      <div className="task-explorer__filters" role="group" aria-label="Filtrar tareas por situación">
        {filters.map((item) => <button type="button" key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}><Icon name={item.icon} /> {item.label}</button>)}
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
