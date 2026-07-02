import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Vídeo local con Wan y ComfyUI — IA generativa",
  description:
    "Crea clips cortos con modelos de vídeo abiertos como Wan usando ComfyUI, controlando duración, semilla, referencia y coste de GPU.",
  keywords: ["Wan video IA", "ComfyUI video", "IA video open source", "text to video local"],
  alternates: { canonical: "/cursos/ia-generativa/video-local" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Vídeo local"
      title="Vídeo local con Wan y ComfyUI"
      icon="video"
      lead={<>El vídeo generativo es tentador, pero caro en memoria y fácil de descontrolar. Para educación, empieza por clips breves, planos simples y una función clara dentro de la lección.</>}
      courseHref="/cursos/ia-generativa"
      courseLabel="IA generativa"
    >
      <Objetivos>
        <ul>
          <li>Diseñar clips cortos que expliquen una idea concreta.</li>
          <li>Entender cuándo usar texto a vídeo o imagen a vídeo.</li>
          <li>Unir imagen, voz y subtítulos en un resultado revisable.</li>
        </ul>
      </Objetivos>

      <Cristiano term="imagen a vídeo">
        En vez de pedir un vídeo desde cero, partes de una imagen aprobada y le pides movimiento. Suele dar más control para material educativo.
      </Cristiano>

      <div className="prose">
        <h2>Plan de escena antes del modelo</h2>
      </div>

      <Terminal>{`{
  "escena": "vector database",
  "duracion_segundos": 4,
  "formato": "16:9",
  "entrada": "imagen aprobada rag-hibrido-portada.png",
  "movimiento": "paneo lento hacia los documentos citados",
  "prohibido": ["texto pequeño ilegible", "caras", "logos"],
  "salida": "clip-rag-hibrido-4s.mp4"
}`}</Terminal>

      <Idea>
        Wan y otros modelos recientes de vídeo mejoran mucho, pero siguen necesitando memoria. Si tu equipo no puede, genera en cloud y mantén local el guion, manifest y revisión.
      </Idea>

      <div className="prose">
        <h2>Workflow recomendado</h2>
        <ul>
          <li>Genera una imagen fija y apruébala.</li>
          <li>Crea un clip de 3 a 5 segundos con movimiento mínimo.</li>
          <li>Revisa deformaciones, texto roto y cambios de identidad visual.</li>
          <li>Añade narración y subtítulos fuera del modelo de vídeo.</li>
          <li>Exporta una versión ligera para web.</li>
        </ul>
      </div>

      <Terminal>{`ffmpeg -i clip-rag-hibrido-4s.mp4 \\
  -i narracion.wav \\
  -shortest \\
  -c:v libx264 -crf 23 -preset medium \\
  -c:a aac \\
  salida-capsula.mp4`}</Terminal>

      <Cuidado>
        No uses vídeo para explicar algo que una imagen o animación simple explica mejor. El objetivo de Aulafy es enseñar, no enseñar que sabemos generar vídeo.
      </Cuidado>

      <Comprueba>
        Mira el clip sin audio. Si no se entiende la idea visual, vuelve al storyboard. Luego míralo con audio y subtítulos para comprobar ritmo.
      </Comprueba>

      <Guardar>
        En vídeo local, menos es más: planos cortos, movimiento suave, manifest guardado y revisión humana antes de publicar.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-generativa/voz-local", label: "Voz local" }}
        next={{ href: "/cursos/ia-generativa/proyecto-multimodal", label: "Proyecto multimodal" }}
      />
    </Chapter>
  );
}
