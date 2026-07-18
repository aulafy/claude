import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import LearningPathFinder from "@/components/LearningPathFinder";
import { getLocalizedCursos, type Locale } from "@/lib/i18n";
import { getLearningPaths, type LearningPath } from "@/lib/learning-paths";
import { totalLecciones, type Curso } from "@/lib/cursos";
import { spanishSearchIntents } from "@/lib/seo-strategy";

const copy = {
  es: {
    home: "Inicio", title: "Aprender IA desde cero: rutas por nivel y objetivo", lead: "No necesitas saber programar ni recorrer todo Aulafy. Recibe un primer paso según tu situación y abre el resto de la ruta solo cuando lo necesites.",
    path: "Ruta", entry: "Nivel de entrada", first: "Primer paso", audience: "Para quién", result: "Resultado", lessons: "lecciones", start: "Empezar esta ruta", recommended: "Empieza aquí", nextCourses: "Ver los siguientes cursos", firstSession: "Primera sesión: 30–60 min",
    startingTitle: "Tres puntos de partida", startingLead: "Estas rutas sirven para empezar. El orientador de arriba te recomienda una según tu objetivo concreto.", specializationTitle: "Especializaciones", specializationLead: "No tienes que decidirlas hoy. Vuelve cuando ya sepas qué quieres construir o profundizar.", showSpecializations: "Explorar especializaciones cuando tengas una base",
    note: "Las duraciones son orientativas. Avanza cuando puedas explicar el resultado, mostrar una evidencia y repetir la práctica sin copiar los pasos.",
  },
  en: {
    home: "Home", title: "AI learning paths", lead: "You do not need to complete all of Aulafy. Choose the situation closest to yours and reveal the rest of the path only when you need it.",
    path: "Path", entry: "Entry level", first: "First step", audience: "For", result: "Outcome", lessons: "lessons", start: "Start this path", recommended: "Start here", nextCourses: "Show the next courses", firstSession: "First session: 30–60 min",
    startingTitle: "Recommended starting paths", startingLead: "Choose the closest match. You can change direction after completing the first practical result.", specializationTitle: "Specialisations", specializationLead: "You do not need to choose one today. Return when you know what you want to build or deepen.", showSpecializations: "Explore specialisations when you have a foundation",
    note: "Durations are estimates. Move forward when you can explain the result, show evidence, and repeat the practice without copying every step.",
  },
} satisfies Record<Locale, Record<string, string>>;

const icons: IconName[] = ["laptopCode", "network", "server", "briefcase"];

function CourseStep({ course, index, base, lessons, recommended }: { course: Curso; index: number; base: string; lessons: string; recommended?: string }) {
  return (
    <li>
      <Link href={`${base}/${course.slug}`} className="aula-capsule flex items-center gap-4 p-4 group">
        <span className="w-10 h-10 rounded-md border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 flex items-center justify-center font-[family-name:var(--font-code)] text-xs">{index + 1}</span>
        <span className="min-w-0 flex-1">
          <strong className="block text-zinc-100 group-hover:text-cyan-200">{course.title}</strong>
          <span className="aula-meta text-zinc-600 mt-1 block">{recommended ? `${recommended} · ` : ""}{totalLecciones(course)} {lessons} · {course.level}</span>
        </span>
        <Icon name="chevronRight" className="text-zinc-600 group-hover:text-cyan-300" />
      </Link>
    </li>
  );
}

export default function LearningPathsPage({ locale, initialProfile, initialPath }: { locale: Locale; initialProfile?: string; initialPath?: string }) {
  const text = copy[locale];
  const courses = getLocalizedCursos(locale);
  const paths = getLearningPaths(locale);
  const base = locale === "en" ? "/en/courses" : "/cursos";
  const startingSlugs = locale === "es"
    ? ["desde-cero", "negocio-creativo", "programacion"]
    : ["programming", "applied-ai", "systems"];
  const startingPaths = startingSlugs.map((slug) => paths.find((path) => path.slug === slug)).filter((path): path is LearningPath => Boolean(path));
  const specializationPaths = paths.filter((path) => !startingSlugs.includes(path.slug));
  const openSpecializations = specializationPaths.some((path) => path.slug === initialPath);

  function renderPath(path: LearningPath) {
    const pathIndex = paths.findIndex((item) => item.slug === path.slug);
    const pathCourses = path.courses.map((slug) => courses.find((course) => course.slug === slug)).filter((course): course is Curso => Boolean(course));
    const firstCourse = pathCourses[0];
    const laterCourses = pathCourses.slice(1);

    return (
      <section key={path.slug} id={path.slug} className="aula-panel p-6 sm:p-8 scroll-mt-24">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8">
          <div>
            <div className="aula-icon text-cyan-300 text-xl mb-5"><Icon name={icons[pathIndex % icons.length]} /></div>
            <div className="aula-meta text-zinc-500">{text.path} {String(pathIndex + 1).padStart(2, "0")} · {path.duration}</div>
            <h3 className="font-display text-2xl font-bold text-white mt-2">{path.title}</h3>
            <p className="mt-3 text-zinc-400 leading-relaxed">{path.description}</p>
            <span className="aula-chip mt-4" data-tone="green"><Icon name="rocket" /> {text.firstSession}</span>
            <dl className="mt-6 space-y-4 text-sm">
              <div><dt className="aula-meta text-zinc-600">{text.entry}</dt><dd className="mt-1 text-zinc-300">{path.entry}</dd></div>
              <div><dt className="aula-meta text-zinc-600">{text.first}</dt><dd className="mt-1 text-zinc-300">{path.firstStep}</dd></div>
              <div><dt className="aula-meta text-zinc-600">{text.audience}</dt><dd className="mt-1 text-zinc-300">{path.audience}</dd></div>
              <div><dt className="aula-meta text-zinc-600">{text.result}</dt><dd className="mt-1 text-zinc-300">{path.outcome}</dd></div>
            </dl>
            {firstCourse && (
              <Link href={`${base}/${firstCourse.slug}`} className="aula-button aula-button-primary mt-6">
                <Icon name="rocket" /> {text.start}
              </Link>
            )}
          </div>

          <div>
            {firstCourse && (
              <ol className="grid gap-3">
                <CourseStep course={firstCourse} index={0} base={base} lessons={text.lessons} recommended={text.recommended} />
              </ol>
            )}
            {laterCourses.length > 0 && (
              <details className="aula-disclosure mt-3 rounded-lg border border-zinc-800 bg-zinc-950/25">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-zinc-300 hover:text-white">
                  <span>{text.nextCourses} ({laterCourses.length})</span>
                  <Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" />
                </summary>
                <ol className="grid gap-3 border-t border-zinc-800 p-3">
                  {laterCourses.map((course, index) => <CourseStep key={course.slug} course={course} index={index + 1} base={base} lessons={text.lessons} />)}
                </ol>
              </details>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="aula-shell max-w-6xl mx-auto px-6 py-14" lang={locale}>
      <div className="mb-4 aula-meta">
        <Link href={locale === "en" ? "/en" : "/"} className="hover:text-zinc-300">{text.home}</Link>
        <span className="mx-2">/</span><span className="text-zinc-400">{text.title}</span>
      </div>
      <header className="aula-frame p-7 sm:p-10 mb-10">
        <span className="aula-section-label"><Icon name="route" /> Curriculum</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-4">{text.title}</h1>
        <p className="lesson-lead mt-4 max-w-3xl">{text.lead}</p>
        {locale === "en" && (
          <nav className="mt-7 grid sm:grid-cols-3 gap-3" aria-label={text.startingTitle}>
            {startingPaths.map((path) => <a key={path.slug} href={`#${path.slug}`} className="aula-capsule p-4"><strong className="text-zinc-100">{path.title}</strong><span className="aula-meta mt-2 block">{path.entry}</span></a>)}
          </nav>
        )}
      </header>

      {locale === "es" && <LearningPathFinder initialProfile={initialProfile} />}

      <section aria-labelledby="starting-paths-title">
        <span className="aula-section-label"><Icon name="rocket" /> Recomendadas</span>
        <h2 id="starting-paths-title" className="mt-2 font-display text-3xl font-bold text-white">{text.startingTitle}</h2>
        <p className="mt-2 max-w-3xl text-zinc-400">{text.startingLead}</p>
        <div className="mt-6 grid gap-8">{startingPaths.map(renderPath)}</div>
      </section>

      {specializationPaths.length > 0 && (
        <section className="mt-16" aria-labelledby="specialization-paths-title">
          <h2 id="specialization-paths-title" className="sr-only">{text.specializationTitle}</h2>
          <details open={openSpecializations} className="aula-disclosure aula-panel">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 sm:p-8">
              <span>
                <span className="aula-section-label"><Icon name="network" /> {text.specializationTitle}</span>
                <strong className="mt-2 block font-display text-2xl text-white sm:text-3xl">{text.showSpecializations} ({specializationPaths.length})</strong>
                <span className="mt-2 block max-w-3xl text-sm leading-relaxed text-zinc-400">{text.specializationLead}</span>
              </span>
              <Icon name="chevronRight" className="aula-disclosure-icon shrink-0 text-zinc-500" />
            </summary>
            <div className="grid gap-8 border-t border-zinc-800 p-6 sm:p-8">{specializationPaths.map(renderPath)}</div>
          </details>
        </section>
      )}

      <p className="mt-10 text-sm text-zinc-500 leading-relaxed max-w-3xl">{text.note}</p>
      {locale === "es" && (
        <details className="aula-disclosure aula-panel mt-10" aria-labelledby="popular-topics-title">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-8">
            <span><span className="aula-section-label"><Icon name="search" /> Objetivos populares</span><strong id="popular-topics-title" className="mt-2 block font-display text-xl text-white">Ya sé qué quiero aprender</strong></span>
            <Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" />
          </summary>
          <div className="border-t border-zinc-800 px-6 pb-6 pt-5 sm:px-8 sm:pb-8">
            <div className="flex flex-wrap gap-2">
              {spanishSearchIntents.filter((item) => item.canonical !== "/rutas").map((item) => (
                <Link key={item.canonical} href={item.linkHref} className="aula-chip" data-tone="cyan">{item.linkLabel}</Link>
              ))}
            </div>
          </div>
        </details>
      )}
    </div>
  );
}
