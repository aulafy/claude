import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Una app para estudiar y aprender — Claude Code + IA Local",
  description: "Convierte tus apuntes en tests, exámenes con corrección y explicaciones, con repetición espaciada y 100% en local.",
};

export default function Page() {
  return (
    <Chapter
      crumb="App para estudiar"
      title="Una app para estudiar y aprender"
      icon="book"
      lead={<>Una aplicación que convierte tus apuntes o un temario en <strong>preguntas de test</strong>, te examina, corrige y te explica los fallos. Sirve para preparar una oposición, un examen o cualquier materia. Con IA local: estudia sin conexión y sin coste por pregunta.</>}
    >
      <Objetivos>
        <ul>
          <li>Generar tests automáticamente a partir de tus materiales.</li>
          <li>Crear un sistema de estudio con corrección y explicaciones.</li>
          <li>Aplicar la repetición espaciada para memorizar mejor.</li>
        </ul>
      </Objetivos>

      <div className="prose"><h2>Conceptos clave</h2></div>

      <Cristiano term="repetición espaciada">
        Es una técnica de estudio demostrada: repasas cada cosa <em>justo antes</em> de olvidarla, espaciando cada vez más los repasos. Lo que fallas vuelve pronto; lo que dominas, tarda en volver. Así memorizas más con menos horas.
      </Cristiano>

      <Idea>La IA local es perfecta para estudiar: puede generar cientos de preguntas de tus apuntes y explicarte cada respuesta, sin límites ni suscripciones. Tú pones el temario; ella, la práctica infinita.</Idea>

      <Nota title="Requisitos">
        <strong>Claude Code</strong>, <strong>Node.js</strong> y <strong>Ollama</strong> (<code>qwen3:4b</code>). Ten a mano tus apuntes en texto o PDF.
      </Nota>

      <div className="prose"><h2>Paso a paso</h2></div>

      <Terminal>{`cd ~/proyectos-ia
mkdir app-estudio
cd app-estudio
claude`}</Terminal>

      <Prompt>{`Crea una app web local de estudio con IA:
- Subo mis apuntes (texto o PDF) sobre un tema.
- Con Ollama ("qwen3:4b") genera preguntas tipo test (4 opciones) basadas SOLO en mis apuntes.
- Me examina, corrige y explica por qué falla cada opción, citando la parte del apunte correspondiente.
- Lleva un registro de mis aciertos y repite con repetición espaciada lo que fallo.
- Guarda mi progreso en local.
- README con instrucciones.`}</Prompt>

      <Cuidado>Pide siempre que las preguntas salgan <strong>solo de tus apuntes</strong> (es RAG, como en capítulos anteriores). Si dejas que el modelo invente, puede colar datos erróneos. Con tus materiales como fuente, estudias lo correcto.</Cuidado>

      <div className="prose"><h2>Ejecutar en tu ordenador</h2></div>

      <Terminal>{`npm install
npm run dev`}</Terminal>

      <div className="prose"><p>Sube un tema corto y genera tu primer test.</p></div>

      <Comprueba>Deberías obtener preguntas coherentes con tus apuntes, poder responderlas y recibir <strong>corrección con explicación</strong>. Comprueba que las preguntas falladas vuelven a aparecer más adelante.</Comprueba>

      <Guardar>Proyecto: carpeta <code>app-estudio</code>. Tu progreso se guarda en local; haz copia de seguridad si estás preparando algo importante como una oposición. Cerrar: <code>Ctrl + C</code>. Reabrir: <code>cd ~/proyectos-ia/app-estudio</code> y <code>npm run dev</code>.</Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>Preguntas raras o inventadas</strong> — refuerza que use solo tus apuntes y sube material más claro.</li>
          <li><strong>Todas muy fáciles o muy difíciles</strong> — pide niveles de dificultad ajustables.</li>
          <li><strong>Lento al generar</strong> — genera menos preguntas de golpe o usa un modelo algo mayor si tu equipo puede.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Añade <strong>fichas de repaso</strong> (<em>flashcards</em>) y un modo “examen cronometrado” que simule las condiciones reales de tu prueba.</p>
      </div>

      <ChapterNav prev={{ href: "/cursos/ia-local/facturacion", label: "Asistente para autónomos" }} next={{ href: "/cursos/ia-local/publicar", label: "Publica tu app" }} />
    </Chapter>
  );
}
