import type { Metadata } from "next";
import Link from "next/link";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Cómo analizar trazas de agentes con Langfuse",
  description: "Aprende un método de diagnóstico para encontrar fallos de retrieval, modelo, tools, permisos, latencia y evaluación en trazas de agentes.",
  alternates: { canonical: "/cursos/agentes-produccion/analizar-trazas" },
};

export default function Page() {
  return (
    <Chapter crumb="Módulo 8" title="Cómo leer una traza" icon="chart" lead={<>Terminas el laboratorio cuando una traza mala deja de ser una anécdota. Vas a localizar el primer paso que se desvió, comprobar su evidencia y elegir el cambio más pequeño que lo corrige.</>} courseHref="/cursos/agentes-produccion" courseLabel="Agentes en producción">
      <Objetivos><ul><li>Seguir una traza desde resultado hasta causa probable.</li><li>Distinguir cinco familias de fallos sin modificar todo a la vez.</li><li>Documentar una hipótesis, una corrección y una prueba de regresión.</li></ul></Objetivos>
      <div className="prose"><h2>El caso: una respuesta convincente, pero equivocada</h2><p>El asistente asegura que una devolución es posible en 30 días. La política ficticia dice 14. El usuario no necesita que «mejores la IA»: necesita que encuentres dónde se rompió la cadena y evites que se repita.</p></div>
      <Terminal>{`trace: soporte-042
  outcome: respuesta_enviada
  duration_ms: 8_420
  ├─ retrieve_docs (312 ms)
  │   ├─ filtro_tenant: correcto
  │   └─ fuente: politica-v1 / seccion devoluciones / score 0.64
  ├─ ollama-chat (7_811 ms)
  │   └─ prompt_version: v2
  └─ grounding_score: 0

hallazgo: se recuperó una versión antigua; el modelo siguió el contexto recibido.`}</Terminal>
      <div className="prose"><h2>Árbol de diagnóstico</h2><ol><li><strong>¿La entrada es la esperada?</strong> Si no, investiga interfaz, autenticación o normalización.</li><li><strong>¿Se recuperó la evidencia correcta y autorizada?</strong> Si no, revisa indexado, versión, filtros y consulta.</li><li><strong>¿La tool devolvió lo que debía?</strong> Si no, revisa permiso, timeout, contrato y reintentos.</li><li><strong>¿El modelo ignoró evidencia válida?</strong> Si sí, revisa prompt, formato, contexto y modelo.</li><li><strong>¿La política debió detener la salida?</strong> Si sí, ajusta score, umbral o aprobación humana.</li></ol><h2>La corrección mínima</h2><p>En el caso anterior no se cambia el modelo. Se desactiva <code>politica-v1</code>, se añade una prueba de versión de documento al retriever y se convierte ese caso en una evaluación de regresión. Después se vuelve a ejecutar el dataset.</p></div>
      <Cuidado>No tomes decisiones sobre una única traza si el comportamiento puede deberse a una dependencia externa, concurrencia o una actualización. Agrupa por versión, entorno, modelo, error y tipo de tarea; conserva la muestra sintética que reprodujo el fallo.</Cuidado>
      <Comprueba><ol><li>Elige una traza mala real o sintética.</li><li>Escribe el primer span que contradice el resultado esperado.</li><li>Formula una hipótesis comprobable y un cambio pequeño.</li><li>Añade el caso a tu dataset y ejecuta la regresión.</li><li>Anota si mejoró sin degradar seguridad, grounding o latencia.</li></ol></Comprueba>
      <Idea>Los dashboards muestran tendencias; las trazas explican casos. Necesitas ambas, pero una alerta solo es útil si termina en una traza que una persona puede interpretar.</Idea>
      <Guardar>La disciplina es siempre la misma: resultado → evidencia → hipótesis → cambio mínimo → evaluación. Esa es la diferencia entre operar un agente y perseguir síntomas.</Guardar>
      <div className="prose"><h2>Siguiente paso</h2><p>Aplica esta misma secuencia al <Link href="/cursos/agentes-produccion/proyecto-inbox">proyecto de agente de inbox para pymes</Link>, empezando con datos ficticios y aprobación humana para cualquier acción externa.</p></div>
      <ChapterNav prev={{ href: "/cursos/agentes-produccion/privacidad-produccion-observabilidad", label: "Privacidad y producción" }} next={{ href: "/cursos/agentes-produccion/proyecto-inbox", label: "Proyecto: agente de inbox" }} />
    </Chapter>
  );
}
