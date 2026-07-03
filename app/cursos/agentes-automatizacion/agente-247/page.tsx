import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Proyecto: agente 24/7 con bandeja de entrada — Agentes y automatización",
  description:
    "Proyecto final para montar un agente 24/7 con VPS o mini PC, Telegram o Discord, cola de tareas, aprobación humana y logs.",
  keywords: ["agente 24/7 IA", "Claude Code Telegram VPS", "automatización IA pyme", "agente Discord IA local"],
  alternates: { canonical: "/cursos/agentes-automatizacion/agente-247" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Proyecto final"
      title="Proyecto: agente 24/7 con bandeja de entrada"
      icon="server"
      lead={<>El proyecto final es un agente casero que recibe tareas, las clasifica, ejecuta solo lo seguro y deja lo delicado pendiente de aprobación humana.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Montar una arquitectura simple con bandeja de entrada, worker y logs.</li>
          <li>Separar respuestas automáticas, borradores y acciones con aprobación.</li>
          <li>Controlar costes, bucles, secretos y permisos en un agente siempre encendido.</li>
        </ul>
      </Objetivos>

      <Cristiano term="agente 24/7">
        Es un proceso que escucha tareas de forma continua, pero no significa que deba tener permiso para hacerlo todo.
      </Cristiano>

      <Terminal>{`Telegram o Discord
  -> webhook / inbox
  -> cola Redis o SQLite
  -> worker agente
  -> herramientas permitidas
  -> logs + resumen
  -> aprobacion humana si hay riesgo

acciones_auto:
  - resumir
  - buscar en documentos
  - preparar borrador
acciones_con_permiso:
  - enviar email
  - publicar
  - tocar produccion
  - modificar datos de cliente`}</Terminal>

      <div className="prose">
        <h2>Stack recomendado</h2>
        <ul>
          <li><strong>Mini PC o Mac</strong>: mejor si necesitas archivos locales o Ollama.</li>
          <li><strong>VPS pequeño</strong>: mejor para webhooks y disponibilidad constante.</li>
          <li><strong>Telegram o Discord</strong>: entrada sencilla para tareas y aprobaciones.</li>
          <li><strong>SQLite</strong>: suficiente para cola pequeña, auditoría y estado.</li>
          <li><strong>Ollama o proveedor cloud</strong>: decide por privacidad, coste y calidad.</li>
        </ul>
      </div>

      <Idea>
        La bandeja de entrada es más importante que el modelo: permite pausar, reintentar, auditar y pedir permiso.
      </Idea>

      <Cuidado>
        Un agente 24/7 sin presupuesto, timeout y condición de parada puede gastar dinero o repetir errores durante horas.
      </Cuidado>

      <Comprueba>
        Define límites numéricos: máximo de tareas por hora, máximo de tokens por tarea, timeout, número de reintentos y acciones bloqueadas por defecto.
      </Comprueba>

      <Guardar>
        El objetivo no es tener un agente “autónomo”. El objetivo es tener un compañero automático que haga lo repetible y se pare ante lo importante.
      </Guardar>

      <ChapterNav prev={{ href: "/cursos/agentes-automatizacion/github-routines", label: "GitHub y routines" }} />
    </Chapter>
  );
}
