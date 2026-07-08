import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Windows/WSL2 vs Mac M4 para IA local",
  description:
    "Comparativa práctica entre Windows con WSL2/NVIDIA y Mac Apple Silicon para IA local: Ollama, MLX, Docker, GPU, contexto y errores comunes.",
  keywords: ["mejor setup ia local mac m4 pro ollama mlx", "docker gpu passthrough wsl2 ollama problemas", "Mac M4 vs RTX 4090 IA local"],
  alternates: { canonical: "/cursos/ia-local/windows-wsl2-vs-mac-m4" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Windows vs Mac"
      title="Windows/WSL2 vs Mac M4 para IA local"
      icon="desktop"
      lead={<>La decisión no es “Mac o PC” en abstracto. Es qué trabajo quieres hacer: coding local cómodo, herramientas Windows enterprise, Docker con GPU, modelos grandes, contexto largo o cero mantenimiento.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Elegir setup según trabajo real, no benchmark suelto.</li>
          <li>Entender por qué Windows/WSL2 falla más en GPU y Docker.</li>
          <li>Ver dónde Mac Apple Silicon brilla y dónde se queda corto.</li>
        </ul>
      </Objetivos>

      <Cristiano term="WSL2">
        Es Linux dentro de Windows. Permite usar herramientas Linux y CUDA con GPU NVIDIA, pero añade capas: drivers Windows, WSL, Docker Desktop, contenedores y permisos.
      </Cristiano>

      <div className="prose">
        <h2>Decisión rápida</h2>
        <ul>
          <li><strong>Mac M-series</strong>: simplicidad, batería, silencio, MLX, Ollama fácil, buen entorno dev.</li>
          <li><strong>Windows + NVIDIA + WSL2</strong>: más compatibilidad con herramientas empresariales y GPUs potentes, pero más puntos de fallo.</li>
          <li><strong>Linux bare metal</strong>: mejor para servidores, vLLM, Docker GPU y homelab serio.</li>
        </ul>
      </div>

      <Idea>
        En Mac suele doler menos instalar. En Windows suele doler menos encajar en flujos de empresa. En Linux suele doler menos operar modelos en serio.
      </Idea>

      <Terminal>{`# Windows: primer diagnóstico
wsl --status
wsl --list --verbose
nvidia-smi
docker run --rm --gpus all nvidia/cuda:12.5.0-base-ubuntu22.04 nvidia-smi

# Mac: primer diagnóstico
sw_vers
ollama --version
ollama ps`}</Terminal>

      <div className="prose">
        <h2>Errores típicos por plataforma</h2>
        <ul>
          <li><strong>Windows/WSL2</strong>: GPU no detectada, Docker sin acceso a GPU, drivers duplicados dentro de WSL, permisos CUDA, puertos raros.</li>
          <li><strong>Mac</strong>: contexto largo que dispara memoria, prefill lento en prompts enormes, límites de memoria unificada y menos soporte para stacks CUDA.</li>
          <li><strong>Linux</strong>: drivers, CUDA toolkit, versiones de contenedores y actualizaciones que rompen builds si no fijas versiones.</li>
        </ul>
      </div>

      <Cuidado>
        No instales drivers NVIDIA Linux dentro de WSL como si fuera una máquina Linux normal. WSL usa el driver de Windows para exponer GPU a Linux.
      </Cuidado>

      <Comprueba>
        Antes de comprar hardware, define tu prueba: modelo, contexto, tokens/segundo mínimos, herramientas necesarias y si necesitas Docker GPU. Luego compara, no al revés.
      </Comprueba>

      <Guardar>
        Para aprender y prototipar, Mac M-series es muy cómodo. Para servir modelos con NVIDIA, Linux/WSL2 requiere más cuidado pero ofrece más opciones. Para producción ligera, evita improvisar: documenta versiones.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.nvidia.com/cuda/wsl-user-guide/index.html" target="_blank" rel="noopener noreferrer">NVIDIA CUDA on WSL User Guide</a></li>
          <li><a href="https://learn.microsoft.com/en-us/windows/ai/directml/gpu-cuda-in-wsl" target="_blank" rel="noopener noreferrer">Microsoft: Enable NVIDIA CUDA on WSL 2</a></li>
          <li><a href="https://ml-explore.github.io/mlx/" target="_blank" rel="noopener noreferrer">MLX documentation</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/hardware-minimo-2026", label: "Hardware mínimo" }}
        next={{ href: "/cursos/ia-local/homelab-rtx-3090", label: "Homelab RTX 3090" }}
      />
    </Chapter>
  );
}
