// Fuente única de verdad de los cursos de Aulafy.
// Cada lección re-exporta una página existente; las URLs antiguas redirigen aquí.

export type Leccion = { slug: string; title: string };
export type Seccion = { title: string; lecciones: Leccion[] };
export type RecursoCurso = { href: string; label: string; format: string };
export type FaseItinerario = {
  title: string;
  eyebrow: string;
  description: string;
  start: number;
  end: number;
  recommended?: boolean;
};
export type ItinerarioCurso = {
  headline: string;
  description: string;
  primaryHours: number;
  phases: FaseItinerario[];
};

export type Curso = {
  slug: string;
  title: string;
  short: string;
  desc: string;
  level: string;
  /** Fecha ISO obligatoria para la ficha, sitemap y datos estructurados. */
  updatedAt: string;
  icon: string; // nombre de icono de components/Icon
  gradient: [string, string]; // portada
  secciones: Seccion[];
  pdf?: string;
  resources?: RecursoCurso[];
  itinerary?: ItinerarioCurso;
  availableInEnglish?: boolean;
};

// Actualizada cuando una pasada editorial revisa el curso completo. Cada ficha
// debe declararla de forma explícita para que TypeScript no permita omitirla.
const courseCatalogUpdatedAt = "2026-07-18";

export const cursos: Curso[] = [
  {
    slug: "ia-desde-cero",
    title: "IA desde cero",
    short: "Entiende, usa y verifica la IA generativa antes de elegir una herramienta",
    desc: "Curso breve para cualquier persona que quiere aprender inteligencia artificial con criterio: modelos, chat, RAG, agentes, contexto, verificación, privacidad, herramientas y un primer proyecto propio.",
    level: "Cero absoluto",
    updatedAt: courseCatalogUpdatedAt,
    icon: "sparkle",
    gradient: ["#f59e0b", "#ec4899"],
    availableInEnglish: false,
    resources: [
      {
        href: "/recursos/ia-desde-cero/curso-ia-desde-cero.md",
        label: "Contenido completo en Markdown",
        format: "MD",
      },
    ],
    secciones: [
      {
        title: "Entender sin mitificar",
        lecciones: [
          { slug: "que-puede-hacer-ia-generativa", title: "Qué puede hacer la IA generativa y qué no conviene delegarle" },
          { slug: "modelos-chat-llm", title: "Modelo, chat y LLM: las palabras que necesitas para orientarte" },
        ],
      },
      {
        title: "Elegir el tipo de ayuda correcto",
        lecciones: [
          { slug: "chat-rag-agentes-automatizacion", title: "Chat, automatización, RAG y agentes: no son sinónimos" },
          { slug: "contexto-tokens-memoria", title: "Contexto, tokens y memoria: por qué la misma pregunta cambia de respuesta" },
        ],
      },
      {
        title: "Pedir, comprobar y corregir",
        lecciones: [
          { slug: "pedir-resultados-utiles", title: "Cómo pedir un resultado útil sin depender de trucos de prompts" },
          { slug: "alucinaciones-verificar", title: "Alucinaciones: cómo detectar una respuesta convincente pero incorrecta" },
        ],
      },
      {
        title: "Elegir herramientas y proteger a las personas",
        lecciones: [
          { slug: "elegir-modelo-herramienta", title: "Elegir modelo o herramienta según la tarea, no por una clasificación viral" },
          { slug: "privacidad-derechos-seguridad", title: "Privacidad, derechos y seguridad antes de compartir datos" },
          { slug: "imagen-voz-video-responsable", title: "Imagen, voz y vídeo: creatividad, licencia y transparencia" },
        ],
      },
      {
        title: "Convertir comprensión en un resultado propio",
        lecciones: [
          { slug: "primer-proyecto-repetible", title: "Tu primer proyecto: una tarea pequeña, comprobada y repetible" },
        ],
      },
    ],
  },
  {
    slug: "fundamentos-aulafy",
    title: "Fundamentos para Aulafy",
    short: "Python, Git, terminal y Docker para aprender IA sin fricción",
    desc: "Prepara un entorno local-first para cualquier curso de Aulafy: terminal, Python moderno con uv, Git, AGENTS.md, Docker, servicios locales y una plantilla de proyecto reproducible.",
    level: "Principiante",
    updatedAt: courseCatalogUpdatedAt,
    icon: "tools",
    gradient: ["#22c55e", "#f59e0b"],
    secciones: [
      {
        title: "Base local-first",
        lecciones: [
          { slug: "mapa-entorno", title: "Mapa del entorno local-first" },
          { slug: "python-uv", title: "Python moderno con uv" },
          { slug: "git-agents-md", title: "Git, commits pequeños y AGENTS.md" },
        ],
      },
      {
        title: "Herramientas de trabajo",
        lecciones: [
          { slug: "terminal-sin-miedo", title: "Terminal sin miedo" },
          { slug: "docker-servicios", title: "Docker para servicios de IA" },
          { slug: "proyecto-base", title: "Proyecto base listo para Aulafy" },
        ],
      },
    ],
  },
  {
    slug: "codex-desde-cero",
    title: "Codex desde cero",
    short: "Trabaja con archivos, automatiza tareas y construye proyectos sin experiencia previa",
    desc: "Curso para cualquier perfil: aprende a elegir la herramienta, trabajar con archivos de forma segura, crear entregables, automatizar tareas y construir una web. Da el salto a CLI, IDE y Git solo cuando lo necesites.",
    level: "Cero absoluto → intermedio",
    updatedAt: courseCatalogUpdatedAt,
    icon: "laptopCode",
    gradient: ["#7c3aed", "#06b6d4"],
    pdf: "/manual-codex-desde-cero-aulafy.pdf",
    availableInEnglish: false,
    resources: [
      {
        href: "/recursos/codex-desde-cero/curso-codex-desde-cero.md",
        label: "Contenido completo en Markdown",
        format: "MD",
      },
      {
        href: "/recursos/codex-desde-cero/manual-codex-desde-cero-aulafy.tex",
        label: "Fuente editable en LaTeX",
        format: "TEX",
      },
      {
        href: "/recursos/codex-desde-cero/README.md",
        label: "Instrucciones de compilación",
        format: "README",
      },
    ],
    secciones: [
      {
        title: "Orientarse antes de actuar",
        lecciones: [
          { slug: "que-es-codex", title: "Qué es Codex y qué no es" },
          { slug: "donde-usar-codex", title: "Dónde utilizar Codex: app, web, CLI e IDE" },
          { slug: "instalacion", title: "Instala e inicia sesión en tu plataforma" },
        ],
      },
      {
        title: "Tu primer resultado seguro",
        lecciones: [
          { slug: "primera-carpeta", title: "Crea una carpeta de práctica y empieza en solo lectura" },
          { slug: "pedir-resultados-claros", title: "Pide resultados claros sin aprender «prompt engineering»" },
          { slug: "planificar-verificar", title: "Planifica, corrige el rumbo y cierra con evidencia" },
        ],
      },
      {
        title: "Trabajo cotidiano sin programar",
        lecciones: [
          { slug: "organizar-archivos", title: "Organiza archivos sin perder los originales" },
          { slug: "crear-documentos-datos-presentaciones", title: "Crea documentos, datos, presentaciones, PDF e imágenes" },
          { slug: "investigar-web", title: "Investiga en la web y utiliza el navegador con criterio" },
          { slug: "computer-use-seguro", title: "Usa Computer Use sin entregar el control de tu equipo" },
        ],
      },
      {
        title: "Construir sin saber programar",
        lecciones: [
          { slug: "primera-web-local", title: "Construye tu primera web local" },
          { slug: "automatizar-con-vista-previa", title: "Automatiza una tarea repetitiva con vista previa" },
        ],
      },
      {
        title: "Organización, control y recuperación",
        lecciones: [
          { slug: "proyectos-tareas-entornos", title: "Organiza proyectos, tareas y entornos" },
          { slug: "permisos-privacidad-secretos", title: "Permisos, privacidad, secretos y acciones externas" },
          { slug: "copias-seguridad-git", title: "Copias de seguridad y Git sin miedo" },
        ],
      },
      {
        title: "Personalizar y reutilizar",
        lecciones: [
          { slug: "instrucciones-agents-md", title: "Instrucciones personales y AGENTS.md" },
          { slug: "skills-plugins-mcp", title: "Elige entre skills, plugins y MCP" },
          { slug: "tareas-programadas", title: "Programa tareas que puedas revisar" },
        ],
      },
      {
        title: "Puente técnico y proyecto final",
        lecciones: [
          { slug: "cli-ide-repositorios", title: "Da el salto a CLI, IDE y repositorios cuando lo necesites" },
          { slug: "proyecto-final", title: "Proyecto final según tu perfil" },
        ],
      },
    ],
  },
  {
    slug: "crear-webs-con-ia",
    title: "Crea webs profesionales con IA desde cero",
    short: "De una idea a una web seria, publicada y mantenible con Codex y GPT-5.6 Sol",
    desc: "Aprende sin experiencia previa a planificar, construir, revisar, publicar y mantener webs que resuelven problemas reales. Incluye diseño, accesibilidad, formularios, Supabase, SEO/AEO, Vercel, dominios, chatbot, 3D opcional y ocho talleres prácticos.",
    level: "Cero absoluto → profesional",
    updatedAt: courseCatalogUpdatedAt,
    icon: "laptopCode",
    gradient: ["#06b6d4", "#8b5cf6"],
    availableInEnglish: false,
    resources: [
      {
        href: "/recursos/crear-webs-con-ia/curso-crear-webs-con-ia.md",
        label: "Contenido completo en Markdown",
        format: "MD",
      },
      {
        href: "/recursos/crear-webs-con-ia/plantilla-informe-laboratorio.md",
        label: "Plantilla de informe de laboratorio",
        format: "MD",
      },
      {
        href: "/recursos/crear-webs-con-ia/plantilla-ficha-web-seria.md",
        label: "Plantilla para definir una web seria",
        format: "MD",
      },
      {
        href: "/recursos/crear-webs-con-ia/plantilla-alcance-web-v1.md",
        label: "Plantilla de alcance para la primera versión",
        format: "MD",
      },
      {
        href: "https://github.com/aulafy/taller",
        label: "Código de ejemplos en Aulafy Taller",
        format: "GITHUB",
      },
      {
        href: "https://github.com/aulafy/meteo",
        label: "Proyecto técnico METEO",
        format: "GITHUB",
      },
    ],
    itinerary: {
      headline: "No necesitas completar 47 lecciones para publicar tu primera web",
      description: "Sigue primero la ruta de publicación. Cuando tengas una base real, elige solo los laboratorios y talleres que respondan a tu proyecto.",
      primaryHours: 26,
      phases: [
        {
          title: "Ruta de publicación",
          eyebrow: "EMPIEZA AQUÍ",
          description: "De la idea al despliegue: briefing, prototipo, diseño, datos, seguridad, SEO y mantenimiento básico.",
          start: 1,
          end: 24,
          recommended: true,
        },
        {
          title: "Extensiones con criterio",
          eyebrow: "CUANDO LO NECESITES",
          description: "FAQ, chatbot limitado, agentes y 3D: incorpóralos solo si resuelven una necesidad demostrable.",
          start: 25,
          end: 28,
        },
        {
          title: "Laboratorios de fallos",
          eyebrow: "PRACTICA EN SEGURO",
          description: "Practica errores reales de responsive, RLS, secretos, entornos y deuda técnica sin arriesgar tu proyecto.",
          start: 29,
          end: 38,
        },
        {
          title: "Taller sectorial",
          eyebrow: "ELIGE UNO",
          description: "Elige uno de ocho casos: estudiante, restaurante, despacho, clínica, academia, SaaS o METEO técnico.",
          start: 39,
          end: 46,
        },
        {
          title: "Proyecto final",
          eyebrow: "CIERRA LA RUTA",
          description: "Publica, revisa y deja un plan de mantenimiento para una web que puedas defender y recuperar.",
          start: 47,
          end: 47,
        },
      ],
    },
    secciones: [
      {
        title: "Antes de construir",
        lecciones: [
          { slug: "una-web-seria", title: "Qué hace que una web sea seria y útil" },
          { slug: "elegir-tipo-web", title: "Elige el tipo de web y evita complejidad innecesaria" },
          { slug: "preparar-codex-sol", title: "Prepara Codex y GPT-5.6 Sol" },
          { slug: "briefing-verificable", title: "Convierte la idea en un briefing verificable" },
        ],
      },
      {
        title: "Contenido y prototipo local",
        lecciones: [
          { slug: "inventario-contenido-real", title: "Reúne contenido real sin inventar autoridad" },
          { slug: "arquitectura-informacion", title: "Diseña páginas, navegación y llamada a la acción" },
          { slug: "primer-prototipo-local", title: "Construye el primer prototipo local" },
          { slug: "revisar-con-browser", title: "Revisa y corrige con el navegador integrado" },
        ],
      },
      {
        title: "Diseño profesional",
        lecciones: [
          { slug: "sistema-diseno", title: "Crea un sistema visual coherente" },
          { slug: "responsive-accesible", title: "Diseña para móvil, teclado y lectores de pantalla" },
          { slug: "imagenes-identidad", title: "Usa imágenes, iconos e identidad sin perder rendimiento" },
          { slug: "estados-interacciones", title: "Diseña estados, formularios y microinteracciones" },
        ],
      },
      {
        title: "Arquitectura profesional",
        lecciones: [
          { slug: "cuando-usar-nextjs", title: "Decide cuándo pasar a Next.js" },
          { slug: "componentes-rutas", title: "Organiza componentes, páginas y rutas" },
          { slug: "formularios-validacion", title: "Crea formularios con validación y estados" },
          { slug: "supabase-rls", title: "Guarda contactos en Supabase con RLS" },
        ],
      },
      {
        title: "Calidad y visibilidad",
        lecciones: [
          { slug: "seo-tecnico", title: "Configura metadata, canonical, sitemap y robots" },
          { slug: "datos-estructurados-aeo", title: "Añade datos estructurados y contenido para buscadores y agentes" },
          { slug: "rendimiento-core-web-vitals", title: "Mejora rendimiento y Core Web Vitals" },
          { slug: "seguridad-privacidad-legal", title: "Aplica seguridad, privacidad y límites legales" },
        ],
      },
      {
        title: "Publicar y operar",
        lecciones: [
          { slug: "git-github", title: "Versiona con Git y publica el código en GitHub" },
          { slug: "vercel-preview-produccion", title: "Despliega en Vercel con preview y producción" },
          { slug: "dominio-dns-https", title: "Conecta dominio, DNS y HTTPS" },
          { slug: "monitorizar-mantener-recuperar", title: "Monitoriza, mantén y recupera la web" },
        ],
      },
      {
        title: "IA y experiencias avanzadas",
        lecciones: [
          { slug: "faq-base-conocimiento", title: "Diseña una FAQ y una base de conocimiento fiable" },
          { slug: "chatbot-groq-seguro", title: "Añade un chatbot con Groq sin exponer claves" },
          { slug: "sol-api-y-ultra", title: "Integra Sol y usa Ultra o multiagente con criterio" },
          { slug: "threejs-con-proposito", title: "Añade 3D con Three.js solo cuando aporte valor" },
        ],
      },
      {
        title: "Laboratorios de fallos reales",
        lecciones: [
          { slug: "laboratorio-prompt-vago", title: "Laboratorio: convierte un prompt vago en una especificación" },
          { slug: "laboratorio-ui-generica", title: "Laboratorio: detecta y corrige una interfaz genérica" },
          { slug: "laboratorio-responsive-roto", title: "Laboratorio: reproduce y repara un móvil roto" },
          { slug: "laboratorio-servidores-duplicados", title: "Laboratorio: encuentra servidores locales duplicados" },
          { slug: "laboratorio-build-produccion", title: "Laboratorio: descubre un fallo que solo aparece en producción" },
          { slug: "laboratorio-formulario-rls", title: "Laboratorio: diagnostica un formulario bloqueado por RLS" },
          { slug: "laboratorio-rls-rendimiento", title: "Laboratorio: mide y optimiza una política RLS" },
          { slug: "laboratorio-secretos-expuestos", title: "Laboratorio: localiza y rota un secreto de prueba" },
          { slug: "laboratorio-preview-produccion", title: "Laboratorio: separa preview y producción" },
          { slug: "laboratorio-deuda-tecnica", title: "Laboratorio: rescata código generado difícil de mantener" },
        ],
      },
      {
        title: "Talleres sectoriales y proyecto final",
        lecciones: [
          { slug: "taller-portafolio-estudiante", title: "Taller: portafolio de estudiante" },
          { slug: "taller-restaurante", title: "Taller: web para un restaurante" },
          { slug: "taller-despacho-abogados", title: "Taller: web para un despacho de abogados" },
          { slug: "taller-consultoria-informatica", title: "Taller: web para una consultoría informática" },
          { slug: "taller-app-saas", title: "Taller: landing y aplicación SaaS" },
          { slug: "taller-clinica-estetica", title: "Taller: web para una clínica estética" },
          { slug: "taller-academia-ingles", title: "Taller: web para una academia de inglés" },
          { slug: "taller-meteo-saas-geoespacial", title: "Taller técnico: SaaS geoespacial con mapas, APIs e IA" },
          { slug: "proyecto-final-publicar-mantener", title: "Proyecto final: publica y mantén una web real" },
        ],
      },
    ],
  },
  {
    slug: "codex-programadores",
    title: "Codex para programadores",
    short: "Programa, prueba y entrega cambios con OpenAI Codex",
    desc: "Aprende un flujo profesional con Codex: explorar repositorios, escribir encargos verificables, configurar AGENTS.md, implementar con tests, revisar Git, controlar permisos y automatizar tareas con codex exec.",
    level: "Principiante → avanzado",
    updatedAt: courseCatalogUpdatedAt,
    icon: "laptopCode",
    gradient: ["#10b981", "#0ea5e9"],
    secciones: [
      {
        title: "Preparar el entorno",
        lecciones: [
          { slug: "instalacion", title: "Instala Codex y entiende sus superficies" },
          { slug: "explorar-repositorio", title: "Explora un repositorio sin perderte" },
        ],
      },
      {
        title: "Flujo de desarrollo",
        lecciones: [
          { slug: "pedir-cambios", title: "Pide cambios que se puedan verificar" },
          { slug: "agents-md", title: "Enseña el repositorio con AGENTS.md" },
          { slug: "implementar-verificar", title: "Implementa, prueba y revisa la interfaz" },
          { slug: "git-revision", title: "Trabaja con Git y revisa cambios" },
        ],
      },
      {
        title: "Control y automatización",
        lecciones: [
          { slug: "permisos-seguridad", title: "Controla permisos, red y secretos" },
          { slug: "automatizar-exec", title: "Automatiza tareas con codex exec" },
        ],
      },
      {
        title: "Proyecto final",
        lecciones: [
          { slug: "proyecto-final", title: "Proyecto final: entrega un cambio completo" },
        ],
      },
    ],
  },
  {
    slug: "ai-router",
    title: "AI Router y sistema de contenido",
    short: "Enruta modelos locales y frontier con calidad, coste y privacidad",
    desc: "Diseña un router de IA para elegir entre modelos locales y APIs frontier con LiteLLM, políticas de privacidad, scoring de calidad, shadow mode, observabilidad y revisión humana para contenido educativo.",
    level: "Intermedio → avanzado",
    updatedAt: courseCatalogUpdatedAt,
    icon: "route",
    gradient: ["#f59e0b", "#22c55e"],
    secciones: [
      {
        title: "Arquitectura del router",
        lecciones: [
          { slug: "mapa-router", title: "Mapa de un AI Router útil" },
          { slug: "litellm-gateway", title: "LiteLLM como gateway" },
          { slug: "politicas-routing", title: "Políticas de routing" },
        ],
      },
      {
        title: "Calidad y producción",
        lecciones: [
          { slug: "quality-scoring", title: "Quality scoring sin humo" },
          { slug: "shadow-mode", title: "Shadow mode y comparativas" },
          { slug: "proyecto-content-system", title: "Proyecto: content system para Aulafy" },
        ],
      },
    ],
  },
  {
    slug: "claude-code",
    title: "Claude Code, de 0 a pro",
    short: "Domina la CLI de IA de Anthropic",
    desc: "Aprende a construir software y aplicaciones hablando con la IA en tu terminal: instalación, recetas, proyectos guiados, skills, subagentes, MCP y flujos profesionales.",
    level: "Principiante → avanzado",
    updatedAt: courseCatalogUpdatedAt,
    icon: "terminal",
    gradient: ["#e879f9", "#8b5cf6"],
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
    updatedAt: courseCatalogUpdatedAt,
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
          { slug: "ollama-vllm-sglang-mlx", title: "Ollama, vLLM, SGLang y MLX: qué usar" },
          { slug: "windows-wsl2-vs-mac-m4", title: "Windows/WSL2 vs Mac M4 para IA local" },
          { slug: "homelab-rtx-3090", title: "Homelab IA con RTX 3090 usadas" },
          { slug: "cuantizacion-modelos-coding", title: "Cuantización y modelos para coding" },
          { slug: "agentes-codigo-locales", title: "Agentes de código locales con Ollama" },
          { slug: "hermes-agente-coding-local", title: "Agente coding local con Hermes y Ollama" },
          { slug: "hermes-gemma-mlx-avanzado", title: "Hermes avanzado con Gemma y MLX" },
          { slug: "tool-calling-modelos-locales", title: "Tool calling con modelos locales" },
          { slug: "open-webui-qdrant", title: "Open WebUI + Ollama + Qdrant" },
          { slug: "open-webui-troubleshooting", title: "Open WebUI troubleshooting y producción ligera" },
        ],
      },
      {
        title: "Construye tus herramientas",
        lecciones: [
          { slug: "chatbot-legal", title: "Chatbot que cita la ley (RAG)" },
          { slug: "webapp-tipo-lexia", title: "Web app tipo Lexia con RAG" },
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
    updatedAt: courseCatalogUpdatedAt,
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
    slug: "videojuegos-3d-ia",
    title: "Videojuegos, 3D y simulaciones con IA",
    short: "Godot, Blender, Fable 5 y pipelines 3D",
    desc: "Aprende a crear prototipos 3D, assets, escenas jugables y flujos CAD con Fable 5, Blender, Godot, Unity y validación profesional. Una ruta práctica para pasar de idea a demo jugable sin perder control técnico.",
    level: "Principiante → intermedio",
    updatedAt: courseCatalogUpdatedAt,
    icon: "cube",
    gradient: ["#22c55e", "#0ea5e9"],
    secciones: [
      {
        title: "Fundamentos",
        lecciones: [
          { slug: "introduccion", title: "Fable 5 para videojuegos, 3D y simulaciones" },
          { slug: "setup-blender-godot", title: "Setup Blender, Godot y Fable 5" },
        ],
      },
      {
        title: "Assets y prototipo",
        lecciones: [
          { slug: "assets-3d-ia", title: "Assets 3D con IA: limpiar y exportar" },
          { slug: "npc-llm-local-godot", title: "NPC con LLM local y memoria en Godot" },
          { slug: "prototipo-godot", title: "Primer prototipo 3D en Godot" },
        ],
      },
      {
        title: "CAD y validación",
        lecciones: [
          { slug: "cad-validacion", title: "IA, CAD y validación profesional" },
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
    updatedAt: courseCatalogUpdatedAt,
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
    updatedAt: courseCatalogUpdatedAt,
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
          { slug: "routing-hibrido-litellm", title: "Routing híbrido local/cloud con LiteLLM" },
          { slug: "migrar-cloud-local", title: "Migrar un agente cloud a local" },
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
    updatedAt: courseCatalogUpdatedAt,
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
    desc: "Aprende a convertir tareas repetitivas en sistemas agénticos: subagentes, CLI local-first tipo R, hooks, skills, MCP, GitHub Actions, agentes 24/7, OOM, retries, estado persistente, loops, costes y governance.",
    level: "Intermedio → avanzado",
    updatedAt: courseCatalogUpdatedAt,
    icon: "robot",
    gradient: ["#22d3ee", "#10b981"],
    secciones: [
      {
        title: "Fundamentos",
        lecciones: [
          { slug: "mapa", title: "Mapa real de agentes en 2026" },
          { slug: "subagentes", title: "Subagentes con roles y límites" },
          { slug: "crear-cli-tipo-r", title: "Crear una CLI de agentes tipo R" },
        ],
      },
      {
        title: "Automatizar con control",
        lecciones: [
          { slug: "hooks", title: "Hooks: automatización determinista" },
          { slug: "skills-seguras", title: "Skills seguras y auditables" },
          { slug: "mcp-seguro", title: "MCP sin regalar tus llaves" },
          { slug: "mcp-herramientas-locales", title: "MCP para herramientas locales" },
          { slug: "servidor-mcp-custom", title: "Crear un servidor MCP personalizado" },
        ],
      },
      {
        title: "Del portátil a producción",
        lecciones: [
          { slug: "github-routines", title: "GitHub Actions y routines" },
          { slug: "agente-247", title: "Proyecto: agente 24/7 con bandeja de entrada" },
          { slug: "agentes-247-hardware-real", title: "Agentes 24/7 offline en hardware real" },
        ],
      },
      {
        title: "Fallos de producción",
        lecciones: [
          { slug: "oom-memory", title: "OOM y gestión de memoria" },
          { slug: "retry-idempotencia", title: "Retries, idempotencia y exactly-once" },
          { slug: "estado-recuperacion", title: "Estado persistente y crash recovery" },
          { slug: "loops-costes", title: "Loops infinitos y control de costes" },
          { slug: "multiagentes-locales-loops", title: "Multi-agentes locales, memoria y loops" },
          { slug: "memoria-persistente-compartida", title: "Memoria persistente compartida" },
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
    updatedAt: courseCatalogUpdatedAt,
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
          { slug: "observabilidad-agentes-locales", title: "Observabilidad para agentes locales" },
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
    updatedAt: courseCatalogUpdatedAt,
    icon: "automation",
    gradient: ["#22d3ee", "#e879f9"],
    secciones: [
      {
        title: "Arquitectura base",
        lecciones: [
          { slug: "mapa-stack", title: "Mapa del stack: n8n, Open WebUI y modelos" },
          { slug: "docker-vps", title: "Docker y VPS barato sin liarla" },
          { slug: "stack-docker-ia-local", title: "Docker Compose para stack completo de IA local" },
          { slug: "n8n-windows-wsl", title: "n8n en Windows: Docker, WSL y errores típicos" },
          { slug: "ollama-openwebui", title: "Ollama y Open WebUI como interfaz privada" },
        ],
      },
      {
        title: "Flujos de negocio",
        lecciones: [
          { slug: "rag-n8n-qdrant-ollama", title: "RAG privado con n8n, Qdrant y Ollama" },
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
    updatedAt: courseCatalogUpdatedAt,
    icon: "database",
    gradient: ["#f97316", "#14b8a6"],
    secciones: [
      {
        title: "Fundamentos que importan",
        lecciones: [
          { slug: "mapa-rag", title: "RAG útil: mucho más que chat con PDF" },
          { slug: "ingesta-chunking", title: "Ingesta, limpieza y chunking" },
          { slug: "chunking-avanzado", title: "Chunking avanzado para RAG privado" },
          { slug: "graphrag-local", title: "GraphRAG local y memoria con grafos" },
          { slug: "ocr-tablas", title: "OCR y tablas en PDFs reales" },
        ],
      },
      {
        title: "Recuperar mejor",
        lecciones: [
          { slug: "embeddings-vector-db", title: "Embeddings y bases vectoriales" },
          { slug: "hybrid-reranking", title: "Búsqueda híbrida y reranking" },
          { slug: "qdrant-permisos", title: "Qdrant multiusuario y permisos" },
          { slug: "obsidian-segundo-cerebro", title: "Segundo cerebro local con Obsidian y RAG" },
        ],
      },
      {
        title: "Seguridad y producción",
        lecciones: [
          { slug: "prompt-injection", title: "Prompt injection en RAG" },
          { slug: "debugging-grounding", title: "Debugging RAG: grounding y prompt completo" },
          { slug: "respuestas-estructuradas-citas", title: "Respuestas estructuradas con citas" },
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
    desc: "Aprende a aplicar IA en tareas reales de negocio: diagnostica un piloto, conviértelo en un flujo fiable, prueba sus fallos y opera con control antes de automatizar emails, facturas, presupuestos o atención.",
    level: "Principiante → intermedio",
    updatedAt: courseCatalogUpdatedAt,
    icon: "briefcase",
    gradient: ["#22d3ee", "#8b5cf6"],
    resources: [
      {
        href: "/recursos/ia-pymes/diagnostico-piloto-ia-pymes.md",
        label: "Plantilla de diagnóstico y piloto",
        format: "MD",
      },
      {
        href: "/recursos/ia-pymes/kit-flujo-fiable-pyme.md",
        label: "Kit: del piloto al flujo fiable",
        format: "MD",
      },
    ],
    secciones: [
      {
        title: "Antes de automatizar",
        lecciones: [
          { slug: "mapa", title: "Mapa de IA útil para una pyme" },
          { slug: "diagnostico-piloto", title: "Diagnóstico y primer piloto de IA para una pyme" },
          { slug: "rgpd-basico", title: "RGPD básico para usar IA sin sustos" },
        ],
      },
      {
        title: "Del piloto al flujo fiable",
        lecciones: [
          { slug: "flujo-fiable", title: "De piloto a flujo fiable: esquema, fuentes, abstención y validación" },
          { slug: "pruebas-metricas", title: "Pruebas de fallo y métricas antes de automatizar" },
          { slug: "operacion-minima", title: "Operación mínima: logs, responsable, copias y modo degradado" },
          { slug: "permisos-agentes", title: "Permisos y agentes: automatiza solo cuando el flujo esté listo" },
        ],
      },
      {
        title: "Flujos de oficina",
        lecciones: [
          { slug: "emails", title: "Emails: clasificar y crear borradores" },
          { slug: "facturas", title: "Facturas: extraer datos y revisar" },
          { slug: "facturas-verifactu-ocr", title: "Facturas, OCR y Verifactu con revisión humana" },
          { slug: "presupuestos-excel", title: "Presupuestos, Excel y Sheets" },
          { slug: "whatsapp-atencion", title: "WhatsApp y Telegram con aprobación humana" },
          { slug: "aeo-pymes", title: "AEO para pymes: aparecer en respuestas de IA" },
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
