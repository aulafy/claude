import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Open WebUI + Ollama + Qdrant con Docker Compose",
  description:
    "Monta un stack local de IA con Ollama, Open WebUI y Qdrant usando Docker Compose para chat privado, interfaz web y base vectorial RAG.",
  keywords: [
    "Open WebUI Ollama Docker Compose",
    "Open WebUI Qdrant",
    "Ollama Open WebUI español",
    "stack IA local",
    "Qdrant Docker RAG",
  ],
  alternates: { canonical: "/cursos/ia-local/open-webui-qdrant" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Open WebUI + Qdrant"
      title="Open WebUI + Ollama + Qdrant con Docker Compose"
      icon="server"
      lead={<>Este stack te da una interfaz tipo ChatGPT, modelos locales con Ollama y una base vectorial para RAG. Es una base práctica para aprender, hacer demos internas o montar un laboratorio privado.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Arrancar Open WebUI, Ollama y Qdrant con Docker Compose.</li>
          <li>Entender qué hace cada servicio y cómo se comunican.</li>
          <li>Verificar que el stack responde antes de subir documentos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="stack local">
        Es un conjunto de servicios que corren en tu máquina: uno sirve modelos, otro da la interfaz web y otro guarda vectores para buscar documentos.
      </Cristiano>

      <div className="prose">
        <h2>Estructura del proyecto</h2>
      </div>

      <Terminal>{`aulafy-stack/
  docker-compose.yml
  data/
    ollama/
    open-webui/
    qdrant/`}</Terminal>

      <div className="prose">
        <h2>docker-compose.yml</h2>
      </div>

      <Terminal>{`services:
  ollama:
    image: ollama/ollama:latest
    container_name: aulafy-ollama
    ports:
      - "11434:11434"
    volumes:
      - ./data/ollama:/root/.ollama
    restart: unless-stopped

  qdrant:
    image: qdrant/qdrant:latest
    container_name: aulafy-qdrant
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - ./data/qdrant:/qdrant/storage
    restart: unless-stopped

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: aulafy-open-webui
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
      - VECTOR_DB=qdrant
      - QDRANT_URI=http://qdrant:6333
    volumes:
      - ./data/open-webui:/app/backend/data
    depends_on:
      - ollama
      - qdrant
    restart: unless-stopped`}</Terminal>

      <div className="prose">
        <h2>Arranque</h2>
      </div>

      <Terminal>{`mkdir aulafy-stack
cd aulafy-stack
# crea docker-compose.yml con el contenido anterior
docker compose up -d
docker compose ps`}</Terminal>

      <Comprueba>
        Abre <code>http://localhost:3000</code> para Open WebUI y <code>http://localhost:6333/dashboard</code> para Qdrant. Si ambas cargan, la base está viva.
      </Comprueba>

      <div className="prose">
        <h2>Descarga un modelo</h2>
      </div>

      <Terminal>{`docker exec -it aulafy-ollama ollama pull qwen3:4b
docker exec -it aulafy-ollama ollama run qwen3:4b`}</Terminal>

      <Idea>
        Para muchos portátiles, conviene ejecutar Ollama nativo fuera de Docker y dejar Docker solo para Open WebUI y Qdrant. Si el rendimiento GPU falla en Docker, prueba esa arquitectura híbrida.
      </Idea>

      <Cuidado>
        Este compose es para laboratorio local. Si lo expones a internet, necesitas autenticación fuerte, HTTPS, backups, actualizaciones y revisar permisos. No publiques Qdrant abierto.
      </Cuidado>

      <div className="prose">
        <h2>Comandos útiles</h2>
      </div>

      <Terminal>{`docker compose logs -f open-webui
docker compose logs -f ollama
docker compose logs -f qdrant
docker compose pull
docker compose up -d
docker compose down`}</Terminal>

      <Guardar>
        Este stack es tu laboratorio de IA local: Open WebUI para conversar, Ollama para modelos y Qdrant para RAG. Guárdalo como plantilla y crea una copia por proyecto importante.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/hardware-minimo-2026", label: "Hardware mínimo 2026" }}
        next={{ href: "/cursos/ia-local/chatbot-legal", label: "Chatbot que cita la ley" }}
      />
    </Chapter>
  );
}
