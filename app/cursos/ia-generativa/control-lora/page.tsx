import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Control, referencias y LoRA — IA generativa",
  description:
    "Cómo controlar estilo, composición y consistencia en imágenes generadas con IA usando seeds, referencias, inpainting y adaptadores LoRA.",
  keywords: ["LoRA IA generativa", "ControlNet ComfyUI", "inpainting IA", "referencias visuales IA"],
  alternates: { canonical: "/cursos/ia-generativa/control-lora" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Control visual"
      title="Control, referencias y LoRA"
      icon="image"
      lead={<>Un buen curso no necesita imágenes espectaculares: necesita imágenes consistentes, legibles y fieles al concepto. El control importa más que el golpe visual.</>}
      courseHref="/cursos/ia-generativa"
      courseLabel="IA generativa"
    >
      <Objetivos>
        <ul>
          <li>Separar estilo, composición y contenido.</li>
          <li>Usar referencias sin copiar marcas, personas o material ajeno.</li>
          <li>Documentar adaptadores LoRA y cambios de edición.</li>
        </ul>
      </Objetivos>

      <Cristiano term="LoRA">
        Es un adaptador pequeño que modifica el comportamiento de un modelo grande: estilo, personaje, producto, dominio o técnica. No sustituye al modelo base; lo inclina.
      </Cristiano>

      <div className="prose">
        <h2>Briefing visual antes de generar</h2>
      </div>

      <Terminal>{`{
  "objetivo": "explicar búsqueda híbrida en RAG",
  "formato": "16:9 para portada de lección",
  "estilo": "editorial claro, técnico, sin estética futurista exagerada",
  "elementos_obligatorios": ["documentos", "índice vectorial", "filtro de permisos"],
  "elementos_prohibidos": ["logos reales", "caras reconocibles", "texto privado"],
  "paleta": ["azul petróleo", "naranja suave", "gris claro"],
  "lectura": "de izquierda a derecha"
}`}</Terminal>

      <Idea>
        Pide primero composición y lectura. Después ajusta estilo. Si empiezas por “bonito”, acabarás peleando con imágenes que no enseñan nada.
      </Idea>

      <div className="prose">
        <h2>Herramientas de control</h2>
        <ul>
          <li><strong>Seed fija</strong>: compara cambios sin mover todo a la vez.</li>
          <li><strong>Referencia de composición</strong>: mantiene encuadre y distribución.</li>
          <li><strong>Inpainting</strong>: corrige zonas concretas sin rehacer la imagen completa.</li>
          <li><strong>LoRA</strong>: mantiene un estilo o dominio visual recurrente.</li>
          <li><strong>Upscale</strong>: mejora salida final después de aprobar contenido.</li>
        </ul>
      </div>

      <Cuidado>
        No uses una foto de una persona real como “referencia de estilo” sin permiso. Para cursos, evita caras reconocibles y marcas salvo que tengas derechos claros.
      </Cuidado>

      <div className="prose">
        <h2>Registro de edición</h2>
      </div>

      <Terminal>{`imagen: rag-hibrido-portada.png
modelo_base: FLUX.1-schnell
lora:
  nombre: estilo-editorial-aulafy
  peso: 0.55
referencias:
  composicion: boceto-propio-001.png
ediciones:
  - zona: "texto ilegible"
    tecnica: "inpainting"
  - zona: "icono de documento"
    tecnica: "regeneracion parcial"
aprobado_para: "curso gratuito"`}</Terminal>

      <Comprueba>
        Mira la imagen a tamaño móvil. Si el concepto no se entiende en tres segundos, no es una buena portada educativa aunque sea bonita.
      </Comprueba>

      <Guardar>
        Controlar IA generativa es cambiar una variable cada vez. Prompt, seed, referencia, LoRA y edición deben quedar separados.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-generativa/diffusers-python", label: "Diffusers con Python" }}
        next={{ href: "/cursos/ia-generativa/voz-local", label: "Voz local" }}
      />
    </Chapter>
  );
}
