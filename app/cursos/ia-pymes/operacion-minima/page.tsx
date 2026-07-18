import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Operación mínima: logs, responsable, copias y modo degradado",
  description:
    "Prepara la operación mínima de un flujo de IA para pymes: responsable, logs útiles, secretos, copias, restauración y modo degradado antes de ampliar automatizaciones.",
  keywords: ["operación IA pyme", "logs automatización IA", "backup n8n IA", "modo degradado IA", "responsable flujo IA"],
  alternates: { canonical: "/cursos/ia-pymes/operacion-minima" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Operación mínima"
      title="Operación mínima: logs, responsable, copias y modo degradado"
      icon="shield"
      lead={<>Un flujo puede acertar hoy y fallar mañana por un cambio de proveedor, una credencial caducada, un documento distinto o un error humano. La operación mínima hace que el equipo pueda detectar el problema, detenerlo, recuperarse y seguir trabajando sin depender de la suerte.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Asignar una persona responsable de cada flujo y de sus decisiones de cambio.</li>
          <li>Registrar lo suficiente para reconstruir un error sin guardar secretos ni datos de más.</li>
          <li>Diseñar una copia comprobada y un modo manual cuando algo falle.</li>
        </ul>
      </Objetivos>

      <Cristiano term="modo degradado">
        Es la forma segura de seguir trabajando cuando la automatización no está disponible o no cumple sus reglas. Puede ser crear un borrador pendiente, poner una tarea en cola o volver temporalmente al proceso manual; nunca debe ser inventar una respuesta o saltarse una aprobación.
      </Cristiano>

      <div className="prose">
        <h2>Todo flujo necesita una persona dueña</h2>
        <p>La IA no es responsable de un proceso. Asigna un nombre y una función: una persona propietaria decide para qué sirve el flujo y cuándo se pausa; una persona operadora revisa alertas y copias; y una persona revisora aprueba las salidas que tienen impacto. En una empresa pequeña pueden ser la misma persona, pero los papeles deben quedar escritos.</p>
      </div>

      <Terminal>{"FICHA DE OPERACIÓN\n\nflujo: clasificación de emails con borrador\npropietario: responsable de atención\noperador: persona que revisa alertas y accesos\nrevisor: quien aprueba cada borrador\nhorario y volumen esperado: laboral; hasta 40 al día\nacciones prohibidas: enviar, borrar, cambiar CRM o prometer condiciones\ncontacto si falla: canal interno y proceso manual\nfecha de próxima revisión: YYYY-MM-DD"}</Terminal>

      <Idea>
        El mejor log no es el que guarda todo: es el que permite responder qué entró, qué versión del flujo respondió, qué resultado se produjo, quién lo aprobó y por qué se detuvo.
      </Idea>

      <div className="prose">
        <h2>Logs útiles, no un vertedero de datos</h2>
        <p>Para cada ejecución guarda un identificador, fecha, versión del flujo, estado, fuente o entrada mínima autorizada, reglas que fallaron, coste o uso aproximado y decisión humana. Protege el acceso a esos registros y minimiza texto personal, adjuntos, claves y contenido sensible. Si necesitas reproducir un caso, conserva una referencia segura o una copia autorizada, no exportes todos los documentos a un log plano.</p>
        <ul>
          <li><strong>Entrada:</strong> ID interno o resumen minimizado, no secretos.</li>
          <li><strong>Proceso:</strong> versión de prompt, modelo, herramienta y validaciones aplicadas.</li>
          <li><strong>Salida:</strong> estado, campos clave, evidencia y motivos de abstención.</li>
          <li><strong>Decisión:</strong> aprobada, corregida, rechazada o enviada a proceso manual.</li>
        </ul>
      </div>

      <Terminal>{"registro_minimo:\n  ejecucion_id: mail-2026-07-18-017\n  flujo_version: 1.2\n  estado: revisar\n  entrada_ref: ticket-483\n  modelo_o_servicio: proveedor-configurado\n  validaciones: [asunto_presente, datos_minimizados]\n  evidencia: [base-conocimiento-v3/seccion-4]\n  abstencion: false\n  decision_humana: pendiente\n  coste_estimado: 0.01\n  error_tecnico: null"}</Terminal>

      <div className="prose">
        <h2>Una copia solo existe si puedes restaurarla</h2>
        <p>Haz copia de la configuración del flujo, credenciales almacenadas de forma segura, plantillas, reglas, datos necesarios para operar y documentación de restauración. Después prueba a restaurar en un entorno seguro o con una copia no productiva. Una copia que nadie ha restaurado es una hipótesis, no una medida de continuidad.</p>
        <ul>
          <li>Separa configuración, datos de negocio, secretos y logs; no todos requieren la misma retención.</li>
          <li>Documenta quién puede restaurar y desde dónde.</li>
          <li>Prueba una restauración antes de depender del sistema.</li>
          <li>Actualiza la copia cuando cambien flujos, accesos o herramientas.</li>
        </ul>
      </div>

      <Cuidado>
        Un backup no justifica guardar datos personales indefinidamente. Define retención, acceso y borrado de acuerdo con el caso y la normativa aplicable. Las claves nunca deben quedar dentro del repositorio, de una captura o de una plantilla compartida.
      </Cuidado>

      <div className="prose">
        <h2>Diseña el fallo antes de que ocurra</h2>
        <p>Escribe una respuesta para cuatro escenarios: el proveedor está caído, se supera el presupuesto, una validación falla o llega una entrada duplicada. En los cuatro casos, el flujo debe parar o degradarse de manera visible. Para entradas repetidas, usa un identificador y una regla de idempotencia: procesar dos veces no puede enviar dos veces, registrar dos veces ni cobrar dos veces.</p>
      </div>

      <Terminal>{"SI el proveedor no responde:\n  guardar tarea en cola o crear borrador pendiente\n  avisar al operador\n  no reintentar sin límite\n\nSI se supera el presupuesto:\n  pausar llamadas externas\n  usar proceso manual o alternativa aprobada\n  registrar el motivo\n\nSI una validación falla:\n  estado = revisar\n  no ejecutar acción posterior\n\nSI llega un duplicado:\n  localizar ejecucion_id\n  reutilizar estado o pedir revisión; nunca duplicar la acción"}</Terminal>

      <Comprueba>
        Haz un simulacro de quince minutos: corta una credencial de prueba o usa una entrada inválida. El equipo debe saber qué alerta aparece, quién decide, qué se registra y cómo se trabaja manualmente hasta recuperar el flujo.
      </Comprueba>

      <Guardar>
        Completa la ficha de operación y el simulacro en el <a href="/recursos/ia-pymes/kit-flujo-fiable-pyme.md">kit de flujo fiable</a>. Cuando la operación mínima sea explicable, puedes decidir con prudencia qué permiso, si alguno, necesita el siguiente paso.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/pruebas-metricas", label: "Pruebas de fallo y métricas" }}
        next={{ href: "/cursos/ia-pymes/permisos-agentes", label: "Permisos y agentes" }}
      />
    </Chapter>
  );
}
