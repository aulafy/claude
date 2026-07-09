import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Política de privacidad - Aulafy",
  description:
    "Información sobre privacidad, ausencia de captación comercial de datos, uso del chat opcional y datos técnicos en Aulafy.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="userShield" className="mt-1 text-2xl text-violet-400 flex-none" />
        <h1 className="min-w-0 text-3xl sm:text-4xl font-bold leading-tight text-white">Política de privacidad</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: 2 de julio de 2026</p>
      <div className="prose">
        <p>
          Aulafy es una web educativa que puedes leer sin registro, sin cuenta de
          usuario, sin muro de pago, sin newsletter y sin formularios de captación
          comercial. No vendemos datos, no hacemos perfiles publicitarios y no
          usamos analítica de marketing.
        </p>

        <h2>Responsable y contacto</h2>
        <p>
          Responsable editorial del sitio: Aulafy. Para consultas de privacidad,
          derechos o retirada de contenido, escribe a{" "}
          <a href="mailto:contacto@aulafy.net">contacto@aulafy.net</a>.
        </p>

        <h2>Datos que no recogemos</h2>
        <p>
          No recogemos emails mediante formularios, no creamos cuentas, no
          almacenamos perfiles de alumnos, no insertamos píxeles publicitarios y
          no instalamos cookies de analítica, publicidad o redes sociales.
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
          Solo se guarda en tu navegador la preferencia de modo claro u oscuro
          mediante almacenamiento local. Puedes ver el detalle en la{" "}
          <Link href="/cookies">Política de cookies</Link>.
        </p>

        <h2>Base jurídica y conservación</h2>
        <p>
          El tratamiento técnico necesario para servir la web y protegerla se
          basa en el interés legítimo de mantener un servicio seguro y accesible.
          El uso del chat se basa en tu solicitud expresa al enviar una pregunta.
          Aulafy no mantiene una base de datos de usuarios ni conserva
          conversaciones con finalidad comercial.
        </p>

        <h2>Derechos</h2>
        <p>
          Si consideras que Aulafy trata algún dato personal tuyo, puedes solicitar
          acceso, rectificación, supresión, oposición, limitación o portabilidad
          escribiendo al email de contacto. También puedes acudir a la autoridad de
          control competente si lo necesitas.
        </p>

        <h2>Enlaces externos</h2>
        <p>
          La web enlaza a servicios de terceros como GitHub, Anthropic, X,
          LinkedIn u otras herramientas educativas. Al salir de Aulafy se aplican
          las políticas de privacidad de esos servicios.
        </p>
      </div>
    </div>
  );
}
