// Fuente única de verdad de los cursos de Aulafy.
// Cada lección re-exporta una página existente; las URLs antiguas redirigen aquí.

export type Leccion = { slug: string; title: string };
export type Seccion = { title: string; lecciones: Leccion[] };

export type Curso = {
  slug: string;
  title: string;
  short: string;
  desc: string;
  level: string;
  icon: string; // nombre de icono de components/Icon
  gradient: [string, string]; // portada
  secciones: Seccion[];
  pdf?: string;
};

export const cursos: Curso[] = [
  {
    slug: "claude-code",
    title: "Claude Code, de 0 a pro",
    short: "Domina la CLI de IA de Anthropic",
    desc: "Aprende a construir software y aplicaciones hablando con la IA en tu terminal: instalación, recetas, proyectos guiados, skills, subagentes, MCP y flujos profesionales.",
    level: "Principiante → avanzado",
    icon: "terminal",
    gradient: ["#fb923c", "#8b5cf6"],
    pdf: "/guia-claude-code.pdf",
    secciones: [
      {
        title: "Empezar",
        lecciones: [
          { slug: "instalacion", title: "Instalación" },
          { slug: "primeros-pasos", title: "Primeros pasos" },
          { slug: "donde-usar", title: "CLI, app y móvil" },
        ],
      },
      {
        title: "Práctica diaria",
        lecciones: [
          { slug: "recetas", title: "Recetas prácticas" },
          { slug: "proyectos", title: "Proyectos guiados" },
          { slug: "prompts", title: "Escribir buenos prompts" },
          { slug: "contexto-costes", title: "Controla el contexto y los costes" },
          { slug: "glosario", title: "Glosario" },
        ],
      },
      {
        title: "Según tu perfil",
        lecciones: [
          { slug: "pymes", title: "Pymes y oficina" },
          { slug: "equipos", title: "Perfiles técnicos" },
        ],
      },
      {
        title: "Extender Claude Code",
        lecciones: [
          { slug: "skills", title: "Skills" },
          { slug: "subagentes", title: "Subagentes" },
          { slug: "plugins", title: "Plugins" },
          { slug: "flujos", title: "Flujos de trabajo pro" },
        ],
      },
      {
        title: "Referencia",
        lecciones: [
          { slug: "comandos", title: "Comandos" },
          { slug: "configuracion", title: "Configuración" },
          { slug: "mcp", title: "Servidores MCP" },
          { slug: "hooks", title: "Hooks" },
          { slug: "permisos", title: "Permisos" },
          { slug: "avanzado", title: "Uso avanzado" },
        ],
      },
      {
        title: "Ayuda",
        lecciones: [
          { slug: "faq", title: "Preguntas frecuentes" },
          { slug: "problemas", title: "Solución de problemas" },
          { slug: "recursos", title: "Recursos" },
          { slug: "comparativa", title: "Comparativa" },
        ],
      },
    ],
  },
  {
    slug: "ia-local",
    title: "Claude Code + IA Local",
    short: "Construye apps de IA en tu ordenador",
    desc: "Construye herramientas de IA que se ejecutan en tu propio equipo (RAG, PDF, voz, 3D, WordPress…) y aprende a publicarlas en internet. La continuación práctica del curso de Claude Code.",
    level: "Intermedio",
    icon: "brain",
    gradient: ["#8b5cf6", "#22d3ee"],
    pdf: "/guia-claude-code-vol2.pdf",
    secciones: [
      {
        title: "Fundamentos",
        lecciones: [
          { slug: "terminal", title: "La terminal sin miedo (CLI)" },
          { slug: "proyectos", title: "Cómo trabajar con tus proyectos" },
          { slug: "prompts", title: "Escribir buenos encargos" },
          { slug: "ia-local", title: "IA local: elige tu modelo" },
          { slug: "ollama-desde-cero", title: "Ollama desde cero" },
          { slug: "cuantizacion-gguf", title: "Cuantización GGUF: Q4, Q5 y Q8" },
          { slug: "conectar-ollama", title: "Conecta Claude Code con tu IA local" },
          { slug: "troubleshooting-ollama", title: "Soluciona errores de Ollama" },
          { slug: "ollama-gpu-windows", title: "Ollama no usa la GPU en Windows" },
          { slug: "depurar", title: "Depurar y proteger tu trabajo" },
        ],
      },
      {
        title: "IA local avanzada",
        lecciones: [
          { slug: "hardware-minimo-2026", title: "Hardware mínimo para IA local en 2026" },
          { slug: "windows-wsl2-vs-mac-m4", title: "Windows/WSL2 vs Mac M4 para IA local" },
          { slug: "homelab-rtx-3090", title: "Homelab IA con RTX 3090 usadas" },
          { slug: "cuantizacion-modelos-coding", title: "Cuantización y modelos para coding" },
          { slug: "agentes-codigo-locales", title: "Agentes de código locales con Ollama" },
          { slug: "open-webui-qdrant", title: "Open WebUI + Ollama + Qdrant" },
          { slug: "open-webui-troubleshooting", title: "Open WebUI troubleshooting y producción ligera" },
        ],
      },
      {
        title: "Construye tus herramientas",
        lecciones: [
          { slug: "chatbot-legal", title: "Chatbot que cita la ley (RAG)" },
          { slug: "pdf", title: "Pregúntale a tus PDF" },
          { slug: "voz", title: "Chatbot que escucha y habla" },
          { slug: "texto-a-audio", title: "Texto a audio" },
          { slug: "simulaciones-3d", title: "Simulaciones 3D" },
          { slug: "avatar", title: "Avatar que habla" },
          { slug: "wordpress", title: "Tema de WordPress con IA" },
          { slug: "landing", title: "Web para tu servicio" },
          { slug: "facturacion", title: "Asistente para autónomos" },
          { slug: "estudio", title: "App para estudiar" },
        ],
      },
      {
        title: "Sácalo al mundo",
        lecciones: [{ slug: "publicar", title: "Publica tu app en internet" }],
      },
      {
        title: "Anexos (avanzado)",
        lecciones: [{ slug: "cluster", title: "Clúster casero con exo" }],
      },
    ],
  },
  {
    slug: "ia-generativa",
    title: "IA generativa: imagen, voz y vídeo",
    short: "Crea recursos multimedia con modelos abiertos",
    desc: "Aprende a generar y editar imágenes, voces, transcripciones y clips de vídeo con ComfyUI, FLUX, Diffusers, Whisper, Piper y Wan, cuidando licencias, reproducibilidad y uso educativo.",
    level: "Principiante → intermedio",
    icon: "palette",
    gradient: ["#ec4899", "#22c55e"],
    secciones: [
      {
        title: "Mapa y criterio",
        lecciones: [
          { slug: "mapa-licencias", title: "Mapa de herramientas y licencias" },
          { slug: "comfyui-flux", title: "ComfyUI + FLUX desde cero" },
        ],
      },
      {
        title: "Imagen controlada",
        lecciones: [
          { slug: "diffusers-python", title: "Diffusers con Python reproducible" },
          { slug: "control-lora", title: "Control, referencias y LoRA" },
        ],
      },
      {
        title: "Audio y vídeo",
        lecciones: [
          { slug: "voz-local", title: "Voz local: Whisper y Piper" },
          { slug: "video-local", title: "Vídeo local con Wan y ComfyUI" },
          { slug: "proyecto-multimodal", title: "Proyecto: cápsula educativa multimedia" },
        ],
      },
    ],
  },
  {
    slug: "seguridad-evals",
    title: "Seguridad y evaluación de modelos",
    short: "Prueba sistemas de IA antes de publicarlos",
    desc: "Aprende a evaluar modelos y aplicaciones de IA con criterios prácticos: OWASP Top 10 LLM, NIST AI RMF, red teaming, privacidad, supply chain, logs, benchmarks y auditoría previa a producción.",
    level: "Intermedio",
    icon: "shield",
    gradient: ["#ef4444", "#0ea5e9"],
    secciones: [
      {
        title: "Riesgo y marco mental",
        lecciones: [
          { slug: "mapa-riesgos", title: "Mapa de riesgos de IA generativa" },
          { slug: "owasp-llm", title: "OWASP Top 10 LLM explicado" },
        ],
      },
      {
        title: "Medir antes de confiar",
        lecciones: [
          { slug: "evals-basicas", title: "Evals básicas y regresiones" },
          { slug: "red-teaming", title: "Red teaming y jailbreaks" },
        ],
      },
      {
        title: "Producción responsable",
        lecciones: [
          { slug: "privacidad-datos", title: "Privacidad, logs y datos sensibles" },
          { slug: "supply-chain", title: "Supply chain de modelos y datasets" },
          { slug: "proyecto-auditoria", title: "Proyecto: auditoría de una app IA" },
        ],
      },
    ],
  },
  {
    slug: "mlops-local",
    title: "MLOps local y despliegue de modelos",
    short: "Sirve modelos abiertos con control",
    desc: "Aprende a llevar modelos abiertos de tu portátil a un servicio usable: llama.cpp, vLLM, LiteLLM, colas, caché, costes, observabilidad, evals y despliegue con límites claros.",
    level: "Intermedio → avanzado",
    icon: "server",
    gradient: ["#06b6d4", "#84cc16"],
    secciones: [
      {
        title: "Servir modelos",
        lecciones: [
          { slug: "mapa-serving", title: "Mapa de serving: Ollama, llama.cpp, vLLM" },
          { slug: "vram-oom-vllm-ollama", title: "VRAM y OOM: vLLM vs Ollama/llama.cpp" },
          { slug: "llama-server", title: "llama.cpp server en local" },
          { slug: "vllm-openai", title: "vLLM con API compatible OpenAI" },
        ],
      },
      {
        title: "Operar con control",
        lecciones: [
          { slug: "litellm-gateway", title: "LiteLLM como gateway y control de costes" },
          { slug: "observabilidad", title: "Observabilidad con Langfuse y OpenTelemetry" },
          { slug: "colas-costes", title: "Colas, rate limits y caché" },
        ],
      },
      {
        title: "Proyecto final",
        lecciones: [
          { slug: "proyecto-produccion", title: "Proyecto: mini plataforma LLM privada" },
        ],
      },
    ],
  },
  {
    slug: "fine-tuning-local",
    title: "Fine-tuning y post-training de LLMs",
    short: "Adapta modelos abiertos con tus datos",
    desc: "Aprende a preparar datasets, entrenar LoRA/QLoRA con PEFT, TRL, Unsloth o Axolotl, evitar overfitting, evaluar mejoras y exportar modelos a GGUF/Ollama para usarlos en local.",
    level: "Intermedio → avanzado",
    icon: "experiment",
    gradient: ["#a855f7", "#f97316"],
    secciones: [
      {
        title: "Antes de entrenar",
        lecciones: [
          { slug: "mapa-post-training", title: "Mapa: SFT, LoRA, QLoRA y DPO" },
          { slug: "datasets-instrucciones", title: "Datasets de instrucciones de calidad" },
        ],
      },
      {
        title: "Entrenamiento práctico",
        lecciones: [
          { slug: "lora-qlora", title: "LoRA y QLoRA sin humo" },
          { slug: "unsloth-sft", title: "SFT rápido con Unsloth" },
          { slug: "axolotl-config", title: "Axolotl para entrenamientos reproducibles" },
        ],
      },
      {
        title: "Evaluar y usar",
        lecciones: [
          { slug: "evals-overfitting", title: "Evals, overfitting y regresiones" },
          { slug: "export-gguf-ollama", title: "Exportar a GGUF y Ollama" },
          { slug: "proyecto-modelo-pyme", title: "Proyecto: modelo adaptado para una pyme" },
        ],
      },
    ],
  },
  {
    slug: "agentes-automatizacion",
    title: "Agentes y automatización",
    short: "Diseña agentes útiles, seguros y mantenibles",
    desc: "Aprende a convertir tareas repetitivas en sistemas agénticos: subagentes, hooks, skills, MCP, GitHub Actions, agentes 24/7, OOM, retries, estado persistente, loops, costes y governance.",
    level: "Intermedio → avanzado",
    icon: "robot",
    gradient: ["#22d3ee", "#10b981"],
    secciones: [
      {
        title: "Fundamentos",
        lecciones: [
          { slug: "mapa", title: "Mapa real de agentes en 2026" },
          { slug: "subagentes", title: "Subagentes con roles y límites" },
        ],
      },
      {
        title: "Automatizar con control",
        lecciones: [
          { slug: "hooks", title: "Hooks: automatización determinista" },
          { slug: "skills-seguras", title: "Skills seguras y auditables" },
          { slug: "mcp-seguro", title: "MCP sin regalar tus llaves" },
        ],
      },
      {
        title: "Del portátil a producción",
        lecciones: [
          { slug: "github-routines", title: "GitHub Actions y routines" },
          { slug: "agente-247", title: "Proyecto: agente 24/7 con bandeja de entrada" },
        ],
      },
      {
        title: "Fallos de producción",
        lecciones: [
          { slug: "oom-memory", title: "OOM y gestión de memoria" },
          { slug: "retry-idempotencia", title: "Retries, idempotencia y exactly-once" },
          { slug: "estado-recuperacion", title: "Estado persistente y crash recovery" },
          { slug: "loops-costes", title: "Loops infinitos y control de costes" },
          { slug: "mcp-verificacion", title: "MCP de verificación antes de merge" },
          { slug: "mcp-governance", title: "Governance MCP y conocimiento fiable" },
        ],
      },
    ],
  },
  {
    slug: "agentes-produccion",
    title: "Agentes en producción con LangGraph y n8n",
    short: "Agentes fiables para tareas reales",
    desc: "Construye agentes con estado, herramientas, revisión humana y automatizaciones de negocio usando LangGraph, n8n, Ollama y buenas prácticas de seguridad.",
    level: "Intermedio → avanzado",
    icon: "network",
    gradient: ["#10b981", "#6366f1"],
    secciones: [
      {
        title: "Arquitectura",
        lecciones: [
          { slug: "mapa-frameworks", title: "LangGraph, n8n y CrewAI: qué usar" },
          { slug: "langgraph-vs-crewai-n8n", title: "LangGraph vs CrewAI vs n8n en 2026" },
          { slug: "estado-memoria", title: "Estado, memoria y bucles controlados" },
        ],
      },
      {
        title: "Automatizar con herramientas",
        lecciones: [
          { slug: "n8n-tools", title: "n8n como capa de herramientas" },
          { slug: "human-in-the-loop", title: "Aprobaciones humanas y permisos" },
          { slug: "recuperacion-errores", title: "Recuperación de errores y fallos 503" },
        ],
      },
      {
        title: "Producción",
        lecciones: [
          { slug: "evals-logs", title: "Evals, logs y observabilidad" },
          { slug: "proyecto-inbox", title: "Proyecto: agente de inbox para pymes" },
        ],
      },
    ],
  },
  {
    slug: "automatizacion-self-hosted",
    title: "Automatización IA self-hosted para pymes",
    short: "n8n, Open WebUI y Ollama en tu servidor",
    desc: "Monta una plataforma barata y privada para automatizar tareas de negocio con n8n, Open WebUI, Ollama o vLLM, webhooks, aprobaciones humanas, colas, backups, seguridad y monitorización básica.",
    level: "Intermedio",
    icon: "automation",
    gradient: ["#14b8a6", "#f59e0b"],
    secciones: [
      {
        title: "Arquitectura base",
        lecciones: [
          { slug: "mapa-stack", title: "Mapa del stack: n8n, Open WebUI y modelos" },
          { slug: "docker-vps", title: "Docker y VPS barato sin liarla" },
          { slug: "n8n-windows-wsl", title: "n8n en Windows: Docker, WSL y errores típicos" },
          { slug: "ollama-openwebui", title: "Ollama y Open WebUI como interfaz privada" },
        ],
      },
      {
        title: "Flujos de negocio",
        lecciones: [
          { slug: "n8n-webhooks", title: "n8n con webhooks y credenciales" },
          { slug: "aprobaciones-humanas", title: "Aprobaciones humanas antes de actuar" },
          { slug: "colas-backups-monitoring", title: "Colas, backups y monitorización" },
        ],
      },
      {
        title: "Proyecto final",
        lecciones: [
          { slug: "proyecto-soporte-pyme", title: "Proyecto: soporte interno para una pyme" },
        ],
      },
    ],
  },
  {
    slug: "rag-seguro",
    title: "RAG avanzado y seguro",
    short: "Chatbots con documentos que sí se pueden usar",
    desc: "Aprende a construir sistemas RAG con PDFs y documentos privados: chunking, embeddings, búsqueda híbrida, reranking, citaciones, permisos, evals y defensa frente a prompt injection.",
    level: "Intermedio",
    icon: "database",
    gradient: ["#f97316", "#14b8a6"],
    secciones: [
      {
        title: "Fundamentos que importan",
        lecciones: [
          { slug: "mapa-rag", title: "RAG útil: mucho más que chat con PDF" },
          { slug: "ingesta-chunking", title: "Ingesta, limpieza y chunking" },
          { slug: "ocr-tablas", title: "OCR y tablas en PDFs reales" },
        ],
      },
      {
        title: "Recuperar mejor",
        lecciones: [
          { slug: "embeddings-vector-db", title: "Embeddings y bases vectoriales" },
          { slug: "hybrid-reranking", title: "Búsqueda híbrida y reranking" },
          { slug: "qdrant-permisos", title: "Qdrant multiusuario y permisos" },
        ],
      },
      {
        title: "Seguridad y producción",
        lecciones: [
          { slug: "prompt-injection", title: "Prompt injection en RAG" },
          { slug: "debugging-grounding", title: "Debugging RAG: grounding y prompt completo" },
          { slug: "evals-metricas", title: "Evals RAG con métricas" },
          { slug: "evals-citaciones", title: "Evals, citaciones y trazabilidad" },
        ],
      },
    ],
  },
  {
    slug: "ia-pymes",
    title: "IA para pymes y autónomos",
    short: "Automatiza oficina sin perder control",
    desc: "Aprende a aplicar IA en tareas reales de negocio: emails, facturas, presupuestos, hojas de cálculo, atención al cliente y RGPD básico con flujos locales y revisables.",
    level: "Principiante → intermedio",
    icon: "briefcase",
    gradient: ["#0ea5e9", "#f59e0b"],
    secciones: [
      {
        title: "Antes de automatizar",
        lecciones: [
          { slug: "mapa", title: "Mapa de IA útil para una pyme" },
          { slug: "rgpd-basico", title: "RGPD básico para usar IA sin sustos" },
        ],
      },
      {
        title: "Flujos de oficina",
        lecciones: [
          { slug: "emails", title: "Emails: clasificar y crear borradores" },
          { slug: "facturas", title: "Facturas: extraer datos y revisar" },
          { slug: "presupuestos-excel", title: "Presupuestos, Excel y Sheets" },
          { slug: "whatsapp-atencion", title: "WhatsApp y Telegram con aprobación humana" },
        ],
      },
    ],
  },
];

export const proximamente = [
  { icon: "spreadsheet", title: "IA para datos y analítica", desc: "CSV, SQL, notebooks, dashboards, limpieza de datos y asistentes analíticos con modelos abiertos." },
];

export function getCurso(slug: string): Curso | undefined {
  return cursos.find((c) => c.slug === slug);
}

export function lecciones(curso: Curso): Leccion[] {
  return curso.secciones.flatMap((s) => s.lecciones);
}

export function totalLecciones(curso: Curso): number {
  return lecciones(curso).length;
}
