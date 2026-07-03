import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Docker y VPS barato sin liarla — Automatización self-hosted",
  description:
    "Cómo preparar un VPS o mini PC para automatización IA con Docker, dominios, HTTPS, variables de entorno, volúmenes y backups.",
  keywords: ["VPS n8n Open WebUI Docker", "self hosted IA barato", "Docker IA pymes", "n8n VPS"],
  alternates: { canonical: "/cursos/automatizacion-self-hosted/docker-vps" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Docker y VPS"
      title="Docker y VPS barato sin liarla"
      icon="server"
      lead={<>Un VPS barato puede sostener muchas automatizaciones de oficina, pero solo si separas datos persistentes, secretos, actualizaciones y backups desde el principio.</>}
      courseHref="/cursos/automatizacion-self-hosted"
      courseLabel="Automatización self-hosted"
    >
      <Objetivos>
        <ul>
          <li>Preparar una base simple con Docker Compose y volúmenes persistentes.</li>
          <li>Distinguir demo local, servidor interno y exposición pública.</li>
          <li>Evitar errores habituales con claves, puertos y actualizaciones.</li>
        </ul>
      </Objetivos>

      <Cristiano term="volumen">
        Es la carpeta persistente donde Docker guarda datos importantes aunque borres o actualices un contenedor.
      </Cristiano>

      <Terminal>{`/opt/aulafy-ia/
  docker-compose.yml
  .env
  data/
    n8n/
    open-webui/
    postgres/
    qdrant/
  backups/
  logs/

reglas:
  - .env nunca al repo
  - volumen para cada servicio con datos
  - proxy HTTPS delante
  - puerto interno no expuesto si no hace falta`}</Terminal>

      <Idea>
        Para empezar, un único VPS con Docker Compose es más educativo que Kubernetes. Cuando entiendas límites y cuellos de botella, ya tendrás criterio para crecer.
      </Idea>

      <Cuidado>
        No publiques n8n, Open WebUI u Ollama directamente a internet sin autenticación, HTTPS y firewall. Un panel privado expuesto es una invitación al desastre.
      </Cuidado>

      <Comprueba>
        Antes de instalar nada, escribe cómo restaurarías el sistema en otra máquina: dominio, `.env`, volúmenes, backup y versión de imágenes.
      </Comprueba>

      <Guardar>
        En self-hosted, la pregunta clave no es “¿arranca?”. Es “¿puedo actualizarlo y restaurarlo sin perder datos?”.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/automatizacion-self-hosted/mapa-stack", label: "Mapa del stack" }}
        next={{ href: "/cursos/automatizacion-self-hosted/ollama-openwebui", label: "Ollama y Open WebUI" }}
      />
    </Chapter>
  );
}
