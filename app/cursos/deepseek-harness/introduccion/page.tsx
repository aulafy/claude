import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "DeepSeek Harness (DSH): qué es y cómo funciona — Aulafy",
  description: "Primera fase del tutorial de DeepSeek Harness: entiende el modelo más el harness, los plugins, las sesiones y las ventajas reales de un runtime de agentes open source.",
  keywords: ["DeepSeek Harness", "DSH tutorial", "agentes open source", "Cordis", "plugins IA"],
  alternates: { canonical: "/cursos/deepseek-harness/introduccion" },
};

export default function Page() {
  return (
    <Chapter
      crumb="DeepSeek Harness · Fase 1"
      title="Qué es DeepSeek Harness y por qué importa"
      icon="terminal"
      lead={<>DeepSeek Harness (DSH) es una capa de ejecución para convertir un modelo de lenguaje en un agente capaz de leer y editar archivos, usar herramientas, mantener sesiones y pedir aprobaciones. Esta serie de diez fases va de la primera instalación a los flujos locales y auditables.</>}
      courseHref="/cursos/deepseek-harness"
      courseLabel="DeepSeek Harness (DSH)"
    >
      <Cuidado>
        DSH está en una etapa temprana y su interfaz, paquetes y nombres de modelos pueden cambiar. Comprueba siempre la documentación y el repositorio oficiales antes de usar comandos en producción. Las cifras de rendimiento de la comunidad son orientativas, no garantías.
      </Cuidado>

      <Objetivos>
        <ul>
          <li>Distinguir entre el modelo y el harness que lo convierte en agente.</li>
          <li>Entender plugins, perfiles, sesiones, workspaces y subagentes.</li>
          <li>Elegir entre API y modelos locales según privacidad, coste y hardware.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>La fórmula: modelo + harness</h2>
        <p>El modelo aporta la capacidad de interpretar instrucciones y generar decisiones. El harness aporta el cuerpo operativo: herramientas, permisos, memoria de sesión, interfaz, registro de acciones y un bucle que decide cuándo llamar a cada herramienta.</p>
      </div>

      <Terminal>{`Agent = Model + Harness

Model: razonamiento y generación
Harness: herramientas, permisos, sesiones y trazabilidad`}</Terminal>

      <div className="prose">
        <h2>Todo es un plugin</h2>
        <p>La idea central de DSH es que el modelo, las herramientas, las skills, la sesión, el almacenamiento y la interfaz puedan intercambiarse como piezas. Esto permite probar distintos proveedores y construir perfiles especializados sin reescribir todo el agente.</p>
        <ul>
          <li><strong>Profile:</strong> configuración combinable de plugins y permisos.</li>
          <li><strong>Session:</strong> registro de prompts, decisiones, llamadas y resultados.</li>
          <li><strong>Workspace:</strong> carpeta explícita sobre la que el agente puede trabajar.</li>
          <li><strong>Skills:</strong> instrucciones reutilizables para tareas concretas.</li>
          <li><strong>Subagents:</strong> agentes secundarios para dividir una misión compleja.</li>
        </ul>
      </div>

      <Idea>
        La ventaja no es que DSH “sepa más” por sí solo. La ventaja es que hace visible y configurable todo lo que rodea al modelo: qué puede tocar, qué herramientas usa, qué queda registrado y cuándo debe pedir permiso.
      </Idea>

      <div className="prose">
        <h2>Cloud y local</h2>
        <p>Puedes empezar con un proveedor cloud para obtener mejor velocidad y después conectar un endpoint compatible con OpenAI, como Ollama, para probar modelos locales. En una GPU de 24 GB suelen ser más realistas los modelos pequeños o destilados; los modelos muy grandes con offload a SSD pueden funcionar, pero con una latencia demasiado alta para una conversación fluida.</p>
        <p>La decisión correcta depende de la tarea: privacidad y coste favorecen lo local; velocidad, contexto y capacidad máxima pueden favorecer una API. Mide el resultado completo, no solo los tokens por segundo.</p>
      </div>

      <div className="prose">
        <h2>Rutas previas que conviene leer antes</h2>
        <ul>
          <li><a href="/cursos/ia-local/ollama-desde-cero">Ollama desde cero</a>.</li>
          <li><a href="/cursos/ia-local/conectar-ollama">Conecta Claude Code con tu IA local</a>.</li>
          <li><a href="/cursos/ia-local/troubleshooting-ollama">Soluciona errores de Ollama</a>.</li>
          <li><a href="/cursos/ia-local/ollama-gpu-windows">Ollama no usa la GPU en Windows</a>.</li>
          <li><a href="/cursos/ia-pymes/ollama-piloto-seguro">Ollama para pymes: prueba local, segura y medible</a>.</li>
        </ul>
        <p>Esas páginas ya cubren la base operativa; esta serie de DSH entra después para convertir ese conocimiento en un harness de agentes controlable y auditable.</p>
      </div>

      <div className="prose">
        <h2>Mapa de las diez fases</h2>
        <ol>
          <li>Introducción y arquitectura.</li>
          <li>Instalación y primera sesión de solo lectura.</li>
          <li>Modelos oficiales, proveedores y Ollama.</li>
          <li>Standard, Code/PTC, Minimal y Creator.</li>
          <li>Workspaces, permisos y seguridad.</li>
          <li>Plugins y perfiles personalizados.</li>
          <li>Subagentes, skills y orquestación.</li>
          <li>Cuantización y modelos locales.</li>
          <li>Casos de uso, métricas y benchmarks.</li>
          <li>Problemas frecuentes y producción.</li>
        </ol>
      </div>

      <Comprueba>
        Escribe con tus palabras qué parte corresponde al modelo y qué parte al harness. Después dibuja el límite de un workspace de prueba y anota qué acción exigiría aprobación humana.
      </Comprueba>

      <Guardar>
        Piensa en DSH como una arquitectura de agente configurable y auditable, no como un clon mágico de otra herramienta. Esa distinción te ayudará a elegir modelos, plugins y permisos con criterio.
      </Guardar>

      <ChapterNav next={{ href: "/cursos/deepseek-harness/instalacion", label: "Instalación y primera sesión segura" }} />
    </Chapter>
  );
}
