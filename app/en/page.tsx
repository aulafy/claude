import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import LanguageSwitch from "@/components/LanguageSwitch";
import ThemeToggle from "@/components/ThemeToggle";
import LandingNetwork from "@/components/LandingNetwork";
import { getLocalizedCursos } from "@/lib/i18n";
import { totalLecciones } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Aulafy — Free open-source AI courses in English and Spanish",
  description:
    "Free practical AI courses: Claude Code, local AI, RAG, agents, automation, security and hands-on projects.",
  alternates: { canonical: "/en", languages: { "es-ES": "/", "en-US": "/en" } },
  openGraph: {
    title: "Aulafy — Free open-source AI courses",
    description:
      "Practical routes to learn Claude Code, local AI, RAG, agents, automation, security and generative AI.",
    type: "website",
    locale: "en_US",
    url: "/en",
    images: [{ url: "/og-image.png", width: 512, height: 512, alt: "Aulafy, free open-source AI courses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aulafy — Free open-source AI courses",
    description: "Learn Claude Code, local AI, RAG, agents and automation with practical projects.",
    creator: "@learntouseai",
    images: ["/og-image.png"],
  },
};

function BrandIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="0.52" stopColor="#e879f9" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="116" fill={`url(#${id})`} />
      <g fill="none" stroke="#fff" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round">
        <path d="M256 132 L150 380" />
        <path d="M256 132 L362 380" />
        <path d="M198 300 L314 300" />
      </g>
      <circle cx="256" cy="120" r="15" fill="#fff" />
    </svg>
  );
}

const courses = getLocalizedCursos("en");
const featured = courses.find((course) => course.slug === "claude-code") ?? courses[0];
const coverCourses = courses.filter((course) => course.slug !== featured.slug).slice(0, 6);

const routes = [
  {
    title: "Start from zero",
    desc: "Install Claude Code, learn how to ask clearly and build your first guided projects.",
    href: "/en/courses/claude-code",
    steps: ["Install", "First projects", "Daily workflows"],
  },
  {
    title: "Build with local AI",
    desc: "Create private tools with models running on your own computer: RAG, PDFs, voice and desktop utilities.",
    href: "/en/courses/ia-local",
    steps: ["Ollama", "RAG", "Local apps"],
  },
  {
    title: "Use it at work",
    desc: "Automate office tasks, documents, reports and team flows with practical AI systems.",
    href: "/en/courses/ia-pymes",
    steps: ["Business flows", "Assistants", "Automation"],
  },
];

const method = [
  {
    icon: "capsule" as IconName,
    title: "Reusable capsules",
    desc: "Each lesson has a clear goal, guided practice and an output you can adapt to your own work.",
  },
  {
    icon: "experiment" as IconName,
    title: "Reproducible experiments",
    desc: "Configuration, execution and evidence stay explicit so you can repeat and improve the workflow.",
  },
  {
    icon: "terminal" as IconName,
    title: "Practical output",
    desc: "Every module leaves you with prompts, commands, files or a working mini-app on your machine.",
  },
];

export default function EnglishHome() {
  const lessons = courses.reduce((sum, course) => sum + totalLecciones(course), 0);

  return (
    <div className="aula-shell relative bg-[#0b0914] text-zinc-200 min-h-screen overflow-hidden" lang="en">
      <div className="fixed inset-0 -z-10 aurora" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0914]/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/en" className="flex items-center gap-2.5" aria-label="Aulafy home">
            <BrandIcon id="lg-nav-en" className="w-8 h-8" />
            <span className="font-display font-bold text-white text-lg">Aulafy</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#courses" className="hover:text-white transition-colors">Courses</a>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <a href="#why" className="hover:text-white transition-colors">Why Aulafy</a>
            <a href="#method" className="hover:text-white transition-colors">How it works</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle compact />
            <a href="#courses" className="aula-button aula-button-primary text-sm px-3 py-2">
              <Icon name="book" />
              View courses
            </a>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-14 sm:pt-20 pb-12 sm:pb-16 grid lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] gap-8 lg:gap-14 items-center">
        <div>
        <div className="aula-chip mb-6" data-tone="cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
          Free open-source AI courses · English and Spanish
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl leading-tight text-white max-w-4xl">
          Learn practical AI:<br /><span className="grad-text">Claude Code, local AI, RAG and automation</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
          Go from curious to capable with practical routes, real projects and local-first workflows that can run on <strong className="text-zinc-200">your own computer</strong>.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#courses" className="aula-button aula-button-primary glow">
            <Icon name="book" />
            Browse courses
          </a>
          <Link href="/en/courses/claude-code" className="aula-button aula-button-secondary">
            <Icon name="terminal" />
            Start with Claude Code
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
          {["Free", "Open source", `${courses.length} courses`, `${lessons} lessons`].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <Icon name="check" className="text-[#22d3ee]" />
              {item}
            </span>
          ))}
        </div>
        </div>
        <div className="lg:pl-4">
          <LandingNetwork />
        </div>
      </section>

      <section id="method" className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-5">
          {routes.map((route) => (
            <Link key={route.title} href={route.href} className="aula-capsule p-6 block">
              <h2 className="font-display font-semibold text-lg text-white">{route.title}</h2>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{route.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {route.steps.map((step) => (
                  <span key={step} className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-zinc-300">
                    {step}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="why" className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="font-display font-bold text-3xl text-white">The Aulafy method</h2>
          <p className="mt-3 text-zinc-400">Small lessons, verifiable practice and reusable results.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {method.map((item) => (
            <div key={item.title} className="aula-panel p-6">
              <Icon name={item.icon} className="text-2xl text-[#22d3ee] mb-4" />
              <h3 className="font-display font-semibold text-lg text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="courses" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display font-bold text-3xl text-white">Courses</h2>
          <p className="mt-3 text-zinc-400">Practical routes for building real AI tools.</p>
        </div>

        <div className="aula-frame p-6 sm:p-8 mb-8">
          <div className="grid min-w-0 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="aula-chip" data-tone="cyan">Most popular</span>
                <span className="aula-icon text-[#22d3ee] text-xl" aria-hidden="true">
                  <Icon name="advanced" />
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white">{featured.title}</h3>
              <p className="mt-3 text-zinc-400 max-w-xl leading-relaxed">{featured.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="aula-chip">{featured.level}</span>
                <span className="aula-chip" data-tone="green">Real projects</span>
                <span className="aula-chip" data-tone="amber">Guide + PDF</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:w-48">
              <Link href="/en/courses/claude-code" className="aula-button aula-button-primary">
                <Icon name="book" /> View course
              </Link>
              <a href="/aulafy-guia-completa.pdf" className="aula-button aula-button-secondary">
                <Icon name="filePdf" /> Spanish PDF
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {coverCourses.map((course) => (
            <Link key={course.slug} href={`/en/courses/${course.slug}`} className="aula-capsule block overflow-hidden">
              <div
                className="aula-course-art h-28 flex items-end justify-between gap-4 p-5"
                style={{ background: `linear-gradient(120deg, ${course.gradient[0]}, ${course.gradient[1]})` }}
              >
                <div className="relative w-11 h-11 rounded-lg bg-white/15 border border-white/25 backdrop-blur flex items-center justify-center text-white text-xl">
                  <Icon name={course.icon as IconName} />
                </div>
                <span className="relative rounded-md border border-white/25 bg-black/20 px-2.5 py-1 font-[family-name:var(--font-code)] text-xs text-white">
                  {totalLecciones(course)} lessons
                </span>
              </div>
              <div className="p-5">
                <p className="aula-meta mb-2 text-zinc-500">/en/courses/{course.slug}</p>
                <h3 className="font-display font-semibold text-lg text-white">{course.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{course.short}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/en/courses" className="aula-button aula-button-secondary">
            <Icon name="grid" /> View all courses
          </Link>
        </div>
      </section>
    </div>
  );
}
