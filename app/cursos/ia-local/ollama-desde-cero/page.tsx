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
          <li>Elegir un modelo según memoria, velocidad y calidad.</li>
          <li>Comprobar la API local para usarla después con tus apps.</li>
        </ul>
      </Objetivos>

      <Cristiano term="Ollama">
        Es un programa que puede ejecutar modelos de lenguaje en tu ordenador. Si eliges un modelo instalado y llamas a la API local, el procesamiento ocurre localmente. Ollama también ofrece modelos cloud: comprueba siempre qué modelo y URL estás usando.
      </Cristiano>

      <div className="prose">
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
        <p>Entra en la web oficial de Ollama, instala la versión de tu sistema y abre una terminal nueva. En Linux también puedes usar el instalador por terminal:</p>
      </div>

      <Terminal>{`curl -fsSL https://ollama.com/install.sh | sh`}</Terminal>

      <div className="prose">
        <p>Comprueba que el comando existe:</p>
      </div>

      <Terminal>{`ollama --version`}</Terminal>

      <div className="prose">
        <h2>Tu primer modelo</h2>
        <p>Abre la biblioteca oficial, elige un modelo pequeño disponible hoy y copia su nombre y tag exactos. Los ejemplos siguientes usan un marcador para no convertir una versión concreta en recomendación permanente.</p>
      </div>

      <Terminal>{`ollama run NOMBRE:TAG`}</Terminal>

      <Idea>
        Empieza con el modelo que responde, no con el modelo que queda bonito en una comparativa. Aprenderás más con un 4B rápido que con un 14B que tarda demasiado en cada prueba.
      </Idea>

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
        <h2>Comandos que usarás cada semana</h2>
      </div>

      <Terminal>{`ollama list
ollama run NOMBRE:TAG
ollama pull NOMBRE:TAG
ollama rm modelo:tag
ollama ps`}</Terminal>

      <Guardar>
        Quédate con versión, modelo y licencia, tamaño, dirección local y una métrica de prueba. Continúa con el <Link href="/cursos/ia-pymes/ollama-piloto-seguro">laboratorio seguro para pymes</Link> antes de conectar datos o aplicaciones.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/ia-local", label: "IA local: elige tu modelo" }}
        next={{ href: "/cursos/ia-local/cuantizacion-gguf", label: "Cuantización GGUF" }}
      />
    </Chapter>
  );
}
