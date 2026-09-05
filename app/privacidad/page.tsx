import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Privacidad - Aulafy", description: "Sin cuentas, cookies ni seguimiento del aprendizaje.", alternates: { canonical: "/privacidad" } };
export default function Privacy() {
  return <div className="max-w-3xl mx-auto px-8 py-14"><h1>Privacidad en Aulafy</h1><div className="prose">
    <p>Actualizado el 5 de septiembre de 2026.</p>
    <h2>Sin cuentas ni seguimiento</h2><p>Aulafy no requiere registro, no instala cookies y no envía métricas educativas. Los ejercicios no se envían a un servidor ni a un proveedor de IA. Los servicios de cuentas y recepción de contenidos están deshabilitados.</p>
    <h2>Tu trabajo</h2><p>En el nuevo curso de iniciación en inglés, las respuestas y la revisión viven en la memoria temporal de la página. Descarga tu trabajo antes de salir o recargar. El archivo se genera en tu dispositivo.</p><p>Algunas páginas de la biblioteca anterior guardan progreso y notas localmente en el navegador. No se transmiten a Aulafy. Puedes eliminar los datos anteriores con los controles de progreso o desde los ajustes de datos del sitio en tu navegador.</p>
    <h2>Alojamiento y enlaces externos</h2><p>El proveedor de alojamiento recibe la información técnica necesaria para servir la web y puede mantener registros operativos y de seguridad. No podemos prometer que una visita a internet no genere ningún dato técnico.</p><p>GitHub, el correo y los proveedores de IA enlazados tienen sus propias políticas. Usarlos es opcional. El nuevo curso se puede completar sin una cuenta externa.</p>
    <h2>Contacto</h2><p>Responsable editorial: Aulafy. Consultas: learntouseai@gmail.com.</p><Link href="/en/privacy">Privacy information in English</Link>
  </div></div>;
}
