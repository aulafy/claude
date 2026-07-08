import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "La terminal sin miedo (qué es un CLI)",
  description: "Haz las paces con la terminal en diez minutos: qué es un CLI, cómo abrirla y los cuatro comandos para moverte por tus carpetas.",
  alternates: { canonical: "/cursos/ia-local/terminal" },
};

export default function Page() {
  return (
    <Chapter
      crumb="La terminal sin miedo"
      title="La terminal sin miedo (qué es un CLI)"
      icon="terminal"
      lead={<>Antes de construir nada, vamos a hacer las paces con una ventana que asusta a mucha gente: la <strong>terminal</strong>. Es la herramienta que usarás en todos los capítulos, y en diez minutos verás que no muerde.</>}
    >
      <Objetivos>
        <ul>
          <li>Qué es un CLI y por qué los profesionales lo prefieren para muchas tareas.</li>
          <li>Abrir la terminal en Mac, Windows y Linux.</li>
          <li>Los cuatro comandos que necesitas para moverte por tus carpetas.</li>
          <li>Cómo no romper nada.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Qué es un CLI</h2>
        <p>CLI son las siglas de <em>Command Line Interface</em>: “interfaz de línea de comandos”. Es una forma de usar el ordenador <strong>escribiendo órdenes</strong> en lugar de haciendo clic con el ratón.</p>
      </div>

      <Cristiano term="CLI vs. lo de siempre">
        Lo que usas a diario (iconos, ventanas, ratón) es una <em>interfaz gráfica</em>. El CLI es su hermano de texto: en vez de arrastrar un archivo a una carpeta, escribes una orden que dice “mueve este archivo a esa carpeta”. Parece más rústico, pero es <strong>más rápido, más preciso y automatizable</strong>. Y es el idioma nativo de herramientas como Claude Code.
      </Cristiano>

      <Idea>No tienes que memorizar comandos. En este libro, cada vez que haga falta uno, te lo damos escrito para copiar y pegar, y te explicamos qué hace.</Idea>

      <div className="prose">
        <h2>Abrir la terminal</h2>
        <ul>
          <li><strong>Mac</strong>: pulsa <code>Cmd + Espacio</code>, escribe “Terminal” y pulsa Enter.</li>
          <li><strong>Windows</strong>: menú Inicio, escribe “Terminal” (o “PowerShell”) y ábrela.</li>
          <li><strong>Linux</strong>: normalmente <code>Ctrl + Alt + T</code>.</li>
        </ul>
        <p>Verás una ventana con texto y un cursor parpadeando. Eso es el <em>símbolo del sistema</em>: está esperando tus órdenes.</p>

        <h2>Los cuatro comandos para moverte</h2>
        <p>Con estos cuatro te apañas para casi todo lo del libro:</p>
      </div>

      <Terminal>{`pwd          # ¿en qué carpeta estoy? (print working directory)
ls           # ¿qué hay aquí? (list)
cd carpeta   # entra en "carpeta" (change directory)
cd ..        # sube a la carpeta de arriba`}</Terminal>

      <Cristiano term="el # y lo que va después">
        Todo lo que va tras una almohadilla <code>#</code> es un <em>comentario</em>: una nota para ti, no una orden. No hace falta que lo escribas.
      </Cristiano>

      <div className="prose">
        <p>Prueba esta secuencia sin miedo (no cambia nada, solo mira):</p>
      </div>

      <Terminal>{`pwd
ls
cd ..
ls`}</Terminal>

      <Cuidado>
        Reglas de oro para principiantes: <code>pwd</code>, <code>ls</code> y <code>cd</code> <strong>solo miran o se mueven</strong>: no borran nada, úsalos con tranquilidad. Desconfía de comandos que empiecen por <code>rm</code> (borrar) o que lleven <code>sudo</code> si no entiendes qué hacen. Si te pierdes, cierra la ventana y abre otra: no pasa nada.
      </Cuidado>

      <Guardar>
        La terminal no “guarda” nada por sí misma: es una ventana de mando. Lo que se guarda son las <strong>carpetas y archivos</strong> de tu ordenador, que siguen ahí aunque cierres la terminal. En el próximo capítulo aprendes a organizar y proteger tus proyectos para no perder trabajo nunca.
      </Guardar>

      <div className="prose">
        <h2>Reto para practicar</h2>
        <p>Abre la terminal, usa <code>cd</code> para llegar hasta tu carpeta de Descargas y escribe <code>ls</code> para ver qué hay dentro. Cuando lo consigas, ya sabes moverte: estás listo para el resto del libro.</p>
      </div>

      <ChapterNav next={{ href: "/cursos/ia-local/proyectos", label: "Cómo trabajar con tus proyectos" }} />
    </Chapter>
  );
}
