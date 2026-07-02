import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Mapa real de agentes en 2026 — Agentes y automatización",
  description:
    "Qué es un agente de IA de verdad y cuándo usar subagentes, hooks, skills, MCP, GitHub Actions, routines o un proceso local.",
  alternates: { canonical: "/cursos/agentes-automatizacion/mapa" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Mapa real de agentes en 2026"
      title="Mapa real de agentes en 2026"
      icon="route"
      lead={<>Un agente no es magia: es un sistema que recibe una entrada, decide pasos, usa herramientas y deja evidencia. Esta lección te da el mapa para elegir la pieza correcta sin montar una fábrica cuando solo necesitas un temporizador.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Distinguir agente, automatización, workflow y asistente.</li>
          <li>Saber cuándo usar subagentes, hooks, skills, MCP, GitHub Actions o routines.</li>
          <li>Diseñar cualquier agente con entrada, herramientas, límites, memoria y verificación.</li>
        </ul>
      </Objetivos>

      <Cristiano term="agente">
        Es un ayudante con herramientas y un objetivo. La diferencia con un chatbot normal es que puede actuar: leer archivos, ejecutar comandos, abrir issues, llamar APIs o pedir datos a un MCP. La diferencia con un script es que decide parte del camino, no solo ejecuta una lista fija.
      </Cristiano>

      <div className="prose">
        <h2>La taxonomía que importa</h2>
        <ul>
          <li><strong>Prompt repetible</strong>: una receta que copias y pegas. Barato, simple, manual.</li>
          <li><strong>Skill</strong>: conocimiento empaquetado para que Claude sepa hacer una tarea concreta.</li>
          <li><strong>Subagente</strong>: otro Claude especializado que trabaja con su propio contexto y te devuelve una conclusión.</li>
          <li><strong>Hook</strong>: una regla determinista que se ejecuta en momentos concretos. No decide: obedece.</li>
          <li><strong>MCP</strong>: un puente a herramientas externas: GitHub, bases de datos, dashboards, ficheros, APIs.</li>
          <li><strong>GitHub Actions</strong>: automatización alrededor de issues y pull requests.</li>
          <li><strong>Routine</strong>: automatización en cloud gestionada por Anthropic. Útil, pero en research preview: no diseñes un negocio crítico dependiendo de que su API no cambie.</li>
        </ul>
      </div>

      <Idea>
        Regla de arquitectura: si la acción debe ocurrir siempre igual, usa un hook o un script. Si necesita criterio, usa un agente. Si necesita datos externos, añade MCP. Si necesita repetirse sin ti, súbelo a GitHub Actions, cron o routines.
      </Idea>

      <div className="prose">
        <h2>El lienzo de diseño de un agente</h2>
        <p>Antes de escribir código, rellena esto. Es el antídoto contra agentes que hacen cosas raras:</p>
      </div>

      <Terminal>{`Nombre:
Objetivo:
Entrada:
Herramientas permitidas:
Herramientas prohibidas:
Memoria que puede leer:
Acciones que requieren confirmación:
Criterio de éxito:
Prueba mínima:
Registro de evidencia:`}</Terminal>

      <Cuidado>
        Si no puedes escribir el criterio de éxito en una frase, no tienes un agente: tienes una esperanza. Empieza con una versión pequeña, observable y fácil de apagar.
      </Cuidado>

      <div className="prose">
        <h2>Ejemplo: agente revisor de PR</h2>
        <p>Mal planteado: “revisa mi código”. Bien planteado: “cuando se abra un PR, revisa solo seguridad, regresiones obvias y tests ausentes; comenta con archivo y línea; no cambies código; ignora estilo”. Eso ya se puede convertir en workflow.</p>
      </div>

      <Comprueba>
        Elige una tarea repetitiva de tu semana y clasifícala: ¿prompt, skill, subagente, hook, MCP, GitHub Action, routine o cron? Si dudas entre dos, elige la pieza menos poderosa. Los sistemas pequeños se arreglan; los sistemas demasiado ambiciosos se esconden.
      </Comprueba>

      <Guardar>
        Quédate con este orden de madurez: manual primero, semiautomático después, automático al final. Una automatización mala a escala es peor que hacer la tarea a mano.
      </Guardar>

      <ChapterNav next={{ href: "/cursos/agentes-automatizacion/subagentes", label: "Subagentes con roles y límites" }} />
    </Chapter>
  );
}
