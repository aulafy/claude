import fs from "node:fs";
import path from "node:path";

export const IA_BASICS_COURSE_SLUG = "ia-desde-cero";
export const IA_BASICS_SOURCE_FILE =
  "public/recursos/ia-desde-cero/curso-ia-desde-cero.md";

export type IaBasicsLesson = {
  number: number;
  slug: string;
  title: string;
  lead: string;
  minutes: number;
  kind: "base" | "criterio" | "practica";
  outcomes: [string, string, string];
  keyTerms: string[];
};

export const iaBasicsLessons: IaBasicsLesson[] = [
  {
    number: 1,
    slug: "que-puede-hacer-ia-generativa",
    title: "Qué puede hacer la IA generativa y qué no conviene delegarle",
    lead: "Empieza por una tarea pequeña, define el riesgo y conserva la última decisión en manos de una persona.",
    minutes: 25,
    kind: "base",
    outcomes: ["Separar preparación, comprobación y decisión", "Estimar el daño posible de un error", "Elegir una primera tarea reversible"],
    keyTerms: ["IA generativa", "delegación", "revisión humana"],
  },
  {
    number: 2,
    slug: "modelos-chat-llm",
    title: "Modelo, chat y LLM: las palabras que necesitas para orientarte",
    lead: "Distingue modelo, interfaz, contexto y flujo de trabajo sin perderte en jerga técnica.",
    minutes: 20,
    kind: "base",
    outcomes: ["Distinguir modelo e interfaz", "Reconocer qué forma parte del contexto", "Detectar cuándo una respuesta necesita búsqueda externa"],
    keyTerms: ["modelo", "LLM", "interfaz", "contexto"],
  },
  {
    number: 3,
    slug: "chat-rag-agentes-automatizacion",
    title: "Chat, automatización, RAG y agentes: no son sinónimos",
    lead: "Elige la forma de ayuda más simple que resuelva tu problema y mantenga el control.",
    minutes: 25,
    kind: "base",
    outcomes: ["Distinguir cuatro arquitecturas habituales", "Elegir la opción con menor complejidad suficiente", "Justificar un límite de autonomía"],
    keyTerms: ["chat", "automatización", "RAG", "agente"],
  },
  {
    number: 4,
    slug: "contexto-tokens-memoria",
    title: "Contexto, tokens y memoria: por qué la misma pregunta cambia de respuesta",
    lead: "Da al modelo la información relevante, pero no más datos ni permisos de los necesarios.",
    minutes: 25,
    kind: "base",
    outcomes: ["Preparar contexto relevante", "Entender para qué sirven los tokens", "Tratar la memoria como una decisión sobre datos"],
    keyTerms: ["contexto", "tokens", "memoria"],
  },
  {
    number: 5,
    slug: "pedir-resultados-utiles",
    title: "Cómo pedir un resultado útil sin depender de trucos de prompts",
    lead: "Convierte una petición ambigua en un encargo con objetivo, límites, formato y comprobación.",
    minutes: 25,
    kind: "practica",
    outcomes: ["Convertir una petición vaga en un encargo", "Definir límites y formato de salida", "Escribir criterios de aceptación comprobables"],
    keyTerms: ["briefing", "restricciones", "criterio de aceptación"],
  },
  {
    number: 6,
    slug: "alucinaciones-verificar",
    title: "Alucinaciones: cómo detectar una respuesta convincente pero incorrecta",
    lead: "Aprende a contrastar afirmaciones críticas y a conservar evidencia de lo que aceptas.",
    minutes: 30,
    kind: "criterio",
    outcomes: ["Reconocer afirmaciones críticas", "Contrastar una respuesta con fuentes primarias", "Clasificar el grado de evidencia"],
    keyTerms: ["alucinación", "fuente primaria", "evidencia"],
  },
  {
    number: 7,
    slug: "elegir-modelo-herramienta",
    title: "Elegir modelo o herramienta según la tarea, no por una clasificación viral",
    lead: "Compara calidad, coste, privacidad, velocidad e integración con una prueba justa.",
    minutes: 25,
    kind: "criterio",
    outcomes: ["Comparar herramientas con la misma prueba", "Distinguir open weights de open source", "Documentar una elección revisable"],
    keyTerms: ["evaluación", "model card", "open weights", "open source"],
  },
  {
    number: 8,
    slug: "privacidad-derechos-seguridad",
    title: "Privacidad, derechos y seguridad antes de compartir datos",
    lead: "Reduce datos, separa información sensible y trata las instrucciones externas como contenido no confiable.",
    minutes: 30,
    kind: "criterio",
    outcomes: ["Minimizar los datos compartidos", "Reconocer información que no debe enviarse", "Definir permisos y revisión proporcionales al riesgo"],
    keyTerms: ["minimización", "datos personales", "prompt injection"],
  },
  {
    number: 9,
    slug: "auditar-chats-compartidos",
    title: "Chats compartidos: audita enlaces públicos antes de que expongan información",
    lead: "Comprueba qué ve otra persona, revoca lo innecesario y recuerda que borrar el enlace no recupera las copias.",
    minutes: 30,
    kind: "practica",
    outcomes: ["Localizar enlaces compartidos", "Comprobar su alcance desde fuera", "Revocar accesos y registrar los límites de esa revocación"],
    keyTerms: ["enlace público", "alcance", "revocación"],
  },
  {
    number: 10,
    slug: "imagen-voz-video-responsable",
    title: "Imagen, voz y vídeo: creatividad, licencia y transparencia",
    lead: "Crea contenido multimodal sin ocultar su origen, suplantar personas ni olvidar accesibilidad.",
    minutes: 25,
    kind: "criterio",
    outcomes: ["Revisar permisos y licencias", "Evitar suplantaciones y engaños", "Preparar una alternativa accesible"],
    keyTerms: ["contenido sintético", "consentimiento", "procedencia", "accesibilidad"],
  },
  {
    number: 11,
    slug: "estudiar-con-ia-sin-dejar-de-aprender",
    title: "Estudiar con IA sin dejar de aprender: método de tutor, práctica y examen cerrado",
    lead: "Usa la IA para recibir pistas, practicar y detectar lagunas; después demuestra lo aprendido sin ayuda.",
    minutes: 35,
    kind: "practica",
    outcomes: ["Pedir pistas sin externalizar la solución", "Comprobar el aprendizaje sin IA", "Planificar un repaso a partir del error"],
    keyTerms: ["recuperación activa", "metacognición", "transferencia"],
  },
  {
    number: 12,
    slug: "primer-proyecto-repetible",
    title: "Tu primer proyecto: una tarea pequeña, comprobada y repetible",
    lead: "Termina con un resultado propio y elige la siguiente ruta solo cuando tu proyecto la necesite.",
    minutes: 35,
    kind: "practica",
    outcomes: ["Diseñar un flujo pequeño de principio a fin", "Probar casos normales y problemáticos", "Documentar cómo repetir, detener y mejorar el proyecto"],
    keyTerms: ["reproducibilidad", "caso de prueba", "parada segura"],
  },
];

export type ParsedIaBasicsLesson = IaBasicsLesson & { markdown: string };

function parseLessons(): ParsedIaBasicsLesson[] {
  const sourcePath = path.join(process.cwd(), IA_BASICS_SOURCE_FILE);
  const source = fs.readFileSync(sourcePath, "utf8");
  const matches = Array.from(source.matchAll(/^## Lección (\d+)\. (.+)$/gm));
  const resourcesStart = source.search(/^# Recursos comunes$/m);

  if (matches.length !== iaBasicsLessons.length || resourcesStart < 0) {
    throw new Error(
      `El curso IA desde cero debe contener ${iaBasicsLessons.length} lecciones y la sección de recursos comunes.`,
    );
  }

  return matches.map((match, index) => {
    const expected = iaBasicsLessons[index];
    const number = Number(match[1]);
    const title = match[2].trim();

    if (number !== expected.number || title !== expected.title || match.index === undefined) {
      throw new Error(`La lección ${index + 1} del Markdown no coincide con el índice publicado.`);
    }

    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? resourcesStart;
    const markdown = source
      .slice(start, end)
      .replace(/\n---\s*\n# Módulo \d+\.[\s\S]*$/, "")
      .replace(/\n### (?:Práctica[^\n]*|Mini experimento|Prueba justa en una hora|Microauditoría en 20 minutos)\n[\s\S]*?(?=\n### )/g, "")
      .replace(/\n---\s*$/, "")
      .trim();

    return { ...expected, markdown };
  });
}

const parsedLessons = parseLessons();
const lessonsBySlug = new Map(parsedLessons.map((lesson) => [lesson.slug, lesson]));

export function getIaBasicsLesson(slug: string) {
  return lessonsBySlug.get(slug);
}

export function iaBasicsCourseMinutes() {
  return iaBasicsLessons.reduce((total, lesson) => total + lesson.minutes, 0);
}
