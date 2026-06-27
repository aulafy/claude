import type { Metadata } from "next";
import Link from "next/link";
import Prompt from "@/components/Prompt";

export const metadata: Metadata = {
  title: "Cómo escribir buenos prompts — Aprende Claude Code",
  description:
    "Aprende a comunicarte con Claude Code para obtener mejores resultados. Ejemplos antes/después y plantillas para principiantes.",
};

function Comparison({
  bad,
  good,
}: {
  bad: string;
  good: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-4">
        <div className="text-xs font-medium text-red-400 mb-2 flex items-center gap-1.5">
          <span>✕</span> Poco claro
        </div>
        <p className="text-sm text-zinc-300 m-0 leading-relaxed">{bad}</p>
      </div>
      <div className="rounded-lg border border-emerald-900/40 bg-emerald-950/20 p-4">
        <div className="text-xs font-medium text-emerald-400 mb-2 flex items-center gap-1.5">
          <span>✓</span> Mucho mejor
        </div>
        <p className="text-sm text-zinc-300 m-0 leading-relaxed">{good}</p>
      </div>
    </div>
  );
}

export default function Prompts() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Cómo escribir buenos prompts</span>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">🎯 Cómo escribir buenos prompts</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          La calidad de lo que te da Claude Code depende mucho de cómo se lo pidas.
          No hace falta saber "hablar técnico": solo ser claro. Aquí tienes los 7
          principios y ejemplos reales antes/después.
        </p>
      </div>

      <div className="prose">
        <h2>1. Sé específico, no genérico</h2>
        <p>
          "Arregla esto" obliga a Claude a adivinar. Cuanto más contexto des, menos
          adivina y mejor acierta.
        </p>
        <Comparison
          bad="Arregla mi código"
          good="El botón de 'Enviar' en login.html no hace nada al pulsarlo. Debería mostrar un mensaje de error si el campo email está vacío. Investiga por qué no funciona y arréglalo."
        />

        <h2>2. Di tu nivel y pide explicaciones</h2>
        <p>
          Claude se adapta a ti. Si le dices que estás empezando, te explicará las
          cosas en lugar de soltar código sin más.
        </p>
        <Comparison
          bad="Haz una API REST con autenticación JWT"
          good="Estoy empezando a programar. Ayúdame a crear una API sencilla con login. Explícame cada paso con palabras normales antes de escribir el código, y dime qué es 'JWT' cuando lo uses."
        />

        <h2>3. Pide ver antes de actuar</h2>
        <p>
          Para tareas que cambian archivos o pueden tener consecuencias, pide el
          plan primero. Así aprendes y evitas sustos.
        </p>
        <Prompt label="Plantilla segura">{`Antes de hacer ningún cambio, explícame tu plan paso a paso y espera mi aprobación. Solo entonces empieza.`}</Prompt>

        <h2>4. Da contexto: pega errores, datos y ejemplos</h2>
        <p>
          No describas el error con tus palabras: <strong>pégalo entero</strong>.
          No expliques cómo son tus datos: enséñale el archivo.
        </p>
        <Comparison
          bad="Me da un error al ejecutar el programa"
          good={`Al ejecutar "python app.py" me sale este error:

Traceback (most recent call last):
  File "app.py", line 12, in <module>
    print(precio * cantidad)
TypeError: can't multiply sequence by non-int

¿Qué significa y cómo lo arreglo?`}
        />

        <h2>5. Divide las tareas grandes</h2>
        <p>
          En lugar de pedir todo de golpe, ve por partes. Claude trabaja mejor y tú
          entiendes lo que va pasando.
        </p>
        <Comparison
          bad="Hazme una tienda online completa con carrito, pagos, usuarios y panel de administración"
          good="Vamos a hacer una tienda online paso a paso. Empecemos solo por la página que muestra la lista de productos. Cuando funcione, seguimos con el carrito."
        />

        <h2>6. Describe el resultado que quieres, no la solución técnica</h2>
        <p>
          No tienes que saber <em>cómo</em> se hace. Describe <em>qué</em> quieres
          conseguir y deja que Claude proponga el cómo.
        </p>
        <Comparison
          bad="Usa un useEffect con un debounce y memoización"
          good="Quiero que cuando el usuario escriba en el buscador, los resultados se filtren solos sin tener que pulsar un botón, pero que no vaya lento aunque escriba rápido."
        />

        <h2>7. Pide que te corrija y te enseñe</h2>
        <p>
          Claude Code no es solo para que haga el trabajo: úsalo para mejorar tú.
        </p>
        <Prompt label="Modo aprendizaje">{`Cuando termines, dime: ¿qué he hecho yo mal o de forma poco eficiente? ¿Qué debería aprender para hacer esto mejor la próxima vez por mi cuenta?`}</Prompt>

        <h2>Plantillas listas para usar</h2>
        <p>Copia, rellena los corchetes y pega:</p>

        <h3>📌 Para crear algo nuevo</h3>
        <Prompt>{`Quiero crear [qué quieres]. Lo usaré para [para qué sirve]. Soy [tu nivel: principiante/intermedio]. Usa [tecnología, o "lo que recomiendes"]. Explícame los pasos importantes mientras lo haces.`}</Prompt>

        <h3>📌 Para arreglar algo</h3>
        <Prompt>{`Tengo este problema: [qué pasa]. Esperaba que pasara: [qué debería pasar]. Lo que veo: [qué ves, pega errores]. Investiga la causa, arréglalo y explícame qué estaba mal.`}</Prompt>

        <h3>📌 Para entender algo</h3>
        <Prompt>{`Explícame [el concepto o el archivo] como si tuviera poca experiencia. Usa una analogía sencilla y un ejemplo pequeño. Luego dime para qué se usa en la práctica.`}</Prompt>

        <h3>📌 Para mejorar lo que ya tienes</h3>
        <Prompt>{`Revisa [archivo o carpeta]. Dime qué se puede mejorar en cuanto a claridad, errores potenciales y buenas prácticas. Aplica las mejoras importantes y explícame por qué.`}</Prompt>

        <div className="callout callout-tip">
          <strong>El mejor consejo de todos:</strong> habla con Claude Code como
          hablarías con un compañero de trabajo paciente. No necesitas comandos
          mágicos ni vocabulario técnico. La claridad gana siempre.
        </div>

        <h2>Errores comunes al empezar</h2>
        <ul>
          <li>
            <strong>Aceptar cambios sin leerlos.</strong> Claude muestra un diff
            antes de editar. Léelo: así aprendes y detectas si algo no es lo que querías.
          </li>
          <li>
            <strong>No dar contexto del proyecto.</strong> Si tienes un{" "}
            <code>CLAUDE.md</code> (ver{" "}
            <Link href="/configuracion">Configuración</Link>), Claude entiende mucho
            mejor tu proyecto desde el primer mensaje.
          </li>
          <li>
            <strong>Rendirse al primer intento.</strong> Si la respuesta no es lo que
            querías, no empieces de cero: dile <em>"casi, pero quería que además..."</em>
            y refina.
          </li>
          <li>
            <strong>Pedir demasiado de una vez.</strong> Tareas enormes en un solo
            prompt salen peor. Divide y vencerás.
          </li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/recetas" className="text-sm text-zinc-500 hover:text-zinc-300">← Recetas prácticas</Link>
        <Link href="/comandos" className="text-sm text-orange-400 hover:text-orange-300">Comandos →</Link>
      </div>
    </div>
  );
}
