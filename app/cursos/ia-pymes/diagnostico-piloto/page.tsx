import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Diagnóstico y primer piloto de IA para una pyme",
  description:
    "Plantilla práctica para priorizar, probar y medir un primer caso de IA en una pyme: datos, costes, riesgo, revisión humana y decisión local, cloud o híbrida.",
  keywords: ["diagnóstico IA pymes", "piloto IA empresa", "implementar IA pyme", "automatización IA con revisión humana", "ROI IA pymes"],
  alternates: { canonical: "/cursos/ia-pymes/diagnostico-piloto" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Diagnóstico y piloto"
      title="Diagnóstico y primer piloto de IA para una pyme"
      icon="briefcase"
      lead={<>Antes de comprar una herramienta o montar un agente, elige una tarea concreta, mide su punto de partida y prueba una mejora reversible. Este método sirve para una empresa de una a cincuenta personas.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Convertir un problema cotidiano en un piloto pequeño y medible.</li>
          <li>Elegir con criterio entre una herramienta local, cloud o un diseño híbrido.</li>
          <li>Evitar que la primera prueba acceda, envíe o modifique datos sin control humano.</li>
        </ul>
      </Objetivos>

      <Cristiano term="piloto de IA">
        No es instalar muchas herramientas. Es probar durante dos o cuatro semanas una única mejora: por ejemplo, convertir facturas en un borrador de tabla que una persona valida antes de importarlo.
      </Cristiano>

      <div className="prose">
        <h2>La regla de entrada: proceso antes que herramienta</h2>
        <p>Empieza por una tarea que ocurra con frecuencia, tenga una entrada clara y pueda revisarse antes de causar un efecto. Los primeros buenos candidatos suelen ser clasificar emails, resumir reuniones, extraer campos de documentos o redactar borradores de respuesta.</p>
        <p>No prometas de antemano horas ahorradas ni retorno inmediato. Formula una hipótesis y mídela: el ahorro, la calidad y el coste real dependen de los datos, el equipo, la revisión y el mantenimiento.</p>
      </div>

      <Terminal>{`FICHA DE DESCUBRIMIENTO (15 minutos)

1. Tarea repetitiva:
2. Quién la hace y cuántas veces por semana:
3. Tiempo actual por caso y errores frecuentes:
4. Entrada mínima necesaria (no "todos los datos"):
5. Salida que una persona pueda comprobar:
6. Acción que el sistema NO puede hacer todavía:
7. Datos personales, financieros, de salud o secretos implicados:
8. Herramientas ya utilizadas (correo, Excel, CRM, Drive...):
9. Persona responsable de revisar cada salida:
10. Métrica de éxito y fecha de revisión:`}</Terminal>

      <Idea>
        La mejor primera automatización no es la que parece más inteligente: es la que tiene un responsable, una muestra de prueba y un botón claro para detenerla.
      </Idea>

      <div className="prose">
        <h2>Prioriza con una tabla, no con entusiasmo</h2>
        <p>Elige tres candidatos y puntúalos de 1 a 5. Da preferencia a alto impacto y frecuencia, pero baja exposición de datos y bajo daño si la salida es incorrecta. Si una tarea afecta pagos, contratos, selección de personas, salud o derechos, no la uses como primer piloto.</p>
      </div>

      <Terminal>{`CASO                         IMPACTO  FRECUENCIA  REVISABLE  RIESGO  DATOS
Clasificar emails               4          5           5        2       2
Extraer campos de facturas      4          4           4        3       4
Enviar respuestas a clientes    4          5           2        4       3

Regla inicial: empieza por la opción más revisable y de menor riesgo.
No sumes puntos de forma ciega: un riesgo alto descarta el piloto aunque el ahorro parezca atractivo.`}</Terminal>

      <div className="prose">
        <h2>Elige la arquitectura según el caso</h2>
        <ul>
          <li><strong>Herramienta cloud:</strong> buena para un borrador sin datos sensibles, con puesta en marcha rápida y presupuesto por uso conocido.</li>
          <li><strong>Local o self-hosted:</strong> útil cuando necesitas más control sobre dónde se procesan datos, tienes capacidad para administrar el equipo, copias, actualizaciones y accesos.</li>
          <li><strong>Híbrida:</strong> separa datos o tareas: por ejemplo, anonimizar y clasificar localmente, y usar un servicio externo solo para un texto no sensible.</li>
        </ul>
        <p>Local no equivale a cumplimiento automático, coste cero ni seguridad total. Cloud tampoco es siempre inaceptable. Documenta finalidad, datos, proveedor, accesos, retención, coste y responsable antes de decidir.</p>
      </div>

      <Cuidado>
        No uses el Self-hosted AI Starter Kit de n8n como si fuese una plataforma de producción lista para datos de empresa. n8n lo presenta como punto de partida o prueba de concepto: para operar necesitas secretos propios, control de acceso, copias, actualizaciones, monitorización y una revisión de seguridad acorde al caso.
      </Cuidado>

      <div className="prose">
        <h2>Plan de 30 días: un caso, cuatro decisiones</h2>
        <ol>
          <li><strong>Semana 1 · Línea base.</strong> Recoge entre 10 y 30 ejemplos autorizados o sintéticos; mide tiempo, errores y coste actual. Define qué hace una respuesta correcta.</li>
          <li><strong>Semana 2 · Prototipo seguro.</strong> El sistema solo crea una vista previa o un borrador. No envía emails, no registra contabilidad, no borra y no cobra.</li>
          <li><strong>Semana 3 · Evaluación.</strong> Compara salida con la revisión humana. Registra campos erróneos, abstenciones, tiempo de revisión, incidencias y coste.</li>
          <li><strong>Semana 4 · Decisión.</strong> Mantén, corrige, amplía o descarta el piloto. Es válido descartar: evita pagar por una automatización que no aporta.</li>
        </ol>
      </div>

      <Terminal>{`REGISTRO MÍNIMO DEL PILOTO

caso: "extracción de facturas a borrador CSV"
modo: "vista previa; sin importación contable"
muestra: "20 documentos autorizados o anonimizados"
campos: [emisor, fecha, número, base, IVA, total]
aceptación: "campos críticos correctos o marcados como dudosos"
revisor: "administración"
incidencia: "guardar documento ID, campo, motivo y corrección"
coste_a_medir: "suscripción/API + equipo + tiempo de revisión + mantenimiento"
fecha_decisión: "YYYY-MM-DD"
acción_prohibida: "pago, asiento contable o envío automático"`}</Terminal>

      <div className="prose">
        <h2>Cuatro pilotos que suelen ser seguros si se acotan</h2>
        <ul>
          <li><strong>Email:</strong> clasifica y propone un borrador; una persona decide si lo envía.</li>
          <li><strong>Reuniones:</strong> genera resumen, decisiones y tareas; el anfitrión corrige antes de compartirlo.</li>
          <li><strong>Facturas:</strong> extrae JSON/CSV con esquema fijo, alertas y umbral de confianza; administración valida antes de exportar.</li>
          <li><strong>RAG interno:</strong> responde solo sobre un conjunto pequeño de documentos autorizados, cita la fuente y se abstiene cuando no la encuentra.</li>
        </ul>
      </div>

      <Cuidado>
        Una factura no se "entrena" con tres ejemplos. Para extracción, define un esquema, prueba una muestra representativa —incluye documentos difíciles— y obliga al flujo a marcar dudas. No conectes la primera versión al banco, a pagos ni al programa contable.
      </Cuidado>

      <div className="prose">
        <h2>Checklist de salida antes de ampliar</h2>
        <ul>
          <li>La persona responsable puede explicar para qué sirve el flujo y detenerlo.</li>
          <li>El equipo sabe qué datos entran, dónde se alojan, quién accede y cuánto se conservan.</li>
          <li>Hay una prueba con casos normales, ambiguos y erróneos; los fallos se registran.</li>
          <li>Las acciones irreversibles requieren aprobación humana explícita.</li>
          <li>El coste incluye suscripciones o API, infraestructura, energía, soporte, copias y tiempo de revisión.</li>
          <li>Si hay datos personales o un caso de alto riesgo, se ha involucrado al responsable/asesor de protección de datos correspondiente.</li>
        </ul>
      </div>

      <Comprueba>
        Completa la ficha para una tarea real. Si no puedes describir su entrada mínima, salida verificable, persona revisora y métrica, todavía no automatices: vuelve al proceso manual y acláralo primero.
      </Comprueba>

      <Guardar>
        Descarga la <a href="/recursos/ia-pymes/diagnostico-piloto-ia-pymes.md">plantilla editable en Markdown</a>. Se revisa editorialmente cada semana: cada herramienta añadida debe indicar fecha de comprobación, coste supuesto, ubicación de los datos, riesgos, alternativa y fuente oficial. Las alertas de seguridad se corrigen fuera de ese ciclo.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/mapa", label: "Mapa para pymes" }}
        next={{ href: "/cursos/ia-pymes/rgpd-basico", label: "RGPD básico" }}
      />
    </Chapter>
  );
}
