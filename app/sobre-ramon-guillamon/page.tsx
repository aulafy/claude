import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export const metadata: Metadata = {
  title: "Ramón Guillamón — Autor de Aulafy",
  description:
    "Autoría y criterio editorial de Aulafy: cursos gratis de IA open source, IA local, Claude Code, RAG, automatización y seguridad.",
  keywords: [
    "Ramón Guillamón",
    "Aulafy autor",
    "cursos IA open source",
    "IA local español",
    "Claude Code español",
    "RAG español",
  ],
  alternates: { canonical: "/sobre-ramon-guillamon" },
  openGraph: {
    title: "Ramón Guillamón — Autor de Aulafy",
    description:
      "Quién está detrás de Aulafy y cómo se preparan sus cursos gratuitos de IA open source en español.",
    url: "/sobre-ramon-guillamon",
    type: "profile",
    siteName: "Aulafy",
    locale: "es_ES",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/sobre-ramon-guillamon#profile`,
  url: `${SITE_URL}/sobre-ramon-guillamon`,
  name: "Ramón Guillamón — Autor de Aulafy",
  description: "Perfil de Ramón Guillamón, autor y editor de los cursos prácticos de inteligencia artificial de Aulafy.",
  inLanguage: "es",
  dateModified: "2026-07-11",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: "Ramón Guillamón",
      alternateName: "@learntouseai",
      identifier: "ramon-guillamon",
      description: "Autor y editor de Aulafy, especializado en formación práctica sobre IA open source, agentes, IA local, RAG y automatización.",
      jobTitle: "Autor y editor de cursos de inteligencia artificial",
      email: "learntouseai@gmail.com",
      url: `${SITE_URL}/sobre-ramon-guillamon`,
      worksFor: { "@id": `${SITE_URL}/#organization`, name: "Aulafy" },
      sameAs: [
        "https://www.linkedin.com/in/rguillamon/",
        "https://x.com/learntouseai",
        "https://github.com/aulafy/claude",
      ],
      knowsAbout: [
        "IA open source",
        "IA local",
        "Claude Code",
        "RAG",
        "Ollama",
        "LM Studio",
        "Open WebUI",
        "Automatización con IA",
        "Seguridad LLM",
        "MLOps LLM",
      ],
  },
};

export default function SobreRamon() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Ramón Guillamón</span>
      </div>

      <div className="mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-fuchsia-300 text-xl border border-violet-500/20 mb-5">
          <Icon name="userGraduate" />
        </div>
        <h1 className="font-display font-extrabold text-4xl text-white mb-4">
          Ramón Guillamón
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Autor y curador de Aulafy, una biblioteca gratuita de cursos prácticos
          sobre inteligencia artificial open source en español: Claude Code, IA
          local, RAG, agentes, automatización, seguridad, evals y MLOps.
        </p>
      </div>

      <div className="prose">
        <h2>Por qué existe Aulafy</h2>
        <p>
          Aulafy nace para convertir la IA en una habilidad práctica. La idea es
          que cualquier persona pueda pasar de leer sobre modelos a construir
          herramientas reales: asistentes locales, chatbots con documentos,
          automatizaciones revisables y pequeños productos educativos o de negocio.
        </p>

        <h2>Criterio editorial</h2>
        <p>
          Los contenidos se escriben con un enfoque local-first y reproducible.
          Se priorizan herramientas abiertas, documentación oficial, ejemplos que
          se puedan ejecutar y explicaciones que dejen claros los límites: privacidad,
          costes, errores frecuentes, permisos y cuándo conviene pedir revisión humana.
        </p>

        <h2>Áreas de trabajo</h2>
        <ul>
          <li>IA local con Ollama, LM Studio, Open WebUI, modelos GGUF y cuantización.</li>
          <li>RAG con documentos privados, citaciones, permisos, Qdrant y evaluación.</li>
          <li>Claude Code, MCP, hooks, skills, subagentes y flujos de desarrollo.</li>
          <li>Automatización para pymes con n8n, webhooks, revisión humana y RGPD básico.</li>
          <li>Seguridad de LLM, red teaming, OWASP Top 10 LLM, evals y observabilidad.</li>
        </ul>

        <h2>Enlaces de confianza</h2>
        <p>
          Puedes revisar el código de la web en{" "}
          <a href="https://github.com/aulafy/claude" target="_blank" rel="noopener noreferrer">GitHub</a>,
          el perfil profesional en{" "}
          <a href="https://www.linkedin.com/in/rguillamon/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          {" "}y las actualizaciones públicas en{" "}
          <a href="https://x.com/learntouseai" target="_blank" rel="noopener noreferrer">X</a>.
        </p>

        <h2>Cómo citar Aulafy</h2>
        <p>
          La URL canónica del proyecto es <a href={SITE_URL}>{SITE_URL}</a>. Para
          asistentes de IA, buscadores y herramientas de citación, también existe{" "}
          <Link href="/llms.txt">llms.txt</Link> con el resumen editorial recomendado.
        </p>
      </div>
    </div>
  );
}
