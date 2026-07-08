import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Aprobaciones humanas antes de actuar",
  description:
    "Diseña aprobaciones humanas para automatizaciones IA en n8n, Telegram, email o Open WebUI antes de enviar, publicar o modificar datos.",
  keywords: ["human in the loop n8n", "aprobaciones IA pymes", "automatización IA segura", "n8n Telegram aprobación"],
  alternates: { canonical: "/cursos/automatizacion-self-hosted/aprobaciones-humanas" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Aprobaciones"
      title="Aprobaciones humanas antes de actuar"
      icon="userShield"
      lead={<>La mejor primera automatización no envía nada: prepara borradores, explica por qué y pide permiso. Así ganas confianza sin poner el negocio en manos de una suposición.</>}
      courseHref="/cursos/automatizacion-self-hosted"
      courseLabel="Automatización self-hosted"
    >
      <Objetivos>
        <ul>
          <li>Clasificar acciones por riesgo antes de automatizarlas.</li>
          <li>Crear flujos de aprobación por email, Telegram, Discord o panel interno.</li>
          <li>Guardar quién aprobó, qué aprobó y con qué contexto.</li>
        </ul>
      </Objetivos>

      <Cristiano term="human-in-the-loop">
        Es dejar a una persona dentro del flujo para revisar o aprobar antes de una acción sensible.
      </Cristiano>

      <Terminal>{`riesgo_bajo:
  accion: clasificar email
  aprobacion: no
riesgo_medio:
  accion: crear borrador para cliente
  aprobacion: antes de enviar
riesgo_alto:
  accion: cambiar precio, borrar dato, publicar, cobrar
  aprobacion: obligatoria + doble confirmacion

registro_aprobacion:
  usuario
  fecha
  entrada
  propuesta
  decision
  motivo`}</Terminal>

      <Idea>
        Una aprobación útil muestra entrada, propuesta, datos usados, riesgo y botón de rechazar. Si solo pone “aprobar”, no es revisión real.
      </Idea>

      <Cuidado>
        No conviertas la aprobación en spam. Si todo pide permiso, nadie lee. Automatiza lo seguro y pide revisión solo donde hay impacto.
      </Cuidado>

      <Comprueba>
        Toma una automatización y marca tres salidas: auto, borrador y bloqueo. Así evitas el falso dilema entre manual y automático.
      </Comprueba>

      <Guardar>
        La autonomía no se activa de golpe. Se gana con evidencia.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/automatizacion-self-hosted/n8n-webhooks", label: "n8n y webhooks" }}
        next={{ href: "/cursos/automatizacion-self-hosted/colas-backups-monitoring", label: "Colas y backups" }}
      />
    </Chapter>
  );
}
