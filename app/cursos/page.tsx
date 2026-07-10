import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { cursos, proximamente, totalLecciones, type Curso } from "@/lib/cursos";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

const courseGroups = [
  {
    id: "programacion",
    title: "Programación con IA",
    description: "Programa con agentes, domina la terminal y construye herramientas que puedes mantener.",
    slugs: ["codex-programadores", "claude-code", "ia-local"],
  },
  {
    id: "sistemas",
    title: "Sistemas, modelos y agentes",
    description: "Diseña, evalúa y opera sistemas de IA con control técnico y seguridad.",
    slugs: ["agentes-automatizacion", "agentes-produccion", "rag-seguro", "seguridad-evals", "mlops-local", "fine-tuning-local", "automatizacion-self-hosted"],
  },
  {
    id: "aplicaciones",
    title: "Aplicaciones prácticas",
    description: "Lleva la IA a contenidos, negocios, videojuegos y flujos de trabajo reales.",
    slugs: ["ia-generativa", "videojuegos-3d-ia", "ia-pymes"],
  },
];

function CourseCard({ course }: { course: Curso }) {
  const index = cursos.findIndex((item) => item.slug === course.slug);
  return (
    <Link href={`/cursos/${course.slug}`} className="group aula-capsule block">
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
        <div className="aula-meta mb-2 text-zinc-500">/cursos/{course.slug}</div>
        <h3 className="font-display font-bold text-xl text-white group-hover:text-fuchsia-300 transition-colors">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{course.desc}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="aula-chip"><Icon name="chart" /> {course.level}</span>
          <span className="aula-chip" data-tone="cyan"><Icon name="book" /> {totalLecciones(course)} lecciones</span>
          {course.pdf && <span className="aula-chip" data-tone="amber"><Icon name="pdf" /> PDF</span>}
          <span className="aula-chip" data-tone="green">open</span>
        </div>
      </div>
    </Link>
  );
}

export const metadata: Metadata = {
  title: "Cursos gratis de IA open source en español",
  description:
    "Catálogo gratuito de cursos de IA open source en español: Claude Code, IA local, Ollama, RAG, agentes, MLOps, seguridad y automatización.",
  keywords: [
    "cursos gratis de IA",
    "cursos inteligencia artificial español",
    "curso IA open source",
    "curso Claude Code",
    "curso OpenAI Codex",
    "tutorial Codex para programadores",
    "curso Fable 5",
    "curso videojuegos 3D IA",
    "curso Godot Blender IA",
    "IA para CAD",
    "curso Ollama",
    "curso RAG",
    "curso agentes IA",
    "curso fine-tuning LLM",
    "curso MLOps LLM",
    "curso IA para pymes",
    "automatización IA self-hosted",
  ],
  alternates: { canonical: "/cursos", languages: { "es-ES": "/cursos", "en-US": "/en/courses" } },
  openGraph: {
    title: "Cursos gratis de IA open source en español",
    description:
      "Rutas prácticas, gratuitas y sin registro para aprender IA local, Claude Code, Fable 5, videojuegos 3D, RAG, agentes, MLOps, seguridad y automatización.",
    url: "/cursos",
    type: "website",
    siteName: "Aulafy",
    locale: "es_ES",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Catálogo de cursos de IA en Aulafy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos gratis de IA open source en español",
    description:
      "Catálogo práctico de Aulafy para aprender IA local, Claude Code, Fable 5, videojuegos 3D, RAG, agentes, MLOps y seguridad.",
    creator: "@learntouseai",
    images: ["/opengraph-image"],
  },
};

export default function Cursos() {
  const leccionesTotales = cursos.reduce((sum, curso) => sum + totalLecciones(curso), 0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/cursos#webpage`,
        url: `${SITE_URL}/cursos`,
        name: "Cursos gratis de IA open source en español",
        description: "Catálogo de cursos prácticos y gratuitos de IA open source en español.",
        inLanguage: "es",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/cursos#course-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/cursos#course-list`,
        name: "Catálogo de cursos de IA de Aulafy",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: cursos.length,
        itemListElement: cursos.map((curso, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/cursos/${curso.slug}`,
          item: {
            "@type": "LearningResource",
            "@id": `${SITE_URL}/cursos/${curso.slug}#learning-resource`,
            name: curso.title,
            description: curso.desc,
            url: `${SITE_URL}/cursos/${curso.slug}`,
            inLanguage: "es",
            isAccessibleForFree: true,
            learningResourceType: "Course",
          },
        })),
      },
    ],
  };

  return (
    <div className="aula-shell max-w-6xl mx-auto px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-4 aula-meta">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Cursos</span>
      </div>

      <section className="aula-frame p-6 sm:p-8 mb-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-end">
          <div>
            <span className="aula-section-label">
              <Icon name="capsule" /> Biblioteca de cápsulas
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-4 mb-4">
              Cursos gratis de IA open source en español
            </h1>
            <p className="lesson-lead max-w-3xl">
              Rutas prácticas para aprender Codex, IA local, agentes y automatización. Todos gratuitos,
              en español y de código abierto. Sin registro: tu progreso se guarda solo en tu navegador.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="aula-chip" data-tone="green"><Icon name="check" /> Gratis</span>
              <span className="aula-chip" data-tone="cyan"><Icon name="globe" /> En español</span>
              <span className="aula-chip" data-tone="amber"><Icon name="code" /> Código abierto</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">cursos</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{cursos.length}</div>
            </div>
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">lecciones</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{leccionesTotales}</div>
            </div>
            <div className="aula-panel p-4 col-span-2">
              <div className="aula-meta text-zinc-500">formato</div>
              <div className="font-display text-xl font-bold text-white mt-1">web + PDF</div>
            </div>
          </div>
        </div>
      </section>

      {/* Descarga del libro completo */}
      <a
        href="/aulafy-guia-completa.pdf"
        className="group aula-frame flex flex-col sm:flex-row sm:items-center gap-4 p-4 mb-10 hover:border-zinc-600 transition-colors"
      >
        <span className="aula-icon flex-shrink-0 text-fuchsia-300"><Icon name="filePdf" /></span>
        <span className="flex-1 text-sm">
          <strong className="text-white">¿Prefieres leerlo todo de un tirón?</strong>{" "}
          <span className="text-zinc-400">Descarga la guía completa de Aulafy en PDF, gratis.</span>
        </span>
        <span className="aula-chip" data-tone="amber"><Icon name="download" /> Descargar</span>
      </a>

      <div className="mb-6 flex flex-wrap items-center gap-2" aria-label="Rutas de aprendizaje">
        <span className="aula-meta text-zinc-500">Empieza por</span>
        <a href="#programacion" className="aula-chip" data-tone="green">Programación con IA</a>
        <a href="#sistemas" className="aula-chip" data-tone="cyan">Sistemas y agentes</a>
        <a href="#aplicaciones" className="aula-chip" data-tone="amber">Aplicaciones prácticas</a>
      </div>

      {courseGroups.map((group) => (
        <section id={group.id} key={group.id} aria-labelledby={`${group.id}-title`} className="mb-14 scroll-mt-24">
          <h2 id={`${group.id}-title`} className="font-display text-2xl font-bold text-white mb-2">{group.title}</h2>
          <p className="text-zinc-400 mb-6 max-w-3xl">{group.description}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {group.slugs.map((slug) => cursos.find((course) => course.slug === slug)).filter((course): course is Curso => Boolean(course)).map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </section>
      ))}

      {/* Próximamente */}
      <h2 className="aula-section-label mb-4"><Icon name="lab" /> Próximamente</h2>
      <div className="grid sm:grid-cols-2 gap-5">
        {proximamente.map((c) => (
          <div key={c.title} className="aula-panel p-6 opacity-80">
            <div className="aula-icon text-zinc-400 mb-4"><Icon name={c.icon as IconName} /></div>
            <h3 className="font-display font-semibold text-lg text-zinc-300">{c.title}</h3>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{c.desc}</p>
            <div className="mt-4 aula-chip" data-tone="violet">En preparación</div>
          </div>
        ))}
      </div>
    </div>
  );
}
