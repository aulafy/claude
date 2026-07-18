import type { Metadata } from "next";
import Link from "next/link";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Permisos y agentes: automatiza solo cuando el flujo esté listo",
  description:
    "Decide cuándo un flujo de IA para una pyme puede recibir permisos, aprobaciones o agentes. Aplica mínimo privilegio, pruebas y modo borrador antes de actuar.",
  keywords: ["permisos agentes IA pyme", "automatización segura IA", "aprobación humana agente", "mínimo privilegio IA", "agentes IA empresa"],
  alternates: { canonical: "/cursos/ia-pymes/permisos-agentes" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Permisos y agentes"
      title="Permisos y agentes: automatiza solo cuando el flujo esté listo"
      icon="shield"
      lead={<>Un agente no arregla un proceso que todavía no tiene reglas, pruebas ni responsable. Primero consigue un flujo fiable en modo borrador. Solo después concede el permiso mínimo necesario, para una acción concreta, con una aprobación proporcional al impacto.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Distinguir un borrador, una automatización acotada y un agente con herramientas.</li>
          <li>Otorgar permisos mínimos y reversibles según el daño posible.</li>
          <li>Decidir cuándo un caso debe seguir con revisión humana o pasar a una ruta técnica de agentes.</li>
        </ul>
      </Objetivos>

      <Cristiano term="mínimo privilegio">
        Es dar a una herramienta solo el acceso imprescindible para su tarea y nada más. Si el flujo necesita leer un ticket y proponer una respuesta, no necesita enviar emails, borrar archivos, usar una cuenta administradora ni acceder a toda la base de clientes.
      </Cristiano>

      <div className="prose">
        <h2>No todo flujo necesita un agente</h2>
        <p>Una plantilla que clasifica un email y crea un borrador puede ser un flujo sencillo con reglas fijas. Un agente aparece cuando el sistema decide qué herramienta usar, mantiene estado o encadena pasos con cierta autonomía. Esa capacidad puede aportar valor, pero multiplica las combinaciones de error. No añadas herramientas, memoria o varios agentes porque suene avanzado: añádelos solo cuando una tarea medida no se resuelva con un flujo más pequeño.</p>
      </div>

      <Terminal>{"NIVEL 0 · Asistente\nLee una entrada y prepara un borrador. No escribe ni envía.\n\nNIVEL 1 · Flujo acotado\nClasifica o extrae con esquema, validación y revisión. Puede guardar en una zona de borradores.\n\nNIVEL 2 · Acción con aprobación\nPropone una acción; una persona la revisa y la confirma explícitamente.\n\nNIVEL 3 · Permiso limitado\nEjecuta una acción reversible y registrada dentro de un alcance probado.\n\nNIVEL 4 · Agente con herramientas\nPlanifica pasos y usa herramientas. Requiere estado, límites, observabilidad y recuperación específicos."}</Terminal>

      <Idea>
        La autonomía no es un interruptor. Se concede por tarea, dato, acción y entorno; se puede retirar en cuanto una métrica o un incidente lo aconseje.
      </Idea>

      <div className="prose">
        <h2>Una escalera de permisos práctica</h2>
        <ul>
          <li><strong>Lectura en entorno de prueba:</strong> usa datos sintéticos o autorizados y no toca sistemas reales.</li>
          <li><strong>Escritura de borradores:</strong> guarda una propuesta separada del sistema final y exige revisión.</li>
          <li><strong>Acción reversible:</strong> solo tras pruebas, registro y una forma clara de deshacerla.</li>
          <li><strong>Acción irreversible o sensible:</strong> requiere aprobación humana explícita; pagos, contratos, envíos, borrados y decisiones sobre personas no son un buen primer permiso.</li>
        </ul>
        <p>Usa cuentas de servicio separadas, límites de alcance y vencimiento de credenciales. No compartas una clave de administración con un agente ni coloques secretos dentro de prompts, documentos de prueba o repositorios.</p>
      </div>

      <Terminal>{"MATRIZ DE PERMISOS\n\nacción: crear borrador de respuesta\nentorno: bandeja de prueba\ncuenta: servicio-borradores\npuede_leer: ticket asignado y base documental autorizada\npuede_escribir: carpeta borradores\nno_puede: enviar, borrar, descargar masivamente, cambiar CRM\naprobación: responsable de atención antes de enviar\nregistro: ejecucion_id, propuesta, revisor y decisión\nrevocación: desactivar cuenta de servicio y pausar flujo"}</Terminal>

      <div className="prose">
        <h2>Condiciones para avanzar a una automatización con acción</h2>
        <p>Antes de conceder un permiso adicional, comprueba que existe un contrato de flujo, una muestra de pruebas con fallos, métricas revisadas, responsable y operación mínima. Define también una tasa de error o un tipo de incidente que obligue a volver al modo borrador. Si no puedes explicar cómo revocar el acceso y recuperar el proceso manual, el permiso todavía es demasiado amplio.</p>
      </div>

      <Cuidado>
        Un prompt no es una frontera de seguridad. Un email, un documento o una web pueden incluir instrucciones que intenten cambiar el objetivo del sistema. Los permisos técnicos, la validación y la aprobación humana deben limitar el daño aunque el modelo siga una instrucción incorrecta.
      </Cuidado>

      <div className="prose">
        <h2>Cuándo seguir hacia agentes en producción</h2>
        <p>Si el caso necesita varias herramientas, estado, reintentos, colas, permisos por usuario o recuperación de fallos, continúa con la ruta técnica de agentes. Allí aprenderás a diseñar esos componentes sin convertir una demo en un sistema opaco. Si tu caso funciona como borrador con revisión, mantenerlo así puede ser la decisión más rentable y segura.</p>
        <p><Link href="/cursos/agentes-produccion" className="text-cyan-300 hover:text-cyan-200">Abrir «Agentes en producción»</Link> cuando ya tengas este checklist completado.</p>
      </div>

      <Comprueba>
        Elige una acción que te gustaría automatizar y escribe el permiso más pequeño que permitiría ensayarla. Después escribe cómo lo revocarías y qué haría el equipo si el flujo se pausara. Si cualquiera de las dos respuestas es vaga, mantén el modo borrador.
      </Comprueba>

      <Guardar>
        Cierra el <a href="/recursos/ia-pymes/kit-flujo-fiable-pyme.md">kit de flujo fiable</a> con la matriz de permisos. No hay obligación de llegar a un agente: el objetivo es un proceso útil que conserve el control.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/operacion-minima", label: "Operación mínima" }}
        next={{ href: "/cursos/ia-pymes/emails", label: "Emails: borradores revisables" }}
      />
    </Chapter>
  );
}
