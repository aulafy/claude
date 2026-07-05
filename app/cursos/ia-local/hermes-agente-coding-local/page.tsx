import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Agente coding local con Hermes y Ollama — Claude Code + IA Local",
  description:
    "Monta un agente de código local con Hermes Agent, Ollama y modelos abiertos: permisos, tool calling, stop logic, memoria y verificación antes de tocar repos reales.",
  keywords: [
    "agente coding local ollama hermes",
    "Hermes Agent Ollama",
    "coding agent terminal local",
    "tool calling Ollama agentes",
    "Gemma 4 agente local",
  ],
  alternates: { canonical: "/cursos/ia-local/hermes-agente-coding-local" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Hermes y coding local"
      title="Agente coding local con Hermes y Ollama"
      icon="terminal"
      lead={<>Hermes Agent permite montar un agente que trabaja con herramientas, memoria y skills usando proveedores locales como Ollama. La parte importante no es dejarlo “autónomo”: es darle límites, verificación y una forma clara de parar.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Entender el papel de Hermes, Ollama y el modelo local.</li>
          <li>Configurar un flujo seguro para editar código en una rama.</li>
          <li>Evitar loops, tool calling roto y cambios sin pruebas.</li>
        </ul>
      </Objetivos>

      <Cristiano term="Hermes Agent">
        Es un agente de Nous Research con memoria, skills y herramientas. Puede usar proveedores cloud o self-hosted, incluyendo Ollama y vLLM, pero sigue necesitando permisos y límites explícitos.
      </Cristiano>

      <div className="prose">
        <h2>Arquitectura mínima</h2>
        <p>
          Para un agente de código local, piensa en tres capas: Hermes orquesta la tarea, Ollama sirve el modelo y Git/tests verifican si el cambio merece quedarse. Si una de esas capas no existe, el sistema se vuelve frágil.
        </p>
        <ul>
          <li><strong>Hermes</strong>: memoria, skills, tools y loop de trabajo.</li>
          <li><strong>Ollama</strong>: endpoint local compatible para inferencia.</li>
          <li><strong>Repositorio</strong>: rama aislada, tests, lint y diff revisable.</li>
        </ul>
      </div>

      <Terminal>{`# Comprueba que Ollama responde
ollama --version
ollama list
curl http://localhost:11434/api/tags

# Elige un modelo pequeño para empezar
ollama pull qwen2.5-coder:7b
ollama run qwen2.5-coder:7b "Resume qué hace este archivo package.json"

# Trabaja siempre en rama
git checkout -b agent/hermes-prueba-segura`}</Terminal>

      <Idea>
        Empieza con un modelo y una tarea pequeña. Cambiar modelo, runtime, tool parser y repositorio a la vez hace imposible saber qué rompió el flujo.
      </Idea>

      <div className="prose">
        <h2>Encargo inicial recomendado</h2>
        <p>
          Un agente local no debe empezar editando. Primero debe observar, acotar y proponer un plan. Este patrón reduce cambios impulsivos y te deja detectar si el contexto es insuficiente.
        </p>
      </div>

      <Terminal>{`Objetivo:
Corrige el bug descrito en BUG.md sin tocar otras áreas.

Reglas:
- Primero lista archivos relevantes y riesgos.
- No edites hasta proponer un plan de 5 pasos.
- Máximo 8 pasos de agente.
- Si una tool falla dos veces, para y resume.
- Después de editar, ejecuta lint/test/build disponibles.
- No hagas commit sin mostrar diff y resultado de pruebas.`}</Terminal>

      <Cuidado>
        Tool calling con modelos locales puede fallar por formato, parser, cuantización o metadatos del modelo. Si una tool no se invoca o el modelo inventa resultados, no lo arregles con más permisos: cambia a una tarea más pequeña y revisa proveedor, modelo y formato de tools.
      </Cuidado>

      <div className="prose">
        <h2>Stop logic para que no se vaya de paseo</h2>
      </div>

      <Terminal>{`limits:
  max_steps: 8
  max_tool_calls_total: 20
  max_repeated_tool_args: 2
  max_runtime_minutes: 15
  stop_when:
    - tests_pass
    - same_error_twice
    - missing_context
    - needs_secret_or_external_login`}</Terminal>

      <Comprueba>
        Haz una prueba de fuego: pide al agente que modifique una función simple, ejecute tests y explique el diff. Si no puede completar ese circuito, todavía no está listo para tareas largas.
      </Comprueba>

      <Guardar>
        Un agente coding local útil no es el que toca más archivos, sino el que sabe cuándo parar, enseñar evidencia y dejar un diff pequeño que puedas revisar.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.ollama.com/integrations/hermes" target="_blank" rel="noopener noreferrer">Ollama: Hermes Agent integration</a></li>
          <li><a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener noreferrer">Hermes Agent documentation</a></li>
          <li><a href="https://hermes-agent.nousresearch.com/docs/integrations/providers" target="_blank" rel="noopener noreferrer">Hermes Agent: AI providers</a></li>
          <li><a href="https://ai.google.dev/gemma/docs/core/model_card_4" target="_blank" rel="noopener noreferrer">Google Gemma 4 model card</a></li>
          <li><a href="https://docs.ollama.com/api" target="_blank" rel="noopener noreferrer">Ollama API</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/agentes-codigo-locales", label: "Agentes de código locales" }}
        next={{ href: "/cursos/ia-local/open-webui-qdrant", label: "Open WebUI + Qdrant" }}
      />
    </Chapter>
  );
}
