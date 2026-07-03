import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import Prompt from "@/components/Prompt";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Claude Code para pymes y oficina — Aprende Claude Code",
  description:
    "Casos reales de oficina con Claude Code para autónomos y pymes: analizar Excel/CSV, generar facturas y documentos, automatizar tareas e informes. Con prompts listos para copiar.",
};

const sections: Array<{ href: string; icon: IconName; label: string }> = [
  { href: "#datos", icon: "spreadsheet", label: "Hojas de cálculo y datos" },
  { href: "#documentos", icon: "document", label: "Documentos y plantillas" },
  { href: "#automatizar", icon: "automation", label: "Automatizar tareas repetitivas" },
  { href: "#informes", icon: "chart", label: "Informes y análisis" },
  { href: "#comunicacion", icon: "email", label: "Comunicación y clientes" },
  { href: "#web", icon: "globe", label: "Tu presencia online" },
];

export default function Pymes() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Claude Code para pymes y oficina</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="building">Claude Code para pymes y oficina</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Aunque Claude Code es una herramienta para programar, su verdadero
          superpoder —trabajar con TUS archivos y automatizar tu ordenador— lo
          hace utilísimo para autónomos y pequeñas empresas, aunque no sepas
          programar. Aquí tienes casos reales de oficina que te ahorran horas,
          con el prompt listo para copiar.
        </p>
      </div>

      <div className="callout callout-info mb-6">
        Para seguir esta página necesitas tener Claude Code instalado (
        <Link href="/cursos/claude-code/instalacion">Instalación</Link>) y abrirlo escribiendo{" "}
        <code>claude</code> dentro de la carpeta donde tienes tus archivos.
      </div>

      <div className="callout callout-warning mb-8">
        <strong>Seguridad:</strong> trabaja siempre con COPIAS de tus archivos
        importantes, y para tareas que modifican archivos añade al prompt{" "}
        <em>&quot;primero enséñame qué harías sin tocar nada&quot;</em>.
      </div>

      <div className="mb-12 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">En esta página</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm">
          {sections.map((item) => (
            <a key={item.href} href={item.href} className="inline-flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors">
              <Icon name={item.icon} />
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="prose">
        <SectionHeading id="datos" icon="spreadsheet">Hojas de cálculo y datos</SectionHeading>
        <p>
          Para sacar conclusiones rápidas de un CSV o preparar datos antes de
          enviarlos a otra herramienta.
        </p>

        <h3>Resumen de ventas para una reunión</h3>
        <Prompt>{`Analiza este archivo [ventas.csv]: dime el total de ventas, el mejor mes, el producto más vendido y hazme un resumen en 5 puntos que pueda enseñar en una reunión.`}</Prompt>

        <h3>Limpiar una lista de contactos</h3>
        <Prompt>{`Limpia este archivo [contactos.csv]: unifica los formatos de teléfono, quita filas duplicadas y corrige los nombres que están en mayúsculas. Enséñame un ejemplo de antes y después.`}</Prompt>

        <h3>Cruzar clientes y pedidos</h3>
        <Prompt>{`Cruza estos dos archivos: [clientes.csv] y [pedidos.csv]. Dime qué clientes no han hecho ningún pedido en los últimos 6 meses para poder contactarlos.`}</Prompt>

        <SectionHeading id="documentos" icon="document">Documentos y plantillas</SectionHeading>
        <p>
          Úsalo para convertir, resumir o generar documentos repetitivos sin
          copiar y pegar a mano.
        </p>

        <h3>Facturas desde una plantilla</h3>
        <Prompt>{`Tengo una plantilla de factura en [plantilla.docx] y los datos de clientes en [clientes.csv]. Genera una factura por cada cliente rellenando la plantilla. Empieza con las 3 primeras para que las revise.`}</Prompt>

        <h3>Resumir PDFs de una carpeta</h3>
        <Prompt>{`Convierte todos los PDF de esta carpeta a texto y hazme un resumen de media página de cada uno.`}</Prompt>

        <h3>Crear una plantilla de presupuesto</h3>
        <Prompt>{`Créame una plantilla profesional de presupuesto en un documento, con mis datos: [nombre empresa, CIF, logo opcional], que pueda reutilizar y rellenar fácilmente.`}</Prompt>

        <SectionHeading id="automatizar" icon="automation">Automatizar tareas repetitivas</SectionHeading>
        <p>
          Ideal para trabajos aburridos que se repiten cada semana: ordenar,
          renombrar, generar resúmenes o preparar archivos.
        </p>

        <h3>Organizar una carpeta caótica</h3>
        <Prompt>{`Organiza esta carpeta metiendo cada archivo en subcarpetas por tipo (Facturas, Imágenes, Documentos, etc.). Primero enséñame el plan de qué movería, sin mover nada.`}</Prompt>

        <h3>Renombrar archivos por lote</h3>
        <Prompt>{`Renombra todos los archivos de esta carpeta para que empiecen por la fecha y un nombre descriptivo: [evento o proyecto]. Muéstrame cómo quedarían los 5 primeros antes de hacerlo.`}</Prompt>

        <h3>Programa pequeño para pedidos diarios</h3>
        <Prompt>{`Crea un pequeño programa que, cuando lo ejecute, lea [pedidos.csv] y me genere un resumen de los pedidos nuevos del día. Explícamelo como si no supiera programar.`}</Prompt>

        <SectionHeading id="informes" icon="chart">Informes y análisis</SectionHeading>
        <p>
          Pídele que convierta datos en gráficos, documentos y conclusiones
          claras para compartir.
        </p>

        <h3>Gráfico de gastos por categoría</h3>
        <Prompt>{`Con los datos de [gastos.csv], crea un gráfico de barras de gastos por categoría y guárdalo como imagen para meterlo en mi informe.`}</Prompt>

        <h3>Informe mensual de ventas</h3>
        <Prompt>{`Genera un informe mensual en un documento a partir de [ventas.csv]: incluye totales, comparación con el mes anterior, y 3 conclusiones claras.`}</Prompt>

        <SectionHeading id="comunicacion" icon="email">Comunicación y clientes</SectionHeading>
        <p>
          También puede ayudarte a detectar patrones en opiniones de clientes y
          preparar respuestas profesionales.
        </p>

        <h3>Detectar problemas repetidos en reseñas</h3>
        <Prompt>{`Lee las reseñas de [resenas.csv] y dime los 5 problemas que más repiten los clientes y una propuesta de mejora para cada uno.`}</Prompt>

        <h3>Plantillas de email</h3>
        <Prompt>{`Redáctame 3 plantillas de email para responder a [situación: p. ej. una reclamación], en tono cercano pero profesional, de menos de 150 palabras cada una.`}</Prompt>

        <SectionHeading id="web" icon="globe">Tu presencia online sin saber programar</SectionHeading>
        <p>
          Si necesitas una web sencilla para validar presencia online, puede
          crear una primera versión lista para revisar.
        </p>

        <h3>Web de una sola página</h3>
        <Prompt>{`Créame una web sencilla de una sola página para mi negocio de [tipo de negocio], con mi nombre, qué ofrezco, horarios, ubicación y un botón de contacto por WhatsApp. Que se vea moderna y funcione en el móvil. Al terminar dime cómo publicarla gratis.`}</Prompt>

        <div className="callout callout-orange">
          <strong>El patrón ganador para una pyme:</strong> pon todos los archivos
          de la tarea en una carpeta, abre Claude Code ahí, y descríbele el
          resultado que quieres en lenguaje normal. Para más ejemplos, mira{" "}
          <Link href="/cursos/claude-code/recetas">Recetas prácticas</Link> y{" "}
          <Link href="/cursos/claude-code/prompts">Escribir buenos prompts</Link>.
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/recetas" className="text-sm text-zinc-500 hover:text-zinc-300">← Recetas prácticas</Link>
        <Link href="/cursos/claude-code/equipos" className="text-sm text-orange-400 hover:text-orange-300">Para perfiles técnicos →</Link>
      </div>
    </div>
  );
}
