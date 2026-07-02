import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Convierte cualquier texto en audio — Claude Code + IA Local",
  description: "Convierte artículos o apuntes en un MP3 para escuchar donde quieras, en cualquier idioma y en local. Audiolibros de tus propios materiales.",
};

export default function Page() {
  return (
    <Chapter
      crumb="Texto a audio"
      title="Convierte cualquier texto en audio"
      icon="audio"
      lead={<>Una herramienta que coge un texto —un artículo, unos apuntes, un capítulo de un libro— y lo convierte en un <strong>archivo de audio</strong> que puedes escuchar en el móvil o el coche. En el idioma que quieras. Perfecto para estudiar, para accesibilidad o para hacer audiolibros de tus propios materiales.</>}
    >
      <Objetivos>
        <ul>
          <li>Generar audio de calidad a partir de texto, en local y en varios idiomas.</li>
          <li>Producir archivos MP3 descargables.</li>
          <li>Elegir la voz y el idioma adecuados.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Conceptos clave</h2>
        <p>Esto es TTS (texto a voz) puro, sin micrófono ni modelo de lenguaje: solo texto que entra y audio que sale.</p>
      </div>

      <Cristiano term="¿por qué en local y no una web cualquiera?">
        Hay webs que convierten texto a voz, pero suelen tener límites, marcas de agua o cobran por textos largos, y tu texto viaja a sus servidores. En local no hay límites, es gratis y privado: puedes convertir un libro entero si quieres.
      </Cristiano>

      <div className="prose">
        <h2>Qué herramientas usar (2026)</h2>
        <ul>
          <li><strong>Kokoro</strong> — ligera, rápida en CPU, buena calidad, multi-idioma. Gran punto de partida.</li>
          <li><strong>MagpieTTS</strong> — voces de calidad de producción en 9 idiomas (incluye español); mejor con GPU.</li>
          <li><strong>F5-TTS</strong> — si quieres <em>clonar</em> una voz concreta a partir de una muestra.</li>
        </ul>
      </div>

      <Nota title="Requisitos">
        <strong>Claude Code</strong> y <strong>Node.js</strong>. Para las voces puede hacer falta <strong>Python</strong>; Claude Code te guía. No necesitas Ollama en este proyecto (no hay “cerebro”, solo voz).
      </Nota>

      <div className="prose"><h2>Paso a paso</h2></div>

      <Terminal>{`cd ~/proyectos-ia
mkdir texto-a-audio
cd texto-a-audio
claude`}</Terminal>

      <Prompt>{`Crea una app web local de texto a voz:
- Motor Kokoro por defecto; deja preparado MagpieTTS como alternativa de más calidad.
- Puedo pegar texto o subir un .txt.
- Selector de idioma y de voz (incluye español).
- Botón para generar y para descargar el audio en MP3.
- Si el texto es muy largo, divídelo y únelo en un solo MP3.
- README con instrucciones.`}</Prompt>

      <Idea>Para textos muy largos conviene trocear y unir el audio: si no, algunos motores se atragantan. Por eso lo pedimos explícitamente en el encargo.</Idea>

      <div className="prose"><h2>Ejecutar en tu ordenador</h2></div>

      <Terminal>{`npm install
npm run dev`}</Terminal>

      <div className="prose"><p>Pega un párrafo, elige idioma y voz, y genera el audio.</p></div>

      <Comprueba>Deberías poder <strong>reproducir</strong> el audio en la propia página y <strong>descargar</strong> el MP3. Pruébalo con un texto en español y con otro en inglés para ver el cambio de voz.</Comprueba>

      <Guardar>Proyecto: carpeta <code>texto-a-audio</code>. Cerrar: <code>Ctrl + C</code>. Reabrir: <code>cd ~/proyectos-ia/texto-a-audio</code> y <code>npm run dev</code>. Los MP3 que generes se guardan donde tú los descargues; no dependen de que la app esté abierta.</Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>Voz en idioma equivocado</strong> — selecciona la voz correcta para ese idioma; no todas hablan todos los idiomas.</li>
          <li><strong>Se corta en textos largos</strong> — confirma que la app trocea y une; si no, pídeselo a Claude Code.</li>
          <li><strong>Suena metálica</strong> — prueba MagpieTTS para más calidad (mejor con GPU).</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Añade un “modo pódcast”: que dos voces distintas lean un diálogo alternándose. Ideal para material educativo más ameno.</p>
      </div>

      <ChapterNav prev={{ href: "/volumen-2/voz", label: "Un chatbot que te escucha" }} next={{ href: "/volumen-2/simulaciones-3d", label: "Simulaciones 3D" }} />
    </Chapter>
  );
}
