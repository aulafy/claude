export type Locale = "es" | "en";

const dictionary = {
  es: {
    lesson: ["lección", "lecciones"],
    module: ["módulo", "módulos"],
    step: ["paso", "pasos"],
    course: ["curso", "cursos"],
    hour: ["hora", "horas"],
  },
  en: {
    lesson: ["lesson", "lessons"],
    module: ["module", "modules"],
    step: ["step", "steps"],
    course: ["course", "courses"],
    hour: ["hour", "hours"],
  },
} as const;

export type PluralKey = keyof typeof dictionary.es;

export function pluralLabel(count: number, key: PluralKey, locale: Locale = "es") {
  const [singular, plural] = dictionary[locale][key];
  return `${count} ${count === 1 ? singular : plural}`;
}
