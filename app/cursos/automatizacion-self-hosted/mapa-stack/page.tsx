import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Mapa del stack: n8n, Open WebUI y modelos — Automatización self-hosted",
  description:
    "Arquitectura práctica para automatización IA self-hosted en pymes con n8n, Open WebUI, Ollama, vLLM, webhooks y aprobaciones.",
  keywords: ["automatización IA self-hosted", "n8n Open WebUI Ollama", "IA local pymes", "agentes IA baratos"],
  alternates: { canonical: "/cursos/automatizacion-self-hosted/mapa-stack" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Mapa del stack"
      title="Mapa del stack: n8n, Open WebUI y modelos"
      icon="automation"
      lead={<>Una pyme no necesita empezar con una plataforma enorme. Necesita una arquitectura clara: interfaz, automatizaciones, modelos, datos, aprobaciones y logs.</>}
      courseHref="/cursos/automatizacion-self-hosted"
      courseLabel="Automatización self-hosted"
    >
      <Objetivos>
        <ul>
          <li>Entender qué papel juega n8n, Open WebUI, Ollama, vLLM y una API propia.</li>
          <li>Separar chat, automatización, modelo y datos para poder mantener el sistema.</li>
          <li>Diseñar una primera versión barata, privada y ampliable.</li>
        </ul>
      </Objetivos>

      <Cristiano term="self-hosted">
        Significa que tú alojas la herramienta en tu propio servidor o equipo, con más control sobre datos, costes y configuración.
      </Cristiano>

      <Terminal>{`usuarios
  -> Open WebUI: chat interno, modelos, herramientas
  -> n8n: workflows, webhooks, aprobaciones, integraciones
  -> API interna: reglas de negocio y permisos
  -> modelo:
       local: Ollama / llama.cpp
       produccion GPU: vLLM
       cloud puntual: proveedor externo
  -> datos:
       Postgres / Qdrant / ficheros
  -> operacion:
       logs, backups, alertas, limites`}</Terminal>

      <div className="prose">
        <h2>Regla de decisión</h2>
        <ul>
          <li><strong>Open WebUI</strong>: interfaz privada para usuarios, modelos, herramientas y conocimiento.</li>
          <li><strong>n8n</strong>: automatizaciones visibles, webhooks, conectores, aprobaciones y logs de negocio.</li>
          <li><strong>Ollama</strong>: entrada local sencilla para modelos en CPU/GPU modesta.</li>
          <li><strong>vLLM</strong>: serving de modelos con GPU y más concurrencia.</li>
          <li><strong>API propia</strong>: permisos, reglas delicadas y operaciones que no quieres dejar en un workflow editable.</li>
        </ul>
      </div>

      <Idea>
        El stack bueno para una pyme es el que el equipo puede entender, reiniciar y auditar. Si nadie sabe dónde está el log, todavía no está listo.
      </Idea>

      <Cuidado>
        No conectes credenciales reales el primer día. Primero construye con datos ficticios y acciones que solo crean borradores.
      </Cuidado>

      <Comprueba>
        Dibuja tu stack en cinco cajas: entrada, automatización, modelo, datos y salida. Si una caja hace demasiadas cosas, sepárala.
      </Comprueba>

      <Guardar>
        La ventaja self-hosted no es solo pagar menos. Es poder decidir dónde viven los datos y qué acciones necesitan revisión humana.
      </Guardar>

      <ChapterNav next={{ href: "/cursos/automatizacion-self-hosted/docker-vps", label: "Docker y VPS" }} />
    </Chapter>
  );
}
