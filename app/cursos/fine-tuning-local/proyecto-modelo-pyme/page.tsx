import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Proyecto: modelo adaptado para una pyme — Fine-tuning local",
  description:
    "Proyecto final de fine-tuning local: dataset de soporte, LoRA/QLoRA, evals, privacidad, export GGUF, Ollama y decisión de producción.",
  keywords: ["proyecto fine tuning LLM", "modelo adaptado pyme", "LoRA soporte cliente", "fine tuning local español"],
  alternates: { canonical: "/cursos/fine-tuning-local/proyecto-modelo-pyme" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Proyecto final"
      title="Proyecto: modelo adaptado para una pyme"
      icon="briefcase"
      lead={<>El proyecto final adapta un modelo abierto para soporte de una pyme ficticia: clasifica emails, redacta respuestas y sabe pedir aclaración sin inventar políticas.</>}
      courseHref="/cursos/fine-tuning-local"
      courseLabel="Fine-tuning local"
    >
      <Objetivos>
        <ul>
          <li>Construir un dataset pequeño, limpio y auditable.</li>
          <li>Entrenar un adaptador LoRA/QLoRA y compararlo con baseline.</li>
          <li>Exportar el resultado para uso local con Ollama o llama.cpp.</li>
        </ul>
      </Objetivos>

      <Cristiano term="entregable de fine-tuning">
        No es solo un archivo de pesos. Es dataset, configuración, adaptador, evals, manifest, límites de uso y decisión de salida.
      </Cristiano>

      <div className="prose">
        <h2>Estructura del proyecto</h2>
      </div>

      <Terminal>{`modelo-soporte-pyme/
  data/
    train.jsonl
    validation.jsonl
    test.jsonl
    data_card.md
  configs/
    lora.yaml
  evals/
    cases.jsonl
    baseline.json
    lora-v1.json
    gguf-q5.json
  outputs/
    adapter/
    gguf/
  Modelfile
  manifest.json
  README.md`}</Terminal>

      <Idea>
        Este proyecto conecta con otros cursos: pymes para el caso de uso, seguridad/evals para decidir salida y MLOps local para servirlo.
      </Idea>

      <div className="prose">
        <h2>Manifest final</h2>
      </div>

      <Terminal>{`{
  "base_model": "Qwen/Qwen3-4B",
  "method": "LoRA",
  "dataset": "soporte-pyme-v1",
  "train_examples": 1200,
  "test_examples": 120,
  "privacy_review": true,
  "eval_result": {
    "format_ok": 0.94,
    "privacy_refusal": 0.96,
    "general_regression": "acceptable"
  },
  "export": "GGUF Q5_K_M",
  "runtime": "Ollama",
  "decision": "piloto interno"
}`}</Terminal>

      <Cuidado>
        No uses datos reales de clientes para practicar. Crea datos ficticios o anonimizados y documenta qué se eliminó.
      </Cuidado>

      <Comprueba>
        Prueba el modelo con emails buenos, ambiguos, maliciosos y fuera de dominio. Debe clasificar, responder o rechazar según corresponda.
      </Comprueba>

      <Guardar>
        Un fine-tune serio termina con una decisión: descartar, iterar, piloto interno o producción limitada.
      </Guardar>

      <ChapterNav prev={{ href: "/cursos/fine-tuning-local/export-gguf-ollama", label: "Exportar a GGUF" }} />
    </Chapter>
  );
}
