import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { getLocalizedCursos } from "@/lib/i18n";
import { getLearningPaths } from "@/lib/learning-paths";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export const metadata: Metadata = {
  title: "Empieza con IA: elige tu primer paso",
  description:
    "Empieza a aprender inteligencia artificial con un primer paso según tu objetivo: estudiar, trabajar, crear una web, programar o construir sistemas de IA.",
  alternates: { canonical: "/que-aprender-ia" },
  openGraph: {
    title: "Empieza con IA: elige tu primer paso | Aulafy",
    description: "Una guía clara para elegir una ruta de IA sin perderte entre herramientas, cursos y tendencias.",
    url: "/que-aprender-ia",
    type: "website",
  },
};

type StartingPoint = {
  pathSlug: string;
  title: string;
  audience: string;
  description: string;
  firstStep: string;
  href: string;
  routeHref: string;
  routeLabel: string;
  icon: IconName;
};

type StartingPointDefinition = Omit<StartingPoint, "firstStep" | "href" | "routeHref">;

const startingPointDefinitions: StartingPointDefinition[] = [
  {
    pathSlug: "desde-cero",
    title: "Quiero empezar desde cero",
    audience: "No programas, tienes curiosidad o aún no sabes qué aplicación te conviene.",
    description: "Aprende a pedir, revisar y comprobar resultados antes de perseguir herramientas o automatizaciones.",
    routeLabel: "Ruta desde cero",
    icon: "rocket",
  },
  {
    pathSlug: "negocio-creativo",
    title: "Quiero estudiar o trabajar mejor",
    audience: "Estudias, enseñas, trabajas con documentos o llevas una pequeña empresa.",
    description: "Empieza por una tarea de bajo riesgo y aprende a proteger datos, revisar respuestas y medir si realmente ahorras tiempo.",
    routeLabel: "Ruta para trabajo y negocio",
    icon: "briefcase",
  },
  {
    pathSlug: "web-saas",
    title: "Quiero crear una web o una demo",
    audience: "Tienes una idea, un servicio o un proyecto y quieres verlo funcionar en el navegador.",
    description: "Convierte una necesidad en un briefing, construye un prototipo local y aprende qué cambia cuando publicas una web para otras personas.",
    routeLabel: "Ruta para webs y SaaS",
    icon: "landing",
  },
  {
    pathSlug: "programacion",
    title: "Quiero programar con agentes de IA",
    audience: "Ya programas, mantienes un repositorio o quieres aprender un flujo técnico fiable.",
    description: "Trabaja con un proceso sencillo: entender el código, acotar el cambio, ejecutar pruebas y revisar lo que hace el agente.",
    routeLabel: "Ruta de programación",
    icon: "laptopCode",
  },
  {
    pathSlug: "sistemas",
    title: "Quiero construir sistemas de IA",
    audience: "Eres perfil técnico y necesitas RAG, agentes, evaluación, observabilidad o despliegue.",
    description: "No empieces por un agente con permisos totales: aprende primero la base reproducible que permite medir, limitar y recuperar un sistema.",
    routeLabel: "Ruta de sistemas de IA",
    icon: "network",
  },
];

const faqs = [
  {
    q: "¿Qué debo aprender primero para usar IA?",
    a: "Elige una tarea pequeña y comprobable, aprende a dar contexto, revisar la respuesta y proteger los datos que no debes compartir. Después escoge una especialización según el resultado que quieras construir.",
  },
  {
    q: "¿Puedo aprender inteligencia artificial sin programar?",
    a: "Sí. Puedes empezar por estudio, escritura, análisis, organización o trabajo administrativo. Para crear productos, automatizaciones o sistemas, añadirás la parte técnica cuando tu objetivo la necesite.",
  },
  {
    q: "¿Qué ruta de IA debo seguir si quiero crear una web?",
    a: "Empieza con un entorno de práctica seguro y continúa con la ruta de webs y demos SaaS. El primer objetivo es crear y comprobar una web local; publicar con usuarios, pagos o datos requiere más seguridad y mantenimiento.",
  },
  {
    q: "¿Debo aprender prompts antes que herramientas?",
    a: "No como una disciplina aislada. Aprende a formular un encargo claro mientras resuelves una tarea real: contexto, objetivo, formato, límites y una forma de revisar el resultado.",
  },
];

export default function QueAprenderIaPage() {
  const paths = getLearningPaths("es");
  const courses = getLocalizedCursos("es");
  const startingPoints: StartingPoint[] = startingPointDefinitions.flatMap((definition) => {
    const path = paths.find((item) => item.slug === definition.pathSlug);
    const firstCourse = path && courses.find((course) => course.slug === path.courses[0]);
    if (!path || !firstCourse) return [];

    return [{
      ...definition,
      firstStep: path.firstStep,
      href: `/cursos/${firstCourse.slug}`,
      routeHref: `/rutas?ruta=${path.slug}#${path.slug}`,
    }];
  });
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Empieza con IA", item: `${SITE_URL}/que-aprender-ia` },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <main className="aula-shell max-w-6xl mx-auto px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mb-4 aula-meta">
        <Link href="/" className="hover:text-zinc-300">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Empieza con IA</span>
      </div>

      <header className="aula-frame p-7 sm:p-10">
        <span className="aula-section-label"><Icon name="route" /> Empieza aquí</span>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">Aprende IA empezando por un resultado que te importe</h1>
        <p className="lesson-lead mt-5 max-w-3xl">No necesitas entender todas las herramientas ni elegir una profesión hoy. Elige una situación que se parezca a la tuya, consigue un primer resultado y abre la siguiente parte de la ruta solo cuando la necesites.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#elige-objetivo" className="aula-button aula-button-primary"><Icon name="rocket" /> Elegir mi punto de partida</a>
          <Link href="/rutas#orientador" className="aula-button aula-button-secondary"><Icon name="route" /> Prefiero responder tres preguntas</Link>
        </div>
      </header>

      <section className="mt-12" aria-labelledby="elige-objetivo">
        <span className="aula-section-label"><Icon name="listCheck" /> Un objetivo, un primer paso</span>
        <h2 id="elige-objetivo" className="mt-2 font-display text-3xl font-bold text-white">Elige la situación más parecida a la tuya</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">No son niveles de prestigio. Son puntos de entrada: puedes cambiar de ruta más adelante y no tienes que terminar un catálogo completo para construir algo útil.</p>
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {startingPoints.map((point) => (
            <article id={`ruta-${point.pathSlug}`} key={point.title} className="aula-panel flex flex-col p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="aula-icon text-xl text-cyan-300"><Icon name={point.icon} /></span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{point.audience}</p>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-zinc-300">{point.description}</p>
              <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-950/45 p-4">
                <span className="aula-meta text-zinc-500">Empieza por</span>
                <strong className="mt-1 block text-sm text-zinc-100">{point.firstStep}</strong>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={point.href} className="aula-button aula-button-primary"><Icon name="rocket" /> Abrir el primer curso</Link>
                <Link href={point.routeHref} className="aula-button aula-button-secondary"><Icon name="route" /> {point.routeLabel}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 aula-frame p-6 sm:p-8" aria-labelledby="metodo-title">
        <span className="aula-section-label"><Icon name="check" /> Método Aulafy</span>
        <h2 id="metodo-title" className="mt-2 font-display text-3xl font-bold text-white">Aprende sin acumular cursos</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {[
            ["1", "Elige una tarea", "Una tarea pequeña, reversible y visible vale más que probar diez herramientas sin una meta."],
            ["2", "Construye y comprueba", "Abre el resultado, contrástalo con fuentes o ejecuta la prueba. La IA propone; tú validas."],
            ["3", "Avanza solo si hace falta", "Añade código, automatización, datos o despliegue cuando tu primer proyecto lo justifique."],
          ].map(([number, title, description]) => (
            <div key={number} className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-5">
              <span className="font-[family-name:var(--font-code)] text-sm text-cyan-300">{number}</span>
              <h3 className="mt-3 font-display text-xl font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]" aria-labelledby="before-title">
        <div>
          <span className="aula-section-label"><Icon name="shield" /> Antes de automatizar</span>
          <h2 id="before-title" className="mt-2 font-display text-3xl font-bold text-white">Una ruta útil también explica dónde frenar</h2>
          <ul className="mt-5 space-y-3 leading-relaxed text-zinc-400">
            <li><strong className="text-zinc-200">Datos:</strong> no subas secretos, información personal o documentos confidenciales para hacer una prueba rápida.</li>
            <li><strong className="text-zinc-200">Personas:</strong> no publiques, envíes ni decidas por otra persona sin revisar el resultado y el contexto.</li>
            <li><strong className="text-zinc-200">Coste:</strong> una prueba gratis puede tener límites; una API, un modelo local o un servidor añaden costes de uso, mantenimiento y seguridad.</li>
          </ul>
        </div>
        <aside className="aula-panel p-6">
          <span className="aula-section-label"><Icon name="book" /> Lectura recomendada</span>
          <h2 className="mt-3 font-display text-2xl font-bold text-white">¿Aún no tienes una tarea en mente?</h2>
          <p className="mt-3 leading-relaxed text-zinc-400">Empieza por una guía práctica para elegir una tarea, una herramienta y un plan de 30 días sin depender de modas.</p>
          <Link href="/blog/como-empezar-usar-ia-2026" className="aula-button aula-button-secondary mt-6"><Icon name="book" /> Leer la guía para empezar</Link>
        </aside>
      </section>

      <section className="mt-14 max-w-4xl" aria-labelledby="faq-title">
        <span className="aula-section-label"><Icon name="circleQuestion" /> Dudas frecuentes</span>
        <h2 id="faq-title" className="mt-2 font-display text-3xl font-bold text-white">Preguntas antes de elegir</h2>
        <div className="mt-6 grid gap-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="aula-disclosure aula-panel">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display font-semibold text-white">
                {faq.q}<Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" />
              </summary>
              <p className="border-t border-zinc-800 px-5 py-4 leading-relaxed text-zinc-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
