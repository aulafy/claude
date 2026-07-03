import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Mapa: SFT, LoRA, QLoRA y DPO — Fine-tuning local",
  description:
    "Mapa práctico para decidir cuándo usar prompt engineering, RAG, SFT, LoRA, QLoRA o DPO al adaptar modelos abiertos con datos propios.",
  keywords: ["fine tuning LLM español", "LoRA QLoRA tutorial", "SFT DPO LLM", "post training modelos abiertos"],
  alternates: { canonical: "/cursos/fine-tuning-local/mapa-post-training" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Mapa post-training"
      title="Mapa: SFT, LoRA, QLoRA y DPO"
      icon="experiment"
      lead={<>Fine-tuning no es el martillo para todo. Antes de entrenar, decide si el problema se arregla con mejor prompt, RAG, herramientas, datos limpios o adaptación real del modelo.</>}
      courseHref="/cursos/fine-tuning-local"
      courseLabel="Fine-tuning local"
    >
      <Objetivos>
        <ul>
          <li>Distinguir prompt engineering, RAG, SFT, LoRA, QLoRA y DPO.</li>
          <li>Elegir la técnica adecuada según coste, datos y objetivo.</li>
          <li>Evitar entrenar un modelo cuando solo necesitas recuperar información.</li>
        </ul>
      </Objetivos>

      <Cristiano term="post-training">
        Es adaptar un modelo ya entrenado para que responda mejor a una tarea, formato, estilo o política concreta.
      </Cristiano>

      <div className="prose">
        <h2>Decisión rápida</h2>
        <ul>
          <li><strong>Prompt</strong>: quieres cambiar formato, tono o instrucciones simples.</li>
          <li><strong>RAG</strong>: quieres que use documentos actualizables o privados.</li>
          <li><strong>SFT</strong>: quieres que aprenda patrones de pregunta-respuesta de tu dominio.</li>
          <li><strong>LoRA</strong>: quieres entrenar pocos parámetros y guardar un adaptador ligero.</li>
          <li><strong>QLoRA</strong>: quieres LoRA usando cuantización para reducir memoria.</li>
          <li><strong>DPO</strong>: quieres alinear preferencias comparando respuestas buenas y malas.</li>
        </ul>
      </div>

      <Idea>
        PEFT permite adaptar modelos entrenando solo una parte pequeña de parámetros, reduciendo memoria y coste frente a fine-tuning completo.
      </Idea>

      <div className="prose">
        <h2>Ficha de decisión</h2>
      </div>

      <Terminal>{`objetivo: "responder emails de soporte con tono de marca"
datos_disponibles:
  ejemplos_buenos: 800
  ejemplos_malos: 120
  documentos_actualizables: true
mejor_opcion:
  - RAG para políticas que cambian
  - SFT/LoRA para tono y formato
no_entrenar_para:
  - memorizar precios
  - guardar contratos privados
  - sustituir permisos`}</Terminal>

      <Cuidado>
        No metas conocimiento cambiante al modelo si puede vivir en RAG. Entrenar para recordar información que cambia suele crear deuda.
      </Cuidado>

      <Comprueba>
        Escribe tres objetivos de adaptación. Marca cuál necesita prompt, cuál necesita RAG y cuál sí justifica fine-tuning.
      </Comprueba>

      <Guardar>
        Fine-tuning bueno empieza con una pregunta incómoda: ¿de verdad necesito entrenar?
      </Guardar>

      <ChapterNav next={{ href: "/cursos/fine-tuning-local/datasets-instrucciones", label: "Datasets de instrucciones" }} />
    </Chapter>
  );
}
