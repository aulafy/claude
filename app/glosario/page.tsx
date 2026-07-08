import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Glosario para principiantes",
  description:
    "Diccionario de términos técnicos que aparecen al usar Claude Code, explicados con palabras sencillas y analogías.",
  alternates: { canonical: "/cursos/claude-code/glosario" },
};

const terms: { term: string; def: string; analogy?: string }[] = [
  {
    term: "Terminal (o consola)",
    def: "Una ventana donde escribes comandos de texto para darle órdenes al ordenador, en lugar de hacer clic con el ratón.",
    analogy: "Como enviarle instrucciones escritas a tu ordenador en vez de señalar botones.",
  },
  {
    term: "CLI",
    def: "Command Line Interface (interfaz de línea de comandos). Un programa que usas escribiendo en la terminal. Claude Code es una CLI.",
  },
  {
    term: "Comando",
    def: "Una orden que escribes en la terminal para que el ordenador haga algo. Por ejemplo, 'ls' lista los archivos de una carpeta.",
  },
  {
    term: "Directorio",
    def: "Es lo mismo que una carpeta. Los programadores suelen decir 'directorio'.",
  },
  {
    term: "Repositorio (repo)",
    def: "Una carpeta de proyecto cuyo historial de cambios se guarda con git. Puede estar en tu ordenador y/o en internet (GitHub).",
    analogy: "Como una carpeta con 'máquina del tiempo' incorporada.",
  },
  {
    term: "git",
    def: "Una herramienta que guarda el historial de todos los cambios de tu proyecto, para que puedas volver atrás o ver qué cambió y cuándo.",
    analogy: "Como el historial de versiones de un documento, pero para código.",
  },
  {
    term: "Commit",
    def: "Un 'punto de guardado' en git. Cada commit captura cómo estaba tu proyecto en ese momento, con un mensaje que explica qué cambiaste.",
    analogy: "Como una foto del estado de tu proyecto con una etiqueta describiéndola.",
  },
  {
    term: "GitHub",
    def: "Una web donde puedes guardar tus repositorios en internet, compartirlos y colaborar con otras personas.",
  },
  {
    term: "Branch (rama)",
    def: "Una línea de trabajo paralela en git. Te permite hacer cambios sin tocar la versión principal hasta que estés seguro.",
    analogy: "Como hacer una copia para experimentar sin estropear el original.",
  },
  {
    term: "Pull Request (PR)",
    def: "Una propuesta para añadir tus cambios al proyecto principal, para que alguien los revise antes de aceptarlos.",
  },
  {
    term: "API",
    def: "Application Programming Interface. Una forma de que dos programas hablen entre sí. Por ejemplo, una web que consulta el tiempo usa la API de un servicio meteorológico.",
    analogy: "Como el camarero de un restaurante: tú pides, él trae lo que la cocina prepara, sin que entres a la cocina.",
  },
  {
    term: "API key",
    def: "Una contraseña secreta que identifica quién usa un servicio. Claude Code necesita tu API key de Anthropic para funcionar.",
    analogy: "Como tu carné personal para entrar a un servicio.",
  },
  {
    term: "Frontend",
    def: "La parte de una aplicación que ve y usa el usuario: botones, textos, colores, formularios.",
    analogy: "El escaparate y la sala de una tienda.",
  },
  {
    term: "Backend",
    def: "La parte que no se ve: la lógica, la base de datos, los cálculos. Funciona 'por detrás'.",
    analogy: "El almacén y la trastienda donde se gestiona todo.",
  },
  {
    term: "Base de datos",
    def: "Un sitio organizado donde se guardan los datos de una aplicación (usuarios, productos, mensajes...).",
    analogy: "Como un archivador gigante, ordenado y consultable al instante.",
  },
  {
    term: "Framework / Librería",
    def: "Código ya hecho por otras personas que reutilizas para no empezar de cero. Por ejemplo, React es una librería para construir interfaces.",
    analogy: "Como usar muebles de IKEA en vez de fabricar cada tornillo.",
  },
  {
    term: "Dependencia",
    def: "Una librería externa que tu proyecto necesita para funcionar. Se instalan normalmente con npm o pip.",
  },
  {
    term: "npm",
    def: "El gestor de paquetes de Node.js. Sirve para instalar librerías de JavaScript con un comando.",
  },
  {
    term: "Paquete",
    def: "Una librería empaquetada y lista para instalar. 'Instalar un paquete' = añadir código de otra persona a tu proyecto.",
  },
  {
    term: "Función",
    def: "Un bloque de código con nombre que hace una tarea concreta y puedes reutilizar las veces que quieras.",
    analogy: "Como una receta: la escribes una vez y la usas cuando quieras.",
  },
  {
    term: "Variable",
    def: "Un nombre que guarda un valor (un número, un texto...) para usarlo después.",
    analogy: "Como una caja etiquetada donde guardas algo.",
  },
  {
    term: "Bug",
    def: "Un error o fallo en el código que hace que no funcione como debería.",
  },
  {
    term: "Debug (depurar)",
    def: "El proceso de encontrar y arreglar bugs.",
  },
  {
    term: "Stack trace / Traceback",
    def: "El texto largo que aparece cuando algo falla. Muestra dónde y por qué se rompió el programa. Es muy útil: cópialo entero al pedir ayuda.",
  },
  {
    term: "Deploy (desplegar)",
    def: "Publicar tu proyecto en internet para que otras personas puedan usarlo. Vercel, por ejemplo, despliega webs.",
  },
  {
    term: "Servidor",
    def: "Un ordenador (normalmente en internet) que ejecuta tu aplicación y responde a las peticiones de los usuarios.",
  },
  {
    term: "localhost",
    def: "Tu propio ordenador actuando como servidor, para probar tu proyecto antes de publicarlo. Suele verse como 'localhost:3000'.",
  },
  {
    term: "JSON",
    def: "Un formato de texto para guardar y compartir datos de forma organizada. Lo usan casi todas las aplicaciones para comunicarse.",
  },
  {
    term: "Entorno (environment)",
    def: "El conjunto de programas y configuraciones donde se ejecuta tu código. Tu ordenador es un entorno; un servidor es otro.",
  },
  {
    term: "Variable de entorno",
    def: "Un valor de configuración que vive fuera del código (como una API key), para no escribir datos secretos directamente en los archivos.",
  },
  {
    term: "Hook",
    def: "En Claude Code, un script que se ejecuta solo cuando ocurre algo (antes o después de una acción). Sirve para automatizar.",
  },
  {
    term: "MCP",
    def: "Model Context Protocol. La forma en que Claude Code se conecta a herramientas externas como bases de datos o el navegador.",
    analogy: "Como un enchufe universal para conectar herramientas a la IA.",
  },
];

export default function Glosario() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Glosario</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="book">Glosario para principiantes</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          ¿Te has perdido con alguna palabra técnica? Aquí tienes los términos que
          más aparecen al usar Claude Code, explicados con palabras normales y
          analogías de la vida real.
        </p>
      </div>

      <div className="callout callout-tip mb-8">
        <strong>Recuerda:</strong> si alguna vez no entiendes una palabra mientras
        usas Claude Code, ¡pregúntale! Escribe <em>"explícame qué es [palabra] de
        forma sencilla"</em> y te lo aclarará al instante.
      </div>

      <div className="space-y-3">
        {terms.map((t) => (
          <div
            key={t.term}
            className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4"
          >
            <h3 className="text-base font-semibold text-orange-400 mb-1.5">{t.term}</h3>
            <p className="text-sm text-zinc-300 leading-relaxed m-0">{t.def}</p>
            {t.analogy && (
              <p className="text-sm text-zinc-500 leading-relaxed mt-2 m-0 italic flex gap-2">
                <Icon name="idea" className="text-orange-400 mt-0.5" />
                <span>{t.analogy}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/prompts" className="text-sm text-zinc-500 hover:text-zinc-300">← Cómo escribir buenos prompts</Link>
        <Link href="/" className="text-sm text-orange-400 hover:text-orange-300">Volver al inicio →</Link>
      </div>
    </div>
  );
}
