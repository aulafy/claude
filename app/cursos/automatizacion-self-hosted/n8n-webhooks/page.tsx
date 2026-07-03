import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "n8n con webhooks y credenciales — Automatización self-hosted",
  description:
    "Diseña flujos n8n con webhooks, credenciales, normalización de entrada, logs y contratos de herramientas para agentes de IA.",
  keywords: ["n8n webhooks IA", "n8n credenciales agentes", "automatización pymes n8n", "webhook IA local"],
  alternates: { canonical: "/cursos/automatizacion-self-hosted/n8n-webhooks" },
};

export default function Page() {
  return (
    <Chapter
      crumb="n8n y webhooks"
      title="n8n con webhooks y credenciales"
      icon="link"
      lead={<>n8n es ideal para conectar formularios, email, CRM, hojas de cálculo y APIs. La clave es que cada workflow tenga contrato, logs y límites claros.</>}
      courseHref="/cursos/automatizacion-self-hosted"
      courseLabel="Automatización self-hosted"
    >
      <Objetivos>
        <ul>
          <li>Crear workflows que reciben eventos por webhook y normalizan datos.</li>
          <li>Gestionar credenciales sin pegarlas en prompts ni código.</li>
          <li>Convertir n8n en una capa de herramientas mantenible.</li>
        </ul>
      </Objetivos>

      <Cristiano term="webhook">
        Es una URL que recibe un evento externo y dispara un workflow, por ejemplo un formulario enviado o un ticket nuevo.
      </Cristiano>

      <Terminal>{`Webhook
  -> Validar firma o token
  -> Normalizar payload
  -> Guardar evento bruto
  -> Clasificar riesgo
  -> Llamar modelo o API interna
  -> Switch:
       bajo: crear borrador
       medio: pedir aprobacion
       alto: escalar humano
  -> Guardar log final`}</Terminal>

      <Idea>
        n8n documenta nodos Webhook para iniciar workflows desde eventos. Trata cada webhook como una entrada pública: valida, limita y registra.
      </Idea>

      <Cuidado>
        No uses un webhook sin secreto para acciones de negocio. Aunque la URL sea difícil de adivinar, no es una política de seguridad.
      </Cuidado>

      <Comprueba>
        Define un contrato por webhook: quién lo llama, payload esperado, autenticación, límite de tamaño, respuesta y log.
      </Comprueba>

      <Guardar>
        Un workflow mantenible empieza con entrada limpia y termina con evidencia.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/automatizacion-self-hosted/ollama-openwebui", label: "Ollama y Open WebUI" }}
        next={{ href: "/cursos/automatizacion-self-hosted/aprobaciones-humanas", label: "Aprobaciones humanas" }}
      />
    </Chapter>
  );
}
