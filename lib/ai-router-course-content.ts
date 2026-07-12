export type AiRouterLessonBlock = {
  type: "h2" | "h3" | "p" | "bullet" | "code";
  text: string;
};

export type AiRouterLessonContent = {
  slug: string;
  title: { es: string; en: string };
  lead: { es: string; en: string };
  blocks: { es: AiRouterLessonBlock[]; en: AiRouterLessonBlock[] };
};

export const aiRouterLessons: AiRouterLessonContent[] = [
  {
    slug: "mapa-router",
    title: { es: "Mapa de un AI Router útil", en: "Map of a useful AI Router" },
    lead: {
      es: "Un AI Router no es una lista de modelos. Es una capa de decisión que elige ruta, presupuesto, privacidad y verificación para cada tarea.",
      en: "An AI Router is not a model list. It is a decision layer that chooses route, budget, privacy, and verification for each task.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Qué problema resuelve" },
        { type: "p", text: "Cuando tienes modelos locales, APIs frontier, tareas largas, contenido privado y presupuestos limitados, llamar siempre al mismo modelo es mala arquitectura. Un router decide qué camino usar antes de gastar tokens o exponer datos." },
        { type: "h2", text: "Capas mínimas" },
        { type: "bullet", text: "Clasificador de tarea: código, resumen, traducción, RAG, razonamiento, extracción o generación creativa." },
        { type: "bullet", text: "Política de privacidad: qué datos pueden salir y cuáles deben quedarse local." },
        { type: "bullet", text: "Presupuesto: coste máximo por usuario, tarea, curso o pipeline." },
        { type: "bullet", text: "Fallbacks: qué hacer cuando falla un modelo, sube la latencia o baja la calidad." },
        { type: "bullet", text: "Observabilidad: trazas, scores, modelo elegido, coste, latencia y motivo de decisión." },
        { type: "code", text: "request -> classify -> policy -> route -> model -> score -> log -> improve" },
        { type: "h2", text: "Regla Aulafy" },
        { type: "p", text: "El router debe explicar por qué eligió una ruta. Si no puedes auditar la decisión, no sabes si estás ahorrando dinero, protegiendo privacidad o empeorando silenciosamente el contenido." },
      ],
      en: [
        { type: "h2", text: "The problem it solves" },
        { type: "p", text: "When you have local models, frontier APIs, long tasks, private content, and limited budgets, always calling the same model is poor architecture. A router chooses the path before spending tokens or exposing data." },
        { type: "h2", text: "Minimum layers" },
        { type: "bullet", text: "Task classifier: code, summary, translation, RAG, reasoning, extraction, or creative generation." },
        { type: "bullet", text: "Privacy policy: what data may leave and what must stay local." },
        { type: "bullet", text: "Budget: maximum cost per user, task, course, or pipeline." },
        { type: "bullet", text: "Fallbacks: what to do when a model fails, latency rises, or quality drops." },
        { type: "bullet", text: "Observability: traces, scores, selected model, cost, latency, and routing reason." },
        { type: "code", text: "request -> classify -> policy -> route -> model -> score -> log -> improve" },
        { type: "h2", text: "Aulafy rule" },
        { type: "p", text: "The router must explain why it chose a route. If you cannot audit the decision, you do not know whether you are saving money, protecting privacy, or silently making content worse." },
      ],
    },
  },
  {
    slug: "litellm-gateway",
    title: { es: "LiteLLM como gateway", en: "LiteLLM as a gateway" },
    lead: {
      es: "LiteLLM te permite poner una API común delante de modelos locales y proveedores externos, con claves virtuales, presupuestos, rate limits y fallbacks.",
      en: "LiteLLM lets you place one API in front of local models and external providers, with virtual keys, budgets, rate limits, and fallbacks.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Configuración mental" },
        { type: "p", text: "Tu aplicación no debería saber si llama a Ollama, vLLM, OpenAI, Anthropic o un fallback. Habla con el gateway; el gateway aplica política." },
        { type: "code", text: "model_list:\n  - model_name: local-fast\n    litellm_params:\n      model: ollama/qwen3:4b\n      api_base: http://localhost:11434\n\n  - model_name: frontier-review\n    litellm_params:\n      model: openai/gpt-4.1-mini\n      api_key: os.environ/OPENAI_API_KEY\n\nrouter_settings:\n  num_retries: 2\n  fallbacks:\n    - { local-fast: [frontier-review] }" },
        { type: "h2", text: "Qué controlar desde el gateway" },
        { type: "bullet", text: "Claves virtuales por entorno, usuario o equipo." },
        { type: "bullet", text: "Presupuestos y rate limits para evitar sorpresas." },
        { type: "bullet", text: "Fallbacks por modelo, etiqueta o tipo de tarea." },
        { type: "bullet", text: "Logs de coste, latencia y errores." },
        { type: "h2", text: "Fuentes oficiales" },
        { type: "bullet", text: "LiteLLM Routing & Load Balancing: https://docs.litellm.ai/docs/routing-load-balancing" },
        { type: "bullet", text: "LiteLLM Virtual Keys: https://docs.litellm.ai/docs/proxy/virtual_keys" },
        { type: "bullet", text: "LiteLLM Budgets and Rate Limits: https://docs.litellm.ai/docs/proxy/users" },
      ],
      en: [
        { type: "h2", text: "Mental model" },
        { type: "p", text: "Your application should not need to know whether it calls Ollama, vLLM, OpenAI, Anthropic, or a fallback. It talks to the gateway; the gateway applies policy." },
        { type: "code", text: "model_list:\n  - model_name: local-fast\n    litellm_params:\n      model: ollama/qwen3:4b\n      api_base: http://localhost:11434\n\n  - model_name: frontier-review\n    litellm_params:\n      model: openai/gpt-4.1-mini\n      api_key: os.environ/OPENAI_API_KEY\n\nrouter_settings:\n  num_retries: 2\n  fallbacks:\n    - { local-fast: [frontier-review] }" },
        { type: "h2", text: "What to control from the gateway" },
        { type: "bullet", text: "Virtual keys per environment, user, or team." },
        { type: "bullet", text: "Budgets and rate limits to avoid surprises." },
        { type: "bullet", text: "Fallbacks by model, tag, or task type." },
        { type: "bullet", text: "Cost, latency, and error logs." },
        { type: "h2", text: "Official sources" },
        { type: "bullet", text: "LiteLLM Routing & Load Balancing: https://docs.litellm.ai/docs/routing-load-balancing" },
        { type: "bullet", text: "LiteLLM Virtual Keys: https://docs.litellm.ai/docs/proxy/virtual_keys" },
        { type: "bullet", text: "LiteLLM Budgets and Rate Limits: https://docs.litellm.ai/docs/proxy/users" },
      ],
    },
  },
  {
    slug: "politicas-routing",
    title: { es: "Políticas de routing", en: "Routing policies" },
    lead: {
      es: "La calidad del router depende menos del YAML y más de tus reglas: privacidad, dificultad, coste, latencia y verificabilidad.",
      en: "Router quality depends less on YAML and more on your rules: privacy, difficulty, cost, latency, and verifiability.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Clasifica antes de llamar" },
        { type: "code", text: "task_policy:\n  summarization:\n    preferred: local-fast\n    max_cost_usd: 0.01\n  legal_or_private:\n    preferred: local-private\n    cloud_allowed: false\n  final_editorial_review:\n    preferred: frontier-review\n    requires_trace: true\n  code_patch:\n    preferred: coding-agent\n    requires_tests: true" },
        { type: "h2", text: "Señales de routing" },
        { type: "bullet", text: "Sensibilidad de los datos: público, interno, personal o secreto." },
        { type: "bullet", text: "Dificultad esperada: simple, media, razonamiento fuerte o multimodal." },
        { type: "bullet", text: "Tolerancia a latencia: interactivo, batch o revisión nocturna." },
        { type: "bullet", text: "Necesidad de cita, trazabilidad o revisión humana." },
        { type: "p", text: "Empieza con pocas reglas. Un router con diez políticas claras suele funcionar mejor que uno con cien excepciones que nadie entiende." },
      ],
      en: [
        { type: "h2", text: "Classify before calling" },
        { type: "code", text: "task_policy:\n  summarization:\n    preferred: local-fast\n    max_cost_usd: 0.01\n  legal_or_private:\n    preferred: local-private\n    cloud_allowed: false\n  final_editorial_review:\n    preferred: frontier-review\n    requires_trace: true\n  code_patch:\n    preferred: coding-agent\n    requires_tests: true" },
        { type: "h2", text: "Routing signals" },
        { type: "bullet", text: "Data sensitivity: public, internal, personal, or secret." },
        { type: "bullet", text: "Expected difficulty: simple, medium, strong reasoning, or multimodal." },
        { type: "bullet", text: "Latency tolerance: interactive, batch, or overnight review." },
        { type: "bullet", text: "Need for citations, traceability, or human review." },
        { type: "p", text: "Start with few rules. A router with ten clear policies usually works better than one with a hundred exceptions nobody understands." },
      ],
    },
  },
  {
    slug: "quality-scoring",
    title: { es: "Quality scoring sin humo", en: "Quality scoring without hype" },
    lead: {
      es: "Un router aprende si registras qué salida fue buena, mala o dudosa. Sin scoring, solo tienes intuiciones.",
      en: "A router improves when you record which output was good, bad, or uncertain. Without scoring, you only have intuition.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Score mínimo" },
        { type: "code", text: "score:\n  factualidad: 1-5\n  utilidad: 1-5\n  formato: 1-5\n  seguridad: pass|fail\n  necesita_humano: true|false\n  motivo: \"cita inventada en el segundo párrafo\"" },
        { type: "h2", text: "Quién puntúa" },
        { type: "bullet", text: "Reglas deterministas: JSON válido, campos completos, citas presentes." },
        { type: "bullet", text: "Evals automáticas: comparar contra casos esperados." },
        { type: "bullet", text: "LLM-as-judge: útil para triage, no como verdad absoluta." },
        { type: "bullet", text: "Humano: necesario en contenido editorial, legal, financiero o reputacional." },
        { type: "h2", text: "Fuente oficial" },
        { type: "p", text: "Langfuse documenta trazas, evaluación, datasets y scores para aplicaciones LLM self-hostables: https://langfuse.com/docs/observability/overview" },
      ],
      en: [
        { type: "h2", text: "Minimum score" },
        { type: "code", text: "score:\n  factuality: 1-5\n  usefulness: 1-5\n  format: 1-5\n  safety: pass|fail\n  needs_human: true|false\n  reason: \"invented citation in the second paragraph\"" },
        { type: "h2", text: "Who scores" },
        { type: "bullet", text: "Deterministic rules: valid JSON, complete fields, citations present." },
        { type: "bullet", text: "Automatic evals: compare against expected cases." },
        { type: "bullet", text: "LLM-as-judge: useful for triage, not as absolute truth." },
        { type: "bullet", text: "Human: required for editorial, legal, financial, or reputational content." },
        { type: "h2", text: "Official source" },
        { type: "p", text: "Langfuse documents traces, evaluation, datasets, and scores for self-hostable LLM applications: https://langfuse.com/docs/observability/overview" },
      ],
    },
  },
  {
    slug: "shadow-mode",
    title: { es: "Shadow mode y comparativas", en: "Shadow mode and comparisons" },
    lead: {
      es: "Shadow mode permite probar una ruta nueva sin enseñársela al usuario: respondes con el modelo estable y comparas en segundo plano.",
      en: "Shadow mode lets you test a new route without showing it to the user: answer with the stable model and compare in the background.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Patrón" },
        { type: "code", text: "primary = call_model(\"stable\", prompt)\nshadow = call_model(\"candidate\", prompt)\n\nlog_comparison({\n  \"prompt_id\": prompt.id,\n  \"primary_model\": \"stable\",\n  \"shadow_model\": \"candidate\",\n  \"primary_output\": primary.text,\n  \"shadow_output\": shadow.text,\n  \"shown_to_user\": \"primary\"\n})" },
        { type: "h2", text: "Qué comparar" },
        { type: "bullet", text: "Calidad percibida y tasa de edición humana." },
        { type: "bullet", text: "Coste y latencia." },
        { type: "bullet", text: "Fallos de formato, citas o seguridad." },
        { type: "bullet", text: "Regresiones por tipo de tarea." },
        { type: "p", text: "No cambies el modelo ganador por una anécdota. Cambia cuando tengas suficientes casos por categoría y entiendas qué mejora y qué empeora." },
      ],
      en: [
        { type: "h2", text: "Pattern" },
        { type: "code", text: "primary = call_model(\"stable\", prompt)\nshadow = call_model(\"candidate\", prompt)\n\nlog_comparison({\n  \"prompt_id\": prompt.id,\n  \"primary_model\": \"stable\",\n  \"shadow_model\": \"candidate\",\n  \"primary_output\": primary.text,\n  \"shadow_output\": shadow.text,\n  \"shown_to_user\": \"primary\"\n})" },
        { type: "h2", text: "What to compare" },
        { type: "bullet", text: "Perceived quality and human edit rate." },
        { type: "bullet", text: "Cost and latency." },
        { type: "bullet", text: "Format, citation, or safety failures." },
        { type: "bullet", text: "Regressions by task type." },
        { type: "p", text: "Do not switch the winning model because of one anecdote. Switch when you have enough cases per category and understand what improves and what gets worse." },
      ],
    },
  },
  {
    slug: "proyecto-content-system",
    title: { es: "Proyecto: content system para Aulafy", en: "Project: content system for Aulafy" },
    lead: {
      es: "El proyecto final une routing, scoring y revisión humana para generar o mejorar contenido educativo sin perder criterio editorial.",
      en: "The final project combines routing, scoring, and human review to generate or improve educational content without losing editorial judgment.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Arquitectura" },
        { type: "code", text: "sources -> brief -> local draft -> frontier review -> score -> human edit -> publish\n              \\-> shadow candidates -> comparison dataset" },
        { type: "h2", text: "Entidades mínimas" },
        { type: "bullet", text: "source: URL, fecha, tipo, licencia y resumen." },
        { type: "bullet", text: "brief: objetivo, público, tono, nivel y restricciones." },
        { type: "bullet", text: "generation: modelo, ruta, prompt, coste, latencia y salida." },
        { type: "bullet", text: "review: score, cambios humanos, decisión y motivo." },
        { type: "h2", text: "Criterio editorial" },
        { type: "p", text: "El router puede acelerar investigación y borradores, pero no sustituye la decisión humana. En Aulafy, publicar implica comprobar fuentes, probar comandos cuando sea posible y declarar límites." },
        { type: "h2", text: "Salida final" },
        { type: "p", text: "Terminas con una pequeña herramienta que toma un tema, propone ruta de modelo, genera borrador, pide revisión y guarda trazas para mejorar el sistema con evidencia." },
      ],
      en: [
        { type: "h2", text: "Architecture" },
        { type: "code", text: "sources -> brief -> local draft -> frontier review -> score -> human edit -> publish\n              \\-> shadow candidates -> comparison dataset" },
        { type: "h2", text: "Minimum entities" },
        { type: "bullet", text: "source: URL, date, type, license, and summary." },
        { type: "bullet", text: "brief: goal, audience, tone, level, and constraints." },
        { type: "bullet", text: "generation: model, route, prompt, cost, latency, and output." },
        { type: "bullet", text: "review: score, human changes, decision, and reason." },
        { type: "h2", text: "Editorial judgment" },
        { type: "p", text: "The router can speed up research and drafts, but it does not replace human decision-making. In Aulafy, publishing means checking sources, testing commands when possible, and declaring limits." },
        { type: "h2", text: "Final output" },
        { type: "p", text: "You finish with a small tool that receives a topic, proposes a model route, drafts content, requests review, and saves traces to improve the system with evidence." },
      ],
    },
  },
];

export function getAiRouterLesson(slug: string) {
  return aiRouterLessons.find((lesson) => lesson.slug === slug);
}
