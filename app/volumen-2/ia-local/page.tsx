import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "IA local: elige el modelo para tu máquina — Claude Code + IA Local",
  description: "Pon un modelo de IA a funcionar en tu ordenador. Ollama y LM Studio, cuantización y qué modelo elegir según tu equipo (edición 2026).",
};

export default function Page() {
  return (
    <Chapter
      crumb="IA local"
      title="IA local: elige el modelo para tu máquina"
      icon="brain"
      lead={<>Vas a poner un “cerebro” de IA a funcionar en tu propio ordenador y a elegir el adecuado según tu equipo. Este capítulo es la base de casi todos los proyectos del libro.</>}
    >
      <Objetivos>
        <ul>
          <li>Qué programas usar para ejecutar modelos en local (Ollama y LM Studio).</li>
          <li>Qué es la cuantización y por qué te deja usar modelos grandes en equipos modestos.</li>
          <li>Qué modelo elegir según tu portátil, tu GPU o tu Mac.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Dos programas para ejecutar IA en local</h2>
        <ul>
          <li><strong>Ollama</strong> — gratuito, se maneja con comandos sencillos. Ideal para conectar modelos a tus aplicaciones. Es el que usamos por defecto. <a href="https://ollama.com">ollama.com</a></li>
          <li><strong>LM Studio</strong> — aplicación con ventana gráfica para descargar y chatear con modelos sin tocar la terminal. Perfecto para probar y comparar. <a href="https://lmstudio.ai">lmstudio.ai</a></li>
        </ul>
      </div>

      <Cristiano term="¿cuál elijo?">
        Usa <strong>LM Studio</strong> para trastear y ver qué modelo te gusta (todo con el ratón). Usa <strong>Ollama</strong> cuando quieras que tus aplicaciones hablen con el modelo automáticamente. En la práctica muchos tienen los dos.
      </Cristiano>

      <div className="prose">
        <h2>Cuantización: modelos grandes en equipos pequeños</h2>
        <p>Un modelo “en crudo” puede ocupar muchísima memoria. La <strong>cuantización</strong> lo comprime para que quepa en tu equipo perdiendo muy poca calidad.</p>
      </div>

      <Cristiano term="cuantización (los Q4, Q8...)">
        Es como pasar una foto RAW enorme a un JPG: ocupa mucho menos y a simple vista se ve casi igual. <code>Q4</code> comprime bastante (rápido, poca memoria); <code>Q8</code> comprime menos (más fiel, más pesado). Para empezar, <code>Q4</code> es una gran relación calidad/tamaño.
      </Cristiano>

      <div className="prose">
        <h2>Qué modelo elegir (edición 2026)</h2>
        <p>Los modelos evolucionan rápido; estas familias son las recomendables a fecha de 2026. Elige por la memoria de tu equipo:</p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-200 text-left">
                <th className="py-2 pr-4">Tu equipo</th>
                <th className="py-2">Modelos recomendados (empieza por el primero)</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">Portátil 8 GB RAM</td><td className="py-2">Qwen3.5 (2B–4B), Gemma 4 pequeño, Llama 3.2 (1B–3B), Phi-4-mini</td></tr>
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">Portátil 16 GB RAM</td><td className="py-2">Qwen3.5 4B, Gemma 4 mediano, Ministral 3 (8B), Phi-4-mini</td></tr>
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">GPU RTX 8–12 GB</td><td className="py-2">Qwen3.5 9B, Gemma 4 (Q4), Llama 3.1 8B, phi-4 (14B, Q4)</td></tr>
              <tr><td className="py-2 pr-4">GPU RTX 16–24 GB</td><td className="py-2">Qwen3.6 (27B / 35B MoE), Phi-4-reasoning, Gemma 4 grande</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <Idea>Regla sencilla: <strong>empieza pequeño</strong>. Un modelo de 4B que responde al instante es más útil para aprender que uno enorme que va a trompicones. Cuando domines el flujo, sube de tamaño y compara.</Idea>

      <Cristiano term="¿y un PC sin GPU potente, o un Mac?">
        Los <strong>Mac con chip M</strong> (Apple Silicon) ejecutan modelos sorprendentemente bien gracias a su memoria unificada; Ollama los aprovecha automáticamente. En un <strong>PC con tarjeta NVIDIA RTX</strong>, el modelo corre en la GPU y vuela. Y equipos nuevos tipo <strong>NVIDIA DGX Spark</strong> están pensados justo para esto. Sin GPU, funciona igual pero más despacio: usa modelos pequeños.
      </Cristiano>

      <div className="prose">
        <h2>Pruébalo ahora</h2>
        <p>Descarga un modelo y háblale, sin escribir código:</p>
      </div>

      <Terminal>{`ollama pull qwen3:4b
ollama run qwen3:4b "Explícame qué es la energía solar en dos frases"`}</Terminal>

      <Comprueba>Si te responde en tu terminal con un par de frases coherentes, <strong>ya tienes inteligencia artificial corriendo en tu ordenador</strong>, gratis y sin conexión. Escribe <code>/bye</code> para salir del chat.</Comprueba>

      <Guardar>Los modelos que descargas con <code>ollama pull</code> se guardan una sola vez en tu ordenador y quedan disponibles para todos tus proyectos. Para ver los que tienes: <code>ollama list</code>. Para liberar espacio y borrar uno: <code>ollama rm nombre-del-modelo</code>.</Guardar>

      <div className="prose">
        <h2>Reto para practicar</h2>
        <p>Descarga dos modelos de distinto tamaño (por ejemplo <code>qwen3:4b</code> y un Gemma). Hazles la misma pregunta con <code>ollama run</code> y compara la calidad y la velocidad. Así aprendes a elegir el equilibrio que te conviene.</p>
      </div>

      <ChapterNav prev={{ href: "/volumen-2/prompts", label: "Escribir buenos encargos" }} next={{ href: "/cursos/ia-local/conectar-ollama", label: "Conecta Claude Code con tu IA local" }} />
    </Chapter>
  );
}
