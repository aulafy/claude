import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Normas de Aulafy Comunidad",
  description: "Normas de publicación, revisión y moderación del piloto de aprendizaje social de Aulafy.",
  alternates: { canonical: "/comunidad/normas" },
};

export default function NormasComunidad() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-14">
      <span className="aula-section-label"><Icon name="shield" /> Comunidad segura y educativa</span>
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-4">Normas de Aulafy Comunidad</h1>
      <p className="text-sm text-zinc-500 mt-3 mb-8">Versión del piloto · 14 de julio de 2026</p>

      <div className="prose">
        <p>La comunidad existe para aprender inteligencia artificial construyendo proyectos, explicando decisiones y ofreciendo revisiones útiles. No es un espacio para conseguir seguidores, promocionar enlaces sin contexto o competir por popularidad.</p>

        <h2>Qué puedes publicar</h2>
        <ul>
          <li>Resultados propios vinculados a una lección habilitada.</li>
          <li>Explicaciones reproducibles sobre qué construiste, qué aprendiste y qué mejorarías.</li>
          <li>Repositorios y demostraciones que puedas compartir legítimamente.</li>
        </ul>

        <h2>Qué no debes publicar</h2>
        <ul>
          <li>Claves de API, contraseñas, datos personales o información confidencial.</li>
          <li>Código malicioso, técnicas destinadas a dañar a terceros o enlaces engañosos.</li>
          <li>Contenido ajeno presentado como propio, spam, acoso, discriminación o material ilegal.</li>
          <li>Datos, imágenes o trabajos de otras personas sin permiso suficiente.</li>
        </ul>

        <h2>Cómo revisar un proyecto</h2>
        <p>Evalúa el trabajo, no a la persona. Indica si has probado el resultado, explica qué está bien y propone una mejora concreta. Una revisión no es una certificación profesional ni garantiza que el código sea seguro.</p>

        <h2>Moderación y denuncias</h2>
        <p>Cualquier miembro identificado puede denunciar un proyecto, una revisión o un perfil. Aulafy podrá ocultar contenido mientras se revisa, restaurarlo, retirarlo o desestimar la denuncia. La decisión y su motivo quedan registrados. Para cuestiones urgentes de privacidad o contenido ilegal puedes escribir a <a href="mailto:learntouseai@gmail.com">learntouseai@gmail.com</a>.</p>

        <h2>Autoría y permiso de publicación</h2>
        <p>Conservas los derechos sobre el contenido que publicas. Al publicarlo concedes a Aulafy un permiso no exclusivo para alojarlo, mostrarlo y reproducirlo dentro de la plataforma hasta que lo retires o solicites su eliminación. Este permiso no cambia la licencia de tu repositorio o de materiales de terceros.</p>

        <h2>Menores</h2>
        <p>La comunidad no está dirigida a menores de 14 años. Una persona menor de esa edad no debe crear una cuenta ni publicar datos sin la intervención y autorización de sus representantes legales.</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3"><Link href="/comunidad" className="aula-button aula-button-primary"><Icon name="users" /> Volver a la comunidad</Link><Link href="/privacidad" className="aula-button aula-button-secondary">Privacidad</Link></div>
    </div>
  );
}
