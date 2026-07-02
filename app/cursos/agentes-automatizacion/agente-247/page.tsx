import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Proyecto: agente 24/7 con bandeja de entrada — Agentes y automatización",
  description:
    "Diseña un agente siempre encendido con cola de tareas, permisos mínimos, logs y revisión humana antes de ejecutar acciones peligrosas.",
  alternates: { canonical: "/cursos/agentes-automatizacion/agente-247" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Proyecto: agente 24/7"
      title="Proyecto: agente 24/7 con bandeja de entrada"
      icon="robot"
      lead={<>El proyecto estrella: un agente que no depende de que estés delante. Recibe tareas, las clasifica, ejecuta solo lo permitido y deja evidencia. No buscamos ciencia ficción: buscamos un operador pequeño, aburrido y fiable.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Diseñar un agente 24/7 sin darle permisos absurdos.</li>
          <li>Separar entrada, cola, ejecución, logs y aprobación humana.</li>
          <li>Construir un MVP replicable con Telegram, Discord, email o una carpeta de entrada.</li>
        </ul>
      </Objetivos>

      <Cristiano term="bandeja de entrada">
        Es el lugar donde llegan tareas: un chat de Telegram, un canal de Discord, una issue, un email o un archivo en una carpeta. El agente no vive “pensando”; despierta cuando entra trabajo.
      </Cristiano>

      <div className="prose">
        <h2>Arquitectura mínima</h2>
        <ol>
          <li><strong>Entrada</strong>: mensaje, issue, email o archivo.</li>
          <li><strong>Clasificador</strong>: decide tipo, prioridad y riesgo.</li>
          <li><strong>Cola</strong>: guarda tareas pendientes.</li>
          <li><strong>Ejecutor</strong>: hace solo acciones permitidas.</li>
          <li><strong>Revisión</strong>: pide confirmación para escritura, compras, borrados o publicaciones.</li>
          <li><strong>Log</strong>: deja rastro de cada decisión.</li>
        </ol>
      </div>

      <Terminal>{`inbox/
  nueva-tarea.md
queue/
  pendiente-001.json
logs/
  2026-07-02.md
outbox/
  borrador-respuesta.md`}</Terminal>

      <Idea>
        El primer agente 24/7 no necesita Telegram. Una carpeta local con archivos de entrada ya enseña lo importante: cola, estado, permisos y logs.
      </Idea>

      <div className="prose">
        <h2>MVP recomendado</h2>
        <ul>
          <li>Entrada: carpeta <code>inbox</code>.</li>
          <li>Modelo: Claude Code para razonar y una IA local para resumir volumen.</li>
          <li>Acciones permitidas: crear borradores, abrir issues, resumir documentos.</li>
          <li>Acciones prohibidas: borrar, publicar, enviar emails o hacer deploy sin aprobación.</li>
          <li>Salida: informe en <code>outbox</code> y log en Markdown.</li>
        </ul>
      </div>

      <Terminal>{`Eres el agente de bandeja de entrada.
Lee solo inbox/.
Clasifica cada tarea: responder, investigar, crear borrador o pedir aclaración.
No envíes nada. No borres nada.
Escribe resultado en outbox/ y registra decisión en logs/hoy.md.`}</Terminal>

      <Cuidado>
        Los agentes 24/7 fallan por tres sitios: bucles infinitos, permisos excesivos y falta de logs. Si no puedes ver qué hizo y por qué, no lo dejes encendido.
      </Cuidado>

      <Comprueba>
        Mete tres tareas: una clara, una ambigua y una peligrosa. El agente debe ejecutar la clara, pedir aclaración en la ambigua y rechazar o escalar la peligrosa. Ese test vale más que cien demos bonitas.
      </Comprueba>

      <Guardar>
        Tu primer agente bueno debe parecer conservador. Cuando lleve días acertando, amplías permisos. La autonomía se gana con evidencia.
      </Guardar>

      <ChapterNav prev={{ href: "/cursos/agentes-automatizacion/github-routines", label: "GitHub Actions y routines" }} />
    </Chapter>
  );
}
