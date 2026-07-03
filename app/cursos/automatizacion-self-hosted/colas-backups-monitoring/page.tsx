import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Colas, backups y monitorización — Automatización self-hosted",
  description:
    "Opera automatizaciones IA self-hosted con queue mode, workers, backups, error workflows, alertas y límites de ejecución.",
  keywords: ["n8n queue mode", "n8n backups monitoring", "automatización IA producción", "workers Redis n8n"],
  alternates: { canonical: "/cursos/automatizacion-self-hosted/colas-backups-monitoring" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Operación"
      title="Colas, backups y monitorización"
      icon="chart"
      lead={<>Cuando una automatización ya ayuda al negocio, deja de ser experimento. Necesita cola, errores visibles, backups restaurables y alertas simples.</>}
      courseHref="/cursos/automatizacion-self-hosted"
      courseLabel="Automatización self-hosted"
    >
      <Objetivos>
        <ul>
          <li>Entender cuándo pasar n8n a queue mode con Redis y workers.</li>
          <li>Configurar error workflows y alertas para fallos reales.</li>
          <li>Definir backups y pruebas de restauración.</li>
        </ul>
      </Objetivos>

      <Cristiano term="queue mode">
        Es separar la app principal de n8n de los workers que ejecutan tareas, usando Redis y base de datos para coordinar.
      </Cristiano>

      <Terminal>{`operacion_minima:
  colas:
    - Redis
    - workers separados
    - concurrencia limitada
  errores:
    - error workflow
    - alerta Telegram/email
    - registro de payload
  backups:
    - Postgres
    - volumen n8n
    - volumen Open WebUI
    - .env cifrado fuera del servidor
  revisar_cada_semana:
    - ejecuciones fallidas
    - workers caidos
    - disco libre
    - coste de APIs`}</Terminal>

      <Idea>
        n8n recomienda queue mode para escalar self-hosted: main, workers, Redis y base de datos. Empieza simple, pero diseña para separar ejecución cuando haya carga.
      </Idea>

      <Cuidado>
        Backup que no has restaurado es esperanza, no backup. Programa una prueba de restauración mensual aunque sea en una máquina temporal.
      </Cuidado>

      <Comprueba>
        Crea una alerta para tres cosas: workflow fallido, disco bajo y coste/API anómalo. Con eso ya sube mucho la calidad operativa.
      </Comprueba>

      <Guardar>
        La automatización fiable no es la que nunca falla. Es la que falla visible, limitada y recuperable.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/automatizacion-self-hosted/aprobaciones-humanas", label: "Aprobaciones humanas" }}
        next={{ href: "/cursos/automatizacion-self-hosted/proyecto-soporte-pyme", label: "Proyecto soporte pyme" }}
      />
    </Chapter>
  );
}
