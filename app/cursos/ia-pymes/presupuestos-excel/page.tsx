import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Excel con IA: cómo verificar fórmulas y evitar errores silenciosos",
  description:
    "Tutorial práctico en español para usar Copilot, Claude o ChatGPT con Excel sin aceptar fórmulas incorrectas. Incluye un XLSX sintético, controles y pruebas.",
  keywords: [
    "Excel con IA",
    "verificar fórmulas Excel IA",
    "Copilot Excel tutorial español",
    "Claude Excel español",
    "errores fórmulas Excel",
    "IA para pymes",
  ],
  alternates: { canonical: "/cursos/ia-pymes/presupuestos-excel" },
};

const lab =
  "https://github.com/aulafy/taller/tree/main/cursos/ia-pymes/laboratorios/verificar-excel-con-ia";
const workbook =
  "https://github.com/aulafy/taller/raw/refs/heads/main/cursos/ia-pymes/laboratorios/verificar-excel-con-ia/outputs/verificar-excel-con-ia.xlsx";

export default function Page() {
  return (
    <Chapter
      crumb="Excel con IA"
      title="Excel con IA: verifica la fórmula, no su tono de seguridad"
      icon="spreadsheet"
      lead={<>Una fórmula puede ser válida, devolver un número razonable y estar equivocada. Aprende un protocolo independiente del asistente para encontrar errores antes de entregar una hoja.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Distinguir una propuesta generativa de un cálculo reproducible.</li>
          <li>Detectar rangos incompletos, condiciones omitidas y errores silenciosos.</li>
          <li>Probar una fórmula con casos conocidos, límites y una conciliación independiente.</li>
          <li>Usar archivos y datos de forma prudente, sin depender de una suscripción.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>El error que Excel no marca</h2>
        <p>
          <code>=E2*F2</code> es una fórmula válida. Si la venta tiene un descuento en <code>H2</code>,
          también puede ser una fórmula incorrecta. Excel no mostrará <code>#REF!</code> ni un
          triángulo: calculará exactamente lo que se le pidió, aunque falte una condición del negocio.
        </p>
        <p>
          La documentación actual de Microsoft advierte que la función COPILOT puede producir respuestas
          incorrectas y recomienda fórmulas nativas como <code>SUM</code>, <code>AVERAGE</code>,
          <code>IF</code> o <code>XLOOKUP</code> cuando importan la precisión y la reproducibilidad.
          La FAQ de Copilot añade que hay que revisar, editar y verificar lo generado.
        </p>
      </div>

      <Idea>
        Usa la IA para explicar, proponer y revisar. Usa el motor de la hoja, casos cuyo resultado ya conoces
        y una conciliación separada para demostrar que el cálculo es correcto.
      </Idea>

      <div className="prose">
        <h2>Qué delegar y qué conservar</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tarea</th>
                <th>La IA puede ayudar</th>
                <th>La comprobación sigue siendo tuya</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Entender una fórmula</td>
                <td>Explicarla en lenguaje sencillo y enumerar referencias</td>
                <td>Confirmar que esas referencias corresponden a la regla real</td>
              </tr>
              <tr>
                <td>Proponer una fórmula</td>
                <td>Crear un primer borrador con supuestos explícitos</td>
                <td>Probar casos conocidos, vacíos, ceros, descuentos y duplicados</td>
              </tr>
              <tr>
                <td>Clasificar texto</td>
                <td>Etiquetar comentarios o resumir observaciones</td>
                <td>Medir errores sobre una muestra y decidir si el cambio es aceptable</td>
              </tr>
              <tr>
                <td>Calcular un KPI</td>
                <td>Ayudar a localizar columnas y formular el criterio</td>
                <td>Calcular con fórmulas nativas y conciliar con otra ruta</td>
              </tr>
              <tr>
                <td>Modificar un libro</td>
                <td>Sugerir o ejecutar cambios visibles</td>
                <td>Trabajar sobre copia, revisar celdas tocadas y conservar recuperación</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Cuidado>
        Microsoft indica que el resultado de COPILOT puede cambiar con la evolución del modelo aun usando
        los mismos argumentos. No lo utilices como motor de cálculo para informes financieros, obligaciones
        legales ni otras decisiones que exijan exactitud y repetibilidad.
      </Cuidado>

      <div className="prose">
        <h2>Protocolo CASCO: cinco controles antes de aceptar</h2>
        <ol>
          <li><strong>Copia:</strong> conserva el archivo original y trabaja en una versión fechada.</li>
          <li><strong>Audita:</strong> muestra la fórmula y lee en voz alta cada rango, condición y referencia.</li>
          <li><strong>Somete a casos:</strong> prueba un caso fácil, uno con condición y un límite.</li>
          <li><strong>Concilia:</strong> calcula el total por una ruta independiente y compara la diferencia.</li>
          <li><strong>Observa y documenta:</strong> registra celdas cambiadas, supuestos, fallos y responsable.</li>
        </ol>
        <p>
          Superar un único ejemplo no valida la fórmula. El caso fácil puede ocultar justo la rama que falta:
          un descuento, un valor vacío, una fila nueva o una referencia fuera del rango.
        </p>

        <h2>Laboratorio: caza dos errores plausibles</h2>
        <p>
          El ejercicio contiene 12 ventas completamente sintéticas. Una fórmula propuesta por una supuesta IA
          omite los descuentos; el total, además, termina una fila antes. Ningún error aparece como mensaje de
          Excel. Tu trabajo es demostrarlo, no adivinarlo.
        </p>
        <p>
          <a href={workbook}><strong>Descargar el libro XLSX del laboratorio</strong></a>
          {" · "}
          <a href={lab}>Abrir código, CSV, solución y pruebas MIT</a>
        </p>
        <ol>
          <li>Descarga el XLSX y guarda una copia. No necesitas subirlo a ningún asistente.</li>
          <li>Abre <strong>EMPIEZA AQUI</strong> y después <strong>Ventas</strong>.</li>
          <li>Compara las columnas amarillas «propuesta IA» con las verdes «verificadas».</li>
          <li>Activa <strong>Mostrar fórmulas</strong> y revisa qué ocurre con la columna Descuento.</li>
          <li>Prueba DEMO-001, DEMO-002 y DEMO-009: 0 %, 10 % y 15 %.</li>
          <li>Comprueba si el total incluye DEMO-012 y termina en la hoja <strong>Control</strong>.</li>
        </ol>
      </div>

      <Comprueba>
        Debes encontrar 3 filas con error silencioso, ventas verificadas de 4.024 €, margen de 2.434 € y
        una diferencia de -64 € en el total propuesto con rango corto. Si solo miras el primer caso, la fórmula
        parece correcta.
      </Comprueba>

      <div className="prose">
        <h2>Un encargo prudente para cualquier asistente</h2>
      </div>

      <Terminal>{`Trabaja únicamente con la copia y no guardes ni envíes el archivo.
Antes de proponer cambios:
1. Explica la regla de negocio con tus palabras.
2. Enumera las columnas y rangos que utilizarías.
3. Señala los supuestos que todavía no están confirmados.
4. Propón la fórmula sin aplicarla.
5. Diseña tres casos de prueba: normal, condición y límite.
6. Indica cómo conciliarías el total por una ruta independiente.

No ocultes errores con IFERROR hasta haber explicado su causa.
No cambies fórmulas, nombres de hojas ni datos sin mi aprobación.`}</Terminal>

      <div className="prose">
        <h2>Cuando el asistente trabaja dentro de Excel</h2>
        <p>
          Claude for Excel puede citar celdas, resaltar cambios, explicar fórmulas y mantener un registro de
          sesión. Anthropic sigue desaconsejándolo para entregables finales sin revisión humana, cálculos de
          auditoría sin verificación y libros con datos altamente sensibles sin controles adecuados.
        </p>
        <p>
          Una hoja externa tampoco es contexto neutral: celdas, fórmulas o comentarios pueden contener
          instrucciones dirigidas al agente. Anthropic documenta este riesgo de inyección de prompts y
          recomienda trabajar únicamente con hojas de confianza. Revisa cada acción externa y cada
          modificación destructiva antes de autorizarla.
        </p>

        <h2>Privacidad, coste y disponibilidad</h2>
        <ul>
          <li><strong>Datos:</strong> practica con información sintética o autorizada y minimizada.</li>
          <li><strong>Planes:</strong> las funciones integradas pueden exigir licencias de Microsoft o Claude.</li>
          <li><strong>Red:</strong> COPILOT necesita conexión; el laboratorio de Aulafy funciona sin red.</li>
          <li><strong>Límites:</strong> disponibilidad, cuotas, formatos y modelos cambian; comprueba las fuentes.</li>
          <li><strong>Alternativa:</strong> una fórmula nativa y una revisión manual siguen funcionando sin IA.</li>
        </ul>

        <h2>Fuentes primarias y estado de verificación</h2>
        <ul>
          <li><a href="https://support.microsoft.com/en-us/excel/functions/copilot-function">Microsoft · COPILOT Function</a></li>
          <li><a href="https://support.microsoft.com/en-US/Excel/copilot/frequently-asked-questions-about-copilot-in-excel">Microsoft · FAQ de Copilot en Excel</a></li>
          <li><a href="https://support.microsoft.com/en-us/excel/detect-formula-errors-in-excel">Microsoft · detectar errores de fórmulas</a></li>
          <li><a href="https://support.microsoft.com/en-us/excel/display-the-relationships-between-formulas-and-cells">Microsoft · rastrear precedentes y dependientes</a></li>
          <li><a href="https://support.claude.com/en/articles/12650343-use-claude-for-excel">Anthropic · usar Claude for Excel</a></li>
        </ul>
        <p><strong>Comprobado el 27 de julio de 2026.</strong> Alcance volátil: funciones, planes, límites e interfaces. Próxima revisión editorial: 3 de agosto de 2026.</p>
      </div>

      <Guardar>
        Una hoja está lista cuando sus fórmulas se pueden explicar, sus casos límite pasan y sus totales
        concilian. Que un asistente diga «he terminado» no forma parte de la evidencia.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/facturas-verifactu-ocr", label: "Facturas, OCR y Verifactu" }}
        next={{ href: "/cursos/ia-pymes/convertir-extracto-csv", label: "Convertir extracto a CSV" }}
      />
    </Chapter>
  );
}
