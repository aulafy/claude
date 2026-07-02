import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Proyecto: cápsula educativa multimedia — IA generativa",
  description:
    "Proyecto final para crear una cápsula educativa con imagen, guion, narración, subtítulos y clip corto usando IA generativa open source.",
  keywords: ["proyecto IA generativa", "crear curso con IA", "cápsula educativa IA", "workflow multimedia IA"],
  alternates: { canonical: "/cursos/ia-generativa/proyecto-multimodal" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Proyecto final"
      title="Proyecto: cápsula educativa multimedia"
      icon="capsule"
      lead={<>El proyecto final une todo: una cápsula breve para explicar un concepto de IA con imagen propia, narración, subtítulos, manifest y una salida lista para web.</>}
      courseHref="/cursos/ia-generativa"
      courseLabel="IA generativa"
    >
      <Objetivos>
        <ul>
          <li>Diseñar una pieza educativa de 60 a 90 segundos.</li>
          <li>Combinar imagen, voz, subtítulos y vídeo sin perder trazabilidad.</li>
          <li>Publicar solo lo que sea comprensible, legal y revisable.</li>
        </ul>
      </Objetivos>

      <Cristiano term="cápsula educativa">
        Una mini lección autónoma: explica una idea concreta, muestra una evidencia visual y deja al alumno con un paso práctico.
      </Cristiano>

      <div className="prose">
        <h2>Estructura del proyecto</h2>
      </div>

      <Terminal>{`capsula-rag-seguro/
  guion.md
  escenas.json
  prompts/
    portada.md
    video.md
  workflows/
    comfyui-portada.json
    comfyui-video.json
  audio/
    narracion.wav
  subtitulos/
    narracion.srt
  output/
    capsula-rag-seguro.mp4
  manifest.json`}</Terminal>

      <Idea>
        El manifest no es burocracia. Es lo que te permite mejorar la cápsula dentro de un mes sin empezar desde cero.
      </Idea>

      <div className="prose">
        <h2>Manifest final</h2>
      </div>

      <Terminal>{`{
  "titulo": "Qué es RAG seguro",
  "duracion": "00:01:20",
  "modelos": [
    {"uso": "imagen", "nombre": "FLUX.1-schnell", "licencia": "Apache-2.0"},
    {"uso": "stt", "nombre": "Whisper", "licencia": "MIT"},
    {"uso": "tts", "nombre": "Piper voice model", "licencia": "revisada en fuente"}
  ],
  "fuentes_propias": ["guion.md", "boceto-propio.png"],
  "revision": {
    "texto_privado": false,
    "caras_reales": false,
    "logos": false,
    "subtitulos": true,
    "licencias_guardadas": true
  }
}`}</Terminal>

      <Cuidado>
        Una cápsula educativa no debe inventar hechos para sonar mejor. Si explicas una herramienta, comprueba versión, licencia y limitaciones antes de publicar.
      </Cuidado>

      <div className="prose">
        <h2>Checklist de publicación</h2>
        <ul>
          <li>El concepto se entiende sin depender de efectos.</li>
          <li>El audio no contiene errores de pronunciación importantes.</li>
          <li>Los subtítulos coinciden con la narración.</li>
          <li>La imagen no incluye marcas, caras ni texto privado.</li>
          <li>El archivo pesa lo justo para cargar bien en móvil.</li>
          <li>El manifest tiene modelos, licencias y fecha.</li>
        </ul>
      </div>

      <Comprueba>
        Enseña la cápsula a una persona que no haya hecho el curso. Si puede decir qué aprendió y qué haría después, funciona.
      </Comprueba>

      <Guardar>
        Proyecto terminado: una mini lección multimedia con guion, assets, manifiesto y salida final. Ese es el estándar para escalar Aulafy sin perder calidad.
      </Guardar>

      <ChapterNav prev={{ href: "/cursos/ia-generativa/video-local", label: "Vídeo local" }} />
    </Chapter>
  );
}
