import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Datasets de instrucciones de calidad — Fine-tuning local",
  description:
    "Cómo preparar datasets para fine-tuning de LLMs: formato instruction/input/output, chat templates, datos sintéticos, limpieza, privacidad y splits.",
  keywords: ["dataset fine tuning LLM", "instruction dataset español", "chat template SFT", "datos sintéticos LLM"],
  alternates: { canonical: "/cursos/fine-tuning-local/datasets-instrucciones" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Datasets"
      title="Datasets de instrucciones de calidad"
      icon="document"
      lead={<>La calidad del fine-tuning depende más del dataset que del comando de entrenamiento. Un dataset pequeño, limpio y representativo gana a miles de ejemplos ruidosos.</>}
      courseHref="/cursos/fine-tuning-local"
      courseLabel="Fine-tuning local"
    >
      <Objetivos>
        <ul>
          <li>Crear ejemplos de instrucción útiles para SFT.</li>
          <li>Separar train, validation y test sin contaminar resultados.</li>
          <li>Eliminar datos sensibles, duplicados y respuestas mediocres.</li>
        </ul>
      </Objetivos>

      <Cristiano term="SFT">
        Supervised fine-tuning: enseñas con ejemplos de entrada y salida deseada. El modelo aprende el patrón, no solo una orden.
      </Cristiano>

      <div className="prose">
        <h2>Formato simple</h2>
      </div>

      <Terminal>{`{"instruction":"Clasifica el email","input":"Hola, quiero cambiar mi factura...","output":"categoria: facturacion\\nprioridad: media\\naccion: pedir numero de factura"}
{"instruction":"Redacta respuesta breve","input":"Cliente pide plazo de entrega","output":"Hola, gracias por escribir. El plazo estimado es..."}
{"instruction":"Extrae campos","input":"Presupuesto para 3 licencias anuales","output":"{\"producto\":\"licencia anual\",\"cantidad\":3}"}`}</Terminal>

      <Idea>
        TRL incluye SFTTrainer y documentación sobre formatos de dataset y entrenamiento. Úsalo con formatos consistentes; el modelo aprende tus rarezas también.
      </Idea>

      <div className="prose">
        <h2>Checklist de limpieza</h2>
        <ul>
          <li>Sin emails, teléfonos, DNI, claves ni nombres reales si no hay base legal.</li>
          <li>Sin ejemplos duplicados entre train y test.</li>
          <li>Sin respuestas contradictorias para la misma instrucción.</li>
          <li>Con errores reales del dominio, no solo casos perfectos.</li>
          <li>Con ejemplos donde el modelo debe rechazar o pedir aclaración.</li>
        </ul>
      </div>

      <Terminal>{`dataset/
  train.jsonl
  validation.jsonl
  test.jsonl
  README.md
  data_card.md
  redactions.log`}</Terminal>

      <Cuidado>
        Los datos sintéticos ayudan, pero si todos suenan igual, enseñas al modelo a ser artificial. Mezcla ejemplos reales anonimizados, plantillas y revisión humana.
      </Cuidado>

      <Comprueba>
        Revisa 50 ejemplos al azar. Si 10 te dan vergüenza, no entrenes todavía.
      </Comprueba>

      <Guardar>
        Un buen dataset es producto editorial: selección, limpieza, tono, límites y evaluación.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/fine-tuning-local/mapa-post-training", label: "Mapa post-training" }}
        next={{ href: "/cursos/fine-tuning-local/lora-qlora", label: "LoRA y QLoRA" }}
      />
    </Chapter>
  );
}
