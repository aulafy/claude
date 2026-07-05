import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Docker Compose para stack completo de IA local — Automatización self-hosted",
  description:
    "Monta un stack local reproducible con Ollama, Open WebUI, Qdrant, n8n y perfiles Docker Compose para activar servicios según hardware y proyecto.",
  keywords: [
    "docker compose ia local ollama n8n qdrant open webui",
    "stack local ai production n8n ollama qdrant",
    "Ollama Open WebUI n8n Qdrant Docker",
    "docker compose perfiles IA local",
  ],
  alternates: { canonical: "/cursos/automatizacion-self-hosted/stack-docker-ia-local" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Stack Docker"
      title="Docker Compose para stack completo de IA local"
      icon="server"
      lead={<>Un stack local útil no debe ser una carpeta llena de comandos sueltos. Docker Compose te permite levantar interfaz, automatización y base vectorial con volúmenes, perfiles y una ruta clara de backup.</>}
      courseHref="/cursos/automatizacion-self-hosted"
      courseLabel="Automatización self-hosted"
    >
      <Objetivos>
        <ul>
          <li>Separar servicios base de servicios opcionales con perfiles.</li>
          <li>Guardar estado en volúmenes persistentes.</li>
          <li>Evitar el clásico “funciona en mi terminal, pero no sé repetirlo”.</li>
        </ul>
      </Objetivos>

      <Cristiano term="perfil de Compose">
        Un perfil permite activar servicios opcionales solo cuando los necesitas. Por ejemplo: base, RAG, automatización o GPU.
      </Cristiano>

      <Terminal>{`services:
  qdrant:
    image: qdrant/qdrant:latest
    ports: ["6333:6333"]
    volumes:
      - qdrant_data:/qdrant/storage

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports: ["3000:8080"]
    volumes:
      - open_webui_data:/app/backend/data
    environment:
      - OLLAMA_BASE_URL=http://host.docker.internal:11434

  n8n:
    image: n8nio/n8n:latest
    profiles: ["automation"]
    ports: ["5678:5678"]
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_ENCRYPTION_KEY=change-me

volumes:
  qdrant_data:
  open_webui_data:
  n8n_data:`}</Terminal>

      <Idea>
        En portátiles y Windows suele ir mejor ejecutar Ollama nativo en el host y dejar Docker para Open WebUI, n8n y Qdrant. Así reduces fricción de GPU dentro de contenedores.
      </Idea>

      <Terminal>{`# Base: Qdrant + Open WebUI
docker compose up -d

# Añadir automatización con n8n
docker compose --profile automation up -d

# Ver estado y logs
docker compose ps
docker compose logs -f open-webui

# Backup mínimo
docker run --rm -v open_webui_data:/data -v "$PWD:/backup" alpine \
  tar czf /backup/open-webui-backup.tgz /data`}</Terminal>

      <Cuidado>
        No publiques este stack directamente a internet. Antes necesitas HTTPS, autenticación, backups probados, secretos fuera del repo y revisar qué puertos quedan expuestos.
      </Cuidado>

      <Comprueba>
        Reinicia el ordenador y vuelve a levantar el stack. Si pierdes usuarios, chats o colecciones, tus volúmenes no están bien montados.
      </Comprueba>

      <Guardar>
        Un buen compose no es el más grande. Es el que puedes parar, actualizar, restaurar y explicar seis meses después.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">Docker Compose</a></li>
          <li><a href="https://docs.docker.com/compose/how-tos/profiles/" target="_blank" rel="noopener noreferrer">Docker Compose profiles</a></li>
          <li><a href="https://docs.openwebui.com/" target="_blank" rel="noopener noreferrer">Open WebUI documentation</a></li>
          <li><a href="https://qdrant.tech/documentation/" target="_blank" rel="noopener noreferrer">Qdrant documentation</a></li>
          <li><a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer">n8n Docs</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/automatizacion-self-hosted/docker-vps", label: "Docker y VPS" }}
        next={{ href: "/cursos/automatizacion-self-hosted/ollama-openwebui", label: "Ollama y Open WebUI" }}
      />
    </Chapter>
  );
}
