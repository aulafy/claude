import fs from "node:fs";
import path from "node:path";

export const WEB_AI_COURSE_SLUG = "crear-webs-con-ia";
export const WEB_AI_SOURCE_FILE =
  "public/recursos/crear-webs-con-ia/curso-crear-webs-con-ia.md";

export type WebAiLesson = {
  number: number;
  slug: string;
  title: string;
  lead: string;
  minutes: number;
  kind: "base" | "professional" | "lab" | "workshop" | "project";
};

export const webAiLessons: WebAiLesson[] = [
  { number: 1, slug: "una-web-seria", title: "Qué hace que una web sea seria y útil", lead: "Aprende a distinguir una web bonita de una web que resuelve un problema, genera confianza y se puede mantener.", minutes: 60, kind: "base" },
  { number: 2, slug: "elegir-tipo-web", title: "Elige el tipo de web y evita complejidad innecesaria", lead: "Decide si necesitas una landing, una web de servicios, un catálogo, una aplicación o una combinación por fases.", minutes: 70, kind: "base" },
  { number: 3, slug: "preparar-codex-sol", title: "Prepara Codex y GPT-5.6 Sol", lead: "Configura un espacio de trabajo seguro y usa Sol con encargos claros, permisos mínimos y criterios de éxito visibles.", minutes: 45, kind: "base" },
  { number: 4, slug: "briefing-verificable", title: "Convierte la idea en un briefing verificable", lead: "Transforma una conversación desordenada en requisitos, límites y pruebas de aceptación que Codex pueda ejecutar.", minutes: 55, kind: "base" },
  { number: 5, slug: "inventario-contenido-real", title: "Reúne contenido real sin inventar autoridad", lead: "Prepara textos, precios, imágenes, credenciales y datos de contacto con trazabilidad y sin testimonios ficticios.", minutes: 45, kind: "base" },
  { number: 6, slug: "arquitectura-informacion", title: "Diseña páginas, navegación y llamada a la acción", lead: "Ordena la información según las preguntas del visitante y crea recorridos sencillos hacia una acción útil.", minutes: 55, kind: "base" },
  { number: 7, slug: "primer-prototipo-local", title: "Construye el primer prototipo local", lead: "Pasa del briefing a una web navegable en tu ordenador, sin publicar ni conectar servicios todavía.", minutes: 75, kind: "base" },
  { number: 8, slug: "revisar-con-browser", title: "Revisa y corrige con el navegador integrado", lead: "Comprueba la interfaz como una persona real: móvil, escritorio, teclado, contenido, enlaces y errores visibles.", minutes: 55, kind: "base" },
  { number: 9, slug: "sistema-diseno", title: "Crea un sistema visual coherente", lead: "Define tipografía, color, espacios, componentes y reglas para que la web no parezca una colección de pantallas sueltas.", minutes: 60, kind: "professional" },
  { number: 10, slug: "responsive-accesible", title: "Diseña para móvil, teclado y lectores de pantalla", lead: "Construye una experiencia adaptable y accesible desde el principio, no como arreglo de última hora.", minutes: 70, kind: "professional" },
  { number: 11, slug: "imagenes-identidad", title: "Usa imágenes, iconos e identidad sin perder rendimiento", lead: "Selecciona recursos visuales con licencia, tamaños correctos y texto alternativo útil.", minutes: 50, kind: "professional" },
  { number: 12, slug: "estados-interacciones", title: "Diseña estados, formularios y microinteracciones", lead: "Haz visibles la espera, el éxito, los errores y el foco sin convertir la interfaz en un espectáculo innecesario.", minutes: 60, kind: "professional" },
  { number: 13, slug: "cuando-usar-nextjs", title: "Decide cuándo pasar a Next.js", lead: "Reconoce cuándo una web estática es suficiente y cuándo compensan rutas, componentes, servidor y datos.", minutes: 55, kind: "professional" },
  { number: 14, slug: "componentes-rutas", title: "Organiza componentes, páginas y rutas", lead: "Crea una estructura comprensible para que tú y Codex podáis modificar la web sin romper otras páginas.", minutes: 75, kind: "professional" },
  { number: 15, slug: "formularios-validacion", title: "Crea formularios con validación y estados", lead: "Recoge únicamente la información necesaria y responde bien ante datos inválidos, fallos de red o envíos repetidos.", minutes: 75, kind: "professional" },
  { number: 16, slug: "supabase-rls", title: "Guarda contactos en Supabase con RLS", lead: "Añade persistencia con políticas de acceso explícitas y verifica que el navegador no pueda leer datos privados.", minutes: 90, kind: "professional" },
  { number: 17, slug: "seo-tecnico", title: "Configura metadata, canonical, sitemap y robots", lead: "Facilita que buscadores y personas entiendan, rastreen y compartan cada página sin duplicados ni promesas falsas.", minutes: 65, kind: "professional" },
  { number: 18, slug: "datos-estructurados-aeo", title: "Añade datos estructurados y contenido para buscadores y agentes", lead: "Expresa hechos verificables con Schema.org y respuestas claras, sin convertir AEO en spam.", minutes: 65, kind: "professional" },
  { number: 19, slug: "rendimiento-core-web-vitals", title: "Mejora rendimiento y Core Web Vitals", lead: "Mide antes de optimizar y corrige imágenes, JavaScript, fuentes y estabilidad visual por impacto real.", minutes: 70, kind: "professional" },
  { number: 20, slug: "seguridad-privacidad-legal", title: "Aplica seguridad, privacidad y límites legales", lead: "Reduce datos, protege secretos y adapta avisos, consentimiento y límites profesionales al riesgo del proyecto.", minutes: 85, kind: "professional" },
  { number: 21, slug: "git-github", title: "Versiona con Git y publica el código en GitHub", lead: "Crea una historia de cambios recuperable, excluye secretos y prepara una colaboración que se pueda revisar.", minutes: 65, kind: "professional" },
  { number: 22, slug: "vercel-preview-produccion", title: "Despliega en Vercel con preview y producción", lead: "Separa local, vista previa y producción para probar cada cambio antes de enseñárselo a todo el mundo.", minutes: 70, kind: "professional" },
  { number: 23, slug: "dominio-dns-https", title: "Conecta dominio, DNS y HTTPS", lead: "Entiende qué estás cambiando, evita tiempos muertos y comprueba la versión canónica segura del sitio.", minutes: 60, kind: "professional" },
  { number: 24, slug: "monitorizar-mantener-recuperar", title: "Monitoriza, mantén y recupera la web", lead: "Define responsables, comprobaciones, copias y un procedimiento de vuelta atrás antes de que llegue una incidencia.", minutes: 65, kind: "professional" },
  { number: 25, slug: "faq-base-conocimiento", title: "Diseña una FAQ y una base de conocimiento fiable", lead: "Convierte preguntas reales en respuestas breves, actualizables y aptas para personas, buscadores y asistentes.", minutes: 55, kind: "professional" },
  { number: 26, slug: "chatbot-groq-seguro", title: "Añade un chatbot con Groq sin exponer claves", lead: "Construye un asistente limitado a fuentes aprobadas, con ruta de servidor, límites y derivación a una persona.", minutes: 100, kind: "professional" },
  { number: 27, slug: "sol-api-y-ultra", title: "Integra Sol y usa Ultra o multiagente con criterio", lead: "Elige el nivel de autonomía por dificultad y riesgo, mide el resultado y reserva más cómputo para problemas que lo justifican.", minutes: 85, kind: "professional" },
  { number: 28, slug: "threejs-con-proposito", title: "Añade 3D con Three.js solo cuando aporte valor", lead: "Crea una experiencia 3D opcional, accesible y ligera con alternativa estática y movimiento reducido.", minutes: 105, kind: "professional" },
  { number: 29, slug: "laboratorio-prompt-vago", title: "Laboratorio: convierte un prompt vago en una especificación", lead: "Compara una petición ambigua con un encargo verificable y mide qué cambia en el resultado.", minutes: 70, kind: "lab" },
  { number: 30, slug: "laboratorio-ui-generica", title: "Laboratorio: detecta y corrige una interfaz genérica", lead: "Reconoce patrones visuales automáticos y recupera identidad, jerarquía y utilidad sin rediseñar por capricho.", minutes: 80, kind: "lab" },
  { number: 31, slug: "laboratorio-responsive-roto", title: "Laboratorio: reproduce y repara un móvil roto", lead: "Provoca overflow, texto recortado y navegación incómoda para aprender a diagnosticar responsive con evidencia.", minutes: 75, kind: "lab" },
  { number: 32, slug: "laboratorio-servidores-duplicados", title: "Laboratorio: encuentra servidores locales duplicados", lead: "Detecta procesos y puertos residuales antes de que consuman memoria o hagan que revises la versión equivocada.", minutes: 55, kind: "lab" },
  { number: 33, slug: "laboratorio-build-produccion", title: "Laboratorio: descubre un fallo que solo aparece en producción", lead: "Distingue `dev`, `build` y `start` y corrige una dependencia de entorno antes de desplegar.", minutes: 80, kind: "lab" },
  { number: 34, slug: "laboratorio-formulario-rls", title: "Laboratorio: diagnostica un formulario bloqueado por RLS", lead: "Aprende por qué una inserción puede fallar o devolver pocos datos sin convertir una clave administrativa en atajo.", minutes: 90, kind: "lab" },
  { number: 35, slug: "laboratorio-rls-rendimiento", title: "Laboratorio: mide y optimiza una política RLS", lead: "Compara planes y tiempos, añade índices y demuestra que autorización y rendimiento deben probarse juntos.", minutes: 105, kind: "lab" },
  { number: 36, slug: "laboratorio-secretos-expuestos", title: "Laboratorio: localiza y rota un secreto de prueba", lead: "Sigue el recorrido completo desde detección y contención hasta rotación, redeploy y prevención.", minutes: 80, kind: "lab" },
  { number: 37, slug: "laboratorio-preview-produccion", title: "Laboratorio: separa preview y producción", lead: "Reproduce una variable ausente o una base equivocada y verifica el aislamiento entre entornos.", minutes: 75, kind: "lab" },
  { number: 38, slug: "laboratorio-deuda-tecnica", title: "Laboratorio: rescata código generado difícil de mantener", lead: "Añade una función pequeña a un módulo frágil y usa pruebas y refactor gradual para recuperar control.", minutes: 95, kind: "lab" },
  { number: 39, slug: "taller-portafolio-estudiante", title: "Taller: portafolio de estudiante", lead: "Publica proyectos, aprendizaje y formas de contacto sin inflar experiencia ni exponer datos personales.", minutes: 120, kind: "workshop" },
  { number: 40, slug: "taller-restaurante", title: "Taller: web para un restaurante", lead: "Crea una web móvil con carta accesible, horarios, ubicación, reservas y datos locales actualizables.", minutes: 140, kind: "workshop" },
  { number: 41, slug: "taller-despacho-abogados", title: "Taller: web para un despacho de abogados", lead: "Presenta áreas de práctica y contacto con sobriedad, sin prometer resultados ni recoger detalles sensibles del caso.", minutes: 140, kind: "workshop" },
  { number: 42, slug: "taller-consultoria-informatica", title: "Taller: web para una consultoría informática", lead: "Explica servicios técnicos en lenguaje de negocio y diseña una captación de oportunidades cualificada.", minutes: 140, kind: "workshop" },
  { number: 43, slug: "taller-app-saas", title: "Taller: landing y aplicación SaaS", lead: "Valida una propuesta, diseña onboarding, estados de cuenta y una demo honesta antes de construir funciones caras.", minutes: 165, kind: "workshop" },
  { number: 44, slug: "taller-clinica-estetica", title: "Taller: web para una clínica estética", lead: "Informa sobre tratamientos y citas con límites sanitarios, privacidad reforzada y sin resultados garantizados.", minutes: 150, kind: "workshop" },
  { number: 45, slug: "taller-academia-ingles", title: "Taller: web para una academia de inglés", lead: "Organiza niveles, metodología, horarios y prueba de nivel sin confundir una herramienta orientativa con una evaluación oficial.", minutes: 145, kind: "workshop" },
  { number: 46, slug: "proyecto-final-publicar-mantener", title: "Proyecto final: publica y mantén una web real", lead: "Entrega una web útil con evidencia de calidad, seguridad, accesibilidad, despliegue y un plan de mantenimiento.", minutes: 240, kind: "project" },
];

export type ParsedWebAiLesson = WebAiLesson & { markdown: string };

function parseLessons(): ParsedWebAiLesson[] {
  const sourcePath = path.join(process.cwd(), WEB_AI_SOURCE_FILE);
  const source = fs.readFileSync(sourcePath, "utf8");
  const matches = Array.from(source.matchAll(/^## Lección (\d+)\. (.+)$/gm));
  const resourcesStart = source.search(/^# Recursos comunes$/m);

  if (matches.length !== webAiLessons.length || resourcesStart < 0) {
    throw new Error(
      `El curso Crear webs con IA debe contener ${webAiLessons.length} lecciones y la sección de recursos comunes.`,
    );
  }

  return matches.map((match, index) => {
    const expected = webAiLessons[index];
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

export function getWebAiLesson(slug: string) {
  return lessonsBySlug.get(slug);
}

export function webAiCourseMinutes() {
  return webAiLessons.reduce((total, lesson) => total + lesson.minutes, 0);
}
