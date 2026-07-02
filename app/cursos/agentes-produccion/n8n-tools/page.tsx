import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "n8n como capa de herramientas — Agentes en producción",
  description:
    "Cómo usar n8n con agentes de IA para conectar emails, hojas de cálculo, CRMs, webhooks y APIs sin mezclar lógica de negocio con razonamiento.",
  keywords: ["n8n agentes IA", "n8n IA local", "automatización IA pymes", "n8n Ollama"],
  alternates: { canonical: "/cursos/agentes-produccion/n8n-tools" },
};

export default function Page() {
  return (
    <Chapter
      crumb="n8n como herramientas"
      title="n8n como capa de herramientas"
      icon="automation"
      lead={<>n8n brilla cuando hay que conectar cosas: Gmail, formularios, hojas, CRMs, webhooks y APIs. Úsalo como manos del agente, no como una caja negra que decide todo sin control.</>}
      courseHref="/cursos/agentes-produccion"
      courseLabel="Agentes en producción"
    >
      <Objetivos>
        <ul>
          <li>Diseñar n8n como capa de integración para agentes.</li>
          <li>Separar disparadores, herramientas, aprobaciones y logs.</li>
          <li>Preparar un flujo compatible con modelos locales o cloud.</li>
        </ul>
      </Objetivos>

      <Cristiano term="herramienta">
        Para un agente, una herramienta es una acción externa con contrato claro: buscar cliente, crear borrador, leer factura, actualizar hoja o llamar a una API. Cuanto más claro sea el contrato, menos improvisa.
      </Cristiano>

      <div className="prose">
        <h2>Flujo base en n8n</h2>
      </div>

      <Terminal>{`Webhook o Email Trigger
  -> Normalizar entrada
  -> AI Agent o HTTP Request a LangGraph
  -> Switch por riesgo
  -> Crear borrador / pedir aprobación / rechazar
  -> Guardar log
  -> Notificar resultado`}</Terminal>

      <Idea>
        Si n8n ejecuta la acción, n8n también debe guardar el log. No dependas solo del historial del chat del modelo.
      </Idea>

      <div className="prose">
        <h2>Contratos de herramientas</h2>
        <p>Cada herramienta debe definir entrada, salida y límite. Ejemplo:</p>
      </div>

      <Terminal>{`tool: create_email_draft
input:
  to: email
  subject: string
  body: string
output:
  draft_id: string
forbidden:
  - send_without_approval
  - attach_private_files`}</Terminal>

      <Cuidado>
        No dejes que el modelo invente destinatarios, importes o IDs. Esos datos deben venir de una fuente verificable o de una aprobación humana.
      </Cuidado>

      <Comprueba>
        Crea primero un flujo que solo genere borradores y logs. Si durante una semana los borradores son correctos, sube un nivel de autonomía.
      </Comprueba>

      <Guardar>
        n8n es ideal para que una pyme vea, edite y mantenga el flujo. LangGraph puede quedar detrás para decisiones complejas, expuesto como webhook o API interna.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-produccion/estado-memoria", label: "Estado, memoria y bucles" }}
        next={{ href: "/cursos/agentes-produccion/human-in-the-loop", label: "Aprobaciones humanas y permisos" }}
      />
    </Chapter>
  );
}
