import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "llama.cpp server en local — MLOps local",
  description:
    "Sirve un modelo GGUF con llama.cpp server, API HTTP, web UI local, parámetros básicos, salud del servicio y pruebas con curl.",
  keywords: ["llama.cpp server", "GGUF server", "LLM local API", "llama-server tutorial español"],
  alternates: { canonical: "/cursos/mlops-local/llama-server" },
};

export default function Page() {
  return (
    <Chapter
      crumb="llama.cpp server"
      title="llama.cpp server en local"
      icon="terminal"
      lead={<>llama.cpp server es una forma directa de servir modelos GGUF en local. Es ligero, controlable y perfecto para aprender qué significa tener un modelo detrás de una API propia.</>}
      courseHref="/cursos/mlops-local"
      courseLabel="MLOps local"
    >
      <Objetivos>
        <ul>
          <li>Compilar o instalar llama.cpp y levantar un servidor local.</li>
          <li>Probar una petición HTTP sin depender de una interfaz gráfica.</li>
          <li>Registrar modelo, puerto, contexto y parámetros usados.</li>
        </ul>
      </Objetivos>

      <Cristiano term="GGUF">
        Es un formato habitual para modelos cuantizados usados por llama.cpp. Permite ejecutar modelos en equipos modestos, ajustando memoria y velocidad.
      </Cristiano>

      <div className="prose">
        <h2>Servidor mínimo</h2>
      </div>

      <Terminal>{`git clone https://github.com/ggml-org/llama.cpp.git
cd llama.cpp
cmake -B build
cmake --build build --config Release

./build/bin/llama-server \\
  -m models/modelo.gguf \\
  --host 127.0.0.1 \\
  --port 8080 \\
  -c 4096`}</Terminal>

      <Idea>
        La documentación oficial describe llama-server como un servidor HTTP ligero con APIs REST y una web UI. Úsalo como backend local, no como frontera pública de seguridad.
      </Idea>

      <div className="prose">
        <h2>Prueba con curl</h2>
      </div>

      <Terminal>{`curl http://127.0.0.1:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "local-gguf",
    "messages": [
      {"role": "user", "content": "Explica qué es una cola en MLOps IA en 3 frases"}
    ],
    "temperature": 0.2
  }'`}</Terminal>

      <Cuidado>
        Cambiar contexto, cuantización o GPU layers cambia mucho el comportamiento. Guarda esos parámetros junto con cada prueba.
      </Cuidado>

      <div className="prose">
        <h2>Manifest del servicio</h2>
      </div>

      <Terminal>{`servicio: llama-server-local
modelo: models/modelo.gguf
hash_modelo: sha256:...
host: 127.0.0.1
puerto: 8080
contexto: 4096
cuantizacion: Q4_K_M
uso: desarrollo local
fecha: 2026-07-03`}</Terminal>

      <Comprueba>
        Reinicia el servidor y repite la misma llamada. Si no puedes reconstruir la configuración desde el manifest, aún no es reproducible.
      </Comprueba>

      <Guardar>
        llama.cpp server es ideal para aprender serving local: pequeño, explícito y fácil de poner detrás de una API propia.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/mlops-local/mapa-serving", label: "Mapa de serving" }}
        next={{ href: "/cursos/mlops-local/vllm-openai", label: "vLLM OpenAI-compatible" }}
      />
    </Chapter>
  );
}
