import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Proyecto: mini plataforma LLM privada — MLOps local",
  description:
    "Proyecto final para montar una mini plataforma LLM privada con backend local, gateway, observabilidad, evals, rate limits, caché y checklist de producción.",
  keywords: ["plataforma LLM privada", "MLOps LLM proyecto", "despliegue IA local", "LLM gateway observabilidad"],
  alternates: { canonical: "/cursos/mlops-local/proyecto-produccion" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Proyecto final"
      title="Proyecto: mini plataforma LLM privada"
      icon="building"
      lead={<>El proyecto final une todo: un modelo local servido por API, un gateway con límites, trazas, evals mínimas y una decisión clara de qué está listo para producción y qué no.</>}
      courseHref="/cursos/mlops-local"
      courseLabel="MLOps local"
    >
      <Objetivos>
        <ul>
          <li>Montar una arquitectura local reproducible para una app LLM.</li>
          <li>Documentar modelo, gateway, logs, evals, costes y límites.</li>
          <li>Dejar una checklist de salida antes de abrirlo a usuarios.</li>
        </ul>
      </Objetivos>

      <Cristiano term="plataforma LLM privada">
        No es un único chat. Es el conjunto de piezas que permite a varias apps usar modelos con control: API, gateway, permisos, observabilidad, evals y operación.
      </Cristiano>

      <div className="prose">
        <h2>Arquitectura del proyecto</h2>
      </div>

      <Terminal>{`usuario
  -> app web
  -> API propia con auth
  -> LiteLLM gateway
  -> vLLM o llama.cpp server
  -> Langfuse/OpenTelemetry
  -> promptfoo evals
  -> Redis para colas/caché
  -> dashboard de métricas`}</Terminal>

      <Idea>
        Ray Serve puede entrar cuando ya necesitas escalar réplicas, varios modelos o autoscaling. Para una primera plataforma privada, empieza más pequeño y medible.
      </Idea>

      <div className="prose">
        <h2>Checklist de producción</h2>
        <ul>
          <li>El modelo y su hash están documentados.</li>
          <li>El servidor no está expuesto directamente a internet.</li>
          <li>Hay claves por entorno, usuario o equipo.</li>
          <li>Hay rate limits y presupuesto.</li>
          <li>Las trazas muestran modelo, latencia, tokens y errores.</li>
          <li>Hay evals mínimas antes de cambiar prompts o modelos.</li>
          <li>Hay plan de fallback si el modelo local cae.</li>
        </ul>
      </div>

      <Terminal>{`decision_salida:
  estado: "piloto interno"
  usuarios: ["equipo soporte"]
  limite_diario_tokens: 500000
  modelos: ["local-qwen", "backup-cloud"]
  datos_permitidos: ["manuales internos", "FAQs"]
  datos_prohibidos: ["contratos personales", "secretos", "credenciales"]
  siguiente_revision: "2026-07-17"`}</Terminal>

      <Cuidado>
        No llames producción a una demo sin operación. Producción significa que alguien puede mantenerla cuando falla, cuesta demasiado o responde mal.
      </Cuidado>

      <Comprueba>
        Apaga el backend local y lanza una petición. La app debe fallar con mensaje claro o usar fallback controlado, no quedarse esperando sin límite.
      </Comprueba>

      <Guardar>
        Este proyecto deja una base reutilizable: cada nuevo curso o app de Aulafy puede usar la misma puerta, trazas y evals.
      </Guardar>

      <ChapterNav prev={{ href: "/cursos/mlops-local/colas-costes", label: "Colas y costes" }} />
    </Chapter>
  );
}
