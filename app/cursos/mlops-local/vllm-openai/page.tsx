import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "vLLM con API compatible OpenAI — MLOps local",
  description:
    "Despliega un modelo con vLLM usando una API compatible con OpenAI, prueba chat completions, mide latencia y decide cuándo escalar.",
  keywords: ["vLLM OpenAI compatible", "serving LLM GPU", "vLLM español", "desplegar modelo con vLLM"],
  alternates: { canonical: "/cursos/mlops-local/vllm-openai" },
};

export default function Page() {
  return (
    <Chapter
      crumb="vLLM"
      title="vLLM con API compatible OpenAI"
      icon="rocket"
      lead={<>vLLM está pensado para servir modelos de forma eficiente en GPU. Su gran ventaja práctica: expone una API compatible con OpenAI, así muchas apps pueden cambiar de backend con pocos cambios.</>}
      courseHref="/cursos/mlops-local"
      courseLabel="MLOps local"
    >
      <Objetivos>
        <ul>
          <li>Levantar un servidor vLLM para pruebas locales o de laboratorio.</li>
          <li>Conectar una app usando el cliente OpenAI apuntando a tu endpoint.</li>
          <li>Medir latencia, tokens por segundo y errores básicos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="API compatible OpenAI">
        Tu servidor acepta rutas y formato parecidos a OpenAI. La app no necesita saber si detrás hay OpenAI, vLLM, llama.cpp o un gateway.
      </Cristiano>

      <div className="prose">
        <h2>Servidor mínimo</h2>
      </div>

      <Terminal>{`python -m venv .venv
source .venv/bin/activate
pip install -U vllm

vllm serve Qwen/Qwen3-8B \\
  --host 127.0.0.1 \\
  --port 8000`}</Terminal>

      <Idea>
        La documentación oficial de vLLM indica que puede servir modelos con protocolo compatible OpenAI y que por defecto suele escuchar en localhost:8000.
      </Idea>

      <div className="prose">
        <h2>Cliente OpenAI contra vLLM</h2>
      </div>

      <Terminal>{`import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "local",
  baseURL: "http://127.0.0.1:8000/v1",
});

const response = await client.chat.completions.create({
  model: "Qwen/Qwen3-8B",
  messages: [{ role: "user", content: "Dame una checklist de despliegue LLM." }],
});

console.log(response.choices[0].message.content);`}</Terminal>

      <Cuidado>
        vLLM no convierte automáticamente una demo en producción. Aún necesitas autenticación, límites, logs, colas, monitorización y gestión de fallos.
      </Cuidado>

      <Comprueba>
        Haz 20 peticiones seguidas y mide latencia media, p95 y errores. Si no tienes esos números, no sabes si tu servicio aguanta.
      </Comprueba>

      <Guardar>
        vLLM es el motor; tu producto necesita también gateway, observabilidad, evals y límites.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/mlops-local/llama-server", label: "llama.cpp server" }}
        next={{ href: "/cursos/mlops-local/litellm-gateway", label: "LiteLLM gateway" }}
      />
    </Chapter>
  );
}
