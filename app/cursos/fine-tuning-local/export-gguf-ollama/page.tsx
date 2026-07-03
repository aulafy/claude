import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Exportar a GGUF y Ollama — Fine-tuning local",
  description:
    "Cómo preparar un modelo o adaptador fine-tuned para uso local: merge, safetensors, GGUF, cuantización, Modelfile de Ollama y prueba final.",
  keywords: ["exportar LoRA a GGUF", "fine tuning Ollama", "GGUF modelo entrenado", "Unsloth export GGUF"],
  alternates: { canonical: "/cursos/fine-tuning-local/export-gguf-ollama" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Export"
      title="Exportar a GGUF y Ollama"
      icon="download"
      lead={<>Entrenar es solo la mitad. Si el modelo adaptado no se puede usar con tu stack local, no has terminado. Exportar bien significa conservar comportamiento, cuantizar con criterio y probar en la app real.</>}
      courseHref="/cursos/fine-tuning-local"
      courseLabel="Fine-tuning local"
    >
      <Objetivos>
        <ul>
          <li>Entender cuándo usar adaptador separado y cuándo mergear.</li>
          <li>Preparar GGUF para llama.cpp/Ollama.</li>
          <li>Crear un Modelfile con prompt de sistema y parámetros.</li>
        </ul>
      </Objetivos>

      <Cristiano term="merge">
        Es combinar el adaptador LoRA con el modelo base para generar un modelo completo. A veces conviene; otras prefieres cargar adaptador separado.
      </Cristiano>

      <div className="prose">
        <h2>Flujo de salida</h2>
      </div>

      <Terminal>{`adapter LoRA
  -> evaluar
  -> merge con modelo base si procede
  -> export safetensors
  -> convertir a GGUF
  -> cuantizar Q4/Q5/Q8
  -> crear Modelfile Ollama
  -> probar en la app real`}</Terminal>

      <Idea>
        Unsloth documenta export de modelos fine-tuned a formatos como safetensors y GGUF para usarlos con llama.cpp, vLLM, Ollama y otros runtimes.
      </Idea>

      <div className="prose">
        <h2>Modelfile de Ollama</h2>
      </div>

      <Terminal>{`FROM ./soporte-qwen-lora-q5_k_m.gguf

PARAMETER temperature 0.2
PARAMETER num_ctx 4096

SYSTEM """
Eres un asistente interno de soporte.
Responde en español claro.
Si faltan datos, pide aclaración.
No inventes políticas, precios ni datos personales.
"""`}</Terminal>

      <Terminal>{`ollama create soporte-pyme -f Modelfile
ollama run soporte-pyme "Clasifica este email de ejemplo"`}</Terminal>

      <Cuidado>
        Cuantizar puede cambiar comportamiento. Repite evals después de convertir a GGUF, no solo antes.
      </Cuidado>

      <Comprueba>
        Compara modelo base, adaptador sin cuantizar y GGUF cuantizado con los mismos 20 casos. Si el GGUF cae mucho, cambia quant o parámetros.
      </Comprueba>

      <Guardar>
        Un modelo adaptado publicado debe tener manifest: base, adaptador, dataset, evals, quant, Modelfile y fecha.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/fine-tuning-local/evals-overfitting", label: "Evals y overfitting" }}
        next={{ href: "/cursos/fine-tuning-local/proyecto-modelo-pyme", label: "Proyecto pyme" }}
      />
    </Chapter>
  );
}
