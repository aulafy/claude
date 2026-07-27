import type { Metadata } from "next";
import {
  Chapter,
  Objetivos,
  Idea,
  Cuidado,
  Cristiano,
  Comprueba,
  Guardar,
  ChapterNav,
  Terminal,
  Nota,
} from "@/components/Book";

export const metadata: Metadata = {
  title: "De chat a agente: tools, MCP, RAG y bucles paso a paso",
  description:
    "Aprende qué cambia entre una llamada a un LLM, una tool, MCP, RAG y un agente mediante cinco etapas ejecutables con Ollama, citas y límites.",
  keywords: [
    "cómo crear un agente de IA",
    "MCP RAG tools diferencias",
    "agentes IA tutorial español",
    "Model Context Protocol ejemplo",
    "RAG paso a paso",
    "bucle agente IA",
  ],
  alternates: {
    canonical: "/cursos/agentes-automatizacion/de-chat-a-agente",
  },
};

const labUrl =
  "https://github.com/aulafy/taller/tree/main/cursos/agentes-automatizacion/laboratorios/de-chat-a-agente";

export default function Page() {
  return (
    <Chapter
      crumb="De chat a agente"
      title="De chat a agente: cinco escalones que no son sinónimos"
      icon="robot"
      lead={<>Un prompt no es una herramienta, MCP no es RAG y ninguno de los dos convierte automáticamente una aplicación en agente. Construiremos el mismo asistente ficticio cinco veces para ver qué capacidad aparece —y qué riesgo se añade— en cada escalón.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
      mission={{
        minutes: 60,
        build:
          "Un asistente local que pasa de responder sin fuentes a buscar una política mediante MCP y finalizar con una cita validada.",
        evidence:
          "Salida de las cinco etapas, protocolo negociado, tool permitida, IDs recuperados, traza del loop y tres condiciones de parada provocadas.",
        steps: [
          "Separa cada concepto",
          "Ejecuta cinco versiones",
          "Rompe y verifica los límites",
        ],
      }}
    >
      <Objetivos>
        <ul>
          <li>Distinguir llamada, tool, MCP, recuperación RAG y agente.</li>
          <li>Observar cuándo el modelo decide y cuándo decide el código.</li>
          <li>Implementar el ciclo MCP sobre <code>stdio</code>.</li>
          <li>Detener repeticiones, pasos excesivos y citas inventadas.</li>
        </ul>
      </Objetivos>

      <Nota title="Estado de verificación">
        Laboratorio comprobado el <strong>27 de julio de 2026</strong> con MCP
        2025-11-25, Node.js 26.4.0, Ollama 0.32.1 y
        <code>gemma3:4b</code>. Sus pruebas no dependen del modelo. Las etapas
        generativas se vuelven a evaluar al cambiar modelo o versión.
      </Nota>

      <Cristiano term="sistema agéntico">
        Es una aplicación donde un modelo puede elegir el siguiente paso según
        el objetivo y lo que observa. El código sigue controlando herramientas,
        permisos, validaciones, presupuesto y parada.
      </Cristiano>

      <div className="prose">
        <h2>El mapa antes del código</h2>
        <p>Estos conceptos pueden combinarse, pero responden a preguntas distintas:</p>
      </div>

      <Terminal>{`LLAMADA AL MODELO
  pregunta: ¿qué texto genera con el contexto recibido?

TOOL
  pregunta: ¿qué función acotada puede ejecutar?

MCP
  pregunta: ¿cómo descubre e invoca esa capacidad con un protocolo común?

RAG
  pregunta: ¿qué evidencia recuperamos antes de pedir una respuesta?

AGENTE
  pregunta: ¿puede elegir el siguiente paso según la observación?

SKILL
  receta reutilizable para hacer una tarea con criterio

SUBAGENTE
  trabajo delegado con contexto y herramientas separados`}</Terminal>

      <Idea>
        Añade complejidad solo cuando puedas señalar qué capacidad nueva aporta.
        Una función local puede bastar sin MCP; una llamada con buen contexto
        puede bastar sin loop; un workflow fijo suele ser más predecible que un
        agente.
      </Idea>

      <div className="prose">
        <h2>Un único caso para comparar</h2>
        <p>Tienda Brújula es una empresa inventada. Su política sintética afirma que las compras online pueden devolverse durante treinta días naturales desde la entrega. Preguntaremos por ese plazo en las cinco versiones.</p>
        <p>Usar siempre la misma pregunta evita confundir una arquitectura mejor con un ejemplo más fácil.</p>
      </div>

      <Terminal>{`OBJETIVO
¿Cuál es el plazo de devolución de una compra online
en Tienda Brújula?

FUENTE SINTÉTICA
[DEV-01] Las compras online pueden devolverse dentro
de los 30 días naturales posteriores a la entrega.`}</Terminal>

      <div className="prose">
        <h2>Prepara el laboratorio</h2>
        <p>El código es MIT, no utiliza cuentas ni dependencias y limita Ollama a loopback. Las pruebas automáticas usan decisiones simuladas para que la seguridad no dependa de que un modelo “se porte bien”.</p>
      </div>

      <Terminal>{`git clone https://github.com/aulafy/taller.git
cd taller/cursos/agentes-automatizacion/laboratorios/de-chat-a-agente

npm run verificar`}</Terminal>

      <Comprueba>
        Deben superar cinco pruebas y una auditoría: recuperación, contrato de
        tool, ciclo MCP, final correcto, repetición, cita inventada y máximo de
        pasos.
      </Comprueba>

      <div className="prose">
        <h2>Etapa 1 · Una llamada no tiene tus datos</h2>
        <p>El modelo recibe la pregunta, pero no la política ficticia. En la ejecución verificada respondió “15 días” e incluso inventó una URL. Eso no demuestra que todos los modelos fallen siempre; demuestra que una frase plausible sin evidencia no es una respuesta de negocio.</p>
      </div>

      <Terminal>{`OLLAMA_MODEL=gemma3:4b npm run etapa:1

salida observada:
  respuesta: "15 días naturales"
  URL citada: inventada
  evidencia: []
  estado: no usar como hecho`}</Terminal>

      <Cuidado>
        Pedir “no alucines” no conecta un modelo con una política ni valida una
        fuente. El sistema debe proporcionar evidencia y comprobar la salida.
      </Cuidado>

      <div className="prose">
        <h2>Etapa 2 · Una tool es una función con contrato</h2>
        <p><code>buscar_politica</code> acepta una consulta breve y devuelve fragmentos con IDs. El código la llama directamente: todavía no hay MCP ni decisión del modelo.</p>
      </div>

      <Terminal>{`npm run etapa:2

entrada:
  tool: buscar_politica
  consulta: "plazo devolución compra online"

salida:
  DEV-01: política online de 30 días
  DEV-02: política de tienda física de 14 días`}</Terminal>

      <div className="prose">
        <p>La tool no acepta rutas, comandos ni nombres arbitrarios. Un esquema estrecho reduce ambigüedad, pero la validación real se realiza también en el servidor.</p>
      </div>

      <div className="prose">
        <h2>Etapa 3 · MCP estandariza la conexión</h2>
        <p>Ahora un cliente inicia un servidor local como subproceso. Ambos intercambian JSON-RPC por entrada y salida estándar. Primero negocian versión y capacidades; después el cliente envía la notificación de inicialización, lista tools y llama a la misma búsqueda.</p>
      </div>

      <Terminal>{`npm run etapa:3

1. initialize
   protocolo solicitado: 2025-11-25
2. notifications/initialized
3. tools/list
   tools: [buscar_politica]
4. tools/call
   resultado: DEV-01, DEV-02
5. cerrar stdin y terminar el subproceso`}</Terminal>

      <Idea>
        MCP no decide cuándo actuar. Define cómo cliente y servidor negocian y
        usan capacidades. La decisión puede pertenecer a una persona, a un
        workflow o a un modelo.
      </Idea>

      <Cuidado>
        La especificación recomienda mantener una persona capaz de denegar
        invocaciones. Si utilizas transporte HTTP, aparecen además autenticación,
        validación de <code>Origin</code>, sesiones y riesgo de exposición. Este
        primer servidor usa <code>stdio</code> y una única tool de lectura.
      </Cuidado>

      <div className="prose">
        <h2>Etapa 4 · RAG añade evidencia antes de generar</h2>
        <p>La recuperación puntúa los documentos y selecciona los fragmentos más próximos a la pregunta. El modelo recibe esos textos y la orden de responder solo con la evidencia y citar sus IDs.</p>
      </div>

      <Terminal>{`OLLAMA_MODEL=gemma3:4b npm run etapa:4

recuperados: [DEV-01, DEV-02]
respuesta observada:
  "30 días naturales posteriores a la entrega [DEV-01]."`}</Terminal>

      <Cuidado>
        RAG no garantiza verdad. Puede recuperar el fragmento equivocado,
        omitir uno necesario o sufrir instrucciones maliciosas dentro del corpus.
        Evalúa recuperación y respuesta por separado.
      </Cuidado>

      <div className="prose">
        <h2>Etapa 5 · El modelo elige el siguiente paso</h2>
        <p>En la última versión, el modelo devuelve una decisión estructurada: buscar o finalizar. El controlador solo reconoce esas dos acciones. Después de cada búsqueda añade la observación y vuelve a preguntar qué hacer.</p>
      </div>

      <Terminal>{`OLLAMA_MODEL=gemma3:4b npm run etapa:5

paso 1
  decisión: buscar_politica
  observación: [DEV-01, DEV-02]

paso 2
  decisión: finalizar
  respuesta: "30 días naturales posteriores a la entrega"
  citas: [DEV-01]

estado: completed
pasos: 2`}</Terminal>

      <div className="prose">
        <h2>El prompt propone; el código limita</h2>
        <ul>
          <li><strong>Allowlist:</strong> solo existe <code>buscar_politica</code>.</li>
          <li><strong>Solo lectura:</strong> no hay shell, rutas, red externa ni escritura.</li>
          <li><strong>Máximo:</strong> tres decisiones por tarea.</li>
          <li><strong>Repetición:</strong> la misma tool con los mismos argumentos corta el bucle.</li>
          <li><strong>Citas:</strong> el final debe citar un ID recuperado durante esa ejecución.</li>
          <li><strong>Destino:</strong> Ollama solo puede usar localhost o una IP de loopback.</li>
        </ul>
      </div>

      <Terminal>{`PROVOCA LOS FALLOS

1. tools/list antes de inicializar
   esperado: sesión no inicializada

2. tool = leer_archivo
   esperado: tool no permitida

3. repetir búsqueda idéntica
   esperado: bucle detenido

4. finalizar con cita FAKE-99
   esperado: cita ausente o inventada

5. seguir después de tres pasos
   esperado: máximo alcanzado`}</Terminal>

      <Comprueba>
        No des por terminada la misión solo porque la respuesta sea “30 días”.
        Explica qué componente aportó evidencia, cuál estandarizó la tool, quién
        eligió cada paso y qué tres reglas impidieron continuar.
      </Comprueba>

      <div className="prose">
        <h2>Cuándo detener la escalera antes</h2>
        <ul>
          <li>Si solo redactas o clasificas con contexto disponible, usa una llamada.</li>
          <li>Si el camino es fijo, usa un workflow y gates deterministas.</li>
          <li>Si una función solo vive dentro de tu aplicación, MCP puede no aportar todavía.</li>
          <li>Si no puedes evaluar la recuperación, no añadas un loop sobre un RAG débil.</li>
          <li>Si una acción tiene impacto, añade vista previa y aprobación humana antes de escritura.</li>
        </ul>
      </div>

      <div className="prose">
        <h2>Fuentes primarias consultadas</h2>
        <ul>
          <li><a href="https://modelcontextprotocol.io/docs/getting-started/intro">Introducción oficial a MCP</a>.</li>
          <li><a href="https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle">Ciclo MCP 2025-11-25</a>.</li>
          <li><a href="https://modelcontextprotocol.io/specification/2025-11-25/basic/transports">Transportes MCP y seguridad</a>.</li>
          <li><a href="https://modelcontextprotocol.io/specification/2025-11-25/server/tools">Contrato y seguridad de tools</a>.</li>
          <li><a href="https://www.anthropic.com/engineering/building-effective-agents">Building effective agents</a>.</li>
          <li><a href="https://arxiv.org/abs/2005.11401">Paper original de RAG</a>.</li>
          <li><a href="https://docs.ollama.com/api/generate">API de generación de Ollama</a>.</li>
        </ul>
        <p>Las publicaciones de X detectadas por el radar de Grok se usaron únicamente para priorizar la necesidad educativa; no sustentan las afirmaciones técnicas.</p>
      </div>

      <Guardar>
        Abre el <a href={labUrl}>laboratorio completo en Aulafy/Taller</a> y guarda
        dos evidencias: la traza correcta de dos pasos y un fallo intencionado
        por cita inventada. Si no puedes explicar ambas, repite antes de añadir
        una tool con escritura.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/mapa", label: "Mapa de agentes" }}
        next={{ href: "/cursos/agentes-automatizacion/subagentes", label: "Subagentes con roles" }}
      />
    </Chapter>
  );
}
