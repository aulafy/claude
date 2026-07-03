import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "LiteLLM como gateway y control de costes — MLOps local",
  description:
    "Usa LiteLLM como gateway para unificar modelos, claves, presupuestos, rate limits, fallbacks, caché y tracking de coste en apps de IA.",
  keywords: ["LiteLLM gateway", "control costes LLM", "LLM proxy open source", "rate limits IA"],
  alternates: { canonical: "/cursos/mlops-local/litellm-gateway" },
};

export default function Page() {
  return (
    <Chapter
      crumb="LiteLLM"
      title="LiteLLM como gateway y control de costes"
      icon="route"
      lead={<>Cuando una app puede llamar a varios modelos, necesitas una puerta común: claves, límites, presupuestos, fallbacks, caché y trazas. Ese es el papel de un gateway LLM.</>}
      courseHref="/cursos/mlops-local"
      courseLabel="MLOps local"
    >
      <Objetivos>
        <ul>
          <li>Entender LiteLLM como proxy entre tu app y varios modelos.</li>
          <li>Diseñar claves por usuario, equipo o entorno.</li>
          <li>Controlar coste, fallbacks y caché antes de que haya sustos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="gateway LLM">
        Es una capa intermedia. Tu app habla con el gateway y el gateway decide a qué modelo llamar, con qué clave, presupuesto, límites y trazas.
      </Cristiano>

      <div className="prose">
        <h2>Configuración conceptual</h2>
      </div>

      <Terminal>{`model_list:
  - model_name: local-qwen
    litellm_params:
      model: openai/Qwen/Qwen3-8B
      api_base: http://127.0.0.1:8000/v1
      api_key: local

  - model_name: backup-cloud
    litellm_params:
      model: openai/gpt-4.1-mini
      api_key: os.environ/OPENAI_API_KEY`}</Terminal>

      <Idea>
        LiteLLM documenta proxy self-hosted con claves virtuales, presupuestos, rate limits, spend tracking, caché y fallbacks. Eso lo convierte en una pieza útil incluso cuando el modelo principal es local.
      </Idea>

      <div className="prose">
        <h2>Qué medir por clave</h2>
        <ul>
          <li>Tokens de entrada y salida.</li>
          <li>Coste estimado o coste real.</li>
          <li>Modelo usado y fallback aplicado.</li>
          <li>Latencia y errores.</li>
          <li>Usuario, equipo o tenant.</li>
        </ul>
      </div>

      <Cuidado>
        Un gateway mal configurado puede abrir más puertas de las que cierra. Empieza con pocos modelos, pocas claves y logs claros.
      </Cuidado>

      <Comprueba>
        Crea una clave de desarrollo y otra de producción. La de desarrollo debe tener presupuesto bajo y acceso limitado.
      </Comprueba>

      <Guardar>
        El gateway es la caja de fusibles: cuando algo consume demasiado, falla o se desvía, quieres enterarte ahí.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/mlops-local/vllm-openai", label: "vLLM OpenAI-compatible" }}
        next={{ href: "/cursos/mlops-local/observabilidad", label: "Observabilidad" }}
      />
    </Chapter>
  );
}
