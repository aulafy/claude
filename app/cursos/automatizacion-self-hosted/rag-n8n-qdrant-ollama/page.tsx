import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "RAG privado con n8n, Qdrant y Ollama",
  description:
    "Crea un agente RAG privado con n8n, Qdrant, Ollama y Open WebUI: ingesta, búsqueda, respuesta por chat o Telegram, permisos y troubleshooting.",
  keywords: [
    "rag privado n8n qdrant ollama",
    "n8n ollama qdrant rag agent telegram",
    "workflow n8n llm local",
    "Open WebUI Qdrant RAG local",
    "automatización IA self-hosted RAG",
  ],
  alternates: { canonical: "/cursos/automatizacion-self-hosted/rag-n8n-qdrant-ollama" },
};

export default function Page() {
  return (
    <Chapter
      crumb="RAG con n8n"
      title="RAG privado con n8n, Qdrant y Ollama"
      icon="database"
      lead={<>El stack que más se repite para pymes y solopreneurs es sencillo: documentos privados en Qdrant, modelo local con Ollama y n8n como pegamento para recibir preguntas, consultar contexto y responder con control humano.</>}
      courseHref="/cursos/automatizacion-self-hosted"
      courseLabel="Automatización self-hosted"
    >
      <Objetivos>
        <ul>
          <li>Diseñar un flujo RAG local sin enviar documentos a APIs externas.</li>
          <li>Separar ingesta, recuperación, generación y envío de respuesta.</li>
          <li>Evitar respuestas sin evidencia y fugas entre usuarios.</li>
        </ul>
      </Objetivos>

      <Cristiano term="RAG privado">
        Es un sistema que busca fragmentos relevantes en tus documentos antes de responder. La privacidad depende de dónde guardas documentos, embeddings, logs y respuestas.
      </Cristiano>

      <div className="prose">
        <h2>Mapa del flujo</h2>
      </div>

      <Terminal>{`Entrada: Telegram / formulario / chat interno
  -> n8n valida usuario y pregunta
  -> n8n crea embedding o llama a un servicio de embeddings
  -> Qdrant devuelve chunks permitidos
  -> Ollama genera respuesta con citas
  -> n8n guarda traza y envía borrador
  -> humano aprueba si la acción tiene impacto real`}</Terminal>

      <Idea>
        Para soporte interno o FAQ, no necesitas un agente “muy autónomo”. Necesitas recuperación fiable, citas, permisos y una respuesta que se pueda auditar.
      </Idea>

      <div className="prose">
        <h2>Docker compose de laboratorio</h2>
        <p>
          Este compose es una base local. En producción añade HTTPS, backups, usuarios, secretos fuera del repositorio y límites de red.
        </p>
      </div>

      <Terminal>{`services:
  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_ENCRYPTION_KEY=change-me
      - GENERIC_TIMEZONE=Europe/Madrid
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  qdrant_data:
  n8n_data:`}</Terminal>

      <Cuidado>
        No metas documentos de clientes en un prototipo sin permisos, backups y política de borrado. Un RAG local también puede filtrar datos si Qdrant no filtra por tenant o si n8n guarda trazas completas.
      </Cuidado>

      <div className="prose">
        <h2>Nodos mínimos en n8n</h2>
        <ol>
          <li>Trigger de chat, Telegram o webhook.</li>
          <li>Validación de usuario, tenant y permisos.</li>
          <li>Normalización de pregunta.</li>
          <li>Búsqueda en Qdrant con filtro por tenant.</li>
          <li>Llamada a Ollama con contexto y regla de “no sé”.</li>
          <li>Respuesta con citas y traza guardada.</li>
        </ol>
      </div>

      <Terminal>{`Regla de respuesta:
- Responde solo con el contexto recuperado.
- Cita documento y sección cuando sea posible.
- Si el contexto no basta, di "No tengo evidencia suficiente".
- No ejecutes acciones externas sin aprobación humana.`}</Terminal>

      <Comprueba>
        Crea dos documentos casi iguales de dos clientes distintos y pregunta como cada cliente. Si la respuesta mezcla chunks, el problema no es el modelo: es tu filtro de recuperación.
      </Comprueba>

      <Guardar>
        El primer RAG útil para una pyme no necesita magia. Necesita permisos antes de buscar, contexto pequeño pero bueno y trazas que permitan explicar por qué respondió eso.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer">n8n Docs</a></li>
          <li><a href="https://qdrant.tech/documentation/" target="_blank" rel="noopener noreferrer">Qdrant documentation</a></li>
          <li><a href="https://docs.ollama.com/api" target="_blank" rel="noopener noreferrer">Ollama API</a></li>
          <li><a href="https://docs.openwebui.com/" target="_blank" rel="noopener noreferrer">Open WebUI documentation</a></li>
          <li><a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">Docker Compose documentation</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/automatizacion-self-hosted/ollama-openwebui", label: "Ollama y Open WebUI" }}
        next={{ href: "/cursos/automatizacion-self-hosted/n8n-webhooks", label: "n8n webhooks" }}
      />
    </Chapter>
  );
}
