import type { Metadata } from "next";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Política de cookies - Aulafy",
  description:
    "Política de cookies de Aulafy: sin cookies de analítica, publicidad ni seguimiento personal.",
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="cookie" className="mt-1 text-2xl text-violet-400 flex-none" />
        <h1 className="min-w-0 text-3xl sm:text-4xl font-bold leading-tight text-white">Política de cookies</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: 16 de agosto de 2026</p>

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
          Aulafy usa el almacenamiento local del navegador, no cookies, para recordar
          el tema visual, la última lección, las misiones marcadas como completadas y
          contadores básicos de actividad educativa y qué tipos de contador agregado ya
          se enviaron durante el día. Esta información permanece en tu dispositivo y
          puedes borrarla desde «Mi ruta».
        </p>

        <h2>Métricas agregadas sin cookies</h2>
        <p>
          Aulafy puede sumar contadores diarios de acciones educativas cuando esta
          función está activada. La petición contiene solo un nombre predefinido, como
          completar una misión o llegar al final de una lección. No incluye identificador,
          ruta, texto buscado, prompt, respuesta ni contenido de aprendizaje. El marcador
          local evita enviar el mismo tipo de evento más de una vez al día desde ese
          navegador; no se transmite al servidor.
        </p>
        <p>
          Los contadores solo distinguen acciones cerradas como iniciar o completar
          una misión, usar la búsqueda o avanzar de lección. No guardan el texto
          buscado, prompts, respuestas, evidencias, una cuenta ni un identificador
          personal. Las respuestas de las prácticas siguen viviendo únicamente en la
          memoria temporal de la página y desaparecen al recargarla.
        </p>
        <p>
          Una evidencia de práctica solo se conserva en <code>localStorage</code> cuando
          pulsas expresamente «Guardar en este dispositivo». Puedes revisarla y borrarla
          desde «Mi ruta»; Aulafy no recibe su contenido.
        </p>
        <p>
          La descarga de evidencias en formato Markdown se genera también dentro del
          navegador, sin subir primero el contenido a un servidor.
        </p>
        <p>
          Abrir una fuente externa puede sumar el nombre cerrado
          <code> external_source_open</code>, pero no se envían la URL, el dominio,
          el texto del enlace ni la página de Aulafy desde la que se abrió.
        </p>
        <p>
          Para medir retorno, el navegador compara localmente la última visita con la
          actual. Puede sumar <code>return_7d</code> o <code>return_30d</code>, pero no
          envía fechas, duración, ruta ni identidad.
        </p>

        <h2>Servicios externos</h2>
        <p>
          Si haces clic en enlaces externos, como GitHub, Anthropic, X, LinkedIn
          u otras herramientas citadas en los cursos, esos servicios pueden usar
          sus propias cookies y políticas. Aulafy no controla esos sitios.
        </p>

        <h2>Cambios futuros</h2>
        <p>
          Si en el futuro Aulafy incorpora publicidad, cookies o medición con identificadores,
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
