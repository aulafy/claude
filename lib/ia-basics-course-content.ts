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
};

export const iaBasicsLessons: IaBasicsLesson[] = [
  {
    number: 1,
    slug: "que-puede-hacer-ia-generativa",
    title: "Qué puede hacer la IA generativa y qué no conviene delegarle",
    lead: "Empieza por una tarea pequeña, define el riesgo y conserva la última decisión en manos de una persona.",
    minutes: 25,
    kind: "base",
  },
  {
    number: 2,
    slug: "modelos-chat-llm",
    title: "Modelo, chat y LLM: las palabras que necesitas para orientarte",
    lead: "Distingue modelo, interfaz, contexto y flujo de trabajo sin perderte en jerga técnica.",
    minutes: 20,
    kind: "base",
  },
  {
    number: 3,
    slug: "chat-rag-agentes-automatizacion",
    title: "Chat, automatización, RAG y agentes: no son sinónimos",
    lead: "Elige la forma de ayuda más simple que resuelva tu problema y mantenga el control.",
    minutes: 25,
    kind: "base",
  },
  {
    number: 4,
    slug: "contexto-tokens-memoria",
    title: "Contexto, tokens y memoria: por qué la misma pregunta cambia de respuesta",
    lead: "Da al modelo la información relevante, pero no más datos ni permisos de los necesarios.",
    minutes: 25,
    kind: "base",
  },
  {
    number: 5,
    slug: "pedir-resultados-utiles",
    title: "Cómo pedir un resultado útil sin depender de trucos de prompts",
    lead: "Convierte una petición ambigua en un encargo con objetivo, límites, formato y comprobación.",
    minutes: 25,
    kind: "practica",
  },
  {
    number: 6,
    slug: "alucinaciones-verificar",
    title: "Alucinaciones: cómo detectar una respuesta convincente pero incorrecta",
    lead: "Aprende a contrastar afirmaciones críticas y a conservar evidencia de lo que aceptas.",
    minutes: 30,
    kind: "criterio",
  },
  {
    number: 7,
    slug: "elegir-modelo-herramienta",
    title: "Elegir modelo o herramienta según la tarea, no por una clasificación viral",
    lead: "Compara calidad, coste, privacidad, velocidad e integración con una prueba justa.",
    minutes: 25,
    kind: "criterio",
  },
  {
    number: 8,
    slug: "privacidad-derechos-seguridad",
    title: "Privacidad, derechos y seguridad antes de compartir datos",
    lead: "Reduce datos, separa información sensible y trata las instrucciones externas como contenido no confiable.",
    minutes: 30,
    kind: "criterio",
  },
  {
    number: 9,
    slug: "imagen-voz-video-responsable",
    title: "Imagen, voz y vídeo: creatividad, licencia y transparencia",
    lead: "Crea contenido multimodal sin ocultar su origen, suplantar personas ni olvidar accesibilidad.",
    minutes: 25,
    kind: "criterio",
  },
  {
    number: 10,
    slug: "primer-proyecto-repetible",
    title: "Tu primer proyecto: una tarea pequeña, comprobada y repetible",
    lead: "Termina con un resultado propio y elige la siguiente ruta solo cuando tu proyecto la necesite.",
    minutes: 35,
    kind: "practica",
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
