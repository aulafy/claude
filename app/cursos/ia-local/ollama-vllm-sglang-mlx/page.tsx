import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Ollama, vLLM, SGLang y MLX: qué usar — IA local",
  description:
    "Comparativa práctica para elegir runtime de IA local: Ollama para empezar, llama.cpp para control, vLLM/SGLang para producción y MLX para Apple Silicon.",
  keywords: ["Ollama vs vLLM", "SGLang IA local", "MLX Apple Silicon", "serving LLM local", "modelos locales 2026"],
  alternates: { canonical: "/cursos/ia-local/ollama-vllm-sglang-mlx" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Runtimes locales"
      title="Ollama, vLLM, SGLang y MLX: qué usar"
      icon="server"
      lead={<>La pregunta real no es cuál es mejor, sino cuál encaja con tu tarea, tu hardware y tu nivel de operación. Prototipar, servir a varios usuarios y exprimir un Mac no piden la misma herramienta.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Elegir runtime según caso de uso: prueba, RAG, agente o producción.</li>
          <li>Evitar migraciones prematuras que complican sin aportar valor.</li>
          <li>Medir latencia, memoria y errores antes de decidir.</li>
        </ul>
      </Objetivos>

      <Cristiano term="runtime de inferencia">
        Es el programa que carga el modelo y responde peticiones. El modelo puede ser el mismo, pero la experiencia cambia muchísimo según el runtime.
      </Cristiano>

      <div className="prose">
        <h2>Decisión rápida</h2>
        <ul>
          <li><strong>Ollama:</strong> empezar rápido, demos, escritorio, cursos y prototipos.</li>
          <li><strong>llama.cpp:</strong> control fino, GGUF, CPU/GPU sencilla y despliegues pequeños.</li>
          <li><strong>vLLM:</strong> muchas peticiones, API compatible, batching y GPU NVIDIA.</li>
          <li><strong>SGLang:</strong> serving avanzado, flujos estructurados y cargas complejas.</li>
          <li><strong>MLX:</strong> Apple Silicon, experimentación local eficiente en Mac.</li>
        </ul>
      </div>

      <Terminal>{`Mide antes de opinar:

caso: "chat_rag_pyme"
modelo: "qwen-coder/local"
hardware: "Mac M4 24GB"
runtime: "Ollama"
metricas:
  first_token_ms: 850
  tokens_s: 28
  ram_gb: 11
  errores_20_preguntas: 2
decision: "suficiente para prototipo; no migrar todavía"`}</Terminal>

      <Idea>
        Si solo tienes un usuario y una cola pequeña, Ollama puede ser suficiente. Si empiezas a tener concurrencia, colas y acuerdos de tiempo de respuesta, mira vLLM, SGLang o un gateway.
      </Idea>

      <Cuidado>
        No mezcles benchmark de internet con tu caso. Un ranking no sabe si tus documentos son largos, si usas tool calling o si tu GPU se queda sin VRAM.
      </Cuidado>

      <Comprueba>
        Ejecuta las mismas 20 preguntas con el mismo prompt, modelo y documentos en dos runtimes. Compara latencia, errores, consumo y facilidad de operación.
      </Comprueba>

      <Guardar>
        Guarda una tabla de decisión por proyecto. Dentro de tres meses te evitará discutir otra vez por qué elegiste ese stack.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://github.com/ollama/ollama" target="_blank" rel="noopener noreferrer">Ollama GitHub</a></li>
          <li><a href="https://docs.vllm.ai/" target="_blank" rel="noopener noreferrer">vLLM documentation</a></li>
          <li><a href="https://docs.sglang.ai/" target="_blank" rel="noopener noreferrer">SGLang documentation</a></li>
          <li><a href="https://ml-explore.github.io/mlx/build/html/index.html" target="_blank" rel="noopener noreferrer">MLX documentation</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/hardware-minimo-2026", label: "Hardware 2026" }}
        next={{ href: "/cursos/ia-local/windows-wsl2-vs-mac-m4", label: "Windows/WSL2 vs Mac" }}
      />
    </Chapter>
  );
}
