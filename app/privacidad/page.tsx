import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad - Aulafy",
  description:
    "Informacion sobre privacidad, cookies y uso del asistente de IA en Aulafy.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <h1 className="text-4xl font-bold text-white mb-4">Privacidad</h1>
      <div className="prose">
        <p>
          Aulafy se puede leer sin registro y no incluye formularios de alta,
          cuenta de usuario ni muro de pago.
        </p>

        <h2>Chat de ayuda</h2>
        <p>
          Las paginas de la guia incluyen un asistente de IA opcional. Si lo usas,
          tu pregunta y los ultimos turnos de la conversacion se envian al proveedor
          de IA configurado en el servidor para generar la respuesta. No introduzcas
          claves de API, contrasenas, datos personales sensibles ni informacion
          confidencial.
        </p>

        <h2>Limitacion de abuso</h2>
        <p>
          El servidor puede usar la IP aproximada de la peticion para limitar el
          numero de mensajes y proteger el servicio frente a abuso. Esta informacion
          se usa solo con esa finalidad tecnica.
        </p>

        <h2>Cookies</h2>
        <p>
          La web no necesita cookies propias para mostrar el contenido. Los servicios
          externos enlazados desde la pagina pueden aplicar sus propias politicas.
        </p>

        <h2>Contacto</h2>
        <p>
          Para consultas sobre privacidad, escribe a{" "}
          <a href="mailto:learntouseai@gmail.com">learntouseai@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
