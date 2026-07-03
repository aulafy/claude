import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Mapa de serving: Ollama, llama.cpp, vLLM — MLOps local",
  description:
    "Cuándo usar Ollama, llama.cpp, vLLM, LiteLLM o Ray Serve para desplegar modelos abiertos con API, costes, latencia y observabilidad.",
  keywords: ["MLOps local IA", "serving LLM open source", "Ollama vs vLLM", "llama.cpp server", "desplegar modelos IA"],
  alternates: { canonical: "/cursos/mlops-local/mapa-serving" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Mapa de serving"
      title="Mapa de serving: Ollama, llama.cpp, vLLM"
      icon="server"
      lead={<>Ejecutar un modelo en tu máquina es el primer paso. Servirlo bien significa API estable, límites, logs, métricas, colas, caché y una forma clara de cambiar de modelo sin romper la app.</>}
      courseHref="/cursos/mlops-local"
      courseLabel="MLOps local"
    >
      <Objetivos>
        <ul>
          <li>Elegir entre Ollama, llama.cpp, vLLM, LiteLLM y Ray Serve según el caso.</li>
          <li>Distinguir demo local, servicio interno y producción real.</li>
          <li>Diseñar una arquitectura mínima con gateway, observabilidad y evals.</li>
        </ul>
      </Objetivos>

      <Cristiano term="serving">
        Es poner el modelo detrás de una API para que otras aplicaciones lo usen de forma estable, medible y controlada.
      </Cristiano>

      <div className="prose">
        <h2>Regla rápida</h2>
        <ul>
          <li><strong>Ollama</strong>: prototipos locales, enseñanza, apps personales y equipos pequeños.</li>
          <li><strong>llama.cpp server</strong>: GGUF ligero, CPU/GPU modesta, control fino y servidor local simple.</li>
          <li><strong>vLLM</strong>: GPUs, alto rendimiento, batching, API compatible OpenAI y modelos grandes.</li>
          <li><strong>LiteLLM</strong>: gateway para unificar proveedores, claves, presupuestos, caché y fallbacks.</li>
          <li><strong>Ray Serve</strong>: escalar varias réplicas, multi-modelo, autoscaling y patrones de producción.</li>
        </ul>
      </div>

      <Idea>
        La API compatible con OpenAI se ha convertido en un puente práctico: puedes cambiar backend sin reescribir toda la aplicación.
      </Idea>

      <div className="prose">
        <h2>Arquitectura mínima</h2>
      </div>

      <Terminal>{`app web
  -> API propia /api/chat
  -> gateway LiteLLM
  -> backend local: llama.cpp | vLLM | Ollama
  -> observabilidad: Langfuse / OpenTelemetry
  -> evals: promptfoo o tests propios
  -> logs: request_id, modelo, latencia, coste, resultado`}</Terminal>

      <Cuidado>
        No expongas directamente el servidor del modelo a internet. Pon una API delante con autenticación, límites, logs y validación.
      </Cuidado>

      <Comprueba>
        Decide para tu caso: si tienes una GPU potente y varios usuarios, mira vLLM; si quieres portátil o mini PC, empieza por llama.cpp/Ollama; si hay varios proveedores, pon LiteLLM delante.
      </Comprueba>

      <Guardar>
        MLOps para IA no empieza con Kubernetes. Empieza con una API medible, límites claros y capacidad de cambiar modelo sin romper el producto.
      </Guardar>

      <ChapterNav next={{ href: "/cursos/mlops-local/llama-server", label: "llama.cpp server" }} />
    </Chapter>
  );
}
