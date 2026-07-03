import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "SFT rápido con Unsloth — Fine-tuning local",
  description:
    "Cómo preparar un entrenamiento SFT con Unsloth para modelos abiertos, LoRA/QLoRA, dataset JSONL, logging, guardado de adaptador y prueba local.",
  keywords: ["Unsloth fine tuning español", "SFT Unsloth LoRA", "QLoRA Unsloth", "entrenar LLM local"],
  alternates: { canonical: "/cursos/fine-tuning-local/unsloth-sft" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Unsloth SFT"
      title="SFT rápido con Unsloth"
      icon="rocket"
      lead={<>Unsloth es una vía práctica para entrenar adaptadores rápido, especialmente con LoRA/QLoRA. Úsalo para prototipos serios, pero documenta todo como si fuera producción.</>}
      courseHref="/cursos/fine-tuning-local"
      courseLabel="Fine-tuning local"
    >
      <Objetivos>
        <ul>
          <li>Montar un script SFT pequeño con dataset propio.</li>
          <li>Guardar adaptador, configuración y métricas.</li>
          <li>Probar el modelo adaptado contra ejemplos no vistos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="checkpoint">
        Es una foto del entrenamiento en un momento concreto: pesos, configuración y estado. Te permite comparar o volver atrás.
      </Cristiano>

      <div className="prose">
        <h2>Estructura recomendada</h2>
      </div>

      <Terminal>{`fine-tune-soporte/
  data/
    train.jsonl
    validation.jsonl
    test.jsonl
  train_unsloth.py
  configs/
    soporte-lora.yaml
  outputs/
    adapter/
    logs/
  evals/
    eval_cases.jsonl`}</Terminal>

      <Idea>
        Unsloth documenta fine-tuning para personalizar comportamiento, conocimiento de dominio y tareas concretas, además de export a formatos como GGUF.
      </Idea>

      <div className="prose">
        <h2>Script conceptual</h2>
      </div>

      <Terminal>{`from datasets import load_dataset
from trl import SFTTrainer, SFTConfig

dataset = load_dataset("json", data_files={
    "train": "data/train.jsonl",
    "validation": "data/validation.jsonl",
})

config = SFTConfig(
    output_dir="outputs/soporte-lora",
    max_length=2048,
    learning_rate=2e-4,
    num_train_epochs=1,
    logging_steps=10,
    eval_strategy="steps",
    eval_steps=50,
)

trainer = SFTTrainer(
    model="Qwen/Qwen3-4B-Instruct",
    args=config,
    train_dataset=dataset["train"],
    eval_dataset=dataset["validation"],
)

trainer.train()
trainer.save_model("outputs/adapter")`}</Terminal>

      <Cuidado>
        El ejemplo es deliberadamente conceptual: revisa la guía actual de Unsloth/TRL para la versión exacta de instalación, GPU y modelo que uses.
      </Cuidado>

      <Comprueba>
        Ejecuta 20 casos de test antes y después del adaptador. Debe mejorar el objetivo sin empeorar seguridad, formato ni abstención.
      </Comprueba>

      <Guardar>
        Un entrenamiento útil deja tres cosas: adaptador, logs y una comparación antes/después.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/fine-tuning-local/lora-qlora", label: "LoRA y QLoRA" }}
        next={{ href: "/cursos/fine-tuning-local/axolotl-config", label: "Axolotl reproducible" }}
      />
    </Chapter>
  );
}
