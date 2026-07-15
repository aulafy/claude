import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Política de privacidad - Aulafy",
  description:
    "Información sobre privacidad, chat opcional y datos técnicos en Aulafy.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="userShield" className="mt-1 text-2xl text-violet-400 flex-none" />
        <h1 className="min-w-0 text-3xl sm:text-4xl font-bold leading-tight text-white">Política de privacidad</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: 15 de julio de 2026</p>
      <div className="prose">
        <p>
          Aulafy es una web educativa que puedes leer sin registro y sin muro de
          pago. No vendemos datos, no creamos perfiles publicitarios y no usamos
          analítica de marketing.
        </p>

        <h2>Responsable y contacto</h2>
        <p>
          Responsable editorial del sitio: Aulafy. Para consultas de privacidad,
          derechos o retirada de contenido, escribe a{" "}
          <a href="mailto:learntouseai@gmail.com">learntouseai@gmail.com</a>.
        </p>

        <h2>Datos que no recogemos</h2>
        <p>
          Aulafy no ofrece cuentas de usuario, formularios de registro, newsletter
          ni pagos. El progreso de los cursos y la preferencia visual se guardan
          únicamente en el navegador y no identifican a la persona en el servidor.
        </p>

        <h2>Chat de ayuda</h2>
        <p>
          Algunas páginas pueden incluir un asistente de IA opcional. Si lo usas,
          tu pregunta y los últimos turnos de la conversación se envían al
          proveedor de IA configurado en el servidor solo para generar la
          respuesta. No introduzcas claves de API, contraseñas, datos personales
          sensibles ni información confidencial.
        </p>

        <h2>Datos técnicos y seguridad</h2>
        <p>
          Como cualquier web publicada en internet, el proveedor de alojamiento y
          las capas de seguridad pueden tratar datos técnicos mínimos de la
          petición, como dirección IP, fecha, hora, navegador o URL solicitada,
          para entregar la página, prevenir abusos y mantener la seguridad. Si el
          sistema antiabuso del chat está activo, puede usar un identificador
          derivado de la IP durante ventanas cortas de limitación de uso.
        </p>

        <h2>Cookies</h2>
        <p>
          Aulafy no usa cookies propias de analítica, publicidad ni seguimiento.
          El progreso del curso y la preferencia de modo claro u oscuro se guardan
          en el almacenamiento local del navegador, no en una cuenta.
          Puedes ver el detalle en la{" "}
          <Link href="/cookies">Política de cookies</Link>.
        </p>

        <h2>Conservación</h2>
        <p>
          Aulafy no conserva una base de datos de usuarios. El proveedor de
          alojamiento puede mantener registros técnicos durante el tiempo necesario
          para operar y proteger el servicio. El chat no conserva conversaciones
          con finalidad comercial.
        </p>

        <h2>Derechos</h2>
        <p>
          Puedes solicitar información, acceso, rectificación, supresión, oposición,
          limitación o portabilidad sobre cualquier dato personal que pudiera haber
          sido tratado escribiendo al email de contacto. También puedes acudir a la
          autoridad de control competente.
        </p>

        <h2>Enlaces externos</h2>
        <p>
          La web utiliza o enlaza servicios de terceros como GitHub, Anthropic, X,
          LinkedIn y otras herramientas educativas. Cuando
          eliges utilizarlos se aplican también sus condiciones y políticas.
        </p>
      </div>
    </div>
  );
}
