import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Facturas, OCR y Verifactu con revisión humana — IA para pymes",
  description:
    "Flujo práctico para extraer facturas con OCR e IA, preparar datos revisables y evitar automatizar decisiones fiscales sin control humano.",
  keywords: ["Verifactu IA", "OCR facturas IA", "facturación electrónica IA", "automatizar facturas pyme", "IA autónomos España"],
  alternates: { canonical: "/cursos/ia-pymes/facturas-verifactu-ocr" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Facturas y Verifactu"
      title="Facturas, OCR y Verifactu con revisión humana"
      icon="fileContract"
      lead={<>La IA puede leer facturas, ordenar campos y señalar incoherencias. Lo que no debe hacer al principio es cerrar contabilidad, impuestos o envíos legales sin revisión humana y software adecuado.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Diseñar un flujo OCR → JSON → CSV revisable.</li>
          <li>Marcar alertas para totales, fechas, NIF y duplicados.</li>
          <li>Separar ayuda administrativa de cumplimiento fiscal.</li>
        </ul>
      </Objetivos>

      <Cristiano term="Verifactu">
        Es el marco español para sistemas de facturación verificables. Si tu flujo acaba emitiendo o registrando facturas, necesitas software y trazabilidad adecuados.
      </Cristiano>

      <Terminal>{`Pipeline recomendado:
1. Subir factura a carpeta "entrada"
2. OCR local o proveedor con contrato
3. IA extrae JSON con campos obligatorios
4. Reglas validan importes, NIF, fecha y duplicados
5. Persona aprueba o corrige
6. Export CSV / integración con herramienta contable
7. Registro de evidencia y cambios`}</Terminal>

      <Idea>
        El mejor primer proyecto no “automatiza la gestoría”: reduce picado manual y deja una bandeja de revisión limpia.
      </Idea>

      <Cuidado>
        Verifactu y facturación electrónica cambian por normativa y calendario. Revisa siempre fuentes oficiales y tu programa contable antes de automatizar emisión o envío.
      </Cuidado>

      <Terminal>{`alertas:
  - tipo: "total_no_cuadra"
    detalle: "base + iva no coincide con total"
  - tipo: "posible_duplicado"
    detalle: "mismo proveedor, fecha e importe"
  - tipo: "revision_humana"
    detalle: "importe superior a 1000 EUR"`}</Terminal>

      <Comprueba>
        Prueba 10 facturas reales anonimizadas y 5 casos trampa: duplicado, IVA incorrecto, NIF ausente, total mal sumado y factura borrosa.
      </Comprueba>

      <Guardar>
        Guarda original, texto OCR, JSON extraído, alertas y decisión humana. Esa trazabilidad vale más que una automatización opaca.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://sede.agenciatributaria.gob.es/" target="_blank" rel="noopener noreferrer">Agencia Tributaria</a></li>
          <li><a href="https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html" target="_blank" rel="noopener noreferrer">Sistemas informáticos de facturación y Verifactu</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/facturas", label: "Facturas" }}
        next={{ href: "/cursos/ia-pymes/presupuestos-excel", label: "Presupuestos y Excel" }}
      />
    </Chapter>
  );
}
