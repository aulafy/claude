import Link from "next/link";
import Icon from "@/components/Icon";
import type { Locale } from "@/lib/i18n";
import { isSocialEnabled } from "@/lib/social/config";

const communityPracticeLinks = isSocialEnabled() ? [["/comunidad", "Comunidad"]] : [];
const communityLegalLinks = isSocialEnabled()
  ? [["/comunidad/normas", "Normas de comunidad"]]
  : [];

const footerContent = {
  es: {
    columns: [
      { title: "Empezar", links: [["/cursos", "Cursos de IA gratis"], ["/rutas", "Aprender IA por rutas"], ["/curso-codex-espanol", "Codex desde cero"], ["/crear-pagina-web-con-ia", "Crear una web con IA"]] },
      { title: "Práctica", links: [...communityPracticeLinks, ["/blog", "Blog de IA"], ["/recetas", "Recetas prácticas"], ["/prompts", "Buenos prompts"], ["/glosario", "Glosario"]] },
      { title: "Potenciar", links: [["/skills", "Skills"], ["/subagentes", "Subagentes"], ["/plugins", "Plugins"]] },
      { title: "Ayuda", links: [["/faq", "Preguntas frecuentes"], ["/problemas", "Solución de problemas"], ["/comandos", "Comandos"]] },
      { title: "Legal", links: [["/que-es-aulafy", "Qué es Aulafy"], ["/acerca", "Proyecto y fuentes"], ["/fuentes", "Fuentes oficiales"], ["/sobre-ramon-guillamon", "Autoría"], ...communityLegalLinks, ["/aviso-legal", "Aviso legal"], ["/licencia", "Licencia"], ["/privacidad", "Privacidad"]] },
    ],
    tagline: "Aulafy · Educación abierta para aprender IA",
    note: "Formación educativa no oficial. Las marcas y herramientas citadas pertenecen a sus titulares. Verifica siempre las funciones con la documentación oficial enlazada en fuentes.",
    emailLabel: "Enviar un email",
    sourceLabel: "Código fuente en GitHub",
  },
  en: {
    columns: [
      { title: "Start", links: [["/en/paths", "Learning paths"], ["/en/courses", "Courses"], ["/en/courses/codex-programadores", "Codex for programmers"]] },
      { title: "Practice", links: [["/blog", "Spanish AI blog"], ["/en/courses/agentes-automatizacion", "Agents"], ["/en/courses/rag-seguro", "Secure RAG"]] },
      { title: "Build", links: [["/en/courses/agentes-produccion", "Production agents"], ["/en/courses/automatizacion-self-hosted", "Self-hosted AI"], ["/en/courses/mlops-local", "Local MLOps"]] },
      { title: "Project", links: [["/fuentes", "Official sources (Spanish)"], ["/sobre-ramon-guillamon", "Author (Spanish)"], ["/acerca", "About (Spanish)"]] },
      { title: "Legal", links: [["/que-es-aulafy", "What is Aulafy (Spanish)"], ["/aviso-legal", "Legal notice (Spanish)"], ["/licencia", "License (Spanish)"], ["/privacidad", "Privacy (Spanish)"]] },
    ],
    tagline: "Aulafy · Open education for practical AI",
    note: "Unofficial educational training. All brands and tools belong to their owners. Always verify features with the official documentation linked in sources.",
    emailLabel: "Send an email",
    sourceLabel: "Source code on GitHub",
  },
} satisfies Record<Locale, {
  columns: Array<{ title: string; links: string[][] }>;
  tagline: string;
  note: string;
  emailLabel: string;
  sourceLabel: string;
}>;

export default function Footer({ locale = "es" }: { locale?: Locale }) {
  const content = footerContent[locale];

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/62 mt-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-10">
          {content.columns.map((col) => (
            <div key={col.title}>
              <p className="aula-section-label mb-3">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-400 hover:text-fuchsia-300 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg border border-violet-500/25 bg-violet-500/10 flex items-center justify-center text-fuchsia-300 text-xs">
              <Icon name="aulafy" />
            </div>
            <span className="aula-meta">
              {content.tagline}
            </span>
          </div>

          {/* Redes del autor */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:learntouseai@gmail.com"
              aria-label={content.emailLabel}
              className="text-zinc-500 hover:text-fuchsia-300 transition-colors"
            >
              <Icon name="email" className="text-lg" />
            </a>
            <a
              href="https://x.com/learntouseai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-zinc-500 hover:text-fuchsia-300 transition-colors"
            >
              <Icon name="xTwitter" family="brands" className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/rguillamon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-500 hover:text-fuchsia-300 transition-colors"
            >
              <Icon name="linkedin" family="brands" className="text-lg" />
            </a>
            <a
              href="https://github.com/aulafy/claude"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.sourceLabel}
              className="text-zinc-500 hover:text-fuchsia-300 transition-colors"
            >
              <Icon name="code" className="text-lg" />
            </a>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed">
            {content.note}
          </p>
        </div>
      </div>
    </footer>
  );
}
