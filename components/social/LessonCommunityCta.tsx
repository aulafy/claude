import Link from "next/link";
import Icon from "@/components/Icon";
import { getSocialPilotUnit } from "@/lib/social/config";

export default function LessonCommunityCta({ courseSlug, lessonSlug }: { courseSlug: string; lessonSlug: string }) {
  const unit = getSocialPilotUnit(courseSlug, lessonSlug);
  if (!unit) return null;

  const href = `/comunidad/publicar?curso=${encodeURIComponent(courseSlug)}&leccion=${encodeURIComponent(lessonSlug)}`;
  return (
    <section className="max-w-4xl mx-auto px-6 pb-4" aria-labelledby="lesson-community-title">
      <div className="aula-frame p-5 sm:p-7">
        <div className="grid sm:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <span className="aula-section-label"><Icon name="users" /> Comunidad de esta lección</span>
            <h2 id="lesson-community-title" className="font-display text-2xl font-bold text-white mt-2">Convierte el resultado en una evidencia de aprendizaje</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{unit.prompt} Publicar requiere cuenta; estudiar la lección seguirá siendo gratuito y sin registro.</p>
          </div>
          <Link href={href} className="aula-button aula-button-primary whitespace-nowrap"><Icon name="upload" /> Publicar mi resultado</Link>
        </div>
      </div>
    </section>
  );
}
