import fs from "node:fs";
import path from "node:path";

export const CODEX_ZERO_COURSE_SLUG = "codex-desde-cero";
export const CODEX_ZERO_SOURCE_FILE =
  "public/recursos/codex-desde-cero/curso-codex-desde-cero.md";

export type CodexZeroLesson = {
  number: number;
  slug: string;
  title: string;
  lead: string;
};

export const codexZeroLessons: CodexZeroLesson[] = [
  {
    number: 1,
    slug: "que-es-codex",
    title: "Qué es Codex y qué no es",
    lead: "Entiende qué puede hacer Codex, cuándo conviene usar Chat o Work y qué decisiones siguen siendo tuyas.",
  },
  {
    number: 2,
    slug: "donde-usar-codex",
    title: "Dónde utilizar Codex: app, web, CLI e IDE",
    lead: "Elige la superficie adecuada según tu dispositivo, el resultado que buscas y el control que necesitas.",
  },
  {
    number: 3,
    slug: "instalacion",
    title: "Instala e inicia sesión en tu plataforma",
    lead: "Sigue una ruta separada para macOS, Windows o Linux y comprueba la sesión sin exponer credenciales.",
  },
  {
    number: 4,
    slug: "primera-carpeta",
    title: "Crea una carpeta de práctica y empieza en solo lectura",
    lead: "Prepara un entorno seguro y aprende a inspeccionarlo antes de permitir cualquier modificación.",
  },
  {
    number: 5,
    slug: "pedir-resultados-claros",
    title: "Pide resultados claros sin aprender «prompt engineering»",
    lead: "Convierte una petición vaga en un encargo comprensible, limitado y fácil de comprobar.",
  },
  {
    number: 6,
    slug: "planificar-verificar",
    title: "Planifica, corrige el rumbo y cierra con evidencia",
    lead: "Aprende a pedir un plan, intervenir durante el trabajo y definir qué significa realmente «terminado».",
  },
  {
    number: 7,
    slug: "organizar-archivos",
    title: "Organiza archivos sin perder los originales",
    lead: "Haz inventario, revisa una vista previa y trabaja con copias antes de reorganizar documentos.",
  },
  {
    number: 8,
    slug: "crear-documentos-datos-presentaciones",
    title: "Crea documentos, datos, presentaciones, PDF e imágenes",
    lead: "Separa contenido, cálculo y presentación para producir entregables que puedas revisar con criterio.",
  },
  {
    number: 9,
    slug: "investigar-web",
    title: "Investiga en la web y utiliza el navegador con criterio",
    lead: "Distingue búsqueda de navegación y conserva fuentes, fechas y límites de cada afirmación.",
  },
  {
    number: 10,
    slug: "computer-use-seguro",
    title: "Usa Computer Use sin entregar el control de tu equipo",
    lead: "Permite interacción con aplicaciones manteniendo bajo control los datos sensibles y las decisiones externas.",
  },
  {
    number: 11,
    slug: "primera-web-local",
    title: "Construye tu primera web local",
    lead: "Pasa de una idea sencilla a una web comprobable sin necesidad de escribir el código manualmente.",
  },
  {
    number: 12,
    slug: "automatizar-con-vista-previa",
    title: "Automatiza una tarea repetitiva con vista previa",
    lead: "Diseña una automatización que primero explica lo que hará, prueba errores y conserva una recuperación clara.",
  },
  {
    number: 13,
    slug: "proyectos-tareas-entornos",
    title: "Organiza proyectos, tareas y entornos",
    lead: "Separa contextos y elige entre trabajo local, worktree o nube sin mezclar resultados ni permisos.",
  },
  {
    number: 14,
    slug: "permisos-privacidad-secretos",
    title: "Permisos, privacidad, secretos y acciones externas",
    lead: "Decide el acceso mínimo necesario y reconoce cuándo una acción necesita revisión o confirmación humana.",
  },
  {
    number: 15,
    slug: "copias-seguridad-git",
    title: "Copias de seguridad y Git sin miedo",
    lead: "Utiliza copias y control de versiones como redes de seguridad distintas para observar y deshacer cambios.",
  },
  {
    number: 16,
    slug: "instrucciones-agents-md",
    title: "Instrucciones personales y AGENTS.md",
    lead: "Coloca reglas estables en el ámbito correcto para que Codex trabaje de forma coherente y verificable.",
  },
  {
    number: 17,
    slug: "skills-plugins-mcp",
    title: "Elige entre skills, plugins y MCP",
    lead: "Distingue instrucciones reutilizables, paquetes de capacidades y conexiones externas antes de instalarlos.",
  },
  {
    number: 18,
    slug: "tareas-programadas",
    title: "Programa tareas que puedas revisar",
    lead: "Automatiza únicamente procesos ya probados y haz que cada ejecución deje un resultado visible y auditable.",
  },
  {
    number: 19,
    slug: "cli-ide-repositorios",
    title: "Da el salto a CLI, IDE y repositorios cuando lo necesites",
    lead: "Conecta el aprendizaje general con terminal, editor y repositorios mediante una transición gradual y segura.",
  },
  {
    number: 20,
    slug: "proyecto-final",
    title: "Proyecto final según tu perfil",
    lead: "Demuestra lo aprendido con un proyecto para educación, empresa, creación de contenidos o desarrollo inicial.",
  },
];

type ParsedLesson = CodexZeroLesson & { markdown: string };

function parseLessons(): ParsedLesson[] {
  const sourcePath = path.join(process.cwd(), CODEX_ZERO_SOURCE_FILE);
  const source = fs.readFileSync(sourcePath, "utf8");
  const matches = Array.from(source.matchAll(/^## Lección (\d+)\. (.+)$/gm));
  const appendixStart = source.search(/^# Apéndice A\./m);

  if (matches.length !== codexZeroLessons.length || appendixStart < 0) {
    throw new Error(`El contenido de Codex desde cero no contiene las ${codexZeroLessons.length} lecciones y sus apéndices.`);
  }

  return matches.map((match, index) => {
    const expected = codexZeroLessons[index];
    const number = Number(match[1]);
    const title = match[2].trim();
    if (number !== expected.number || title !== expected.title || match.index === undefined) {
      throw new Error(`La lección ${index + 1} del Markdown no coincide con el índice publicado.`);
    }

    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? appendixStart;
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

export function getCodexZeroLesson(slug: string) {
  return lessonsBySlug.get(slug);
}
