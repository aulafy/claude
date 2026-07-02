import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "ComfyUI + FLUX desde cero — IA generativa",
  description:
    "Instala ComfyUI y crea un primer workflow reproducible con FLUX para generar imágenes educativas con seed, modelo y parámetros controlados.",
  keywords: ["ComfyUI FLUX", "tutorial ComfyUI español", "generar imágenes IA local", "workflow ComfyUI"],
  alternates: { canonical: "/cursos/ia-generativa/comfyui-flux" },
};

export default function Page() {
  return (
    <Chapter
      crumb="ComfyUI + FLUX"
      title="ComfyUI + FLUX desde cero"
      icon="magic"
      lead={<>ComfyUI parece raro al principio porque no oculta el proceso. Esa es precisamente su fuerza: cada nodo deja claro qué modelo, prompt, tamaño, seed y salida produce tu imagen.</>}
      courseHref="/cursos/ia-generativa"
      courseLabel="IA generativa"
    >
      <Objetivos>
        <ul>
          <li>Instalar ComfyUI en un entorno separado.</li>
          <li>Crear una primera imagen con un workflow sencillo.</li>
          <li>Guardar el workflow para poder repetir y depurar resultados.</li>
        </ul>
      </Objetivos>

      <Cristiano term="workflow">
        Es la receta visual del resultado: qué modelo entra, qué prompt usa, cómo se muestrea la imagen y dónde se guarda la salida.
      </Cristiano>

      <div className="prose">
        <h2>Instalación base</h2>
      </div>

      <Terminal>{`git clone https://github.com/comfy-org/ComfyUI.git
cd ComfyUI
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python main.py`}</Terminal>

      <Idea>
        En Windows cambia la activación por <code>.venv\Scripts\activate</code>. Si tienes GPU NVIDIA, instala PyTorch siguiendo la variante CUDA recomendada para tu equipo.
      </Idea>

      <div className="prose">
        <h2>Primer encargo visual</h2>
      </div>

      <Terminal>{`Objetivo:
Crear una portada 16:9 para una lección sobre RAG seguro.

Prompt:
clean editorial illustration, teacher desk, private documents, vector database,
warm practical classroom, precise labels, no brand logos, no readable private data

Parámetros a guardar:
- modelo
- resolución
- seed
- pasos
- sampler
- nombre del workflow
- fecha`}</Terminal>

      <Cuidado>
        No subas checkpoints, voces o modelos grandes al repositorio de tu web. Versiona el workflow y el manifest; descarga los pesos desde su fuente oficial.
      </Cuidado>

      <div className="prose">
        <h2>Carpeta limpia</h2>
      </div>

      <Terminal>{`proyecto-generativo/
  workflows/
    portada-rag-v1.json
  prompts/
    portada-rag.md
  outputs/
    portada-rag-seed-1042.png
  manifests/
    portada-rag-v1.json`}</Terminal>

      <Comprueba>
        Reinicia ComfyUI, carga el workflow guardado y genera otra vez con la misma seed. Si el resultado no es trazable, te falta guardar algún parámetro.
      </Comprueba>

      <Guardar>
        ComfyUI no es solo una interfaz: es tu cuaderno de laboratorio visual. Guarda workflows como si fueran código.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-generativa/mapa-licencias", label: "Mapa y licencias" }}
        next={{ href: "/cursos/ia-generativa/diffusers-python", label: "Diffusers con Python" }}
      />
    </Chapter>
  );
}
