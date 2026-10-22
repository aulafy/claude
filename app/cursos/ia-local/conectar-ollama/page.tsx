import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Conecta Claude Code con tu IA local",
  description:
    "Conecta Claude Code, Codex y OpenCode con Ollama mediante ollama launch, modelos locales o cloud y un flujo híbrido verificable.",
  alternates: { canonical: "/cursos/ia-local/conectar-ollama" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Conecta Claude Code con tu IA local"
      title="Conecta Claude Code con tu IA local"
      icon="plug"
      lead={<>Ollama ya integra directamente Claude Code, Codex CLI y OpenCode. En esta lección conectas un agente sin una pasarela manual, eliges entre modelo local y cloud y compruebas qué ruta siguen tus datos.</>}
    >
      <Objetivos>
        <ul>
          <li>Distinguir app→Ollama, agente→Ollama y flujo híbrido.</li>
          <li>Lanzar Claude Code, Codex CLI u OpenCode con la integración oficial.</li>
          <li>Elegir con criterio: qué tarea va al modelo local y cuál a la nube.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Tres arquitecturas útiles</h2>
        <ol>
          <li><strong>Tus apps usan la IA local</strong> — Claude Code <em>construye</em> la aplicación y la aplicación habla con Ollama. Es lo que has hecho en todo este curso (chatbot legal, PDF, voz…). La más útil en la práctica.</li>
          <li><strong>El agente usa Ollama</strong> — <code>ollama launch</code> prepara una sesión de Claude Code, Codex CLI u OpenCode con un modelo local o cloud compatible.</li>
          <li><strong>Híbrido</strong> — eliges local para privacidad y control, y cloud cuando necesitas un modelo que no cabe en tu equipo o más capacidad.</li>
        </ol>
      </div>

      <Cristiano term="ollama launch">
        Es el lanzador oficial de integraciones de Ollama. Prepara la configuración necesaria para el agente durante esa sesión, deja elegir un modelo compatible y evita mantener un proxy manual solo para empezar.
      </Cristiano>

      <Cuidado>
        Expectativas honestas: un modelo local de 4–14B <strong>no rinde como Claude</strong> para trabajo de agente (editar muchos archivos, usar herramientas, razonar largo). Funciona para chat, resúmenes o código sencillo. Si pones un modelo local de cerebro de Claude Code, notarás la diferencia: úsalo para tareas ligeras o cuando la privacidad mande, no para todo.
      </Cuidado>

      <div className="prose">
        <h2>1. Comprueba Ollama y el modelo</h2>
        <p>Instala primero el agente que quieras usar. Codex CLI, por ejemplo, se instala aparte. Después comprueba Ollama y descarga un modelo local con soporte de herramientas; si eliges cloud, inicia sesión.</p>
      </div>

      <Terminal>{`ollama --version
ollama list
ollama pull NOMBRE:TAG
# solo si usarás cloud
ollama signin`}</Terminal>

      <div className="prose">
        <h2>2. Lanza el agente desde tu proyecto</h2>
      </div>

      <Terminal>{`cd ruta/a/tu/proyecto

# elige uno
ollama launch claude
ollama launch codex
ollama launch opencode`}</Terminal>

      <Comprueba>
        Dentro del agente, pide «explica cómo está organizado este repositorio» y revisa qué archivos lee. En Codex puedes usar <code>/model</code> para cambiar entre los modelos Ollama instalados y compatibles sin reiniciar la sesión.
      </Comprueba>

      <Cuidado>
        Ollama recomienda al menos 64K de contexto para Codex y Claude Code. Un modelo pequeño puede conversar bien y fallar al mantener contexto, llamar herramientas o editar varios archivos. Comprueba la ficha del modelo y prueba primero en un repositorio desechable.
      </Cuidado>

      <div className="prose">
        <h2>3. Decide local o cloud de forma explícita</h2>
        <ul>
          <li><strong>Modelo local:</strong> datos y cálculo permanecen en tu equipo, pero necesitas memoria, contexto y capacidad de herramientas suficientes.</li>
          <li><strong>Modelo cloud de Ollama:</strong> no se descarga; requiere sesión y procesa la petición fuera del equipo.</li>
          <li><strong>Otro proveedor cloud:</strong> puede seguir siendo la mejor opción para tareas difíciles; documenta el proveedor y no mezcles secretos o datos privados por comodidad.</li>
        </ul>
      </div>

      <Idea>
        No uses una etiqueta como regla universal. Ejecuta el mismo conjunto pequeño de tareas con dos modelos y compara éxito, tiempo, memoria y coste. La ruta ganadora es la que pasa tus pruebas con el tratamiento de datos aceptable.
      </Idea>

      <Guardar>
        Guarda versión de Ollama, agente, nombre exacto del modelo, local o cloud, ventana de contexto, hardware y cinco tareas de prueba. Esa evidencia vale más que una lista de «mejores modelos» que caduca cada semana.
      </Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>El comando del agente no existe</strong> — instala primero Claude Code, Codex CLI u OpenCode; el lanzador de Ollama no sustituye todos los instaladores.</li>
          <li><strong>El modelo no aparece</strong> — ejecuta <code>ollama list</code>, descarga el modelo y confirma que soporta herramientas.</li>
          <li><strong>Se pierde en el repositorio</strong> — aumenta el contexto hasta 64K o más si tu memoria lo permite, reduce el alcance o cambia de modelo.</li>
          <li><strong>No sabes si es local</strong> — revisa el modelo seleccionado: una variante <code>:cloud</code> se ejecuta fuera de tu equipo.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Lanza un agente con un modelo local y otro cloud. Pide a ambos que expliquen un archivo y propongan un test sin modificar nada. Compara exactitud, tiempo, contexto utilizado y tratamiento de datos.</p>

        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.ollama.com/integrations/claude-code" target="_blank" rel="noopener noreferrer">Ollama + Claude Code</a></li>
          <li><a href="https://docs.ollama.com/integrations/codex" target="_blank" rel="noopener noreferrer">Ollama + Codex CLI</a></li>
          <li><a href="https://docs.ollama.com/cloud" target="_blank" rel="noopener noreferrer">Ollama Cloud</a></li>
          <li><a href="https://docs.ollama.com/context-length" target="_blank" rel="noopener noreferrer">Ventana de contexto</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/ollama-desde-cero", label: "Ollama desde cero" }}
        next={{ href: "/cursos/ia-local/troubleshooting-ollama", label: "Soluciona errores de Ollama" }}
      />
    </Chapter>
  );
}
