import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Mapa de herramientas y licencias — IA generativa",
  description:
    "Qué usar para generar imágenes, voz y vídeo con IA open source: ComfyUI, FLUX, Diffusers, Whisper, Piper y Wan, con criterio de licencias.",
  keywords: ["IA generativa open source", "ComfyUI español", "FLUX licencia", "Whisper Piper", "Wan video IA"],
  alternates: { canonical: "/cursos/ia-generativa/mapa-licencias" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Mapa y licencias"
      title="Mapa de herramientas y licencias"
      icon="palette"
      lead={<>La IA generativa cambia rápido. Por eso no vamos a memorizar nombres: vamos a aprender a elegir herramientas por control, licencia, coste, privacidad y capacidad de repetir resultados.</>}
      courseHref="/cursos/ia-generativa"
      courseLabel="IA generativa"
    >
      <Objetivos>
        <ul>
          <li>Elegir stack para imagen, voz y vídeo sin perderte entre modelos.</li>
          <li>Distinguir modelo abierto, uso comercial y servicio en la nube.</li>
          <li>Guardar evidencia de qué modelo, licencia y parámetros usaste.</li>
        </ul>
      </Objetivos>

      <Cristiano term="modelo abierto">
        Que puedas descargar pesos o código no significa automáticamente “puedo usarlo para cualquier cosa”. Hay que mirar la licencia del modelo, la licencia del software y la licencia de cada voz, LoRA o checkpoint.
      </Cristiano>

      <div className="prose">
        <h2>Stack base de Aulafy</h2>
        <ul>
          <li><strong>ComfyUI</strong>: interfaz visual por nodos para imágenes, vídeo, audio y workflows reproducibles.</li>
          <li><strong>Diffusers</strong>: código Python para generar, comparar y automatizar imágenes con pipelines versionables.</li>
          <li><strong>FLUX</strong>: familia potente para imagen; revisa cada variante porque no todas comparten licencia.</li>
          <li><strong>Whisper</strong>: transcripción local y subtítulos.</li>
          <li><strong>Piper</strong>: texto a voz local con modelos ligeros.</li>
          <li><strong>Wan</strong>: generación de vídeo para clips cortos, normalmente con más demanda de VRAM.</li>
        </ul>
      </div>

      <Idea>
        Usa ComfyUI cuando quieras explorar visualmente y Diffusers cuando quieras repetir el mismo resultado desde código, pruebas o automatizaciones.
      </Idea>

      <div className="prose">
        <h2>Ficha que debes guardar por cada recurso</h2>
      </div>

      <Terminal>{`recurso:
  tipo: modelo | lora | voz | workflow | dataset
  nombre:
  version_o_commit:
  fuente:
  licencia:
  uso_permitido: personal | comercial | investigacion | revisar
  restricciones:
  parametros_clave:
  fecha_revision: 2026-07-02`}</Terminal>

      <Cuidado>
        FLUX.1 schnell aparece con licencia Apache-2.0, mientras que otras variantes como FLUX.1 dev usan licencia no comercial. No mezcles variantes sin revisar la ficha oficial.
      </Cuidado>

      <div className="prose">
        <h2>Decisión rápida</h2>
        <ul>
          <li><strong>Quiero una imagen ya</strong>: ComfyUI con un workflow sencillo.</li>
          <li><strong>Quiero repetir cien variaciones</strong>: Diffusers con seed, prompt y manifest.</li>
          <li><strong>Quiero voz para una lección</strong>: Whisper para transcribir y Piper para narrar.</li>
          <li><strong>Quiero vídeo</strong>: empieza con clips de 3 a 5 segundos y una sola escena.</li>
          <li><strong>Quiero venderlo</strong>: revisa licencia antes de generar, no después.</li>
        </ul>
      </div>

      <Comprueba>
        Elige un modelo de imagen, una voz y un workflow. Antes de ejecutarlos, escribe su licencia y fuente. Si no puedes completar la ficha, no lo metas en un proyecto serio.
      </Comprueba>

      <Guardar>
        La calidad empieza antes del prompt: modelo correcto, licencia clara, seed guardada y salida revisable.
      </Guardar>

      <ChapterNav next={{ href: "/cursos/ia-generativa/comfyui-flux", label: "ComfyUI + FLUX" }} />
    </Chapter>
  );
}
