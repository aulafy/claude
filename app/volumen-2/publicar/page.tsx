import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav } from "@/components/Book";

export const metadata: Metadata = {
  title: "Publica tu aplicación en internet — Claude Code + IA Local",
  description: "Saca tus proyectos de localhost a internet con Vercel y Hugging Face Spaces, y usa APIs gratuitas para dar IA a tu app publicada.",
};

export default function Page() {
  return (
    <Chapter
      crumb="Publica tu app"
      title="Publica tu aplicación en internet"
      emoji="🚀"
      lead={<>Hasta ahora tus proyectos vivían en tu ordenador (<code>localhost</code>). En este capítulo aprendes a <strong>publicarlos en internet</strong> para que cualquiera los abra desde un enlace, con servicios gratuitos.</>}
    >
      <Objetivos>
        <ul>
          <li>La diferencia entre una app que corre en tu equipo y una publicada.</li>
          <li>Publicar una web con Vercel y una demo de IA con Hugging Face Spaces.</li>
          <li>Usar APIs gratuitas para que tu app publicada tenga IA sin tu ordenador.</li>
        </ul>
      </Objetivos>

      <div className="prose"><h2>Conceptos clave</h2></div>

      <Cristiano term="localhost vs. internet">
        <code>localhost</code> solo existe en tu ordenador: si lo apagas, la web desaparece y nadie más la ve. <strong>Publicar</strong> (o <em>desplegar</em>) es copiar tu proyecto a un servidor siempre encendido, que le da una dirección pública (una URL) accesible desde cualquier parte.
      </Cristiano>

      <Cuidado>Ojo con la IA local al publicar: tus proyectos usaban Ollama <em>en tu máquina</em>. Un servidor en la nube no tiene tu Ollama. Para la versión publicada tienes dos caminos: (1) apps <strong>sin IA</strong> (landings, webs, simulaciones 3D) se publican tal cual; (2) apps <strong>con IA</strong> deben usar una <strong>API</strong> en la nube (lo vemos abajo) en lugar de Ollama.</Cuidado>

      <div className="prose">
        <h2>Opción A: publicar una web con Vercel</h2>
        <p>Perfecto para landings, webs y simulaciones 3D. Vercel tiene un plan gratuito (<em>Hobby</em>) para proyectos personales.</p>
        <ol>
          <li>Sube tu proyecto a <strong>GitHub</strong> (pídeselo a Claude Code: “sube este proyecto a un repositorio nuevo de GitHub”).</li>
          <li>Entra en <a href="https://vercel.com">vercel.com</a>, conéctate con tu cuenta de GitHub e importa el proyecto.</li>
          <li>Vercel lo construye y te da una URL pública. Cada vez que actualices el código en GitHub, se republica solo.</li>
        </ol>
      </div>

      <Cristiano term="GitHub">
        Es una web donde se guardan proyectos de código (usando Git, la “máquina del tiempo” del capítulo 2). Además de respaldar tu trabajo, sirve de puente: servicios como Vercel leen tu proyecto desde GitHub para publicarlo.
      </Cristiano>

      <Comprueba>Abre la URL que te dio Vercel desde el móvil, con los datos móviles (sin tu wifi). Si la web carga, está <strong>de verdad en internet</strong>.</Comprueba>

      <div className="prose">
        <h2>Opción B: una demo de IA con Hugging Face Spaces</h2>
        <p>Para enseñar una app con IA sin montar un servidor. <strong>Hugging Face Spaces</strong> ofrece hardware gratuito limitado (incluido <em>ZeroGPU</em>, con unos minutos de GPU gratis al día), ideal para demos y prototipos, no para uso intensivo.</p>
        <p>Pide a Claude Code: “prepara este proyecto como un Space de Hugging Face con Gradio y explícame cómo subirlo”.</p>

        <h2>APIs gratuitas: IA en la nube sin tu ordenador</h2>
        <p>Cuando publicas una app con IA, en vez de Ollama usas una <strong>API</strong>: un servicio en internet que ejecuta el modelo por ti. Varias tienen plan gratuito generoso para empezar:</p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-200 text-left">
                <th className="py-2 pr-4">Servicio</th><th className="py-2">Bueno para</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">Groq</td><td className="py-2">Respuestas muy rápidas; modelos abiertos tipo Llama.</td></tr>
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">Cerebras</td><td className="py-2">Velocidad extrema.</td></tr>
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">SambaNova</td><td className="py-2">Modelos grandes (DeepSeek, Llama 70B).</td></tr>
              <tr className="border-b border-zinc-800"><td className="py-2 pr-4">OpenRouter</td><td className="py-2">Variedad; muchos modelos con opción gratuita.</td></tr>
              <tr><td className="py-2 pr-4">Google AI Studio</td><td className="py-2">Modelos Gemini con cuota gratuita.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <Cristiano term="API y “clave” (API key)">
        Una API es un enchufe: tu app se conecta al servicio y le pide respuestas. La <em>clave</em> (API key) es tu contraseña personal de ese enchufe. Trátala como una contraseña: no la publiques ni la subas a GitHub. Claude Code te enseñará a guardarla en un archivo <code>.env</code> que <em>no</em> se sube.
      </Cristiano>

      <Cuidado>Nunca subas claves ni contraseñas a GitHub. Si Claude Code crea un archivo <code>.env</code>, comprueba que esté en el <code>.gitignore</code>. Pídeselo explícitamente: “asegúrate de que mis claves no se suben a GitHub”.</Cuidado>

      <div className="prose">
        <h2>Otra vía: un VPS (servidor propio)</h2>
        <p>Si quieres que tu <em>propia</em> IA local dé servicio en internet, puedes alquilar un <strong>VPS</strong> (un ordenador en la nube que controlas tú) e instalar Ollama allí. Es más avanzado y suele costar unos euros al mes; para la mayoría, Vercel + una API gratuita es más que suficiente al principio.</p>
      </div>

      <Guardar>Publicar no borra tu versión local: sigues desarrollando en tu ordenador y, cuando algo esté listo, actualizas GitHub y se republica solo. Guarda la URL pública y las claves de API en un sitio seguro (un gestor de contraseñas), nunca en el código.</Guardar>

      <div className="prose">
        <h2>Reto para practicar</h2>
        <p>Publica en Vercel la landing del capítulo anterior y conéctale un formulario de contacto que te llegue por correo (hay servicios gratuitos que Claude Code sabe integrar). Tendrás tu primera web profesional en internet.</p>
      </div>

      <ChapterNav prev={{ href: "/volumen-2/estudio", label: "App para estudiar" }} next={{ href: "/volumen-2/cluster", label: "Varios ordenadores, una IA" }} />
    </Chapter>
  );
}
