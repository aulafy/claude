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
    slug: "mejores-herramientas-ia-gratis-2026",
    title: "Mejores herramientas de IA gratis en 2026: guía práctica para empezar",
    description:
      "Lista curada de herramientas de IA gratuitas o con plan gratis para escribir, programar, automatizar, crear imágenes, resumir documentos y trabajar con IA local.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "Herramientas IA",
    readingTime: "9 min",
    icon: "tools",
    image: "/blog/mejores-herramientas-ia-gratis-2026.png",
    keywords: ["mejores herramientas IA gratis 2026", "herramientas inteligencia artificial gratis", "IA gratis español"],
    intro:
      "La mejor herramienta de IA no es la que más ruido hace, sino la que resuelve tu tarea con menos fricción. Esta guía separa herramientas para escribir, programar, buscar, crear multimedia, automatizar y trabajar en local.",
    sections: [
      {
        title: "Cómo elegir sin perder tiempo",
        body:
          "Empieza por la tarea: redactar, investigar, crear código, procesar documentos, generar imágenes o automatizar. Después mira privacidad, límites del plan gratuito, facilidad de exportación y si puedes revisar el resultado.",
        bullets: [
          "Para escribir y resumir: prioriza calidad de razonamiento y edición.",
          "Para programar: mira contexto, integración con repos y control de cambios.",
          "Para datos sensibles: usa IA local o servicios con contrato claro.",
          "Para automatizar: exige aprobaciones humanas antes de acciones críticas.",
        ],
      },
      {
        title: "Herramientas que merece probar",
        body:
          "Claude, ChatGPT, Gemini y Grok son buenos puntos de partida generalistas. Ollama, LM Studio y Open WebUI sirven para IA local. n8n ayuda a automatizar flujos. ComfyUI y herramientas basadas en Diffusers cubren imagen y vídeo con más control técnico.",
      },
      {
        title: "Qué evitar",
        body:
          "Evita listas infinitas sin pruebas, extensiones que piden permisos excesivos y herramientas que prometen sustituir procesos completos sin revisión. Una pyme necesita control, no una caja negra.",
      },
    ],
    table: {
      headers: ["Uso", "Herramientas", "Ideal para", "Cuidado"],
      rows: [
        ["Chat general", "Claude, ChatGPT, Gemini, Grok", "Redacción, análisis, planificación", "Verifica fuentes y datos recientes"],
        ["IA local", "Ollama, LM Studio, Open WebUI", "Privacidad, pruebas, documentos internos", "Requiere hardware y mantenimiento"],
        ["Automatización", "n8n, Make, scripts", "Flujos repetitivos", "Usa aprobaciones humanas"],
        ["Imagen y vídeo", "ComfyUI, Diffusers, FLUX", "Assets, recursos educativos", "Licencias y consistencia visual"],
      ],
    },
    faqs: [
      { q: "¿Cuál es la mejor IA gratis?", a: "Depende de la tarea. Para empezar, combina un asistente generalista con una herramienta local como Ollama si trabajas con datos sensibles." },
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
      "Comparativa práctica de ChatGPT, Claude, Gemini y Grok para escribir, programar, investigar, analizar documentos, crear contenido y trabajar con datos recientes.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "Comparativas",
    readingTime: "10 min",
    icon: "compare",
    image: "/blog/chatgpt-vs-claude-vs-gemini-vs-grok-2026.png",
    keywords: ["ChatGPT vs Claude vs Gemini vs Grok 2026", "mejor IA para programar", "comparativa modelos IA"],
    intro:
      "No hay un ganador universal. Hay modelos que encajan mejor con escritura larga, código, investigación, multimodalidad, datos recientes o flujos de trabajo con herramientas.",
    sections: [
      {
        title: "La regla útil",
        body:
          "Usa el modelo que mejor resuelva tu tarea medible. Si no tienes una prueba propia, estarás eligiendo por marketing. Define 10 tareas reales y compara calidad, coste, velocidad, fuentes y facilidad de revisión.",
      },
      {
        title: "Dónde suele brillar cada uno",
        body:
          "Claude suele encajar muy bien en escritura larga, análisis y programación asistida con Claude Code. ChatGPT destaca por ecosistema y versatilidad. Gemini es fuerte cuando trabajas dentro del ecosistema Google y multimodalidad. Grok aporta valor cuando necesitas señales sociales o conversación pegada a X.",
      },
      {
        title: "Cómo hacer una comparativa honesta",
        body:
          "Usa el mismo prompt, los mismos documentos, criterios de calidad y revisión humana. Guarda respuestas, tiempos, coste aproximado y errores. Lo importante no es la puntuación absoluta, sino qué modelo falla menos en tu trabajo.",
      },
    ],
    table: {
      headers: ["Tarea", "Buena opción inicial", "Qué medir"],
      rows: [
        ["Programar", "Claude Code, ChatGPT", "Tests, diffs, errores, tiempo hasta merge"],
        ["Investigación reciente", "Grok, Perplexity, ChatGPT con búsqueda", "Fuentes, fechas, citas, omisiones"],
        ["Documentos largos", "Claude, Gemini", "Fidelidad, estructura, citas"],
        ["Automatización", "Claude + n8n/LangGraph, OpenAI/Google APIs", "Permisos, logs, fallos, coste"],
      ],
    },
    faqs: [
      { q: "¿Claude es mejor que ChatGPT para programar?", a: "Puede serlo en muchos flujos con repos y contexto largo, pero la respuesta correcta es probarlo con tu código, tus tests y tus restricciones." },
      { q: "¿Grok sirve para investigación?", a: "Puede ser útil para señales de X y conversación reciente, pero conviene contrastar con fuentes oficiales antes de publicar." },
      { q: "¿Debo usar solo un modelo?", a: "No. Para trabajo serio suele funcionar mejor una estrategia híbrida: modelo fuerte para razonamiento y modelo local o barato para tareas repetibles." },
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
      "Guía práctica para usar IA en SEO, AEO y visibilidad en respuestas de ChatGPT, Perplexity, Grok y Google AI sin caer en contenido genérico.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "SEO y AEO",
    readingTime: "11 min",
    icon: "search",
    image: "/blog/como-usar-ia-para-seo-aeo-2026.png",
    keywords: ["IA para SEO 2026", "AEO", "aparecer en ChatGPT", "GEO generative engine optimization"],
    intro:
      "La IA puede acelerar investigación, briefs, FAQs, clusters y actualización de contenidos. También puede llenar tu web de texto correcto pero inútil. La diferencia está en fuentes, experiencia, estructura y revisión.",
    sections: [
      {
        title: "SEO para Google y AEO para asistentes",
        body:
          "SEO busca que una página rankee. AEO busca que una respuesta automática entienda y cite bien tu contenido. Ambos necesitan claridad, autoridad, datos estructurados, preguntas reales y contenido actualizado.",
      },
      {
        title: "Workflow recomendado",
        body:
          "Investiga preguntas reales, agrupa por intención, crea una página útil, añade tabla o checklist, responde FAQs, enlaza fuentes, muestra ejemplos y actualiza la fecha cuando cambie algo relevante.",
        bullets: [
          "No publiques sin contrastar datos actuales.",
          "Incluye respuestas directas al principio de cada sección.",
          "Añade comparativas y criterios de decisión.",
          "Enlaza internamente a cursos, guías y ejemplos prácticos.",
        ],
      },
      {
        title: "Qué no hacer",
        body:
          "No generes 100 posts intercambiables. Google y los asistentes no necesitan más texto genérico sobre IA: necesitan páginas con criterio, experiencia, ejemplos y límites claros.",
      },
    ],
    table: {
      headers: ["Elemento", "Para Google", "Para asistentes IA"],
      rows: [
        ["Título", "Keyword e intención", "Pregunta clara que pueda citarse"],
        ["Tabla", "Featured snippets", "Comparación compacta reutilizable"],
        ["FAQ", "People Also Ask", "Respuestas directas y autocontenidas"],
        ["Fuentes", "Confianza", "Citación y verificación"],
      ],
    },
    faqs: [
      { q: "¿Qué es AEO?", a: "AEO es optimizar contenido para motores que responden directamente, como asistentes de IA y buscadores generativos." },
      { q: "¿La IA puede escribir artículos SEO?", a: "Puede ayudar, pero el valor lo ponen la investigación, ejemplos, experiencia y revisión editorial." },
      { q: "¿Cómo aparezco en ChatGPT o Perplexity?", a: "Crea páginas claras, verificables, actualizadas, con datos estructurados, autoridad externa y respuestas completas a preguntas reales." },
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
      "Prompts prácticos para investigar, estructurar, redactar, editar y actualizar artículos de blog en español con ChatGPT, Claude y modelos similares.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "Prompts",
    readingTime: "8 min",
    icon: "prompt",
    image: "/blog/mejores-prompts-chatgpt-claude-blogs.png",
    keywords: ["prompts ChatGPT blogs", "prompts Claude español", "prompts para escribir artículos IA"],
    intro:
      "Un buen prompt para blogs no pide “escribe un artículo”. Define público, intención, fuentes, criterio editorial, estructura, ejemplos y revisión. Aquí tienes plantillas que puedes adaptar.",
    sections: [
      {
        title: "Prompt para brief SEO",
        body:
          "Actúa como editor SEO. Crea un brief para la keyword principal, identifica intención de búsqueda, subtemas, preguntas frecuentes, riesgos de contenido genérico y enlaces internos recomendados. No redactes todavía.",
      },
      {
        title: "Prompt para primer borrador",
        body:
          "Escribe un borrador en español claro para lectores no expertos. Usa H2 descriptivos, respuestas directas, una tabla comparativa y ejemplos prácticos. Marca cualquier dato que necesite verificación actual.",
      },
      {
        title: "Prompt para edición dura",
        body:
          "Revisa el texto como editor implacable. Elimina frases vacías, promesas exageradas y repeticiones. Añade límites, casos donde no aplica y una checklist accionable.",
      },
    ],
    table: {
      headers: ["Fase", "Prompt corto", "Resultado"],
      rows: [
        ["Investigación", "Dame preguntas reales y entidades relacionadas", "Mapa de intención"],
        ["Estructura", "Ordena el artículo por utilidad, no por hype", "Outline usable"],
        ["Redacción", "Explica con ejemplos y límites", "Borrador claro"],
        ["Edición", "Recorta lo genérico y exige pruebas", "Artículo más confiable"],
      ],
    },
    faqs: [
      { q: "¿Qué prompt funciona mejor para blogs?", a: "El que separa investigación, estructura, redacción y edición. Pedir todo en una sola instrucción suele producir texto genérico." },
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
      "Casos de uso reales de IA para autónomos y pymes: facturas, emails, WhatsApp, presupuestos, Excel, marketing, atención al cliente, RAG y automatización.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "Pymes",
    readingTime: "12 min",
    icon: "briefcase",
    image: "/blog/ia-para-pymes-autonomos-casos-uso-2026.png",
    keywords: ["IA para pymes 2026", "IA para autónomos", "casos de uso IA empresa", "automatización IA pymes"],
    intro:
      "La IA útil para una pyme no empieza con un agente autónomo gigante. Empieza quitando fricción a tareas repetidas: leer, ordenar, resumir, responder, revisar y preparar borradores.",
    sections: [
      {
        title: "Administración y finanzas",
        body:
          "Extraer datos de facturas, detectar duplicados, preparar CSV revisables, clasificar gastos, generar recordatorios de cobro y resumir movimientos. Siempre con revisión humana en contabilidad e impuestos.",
      },
      {
        title: "Ventas y atención al cliente",
        body:
          "Clasificar emails, preparar borradores, responder FAQs, cualificar leads por WhatsApp, resumir llamadas y convertir conversaciones en tareas. La clave es aprobar antes de enviar.",
      },
      {
        title: "Marketing y visibilidad",
        body:
          "Crear calendarios de contenido, transformar casos reales en posts, mejorar páginas de servicios y preparar FAQs para Google y asistentes de IA.",
      },
    ],
    table: {
      headers: ["Área", "Caso de uso", "Herramientas"],
      rows: [
        ["Facturas", "OCR, extracción y alertas", "OCR, LLM local, Sheets, n8n"],
        ["Email", "Clasificación y borradores", "Claude, Gmail/Outlook, n8n"],
        ["WhatsApp", "FAQs y citas con aprobación", "WhatsApp Business, n8n"],
        ["Documentos", "RAG privado", "Ollama, Open WebUI, Qdrant"],
      ],
    },
    faqs: [
      { q: "¿Por dónde empieza una pyme con IA?", a: "Por un proceso repetido, de bajo riesgo y fácil de medir, como emails, facturas o FAQs." },
      { q: "¿Puedo usar IA con datos de clientes?", a: "Sí, pero debes revisar RGPD, base legal, proveedor, minimización de datos y revisión humana." },
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
      "Resumen práctico de las tendencias de IA más importantes en 2026 para aprender, trabajar y construir: agentes, IA local, RAG seguro, multimodalidad y pymes.",
    date: "2026-07-06",
    updated: "2026-07-06",
    category: "Tendencias",
    readingTime: "10 min",
    icon: "chart",
    image: "/blog/tendencias-ia-2026-agentes-ia-local-rag.png",
    keywords: ["tendencias IA 2026", "agentes IA 2026", "IA local 2026", "RAG 2026"],
    intro:
      "La tendencia importante no es “más IA en todo”. Es pasar de demos a sistemas medibles: agentes con permisos, IA local cuando importa la privacidad, RAG con citas y automatizaciones con revisión humana.",
    sections: [
      {
        title: "Agentes con control",
        body:
          "Los agentes útiles tienen estado, logs, herramientas limitadas, recuperación ante errores y aprobación humana. El hype está bajando; la arquitectura está subiendo.",
      },
      {
        title: "IA local más realista",
        body:
          "Ollama facilita empezar, vLLM y SGLang empujan producción, MLX gana sentido en Mac y los modelos abiertos permiten prototipos privados. La elección depende de hardware y carga.",
      },
      {
        title: "RAG seguro y multimodal",
        body:
          "Los equipos quieren consultar documentos privados con citas, permisos, OCR, tablas y defensa contra prompt injection. RAG deja de ser chat con PDF y se acerca a infraestructura de conocimiento.",
      },
    ],
    table: {
      headers: ["Tendencia", "Por qué importa", "Qué aprender"],
      rows: [
        ["Agentes", "Automatizan tareas con herramientas", "MCP, logs, estado, permisos"],
        ["IA local", "Privacidad y control de costes", "Ollama, vLLM, Open WebUI"],
        ["RAG seguro", "Respuestas con documentos reales", "Chunking, reranking, evals"],
        ["Multimodal", "Imagen, voz, vídeo y documentos complejos", "ComfyUI, Whisper, OCR"],
      ],
    },
    faqs: [
      { q: "¿Qué debería aprender primero en IA en 2026?", a: "Prompts claros, IA local básica, RAG con documentos y automatización con revisión humana." },
      { q: "¿Los agentes ya sirven en producción?", a: "Sí en tareas acotadas con permisos, logs, evals y aprobación humana. No conviene soltarlos sin límites." },
      { q: "¿La IA local reemplaza a la nube?", a: "No siempre. Lo más práctico suele ser híbrido: local para datos sensibles y cloud para razonamiento complejo." },
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
