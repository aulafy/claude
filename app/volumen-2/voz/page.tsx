import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Un chatbot que te escucha y te habla — Claude Code + IA Local",
  description: "Un asistente de voz completo en local: reconocimiento de voz, cerebro y voz sintética con herramientas open source de 2026.",
};

export default function Page() {
  return (
    <Chapter
      crumb="Un chatbot que te escucha"
      title="Un chatbot que te escucha y te habla"
      icon="microphone"
      lead={<>Un asistente al que le <strong>hablas</strong> por el micrófono y te <strong>responde en voz alta</strong>. Todo con IA local: reconocimiento de voz, cerebro y voz sintética, sin enviar tu audio a ningún servidor. Ideal para accesibilidad, atención al cliente o manos libres.</>}
    >
      <Objetivos>
        <ul>
          <li>Qué son STT (voz a texto) y TTS (texto a voz).</li>
          <li>Qué herramientas open source usar en 2026 y por qué.</li>
          <li>Montar un asistente de voz completo en local.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Conceptos clave</h2>
        <p>Un asistente de voz encadena tres piezas:</p>
        <ol>
          <li><strong>STT</strong> (<em>Speech To Text</em>): convierte tu voz en texto.</li>
          <li>El <strong>modelo de lenguaje</strong> (Ollama) piensa la respuesta.</li>
          <li><strong>TTS</strong> (<em>Text To Speech</em>): convierte la respuesta en voz.</li>
        </ol>
      </div>

      <Cristiano term="STT y TTS">
        STT es “el oído”: escucha y escribe lo que dices. TTS es “la boca”: lee un texto en voz alta. Entre medias, el modelo de lenguaje es “el cerebro”. Tres piezas, un asistente.
      </Cristiano>

      <div className="prose"><p>Como son tres piezas en cadena, el tiempo total de respuesta es la <strong>suma</strong> de las tres: lo que tarda en entenderte, en pensar y en hablar. Por eso, para que la conversación sea fluida, conviene que cada pieza sea rápida.</p></div>

      <Cristiano term="latencia y “tiempo real”">
        La <em>latencia</em> es lo que tardas en obtener respuesta desde que dejas de hablar. Si es de varios segundos, la charla se hace incómoda. Las herramientas “de tiempo real” (como Moonshine para el oído) empiezan a transcribir <em>mientras</em> hablas, en lugar de esperar a que termines: por eso se notan mucho más ágiles.
      </Cristiano>

      <Idea>El cuello de botella casi siempre es <strong>el cerebro</strong> (el modelo de lenguaje), no el oído ni la boca. Si tu asistente va lento, lo primero que hay que probar es un modelo de Ollama más pequeño o más rápido.</Idea>

      <div className="prose">
        <h2>Qué herramientas usar (edición 2026)</h2>
        <p>El panorama cambió respecto a años anteriores. Recomendaciones actuales:</p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-200 text-left">
                <th className="py-2 pr-4">Pieza</th><th className="py-2">Opciones recomendadas 2026</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">STT (oído)</td><td className="py-2"><strong>Moonshine</strong> (rápido, tiempo real, ideal en portátil); <strong>Nemotron 3.5 ASR</strong> (muchos idiomas, con GPU); <em>faster-whisper</em> para transcripción de archivos.</td></tr>
              <tr><td className="py-2 pr-4">TTS (boca)</td><td className="py-2"><strong>Kokoro</strong> y <strong>piper1-gpl</strong> (ligeros, rápidos); <strong>MagpieTTS</strong> (multi-idioma con GPU); <strong>F5-TTS</strong> si quieres clonar una voz.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <Cuidado>Verás en internet guías que recomiendan <em>Piper</em> (clásico) o <em>XTTS</em>: en 2026 el primero está archivado (usa su sucesor <strong>piper1-gpl</strong>) y el segundo está parado. Si una guía vieja no funciona, suele ser por esto.</Cuidado>

      <Nota title="Requisitos">
        <strong>Claude Code</strong>, <strong>Node.js</strong>, <strong>Ollama</strong> (<code>qwen3:4b</code>) y un <strong>micrófono</strong>. Las herramientas de voz las instalará Claude Code; en algún caso hará falta <strong>Python</strong>, que también te ayudará a instalar.
      </Nota>

      <div className="prose"><h2>Paso a paso</h2></div>

      <Terminal>{`cd ~/proyectos-ia
mkdir asistente-voz
cd asistente-voz
claude`}</Terminal>

      <Prompt>{`Crea un asistente de voz que funcione 100% en local:
- STT con Moonshine (voz a texto en tiempo real).
- El cerebro es Ollama con "qwen3:4b".
- TTS con Kokoro (respuesta en voz alta), en español.
- Interfaz web: un botón de micrófono; muestra lo que entendió y reproduce la respuesta en audio.
- Explica en el README qué instalar y cómo arrancarlo.
Guíame paso a paso e indícame los permisos que apruebe.`}</Prompt>

      <Cristiano term="permiso del micrófono">
        La primera vez, el navegador te pedirá permiso para usar el micrófono. Acéptalo: es una autorización local del navegador, no envía nada a internet.
      </Cristiano>

      <div className="prose">
        <h3>Un ejemplo, paso a paso, de lo que ocurre</h3>
        <p>Imagina que dices <em>“¿qué tiempo hará mañana?”</em>. Por dentro sucede esto, en menos de un par de segundos:</p>
        <ol>
          <li>El <strong>oído</strong> (Moonshine) escucha y escribe: <code>¿qué tiempo hará mañana?</code></li>
          <li>Ese texto va al <strong>cerebro</strong> (Ollama), que redacta una respuesta.</li>
          <li>El texto de la respuesta va a la <strong>boca</strong> (Kokoro), que genera el audio.</li>
          <li>El navegador reproduce ese audio: oyes la contestación.</li>
        </ol>
        <p>Entender esta secuencia te ayuda a depurar: si no te entiende, el problema está en el oído; si responde raro, en el cerebro; si no suena, en la boca.</p>
      </div>

      <Cuidado><strong>El eco/acople.</strong> Si los altavoces están altos, el micrófono puede “oírse a sí mismo” y el asistente se responde solo en bucle. Solución: usa auriculares, o pide a Claude Code que <em>silencie el micrófono mientras el asistente habla</em>. Es el fallo más típico y despista mucho.</Cuidado>

      <div className="prose"><h2>Ejecutar en tu ordenador</h2></div>

      <Terminal>{`npm install
npm run dev`}</Terminal>

      <div className="prose"><p>Abre la dirección local, pulsa el botón del micrófono y di algo.</p></div>

      <Comprueba>Deberías ver escrito lo que dijiste y <strong>oír</strong> la respuesta. Si entiende tu voz y te contesta hablando, has montado un asistente de voz completo en tu máquina.</Comprueba>

      <Guardar>Proyecto: carpeta <code>asistente-voz</code>. Cerrar: <code>Ctrl + C</code>. Reabrir: <code>cd ~/proyectos-ia/asistente-voz</code> y <code>npm run dev</code>. Si añadiste piezas de Python, no hace falta reinstalarlas cada vez.</Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>No capta el micrófono</strong> — revisa el permiso del navegador y que el micro correcto esté seleccionado.</li>
          <li><strong>La voz suena robótica o en otro idioma</strong> — pide a Claude Code otra voz/idioma de Kokoro o prueba MagpieTTS.</li>
          <li><strong>Tarda mucho</strong> — usa un modelo de lenguaje más pequeño; la voz en sí es rápida.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Une este capítulo con el anterior: haz que puedas <strong>preguntarle por voz a tus PDF</strong> y te conteste hablando. Es combinar dos proyectos que ya entiendes.</p>
      </div>

      <ChapterNav prev={{ href: "/volumen-2/pdf", label: "Pregúntale a tus PDF" }} next={{ href: "/volumen-2/texto-a-audio", label: "Texto a audio" }} />
    </Chapter>
  );
}
