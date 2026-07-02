import type { Metadata } from "next";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Política de cookies - Aulafy",
  description:
    "Política de cookies de Aulafy: sin analítica, sin publicidad, sin seguimiento y sin captación de email.",
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="cookie" className="mt-1 text-2xl text-orange-400 flex-none" />
        <h1 className="min-w-0 text-3xl sm:text-4xl font-bold leading-tight text-white">Política de cookies</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: 2 de julio de 2026</p>

      <div className="prose">
        <p>
          Aulafy no utiliza cookies propias de analítica, publicidad, remarketing,
          redes sociales ni seguimiento entre sitios. Tampoco recoge emails ni
          crea cuentas de usuario.
        </p>

        <h2>Por qué no ves un banner de cookies</h2>
        <p>
          No mostramos un banner de consentimiento porque la web no instala
          cookies no esenciales. El contenido se puede leer sin aceptar nada, sin
          registrarse y sin suscribirse.
        </p>

        <h2>Preferencia de modo claro u oscuro</h2>
        <p>
          Para recordar si prefieres el modo día o noche, Aulafy guarda en tu
          navegador una preferencia local llamada <code>aulafy-theme</code>. No es
          una cookie, no se envía al servidor y puedes eliminarla borrando los
          datos del sitio desde la configuración de tu navegador.
        </p>

        <h2>Servicios externos</h2>
        <p>
          Si haces clic en enlaces externos, como GitHub, Anthropic, X, LinkedIn
          u otras herramientas citadas en los cursos, esos servicios pueden usar
          sus propias cookies y políticas. Aulafy no controla esos sitios.
        </p>

        <h2>Cambios futuros</h2>
        <p>
          Si en el futuro Aulafy incorpora analítica, publicidad, formularios o
          cualquier cookie no esencial, esta política se actualizará y se pedirá
          consentimiento cuando sea obligatorio.
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
