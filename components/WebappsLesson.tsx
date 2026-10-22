import Image from "next/image";
import { Chapter, ChapterNav, Terminal } from "@/components/Book";
import {
  FIGURE_FILES,
  WEBAPPS_COURSE_SLUG,
  getWebappsLessons,
  webappsLessonPath,
  type Figure,
  type WebappsLesson,
} from "@/lib/webapps-pymes";
import { courseCopyByLocale } from "@/lib/webapps-pymes";
import type { Locale } from "@/lib/i18n";

const TEXT = {
  es: {
    goal: "Objetivo", how: "Cómo funciona", before: "Antes de empezar", steps: "Pasos", check: "Comprueba que funciona",
    expected: "Salida esperada:", errors: "Errores frecuentes", sources: "Fuentes", consulted: "consultada el",
    lastRun: "Última ejecución:", cause: "Causa:", fix: "Solución:", crumb: "Construye con Claude", lesson: "Lección",
    privacy: "Las capturas proceden de una instancia con datos ficticios y muestran solo la página.",
  },
  en: {
    goal: "Goal", how: "How it works", before: "Before you start", steps: "Steps", check: "Check that it works",
    expected: "Expected output:", errors: "Common errors", sources: "Sources", consulted: "consulted on",
    lastRun: "Last run:", cause: "Cause:", fix: "Fix:", crumb: "Build with Claude", lesson: "Lesson",
    privacy: "Screenshots come from an instance with fictitious data and show the page only.",
  },
} as const;

function Fig({ figure }: { figure: Figure }) {
  const file = FIGURE_FILES[figure.id];
  const narrow = file.width < 800;
  return (
    <figure className={`my-6 ${narrow ? "mx-auto max-w-[292px]" : ""}`}>
      <Image
        src={file.src}
        width={file.width}
        height={file.height}
        alt={figure.alt}
        sizes={narrow ? "292px" : "(min-width: 896px) 832px, 100vw"}
        className="w-full h-auto rounded-xl border border-zinc-800"
      />
      <figcaption className="mt-2 text-sm leading-relaxed text-zinc-400">{figure.caption}</figcaption>
    </figure>
  );
}

export function WebappsLessonView({ lesson, locale }: { lesson: WebappsLesson; locale: Locale }) {
  const t = TEXT[locale];
  const lessons = getWebappsLessons(locale);
  const index = lessons.findIndex((item) => item.slug === lesson.slug);
  const prev = index > 0 ? lessons[index - 1] : undefined;
  const next = lessons[index + 1];
  const courseHref = locale === "en" ? `/en/courses/${WEBAPPS_COURSE_SLUG}` : `/cursos/${WEBAPPS_COURSE_SLUG}`;

  return (
    <Chapter
      crumb={`${t.crumb} · ${t.lesson} ${index + 1}`}
      title={lesson.heading}
      icon="rocket"
      lead={lesson.lead}
      courseHref={courseHref}
      courseLabel={courseCopyByLocale[locale].title}
      showMission={false}
      locale={locale}
    >
      <div className="prose" id="objetivos">
        <h2>{t.goal}</h2>
        <p>{lesson.objective}</p>
        <h2>{t.how}</h2>
        {lesson.explanation.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </div>
      {lesson.figures?.map((figure, i) => <Fig key={`${figure.id}-${i}`} figure={figure} />)}

      <div className="prose">
        <h2>{t.before}</h2>
        <ul>{lesson.before.map((item, i) => <li key={i}>{item}</li>)}</ul>
      </div>

      <div className="prose" id="practica">
        <h2>{t.steps}</h2>
      </div>
      {lesson.steps.map((step, i) => (
        <section key={i}>
          <div className="prose">
            <h3>{i + 1}. {step.title}</h3>
            {step.body ? <p>{step.body}</p> : null}
          </div>
          {step.code ? <Terminal locale={locale}>{step.code}</Terminal> : null}
          {step.figure ? <Fig figure={step.figure} /> : null}
        </section>
      ))}

      <div className="prose"><h2>{t.check}</h2></div>
      <Terminal locale={locale}>{lesson.check.command}</Terminal>
      <div className="prose"><p>{t.expected}</p></div>
      <Terminal locale={locale}>{lesson.check.expected}</Terminal>
      {lesson.check.reading ? <div className="prose"><p>{lesson.check.reading}</p></div> : null}

      <div className="prose">
        <h2>{t.errors}</h2>
        <ul>
          {lesson.errors.map((error, i) => (
            <li key={i}><strong>{error.symptom}.</strong> {t.cause} {error.cause} {t.fix} {error.fix}</li>
          ))}
        </ul>
        <h2>{t.sources}</h2>
        <ul>
          {lesson.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a> ({t.consulted} {lesson.verified.date})
            </li>
          ))}
        </ul>
        <p><strong>{t.lastRun}</strong> {lesson.verified.date}. {lesson.verified.env}</p>
        <p className="text-sm text-zinc-400">{t.privacy}</p>
      </div>

      <ChapterNav
        locale={locale}
        prev={prev ? { href: webappsLessonPath(locale, prev.slug), label: prev.title } : undefined}
        next={next ? { href: webappsLessonPath(locale, next.slug), label: next.title } : undefined}
      />
    </Chapter>
  );
}
