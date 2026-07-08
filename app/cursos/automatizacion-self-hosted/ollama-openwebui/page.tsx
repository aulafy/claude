import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Ollama y Open WebUI como interfaz privada",
  description:
    "Configura Ollama y Open WebUI como interfaz privada para modelos locales, APIs compatibles OpenAI, herramientas y conocimiento interno.",
  keywords: ["Open WebUI Ollama", "interfaz IA privada", "Ollama OpenAI compatible", "Open WebUI tools"],
  alternates: { canonical: "/cursos/automatizacion-self-hosted/ollama-openwebui" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Ollama y Open WebUI"
      title="Ollama y Open WebUI como interfaz privada"
      icon="chat"
      lead={<>Open WebUI puede ser la puerta de entrada para el equipo: chat, modelos, herramientas y conocimiento interno. Ollama aporta una forma simple de ejecutar modelos locales.</>}
      courseHref="/cursos/automatizacion-self-hosted"
      courseLabel="Automatización self-hosted"
    >
      <Objetivos>
        <ul>
          <li>Conectar Open WebUI con Ollama o endpoints compatibles con OpenAI.</li>
          <li>Decidir qué usuarios, modelos y herramientas puede usar cada perfil.</li>
          <li>Evitar que el chat interno se convierta en un cajón sin permisos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="API compatible OpenAI">
        Es una API que imita el formato de OpenAI para que muchas herramientas puedan cambiar de proveedor sin reescribirlo todo.
      </Cristiano>

      <Terminal>{`perfiles:
  administracion:
    modelos: [local-small, cloud-strong]
    tools: [buscar_factura, crear_borrador_email]
  soporte:
    modelos: [local-small]
    tools: [buscar_faq, crear_ticket]
  direccion:
    modelos: [cloud-strong]
    tools: [resumen_kpis]

prohibido:
  - herramientas sin log
  - enviar emails directos
  - acceder a datos fuera del rol`}</Terminal>

      <Idea>
        Open WebUI documenta extensibilidad con herramientas, funciones, pipelines, MCP y OpenAPI. Úsalo como interfaz controlada, no como permiso universal.
      </Idea>

      <Cuidado>
        Modelo local no significa automáticamente privado si las herramientas conectan con servicios externos. La privacidad se diseña en todo el flujo.
      </Cuidado>

      <Comprueba>
        Crea una matriz de roles: usuario, modelo permitido, herramientas, datos accesibles y acciones que requieren aprobación.
      </Comprueba>

      <Guardar>
        El chat interno debe tener menos poder que el usuario humano, no más.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/automatizacion-self-hosted/docker-vps", label: "Docker y VPS" }}
        next={{ href: "/cursos/automatizacion-self-hosted/n8n-webhooks", label: "n8n y webhooks" }}
      />
    </Chapter>
  );
}
