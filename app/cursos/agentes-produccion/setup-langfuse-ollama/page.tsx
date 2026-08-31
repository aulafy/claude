import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Setup local de Langfuse y Ollama para observar agentes",
  description: "Configura Langfuse Cloud o self-hosted y Ollama para instrumentar agentes locales sin exponer secretos ni confundir un laboratorio con producción.",
  alternates: { canonical: "/cursos/agentes-produccion/setup-langfuse-ollama" },
};

export default function Page() {
  return (
    <Chapter crumb="Módulo 2" title="Setup: Langfuse y Ollama" icon="tools" lead={<>Prepara un entorno pequeño y reversible. El objetivo no es levantar una plataforma enorme: es conseguir que Ollama responda y que Langfuse reciba una traza sin publicar una clave.</>} courseHref="/cursos/agentes-produccion" courseLabel="Agentes en producción">
      <Objetivos><ul><li>Elegir entre Langfuse Cloud y una instancia local con criterio.</li><li>Verificar Docker, Ollama y variables sin adivinar.</li><li>Separar el laboratorio del despliegue real.</li></ul></Objetivos>

      <div className="prose">
        <h2>Dos caminos válidos</h2>
        <table><thead><tr><th>Opción</th><th>Úsala cuando</th><th>Lo que debes asumir</th></tr></thead><tbody>
          <tr><td>Langfuse Cloud</td><td>Quieres aprender e instrumentar hoy.</td><td>Las trazas salen de tu equipo; revisa región, contrato y política de datos.</td></tr>
          <tr><td>Self-hosted con Docker Compose</td><td>Necesitas practicar dentro de tu entorno o evaluar aislamiento.</td><td>Docker Compose es una configuración de pruebas o baja escala; requiere operación, copias, almacenamiento y actualizaciones.</td></tr>
        </tbody></table>
        <p>Para self-hosting usa el <a href="https://langfuse.com/self-hosting/deployment/docker-compose" target="_blank" rel="noopener noreferrer">Docker Compose oficial de Langfuse</a>. No copiamos su archivo aquí: cambia con el producto y trae varios servicios de datos. Clona la fuente oficial, cambia todos los secretos marcados y conserva esa instancia solo para laboratorio.</p>
        <h2>Comprobación inicial de Ollama</h2>
        <p>El modelo es intercambiable. Para que el ejemplo sea pequeño, descarga uno que tu máquina pueda ejecutar y usa el mismo nombre en <code>.env</code>.</p>
      </div>

      <Terminal>{`# 1. Comprueba que Ollama responde
ollama pull llama3.1
curl http://localhost:11434/api/tags

# 2. Si eliges Langfuse local: sigue el Compose oficial
git clone https://github.com/langfuse/langfuse.git
cd langfuse
# Cambia TODOS los valores # CHANGEME antes de continuar.
docker compose up

# 3. Abre Langfuse local en http://localhost:3000
# Crea un proyecto de laboratorio y sus credenciales.`}</Terminal>

      <div className="prose"><h2>Variables mínimas</h2><p>Crea <code>.env</code> a partir de <code>.env.example</code>. Nunca añadas el primero a Git. Para Cloud, <code>LANGFUSE_BASE_URL</code> es su URL regional; para la instancia local suele ser <code>http://localhost:3000</code>.</p></div>
      <Terminal>{`# .env — valores locales de ejemplo; no los publiques
LANGFUSE_PUBLIC_KEY=pk-lf-tu-proyecto
LANGFUSE_SECRET_KEY=sk-lf-tu-secreto
LANGFUSE_BASE_URL=http://localhost:3000
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_MODEL=llama3.1`}</Terminal>

      <Cuidado>Una clave pública de Langfuse no convierte la clave secreta en publicable. Ambas pertenecen al entorno del servidor o al terminal local. En una aplicación web, el navegador nunca debe recibir la clave secreta.</Cuidado>
      <Comprueba><ol><li><code>ollama list</code> muestra el modelo elegido.</li><li>La API de Ollama responde en <code>localhost:11434</code>.</li><li>El panel de Langfuse abre y puedes crear credenciales de un proyecto de laboratorio.</li><li><code>.env</code> aparece ignorado por Git.</li></ol></Comprueba>
      <Idea>Si Docker no cabe en tu portátil, empieza con Cloud y datos sintéticos. El aprendizaje es instrumentar y leer una traza; la decisión de alojamiento viene después, con requisitos de datos y operación reales.</Idea>
      <Guardar>Entorno listo significa «puedo ejecutar una llamada local y tengo un destino protegido para sus trazas», no «he instalado todos los componentes posibles».</Guardar>
      <ChapterNav prev={{ href: "/cursos/agentes-produccion/observabilidad-agentes-locales", label: "Mapa del laboratorio" }} next={{ href: "/cursos/agentes-produccion/traza-basica-ollama", label: "Primera traza con Ollama" }} />
    </Chapter>
  );
}
