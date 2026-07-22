import Link from "next/link";
import Icon from "@/components/Icon";
import { aiProgram } from "@/lib/ai-program";
import { getLocalizedCursos, type Locale } from "@/lib/i18n";
import { totalLecciones } from "@/lib/cursos";

export default function AiProgramPage({ locale }: { locale: Locale }) {
  const program = aiProgram[locale];
  const courses = getLocalizedCursos(locale);
  const courseBySlug = new Map(courses.map((course) => [course.slug, course]));
  const home = locale === "en" ? "/en" : "/";
  const programUrl = locale === "en" ? "/en/program" : "/programa";
  const topicTitle = locale === "en" ? "Module topics" : "Temas del módulo";
  const outcomeLabel = locale === "en" ? "Outcome" : "Resultado";
  const practiceLabel = locale === "en" ? "Practice" : "Práctica";
  const evidenceLabel = locale === "en" ? "Evidence" : "Evidencia";

  return (
    <div className="aula-shell max-w-6xl mx-auto px-6 py-14" lang={locale}>
      <div className="mb-4 aula-meta">
        <Link href={home} className="hover:text-zinc-300">Aulafy</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{program.title}</span>
      </div>

      <header className="aula-frame p-7 sm:p-10 mb-10">
        <span className="aula-section-label"><Icon name="route" /> {program.eyebrow}</span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white mt-4 max-w-4xl">
          {program.title}
        </h1>
        <p className="lesson-lead mt-5 max-w-3xl">{program.lead}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#fases" className="aula-button aula-button-primary"><Icon name="route" /> {program.stagesTitle}</a>
          <a href="#perfiles" className="aula-button aula-button-secondary"><Icon name="users" /> {program.tracksTitle}</a>
        </div>
      </header>

      <section className="aula-panel p-6 sm:p-8 mb-10" aria-labelledby="program-rule">
        <span className="aula-section-label"><Icon name="check" /> {program.evidenceTitle}</span>
        <h2 id="program-rule" className="font-display text-2xl font-bold text-white mt-3">{program.promiseTitle}</h2>
        <p className="mt-3 text-zinc-300 leading-relaxed max-w-4xl">{program.promise}</p>
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="font-display text-xl font-bold text-white">{program.methodTitle}</h3>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {program.method.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-black/30 text-xs font-bold text-[var(--accent)]">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] mb-10" aria-label={program.horizonTitle}>
        <article className="aula-panel p-6 sm:p-8">
          <span className="aula-section-label"><Icon name="star" /> {program.horizonTitle}</span>
          <p className="mt-4 text-zinc-300 leading-relaxed">{program.horizon}</p>
        </article>
        <article className="aula-panel p-6 sm:p-8">
          <span className="aula-section-label"><Icon name="search" /> {program.updateTitle}</span>
          <p className="mt-4 text-zinc-300 leading-relaxed">{program.update}</p>
          <ul className="mt-5 grid gap-2 text-sm text-zinc-400">
            {program.updateSources.map((item) => (
              <li key={item} className="flex gap-2"><Icon name="check" className="mt-1 text-[var(--accent)]" /> <span>{item}</span></li>
            ))}
          </ul>
        </article>
      </section>

      <section id="fases" className="scroll-mt-24">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <span className="aula-section-label"><Icon name="calendar" /> curriculum</span>
            <h2 className="font-display text-3xl font-bold text-white mt-2">{program.stagesTitle}</h2>
          </div>
        </div>
        <div className="grid gap-6">
          {program.stages.map((stage, index) => (
            <article key={stage.id} id={stage.id} className="aula-panel p-6 sm:p-8 scroll-mt-24">
              <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8">
                <div>
                  <div className="aula-meta text-zinc-500">{String(index + 1).padStart(2, "0")} / {stage.weeks}</div>
                  <h3 className="font-display text-2xl font-bold text-white mt-2">{stage.title}</h3>
                  <p className="mt-2 aula-chip w-fit" data-tone="cyan">{stage.profile}</p>
                  <p className="mt-4 text-zinc-300 leading-relaxed">{stage.objective}</p>
                  <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
                    <div className="aula-meta text-zinc-500">Proyecto del módulo</div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">{stage.project}</p>
                  </div>
                  <div className="mt-6 callout callout-tip">
                    <strong>{program.gateLabel}.</strong> {stage.gate}
                  </div>
                </div>
                <div className="grid gap-5">
                  {stage.topics?.length ? (
                    <div>
                      <h4 className="font-semibold text-white">{topicTitle}</h4>
                      <ol className="mt-3 grid gap-3">
                        {stage.topics.map((topic) => (
                          <li key={topic.code} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="aula-chip" data-tone="cyan">{topic.code}</span>
                              <strong className="text-zinc-100">{topic.title}</strong>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                              <span className="font-semibold text-zinc-100">{outcomeLabel}:</span> {topic.outcome}
                            </p>
                            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                              <div className="rounded-lg border border-[var(--border)] bg-black/20 p-3">
                                <dt className="aula-meta text-zinc-500">{practiceLabel}</dt>
                                <dd className="mt-1 text-zinc-300 leading-relaxed">{topic.practice}</dd>
                              </div>
                              <div className="rounded-lg border border-[var(--border)] bg-black/20 p-3">
                                <dt className="aula-meta text-zinc-500">{evidenceLabel}</dt>
                                <dd className="mt-1 text-zinc-300 leading-relaxed">{topic.evidence}</dd>
                              </div>
                            </dl>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                  <div>
                    <h4 className="font-semibold text-white">{program.coursesLabel}</h4>
                    <div className="mt-3 grid gap-2">
                      {stage.courses.map((slug) => {
                        const course = courseBySlug.get(slug);
                        if (!course) return null;
                        return (
                          <Link key={slug} href={`${program.courseBase}/${slug}`} className="aula-capsule flex items-center gap-3 p-3 group">
                            <span className="aula-chip">{totalLecciones(course)}</span>
                            <span className="flex-1 min-w-0">
                              <strong className="block text-zinc-100 group-hover:text-cyan-200">{course.title}</strong>
                              <span className="aula-meta text-zinc-600">{course.level}</span>
                            </span>
                            <span className="text-zinc-500 group-hover:text-cyan-300">{program.startLabel} ↗</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{program.evidenceLabel}</h4>
                    <ul className="mt-3 grid gap-2 text-zinc-300">
                      {stage.evidence.map((item) => (
                        <li key={item} className="flex gap-2"><Icon name="check" className="text-emerald-400 mt-1" /> <span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="perfiles" className="mt-12 scroll-mt-24">
        <span className="aula-section-label"><Icon name="users" /> profiles</span>
        <h2 className="font-display text-3xl font-bold text-white mt-2">{program.tracksTitle}</h2>
        <div className="mt-6 grid lg:grid-cols-3 gap-5">
          {program.tracks.map((track) => (
            <article key={track.id} className="aula-panel p-6">
              <h3 className="font-display text-xl font-bold text-white">{track.title}</h3>
              <p className="mt-2 aula-meta text-zinc-500">{track.audience}</p>
              <p className="mt-4 text-sm text-zinc-300 leading-relaxed">{track.entry}</p>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{track.outcome}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {track.stages.map((stageId) => {
                  const stage = program.stages.find((item) => item.id === stageId);
                  return stage ? <a key={stageId} href={`${programUrl}#${stageId}`} className="aula-chip">{stage.title}</a> : null;
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
