import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Hermes avanzado con Gemma y MLX",
  description:
    "Diseña workflows avanzados con Hermes Agent, Gemma, MLX y Ollama: skills, memoria, Mixture of Agents, límites de loops y pruebas en Apple Silicon.",
  keywords: ["hermes agent gemma mlx", "Gemma MLX Hermes Agent", "Hermes Agent Mixture of Agents", "Hermes skills local"],
  alternates: { canonical: "/cursos/ia-local/hermes-gemma-mlx-avanzado" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Hermes avanzado"
      title="Hermes avanzado con Gemma y MLX"
      icon="brain"
      lead={<>Hermes, Gemma y MLX forman uno de los stacks más comentados para agentes locales en Mac. La clave no es solo velocidad: es diseñar skills, memoria, límites y pruebas para que el agente no derive.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Entender qué aporta MLX en Apple Silicon.</li>
          <li>Usar skills de Hermes como memoria operativa reusable.</li>
          <li>Separar agente rápido, verificador y escalado híbrido.</li>
        </ul>
      </Objetivos>

      <Cristiano term="Mixture of Agents">
        En Hermes, un preset MoA permite que modelos de referencia aporten análisis y un modelo agregador escriba la respuesta final y emita tool calls.
      </Cristiano>

      <Terminal>{`workflow:
  planner:
    provider: "ollama"
    model: "gemma-local-fast"
    max_steps: 4
  verifier:
    provider: "local"
    model: "qwen-coder"
    can_edit: false
  escalation:
    trigger:
      - "same_error_twice"
      - "tests_fail_after_patch"
      - "missing_context"`}</Terminal>

      <Idea>
        MLX puede mejorar mucho la experiencia en Mac, pero no arregla prompts vagos, tools sin límites o memoria llena de ruido.
      </Idea>

      <div className="prose">
        <h2>Patrón de trabajo</h2>
        <ol>
          <li>Crear una skill estrecha para la tarea repetida.</li>
          <li>Probarla en un repo pequeño.</li>
          <li>Registrar decisiones y errores frecuentes.</li>
          <li>Permitir que Hermes reutilice la skill, no todo el historial.</li>
          <li>Escalar a MoA solo cuando una tarea lo justifique.</li>
        </ol>
      </div>

      <Terminal>{`skill:
  name: "review-nextjs-page"
  purpose: "Revisar páginas Next.js de Aulafy"
  when_to_use:
    - "nueva lección"
    - "landing SEO"
  checks:
    - "metadata con canonical"
    - "fuentes oficiales"
    - "ChapterNav correcto"
    - "sin secretos ni datos personales"`}</Terminal>

      <Cuidado>
        “Self-improvement” no significa que el agente deba editar sus propias reglas sin revisión. Guarda skills versionadas y revisa cambios igual que código.
      </Cuidado>

      <Comprueba>
        Mide tres cosas: tiempo al primer token, calidad del diff y número de intervenciones humanas. Si solo mides tokens/s, te pierdes lo importante para agentes.
      </Comprueba>

      <Guardar>
        Hermes avanzado no va de dejar correr más loops. Va de convertir experiencia en skills pequeñas, observables y revisables.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener noreferrer">Hermes Agent documentation</a></li>
          <li><a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/skills" target="_blank" rel="noopener noreferrer">Hermes Skills System</a></li>
          <li><a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/mixture-of-agents" target="_blank" rel="noopener noreferrer">Hermes Mixture of Agents</a></li>
          <li><a href="https://ml-explore.github.io/mlx/" target="_blank" rel="noopener noreferrer">MLX documentation</a></li>
          <li><a href="https://github.com/ml-explore/mlx-lm" target="_blank" rel="noopener noreferrer">MLX LM</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/hermes-agente-coding-local", label: "Hermes y Ollama" }}
        next={{ href: "/cursos/ia-local/tool-calling-modelos-locales", label: "Tool calling local" }}
      />
    </Chapter>
  );
}
