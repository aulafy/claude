import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Privacidad, costes y producción en observabilidad de agentes",
  description: "Define una política práctica de datos, retención, acceso, costes, alertas y límites antes de usar observabilidad de agentes en producción.",
  alternates: { canonical: "/cursos/agentes-produccion/privacidad-produccion-observabilidad" },
};

export default function Page() {
  return (
    <Chapter crumb="Módulo 7" title="Privacidad y producción" icon="shield" lead={<>La observabilidad puede solucionar una caja negra o crear otra: un almacén de prompts, documentos y secretos al que nadie puso límites. La diferencia es una política aplicada antes del primer usuario real.</>} courseHref="/cursos/agentes-produccion" courseLabel="Agentes en producción">
      <Objetivos><ul><li>Clasificar cada dato antes de enviarlo a una traza.</li><li>Definir retención, acceso, borrado y respuesta a incidencias.</li><li>Medir coste técnico y humano sin presentar estimaciones como hechos.</li></ul></Objetivos>
      <div className="prose"><h2>Tabla de minimización</h2><table><thead><tr><th>Dato</th><th>Por defecto</th><th>Alternativa útil</th></tr></thead><tbody><tr><td>Prompt del usuario</td><td>No completo</td><td>Hash, categoría, longitud y extracto autorizado.</td></tr><tr><td>Documento RAG</td><td>No completo</td><td>ID, versión, página, permisos y fragmento mínimo.</td></tr><tr><td>Secreto / cabecera</td><td>Nunca</td><td>Nombre del secreto o estado «presente».</td></tr><tr><td>Usuario</td><td>No email ni nombre</td><td>ID seudónimo rotatorio si la finalidad lo permite.</td></tr><tr><td>Salida</td><td>Minimizada</td><td>Estado, cita, clasificación de riesgo y muestra autorizada.</td></tr></tbody></table></div>
      <Terminal>{`politica_trazas:
  entornos: [desarrollo, preview, produccion]
  produccion:
    retencion_dias: 30
    acceso: "equipo operativo con necesidad justificada"
    entradas: "hash + categoria + extracto autorizado"
    documentos: "id + version + seccion"
    secretos: "prohibidos"
    borrado: "proceso probado y responsable asignado"
  alertas:
    - "tasa_de_error > umbral"
    - "llamadas_tool_por_tarea > limite"
    - "coste_o_tiempo_por_tarea > presupuesto"`}</Terminal>
      <div className="prose"><h2>Coste completo</h2><p>Para API registra tokens y precio de la versión contratada. Para modelos locales registra GPU/CPU, cola, memoria, electricidad aproximada, almacenamiento de trazas y tiempo de revisión. No conviertas un cálculo de laboratorio en una promesa comercial: el volumen, el modelo y la retención cambian el resultado.</p><h2>Puerta de salida a producción</h2><ol><li>Datos minimizados y política aprobada por quien corresponde.</li><li>Accesos por rol y credenciales rotables.</li><li>Dataset de evals ejecutado antes de cada cambio relevante.</li><li>Límites de tools, timeout, presupuesto y fallback humano probados.</li><li>Plan de borrar datos y de investigar una incidencia.</li></ol></div>
      <Cuidado>Para sanidad, derecho, finanzas, menores o datos personales, este curso no sustituye evaluación legal, de seguridad, privacidad ni contractual. No envíes información regulada a un proveedor solo porque una SDK lo hace fácil.</Cuidado>
      <Comprueba>Haz una revisión de una traza con otra persona: intentad encontrar un secreto, un dato personal o un documento completo. Si aparece alguno, elimina la fuente, corrige la instrumentación y verifica el proceso de borrado antes de continuar.</Comprueba>
      <Idea>La retención corta suele ser una mejora de producto: reduce superficie de exposición, coste y ruido cuando las trazas ya no tienen utilidad operativa.</Idea>
      <Guardar>Producción no es «el dashboard funciona». Es poder explicar qué guardas, por qué, quién lo ve, cuánto cuesta y cómo detienes el sistema cuando se comporta mal.</Guardar>
      <ChapterNav prev={{ href: "/cursos/agentes-produccion/evals-scores-langfuse", label: "Evals y scores" }} next={{ href: "/cursos/agentes-produccion/analizar-trazas", label: "Analizar trazas" }} />
    </Chapter>
  );
}
