import type { Metadata } from "next";
import Link from "next/link";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Curso de observabilidad de agentes: Langfuse, Ollama y OpenTelemetry",
  description:
    "Laboratorio paso a paso para instrumentar agentes con Langfuse, Ollama y OpenTelemetry: trazas, RAG, tools, evals, privacidad y lectura de fallos.",
  keywords: ["curso observabilidad agentes IA", "Langfuse Ollama tutorial", "tracing agentes IA", "OpenTelemetry agentes LLM"],
  alternates: { canonical: "/cursos/agentes-produccion/observabilidad-agentes-locales" },
};

const modulos = [
  ["1", "Mapa y objetivo", "Esta lección. Distingue trace, span, generation y score antes de instalar nada."],
  ["2", "Setup: Langfuse + Ollama", "Elige Cloud o local, prepara variables y valida que cada servicio responde."],
  ["3", "Primera traza", "Instrumenta una llamada a Ollama y comprueba la generación en Langfuse."],
  ["4", "RAG trazable", "Registra recuperación, fuentes y respuesta sin volcar el documento completo."],
  ["5", "Tools y loops", "Observa decisiones, límites y errores de herramientas de un agente."],
  ["6", "Evals y scores", "Convierte una impresión de calidad en pruebas y señales comparables."],
  ["7", "Privacidad y producción", "Define minimización, retención, acceso y umbrales operativos."],
  ["8", "Leer una traza", "Diagnostica una ejecución mala y decide qué cambiar con evidencia."],
] as const;

export default function Page() {
  return (
    <Chapter
      crumb="Laboratorio de observabilidad"
      title="Observabilidad para agentes locales"
      icon="chart"
      lead={<>Este es un curso de construcción, no una colección de definiciones. Al terminar tendrás un agente pequeño con una traza que explica qué ocurrió, una política mínima de datos y un método para corregir fallos sin adivinar.</>}
      courseHref="/cursos/agentes-produccion"
      courseLabel="Agentes en producción"
    >
      <Objetivos>
        <ul>
          <li>Construir una traza útil de una tarea, no una acumulación de logs sin contexto.</li>
          <li>Instrumentar Ollama y después extender el patrón a RAG y tools.</li>
          <li>Evaluar, proteger y leer ejecuciones con un criterio repetible.</li>
        </ul>
      </Objetivos>

      <Cristiano term="resultado verificable">
        Una ejecución de prueba deja una traza con una generación, sus tiempos, la versión de la aplicación y un identificador seudónimo. Puedes abrirla y explicar por qué la respuesta fue buena, mala o incompleta.
      </Cristiano>

      <div className="prose">
        <h2>Antes de empezar: qué vas a construir</h2>
        <p>
          Usaremos un asistente de soporte ficticio. La primera versión responde una pregunta con Ollama. Después añadiremos recuperación de fuentes, una herramienta simulada y una evaluación. No usa clientes reales, ni secretos en el navegador, ni automatiza acciones externas.
        </p>
        <h2>La ruta del laboratorio</h2>
        <ol>
          {modulos.map(([numero, titulo, descripcion]) => (
            <li key={numero}><strong>Módulo {numero}: {titulo}.</strong> {descripcion}</li>
          ))}
        </ol>
      </div>

      <Terminal>{`pregunta del usuario
        │
        ▼
trace: resolver-consulta
  ├─ generation: ollama-chat
  ├─ span: recuperar-fuentes      (módulo 4)
  ├─ tool: consultar-estado       (módulo 5)
  └─ score: respuesta-fundamentada (módulo 6)`}</Terminal>

      <Idea>
        Empieza por una sola ruta crítica. Si no puedes explicar una ejecución sencilla, instrumentar diez workflows a la vez solo hará más difícil saber qué está fallando.
      </Idea>

      <div className="prose">
        <h2>Material de trabajo</h2>
        <p>
          El código de acompañamiento está en <a href="https://github.com/aulafy/taller/tree/main/cursos/agentes-produccion/laboratorios/observabilidad-agentes-ollama" target="_blank" rel="noopener noreferrer">Aulafy Taller: observabilidad de agentes con Ollama</a>. Es MIT, usa datos sintéticos y cada módulo tiene una comprobación declarada. Si aún no está publicado en tu rama, lee primero esta ruta y usa el repositorio cuando aparezca como disponible.
        </p>
      </div>

      <Cuidado>
        «Local» no equivale automáticamente a «seguro» ni a «gratis». Langfuse Cloud, Docker, almacenamiento de trazas, una GPU y el tiempo de revisión tienen costes o límites. No expongas un panel de trazas a Internet ni copies credenciales en el repositorio.
      </Cuidado>

      <Comprueba>
        Escribe ahora una pregunta de depuración concreta: «¿podré distinguir si una respuesta mala viene del modelo, del contexto recuperado, de una tool o de una política?». Ese será el criterio para decidir qué registrar en los módulos siguientes.
      </Comprueba>

      <Guardar>
        Una traza vale cuando permite tomar una decisión: corregir una fuente, limitar una tool, cambiar un prompt, pedir revisión humana o no desplegar todavía.
      </Guardar>

      <div className="prose">
        <h2>Amplía el mapa conceptual</h2>
        <p>Para consultar la explicación de referencia y las fuentes oficiales, ve a <Link href="/observabilidad-agentes-locales-langfuse">Observabilidad de agentes de IA con Langfuse y OpenTelemetry</Link>.</p>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/agentes-produccion/evals-logs", label: "Evals, logs y observabilidad" }}
        next={{ href: "/cursos/agentes-produccion/setup-langfuse-ollama", label: "Setup: Langfuse y Ollama" }}
      />
    </Chapter>
  );
}
