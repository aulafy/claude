import Link from "next/link";
import styles from "./UnifiedCourse.module.css";
import { localized, unifiedLessonCount, unifiedModuleProjects, unifiedModules, unifiedSources, type CourseLocale } from "@/lib/unified-course";

const copy = {
  es: {
    skip: "Saltar al curso", course: "Curso abierto de inteligencia artificial", title: "Aprende IA, de cero a producción.",
    lead: "Un curso continuo, compacto y en español. Ve de los fundamentos a datos, software, modelos locales, agentes y operación segura sin perderte entre catálogos.",
    start: "Empezar por la primera lección", contents: "Contenido", modules: "módulos", lessons: "lecciones", updated: "Revisión estructural", open: "Gratis · abierto · sin registro",
    method: "Cada lección responde cuatro cosas: qué aprenderás, qué debes entender, qué harás y qué evidencia conservarás.",
    learn: "Al terminar podrás", practice: "Práctica", evidence: "Evidencia", sources: "Fuentes primarias", status: "Estado editorial",
    stable: "Concepto estable", reviewable: "Revisión periódica", volatile: "Revisión frecuente", next: "Siguiente lección", top: "Volver al índice",
    project: "Proyecto del módulo", deliverables: "Entregables", checks: "Autoevaluación antes de avanzar", continue: "Continuar al módulo siguiente",
    worked: "Ejemplo resuelto", template: "Plantilla reutilizable", projectNav: "Proyecto integrador",
    recovered: "Adaptada del backup de Aulafy",
    footer: "Contenido CC BY 4.0 · código MIT. Formación educativa no oficial.", language: "English",
  },
  en: {
    skip: "Skip to course", course: "Open artificial intelligence course", title: "Learn AI, from zero to production.",
    lead: "One continuous, compact course in English. Move from foundations to data, software, local models, agents, and safe operations without getting lost in catalogues.",
    start: "Start with the first lesson", contents: "Contents", modules: "modules", lessons: "lessons", updated: "Structural review", open: "Free · open · no sign-up",
    method: "Every lesson answers four questions: what you will learn, what you need to understand, what you will do, and what evidence you will keep.",
    learn: "By the end you can", practice: "Practice", evidence: "Evidence", sources: "Primary sources", status: "Editorial status",
    stable: "Stable concept", reviewable: "Periodic review", volatile: "Frequent review", next: "Next lesson", top: "Back to contents",
    project: "Module project", deliverables: "Deliverables", checks: "Self-check before moving on", continue: "Continue to the next module",
    worked: "Worked example", template: "Reusable template", projectNav: "Integrated project",
    recovered: "Adapted from the Aulafy backup",
    footer: "Content CC BY 4.0 · code MIT. Unofficial educational material.", language: "Español",
  },
} as const;

export default function UnifiedCourse({ locale = "es" }: { locale?: CourseLocale }) {
  const text = copy[locale];
  const lessons = unifiedModules.flatMap((module) => module.lessons);
  const languageHref = locale === "es" ? "/en/ai-course" : "/curso-ia";
  const siteUrl = "https://www.aulafy.net";
  const courseSchema = {
    "@context": "https://schema.org", "@type": "Course",
    name: locale === "es" ? "Curso completo de inteligencia artificial" : "Complete artificial intelligence course",
    description: text.lead, url: `${siteUrl}${locale === "es" ? "/curso-ia" : "/en/ai-course"}`, inLanguage: locale,
    isAccessibleForFree: true,
    provider: { "@type": "EducationalOrganization", name: "Aulafy", url: siteUrl },
    author: { "@type": "Person", name: "Ramón Guillamón", url: `${siteUrl}/sobre-ramon-guillamon` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    educationalLevel: locale === "es" ? "De principiante a avanzado" : "Beginner to advanced",
    teaches: unifiedModules.map((module) => localized(module.title, locale)),
    hasPart: unifiedModules.map((module) => ({
      "@type": "LearningResource",
      name: localized(module.title, locale),
      url: `${siteUrl}${locale === "es" ? "/curso-ia" : "/en/ai-course"}#${module.id}`,
      inLanguage: locale,
      learningResourceType: locale === "es" ? "Módulo" : "Module",
    })),
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT16H" },
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <a href="#curso" className={styles.skip}>{text.skip}</a>
      <header className={styles.header} id="arriba">
        <Link href={locale === "es" ? "/" : "/en"} className={styles.brand}><span>A</span><strong>Aulafy</strong></Link>
        <nav aria-label="Utilidades"><a href="#indice">{text.contents}</a><Link href={languageHref} hrefLang={locale === "es" ? "en" : "es"}>{text.language}</Link><a href="https://github.com/aulafy/claude" target="_blank" rel="noopener noreferrer">GitHub</a></nav>
      </header>

      <section className={styles.hero}>
        <p>{text.course}</p><h1>{text.title}</h1><p className={styles.lead}>{text.lead}</p>
        <div className={styles.actions}><a href={`#${lessons[0].id}`}>{text.start} ↓</a><span>{text.open}</span></div>
        <dl><div><dt>{text.modules}</dt><dd>{unifiedModules.length}</dd></div><div><dt>{text.lessons}</dt><dd>{unifiedLessonCount}</dd></div><div><dt>{text.updated}</dt><dd><time dateTime="2026-08-04">04·08·2026</time></dd></div></dl>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar} id="indice">
          <div className={styles.sidebarIntro}><strong>{text.contents}</strong><p>{text.method}</p></div>
          <nav aria-label={text.contents}>
            {unifiedModules.map((module) => <div key={module.id}><a className={styles.moduleLink} href={`#${module.id}`}>{localized(module.title, locale)}</a><ol>{module.lessons.map((item) => <li key={item.id}><a href={`#${item.id}`}>{localized(item.title, locale)}</a></li>)}<li className={styles.projectNav}><a href={`#project-${module.id}`}>{text.projectNav}</a></li></ol></div>)}
          </nav>
        </aside>

        <main className={styles.content} id="curso">
          {unifiedModules.map((module) => (
            <section className={styles.module} id={module.id} key={module.id}>
              <header className={styles.moduleHeader}><p>{locale === "es" ? "Módulo" : "Module"}</p><h2>{localized(module.title, locale)}</h2><p>{localized(module.purpose, locale)}</p></header>
              {module.lessons.map((item) => {
                const index = lessons.findIndex((lesson) => lesson.id === item.id);
                const next = lessons[index + 1];
                const isLastInModule = item.id === module.lessons.at(-1)?.id;
                return <article className={styles.lesson} id={item.id} key={item.id}>
                  <div className={styles.lessonMeta}><span>{String(index + 1).padStart(2, "0")} / {unifiedLessonCount}</span><span>{text.status}: {text[item.volatility]}</span></div>
                  <h3>{localized(item.title, locale)}</h3><p className={styles.summary}>{localized(item.summary, locale)}</p>
                  <div className={styles.outcomes}><strong>{text.learn}</strong><ul>{item.outcomes.map((outcome) => <li key={localized(outcome, locale)}>{localized(outcome, locale)}</li>)}</ul></div>
                  <div className={styles.explanation}>{item.explanation.map((paragraph) => <p key={localized(paragraph, locale)}>{localized(paragraph, locale)}</p>)}</div>
                  {item.importedFrom ? <p className={styles.recovered}>{text.recovered}: <a href={item.importedFrom.href}>{localized(item.importedFrom.title, locale)}</a>.</p> : null}
                  <div className={styles.exercise}><div><span>{text.practice}</span><p>{localized(item.practice, locale)}</p></div><div><span>{text.evidence}</span><p>{localized(item.evidence, locale)}</p></div></div>
                  {item.id === "que-es-ia-generativa" ? <FirstWorkedExample locale={locale} text={text} /> : null}
                  <details className={styles.sources}><summary>{text.sources} · {item.sources.length}</summary><ul>{item.sources.map((key) => <li key={key}><a href={unifiedSources[key].href} target="_blank" rel="noopener noreferrer">{unifiedSources[key].label} ↗</a></li>)}</ul></details>
                  <footer>{isLastInModule ? <a href={`#project-${module.id}`}>{text.projectNav} ↓</a> : next ? <a href={`#${next.id}`}>{text.next} ↓</a> : <a href="#arriba">{text.top} ↑</a>}<a href="#indice">{text.contents}</a></footer>
                </article>;
              })}
              <ModuleProject moduleId={module.id} locale={locale} text={text} />
            </section>
          ))}
        </main>
      </div>
      <footer className={styles.footer}><strong>Aulafy</strong><p>{text.footer}</p><nav aria-label={locale === "es" ? "Información editorial" : "Editorial information"}><Link href={locale === "es" ? "/cursos" : "/en/courses"}>{locale === "es" ? "Biblioteca ampliada" : "Extended library"}</Link><Link href="/fuentes">{locale === "es" ? "Fuentes" : "Sources"}</Link><Link href="/sobre-ramon-guillamon">{locale === "es" ? "Autoría" : "Author"}</Link><Link href="/privacidad">{locale === "es" ? "Privacidad" : "Privacy"}</Link><Link href={languageHref}>{text.language}</Link></nav></footer>
    </div>
  );
}

function ModuleProject({ moduleId, locale, text }: { moduleId: string; locale: CourseLocale; text: typeof copy[CourseLocale] }) {
  const project = unifiedModuleProjects[moduleId];
  const moduleIndex = unifiedModules.findIndex((module) => module.id === moduleId);
  const nextModule = unifiedModules[moduleIndex + 1];
  return <aside id={`project-${moduleId}`} className={styles.moduleProject} aria-labelledby={`${moduleId}-project-title`}>
    <p>{text.project}</p><h3 id={`${moduleId}-project-title`}>{localized(project.title, locale)}</h3>
    <p className={styles.projectScenario}>{localized(project.scenario, locale)}</p>
    <div className={styles.projectGrid}>
      <div><strong>{text.deliverables}</strong><ol>{project.deliverables.map((item) => <li key={localized(item, locale)}>{localized(item, locale)}</li>)}</ol></div>
      <div><strong>{text.checks}</strong><ul>{project.checks.map((item) => <li key={localized(item, locale)}>{localized(item, locale)}</li>)}</ul></div>
    </div>
    <a href={nextModule ? `#${nextModule.id}` : "#arriba"}>{nextModule ? `${text.continue} ↓` : `${text.top} ↑`}</a>
  </aside>;
}

function FirstWorkedExample({ locale, text }: { locale: CourseLocale; text: typeof copy[CourseLocale] }) {
  const es = locale === "es";
  return <aside className={styles.workedExample} aria-labelledby="worked-example-title">
    <p>{text.worked}</p><h4 id="worked-example-title">{es ? "Preparar un correo sobre una reunión" : "Prepare an email about a meeting"}</h4>
    <div className={styles.exampleTable} role="group" aria-label={es ? "Separación de responsabilidades" : "Responsibility split"}>
      <div><strong>{es ? "La IA propone" : "AI proposes"}</strong><p>{es ? "Asunto, estructura y primer borrador a partir de notas ficticias." : "Subject, structure, and first draft from fictional notes."}</p></div>
      <div><strong>{es ? "La persona comprueba" : "The person checks"}</strong><p>{es ? "Fecha, asistentes, acuerdos, tono y ausencia de datos inventados." : "Date, attendees, decisions, tone, and absence of invented facts."}</p></div>
      <div><strong>{es ? "La persona decide" : "The person decides"}</strong><p>{es ? "Si el mensaje es correcto, quién debe recibirlo y cuándo enviarlo." : "Whether the message is correct, who should receive it, and when to send it."}</p></div>
    </div>
    <details><summary>{text.template}</summary><pre>{es ? `Tarea: prepara un borrador de correo.\nContexto permitido: [notas ficticias].\nNo inventes: nombres, fechas ni acuerdos.\nDevuelve: asunto + cuerpo de menos de 150 palabras.\nYo comprobaré: hechos, destinatarios y tono antes de enviar.` : `Task: prepare an email draft.\nAllowed context: [fictional notes].\nDo not invent: names, dates, or decisions.\nReturn: subject + body under 150 words.\nI will check: facts, recipients, and tone before sending.`}</pre></details>
  </aside>;
}
