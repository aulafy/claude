import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "IA local: elige el modelo para tu máquina",
  description: "Pon un modelo de IA a funcionar en tu ordenador. Ollama y LM Studio, cuantización y qué modelo elegir según tu equipo (edición 2026).",
  alternates: { canonical: "/cursos/ia-local/ia-local" },
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
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">Portátil 8 GB RAM</td><td className="py-2">Un modelo de 2B–4B cuantizado; prioriza que responda con fluidez.</td></tr>
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">Portátil 16 GB RAM</td><td className="py-2">Un modelo de 4B–8B y una pequeña rúbrica para compararlo.</td></tr>
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">GPU RTX 8–12 GB</td><td className="py-2">Un modelo de 8B–14B cuantizado, solo si cabe con margen.</td></tr>
              <tr><td className="py-2 pr-4">GPU RTX 16–24 GB</td><td className="py-2">Modelos mayores o MoE, después de medir memoria, contexto y latencia.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <Idea>Regla sencilla: <strong>empieza pequeño</strong>. Un modelo de 4B que responde al instante es más útil para aprender que uno enorme que va a trompicones. Cuando domines el flujo, sube de tamaño y compara.</Idea>

      <div className="prose">
        <h2>Elige por tarea, no por fama</h2>
        <p>Un ranking general no sabe si vas a resumir PDFs, escribir código, clasificar emails o responder con RAG. Antes de descargar cinco modelos, define la tarea y prueba siempre con las mismas preguntas.</p>
        <ul>
          <li><strong>Chat y explicación:</strong> prioriza fluidez, rapidez y buen español.</li>
          <li><strong>RAG:</strong> prioriza obedecer contexto, citar y abstenerse cuando falta evidencia.</li>
          <li><strong>Código:</strong> prioriza contexto, consistencia multiarchivo y que acepte correcciones.</li>
          <li><strong>Extracción JSON:</strong> prioriza formato estable por encima de creatividad.</li>
          <li><strong>Automatización:</strong> prioriza latencia, coste local y fallos recuperables.</li>
        </ul>
      </div>

      <Terminal>{`# ficha mínima para comparar modelos
tarea: "RAG de manuales internos"
hardware: "Mac M4 24GB"
preguntas: 20
metricas:
  responde_con_cita: "18/20"
  inventa_fuente: "1/20"
  se_abstiene_bien: "3/4"
  velocidad: "aceptable"
decision: "usar para piloto; revisar citas antes de producción"`}</Terminal>

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
        <p>Descarga dos modelos de distinto tamaño (por ejemplo <code>qwen3:4b</code> y un Gemma). Hazles cinco preguntas iguales: una fácil, una con instrucciones largas, una que requiera JSON, una con texto inventado que debe rechazar y una de tu caso real. Así aprendes a elegir el equilibrio que te conviene.</p>
      </div>

      <ChapterNav prev={{ href: "/cursos/ia-local/prompts", label: "Escribir buenos encargos" }} next={{ href: "/cursos/ia-local/conectar-ollama", label: "Conecta Claude Code con tu IA local" }} />
    </Chapter>
  );
}
