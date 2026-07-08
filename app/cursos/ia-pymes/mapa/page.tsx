import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Mapa de IA útil para una pyme",
  description:
    "Qué automatizar con IA en una pyme: emails, facturas, presupuestos, atención al cliente, documentos y flujos con revisión humana.",
  keywords: ["IA para pymes", "automatización IA autónomos", "IA oficina", "IA local para empresas"],
  alternates: { canonical: "/cursos/ia-pymes/mapa" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Mapa para pymes"
      title="Mapa de IA útil para una pyme"
      icon="briefcase"
      lead={<>La IA que más valor da a una pyme no es la más espectacular: es la que reduce trabajo repetitivo sin poner datos, clientes ni dinero en riesgo.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Elegir tareas que sí merece la pena automatizar.</li>
          <li>Separar borradores, decisiones y acciones finales.</li>
          <li>Diseñar flujos pequeños con revisión humana.</li>
        </ul>
      </Objetivos>

      <Cristiano term="flujo revisable">
        Es una automatización que no actúa a escondidas. Clasifica, prepara o propone, pero deja una persona revisando antes de enviar, publicar, borrar, cobrar o prometer algo.
      </Cristiano>

      <div className="prose">
        <h2>Qué automatizar primero</h2>
        <ul>
          <li><strong>Emails</strong>: clasificar, resumir y crear borradores.</li>
          <li><strong>Facturas</strong>: extraer datos, detectar errores y preparar registros.</li>
          <li><strong>Presupuestos</strong>: convertir peticiones en borradores revisables.</li>
          <li><strong>Atención al cliente</strong>: responder preguntas repetidas sin enviar nada sin aprobación.</li>
          <li><strong>Excel/Sheets</strong>: limpiar datos, cruzar tablas y generar informes.</li>
        </ul>
      </div>

      <Idea>
        Empieza donde ya hay plantilla y repetición. Si cada caso requiere juicio humano complejo, primero usa IA como asistente, no como agente autónomo.
      </Idea>

      <div className="prose">
        <h2>Plantilla de diseño</h2>
      </div>

      <Terminal>{`Tarea:
Entrada:
Datos personales:
Herramientas:
Salida esperada:
Acciones prohibidas:
Quién revisa:
Cuándo se borra o archiva:
Cómo se registra la decisión:`}</Terminal>

      <Cuidado>
        No empieces conectando la IA directamente a WhatsApp, email o facturación real. Empieza creando borradores y logs. La autonomía viene después de comprobar que acierta.
      </Cuidado>

      <Comprueba>
        Elige una tarea semanal y mide tiempo: si te lleva más de 30 minutos, se repite y tiene reglas claras, es candidata a automatización.
      </Comprueba>

      <Guardar>
        La IA útil para pymes debe ser pequeña, auditable y aburridamente fiable. Ese es el listón.
      </Guardar>

      <ChapterNav next={{ href: "/cursos/ia-pymes/rgpd-basico", label: "RGPD básico" }} />
    </Chapter>
  );
}
