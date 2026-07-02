import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "LangGraph, n8n y CrewAI: qué usar — Agentes en producción",
  description:
    "Comparativa práctica para elegir LangGraph, n8n o CrewAI al construir agentes de IA con estado, herramientas y automatizaciones reales.",
  keywords: ["LangGraph vs CrewAI", "n8n agentes IA", "agentes IA producción", "LangGraph español"],
  alternates: { canonical: "/cursos/agentes-produccion/mapa-frameworks" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Mapa de frameworks"
      title="LangGraph, n8n y CrewAI: qué usar"
      icon="network"
      lead={<>La pregunta no es “cuál es el mejor framework”, sino qué pieza resuelve tu problema con menos riesgo. En producción casi siempre separas dos mundos: orquestación con estado y automatización de herramientas.</>}
      courseHref="/cursos/agentes-produccion"
      courseLabel="Agentes en producción"
    >
      <Objetivos>
        <ul>
          <li>Distinguir LangGraph, n8n y CrewAI sin convertirlo en guerra de herramientas.</li>
          <li>Elegir arquitectura según estado, herramientas, revisión humana y equipo.</li>
          <li>Diseñar un agente de negocio pequeño antes de escribir código.</li>
        </ul>
      </Objetivos>

      <Cristiano term="agente en producción">
        No es un chat bonito. Es un sistema que recibe trabajo, decide pasos, llama herramientas, guarda estado, registra evidencia y sabe cuándo parar o pedir permiso.
      </Cristiano>

      <div className="prose">
        <h2>Regla rápida de elección</h2>
        <ul>
          <li><strong>n8n</strong>: úsalo para disparadores, integraciones, emails, CRMs, hojas de cálculo, webhooks y flujos visibles para una pyme.</li>
          <li><strong>LangGraph</strong>: úsalo cuando el agente necesita estado explícito, bucles, ramas, reintentos, memoria y control fino del flujo.</li>
          <li><strong>CrewAI</strong>: úsalo para prototipos de equipos de agentes con roles claros, cuando quieres expresar tareas y colaboración rápido.</li>
        </ul>
      </div>

      <Idea>
        La arquitectura más sana suele ser híbrida: n8n recibe eventos y conecta herramientas; LangGraph toma decisiones complejas; una persona aprueba las acciones peligrosas.
      </Idea>

      <div className="prose">
        <h2>Diseño base para Aulafy</h2>
      </div>

      <Terminal>{`Entrada: email, formulario, issue o webhook de n8n
Clasificador: LangGraph decide tipo de tarea y riesgo
Herramientas: n8n ejecuta acciones externas
Aprobación: humano revisa antes de enviar, borrar, pagar o publicar
Salida: borrador, informe, ticket o tarea completada
Log: qué decidió, con qué datos y por qué`}</Terminal>

      <Cuidado>
        Si un agente puede enviar emails, tocar facturas o modificar datos de clientes, no empieces dándole autonomía total. Primero que proponga. Luego que ejecute con aprobación. La autonomía se gana con logs.
      </Cuidado>

      <Comprueba>
        Piensa en una tarea repetida de oficina. Si el flujo cabe en cajas visuales, empieza por n8n. Si necesita bucles, memoria y decisiones con ramas, añade LangGraph.
      </Comprueba>

      <Guardar>
        Quédate con esta frase: n8n conecta el negocio; LangGraph controla el razonamiento; CrewAI ayuda a prototipar roles. No tienen por qué competir.
      </Guardar>

      <ChapterNav next={{ href: "/cursos/agentes-produccion/estado-memoria", label: "Estado, memoria y bucles controlados" }} />
    </Chapter>
  );
}
