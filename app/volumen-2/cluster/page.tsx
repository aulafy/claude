import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav } from "@/components/Book";

export const metadata: Metadata = {
  title: "Varios ordenadores, una sola IA — Claude Code + IA Local",
  description: "Une varios ordenadores en red con exo para ejecutar modelos de IA más grandes de los que cabrían en uno solo. Tu mini centro de datos en casa.",
};

export default function Page() {
  return (
    <Chapter
      crumb="Varios ordenadores, una IA"
      title="Varios ordenadores, una sola IA"
      icon="network"
      lead={<>El capítulo más ambicioso: unir <strong>varios ordenadores en red</strong> para que trabajen juntos y ejecuten modelos de IA más grandes de los que cabrían en uno solo. Si tienes un par de portátiles o Macs por casa, puedes montar tu propio “mini centro de datos”.</>}
    >
      <Objetivos>
        <ul>
          <li>Qué es un clúster de inferencia y cuándo merece la pena.</li>
          <li>Usar <strong>exo</strong> para repartir un modelo entre varios equipos.</li>
          <li>Conectar los ordenadores por red local (Ethernet o Thunderbolt).</li>
        </ul>
      </Objetivos>

      <div className="prose"><h2>Conceptos clave</h2></div>

      <Cristiano term="clúster e “inferencia”">
        <em>Inferencia</em> es simplemente “usar” el modelo (que responda). Un <em>clúster</em> es un grupo de ordenadores que colaboran como si fueran uno. Repartir la inferencia entre varios equipos permite ejecutar modelos que no caben en la memoria de uno solo: cada máquina se encarga de una parte.
      </Cristiano>

      <Idea>¿Cuándo merece la pena? Cuando quieres usar un modelo <strong>grande</strong> (que no entra en tu equipo) y tienes <strong>varios ordenadores</strong> disponibles. Para el uso normal del libro, un solo equipo basta; esto es el siguiente nivel.</Idea>

      <div className="prose">
        <h2>exo: el clúster casero</h2>
        <p><strong>exo</strong> (de exolabs) es un proyecto open source que une automáticamente los ordenadores de tu red y reparte el modelo entre ellos. En 2026 es una herramienta madura: detecta los equipos, equilibra la carga según la potencia de cada uno y aprovecha conexiones rápidas como Thunderbolt.</p>
      </div>

      <Cristiano term="¿y Ollama o LM Studio?">
        Ollama y LM Studio están pensados para <em>un</em> ordenador. exo es la pieza que los lleva a <em>varios</em>: coordina el conjunto. También existen otras vías (por ejemplo, el modo de red de llama.cpp), pero exo es la más sencilla para empezar en casa.
      </Cristiano>

      <Nota title="Requisitos">
        <ul>
          <li><strong>Dos o más ordenadores</strong> (Macs con chip M y/o PCs). Cuantos más y más potentes, modelos más grandes.</li>
          <li>Todos en la <strong>misma red local</strong>. Lo ideal es conectarlos por <strong>cable Ethernet</strong> (o Thunderbolt entre Macs): mucho más rápido y estable que el wifi.</li>
          <li><strong>Claude Code</strong> en uno de ellos para guiarte en la instalación de exo en cada equipo.</li>
        </ul>
      </Nota>

      <div className="prose">
        <h2>Paso a paso (en líneas generales)</h2>
        <p>El montaje exacto lo verás en la documentación de exo, pero la idea es esta:</p>
        <ol>
          <li>Conecta todos los ordenadores a la misma red (mejor por cable).</li>
          <li>Instala exo en <strong>cada</strong> equipo. Pídele a Claude Code en cada uno: “ayúdame a instalar exo y a comprobar que arranca”.</li>
          <li>Arranca exo en todos. Se <strong>descubren entre sí</strong> automáticamente y forman el clúster.</li>
          <li>Desde cualquiera de ellos, lanza un modelo grande: exo lo reparte entre las máquinas y expone un punto de acceso común para tus aplicaciones.</li>
        </ol>
      </div>

      <Cuidado>La red es el cuello de botella. Con <strong>wifi</strong> funcionará, pero lento; con <strong>Ethernet</strong> o Thunderbolt notarás la diferencia. Si va a trompicones, lo primero que hay que mirar es la conexión entre equipos.</Cuidado>

      <Comprueba>Cuando exo esté en marcha en todos los equipos, debería mostrarte cuántos nodos ha detectado y la memoria total combinada. Si ves más de un nodo y la suma de memoria de tus máquinas, <strong>el clúster está formado</strong>. Lanza una pregunta a un modelo grande y observa cómo responde algo que un solo equipo no podría cargar.</Comprueba>

      <Guardar>Un clúster no es un “proyecto” con carpeta: es una configuración de tus equipos. Anota en un documento qué ordenadores lo forman, cómo los conectas y el comando para arrancar exo en cada uno, para poder reconstruirlo en minutos cuando lo necesites.</Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>No se ven entre ellos</strong> — confirma que están en la misma red y que ningún cortafuegos bloquea exo.</li>
          <li><strong>Va muy lento</strong> — pasa de wifi a cable; comprueba que ningún equipo esté saturado por otra tarea.</li>
          <li><strong>Un equipo tira del rendimiento hacia abajo</strong> — exo reparte según capacidad, pero un nodo muy débil puede lastrar; pruébalo con y sin él.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Mide la diferencia: ejecuta el modelo más grande que quepa en <strong>un</strong> equipo y luego uno mayor con el <strong>clúster</strong>. Compara qué modelos puedes usar en cada caso. Habrás construido tu propia infraestructura de IA en casa.</p>
      </div>

      <ChapterNav prev={{ href: "/volumen-2/publicar", label: "Publica tu app" }} />
    </Chapter>
  );
}
