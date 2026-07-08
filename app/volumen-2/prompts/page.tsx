import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Escribir buenos encargos (prompts)",
  description: "En este libro no programas: le encargas. Aprende la receta de cuatro partes de un buen prompt y cómo corregir el rumbo.",
  alternates: { canonical: "/cursos/ia-local/prompts" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Escribir buenos encargos"
      title="Escribir buenos encargos (prompts)"
      icon="prompt"
      lead={<>En este libro no programas: <strong>le encargas</strong> a Claude Code lo que quieres. La calidad de lo que recibes depende, sobre todo, de cómo escribes ese encargo. Este capítulo te enseña a pedir bien para obtener resultados que funcionan a la primera.</>}
    >
      <Objetivos>
        <ul>
          <li>Qué es un <em>prompt</em> y por qué es la herramienta más importante del libro.</li>
          <li>La receta de cuatro partes de un buen encargo.</li>
          <li>Cómo corregir el rumbo cuando el resultado no es el que esperabas.</li>
        </ul>
      </Objetivos>

      <div className="prose"><h2>Qué es un prompt</h2></div>

      <Cristiano term="prompt (encargo)">
        Un <em>prompt</em> es simplemente el mensaje que le escribes a la IA. No es magia ni un lenguaje secreto: es una instrucción en tu idioma. La diferencia entre un mal resultado y uno excelente suele estar en unas pocas frases mejor escritas.
      </Cristiano>

      <Idea>Piensa en Claude Code como en un ayudante muy capaz pero <strong>recién llegado</strong>: hace exactamente lo que le pides, pero no adivina lo que tienes en la cabeza. Cuanto más claro y concreto seas, mejor trabaja.</Idea>

      <div className="prose">
        <h2>La receta de un buen encargo</h2>
        <p>Un encargo sólido tiene cuatro partes. Las has visto ya en cada capítulo:</p>
        <ol>
          <li><strong>Qué</strong> quieres construir (el objetivo). <em>“Crea una app web de chat con mis PDF.”</em></li>
          <li><strong>Con qué</strong> herramientas (el contexto). <em>“Usa Ollama con qwen3:4b y nomic-embed-text.”</em></li>
          <li><strong>Cómo</strong> debe comportarse (los detalles que importan). <em>“Debe citar el archivo y la página; interfaz mínima.”</em></li>
          <li><strong>Qué esperas de vuelta</strong> (el formato). <em>“Hazlo paso a paso y escríbeme un README.”</em></li>
        </ol>
      </div>

      <Nota title="Compara dos encargos">
        <strong>Flojo:</strong> “hazme un chatbot”.<br />
        <strong>Bueno:</strong> “Crea una app web local de chat que responda sobre los PDF de la carpeta docs/, usando Ollama con qwen3:4b, citando la página de cada respuesta, con una interfaz sencilla y un README que explique cómo arrancarla”.<br />
        El segundo produce algo utilizable; el primero, adivinanzas.
      </Nota>

      <div className="prose">
        <h2>Trucos que marcan la diferencia</h2>
        <ul>
          <li><strong>Pide que lo haga paso a paso</strong> y que te explique lo que crea. Aprendes y controlas.</li>
          <li><strong>Da ejemplos</strong> de lo que quieres (“que la factura tenga este aspecto...”).</li>
          <li><strong>Fija límites</strong>: “no uses servicios de pago”, “que funcione sin conexión”.</li>
          <li><strong>Pide una cosa cada vez</strong>. Es mejor construir por partes que soltar un encargo gigante.</li>
          <li><strong>Pídele que pregunte</strong> si algo no está claro: “si te falta información, pregúntame antes de empezar”.</li>
        </ul>

        <h2>Cuando el resultado no es el que querías</h2>
        <p>No pasa nada: se corrige hablando. En vez de empezar de cero, <strong>ajusta</strong>:</p>
      </div>

      <Terminal>{`No es lo que buscaba: el botón debería estar arriba y en azul. Cámbialo y deja el resto igual.`}</Terminal>
      <Terminal>{`Me sale este error al arrancar: [pega aquí el error tal cual]. ¿Qué es y cómo lo arreglo?`}</Terminal>

      <Idea>Corregir es parte normal del proceso, no un fallo tuyo. Los mejores resultados salen de una conversación de ida y vuelta, no de un único encargo perfecto.</Idea>

      <Comprueba>Un buen encargo se nota: si Claude Code empieza a construir lo que tenías en mente sin que tengas que repetírselo tres veces, lo escribiste bien.</Comprueba>

      <Guardar>Guarda tus mejores encargos en un archivo de notas (por ejemplo <code>mis-prompts.txt</code>). Reutilizarlos y adaptarlos te ahorra tiempo en cada proyecto nuevo. Los prompts buenos son, en la práctica, tus plantillas de trabajo.</Guardar>

      <div className="prose">
        <h2>Reto para practicar</h2>
        <p>Coge cualquier proyecto de este libro y, antes de mirar el encargo que proponemos, <strong>escribe tú el tuyo</strong> con la receta de cuatro partes. Luego compáralos: verás qué detalles añadir la próxima vez.</p>
      </div>

      <ChapterNav prev={{ href: "/cursos/ia-local/proyectos", label: "Cómo trabajar con tus proyectos" }} next={{ href: "/cursos/ia-local/ia-local", label: "IA local" }} />
    </Chapter>
  );
}
