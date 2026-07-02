import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "RGPD básico para usar IA sin sustos — IA para pymes y autónomos",
  description:
    "Checklist básico de privacidad para usar IA en pymes: minimización, finalidad, transparencia, encargados, datos sensibles, logs y revisión humana.",
  keywords: ["RGPD IA pymes", "privacidad IA local", "IA datos personales empresa", "AEPD IA agéntica"],
  alternates: { canonical: "/cursos/ia-pymes/rgpd-basico" },
};

export default function Page() {
  return (
    <Chapter
      crumb="RGPD básico"
      title="RGPD básico para usar IA sin sustos"
      icon="shield"
      lead={<>No necesitas ser abogado para trabajar mejor: necesitas saber qué datos metes en la IA, para qué, dónde van y quién puede revisarlos. Esta lección no sustituye asesoramiento legal, pero te da un marco prudente.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Reducir datos personales antes de usar IA.</li>
          <li>Distinguir IA local, proveedor cloud y encargado de tratamiento.</li>
          <li>Crear un checklist mínimo antes de automatizar tareas de clientes.</li>
        </ul>
      </Objetivos>

      <Cristiano term="minimización">
        Es usar solo los datos necesarios. Si para redactar un email no necesitas DNI, cuenta bancaria o historial completo, no se lo des al modelo.
      </Cristiano>

      <div className="prose">
        <h2>Checklist mínimo</h2>
        <ul>
          <li><strong>Finalidad</strong>: para qué se usa la IA.</li>
          <li><strong>Datos</strong>: qué campos entran y cuáles se eliminan.</li>
          <li><strong>Proveedor</strong>: local, self-hosted o servicio externo.</li>
          <li><strong>Acceso</strong>: quién puede ver entrada, salida y logs.</li>
          <li><strong>Retención</strong>: cuánto tiempo guardas resultados.</li>
          <li><strong>Revisión humana</strong>: qué acciones requieren aprobación.</li>
        </ul>
      </div>

      <Terminal>{`Antes de enviar datos a un modelo:
1. Elimina campos innecesarios.
2. Sustituye nombres por IDs internos si puedes.
3. No incluyas datos sensibles salvo necesidad clara.
4. No permitas envío automático sin revisión.
5. Registra qué hizo el sistema y quién aprobó.`}</Terminal>

      <Idea>
        IA local no significa automáticamente cumplimiento. Ayuda a que los datos no salgan de tu equipo, pero sigues necesitando finalidad, permisos, seguridad y criterio.
      </Idea>

      <Cuidado>
        Datos de salud, menores, nóminas, sanciones, cuentas bancarias o documentos identificativos elevan mucho el riesgo. Si vas a tratarlos con IA, consulta a un profesional.
      </Cuidado>

      <Comprueba>
        Coge un email real y crea una versión minimizada: quita datos personales, deja solo el problema y pide un borrador de respuesta. Si la respuesta sigue siendo útil, esa es la versión que deberías automatizar.
      </Comprueba>

      <Guardar>
        Regla práctica: menos datos, menos permisos, más revisión. En una pyme, eso suele ser la diferencia entre una automatización útil y un susto.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/mapa", label: "Mapa para pymes" }}
        next={{ href: "/cursos/ia-pymes/emails", label: "Emails" }}
      />
    </Chapter>
  );
}
