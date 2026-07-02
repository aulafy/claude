import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Estado, memoria y bucles controlados — Agentes en producción",
  description:
    "Aprende a diseñar agentes con estado explícito, memoria útil y bucles seguros para evitar automatizaciones infinitas o incoherentes.",
  alternates: { canonical: "/cursos/agentes-produccion/estado-memoria" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Estado y memoria"
      title="Estado, memoria y bucles controlados"
      icon="database"
      lead={<>Un agente fiable no “se acuerda” por intuición: guarda estado. Sabe qué tarea está resolviendo, qué ha probado, qué falta y cuándo debe detenerse.</>}
      courseHref="/cursos/agentes-produccion"
      courseLabel="Agentes en producción"
    >
      <Objetivos>
        <ul>
          <li>Separar contexto, memoria y estado de ejecución.</li>
          <li>Diseñar bucles con límite, criterio de salida y recuperación.</li>
          <li>Evitar agentes que repiten acciones o pierden el hilo.</li>
        </ul>
      </Objetivos>

      <Cristiano term="estado">
        Es la ficha de trabajo viva del agente: entrada recibida, decisión actual, herramientas usadas, errores, aprobaciones y resultado esperado. Sin estado, cada paso improvisa.
      </Cristiano>

      <div className="prose">
        <h2>Estado mínimo recomendado</h2>
      </div>

      <Terminal>{`{
  "task_id": "inbox-2026-07-02-001",
  "intent": "crear_borrador_respuesta",
  "risk": "medium",
  "customer": "cliente@example.com",
  "attempts": 1,
  "approved": false,
  "next_action": "draft_email",
  "evidence": ["email original", "politica devoluciones"]
}`}</Terminal>

      <Idea>
        La memoria guarda conocimiento reutilizable; el estado guarda lo que pasa en esta ejecución. Mezclarlos es una fuente clásica de errores.
      </Idea>

      <div className="prose">
        <h2>Bucles sanos</h2>
        <ul>
          <li><strong>Límite de intentos</strong>: nunca reintentar para siempre.</li>
          <li><strong>Criterio de salida</strong>: saber cuándo una respuesta es suficiente.</li>
          <li><strong>Escalada</strong>: pedir ayuda humana si no hay confianza.</li>
          <li><strong>Idempotencia</strong>: no repetir acciones externas si el paso ya se ejecutó.</li>
        </ul>
      </div>

      <Cuidado>
        El error más caro no es que el agente falle; es que falle varias veces haciendo la misma acción externa. Crear tres tickets iguales, enviar dos emails o duplicar una factura no es una rareza: es mala gestión de estado.
      </Cuidado>

      <Comprueba>
        Antes de conectar Gmail, Stripe o un CRM, simula el flujo con archivos locales. Si el agente no controla el estado en local, tampoco lo hará mejor con herramientas reales.
      </Comprueba>

      <Guardar>
        Todo agente de producción necesita un archivo, tabla o base de datos donde puedas leer: entrada, decisión, herramientas, salida y estado final.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-produccion/mapa-frameworks", label: "LangGraph, n8n y CrewAI" }}
        next={{ href: "/cursos/agentes-produccion/n8n-tools", label: "n8n como capa de herramientas" }}
      />
    </Chapter>
  );
}
