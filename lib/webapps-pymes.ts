import type { Locale } from "@/lib/i18n";
import { webappsLessonsEs, webappsCourseEs } from "@/lib/webapps-pymes-es";
import { webappsLessonsEn, webappsCourseEn } from "@/lib/webapps-pymes-en";

/**
 * Curso «Construye una web app para pymes con Claude, paso a paso».
 * Caso real: REM Negocio (https://github.com/aulafy/REM-L, licencia MIT).
 * Todas las capturas proceden de una instancia con datos 100 % ficticios (Taller Mediterráneo S.L.,
 * correos @example.test) y muestran solo la página, sin barra del sistema, rutas ni claves.
 */
export const WEBAPPS_COURSE_SLUG = "webapps-pymes-con-claude";
export const WEBAPPS_REPO = "https://github.com/aulafy/REM-L";

export type FigureId =
  | "hoy" | "hoy-oscuro" | "facturas" | "factura-detalle" | "editor-factura" | "mensajes-borrador"
  | "tesoreria" | "ajustes-funciones" | "ajustes-seguridad" | "antes-hoy" | "antes-ajustes"
  | "despues-ajustes" | "movil-hoy" | "movil-factura";

/** Dimensiones reales de cada imagen (evitan saltos de maquetación). */
export const FIGURE_FILES: Record<FigureId, { src: string; width: number; height: number }> = {
  "hoy": { src: "/cursos/webapps-pymes/hoy.png", width: 1600, height: 1000 },
  "hoy-oscuro": { src: "/cursos/webapps-pymes/hoy-oscuro.png", width: 1600, height: 1000 },
  "facturas": { src: "/cursos/webapps-pymes/facturas.png", width: 1600, height: 1000 },
  "factura-detalle": { src: "/cursos/webapps-pymes/factura-detalle.png", width: 1600, height: 1000 },
  "editor-factura": { src: "/cursos/webapps-pymes/editor-factura.png", width: 1600, height: 1000 },
  "mensajes-borrador": { src: "/cursos/webapps-pymes/mensajes-borrador.png", width: 1600, height: 1000 },
  "tesoreria": { src: "/cursos/webapps-pymes/tesoreria.png", width: 1600, height: 1000 },
  "ajustes-funciones": { src: "/cursos/webapps-pymes/ajustes-funciones.png", width: 1600, height: 1000 },
  "ajustes-seguridad": { src: "/cursos/webapps-pymes/ajustes-seguridad.png", width: 1600, height: 1000 },
  "antes-hoy": { src: "/cursos/webapps-pymes/antes-hoy.png", width: 1600, height: 1000 },
  "antes-ajustes": { src: "/cursos/webapps-pymes/antes-ajustes.png", width: 1600, height: 1000 },
  "despues-ajustes": { src: "/cursos/webapps-pymes/despues-ajustes.png", width: 1600, height: 1000 },
  "movil-hoy": { src: "/cursos/webapps-pymes/movil-hoy.png", width: 585, height: 1266 },
  "movil-factura": { src: "/cursos/webapps-pymes/movil-factura.png", width: 585, height: 1266 },
};

export type Figure = { id: FigureId; alt: string; caption: string };
export type Step = { title: string; body?: string; code?: string; figure?: Figure };

export type WebappsLesson = {
  slug: string;
  /** Título corto para menús y navegación. */
  title: string;
  /** Título completo de la lección. */
  heading: string;
  lead: string;
  objective: string;
  explanation: string[];
  figures?: Figure[];
  before: string[];
  steps: Step[];
  check: { command: string; expected: string; reading?: string };
  errors: { symptom: string; cause: string; fix: string }[];
  sources: { label: string; url: string }[];
  verified: { date: string; env: string };
};

export type WebappsCourseCopy = { title: string; short: string; desc: string };

export const lessonsByLocale: Record<Locale, WebappsLesson[]> = { es: webappsLessonsEs, en: webappsLessonsEn };
export const courseCopyByLocale: Record<Locale, WebappsCourseCopy> = { es: webappsCourseEs, en: webappsCourseEn };

export function getWebappsLessons(locale: Locale) {
  return lessonsByLocale[locale];
}

export function getWebappsLesson(locale: Locale, slug: string) {
  return lessonsByLocale[locale].find((lesson) => lesson.slug === slug);
}

export function webappsLessonPath(locale: Locale, slug: string) {
  return locale === "en" ? `/en/courses/${WEBAPPS_COURSE_SLUG}/${slug}` : `/cursos/${WEBAPPS_COURSE_SLUG}/${slug}`;
}
