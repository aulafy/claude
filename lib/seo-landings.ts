import type { IconName } from "@/components/Icon";

export type SeoLanding = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  icon: IconName;
  primaryHref: string;
  primaryLabel: string;
  audience: string;
  promise: string;
  sections: Array<{
    title: string;
    body: string;
    bullets: string[];
  }>;
  examples: string[];
  related: Array<{ title: string; href: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
};

export const seoLandings: SeoLanding[] = [
  {
    slug: "curso-claude-code-espanol",
    title: "Curso Claude Code en español gratis",
    h1: "Curso Claude Code en español gratis: de cero a proyectos reales",
    description:
      "Aprende Claude Code en español con instalación, comandos, prompts, MCP, hooks, skills, subagentes y proyectos prácticos. Curso gratis y sin registro.",
    keywords: [
      "curso Claude Code español",
      "Claude Code gratis",
      "tutorial Claude Code español",
      "Claude Code MCP",
      "Claude Code subagentes",
    ],
    icon: "terminal",
    primaryHref: "/cursos/claude-code",
    primaryLabel: "Entrar al curso de Claude Code",
    audience:
      "Para personas que quieren usar Claude Code como asistente de programación, automatización y construcción de aplicaciones sin perder control del proyecto.",
    promise:
      "La ruta empieza por instalación y primeros pasos, y termina con flujos profesionales: contexto, permisos, MCP, hooks, skills, subagentes y proyectos guiados.",
    sections: [
      {
        title: "Qué vas a aprender",
        body:
          "Claude Code no es solo un chat dentro del terminal. Bien usado, puede leer el contexto de un proyecto, proponer cambios, ejecutar tareas, ayudarte a depurar y convertir instrucciones en software funcionando. El curso está ordenado para evitar el caos habitual: primero seguridad y entorno, luego prompts claros, después recetas y por último automatizaciones más potentes.",
        bullets: [
          "Instalar Claude Code en macOS, Linux y Windows con comprobaciones simples.",
          "Escribir prompts que indiquen objetivo, restricciones, archivos y criterios de aceptación.",
          "Usar MCP, hooks, permisos y subagentes sin abrir más acceso del necesario.",
          "Construir proyectos guiados y revisar los cambios antes de aceptarlos.",
        ],
      },
      {
        title: "Por qué esta ruta es distinta",
        body:
          "Muchas guías se quedan en comandos sueltos. Aulafy lo trata como una habilidad de trabajo: cómo pedir, cómo verificar, cómo leer diffs, cómo mantener costes bajo control y cómo crear pequeñas rutinas que ahorran tiempo sin convertir el proyecto en una caja negra.",
        bullets: [
          "Lecciones cortas con salida práctica.",
          "Ejemplos pensados para proyectos reales, no demos vacías.",
          "Enfoque local-first cuando se mezclan Claude Code, Ollama y herramientas abiertas.",
        ],
      },
    ],
    examples: [
      "Crear una landing en Next.js con requisitos de diseño y verificación.",
      "Refactorizar un componente sin romper estilos ni rutas existentes.",
      "Preparar un MCP con permisos mínimos para consultar documentación.",
      "Diseñar un subagente de revisión que busque bugs antes de publicar.",
    ],
    related: [
      { title: "Instalación", href: "/cursos/claude-code/instalacion", desc: "Configura Claude Code y comprueba que funciona." },
      { title: "Prompts", href: "/cursos/claude-code/prompts", desc: "Aprende a pedir cambios verificables." },
      { title: "MCP", href: "/cursos/claude-code/mcp", desc: "Conecta herramientas externas con control." },
    ],
    faqs: [
      { q: "¿El curso es gratis?", a: "Sí. No hay registro, newsletter obligatoria ni muro de pago." },
      { q: "¿Necesito saber programar?", a: "Ayuda tener nociones básicas, pero la ruta empieza desde instalación y primeros pasos." },
      { q: "¿Incluye MCP y subagentes?", a: "Sí. Hay lecciones específicas de MCP, hooks, skills, permisos y subagentes." },
    ],
  },
  {
    slug: "curso-ia-local-ollama",
    title: "Curso IA local con Ollama en español",
    h1: "Curso de IA local con Ollama, LM Studio y Open WebUI",
    description:
      "Aprende IA local en español: Ollama, LM Studio, modelos GGUF, cuantización, Open WebUI, Qdrant, RAG privado y publicación de apps.",
    keywords: ["curso IA local", "Ollama español", "Open WebUI Ollama", "LM Studio español", "modelos locales"],
    icon: "brain",
    primaryHref: "/cursos/ia-local",
    primaryLabel: "Entrar al curso de IA local",
    audience:
      "Para quienes quieren usar modelos abiertos en su propio ordenador o servidor, con más privacidad, menos dependencia de cuotas y una base práctica para crear herramientas.",
    promise:
      "Aprenderás a elegir modelos, ejecutarlos con Ollama o LM Studio, conectar interfaces como Open WebUI y construir flujos con documentos, voz y apps pequeñas.",
    sections: [
      {
        title: "IA local sin humo",
        body:
          "La IA local no consiste en instalar un modelo enorme y esperar milagros. Hay que entender memoria, cuantización, contexto, velocidad, privacidad y límites. El curso baja eso a decisiones concretas: qué modelo elegir, cuándo usar Q4 o Q8, cuándo compensa un servidor y cuándo basta un portátil.",
        bullets: [
          "Instalar Ollama y probar modelos abiertos.",
          "Comparar LM Studio, Ollama y Open WebUI según el caso.",
          "Entender GGUF, cuantización y requisitos de hardware.",
          "Usar Qdrant y RAG para consultar documentos privados.",
        ],
      },
      {
        title: "Privacidad y utilidad real",
        body:
          "El enfoque es local-first: usar la nube solo cuando tenga sentido. Para una pyme, un docente o un autónomo, esto permite experimentar con documentos internos, facturas, manuales o bases de conocimiento sin enviar todo a servicios externos desde el primer día.",
        bullets: [
          "Chatbots con documentos propios.",
          "Herramientas de estudio y oficina.",
          "Apps publicables con límites claros.",
        ],
      },
    ],
    examples: [
      "Elegir un modelo para un Mac, un PC con RTX o un servidor barato.",
      "Crear un chatbot local con Open WebUI, Ollama y Qdrant.",
      "Convertir un conjunto de PDF en una base consultable.",
      "Publicar una miniapp de IA con controles de coste.",
    ],
    related: [
      { title: "Ollama desde cero", href: "/cursos/ia-local/ollama-desde-cero", desc: "Instala y prueba modelos locales." },
      { title: "Open WebUI + Qdrant", href: "/cursos/ia-local/open-webui-qdrant", desc: "Monta interfaz y base vectorial." },
      { title: "Hardware 2026", href: "/cursos/ia-local/hardware-minimo-2026", desc: "Elige equipo con cabeza." },
    ],
    faqs: [
      { q: "¿Necesito una GPU potente?", a: "No siempre. Depende del modelo, cuantización y objetivo. El curso explica opciones para portátil, Mac y PC con GPU." },
      { q: "¿Ollama es suficiente?", a: "Para empezar, sí. Luego puedes sumar Open WebUI, Qdrant, vLLM o llama.cpp según la carga." },
      { q: "¿Sirve para empresas?", a: "Sí, especialmente para prototipos privados, documentación interna y flujos con revisión humana." },
    ],
  },
  {
    slug: "curso-rag-pdf-ia",
    title: "Curso RAG con PDF y documentos privados",
    h1: "Curso RAG con PDF, citaciones y documentos privados",
    description:
      "Aprende RAG avanzado y seguro en español: chunking, embeddings, Qdrant, búsqueda híbrida, reranking, citaciones, permisos, evals y prompt injection.",
    keywords: ["curso RAG español", "RAG PDF", "chatbot documentos privados", "RAG con citas", "Qdrant español"],
    icon: "database",
    primaryHref: "/cursos/rag-seguro",
    primaryLabel: "Entrar al curso de RAG seguro",
    audience:
      "Para personas que necesitan que una IA responda sobre documentos reales con trazabilidad: leyes, manuales, contratos, políticas internas, apuntes o bases de conocimiento.",
    promise:
      "Pasarás de subir PDF sin control a diseñar un sistema RAG con ingesta, recuperación, citaciones, permisos, evaluación y defensa frente a instrucciones maliciosas dentro de los documentos.",
    sections: [
      {
        title: "El problema real del RAG",
        body:
          "Un chatbot con PDF puede parecer fácil hasta que falla: inventa citas, ignora tablas, mezcla permisos o responde a instrucciones ocultas dentro de un documento. Por eso el curso separa las piezas: extracción, limpieza, chunking, embeddings, búsqueda, reranking, generación y evaluación.",
        bullets: [
          "Preparar documentos con OCR, tablas y metadatos.",
          "Diseñar chunks que recuperen contexto útil.",
          "Añadir búsqueda híbrida y reranking.",
          "Medir si las respuestas citan fuentes correctas.",
        ],
      },
      {
        title: "Seguridad y confianza",
        body:
          "RAG no es solo una técnica de recuperación; es una frontera de seguridad. Si los documentos contienen instrucciones, datos sensibles o permisos distintos por usuario, el sistema tiene que separar acceso, registrar evidencias y rechazar respuestas no sustentadas.",
        bullets: [
          "Permisos por colección o documento.",
          "Defensa contra prompt injection documental.",
          "Evals de citación, cobertura y alucinación.",
        ],
      },
    ],
    examples: [
      "Chatbot de políticas internas con citas verificables.",
      "Asistente legal que diferencia fuente, resumen y recomendación.",
      "Buscador híbrido sobre PDF escaneados y documentos largos.",
      "Panel de evaluación para detectar respuestas sin evidencia.",
    ],
    related: [
      { title: "Mapa RAG", href: "/cursos/rag-seguro/mapa-rag", desc: "Entiende todas las piezas." },
      { title: "OCR y tablas", href: "/cursos/rag-seguro/ocr-tablas", desc: "Prepara documentos difíciles." },
      { title: "Prompt injection", href: "/cursos/rag-seguro/prompt-injection", desc: "Protege el sistema." },
    ],
    faqs: [
      { q: "¿RAG elimina las alucinaciones?", a: "No por sí solo. Reduce el riesgo si hay recuperación, citaciones, restricciones y evaluación." },
      { q: "¿Se puede hacer local?", a: "Sí. Puedes combinar Ollama, modelos de embeddings y Qdrant para prototipos privados." },
      { q: "¿Incluye evaluación?", a: "Sí. Hay lecciones sobre métricas, citaciones y pruebas de calidad." },
    ],
  },
  {
    slug: "curso-agentes-ia-espanol",
    title: "Curso agentes de IA en español",
    h1: "Curso de agentes de IA en español: LangGraph, n8n, MCP y control",
    description:
      "Aprende a diseñar agentes de IA útiles y seguros con subagentes, MCP, hooks, LangGraph, n8n, memoria, retries, estado, logs y revisión humana.",
    keywords: ["curso agentes IA", "LangGraph español", "n8n IA", "MCP agentes", "automatización agentes IA"],
    icon: "robot",
    primaryHref: "/cursos/agentes-automatizacion",
    primaryLabel: "Entrar al curso de agentes",
    audience:
      "Para quienes quieren pasar de prompts sueltos a sistemas que ejecutan tareas con herramientas, memoria, estado, límites y supervisión humana.",
    promise:
      "Aprenderás a diferenciar automatización determinista, workflows y agentes; a diseñar permisos; y a evitar loops, costes fuera de control y errores repetidos.",
    sections: [
      {
        title: "Agentes que no se rompen al primer día",
        body:
          "Un agente útil no es un bot con una lista enorme de herramientas. Necesita objetivo, estado, reglas de parada, logs, permisos mínimos, recuperación ante fallos y revisión humana cuando una acción tiene impacto real.",
        bullets: [
          "Diseñar subagentes con roles estrechos.",
          "Usar MCP sin entregar acceso ilimitado.",
          "Separar workflows de n8n y razonamiento con LangGraph.",
          "Controlar retries, idempotencia, loops y memoria.",
        ],
      },
      {
        title: "Producción antes que demo",
        body:
          "El curso insiste en los detalles que las demos suelen ocultar: qué pasa si el agente repite una acción, cómo se recupera de un corte, dónde guarda estado, cuándo pide aprobación y cómo se audita una decisión.",
        bullets: [
          "Agentes 24/7 con bandeja de entrada.",
          "Aprobaciones humanas para acciones sensibles.",
          "Evals y observabilidad desde el principio.",
        ],
      },
    ],
    examples: [
      "Agente que clasifica emails y propone respuestas sin enviarlas automáticamente.",
      "Workflow n8n que llama a un modelo local y pide aprobación.",
      "Subagente de revisión técnica antes de publicar código.",
      "Rutina con estado persistente y recuperación tras fallo.",
    ],
    related: [
      { title: "Mapa de agentes", href: "/cursos/agentes-automatizacion/mapa", desc: "Qué es agente y qué no." },
      { title: "LangGraph vs n8n", href: "/cursos/agentes-produccion/langgraph-vs-crewai-n8n", desc: "Elige framework." },
      { title: "Retries e idempotencia", href: "/cursos/agentes-automatizacion/retry-idempotencia", desc: "Evita acciones duplicadas." },
    ],
    faqs: [
      { q: "¿LangGraph o n8n?", a: "LangGraph encaja bien para estado y decisiones; n8n encaja muy bien como capa de integración y automatización." },
      { q: "¿Un agente puede funcionar 24/7?", a: "Sí, pero necesita colas, límites, logs, estado persistente y reglas de parada." },
      { q: "¿Hace falta programar?", a: "Para producción ayuda. El curso combina conceptos no-code, low-code y código cuando aporta control." },
    ],
  },
  {
    slug: "ia-para-pymes",
    title: "IA para pymes y autónomos",
    h1: "IA para pymes y autónomos: casos prácticos, RGPD y automatización",
    description:
      "Aprende IA para pymes en español con ejemplos prácticos: emails, facturas, presupuestos, Excel, WhatsApp, RGPD básico y flujos revisables.",
    keywords: ["IA para pymes", "IA autónomos", "automatización pymes IA", "RGPD IA pymes", "IA oficina"],
    icon: "briefcase",
    primaryHref: "/cursos/ia-pymes",
    primaryLabel: "Entrar al curso de IA para pymes",
    audience:
      "Para autónomos, pequeñas empresas y equipos que quieren ahorrar tiempo en tareas repetitivas sin montar una infraestructura compleja ni regalar datos sensibles.",
    promise:
      "La ruta se centra en tareas reales: redactar emails, revisar facturas, preparar presupuestos, trabajar con hojas de cálculo, atender consultas y aplicar mínimos de privacidad.",
    sections: [
      {
        title: "Casos de uso con retorno rápido",
        body:
          "La IA en una pyme no empieza por un gran proyecto, sino por pequeñas tareas repetidas: resumir correos, convertir facturas en datos, preparar presupuestos, clasificar mensajes o revisar textos antes de enviarlos.",
        bullets: [
          "Emails comerciales y respuestas a clientes.",
          "Facturas, presupuestos y hojas de cálculo.",
          "Atención por WhatsApp con revisión humana.",
          "Políticas internas y RGPD básico.",
        ],
      },
      {
        title: "Control antes que automatización ciega",
        body:
          "Automatizar no significa dejar que la IA haga cualquier cosa. Aulafy propone flujos revisables: la IA prepara, clasifica o sugiere; la persona aprueba cuando hay impacto legal, económico o reputacional.",
        bullets: [
          "Plantillas reutilizables.",
          "Datos mínimos necesarios.",
          "Registro de decisiones y revisión.",
        ],
      },
    ],
    examples: [
      "Responder emails frecuentes manteniendo tono de marca.",
      "Extraer datos de facturas para una hoja de cálculo.",
      "Preparar presupuestos con explicación clara para el cliente.",
      "Crear una base de conocimiento interna consultable.",
    ],
    related: [
      { title: "Mapa IA pymes", href: "/cursos/ia-pymes/mapa", desc: "Prioriza casos de uso." },
      { title: "Facturas", href: "/cursos/ia-pymes/facturas", desc: "Extrae datos y revisa errores." },
      { title: "RGPD básico", href: "/cursos/ia-pymes/rgpd-basico", desc: "Reduce riesgos desde el inicio." },
    ],
    faqs: [
      { q: "¿Puedo usar IA con datos de clientes?", a: "Depende del caso, proveedor y base legal. El curso enseña mínimos prácticos y cuándo pedir asesoramiento profesional." },
      { q: "¿Hace falta contratar una herramienta cara?", a: "No para empezar. Muchas pruebas pueden hacerse con herramientas locales o planes básicos." },
      { q: "¿Qué automatizo primero?", a: "Lo repetitivo, frecuente, de bajo riesgo y fácil de revisar." },
    ],
  },
  {
    slug: "automatizacion-ia-n8n-ollama",
    title: "Automatización IA con n8n, Ollama y Open WebUI",
    h1: "Automatización IA self-hosted con n8n, Ollama y Open WebUI",
    description:
      "Monta automatizaciones de IA privadas con n8n, Ollama, Open WebUI, webhooks, Docker, VPS, aprobaciones humanas, colas, backups y monitorización.",
    keywords: ["n8n Ollama", "automatización IA self-hosted", "Open WebUI n8n", "n8n IA español", "automatización IA pymes"],
    icon: "automation",
    primaryHref: "/cursos/automatizacion-self-hosted",
    primaryLabel: "Entrar al curso de automatización",
    audience:
      "Para perfiles técnicos, makers y pymes que quieren una plataforma propia de automatización con IA, sin depender de una cadena opaca de herramientas SaaS.",
    promise:
      "Aprenderás a montar una base práctica con Docker, VPS, n8n, Open WebUI, Ollama o vLLM, webhooks, credenciales, aprobaciones y monitorización básica.",
    sections: [
      {
        title: "Stack privado y mantenible",
        body:
          "Self-hosted no significa instalar diez servicios y abandonarlos. La idea es empezar con un stack pequeño, documentado y recuperable: contenedores, variables, backups, credenciales y límites claros.",
        bullets: [
          "Docker y VPS barato con configuración entendible.",
          "n8n para webhooks, integraciones y tareas programadas.",
          "Ollama u Open WebUI para capa de modelo e interfaz.",
          "Aprobaciones humanas antes de enviar emails, modificar datos o actuar en producción.",
        ],
      },
      {
        title: "Automatizaciones que sobreviven",
        body:
          "Una automatización útil necesita control de errores, colas, reintentos, logs y recuperación. El curso evita la trampa de una demo que funciona una vez y se rompe cuando llega el primer dato raro.",
        bullets: [
          "Colas y reintentos para tareas frágiles.",
          "Backups y monitorización mínima.",
          "Separación de pruebas, credenciales y producción.",
        ],
      },
    ],
    examples: [
      "Soporte interno para una pyme con base de conocimiento.",
      "Webhook que resume formularios y crea tareas revisables.",
      "Clasificador de emails con aprobación antes de responder.",
      "Panel básico de logs y errores para flujos IA.",
    ],
    related: [
      { title: "Mapa del stack", href: "/cursos/automatizacion-self-hosted/mapa-stack", desc: "Piezas y límites." },
      { title: "Docker y VPS", href: "/cursos/automatizacion-self-hosted/docker-vps", desc: "Despliega sin complicarlo." },
      { title: "n8n webhooks", href: "/cursos/automatizacion-self-hosted/n8n-webhooks", desc: "Conecta tareas reales." },
    ],
    faqs: [
      { q: "¿Self-hosted es más barato?", a: "Puede serlo, pero exige mantenimiento. El curso muestra una base pequeña y realista." },
      { q: "¿Ollama sirve para automatización?", a: "Sí, especialmente para clasificación, extracción, borradores y tareas internas con límites claros." },
      { q: "¿Necesito Kubernetes?", a: "No para empezar. Docker, backups y monitorización simple suelen ser mejor primera fase." },
    ],
  },
];

export function getSeoLanding(slug: string) {
  return seoLandings.find((landing) => landing.slug === slug);
}
