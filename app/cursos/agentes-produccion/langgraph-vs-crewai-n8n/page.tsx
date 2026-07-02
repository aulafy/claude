import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "LangGraph vs CrewAI vs n8n en 2026 — Agentes en producción",
  description:
    "Comparativa práctica de LangGraph, CrewAI y n8n para construir agentes de IA: estado, memoria, herramientas, permisos, evals y casos de uso en producción.",
  keywords: ["LangGraph vs CrewAI", "LangGraph vs n8n", "CrewAI vs n8n", "agentes IA producción 2026"],
  alternates: { canonical: "/cursos/agentes-produccion/langgraph-vs-crewai-n8n" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Comparativa 2026"
      title="LangGraph vs CrewAI vs n8n en 2026"
      icon="compare"
      lead={<>Estas tres herramientas no resuelven el mismo problema. LangGraph es control con estado, CrewAI es colaboración por roles y n8n es automatización visual conectada al negocio.</>}
      courseHref="/cursos/agentes-produccion"
      courseLabel="Agentes en producción"
    >
      <Objetivos>
        <ul>
          <li>Elegir herramienta según problema, equipo y riesgo.</li>
          <li>Evitar prototipos bonitos que se rompen en producción.</li>
          <li>Diseñar una arquitectura híbrida con código y automatización visual.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Resumen sin rodeos</h2>
        <ul>
          <li><strong>LangGraph</strong>: mejor si necesitas estado explícito, bucles, memoria, ramas, checkpoints y control fino.</li>
          <li><strong>CrewAI</strong>: mejor si quieres prototipar equipos de agentes con roles y tareas comprensibles.</li>
          <li><strong>n8n</strong>: mejor si necesitas conectar herramientas de negocio sin escribir integraciones desde cero.</li>
        </ul>
      </div>

      <Cristiano term="estado">
        Es la ficha viva de una ejecución: qué se recibió, qué se decidió, qué herramientas se usaron, qué falta y si alguien aprobó la acción.
      </Cristiano>

      <div className="prose">
        <h2>Tabla de decisión</h2>
      </div>

      <Terminal>{`Necesitas ramas, bucles y memoria persistente -> LangGraph
Necesitas roles tipo investigador/redactor/revisor -> CrewAI
Necesitas Gmail, Sheets, CRM, webhooks y aprobaciones visuales -> n8n
Necesitas producción real para pyme -> n8n + LangGraph
Necesitas demo rápida para explicar una idea -> CrewAI o n8n
Necesitas permisos estrictos y logs -> LangGraph + n8n con human-in-the-loop`}</Terminal>

      <Idea>
        La pregunta buena no es “cuál gana”, sino “qué parte del sistema debe decidir y qué parte solo debe ejecutar herramientas”.
      </Idea>

      <div className="prose">
        <h2>Arquitectura recomendada para Aulafy</h2>
      </div>

      <Terminal>{`n8n:
  - recibe email, formulario o webhook
  - normaliza datos
  - llama al agente
  - crea borrador, ticket o aviso
  - guarda logs visibles

LangGraph:
  - clasifica intención y riesgo
  - mantiene estado
  - decide siguiente paso
  - pide aprobación si hace falta

CrewAI:
  - prototipa roles
  - explora tareas creativas
  - ayuda a validar la idea antes de endurecerla`}</Terminal>

      <Cuidado>
        Si todo vive dentro del prompt de un agente, no tienes producción: tienes una conversación larga con herramientas. En producción quieres estado, logs, reintentos y permisos fuera del modelo.
      </Cuidado>

      <div className="prose">
        <h2>Código mental de migración</h2>
        <p>Empieza simple y sube control solo cuando duela:</p>
      </div>

      <Terminal>{`1. Prompt manual
2. Workflow n8n que crea borrador
3. AI Agent de n8n con herramientas limitadas
4. LangGraph para decisiones con estado
5. Human-in-the-loop para acciones sensibles
6. Evals + logs antes de ampliar autonomía`}</Terminal>

      <Comprueba>
        Elige una automatización de tu negocio y marca: ¿qué pasos son deterministas?, ¿qué pasos necesitan criterio?, ¿qué acciones requieren aprobación? Esa respuesta elige la herramienta por ti.
      </Comprueba>

      <Guardar>
        LangGraph controla decisiones complejas; n8n conecta el mundo real; CrewAI acelera prototipos por roles. Juntas pueden convivir, pero cada una debe tener una responsabilidad clara.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-produccion/mapa-frameworks", label: "LangGraph, n8n y CrewAI" }}
        next={{ href: "/cursos/agentes-produccion/estado-memoria", label: "Estado, memoria y bucles" }}
      />
    </Chapter>
  );
}
