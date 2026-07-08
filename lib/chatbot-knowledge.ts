import chatbotContent from "./chatbot-course-content.json";

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

const indexedEntries = content.entries.map((entry) => {
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

function selectKnowledge(queryText: string, limit = 8) {
  const query = normalize(queryText);
  const terms = tokenize(queryText);

  if (terms.length === 0) {
    return content.entries.filter((entry) => entry.type === "course").slice(0, limit);
  }

  return indexedEntries
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

function courseCatalog() {
  return content.courses
    .map(
      (course) =>
        `- [[${course.title}]] (${course.level}, ${course.lessonCount} lecciones): ${course.short}. ${course.desc}`
    )
    .join("\n");
}

function renderContext(entries: KnowledgeEntry[]) {
  if (entries.length === 0) {
    return "No se encontro una leccion concreta para esta pregunta. Usa el catalogo general y pide una aclaracion si hace falta.";
  }

  return entries
    .map(
      (entry, index) =>
        `## Fuente ${index + 1}: [[${entry.title}]]
Curso: ${entry.course}
URL interna: ${entry.href}
Tipo: ${entry.type === "course" ? "curso" : "leccion"}
Contenido:
${entry.text}`
    )
    .join("\n\n");
}

const BASE_SYSTEM_PROMPT = `Eres "Asistente Aulafy", un tutor amable y experto de Aulafy para cursos gratis de inteligencia artificial open source en español.

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
- Mantén las respuestas normalmente por debajo de 8-10 lineas salvo que el usuario pida una guia paso a paso.`;

export function buildChatbotSystemPrompt(messages: ChatMessage[] = []) {
  const queryText = latestUserContext(messages);
  const selected = selectKnowledge(queryText, 8);

  return `${BASE_SYSTEM_PROMPT}

# Catalogo completo de cursos
${courseCatalog()}

# Fragmentos relevantes para esta conversacion
${renderContext(selected)}

# Nota interna
Indice del chatbot generado el ${content.generatedAt} desde ${content.source}.`;
}

export const SYSTEM_PROMPT = buildChatbotSystemPrompt();
