import type { Metadata } from "next";
import { Chapter, Objetivos, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Aprobaciones humanas y permisos — Agentes en producción",
  description:
    "Diseña agentes con human-in-the-loop, permisos mínimos y revisión humana antes de enviar, borrar, publicar, pagar o modificar datos sensibles.",
  alternates: { canonical: "/cursos/agentes-produccion/human-in-the-loop" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Aprobaciones humanas"
      title="Aprobaciones humanas y permisos"
      icon="userShield"
      lead={<>La revisión humana no es un fracaso de la automatización. Es el cinturón de seguridad que permite usar agentes en tareas reales sin convertir cada error en un incidente.</>}
      courseHref="/cursos/agentes-produccion"
      courseLabel="Agentes en producción"
    >
      <Objetivos>
        <ul>
          <li>Clasificar acciones por riesgo antes de automatizarlas.</li>
          <li>Crear puntos de aprobación para tareas peligrosas.</li>
          <li>Aplicar permisos mínimos a herramientas y credenciales.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Matriz de permisos</h2>
        <ul>
          <li><strong>Leer</strong>: permitido si el dato es necesario.</li>
          <li><strong>Crear borrador</strong>: permitido con log.</li>
          <li><strong>Enviar o publicar</strong>: requiere aprobación.</li>
          <li><strong>Borrar, pagar o cambiar permisos</strong>: prohibido al principio.</li>
        </ul>
      </div>

      <Terminal>{`low_risk:
  - resumir
  - clasificar
  - crear borrador
medium_risk:
  - actualizar CRM
  - crear ticket
high_risk:
  - enviar email
  - publicar contenido
  - emitir factura
forbidden:
  - borrar datos
  - cambiar permisos
  - exfiltrar secretos`}</Terminal>

      <Cristiano term="human-in-the-loop">
        Es meter una parada obligatoria para que una persona revise antes de ejecutar una acción sensible. El agente prepara; la persona decide.
      </Cristiano>

      <Cuidado>
        Las credenciales de n8n, GitHub, email o CRM no deben estar disponibles para todos los pasos. Cada herramienta necesita solo el permiso que usa.
      </Cuidado>

      <Comprueba>
        Prueba el flujo con una tarea peligrosa escrita como si fuera una instrucción maliciosa. El agente debe rechazarla o escalarla, no obedecerla.
      </Comprueba>

      <Guardar>
        En producción, “aprobar” debe ser una acción explícita y registrada: quién aprobó, qué aprobó, cuándo y con qué datos.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-produccion/n8n-tools", label: "n8n como capa de herramientas" }}
        next={{ href: "/cursos/agentes-produccion/evals-logs", label: "Evals, logs y observabilidad" }}
      />
    </Chapter>
  );
}
