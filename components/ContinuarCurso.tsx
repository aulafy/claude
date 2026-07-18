import Link from "next/link";
import Icon from "@/components/Icon";
import { getCurso, lecciones } from "@/lib/cursos";
import type { Locale } from "@/lib/i18n";

export default function ContinuarCurso({ cursoSlug, locale = "es" }: { cursoSlug: string; locale?: Locale }) {
  const curso = getCurso(cursoSlug);
  if (!curso) return null;
  const first = lecciones(curso)[0].slug;
  const href = locale === "en"
    ? `/en/courses/${curso.slug}/${first}`
    : `/cursos/${curso.slug}/${first}`;
  const label = locale === "en" ? "Start course" : "Empezar el curso";

  return (
    <Link
      href={href}
      className="aula-button aula-button-primary"
    >
      <Icon name="rocket" />
      {label}
    </Link>
  );
}
