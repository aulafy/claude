import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Cuantización GGUF: Q4, Q5 y Q8 para Ollama — Claude Code + IA Local",
  description:
    "Aprende a elegir cuantización GGUF Q4, Q5 o Q8 para Ollama y llama.cpp según VRAM, velocidad, calidad y caso de uso: chat, RAG o coding.",
  keywords: [
    "cuantización GGUF",
    "Q4 vs Q5 vs Q8",
    "Ollama GGUF",
    "llama.cpp quantize",
    "Q4_K_M Q5_K_M Q8_0",
    "modelos locales VRAM",
  ],
  alternates: { canonical: "/cursos/ia-local/cuantizacion-gguf" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Cuantización GGUF"
      title="Cuantización GGUF: Q4, Q5 y Q8"
      icon="cube"
      lead={<>La cuantización es lo que permite meter modelos grandes en equipos normales. La clave no es elegir “el modelo más grande”, sino el mejor equilibrio entre calidad, memoria y velocidad para tu tarea.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Entender qué significan Q4, Q5, Q8 y los sufijos <code>_K_M</code>.</li>
          <li>Elegir quant según VRAM, RAM y uso: chat, RAG o programación.</li>
          <li>Importar un GGUF en Ollama con un <code>Modelfile</code>.</li>
        </ul>
      </Objetivos>

      <Cristiano term="cuantización">
        Es comprimir los pesos del modelo usando menos precisión. Ocupa menos, cabe en más máquinas y suele ir más rápido, pero puede perder algo de calidad.
      </Cristiano>

      <div className="prose">
        <h2>Regla práctica</h2>
        <ul>
          <li><strong>Q4_K_M</strong>: primera opción si vas justo de VRAM o quieres velocidad.</li>
          <li><strong>Q5_K_M</strong>: punto dulce cuando puedes gastar algo más de memoria por mejor calidad.</li>
          <li><strong>Q8_0</strong>: cerca de calidad alta, pero mucho más pesado; úsalo si el modelo cabe cómodo.</li>
        </ul>
      </div>

      <Idea>
        Para aprender y prototipar, Q4_K_M suele ser suficiente. Para RAG serio o coding, prueba Q5_K_M si cabe. Q8 solo compensa cuando tienes margen de VRAM/RAM.
      </Idea>

      <div className="prose">
        <h2>Tabla mental de elección</h2>
      </div>

      <Terminal>{`8 GB VRAM:
  7B/8B en Q4_K_M
  14B solo si aceptas ir justo o bajar contexto

12 GB VRAM:
  7B/8B en Q5_K_M o Q8_0
  14B en Q4_K_M

16 GB VRAM:
  14B en Q5_K_M
  30B pequeño en Q4 si el contexto no es enorme

24 GB+ VRAM:
  14B en Q8_0
  30B/32B en Q4_K_M o Q5_K_M`}</Terminal>

      <Cuidado>
        No mires solo el tamaño del archivo. El contexto también consume memoria. Un modelo que “cabe” con una pregunta corta puede caerse a CPU cuando subes <code>num_ctx</code> o metes documentos largos.
      </Cuidado>

      <div className="prose">
        <h2>Importar un GGUF en Ollama</h2>
        <p>Ollama permite importar modelos GGUF con un <code>Modelfile</code>. Crea una carpeta, guarda el GGUF y escribe:</p>
      </div>

      <Terminal>{`FROM ./mi-modelo.Q5_K_M.gguf

PARAMETER temperature 0.2
PARAMETER num_ctx 8192

SYSTEM """
Eres un asistente técnico preciso. Si no sabes algo, dilo.
"""`}</Terminal>

      <div className="prose">
        <p>Después crea el modelo:</p>
      </div>

      <Terminal>{`ollama create mi-modelo-q5 -f Modelfile
ollama run mi-modelo-q5`}</Terminal>

      <Comprueba>
        Ejecuta la misma pregunta en Q4 y Q5. Si Q5 mejora claramente respuestas de código o citas de RAG y tu máquina lo mueve bien, quédate con Q5. Si apenas notas diferencia, Q4 te dará más velocidad.
      </Comprueba>

      <div className="prose">
        <h2>Cuantizar tú mismo con llama.cpp</h2>
        <p>Cuando partes de un modelo ya convertido a GGUF en alta precisión, llama.cpp permite crear una versión cuantizada.</p>
      </div>

      <Terminal>{`# Ejemplo genérico; el binario puede llamarse llama-quantize o quantize según tu build
./llama-quantize modelo-f16.gguf modelo-Q4_K_M.gguf Q4_K_M
./llama-quantize modelo-f16.gguf modelo-Q5_K_M.gguf Q5_K_M
./llama-quantize modelo-f16.gguf modelo-Q8_0.gguf Q8_0`}</Terminal>

      <Cuidado>
        Si no necesitas convertir modelos propios, descarga un GGUF ya cuantizado de una fuente confiable. Cuantizar tú mismo tiene sentido si has ajustado un modelo, necesitas una quant concreta o quieres controlar toda la cadena.
      </Cuidado>

      <Guardar>
        Recomendación honesta: usa Q4_K_M para empezar, Q5_K_M para trabajo serio si cabe, Q8_0 solo cuando tengas memoria de sobra. Modelo correcto en Q5 suele ganar a modelo enorme en una quant demasiado agresiva.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/ollama-desde-cero", label: "Ollama desde cero" }}
        next={{ href: "/cursos/ia-local/conectar-ollama", label: "Conecta Claude Code con tu IA local" }}
      />
    </Chapter>
  );
}
