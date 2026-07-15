import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/social/AuthForm";
import Icon from "@/components/Icon";
import { signInWithGoogle } from "@/app/acceso/actions";
import { isGoogleAuthEnabled, isSocialPreviewMode, isSupabaseConfigured } from "@/lib/social/config";
import { getCurrentMember } from "@/lib/social/queries";
import { safeInternalPath } from "@/lib/social/urls";

export const metadata: Metadata = {
  title: "Acceso a Aulafy Comunidad",
  description: "Entra para publicar proyectos y revisar evidencias de aprendizaje en Aulafy.",
  robots: { index: false, follow: false },
};

export default async function Acceso({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const params = await searchParams;
  const next = safeInternalPath(params.next);
  const member = await getCurrentMember();
  if (member && !isSocialPreviewMode()) redirect(next);

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-8 items-start">
        <section>
          <span className="aula-section-label"><Icon name="userGraduate" /> Identidad opcional</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-4">Entra para compartir lo que has construido</h1>
          <p className="lesson-lead mt-5">Los cursos siguen abiertos y sin registro. La cuenta solo sirve para publicar evidencias, recibir revisiones y mantener un perfil de aprendizaje.</p>
          <div className="mt-7 grid gap-3">
            {[
              "Tu email no aparece en el perfil público.",
              "No hay publicidad ni venta de datos.",
              "Puedes denunciar contenido y solicitar la eliminación de tu cuenta.",
            ].map((item) => <div key={item} className="aula-panel p-4 text-sm text-zinc-300"><Icon name="check" className="text-emerald-400 mr-2" />{item}</div>)}
          </div>
        </section>

        <section className="aula-frame p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-white">Acceso sin contraseña</h2>
          <p className="mt-2 mb-6 text-sm text-zinc-400">Recibirás un enlace de un solo uso en tu correo.</p>
          {!isSupabaseConfigured() && (
            <div className="mb-5 rounded-lg border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              Vista técnica preparada. Falta conectar las variables de Supabase para activar los envíos.
            </div>
          )}
          {params.error && <div className="mb-5 rounded-lg border border-rose-500/35 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">No se pudo completar el acceso. Inténtalo de nuevo.</div>}
          <AuthForm next={next} />
          {isGoogleAuthEnabled() && (
            <>
              <div className="my-5 flex items-center gap-3 text-xs text-zinc-600"><span className="h-px flex-1 bg-zinc-800" /><span>o</span><span className="h-px flex-1 bg-zinc-800" /></div>
              <form action={signInWithGoogle}>
                <input type="hidden" name="next" value={next} />
                <button className="aula-button aula-button-secondary w-full" type="submit"><Icon name="globe" /> Continuar con Google</button>
              </form>
            </>
          )}
          <p className="mt-6 text-xs leading-relaxed text-zinc-500">Al entrar aceptas las <Link href="/comunidad/normas" className="underline hover:text-zinc-300">normas de la comunidad</Link> y la <Link href="/privacidad" className="underline hover:text-zinc-300">política de privacidad</Link>.</p>
        </section>
      </div>
    </div>
  );
}
