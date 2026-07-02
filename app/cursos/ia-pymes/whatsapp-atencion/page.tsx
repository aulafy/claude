import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "WhatsApp y Telegram con aprobación humana — IA para pymes y autónomos",
  description:
    "Diseña un flujo de atención al cliente con n8n, WhatsApp Business Cloud o Telegram, IA local y revisión humana antes de responder.",
  keywords: ["n8n WhatsApp IA local", "WhatsApp IA pymes", "Telegram IA atención cliente", "n8n atención cliente"],
  alternates: { canonical: "/cursos/ia-pymes/whatsapp-atencion" },
};

export default function Page() {
  return (
    <Chapter
      crumb="WhatsApp y Telegram"
      title="WhatsApp y Telegram con aprobación humana"
      icon="chat"
      lead={<>La atención por chat es tentadora, pero también delicada: respuestas rápidas, clientes reales y datos personales. La versión segura empieza con clasificación, borrador y aprobación.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Diseñar un flujo de atención con n8n y revisión humana.</li>
          <li>Decidir cuándo usar WhatsApp Business Cloud o Telegram.</li>
          <li>Evitar bots que prometen, envían o revelan datos sin control.</li>
        </ul>
      </Objetivos>

      <Cristiano term="WhatsApp Business Cloud">
        Es la vía oficial para integrar WhatsApp en sistemas de empresa. No uses automatizaciones raras sobre WhatsApp personal si manejas clientes reales.
      </Cristiano>

      <div className="prose">
        <h2>Flujo mínimo con n8n</h2>
      </div>

      <Terminal>{`WhatsApp Trigger o Telegram Trigger
  -> normalizar mensaje
  -> detectar intención y urgencia
  -> buscar respuesta en FAQ o documentos
  -> crear borrador
  -> enviar a revisión humana
  -> responder solo si alguien aprueba
  -> guardar log`}</Terminal>

      <div className="prose">
        <h2>Prompt de atención</h2>
      </div>

      <Terminal>{`Eres asistente de atención al cliente.
No envíes respuestas finales sin aprobación.
No prometas precios, disponibilidad ni plazos no confirmados.
Si el cliente pide datos personales o cambios de contrato, escala a humano.
Responde con:
1. intención
2. urgencia
3. borrador breve
4. datos que faltan
5. riesgo: bajo, medio o alto`}</Terminal>

      <Idea>
        Para muchas pymes, Telegram es mejor laboratorio: más simple de probar. WhatsApp tiene más valor comercial, pero exige más cuidado con cuenta, plantillas, permisos y políticas.
      </Idea>

      <Cuidado>
        Atención al cliente no es solo texto. Hay reclamaciones, datos personales, menores, pagos y compromisos. Empieza con borradores, no con respuestas automáticas.
      </Cuidado>

      <Comprueba>
        Prueba cuatro mensajes: pregunta frecuente, reclamación, petición de dato sensible y urgencia real. El flujo debe responder solo a lo seguro y escalar lo delicado.
      </Comprueba>

      <Guardar>
        Proyecto final recomendado: un panel de “borradores pendientes” antes de enviar. Esa pantalla vale más que un bot que responde solo.
      </Guardar>

      <ChapterNav prev={{ href: "/cursos/ia-pymes/presupuestos-excel", label: "Presupuestos y Excel" }} />
    </Chapter>
  );
}
