import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Diffusers con Python reproducible — IA generativa",
  description:
    "Usa Hugging Face Diffusers para generar imágenes con FLUX desde Python, guardando seed, prompt, modelo y manifiesto reproducible.",
  keywords: ["Diffusers FLUX Python", "generación de imágenes Python", "FluxPipeline", "IA generativa reproducible"],
  alternates: { canonical: "/cursos/ia-generativa/diffusers-python" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Diffusers"
      title="Diffusers con Python reproducible"
      icon="python"
      lead={<>Cuando una imagen forma parte de un curso, campaña o producto, necesitas repetirla, compararla y documentarla. Ahí Diffusers gana: convierte la generación en código versionable.</>}
      courseHref="/cursos/ia-generativa"
      courseLabel="IA generativa"
    >
      <Objetivos>
        <ul>
          <li>Crear un script mínimo de generación de imágenes.</li>
          <li>Controlar seed, tamaño, pasos y nombre de salida.</li>
          <li>Guardar un manifest para auditar resultados.</li>
        </ul>
      </Objetivos>

      <Cristiano term="seed">
        Es el punto de partida aleatorio. Si guardas modelo, prompt, parámetros y seed, puedes acercarte al mismo resultado y comparar cambios con justicia.
      </Cristiano>

      <div className="prose">
        <h2>Entorno</h2>
      </div>

      <Terminal>{`mkdir imagenes-diffusers
cd imagenes-diffusers
python -m venv .venv
source .venv/bin/activate
pip install -U diffusers transformers accelerate sentencepiece safetensors`}</Terminal>

      <div className="prose">
        <h2>Script base</h2>
      </div>

      <Terminal>{`import json
import torch
from diffusers import FluxPipeline

model_id = "black-forest-labs/FLUX.1-schnell"
prompt = "clear educational diagram about local AI, calm workspace, Spanish labels, no logos"
seed = 2048

pipe = FluxPipeline.from_pretrained(model_id, torch_dtype=torch.bfloat16)
pipe.enable_model_cpu_offload()

image = pipe(
    prompt,
    num_inference_steps=4,
    guidance_scale=0.0,
    generator=torch.Generator("cpu").manual_seed(seed),
).images[0]

image.save("salida-local-ai-2048.png")

manifest = {
    "model_id": model_id,
    "prompt": prompt,
    "seed": seed,
    "steps": 4,
    "guidance_scale": 0.0,
    "output": "salida-local-ai-2048.png",
}

with open("salida-local-ai-2048.manifest.json", "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)`}</Terminal>

      <Idea>
        FLUX.1 schnell está pensado para pocas iteraciones. Si cambias de modelo, revisa parámetros recomendados: no todos responden igual a pasos, guidance o resolución.
      </Idea>

      <Cuidado>
        Diffusers facilita ejecutar modelos, pero no elimina sus requisitos de memoria. Si tu GPU no llega, usa offload, baja resolución o ejecuta en una máquina temporal con GPU.
      </Cuidado>

      <Comprueba>
        Genera tres imágenes con la misma seed cambiando solo una palabra del prompt. Si puedes explicar qué cambió y por qué, ya tienes una base reproducible.
      </Comprueba>

      <Guardar>
        El manifest es parte del resultado. Una imagen sin modelo, prompt y seed es difícil de mejorar y difícil de defender.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-generativa/comfyui-flux", label: "ComfyUI + FLUX" }}
        next={{ href: "/cursos/ia-generativa/control-lora", label: "Control, referencias y LoRA" }}
      />
    </Chapter>
  );
}
