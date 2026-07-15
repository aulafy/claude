import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Política de privacidad - Aulafy",
  description:
    "Información sobre privacidad, cuentas opcionales, perfiles públicos, comunidad, chat y datos técnicos en Aulafy.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="userShield" className="mt-1 text-2xl text-violet-400 flex-none" />
        <h1 className="min-w-0 text-3xl sm:text-4xl font-bold leading-tight text-white">Política de privacidad</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: 14 de julio de 2026</p>
      <div className="prose">
        <p>
          Aulafy es una web educativa que puedes leer sin registro y sin muro de
          pago. La cuenta es opcional y solo se necesita para participar en Aulafy
          Comunidad: publicar proyectos, revisar trabajos y mantener un perfil de
          aprendizaje. No vendemos datos, no creamos perfiles publicitarios y no
          usamos analítica de marketing.
        </p>

        <h2>Responsable y contacto</h2>
        <p>
          Responsable editorial del sitio: Aulafy. Para consultas de privacidad,
          derechos o retirada de contenido, escribe a{" "}
          <a href="mailto:learntouseai@gmail.com">learntouseai@gmail.com</a>.
        </p>

        <h2>Cuenta y acceso</h2>
        <p>
          Si eliges crear una cuenta, tratamos el email y los identificadores
          técnicos necesarios para autenticarte. Puedes entrar mediante un enlace
          enviado por email o, si lo prefieres, mediante Google. La autenticación y
          la base de datos se prestan mediante Supabase. El email no se incluye en
          el perfil público.
        </p>

        <h2>Perfil y contenido público</h2>
        <p>
          El nombre visible, nombre de usuario, biografía, intereses, web y los
          proyectos o revisiones que publiques serán visibles públicamente. No
          introduzcas datos personales de terceros, claves, contraseñas, información
          confidencial ni datos que no quieras hacer públicos. Las denuncias y las
          decisiones internas de moderación no son públicas.
        </p>

        <h2>Finalidad y bases de tratamiento</h2>
        <p>
          Los datos de la cuenta y las publicaciones se utilizan para prestar la
          funcionalidad que solicitas y aplicar las condiciones de la comunidad. La
          prevención de abusos, seguridad y moderación se basan en el interés
          legítimo de mantener un servicio educativo seguro. Cuando una operación
          requiera consentimiento, podrás retirarlo sin afectar a los tratamientos
          realizados anteriormente.
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
          Solo se guardan las cookies estrictamente necesarias para mantener la
          sesión cuando decides entrar. El progreso del curso y la preferencia de
          modo claro u oscuro continúan en el almacenamiento local del navegador.
          Puedes ver el detalle en la{" "}
          <Link href="/cookies">Política de cookies</Link>.
        </p>

        <h2>Conservación</h2>
        <p>
          La cuenta, el perfil y sus publicaciones se conservan mientras mantengas
          la cuenta o hasta que solicites su eliminación. Algunas evidencias de
          seguridad y moderación podrán conservarse durante el tiempo necesario
          para gestionar reclamaciones, prevenir abusos o cumplir obligaciones
          legales. El chat no conserva conversaciones con finalidad comercial.
        </p>

        <h2>Derechos</h2>
        <p>
          Puedes editar los datos públicos desde tu perfil. También puedes solicitar
          acceso, rectificación, supresión, oposición, limitación o portabilidad,
          incluida la eliminación de la cuenta, escribiendo al email de contacto
          desde la dirección asociada. También puedes acudir a la autoridad de
          control competente.
        </p>

        <h2>Menores</h2>
        <p>
          La comunidad no está dirigida a menores de 14 años. Una persona menor de
          esa edad no debe crear una cuenta ni publicar datos sin la intervención y
          autorización de sus representantes legales.
        </p>

        <h2>Enlaces externos</h2>
        <p>
          La web utiliza o enlaza servicios de terceros como Supabase, Google,
          GitHub, Anthropic, X, LinkedIn y otras herramientas educativas. Cuando
          eliges utilizarlos se aplican también sus condiciones y políticas.
        </p>
      </div>
    </div>
  );
}
