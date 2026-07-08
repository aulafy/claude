import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Controla el contexto y los costes — Claude Code",
  description:
    "Por qué Claude Code olvida y consume límites: CLAUDE.md, /compact, /clear, subagentes y flujo híbrido con IA local.",
  alternates: { canonical: "/cursos/claude-code/contexto-costes" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Controla el contexto y los costes"
      title="Controla el contexto y los costes"
      icon="chart"
      lead={<>Las dos quejas más repetidas de quien empieza: <em>“cada sesión empieza de cero y tengo que re-explicarlo todo”</em> y <em>“se me acaban los límites del plan enseguida”</em>. Las dos tienen la misma raíz —el <strong>contexto</strong>— y las dos tienen arreglo. Esta lección es el manual de ahorro.</>}
      courseHref="/cursos/claude-code"
      courseLabel="Claude Code, de 0 a pro"
    >
      <Objetivos>
        <ul>
          <li>Entender qué es la ventana de contexto y qué la llena (y te cuesta dinero).</li>
          <li>Hacer que Claude Code “recuerde” tu proyecto entre sesiones con <code>CLAUDE.md</code>.</li>
          <li>Usar <code>/clear</code>, <code>/compact</code> y subagentes para estirar tus límites.</li>
          <li>Decidir qué tareas mandar a un modelo barato o a tu IA local.</li>
        </ul>
      </Objetivos>

      <div className="prose"><h2>Qué es el contexto (y por qué se gasta)</h2></div>

      <Cristiano term="ventana de contexto">
        Es la “memoria de trabajo” de la sesión: todo lo que Claude tiene delante ahora mismo —tu conversación, los archivos que ha leído, la salida de los comandos—. Es grande pero finita, y <strong>cada cosa que entra cuenta</strong>: para la calidad (con la memoria llena razona peor) y para tu bolsillo (los límites del plan se miden en este consumo).
      </Cristiano>

      <div className="prose">
        <p>Lo que más llena el contexto, por orden:</p>
        <ul>
          <li><strong>Archivos grandes</strong> leídos enteros (o pegados por ti en el chat).</li>
          <li><strong>Salidas largas de comandos</strong> (logs, tests, listados).</li>
          <li><strong>Conversaciones eternas</strong> que mezclan tareas distintas.</li>
        </ul>
      </div>

      <Idea>La regla de oro: <strong>una tarea, una sesión</strong>. Terminaste el bug del login: <code>/clear</code> y a otra cosa. Las sesiones-maratón que mezclan cinco temas son la principal causa de respuestas malas y límites quemados.</Idea>

      <div className="prose"><h2>Tus tres botones de ahorro</h2></div>

      <Terminal>{`/clear    # borra la conversación y empieza limpio (fin de tarea)
/compact  # resume la conversación y libera espacio (mitad de tarea)
/cost     # consulta cuánto llevas consumido en la sesión`}</Terminal>

      <div className="prose">
        <p><code>/compact</code> es el término medio: comprime lo hablado en un resumen y sigue donde estabas. Úsalo cuando la tarea es larga pero no quieres perder el hilo. Y no temas a <code>/clear</code>: no borra tu código ni tus archivos, solo la charla.</p>

        <h2>La cura del “empieza de cero”: CLAUDE.md</h2>
        <p>La frustración de re-explicar tu proyecto en cada sesión tiene solución oficial: un archivo <code>CLAUDE.md</code> en la raíz del proyecto. Claude Code lo lee <strong>automáticamente al arrancar</strong>. Pídeselo así:</p>
      </div>

      <Terminal>{`Crea un CLAUDE.md para este proyecto: qué es, cómo se arranca,
qué estructura tiene, mis convenciones y qué NO debes tocar.
Breve y útil, que sirva de memoria entre sesiones.`}</Terminal>

      <Cristiano term="CLAUDE.md">
        Es la “chuleta permanente” del proyecto: lo que antes explicabas de palabra en cada sesión, escrito una vez. Cuanto mejor sea tu CLAUDE.md, más cortas (y baratas) son todas tus sesiones futuras. Mantenlo actualizado: cuando tomes una decisión importante, di “apunta esto en el CLAUDE.md”.
      </Cristiano>

      <div className="prose">
        <h2>Subagentes: explorar sin ensuciar</h2>
        <p>Cuando Claude necesita rebuscar por un repositorio grande, cada archivo leído se queda en tu contexto… salvo que delegue. Los <strong>subagentes</strong> exploran en su propia memoria y te devuelven solo la conclusión. Pídelo explícitamente:</p>
      </div>

      <Terminal>{`Usa un subagente para investigar dónde se gestiona el login
en este proyecto, y tráeme solo el resumen con los archivos clave.`}</Terminal>

      <div className="prose">
        <h2>Cada tarea con el modelo que merece</h2>
        <p>No todas las tareas necesitan el modelo más potente:</p>
        <ul>
          <li><strong>Tareas mecánicas</strong> (renombrar, formatear, resumir): un modelo rápido/barato basta — cambia con <code>/model</code>.</li>
          <li><strong>Diseñar, depurar difícil, refactorizar</strong>: el modelo potente, que para eso está.</li>
          <li><strong>Volumen y datos privados</strong> (procesar cien PDF, chat con documentos): ni nube ni límites — tu <strong>IA local</strong>. Cómo conectarla la tienes en la lección <em>“Conecta Claude Code con tu IA local”</em> del curso de IA Local.</li>
        </ul>
      </div>

      <Cuidado>
        Los tres agujeros por los que más se escapa el plan: pegar archivos enormes en el chat (di mejor “lee tal archivo” y que decida qué partes), pedir que “revise todo el proyecto” sin acotar, y dejar correr una sesión eterna sin <code>/clear</code>. Evitando esos tres, la mayoría de la gente deja de tocar sus límites.
      </Cuidado>

      <Comprueba>
        Prueba el flujo completo: crea el <code>CLAUDE.md</code>, cierra la sesión, abre otra y pregunta “¿de qué va este proyecto?”. Si te responde bien <strong>sin que expliques nada</strong>, has ganado memoria entre sesiones. Ahora mira <code>/cost</code> al final de un día normal: notarás la diferencia.
      </Comprueba>

      <Guardar>
        Rutina de higiene que vale para siempre:
        <ul>
          <li><code>CLAUDE.md</code> al empezar cada proyecto (y actualizado cuando decidas algo importante).</li>
          <li><code>/clear</code> al cambiar de tarea; <code>/compact</code> en tareas largas.</li>
          <li>Subagentes para explorar; acotar qué archivos debe leer.</li>
          <li>Modelo rápido para lo mecánico; IA local para el volumen y lo privado.</li>
        </ul>
      </Guardar>

      <div className="prose">
        <h2>Reto para practicar</h2>
        <p>Coge tu proyecto más activo y escríbele hoy su <code>CLAUDE.md</code> (con ayuda de Claude Code). Mañana, cronometra cuánto tardas en retomar el trabajo. Ese minuto que antes eran diez es la mejor métrica de esta lección.</p>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/claude-code/prompts", label: "Escribir buenos prompts" }}
        next={{ href: "/cursos/claude-code/glosario", label: "Glosario" }}
      />
    </Chapter>
  );
}
