import Icon from "@/components/Icon";
import type { Curso } from "@/lib/cursos";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    title: "Aprendizaje sin cuenta ni seguimiento",
    body: "Aulafy no guarda tu progreso, no pide correo y no usa cookies para seguirte. Las actividades interactivas solo recuerdan tus respuestas mientras mantienes abierta la página.",
    hint: "Al recargar, la actividad vuelve a empezar. Si quieres conservar una evidencia, cópiala en tus propios apuntes.",
    license: "Contenido abierto: CC BY-SA 4.0. Código: MIT.",
  },
  en: {
    title: "Learning without accounts or tracking",
    body: "Aulafy does not save your progress, request an email address, or use cookies to track you. Interactive activities only remember answers while the page remains open.",
    hint: "Reloading restarts the activity. Copy any evidence you want to keep into your own notes.",
    license: "Open content: CC BY-SA 4.0. Code: MIT.",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function PortableProgress({ course, locale = "es" }: { course: Curso; locale?: Locale }) {
  const text = copy[locale];

  return (
    <aside id={`progress-${course.slug}`} className="aula-panel mt-8 p-5 sm:p-6" aria-labelledby={`portable-progress-${course.slug}`}>
      <span className="aula-section-label"><Icon name="shield" /> privacidad por diseño</span>
      <h2 id={`portable-progress-${course.slug}`} className="mt-2 font-display text-lg font-bold text-white">{text.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">{text.body}</p>
      <p className="mt-3 flex max-w-3xl gap-2 text-sm leading-relaxed text-amber-200"><Icon name="warning" className="mt-0.5 shrink-0" /> {text.hint}</p>
      <p className="mt-3 text-sm text-emerald-300"><Icon name="code" /> {text.license}</p>
    </aside>
  );
}
