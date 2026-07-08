import type { Metadata } from "next";
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
          <li>Elegir un modelo según memoria, velocidad y calidad.</li>
          <li>Comprobar la API local para usarla después con tus apps.</li>
        </ul>
      </Objetivos>

      <Cristiano term="Ollama">
        Es un programa que descarga y ejecuta modelos de lenguaje en tu ordenador. Tú le pides texto por terminal o por API local, y el modelo responde sin enviar tus documentos a una plataforma externa.
      </Cristiano>

      <div className="prose">
        <h2>Requisitos mínimos realistas</h2>
        <ul>
          <li><strong>8 GB de RAM</strong>: modelos pequeños de 1B a 4B para pruebas, resúmenes y chat ligero.</li>
          <li><strong>16 GB de RAM</strong>: modelos de 7B a 8B, mejor equilibrio para aprender.</li>
          <li><strong>32 GB o más</strong>: modelos de 14B y flujos más cómodos con documentos largos.</li>
          <li><strong>GPU</strong>: ayuda mucho, pero no es obligatoria para empezar.</li>
        </ul>
      </div>

      <Cuidado>
        No midas Ollama con una demo espectacular de internet. Un portátil normal puede aprender, prototipar y automatizar mucho, pero un modelo local pequeño no razona igual que Claude, GPT o Gemini en tareas largas de programación.
      </Cuidado>

      <div className="prose">
        <h2>Instalación</h2>
        <p>Entra en la web oficial de Ollama, instala la versión de tu sistema y abre una terminal nueva. En Linux también puedes usar el instalador por terminal:</p>
      </div>

      <Terminal>{`curl -fsSL https://ollama.com/install.sh | sh`}</Terminal>

      <div className="prose">
        <p>Comprueba que el comando existe:</p>
      </div>

      <Terminal>{`ollama --version`}</Terminal>

      <div className="prose">
        <h2>Tu primer modelo</h2>
        <p>Para empezar, usa un modelo pequeño y rápido. Si tu equipo va bien, luego subes tamaño.</p>
      </div>

      <Terminal>{`ollama run qwen3:4b`}</Terminal>

      <Idea>
        Empieza con el modelo que responde, no con el modelo que queda bonito en una comparativa. Aprenderás más con un 4B rápido que con un 14B que tarda demasiado en cada prueba.
      </Idea>

      <div className="prose">
        <h2>Modelos recomendados para aprender</h2>
        <ul>
          <li><strong>qwen3:4b</strong>: buena primera opción para equipos modestos.</li>
          <li><strong>llama3.1:8b</strong>: equilibrio clásico si tienes 16 GB de RAM o más.</li>
          <li><strong>mistral</strong>: rápido y práctico para pruebas generales.</li>
          <li><strong>codellama</strong>: útil para ejemplos de código, aunque no sustituye a Claude Code.</li>
        </ul>
      </div>

      <div className="prose">
        <h2>Comprueba la API local</h2>
        <p>Ollama queda escuchando en <code>http://localhost:11434</code>. Tus aplicaciones hablarán con esa dirección.</p>
      </div>

      <Terminal>{`curl http://localhost:11434/api/generate -d '{
  "model": "qwen3:4b",
  "prompt": "Resume en una frase qué es la IA local.",
  "stream": false
}'`}</Terminal>

      <Comprueba>
        Si ves una respuesta JSON con un campo <code>response</code>, ya tienes una IA local lista para usar en apps de RAG, PDF, automatización y prototipos privados.
      </Comprueba>

      <div className="prose">
        <h2>Comandos que usarás cada semana</h2>
      </div>

      <Terminal>{`ollama list
ollama run qwen3:4b
ollama pull llama3.1:8b
ollama rm modelo:tag
ollama ps`}</Terminal>

      <Guardar>
        Quédate con tres datos: modelo elegido, puerto local <code>11434</code> y comando de prueba con <code>curl</code>. Si esos tres funcionan, cualquier proyecto del curso puede conectarse a Ollama.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/ia-local", label: "IA local: elige tu modelo" }}
        next={{ href: "/cursos/ia-local/cuantizacion-gguf", label: "Cuantización GGUF" }}
      />
    </Chapter>
  );
}
