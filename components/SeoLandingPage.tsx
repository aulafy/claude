import Link from "next/link";
import Icon from "@/components/Icon";
import type { SeoLanding } from "@/lib/seo-landings";

type Props = {
  landing: SeoLanding;
};

export default function SeoLandingPage({ landing }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/cursos" className="hover:text-zinc-400">Cursos</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{landing.title}</span>
      </div>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 text-xl border border-orange-500/20">
          <Icon name={landing.icon} />
        </div>
        <h1 className="mt-6 font-display font-extrabold text-3xl sm:text-5xl leading-tight text-white">
          {landing.h1}
        </h1>
        <p className="mt-5 text-lg text-zinc-400 leading-relaxed max-w-3xl">
          {landing.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={landing.primaryHref}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <Icon name="book" />
            {landing.primaryLabel}
          </Link>
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 hover:border-zinc-500 transition-colors"
          >
            <Icon name="grid" />
            Ver todos los cursos
          </Link>
        </div>
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
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/35 p-6">
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

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/35 p-6">
            <h2 className="font-display font-bold text-lg text-white">Lecciones relacionadas</h2>
            <div className="mt-4 space-y-3">
              {landing.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 hover:border-zinc-600 transition-colors"
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
            <div key={faq.q} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
              <h3 className="font-semibold text-zinc-100">{faq.q}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
