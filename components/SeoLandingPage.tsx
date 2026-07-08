import Link from "next/link";
import Icon from "@/components/Icon";
import type { SeoLanding } from "@/lib/seo-landings";

type Props = {
  landing: SeoLanding;
};

export default function SeoLandingPage({ landing }: Props) {
  return (
    <div className="aula-shell max-w-5xl mx-auto px-6 py-14">
      <div className="mb-4 aula-meta">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/cursos" className="hover:text-zinc-400">Cursos</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{landing.title}</span>
      </div>

      <section className="aula-frame p-8 sm:p-10">
        <div className="aula-chip">
          <Icon name="calendar" />
          Actualizado: julio de 2026
        </div>
        <div className="aula-icon mt-5 text-orange-300 text-xl">
          <Icon name={landing.icon} />
        </div>
        <h1 className="mt-6 font-display font-extrabold text-3xl sm:text-5xl leading-tight text-white">
          {landing.h1}
        </h1>
        <p className="mt-5 lesson-lead max-w-3xl">
          {landing.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={landing.primaryHref}
            className="aula-button aula-button-primary text-sm"
          >
            <Icon name="book" />
            {landing.primaryLabel}
          </Link>
          <Link
            href="/cursos"
            className="aula-button aula-button-secondary text-sm"
          >
            <Icon name="grid" />
            Ver todos los cursos
          </Link>
        </div>
      </section>

      <section className="mt-6 aula-panel p-6 border-[#22d3ee]/25">
        <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <Icon name="quote" />
          Respuesta corta para citar
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          {landing.description} En Aulafy es gratuito, está en español y enlaza con lecciones prácticas
          para construir proyectos reales sin registro.
        </p>
      </section>

      <section className="grid md:grid-cols-[1fr_0.8fr] gap-8 mt-10">
        <div className="prose">
          <h2>Para quién es</h2>
          <p>{landing.audience}</p>
          <h2>Qué conseguirás</h2>
          <p>{landing.promise}</p>
          {landing.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <aside className="space-y-5">
          <div className="aula-panel p-6">
            <h2 className="font-display font-bold text-lg text-white">Ejemplos prácticos</h2>
            <ul className="mt-4 space-y-3">
              {landing.examples.map((example) => (
                <li key={example} className="flex gap-3 text-sm text-zinc-400">
                  <Icon name="check" className="mt-0.5 text-[#22d3ee]" />
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="aula-panel p-6">
            <h2 className="font-display font-bold text-lg text-white">Lecciones relacionadas</h2>
            <div className="mt-4 space-y-3">
              {landing.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="aula-capsule block p-4"
                >
                  <span className="text-sm font-semibold text-zinc-100">{item.title}</span>
                  <span className="mt-1 block text-xs text-zinc-500 leading-relaxed">{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-10">
        <h2 className="font-display font-bold text-2xl text-white mb-5">Preguntas frecuentes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {landing.faqs.map((faq) => (
            <div key={faq.q} className="aula-panel p-5">
              <h3 className="font-semibold text-zinc-100">{faq.q}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
