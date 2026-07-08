import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "n8n en Windows: Docker, WSL y errores típicos",
  description:
    "Guía práctica para instalar n8n self-hosted en Windows con Docker Desktop y WSL sin perder horas antes de crear workflows de IA.",
  keywords: ["n8n self hosted docker windows ia", "n8n windows wsl", "n8n docker errores", "n8n ollama windows"],
  alternates: { canonical: "/cursos/automatizacion-self-hosted/n8n-windows-wsl" },
};

export default function Page() {
  return (
    <Chapter
      crumb="n8n Windows y WSL"
      title="n8n en Windows: Docker, WSL y errores típicos"
      icon="automation"
      lead={<>En Windows, el bloqueo habitual no es n8n: son Docker Desktop, WSL, virtualización, rutas, puertos y reinicios. Esta lección te da una ruta de diagnóstico antes de conectar Ollama, Qdrant o Telegram.</>}
      courseHref="/cursos/automatizacion-self-hosted"
      courseLabel="Automatización IA self-hosted"
    >
      <Objetivos>
        <ul>
          <li>Preparar Windows para n8n con Docker y WSL.</li>
          <li>Diagnosticar errores antes de culpar al workflow.</li>
          <li>Arrancar un stack mínimo que luego puedas conectar con Ollama.</li>
        </ul>
      </Objetivos>

      <Cristiano term="self-hosted">
        Significa que tú gestionas la instancia: contenedores, volumen de datos, backups, URL pública y actualizaciones. Ganas control; también ganas responsabilidad.
      </Cristiano>

      <div className="prose">
        <h2>Checklist antes de instalar</h2>
        <ul>
          <li>Windows actualizado.</li>
          <li>Virtualización activada en BIOS/UEFI.</li>
          <li>WSL 2 instalado y con una distro Linux funcional.</li>
          <li>Docker Desktop usando backend WSL 2.</li>
          <li>Reinicio completo después de activar características de Windows.</li>
        </ul>
      </div>

      <Terminal>{`# En PowerShell
wsl --status
wsl --list --verbose
docker version
docker compose version

# Si Docker no responde, abre Docker Desktop y espera a que indique "Engine running".
# Después prueba:
docker run --rm hello-world`}</Terminal>

      <Idea>
        Si `hello-world` no funciona, n8n tampoco va a funcionar. No saltes a credenciales, nodos o IA hasta arreglar Docker.
      </Idea>

      <div className="prose">
        <h2>Stack mínimo con volumen persistente</h2>
        <p>
          Para pruebas locales puedes empezar con SQLite. En producción conviene Postgres y una URL pública
          con HTTPS, pero primero necesitamos una instancia que arranque siempre igual.
        </p>
      </div>

      <Terminal>{`# docker-compose.yml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - N8N_SECURE_COOKIE=false
      - TZ=Europe/Madrid
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:`}</Terminal>

      <Terminal>{`docker compose up -d
docker compose logs -f n8n

# Abre:
# http://localhost:5678`}</Terminal>

      <Cuidado>
        No expongas n8n a internet con `N8N_SECURE_COOKIE=false`. Esa opción solo es cómoda para pruebas locales. Para producción usa HTTPS, credenciales fuertes, backups y mínimo privilegio.
      </Cuidado>

      <div className="prose">
        <h2>Errores típicos y lectura rápida</h2>
        <ul>
          <li><strong>Puerto ocupado</strong>: cambia `5678:5678` por `5680:5678`.</li>
          <li><strong>Docker no arranca</strong>: revisa WSL, virtualización y reinicio.</li>
          <li><strong>Datos desaparecen</strong>: no montaste volumen persistente.</li>
          <li><strong>Ollama no conecta</strong>: desde Docker, `localhost` apunta al contenedor, no a Windows.</li>
          <li><strong>Execute Command no ve tus programas</strong>: ejecuta dentro del contenedor, no en el host.</li>
        </ul>
      </div>

      <Comprueba>
        Crea un workflow con Webhook → Set → Respond to Webhook antes de meter IA. Si eso falla, el problema es infraestructura, no el modelo.
      </Comprueba>

      <Guardar>
        Cuando n8n arranque estable, ya puedes conectar Ollama, Open WebUI, Qdrant o Telegram. Antes de eso, cualquier workflow complejo solo multiplicará errores.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker/" target="_blank" rel="noopener noreferrer">n8n: Install with Docker</a></li>
          <li><a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executecommand/" target="_blank" rel="noopener noreferrer">n8n: Execute Command node</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/automatizacion-self-hosted/docker-vps", label: "Docker y VPS barato" }}
        next={{ href: "/cursos/automatizacion-self-hosted/ollama-openwebui", label: "Ollama y Open WebUI" }}
      />
    </Chapter>
  );
}
