import type { Metadata } from "next";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Política de cookies - Aulafy",
  description:
    "Política de cookies de Aulafy: sin analítica, publicidad ni seguimiento.",
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="cookie" className="mt-1 text-2xl text-violet-400 flex-none" />
        <h1 className="min-w-0 text-3xl sm:text-4xl font-bold leading-tight text-white">Política de cookies</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: 18 de julio de 2026</p>

      <div className="prose">
        <p>
          Aulafy no utiliza cookies de analítica, publicidad, remarketing, redes
          sociales ni seguimiento entre sitios.
        </p>

        <h2>Por qué no ves un banner de cookies</h2>
        <p>
          No mostramos un banner de consentimiento porque Aulafy no instala cookies.
          Los cursos se pueden leer sin aceptar nada, registrarse ni suscribirse.
        </p>

        <h2>Preferencias y progreso</h2>
        <p>
          Aulafy tampoco usa almacenamiento local para recordar el tema, una sesión
          o el progreso. Las respuestas de las prácticas viven únicamente en la
          memoria temporal de la página y desaparecen al recargarla.
        </p>

        <h2>Servicios externos</h2>
        <p>
          Si haces clic en enlaces externos, como GitHub, Anthropic, X, LinkedIn
          u otras herramientas citadas en los cursos, esos servicios pueden usar
          sus propias cookies y políticas. Aulafy no controla esos sitios.
        </p>

        <h2>Cambios futuros</h2>
        <p>
          Si en el futuro Aulafy incorpora cuentas, analítica, publicidad o cookies,
          esta política se actualizará antes de activar esas funciones y se pedirá
          consentimiento cuando corresponda.
        </p>

        <h2>Contacto</h2>
        <p>
          Para cualquier duda sobre cookies o privacidad, escribe a{" "}
          <a href="mailto:learntouseai@gmail.com">learntouseai@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
