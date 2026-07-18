export type SessionlessPractice = {
  mission: string;
  result: string;
  steps: string[];
  question: string;
  options: { label: string; explanation: string; correct: boolean }[];
  evidence: string;
};

const practices: Record<string, SessionlessPractice> = {
  "que-puede-hacer-ia-generativa": {
    mission: "Decide qué parte de una tarea puede ayudar a preparar una IA y qué parte debe decidir una persona.",
    result: "Una delegación pequeña, reversible y con responsable humano.",
    steps: [
      "Elige una tarea real que tardes menos de 30 minutos en revisar.",
      "Separa preparación, comprobación y decisión final.",
      "Escribe qué daño produciría aceptar una respuesta incorrecta.",
    ],
    question: "Una clínica quiere resumir notas para preparar una consulta. ¿Cuál es el primer uso más prudente?",
    options: [
      { label: "Generar un borrador sin datos identificativos y exigir revisión clínica", correct: true, explanation: "Correcto: reduce exposición y mantiene la decisión sanitaria en una persona cualificada." },
      { label: "Dejar que la IA diagnostique y envíe el resultado al paciente", correct: false, explanation: "No: delega una decisión de alto impacto y elimina la revisión humana." },
      { label: "Copiar todo el historial en cualquier chat gratuito", correct: false, explanation: "No: compartir más datos de los necesarios introduce un riesgo de privacidad evitable." },
    ],
    evidence: "Tarea: ____\nLa IA prepara: ____\nUna persona comprueba: ____\nNo delegamos: ____\nRiesgo principal: ____",
  },
  "modelos-chat-llm": {
    mission: "Explica con tus palabras la diferencia entre un modelo y la aplicación con la que conversas.",
    result: "Un mapa mental mínimo para comparar herramientas sin confundir sus capas.",
    steps: [
      "Identifica la interfaz: web, aplicación, API o programa local.",
      "Identifica el modelo que genera la respuesta, si la herramienta lo indica.",
      "Anota qué contexto y herramientas añade la aplicación alrededor del modelo.",
    ],
    question: "¿Qué afirmación describe mejor un chat de IA?",
    options: [
      { label: "Es una interfaz que envía contexto a un modelo y muestra su respuesta", correct: true, explanation: "Correcto: la interfaz y el modelo son capas relacionadas, pero no equivalentes." },
      { label: "Es siempre el propio modelo y no añade ninguna función", correct: false, explanation: "No: una aplicación puede añadir archivos, memoria, búsqueda, permisos y otras funciones." },
      { label: "Es una base de datos que recupera respuestas exactas", correct: false, explanation: "No: un modelo generativo produce salidas; no funciona como una tabla de respuestas exactas." },
    ],
    evidence: "Interfaz: ____\nModelo: ____\nContexto disponible: ____\nHerramientas añadidas: ____",
  },
  "chat-rag-agentes-automatizacion": {
    mission: "Escoge la arquitectura más sencilla que resuelva un caso real.",
    result: "Una decisión técnica justificada sin añadir autonomía innecesaria.",
    steps: [
      "Define la pregunta o acción que debe resolver el sistema.",
      "Comprueba si necesita consultar documentos propios o ejecutar acciones.",
      "Elige entre chat, automatización, RAG o agente y justifica por qué no necesitas más.",
    ],
    question: "Una pyme quiere responder preguntas usando sus manuales internos y mostrar la fuente. ¿Por dónde empezarías?",
    options: [
      { label: "Un flujo RAG limitado a los manuales, con citas y abstención", correct: true, explanation: "Correcto: recupera evidencia concreta y permite verificar la respuesta sin dar permisos de acción." },
      { label: "Un agente autónomo con acceso total al correo y a facturación", correct: false, explanation: "No: añade permisos y superficie de fallo que el caso no necesita." },
      { label: "Entrenar un modelo desde cero", correct: false, explanation: "No: suele ser mucho más costoso y no es el primer paso para consultar una colección pequeña." },
    ],
    evidence: "Problema: ____\nArquitectura mínima: ____\nFuente o herramienta necesaria: ____\nLímite de autonomía: ____",
  },
  "contexto-tokens-memoria": {
    mission: "Prepara un contexto pequeño que permita responder bien sin exponer información innecesaria.",
    result: "Un paquete de contexto relevante, delimitado y comprobable.",
    steps: [
      "Escribe la pregunta exacta y el resultado esperado.",
      "Incluye solo los fragmentos necesarios y señala su procedencia.",
      "Elimina secretos, datos personales e instrucciones ajenas a la tarea.",
    ],
    question: "¿Qué contexto suele ser mejor para revisar una cláusula concreta?",
    options: [
      { label: "La cláusula, su contexto inmediato, el objetivo y los criterios de revisión", correct: true, explanation: "Correcto: aporta evidencia suficiente y reduce ruido y exposición." },
      { label: "Todos los archivos de la empresa, por si acaso", correct: false, explanation: "No: más contexto no garantiza más calidad y aumenta coste, ruido y riesgo." },
      { label: "Solo la frase «revísalo bien»", correct: false, explanation: "No: faltan el material, el objetivo y los criterios para comprobar el resultado." },
    ],
    evidence: "Pregunta: ____\nContexto imprescindible: ____\nDatos retirados: ____\nCriterio de comprobación: ____",
  },
  "pedir-resultados-utiles": {
    mission: "Transforma una petición vaga en un encargo que otra persona pueda comprobar.",
    result: "Un prompt reutilizable con objetivo, contexto, límites, formato y verificación.",
    steps: [
      "Describe el resultado y para quién se utilizará.",
      "Añade el contexto imprescindible, las restricciones y el formato.",
      "Pide que señale dudas, fuentes o supuestos antes de inventar información.",
    ],
    question: "¿Cuál de estas peticiones es más verificable?",
    options: [
      { label: "Resume este contrato en 5 riesgos; cita la cláusula y marca lo que requiera revisión jurídica", correct: true, explanation: "Correcto: define material, salida, evidencia y límite profesional." },
      { label: "Hazlo perfecto y profesional", correct: false, explanation: "No: «perfecto» no define un resultado observable ni cómo evaluarlo." },
      { label: "Dime todo sobre contratos", correct: false, explanation: "No: el alcance es indeterminado y no especifica propósito, fuente ni formato." },
    ],
    evidence: "Objetivo: ____\nContexto: ____\nLímites: ____\nFormato: ____\nCómo lo comprobaré: ____",
  },
  "alucinaciones-verificar": {
    mission: "Comprueba dos afirmaciones antes de decidir si una respuesta merece confianza.",
    result: "Una ficha que separa hechos comprobados, inferencias y datos sin evidencia.",
    steps: [
      "Subraya las afirmaciones que incluyen cifras, fechas, normas, nombres o consecuencias.",
      "Abre una fuente primaria para dos afirmaciones y localiza el fragmento que las respalda.",
      "Clasifica cada afirmación como comprobada, incompleta, incorrecta o no verificable.",
    ],
    question: "La IA atribuye una frase a un informe y proporciona un enlace. ¿Qué demuestra que la cita es válida?",
    options: [
      { label: "El documento original contiene el fragmento y respalda exactamente la afirmación", correct: true, explanation: "Correcto: un enlace solo es evidencia cuando la fuente existe, es pertinente y sostiene lo que se afirma." },
      { label: "La respuesta emplea un tono seguro y presenta una URL plausible", correct: false, explanation: "No: la fluidez, el formato y una URL verosímil no demuestran que la fuente exista ni sea pertinente." },
      { label: "Varias herramientas de IA repiten la misma frase", correct: false, explanation: "No: varios modelos pueden reproducir el mismo error o depender de información secundaria similar." },
    ],
    evidence: "Afirmación crítica: ____\nFuente primaria: ____\nFragmento que la respalda: ____\nClasificación: ____\nFecha de comprobación: ____",
  },
  "elegir-modelo-herramienta": {
    mission: "Compara dos herramientas con la misma tarea y criterios definidos antes de probarlas.",
    result: "Una decisión reproducible basada en evidencia propia, no en una clasificación viral.",
    steps: [
      "Prepara tres casos representativos y un resultado mínimo aceptable.",
      "Prueba las mismas entradas y registra calidad, tiempo, coste, privacidad y facilidad de integración.",
      "Elige la opción suficiente para el caso y anota cuándo volverías a evaluarla.",
    ],
    question: "¿Cuál es una comparación justa entre dos modelos para resumir facturas?",
    options: [
      { label: "Mismos documentos autorizados, mismo formato esperado y revisión ciega de errores críticos", correct: true, explanation: "Correcto: mantiene constantes las condiciones y mide el resultado que importa al proceso." },
      { label: "Preguntas diferentes y elegir el texto que suene más convincente", correct: false, explanation: "No: cambia la prueba y premia el estilo aunque los datos críticos sean incorrectos." },
      { label: "Escoger el modelo con más parámetros sin ejecutar ningún caso", correct: false, explanation: "No: tamaño, popularidad o novedad no sustituyen una prueba representativa de tu tarea." },
    ],
    evidence: "Tarea y casos: ____\nCriterios de aceptación: ____\nOpción A: ____\nOpción B: ____\nDecisión y motivo: ____\nPróxima revisión: ____",
  },
  "privacidad-derechos-seguridad": {
    mission: "Reduce un caso de uso hasta que solo utilice los datos y permisos imprescindibles.",
    result: "Un inventario mínimo de datos, autorización, conservación y revisión humana.",
    steps: [
      "Enumera los datos que entrarían y elimina los que no cambian el resultado.",
      "Comprueba quién autorizó el uso, dónde se procesa y cuánto tiempo se conserva.",
      "Define secretos prohibidos, permisos máximos y qué persona revisará la salida.",
    ],
    question: "Quieres probar un clasificador de consultas de clientes. ¿Cuál es el conjunto inicial más prudente?",
    options: [
      { label: "Ejemplos sintéticos o anonimizados que representen los casos necesarios", correct: true, explanation: "Correcto: permite aprender sobre el flujo reduciendo la exposición de datos personales reales." },
      { label: "La bandeja completa con firmas, teléfonos, contratos y contraseñas", correct: false, explanation: "No: incorpora datos y secretos que la clasificación probablemente no necesita." },
      { label: "Una exportación pública de conversaciones sin informar a nadie", correct: false, explanation: "No: publicar o reutilizar conversaciones requiere revisar autorización, finalidad y derechos." },
    ],
    evidence: "Finalidad: ____\nDatos imprescindibles: ____\nDatos retirados: ____\nBase o autorización que debo comprobar: ____\nConservación: ____\nResponsable de revisión: ____",
  },
  "imagen-voz-video-responsable": {
    mission: "Diseña una pieza generativa que pueda publicarse sin engañar, suplantar ni excluir.",
    result: "Una ficha de publicación con procedencia, permisos, licencia y alternativa accesible.",
    steps: [
      "Comprueba los derechos sobre materiales de entrada, voces, rostros, marcas y modelo utilizado.",
      "Evita imitar a una persona real sin autorización y etiqueta lo sintético cuando pueda inducir a error.",
      "Añade texto alternativo, subtítulos o transcripción y conserva el registro de creación.",
    ],
    question: "¿Qué opción es más responsable para narrar una demo comercial?",
    options: [
      { label: "Una voz autorizada o sintética no atribuida a una persona real, con aviso y transcripción", correct: true, explanation: "Correcto: reduce el riesgo de suplantación y hace el contenido más transparente y accesible." },
      { label: "Clonar la voz de una actriz sin permiso porque el audio dura pocos segundos", correct: false, explanation: "No: la duración no sustituye el consentimiento ni resuelve los derechos de identidad y uso." },
      { label: "Presentar como grabación real una escena generada que cambia hechos", correct: false, explanation: "No: ocultar una alteración material puede engañar a la audiencia." },
    ],
    evidence: "Pieza: ____\nMateriales y permisos: ____\nModelo y licencia comprobados: ____\nAviso de contenido sintético: ____\nAlternativa accesible: ____",
  },
  "primer-proyecto-repetible": {
    mission: "Convierte lo aprendido en un flujo pequeño que otra persona pueda repetir y auditar.",
    result: "Un proyecto de bajo riesgo con entrada, salida, prueba, límites y procedimiento de repetición.",
    steps: [
      "Define una tarea, una entrada autorizada y una salida que puedas revisar en menos de diez minutos.",
      "Ejecuta al menos tres casos: normal, incompleto y problemático; registra qué ocurrió.",
      "Escribe el procedimiento, los fallos conocidos y la condición que obliga a detenerse o pedir ayuda.",
    ],
    question: "¿Cuándo puede considerarse terminado tu primer proyecto del curso?",
    options: [
      { label: "Cuando otra persona puede repetirlo, comprobar el resultado y conocer sus límites", correct: true, explanation: "Correcto: el valor está en un proceso visible y repetible, no en una demostración afortunada." },
      { label: "Cuando una respuesta sale bien una vez y parece profesional", correct: false, explanation: "No: un único ejemplo no revela cómo responde el flujo ante variaciones o fallos." },
      { label: "Cuando utiliza el modelo más reciente aunque nadie mida el resultado", correct: false, explanation: "No: la novedad de la herramienta no demuestra utilidad, seguridad ni repetibilidad." },
    ],
    evidence: "Proyecto: ____\nEntrada autorizada: ____\nSalida esperada: ____\nPruebas ejecutadas: ____\nLímites y parada segura: ____\nCómo repetirlo: ____\nSiguiente mejora justificada: ____",
  },
};

export function getSessionlessPractice(slug: string) {
  return practices[slug];
}
