import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "OOM y gestión de memoria — Agentes y automatización",
  description:
    "Cómo evitar errores OOM en agentes con LangGraph y n8n: truncado, resumen, checkpointers, colas, límites Docker y alertas.",
  keywords: ["OOM agentes IA", "LangGraph memory management", "n8n queue mode", "agentes IA producción memoria"],
  alternates: { canonical: "/cursos/agentes-automatizacion/oom-memory" },
};

export default function Page() {
  return (
    <Chapter
      crumb="OOM y memoria"
      title="OOM y gestión de memoria"
      icon="server"
      lead={<>Muchos agentes funcionan en demo y caen en producción porque acumulan resultados de herramientas, respuestas de APIs y conversaciones largas dentro del mismo contexto.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Detectar por qué aparece un OOM en agentes y workflows largos.</li>
          <li>Separar contexto, estado persistente, logs y resultados pesados.</li>
          <li>Aplicar límites, colas y alertas antes de que el sistema muera sin explicación.</li>
        </ul>
      </Objetivos>

      <Cristiano term="OOM">
        Out of Memory: el proceso se queda sin memoria y el sistema operativo o el runtime lo mata.
      </Cristiano>

      <div className="prose">
        <h2>Causas típicas</h2>
        <ul>
          <li>Guardar respuestas completas de herramientas en el estado del agente.</li>
          <li>Meter documentos enteros en contexto en vez de chunks y referencias.</li>
          <li>Reintentos que duplican mensajes, resultados y trazas.</li>
          <li>Workflows de n8n ejecutándose en un único proceso sin workers separados.</li>
          <li>Buffers enormes en vez de streaming o procesamiento por lotes.</li>
        </ul>
      </div>

      <Terminal>{`politica_memoria:
  max_tool_result_chars: 6000
  guardar_en_contexto:
    - resumen
    - ids
    - citas
  guardar_fuera:
    - html completo
    - pdf extraido
    - respuestas api largas
  si_supera_limite:
    - persistir_blob
    - resumir
    - enlazar_por_id
    - continuar`}</Terminal>

      <Idea>
        En LangGraph, los checkpointers sirven para persistir estado de hilo; en n8n, queue mode separa ejecución en workers apoyados por Redis y base de datos. Ninguna de las dos cosas sustituye una política de memoria.
      </Idea>

      <Cuidado>
        Un OOM puede parecer un fallo fantasma: no hay excepción bonita, solo un worker muerto o un exit code. Por eso necesitas límites, logs externos y cola de errores.
      </Cuidado>

      <Comprueba>
        Revisa un agente tuyo y marca qué campos del estado pueden crecer sin límite. Todo campo sin límite necesita truncado, resumen o persistencia externa.
      </Comprueba>

      <Guardar>
        No guardes “todo por si acaso”. Guarda lo mínimo para decidir, y lo pesado fuera del contexto.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/agente-247", label: "Agente 24/7" }}
        next={{ href: "/cursos/agentes-automatizacion/retry-idempotencia", label: "Retries e idempotencia" }}
      />
    </Chapter>
  );
}
