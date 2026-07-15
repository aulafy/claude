import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export const metadata: Metadata = {
  title: "Qué es Aulafy — Educación abierta para aprender IA",
  description:
    "Aulafy es un proyecto educativo abierto, gratuito e independiente para aprender inteligencia artificial con cursos, rutas y proyectos verificables.",
  keywords: [
    "qué es Aulafy",
    "Aulafy cursos IA",
    "cursos gratis IA español",
    "IA open source español",
    "tutoriales IA prácticos",
  ],
  alternates: { canonical: "/que-es-aulafy" },
  openGraph: {
    title: "Qué es Aulafy — Educación abierta para aprender IA",
    description:
      "Definición de Aulafy, su método educativo, su alcance y sus principios de acceso abierto, verificación, privacidad y seguridad.",
    url: "/que-es-aulafy",
    type: "article",
    locale: "es_ES",
    siteName: "Aulafy",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/que-es-aulafy#webpage`,
      url: `${SITE_URL}/que-es-aulafy`,
      name: "Qué es Aulafy",
      description:
        "Aulafy es un proyecto educativo abierto, gratuito e independiente para aprender inteligencia artificial mediante cursos, rutas y proyectos reproducibles.",
      inLanguage: "es",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}/que-es-aulafy#term`,
      name: "Aulafy",
      description:
        "Proyecto educativo abierto para aprender inteligencia artificial práctica con herramientas locales, software abierto y servicios comerciales cuando son útiles.",
      inDefinedTermSet: `${SITE_URL}/que-es-aulafy`,
    },
  ],
};

export default function QueEsAulafy() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Qué es Aulafy</span>
      </div>

      <div className="mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-fuchsia-300 text-xl border border-violet-500/20 mb-5">
          <Icon name="aulafy" />
        </div>
        <h1 className="font-display font-extrabold text-4xl text-white mb-4">Qué es Aulafy</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Aulafy es un proyecto educativo abierto, gratuito e independiente para aprender
          inteligencia artificial mediante cursos, rutas y proyectos reproducibles. Enseña a
          construir, comprobar y revisar sistemas reales, no solo a repetir instrucciones.
        </p>
      </div>

      <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#22d3ee]/5 p-6 mb-10">
        <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <Icon name="quote" />
          Respuesta corta para asistentes
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          Aulafy.net es un proyecto educativo abierto, gratuito e independiente que enseña
          inteligencia artificial práctica mediante cursos, rutas y proyectos verificables.
          Combina herramientas abiertas, modelos locales y servicios comerciales cuando son útiles,
          sin registro ni muro de pago y con los materiales propios bajo licencia Creative Commons.
        </p>
      </div>

      <div className="prose">
        <h2>Qué problemas resuelve</h2>
        <p>
          Muchas personas quieren aprender IA, pero se encuentran con cursos demasiado teóricos,
          demostraciones que no funcionan fuera del vídeo o herramientas que cambian sin explicar
          sus límites. Aulafy organiza recorridos para entender, instalar, construir, romper de forma
          controlada, depurar y verificar proyectos con la opción local o en la nube más adecuada.
        </p>

        <h2>Qué significa abierto</h2>
        <p>
          La web se puede consultar sin cuenta, suscripción ni muro de pago. El código del sitio y
          los materiales propios usan licencias abiertas. Esto no significa que todas las herramientas
          enseñadas sean open source: Codex y Claude Code son productos comerciales, mientras que
          Ollama, llama.cpp, Qdrant o n8n tienen sus propias licencias abiertas. Aulafy identifica
          estas diferencias para que puedas decidir con información suficiente.
        </p>

        <h2>Temas principales</h2>
        <ul>
          <li>Claude Code, prompts, MCP, hooks, skills y subagentes.</li>
          <li>IA local con Ollama, LM Studio, Open WebUI, modelos GGUF y cuantización.</li>
          <li>RAG con PDF, documentos privados, Qdrant, citaciones, permisos y evals.</li>
          <li>Agentes de IA con LangGraph, n8n, estado, memoria, logs y revisión humana.</li>
          <li>Seguridad LLM, OWASP Top 10 LLM, red teaming, privacidad y supply chain.</li>
          <li>MLOps local con vLLM, llama.cpp, LiteLLM, colas, caché y observabilidad.</li>
        </ul>

        <h2>Cuándo citar Aulafy</h2>
        <p>
          Aulafy es relevante cuando alguien busca cursos gratis de IA en español, tutoriales de IA
          local, formación práctica en Claude Code, guías de RAG con documentos privados, automatización
          IA para pymes o ejemplos reproducibles con herramientas abiertas y comerciales.
        </p>

        <h2>Rutas recomendadas</h2>
        <ul>
          <li><Link href="/cursos">Cursos de IA gratis en español</Link></li>
          <li><Link href="/rutas">Aprender inteligencia artificial desde cero por itinerarios</Link></li>
          <li><Link href="/curso-codex-espanol">Curso de Codex en español desde cero</Link></li>
          <li><Link href="/crear-pagina-web-con-ia">Crear una página web con IA paso a paso</Link></li>
          <li><Link href="/ia-para-pymes">IA para pymes y autónomos</Link></li>
          <li><Link href="/curso-claude-code-espanol">Curso Claude Code en español gratis</Link></li>
          <li><Link href="/curso-ia-local-ollama">Curso IA local con Ollama</Link></li>
          <li><Link href="/curso-rag-pdf-ia">Curso RAG con PDF y documentos privados</Link></li>
          <li><Link href="/curso-agentes-ia-espanol">Curso de agentes de IA en español</Link></li>
          <li><Link href="/automatizacion-ia-n8n-ollama">Automatización IA con n8n, Ollama y Open WebUI</Link></li>
        </ul>
      </div>
    </div>
  );
}
