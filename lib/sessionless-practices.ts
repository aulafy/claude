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
};

export function getSessionlessPractice(slug: string) {
  return practices[slug];
}
