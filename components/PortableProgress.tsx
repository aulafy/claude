import Icon from "@/components/Icon";
import type { Curso } from "@/lib/cursos";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    title: "Progreso local, sin cuenta ni seguimiento personal",
    body: "Aulafy guarda en este navegador la última lección visitada, las completadas y tu lista para después. No pide correo, no crea un perfil y no envía este progreso al servidor.",
    hint: "Las respuestas temporales no se guardan. Puedes conservar una evidencia si pulsas explícitamente «Guardar en este dispositivo»; luego puedes exportarla o borrarla desde «Mi ruta».",
    license: "Contenido abierto: CC BY 4.0. Código: MIT.",
  },
  en: {
    title: "Local progress without accounts or personal tracking",
    body: "Aulafy saves your last visited lesson, completed lessons, and saved-for-later list in this browser. It does not request an email, create a profile, or send this progress to the server.",
    hint: "Temporary activity answers are not saved. Evidence is kept only when you explicitly choose “Save on this device”; export or delete it from “My path”.",
    license: "Open content: CC BY 4.0. Code: MIT.",
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
