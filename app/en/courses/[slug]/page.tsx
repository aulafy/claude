import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon, { type IconName } from "@/components/Icon";
import { totalLecciones } from "@/lib/cursos";
import { getLocalizedCurso, getLocalizedCursos } from "@/lib/i18n";
import { getEnglishLessonTitle } from "@/lib/english-lessons";
import ContinuarCurso from "@/components/ContinuarCurso";
import PortableProgress from "@/components/PortableProgress";
import { getCourseGuidance } from "@/lib/course-guidance";
import { pluralLabel } from "@/lib/plural";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export function generateStaticParams() {
  return getLocalizedCursos("en").map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getLocalizedCurso(slug, "en");
  if (!course) return {};

  const description = compactDescription(
    `${course.desc} Free practical course with ${totalLecciones(course)} English lessons and matching Spanish originals.`,
  );

  return {
    title: course.title,
    description,
    keywords: [
      course.title,
      course.short,
      "free AI course",
      "open-source AI course",
      "OpenAI Codex course",
      "Claude Code course",
      "Aulafy",
    ],
    alternates: {
      canonical: `/en/courses/${course.slug}`,
      languages: { "es-ES": `/cursos/${course.slug}`, "en-US": `/en/courses/${course.slug}` },
    },
    openGraph: {
      title: course.title,
      description,
      url: `/en/courses/${course.slug}`,
      type: "website",
      siteName: "Aulafy",
      locale: "en_US",
      images: [{ url: "/opengraph-image",
        width: 1200,
        height: 630, alt: `${course.title} on Aulafy` }],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description,
      creator: "@learntouseai",
      images: ["/opengraph-image"],
    },
  };
}

function compactDescription(text: string) {
  if (text.length <= 155) return text;
  const trimmed = text.slice(0, 152);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 120 ? lastSpace : 152)}...`;
}

export default async function EnglishCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getLocalizedCurso(slug, "en");
  if (!course) notFound();

  const total = totalLecciones(course);
  const guidance = getCourseGuidance(course.slug, "en");
  const lessons = course.secciones.flatMap((section) => section.lecciones);
  const firstLesson = lessons[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${SITE_URL}/en/courses/${course.slug}#learning-resource`,
    name: course.title,
    description: course.desc,
    inLanguage: "en",
    url: `${SITE_URL}/en/courses/${course.slug}`,
    isAccessibleForFree: true,
    educationalLevel: course.level,
    timeRequired: `PT${guidance.estimatedHours}H`,
    dateModified: course.updatedAt,
    audience: { "@type": "Audience", audienceType: guidance.audience },
    competencyRequired: guidance.prerequisites,
    learningResourceType: "Course",
    provider: { "@id": `${SITE_URL}/#organization` },
    author: { "@id": `${SITE_URL}/#author` },
    teaches: guidance.outcomes,
    hasPart: lessons.map((lesson) => ({
      "@type": "LearningResource",
      name: getEnglishLessonTitle(course.slug, lesson.slug, lesson.title),
      url: `${SITE_URL}/en/courses/${course.slug}/${lesson.slug}`,
      inLanguage: "en",
      isAccessibleForFree: true,
      learningResourceType: "Lesson",
      isPartOf: { "@id": `${SITE_URL}/en/courses/${course.slug}#learning-resource` },
    })),
    isBasedOn: { "@id": `${SITE_URL}/cursos/${course.slug}#learning-resource` },
  };

  return (
    <div className="aula-shell max-w-5xl mx-auto px-6 py-14" lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-4 aula-meta">
        <Link href="/en" className="hover:text-zinc-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/en/courses" className="hover:text-zinc-400">Courses</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{course.title}</span>
      </div>

      <div
        className="aula-frame p-8 sm:p-10 mb-10"
        style={{ background: `linear-gradient(120deg, ${course.gradient[0]}22, ${course.gradient[1]}22)` }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="flex-1 min-w-0">
            <span className="aula-section-label">
              <Icon name="capsule" /> capsule/{course.slug}
            </span>
            <div
              className="aula-course-art mt-5 mb-6 w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl"
              style={{ background: `linear-gradient(120deg, ${course.gradient[0]}, ${course.gradient[1]})` }}
            >
              <Icon name={course.icon as IconName} />
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">{course.title}</h1>
            <p className="mt-4 lesson-lead max-w-3xl">{course.desc}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="aula-chip"><Icon name="chart" /> {course.level}</span>
              <span className="aula-chip" data-tone="cyan"><Icon name="book" /> {pluralLabel(total, "lesson", "en")}</span>
              <span className="aula-chip" data-tone="green"><Icon name="star" /> Free access · open content</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {firstLesson && <ContinuarCurso cursoSlug={course.slug} locale="en" />}
              {course.pdf && (
                <a href={course.pdf} className="aula-button aula-button-secondary">
                  <Icon name="pdf" /> Spanish PDF
                </a>
              )}
            </div>
            <p className="mt-4 aula-meta text-zinc-600">
              Lessons are available in English. Code snippets keep original commands and file names intact.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:w-64">
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">{pluralLabel(course.secciones.length, "module", "en").replace(/^\d+ /, "")}</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{course.secciones.length}</div>
            </div>
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">{pluralLabel(total, "lesson", "en").replace(/^\d+ /, "")}</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{total}</div>
            </div>
            <div className="aula-panel p-4 col-span-2">
              <div className="aula-meta text-zinc-500">status</div>
              <div className="font-display text-xl font-bold text-white mt-1">open</div>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-12" aria-labelledby="course-outcomes">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-6">
          <div className="aula-panel p-6 sm:p-8">
            <span className="aula-section-label"><Icon name="prompt" /> Learning outcome</span>
            <h2 id="course-outcomes" className="font-display text-2xl font-bold text-white mt-3">What you will be able to do</h2>
            <ul className="mt-5 grid gap-3">
              {guidance.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-zinc-300 leading-relaxed">
                  <Icon name="check" className="text-emerald-400 mt-1" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-zinc-800">
              <div className="aula-meta text-zinc-500">Final deliverable</div>
              <p className="mt-2 text-zinc-300 leading-relaxed">{guidance.deliverable}</p>
            </div>
          </div>
          <div className="aula-panel p-6 sm:p-8">
            <span className="aula-section-label"><Icon name="userGraduate" /> Before you start</span>
            <p className="mt-4 text-sm text-zinc-300 leading-relaxed">{guidance.audience}</p>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              {guidance.prerequisites.map((item) => <li key={item}>• {item}</li>)}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="aula-chip" data-tone="cyan"><Icon name="calendar" /> ≈ {guidance.estimatedHours} h</span>
              <span className="aula-chip" data-tone="green">{guidance.track}</span>
            </div>
            <p className="mt-5 aula-meta text-zinc-600">Updated: {new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(`${course.updatedAt}T12:00:00Z`))}</p>
          </div>
        </div>
      </section>

      <PortableProgress course={course} locale="en" />

      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <span className="aula-section-label"><Icon name="route" /> Roadmap</span>
          <h2 className="font-display font-bold text-2xl text-white mt-2">Syllabus</h2>
        </div>
        <span className="aula-chip" data-tone="cyan">{pluralLabel(total, "step", "en")}</span>
      </div>

      {course.secciones.map((section, sectionIndex) => {
        const start = course.secciones
          .slice(0, sectionIndex)
          .reduce((sum, item) => sum + item.lecciones.length, 0);

        return (
          <div key={section.title} className="mb-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="aula-section-label">
                module {String(sectionIndex + 1).padStart(2, "0")} / {section.title}
              </h3>
              <span className="aula-chip">{pluralLabel(section.lecciones.length, "lesson", "en")}</span>
            </div>
            <ol className="grid gap-2">
              {section.lecciones.map((lesson, lessonIndex) => {
                const n = start + lessonIndex + 1;
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/en/courses/${course.slug}/${lesson.slug}`}
                      className="aula-capsule flex items-center gap-4 px-4 py-3.5 group"
                    >
                      <span className="flex-shrink-0 w-9 h-9 rounded-md bg-violet-500/10 border border-violet-500/25 text-violet-400 flex items-center justify-center text-xs font-semibold font-[family-name:var(--font-code)]">
                        {n}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-zinc-300 group-hover:text-white transition-colors">
                          {getEnglishLessonTitle(course.slug, lesson.slug, lesson.title)}
                        </span>
                        <span className="aula-meta mt-0.5 block text-zinc-600">/{course.slug}/{lesson.slug}</span>
                      </span>
                      <span className="ml-auto text-zinc-600 group-hover:text-fuchsia-300 transition-colors">
                        <Icon name="chevronRight" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}

      <div className="mt-12 pt-8 border-t border-zinc-800">
        <Link href="/en/courses" className="aula-button aula-button-secondary">
          <Icon name="grid" /> View all courses
        </Link>
      </div>
    </div>
  );
}
