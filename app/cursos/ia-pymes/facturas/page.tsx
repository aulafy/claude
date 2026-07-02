import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Facturas: extraer datos y revisar — IA para pymes y autónomos",
  description:
    "Cómo usar IA para extraer datos de facturas, convertirlos a JSON, detectar errores y preparar revisión sin sustituir a tu gestoría.",
  keywords: ["IA facturas", "extraer datos facturas IA", "facturas PDF IA local", "automatizar facturas autónomos"],
  alternates: { canonical: "/cursos/ia-pymes/facturas" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Facturas"
      title="Facturas: extraer datos y revisar"
      icon="fileContract"
      lead={<>Las facturas son uno de los mejores casos de uso para IA en oficina: extracción, revisión y organización. Pero no dejes que el modelo decida impuestos o contabilidad final sin supervisión.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Convertir facturas en datos estructurados.</li>
          <li>Detectar campos faltantes o incoherentes.</li>
          <li>Preparar un CSV revisable por una persona.</li>
        </ul>
      </Objetivos>

      <Cristiano term="extracción estructurada">
        Es pedir a la IA que no “resuma” una factura, sino que devuelva campos concretos: emisor, fecha, base, IVA, total, vencimiento y concepto.
      </Cristiano>

      <Terminal>{`Devuelve SOLO JSON válido con esta estructura:
{
  "numero_factura": "",
  "fecha": "",
  "emisor": "",
  "nif_emisor": "",
  "cliente": "",
  "base_imponible": 0,
  "iva": 0,
  "total": 0,
  "vencimiento": "",
  "alertas": []
}

Si falta un dato, deja el campo vacío y añade una alerta.`}</Terminal>

      <Idea>
        La IA puede preparar el trabajo; la contabilidad final debe revisarla una persona. El valor está en ahorrar lectura y picado manual, no en delegar responsabilidad.
      </Idea>

      <div className="prose">
        <h2>Checks automáticos útiles</h2>
        <ul>
          <li>Total = base + IVA - retenciones, si aplica.</li>
          <li>Fecha y vencimiento tienen formato coherente.</li>
          <li>NIF/CIF no está vacío.</li>
          <li>Proveedor ya existe o se marca como nuevo.</li>
          <li>Importe alto requiere revisión manual.</li>
        </ul>
      </div>

      <Cuidado>
        No subas facturas reales a servicios externos sin revisar base legal, contrato, finalidad y retención. Para empezar, usa IA local o datos de prueba.
      </Cuidado>

      <Comprueba>
        Procesa tres facturas de prueba: una perfecta, una con campo ausente y una con total incoherente. El sistema debe extraer la primera y marcar alertas en las otras dos.
      </Comprueba>

      <Guardar>
        Salida recomendada: JSON por factura y un CSV mensual revisable. Evita que el modelo escriba directamente en tu programa contable al principio.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/emails", label: "Emails" }}
        next={{ href: "/cursos/ia-pymes/presupuestos-excel", label: "Presupuestos y Excel" }}
      />
    </Chapter>
  );
}
