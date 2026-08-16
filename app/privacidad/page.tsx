import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Política de privacidad - Aulafy",
  description:
    "Información sobre privacidad, orientación local y datos técnicos en Aulafy.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="userShield" className="mt-1 text-2xl text-violet-400 flex-none" />
        <h1 className="min-w-0 text-3xl sm:text-4xl font-bold leading-tight text-white">Política de privacidad</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: 16 de agosto de 2026</p>
      <div className="prose">
        <p>
          Aulafy es una web educativa que puedes leer sin registro y sin muro de
          pago. No vendemos datos, no creamos perfiles publicitarios y no usamos
          analítica de marketing ni seguimiento personal.
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

        <h2>Orientación de aprendizaje</h2>
        <p>
          Aulafy puede mostrar una guía visual o un orientador básico para elegir
          por dónde empezar. Esta orientación funciona en la propia página y no
          envía tus respuestas a un proveedor de IA. Aun así, no pegues claves de
          API, contraseñas, datos personales sensibles ni información confidencial
          en cuadros de texto educativos.
        </p>

        <h2>Progreso local y métricas agregadas</h2>
        <p>
          La última lección, la ruta que eliges, los pasos completados y unos contadores de acciones
          educativas se guardan únicamente en el almacenamiento local del navegador.
          Los contadores pueden registrar que se inició una misión, se utilizó el
          buscador o se avanzó de lección, pero no almacenan el texto buscado, prompts,
          respuestas, evidencias ni un identificador personal. Puedes borrarlos desde
          «Mi ruta».
        </p>
        <p>
          Desde «Mi ruta» puedes descargar ese progreso como un archivo JSON y
          restaurarlo en otro navegador. El archivo se genera y valida localmente:
          Aulafy no recibe su contenido. Incluye la última lección, la ruta elegida y los elementos
          completadas o guardadas para después, pero no respuestas, búsquedas,
          evidencias ni contadores de
          actividad. Tú decides dónde guardarlo y con quién compartirlo.
        </p>
        <p>
          También puedes elegir una fecha y una hora para descargar la ruta de siete
          días como calendario <code>.ics</code>. La agenda se calcula y genera en tu
          dispositivo: Aulafy no recibe la fecha ni la hora, no solicita acceso a tu
          calendario y no sabe si importas el archivo.
        </p>
        <p>
          Algunas prácticas permiten escribir una evidencia y guardarla voluntariamente
          en la libreta local. El texto permanece en este navegador, con un máximo de
          20 entradas y 2.000 caracteres por entrada. Solo forma parte de un archivo
          cuando tú mismo exportas el progreso; no se envía a las métricas ni a Aulafy.
          También puedes descargar voluntariamente la libreta como Markdown. Ambos
          archivos se crean en tu dispositivo. Evita incluir datos personales, secretos
          o información empresarial confidencial.
        </p>
        <p>
          Si la medición agregada está activada, el navegador puede enviar una vez al
          día el nombre de cada tipo de acción cerrada, por ejemplo{" "}
          <code>mission_complete</code>. La base de datos recibe únicamente el nombre
          del evento y suma un contador diario. No recibe un identificador de navegador,
          ruta, texto, cuenta, progreso individual ni la fecha guardada localmente. Esta
          medición sirve para comparar el embudo educativo, no para reconstruir sesiones
          o identificar retornos de una persona concreta.
        </p>
        <p>
          Entre esos nombres cerrados pueden figurar <code>route_selected</code> cuando
          guardas una recomendación y <code>external_source_open</code> cuando abres
          alguna fuente externa. El contador no contiene la ruta elegida, URL, dominio,
          texto del enlace ni destino visitado.
        </p>
        <p>
          El dispositivo también puede comparar la última visita guardada con la
          actual para distinguir un retorno tras 7 o 30 días. Solo se envía el nombre
          cerrado <code>return_7d</code> o <code>return_30d</code>; las fechas y el
          intervalo calculado permanecen en el navegador.
        </p>

        <h2>Datos técnicos y seguridad</h2>
        <p>
          Como cualquier web publicada en internet, el proveedor de alojamiento y
          las capas de seguridad pueden tratar datos técnicos mínimos de la
          petición, como dirección IP, fecha, hora, navegador o URL solicitada,
          para entregar la página, prevenir abusos y mantener la seguridad.
        </p>

        <h2>Cookies</h2>
        <p>
          Aulafy no usa cookies propias de analítica, publicidad ni seguimiento personal.
          El progreso del curso y la preferencia de modo claro u oscuro se guardan
          en el almacenamiento local del navegador, no en una cuenta.
          Puedes ver el detalle en la{" "}
          <Link href="/cookies">Política de cookies</Link>.
        </p>

        <h2>Conservación</h2>
        <p>
          Las métricas educativas agregadas, cuando están activadas, se conservan como
          conteos por día y nombre de evento, sin registros individuales. Aulafy no
          conserva con ellas una base de datos de usuarios. El proveedor de
          alojamiento puede mantener registros técnicos durante el tiempo necesario
          para operar y proteger el servicio.
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
