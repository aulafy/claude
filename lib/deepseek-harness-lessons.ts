export type DshLesson = {
  slug: string;
  title: string;
  lead: string;
  objectives: string[];
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[]; code?: string }>;
  check: string;
  takeaway: string;
};

export const dshLessons: DshLesson[] = [
  {
    slug: "instalacion",
    title: "Instalación y primera sesión segura",
    lead: "La primera sesión debe servir para observar el agente, no para darle permisos. Prepara un workspace vacío y prueba una misión de solo lectura.",
    objectives: ["Preparar Node.js y un workspace de prueba.", "Arrancar la interfaz local de DSH.", "Completar una misión de lectura sin modificar archivos."],
    sections: [
      { heading: "Antes de empezar", paragraphs: ["Usa una carpeta nueva o una copia desechable del proyecto. Evita documentos de clientes, claves, producción o repositorios con cambios sin guardar.", "Comprueba la versión de Node.js y consulta el README oficial para confirmar el paquete y el comando vigentes."], code: "node -v\n# Consulta la instalación actual en la documentación oficial de DSH\nnpx @deepseek-ai/dsh web" },
      { heading: "Primera misión", paragraphs: ["En la interfaz, selecciona el workspace de prueba y configura el nivel más restrictivo disponible. La misión inicial solo debe inspeccionar."], bullets: ["No concedas acceso total al sistema.", "Pide referencias a los archivos que sustentan el resumen.", "Guarda una captura del resultado y de las acciones realizadas."], code: "Resume la estructura de este workspace.\nLista carpetas, archivos de configuración y puntos de entrada.\nNo modifiques nada. Cita los archivos en los que te basas." },
    ], check: "Tienes un workspace de prueba, una sesión de solo lectura y una evidencia del resumen con sus referencias.", takeaway: "Primero visibilidad y límites; después automatización.",
  },
  {
    slug: "modelos",
    title: "Modelos cloud, Ollama y hardware",
    lead: "DSH es el runtime; el modelo es intercambiable. Elige el proveedor por privacidad, coste, latencia y calidad en tu tarea, no por marketing.",
    objectives: ["Configurar un proveedor cloud de forma segura.", "Entender un endpoint compatible con OpenAI.", "Comparar una tarea en cloud y local."],
    sections: [
      { heading: "Dos caminos", paragraphs: ["Una API suele ser más rápida y capaz, pero exige revisar residencia de datos, retención y coste. Un modelo local reduce exposición de datos, aunque limita velocidad, contexto o capacidad según tu equipo."], bullets: ["Cloud: mejor para arrancar y tareas complejas.", "Local: útil para pruebas privadas y datos sensibles previamente minimizados.", "Híbrido: clasifica el riesgo antes de decidir a qué modelo enviar cada tarea."] },
      { heading: "Conectar Ollama", paragraphs: ["Si DSH permite un proveedor compatible con OpenAI, Ollama suele exponerse en el puerto local habitual. Usa el nombre de modelo que realmente aparezca en tu instalación y prueba primero con un modelo pequeño."], code: "# En otra terminal\nollama serve\nollama list\n\n# Endpoint habitual para un proveedor compatible\nhttp://127.0.0.1:11434/v1" },
      { heading: "Configuración que puedes verificar", paragraphs: ["La documentación oficial confirma compatibilidad parcial con OpenAI en /v1/chat/completions y /v1/responses. La clave API es obligatoria para algunos clientes, pero Ollama local la ignora; usa un valor local como ollama, no una clave real.", "A fecha de esta revisión, Ollama 0.32.13 incorpora control de reasoning en los endpoints compatibles, herramientas, JSON, streaming y visión cuando el modelo lo soporta. La capacidad no depende solo de Ollama: confirma siempre la ficha del modelo descargado."], code: "# Comprueba que el servidor y los modelos locales responden\ncurl http://127.0.0.1:11434/api/tags\n\n# Prueba de chat sin streaming\ncurl http://127.0.0.1:11434/api/chat -d '{\n  \"model\": \"qwen3:8b\",\n  \"messages\": [{\"role\": \"user\", \"content\": \"Responde solo: listo\"}],\n  \"stream\": false\n}'\n\n# Cliente OpenAI: base_url=http://127.0.0.1:11434/v1/\n# api_key=ollama (requerida por el cliente, ignorada localmente)" },
      { heading: "Privacidad y exposición de red", paragraphs: ["Ollama escucha en 127.0.0.1:11434 por defecto. Cambiar OLLAMA_HOST a 0.0.0.0 hace el servicio accesible desde la red: no lo hagas para una prueba doméstica sin firewall, autenticación o proxy inverso. La API local no incorpora por sí sola una barrera de autenticación para una red no confiable.", "El modo local no envía prompts a Ollama Cloud. Si quieres impedir por política el uso de modelos cloud y la búsqueda web asociada, la documentación oficial indica OLLAMA_NO_CLOUD=1 o disable_ollama_cloud en ~/.ollama/server.json; reinicia el servidor después."], code: "# Lista variables admitidas por tu versión instalada\nollama serve --help\n\n# Ejemplo local: mantener el servicio solo en loopback\nOLLAMA_HOST=127.0.0.1:11434 ollama serve\n\n# Desactivar funciones cloud por política\nOLLAMA_NO_CLOUD=1 ollama serve" },
      { heading: "Memoria, concurrencia y carga", paragraphs: ["OLLAMA_KEEP_ALIVE controla cuánto permanece un modelo cargado; el valor por defecto es cinco minutos. Para una API usada de forma continua, configura keep_alive por petición o la variable de servidor, pero no dejes modelos grandes residentes sin medir la VRAM.", "OLLAMA_NUM_PARALLEL multiplica el contexto efectivo y la memoria necesaria. Antes de subir concurrencia, mide el consumo y fija un límite de contexto. OLLAMA_MAX_LOADED_MODELS controla modelos concurrentes y OLLAMA_MAX_QUEUE el exceso de peticiones."], code: "# Precargar y mantener un modelo por petición\ncurl http://127.0.0.1:11434/api/generate -d '{\"model\":\"qwen3:8b\",\"keep_alive\":-1}'\n\n# Descargarlo y liberar memoria\nollama stop qwen3:8b\n\n# Contexto y concurrencia: aplica tras reiniciar el servidor\nOLLAMA_CONTEXT_LENGTH=8192 OLLAMA_NUM_PARALLEL=1 ollama serve" },
    ], check: "Ejecuta la misma tarea no sensible en un modelo cloud y otro local; registra tiempo, calidad, reintentos y coste aproximado.", takeaway: "Un modelo rápido que obliga a rehacer el trabajo no es barato.",
  },
  {
    slug: "modos",
    title: "Modos de ejecución: cómo elegirlos",
    lead: "Un modo o perfil decide qué herramientas y permisos recibe el agente. Elige el mínimo poder necesario para la misión.",
    objectives: ["Distinguir exploración, edición y automatización.", "Crear un perfil conservador para cada tipo de tarea.", "Evitar que un agente haga más de lo pedido."],
    sections: [
      { heading: "Perfil antes que impulso", paragraphs: ["Los nombres concretos de los perfiles pueden variar con la versión, pero el patrón es estable: un perfil de inspección, otro de cambios controlados y otro de experimentación. No uses un perfil de shell completo para resumir una carpeta."], bullets: ["Lectura: archivos y búsqueda, sin escritura.", "Cambio acotado: edición dentro del workspace y tests explícitos.", "Automatización: solo tras una prueba repetible y con aprobación en las acciones externas."] },
      { heading: "Prompts que limitan", paragraphs: ["Las restricciones en el prompt no sustituyen los permisos, pero reducen ambigüedad y dejan una intención auditable."], code: "Analiza el problema y propón un plan de cinco pasos.\nNo escribas archivos ni ejecutes comandos hasta que apruebe el plan.\nIndica riesgos, archivos afectados y cómo verificarías el resultado." },
    ], check: "Para una tarea real, redacta un perfil de permisos y un prompt con una frontera explícita.", takeaway: "El modo adecuado reduce el radio de acción de un error.",
  },
  {
    slug: "workspaces",
    title: "Workspaces, permisos y seguridad",
    lead: "El workspace es la frontera operativa del agente. Bien definido convierte una sesión experimental en un trabajo revisable.",
    objectives: ["Separar un sandbox de un repositorio valioso.", "Aplicar privilegio mínimo.", "Preparar una recuperación antes de editar."],
    sections: [
      { heading: "Diseña la frontera", paragraphs: ["Crea un directorio de trabajo específico, limita la tarea a él y usa Git antes de permitir escritura. No trates un workspace como una garantía absoluta: revisa qué herramientas puede invocar realmente el perfil."], code: "git status\ngit switch -c dsh/prueba-controlada\ngit add -A && git commit -m \"Estado antes de DSH\"" },
      { heading: "Reglas de operación", paragraphs: ["Define por adelantado qué puede leer, escribir, ejecutar y comunicar. Las acciones irreversibles o externas requieren aprobación humana."], bullets: ["No expongas secretos en prompts, logs ni capturas.", "No conectes producción en las primeras pruebas.", "Revisa el diff antes de aceptar cambios.", "Detén la sesión si el agente se sale del objetivo."] },
    ], check: "Guarda el hash del commit inicial y una lista de permisos concedidos. Debes poder volver atrás sin perder trabajo.", takeaway: "La seguridad útil es un diseño de flujo, no un aviso al final.",
  },
  {
    slug: "plugins",
    title: "Plugins y perfiles personalizados",
    lead: "Los plugins dan capacidades al agente; un perfil decide qué combinación es apropiada. Añade una pieza por vez y mide su efecto.",
    objectives: ["Identificar capacidades necesarias para una tarea.", "Evitar coleccionar herramientas innecesarias.", "Crear un perfil reproducible."],
    sections: [
      { heading: "Capacidades mínimas", paragraphs: ["Para revisar código quizá necesites búsqueda, lectura y tests. Para resumir documentos no necesitas shell. Cada herramienta adicional aumenta la superficie de error y las decisiones que debes auditar."], bullets: ["Modelo: proveedor, nombre y parámetros.", "Herramientas: archivos, terminal, web o APIs, solo cuando hagan falta.", "Política: qué acciones requieren confirmación.", "Observabilidad: logs y evidencia de ejecución."] },
      { heading: "Prueba de regresión", paragraphs: ["Después de añadir un plugin, repite una tarea corta que ya conocías. Si el resultado empeora, aumenta coste o introduce acciones no solicitadas, vuelve al perfil anterior."], code: "Perfil: revision-solo-lectura\nHerramientas: buscar, leer\nProhibido: escribir, red, comandos destructivos\nSalida: hallazgos con ruta y línea" },
    ], check: "Documenta un perfil con nombre, propósito, herramientas permitidas y una prueba que debe pasar.", takeaway: "Modular no significa instalarlo todo; significa poder justificar cada pieza.",
  },
  {
    slug: "subagentes",
    title: "Subagentes, skills y orquestación",
    lead: "Divide el trabajo por evidencias y límites. Un subagente no sustituye tu criterio: necesita una misión pequeña, una salida concreta y una forma de verificarla.",
    objectives: ["Delegar exploración sin perder control.", "Escribir una skill reutilizable.", "Consolidar resultados contradictorios."],
    sections: [
      { heading: "Divide por preguntas", paragraphs: ["Un buen reparto separa investigación, implementación y verificación. Evita lanzar varios agentes a editar los mismos archivos: produce conflictos y hace difícil atribuir un cambio."], bullets: ["Agente A: mapa del repositorio, solo lectura.", "Agente B: localizar tests y riesgos, solo lectura.", "Agente C: proponer un parche mínimo, sin escribir.", "Responsable humano: decidir, aplicar y validar."] },
      { heading: "Una skill útil", paragraphs: ["Una skill es una receta de trabajo con objetivo, límites, pasos y evidencia. Empieza con una sola tarea repetida antes de generalizar."], code: "Objetivo: revisar cambios antes de merge.\nEntrada: diff y requisitos.\nLímites: no modificar archivos; no inventar pruebas.\nSalida: hallazgos priorizados con evidencia y tests faltantes." },
    ], check: "Ejecuta dos tareas de solo lectura en paralelo y compara las referencias que devuelven antes de tomar una decisión.", takeaway: "Más agentes no dan más verdad: dan más trabajo de coordinación si no delimitas la misión.",
  },
  {
    slug: "modelos-locales",
    title: "Modelos locales y cuantización",
    lead: "En local, el modelo que cabe y responde con calidad suficiente gana al modelo enorme que hace esperar. Mide memoria, contexto y velocidad en tu propia máquina.",
    objectives: ["Distinguir VRAM, RAM y contexto.", "Elegir una cuantización razonable.", "Decidir cuándo no usar offload a SSD."],
    sections: [
      { heading: "Regla de capacidad", paragraphs: ["El archivo del modelo no es todo: el contexto, la caché y otras aplicaciones consumen memoria. En 24 GB de VRAM suelen ser más prácticos modelos de tamaño medio cuantizados que modelos masivos parcialmente descargados a CPU o SSD."], bullets: ["Q4: punto de partida si priorizas que quepa y responda.", "Q5: prueba si necesitas algo más de fidelidad y tienes margen.", "Offload a SSD: válido para lotes largos, no para conversación ágil."] },
      { heading: "Benchmark mínimo", paragraphs: ["No copies tokens por segundo de internet. Ejecuta el mismo prompt, mismo contexto y misma tarea varias veces. Registra calidad y tiempo hasta un resultado usable."], code: "Medición:\n- modelo y cuantización\n- VRAM/RAM usada\n- contexto configurado\n- tokens por segundo\n- tiempo hasta resultado aceptable\n- reintentos necesarios" },
      { heading: "Diagnóstico de aceleración", paragraphs: ["Después de cada carga mira ollama ps. Su columna Processor muestra si el modelo está 100% GPU, 100% CPU o repartido entre ambos. No atribuyas una velocidad lenta a la cuantización sin comprobar primero dónde se ha cargado el modelo.", "Ollama usa Metal en Apple Silicon; admite NVIDIA con CUDA, AMD con ROCm y soporte adicional por Vulkan en Windows y Linux cuando el backend está disponible. Si tienes varias GPU, limita deliberadamente el dispositivo antes de comparar resultados."], code: "# Muestra modelo, contexto, vencimiento y reparto CPU/GPU\nollama ps\n\n# NVIDIA: ver GPU y memoria antes de ejecutar\nnvidia-smi\n\n# Ejemplos de selección de GPU (solo si sabes qué dispositivo quieres usar)\nCUDA_VISIBLE_DEVICES=0 ollama serve\nROCR_VISIBLE_DEVICES=0 ollama serve" },
      { heading: "Optimizar sin romper la calidad", paragraphs: ["Flash Attention se activa automáticamente cuando el backend y el dispositivo lo soportan. OLLAMA_FLASH_ATTENTION=1 puede forzarla; úsalo tras medir. Para contextos grandes, OLLAMA_KV_CACHE_TYPE=q8_0 reduce aproximadamente a la mitad la memoria de la caché frente a f16 con pérdida normalmente pequeña; q4_0 ahorra más, pero exige una evaluación propia.", "En una GPU de 24 GB, prioriza un modelo y un contexto que quepan completamente antes de buscar una cuantización extrema o descargar capas a CPU/SSD. Para un agente, la estabilidad del tool calling y la capacidad de completar tests importan más que el tamaño nominal."], code: "# Prueba controlada: una variable por vez\nOLLAMA_FLASH_ATTENTION=1 \\\nOLLAMA_KV_CACHE_TYPE=q8_0 \\\nOLLAMA_CONTEXT_LENGTH=16384 \\\nollama serve\n\n# Revisa con ollama ps y repite exactamente la misma tarea" },
    ], check: "Elige dos cuantizaciones que entren en tu equipo y compara una tarea de código o resumen verificable.", takeaway: "La velocidad relevante es el tiempo hasta terminar bien la tarea.",
  },
  {
    slug: "casos-de-uso",
    title: "Casos de uso, métricas y benchmarks",
    lead: "Evalúa DSH con trabajo reconocible: una incidencia real, un documento con citas o una automatización que puedas deshacer. Los benchmarks genéricos solo orientan.",
    objectives: ["Diseñar una batería de evaluación pequeña.", "Medir calidad, seguridad, coste y tiempo.", "Elegir un caso de uso apto para producción."],
    sections: [
      { heading: "Cinco pruebas que importan", paragraphs: ["Construye una batería corta antes de adoptar un agente en un equipo. Conserva prompts, versiones y resultados para detectar regresiones."], bullets: ["Código: issue pequeño con tests existentes.", "Documentos: resumen con citas y datos no inventados.", "Herramientas: acción reversible con aprobación.", "Seguridad: instrucción ambigua o maliciosa que debe rechazar.", "Coste: tiempo total y reintentos hasta una salida aceptable."] },
      { heading: "Cuadro de decisión", paragraphs: ["Una recomendación de producción exige que el beneficio sea repetible y que el fallo sea acotado. Si no puedes explicar cómo detectar y revertir un error, sigue en piloto."], code: "Métrica              Objetivo\nTasa de aceptación   Resultado usable sin reescritura grande\nTasa de reversión    Cambios deshechos por error\nTiempo total         Desde petición hasta verificación\nIncidentes           Acciones fuera de política\nCoste por resultado  No solo coste por token" },
    ], check: "Ejecuta tres casos y conserva una tabla con resultado, evidencia, tiempo y decisión: adoptar, ajustar o descartar.", takeaway: "La evaluación es el puente entre una demo impresionante y una herramienta confiable.",
  },
  {
    slug: "produccion",
    title: "Troubleshooting y operación en producción",
    lead: "Un agente listo para producción sabe parar, pedir ayuda y dejar rastro. Empieza con tareas reversibles y aumenta autonomía solo con evidencia.",
    objectives: ["Resolver fallos comunes sin ampliar permisos.", "Diseñar logs útiles y minimizados.", "Definir criterios de parada y rollback."],
    sections: [
      { heading: "Diagnóstico ordenado", paragraphs: ["Cuando una sesión falla, no aumentes el modelo, el contexto y los permisos a la vez. Aísla una variable: configuración, proveedor, herramienta, permisos, prompt o datos de entrada."], bullets: ["El agente no encuentra archivos: revisa la ruta y el workspace.", "Da respuestas pobres: reduce la tarea, aporta contexto verificable y compara modelo.", "Falla una herramienta: ejecuta su versión manual antes de delegarla.", "Se bloquea o repite: define límite de turnos y condición de salida."] },
      { heading: "Operación mínima", paragraphs: ["Registra lo necesario para reproducir una decisión sin copiar información sensible. Programa revisiones y conserva un interruptor para desactivar automatizaciones."], code: "Registro mínimo:\n- versión de perfil y modelo\n- objetivo y resultado\n- herramientas invocadas\n- aprobaciones humanas\n- error y recuperación\n- referencia al diff o artefacto\n- fecha de revisión" },
    ], check: "Escribe un runbook de una página con: cómo iniciar, qué revisar, cómo detener, cómo revertir y a quién escalar.", takeaway: "Producción no es acceso total: es repetición controlada, observabilidad y capacidad de volver atrás.",
  },
];

export function getDshLesson(slug: string) {
  return dshLessons.find((lesson) => lesson.slug === slug);
}
