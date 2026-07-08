import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Presupuestos, Excel y Sheets",
  description:
    "Usa IA para crear presupuestos revisables, limpiar hojas de cálculo, cruzar datos y generar informes para una pyme.",
  keywords: ["IA Excel pymes", "IA presupuestos autónomos", "automatizar presupuestos IA", "IA Google Sheets"],
  alternates: { canonical: "/cursos/ia-pymes/presupuestos-excel" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Presupuestos y Excel"
      title="Presupuestos, Excel y Sheets"
      icon="spreadsheet"
      lead={<>Mucho trabajo de oficina vive en hojas de cálculo. La IA es útil cuando limpia datos, cruza tablas y crea borradores de presupuesto que una persona puede revisar.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Convertir peticiones de cliente en borradores de presupuesto.</li>
          <li>Limpiar hojas de cálculo sin perder trazabilidad.</li>
          <li>Crear informes simples a partir de CSV o Sheets.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Plantilla de presupuesto</h2>
      </div>

      <Terminal>{`Entrada:
- mensaje del cliente
- catálogo de servicios
- tarifas base
- condiciones estándar

Salida:
- resumen de necesidad
- líneas de presupuesto
- supuestos usados
- dudas pendientes
- texto de email para enviar tras revisión`}</Terminal>

      <Idea>
        Obliga al sistema a separar “datos confirmados” de “supuestos”. Así evitas presupuestos que parecen seguros pero se inventan condiciones.
      </Idea>

      <div className="prose">
        <h2>Prompt para hojas de cálculo</h2>
      </div>

      <Terminal>{`Analiza ventas.csv.
No modifiques el archivo original.
Crea ventas_limpio.csv con:
- fechas en formato ISO
- importes como número
- categorías normalizadas
- filas duplicadas separadas en duplicados.csv
Después crea informe.md con:
- total mensual
- top 5 productos
- anomalías detectadas
- dudas para revisar`}</Terminal>

      <Cuidado>
        Trabaja siempre sobre copias. En hojas de cálculo, un cambio silencioso puede ser peor que una respuesta mala.
      </Cuidado>

      <Comprueba>
        Crea una hoja con duplicados, fechas mezcladas e importes con coma/punto. La IA debe producir una versión limpia y un informe de cambios.
      </Comprueba>

      <Guardar>
        Para pymes, el mejor flujo no sustituye Excel: lo convierte en un sistema más ordenado, con copias, informes y revisiones.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/facturas", label: "Facturas" }}
        next={{ href: "/cursos/ia-pymes/whatsapp-atencion", label: "WhatsApp y Telegram" }}
      />
    </Chapter>
  );
}
