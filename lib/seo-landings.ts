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
  {
    slug: "alternativa-claude-code-local-ollama",
    title: "Alternativa local a Claude Code con Ollama",
    h1: "Alternativa local a Claude Code con Ollama: agentes de código privados",
    description:
      "Aprende a montar un flujo de agente de código local con Ollama, modelos abiertos, contexto suficiente y verificación antes de tocar proyectos reales.",
    keywords: ["claude code local ollama", "alternativa Claude Code open source", "agente de código local", "Ollama coding agent"],
    icon: "terminal",
    primaryHref: "/cursos/ia-local/agentes-codigo-locales",
    primaryLabel: "Ver la lección práctica",
    audience:
      "Para desarrolladores, makers y pymes que quieren reducir costes de suscripción, mantener código privado y usar modelos locales para tareas acotadas de programación.",
    promise:
      "Aprenderás cuándo compensa un agente local, cómo preparar Ollama, cómo cuidar el contexto y cómo verificar cambios con lint, tests y build.",
    sections: [
      {
        title: "Local no significa mágico",
        body:
          "Un modelo local puede ayudarte a explicar código, generar tests o preparar cambios pequeños, pero necesita límites claros. La clave es no compararlo solo por potencia bruta, sino por privacidad, coste, trazabilidad y control de permisos.",
        bullets: [
          "Elegir tareas pequeñas y verificables.",
          "Configurar contexto suficiente para proyectos multiarchivo.",
          "Separar propuesta de cambios y verificación.",
        ],
      },
      {
        title: "Flujo recomendado",
        body:
          "El patrón sano es pedir plan, crear rama, aplicar cambios, ejecutar comprobaciones y revisar diff. Si el agente no puede pasar esos pasos, no debería tocar código de producción.",
        bullets: [
          "Rama aislada para cada tarea.",
          "Comandos de verificación definidos antes de empezar.",
          "Sin secretos ni datos de clientes en prompts o logs.",
        ],
      },
    ],
    examples: [
      "Generar tests para una función TypeScript.",
      "Refactorizar un componente pequeño y correr build.",
      "Crear un script interno sin enviar código a la nube.",
      "Guardar un TASK.md para evitar pérdida de contexto.",
    ],
    related: [
      { title: "Agentes de código locales", href: "/cursos/ia-local/agentes-codigo-locales", desc: "La lección paso a paso." },
      { title: "Hardware IA local", href: "/cursos/ia-local/hardware-minimo-2026", desc: "VRAM, RAM y expectativas reales." },
      { title: "Ollama desde cero", href: "/cursos/ia-local/ollama-desde-cero", desc: "Instala y prueba modelos." },
    ],
    faqs: [
      { q: "¿Sustituye a Claude Code?", a: "No en todos los casos. Es una alternativa privada y barata para tareas acotadas, con verificación obligatoria." },
      { q: "¿Sirve en Windows?", a: "Sí, pero la experiencia depende de GPU, drivers, modelo y contexto disponible." },
      { q: "¿Qué es lo más importante?", a: "No el modelo: el flujo de contexto, permisos y verificación." },
    ],
  },
  {
    slug: "n8n-self-hosted-docker-windows-ia",
    title: "n8n self-hosted en Windows con Docker y WSL",
    h1: "n8n self-hosted en Windows: Docker, WSL y automatizaciones IA",
    description:
      "Instala n8n self-hosted en Windows con Docker Desktop y WSL, diagnostica errores típicos y prepara workflows IA con Ollama y webhooks.",
    keywords: ["n8n self hosted docker windows ia", "n8n windows wsl", "n8n docker errores", "n8n ollama tutorial"],
    icon: "automation",
    primaryHref: "/cursos/automatizacion-self-hosted/n8n-windows-wsl",
    primaryLabel: "Ver guía Windows/WSL",
    audience:
      "Para usuarios de Windows que quieren automatizar con n8n e IA local, pero se atascan antes de llegar al primer workflow por Docker, WSL o puertos.",
    promise:
      "Aprenderás a validar Docker, levantar n8n con volumen persistente y diagnosticar errores antes de conectar modelos o bots.",
    sections: [
      {
        title: "El problema real",
        body:
          "La mayoría de fallos iniciales no son de n8n: son virtualización desactivada, Docker sin backend WSL 2, puertos ocupados o volúmenes mal montados.",
        bullets: [
          "Comprobar WSL y Docker antes de crear workflows.",
          "Usar un docker-compose mínimo y repetible.",
          "Separar pruebas locales de despliegue público con HTTPS.",
        ],
      },
      {
        title: "Después llega la IA",
        body:
          "Cuando n8n ya arranca estable, puedes añadir Ollama, Open WebUI, Qdrant, Telegram o webhooks. Antes, cualquier flujo complejo solo es ruido.",
        bullets: [
          "Webhook de prueba antes del agente.",
          "Credenciales y secrets ordenados.",
          "Logs y backups desde el primer día.",
        ],
      },
    ],
    examples: [
      "Levantar n8n local en Windows.",
      "Detectar puerto ocupado y Docker caído.",
      "Crear un webhook de prueba.",
      "Preparar base para un agente con Ollama.",
    ],
    related: [
      { title: "n8n Windows y WSL", href: "/cursos/automatizacion-self-hosted/n8n-windows-wsl", desc: "Diagnóstico paso a paso." },
      { title: "Docker y VPS", href: "/cursos/automatizacion-self-hosted/docker-vps", desc: "Base self-hosted." },
      { title: "n8n webhooks", href: "/cursos/automatizacion-self-hosted/n8n-webhooks", desc: "Conecta tareas reales." },
    ],
    faqs: [
      { q: "¿Puedo usarlo sin Linux?", a: "Sí, pero Docker Desktop en Windows usa WSL 2 por debajo para una experiencia estable." },
      { q: "¿Sirve para producción?", a: "La guía arranca local. Para producción necesitas HTTPS, backups, credenciales y hardening." },
      { q: "¿Por dónde empiezo?", a: "Por `docker run hello-world`. Si eso falla, arregla Docker antes de n8n." },
    ],
  },
  {
    slug: "langgraph-error-recovery-agentes",
    title: "LangGraph error recovery para agentes IA",
    h1: "LangGraph error recovery: evita spirals, retries infinitos y fallos 503",
    description:
      "Aprende patrones de recuperación para agentes IA: clasificación de errores, retries con backoff, timeouts, estado persistente y revisión humana.",
    keywords: ["langgraph error recovery agent", "agent 503 retry backoff", "agente IA loop infinito", "LangGraph retries"],
    icon: "network",
    primaryHref: "/cursos/agentes-produccion/recuperacion-errores",
    primaryLabel: "Ver recuperación de errores",
    audience:
      "Para equipos que quieren pasar de demos de agentes a flujos que sobreviven APIs caídas, rate limits y acciones fallidas.",
    promise:
      "Aprenderás a distinguir fallos transitorios, errores recuperables por el modelo, errores de usuario y fallos definitivos.",
    sections: [
      {
        title: "No todos los fallos son iguales",
        body:
          "Un 503 no merece el mismo tratamiento que una credencial inválida. Clasificar errores permite reintentar solo cuando tiene sentido.",
        bullets: [
          "Retries con backoff y jitter.",
          "Timeout por herramienta.",
          "Escalado humano si se agotan intentos.",
        ],
      },
      {
        title: "Estado para continuar",
        body:
          "La recuperación exige saber qué pasó antes: intento actual, última herramienta, error, fallback y próximo paso.",
        bullets: [
          "Estado persistente por task_id.",
          "Resumen de fallo y decisión.",
          "Bloqueo de acciones irreversibles sin aprobación.",
        ],
      },
    ],
    examples: [
      "API que devuelve 503 dos veces y luego responde.",
      "Agente de investigación que usa caché como fallback.",
      "Email que queda pendiente de aprobación tras fallo parcial.",
      "Reporte de error con logs útiles, no drama.",
    ],
    related: [
      { title: "Recuperación de errores", href: "/cursos/agentes-produccion/recuperacion-errores", desc: "Patrones prácticos." },
      { title: "Estado y memoria", href: "/cursos/agentes-produccion/estado-memoria", desc: "No pierdas el hilo." },
      { title: "Evals y logs", href: "/cursos/agentes-produccion/evals-logs", desc: "Observabilidad mínima." },
    ],
    faqs: [
      { q: "¿Un retry arregla todo?", a: "No. Solo errores transitorios. Otros fallos requieren corrección, aprobación o parada." },
      { q: "¿Por qué entran en loop?", a: "Porque no tienen criterio de salida, estado persistente o clasificación de errores." },
      { q: "¿Dónde pongo revisión humana?", a: "En acciones irreversibles o cuando el agente agota recuperación." },
    ],
  },
  {
    slug: "mcp-server-verificacion-agentes",
    title: "MCP server de verificación para agentes",
    h1: "MCP server de verificación: edita, prueba y solo después merge",
    description:
      "Diseña un workflow MCP para que un agente edite código y otro proceso verifique dependencias, tests, build y logs antes de merge.",
    keywords: ["mcp server claude code local ollama", "mcp verify workflow", "github mcp agent code", "MCP seguridad"],
    icon: "plug",
    primaryHref: "/cursos/agentes-automatizacion/mcp-verificacion",
    primaryLabel: "Ver MCP de verificación",
    audience:
      "Para desarrolladores y equipos que quieren usar agentes de código sin aceptar cambios no probados en el repositorio.",
    promise:
      "Aprenderás a separar agente editor, servidor GitHub, verificador en sandbox y aprobación final.",
    sections: [
      {
        title: "El patrón que falta",
        body:
          "Muchos agentes editan código pero no verifican desde cero. Un MCP de verificación convierte esa debilidad en un flujo auditable.",
        bullets: [
          "Clone limpio.",
          "Install, lint, tests y build.",
          "Logs y exit code adjuntos al PR.",
        ],
      },
      {
        title: "Permisos mínimos",
        body:
          "El verificador no necesita escribir en producción. Necesita leer, ejecutar en entorno controlado y devolver evidencias.",
        bullets: [
          "Sin force push.",
          "Sin secrets reales si no hacen falta.",
          "Merge solo con verificación verde.",
        ],
      },
    ],
    examples: [
      "PR automático con resumen de cambios.",
      "Verificador que falla por test roto.",
      "Logs adjuntos para revisión humana.",
      "Bloqueo de merge si build no pasa.",
    ],
    related: [
      { title: "MCP de verificación", href: "/cursos/agentes-automatizacion/mcp-verificacion", desc: "Workflow completo." },
      { title: "MCP seguro", href: "/cursos/agentes-automatizacion/mcp-seguro", desc: "Permisos y límites." },
      { title: "Governance MCP", href: "/cursos/agentes-automatizacion/mcp-governance", desc: "Catálogo fiable." },
    ],
    faqs: [
      { q: "¿MCP es seguro por defecto?", a: "No. Depende de permisos, servidores, aislamiento y revisión." },
      { q: "¿Hace falta GitHub?", a: "No, pero GitHub facilita ramas, PRs y checks. El patrón sirve para otros repos." },
      { q: "¿Quién decide el merge?", a: "Una policy o una persona. El agente aporta evidencia, no autoridad absoluta." },
    ],
  },
  {
    slug: "rag-alucinaciones-grounding-prompt",
    title: "RAG alucina aunque recupera bien: grounding y prompt completo",
    h1: "RAG alucina aunque recupera bien: cómo arreglar grounding y prompt",
    description:
      "Depura un sistema RAG que recupera documentos correctos pero responde mal: logging del prompt completo, grounding estricto, citas y tests.",
    keywords: ["rag alucinaciones fix grounding prompt", "debug rag full prompt logging", "RAG recupera bien pero alucina", "grounding RAG"],
    icon: "database",
    primaryHref: "/cursos/rag-seguro/debugging-grounding",
    primaryLabel: "Ver debugging RAG",
    audience:
      "Para equipos que ya tienen búsqueda vectorial funcionando, pero no confían en las respuestas del modelo.",
    promise:
      "Aprenderás a separar fallo de retrieval y fallo de generación, guardar trazas y obligar al modelo a responder solo con evidencia.",
    sections: [
      {
        title: "Retrieval no es respuesta",
        body:
          "Que el chunk correcto aparezca no garantiza que el modelo lo use bien. Hay que revisar el prompt final y las reglas de abstención.",
        bullets: [
          "Log de query, filtros y chunks.",
          "Prompt final completo.",
          "Citas verificables por afirmación.",
        ],
      },
      {
        title: "Grounding estricto",
        body:
          "El sistema debe decir no lo sé cuando el dato no está en documentos, aunque el modelo tenga conocimiento general.",
        bullets: [
          "Temperatura baja.",
          "Instrucción de no usar conocimiento externo.",
          "Tests con preguntas sin respuesta.",
        ],
      },
    ],
    examples: [
      "Pregunta con respuesta exacta en PDF.",
      "Pregunta sin evidencia que debe abstenerse.",
      "Documento con prompt injection.",
      "Cita que no respalda la frase y debe fallar.",
    ],
    related: [
      { title: "Debugging RAG", href: "/cursos/rag-seguro/debugging-grounding", desc: "Trazas y grounding." },
      { title: "Evals RAG", href: "/cursos/rag-seguro/evals-metricas", desc: "Mide calidad." },
      { title: "Citaciones", href: "/cursos/rag-seguro/evals-citaciones", desc: "Comprueba evidencia." },
    ],
    faqs: [
      { q: "¿Por qué alucina si recupera bien?", a: "Porque generación y recuperación son fases distintas. El modelo puede ignorar o completar mal el contexto." },
      { q: "¿Bajar temperatura basta?", a: "Ayuda, pero necesitas prompt, citas, trazas y tests." },
      { q: "¿Qué log es imprescindible?", a: "Query, chunks, filtros, prompt final, parámetros, respuesta y citas." },
    ],
  },
  {
    slug: "vllm-oom-vram-ollama-llamacpp",
    title: "vLLM OOM y VRAM: cuándo usar Ollama o llama.cpp",
    h1: "vLLM OOM y VRAM: cuándo usar Ollama, llama.cpp o vLLM",
    description:
      "Diagnostica CUDA OOM, contexto, KV cache y límites de VRAM en IA local. Aprende cuándo usar vLLM, Ollama o llama.cpp.",
    keywords: ["vllm cuda oom single gpu solución", "ollama rtx 3090 oom error fix 2026", "vLLM vs Ollama VRAM"],
    icon: "server",
    primaryHref: "/cursos/mlops-local/vram-oom-vllm-ollama",
    primaryLabel: "Ver guía de VRAM y OOM",
    audience:
      "Para usuarios con RTX 3090/4090, servidores caseros o VPS GPU que chocan con CUDA OOM, contexto largo o vLLM inestable.",
    promise:
      "Aprenderás a separar pesos, contexto, KV cache y concurrencia para elegir el runtime correcto antes de comprar más hardware.",
    sections: [
      {
        title: "El fallo que mata setups",
        body:
          "Un modelo puede parecer compatible con tu VRAM y aun así fallar por KV cache, batch, contexto o overhead del runtime.",
        bullets: ["Bajar contexto antes de cambiar modelo.", "Comparar vLLM, Ollama y llama.cpp.", "Medir VRAM y tokens/segundo."],
      },
      {
        title: "Decisión de runtime",
        body:
          "Ollama y llama.cpp suelen ser más tolerantes al límite; vLLM brilla cuando necesitas concurrencia y el modelo cabe con margen.",
        bullets: ["Ollama para simplicidad.", "llama.cpp para control.", "vLLM para throughput."],
      },
    ],
    examples: ["RTX 3090 con OOM en vLLM.", "Modelo que funciona a 4k pero cae a 16k.", "Comparativa tokens/s por runtime.", "KV cache como cuello de botella."],
    related: [
      { title: "VRAM y OOM", href: "/cursos/mlops-local/vram-oom-vllm-ollama", desc: "Diagnóstico completo." },
      { title: "Mapa serving", href: "/cursos/mlops-local/mapa-serving", desc: "Ollama, llama.cpp y vLLM." },
      { title: "vLLM OpenAI", href: "/cursos/mlops-local/vllm-openai", desc: "API compatible OpenAI." },
    ],
    faqs: [
      { q: "¿Por qué Ollama funciona y vLLM no?", a: "Porque gestionan memoria, contexto y concurrencia de forma distinta. vLLM necesita margen para throughput." },
      { q: "¿Basta con bajar contexto?", a: "Muchas veces ayuda mucho, porque la KV cache crece con el contexto." },
      { q: "¿vLLM es malo?", a: "No. Es excelente para serving concurrente cuando el modelo cabe holgado." },
    ],
  },
  {
    slug: "mac-m4-vs-windows-wsl2-ia-local",
    title: "Mac M4 vs Windows WSL2 para IA local",
    h1: "Mac M4 vs Windows WSL2 para IA local: qué elegir en 2026",
    description:
      "Compara Mac Apple Silicon, Windows con WSL2/NVIDIA y Linux para IA local: Ollama, MLX, Docker GPU, contexto, errores y uso real.",
    keywords: ["mejor setup ia local mac m4 pro ollama mlx", "docker gpu passthrough wsl2 ollama problemas", "Mac M4 vs RTX 4090 IA local"],
    icon: "desktop",
    primaryHref: "/cursos/ia-local/windows-wsl2-vs-mac-m4",
    primaryLabel: "Ver comparativa práctica",
    audience:
      "Para quien está pensando si comprar Mac M-series, PC NVIDIA, portátil Windows o montar Linux para IA local.",
    promise:
      "Aprenderás a elegir por tareas reales: coding, RAG, Docker GPU, herramientas Windows, contexto largo y mantenimiento.",
    sections: [
      {
        title: "No compres por un benchmark",
        body:
          "Un benchmark de tokens/segundo no te dice si Docker GPU funcionará, si tendrás contexto suficiente o si el entorno encaja con tu trabajo.",
        bullets: ["Mac para simplicidad.", "Windows para entorno enterprise.", "Linux para serving serio."],
      },
      {
        title: "Dónde falla cada uno",
        body:
          "Windows/WSL2 añade capas; Mac puede chocar con contexto y prefill; Linux requiere saber operar drivers y contenedores.",
        bullets: ["WSL2 y CUDA.", "MLX y Ollama.", "Docker GPU y versiones."],
      },
    ],
    examples: ["Diagnóstico `nvidia-smi` en WSL2.", "Ollama en Mac M-series.", "Docker GPU en Windows.", "Elección por caso de uso."],
    related: [
      { title: "Windows vs Mac", href: "/cursos/ia-local/windows-wsl2-vs-mac-m4", desc: "Comparativa completa." },
      { title: "Hardware mínimo", href: "/cursos/ia-local/hardware-minimo-2026", desc: "Requisitos reales." },
      { title: "Ollama GPU Windows", href: "/cursos/ia-local/ollama-gpu-windows", desc: "Diagnóstico Windows." },
    ],
    faqs: [
      { q: "¿Mac M4 es mejor?", a: "Es más cómodo para muchas personas, pero no sustituye un servidor NVIDIA si necesitas CUDA/vLLM serio." },
      { q: "¿Windows sirve?", a: "Sí, especialmente con WSL2, pero tiene más puntos de fallo que macOS para empezar." },
      { q: "¿Qué elegiría para producción?", a: "Linux con NVIDIA si vas a operar modelos de forma continua." },
    ],
  },
  {
    slug: "homelab-rtx-3090-ia-local",
    title: "Homelab IA local con RTX 3090 usadas",
    h1: "Homelab IA local con RTX 3090 usadas: VRAM, costes y riesgos",
    description:
      "Guía para pensar un homelab de IA local con RTX 3090 usadas: VRAM, multi-GPU, llama.cpp, consumo, calor, ruido y ROI.",
    keywords: ["comprar rtx 3090 usada homelab ia local", "4x RTX 3090 IA local", "llama.cpp multi gpu tensor splitting sin nvlink"],
    icon: "server",
    primaryHref: "/cursos/ia-local/homelab-rtx-3090",
    primaryLabel: "Ver guía de homelab",
    audience:
      "Para usuarios que quieren escapar de suscripciones, ejecutar modelos privados y aprender serving local con hardware propio.",
    promise:
      "Aprenderás cuándo una 3090 usada tiene sentido y qué riesgos debes revisar antes de montar un rig multi-GPU.",
    sections: [
      {
        title: "La 3090 no es magia",
        body:
          "24 GB de VRAM ayudan mucho, pero no eliminan contexto, calor, consumo, drivers ni limitaciones del runtime.",
        bullets: ["Single GPU primero.", "Multi-GPU con expectativas realistas.", "Medición antes de escalar."],
      },
      {
        title: "Coste real",
        body:
          "El precio de compra no es todo. Fuente, caja, electricidad, ruido, backups y tiempo de mantenimiento también cuentan.",
        bullets: ["Consumo en pared.", "Temperaturas.", "Plan de rollback."],
      },
    ],
    examples: ["Benchmark de una 3090.", "llama.cpp con tensor split.", "Checklist de compra usada.", "ROI frente a suscripciones."],
    related: [
      { title: "Homelab RTX 3090", href: "/cursos/ia-local/homelab-rtx-3090", desc: "Guía completa." },
      { title: "VRAM y OOM", href: "/cursos/mlops-local/vram-oom-vllm-ollama", desc: "Evita fallos de memoria." },
      { title: "llama.cpp server", href: "/cursos/mlops-local/llama-server", desc: "Serving controlado." },
    ],
    faqs: [
      { q: "¿Mejor 3090 o 4090?", a: "Depende de precio, consumo, garantía y necesidad de VRAM. La 3090 destaca por 24 GB usados a buen precio." },
      { q: "¿Necesito 4 GPUs?", a: "Casi nunca para empezar. Una GPU bien medida enseña más que cuatro mal montadas." },
      { q: "¿Sin NVLink sirve?", a: "Puede servir, pero no esperes escalado perfecto en todos los modelos y runtimes." },
    ],
  },
  {
    slug: "open-webui-troubleshooting-produccion",
    title: "Open WebUI troubleshooting y producción ligera",
    h1: "Open WebUI troubleshooting: updates, tools, Ollama y producción ligera",
    description:
      "Checklist para mantener Open WebUI estable con Ollama, Docker, volúmenes, backups, tool calling, Qdrant y actualizaciones.",
    keywords: ["open webui breaking changes tool calling", "Open WebUI troubleshooting Ollama", "Open WebUI Docker backup"],
    icon: "chat",
    primaryHref: "/cursos/ia-local/open-webui-troubleshooting",
    primaryLabel: "Ver troubleshooting Open WebUI",
    audience:
      "Para usuarios de Open WebUI que ya lo usan a diario y quieren evitar roturas por updates, volúmenes mal montados o conexiones con Ollama/Qdrant.",
    promise:
      "Aprenderás a revisar logs, hacer backups, conectar Ollama correctamente y preparar una instalación ligera para equipo pequeño.",
    sections: [
      {
        title: "No es solo una UI",
        body:
          "Cuando Open WebUI guarda usuarios, chats, documentos o tools, ya es un sistema con estado. Hay que hacer backup y controlar actualizaciones.",
        bullets: ["Volumen persistente.", "Logs antes de tocar.", "Rollback documentado."],
      },
      {
        title: "Conexión con Ollama",
        body:
          "Muchos errores vienen de confundir localhost del host con localhost del contenedor.",
        bullets: ["Red Docker.", "host.docker.internal.", "Qdrant separado."],
      },
    ],
    examples: ["Backup del volumen.", "Diagnóstico de Ollama API.", "Update con rollback.", "Open WebUI + Qdrant estable."],
    related: [
      { title: "Open WebUI troubleshooting", href: "/cursos/ia-local/open-webui-troubleshooting", desc: "Checklist completa." },
      { title: "Open WebUI + Qdrant", href: "/cursos/ia-local/open-webui-qdrant", desc: "RAG local." },
      { title: "Ollama desde cero", href: "/cursos/ia-local/ollama-desde-cero", desc: "Base del modelo local." },
    ],
    faqs: [
      { q: "¿Por qué no conecta con Ollama?", a: "Si está en Docker, `localhost` puede apuntar al contenedor, no al host." },
      { q: "¿Puedo actualizar sin backup?", a: "No deberías si tienes datos importantes." },
      { q: "¿Sirve para pymes?", a: "Sí, con usuarios, HTTPS, backups y permisos claros." },
    ],
  },
  {
    slug: "cuantizacion-modelos-coding-ollama",
    title: "Cuantización y modelos locales para coding",
    h1: "Cuantización y modelos locales para coding: Q4, Q5, Q8, GGUF y contexto",
    description:
      "Aprende a elegir modelos y quants para coding agents locales: GGUF, Q4, Q5, Q8, FP8, contexto, velocidad, calidad y pruebas.",
    keywords: ["gemma 4 ollama mlx velocidad agents", "mejor modelo local para coding agents Ollama 2026", "GGUF Q4 Q5 coding"],
    icon: "code",
    primaryHref: "/cursos/ia-local/cuantizacion-modelos-coding",
    primaryLabel: "Ver guía de cuantización",
    audience:
      "Para quienes quieren usar modelos locales para programar sin perderse entre benchmarks, quants y promesas de velocidad.",
    promise:
      "Aprenderás a elegir un quant que quepa, responda con calidad suficiente y pueda pasar tests reales de código.",
    sections: [
      {
        title: "El tamaño no lo es todo",
        body:
          "Un modelo grande con poco contexto o latencia enorme puede ser peor que uno mediano bien cuantizado y verificado.",
        bullets: ["Q4 para entrada.", "Q5 como equilibrio.", "Q8 cuando sobra memoria."],
      },
      {
        title: "Evalúa con tu repo",
        body:
          "Los benchmarks ayudan, pero tu prueba debe ser explicar bug, generar test, parchear y pasar build.",
        bullets: ["tokens/s.", "tiempo al primer token.", "calidad de diff."],
      },
    ],
    examples: ["Comparar dos quants.", "Test de bug real.", "Modelo local para generar tests.", "Registro `models-eval.md`."],
    related: [
      { title: "Cuantización y coding", href: "/cursos/ia-local/cuantizacion-modelos-coding", desc: "Guía completa." },
      { title: "Cuantización GGUF", href: "/cursos/ia-local/cuantizacion-gguf", desc: "Base técnica." },
      { title: "Agentes de código locales", href: "/cursos/ia-local/agentes-codigo-locales", desc: "Aplicación práctica." },
    ],
    faqs: [
      { q: "¿Q4 es suficiente?", a: "Para muchas tareas sí, pero hay que probarlo con tu repo y tus tests." },
      { q: "¿Qué modelo es el mejor?", a: "Depende de fecha, hardware y tarea. Lo estable es tener una prueba repetible." },
      { q: "¿FP8 siempre mejora?", a: "No. Puede ahorrar memoria, pero debes validar estabilidad y calidad." },
    ],
  },
  {
    slug: "agente-coding-local-ollama-hermes",
    title: "Agente coding local con Ollama y Hermes",
    h1: "Agente coding local con Hermes, Ollama y modelos abiertos",
    description:
      "Aprende a montar un agente de código local con Hermes Agent, Ollama, Gemma/Qwen, tool calling, memoria, stop logic y verificación con Git.",
    keywords: ["agente coding local ollama hermes", "Hermes Agent Ollama", "coding agent terminal local ollama", "tool calling error ollama hermes fix"],
    icon: "terminal",
    primaryHref: "/cursos/ia-local/hermes-agente-coding-local",
    primaryLabel: "Ver lección de Hermes y Ollama",
    audience:
      "Para devs, makers y autónomos que quieren un agente de código local sin depender siempre de APIs cloud.",
    promise:
      "Aprenderás una arquitectura segura: modelo local, herramientas con permisos mínimos, rama Git, límites de pasos y pruebas antes de aceptar cambios.",
    sections: [
      {
        title: "Autonomía con frenos",
        body:
          "Un agente local no debe empezar con permisos totales. Primero observa, planifica, edita poco y verifica con comandos reproducibles.",
        bullets: ["Rama aislada.", "Máximo de pasos.", "Diff revisable."],
      },
      {
        title: "Tool calling sin magia",
        body:
          "Los modelos locales pueden fallar con tools por parser, cuantización o formato. La guía enseña a detectar el fallo antes de dar más permisos.",
        bullets: ["Proveedor local.", "Formato de tools.", "Stop conditions."],
      },
    ],
    examples: ["Arreglar un bug pequeño.", "Generar tests.", "Ejecutar lint/build.", "Parar al repetir el mismo error."],
    related: [
      { title: "Hermes y Ollama", href: "/cursos/ia-local/hermes-agente-coding-local", desc: "Agente coding local." },
      { title: "Agentes de código locales", href: "/cursos/ia-local/agentes-codigo-locales", desc: "Base conceptual." },
      { title: "Cuantización y coding", href: "/cursos/ia-local/cuantizacion-modelos-coding", desc: "Elige modelo." },
    ],
    faqs: [
      { q: "¿Hermes sustituye a Claude Code?", a: "No exactamente. Es otra arquitectura: agente con tools y memoria que puede usar proveedores locales." },
      { q: "¿Funciona sin nube?", a: "Puede funcionar con Ollama si el modelo y las tools están configurados correctamente." },
      { q: "¿Qué es lo más peligroso?", a: "Permitir ediciones o comandos sin límites, sin rama y sin verificación." },
    ],
  },
  {
    slug: "rag-privado-n8n-qdrant-ollama",
    title: "RAG privado con n8n, Qdrant y Ollama",
    h1: "RAG privado con n8n, Qdrant y Ollama para pymes y equipos",
    description:
      "Monta un agente RAG privado con n8n, Qdrant, Ollama y Open WebUI: documentos, permisos, Telegram/chat, citas y troubleshooting.",
    keywords: ["rag privado n8n qdrant ollama tutorial", "n8n ollama qdrant rag agent telegram", "workflow n8n llm local faq rag agent"],
    icon: "database",
    primaryHref: "/cursos/automatizacion-self-hosted/rag-n8n-qdrant-ollama",
    primaryLabel: "Ver lección RAG con n8n",
    audience:
      "Para pymes, autónomos y equipos que quieren responder sobre documentación privada con trazas y sin enviar todo a servicios externos.",
    promise:
      "Aprenderás el flujo mínimo: entrada, validación de usuario, búsqueda filtrada en Qdrant, respuesta con Ollama y aprobación humana si hay impacto real.",
    sections: [
      {
        title: "Stack simple y útil",
        body:
          "n8n orquesta, Qdrant recupera contexto, Ollama responde y Open WebUI puede servir como interfaz privada.",
        bullets: ["Docker Compose.", "Filtros por tenant.", "Citas y trazas."],
      },
      {
        title: "RAG antes que agente",
        body:
          "Muchas automatizaciones no necesitan autonomía completa: necesitan recuperar bien, citar y pedir revisión humana cuando toca.",
        bullets: ["FAQ interna.", "Telegram.", "Soporte con aprobación."],
      },
    ],
    examples: ["Bot FAQ interno.", "RAG de manuales.", "Respuesta por Telegram.", "Prueba de fuga entre clientes."],
    related: [
      { title: "RAG con n8n", href: "/cursos/automatizacion-self-hosted/rag-n8n-qdrant-ollama", desc: "Proyecto completo." },
      { title: "Open WebUI + Qdrant", href: "/cursos/ia-local/open-webui-qdrant", desc: "Base local." },
      { title: "Qdrant permisos", href: "/cursos/rag-seguro/qdrant-permisos", desc: "Aislamiento de datos." },
    ],
    faqs: [
      { q: "¿Necesito LangChain?", a: "No siempre. Para un primer flujo, n8n puede orquestar llamadas HTTP y Qdrant directamente." },
      { q: "¿Es privado de verdad?", a: "Solo si documentos, embeddings, logs y respuestas se quedan bajo tu control." },
      { q: "¿Puedo usar Telegram?", a: "Sí, pero valida usuarios y evita enviar datos sensibles a chats no controlados." },
    ],
  },
  {
    slug: "runaway-agent-loop-fix-local",
    title: "Cómo evitar loops infinitos en agentes locales",
    h1: "Runaway agents: cómo evitar loops infinitos en agentes locales",
    description:
      "Diseña multi-agentes locales con límites de pasos, herramientas, memoria persistente, compute budget y reglas de parada para Ollama, Hermes o LangGraph.",
    keywords: ["runaway agent loop fix local ollama", "multi agente local subagentes persistencia", "control loops agentes IA"],
    icon: "warning",
    primaryHref: "/cursos/agentes-automatizacion/multiagentes-locales-loops",
    primaryLabel: "Ver control de multi-agentes",
    audience:
      "Para quienes están pasando de un agente simple a sistemas con subagentes, memoria y herramientas locales.",
    promise:
      "Aprenderás a cortar loops por repetición, falta de evidencia, errores iguales y consumo excesivo de CPU/RAM/VRAM.",
    sections: [
      {
        title: "Más agentes no siempre ayudan",
        body:
          "Cada agente añade llamadas, memoria, logs y competencia por recursos. El diseño debe empezar por roles y límites.",
        bullets: ["Planner.", "Executor.", "Verifier."],
      },
      {
        title: "Memoria útil, no ruido",
        body:
          "Guardar todo el chat empeora el sistema. La memoria persistente debe recoger decisiones, evidencias y bloqueos.",
        bullets: ["state.md.", "trazas.", "salida humana."],
      },
    ],
    examples: ["Corte por tool repetida.", "Presupuesto de compute.", "Memoria de decisiones.", "Verificador sin permisos de edición."],
    related: [
      { title: "Multi-agentes locales", href: "/cursos/agentes-automatizacion/multiagentes-locales-loops", desc: "Diseño completo." },
      { title: "Loops y costes", href: "/cursos/agentes-automatizacion/loops-costes", desc: "Guardrails base." },
      { title: "Estado persistente", href: "/cursos/agentes-automatizacion/estado-recuperacion", desc: "Recuperación." },
    ],
    faqs: [
      { q: "¿Basta con max_iterations?", a: "No. También necesitas cortar por repetición, coste, tiempo y ausencia de progreso." },
      { q: "¿Cuántos agentes uso en local?", a: "Los mínimos. Dos roles bien definidos suelen ser mejores que seis compitiendo por recursos." },
      { q: "¿Qué debe guardar la memoria?", a: "Objetivo, decisiones, evidencias, comandos ejecutados y bloqueos." },
    ],
  },
  {
    slug: "docker-compose-ia-local-ollama-n8n-qdrant",
    title: "Docker Compose para IA local con Ollama, n8n y Qdrant",
    h1: "Docker Compose para stack completo de IA local",
    description:
      "Monta un stack reproducible con Ollama, Open WebUI, Qdrant y n8n usando Docker Compose, volúmenes, perfiles y backups.",
    keywords: ["docker compose ia local ollama n8n qdrant", "stack local ai production n8n ollama qdrant", "Open WebUI Qdrant Docker"],
    icon: "server",
    primaryHref: "/cursos/automatizacion-self-hosted/stack-docker-ia-local",
    primaryLabel: "Ver stack Docker IA local",
    audience: "Para makers, pymes y autónomos que quieren un laboratorio local repetible sin perder datos al reiniciar.",
    promise: "Aprenderás a separar servicios base y opcionales, montar volúmenes persistentes y hacer backups mínimos.",
    sections: [
      { title: "Stack reproducible", body: "Compose evita depender de comandos sueltos y permite documentar servicios, puertos y volúmenes.", bullets: ["Qdrant.", "Open WebUI.", "n8n por perfil."] },
      { title: "Producción ligera", body: "No basta con arrancar: necesitas backups, puertos cerrados y secretos fuera del repositorio.", bullets: ["Volúmenes.", "Perfiles.", "Logs."] },
    ],
    examples: ["Compose base.", "Perfil automation.", "Backup de volumen.", "Reinicio sin perder estado."],
    related: [
      { title: "Stack Docker", href: "/cursos/automatizacion-self-hosted/stack-docker-ia-local", desc: "Lección completa." },
      { title: "RAG con n8n", href: "/cursos/automatizacion-self-hosted/rag-n8n-qdrant-ollama", desc: "Flujo privado." },
      { title: "Open WebUI troubleshooting", href: "/cursos/ia-local/open-webui-troubleshooting", desc: "Errores comunes." },
    ],
    faqs: [
      { q: "¿Meto Ollama en Docker?", a: "En muchos portátiles conviene ejecutarlo nativo y conectar desde contenedores." },
      { q: "¿Puedo exponerlo a internet?", a: "Solo con HTTPS, autenticación, backups y revisión de puertos." },
      { q: "¿Para qué sirven los perfiles?", a: "Para activar servicios opcionales sin duplicar compose files." },
    ],
  },
  {
    slug: "tool-calling-modelos-locales-ollama",
    title: "Tool calling con modelos locales y Ollama",
    h1: "Tool calling con modelos locales: errores, parsers y permisos",
    description:
      "Diagnostica tool calling roto en agentes locales con Ollama, Hermes, Open WebUI y MCP: schemas, parsers, quants y trazas.",
    keywords: ["tool calling error ollama hermes fix", "tool calling modelos locales", "MCP tools modelos locales"],
    icon: "tools",
    primaryHref: "/cursos/ia-local/tool-calling-modelos-locales",
    primaryLabel: "Ver troubleshooting de tool calling",
    audience: "Para quienes montan agentes locales y ven que las tools no se invocan, fallan o devuelven argumentos inválidos.",
    promise: "Aprenderás a aislar si falla el modelo, el runtime, el parser, el schema o los permisos de la herramienta.",
    sections: [
      { title: "Pruebas pequeñas", body: "Antes de tocar GitHub o archivos, prueba una tool mínima y revisa la salida previa al parser.", bullets: ["Schema.", "JSON.", "Logs."] },
      { title: "Permisos reales", body: "Una tool local puede ejecutar código en tu servidor. Requiere los mismos límites que una app interna.", bullets: ["Allowlist.", "Aprobación.", "Trazas."] },
    ],
    examples: ["Tool get_time.", "JSON inválido.", "Parser incompatible.", "Tool con aprobación humana."],
    related: [
      { title: "Tool calling local", href: "/cursos/ia-local/tool-calling-modelos-locales", desc: "Diagnóstico completo." },
      { title: "Hermes y Ollama", href: "/cursos/ia-local/hermes-agente-coding-local", desc: "Agente coding local." },
      { title: "MCP seguro", href: "/cursos/agentes-automatizacion/mcp-seguro", desc: "Permisos." },
    ],
    faqs: [
      { q: "¿Por qué el modelo describe la tool pero no la llama?", a: "Puede no estar alineado con el formato que espera el runtime o parser." },
      { q: "¿Un quant puede romper tool calling?", a: "Puede degradar formato y seguimiento de instrucciones; hay que probar." },
      { q: "¿Open WebUI tools son seguras?", a: "Son potentes porque ejecutan Python; hay que tratarlas como código con permisos." },
    ],
  },
  {
    slug: "agente-local-24-7-mac-rtx-low-vram",
    title: "Agente local 24/7 en Mac, RTX o low VRAM",
    h1: "Agentes 24/7 offline en hardware real: Mac M-series, RTX y mini PC",
    description:
      "Diseña agentes locales 24/7 con bandeja de entrada, watchdog, límites de compute, logs y recuperación para Mac, RTX 3090/4090 o mini PC.",
    keywords: ["agente autonomo local 24/7 low vram", "agente offline privado solopreneur", "agentes 24/7 Mac M4 RTX 3090"],
    icon: "robot",
    primaryHref: "/cursos/agentes-automatizacion/agentes-247-hardware-real",
    primaryLabel: "Ver agentes 24/7 en hardware real",
    audience: "Para solopreneurs, makers y pymes que quieren agentes locales persistentes sin facturas impredecibles.",
    promise: "Aprenderás a separar inbox, worker, modelo, watchdog y aprobación humana para evitar loops y caídas silenciosas.",
    sections: [
      { title: "Hardware honesto", body: "Mac, RTX, mini PC y VPS sirven para cosas distintas. No todo debe hacer inferencia pesada.", bullets: ["Mac cómodo.", "RTX potente.", "VPS orquesta."] },
      { title: "Operación antes que autonomía", body: "Un agente 24/7 debe pausar, registrar y pedir ayuda cuando falla.", bullets: ["Healthcheck.", "Logs.", "Timeouts."] },
    ],
    examples: ["Watchdog.", "Cola persistente.", "Ollama apagado.", "Tool que falla dos veces."],
    related: [
      { title: "24/7 hardware real", href: "/cursos/agentes-automatizacion/agentes-247-hardware-real", desc: "Lección completa." },
      { title: "Agente 24/7", href: "/cursos/agentes-automatizacion/agente-247", desc: "Proyecto base." },
      { title: "OOM y memoria", href: "/cursos/agentes-automatizacion/oom-memory", desc: "Límites." },
    ],
    faqs: [
      { q: "¿Puede funcionar sin nube?", a: "Sí, si el modelo local basta y el flujo tiene límites claros." },
      { q: "¿Mini PC sirve?", a: "Para orquestar y colas, sí; para modelos grandes, normalmente no." },
      { q: "¿Qué fallo es más común?", a: "Loops, falta de estado persistente y reinicios mal configurados." },
    ],
  },
  {
    slug: "routing-hibrido-litellm-ollama-cloud",
    title: "Routing híbrido con LiteLLM, Ollama y cloud",
    h1: "Routing híbrido local/cloud con LiteLLM",
    description:
      "Usa LiteLLM para enrutar tareas entre Ollama, vLLM y modelos cloud con fallbacks, presupuestos, privacidad y trazas.",
    keywords: ["routing híbrido LiteLLM Ollama", "LiteLLM local cloud fallback", "gateway modelos locales frontier"],
    icon: "network",
    primaryHref: "/cursos/mlops-local/routing-hibrido-litellm",
    primaryLabel: "Ver routing híbrido LiteLLM",
    audience: "Para equipos que quieren coste bajo y privacidad local, pero necesitan escalar a modelos externos en tareas difíciles.",
    promise: "Aprenderás a definir políticas: qué va local, qué puede salir, cuándo usar fallback y cómo registrar cada decisión.",
    sections: [
      { title: "Local primero", body: "Lo rutinario, privado o barato se queda local. Lo complejo puede escalar con aprobación y trazas.", bullets: ["Ollama.", "vLLM.", "Frontier review."] },
      { title: "Fallback con cuidado", body: "Si hay datos sensibles, fallar localmente no significa mandar el prompt a otro proveedor.", bullets: ["Política.", "Presupuesto.", "Auditoría."] },
    ],
    examples: ["Modelo local-fast.", "local-gpu.", "frontier-review.", "traza de fallback."],
    related: [
      { title: "Routing híbrido", href: "/cursos/mlops-local/routing-hibrido-litellm", desc: "Lección completa." },
      { title: "LiteLLM gateway", href: "/cursos/mlops-local/litellm-gateway", desc: "Base." },
      { title: "Observabilidad", href: "/cursos/mlops-local/observabilidad", desc: "Trazas." },
    ],
    faqs: [
      { q: "¿Híbrido significa enviar todo a cloud?", a: "No. Significa decidir explícitamente cuándo local no basta." },
      { q: "¿LiteLLM hace fallbacks?", a: "Sí, puede enrutar y configurar fallbacks, pero la política de privacidad es tuya." },
      { q: "¿Sirve con Ollama?", a: "Sí, como endpoint local dentro de una estrategia de gateway." },
    ],
  },
];

export function getSeoLanding(slug: string) {
  return seoLandings.find((landing) => landing.slug === slug);
}
