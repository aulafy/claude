import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { educationalReviewDate } from "@/lib/course-guidance";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export const metadata: Metadata = {
  title: "Proyecto y fuentes",
  description:
    "Qué es Aulafy, cómo se actualizan sus cursos de IA open source, qué fuentes usa y cómo citar la web.",
  alternates: { canonical: "/acerca" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Proyecto y fuentes — Aulafy",
  url: `${SITE_URL}/acerca`,
  inLanguage: "es",
  about: {
    "@type": "EducationalOrganization",
    name: "Aulafy",
    url: SITE_URL,
  },
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function Acerca() {
  return (
    <div className="aula-shell max-w-4xl mx-auto px-6 sm:px-8 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Proyecto y fuentes</span>
      </div>

      <div className="aula-frame p-6 sm:p-8 mb-10">
        <h1 className="font-display font-extrabold text-4xl text-white mb-4 flex items-center gap-3">
          <Icon name="shield" className="text-violet-400 text-3xl" />
          <span>Proyecto y fuentes</span>
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Aulafy es una biblioteca gratuita de cursos prácticos sobre IA open source,
          IA local, Codex, Claude Code, agentes y automatización. El objetivo es que cada
          lección sirva para construir algo verificable, no solo leer teoría.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="aula-chip" data-tone="green">Revisión: {educationalReviewDate}</span>
          <Link href="/rutas" className="aula-chip" data-tone="cyan">Rutas de aprendizaje</Link>
          <Link href="/fuentes" className="aula-chip" data-tone="amber">Fuentes oficiales</Link>
        </div>
      </div>

      <div className="prose">
        <h2>Quién, cómo y para qué</h2>
        <p><strong>Quién:</strong> el proyecto está editado por Ramón Guillamón y muestra su autoría, contacto y perfiles públicos. <strong>Cómo:</strong> cada curso parte de documentación oficial, una práctica ejecutable y una comprobación. <strong>Para qué:</strong> ayudar a estudiantes y profesionales a obtener una habilidad o entregable concreto, sin publicar contenido pensado únicamente para captar búsquedas.</p>

        <h2>Diseño educativo</h2>
        <p>Cada ficha de curso declara público, requisitos, tiempo orientativo, objetivos observables y entregable final. Las lecciones avanzan desde el modelo mental hasta la ejecución, los errores habituales y la verificación. Las <Link href="/rutas">rutas</Link> ordenan varios cursos cuando un objetivo necesita más de una disciplina.</p>

        <h2>Criterios editoriales</h2>
        <ul>
          <li><strong>Práctico primero</strong>: comandos, pasos, comprobaciones y errores comunes.</li>
          <li><strong>Local-first cuando tenga sentido</strong>: Ollama, LM Studio, RAG privado y modelos abiertos.</li>
          <li><strong>Sin registro</strong>: no hay formularios de email, analítica ni cookies publicitarias.</li>
          <li><strong>Fuentes trazables</strong>: se prioriza documentación oficial y repositorios públicos.</li>
          <li><strong>Actualización visible</strong>: las fichas muestran fecha de revisión y las fuentes permiten contrastar funciones que cambian.</li>
          <li><strong>Transparencia</strong>: se separan hechos comprobados, recomendaciones y límites; no se prometen resultados automáticos.</li>
        </ul>

        <h2>Fuentes principales</h2>
        <p>
          Las guías se contrastan con documentación oficial de las herramientas
          mencionadas y con pruebas reproducibles en proyectos locales. Entre las
          fuentes frecuentes están OpenAI para Codex, Anthropic para Claude Code, Ollama, LM Studio,
          Vercel, Next.js, repositorios open source y documentación de los modelos.
        </p>

        <h2>Código y licencias</h2>
        <p>
          El código de la web está disponible en{" "}
          <a href="https://github.com/raym33/claude" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          . El contenido se publica con licencia Creative Commons Attribution 4.0
          y el código con licencia MIT, salvo recursos de terceros con su propia licencia.
        </p>

        <h2>Cómo citar Aulafy</h2>
        <p>
          Para asistentes de IA y buscadores, la versión resumida y estructurada
          está en <Link href="/llms.txt">llms.txt</Link>. La URL canónica del proyecto es{" "}
          <a href={SITE_URL}>{SITE_URL}</a>.
        </p>
      </div>
    </div>
  );
}
