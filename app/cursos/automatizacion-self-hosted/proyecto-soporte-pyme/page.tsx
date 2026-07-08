import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Proyecto: soporte interno para una pyme",
  description:
    "Proyecto final: sistema self-hosted con n8n, Open WebUI, modelo local, bandeja de soporte, borradores, aprobación humana y logs.",
  keywords: ["proyecto IA pyme n8n", "soporte interno IA", "Open WebUI n8n pyme", "automatización soporte IA"],
  alternates: { canonical: "/cursos/automatizacion-self-hosted/proyecto-soporte-pyme" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Proyecto final"
      title="Proyecto: soporte interno para una pyme"
      icon="briefcase"
      lead={<>Vas a montar un sistema que recibe solicitudes internas, busca información, prepara una respuesta y pide aprobación antes de enviar o actualizar datos.</>}
      courseHref="/cursos/automatizacion-self-hosted"
      courseLabel="Automatización self-hosted"
    >
      <Objetivos>
        <ul>
          <li>Unir n8n, Open WebUI y un modelo local en un flujo útil.</li>
          <li>Crear una bandeja de soporte con estados y evidencia.</li>
          <li>Entregar un MVP que una pyme pueda probar sin riesgo.</li>
        </ul>
      </Objetivos>

      <Cristiano term="MVP">
        Es la versión mínima que demuestra valor sin automatizar todavía las partes peligrosas.
      </Cristiano>

      <Terminal>{`entrada:
  - email soporte@empresa.test
  - formulario interno
  - mensaje Telegram

flujo:
  1. n8n recibe solicitud
  2. normaliza cliente, tema y urgencia
  3. busca en FAQ o documentos internos
  4. modelo redacta respuesta
  5. humano aprueba o pide cambios
  6. n8n envía respuesta aprobada
  7. guarda log y metricas

metricas:
  - tiempo hasta borrador
  - porcentaje aprobado
  - motivos de rechazo
  - coste por solicitud`}</Terminal>

      <Idea>
        El proyecto no intenta sustituir soporte. Intenta quitar fricción: búsqueda, borrador, resumen y trazabilidad.
      </Idea>

      <Cuidado>
        Usa datos ficticios o anonimizados hasta que tengas política de privacidad, permisos y logs revisados.
      </Cuidado>

      <Comprueba>
        Prueba el sistema con 20 solicitudes históricas. Mide cuántas respuestas se aprueban sin cambios y qué errores se repiten.
      </Comprueba>

      <Guardar>
        Una automatización buena no presume de autonomía. Presume de ahorrar tiempo sin ocultar decisiones.
      </Guardar>

      <ChapterNav prev={{ href: "/cursos/automatizacion-self-hosted/colas-backups-monitoring", label: "Colas y backups" }} />
    </Chapter>
  );
}
