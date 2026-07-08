import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Conecta Claude Code con tu IA local",
  description:
    "Tres formas de combinar Claude Code con Ollama y LM Studio: apps locales, pasarela local y flujo híbrido recomendado.",
  alternates: { canonical: "/cursos/ia-local/conectar-ollama" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Conecta Claude Code con tu IA local"
      title="Conecta Claude Code con tu IA local"
      icon="plug"
      lead={<>Es una de las preguntas más repetidas de la comunidad: <em>“tengo Ollama y tengo Claude Code… ¿cómo los junto?”</em>. En esta lección ves las <strong>tres formas</strong> de combinarlos, cuándo usar cada una y cómo montar la conexión paso a paso.</>}
    >
      <Objetivos>
        <ul>
          <li>Las tres arquitecturas: app→local, Claude Code→local y el híbrido.</li>
          <li>Montar una pasarela para que Claude Code hable con Ollama o LM Studio.</li>
          <li>Elegir con criterio: qué tarea va al modelo local y cuál a la nube.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Las tres formas de juntarlos</h2>
        <ol>
          <li><strong>Tus apps usan la IA local</strong> — Claude Code <em>construye</em> la aplicación y la aplicación habla con Ollama. Es lo que has hecho en todo este curso (chatbot legal, PDF, voz…). La más útil en la práctica.</li>
          <li><strong>Claude Code usa un modelo local como cerebro</strong> — en vez de los modelos de Anthropic, Claude Code envía sus peticiones a tu Ollama/LM Studio a través de una <em>pasarela</em>. Máxima privacidad, pero con límites importantes (ahora los vemos).</li>
          <li><strong>Híbrido</strong> — cada tarea a su modelo: la nube para construir y razonar, lo local para lo repetitivo, lo privado y lo gratuito. Es lo que recomiendo y lo que usa la mayoría de gente con experiencia.</li>
        </ol>
      </div>

      <Cristiano term="pasarela (proxy)">
        Claude Code habla “idioma Anthropic” y Ollama/LM Studio hablan “idioma OpenAI”. Una <em>pasarela</em> es un pequeño programa traductor que se pone en medio: recibe las peticiones de Claude Code y se las pasa a tu modelo local en su idioma. La más usada es <strong>LiteLLM</strong> (open source).
      </Cristiano>

      <Cuidado>
        Expectativas honestas: un modelo local de 4–14B <strong>no rinde como Claude</strong> para trabajo de agente (editar muchos archivos, usar herramientas, razonar largo). Funciona para chat, resúmenes o código sencillo. Si pones un modelo local de cerebro de Claude Code, notarás la diferencia: úsalo para tareas ligeras o cuando la privacidad mande, no para todo.
      </Cuidado>

      <Nota title="Requisitos">
        <strong>Claude Code</strong>, <strong>Ollama</strong> con un modelo descargado (por ejemplo <code>qwen3:4b</code>) y <strong>Python</strong> (para instalar la pasarela LiteLLM). Con LM Studio el proceso es el mismo: su servidor local también habla “idioma OpenAI”.
      </Nota>

      <div className="prose">
        <h2>Vía 1 (repaso): tu app habla con Ollama</h2>
        <p>Ya la dominas: Ollama expone un servidor local en <code>http://localhost:11434</code> y tus aplicaciones le piden respuestas. Es la arquitectura de todos los proyectos de este curso. Si vienes directo a esta lección, empieza por el capítulo de <em>IA local</em>.</p>

        <h2>Vía 2: Claude Code con cerebro local (pasarela)</h2>
        <h3>Paso 1: instala y configura LiteLLM</h3>
      </div>

      <Terminal>{`pip install 'litellm[proxy]'`}</Terminal>

      <div className="prose"><p>Crea un archivo <code>config.yaml</code> en una carpeta nueva (por ejemplo <code>~/proyectos-ia/pasarela</code>):</p></div>

      <Terminal>{`model_list:
  - model_name: local
    litellm_params:
      model: ollama/qwen3:4b
      api_base: http://localhost:11434`}</Terminal>

      <div className="prose"><h3>Paso 2: arranca la pasarela</h3></div>

      <Terminal>{`litellm --config config.yaml
# queda escuchando en http://localhost:4000`}</Terminal>

      <div className="prose"><h3>Paso 3: apunta Claude Code a tu pasarela</h3><p>En otra terminal, arranca Claude Code con estas variables de entorno:</p></div>

      <Terminal>{`export ANTHROPIC_BASE_URL=http://localhost:4000
export ANTHROPIC_AUTH_TOKEN=local
export ANTHROPIC_MODEL=local
claude`}</Terminal>

      <Cristiano term="variables de entorno">
        Son “notas” que le dejas a un programa antes de arrancarlo. Aquí le dicen a Claude Code: “no llames a Anthropic; llama a esta dirección de mi ordenador”. Solo valen para esa terminal: al cerrarla, todo vuelve a la normalidad. Para volver a la nube, abre una terminal nueva y ejecuta <code>claude</code> como siempre.
      </Cristiano>

      <Comprueba>
        Con la pasarela en marcha, pregunta algo sencillo en Claude Code (“¿de qué color es el cielo?”). Si responde, la cadena Claude Code → LiteLLM → Ollama funciona. Verás la petición aparecer en la terminal de LiteLLM: esa es la prueba de que todo pasa por tu máquina.
      </Comprueba>

      <Cuidado>
        Si Claude Code se queja o responde raro con herramientas (leer archivos, ejecutar comandos), es la limitación esperada del modelo pequeño, no un fallo de tu montaje. Prueba un modelo mayor si tu equipo puede, o usa esta vía solo para chat y consultas.
      </Cuidado>

      <div className="prose">
        <h2>Vía 3: el híbrido (recomendado)</h2>
        <p>La configuración ganadora en 2026 no es “todo local” ni “todo nube”, sino repartir:</p>
        <ul>
          <li><strong>Claude Code (nube)</strong> → construir apps, refactorizar, depurar, tareas de agente.</li>
          <li><strong>Ollama/LM Studio (local)</strong> → el cerebro de tus aplicaciones, chat privado con documentos, resúmenes masivos, todo lo repetitivo que no quieres pagar.</li>
        </ul>
        <p>Así cada euro de tu suscripción va a lo que de verdad lo necesita, y tus datos sensibles nunca salen de casa. Además alivia otro dolor típico: <strong>quemar los límites del plan</strong> — de eso hablamos en la lección de contexto y costes del curso de Claude Code.</p>
      </div>

      <Idea>
        Regla mental rápida: si la tarea necesita <em>criterio</em> (decidir, diseñar, tocar muchos archivos), nube. Si necesita <em>volumen</em> (mucho texto, muchas veces, datos privados), local.
      </Idea>

      <Guardar>
        Tu pasarela es la carpeta <code>~/proyectos-ia/pasarela</code> (el <code>config.yaml</code>). Para cerrarla: <code>Ctrl + C</code> en su terminal. Para reabrirla otro día: <code>cd ~/proyectos-ia/pasarela</code> y <code>litellm --config config.yaml</code>. Recuerda que las variables de entorno hay que ponerlas en cada terminal nueva (o pídele a Claude Code que te cree un alias para no repetirlas).
      </Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>“connection refused” en el puerto 4000</strong> — la pasarela no está arrancada, o la arrancaste en otra carpeta sin el config.</li>
          <li><strong>La pasarela no encuentra el modelo</strong> — comprueba <code>ollama list</code>: el nombre en <code>config.yaml</code> debe coincidir exactamente (<code>ollama/qwen3:4b</code>).</li>
          <li><strong>Respuestas lentas</strong> — normal: tu máquina hace todo el trabajo. Modelo más pequeño o vía híbrida.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Monta la pasarela y haz la misma pregunta a Claude Code en modo local y en modo nube. Compara calidad y velocidad. Ese contraste te dará el criterio exacto de qué tareas merecen cada cerebro.</p>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/ollama-desde-cero", label: "Ollama desde cero" }}
        next={{ href: "/cursos/ia-local/troubleshooting-ollama", label: "Soluciona errores de Ollama" }}
      />
    </Chapter>
  );
}
