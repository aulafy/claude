import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon, { type IconName } from "@/components/Icon";
import { cursos, totalLecciones } from "@/lib/cursos";
import { getLocalizedCurso } from "@/lib/i18n";
import { getEnglishLessonTitle } from "@/lib/english-lessons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export function generateStaticParams() {
  return cursos.map((course) => ({ slug: course.slug }));
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
      images: [{ url: "/og-image.png", width: 512, height: 512, alt: `${course.title} on Aulafy` }],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description,
      creator: "@learntouseai",
      images: ["/og-image.png"],
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
  const lessons = course.secciones.flatMap((section) => section.lecciones);
  const firstLesson = lessons[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE_URL}/en/courses/${course.slug}#course`,
    name: course.title,
    description: course.desc,
    inLanguage: "en",
    url: `${SITE_URL}/en/courses/${course.slug}`,
    isAccessibleForFree: true,
    educationalLevel: course.level,
    learningResourceType: "Online course",
    provider: { "@type": "Organization", name: "Aulafy", url: SITE_URL },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      category: "free",
      url: `${SITE_URL}/en/courses/${course.slug}`,
    },
    syllabusSections: course.secciones.map((section) => ({
      "@type": "Syllabus",
      name: section.title,
      description: `${section.lecciones.length} lessons`,
    })),
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
              <span className="aula-chip" data-tone="cyan"><Icon name="book" /> {total} lessons</span>
              <span className="aula-chip" data-tone="green"><Icon name="star" /> Free and open source</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {firstLesson && (
                <Link href={`/en/courses/${course.slug}/${firstLesson.slug}`} className="aula-button aula-button-primary">
                  <Icon name="book" /> Start lessons
                </Link>
              )}
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
              <div className="aula-meta text-zinc-500">modules</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{course.secciones.length}</div>
            </div>
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">lessons</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{total}</div>
            </div>
            <div className="aula-panel p-4 col-span-2">
              <div className="aula-meta text-zinc-500">status</div>
              <div className="font-display text-xl font-bold text-white mt-1">open</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <span className="aula-section-label"><Icon name="route" /> Roadmap</span>
          <h2 className="font-display font-bold text-2xl text-white mt-2">Syllabus</h2>
        </div>
        <span className="aula-chip" data-tone="cyan">{total} steps</span>
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
              <span className="aula-chip">{section.lecciones.length} lessons</span>
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
                      <span className="flex-shrink-0 w-9 h-9 rounded-md bg-orange-500/10 border border-orange-500/25 text-orange-400 flex items-center justify-center text-xs font-semibold font-[family-name:var(--font-code)]">
                        {n}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-zinc-300 group-hover:text-white transition-colors">
                          {getEnglishLessonTitle(course.slug, lesson.slug, lesson.title)}
                        </span>
                        <span className="aula-meta mt-0.5 block text-zinc-600">/{course.slug}/{lesson.slug}</span>
                      </span>
                      <span className="ml-auto text-zinc-600 group-hover:text-orange-400 transition-colors">
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
