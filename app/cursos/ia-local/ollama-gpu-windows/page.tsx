import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Ollama no usa la GPU en Windows: CUDA, AMD, WSL2 y fixes — Claude Code + IA Local",
  description:
    "Guía de diagnóstico para cuando Ollama usa CPU en Windows: comprobar GPU, drivers NVIDIA, AMD Radeon, WSL2, Docker, VRAM, Defender, logs y variables persistentes.",
  keywords: [
    "Ollama no usa GPU Windows",
    "Ollama NVIDIA Windows",
    "Ollama AMD Windows",
    "Ollama CUDA Windows",
    "Ollama WSL2 GPU",
    "Ollama CPU lento",
  ],
  alternates: { canonical: "/cursos/ia-local/ollama-gpu-windows" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Ollama GPU Windows"
      title="Ollama no usa la GPU en Windows"
      icon="desktop"
      lead={<>Si Ollama responde lento y el procesador se pone al 100%, probablemente el modelo está corriendo en CPU. Esta guía te da un diagnóstico ordenado para NVIDIA, AMD, WSL2 y Docker sin tocar cosas al azar.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Comprobar si Ollama está usando GPU o CPU.</li>
          <li>Revisar drivers, compatibilidad y VRAM en Windows.</li>
          <li>Decidir cuándo usar Windows nativo, WSL2, LM Studio o un modelo menor.</li>
        </ul>
      </Objetivos>

      <Cristiano term="offload a GPU">
        Significa que parte del modelo se carga en la memoria de la tarjeta gráfica. Si no cabe en VRAM, Ollama usa RAM/CPU y todo va mucho más lento.
      </Cristiano>

      <div className="prose">
        <h2>Diagnóstico rápido</h2>
        <p>Abre PowerShell y prueba esto mientras generas una respuesta larga en Ollama:</p>
      </div>

      <Terminal>{`ollama ps
ollama run qwen3:4b "Escribe una explicación larga sobre IA local"

# En otra terminal, si tienes NVIDIA:
nvidia-smi -l 1`}</Terminal>

      <Comprueba>
        Si <code>nvidia-smi</code> muestra memoria y uso de GPU subiendo mientras Ollama responde, la GPU está trabajando. Si no cambia nada y la CPU se dispara, sigue el checklist.
      </Comprueba>

      <div className="prose">
        <h2>Lee los logs antes de tocar nada</h2>
        <p>Los logs suelen decir si Ollama encontró una GPU, si cayó a CPU o si un driver falló durante la detección.</p>
      </div>

      <Terminal>{`# PowerShell
Get-ChildItem "$env:LOCALAPPDATA\\Ollama" -Recurse -Filter "*.log"

# Abre el log más reciente:
notepad "$env:LOCALAPPDATA\\Ollama\\server.log"`}</Terminal>

      <div className="prose">
        <p>Busca palabras como <code>cuda</code>, <code>rocm</code>, <code>vulkan</code>, <code>gpu</code>, <code>fallback</code>, <code>memory</code> o <code>no compatible GPUs</code>. Si no aparece nada de GPU, Windows ni siquiera se la está presentando bien a Ollama.</p>
      </div>

      <div className="prose">
        <h2>Checklist NVIDIA</h2>
        <ol>
          <li>Actualiza el driver NVIDIA. Ollama documenta soporte para GPUs NVIDIA con compute capability compatible y drivers recientes.</li>
          <li>Reinicia Windows después de instalar el driver.</li>
          <li>Comprueba que <code>nvidia-smi</code> funciona en PowerShell.</li>
          <li>Si tienes portátil híbrido, fuerza la GPU dedicada para Ollama desde Configuración de gráficos de Windows o Panel de NVIDIA.</li>
          <li>Prueba un modelo pequeño para descartar falta de VRAM.</li>
        </ol>
      </div>

      <Terminal>{`nvidia-smi
ollama pull qwen3:4b
ollama run qwen3:4b "Responde con 20 frases para probar rendimiento"`}</Terminal>

      <Idea>
        Empieza con un modelo pequeño. Si un 4B usa GPU y un 14B no cabe, el problema no es Ollama: es VRAM.
      </Idea>

      <div className="prose">
        <h2>Portátiles híbridos NVIDIA + Intel</h2>
        <p>Este es el caso más traicionero: Windows puede arrancar Ollama con la iGPU Intel aunque tengas una NVIDIA dedicada.</p>
        <ol>
          <li>Abre <strong>Configuración</strong> → <strong>Sistema</strong> → <strong>Pantalla</strong> → <strong>Gráficos</strong>.</li>
          <li>Añade la app de Ollama si no aparece.</li>
          <li>Marca <strong>Alto rendimiento</strong> para usar la GPU dedicada.</li>
          <li>En el Panel de control de NVIDIA, usa <strong>Procesador NVIDIA de alto rendimiento</strong> para Ollama si tu equipo lo permite.</li>
          <li>Cierra Ollama desde la bandeja del sistema y vuelve a abrirlo.</li>
        </ol>
      </div>

      <Terminal>{`# Comprueba antes y después:
nvidia-smi -l 1
ollama run qwen3:4b "Haz una prueba larga de rendimiento"`}</Terminal>

      <Cuidado>
        Algunos portátiles solo activan la GPU dedicada con el cargador conectado o en modo alto rendimiento. Si pruebas con batería, puedes diagnosticar mal.
      </Cuidado>

      <div className="prose">
        <h2>Checklist AMD Radeon</h2>
        <p>Ollama para Windows incluye soporte AMD Radeon, pero la compatibilidad práctica depende mucho de GPU, driver y backend disponible.</p>
        <ul>
          <li>Actualiza AMD Adrenalin y reinicia.</li>
          <li>Prueba primero Ollama nativo en Windows, no Docker.</li>
          <li>Si tu iGPU o APU no acelera bien, prueba LM Studio con Vulkan para ese equipo.</li>
          <li>En Linux, revisa la versión de ROCm y drivers; si son antiguos, Ollama puede caer a CPU.</li>
        </ul>
      </div>

      <Cuidado>
        AMD en Windows puede ser más irregular que NVIDIA para LLMs locales. Si tu objetivo es aprender o trabajar ya, no te cases con una herramienta: compara Ollama, LM Studio y llama.cpp en tu máquina.
      </Cuidado>

      <div className="prose">
        <h2>Vulkan como plan B para AMD, iGPU y equipos raros</h2>
        <p>Si tu GPU no entra por CUDA o ROCm, Vulkan puede ser una vía útil en algunos equipos. No lo trates como garantía universal: pruébalo y mide.</p>
      </div>

      <Terminal>{`# PowerShell: variables persistentes para tu usuario
setx OLLAMA_VULKAN 1
setx OLLAMA_IGPU_ENABLE 1

# Cierra Ollama completamente, abre una terminal nueva y prueba:
ollama run qwen3:4b "Prueba de Vulkan en Ollama"`}</Terminal>

      <Cuidado>
        <code>setx</code> no afecta a la terminal ya abierta. Cierra y abre PowerShell, y reinicia Ollama desde la bandeja del sistema.
      </Cuidado>

      <div className="prose">
        <h2>Windows Defender puede ralentizar modelos</h2>
        <p>Los modelos son archivos enormes. En algunas máquinas, Defender puede escanear cada descarga o lectura y dar la sensación de que Ollama está roto.</p>
      </div>

      <Terminal>{`# Ruta habitual de modelos:
%USERPROFILE%\\.ollama

# PowerShell:
explorer "$env:USERPROFILE\\.ollama"`}</Terminal>

      <div className="prose">
        <p>Añade esa carpeta a exclusiones de Windows Security solo si entiendes el riesgo y descargas modelos de fuentes confiables. No excluyas carpetas genéricas como Descargas o todo tu usuario.</p>
      </div>

      <div className="prose">
        <h2>WSL2 o Windows nativo</h2>
        <p>Para la mayoría, Windows nativo es más simple. WSL2 tiene sentido si ya trabajas en Linux, Docker o desarrollo backend.</p>
      </div>

      <Terminal>{`wsl --status
wsl --shutdown

# Dentro de Ubuntu/WSL, si tienes NVIDIA:
nvidia-smi`}</Terminal>

      <div className="prose">
        <h2>Docker en Windows</h2>
        <p>Si corres Ollama en Docker, necesitas pasar la GPU al contenedor. Antes de culpar a Ollama, comprueba que Docker ve la GPU.</p>
      </div>

      <Terminal>{`docker run --rm --gpus all nvidia/cuda:12.6.0-base-ubuntu22.04 nvidia-smi`}</Terminal>

      <Cuidado>
        No mezcles tres entornos a la vez. Prueba primero Windows nativo. Luego WSL2. Luego Docker. Si cambias todo al mismo tiempo, no sabrás qué arregló o rompió el rendimiento.
      </Cuidado>

      <div className="prose">
        <h2>Si sigue usando CPU</h2>
        <ul>
          <li>Reinicia Ollama desde el icono de la bandeja o reinicia Windows.</li>
          <li>Actualiza Ollama a la última versión.</li>
          <li>Prueba un modelo menor o una cuantización más ligera.</li>
          <li>Comprueba VRAM libre antes de lanzar el modelo.</li>
          <li>En portátil híbrido, conecta el cargador y activa modo alto rendimiento.</li>
          <li>Compara con LM Studio si tienes iGPU o AMD y necesitas offload Vulkan fácil.</li>
        </ul>
      </div>

      <Guardar>
        Guarda siempre cuatro datos cuando pidas ayuda: GPU exacta, driver, modelo usado y salida de <code>ollama ps</code> mientras responde. Sin eso, cualquier diagnóstico es adivinar.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/troubleshooting-ollama", label: "Soluciona errores de Ollama" }}
        next={{ href: "/cursos/ia-local/depurar", label: "Depurar y proteger" }}
      />
    </Chapter>
  );
}
