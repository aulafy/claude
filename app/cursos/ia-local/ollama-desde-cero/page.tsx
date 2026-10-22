import type { Metadata } from "next";
import Link from "next/link";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Ollama desde cero: instala tu primera IA local",
  description:
    "Guía práctica para instalar Ollama en Windows, macOS o Linux, elegir modelo según tu hardware y comprobar que tu IA local funciona.",
  keywords: [
    "instalar Ollama",
    "Ollama tutorial español",
    "IA local con Ollama",
    "modelos locales",
    "Ollama Windows",
    "Ollama Mac",
    "Ollama Linux",
  ],
  alternates: { canonical: "/cursos/ia-local/ollama-desde-cero" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Ollama desde cero"
      title="Ollama desde cero: instala tu primera IA local"
      icon="brain"
      lead={<>Ollama es la forma más directa de ejecutar modelos abiertos en tu ordenador. En esta lección montas una IA local real, eliges un modelo sensato para tu equipo y verificas que responde antes de conectarla a proyectos más grandes.</>}
    >
      <Objetivos>
        <ul>
          <li>Instalar Ollama en Windows, macOS o Linux.</li>
          <li>Distinguir modelos locales, modelos cloud y dónde viajan tus datos.</li>
          <li>Usar la app, la CLI y las APIs nativa y compatible con OpenAI.</li>
          <li>Conectar un agente de código sin montar una pasarela manual.</li>
        </ul>
      </Objetivos>

      <Cristiano term="Ollama">
        Es un programa que puede ejecutar modelos de lenguaje en tu ordenador. Si eliges un modelo instalado y llamas a la API local, el procesamiento ocurre localmente. Ollama también ofrece modelos cloud: comprueba siempre qué modelo y URL estás usando.
      </Cristiano>

      <div className="prose">
        <h2>Ollama ya no es solo una terminal</h2>
        <p>La experiencia actual tiene tres puertas de entrada:</p>
        <ul>
          <li><strong>App de escritorio:</strong> en macOS y Windows permite descargar modelos, conversar, adjuntar archivos y conectar aplicaciones compatibles.</li>
          <li><strong>CLI:</strong> sirve para descargar, ejecutar, inspeccionar y lanzar integraciones desde un proyecto.</li>
          <li><strong>API:</strong> ofrece la API propia de Ollama y endpoints compatibles con OpenAI y Anthropic.</li>
        </ul>
        <p>La elección importante ya no es «Ollama o nube», sino <strong>qué modelo corre, dónde corre y qué datos recibe</strong>.</p>

        <h2>No existe un mínimo universal</h2>
        <ul>
          <li><strong>Modelo y cuantización:</strong> determina el tamaño que debe cargarse.</li>
          <li><strong>Contexto:</strong> una ventana mayor también consume memoria.</li>
          <li><strong>Equipo:</strong> CPU, GPU, VRAM o memoria unificada cambian la velocidad.</li>
          <li><strong>Tarea:</strong> chat corto, documentos y concurrencia no exigen lo mismo.</li>
        </ul>
        <p>Empieza con un modelo pequeño cuya ficha y licencia hayas leído. Mide en tu equipo antes de comprar hardware o prometer tiempos.</p>
      </div>

      <Cuidado>
        No midas Ollama con una demo espectacular de internet. Un portátil normal puede aprender, prototipar y automatizar mucho, pero un modelo local pequeño no razona igual que Claude, GPT o Gemini en tareas largas de programación.
      </Cuidado>

      <div className="prose">
        <h2>Instalación</h2>
        <p>Descarga Ollama desde su web oficial para macOS, Windows o Linux. En macOS y Windows abre la aplicación; en Linux también puedes usar el instalador oficial por terminal:</p>
      </div>

      <Terminal>{`curl -fsSL https://ollama.com/install.sh | sh`}</Terminal>

      <div className="prose">
        <p>Comprueba que el comando existe:</p>
      </div>

      <Terminal>{`ollama --version`}</Terminal>

      <div className="prose">
        <p>También puedes ejecutar <code>ollama</code> sin argumentos para seguir el asistente interactivo, iniciar sesión o elegir entre modelos locales y cloud.</p>
      </div>

      <div className="prose">
        <h2>Tu primer modelo</h2>
        <p>Abre la biblioteca oficial y filtra por ejecución local, tamaño y capacidad —herramientas, visión, thinking o embeddings—. Copia el nombre y el tag exactos. Los ejemplos usan un marcador para no convertir una versión concreta en recomendación permanente.</p>
      </div>

      <Terminal>{`ollama run NOMBRE:TAG`}</Terminal>

      <Idea>
        Empieza con el modelo que responde, no con el modelo que queda bonito en una comparativa. Aprenderás más con un 4B rápido que con un 14B que tarda demasiado en cada prueba.
      </Idea>

      <div className="prose">
        <h2>Local y cloud usan una experiencia parecida, pero no son lo mismo</h2>
        <ul>
          <li><strong>Local:</strong> descargas el modelo, consume tu RAM/VRAM y las peticiones a <code>localhost</code> se procesan en tu equipo.</li>
          <li><strong>Cloud desde la app o CLI:</strong> requiere iniciar sesión y el cálculo ocurre en la infraestructura de Ollama; el modelo no se descarga.</li>
          <li><strong>Cloud directo por API:</strong> usa <code>https://ollama.com</code> y una clave en <code>OLLAMA_API_KEY</code>; no exige instalar Ollama.</li>
        </ul>
        <p>En la CLI, un nombre terminado en <code>:cloud</code> identifica la variante cloud. Revisa la ficha del modelo y la URL antes de asumir que una tarea es local.</p>
      </div>

      <Cuidado>
        «Usar Ollama» no garantiza por sí solo que los datos no salgan del ordenador. Para una práctica estrictamente local, usa un modelo descargado, el endpoint <code>127.0.0.1:11434</code> y desactiva las funciones cloud si no las necesitas.
      </Cuidado>

      <div className="prose">
        <h2>Comprueba la API local</h2>
        <p>Por defecto, Ollama escucha en <code>http://127.0.0.1:11434</code>. La API local no exige autenticación: no cambies la dirección de escucha para exponerla en red como parte de esta práctica.</p>
      </div>

      <Terminal>{`curl http://127.0.0.1:11434/api/generate -d '{
  "model": "NOMBRE:TAG",
  "prompt": "Resume en una frase qué es la IA local.",
  "stream": false
}'`}</Terminal>

      <Comprueba>
        Si ves una respuesta JSON con un campo <code>response</code>, ya tienes una IA local lista para usar en apps de RAG, PDF, automatización y prototipos privados.
      </Comprueba>

      <div className="prose">
        <h2>Compatibilidad con clientes OpenAI</h2>
        <p>Muchas aplicaciones ya hablan con la API de OpenAI. Puedes apuntarlas a Ollama local cambiando la URL base; la clave se exige por compatibilidad, pero el servidor local la ignora.</p>
      </div>

      <Terminal>{`curl http://127.0.0.1:11434/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "NOMBRE:TAG",
    "messages": [{"role": "user", "content": "Di hola en una frase."}]
  }'`}</Terminal>

      <div className="prose">
        <h2>Agentes de código: integración directa</h2>
        <p>Ollama puede preparar y lanzar agentes compatibles sin instalar LiteLLM ni configurar un proxy a mano. Desde la carpeta del proyecto:</p>
      </div>

      <Terminal>{`ollama launch codex
ollama launch claude
ollama launch opencode`}</Terminal>

      <Cuidado>
        Para agentes de código, elige un modelo con herramientas y contexto suficiente. La documentación de Ollama recomienda al menos 64K de contexto para Codex y Claude Code. Empieza en un repositorio de prueba y conserva permisos, Git y tests: cambiar el modelo no elimina los riesgos de ejecutar comandos o editar archivos.
      </Cuidado>

      <div className="prose">
        <h2>Comandos que usarás cada semana</h2>
      </div>

      <Terminal>{`ollama list
ollama run NOMBRE:TAG
ollama pull NOMBRE:TAG
ollama rm modelo:tag
ollama ps
ollama signin
ollama signout`}</Terminal>

      <div className="prose">
        <h2>Fuentes oficiales que conviene guardar</h2>
        <ul>
          <li><a href="https://docs.ollama.com/quickstart" target="_blank" rel="noopener noreferrer">Quickstart de Ollama</a></li>
          <li><a href="https://ollama.com/search" target="_blank" rel="noopener noreferrer">Biblioteca y filtros de modelos</a></li>
          <li><a href="https://docs.ollama.com/cloud" target="_blank" rel="noopener noreferrer">Modelos cloud y tratamiento de datos</a></li>
          <li><a href="https://docs.ollama.com/api/openai-compatibility" target="_blank" rel="noopener noreferrer">Compatibilidad con la API de OpenAI</a></li>
          <li><a href="https://docs.ollama.com/integrations/codex" target="_blank" rel="noopener noreferrer">Integración con Codex CLI</a></li>
        </ul>
      </div>

      <Guardar>
        Quédate con versión, modelo y licencia, tamaño, dirección local y una métrica de prueba. Continúa con el <Link href="/cursos/ia-pymes/ollama-piloto-seguro">laboratorio seguro para pymes</Link> antes de conectar datos o aplicaciones.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/ia-local", label: "IA local: elige tu modelo" }}
        next={{ href: "/cursos/ia-local/lm-studio-desde-cero", label: "LM Studio desde cero" }}
      />
    </Chapter>
  );
}
