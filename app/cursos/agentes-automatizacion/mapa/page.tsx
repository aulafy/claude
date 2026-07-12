import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Mapa real de agentes en 2026",
  description:
    "Taxonomía práctica de agentes de IA: skills, subagentes, hooks, MCP, loops, GitHub Actions y automatizaciones con límites claros.",
  keywords: ["agentes IA 2026", "Claude Code skills subagentes hooks", "automatización con IA", "MCP Claude Code"],
  alternates: { canonical: "/cursos/agentes-automatizacion/mapa" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Mapa de agentes"
      title="Mapa real de agentes en 2026"
      icon="robot"
      lead={<>Un agente útil no es un chat con nombre bonito. Es un sistema con objetivo, herramientas, permisos, memoria mínima, verificación y una forma clara de parar.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Distinguir skills, subagentes, hooks, MCP, loops y automatizaciones externas.</li>
          <li>Elegir la pieza adecuada según contexto, riesgo y repetición.</li>
          <li>Diseñar agentes que no se queden en bucle ni actúen sin control.</li>
        </ul>
      </Objetivos>

      <Cristiano term="agente">
        Es un asistente que puede decidir pasos, usar herramientas y comprobar resultados para completar una tarea.
      </Cristiano>

      <div className="prose">
        <h2>Taxonomía práctica</h2>
        <ul>
          <li><strong>CLAUDE.md</strong>: reglas siempre presentes del proyecto.</li>
          <li><strong>Skill</strong>: procedimiento reutilizable que se activa cuando hace falta.</li>
          <li><strong>Subagente</strong>: especialista con contexto y herramientas separadas.</li>
          <li><strong>Hook</strong>: acción determinista antes o después de una herramienta.</li>
          <li><strong>MCP</strong>: conexión con servicios externos como GitHub, bases de datos o navegador.</li>
          <li><strong>Loop o tarea programada</strong>: ejecución repetida con condición de salida.</li>
          <li><strong>GitHub Actions</strong>: automatización declarativa para CI, tests y despliegues.</li>
        </ul>
      </div>

      <Terminal>{`necesidad: "revisar PRs cada mañana"
decision:
  conocimiento_del_proyecto: CLAUDE.md
  checklist_reutilizable: skill code-review
  verificacion_aislada: subagente reviewer
  reglas_obligatorias: hook pre/post tool
  integracion_externa: GitHub MCP o gh CLI
  programacion: GitHub Actions o tarea programada
limites:
  no_merge_automatico: true
  publicar_solo_comentarios: true
  parar_si_no_hay_tests: true`}</Terminal>

      <Idea>
        La mayoría de agentes buenos son aburridos por diseño: hacen pocas cosas, las registran bien y piden permiso antes de tocar algo irreversible.
      </Idea>

      <div className="prose">
        <h2>Qué pieza usar según el problema</h2>
      </div>

      <Terminal>{`problema -> pieza recomendable
"repetir una receta dentro de Claude/Codex" -> skill
"revisar código con rol aislado" -> subagente
"bloquear comandos peligrosos" -> hook
"consultar GitHub, DB o navegador" -> MCP con permisos mínimos
"orquestar estado, ramas y reintentos" -> LangGraph
"conectar CRM, email, Sheets o webhooks" -> n8n
"prototipar roles investigador/redactor/revisor" -> CrewAI
"ejecutar algo cada mañana" -> GitHub Actions o scheduler`}</Terminal>

      <Cuidado>
        No conviertas cada automatización en multiagente. Si una regla determinista resuelve el problema, usa código, workflow o hook. Reserva agentes para pasos donde haga falta criterio, lenguaje natural o búsqueda contextual.
      </Cuidado>

      <Cuidado>
        Si no puedes explicar qué herramientas puede usar, qué datos ve y cuándo debe parar, todavía no tienes un agente: tienes una conversación larga con permisos de más.
      </Cuidado>

      <Comprueba>
        Elige una tarea repetitiva de tu trabajo. Escribe objetivo, entrada, herramientas, salida esperada, condición de parada y acción que nunca debe hacer.
      </Comprueba>

      <Guardar>
        Primero diseña el circuito de control. Después eliges framework, modelo y automatización.
      </Guardar>

      <ChapterNav next={{ href: "/cursos/agentes-automatizacion/subagentes", label: "Subagentes con roles" }} />
    </Chapter>
  );
}
