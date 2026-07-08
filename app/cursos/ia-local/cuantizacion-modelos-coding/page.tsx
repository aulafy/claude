import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Cuantización y modelos para coding",
  description:
    "Cómo elegir modelos locales y quants para tareas de código: Q4, Q5, Q8, GGUF, contexto, velocidad, calidad y pruebas antes de usar agentes.",
  keywords: ["cuantizacion fp8 vs q4 vllm problemas", "gemma 4 ollama mlx velocidad agents", "mejor modelo local para coding agents Ollama 2026", "GGUF Q4 Q5 coding"],
  alternates: { canonical: "/cursos/ia-local/cuantizacion-modelos-coding" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Modelos para coding"
      title="Cuantización y modelos para coding"
      icon="code"
      lead={<>Para programar con modelos locales no gana siempre el modelo más grande. Gana el que responde suficientemente bien, cabe con contexto útil y puede repetir tareas sin arrastrarte a OOM o latencia imposible.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Elegir quant según hardware y tarea.</li>
          <li>Medir velocidad, calidad y contexto en vez de fiarte de rankings.</li>
          <li>Preparar una prueba mínima para coding agents locales.</li>
        </ul>
      </Objetivos>

      <Cristiano term="cuantización">
        Es comprimir los números del modelo para que ocupe menos memoria. Puede hacerlo más rápido y viable en tu equipo, pero si aprietas demasiado pierde calidad o estabilidad.
      </Cristiano>

      <div className="prose">
        <h2>Regla práctica</h2>
        <ul>
          <li><strong>Q4</strong>: entra en más hardware, buena velocidad, puede perder matices.</li>
          <li><strong>Q5</strong>: equilibrio frecuente para uso diario.</li>
          <li><strong>Q8</strong>: más calidad, más memoria, menos margen para contexto.</li>
          <li><strong>FP8/KV cache</strong>: útil en serving, pero hay que validar estabilidad.</li>
        </ul>
      </div>

      <Idea>
        Para agentes de código, contexto y verificación importan más que un benchmark aislado. Un modelo pequeño con buen contexto y tests puede ser más útil que uno grande que se cae.
      </Idea>

      <Terminal>{`# Prueba repetible para comparar modelos
ollama run qwen2.5-coder:7b "Crea tests para una función que parsea fechas ISO."
ollama run qwen2.5-coder:14b "Crea tests para una función que parsea fechas ISO."

# Observa contexto y carga efectiva
ollama ps

# Guarda resultados:
# - tokens/s
# - tiempo al primer token
# - calidad del test
# - si compila
# - memoria usada`}</Terminal>

      <div className="prose">
        <h2>Test mínimo para un modelo de coding</h2>
        <ol>
          <li>Explicar un bug real de tu repo.</li>
          <li>Generar tests que fallen antes del fix.</li>
          <li>Proponer parche pequeño.</li>
          <li>Ejecutar lint y build.</li>
          <li>Comparar diff y errores.</li>
        </ol>
      </div>

      <Cuidado>
        Cambiar de quant puede cambiar mucho la velocidad y también el comportamiento. No actualices modelo o quant en un flujo de producción sin repetir evals.
      </Cuidado>

      <Comprueba>
        Mantén un archivo `models-eval.md` con modelo, quant, contexto, hardware, tokens/segundo, tarea y resultado. En IA local, la memoria humana miente rápido.
      </Comprueba>

      <Guardar>
        La mejor recomendación de modelo siempre tiene fecha. En 2026, modelos y quants cambian demasiado rápido para prometer rankings eternos.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md" target="_blank" rel="noopener noreferrer">llama.cpp quantization README</a></li>
          <li><a href="https://docs.vllm.ai/en/latest/features/quantization/quantized_kvcache/" target="_blank" rel="noopener noreferrer">vLLM quantized KV cache</a></li>
          <li><a href="https://docs.ollama.com/context-length" target="_blank" rel="noopener noreferrer">Ollama context length</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/homelab-rtx-3090", label: "Homelab RTX 3090" }}
        next={{ href: "/cursos/ia-local/agentes-codigo-locales", label: "Agentes de código locales" }}
      />
    </Chapter>
  );
}
