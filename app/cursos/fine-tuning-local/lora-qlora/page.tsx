import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "LoRA y QLoRA sin humo — Fine-tuning local",
  description:
    "Explicación práctica de LoRA, QLoRA, rank, alpha, learning rate, epochs, VRAM, overfitting y cuándo usar PEFT para adaptar modelos abiertos.",
  keywords: ["LoRA tutorial español", "QLoRA VRAM", "PEFT fine tuning", "rank alpha LoRA"],
  alternates: { canonical: "/cursos/fine-tuning-local/lora-qlora" },
};

export default function Page() {
  return (
    <Chapter
      crumb="LoRA y QLoRA"
      title="LoRA y QLoRA sin humo"
      icon="lab"
      lead={<>LoRA no hace magia: añade adaptadores pequeños y entrena esos pesos. QLoRA reduce memoria usando cuantización. La parte difícil sigue siendo datos, evaluación y no pasarte entrenando.</>}
      courseHref="/cursos/fine-tuning-local"
      courseLabel="Fine-tuning local"
    >
      <Objetivos>
        <ul>
          <li>Entender qué entrenas realmente con LoRA.</li>
          <li>Elegir rank, alpha, learning rate y epochs con prudencia.</li>
          <li>Detectar señales tempranas de overfitting.</li>
        </ul>
      </Objetivos>

      <Cristiano term="adaptador">
        Es un archivo pequeño que modifica el comportamiento del modelo base. Puedes cargarlo, quitarlo o combinarlo sin duplicar todo el modelo.
      </Cristiano>

      <div className="prose">
        <h2>Parámetros que importan</h2>
        <ul>
          <li><strong>rank r</strong>: capacidad del adaptador. Más no siempre es mejor.</li>
          <li><strong>alpha</strong>: escala del impacto de LoRA.</li>
          <li><strong>learning rate</strong>: velocidad de aprendizaje; alto puede destruir generalización.</li>
          <li><strong>epochs</strong>: pasadas por el dataset; demasiadas memorizan.</li>
          <li><strong>target modules</strong>: capas donde aplicas LoRA.</li>
        </ul>
      </div>

      <Idea>
        La guía de Unsloth sobre hiperparámetros avisa de overfitting cuando la pérdida baja demasiado y el modelo deja de generalizar. No persigas solo loss baja.
      </Idea>

      <div className="prose">
        <h2>Configuración inicial prudente</h2>
      </div>

      <Terminal>{`lora:
  r: 16
  alpha: 32
  dropout: 0.05
  target_modules:
    - q_proj
    - k_proj
    - v_proj
    - o_proj
training:
  learning_rate: 2e-4
  epochs: 1
  max_seq_length: 2048
  eval_steps: 50`}</Terminal>

      <Cuidado>
        Si tu dataset tiene 300 ejemplos, entrenar muchas epochs probablemente memoriza estilo y errores. Primero mejora datos; luego toca hiperparámetros.
      </Cuidado>

      <Comprueba>
        Entrena un adaptador pequeño y evalúa en ejemplos que el modelo nunca vio. Si solo mejora en train, no has adaptado: has memorizado.
      </Comprueba>

      <Guardar>
        LoRA es barato comparado con full fine-tuning, pero un adaptador malo también es barato de producir. Evalúa siempre.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/fine-tuning-local/datasets-instrucciones", label: "Datasets" }}
        next={{ href: "/cursos/fine-tuning-local/unsloth-sft", label: "SFT con Unsloth" }}
      />
    </Chapter>
  );
}
