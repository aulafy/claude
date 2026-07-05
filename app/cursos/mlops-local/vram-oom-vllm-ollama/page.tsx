import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "VRAM y OOM: vLLM vs Ollama/llama.cpp — MLOps local",
  description:
    "Diagnóstico práctico de CUDA OOM y límites de VRAM en IA local: cuándo usar vLLM, Ollama o llama.cpp, cómo ajustar contexto, KV cache y cuantización.",
  keywords: ["vllm cuda oom single gpu solución", "ollama rtx 3090 oom error fix 2026", "vLLM vs Ollama VRAM", "KV cache FP8"],
  alternates: { canonical: "/cursos/mlops-local/vram-oom-vllm-ollama" },
};

export default function Page() {
  return (
    <Chapter
      crumb="VRAM y OOM"
      title="VRAM y OOM: vLLM vs Ollama/llama.cpp"
      icon="server"
      lead={<>La mayoría de setups locales no mueren porque el modelo “sea malo”: mueren porque no cabe, porque el contexto dispara la KV cache o porque usas un runtime pensado para concurrencia cuando solo necesitas estabilidad.</>}
      courseHref="/cursos/mlops-local"
      courseLabel="MLOps local"
    >
      <Objetivos>
        <ul>
          <li>Separar memoria de pesos, KV cache, contexto y batch.</li>
          <li>Decidir cuándo usar vLLM, Ollama o llama.cpp.</li>
          <li>Aplicar una ruta de fixes antes de comprar hardware.</li>
        </ul>
      </Objetivos>

      <Cristiano term="OOM">
        Out of memory significa que el runtime necesita más memoria GPU de la disponible. Puede pasar aunque “el modelo pese menos que tu VRAM”, porque también cuentan contexto, KV cache, batch, fragmentación y overhead.
      </Cristiano>

      <div className="prose">
        <h2>Regla rápida</h2>
        <ul>
          <li><strong>Ollama</strong>: más simple y estable para uso personal, pruebas y baja concurrencia.</li>
          <li><strong>llama.cpp</strong>: mucho control, GGUF, CPU/GPU mixto y multi-GPU práctico.</li>
          <li><strong>vLLM</strong>: throughput y concurrencia cuando el modelo cabe con margen.</li>
        </ul>
      </div>

      <Idea>
        Si estás al límite de VRAM, vLLM suele ser menos indulgente que Ollama o llama.cpp. Si necesitas muchas peticiones concurrentes, vLLM empieza a tener sentido.
      </Idea>

      <Terminal>{`# Observa GPU y memoria mientras pruebas
nvidia-smi -l 1

# Ollama: mira modelo, tamaño y contexto efectivo
ollama ps

# vLLM: empieza conservador
python -m vllm.entrypoints.openai.api_server \\
  --model Qwen/Qwen2.5-7B-Instruct \\
  --max-model-len 4096 \\
  --gpu-memory-utilization 0.85`}</Terminal>

      <div className="prose">
        <h2>Ruta de fixes antes de rendirte</h2>
        <ol>
          <li>Baja `max-model-len`: contexto largo consume mucha memoria.</li>
          <li>Prueba un quant más pequeño o un modelo menor.</li>
          <li>Reduce batch/concurrencia.</li>
          <li>Deja margen de VRAM: no apuntes a 99% de uso.</li>
          <li>Si necesitas estabilidad, prueba llama.cpp/Ollama antes de vLLM.</li>
          <li>Si necesitas concurrencia, usa vLLM pero con modelo que quepa holgado.</li>
        </ol>
      </div>

      <Terminal>{`# llama.cpp server con modelo GGUF
./llama-server \\
  -m ./models/modelo-q4_k_m.gguf \\
  --ctx-size 4096 \\
  --n-gpu-layers 99 \\
  --host 0.0.0.0 \\
  --port 8080`}</Terminal>

      <Cuidado>
        La KV cache crece con el contexto y las sesiones activas. Un modelo que responde bien a 4k puede caerse a 16k, aunque los pesos sean los mismos.
      </Cuidado>

      <Comprueba>
        Haz tres pruebas: 4k, 8k y 16k de contexto. Registra VRAM, tiempo al primer token, tokens/segundo y errores. Sin esa tabla, no sabes si tu cambio mejoró algo.
      </Comprueba>

      <Guardar>
        Elige runtime por carga real: Ollama para simplicidad, llama.cpp para control y vLLM para concurrencia. El peor setup es elegir vLLM “porque es rápido” y vivir en OOM.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.vllm.ai/en/latest/features/quantization/quantized_kvcache/" target="_blank" rel="noopener noreferrer">vLLM: Quantized KV Cache</a></li>
          <li><a href="https://docs.ollama.com/context-length" target="_blank" rel="noopener noreferrer">Ollama: context length</a></li>
          <li><a href="https://github.com/ggml-org/llama.cpp/blob/master/docs/multi-gpu.md" target="_blank" rel="noopener noreferrer">llama.cpp: multi-GPU</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/mlops-local/mapa-serving", label: "Mapa de serving" }}
        next={{ href: "/cursos/mlops-local/llama-server", label: "llama.cpp server" }}
      />
    </Chapter>
  );
}
