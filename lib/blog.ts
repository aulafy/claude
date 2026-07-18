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
  sources?: Array<{ title: string; href: string; note?: string }>;
  faqs: Array<{ q: string; a: string }>;
  related: Array<{ title: string; href: string; desc: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "kimi-k3-moonshot-modelo-abierto-2026",
    title: "Kimi K3 de Moonshot AI: qué cambia un modelo abierto de 2,8 billones de parámetros",
    description:
      "Análisis en español de Kimi K3: escala, contexto de un millón de tokens, arquitectura MoE, precios API, pesos anunciados y límites reales para desarrolladores y empresas.",
    date: "2026-07-18",
    updated: "2026-07-18",
    category: "Modelos abiertos",
    readingTime: "12 min",
    icon: "brain",
    image: "/blog/kimi-k3-moonshot-modelo-abierto-2026.png",
    editorNote:
      "Verificado el 18 de julio de 2026 con documentación oficial de Moonshot AI y Kimi. Las especificaciones, disponibilidad y precios pueden cambiar; los pesos completos están anunciados para el 27 de julio, por lo que este artículo no los trata como disponibles todavía.",
    keywords: [
      "Kimi K3 en español",
      "Moonshot AI Kimi K3",
      "Kimi K3 2.8T parámetros",
      "Kimi K3 open weights",
      "Kimi K3 API precio",
      "modelo abierto MoE 2026",
      "Kimi Code",
    ],
    intro:
      "Kimi K3 es una noticia importante, pero no por una cifra espectacular aislada. Moonshot AI acaba de anunciar un modelo de 2,8 billones de parámetros, multimodal y con un millón de tokens de contexto; a la vez, sus límites de despliegue obligan a separar tres ideas que suelen confundirse: acceso por API, pesos abiertos y ejecución local. Esta guía explica qué está confirmado, qué sigue pendiente y cómo evaluarlo sin dejarse llevar por el hype.",
    sections: [
      {
        title: "Qué ha anunciado Moonshot AI",
        body:
          "Moonshot AI presenta Kimi K3 como un modelo de 2,8 billones de parámetros con comprensión visual nativa y una ventana de contexto de hasta un millón de tokens. La compañía lo sitúa en tareas de código de larga duración, razonamiento profundo y trabajo sobre grandes cantidades de información. Puede probarse a través de Kimi, Kimi Code y la plataforma API, pero cada vía tiene implicaciones distintas de coste, privacidad y control.",
        bullets: [
          "Escala declarada: 2,8 billones de parámetros en total.",
          "Capacidades declaradas: texto, comprensión visual y hasta un millón de tokens de contexto.",
          "Acceso actual: producto Kimi, Kimi Code y API de Moonshot.",
          "Pesos completos: anunciados por Moonshot para el 27 de julio de 2026.",
        ],
      },
      {
        title: "Abierto no significa descargable hoy ni ejecutable en tu portátil",
        body:
          "En IA se usa «abierto» para cosas diferentes. Puede querer decir que existe un cliente de código abierto, que se publicará un conjunto de pesos, que un modelo se puede consumir por API o que permite modificaciones bajo una licencia concreta. No son equivalentes. A la fecha de esta guía, Moonshot anuncia los pesos completos para el 27 de julio; hasta que se publiquen, no conviene dar por supuesta su licencia final, los formatos de cuantización disponibles ni el soporte de cada runtime.",
        bullets: [
          "Usar la API no te da control local sobre los pesos ni elimina costes variables.",
          "Que los pesos se publiquen no convierte automáticamente el modelo en apto para una GPU doméstica.",
          "La licencia real se comprueba en el repositorio y en los avisos de la versión concreta, no en un titular.",
          "Una prueba útil empieza por la tarea, los datos permitidos y un presupuesto; no por descargar el modelo más grande.",
        ],
      },
      {
        title: "Por qué 2,8T no equivale a calcular 2,8T en cada token",
        body:
          "K3 usa una arquitectura Mixture of Experts o MoE. Moonshot explica que activa 16 de 896 expertos para cada token, en lugar de recorrer todos los parámetros del modelo en cada paso. También describe Kimi Delta Attention (KDA) y AttnRes como componentes pensados para mantener eficiencia y capacidad con contextos largos. Es una diferencia importante para el coste de cómputo, pero no una licencia para olvidar la memoria, la red, el almacenamiento ni la complejidad de servir un modelo de esta escala.",
        bullets: [
          "MoE reduce el cómputo activo por token, pero el conjunto completo de pesos sigue teniendo que almacenarse y gestionarse.",
          "Moonshot indica entrenamiento y cuantización conscientes de MXFP4 para pesos y MXFP8 para activaciones; no equivale a que cualquier cuantización sea inocua.",
          "El número de parámetros describe escala, no la calidad garantizada de tu caso de uso.",
          "En una comparación real importan también el prompt, las herramientas, el contexto recuperado, la latencia y la tasa de errores.",
        ],
      },
      {
        title: "El límite práctico: infraestructura, memoria y operación",
        body:
          "Una cuenta sencilla ayuda a poner las cifras en perspectiva: 2,8 billones de parámetros a 4 bits por parámetro requieren aproximadamente 1,4 TB solo para representar los pesos, antes de memoria adicional, cachés de contexto, metadatos y operación distribuida. Es una estimación matemática, no una configuración de producción. Moonshot recomienda supernodos con 64 o más aceleradores para servir K3 eficientemente. Por eso, para una persona o una pyme, la pregunta sensata hoy suele ser cómo evaluar el modelo por API de forma segura, no cómo instalarlo en un portátil.",
        bullets: [
          "No confundas pesos abiertos con coste operativo cero.",
          "Un contexto de un millón de tokens aumenta el potencial, pero puede aumentar también la latencia y la factura si se usa sin diseño.",
          "RAG, resumen progresivo y caché pueden ser mejores que reenviar una biblioteca completa en cada petición.",
          "El despliegue propio necesita además observabilidad, control de acceso, actualización, capacidad y respuesta a incidentes.",
        ],
      },
      {
        title: "Benchmarks: cómo leer las comparativas sin convertirlas en un ranking universal",
        body:
          "Moonshot publica resultados y notas metodológicas sobre sus evaluaciones. Son información útil para formular hipótesis, no una garantía de que K3 sea el mejor modelo para cualquier tarea. Un benchmark cambia si cambias el harness, el número de intentos, las herramientas, el presupuesto de tokens, la versión del modelo o la definición de éxito. La comparación que importa es la que puedes repetir con una muestra representativa de tu trabajo y una rúbrica escrita antes de mirar el resultado.",
        bullets: [
          "Lee qué se midió, con qué versión, en qué fecha y bajo qué configuración.",
          "Separa calidad de respuesta, coste por tarea, latencia, tasa de reintentos y seguridad.",
          "No adoptes un modelo por una única demo ni por un ranking de una tarea ajena.",
          "Conserva entradas sintéticas o autorizadas, resultados y criterios para poder comparar actualizaciones.",
        ],
      },
      {
        title: "Precio y acceso: una prueba por API no es una decisión de arquitectura",
        body:
          "Al comprobar la plataforma API el 18 de julio, K3 mostraba 0,30 USD por millón de tokens de caché leídos, 3 USD por millón de tokens de entrada y 15 USD por millón de tokens de salida. Esas tarifas pueden cambiar y no sustituyen una estimación de uso. Antes de integrar una API, fija un límite de gasto, registra tokens de entrada y salida, evita incluir información sensible sin base legal y construye una salida de emergencia si el proveedor falla o cambia sus condiciones.",
        bullets: [
          "Mide coste por resultado aceptado, no solo coste por petición.",
          "Usa presupuestos, límites por usuario y alertas antes de abrir una función a clientes.",
          "Envía únicamente el contexto necesario y revisa qué datos se conservan en cada proveedor.",
          "Para producción, define una degradación útil: respuesta diferida, modelo alternativo o revisión humana.",
        ],
      },
      {
        title: "Kimi Code y agentes: capacidad no es permiso para soltarlo",
        body:
          "Kimi Code combina el modelo con un agente de terminal capaz de leer y editar archivos, ejecutar comandos y usar herramientas. Eso lo hace interesante para prototipos y tareas de ingeniería, pero amplía la superficie de riesgo. Moonshot advierte que K3 puede ser sensible a la conservación del historial de razonamiento y que puede resultar demasiado proactivo si no recibe límites explícitos. En un repositorio real, comienza con permisos mínimos, datos ficticios, cambios revisables y comandos que no puedan destruir ni publicar nada.",
        bullets: [
          "Escribe qué puede leer, editar, ejecutar y enviar por red antes de iniciar una sesión de agente.",
          "No le des secretos, acceso de producción ni capacidad de desplegar en la primera prueba.",
          "Pide un plan y una lista de archivos antes de aceptar una modificación.",
          "No cambies de modelo a mitad de una tarea larga sin volver a verificar el resultado y el contexto.",
        ],
      },
      {
        title: "Plan de evaluación de una hora para un equipo técnico",
        body:
          "No necesitas decidir hoy si K3 será parte de tu arquitectura. Sí puedes preparar una prueba pequeña y reproducible. Elige cinco tareas sin datos sensibles: extraer campos de facturas ficticias, explicar una función de un repositorio de ejemplo, transformar texto a JSON con esquema, buscar contradicciones en un documento sintético y proponer una corrección de test. Define la respuesta esperada antes de ejecutar; registra prompt, modelo, herramientas, tokens, tiempo, resultado y revisión humana. Repite la misma batería con una alternativa y decide con evidencia.",
        bullets: [
          "Criterio de salida: un resultado correcto, verificable y dentro de un coste y tiempo máximos definidos.",
          "Incluye al menos un caso ambiguo y otro que deba rechazarse por falta de información.",
          "No uses esa hora para conectar pagos, correo, CRM o una base de datos de clientes.",
          "Si no puedes explicar por qué una salida es correcta, todavía no es una evaluación suficiente para producción.",
        ],
      },
      {
        title: "Qué significa para quien aprende y construye en Aulafy",
        body:
          "Kimi K3 es una buena ocasión para aprender el criterio que sobrevive a la herramienta de la semana: distinguir anuncio de disponibilidad, modelo de producto, pesos de infraestructura y demo de evaluación. La meta no es saber repetir 2,8T o un millón de tokens. La meta es poder formular una tarea, proteger los datos, medir calidad y coste, y decidir si una tecnología resuelve de verdad un problema de una persona o de un negocio.",
        bullets: [
          "Si estás empezando, prueba una tarea pequeña y aprende a revisar la salida.",
          "Si programas, crea una batería de evals antes de conectar un agente a herramientas reales.",
          "Si trabajas en una pyme, prioriza un flujo repetitivo, reversible y con una persona responsable de aprobarlo.",
          "Si buscas IA local, empieza con modelos que correspondan a tu hardware y usa K3 como referencia de arquitectura, no como requisito inmediato.",
        ],
      },
    ],
    table: {
      headers: ["Aspecto", "Estado confirmado el 18 de julio", "Qué no debes asumir"],
      rows: [
        ["Escala", "2,8T parámetros; MoE con 16 de 896 expertos activos, según Moonshot", "Que sus requisitos sean parecidos a un modelo local pequeño"],
        ["Contexto y visión", "Hasta 1M de tokens y comprensión visual nativa", "Que todo el contexto deba enviarse o que sustituya RAG y verificación"],
        ["Acceso", "Kimi, Kimi Code y API están disponibles", "Que los pesos completos estén disponibles hoy"],
        ["Pesos", "Moonshot anuncia su publicación para el 27 de julio de 2026", "La licencia exacta o el soporte de cada runtime antes de la publicación"],
        ["Despliegue", "Moonshot recomienda supernodos con 64 o más aceleradores para servirlo eficientemente", "Que sea práctico en un portátil o una sola GPU"],
        ["Benchmarks", "El proveedor publica resultados detallados y notas metodológicas", "Un ganador universal independiente de harness, tarea y presupuesto"],
      ],
    },
    faqs: [
      { q: "¿Puedo usar Kimi K3 hoy?", a: "Sí, Moonshot lo ofrece en Kimi, Kimi Code y su API. La publicación de los pesos completos está anunciada para el 27 de julio de 2026; comprueba el estado y las condiciones el día de la descarga." },
      { q: "¿Podré ejecutarlo en mi ordenador?", a: "No es una expectativa realista para un equipo personal. El modelo tiene 2,8T de parámetros y Moonshot recomienda configuraciones de 64 o más aceleradores para servirlo eficientemente. Los pesos abiertos no eliminan los requisitos de memoria y operación." },
      { q: "¿Kimi K3 es realmente open source?", a: "Moonshot lo presenta como abierto y anuncia pesos completos, pero debes verificar el repositorio, la licencia y los avisos de terceros de la versión publicada antes de asumir permisos de uso, redistribución o ajuste." },
      { q: "¿Supera a Claude, GPT o cualquier otro modelo?", a: "No existe esa respuesta sin definir tarea, harness, versión, coste, contexto y criterio de éxito. Los benchmarks del proveedor son una señal; tu evaluación reproducible y las mediciones independientes deben decidir una adopción." },
      { q: "¿Qué debería probar primero?", a: "Una tarea no sensible, repetible y revisable: un repositorio de ejemplo, un documento sintético o una evaluación de formato. Define el resultado correcto antes de pedirle nada y conserva los logs." },
    ],
    sources: [
      { title: "Moonshot AI · página de Kimi K3", href: "https://www.moonshot.ai/", note: "Anuncio, escala, contexto y modalidades." },
      { title: "Kimi K3 Tech Blog: Open Frontier Intelligence", href: "https://www.kimi.com/blog/kimi-k3", note: "Arquitectura, disponibilidad, metodología, limitaciones e infraestructura recomendada." },
      { title: "Kimi Code · novedades del 16 de julio de 2026", href: "https://www.kimi.com/code/docs/en/kimi-code/whats-new.html", note: "Disponibilidad de K3 en Kimi Code." },
      { title: "Kimi API Platform · precios de K3", href: "https://platform.kimi.ai/", note: "Tarifas mostradas al verificar esta guía." },
      { title: "MoonshotAI/kimi-code en GitHub", href: "https://github.com/MoonshotAI/kimi-code", note: "Código, instalación, permisos, hooks y capacidades del agente." },
    ],
    related: [
      { title: "Modelos locales: Ollama, vLLM, SGLang y MLX", href: "/cursos/ia-local/ollama-vllm-sglang-mlx", desc: "Elige runtime según hardware, carga y objetivo." },
      { title: "MLOps local y despliegue de modelos", href: "/cursos/mlops-local", desc: "Serving, gateways, costes y operación de modelos." },
      { title: "Agentes en producción", href: "/cursos/agentes-produccion", desc: "Estado, permisos, evaluación y recuperación ante fallos." },
      { title: "Codex para programadores", href: "/cursos/codex-programadores", desc: "Un flujo verificable para trabajar con agentes de código." },
      { title: "Tendencias de IA en 2026", href: "/blog/tendencias-ia-2026-agentes-ia-local-rag", desc: "Qué merece aprender más allá del modelo de la semana." },
    ],
  },
  {
    slug: "como-empezar-usar-ia-2026",
    title: "Cómo empezar a usar IA en 2026: qué herramienta elegir y qué aprender primero",
    description:
      "Guía práctica en español para empezar con IA sin perderse: elige una tarea, compara herramientas con criterio, protege datos y aprende con un plan de 30 días.",
    date: "2026-07-18",
    updated: "2026-07-18",
    category: "Empezar con IA",
    readingTime: "16 min",
    icon: "brain",
    image: "/blog/como-empezar-usar-ia-2026.png",
    editorNote:
      "Actualizado el 18 de julio de 2026. Esta guía no presenta un ranking de herramientas ni afirma cuáles son las preguntas más frecuentes de X: parte de bloqueos recurrentes observados en conversaciones públicas y los convierte en un método de aprendizaje verificable.",
    keywords: [
      "cómo empezar a usar inteligencia artificial",
      "aprender IA desde cero 2026",
      "qué IA usar para empezar",
      "guía inteligencia artificial principiantes",
      "ChatGPT Claude Gemini Grok elegir",
      "aprender IA en español",
    ],
    intro:
      "Empezar con inteligencia artificial no consiste en abrir cinco chats y probar prompts al azar. Consiste en elegir una tarea pequeña, usar una herramienta con límites claros, comprobar el resultado y repetir. Esta guía te da ese orden para aprender sin depender de la herramienta de moda.",
    sections: [
      {
        title: "La primera decisión no es qué IA es mejor",
        body:
          "La pregunta «¿cuál es la mejor IA?» parece lógica, pero suele bloquear más de lo que ayuda. No hay un ganador universal: un modelo puede ir muy bien para resumir, otro para programar y otro para trabajar dentro de un ecosistema concreto. Antes de comparar nombres, escribe una frase: «quiero usar IA para [tarea] y sabré que me ayuda si [resultado comprobable]». Esa frase te ahorra semanas de pruebas sin rumbo.",
        bullets: [
          "Mala primera meta: aprender todas las herramientas de IA.",
          "Buena primera meta: convertir tres emails largos en borradores revisables durante una semana.",
          "Buena primera meta: estudiar un tema con preguntas, fuentes y explicación de errores.",
          "Buena primera meta: crear una página sencilla y verla funcionar en tu navegador.",
        ],
      },
      {
        title: "Elige una tarea de bajo riesgo y con resultado visible",
        body:
          "Tu primer uso no debería ser enviar un contrato, contestar a un cliente sin revisión, tomar una decisión médica o subir una base de datos. Elige una tarea reversible: resumir un texto que ya conoces, proponer un esquema, clasificar ideas, preparar una lista de comprobación o crear un borrador. Si la salida es mala, puedes compararla con tu criterio sin causar daño.",
        bullets: [
          "Bajo riesgo: borradores, esquemas, lluvia de ideas, explicaciones y ejercicios ficticios.",
          "Riesgo medio: documentos internos, datos de clientes, código de un proyecto o contenido que otra persona va a leer.",
          "Alto riesgo: salud, derecho, finanzas, evaluación académica, contratación, pagos, publicación o acciones automáticas.",
          "A mayor riesgo, más fuentes, permisos, revisión humana y trazabilidad necesitas.",
        ],
      },
      {
        title: "Cómo elegir entre ChatGPT, Claude, Gemini, Grok y opciones locales",
        body:
          "No elijas por fanatismo ni por una captura viral. Abre una cuenta o prueba disponible que encaje con tus condiciones y compara la misma tarea en dos opciones como máximo. Para empezar, un asistente generalista puede bastar. Si trabajas mucho con documentos, investigación, código o el ecosistema de una empresa, mira después la integración, los límites, las fuentes, la privacidad y el coste por resultado útil.",
        bullets: [
          "Chat general y planificación: busca claridad, edición y facilidad de revisión.",
          "Documentos e investigación: exige fechas, fuentes y la posibilidad de volver al original.",
          "Programación: mide tests, cambios pequeños, permisos y tiempo hasta que algo funciona.",
          "Datos sensibles: estudia opciones locales o un proveedor con condiciones adecuadas; local también tiene coste de hardware y mantenimiento.",
        ],
      },
      {
        title: "Gratis, de pago y local: calcula el coste completo",
        body:
          "Gratis no significa ilimitado ni necesariamente adecuado para datos de trabajo. Un plan sin coste puede tener cupos, colas, funciones reducidas o condiciones que cambian. Una suscripción puede ahorrar tiempo, pero no sustituye la revisión. Y una instalación local puede reducir exposición de datos, aunque añade equipo, energía, configuración, actualizaciones y soporte. El coste correcto es el de llegar a una salida buena y segura, no solo el precio por mes o por token.",
        bullets: [
          "Anota cuántos intentos necesitas hasta conseguir un resultado utilizable.",
          "Cuenta el tiempo que tardas en comprobar y corregir la salida.",
          "No subas datos personales, secretos o documentos confidenciales solo porque una prueba sea gratis.",
          "Si dependes de una cuota, prepara una alternativa para cuando llegue al límite.",
        ],
      },
      {
        title: "Un prompt útil se parece a un buen encargo",
        body:
          "No necesitas aprender fórmulas mágicas. Una petición útil explica contexto, objetivo, formato, límites y comprobación. La IA no conoce tu situación salvo que la describas; tampoco debe decidir por ti qué es correcto. Empieza con instrucciones cortas y mejora una variable cada vez, en lugar de copiar un mega-prompt que no entiendes.",
        bullets: [
          "Contexto: para quién es, qué material existe y qué no debe asumir.",
          "Objetivo: qué resultado concreto quieres obtener.",
          "Formato: tabla, esquema, borrador, lista de pasos o código con tests.",
          "Límites: tono, extensión, datos que no debe usar y cuándo debe abstenerse.",
          "Comprobación: pide fuentes, supuestos, dudas y una lista para revisar.",
        ],
      },
      {
        title: "Estudiar y trabajar con IA sin delegar tu criterio",
        body:
          "La IA puede explicar un concepto de tres formas, generar ejercicios, señalar lagunas en un borrador o preparar preguntas de repaso. No puede aprender por ti ni convertir una entrega no leída en trabajo propio. En universidad y trabajo, revisa las normas de tu centro u organización, declara el uso cuando corresponda y conserva las fuentes y decisiones importantes. La meta es entender mejor y trabajar con menos fricción, no esconder la herramienta.",
        bullets: [
          "Para estudiar: pide una explicación, resuélvela tú y usa la IA para corregir tu razonamiento.",
          "Para escribir: usa un borrador como punto de partida y reescribe desde tu conocimiento y tus fuentes.",
          "Para trabajo: empieza por preparar, clasificar o resumir; no envíes ni publiques sin revisión.",
          "Si la respuesta afecta a otra persona, considera qué evidencia necesitaría para confiar en ella.",
        ],
      },
      {
        title: "Programar y crear webs: empieza por algo que puedas abrir y probar",
        body:
          "La IA permite a más personas acercarse al código, pero no elimina la necesidad de comprobar. Un buen primer proyecto es una web local de una sola tarea: una página de servicios ficticia, una calculadora, un portafolio o un formulario sin datos reales. Define antes qué debe hacer, abre el resultado en el navegador y revisa cada cambio. Si introduces cuentas, pagos, datos personales o automatizaciones, el nivel de exigencia cambia.",
        bullets: [
          "Pide primero que explique la carpeta o el plan antes de modificar archivos.",
          "Haz cambios pequeños y comprueba la web tras cada uno.",
          "No publiques claves API, archivos .env ni datos de clientes.",
          "Una demo visual no es todavía una aplicación segura para usuarios reales.",
        ],
      },
      {
        title: "Qué son los agentes y por qué no son el siguiente paso obligatorio",
        body:
          "Un agente combina un modelo con herramientas, estado y reglas para completar varios pasos. Tiene sentido cuando la tarea es repetible, el resultado se puede comprobar y existe una salida segura si falla. No tiene sentido dar permisos amplios a un chat para que «haga de todo». Antes de automatizar, ejecuta el proceso manualmente, define límites de gasto y llamadas, registra qué ocurre y mantiene aprobación humana para acciones sensibles.",
        bullets: [
          "Primero: una herramienta de lectura sobre datos sintéticos.",
          "Después: límites de tiempo, reintentos y presupuesto.",
          "Después: logs o trazas que expliquen cada paso.",
          "Solo entonces: una aprobación humana para acciones externas concretas.",
        ],
      },
      {
        title: "Privacidad y errores: la parte que no debes saltarte",
        body:
          "Los modelos pueden equivocarse, simplificar en exceso o inventar una fuente. También pueden enviar el contenido de un prompt a un proveedor externo según el producto y la configuración. Antes de pegar información, pregunta: ¿es necesaria?, ¿puedo anonimizarla?, ¿quién verá el resultado?, ¿cuánto tiempo quedará almacenado?, ¿qué pasará si es incorrecto? Cuando no tengas una respuesta clara, usa un ejemplo ficticio o detente.",
        bullets: [
          "Nunca pegues contraseñas, claves API, tokens o secretos.",
          "Minimiza nombres, correos, historias clínicas, contratos y documentos identificables.",
          "Verifica afirmaciones relevantes contra fuentes primarias o una persona responsable.",
          "Guarda la versión del prompt y el criterio usado si una salida afecta a un proceso importante.",
        ],
      },
      {
        title: "Plan de 30 días para no perderte",
        body:
          "El objetivo del primer mes no es ser experto. Es adquirir un hábito de trabajo seguro: definir una tarea, pedir un resultado concreto, comprobarlo y aprender del error. Dedica poco tiempo, pero repite. Cada semana debe dejar una evidencia: una nota, un ejercicio, una web local o una comparación breve que puedas revisar después.",
        bullets: [
          "Semana 1: elige una tarea de bajo riesgo y prueba dos prompts; conserva el que puedas explicar.",
          "Semana 2: compara dos herramientas con la misma tarea y escribe qué cambia en calidad, límites y privacidad.",
          "Semana 3: crea un resultado visible: un documento revisado, una hoja de trabajo o una web local sencilla.",
          "Semana 4: repite el proceso con una tarea real pero reversible; anota qué automatizarías y qué debe seguir revisando una persona.",
        ],
      },
    ],
    table: {
      headers: ["Si eres…", "Empieza por", "Primera práctica", "No hagas todavía"],
      rows: [
        ["Principiante", "Una tarea cotidiana de bajo riesgo", "Resume y revisa un texto que conozcas", "Probar diez herramientas a la vez"],
        ["Estudiante", "Explicar, practicar y contrastar", "Crear preguntas de repaso y corregir tu respuesta", "Entregar texto que no entiendes"],
        ["Profesional", "Un cuello de botella repetitivo", "Preparar un borrador y revisarlo con tu criterio", "Enviar, publicar o decidir sin revisión"],
        ["Persona técnica", "Un proyecto local pequeño", "Crear una web y ejecutar sus comprobaciones", "Dar acceso total al repositorio o a producción"],
        ["Pyme", "Un proceso de bajo riesgo y medible", "Clasificar consultas o preparar respuestas", "Subir datos de clientes o automatizar cobros"],
      ],
    },
    faqs: [
      { q: "¿Qué IA debería usar primero?", a: "La que te permita probar una tarea concreta con el menor riesgo. No busques un ganador universal: compara dos opciones con tu caso, tu presupuesto, tus datos y una forma de verificar el resultado." },
      { q: "¿Puedo aprender IA sin saber programar?", a: "Sí. Puedes empezar con tareas de escritura, estudio, análisis y organización. Si después quieres crear webs, automatizaciones o productos, aprenderás lo técnico paso a paso y con comprobaciones." },
      { q: "¿Las herramientas gratuitas bastan para empezar?", a: "Suelen bastar para practicar, pero tienen límites y no son una garantía de privacidad ni de disponibilidad. Usa datos sintéticos al principio y elige después según el trabajo real." },
      { q: "¿Cómo sé si una respuesta de IA es correcta?", a: "Comprueba la salida contra el material original, pide supuestos y fuentes, revisa cálculos y no confundas una respuesta segura con una respuesta verdadera." },
      { q: "¿Es ético usar IA para estudiar o trabajar?", a: "Depende del propósito y de las normas aplicables. Úsala para comprender, practicar, preparar y revisar; no para ocultar autoría, eludir una evaluación o delegar una decisión que requiere responsabilidad humana." },
      { q: "¿Cuándo debería usar un agente de IA?", a: "Cuando ya conoces el proceso manual, la tarea está acotada, el resultado se puede verificar y has definido permisos, límites, trazas y una revisión humana para acciones sensibles." },
    ],
    related: [
      { title: "Qué aprender de IA", href: "/que-aprender-ia", desc: "Elige un primer paso según el resultado que quieres conseguir." },
      { title: "Elige tu ruta de aprendizaje", href: "/rutas", desc: "Encuentra un punto de inicio según tu nivel y objetivo." },
      { title: "Estudiar con IA sin hacer trampas", href: "/blog/usar-ia-estudiar-sin-hacer-trampas-2026", desc: "Método para practicar, contrastar fuentes y respetar las normas de evaluación." },
      { title: "Comparativa de modelos por tarea", href: "/blog/chatgpt-vs-claude-vs-gemini-vs-grok-2026", desc: "Cómo elegir sin buscar un ganador universal." },
      { title: "Herramientas de IA gratis", href: "/blog/mejores-herramientas-ia-gratis-2026", desc: "Límites, privacidad e IA local para empezar." },
      { title: "Crear webs con IA", href: "/cursos/crear-webs-con-ia", desc: "Pasa de una idea a una web verificable." },
      { title: "Agentes en producción", href: "/cursos/agentes-produccion", desc: "Herramientas, límites, evaluación y revisión humana." },
      { title: "IA para pymes", href: "/cursos/ia-pymes", desc: "Casos prácticos para procesos de negocio." },
    ],
  },
  {
    slug: "usar-ia-estudiar-sin-hacer-trampas-2026",
    title: "Cómo usar IA para estudiar sin hacer trampas: método, prompts y límites",
    description:
      "Guía práctica en español para estudiar con IA sin delegar el aprendizaje: explica, practica, contrasta fuentes, protege apuntes y respeta las normas de tu centro.",
    date: "2026-07-18",
    updated: "2026-07-18",
    category: "IA para estudiar",
    readingTime: "12 min",
    icon: "userGraduate",
    image: "/blog/usar-ia-estudiar-sin-hacer-trampas-2026.png",
    editorNote:
      "Actualizado el 18 de julio de 2026. Esta guía es educativa, no sustituye las normas de tu centro, asignatura o examen. Si no sabes si un uso está permitido, pregunta antes de entregar o compartir el resultado.",
    keywords: [
      "cómo usar IA para estudiar",
      "estudiar con ChatGPT sin hacer trampas",
      "inteligencia artificial para estudiantes",
      "prompts para estudiar",
      "usar IA en la universidad",
      "IA para preparar exámenes",
    ],
    intro:
      "La IA puede ayudarte a aprender más activamente o puede esconder que no has entendido nada. La diferencia no está en el nombre de la herramienta: está en si tú recuperas, contrastas y explicas el conocimiento. Este método te permite usarla como entrenador, no como sustituto de tu trabajo.",
    sections: [
      {
        title: "Primero aclara qué estás intentando aprender",
        body:
          "No empieces pegando un tema entero y pidiendo un resumen. Escribe un objetivo observable: explicar una idea con tus palabras, resolver cinco problemas sin mirar la solución, distinguir dos conceptos o defender una conclusión con fuentes. Si no puedes comprobar que lo has logrado sin la IA abierta, todavía no es aprendizaje comprobable.",
        bullets: [
          "Meta débil: «hazme el trabajo de historia». ",
          "Meta útil: «hazme tres preguntas sobre este tema, espera mi respuesta y señala el error conceptual si lo hay». ",
          "Meta útil: «compara mi esquema con este material y dime qué afirmación necesita una fuente». ",
          "Meta útil: «crea dos ejercicios parecidos, no idénticos, y no muestres la solución hasta que lo intente». ",
        ],
      },
      {
        title: "Cuatro usos que sí refuerzan el aprendizaje",
        body:
          "La mejor interacción obliga a tu cerebro a recuperar y relacionar ideas. Pide a la IA que adapte la práctica a tu nivel, pero conserva tú la tarea difícil: responder, justificar, comprobar y corregir.",
        bullets: [
          "Explicación gradual: pídele una explicación sencilla, un ejemplo y luego una versión más precisa con vocabulario de la asignatura.",
          "Práctica activa: transforma tus apuntes en preguntas, tarjetas o ejercicios; responde antes de revelar la solución.",
          "Tutor socrático: pide pistas y preguntas de seguimiento en vez de la respuesta directa.",
          "Revisión de tu razonamiento: comparte tu solución y pide que identifique un salto lógico, una definición imprecisa o una fuente pendiente.",
        ],
      },
      {
        title: "Un prompt para estudiar se parece a un encargo al profesor particular",
        body:
          "No necesitas una fórmula secreta. Aporta el material permitido, di qué nivel tienes, define el tipo de práctica y pide un comportamiento concreto cuando te equivoques. Es mejor un prompt sencillo que entiendes y reutilizas que una plantilla larguísima que no sabes evaluar.",
        bullets: [
          "Contexto: «Estoy preparando [materia y tema] con estos apuntes; no inventes información fuera de ellos». ",
          "Objetivo: «Quiero poder explicar [concepto] y resolver [tipo de ejercicio]». ",
          "Dinámica: «Haz una pregunta cada vez, espera mi respuesta y dame una pista antes que la solución». ",
          "Comprobación: «Al final crea una lista de errores y de conceptos que debo repasar con la fuente original». ",
        ],
      },
      {
        title: "Ciclo de estudio de 30 minutos con IA",
        body:
          "Elige un bloque breve y repítelo. La IA reduce el tiempo de preparar ejercicios, pero no debe quitarte el tiempo de pensar. Guarda al final una evidencia tuya: una solución escrita, un mapa conceptual o una explicación grabada sin ayuda.",
        bullets: [
          "5 minutos: lee el material original y escribe qué parte no entiendes todavía.",
          "10 minutos: pide una explicación y dos ejemplos; vuelve a la fuente si aparece una afirmación nueva.",
          "10 minutos: responde preguntas o resuelve ejercicios sin mirar la solución.",
          "5 minutos: compara, corrige y anota un error que no repetirás en el siguiente bloque.",
        ],
      },
      {
        title: "Las respuestas convincentes también se equivocan",
        body:
          "Una explicación fluida no demuestra que sea cierta. La IA puede simplificar demasiado, confundir fechas, atribuir citas inexistentes o resolver un problema con un supuesto que no estaba en el enunciado. Tu material de clase, libro, docente o fuente primaria sigue siendo la referencia para aprender y citar.",
        bullets: [
          "Pide que separe hechos, interpretaciones y dudas en la respuesta.",
          "No cites una fuente que no has abierto y comprobado tú mismo.",
          "Para cálculos, repite el procedimiento a mano o con una segunda comprobación independiente.",
          "Si una respuesta cambia tu conclusión, vuelve al original antes de incorporarla a tus apuntes.",
        ],
      },
      {
        title: "Qué usos cruzan la línea",
        body:
          "Una ayuda para practicar no es lo mismo que entregar texto generado como si fuera tuyo. Las reglas cambian entre centros, asignaturas y tipos de evaluación; por eso no hay una autorización universal. Si el resultado cuenta como evidencia de lo que tú sabes hacer, no dejes que la IA oculte el proceso ni la autoría.",
        bullets: [
          "No la uses para responder un examen, prueba o evaluación cuando las normas no la permiten.",
          "No presentes un ensayo, código o análisis no revisado como producción propia.",
          "Declara el uso cuando el centro, la persona docente o la actividad lo requieran.",
          "Conserva borradores, fuentes y decisiones: te ayudan a demostrar cómo trabajaste y a aprender de verdad.",
        ],
      },
      {
        title: "Protege tus apuntes y los datos de otras personas",
        body:
          "Antes de subir apuntes, trabajos de clase o grabaciones a una herramienta, elimina nombres, calificaciones, datos de salud, información de compañeros y material que no tengas derecho a compartir. Un servicio gratuito puede tener límites y condiciones distintas de una instalación local; lee las condiciones que aplican a tu caso y usa fragmentos o datos ficticios para probar.",
      },
      {
        title: "Cuando una conversación no basta, construye una práctica propia",
        body:
          "Si ya tienes material y quieres practicar de forma repetible, puedes crear una pequeña app que convierta apuntes en preguntas, explique fallos y guarde solo el progreso que tú decidas. Empieza con material de prueba y una función concreta; una herramienta educativa con usuarios reales requiere privacidad, seguridad, accesibilidad y revisión pedagógica.",
      },
    ],
    table: {
      headers: ["Situación", "Uso que ayuda a aprender", "Comprobación tuya", "Uso que debes evitar"],
      rows: [
        ["Entender un tema", "Explicación por niveles y ejemplos", "Explicarlo con tus palabras sin chat", "Copiar un resumen sin leer la fuente"],
        ["Preparar examen", "Preguntas, pistas y corrección de razonamiento", "Resolver un ejercicio nuevo sin ayuda", "Pedir respuestas para una prueba no permitida"],
        ["Escribir un trabajo", "Revisar estructura, claridad y fuentes pendientes", "Reescribir desde tus notas y comprobar cada cita", "Entregar texto generado como si fuera propio"],
        ["Compartir apuntes", "Crear ejercicios con material autorizado", "Eliminar datos personales y revisar el resultado", "Subir información de compañeros o documentos confidenciales"],
      ],
    },
    faqs: [
      { q: "¿Es trampa usar IA para estudiar?", a: "No necesariamente. Usarla para explicar, practicar, recibir pistas o revisar tu razonamiento puede ayudar a aprender. Se vuelve problemática si vulnera las normas aplicables, oculta autoría o sustituye una evaluación que debe demostrar lo que sabes hacer tú." },
      { q: "¿Puedo usar ChatGPT o Claude para preparar un examen?", a: "Puedes usarlos para crear preguntas, pedir explicaciones y practicar si las normas de tu centro lo permiten. No los uses durante una evaluación ni para obtener respuestas cuando la actividad exige trabajo individual sin esa ayuda." },
      { q: "¿Cómo compruebo si la IA ha inventado una fuente?", a: "Busca tú mismo la fuente original, verifica autor, título, fecha y la afirmación concreta. Si no puedes encontrarla o no respalda lo que dices, no la cites." },
      { q: "¿Qué datos no debería subir a una IA para estudiar?", a: "No subas datos personales, calificaciones, informes de salud, información de compañeros, credenciales ni material confidencial. Para probar, elimina identificadores o usa un fragmento ficticio." },
    ],
    related: [
      { title: "Qué aprender de IA", href: "/que-aprender-ia", desc: "Elige una ruta según el resultado que quieres conseguir." },
      { title: "Cómo empezar a usar IA", href: "/blog/como-empezar-usar-ia-2026", desc: "Un método general para aprender con criterio y seguridad." },
      { title: "Una app para estudiar", href: "/cursos/ia-local/estudio", desc: "Construye una práctica local con preguntas, correcciones y explicaciones." },
      { title: "Buenos prompts", href: "/prompts", desc: "Aprende a formular encargos claros y revisables." },
    ],
  },
  {
    slug: "grok-45-guia-evaluacion-2026",
    title: "Grok 4.5: qué sabemos y cómo evaluarlo sin caer en el hype",
    description:
      "Guía práctica para seguir la posible llegada de Grok 4.5, separar rumor de información verificable y probar un modelo frontier con criterios útiles: razonamiento, código, coste, privacidad y seguridad.",
    date: "2026-07-08",
    updated: "2026-07-08",
    category: "Modelos IA",
    readingTime: "10 min",
    icon: "brain",
    image: "/blog/grok-45-guia-evaluacion-2026.png",
    editorNote:
      "Actualizado el 8 de julio de 2026. La información sobre Grok 4.5 todavía debe tratarse con prudencia: no hay que confundir señales de X, beta privada o declaraciones públicas con benchmarks independientes y documentación final.",
    keywords: [
      "Grok 4.5",
      "xAI Grok",
      "Grok 4.5 benchmarks",
      "evaluar modelos IA",
      "modelos frontier 2026",
      "comparar Grok Claude ChatGPT Gemini",
    ],
    intro:
      "Cuando aparece un nuevo modelo frontier, el ruido llega antes que las pruebas. Grok 4.5 apunta a ser una actualización importante de xAI, pero para una web educativa como Aulafy la pregunta no es si gana titulares: la pregunta es cómo comprobar si mejora tu trabajo real.",
    sections: [
      {
        title: "Qué se puede decir con seguridad",
        body:
          "A fecha 8 de julio de 2026, la página pública de modelos de xAI sigue recomendando Grok 4.3 para uso general y Grok Build para código. También hay señales recientes en medios y X sobre una beta privada de Grok 4.5 y una posible disponibilidad pública próxima, pero eso no equivale a documentación final, precios definitivos ni resultados auditados.",
        bullets: [
          "Trata cualquier cifra de parámetros, puntuación interna o comparación con otros modelos como provisional si no enlaza a una fuente primaria.",
          "Distingue entre disponibilidad en la app de Grok, disponibilidad por API y disponibilidad en planes concretos.",
          "No compares modelos por una sola captura: compara tareas, coste, latencia, contexto, herramientas y calidad de salida.",
        ],
      },
      {
        title: "Qué promesas conviene verificar",
        body:
          "El texto que circula alrededor de Grok 4.5 insiste en más razonamiento, más velocidad, mejor coste y mejoras en código/agentes. Son promesas plausibles para un nuevo modelo, pero cada una exige una prueba distinta. Un modelo puede ser rápido en chat y flojo en un repositorio real; barato por token y caro por intentos fallidos; fuerte en razonamiento y débil citando fuentes.",
      },
      {
        title: "Cómo probar Grok 4.5 en serio",
        body:
          "La prueba útil no es preguntarle un acertijo. Crea una batería pequeña con tareas que ya haces: depurar un error real, resumir un PDF largo, escribir una función con tests, extraer una tabla, comparar fuentes y crear un plan de automatización con límites. Ejecuta la misma batería en Grok, Claude, ChatGPT, Gemini y un modelo local si tiene sentido.",
        bullets: [
          "Guarda el prompt, la fecha, el modelo exacto, la temperatura y el plan usado.",
          "Evalúa si la respuesta se puede ejecutar, no solo si suena bien.",
          "Cuenta reintentos, correcciones y tiempo total hasta un resultado aceptable.",
          "Registra fallos de seguridad: invención de fuentes, exceso de confianza, fuga de datos o instrucciones peligrosas.",
        ],
      },
      {
        title: "Benchmarks: útiles, pero no suficientes",
        body:
          "GPQA, SWE-Bench, Terminal-Bench, HLE o rankings de arena pueden orientar, pero no sustituyen una prueba de tu caso de uso. Para Aulafy, un benchmark solo entra como contexto: la decisión final debe salir de una evaluación reproducible, con ejemplos y errores visibles.",
      },
      {
        title: "Mini protocolo Aulafy",
        body:
          "Antes de recomendar Grok 4.5 como herramienta principal, Aulafy lo probaría con cinco tareas: razonamiento con fuentes, código en repositorio real, RAG con citas, automatización con herramientas y coste/latencia. Si pasa esas pruebas, merece tutorial. Si no, merece una comparativa honesta con límites claros.",
      },
    ],
    table: {
      headers: ["Dimensión", "Prueba práctica", "Qué mirar", "Mala señal"],
      rows: [
        ["Razonamiento", "Caso con varias restricciones y fuentes", "Explica supuestos y corrige errores", "Respuesta brillante pero no verificable"],
        ["Código", "Issue real con tests", "Pasa lint, build y test", "Parche grande que rompe otra cosa"],
        ["RAG", "PDF largo con citas", "Cita páginas y admite incertidumbre", "Inventa una fuente o mezcla documentos"],
        ["Agentes", "Flujo con herramienta y aprobación humana", "Pide permisos y deja logs", "Ejecuta acciones sin control"],
        ["Coste", "Misma tarea en varios modelos", "Coste por resultado final", "Barato por token, caro por reintentos"],
        ["Privacidad", "Documento sensible simulado", "Respeta límites y minimización", "Sugiere subir datos sin advertencia"],
      ],
    },
    faqs: [
      {
        q: "¿Grok 4.5 ya está confirmado oficialmente?",
        a: "Hay señales públicas y conversación reciente, pero la forma responsable de tratarlo es esperar documentación oficial estable, precios, disponibilidad y benchmarks independientes antes de presentarlo como hecho cerrado.",
      },
      {
        q: "¿Será mejor que Claude, ChatGPT o Gemini?",
        a: "Puede ser mejor en algunas tareas y peor en otras. La comparación útil no es absoluta: depende de código, razonamiento, contexto, herramientas, precio, privacidad y calidad de las respuestas en tu flujo real.",
      },
      {
        q: "¿Qué debería probar primero si aparece en mi cuenta?",
        a: "Empieza con una tarea que ya conozcas y que puedas verificar: un bug con tests, un PDF con citas o una automatización sencilla. Si no puedes medir el resultado, no puedes saber si ha mejorado.",
      },
      {
        q: "¿Aulafy hará un tutorial de Grok 4.5?",
        a: "Sí, si la disponibilidad y la documentación son suficientemente claras. La prioridad será una guía práctica de evaluación, no una pieza de entusiasmo por novedad.",
      },
    ],
    related: [
      { title: "ChatGPT vs Claude vs Gemini vs Grok en 2026", href: "/blog/chatgpt-vs-claude-vs-gemini-vs-grok-2026", desc: "Comparativa de modelos para elegir según tarea." },
      { title: "Seguridad y evaluación de modelos", href: "/cursos/seguridad-evals", desc: "Curso para probar LLMs antes de confiar en ellos." },
      { title: "Evals básicas y regresiones", href: "/cursos/seguridad-evals/evals-basicas", desc: "Cómo montar pruebas pequeñas y repetibles." },
      { title: "Prompts para blogs y análisis", href: "/blog/mejores-prompts-chatgpt-claude-blogs", desc: "Plantillas para convertir noticias en contenido útil." },
    ],
  },
  {
    slug: "crear-tutoriales-ia-x-aulafy",
    title: "Cómo crear tutoriales de IA para X sin humo: método paso a paso",
    description:
      "Guía práctica para convertir una lección de IA en un hilo de X útil: tema, gancho, pasos, comandos, verificación, errores, replies y enlace a Aulafy.",
    date: "2026-07-08",
    updated: "2026-07-08",
    category: "Contenido IA",
    readingTime: "11 min",
    icon: "xTwitter",
    image: "/blog/crear-tutoriales-ia-x-aulafy.png",
    editorNote:
      "Actualizado el 8 de julio de 2026 con señales recientes de X y revisión editorial: el foco es utilidad, reproducibilidad y conversación real, no growth hacking.",
    keywords: [
      "tutoriales IA X",
      "hilos de IA Twitter",
      "crear contenido IA",
      "prompts para X",
      "Aulafy contenido IA",
      "tutoriales inteligencia artificial español",
    ],
    intro:
      "Los tutoriales de IA que mejor funcionan en X no son los que prometen magia. Son los que resuelven un problema concreto, muestran comandos copiables, explican qué debería pasar y dejan una pregunta abierta para que la gente cuente su caso.",
    sections: [
      {
        title: "Elige una lección que ya funcione",
        body:
          "No empieces por el hilo. Empieza por una lección real de Aulafy: Ollama desde cero, GPU en Windows, RAG con citas, MCP seguro, cuantización o evals básicas. Si no puedes ejecutar el tutorial y verificar el resultado, todavía no tienes un buen hilo.",
        bullets: [
          "Define un resultado verificable: una API responde, una cita aparece, una GPU se usa o un test pasa.",
          "Anota versiones, sistema operativo, hardware mínimo y prerequisitos.",
          "Guarda un error real y su solución; ahí suelen nacer los replies útiles.",
        ],
      },
      {
        title: "Convierte la lección en hilo",
        body:
          "La estructura más sólida es problema, procedimiento, verificación y pregunta. Evita el gancho de gurú y usa un problema concreto: “Ollama en Windows se queda en CPU aunque tengas GPU” funciona mejor que “10 secretos de IA que nadie te cuenta”.",
        bullets: [
          "Tweet 1: problema específico, resultado medible y para quién es.",
          "Tweets centrales: un paso por tweet, con comando o comprobación.",
          "Penúltimo tweet: tabla de errores frecuentes.",
          "Último tweet: pregunta concreta para generar respuestas de casos reales.",
        ],
      },
      {
        title: "Publica sin matar el alcance",
        body:
          "El primer post debe contener valor, no un enlace externo. Publica el hilo sin enlace en el cuerpo principal y deja la lección completa de Aulafy como reply al primer tweet. Después responde durante las primeras horas: los replies del autor son una señal fuerte de conversación.",
      },
      {
        title: "Cierra el ciclo en Aulafy",
        body:
          "El hilo no termina en X. Las preguntas repetidas se convierten en FAQ de la lección, los errores nuevos entran en troubleshooting y las mejores respuestas generan otro tutorial. Así X se convierte en laboratorio editorial, no en escaparate vacío.",
      },
      {
        title: "Prompt maestro para crear el hilo",
        body:
          "Usa este encargo con Claude, Grok o ChatGPT: “Convierte esta lección en un hilo de X de 8 tweets. Mantén tono técnico y claro, sin emojis, sin promesas exageradas. Cada tweet debe aportar una acción. Incluye prerequisitos, pasos, comprobación, tabla de errores y una pregunta final. El enlace a la lección irá en un reply, no en el hilo principal.”",
      },
    ],
    table: {
      headers: ["Objetivo", "Formato recomendado", "Señal que busca", "Ejemplo Aulafy"],
      rows: [
        ["Guardados", "Comandos, checklist, tabla de decisión", "Referencia reutilizable", "/cursos/ia-local/ollama-desde-cero"],
        ["Replies", "Pregunta final con caso concreto", "Conversación útil", "/cursos/ia-local/ollama-gpu-windows"],
        ["Reposts", "Guía completa para enviar a un equipo", "Utilidad compartible", "/cursos/rag-seguro/mapa-rag"],
        ["Confianza", "Captura, output esperado y límites", "Prueba verificable", "/cursos/ia-local/webapp-tipo-lexia"],
        ["SEO/AEO", "Post largo derivado del hilo", "Página citable", "/blog"],
      ],
    },
    faqs: [
      { q: "¿Conviene pedir “guarda este hilo”?", a: "No hace falta si el contenido merece guardarse. En Aulafy es mejor entregar comandos, tablas y errores reales que usar llamadas de growth hacking." },
      { q: "¿Cuántos tweets debe tener un tutorial?", a: "Entre 6 y 10 suele bastar para un tutorial práctico. Si necesitas más, probablemente conviene publicarlo primero como lección completa." },
      { q: "¿Debo publicar el enlace a Aulafy en el primer tweet?", a: "Mejor no. Publica el valor en el hilo y deja la lección completa como respuesta al primer tweet." },
      { q: "¿Qué temas priorizaría Aulafy?", a: "Ollama desde cero, GPU en Windows, cuantización GGUF, RAG con citas, MCP seguro, evals de agentes y web apps tipo Lexia." },
    ],
    related: [
      { title: "Ollama desde cero", href: "/cursos/ia-local/ollama-desde-cero", desc: "Un buen primer hilo: setup local verificable." },
      { title: "Ollama no usa la GPU en Windows", href: "/cursos/ia-local/ollama-gpu-windows", desc: "Tutorial de dolor real para replies útiles." },
      { title: "Web app tipo Lexia con RAG local", href: "/cursos/ia-local/webapp-tipo-lexia", desc: "Ejemplo de lección larga que puede dividirse en hilos." },
      { title: "RAG útil: mucho más que chat con PDF", href: "/cursos/rag-seguro/mapa-rag", desc: "Base para hilos de arquitectura y verificación." },
    ],
  },
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
