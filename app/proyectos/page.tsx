import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import PageTitle from "@/components/PageTitle";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export const metadata: Metadata = {
  title: "Proyectos de IA guiados: aprende construyendo",
  description:
    "Elige un proyecto práctico de IA en español: primer resultado, web, automatización de oficina, RAG, agentes, SaaS geoespacial o plataforma privada.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: "Proyectos de IA guiados | Aulafy",
    description: "Proyectos reales para aprender IA construyendo, con rutas, límites y resultados comprobables.",
    url: "/proyectos",
    type: "website",
  },
};

type Project = {
  title: string;
  description: string;
  href: string;
  icon: IconName;
  level: string;
  commitment: string;
  outcome: string;
  learn: string;
  route: string;
  tone: "green" | "cyan" | "amber";
};

const projects: Project[] = [
  {
    title: "Tu primer resultado con IA",
    description: "Elige una tarea pequeña, trabaja con datos permitidos y termina con una comprobación que puedas explicar.",
    href: "/cursos/ia-desde-cero/primer-proyecto-repetible",
    icon: "sparkle",
    level: "Cero absoluto",
    commitment: "≈ 4 h para la ruta completa",
    outcome: "Una tarea propia, repetible y revisable.",
    learn: "Contexto, verificación, privacidad y elección de la siguiente ruta.",
    route: "IA desde cero",
    tone: "green",
  },
  {
    title: "Tu primera web local",
    description: "Convierte una idea sencilla en una página navegable en tu ordenador antes de publicar ni conectar servicios.",
    href: "/cursos/codex-desde-cero/primera-web-local",
    icon: "globe",
    level: "Principiante",
    commitment: "Primera sesión",
    outcome: "Una web local que puedes abrir, revisar y modificar.",
    learn: "Archivos, encargos claros, navegador y revisión humana.",
    route: "Codex desde cero",
    tone: "green",
  },
  {
    title: "Un flujo de oficina con revisión humana",
    description: "Escoge una tarea repetitiva de tu actividad y diseña una mejora que no envía ni decide nada por su cuenta.",
    href: "/cursos/ia-pymes",
    icon: "briefcase",
    level: "Principiante",
    commitment: "≈ 6 h",
    outcome: "Un flujo de trabajo con valor, límites y una bandeja de revisión.",
    learn: "Casos de uso, datos, costes y aprobación antes de automatizar.",
    route: "IA práctica para pymes",
    tone: "green",
  },
  {
    title: "Una web profesional publicada",
    description: "Pasa de un briefing a una web accesible, recuperable y mantenible con evidencias de calidad y seguridad.",
    href: "/cursos/crear-webs-con-ia",
    icon: "landing",
    level: "Principiante con constancia",
    commitment: "Ruta principal · ≈ 26 h",
    outcome: "Una web real publicada con pruebas y plan de mantenimiento.",
    learn: "Diseño, formularios, datos, SEO, despliegue y recuperación.",
    route: "Crea webs profesionales con IA",
    tone: "cyan",
  },
  {
    title: "Un asistente privado con documentos",
    description: "Construye una aplicación RAG que consulta una biblioteca propia y responde con fuentes, límites y un contexto definido.",
    href: "/cursos/ia-local/webapp-tipo-lexia",
    icon: "database",
    level: "Intermedio",
    commitment: "Proyecto técnico guiado",
    outcome: "Una aplicación local de consulta documental con respuestas citadas.",
    learn: "Corpus, embeddings, recuperación, API y abstención cuando falta evidencia.",
    route: "IA local y conocimiento",
    tone: "cyan",
  },
  {
    title: "Un agente de inbox con aprobaciones",
    description: "Diseña un agente que clasifica mensajes y propone borradores; las acciones delicadas quedan pendientes de una persona.",
    href: "/cursos/agentes-produccion/proyecto-inbox",
    icon: "robot",
    level: "Intermedio",
    commitment: "Proyecto técnico guiado",
    outcome: "Un flujo con estado, logs, herramientas limitadas y aprobación humana.",
    learn: "Orquestación, memoria, permisos, trazas y recuperación de fallos.",
    route: "Agentes en producción",
    tone: "cyan",
  },
  {
    title: "Un SaaS geoespacial con mapas e IA",
    description: "Construye una demo técnica con mapas, APIs públicas, Supabase/PostGIS, funciones Vercel e IA acotada.",
    href: "/cursos/crear-webs-con-ia/taller-meteo-saas-geoespacial",
    icon: "network",
    level: "Técnico",
    commitment: "Taller · ≈ 5 h",
    outcome: "Una demo geoespacial con costes, seguridad y límites evaluados.",
    learn: "Mapas, APIs, datos, despliegue y riesgos al escalar un SaaS.",
    route: "Taller METEO",
    tone: "amber",
  },
  {
    title: "Una mini plataforma LLM privada",
    description: "Integra un modelo servido por API, gateway, trazas, evals y una decisión explícita de qué está listo para producción.",
    href: "/cursos/mlops-local/proyecto-produccion",
    icon: "server",
    level: "Avanzado",
    commitment: "Proyecto técnico guiado",
    outcome: "Una plataforma reproducible con límites, métricas y plan de vuelta atrás.",
    learn: "Serving, costes, observabilidad, evals y operación responsable.",
    route: "MLOps local y despliegue",
    tone: "amber",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.href} className="group aula-capsule flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="aula-icon text-2xl text-cyan-300"><Icon name={project.icon} /></span>
        <span className="aula-chip" data-tone={project.tone}>{project.level}</span>
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold text-white group-hover:text-cyan-200">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.description}</p>
      <dl className="mt-5 grid gap-3 border-t border-zinc-800 pt-5 text-sm">
        <div>
          <dt className="aula-meta text-zinc-600">Resultado</dt>
          <dd className="mt-1 leading-relaxed text-zinc-300">{project.outcome}</dd>
        </div>
        <div>
          <dt className="aula-meta text-zinc-600">Aprenderás</dt>
          <dd className="mt-1 leading-relaxed text-zinc-400">{project.learn}</dd>
        </div>
      </dl>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        <span className="aula-chip"><Icon name="calendar" /> {project.commitment}</span>
        <span className="ml-auto text-sm font-semibold text-cyan-300">Abrir ruta <Icon name="chevronRight" /></span>
      </div>
    </Link>
  );
}

export default function Proyectos() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/proyectos#webpage`,
        url: `${SITE_URL}/proyectos`,
        name: "Proyectos de IA guiados",
        description: "Proyectos prácticos para aprender inteligencia artificial construyendo resultados comprobables.",
        inLanguage: "es",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/proyectos#project-list`,
        name: "Proyectos guiados de Aulafy",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          url: `${SITE_URL}${project.href}`,
          description: project.outcome,
        })),
      },
    ],
  };

  return (
    <div className="aula-shell mx-auto max-w-6xl px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-4 aula-meta">
        <Link href="/" className="hover:text-zinc-300">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Proyectos</span>
      </div>

      <header className="aula-frame p-7 sm:p-10">
        <span className="aula-section-label"><Icon name="hammer" /> Aprende construyendo</span>
        <PageTitle icon="hammer">Elige un resultado, no una tecnología</PageTitle>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-400">
          No necesitas construir todos estos proyectos. Elige el que se parezca a un problema real, abre su ruta y avanza solo hasta el primer resultado que puedas revisar.
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          <span className="aula-chip" data-tone="green"><Icon name="check" /> Resultados verificables</span>
          <span className="aula-chip" data-tone="cyan"><Icon name="shield" /> Límites y revisión humana</span>
          <span className="aula-chip" data-tone="amber"><Icon name="route" /> Rutas, no demos aisladas</span>
        </div>
      </header>

      <section className="mt-12" aria-labelledby="start-project-title">
        <span className="aula-section-label"><Icon name="rocket" /> Empieza por aquí</span>
        <h2 id="start-project-title" className="mt-2 font-display text-3xl font-bold text-white">Primeros proyectos para obtener una victoria real</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">Son buenas puertas de entrada si quieres aprender sin instalar una infraestructura completa ni entregar el control de una tarea importante.</p>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="build-project-title">
        <span className="aula-section-label"><Icon name="network" /> Cuando ya tienes una base</span>
        <h2 id="build-project-title" className="mt-2 font-display text-3xl font-bold text-white">Proyectos para construir y operar con más rigor</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">Cada uno señala sus dependencias y riesgos dentro de la ruta. No los tomes como una promesa de autonomía: el objetivo es aprender a limitar, observar y recuperar el sistema.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.slice(3).map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]" aria-labelledby="project-method-title">
        <div className="aula-panel p-6 sm:p-8">
          <span className="aula-section-label"><Icon name="listCheck" /> Método de proyecto</span>
          <h2 id="project-method-title" className="mt-3 font-display text-2xl font-bold text-white">La evidencia vale más que terminar rápido</h2>
          <ol className="mt-6 grid gap-4 text-sm leading-relaxed text-zinc-300">
            <li><strong className="text-white">1. Define la salida.</strong> Escribe qué debe hacer, quién la usará y qué no hará todavía.</li>
            <li><strong className="text-white">2. Practica con datos seguros.</strong> Usa ejemplos públicos, ficticios o autorizados; no metas secretos para ir más rápido.</li>
            <li><strong className="text-white">3. Comprueba el resultado.</strong> Abre la web, ejecuta la prueba, contrasta la fuente o pide una segunda revisión.</li>
            <li><strong className="text-white">4. Guarda cómo volver atrás.</strong> Documenta decisiones, cambios y el siguiente paso antes de añadir autonomía.</li>
          </ol>
        </div>
        <aside className="aula-panel p-6 sm:p-8">
          <span className="aula-section-label"><Icon name="route" /> ¿Aún no sabes cuál elegir?</span>
          <h2 className="mt-3 font-display text-2xl font-bold text-white">Empieza por tu situación, no por el proyecto más llamativo</h2>
          <p className="mt-3 leading-relaxed text-zinc-400">El orientador te propone un solo primer curso. Después podrás volver aquí con una necesidad más concreta.</p>
          <Link href="/que-aprender-ia" className="aula-button aula-button-primary mt-6"><Icon name="rocket" /> Elegir mi primer paso</Link>
        </aside>
      </section>
    </div>
  );
}
