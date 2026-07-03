import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Colas, rate limits y caché — MLOps local",
  description:
    "Diseña colas, rate limits, reintentos, caché semántica y presupuestos para que una app LLM no se caiga ni dispare costes.",
  keywords: ["colas LLM", "rate limits IA", "caché LLM", "BullMQ IA", "costes modelos IA"],
  alternates: { canonical: "/cursos/mlops-local/colas-costes" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Colas y costes"
      title="Colas, rate limits y caché"
      icon="automation"
      lead={<>Los modelos son lentos y caros comparados con una función normal. Si varias personas los usan a la vez, necesitas colas, límites, reintentos y caché antes de que llegue el susto.</>}
      courseHref="/cursos/mlops-local"
      courseLabel="MLOps local"
    >
      <Objetivos>
        <ul>
          <li>Separar peticiones interactivas de trabajos pesados.</li>
          <li>Aplicar rate limits por usuario, equipo o tenant.</li>
          <li>Usar caché sin romper seguridad ni frescura de datos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="cola">
        Es una lista ordenada de trabajos. En vez de intentar hacerlo todo al mismo tiempo, los trabajos entran, esperan y se procesan con control.
      </Cristiano>

      <div className="prose">
        <h2>Qué va en cola y qué no</h2>
        <ul>
          <li><strong>Interactivo</strong>: chat, autocomplete, acciones que el usuario espera en pantalla.</li>
          <li><strong>Cola</strong>: resumir 100 PDFs, generar audios, procesar vídeos, evaluar muchos prompts.</li>
          <li><strong>Programado</strong>: reindexar documentos, recalcular embeddings, ejecutar evals nocturnas.</li>
        </ul>
      </div>

      <Idea>
        BullMQ documenta colas sobre Redis con rate limiting. Para apps Node, es una pieza sencilla para trabajos en segundo plano.
      </Idea>

      <div className="prose">
        <h2>Rate limit conceptual</h2>
      </div>

      <Terminal>{`limites:
  usuario_gratis:
    requests_minuto: 10
    tokens_dia: 20000
  equipo_interno:
    requests_minuto: 60
    tokens_dia: 500000
  trabajos_pesados:
    concurrencia: 2
    reintentos: 1
    timeout_segundos: 300`}</Terminal>

      <div className="prose">
        <h2>Caché responsable</h2>
        <ul>
          <li>Cachea respuestas públicas o preguntas repetidas sin datos privados.</li>
          <li>No cachees respuestas con datos personales sin diseño explícito.</li>
          <li>Incluye modelo, prompt version y permisos en la clave de caché.</li>
          <li>Invalida caché cuando cambian documentos o políticas.</li>
        </ul>
      </div>

      <Cuidado>
        Una caché mal diseñada puede filtrar respuestas de un usuario a otro. En RAG multiusuario, la caché debe incluir tenant, permisos y versión de documentos.
      </Cuidado>

      <Comprueba>
        Simula 50 peticiones. El sistema debe rechazar, encolar o degradar con mensaje claro; nunca quedarse colgado sin explicación.
      </Comprueba>

      <Guardar>
        Coste y latencia se diseñan. Si esperas a tener usuarios para pensar en límites, llegarás tarde.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/mlops-local/observabilidad", label: "Observabilidad" }}
        next={{ href: "/cursos/mlops-local/proyecto-produccion", label: "Proyecto producción" }}
      />
    </Chapter>
  );
}
