import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Hardware mínimo para IA local en 2026 — Claude Code + IA Local",
  description:
    "Qué ordenador necesitas para IA local en 2026: RAM, VRAM, CPU, NVIDIA, AMD, Apple Silicon, modelos 7B/14B/32B, RAG y agentes.",
  keywords: [
    "hardware mínimo IA local 2026",
    "hardware Ollama 2026",
    "VRAM modelos locales",
    "RTX 4060 Ollama",
    "Apple Silicon IA local",
    "AMD IA local",
  ],
  alternates: { canonical: "/cursos/ia-local/hardware-minimo-2026" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Hardware IA local"
      title="Hardware mínimo para IA local en 2026"
      icon="desktop"
      lead={<>La pregunta no es “qué ordenador corre IA”, sino qué experiencia quieres: chat ligero, RAG con documentos, coding local o agentes. Cada nivel pide una combinación distinta de RAM, VRAM y paciencia.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Elegir equipo según caso de uso real, no según marketing.</li>
          <li>Entender la diferencia entre RAM, VRAM y contexto.</li>
          <li>Evitar compras equivocadas para Ollama, RAG y coding local.</li>
        </ul>
      </Objetivos>

      <Cristiano term="VRAM">
        Es la memoria de la tarjeta gráfica. Si el modelo y su contexto caben en VRAM, suele ir mucho más rápido. Si no caben, el sistema cae a RAM/CPU y la experiencia empeora.
      </Cristiano>

      <div className="prose">
        <h2>Tabla rápida por objetivo</h2>
      </div>

      <Terminal>{`Aprender y probar:
  RAM: 16 GB
  VRAM: 6-8 GB o Apple Silicon con memoria unificada
  Modelos: 3B-8B Q4

RAG privado con documentos:
  RAM: 32 GB recomendado
  VRAM: 8-12 GB
  Modelos: 7B/8B Q4-Q5 + embeddings locales

Coding local razonable:
  RAM: 32 GB
  VRAM: 12-16 GB
  Modelos: Qwen/DeepSeek coder 7B-14B Q4-Q5

Agentes y tareas largas:
  RAM: 64 GB o más
  VRAM: 16-24 GB o más
  Modelos: 14B-32B, contexto controlado y logs`}</Terminal>

      <Idea>
        El mejor equipo para empezar no es el más caro: es el que te permite iterar rápido. Un 8B bien elegido y rápido enseña más que un 32B lento que no usas.
      </Idea>

      <div className="prose">
        <h2>NVIDIA, AMD y Apple Silicon</h2>
        <ul>
          <li><strong>NVIDIA</strong>: suele ser el camino más directo para aceleración GPU en Windows/Linux por ecosistema CUDA.</li>
          <li><strong>AMD</strong>: puede funcionar muy bien, pero depende más de drivers, ROCm/Vulkan, sistema operativo y herramienta.</li>
          <li><strong>Apple Silicon</strong>: la memoria unificada ayuda mucho; mira RAM total y ancho de banda, no solo nombre del chip.</li>
          <li><strong>CPU pura</strong>: sirve para aprender y modelos pequeños, pero no esperes agentes rápidos.</li>
        </ul>
      </div>

      <Cuidado>
        No compres hardware pensando solo en el tamaño del modelo. El contexto, embeddings, base vectorial, navegador, editor, Docker y el sistema operativo también consumen memoria.
      </Cuidado>

      <div className="prose">
        <h2>Comprobación de tu equipo</h2>
      </div>

      <Terminal>{`# Windows / PowerShell
systeminfo | findstr /C:"Total Physical Memory"
wmic path win32_VideoController get name,adapterram
nvidia-smi

# macOS
system_profiler SPHardwareDataType
system_profiler SPDisplaysDataType

# Linux
free -h
lspci | grep -Ei "vga|3d|display"
nvidia-smi`}</Terminal>

      <Comprueba>
        Antes de comprar nada, ejecuta un 4B, un 8B y una prueba de RAG pequeña. Si la experiencia ya es buena para tu objetivo, no necesitas cambiar de equipo.
      </Comprueba>

      <Guardar>
        Compra por caso de uso: 16 GB RAM para aprender, 32 GB para trabajar cómodo con RAG/coding, 64 GB o GPU grande si quieres agentes largos y modelos mayores.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/ollama-gpu-windows", label: "Ollama no usa la GPU" }}
        next={{ href: "/cursos/ia-local/open-webui-qdrant", label: "Open WebUI + Ollama + Qdrant" }}
      />
    </Chapter>
  );
}
