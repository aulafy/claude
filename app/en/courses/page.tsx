import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { totalLecciones } from "@/lib/cursos";
import { getLocalizedCursos, getLocalizedProximamente } from "@/lib/i18n";

const courses = getLocalizedCursos("en");
const upcoming = getLocalizedProximamente("en");
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export const metadata: Metadata = {
  title: "Free open-source AI courses",
  description:
    "Free practical AI courses in English and Spanish: Claude Code, local AI, Ollama, RAG, agents, MLOps, security and automation.",
  alternates: { canonical: "/en/courses", languages: { "es-ES": "/cursos", "en-US": "/en/courses" } },
  openGraph: {
    title: "Free open-source AI courses",
    description:
      "Practical routes to learn local AI, Claude Code, RAG, agents, MLOps, security and automation.",
    url: "/en/courses",
    type: "website",
    siteName: "Aulafy",
    locale: "en_US",
    images: [{ url: "/opengraph-image",
        width: 1200,
        height: 630, alt: "Aulafy AI course catalog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free open-source AI courses",
    description: "A practical Aulafy catalog for learning Claude Code, local AI, RAG, agents and automation.",
    creator: "@learntouseai",
    images: ["/opengraph-image"],
  },
};

export default function CoursesPage() {
  const total = courses.reduce((sum, course) => sum + totalLecciones(course), 0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/en/courses#webpage`,
        url: `${SITE_URL}/en/courses`,
        name: "Free open-source AI courses",
        description: "Practical, free and open-source AI courses in English.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/en/courses#course-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/en/courses#course-list`,
        name: "Aulafy English AI course catalog",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: courses.length,
        itemListElement: courses.map((course, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/en/courses/${course.slug}`,
          item: {
            "@type": "LearningResource",
            "@id": `${SITE_URL}/en/courses/${course.slug}#learning-resource`,
            name: course.title,
            description: course.desc,
            url: `${SITE_URL}/en/courses/${course.slug}`,
            inLanguage: "en",
            isAccessibleForFree: true,
            learningResourceType: "Course",
          },
        })),
      },
    ],
  };

  return (
    <div className="aula-shell max-w-6xl mx-auto px-6 py-14" lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-4 aula-meta">
        <Link href="/en" className="hover:text-zinc-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Courses</span>
      </div>

      <section className="aula-frame p-6 sm:p-8 mb-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-end">
          <div>
            <span className="aula-section-label">
              <Icon name="capsule" /> Capsule library
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-4 mb-4">
              Free open-source AI courses
            </h1>
            <p className="lesson-lead max-w-3xl">
              Practical routes for going from curious to building real systems. No account required:
              your progress stays in your browser.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="aula-chip" data-tone="green"><Icon name="check" /> Free</span>
              <span className="aula-chip" data-tone="cyan"><Icon name="globe" /> English + Spanish</span>
              <span className="aula-chip" data-tone="amber"><Icon name="code" /> Open source</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">courses</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{courses.length}</div>
            </div>
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">lessons</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{total}</div>
            </div>
            <div className="aula-panel p-4 col-span-2">
              <div className="aula-meta text-zinc-500">format</div>
              <div className="font-display text-xl font-bold text-white mt-1">web + PDF</div>
            </div>
          </div>
        </div>
      </section>

      <a
        href="/aulafy-guia-completa.pdf"
        className="group aula-frame flex flex-col sm:flex-row sm:items-center gap-4 p-4 mb-10 hover:border-zinc-600 transition-colors"
      >
        <span className="aula-icon flex-shrink-0 text-fuchsia-300"><Icon name="filePdf" /></span>
        <span className="flex-1 text-sm">
          <strong className="text-white">Prefer a single book?</strong>{" "}
          <span className="text-zinc-400">Download the complete Aulafy guide as a free Spanish PDF.</span>
        </span>
        <span className="aula-chip" data-tone="amber"><Icon name="download" /> Download</span>
      </a>

      <div className="grid md:grid-cols-2 gap-6 mb-14">
        {courses.map((course, index) => (
          <Link key={course.slug} href={`/en/courses/${course.slug}`} className="group aula-capsule block">
            <div
              className="aula-course-art h-36 flex items-end justify-between gap-4 p-5"
              style={{ background: `linear-gradient(120deg, ${course.gradient[0]}, ${course.gradient[1]})` }}
            >
              <div className="relative w-12 h-12 rounded-lg bg-white/15 border border-white/25 backdrop-blur flex items-center justify-center text-white text-xl">
                <Icon name={course.icon as IconName} />
              </div>
              <span className="relative rounded-md border border-white/25 bg-black/20 px-2.5 py-1 font-[family-name:var(--font-code)] text-xs text-white">
                cap.{String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-6">
              <div className="aula-meta mb-2 text-zinc-500">/en/courses/{course.slug}</div>
              <h2 className="font-display font-bold text-xl text-white group-hover:text-fuchsia-300 transition-colors">
                {course.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{course.desc}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="aula-chip"><Icon name="chart" /> {course.level}</span>
                <span className="aula-chip" data-tone="cyan"><Icon name="book" /> {totalLecciones(course)} lessons</span>
                {course.pdf && <span className="aula-chip" data-tone="amber"><Icon name="pdf" /> PDF</span>}
                <span className="aula-chip" data-tone="green">open</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="aula-section-label mb-4"><Icon name="lab" /> Coming soon</h2>
      <div className="grid sm:grid-cols-2 gap-5">
        {upcoming.map((course) => (
          <div key={course.title} className="aula-panel p-6 opacity-80">
            <div className="aula-icon text-zinc-400 mb-4"><Icon name={course.icon as IconName} /></div>
            <h3 className="font-display font-semibold text-lg text-zinc-300">{course.title}</h3>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{course.desc}</p>
            <div className="mt-4 aula-chip" data-tone="violet">In preparation</div>
          </div>
        ))}
      </div>
    </div>
  );
}
