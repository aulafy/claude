import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Subagentes con roles y límites — Agentes y automatización",
  description:
    "Cómo usar subagentes en Claude Code para investigar, revisar y ejecutar tareas sin llenar el contexto principal ni dar permisos excesivos.",
  alternates: { canonical: "/cursos/agentes-automatizacion/subagentes" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Subagentes con roles y límites"
      title="Subagentes con roles y límites"
      icon="users"
      lead={<>Los subagentes son la forma más limpia de delegar trabajo: investigan en su propio contexto, usan herramientas acotadas y devuelven solo lo importante. Bien usados ahorran contexto; mal usados multiplican el caos.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Crear roles útiles: investigador, revisor, depurador, documentalista.</li>
          <li>Limitar herramientas y permisos por subagente.</li>
          <li>Usarlos para ahorrar contexto y mejorar calidad de decisión.</li>
        </ul>
      </Objetivos>

      <Cristiano term="subagente">
        Es un Claude especializado que recibe una misión concreta. No debe ser “otro yo generalista”, sino una herramienta humana: el que revisa seguridad, el que busca bugs, el que resume logs o el que convierte notas en documentación.
      </Cristiano>

      <div className="prose">
        <h2>Cuándo usarlo</h2>
        <ul>
          <li>Cuando la tarea requiere explorar muchos archivos.</li>
          <li>Cuando quieres una segunda opinión antes de tocar código.</li>
          <li>Cuando necesitas comparar alternativas sin ensuciar la sesión principal.</li>
          <li>Cuando una tarea tiene un criterio repetible: “revisa seguridad”, “busca deuda técnica”, “resume cambios”.</li>
        </ul>
      </div>

      <Terminal>{`Usa un subagente revisor para revisar este cambio.
Objetivo: encontrar bugs, riesgos de seguridad y tests ausentes.
No cambies archivos.
Devuelve hallazgos ordenados por severidad con archivo y línea.`}</Terminal>

      <Idea>
        Un buen subagente tiene verbo, alcance y salida. “Revisa” es flojo. “Busca fugas de secretos en estos cambios y devuelve solo hallazgos accionables” ya es una herramienta.
      </Idea>

      <div className="prose">
        <h2>Roles que sí merecen existir</h2>
        <ul>
          <li><strong>Investigador de código</strong>: localiza módulos y explica flujo.</li>
          <li><strong>Revisor de seguridad</strong>: secretos, permisos, entrada de usuario, SSRF, paths peligrosos.</li>
          <li><strong>Depurador</strong>: reproduce error, reduce caso mínimo, propone fix.</li>
          <li><strong>Documentalista</strong>: convierte decisiones en README, CLAUDE.md o changelog.</li>
          <li><strong>QA funcional</strong>: revisa estados, rutas, responsive y regresiones visibles.</li>
        </ul>

        <h2>Roles que huelen mal</h2>
        <p>“CEO agent”, “arquitecto supremo” o “agente que lo hace todo” suelen acabar en coste alto y poca responsabilidad. Si el rol no tiene límites, no es un rol: es una excusa.</p>
      </div>

      <Cuidado>
        No des permisos de escritura o shell por defecto a un subagente que solo debe leer. La seguridad empieza por la dieta: menos herramientas, menos superficie, menos sustos.
      </Cuidado>

      <Comprueba>
        Prueba la misma tarea dos veces: una en la sesión principal y otra delegada a un subagente. Si el subagente devuelve una síntesis útil y el contexto principal queda limpio, has ganado.
      </Comprueba>

      <Guardar>
        Plantilla mental: “eres X, puedes usar Y, no puedes hacer Z, devuelve W”. Repite esa estructura hasta que te salga sola.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/mapa", label: "Mapa real de agentes" }}
        next={{ href: "/cursos/agentes-automatizacion/hooks", label: "Hooks: automatización determinista" }}
      />
    </Chapter>
  );
}
