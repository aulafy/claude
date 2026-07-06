import type { IconName } from "@/components/Icon";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  readingTime: string;
  icon: IconName;
  image: string;
  editorNote?: string;
  keywords: string[];
  intro: string;
  sections: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
  table?: {
    headers: string[];
    rows: string[][];
  };
  faqs: Array<{ q: string; a: string }>;
  related: Array<{ title: string; href: string; desc: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mcp-2026-07-28-migracion-guia-espanol",
    title: "MCP 2026-07-28 en español: qué cambia y cómo preparar tu stack",
    description:
      "Guía práctica sobre el próximo cambio de MCP previsto para el 28 de julio de 2026: stateless, sesiones, seguridad, migración, Claude Code, Cursor, n8n y agentes.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "MCP y agentes",
    readingTime: "12 min",
    icon: "network",
    image: "/blog/mcp-2026-07-28-migracion-guia-espanol.png",
    editorNote:
      "Actualizado el 6 de julio de 2026 con investigación de Grok CLI sobre señales recientes en X y revisión editorial de fuentes técnicas.",
    keywords: [
      "MCP 2026-07-28",
      "Model Context Protocol español",
      "migración MCP",
      "MCP stateless",
      "MCP Claude Code",
      "seguridad MCP",
    ],
    intro:
      "MCP se está convirtiendo en una capa clave para conectar modelos con herramientas, archivos, APIs y agentes. La señal fuerte de julio de 2026 no es “instala cualquier servidor MCP”, sino preparar una migración ordenada, con permisos mínimos, pruebas y rollback.",
    sections: [
      {
        title: "Qué está pasando con MCP",
        body:
          "El Model Context Protocol nació para que asistentes como Claude Code, editores y agentes pudieran hablar con herramientas externas de forma más estándar. En julio de 2026 la conversación técnica está centrada en el release candidate de una nueva especificación, con cambios pensados para despliegues más stateless, mejor operación y menos dependencia de sesiones pegajosas.",
      },
      {
        title: "Qué conviene revisar antes del 28 de julio",
        body:
          "La fecha prevista para la especificación final es posterior a hoy, así que lo correcto es preparar y probar, no publicar certezas absolutas. Revisa tus servidores locales, clientes, proxies, balanceadores, permisos, logs y dependencias antes de actualizar nada que uses a diario.",
        bullets: [
          "Lista todos tus servidores MCP y quién los mantiene.",
          "Comprueba si dependen de sesiones persistentes o estado en memoria.",
          "Prueba la actualización en un entorno aislado antes de tocar producción.",
          "Guarda una configuración anterior para volver atrás si algo se rompe.",
        ],
      },
      {
        title: "Stateless no significa sin seguridad",
        body:
          "Que un flujo sea más stateless puede simplificar despliegues, escalado y balanceo, pero no elimina los riesgos. MCP sigue conectando modelos con herramientas capaces de leer archivos, llamar APIs, consultar bases de datos o ejecutar acciones. Eso exige mínimo privilegio, auditoría y aprobación humana en operaciones peligrosas.",
      },
      {
        title: "Cómo migrar sin romper tu flujo",
        body:
          "Empieza por un inventario, separa herramientas críticas de experimentales, fija versiones, crea un entorno de prueba y registra cada fallo. Si usas Claude Code, Cursor, n8n o servidores MCP de comunidad, evita actualizar todo a la vez. Migra primero lo que puedas validar con una tarea repetible.",
      },
      {
        title: "Qué no deberías creer todavía",
        body:
          "No publiques que todos los clientes soportan MCP Apps o Tasks de la misma forma, no asumas que todos los servidores antiguos seguirán funcionando y no cites cifras de ataques o adopción sin fuente primaria. La parte madura de MCP no es el entusiasmo: es saber qué herramientas conectas, con qué permisos y con qué pruebas.",
      },
    ],
    table: {
      headers: ["Área", "Qué revisar", "Riesgo si lo ignoras", "En Aulafy"],
      rows: [
        ["Inventario", "Servidores MCP, versiones, mantenedores y permisos", "Shadow IT y herramientas olvidadas", "/cursos/agentes-automatizacion/mcp-governance"],
        ["Sesiones", "Dependencia de estado, sticky sessions y cabeceras", "Roturas tras actualizar o escalar", "/cursos/agentes-automatizacion/estado-recuperacion"],
        ["Seguridad", "Permisos mínimos, sandbox, logs y aprobaciones", "Exfiltración, acciones no deseadas o tool shadowing", "/cursos/agentes-automatizacion/mcp-seguro"],
        ["Clientes", "Claude Code, Cursor, n8n y compatibilidad real", "Falsas expectativas por soporte parcial", "/cursos/claude-code/mcp"],
        ["Operación", "Rollback, pruebas repetibles, trazas y alertas", "Caídas difíciles de depurar", "/cursos/agentes-produccion/evals-logs"],
      ],
    },
    faqs: [
      {
        q: "¿MCP 2026-07-28 ya es definitivo?",
        a: "A fecha 6 de julio de 2026, debe tratarse como una actualización prevista y en fase de preparación editorial. Antes de publicar instrucciones cerradas conviene revisar la especificación final el 28 de julio de 2026.",
      },
      {
        q: "¿Tengo que migrar todos mis servidores MCP ya?",
        a: "No. Lo sensato es inventariar, probar en un entorno aislado y migrar primero los servidores menos críticos. Actualizar todo de golpe aumenta el riesgo de romper flujos de trabajo.",
      },
      {
        q: "¿MCP stateless es más seguro?",
        a: "Puede facilitar operación y escalado, pero la seguridad depende de permisos, autenticación, sandbox, logs, revisión humana y control de servidores instalados.",
      },
      {
        q: "¿MCP Apps y Tasks funcionarán en todos los clientes?",
        a: "No lo asumas. El soporte depende de cada cliente, versión y extensión. Verifica documentación oficial antes de prometer compatibilidad.",
      },
      {
        q: "¿Qué debería aprender primero?",
        a: "Empieza por entender qué es MCP, cómo se configuran herramientas en Claude Code y cómo limitar permisos antes de conectar servidores de comunidad.",
      },
    ],
    related: [
      { title: "MCP en Claude Code", href: "/cursos/claude-code/mcp", desc: "Conecta herramientas externas sin perder control." },
      { title: "MCP seguro", href: "/cursos/agentes-automatizacion/mcp-seguro", desc: "Permisos, sandbox y riesgos reales al conectar agentes." },
      { title: "Servidor MCP custom", href: "/cursos/agentes-automatizacion/servidor-mcp-custom", desc: "Construye un servidor MCP pequeño y mantenible." },
      { title: "n8n como herramientas de agentes", href: "/cursos/agentes-produccion/n8n-tools", desc: "Automatización con revisión y límites claros." },
    ],
  },
  {
    slug: "mejores-herramientas-ia-gratis-2026",
    title: "Mejores herramientas de IA gratis en 2026: guía práctica para empezar",
    description:
      "Herramientas gratis separando plan gratuito, límites reales, privacidad, IA local, automatización y riesgos de depender de cuotas opacas.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "Herramientas IA",
    readingTime: "9 min",
    icon: "tools",
    image: "/blog/mejores-herramientas-ia-gratis-2026.png",
    editorNote:
      "Actualizado el 6 de julio de 2026 con Grok CLI: se añadieron límites reales, stack mínimo, privacidad local y riesgos de herramientas gratuitas.",
    keywords: ["mejores herramientas IA gratis 2026", "herramientas inteligencia artificial gratis", "IA gratis español"],
    intro:
      "La mejor herramienta de IA no es la que más ruido hace, sino la que resuelve tu tarea con menos fricción. Tras revisar señales de X, documentación y conversaciones recientes, la regla es clara: gratis casi siempre significa límites, colas, datos en la nube o mantenimiento local.",
    sections: [
      {
        title: "Gratis no significa ilimitado",
        body:
          "Los planes gratuitos siguen siendo útiles, pero los límites son más dinámicos: ventanas de uso, topes semanales, funciones premium recortadas y colas en horas punta. Antes de elegir, separa lo que necesitas hacer de lo que la landing promete.",
        bullets: [
          "Para escribir y resumir: prioriza calidad de razonamiento y edición.",
          "Para programar: mira completados mensuales, chat en IDE, contexto y control de cambios.",
          "Para datos sensibles: usa IA local o servicios con contrato claro.",
          "Para automatizar: calcula también APIs, servidor, mantenimiento y aprobaciones humanas.",
        ],
      },
      {
        title: "Stack mínimo recomendado",
        body:
          "Para empezar sin pagar, combina un asistente generalista, una herramienta de investigación con fuentes, una opción local y una automatización sencilla. ChatGPT, Claude, Gemini y Grok cubren chat general; Perplexity y NotebookLM ayudan con fuentes y documentos; Ollama, LM Studio y Open WebUI cubren privacidad local; n8n o Make conectan tareas repetitivas.",
      },
      {
        title: "Qué evitar",
        body:
          "Evita listas de 50 herramientas sin límites, extensiones que piden permisos excesivos y promesas de agentes gratis que trabajan solos. Una herramienta gratuita puede salir cara si subes datos sensibles, dependes de una cuota opaca o automatizas acciones sin revisión.",
      },
    ],
    table: {
      headers: ["Uso", "Herramientas", "Ideal para", "Cuidado"],
      rows: [
        ["Chat general", "Claude, ChatGPT, Gemini, Grok", "Redacción, análisis, planificación", "Límites dinámicos y verificación de fuentes"],
        ["Investigación", "Perplexity, NotebookLM, búsqueda con IA", "Citas, PDFs, apuntes, informes", "No confundas cita con verdad"],
        ["Programación", "GitHub Copilot Free, Gemini Code Assist, Aider", "Aprender, prototipos, autocompletado", "Revisa tests, permisos y privacidad del repo"],
        ["IA local", "Ollama, LM Studio, Open WebUI", "Privacidad, pruebas, documentos internos", "Gratis en software; no en hardware ni tiempo"],
        ["Automatización", "n8n, Make, scripts", "Flujos repetitivos", "APIs, servidor y aprobación humana"],
        ["Imagen y vídeo", "ComfyUI, Diffusers, FLUX, Copilot/Gemini", "Assets, recursos educativos", "Créditos, licencias y consistencia visual"],
      ],
    },
    faqs: [
      { q: "¿Cuál es la mejor IA gratis?", a: "Depende de la tarea. Para empezar, combina un asistente generalista, una herramienta con fuentes y una opción local si trabajas con datos sensibles." },
      { q: "¿Puedo usar herramientas gratis en una empresa?", a: "Sí, pero revisa privacidad, límites, condiciones de uso y si necesitas contrato de tratamiento de datos." },
      { q: "¿La IA local es gratis?", a: "El software puede ser gratis, pero pagas hardware, energía, tiempo de configuración y mantenimiento." },
    ],
    related: [
      { title: "Curso de IA local", href: "/cursos/ia-local", desc: "Aprende Ollama, Open WebUI, Qdrant y modelos locales." },
      { title: "IA para pymes", href: "/cursos/ia-pymes", desc: "Casos prácticos para autónomos y pequeñas empresas." },
      { title: "IA generativa", href: "/cursos/ia-generativa", desc: "Imagen, voz y vídeo con herramientas abiertas." },
    ],
  },
  {
    slug: "chatgpt-vs-claude-vs-gemini-vs-grok-2026",
    title: "ChatGPT vs Claude vs Gemini vs Grok en 2026: cuál usar según tu tarea",
    description:
      "Comparativa por tarea, no por fanatismo: escritura, código, documentos, investigación reciente, señales de X, coste y verificación.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "Comparativas",
    readingTime: "10 min",
    icon: "compare",
    image: "/blog/chatgpt-vs-claude-vs-gemini-vs-grok-2026.png",
    editorNote:
      "Actualizado el 6 de julio de 2026 con Grok CLI: la comparativa pasa de ranking genérico a decisión por tarea, coste, fuentes y verificación.",
    keywords: ["ChatGPT vs Claude vs Gemini vs Grok 2026", "mejor IA para programar", "comparativa modelos IA"],
    intro:
      "No hay un ganador universal. Grok confirma que la comparación útil en 2026 no es “qué modelo gana”, sino “qué tarea hago, con qué presupuesto, cuánta verificación necesito y qué datos estoy compartiendo”.",
    sections: [
      {
        title: "La regla útil",
        body:
          "Usa el modelo que mejor resuelva tu tarea medible. Define 10 tareas reales, ejecuta el mismo prompt y compara calidad, coste, velocidad, fuentes, límites y facilidad de revisión. Sin una prueba propia, solo estás eligiendo por marketing.",
      },
      {
        title: "Dónde suele brillar cada uno",
        body:
          "Claude suele encajar muy bien en escritura larga, análisis y programación asistida con Claude Code. ChatGPT destaca por ecosistema, versatilidad y flujos de investigación. Gemini es fuerte en multimodalidad y trabajo dentro del ecosistema Google. Grok aporta valor cuando necesitas señales sociales, actualidad y conversación pegada a X.",
      },
      {
        title: "Cuidado con los rankings",
        body:
          "Los leaderboards ayudan, pero no sustituyen tu caso. Un modelo puede liderar en un benchmark y fallar en tus documentos, tu idioma, tu presupuesto o tu stack. Publica siempre la fecha de la comparativa y evita decir que un modelo es “el mejor para todo”.",
      },
    ],
    table: {
      headers: ["Tarea", "Buena opción inicial", "Qué medir"],
      rows: [
        ["Escritura larga", "Claude o ChatGPT", "Coherencia, tono, estructura, edición"],
        ["Programar", "Claude Code o ChatGPT/Codex", "Tests, diffs, errores, tiempo hasta merge"],
        ["Investigación reciente", "Grok, Perplexity o ChatGPT con búsqueda", "Fuentes, fechas, citas, omisiones"],
        ["Documentos largos", "Claude o Gemini", "Fidelidad, estructura, citas, límites de contexto"],
        ["Automatización", "Claude/Gemini/ChatGPT + n8n/LangGraph", "Permisos, logs, fallos, coste"],
        ["Señales sociales", "Grok", "Calidad de fuentes, ruido, sesgo de X"],
      ],
    },
    faqs: [
      { q: "¿Claude es mejor que ChatGPT para programar?", a: "Puede serlo en muchos flujos con repos y contexto largo, pero la respuesta correcta es probarlo con tu código, tus tests y tus restricciones." },
      { q: "¿Grok sirve para investigación?", a: "Puede ser útil para señales de X y conversación reciente, pero conviene contrastar con fuentes oficiales antes de publicar." },
      { q: "¿Debo usar solo un modelo?", a: "No. Para trabajo serio suele funcionar mejor una estrategia híbrida: modelo fuerte para razonamiento, Grok para señales sociales y modelo local o barato para tareas repetibles." },
    ],
    related: [
      { title: "Claude Code, de 0 a pro", href: "/cursos/claude-code", desc: "Domina la CLI de IA de Anthropic." },
      { title: "Routing híbrido local/cloud", href: "/cursos/mlops-local/routing-hibrido-litellm", desc: "Decide qué modelo usar en cada petición." },
      { title: "Evals básicas", href: "/cursos/seguridad-evals/evals-basicas", desc: "Mide modelos antes de confiar." },
    ],
  },
  {
    slug: "como-usar-ia-para-seo-aeo-2026",
    title: "Cómo usar IA para SEO y AEO en 2026 sin crear contenido basura",
    description:
      "Workflow para SEO, AEO y citabilidad en asistentes IA sin caer en contenido genérico: fuentes, estructura, FAQs, experiencia y revisión.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "SEO y AEO",
    readingTime: "11 min",
    icon: "search",
    image: "/blog/como-usar-ia-para-seo-aeo-2026.png",
    editorNote:
      "Actualizado el 6 de julio de 2026 con Grok CLI: se refuerza AEO/GEO como extensión del SEO, no como truco mágico para asistentes.",
    keywords: ["IA para SEO 2026", "AEO", "aparecer en ChatGPT", "GEO generative engine optimization"],
    intro:
      "La IA puede acelerar investigación, briefs, FAQs, clusters y actualización de contenidos. También puede llenar tu web de texto correcto pero inútil. La diferencia está en fuentes, experiencia, estructura, revisión y datos propios.",
    sections: [
      {
        title: "AEO y GEO no sustituyen al SEO",
        body:
          "La señal más fuerte de la investigación es que AEO y GEO no son carreras separadas: son extensiones del SEO. Google insiste en contenido útil, técnico correcto, experiencia real y páginas que respondan bien a una intención. Los asistentes citan mejor lo que está claro, actualizado y respaldado.",
      },
      {
        title: "Workflow recomendado",
        body:
          "Investiga preguntas reales, agrupa por intención, crea una página útil, añade tabla o checklist, responde FAQs, enlaza fuentes, muestra ejemplos y actualiza la fecha cuando cambie algo relevante. Usa IA para acelerar el proceso, no para saltarte la investigación.",
        bullets: [
          "No publiques sin contrastar datos actuales.",
          "Incluye respuestas directas al principio de cada sección.",
          "Añade comparativas y criterios de decisión.",
          "Enlaza internamente a cursos, guías y ejemplos prácticos.",
        ],
      },
      {
        title: "El riesgo del AI slop",
        body:
          "No generes 100 posts intercambiables. El contenido genérico puede acabar alimentando respuestas de IA igualmente genéricas o falsas. Si una sección la podría escribir cualquier modelo sin haber investigado, probablemente no merece publicarse.",
      },
    ],
    table: {
      headers: ["Elemento", "Para Google", "Para asistentes IA", "Cuidado"],
      rows: [
        ["Contenido original", "Mejora autoridad y utilidad", "Aumenta citabilidad", "Requiere experiencia real"],
        ["Tabla/checklist", "Featured snippets y escaneo rápido", "Comparación compacta reutilizable", "No rellenar por rellenar"],
        ["FAQ", "People Also Ask", "Respuestas autocontenidas", "Preguntas reales, no inventadas"],
        ["Fuentes", "Confianza y E-E-A-T", "Verificación y citación", "Prioriza fuentes primarias"],
        ["Marca y comunidad", "Señales externas", "Menciones en fan-outs", "No comprar menciones falsas"],
      ],
    },
    faqs: [
      { q: "¿Qué es AEO?", a: "AEO es optimizar contenido para motores que responden directamente, como asistentes de IA y buscadores generativos." },
      { q: "¿La IA puede escribir artículos SEO?", a: "Puede ayudar, pero el valor lo ponen la investigación, ejemplos, experiencia y revisión editorial." },
      { q: "¿Cómo aparezco en ChatGPT o Perplexity?", a: "Crea páginas claras, verificables, actualizadas, con fuentes y respuestas completas a preguntas reales. No hay prompt mágico que sustituya autoridad y utilidad." },
    ],
    related: [
      { title: "AEO para pymes", href: "/cursos/ia-pymes/aeo-pymes", desc: "Cómo preparar una pyme para respuestas de IA." },
      { title: "Fuentes de Aulafy", href: "/fuentes", desc: "Documentación oficial usada en los cursos." },
      { title: "RAG seguro", href: "/cursos/rag-seguro", desc: "Aprende a responder con fuentes y citaciones." },
    ],
  },
  {
    slug: "mejores-prompts-chatgpt-claude-blogs",
    title: "Mejores prompts para ChatGPT y Claude si escribes blogs en español",
    description:
      "Sistema de prompts por fases para blogs: investigación, brief, estructura, redacción por secciones, edición dura, fact-checking y distribución.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "Prompts",
    readingTime: "8 min",
    icon: "prompt",
    image: "/blog/mejores-prompts-chatgpt-claude-blogs.png",
    editorNote:
      "Actualizado el 6 de julio de 2026 con Grok CLI: los prompts se reorganizan por fases para evitar un único mega-prompt genérico.",
    keywords: ["prompts ChatGPT blogs", "prompts Claude español", "prompts para escribir artículos IA"],
    intro:
      "Un buen prompt para blogs no pide “escribe un artículo”. El patrón que más se repite en X y en guías serias es trabajar por fases: investigación, brief, estructura, borrador por bloques, edición dura, fact-checking, actualización y distribución.",
    sections: [
      {
        title: "Prompt para investigación y brief",
        body:
          "Actúa como editor SEO. Crea un brief para la keyword principal, identifica intención de búsqueda, subtemas, preguntas frecuentes, riesgos de contenido genérico, fuentes mínimas y enlaces internos recomendados. No redactes todavía.",
      },
      {
        title: "Prompt para primer borrador por secciones",
        body:
          "Redacta solo una sección del artículo. Usa español claro, 2-4 párrafos cortos, un ejemplo concreto y marca con [VERIFICAR] cualquier dato que no puedas respaldar. Pedir el artículo entero de golpe suele producir texto uniforme y difícil de editar.",
      },
      {
        title: "Prompt para edición dura y fact-checking",
        body:
          "Revisa el texto como editor implacable: elimina frases vacías, promesas exageradas, repeticiones y huellas típicas de IA. Después lista todas las afirmaciones verificables, su riesgo y la fuente primaria que habría que consultar.",
      },
    ],
    table: {
      headers: ["Fase", "Prompt corto", "Resultado", "Cuidado"],
      rows: [
        ["Investigación", "Clasifica intención, preguntas reales y fuentes mínimas", "Mapa de intención", "Inventar volúmenes o tendencias"],
        ["Brief", "Define público, promesa, CTA, objeciones y límites", "Documento editorial", "Brief demasiado genérico"],
        ["Estructura", "Ordena H2/H3 por utilidad, no por hype", "Outline usable", "Copiar a competidores"],
        ["Redacción", "Escribe una sección con ejemplo y [VERIFICAR]", "Borrador claro", "Datos falsos o tono IA"],
        ["Edición", "Recorta lo genérico y exige pruebas", "Artículo más confiable", "Perder matices correctos"],
        ["Distribución", "Convierte en X, newsletter y LinkedIn sin inventar", "Copies derivados", "Clickbait"],
      ],
    },
    faqs: [
      { q: "¿Qué prompt funciona mejor para blogs?", a: "El que separa investigación, brief, estructura, redacción, edición y verificación. Pedir todo en una sola instrucción suele producir texto genérico." },
      { q: "¿Debo pedirle fuentes a la IA?", a: "Sí, pero debes verificarlas. Los modelos pueden equivocarse o inventar referencias." },
      { q: "¿Cómo evito contenido IA genérico?", a: "Incluye experiencia propia, ejemplos, datos, límites, capturas o resultados medibles." },
    ],
    related: [
      { title: "Escribir buenos prompts", href: "/cursos/claude-code/prompts", desc: "Fundamentos para pedir mejor." },
      { title: "Recetas prácticas", href: "/cursos/claude-code/recetas", desc: "Prompts reutilizables para trabajo real." },
      { title: "SEO y AEO con IA", href: "/blog/como-usar-ia-para-seo-aeo-2026", desc: "Cómo publicar sin crear contenido basura." },
    ],
  },
  {
    slug: "ia-para-pymes-autonomos-casos-uso-2026",
    title: "IA para pymes y autónomos: 25 casos de uso prácticos en 2026",
    description:
      "Casos de uso para pymes con criterio español: emails, facturas, WhatsApp, Excel, RAG privado, RGPD, Verifactu y revisión humana.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "Pymes",
    readingTime: "12 min",
    icon: "briefcase",
    image: "/blog/ia-para-pymes-autonomos-casos-uso-2026.png",
    editorNote:
      "Actualizado el 6 de julio de 2026 con Grok CLI: se añaden señales de pymes españolas, RGPD, Verifactu y revisión humana.",
    keywords: ["IA para pymes 2026", "IA para autónomos", "casos de uso IA empresa", "automatización IA pymes"],
    intro:
      "La IA útil para una pyme no empieza con un agente autónomo gigante. Empieza quitando fricción a tareas repetidas: leer, ordenar, resumir, responder, revisar y preparar borradores. En España, además, hay que mirar RGPD, Verifactu, facturación electrónica y revisión humana.",
    sections: [
      {
        title: "Empieza por tareas de bajo riesgo",
        body:
          "Los mejores primeros casos son emails, presupuestos, resúmenes, clasificación de consultas, plantillas y revisión de documentos no críticos. Dan ahorro rápido y permiten medir si la IA ayuda antes de tocar procesos sensibles.",
      },
      {
        title: "Facturas, Verifactu y revisión humana",
        body:
          "La IA puede leer facturas, extraer campos, detectar duplicados y preparar borradores, pero no debe sustituir al software fiscal ni a la revisión humana. Verifactu y la facturación electrónica requieren trazabilidad, reglas y herramientas adaptadas: el modelo ayuda, no certifica.",
      },
      {
        title: "Automatización e IA local",
        body:
          "Make puede bastar para flujos pequeños; n8n gana cuando necesitas control, self-hosting o integraciones con IA local. Para documentos confidenciales, un RAG privado con Ollama/Open WebUI/Qdrant reduce exposición, pero exige más mantenimiento.",
      },
    ],
    table: {
      headers: ["Área", "Caso de uso", "Herramientas", "Cuidado"],
      rows: [
        ["Email", "Clasificación, resumen y borradores", "Claude/ChatGPT/Gemini, Gmail/Outlook, n8n", "No enviar sin revisar"],
        ["Facturas", "OCR, extracción, alertas y duplicados", "OCR, LLM local/cloud, Sheets, software contable", "La emisión legal no depende del LLM"],
        ["WhatsApp", "FAQs, citas y triaje de clientes", "WhatsApp Business, n8n/Make", "Informar, limitar y aprobar acciones"],
        ["Excel/Sheets", "Análisis de ventas, gastos y previsiones", "Gemini/Copilot, Sheets, Excel", "Minimizar datos personales"],
        ["Documentos", "RAG privado sobre procedimientos", "Ollama, Open WebUI, Qdrant", "Permisos, citas y logs"],
        ["Leads", "Formulario → CRM → tarea comercial", "n8n, Make, CRM", "Evitar scoring opaco o discriminatorio"],
      ],
    },
    faqs: [
      { q: "¿Por dónde empieza una pyme con IA?", a: "Por un proceso repetido, de bajo riesgo y fácil de medir, como emails, facturas o FAQs." },
      { q: "¿Puedo usar IA con datos de clientes?", a: "Sí, pero debes revisar RGPD, base legal, proveedor, minimización de datos y revisión humana." },
      { q: "¿Verifactu ya es obligatorio?", a: "El calendario depende del tipo de contribuyente y de la normativa vigente. Revisa siempre AEAT y tu asesor antes de automatizar facturación." },
      { q: "¿Necesito programar?", a: "No para empezar. n8n, Make y asistentes generalistas cubren muchos flujos, aunque entender lo básico ayuda mucho." },
    ],
    related: [
      { title: "IA para pymes y autónomos", href: "/cursos/ia-pymes", desc: "Curso completo con flujos revisables." },
      { title: "Automatización self-hosted", href: "/cursos/automatizacion-self-hosted", desc: "n8n, Open WebUI y Ollama en tu servidor." },
      { title: "Facturas y Verifactu", href: "/cursos/ia-pymes/facturas-verifactu-ocr", desc: "OCR, alertas y revisión humana." },
    ],
  },
  {
    slug: "tendencias-ia-2026-agentes-ia-local-rag",
    title: "Tendencias de IA en 2026: agentes, IA local, RAG, vídeo y automatización",
    description:
      "Tendencias útiles separadas del hype: agentes verificables, IA local realista, RAG con permisos, evals, gobernanza, vídeo y automatización.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "Tendencias",
    readingTime: "10 min",
    icon: "chart",
    image: "/blog/tendencias-ia-2026-agentes-ia-local-rag.png",
    editorNote:
      "Actualizado el 6 de julio de 2026 con Grok CLI: se separan tendencias verificables de hype en agentes, IA local, RAG y evals.",
    keywords: ["tendencias IA 2026", "agentes IA 2026", "IA local 2026", "RAG 2026"],
    intro:
      "La tendencia importante no es “más IA en todo”. Es pasar de demos a sistemas medibles: agentes con permisos, IA local cuando importa la privacidad, RAG con citas, evals, gobernanza y automatizaciones con revisión humana.",
    sections: [
      {
        title: "Agentes verificables",
        body:
          "Los agentes útiles funcionan mejor donde hay tareas acotadas, tests, rúbricas o feedback automático. Estado, logs, herramientas limitadas, recuperación ante errores y aprobación humana importan más que prometer autonomía total.",
      },
      {
        title: "IA local más realista",
        body:
          "Ollama facilita empezar, llama.cpp/vLLM/SGLang empujan producción, MLX gana sentido en Mac y los modelos abiertos permiten práctica privada. La elección depende de hardware, carga y nivel de calidad esperado: local no significa automáticamente frontier.",
      },
      {
        title: "RAG seguro, evals y gobernanza",
        body:
          "Los equipos quieren consultar documentos privados con citas, permisos, OCR, tablas y defensa contra prompt injection. La tendencia madura no es solo RAG: es RAG con autorización, evals, trazas y política de uso.",
      },
    ],
    table: {
      headers: ["Tendencia", "Por qué importa", "Qué aprender", "Riesgo de hype"],
      rows: [
        ["Agentes verificables", "Automatizan tareas con herramientas", "MCP, logs, estado, permisos, evals", "Prometer autonomía total"],
        ["IA local", "Privacidad, coste y soberanía", "Ollama, llama.cpp, vLLM, Open WebUI", "Decir que iguala siempre a la nube"],
        ["RAG seguro", "Respuestas con documentos reales", "Chunking, reranking, permisos, citas", "Decir que elimina alucinaciones"],
        ["Multimodal", "Imagen, voz, vídeo y documentos complejos", "ComfyUI, Whisper, OCR, modelos visión", "Usar vídeo IA como verdad factual"],
        ["Fine-tuning", "Dominios estrechos y formatos concretos", "Datasets, LoRA, evals", "Entrenar sin datos curados"],
        ["Gobernanza", "Evita fugas, errores y automatismos peligrosos", "AI Act, RGPD, red teaming, logs", "Tratarlo como burocracia opcional"],
      ],
    },
    faqs: [
      { q: "¿Qué debería aprender primero en IA en 2026?", a: "Prompts claros, IA local básica, RAG con documentos, evals y automatización con revisión humana." },
      { q: "¿Los agentes ya sirven en producción?", a: "Sí en tareas acotadas con permisos, logs, evals y aprobación humana. No conviene soltarlos sin límites ni sandbox." },
      { q: "¿La IA local reemplaza a la nube?", a: "No siempre. Lo más práctico suele ser híbrido: local para datos sensibles y cloud para razonamiento complejo." },
      { q: "¿RAG elimina las alucinaciones?", a: "No. Reduce riesgos si recupera buenas fuentes, cita evidencias y se evalúa; no sustituye la revisión." },
    ],
    related: [
      { title: "Agentes y automatización", href: "/cursos/agentes-automatizacion", desc: "Diseña agentes útiles y mantenibles." },
      { title: "RAG avanzado y seguro", href: "/cursos/rag-seguro", desc: "Documentos privados con citaciones y evals." },
      { title: "MLOps local", href: "/cursos/mlops-local", desc: "Sirve modelos abiertos con control." },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
