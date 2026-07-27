import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Convertir extractos a CSV con IA sin inventar movimientos",
  description:
    "Tutorial práctico para transformar extractos o Excel con IA y validar filas, fechas, signos, categorías, céntimos y fórmulas antes de importar.",
  keywords: [
    "convertir extracto a CSV con IA",
    "ChatGPT Excel a CSV",
    "Claude convertir extracto bancario",
    "validar CSV inteligencia artificial",
    "IA administración pymes",
    "conciliar CSV",
  ],
  alternates: { canonical: "/cursos/ia-pymes/convertir-extracto-csv" },
};

const lab =
  "https://github.com/aulafy/taller/tree/main/cursos/ia-pymes/laboratorios/convertir-extracto-csv";

export default function Page() {
  return (
    <Chapter
      crumb="Extracto a CSV"
      title="Convierte un extracto a CSV sin inventar, perder ni alterar movimientos"
      icon="spreadsheet"
      lead={<>La IA puede acelerar una transformación de datos. La importación solo debe continuar cuando un control independiente demuestra que conserva identidad, cardinalidad, fechas, signos y total.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Escribir el contrato de salida antes de pedir la conversión.</li>
          <li>Detectar filas inventadas, perdidas, duplicadas o alteradas.</li>
          <li>Normalizar fechas sin intercambiar día y mes.</li>
          <li>Conciliar importes en céntimos y bloquear una importación incorrecta.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Veinte filas no tienen por qué ser las mismas veinte filas</h2>
        <p>
          Una entrada puede contener 20 movimientos y la salida también 20. Eso no demuestra integridad:
          el modelo puede perder una fila e inventar otra. La cantidad coincide mientras cambia el conjunto.
          Por eso cada movimiento necesita un identificador de origen estable que se conserve exactamente una vez.
        </p>
        <p>
          Tampoco basta con abrir el CSV y «verlo bien». Un signo invertido convierte un gasto en ingreso;
          <code>12/06/2026</code> puede transformarse erróneamente en 6 de diciembre; una categoría nueva
          puede romper la importación; y una suma descuadrada puede quedar fuera de la pantalla.
        </p>
      </div>

      <Idea>
        La IA transforma. El contrato restringe. El evaluador demuestra. Una persona aprueba. Ninguna de
        esas cuatro funciones sustituye a las otras.
      </Idea>

      <div className="prose">
        <h2>El contrato de aceptación</h2>
        <div className="table-wrap" role="region" aria-label="Contrato de aceptación para convertir un extracto a CSV" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th>Control</th>
                <th>Regla verificable</th>
                <th>Fallo que evita</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Esquema</td>
                <td>Seis columnas exactas, sin campos adicionales</td>
                <td>Formato incompatible o datos inesperados</td>
              </tr>
              <tr>
                <td>Identidad</td>
                <td>Cada ID del origen aparece una vez</td>
                <td>Filas inventadas, perdidas o duplicadas</td>
              </tr>
              <tr>
                <td>Fecha</td>
                <td>Entrada declarada DD/MM/YYYY; salida YYYY-MM-DD</td>
                <td>Intercambiar día y mes</td>
              </tr>
              <tr>
                <td>Descripción</td>
                <td>Se conserva y no comienza por <code>=</code>, <code>+</code>, <code>-</code> o <code>@</code></td>
                <td>Alteración e interpretación como fórmula</td>
              </tr>
              <tr>
                <td>Categoría</td>
                <td>Valor exacto de un catálogo cerrado</td>
                <td>Etiquetas improvisadas</td>
              </tr>
              <tr>
                <td>Tipo</td>
                <td>Ingreso si es positivo; gasto si es negativo</td>
                <td>Invertir el sentido económico</td>
              </tr>
              <tr>
                <td>Importe</td>
                <td>Mismos céntimos y signo que el origen</td>
                <td>Redondeo o cifra modificada</td>
              </tr>
              <tr>
                <td>Conciliación</td>
                <td>Suma de salida igual a suma de origen</td>
                <td>Importar un conjunto incompleto o alterado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Cuidado>
        No pidas a la IA que invente identificadores después de transformar los datos. Añade el ID estable
        en el origen, antes de la conversión, y trátalo como una clave de trazabilidad.
      </Cuidado>

      <div className="prose">
        <h2>Laboratorio: una propuesta elegante con ocho fallos</h2>
        <p>
          El laboratorio contiene 20 movimientos ficticios y una propuesta de IA deliberadamente defectuosa.
          Conserva 20 filas, pero pierde MOV-DEMO-007 e inventa MOV-DEMO-999. También cambia un signo,
          crea una categoría, interpreta mal una fecha y rompe la conciliación.
        </p>
        <p><a href={lab}><strong>Abrir el laboratorio MIT de extracto a CSV</strong></a></p>
        <ol>
          <li>Lee <code>datos/esquema.json</code> y <code>datos/catalogo.json</code>.</li>
          <li>Ejecuta <code>npm run evaluar:propuesta</code>. Debe terminar con código 1.</li>
          <li>Corrige una copia sin abrir todavía <code>solucion/importacion.csv</code>.</li>
          <li>Repite el evaluador hasta obtener cero errores y diferencia de cero céntimos.</li>
          <li>Ejecuta <code>npm run verificar</code> para contrastar todas las invariantes.</li>
        </ol>
      </div>

      <Comprueba>
        La solución contiene 20 IDs exactos, totaliza 317.941 céntimos y presenta diferencia cero. La
        propuesta defectuosa conserva 20 filas, pero el evaluador devuelve 8 errores y una diferencia de
        23.680 céntimos.
      </Comprueba>

      <div className="prose">
        <h2>Prompt con contrato, no con deseos</h2>
      </div>

      <Terminal>{`Transforma únicamente los movimientos proporcionados.
No añadas, elimines, combines ni dividas filas.

ESQUEMA EXACTO
movimiento_id,fecha_iso,descripcion,categoria,tipo,importe

REGLAS
- conserva movimiento_id sin modificar y exactamente una vez
- la fecha de entrada es DD/MM/YYYY; devuelve YYYY-MM-DD
- conserva la descripción sin resumir ni completar
- categoria debe pertenecer al catálogo adjunto
- tipo: ingreso si importe > 0; gasto si importe < 0
- conserva importe y signo con dos decimales
- no añadas columnas, comentarios, totales ni texto fuera del CSV

ANTES DE TERMINAR
- cuenta IDs únicos de entrada y salida
- informa por separado de cualquier fila que no puedas transformar
- calcula la suma en céntimos y exige diferencia 0

La salida es una propuesta. No afirmes que está lista para importar.`}</Terminal>

      <div className="prose">
        <h2>El flujo seguro de seis etapas</h2>
        <ol>
          <li><strong>Copiar:</strong> conserva el archivo original sin cambios.</li>
          <li><strong>Minimizar:</strong> usa el tutorial anterior para retirar cuentas, nombres y detalles innecesarios.</li>
          <li><strong>Transformar:</strong> produce una propuesta bajo esquema cerrado.</li>
          <li><strong>Validar:</strong> comprueba tipos, catálogo, IDs y contenido potencialmente ejecutable.</li>
          <li><strong>Conciliar:</strong> compara filas, conjunto de IDs y total en céntimos.</li>
          <li><strong>Aprobar:</strong> una persona revisa muestra, excepciones y destino antes de importar.</li>
        </ol>
        <p>
          Si el evaluador falla, el proceso se detiene. No «arregles» una diferencia modificando el total:
          localiza la fila, el signo, la fecha o la transformación responsable.
        </p>

        <h2>CSV no significa ausencia de riesgo</h2>
        <p>
          RFC 4180 documenta un formato común —cabecera, campos, comillas y saltos—, pero también advierte
          que existen diferencias entre implementaciones y que un CSV puede compartir datos privados.
          Además, algunas hojas interpretan ciertos textos como fórmulas. Trata el archivo como entrada no
          confiable, valida el contenido y nunca ejecutes directamente una salida del modelo.
        </p>
        <p>
          OWASP denomina <em>improper output handling</em> a utilizar una salida de un LLM sin validarla o
          tratarla según el contexto de destino. En este caso, el destino es un importador o una hoja: el
          esquema y la conciliación son controles obligatorios, no mejoras opcionales.
        </p>

        <h2>Coste y elección de herramienta</h2>
        <ul>
          <li>El laboratorio no requiere cuenta, API, Excel ni suscripción.</li>
          <li>Un chat de pago puede reducir trabajo manual, pero no elimina revisión ni coste por uso.</li>
          <li>Para reglas estables, un script determinista suele ser más barato y reproducible que un LLM.</li>
          <li>Reserva la IA para formatos variables o clasificación ambigua; valida siempre su salida.</li>
          <li>No subas extractos reales sin autorización, minimización y revisión del producto y plan.</li>
        </ul>

        <h2>Fuentes primarias</h2>
        <ul>
          <li><a href="https://www.rfc-editor.org/info/rfc4180/">RFC Editor · RFC 4180, formato común CSV</a></li>
          <li><a href="https://docs.python.org/3/library/csv.html">Python · lectura y escritura de CSV</a></li>
          <li><a href="https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/">OWASP · validación y tratamiento de salidas de LLM</a></li>
          <li><a href="https://www.aulafy.net/cursos/ia-pymes/rgpd-basico">Aulafy · minimizar datos antes de usar IA</a></li>
        </ul>
        <p><strong>Comprobado el 27 de julio de 2026.</strong> El método es independiente del proveedor; revisa el formato exigido por tu importador real.</p>
      </div>

      <Guardar>
        Una conversión no termina cuando aparece el CSV. Termina cuando el conjunto de IDs coincide, cada
        campo pasa su regla, el total concilia y una persona autoriza la importación.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/presupuestos-excel", label: "Excel con IA" }}
        next={{ href: "/cursos/ia-pymes/mcp-oficina-seguro", label: "Primer MCP seguro" }}
      />
    </Chapter>
  );
}
