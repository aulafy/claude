import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Open WebUI troubleshooting y producción ligera",
  description:
    "Checklist para mantener Open WebUI estable: versiones, Docker, volúmenes, backups, Ollama, tool calling, Qdrant y actualizaciones sin romper tu stack.",
  keywords: ["open webui breaking changes tool calling", "Open WebUI troubleshooting Ollama", "Open WebUI Qdrant producción", "Open WebUI Docker backup"],
  alternates: { canonical: "/cursos/ia-local/open-webui-troubleshooting" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Open WebUI troubleshooting"
      title="Open WebUI troubleshooting y producción ligera"
      icon="chat"
      lead={<>Open WebUI es comodísimo para usar modelos locales, pero cuando lo conviertes en herramienta diaria necesitas pensar en versiones, volúmenes, backups, cambios de UI, conexión con Ollama y recuperación.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Evitar perder chats, usuarios o configuración por un mal update.</li>
          <li>Diagnosticar conexión con Ollama y problemas de herramientas.</li>
          <li>Preparar una instalación ligera para uso de pyme o equipo pequeño.</li>
        </ul>
      </Objetivos>

      <Cristiano term="volumen Docker">
        Es donde vive tu estado persistente: base de datos, configuración, usuarios y archivos. Si lo borras, tu contenedor arranca “nuevo”.
      </Cristiano>

      <Terminal>{`# Ver contenedores y logs
docker ps
docker logs -f open-webui

# Comprobar Ollama desde el host
curl http://localhost:11434/api/tags

# Comprobar desde un contenedor en la misma red
docker exec -it open-webui sh
curl http://host.docker.internal:11434/api/tags`}</Terminal>

      <Idea>
        En Docker, `localhost` dentro del contenedor no es tu ordenador: es el propio contenedor. Muchos fallos de conexión con Ollama vienen de ahí.
      </Idea>

      <div className="prose">
        <h2>Checklist antes de actualizar</h2>
        <ul>
          <li>Apunta versión actual de la imagen.</li>
          <li>Haz backup del volumen de Open WebUI.</li>
          <li>Lee notas de release si dependes de tools, auth o RAG.</li>
          <li>Prueba en una copia si lo usa más gente.</li>
          <li>Ten un plan de rollback.</li>
        </ul>
      </div>

      <Terminal>{`# Backup simple de volumen Docker
docker run --rm \\
  -v open-webui:/data \\
  -v "$PWD/backups":/backup \\
  alpine tar czf /backup/open-webui-$(date +%Y%m%d).tgz -C /data .`}</Terminal>

      <Cuidado>
        Si usas Open WebUI para documentos internos, no mezcles permisos “de juguete” con datos reales. Define usuarios, backups, políticas de retención y quién puede subir documentos.
      </Cuidado>

      <div className="prose">
        <h2>Producción ligera mínima</h2>
        <ul>
          <li>Open WebUI con volumen persistente.</li>
          <li>Ollama separado y monitorizado.</li>
          <li>Qdrant con volumen propio si haces RAG.</li>
          <li>Reverse proxy con HTTPS si sale de localhost.</li>
          <li>Backups probados, no solo configurados.</li>
        </ul>
      </div>

      <Comprueba>
        Restaura un backup en una carpeta o máquina distinta. Si nunca has restaurado, no tienes backup; tienes una esperanza.
      </Comprueba>

      <Guardar>
        Open WebUI puede ser la puerta de entrada perfecta para una pyme, siempre que lo trates como sistema con estado y no como contenedor desechable.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.openwebui.com/" target="_blank" rel="noopener noreferrer">Open WebUI documentation</a></li>
          <li><a href="https://docs.ollama.com/api" target="_blank" rel="noopener noreferrer">Ollama API</a></li>
          <li><a href="https://qdrant.tech/documentation/" target="_blank" rel="noopener noreferrer">Qdrant documentation</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/open-webui-qdrant", label: "Open WebUI + Qdrant" }}
        next={{ href: "/cursos/ia-local/chatbot-legal", label: "Chatbot RAG local" }}
      />
    </Chapter>
  );
}
