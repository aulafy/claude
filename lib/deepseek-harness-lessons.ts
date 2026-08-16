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
    title: "Modelos DeepSeek, proveedores y coste",
    lead: "DSH separa el harness del modelo. En esta fase configuras DeepSeek como proveedor principal, comparas modelos oficiales y aprendes a medir coste, latencia y calidad sin mezclarlo con otros tutoriales de IA local.",
    objectives: ["Configurar la API Key de DeepSeek y elegir modelo.", "Comparar V4-Flash y V4-Pro por tarea, coste y latencia.", "Añadir otros proveedores solo cuando aporten una ventaja clara."],
    sections: [
      { heading: "DeepSeek primero", paragraphs: ["Empieza con el proveedor oficial de DeepSeek porque es el camino que el tutorial evalúa. En Settings -> Models pega la API Key de platform.deepseek.com y selecciona el modelo adecuado para la misión.", "Usa V4-Flash para la mayoría de tareas de exploración, documentación y cambios controlados. Reserva V4-Pro para misiones donde el fallo de razonamiento cueste más que la diferencia de precio o latencia."], bullets: ["V4-Flash: equilibrio entre velocidad, coste y contexto.", "V4-Pro: más capacidad para tareas difíciles, revisiones profundas o planes complejos.", "Thinking/reasoning: súbelo solo cuando la tarea lo justifique; medir importa más que activar todo al máximo."] },
      { heading: "Proveedores adicionales", paragraphs: ["El diseño de DSH permite cambiar de proveedor sin cambiar el harness. Eso no significa que debas conectar todos: cada proveedor añade una política de datos, una factura y una superficie de fallo.", "Añade OpenAI, Anthropic, Google, Kimi u otro proveedor solo si necesitas comparar una tarea concreta o cubrir una limitación clara del modelo principal."], code: "Criterio para añadir proveedor:\n- tarea que DeepSeek no resuelve bien\n- política de datos revisada\n- coste por resultado estimado\n- prueba con el mismo prompt y workspace\n- decisión registrada en el Trajectory" },
      { heading: "Coste real en DSH", paragraphs: ["El coste no es solo precio por token. En un agente cuentan los turnos, el contexto repetido, la caché, las herramientas fallidas, los reintentos y la revisión humana posterior.", "DSH cobra sentido cuando conservas el Trajectory y las métricas de cada sesión: tokens de entrada y salida, cache hit rate, tiempo total, modo usado y número de aprobaciones."], code: "Registro de comparación:\nmodelo:\nmodo: Standard / Code / Minimal / Creator\nprompt exacto:\ntokens entrada:\ntokens salida:\ncache hit rate:\ntiempo total:\nreintentos:\nresultado aceptado: si / no\ncoste estimado:" },
      { heading: "Modelos locales quedan para otra fase", paragraphs: ["Esta fase no enseña instalación, seguridad de red, GPU ni troubleshooting de runtimes locales. Eso pertenece al curso de IA local de Aulafy.", "En DSH solo nos interesa la idea arquitectónica: un modelo local puede entrar como proveedor compatible si ya tienes ese servidor funcionando y validado. La configuración del servidor local se estudia aparte para no mezclar dos tutoriales distintos."], bullets: ["Aquí: seleccionar y medir proveedores dentro de DSH.", "IA local: instalar, servir modelos, exponer endpoint, GPU y privacidad local.", "Fase 8: límites de modelos DeepSeek locales y cuantización desde el punto de vista de DSH."] },
    ], check: "Configura DeepSeek oficial, ejecuta una misma misión con V4-Flash y V4-Pro, y registra coste, cache, turnos, calidad y decisión.", takeaway: "DSH no mejora por tener más proveedores; mejora cuando sabes elegir y medir el modelo adecuado.",
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
    title: "Modelos DeepSeek locales y cuantización",
    lead: "Esta fase no enseña un runtime local desde cero: analiza cuándo tiene sentido conectar modelos DeepSeek locales o cuantizados a DSH y cuándo conviene quedarse con la API oficial.",
    objectives: ["Entender los límites reales de DeepSeek local en hardware de consumo.", "Comparar modelos destilados frente a modelos grandes cuantizados.", "Elegir si una tarea encaja en local, API o batch lento."],
    sections: [
      { heading: "Tres familias de despliegue", paragraphs: ["Para DSH hay tres rutas distintas: API DeepSeek oficial, modelos destilados pequeños y modelos grandes cuantizados con offload. No las mezcles en una sola promesa: cada una sirve para un tipo de trabajo.", "En 24 GB de VRAM suelen ser más realistas modelos destilados de tamaño medio que intentar ejecutar un modelo grande completo. Los modelos enormes con Q1/Q2 u offload a SSD pueden ser útiles en batch, pero no son una experiencia fluida de agente."], bullets: ["API: mejor punto de partida para productividad y contexto largo.", "Destilados locales: privacidad, coste variable bajo y tareas acotadas.", "Q1/Q2 con offload: experimentación y tareas largas no interactivas."] },
      { heading: "Tabla de decisión para DSH", paragraphs: ["Elige modelo por misión, no por ranking. Un agente necesita estabilidad de tool calling, capacidad de seguir permisos, buena lectura de repositorios y latencia suficiente para iterar.", "Si el modelo local tarda tanto que no revisas sus acciones, el sistema se vuelve menos seguro aunque sea más privado."], code: "Hardware / ruta             Uso razonable en DSH\n8-16 GB RAM                 pruebas pequeñas con destilados ligeros\n24 GB VRAM                  R1 destilado 14B/32B cuantizado para tareas acotadas\nMac 64-128 GB + SSD         batch lento con cuantizaciones agresivas\nAPI DeepSeek                trabajo diario, contexto largo y productividad" },
      { heading: "Benchmark mínimo", paragraphs: ["No copies tokens por segundo de internet. Ejecuta el mismo prompt, mismo workspace y mismo modo varias veces. Registra calidad y tiempo hasta un resultado usable.", "Compara siempre contra V4-Flash o V4-Pro para saber si el ahorro local compensa la pérdida de velocidad, calidad o coordinación."], code: "Medición DSH local vs API:\n- modelo exacto y cuantización\n- runtime usado\n- hardware y memoria\n- modo DSH\n- contexto configurado\n- tokens por segundo\n- cache hit rate\n- tiempo total\n- resultado aceptado\n- reintentos necesarios" },
      { heading: "Cómo conectarlo sin convertirlo en otro tutorial", paragraphs: ["DSH solo necesita que el runtime local exponga un endpoint compatible con el proveedor que declares. La instalación, GPU, seguridad de red y troubleshooting del runtime local pertenecen al tutorial de IA local.", "En esta fase solo valida que el endpoint responde, que el nombre de modelo coincide y que el Trajectory registra claramente cuándo una tarea fue local y cuándo fue por API."], code: "Checklist antes de usar un modelo local en DSH:\n- runtime local ya probado fuera de DSH\n- modelo exacto y licencia revisados\n- endpoint accesible solo donde corresponde\n- tarea sin datos sensibles en la primera prueba\n- comparación contra DeepSeek API guardada" },
    ], check: "Compara una misión de solo lectura con DeepSeek API y con un modelo DeepSeek local o destilado. Registra velocidad, calidad, cache y decisión.", takeaway: "Local no es automáticamente mejor; es mejor cuando la tarea, el hardware y la política encajan.",
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
