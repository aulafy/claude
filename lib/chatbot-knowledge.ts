import chatbotContent from "./chatbot-course-content.json";
import { getEnglishLessons } from "@/lib/english-lessons";
import { getLocalizedCurso, getLocalizedCursos, pathForLocale, type Locale } from "@/lib/i18n";

type ChatMessage = { role: "user" | "assistant"; content: string };

type CourseSummary = {
  slug: string;
  title: string;
  short: string;
  desc: string;
  level: string;
  href: string;
  lessonCount: number;
};

type KnowledgeEntry = {
  type: "course" | "lesson";
  course: string;
  title: string;
  href: string;
  text: string;
};

const content = chatbotContent as {
  generatedAt: string;
  source: string;
  courses: CourseSummary[];
  entries: KnowledgeEntry[];
};

function renderEnglishLessonText(blocks: ReturnType<typeof getEnglishLessons>[number]["blocks"]) {
  return blocks
    .map((block) => {
      if (block.type === "h2") return `## ${block.text}`;
      if (block.type === "h3") return `### ${block.text}`;
      if (block.type === "bullet") return `- ${block.text}`;
      if (block.type === "code") return `Code: ${block.text}`;
      return block.text;
    })
    .join("\n");
}

const englishEntries: KnowledgeEntry[] = [
  ...getLocalizedCursos("en").map((course) => ({
    type: "course" as const,
    course: course.title,
    title: course.title,
    href: `/en/courses/${course.slug}`,
    text: [course.short, course.desc, `Level: ${course.level}.`].join("\n"),
  })),
  ...getEnglishLessons().map((lesson) => {
    const course = getLocalizedCurso(lesson.courseSlug, "en");
    return {
      type: "lesson" as const,
      course: course?.title ?? lesson.courseTitle,
      title: lesson.title,
      href: `/en/courses/${lesson.courseSlug}/${lesson.slug}`,
      text: renderEnglishLessonText(lesson.blocks),
    };
  }),
];

const STOP_WORDS = new Set([
  "aqui",
  "como",
  "con",
  "cual",
  "cuales",
  "cuando",
  "curso",
  "cursos",
  "dame",
  "del",
  "desde",
  "donde",
  "el",
  "ella",
  "ellos",
  "en",
  "entre",
  "eso",
  "esta",
  "este",
  "esto",
  "guia",
  "hay",
  "la",
  "las",
  "leccion",
  "lecciones",
  "lo",
  "los",
  "me",
  "mi",
  "para",
  "pero",
  "por",
  "puedo",
  "que",
  "quiero",
  "se",
  "sobre",
  "son",
  "tengo",
  "una",
  "uno",
  "usar",
  "y",
]);

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function tokenize(text: string) {
  return (
    normalize(text)
      .match(/[a-z0-9]+/g)
      ?.filter((token) => token.length > 2 && !STOP_WORDS.has(token)) ?? []
  );
}

function indexEntries(entries: KnowledgeEntry[]) {
  return entries.map((entry) => {
  const title = normalize(entry.title);
  const course = normalize(entry.course);
  const href = normalize(entry.href.replace(/[-/]/g, " "));
  const text = normalize(entry.text);

  return {
    ...entry,
    normalizedTitle: title,
    normalizedCourse: course,
    normalizedHref: href,
    normalizedText: text,
  };
});
}

const indexedEntries = indexEntries(content.entries);
const indexedEnglishEntries = indexEntries(englishEntries);

function scoreEntry(entry: (typeof indexedEntries)[number], query: string, terms: string[]) {
  let score = 0;
  const uniqueTerms = [...new Set(terms)];

  if (query.includes(entry.normalizedTitle)) score += 80;
  if (query.includes(entry.normalizedCourse)) score += entry.type === "course" ? 50 : 30;

  for (const term of uniqueTerms) {
    if (entry.normalizedTitle.includes(term)) score += 14;
    if (entry.normalizedCourse.includes(term)) score += 10;
    if (entry.normalizedHref.includes(term)) score += 8;
    if (entry.normalizedText.includes(term)) score += 3;
  }

  // Preferimos una leccion concreta frente a una pagina de curso cuando ambas
  // empatan, pero dejamos entrar cursos en preguntas de catalogo o rutas.
  if (entry.type === "lesson") score += 2;

  return score;
}

function selectKnowledge(queryText: string, limit = 8, locale: Locale = "es") {
  const entries = locale === "en" ? englishEntries : content.entries;
  const indexed = locale === "en" ? indexedEnglishEntries : indexedEntries;
  const query = normalize(queryText);
  const terms = tokenize(queryText);

  if (terms.length === 0) {
    return entries.filter((entry) => entry.type === "course").slice(0, limit);
  }

  return indexed
    .map((entry) => ({ entry, score: scoreEntry(entry, query, terms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => ({
      type: entry.type,
      course: entry.course,
      title: entry.title,
      href: entry.href,
      text: entry.text,
    }));
}

function latestUserContext(messages: ChatMessage[]) {
  const userTurns = messages
    .filter((message) => message.role === "user")
    .slice(-3)
    .map((message) => message.content.trim())
    .filter(Boolean);

  return userTurns.join("\n");
}

function courseCatalog(locale: Locale) {
  const courses =
    locale === "en"
      ? getLocalizedCursos("en").map((course) => ({
          ...course,
          lessonCount: totalLessonsFor(course.slug),
        }))
      : content.courses;

  return courses
    .map(
      (course) =>
        `- [[${course.title}]] (${course.level}, ${totalLessonsFor(course.slug, course.lessonCount)} ${
          locale === "en" ? "lessons" : "lecciones"
        }): ${course.short}. ${course.desc}`
    )
    .join("\n");
}

function totalLessonsFor(slug: string, fallback?: number) {
  return content.courses.find((course) => course.slug === slug)?.lessonCount ?? fallback ?? 0;
}

function renderContext(entries: KnowledgeEntry[], locale: Locale) {
  if (entries.length === 0) {
    return locale === "en"
      ? "No specific lesson was found for this question. Use the general catalog and ask for clarification if needed."
      : "No se encontro una leccion concreta para esta pregunta. Usa el catalogo general y pide una aclaracion si hace falta.";
  }

  return entries
    .map(
      (entry, index) => {
        const href = locale === "en" && entry.type === "course" ? pathForLocale(entry.href, "en") : entry.href;
        return `## ${locale === "en" ? "Source" : "Fuente"} ${index + 1}: [[${entry.title}]]
${locale === "en" ? "Course" : "Curso"}: ${entry.course}
${locale === "en" ? "Internal URL" : "URL interna"}: ${href}
${locale === "en" ? "Type" : "Tipo"}: ${entry.type === "course" ? (locale === "en" ? "course" : "curso") : locale === "en" ? "lesson" : "leccion"}
${locale === "en" ? "Content" : "Contenido"}:
${entry.text}`
      }
    )
    .join("\n\n");
}

const BASE_SYSTEM_PROMPTS: Record<Locale, string> = {
  es: `Eres "Asistente Aulafy", un tutor amable y experto de Aulafy para cursos gratis de inteligencia artificial open source en español.

# Personalidad
- Respondes SIEMPRE en español, con tono cercano, claro y motivador.
- Explicas con palabras sencillas. Si usas un termino tecnico, lo aclaras.
- Vas al grano. Usa listas, pasos y bloques de codigo markdown cuando ayuden.
- Si recomiendas una pagina del sitio, escribe su titulo EXACTO entre dobles corchetes, por ejemplo [[Open WebUI + Ollama + Qdrant]]. No uses enlaces markdown tipo [texto](url).

# Ambito
- Tu ambito es Aulafy: Claude Code, IA local, Ollama, RAG, agentes, automatizacion, MLOps, fine-tuning, seguridad/evals, IA generativa, videojuegos/3D/CAD e IA para pymes.
- Puedes responder preguntas practicas sobre los cursos y orientar que leccion leer.
- Si preguntan algo totalmente ajeno a Aulafy, responde brevemente que tu especialidad son los cursos de IA de Aulafy y reconduce.
- Si no estas seguro de una version, fecha o dato externo, dilo. Recomienda comprobar la documentacion oficial o la herramienta correspondiente.

# Reglas de precision
- Prioriza el contexto recuperado bajo "Fragmentos relevantes".
- Si el contexto no contiene el detalle pedido, no lo inventes: da una respuesta general y recomienda la leccion o curso mas cercano.
- Cuando sea util, cita el curso o la leccion con [[Titulo exacto]].
- Mantén las respuestas normalmente por debajo de 8-10 lineas salvo que el usuario pida una guia paso a paso.`,
  en: `You are "Aulafy Assistant", a friendly expert tutor for Aulafy's free open-source AI courses.

# Personality
- Always answer in English, with a clear, practical and encouraging tone.
- Explain technical ideas in plain language.
- Be concise. Use lists, steps and markdown code blocks when they help.
- If you recommend a course page, write its EXACT English title inside double brackets, for example [[Claude Code, from zero to pro]]. Do not use markdown links.

# Scope
- Your scope is Aulafy: Claude Code, local AI, Ollama, RAG, agents, automation, MLOps, fine-tuning, security/evals, generative AI, games/3D/CAD and small-business AI.
- You can guide users toward courses and lessons.
- Full lesson pages may still be in Spanish. Be transparent about that when linking to a specific lesson.
- If the question is unrelated to Aulafy, briefly say your specialty is Aulafy's AI courses and steer back.
- If you are unsure about a version, date or external fact, say so and recommend checking official documentation.

# Precision rules
- Prioritize the context under "Relevant fragments".
- The retrieved lesson fragments may be in Spanish; use them as source material, but answer in English.
- If the context does not contain a requested detail, do not invent it: give a general answer and recommend the closest course or lesson.
- Keep most answers under 8-10 lines unless the user asks for a step-by-step guide.`,
};

export function buildChatbotSystemPrompt(messages: ChatMessage[] = [], locale: Locale = "es") {
  const queryText = latestUserContext(messages);
  const selected = selectKnowledge(queryText, 8, locale);

  return `${BASE_SYSTEM_PROMPTS[locale]}

# ${locale === "en" ? "Full course catalog" : "Catalogo completo de cursos"}
${courseCatalog(locale)}

# ${locale === "en" ? "Relevant fragments for this conversation" : "Fragmentos relevantes para esta conversacion"}
${renderContext(selected, locale)}

# ${locale === "en" ? "Internal note" : "Nota interna"}
${locale === "en" ? "Chatbot index generated" : "Indice del chatbot generado"} ${content.generatedAt} ${
    locale === "en" ? "from" : "desde"
  } ${content.source}.`;
}

export const SYSTEM_PROMPT = buildChatbotSystemPrompt();
