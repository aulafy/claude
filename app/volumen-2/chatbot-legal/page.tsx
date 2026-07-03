import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Un chatbot que responde citando la ley — Claude Code + IA Local",
  description: "Construye un asistente legal privado con RAG que responde citando tus documentos, 100% en tu ordenador. Con nota de privacidad y RGPD.",
};

export default function Page() {
  return (
    <Chapter
      crumb="Un chatbot que cita la ley"
      title="Un chatbot que responde citando la ley"
      icon="legal"
      lead={<>Una aplicación web sencilla donde escribes una pregunta en lenguaje normal —por ejemplo, <em>“¿cuántos días de permiso por mudanza tengo?”</em>— y un asistente te responde <strong>basándose en documentos legales que tú le has dado</strong> (leyes, un convenio, un reglamento en PDF), <strong>citando el fragmento</strong> de donde saca la respuesta. Y lo mejor: <strong>la aplicación funciona entera en tu ordenador</strong>.</>}
    >
      <Cristiano term="“local” de verdad, con un matiz honesto">
        La <em>aplicación</em> corre 100% en tu máquina: cuando la usas, ningún documento se envía a ningún servidor. Ahora bien, para <em>construirla</em> usamos Claude Code, que se apoya en la nube durante el desarrollo (lee y escribe archivos en tu equipo, pero razona en servidores externos). En resumen: privacidad total <em>al usar</em> el asistente; durante la <em>construcción</em>, no pegues datos confidenciales en el chat de Claude Code.
      </Cristiano>

      <Objetivos>
        <ul>
          <li>Qué es un modelo de lenguaje “local” y por qué te interesa para datos sensibles.</li>
          <li>Qué es <strong>RAG</strong>, la técnica que hace que la IA responda con <em>tus</em> documentos y no se los invente.</li>
          <li>Cómo pedirle a Claude Code que te construya la aplicación paso a paso.</li>
          <li>Cómo ejecutarla, guardarla y volver a abrirla otro día.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Conceptos clave (en dos minutos)</h2>
        <p>Antes de teclear nada, entendamos <em>qué</em> estamos montando. Son solo tres ideas.</p>
        <h3>Modelo de lenguaje local</h3>
        <p>Un “modelo de lenguaje” es el cerebro que entiende y redacta texto (lo mismo que hay detrás de un chatbot conocido). <strong>Local</strong> significa que ese cerebro se descarga y se ejecuta en tu propia máquina.</p>
      </div>

      <Cristiano term="modelo local">
        Piensa en la diferencia entre ver una película <em>en streaming</em> (necesitas internet y una cuenta) y tenerla <em>descargada</em> en el disco duro (la ves cuando quieras, sin conexión y sin que nadie sepa qué ves). Un modelo local es la versión “descargada” de la IA: privada, gratuita de usar y siempre disponible.
      </Cristiano>

      <Idea>Para un abogado, una gestoría o cualquiera que maneje datos confidenciales, lo local no es un capricho técnico: es que <strong>los documentos de tus clientes nunca salen de tu ordenador</strong>.</Idea>

      <div className="prose">
        <h3>Por qué la IA “se inventa” cosas y cómo evitarlo</h3>
        <p>Un modelo, por sí solo, responde con lo que “recuerda” de su entrenamiento. A veces acierta y a veces <strong>inventa con total seguridad</strong> (a esto se le llama <em>alucinación</em>). Para un tema legal, eso es inaceptable.</p>
      </div>

      <Cuidado>Esto es una herramienta para <strong>buscar y redactar más rápido</strong>, no un asesor jurídico. RAG <em>reduce</em> mucho los inventos, pero <strong>no los elimina</strong>, y citar un fragmento no garantiza que la interpretación sea correcta. Contrasta siempre con la norma vigente y con criterio profesional.</Cuidado>

      <div className="prose">
        <h3>RAG: darle a la IA los documentos correctos</h3>
        <p>La solución se llama <strong>RAG</strong> (<em>Retrieval-Augmented Generation</em>, o “generación apoyada en búsqueda”). Funciona en dos tiempos:</p>
        <ol>
          <li><strong>Buscar</strong>: cuando preguntas algo, el sistema busca en <em>tus</em> documentos los fragmentos más relacionados con tu pregunta.</li>
          <li><strong>Responder</strong>: le pasa esos fragmentos al modelo y le dice: <em>“responde usando SOLO esto, y cita de dónde lo sacas”</em>.</li>
        </ol>
      </div>

      <Cristiano term="RAG">
        Es la diferencia entre un examen “de memoria” y un examen “con apuntes”. RAG le da apuntes a la IA —tus documentos— justo antes de responder. Así contesta con hechos que puedes verificar, no con lo que cree recordar.
      </Cristiano>

      <Nota title="Requisitos">
        Necesitas tres cosas instaladas: <strong>Claude Code</strong> (para que construya la app), <strong>Node.js</strong> (motor de apps web, desde <a href="https://nodejs.org">nodejs.org</a>, versión LTS) y <strong>Ollama</strong> (ejecuta modelos en local; lo instalamos en el paso 1). Con un portátil de 8 GB de RAM basta para empezar; con 16 GB irá más holgado.
      </Nota>

      <Nota title="Privacidad y RGPD">
        Si indexas expedientes, contratos o datos de clientes, actúas como <strong>responsable del tratamiento</strong>: necesitas <strong>base legal</strong> (ejecución de encargo, interés legítimo documentado o consentimiento), <strong>informar</strong> al interesado y aplicar medidas de seguridad. La IA local ayuda a que los documentos no salgan de tu equipo, pero <strong>no sustituye tu responsabilidad profesional</strong> ni el deber de <strong>secreto profesional</strong> del abogado: revisa siempre las respuestas, no subas más datos de los imprescindibles y no uses expedientes reales mientras construyes el proyecto con Claude Code en la nube.
      </Nota>

      <div className="prose">
        <h2>Paso a paso</h2>
        <h3>Paso 1: instala Ollama y descarga un modelo</h3>
        <p>Ollama es una aplicación gratuita. Descárgala de <a href="https://ollama.com">ollama.com</a> e instálala como cualquier otro programa. Cuando termine, abre la terminal y comprueba que responde:</p>
      </div>

      <Terminal>{`ollama --version`}</Terminal>

      <div className="prose"><p>Ahora descarga un modelo. Usaremos una versión pequeña y capaz, que cabe holgada en un portátil de 8 GB:</p></div>

      <Terminal>{`ollama pull qwen3:4b`}</Terminal>

      <Cristiano term="eso del :4b">
        El <code>:4b</code> indica el “tamaño” del modelo (unos 4.000 millones de parámetros). Cuanto mayor, más listo pero más lento y más memoria necesita. Empieza por <code>4b</code>; si tu equipo es potente, más adelante puedes probar variantes mayores.
      </Cristiano>

      <div className="prose"><p>También necesitamos un modelo “de embeddings”, que es el que sabe <em>buscar</em> fragmentos parecidos:</p></div>

      <Terminal>{`ollama pull nomic-embed-text`}</Terminal>

      <Cristiano term="embeddings">
        Un “embedding” convierte un trozo de texto en una lista de números que representa su <em>significado</em>. Dos textos que hablan de lo mismo tendrán números parecidos. Gracias a eso, el sistema encuentra el fragmento de la ley que <em>significa</em> lo que preguntaste, aunque no uses las mismas palabras.
      </Cristiano>

      <Comprueba>Escribe <code>ollama list</code> y deberías ver <code>qwen3:4b</code> y <code>nomic-embed-text</code>. Eso confirma que están <em>descargados</em>. Para confirmar que Ollama <em>funciona</em>, prueba: <code>ollama run qwen3:4b &quot;hola&quot;</code> y verifica que te contesta.</Comprueba>

      <Cuidado>Ollama tiene que estar <strong>en marcha</strong> para que la app funcione. En Mac y Windows, al instalarlo se abre solo y deja un icono en la barra. Si lo cerraste, ábrelo de nuevo antes de arrancar la aplicación.</Cuidado>

      <div className="prose">
        <h3>Paso 2: crea la carpeta del proyecto</h3>
      </div>

      <Terminal>{`mkdir chatbot-legal
cd chatbot-legal`}</Terminal>

      <div className="prose">
        <h3>Paso 3: pídele a Claude Code que construya la app</h3>
        <p>No vas a escribir el programa a mano. Vas a <strong>describir lo que quieres</strong> y Claude Code lo construirá. Arranca Claude Code dentro de la carpeta con <code>claude</code> y pégale esta petición:</p>
      </div>

      <Prompt>{`Crea una aplicación web sencilla de chat con RAG que funcione 100% en local. Requisitos:
- Usa Ollama con el modelo "qwen3:4b" para responder y "nomic-embed-text" para los embeddings.
- Debe leer los PDF que yo ponga en una carpeta "documentos/": extraer su texto, trocearlo, calcular embeddings y guardar ese índice en local para no recalcularlo cada vez.
- Que haya un comando para reindexar cuando añada PDF nuevos.
- Cuando responda, debe CITAR el fragmento y el archivo del que ha sacado la información.
- Interfaz web mínima: un cuadro de texto y las respuestas debajo.
- Explícame en un README cómo arrancarla y cómo añadir mis PDF.
Hazlo paso a paso y explícame qué archivos creas.`}</Prompt>

      <Idea>Fíjate en cómo está escrita la petición: dice <em>qué</em> queremos, <em>con qué</em> herramientas y <em>cómo</em> debe comportarse (¡que cite!). Un buen encargo produce un buen resultado; es la receta de cuatro partes del capítulo “Escribir buenos encargos”.</Idea>

      <div className="prose">
        <h3>Paso 4: añade tus documentos</h3>
        <p>Copia dentro de la carpeta <code>documentos/</code> los PDF que quieras consultar: un convenio colectivo, el Estatuto de los Trabajadores, un reglamento interno... Puedes arrastrarlos ahí con el explorador de archivos.</p>
      </div>

      <Cuidado>Empieza con <strong>pocos documentos</strong> (uno o dos) para tu primera prueba. Así verificas que todo funciona antes de meterle cientos de páginas.</Cuidado>

      <Idea>La primera vez que añades PDF, la app los <strong>indexa</strong>: los trocea y calcula sus embeddings. Eso puede tardar y es normal —solo pasa una vez por documento—. Cada vez que añadas PDF nuevos, ejecuta el comando de reindexar del README; si no, la app no “verá” los documentos recién copiados.</Idea>

      <div className="prose">
        <h2>Ejecutar en tu ordenador</h2>
        <p>Con los documentos en su sitio, arranca la aplicación (el README te dirá el comando exacto):</p>
      </div>

      <Terminal>{`npm install
npm run dev`}</Terminal>

      <Cristiano term="npm install / npm run dev">
        <code>npm install</code> descarga las piezas que la aplicación necesita (se hace una sola vez). <code>npm run dev</code> enciende la aplicación en tu ordenador en “modo desarrollo”, para que puedas probarla.
      </Cristiano>

      <div className="prose"><p>En la terminal verás una dirección local, parecida a <code>http://localhost:3000</code>. Ábrela en tu navegador, escribe una pregunta sobre tus documentos y pulsa Enter.</p></div>

      <Comprueba>La respuesta debería aparecer <strong>acompañada de una cita</strong>: el trozo de texto y el nombre del PDF de donde salió. Si ves la respuesta <em>y</em> su fuente, ¡lo has conseguido! Tienes un asistente legal privado funcionando en tu máquina.</Comprueba>

      <Guardar>
        Tu proyecto es la carpeta <code>chatbot-legal</code>. <strong>Para cerrar hoy:</strong> pulsa <code>Ctrl + C</code> en la terminal donde corre la app y cierra la ventana. <strong>Para volver otro día:</strong> abre la terminal, entra con <code>cd chatbot-legal</code> y arranca con <code>npm run dev</code> (el <code>npm install</code> no hace falta repetirlo). Abre otra vez <code>http://localhost:3000</code>.
      </Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>“command not found: ollama”</strong> — Ollama no está instalado o hay que reabrir la terminal.</li>
          <li><strong>Error de conexión</strong> — asegúrate de que Ollama está en marcha (icono en la barra). Comprueba con <code>ollama list</code>.</li>
          <li><strong>Responde muy lento</strong> — normal en la primera pregunta. Si tu equipo es modesto, prueba <code>ollama pull qwen3:4b</code> y pídele a Claude Code que lo use.</li>
          <li><strong>No cita bien o mezcla documentos</strong> — empieza con menos PDF y preguntas más concretas.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Pídele a Claude Code que añada un botón para <strong>borrar la conversación</strong>, que muestre <strong>la fecha de la ley</strong> junto a cada cita, y prueba un modelo más potente si tu equipo lo permite.</p>
      </div>

      <ChapterNav prev={{ href: "/cursos/ia-local/depurar", label: "Cuando algo se rompe" }} next={{ href: "/cursos/ia-local/pdf", label: "Pregúntale a tus PDF" }} />
    </Chapter>
  );
}
