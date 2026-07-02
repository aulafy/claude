import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Simulaciones 3D para explicar en clase — Claude Code + IA Local",
  description: "Crea escenas 3D interactivas en el navegador con Three.js y React Three Fiber para clases, cursos y presentaciones.",
};

export default function Page() {
  return (
    <Chapter
      crumb="Simulaciones 3D"
      title="Simulaciones 3D para explicar en clase"
      icon="cube"
      lead={<>Una escena <strong>3D interactiva</strong> en el navegador —por ejemplo el sistema solar, una molécula o una figura geométrica que se puede girar y explorar— para usar en clases, cursos o presentaciones. Funciona en cualquier navegador moderno.</>}
    >
      <Objetivos>
        <ul>
          <li>Qué son Three.js y React Three Fiber y para qué sirven.</li>
          <li>Crear una escena 3D interactiva describiéndosela a Claude Code.</li>
          <li>Publicarla para compartirla con tus alumnos.</li>
        </ul>
      </Objetivos>

      <div className="prose"><h2>Conceptos clave</h2></div>

      <Cristiano term="Three.js y React Three Fiber">
        <strong>Three.js</strong> es la biblioteca estándar para dibujar gráficos 3D en el navegador. <strong>React Three Fiber</strong> (R3F) es una forma más cómoda de usar Three.js dentro de aplicaciones web modernas. Tú no tienes que aprender ninguna de las dos: se las describes a Claude Code y él escribe el código.
      </Cristiano>

      <Idea>A fecha de 2026, Three.js (versión r185) y React Three Fiber (v9) siguen siendo el estándar para 3D en la web. Es tecnología madura y muy bien soportada: lo que construyas hoy seguirá funcionando.</Idea>

      <Nota title="Requisitos">
        Solo <strong>Claude Code</strong> y <strong>Node.js</strong>. Este proyecto <em>no</em> necesita IA local: es una aplicación web 3D. La IA (Claude Code) se usa para <em>construirla</em>, no para ejecutarla.
      </Nota>

      <div className="prose"><h2>Paso a paso</h2></div>

      <Terminal>{`cd ~/proyectos-ia
mkdir simulacion-3d
cd simulacion-3d
claude`}</Terminal>

      <div className="prose"><p>Describe la escena que quieres. Ejemplo (adáptalo a tu asignatura):</p></div>

      <Prompt>{`Crea una web con una simulación 3D del sistema solar usando React Three Fiber (Three.js):
- El Sol en el centro y los planetas orbitando a distintas velocidades.
- Se puede girar la cámara y hacer zoom con el ratón.
- Al pasar el cursor por un planeta, muestra su nombre y un dato curioso.
- Un control para acelerar o pausar el tiempo.
- Explícame en el README cómo cambiar datos y colores.`}</Prompt>

      <Idea>Cambia la escena por lo que enseñes: una célula y sus orgánulos, las capas de la Tierra, un teorema geométrico, un motor... La técnica es idéntica; solo cambia lo que describes.</Idea>

      <div className="prose"><h2>Ejecutar en tu ordenador</h2></div>

      <Terminal>{`npm install
npm run dev`}</Terminal>

      <div className="prose"><p>Abre la dirección local y prueba a girar la escena con el ratón.</p></div>

      <Comprueba>Deberías ver la escena 3D y poder <strong>rotarla y hacer zoom</strong>. Si al pasar el ratón aparecen los nombres y datos, la interacción funciona.</Comprueba>

      <Cuidado>Si la escena va a tirones, suele ser por tener demasiados elementos o texturas muy grandes. Pide a Claude Code que “optimice el rendimiento” y reduzca detalles. Un portátil normal mueve escenas sencillas sin problema.</Cuidado>

      <Guardar>Proyecto: carpeta <code>simulacion-3d</code>. Cerrar: <code>Ctrl + C</code>. Reabrir: <code>cd ~/proyectos-ia/simulacion-3d</code> y <code>npm run dev</code>. Cuando esté lista, en el capítulo “Publicar en la red” aprendes a subirla para que tus alumnos la abran desde un enlace.</Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>Pantalla en negro</strong> — mira si hay un error en la consola del navegador (clic derecho, “Inspeccionar”); cópiaselo a Claude Code.</li>
          <li><strong>No gira la cámara</strong> — pide que añada los controles de órbita (“OrbitControls”).</li>
          <li><strong>Muy pesada</strong> — reduce elementos y tamaño de texturas.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Añade botones para “visitar” cada planeta (que la cámara viaje hasta él) y un panel lateral con su ficha. Habrás convertido la simulación en una pequeña lección interactiva.</p>
      </div>

      <ChapterNav prev={{ href: "/volumen-2/texto-a-audio", label: "Texto a audio" }} next={{ href: "/volumen-2/avatar", label: "Un avatar que habla" }} />
    </Chapter>
  );
}
