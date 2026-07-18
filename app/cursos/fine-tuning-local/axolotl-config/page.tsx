import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Axolotl reproducible — Fine-tuning local",
  description:
    "Usa Axolotl para configurar fine-tuning de LLMs con YAML, datasets, LoRA, QLoRA, checkpoints, logging y ejecución reproducible.",
  keywords: ["Axolotl fine tuning", "config YAML LLM", "post training reproducible", "fine tuning Qwen Gemma Mistral"],
  alternates: { canonical: "/cursos/fine-tuning-local/axolotl-config" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Axolotl"
      title="Axolotl para entrenamientos reproducibles"
      icon="gear"
      lead={<>Cuando el entrenamiento deja de ser un experimento puntual, necesitas configuración versionable. Axolotl permite describir dataset, modelo, LoRA y entrenamiento en archivos claros.</>}
      courseHref="/cursos/fine-tuning-local"
      courseLabel="Fine-tuning local"
    >
      <Objetivos>
        <ul>
          <li>Crear una configuración YAML legible para fine-tuning.</li>
          <li>Versionar datasets, hiperparámetros y checkpoints.</li>
          <li>Separar experimento rápido de pipeline reproducible.</li>
        </ul>
      </Objetivos>

      <Cristiano term="config reproducible">
        Un archivo que permite repetir el entrenamiento sin depender de memoria, capturas o comandos sueltos en la terminal.
      </Cristiano>

      <div className="prose">
        <h2>YAML mínimo orientativo</h2>
      </div>

      <Terminal>{`base_model: Qwen/Qwen3-4B
model_type: AutoModelForCausalLM
tokenizer_type: AutoTokenizer

datasets:
  - path: data/train.jsonl
    type: alpaca

sequence_len: 2048
adapter: lora
lora_r: 16
lora_alpha: 32
lora_dropout: 0.05

learning_rate: 0.0002
num_epochs: 1
micro_batch_size: 1
gradient_accumulation_steps: 8
output_dir: outputs/soporte-qwen-lora`}</Terminal>

      <Idea>
        Axolotl se presenta como herramienta open source para simplificar post-training y fine-tuning de modelos recientes. Su valor está en configuración, compatibilidad y repetición.
      </Idea>

      <div className="prose">
        <h2>Qué versionar</h2>
        <ul>
          <li>Config YAML.</li>
          <li>Hash o versión del dataset.</li>
          <li>Modelo base exacto.</li>
          <li>Versión de librerías.</li>
          <li>Resultados de eval.</li>
          <li>Decisión de publicar o descartar.</li>
        </ul>
      </div>

      <Cuidado>
        No subas checkpoints grandes ni datasets privados al repo. Sube configs, manifests, data cards y resultados.
      </Cuidado>

      <Comprueba>
        Otra persona debe poder leer tu YAML y entender qué entrenaste, con qué datos y para qué.
      </Comprueba>

      <Guardar>
        Axolotl te ayuda a tratar el fine-tuning como ingeniería, no como una libreta misteriosa.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/fine-tuning-local/unsloth-sft", label: "SFT con Unsloth" }}
        next={{ href: "/cursos/fine-tuning-local/evals-overfitting", label: "Evals y overfitting" }}
      />
    </Chapter>
  );
}
