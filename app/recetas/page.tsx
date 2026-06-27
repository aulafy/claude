import type { Metadata } from "next";
import Link from "next/link";
import Prompt from "@/components/Prompt";

export const metadata: Metadata = {
  title: "Recetas prácticas — Aprende Claude Code",
  description:
    "Más de 40 ejemplos reales para usar Claude Code en el día a día: aprender a programar, crear proyectos, depurar errores, automatizar tareas y más.",
};

export default function Recetas() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Recetas prácticas</span>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">🍳 Recetas prácticas</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Casos de uso reales para el día a día. Cada receta incluye el prompt
          exacto que puedes copiar y pegar en Claude Code. Pensadas para personas
          que están empezando en programación.
        </p>
      </div>

      <div className="callout callout-tip mb-8">
        <strong>Cómo usar esta página:</strong> haz clic en <strong>📋 Copiar</strong> en
        cualquier prompt, pégalo en tu terminal con Claude Code abierto, y ajusta
        los detalles entre corchetes <code>[ ]</code> a tu caso.
      </div>

      {/* Índice */}
      <div className="mb-12 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">En esta página</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm">
          {[
            ["#aprender", "📚 Aprender a programar"],
            ["#crear", "🏗️ Crear tu primer proyecto"],
            ["#entender", "🔍 Entender código que no escribiste"],
            ["#errores", "🐛 Resolver errores"],
            ["#mejorar", "✨ Mejorar tu código"],
            ["#git", "🌿 Git y control de versiones"],
            ["#datos", "📊 Trabajar con datos y archivos"],
            ["#automatizar", "⚙️ Automatizar tareas repetitivas"],
            ["#terminal", "💻 Comandos de terminal sin miedo"],
            ["#documentar", "📝 Documentar y explicar"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="text-zinc-400 hover:text-orange-400 transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="prose">
        {/* ───────────── APRENDER ───────────── */}
        <h2 id="aprender">📚 Aprender a programar</h2>
        <p>
          Claude Code es un profesor particular dentro de tu terminal. No solo
          escribe código: te explica el porqué de cada cosa a tu nivel.
        </p>

        <h3>Pedir una explicación a tu nivel</h3>
        <Prompt>{`Explícame qué es una función en programación como si nunca hubiera programado. Usa un ejemplo de la vida real y luego enséñame cómo se escribe en Python.`}</Prompt>

        <h3>Aprender haciendo un mini-proyecto guiado</h3>
        <Prompt>{`Quiero aprender Python desde cero. Guíame paso a paso para crear una calculadora sencilla en la terminal. Explícame cada línea antes de escribirla y espera a que yo entienda antes de continuar.`}</Prompt>

        <h3>Entender un concepto que se te resiste</h3>
        <Prompt>{`No entiendo qué es un "bucle for". Explícamelo con 3 ejemplos sencillos, del más fácil al más difícil, y dime para qué se usa en la vida real.`}</Prompt>

        <h3>Practicar con ejercicios</h3>
        <Prompt>{`Ponme 5 ejercicios de Python para principiantes sobre listas, ordenados de fácil a difícil. No me des las soluciones todavía: dámelas solo cuando yo te lo pida después de intentarlo.`}</Prompt>

        {/* ───────────── CREAR ───────────── */}
        <h2 id="crear">🏗️ Crear tu primer proyecto</h2>
        <p>
          Lo mejor de Claude Code es que puede montar un proyecto completo y
          funcional mientras tú aprendes viéndolo trabajar.
        </p>

        <h3>Una página web personal</h3>
        <Prompt>{`Crea una página web personal sencilla con HTML y CSS en una carpeta nueva llamada "mi-web". Que tenga: mi nombre, una foto, una breve biografía y mis enlaces a redes sociales. Que se vea moderna y funcione en el móvil. Cuando termines, dime cómo abrirla en el navegador.`}</Prompt>

        <h3>Una pequeña app de tareas (to-do list)</h3>
        <Prompt>{`Crea una aplicación de lista de tareas que funcione en el navegador, solo con HTML, CSS y JavaScript (sin librerías). Quiero poder añadir tareas, marcarlas como completadas y borrarlas. Que se guarden aunque cierre la página. Explícame cómo probarla.`}</Prompt>

        <h3>Un script útil para tu día a día</h3>
        <Prompt>{`Necesito un script en Python que renombre todas las fotos de una carpeta poniéndoles la fecha en que se hicieron al principio del nombre. Pregúntame la ruta de la carpeta antes de empezar y avísame antes de cambiar nada.`}</Prompt>

        <div className="callout callout-warning">
          <strong>Antes de tocar tus archivos:</strong> cuando un script modifica
          archivos importantes (fotos, documentos), pídele a Claude que primero haga
          una <strong>prueba sin cambiar nada</strong> y te enseñe qué haría. Añade:
          <em> "primero muéstrame qué cambiarías sin hacerlo de verdad"</em>.
        </div>

        {/* ───────────── ENTENDER ───────────── */}
        <h2 id="entender">🔍 Entender código que no escribiste</h2>
        <p>
          Cuando heredas un proyecto o sigues un tutorial, Claude Code te traduce
          el código a lenguaje humano.
        </p>

        <h3>Entender un proyecto entero</h3>
        <Prompt>{`Acabo de descargar este proyecto y no sé por dónde empezar. Explícame: qué hace la aplicación, qué tecnologías usa, qué hace cada carpeta principal y cuál es el archivo más importante por el que debería empezar a leer.`}</Prompt>

        <h3>Explicar un archivo o función concreta</h3>
        <Prompt>{`Explícame línea por línea, en español sencillo, qué hace el archivo [src/login.js]. No asumas que sé mucho.`}</Prompt>

        <h3>Traducir jerga técnica</h3>
        <Prompt>{`En este proyecto veo palabras como "API", "endpoint" y "middleware". Explícame cada una con una analogía sencilla y señálame dónde aparecen en el código.`}</Prompt>

        {/* ───────────── ERRORES ───────────── */}
        <h2 id="errores">🐛 Resolver errores</h2>
        <p>
          Los errores son la parte más frustrante al empezar. Claude Code los lee,
          te explica qué significan y los arregla.
        </p>

        <h3>Entender y arreglar un error</h3>
        <Prompt>{`Me sale este error y no entiendo qué significa:

[pega aquí el error completo]

Explícame en palabras sencillas qué está pasando, por qué ocurre y cómo arreglarlo.`}</Prompt>

        <h3>Cuando algo "no funciona" pero no hay error</h3>
        <Prompt>{`Mi página debería mostrar una lista de productos pero aparece en blanco. No sale ningún error. Investiga qué está pasando, dime dónde está el problema y arréglalo.`}</Prompt>

        <h3>Arreglar los tests que fallan</h3>
        <Prompt>{`Ejecuta los tests del proyecto. Si alguno falla, explícame por qué falla y arréglalo, pero enséñame el cambio antes de aplicarlo.`}</Prompt>

        <div className="callout callout-tip">
          <strong>Truco:</strong> copia <em>todo</em> el mensaje de error, incluida la
          parte larga que parece "ruido". Esa parte (el <em>stack trace</em>) es
          justo lo que Claude necesita para encontrar el problema rápido.
        </div>

        {/* ───────────── MEJORAR ───────────── */}
        <h2 id="mejorar">✨ Mejorar tu código</h2>

        <h3>Pedir una revisión como si fuera un mentor</h3>
        <Prompt>{`Revisa el archivo [mi_codigo.py] como si fueras un programador con experiencia ayudando a un principiante. Dime qué está bien, qué se puede mejorar y por qué. Sé amable pero honesto.`}</Prompt>

        <h3>Hacer el código más legible</h3>
        <Prompt>{`Este código funciona pero es un lío y no lo entiendo cuando vuelvo a él días después. Reescríbelo para que sea más claro y fácil de leer, con buenos nombres de variables y comentarios donde haga falta. No cambies lo que hace.`}</Prompt>

        <h3>Añadir comprobaciones de seguridad</h3>
        <Prompt>{`En este formulario el usuario puede escribir cualquier cosa. Añade comprobaciones para que no se rompa si dejan campos vacíos o escriben datos raros. Explícame qué problemas estabas previniendo.`}</Prompt>

        {/* ───────────── GIT ───────────── */}
        <h2 id="git">🌿 Git y control de versiones</h2>
        <p>
          Git asusta al principio. Deja que Claude Code lo maneje mientras tú
          aprendes los conceptos.
        </p>

        <h3>Empezar a usar git sin saber git</h3>
        <Prompt>{`Quiero empezar a guardar el historial de cambios de este proyecto con git, pero nunca lo he usado. Configúralo, haz el primer guardado (commit) y explícame con palabras sencillas qué acabas de hacer y por qué sirve.`}</Prompt>

        <h3>Guardar tu trabajo con un buen mensaje</h3>
        <Prompt>{`Guarda los cambios que he hecho hoy con git. Escribe un mensaje de commit claro que explique qué cambié. Antes de guardar, enséñame qué archivos van a entrar.`}</Prompt>

        <h3>"He liado algo, quiero volver atrás"</h3>
        <Prompt>{`Creo que rompí algo con mis últimos cambios. Enséñame qué he cambiado desde el último guardado y ayúdame a volver a como estaba si hace falta. Explícame las opciones antes de hacer nada.`}</Prompt>

        <h3>Subir el proyecto a GitHub</h3>
        <Prompt>{`Quiero subir este proyecto a GitHub por primera vez para tener una copia online. Guíame paso a paso: qué necesito, qué tengo que hacer en la web de GitHub y qué comandos ejecutar.`}</Prompt>

        {/* ───────────── DATOS ───────────── */}
        <h2 id="datos">📊 Trabajar con datos y archivos</h2>

        <h3>Analizar un archivo Excel o CSV</h3>
        <Prompt>{`Tengo un archivo [ventas.csv] con datos de ventas. Dime cuántas filas tiene, qué columnas hay, y hazme un resumen: total de ventas, mes con más ventas y el producto más vendido.`}</Prompt>

        <h3>Convertir entre formatos</h3>
        <Prompt>{`Tengo un archivo [datos.json] y necesito los mismos datos en formato Excel (CSV) para abrirlos con el programa de hojas de cálculo. Conviértelo y guárdalo.`}</Prompt>

        <h3>Limpiar datos desordenados</h3>
        <Prompt>{`En este archivo [contactos.csv] los números de teléfono están escritos de mil maneras distintas. Únificalos todos al mismo formato y quita las filas duplicadas. Enséñame un ejemplo de antes y después.`}</Prompt>

        <h3>Generar un gráfico</h3>
        <Prompt>{`Con los datos del archivo [gastos.csv], crea un gráfico de barras de gastos por categoría y guárdalo como imagen. Usa Python.`}</Prompt>

        {/* ───────────── AUTOMATIZAR ───────────── */}
        <h2 id="automatizar">⚙️ Automatizar tareas repetitivas</h2>
        <p>
          Si haces algo aburrido y repetitivo en el ordenador, probablemente Claude
          Code pueda automatizarlo.
        </p>

        <h3>Organizar la carpeta de descargas</h3>
        <Prompt>{`Mi carpeta de Descargas es un caos. Crea un script que ordene los archivos en subcarpetas según su tipo (imágenes, PDFs, vídeos, instaladores, etc.). Antes de moverlos, enséñame el plan de qué iría a cada carpeta.`}</Prompt>

        <h3>Renombrar muchos archivos a la vez</h3>
        <Prompt>{`Tengo 200 archivos llamados "IMG_0001", "IMG_0002"... Quiero renombrarlos a "vacaciones-2026-001", "vacaciones-2026-002", etc. Hazlo con un script y muéstrame primero cómo quedarían los primeros 5 nombres.`}</Prompt>

        <h3>Buscar texto en muchos archivos</h3>
        <Prompt>{`Busca en qué archivos de este proyecto aparece la palabra "contraseña" o "password". Quiero asegurarme de no haber dejado ningún dato sensible escrito por error.`}</Prompt>

        {/* ───────────── TERMINAL ───────────── */}
        <h2 id="terminal">💻 Comandos de terminal sin miedo</h2>
        <p>
          La terminal intimida. Claude Code la usa por ti y te enseña los comandos
          poco a poco.
        </p>

        <h3>"¿Cómo se hace esto en la terminal?"</h3>
        <Prompt>{`Quiero ver cuánto espacio ocupa cada carpeta dentro de este directorio para saber qué está llenando mi disco. Hazlo y explícame el comando que usaste por si quiero repetirlo.`}</Prompt>

        <h3>Instalar herramientas</h3>
        <Prompt>{`Necesito instalar [Python / Node.js / git] en mi ordenador (uso macOS). Guíame paso a paso, comprueba si ya lo tengo instalado primero y dime cómo verificar que funciona.`}</Prompt>

        <h3>Antes de ejecutar un comando que viste en internet</h3>
        <Prompt>{`Encontré este comando en un tutorial y me da miedo ejecutarlo sin saber qué hace:

[pega el comando]

Explícame exactamente qué hace cada parte y dime si es seguro ejecutarlo.`}</Prompt>

        <div className="callout callout-warning">
          <strong>Regla de oro:</strong> nunca ejecutes un comando de internet que no
          entiendas. Pregúntale primero a Claude Code qué hace. Especialmente si lleva
          <code>sudo</code>, <code>rm</code> o <code>curl ... | bash</code>.
        </div>

        {/* ───────────── DOCUMENTAR ───────────── */}
        <h2 id="documentar">📝 Documentar y explicar</h2>

        <h3>Crear un README para tu proyecto</h3>
        <Prompt>{`Crea un archivo README.md para este proyecto que explique: qué hace, cómo instalarlo, cómo usarlo y qué tecnologías usa. Escríbelo para que alguien que llega nuevo lo entienda.`}</Prompt>

        <h3>Comentar tu propio código</h3>
        <Prompt>{`Añade comentarios al archivo [mi_script.py] explicando qué hace cada parte, pensando en mí dentro de 6 meses cuando ya no me acuerde de nada. No cambies el código, solo añade explicaciones.`}</Prompt>

        <h3>Preparar una explicación para presentar tu trabajo</h3>
        <Prompt>{`Tengo que explicar este proyecto en clase. Hazme un resumen sencillo de qué hace y cómo funciona por dentro, con un guion de 5 puntos que pueda usar para presentarlo.`}</Prompt>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/primeros-pasos" className="text-sm text-zinc-500 hover:text-zinc-300">← Primeros pasos</Link>
        <Link href="/prompts" className="text-sm text-orange-400 hover:text-orange-300">Cómo escribir buenos prompts →</Link>
      </div>
    </div>
  );
}
