import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Voz local: Whisper y Piper — IA generativa",
  description:
    "Transcribe clases con Whisper, genera narraciones con Piper y crea subtítulos o audios educativos sin enviar archivos a servicios externos.",
  keywords: ["Whisper local", "Piper TTS español", "texto a voz local", "subtítulos IA open source"],
  alternates: { canonical: "/cursos/ia-generativa/voz-local" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Voz local"
      title="Voz local: Whisper y Piper"
      icon="microphone"
      lead={<>La voz es una de las formas más útiles de IA generativa para educación: transcribir clases, crear subtítulos, narrar cápsulas y hacer materiales accesibles sin depender siempre de la nube.</>}
      courseHref="/cursos/ia-generativa"
      courseLabel="IA generativa"
    >
      <Objetivos>
        <ul>
          <li>Transcribir audio a texto y subtítulos con Whisper.</li>
          <li>Generar una narración local con Piper.</li>
          <li>Preparar archivos limpios para vídeo, web o podcast.</li>
        </ul>
      </Objetivos>

      <Cristiano term="STT y TTS">
        STT convierte voz en texto. TTS convierte texto en voz. Un flujo educativo completo suele usar ambos: primero transcribes o escribes guion; luego generas audio revisable.
      </Cristiano>

      <div className="prose">
        <h2>Transcribir con Whisper</h2>
      </div>

      <Terminal>{`python -m venv .venv
source .venv/bin/activate
pip install -U openai-whisper

whisper clase.mp3 \\
  --model medium \\
  --language Spanish \\
  --output_format srt \\
  --output_dir subtitulos/`}</Terminal>

      <Idea>
        Whisper publica código y pesos bajo MIT. Aun así, no subas audios con datos personales a repositorios ni a herramientas externas sin base legal y permiso.
      </Idea>

      <div className="prose">
        <h2>Narrar con Piper</h2>
      </div>

      <Terminal>{`pip install -U piper-tts

cat guion.txt | piper \\
  --model voces/es_ES-modelo.onnx \\
  --output_file narracion.wav`}</Terminal>

      <Cuidado>
        La licencia del motor no siempre es la licencia de cada voz. Guarda la ficha del modelo de voz y evita imitar personas reales sin consentimiento.
      </Cuidado>

      <div className="prose">
        <h2>Guion preparado para TTS</h2>
      </div>

      <Terminal>{`Título: Qué es RAG
Duración objetivo: 90 segundos
Tono: claro, docente, sin bromas internas

Texto:
RAG significa generación aumentada por recuperación.
En lugar de pedir al modelo que recuerde, primero buscamos documentos relevantes.
Después el modelo responde usando solo esas fuentes.`}</Terminal>

      <Comprueba>
        Escucha el audio con auriculares y altavoces. Corrige palabras raras escribiéndolas de forma fonética o cambiando la puntuación.
      </Comprueba>

      <Guardar>
        Voz educativa buena significa guion limpio, pausas naturales, subtítulos y permiso claro para cada voz usada.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-generativa/control-lora", label: "Control y LoRA" }}
        next={{ href: "/cursos/ia-generativa/video-local", label: "Vídeo local" }}
      />
    </Chapter>
  );
}
