import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { getLocalizedCursos, type Locale } from "@/lib/i18n";
import { getLearningPaths } from "@/lib/learning-paths";
import { totalLecciones } from "@/lib/cursos";

const copy = {
  es: { home: "Inicio", title: "Rutas de aprendizaje de IA", lead: "No necesitas recorrer todo Aulafy. Elige la situación que más se parece a la tuya y sigue los cursos en el orden propuesto.", choose: "¿Cuál se parece más a ti?", path: "Ruta", entry: "Nivel de entrada", first: "Primer paso", audience: "Para quién", result: "Resultado", lessons: "lecciones", open: "Abrir curso", start: "Empezar esta ruta", recommended: "Empieza aquí", note: "Las duraciones son orientativas. Avanza cuando puedas explicar el resultado y repetir la práctica sin copiar los pasos." },
  en: { home: "Home", title: "AI learning paths", lead: "You do not need to complete all of Aulafy. Choose the situation closest to yours and follow the courses in the proposed order.", choose: "Which one sounds most like you?", path: "Path", entry: "Entry level", first: "First step", audience: "For", result: "Outcome", lessons: "lessons", open: "Open course", start: "Start this path", recommended: "Start here", note: "Durations are estimates. Move forward when you can explain the result and repeat the practice without copying every step." },
} satisfies Record<Locale, Record<string, string>>;

const icons: IconName[] = ["laptopCode", "network", "server", "briefcase"];

export default function LearningPathsPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const courses = getLocalizedCursos(locale);
  const paths = getLearningPaths(locale);
  const base = locale === "en" ? "/en/courses" : "/cursos";

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
        <div className="mt-8">
          <p className="aula-meta text-zinc-500 mb-3">{text.choose}</p>
          <nav className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-label={text.choose}>
            {paths.filter((path) => path.featured).map((path) => (
              <a key={path.slug} href={`#${path.slug}`} className="aula-capsule p-4 group">
                <strong className="block text-zinc-100 group-hover:text-cyan-200">{path.title}</strong>
                <span className="aula-meta text-zinc-500 mt-2 block">{path.entry} · {path.duration}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="grid gap-8">
        {paths.map((path, pathIndex) => {
          const pathCourses = path.courses.map((slug) => courses.find((course) => course.slug === slug)).filter(Boolean);
          return (
            <section key={path.slug} id={path.slug} className="aula-panel p-6 sm:p-8 scroll-mt-24">
              <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8">
                <div>
                  <div className="aula-icon text-cyan-300 text-xl mb-5"><Icon name={icons[pathIndex % icons.length]} /></div>
                  <div className="aula-meta text-zinc-500">{text.path} {String(pathIndex + 1).padStart(2, "0")} · {path.duration}</div>
                  <h2 className="font-display text-2xl font-bold text-white mt-2">{path.title}</h2>
                  <p className="mt-3 text-zinc-400 leading-relaxed">{path.description}</p>
                  <dl className="mt-6 space-y-4 text-sm">
                    <div><dt className="aula-meta text-zinc-600">{text.entry}</dt><dd className="mt-1 text-zinc-300">{path.entry}</dd></div>
                    <div><dt className="aula-meta text-zinc-600">{text.first}</dt><dd className="mt-1 text-zinc-300">{path.firstStep}</dd></div>
                    <div><dt className="aula-meta text-zinc-600">{text.audience}</dt><dd className="mt-1 text-zinc-300">{path.audience}</dd></div>
                    <div><dt className="aula-meta text-zinc-600">{text.result}</dt><dd className="mt-1 text-zinc-300">{path.outcome}</dd></div>
                  </dl>
                  {pathCourses[0] && (
                    <Link href={`${base}/${pathCourses[0].slug}`} className="aula-button aula-button-primary mt-6">
                      <Icon name="rocket" /> {text.start}
                    </Link>
                  )}
                </div>
                <ol className="grid gap-3">
                  {pathCourses.map((course, index) => course && (
                    <li key={course.slug}>
                      <Link href={`${base}/${course.slug}`} className="aula-capsule flex items-center gap-4 p-4 group">
                        <span className="w-10 h-10 rounded-md border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 flex items-center justify-center font-[family-name:var(--font-code)] text-xs">{index + 1}</span>
                        <span className="min-w-0 flex-1"><strong className="block text-zinc-100 group-hover:text-cyan-200">{course.title}</strong><span className="aula-meta text-zinc-600 mt-1 block">{index === 0 ? `${text.recommended} · ` : ""}{totalLecciones(course)} {text.lessons} · {course.level}</span></span>
                        <Icon name="chevronRight" className="text-zinc-600 group-hover:text-cyan-300" />
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          );
        })}
      </div>
      <p className="mt-10 text-sm text-zinc-500 leading-relaxed max-w-3xl">{text.note}</p>
    </div>
  );
}
