import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Pregúntale a tus PDF — Claude Code + IA Local",
  description: "Suelta cualquier PDF y hazle preguntas en lenguaje normal, con IA local. Incluye una prueba guiada reproducible con la Constitución del BOE.",
};

export default function Page() {
  return (
    <Chapter
      crumb="Pregúntale a tus PDF"
      title="Pregúntale a tus PDF"
      icon="pdf"
      lead={<>Una aplicación donde sueltas cualquier PDF —un manual, un contrato, un artículo, los apuntes de una asignatura— y le haces preguntas en lenguaje normal. Te responde y te dice en qué página lo ha encontrado. Es el capítulo anterior llevado a cualquier documento, no solo legal.</>}
    >
      <Objetivos>
        <ul>
          <li>Extraer y consultar el contenido de PDF con IA local.</li>
          <li>Pedir resúmenes, tablas y respuestas con referencia a la página.</li>
          <li>Reutilizar la técnica RAG que ya conoces en un caso nuevo.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Conceptos clave</h2>
        <p>Aquí aplicamos lo mismo del chatbot legal: <strong>RAG</strong> (buscar en tus documentos y responder con esos fragmentos). Lo nuevo es que un PDF no siempre es texto limpio.</p>
      </div>

      <Cristiano term="PDF “de texto” vs. PDF “escaneado”">
        Un PDF normal lleva el texto dentro y se puede leer directamente. Un PDF <em>escaneado</em> es en realidad una foto de cada página: para leerlo hay que aplicarle <strong>OCR</strong> (reconocimiento óptico de caracteres), que convierte la imagen en texto. Si tu documento es un escaneo, pídele a Claude Code que añada OCR.
      </Cristiano>

      <Nota title="Requisitos">
        Los mismos que ya tienes: <strong>Claude Code</strong>, <strong>Node.js</strong> y <strong>Ollama</strong> con <code>qwen3:4b</code> y <code>nomic-embed-text</code> descargados (capítulo de IA local).
      </Nota>

      <div className="prose">
        <h2>Paso a paso</h2>
        <p>Crea el proyecto y arranca Claude Code:</p>
      </div>

      <Terminal>{`cd ~/proyectos-ia
mkdir pregunta-pdf
cd pregunta-pdf
claude`}</Terminal>

      <div className="prose"><p>Pégale este encargo:</p></div>

      <Prompt>{`Crea una app web local para preguntar a mis PDF con RAG. Requisitos:
- Ollama con "qwen3:4b" (respuestas) y "nomic-embed-text".
- Puedo subir un PDF desde el navegador o dejarlo en "docs/".
- Extrae el texto; si el PDF es escaneado, aplica OCR.
- Trocea, calcula embeddings y guarda el índice en local.
- Al responder, indica el archivo y la página de la cita.
- Botones para: resumir el documento y extraer sus tablas.
- README con instrucciones de arranque y reindexado.`}</Prompt>

      <Idea>Un mismo patrón —RAG— resuelve muchísimos problemas: consultar leyes, manuales, historiales, documentación técnica... Domínalo una vez y lo reutilizas toda la vida.</Idea>

      <div className="prose">
        <h2>Ejecutar en tu ordenador</h2>
      </div>

      <Terminal>{`npm install
npm run dev`}</Terminal>

      <div className="prose"><p>Abre la dirección local, sube un PDF y pregunta algo concreto que sepas que está en el documento.</p></div>

      <Comprueba>Sube un PDF corto, pregúntale por un dato que contenga y comprueba que la respuesta <strong>cita la página correcta</strong>. Prueba también el botón de resumen.</Comprueba>

      <Cuidado>Si responde “no encuentro nada” con un PDF que sí tiene la información, casi siempre es que <strong>era un escaneo sin OCR</strong> o que <strong>no reindexaste</strong> tras subirlo. Revisa esas dos cosas primero.</Cuidado>

      <Guardar>Tu proyecto es la carpeta <code>pregunta-pdf</code>. Para cerrarlo: <code>Ctrl + C</code>. Para volver otro día: <code>cd ~/proyectos-ia/pregunta-pdf</code> y <code>npm run dev</code>. Recuerda hacer un commit de Git cuando funcione.</Guardar>

      <div className="prose">
        <h2>Una prueba guiada de principio a fin</h2>
        <p>Para comprobar que todo funciona sin depender de tus propios archivos, usa un PDF público del BOE. Descarga la Constitución Española (dominio público) y colócala en la carpeta <code>docs/</code> de tu proyecto:</p>
      </div>

      <Terminal>{`mkdir -p docs
curl -L -o docs/constitucion.pdf \\
  "https://www.boe.es/buscar/pdf/1978/BOE-A-1978-31229-consolidado.pdf"
npm run dev`}</Terminal>

      <div className="prose">
        <p>Abre la app, sube (o reindexa) <code>constitucion.pdf</code> y escribe esta pregunta exacta:</p>
        <blockquote className="border-l-2 border-orange-500/50 pl-4 italic text-zinc-400">¿Qué establece el artículo 14 de la Constitución Española sobre la igualdad ante la ley?</blockquote>
        <p><strong>Qué deberías ver:</strong> una respuesta que cite el <strong>artículo 14</strong> y mencione que los españoles son <strong>iguales ante la ley</strong>, sin discriminación por nacimiento, raza, sexo, religión, opinión u otra condición personal o social. La app debe indicar el <strong>archivo</strong> (<code>constitucion.pdf</code>) y una <strong>página</strong>. Si responde con contenido inventado o sin cita, reindexa el PDF y vuelve a preguntar.</p>
      </div>

      <Comprueba>Si la respuesta reproduce la idea del artículo 14 y señala página y archivo correctos, tu lector de PDF está funcionando de verdad.</Comprueba>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>Texto vacío al indexar</strong> — PDF escaneado: activa OCR.</li>
          <li><strong>Respuestas lentas</strong> — normal en documentos largos; prueba un modelo más pequeño o reduce cuántos fragmentos usa por respuesta.</li>
          <li><strong>Cita la página equivocada</strong> — pide a Claude Code trozos más pequeños al indexar.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Pídele a Claude Code que añada un modo “compara dos PDF” (por ejemplo dos versiones de un contrato) y que te señale las diferencias importantes.</p>
      </div>

      <ChapterNav prev={{ href: "/cursos/ia-local/chatbot-legal", label: "Un chatbot que cita la ley" }} next={{ href: "/cursos/ia-local/voz", label: "Un chatbot que te escucha" }} />
    </Chapter>
  );
}
