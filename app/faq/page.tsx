import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import Faq from "@/components/Faq";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Preguntas frecuentes — Aprende Claude Code",
  description:
    "Respuestas a las dudas más habituales sobre Claude Code: precio, seguridad, privacidad, si reemplaza a programadores y más.",
};

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Preguntas frecuentes</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="circleQuestion">Preguntas frecuentes</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Las dudas que casi todo el mundo tiene al empezar con Claude Code,
          respondidas sin rodeos.
        </p>
      </div>

      <SectionHeading icon="briefcase">Coste y cuenta</SectionHeading>

      <Faq question="¿Cuánto cuesta usar Claude Code?">
        <p>
          Claude Code en sí es gratuito de instalar. Lo que se paga es el{" "}
          <strong>uso del modelo de IA</strong>. Hay dos formas:
        </p>
        <p>
          <strong>1) Con tu suscripción a Claude</strong> (planes Pro / Max): usas
          Claude Code dentro de los límites de tu plan, sin pagar aparte por cada uso.
          Es lo más cómodo y predecible si ya eres suscriptor.
        </p>
        <p>
          <strong>2) Con una API key</strong> (pago por uso): pagas por la cantidad de
          texto que procesas (tokens). Bien para uso ocasional o automatizaciones.
          Consulta precios actuales en la web de Anthropic.
        </p>
      </Faq>

      <Faq question="¿Necesito tarjeta de crédito para empezar?">
        <p>
          Si usas tu suscripción de Claude, no necesitas nada más. Si vas por la vía de
          la API, Anthropic suele dar créditos gratuitos al registrarte para que pruebes
          sin gastar. Para uso continuado por API sí necesitarás un método de pago.
        </p>
      </Faq>

      <Faq question="¿Cómo controlo lo que gasto?">
        <p>
          Dentro de Claude Code, el comando <code>/status</code> te muestra el uso de la
          sesión. Si usas API, el panel de <code>console.anthropic.com</code> tiene el
          consumo y puedes ponerte <strong>límites de gasto</strong>. Consejo: usa el
          alias <code>sonnet</code> para el día a día y reserva <code>opus</code>{" "}
          para tareas que de verdad lo necesiten.
        </p>
      </Faq>

      <SectionHeading icon="lock">Seguridad y privacidad</SectionHeading>

      <Faq question="¿Es seguro darle acceso a mis archivos?">
        <p>
          Sí, con sensatez. Claude Code <strong>pide confirmación</strong> antes de
          editar archivos o ejecutar comandos importantes, y siempre te muestra qué va a
          cambiar. Tú tienes el control en todo momento. Para máxima tranquilidad, trabaja
          en proyectos con <Link href="/cursos/claude-code/glosario">git</Link> (puedes deshacer cualquier
          cosa) y revisa los cambios antes de aceptarlos. Más detalle en{" "}
          <Link href="/cursos/claude-code/permisos">Permisos</Link>.
        </p>
      </Faq>

      <Faq question="¿Claude Code lee TODO mi ordenador?">
        <p>
          No. Trabaja sobre la carpeta del proyecto desde la que lo lanzas y los
          subdirectorios. No anda husmeando por todo el disco. Y no puede leer tus
          contraseñas o secretos a menos que estén en archivos del proyecto o se los
          pases tú explícitamente.
        </p>
      </Faq>

      <Faq question="¿Se usan mis datos o mi código para entrenar la IA?">
        <p>
          Las políticas de datos dependen de tu tipo de cuenta y configuración. Como
          norma general, el uso por API empresarial tiene políticas estrictas de
          retención. Revisa siempre la política de privacidad y los términos de Anthropic
          para tu caso concreto, sobre todo si trabajas con código sensible o de empresa.
        </p>
      </Faq>

      <Faq question="¿Puede Claude Code borrar o romper algo importante?">
        <p>
          En el modo normal pide permiso antes de acciones peligrosas, así que es difícil.
          El riesgo aparece si usas <code>--dangerously-skip-permissions</code> (omite las
          confirmaciones): úsalo solo en entornos controlados. Y configura una lista de
          comandos prohibidos en <Link href="/cursos/claude-code/permisos">Permisos</Link> (como{" "}
          <code>rm -rf</code>). Con git, además, todo es reversible.
        </p>
      </Faq>

      <SectionHeading icon="laptopCode">Uso y aprendizaje</SectionHeading>

      <Faq question="¿Necesito saber programar para usar Claude Code?">
        <p>
          No para empezar. Puedes pedirle cosas en lenguaje natural y aprender mientras
          ves cómo trabaja. Eso sí: cuanto más entiendas, mejor podrás dirigirlo y
          detectar si algo no está bien. Por eso recomendamos <Link href="/cursos/claude-code/proyectos">
          construir proyectos guiados</Link> pidiéndole que te explique cada paso.
        </p>
      </Faq>

      <Faq question="¿Claude Code va a reemplazar a los programadores?">
        <p>
          Más que reemplazar, cambia el trabajo. El rol se desplaza de "escribir cada
          línea" a <strong>decidir qué construir, dirigir a la IA y revisar con criterio</strong>.
          Entender de programación sigue siendo valiosísimo: es lo que te permite pedir
          bien, revisar bien y darte cuenta cuando algo está mal.
        </p>
      </Faq>

      <Faq question="¿En qué lenguajes de programación funciona?">
        <p>
          En todos los habituales: Python, JavaScript/TypeScript, Java, Go, Rust, C#, PHP,
          Ruby, HTML/CSS, SQL... y más. Claude Code lee y escribe en el lenguaje de tu
          proyecto. No tienes que elegir: trabaja con lo que ya tengas.
        </p>
      </Faq>

      <Faq question="¿Funciona sin conexión a internet?">
        <p>
          No. Claude Code necesita conexión porque el modelo de IA se ejecuta en los
          servidores de Anthropic, no en tu ordenador. Lo que sí es local son tus
          archivos: solo se envía a la IA el contexto necesario para tu petición.
        </p>
      </Faq>

      <Faq question="¿Qué modelo debería usar?">
        <p>
          Para el día a día, usa <code>sonnet</code>: rápido y muy capaz. Para
          tareas de mucho razonamiento o problemas difíciles, sube a <code>opus</code>.
          Para tareas simples y muy repetitivas, <code>haiku</code> suele ser más
          barato. Lo ves todo en{" "}
          <Link href="/cursos/claude-code/comandos">Comandos</Link>.
        </p>
      </Faq>

      <SectionHeading icon="compare">Comparativas</SectionHeading>

      <Faq question="¿En qué se diferencia de ChatGPT o de la web de Claude?">
        <p>
          La diferencia clave es que Claude Code <strong>vive en tu terminal y actúa
          sobre tu proyecto real</strong>: lee tus archivos, los edita, ejecuta comandos,
          corre tests y hace commits. Un chat web te da texto que tú copias y pegas;
          Claude Code hace el trabajo directamente, con tu permiso.
        </p>
      </Faq>

      <Faq question="¿Necesito un editor de código concreto?">
        <p>
          No, funciona en cualquier terminal. Pero si usas <strong>VS Code</strong> o un
          IDE de <strong>JetBrains</strong>, hay extensiones que lo integran en el editor.
          Mira <Link href="/cursos/claude-code/configuracion">Configuración</Link> para los detalles.
        </p>
      </Faq>

      <Faq question="¿Tengo que actualizarlo a menudo?">
        <p>
          Claude Code se actualiza con frecuencia y conviene estar al día para tener las
          últimas funciones. Comprueba tu versión con <code>claude --version</code> y
          actualiza con <code>npm update -g @anthropic-ai/claude-code</code>.
        </p>
      </Faq>

      <div className="mt-10 callout callout-tip">
        <strong>¿No está tu duda aquí?</strong> Pregúntasela directamente a Claude Code:
        escribe <em>"explícame [tu duda] sobre cómo funcionas"</em>. O revisa la{" "}
        <Link href="/cursos/claude-code/problemas">solución de problemas</Link> si algo no te funciona.
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/proyectos" className="text-sm text-zinc-500 hover:text-zinc-300">← Proyectos guiados</Link>
        <Link href="/cursos/claude-code/problemas" className="text-sm text-orange-400 hover:text-orange-300">Solución de problemas →</Link>
      </div>
    </div>
  );
}
