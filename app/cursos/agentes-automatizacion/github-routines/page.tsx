import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "GitHub Actions y routines — Agentes y automatización",
  description:
    "Cuándo automatizar Claude Code desde GitHub Actions, cuándo usar routines en preview y cuándo basta con cron o un script local.",
  alternates: { canonical: "/cursos/agentes-automatizacion/github-routines" },
};

export default function Page() {
  return (
    <Chapter
      crumb="GitHub Actions y routines"
      title="GitHub Actions y routines"
      icon="automation"
      lead={<>Cuando un agente debe actuar sin que abras la terminal, necesitas un disparador: un comentario en GitHub, un horario, una llamada API o un cron local. Esta lección te ayuda a elegir el sitio correcto para ejecutarlo.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Distinguir GitHub Actions, routines, cron local y procesos 24/7.</li>
          <li>Diseñar automatizaciones revisables antes de que escriban código.</li>
          <li>Usar preview features sin casarte con ellas demasiado pronto.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Cuándo usar cada opción</h2>
        <ul>
          <li><strong>GitHub Actions</strong>: trabajo relacionado con issues, PRs, tests, releases y revisión de código.</li>
          <li><strong>Routines</strong>: tareas gestionadas en cloud por Anthropic, con triggers por horario, API o eventos. Están en research preview, así que úsalas con prudencia.</li>
          <li><strong>Cron local/VPS</strong>: automatizaciones simples, baratas y tuyas.</li>
          <li><strong>Proceso 24/7</strong>: bot con bandeja de entrada, cola y estado persistente.</li>
        </ul>
      </div>

      <Cristiano term="trigger">
        Es el disparador: “cuando pase esto, arranca el agente”. Un comentario con <code>@claude</code>, una hora concreta, una issue nueva o una petición HTTP.
      </Cristiano>

      <Terminal>{`# Diseño antes de automatizar
Trigger:
Entrada:
Permisos:
Salida esperada:
Quién revisa:
Cómo se cancela:
Dónde quedan los logs:`}</Terminal>

      <Cuidado>
        No empieces con “el agente hace commit directo a main”. Primero que comente, luego que abra PR, y solo después de semanas de confianza planteas escritura más autónoma.
      </Cuidado>

      <div className="prose">
        <h2>Patrones buenos en GitHub</h2>
        <ul>
          <li><strong>@claude en issue</strong>: transformar una descripción en PR.</li>
          <li><strong>Revisión automática de PR</strong>: comentar riesgos, no bloquear por gusto.</li>
          <li><strong>Triaging</strong>: etiquetar issues y pedir información faltante.</li>
          <li><strong>Release notes</strong>: resumir cambios desde commits y PRs.</li>
        </ul>
      </div>

      <Idea>
        La salida más segura de un agente cloud es una propuesta revisable: comentario, diff, PR o informe. La salida más peligrosa es una acción irreversible sin humano en medio.
      </Idea>

      <Comprueba>
        Diseña un workflow que solo comente en PRs. Mide una semana: falsos positivos, hallazgos útiles y tiempo ahorrado. Si no supera ese examen, no lo escales.
      </Comprueba>

      <Guardar>
        Routines prometen mucho, pero recuerda su etiqueta de preview. Para un curso serio: enseña el concepto, muestra casos, y ofrece alternativa con GitHub Actions o cron.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/mcp-seguro", label: "MCP seguro" }}
        next={{ href: "/cursos/agentes-automatizacion/agente-247", label: "Proyecto: agente 24/7" }}
      />
    </Chapter>
  );
}
