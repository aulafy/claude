import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Homelab IA con RTX 3090 usadas",
  description:
    "Cómo pensar un homelab de IA local con RTX 3090 usadas: VRAM, consumo, caja, fuente, multi-GPU, llama.cpp, riesgos y ROI frente a suscripciones.",
  keywords: ["comprar rtx 3090 usada homelab ia local", "llama.cpp multi gpu tensor splitting sin nvlink", "4x RTX 3090 IA local", "homelab LLM"],
  alternates: { canonical: "/cursos/ia-local/homelab-rtx-3090" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Homelab RTX 3090"
      title="Homelab IA con RTX 3090 usadas"
      icon="server"
      lead={<>La RTX 3090 sigue apareciendo como opción popular por sus 24 GB de VRAM y precio usado, pero un homelab no es solo comprar GPUs: necesitas fuente, caja, calor, ruido, drivers, seguridad eléctrica y expectativas realistas.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Calcular si una RTX 3090 usada tiene sentido para tu caso.</li>
          <li>Entender límites de single GPU y multi-GPU sin NVLink.</li>
          <li>Diseñar un homelab que puedas mantener sin sufrir.</li>
        </ul>
      </Objetivos>

      <Cristiano term="VRAM">
        Es la memoria de la GPU. Para LLMs locales importa muchísimo: pesos del modelo, KV cache, contexto y batches compiten por ella.
      </Cristiano>

      <div className="prose">
        <h2>Cuándo sí tiene sentido</h2>
        <ul>
          <li>Quieres aprender serving local, llama.cpp, Docker GPU y observabilidad.</li>
          <li>Vas a ejecutar modelos medianos con frecuencia.</li>
          <li>Necesitas privacidad o coste predecible.</li>
          <li>Te compensa el mantenimiento frente a pagar APIs o suscripciones.</li>
        </ul>

        <h2>Cuándo no</h2>
        <ul>
          <li>Quieres cero mantenimiento.</li>
          <li>No puedes tolerar ruido, calor o consumo.</li>
          <li>Solo necesitas IA unas horas al mes.</li>
          <li>No quieres depurar drivers, fuentes o contenedores.</li>
        </ul>
      </div>

      <Idea>
        Una 3090 no “suma contexto infinito”. Multi-GPU puede ayudar a cargar modelos más grandes, pero no todos los runtimes escalan igual ni todos los modelos se reparten bien.
      </Idea>

      <Terminal>{`# llama.cpp multi-GPU: ejemplo conceptual
./llama-server \\
  -m ./models/modelo.gguf \\
  --n-gpu-layers 99 \\
  --split-mode layer \\
  --tensor-split 1,1 \\
  --ctx-size 8192 \\
  --port 8080`}</Terminal>

      <div className="prose">
        <h2>Checklist de compra</h2>
        <ul>
          <li>Fotos reales, historial de minería si existe y política de devolución.</li>
          <li>Fuente con margen suficiente y conectores adecuados.</li>
          <li>Caja con espacio físico y flujo de aire.</li>
          <li>Medición de consumo en pared.</li>
          <li>Plan de backups y acceso remoto seguro.</li>
        </ul>
      </div>

      <Cuidado>
        Cuatro GPUs usadas no son cuatro veces menos problemas. Son más calor, más cables, más puntos de fallo y más riesgo eléctrico. Empieza con una si estás aprendiendo.
      </Cuidado>

      <Comprueba>
        Antes de montar multi-GPU, ejecuta un benchmark repetible con una sola GPU: modelo, quant, contexto, tokens/segundo, consumo y temperatura.
      </Comprueba>

      <Guardar>
        El mejor homelab no es el más grande: es el que puedes encender, medir, actualizar y apagar sin miedo.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://github.com/ggml-org/llama.cpp/blob/master/docs/multi-gpu.md" target="_blank" rel="noopener noreferrer">llama.cpp: Using multiple GPUs</a></li>
          <li><a href="https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md" target="_blank" rel="noopener noreferrer">llama.cpp: quantize README</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/windows-wsl2-vs-mac-m4", label: "Windows/WSL2 vs Mac M4" }}
        next={{ href: "/cursos/ia-local/cuantizacion-modelos-coding", label: "Cuantización y modelos" }}
      />
    </Chapter>
  );
}
