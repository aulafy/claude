import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import Prompt from "@/components/Prompt";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Proyectos guiados",
  description:
    "Tres proyectos completos paso a paso con Claude Code: una web personal, una app de tareas y un script útil en Python. Con todos los prompts.",
  alternates: { canonical: "/cursos/claude-code/proyectos" },
};

const projectCards: Array<{
  href: string;
  icon: IconName;
  title: string;
  level: string;
  time: string;
}> = [
  { href: "#web", icon: "globe", title: "Web personal", level: "Principiante", time: "30 min" },
  { href: "#tareas", icon: "listCheck", title: "App de tareas", level: "Principiante +", time: "45 min" },
  { href: "#script", icon: "code", title: "Script en Python", level: "Intermedio", time: "30 min" },
];

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-2">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-400 flex items-center justify-center text-sm font-semibold mt-1">
        {n}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-semibold text-zinc-100 mb-1 mt-2">{title}</h4>
        {children}
      </div>
    </div>
  );
}

export default function Proyectos() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Proyectos guiados</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="hammer">Proyectos guiados</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          La mejor forma de aprender es construyendo algo real. Aquí tienes tres
          proyectos completos, de principio a fin, con los prompts exactos en orden.
          Solo necesitas Claude Code instalado y ganas.
        </p>
      </div>

      <div className="callout callout-tip mb-10">
        <strong>Cómo seguir un proyecto:</strong> abre una terminal, crea una carpeta
        para el proyecto, entra en ella y ejecuta <code>claude</code>. Luego ve copiando
        los prompts en orden. Tómate tu tiempo para leer lo que Claude te explica en
        cada paso.
      </div>

      {/* Selector de nivel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
        {projectCards.map((p) => (
          <a key={p.href} href={p.href} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 hover:border-zinc-600 transition-colors">
            <Icon name={p.icon} className="text-2xl mb-2 text-violet-400" />
            <div className="font-semibold text-white text-sm">{p.title}</div>
            <div className="text-xs text-zinc-500 mt-1">{p.level} · {p.time}</div>
          </a>
        ))}
      </div>

      <div className="prose">
        {/* ───────── PROYECTO 1 ───────── */}
        <SectionHeading id="web" icon="globe">Proyecto 1: Tu web personal</SectionHeading>
        <p>
          <strong>Qué construirás:</strong> una página web personal con tu nombre,
          foto, biografía y enlaces, lista para enseñar al mundo.
        </p>
        <p>
          <strong>Qué aprenderás:</strong> qué son HTML y CSS, cómo se ve un proyecto
          web por dentro y cómo publicarlo gratis en internet.
        </p>
      </div>

      <div className="my-6 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
        <Step n={1} title="Crea la base de la web">
          <p className="text-sm text-zinc-400 mb-0">Pídele a Claude que monte la estructura inicial:</p>
          <Prompt>{`Soy principiante total. Crea una página web personal sencilla con HTML y CSS en esta carpeta. Que tenga: mi nombre como título grande, un hueco para una foto, un párrafo de biografía y una fila de enlaces (LinkedIn, GitHub, email). Que se vea moderna, con colores agradables, y que funcione bien en el móvil. Explícame qué archivos creas y para qué sirve cada uno.`}</Prompt>
        </Step>
        <Step n={2} title="Ábrela en el navegador">
          <p className="text-sm text-zinc-400 mb-0">Mira el resultado por primera vez:</p>
          <Prompt>{`Dime exactamente cómo abrir esta web en mi navegador para verla.`}</Prompt>
        </Step>
        <Step n={3} title="Personalízala a tu gusto">
          <p className="text-sm text-zinc-400 mb-0">Ahora hazla tuya:</p>
          <Prompt>{`Cambia el texto por mi información real: me llamo [tu nombre], soy [a qué te dedicas], y mi biografía es: [escribe 2 frases]. Pon los enlaces a mis redes: [pega tus enlaces]. Cambia los colores a tonos [azules / verdes / lo que quieras].`}</Prompt>
        </Step>
        <Step n={4} title="Añade un detalle bonito">
          <p className="text-sm text-zinc-400 mb-0">Aprende pidiendo mejoras visuales:</p>
          <Prompt>{`Añade una animación suave para que los elementos aparezcan al cargar la página, y que los enlaces cambien de color cuando paso el ratón por encima. Explícame por encima cómo lo has hecho.`}</Prompt>
        </Step>
        <Step n={5} title="Publícala gratis en internet">
          <p className="text-sm text-zinc-400 mb-0">Comparte tu web con el mundo:</p>
          <Prompt>{`Quiero publicar esta web gratis en internet para tener un enlace que pueda compartir. Recomiéndame la forma más fácil para un principiante y guíame paso a paso.`}</Prompt>
        </Step>
      </div>

      <div className="prose">
        {/* ───────── PROYECTO 2 ───────── */}
        <SectionHeading id="tareas" icon="listCheck">Proyecto 2: App de lista de tareas</SectionHeading>
        <p>
          <strong>Qué construirás:</strong> una app donde añadir tareas, marcarlas como
          hechas y borrarlas, que recuerda tus tareas aunque cierres la página.
        </p>
        <p>
          <strong>Qué aprenderás:</strong> qué es JavaScript, cómo una web "reacciona"
          a lo que haces y cómo se guardan datos en el navegador.
        </p>
      </div>

      <div className="my-6 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
        <Step n={1} title="Crea la app básica">
          <Prompt>{`Soy principiante. Crea una aplicación de lista de tareas que funcione en el navegador, usando solo HTML, CSS y JavaScript (sin librerías externas). De momento quiero poder: escribir una tarea en una caja de texto, pulsar un botón "Añadir" y que aparezca en una lista debajo. Que se vea limpia y moderna. Explícame para qué sirve cada archivo.`}</Prompt>
        </Step>
        <Step n={2} title="Marcar tareas como completadas">
          <Prompt>{`Ahora quiero poder marcar una tarea como completada al hacer clic en ella: que se ponga tachada y en gris. Y que pueda desmarcarla volviendo a hacer clic.`}</Prompt>
        </Step>
        <Step n={3} title="Borrar tareas">
          <Prompt>{`Añade un botón de papelera al lado de cada tarea para poder borrarla. Pídeme confirmación antes de borrar.`}</Prompt>
        </Step>
        <Step n={4} title="Que recuerde las tareas">
          <p className="text-sm text-zinc-400 mb-0">El momento "magia": persistencia de datos.</p>
          <Prompt>{`Haz que las tareas se guarden, de forma que si cierro la página y vuelvo a abrirla, mis tareas sigan ahí. Explícame de forma sencilla cómo lo consigues (qué es "localStorage").`}</Prompt>
        </Step>
        <Step n={5} title="Pulir y entender">
          <Prompt>{`La app ya funciona. Repásala conmigo: explícame en lenguaje sencillo qué hace cada parte del JavaScript, como si me estuvieras enseñando. Y dime una mejora que podría intentar yo solo como ejercicio.`}</Prompt>
        </Step>
      </div>

      <div className="prose">
        {/* ───────── PROYECTO 3 ───────── */}
        <SectionHeading id="script" icon="code">Proyecto 3: Un script útil en Python</SectionHeading>
        <p>
          <strong>Qué construirás:</strong> un programa que organiza automáticamente
          una carpeta desordenada (como Descargas) metiendo cada archivo en su sitio.
        </p>
        <p>
          <strong>Qué aprenderás:</strong> qué es Python, cómo un programa trabaja con
          tus archivos y cómo probar algo de forma segura antes de aplicarlo de verdad.
        </p>
      </div>

      <div className="my-6 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
        <Step n={1} title="Comprueba que tienes Python">
          <Prompt>{`Comprueba si tengo Python instalado en mi ordenador (uso macOS). Si no lo tengo, guíame para instalarlo. Cuando esté, dime cómo verificar que funciona.`}</Prompt>
        </Step>
        <Step n={2} title="Crea el script en modo seguro">
          <p className="text-sm text-zinc-400 mb-0">Pide que primero solo simule, sin mover nada:</p>
          <Prompt>{`Crea un script en Python que organice los archivos de una carpeta en subcarpetas según su tipo (Imágenes, Documentos, Vídeos, Comprimidos, Otros). MUY IMPORTANTE: de momento que solo MUESTRE qué movería, sin mover nada de verdad. Así puedo revisarlo antes. Explícame cómo ejecutarlo.`}</Prompt>
        </Step>
        <Step n={3} title="Pruébalo con una carpeta de ejemplo">
          <Prompt>{`Crea una carpeta de prueba con varios archivos falsos de distintos tipos y ejecuta el script sobre ella para ver qué haría. Enséñame el resultado.`}</Prompt>
        </Step>
        <Step n={4} title="Actívalo de verdad">
          <Prompt>{`Perfecto, funciona como esperaba. Ahora añade una opción para que mueva los archivos de verdad, pero que me pida confirmación antes de empezar y que me diga cuántos archivos movió al terminar.`}</Prompt>
        </Step>
        <Step n={5} title="Hazlo reutilizable">
          <Prompt>{`Haz que el script me pregunte qué carpeta quiero organizar al ejecutarlo, en vez de tenerlo escrito fijo. Y crea un archivo README.md que explique cómo usarlo, por si lo retomo dentro de meses.`}</Prompt>
        </Step>
      </div>

      <div className="prose">
        <div className="callout callout-orange">
          <strong>¿Y ahora qué?</strong> Cuando termines estos proyectos, intenta uno
          tuyo desde cero. Describe a Claude Code qué quieres construir y pídele que te
          guíe paso a paso, igual que aquí. Echa un vistazo a las{" "}
          <Link href="/cursos/claude-code/recetas">recetas prácticas</Link> para más ideas.
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/recetas" className="text-sm text-zinc-500 hover:text-zinc-300">← Recetas prácticas</Link>
        <Link href="/cursos/claude-code/faq" className="text-sm text-violet-400 hover:text-fuchsia-300">Preguntas frecuentes →</Link>
      </div>
    </div>
  );
}
