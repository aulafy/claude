import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Cómo proteger datos al usar IA en una pyme: minimización práctica",
  description:
    "Tutorial práctico en español para minimizar y seudonimizar datos antes de usar ChatGPT, Claude, Copilot o IA local. Incluye laboratorio sintético.",
  keywords: [
    "proteger datos ChatGPT empresa",
    "RGPD inteligencia artificial pymes",
    "anonimizar datos para IA",
    "seudonimización IA",
    "datos personales ChatGPT",
    "privacidad IA empresa",
  ],
  alternates: { canonical: "/cursos/ia-pymes/rgpd-basico" },
};

const lab =
  "https://github.com/aulafy/taller/tree/main/cursos/ia-pymes/laboratorios/minimizar-datos-antes-ia";

export default function Page() {
  return (
    <Chapter
      crumb="Datos e IA"
      title="Protege los datos antes de usar IA: finalidad, minimización y prueba residual"
      icon="shield"
      lead={<>La decisión importante sucede antes del prompt: define qué tarea vas a resolver y prepara una copia con la menor información posible. Esta lección no sustituye asesoramiento jurídico.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Distinguir retirada, generalización, seudonimización y anonimización.</li>
          <li>Separar entrenamiento, retención, acceso, permisos y uso compartido.</li>
          <li>Preparar una copia minimizada sin enviar el mapa de reidentificación.</li>
          <li>Medir coincidencias residuales sin prometer riesgo cero.</li>
        </ul>
      </Objetivos>

      <Cristiano term="minimización">
        Utilizar datos adecuados, pertinentes y limitados a lo necesario para una finalidad concreta.
        No consiste en ocultar todo: consiste en justificar cada campo que permanece.
      </Cristiano>

      <div className="prose">
        <h2>Empieza por la finalidad, no por la herramienta</h2>
        <p>
          «Quiero usar IA con este Excel» no define una finalidad. «Clasificar el tema de ocho solicitudes
          para que una persona priorice la cola» sí permite preguntar qué datos hacen falta. Para esa tarea,
          quizá no necesites nombre, DNI, email, teléfono, IBAN, edad, ciudad o importe exacto.
        </p>
        <p>
          El artículo 5 del RGPD exige que los datos sean adecuados, pertinentes y limitados a lo necesario.
          La AEPD recuerda además que exactitud y minimización deben evaluarse respecto a la finalidad y
          documentarse durante el ciclo de vida del tratamiento.
        </p>

        <h2>Cuatro operaciones que no son sinónimas</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Operación</th>
                <th>Ejemplo</th>
                <th>Qué no debes concluir</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Retirar</td>
                <td>Eliminar DNI y teléfono porque la clasificación no los necesita</td>
                <td>Que el resto del registro ya no identifica a nadie</td>
              </tr>
              <tr>
                <td>Generalizar</td>
                <td>Cambiar 310 € por el tramo «100–499»</td>
                <td>Que agrupar una variable elimina todas las combinaciones raras</td>
              </tr>
              <tr>
                <td>Seudonimizar</td>
                <td>Sustituir CLIENTE-428 por CASO-007 y separar la correspondencia</td>
                <td>Que el dato deje automáticamente de ser personal</td>
              </tr>
              <tr>
                <td>Anonimizar</td>
                <td>Reducir razonablemente la posibilidad de identificar a una persona</td>
                <td>Que borrar nombres sea suficiente para afirmarlo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          La AEPD indica que un conjunto se considera anonimizado solo cuando no existe una probabilidad
          razonable de identificar a la persona. Una provincia, un importe raro, una fecha o el texto libre
          pueden combinarse con otras fuentes. Por eso el laboratorio llama a su salida «minimizada y
          seudonimizada», no «anónima».
        </p>
      </div>

      <Idea>
        La mejor entrada para una IA no es el documento original con franjas negras: es una copia diseñada
        desde la finalidad, con campos necesarios, transformaciones visibles y una prueba de información residual.
      </Idea>

      <div className="prose">
        <h2>«No se usa para entrenar» no responde a todo</h2>
        <p>
          Antes de elegir un producto o plan, separa al menos seis preguntas:
        </p>
        <ol>
          <li>¿Se utiliza el contenido para entrenar o mejorar modelos por defecto?</li>
          <li>¿Cuánto tiempo se conserva la entrada, salida, archivo, historial y registro técnico?</li>
          <li>¿Quién puede acceder: usuario, administradores, proveedor, conectores o revisores autorizados?</li>
          <li>¿Dónde se procesa y qué términos, contrato o anexo de tratamiento se aplican?</li>
          <li>¿Puede compartirse, exportarse, conectarse a otras fuentes o aparecer en registros?</li>
          <li>¿Cómo se elimina y qué copias o excepciones pueden permanecer?</li>
        </ol>
        <p>
          OpenAI documenta que ChatGPT Business, Enterprise, Edu y la API no utilizan por defecto los datos
          de la organización para entrenar modelos. Eso es un control relevante, pero no sustituye las otras
          cinco preguntas ni la minimización. Verifica siempre el producto exacto y sus condiciones actuales;
          una cuenta personal y un espacio empresarial no son intercambiables.
        </p>
      </div>

      <Cuidado>
        No construyas una tabla permanente de «proveedor seguro o inseguro». Planes, controles, conectores,
        residencia, retención y configuración cambian. Registra producto, plan, fecha, fuente oficial y
        responsable que aprobó el uso.
      </Cuidado>

      <div className="prose">
        <h2>Laboratorio local: de once campos a cuatro</h2>
        <p>
          El ejercicio contiene ocho solicitudes completamente ficticias. La finalidad es clasificar tema y
          prioridad, sin responder ni ejecutar acciones. El proceso elimina identificadores directos, generaliza
          importes, crea un identificador operativo y guarda la correspondencia en un archivo separado.
        </p>
        <p>
          <a href={lab}><strong>Abrir el laboratorio MIT de minimización</strong></a>
        </p>
        <ol>
          <li>Lee <code>datos/finalidad.json</code> y cuestiona cada campo permitido.</li>
          <li>Ejecuta <code>npm run verificar</code>; no necesita red ni dependencias.</li>
          <li>Compara los ocho registros originales con <code>salida/entrada-modelo.csv</code>.</li>
          <li>Comprueba que <code>salida/mapa-local.json</code> está ignorado y tiene permisos <code>600</code>.</li>
          <li>Busca información indirecta todavía excesiva: provincia, tramo, estilo o detalles raros.</li>
          <li>Retira otro campo y decide si la tarea sigue siendo posible.</li>
        </ol>
      </div>

      <Terminal>{`FINALIDAD
Clasificar tema y prioridad de solicitudes.
No responder, contactar, devolver dinero ni modificar cuentas.

CONTRATO DE ENTRADA
Permitido:
- identificador operativo sin significado externo
- provincia, solo si mejora de forma demostrable la priorización
- tramo de importe, nunca importe exacto
- texto minimizado

Retirado:
- identificador original, nombre, DNI, email, teléfono e IBAN
- ciudad, edad e importe exacto

SALIDA EXIGIDA
- auditoría de coincidencias residuales
- mapa de correspondencia separado y no enviado
- advertencia: cero coincidencias no demuestra anonimización
- revisión humana antes de cualquier acción`}</Terminal>

      <Comprueba>
        El resultado patrón tiene 8 casos, pasa de 11 a 4 campos y deja 0 coincidencias directas según las
        pruebas declaradas. Para superar la práctica debes explicar por qué ese cero no acredita anonimización
        y justificar si provincia y tramo de importe siguen siendo necesarios.
      </Comprueba>

      <div className="prose">
        <h2>La matriz de decisión que debe completar una pyme</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pregunta</th>
                <th>Cuenta personal</th>
                <th>Espacio empresarial</th>
                <th>Local o self-hosted</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Producto, plan y versión comprobados</td>
                <td>____</td><td>____</td><td>____</td>
              </tr>
              <tr>
                <td>Entrenamiento o mejora por defecto</td>
                <td>____</td><td>____</td><td>____</td>
              </tr>
              <tr>
                <td>Retención de entrada, salida y logs</td>
                <td>____</td><td>____</td><td>____</td>
              </tr>
              <tr>
                <td>Accesos, administradores y conectores</td>
                <td>____</td><td>____</td><td>____</td>
              </tr>
              <tr>
                <td>Contrato, ubicación y borrado</td>
                <td>____</td><td>____</td><td>____</td>
              </tr>
              <tr>
                <td>Dato mínimo permitido por la organización</td>
                <td>____</td><td>____</td><td>____</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          «Local» tampoco completa la matriz automáticamente. Puede reducir salidas hacia un tercero, pero
          siguen existiendo archivos, permisos del equipo, copias, logs, malware, modelos cloud activados por
          error y obligaciones relacionadas con la finalidad y las personas afectadas.
        </p>

        <h2>Reglas de parada</h2>
        <ul>
          <li>No existe una finalidad concreta ni una persona responsable.</li>
          <li>No puedes justificar por qué el modelo necesita cada campo.</li>
          <li>El archivo contiene secretos, contraseñas, tokens o credenciales.</li>
          <li>Hay datos de salud, menores, nóminas, sanciones, cuentas o documentos identificativos sin controles revisados.</li>
          <li>No conoces el producto, plan, retención, accesos o términos aplicables.</li>
          <li>La salida producirá efectos sobre personas sin revisión y mecanismo de corrección.</li>
        </ul>

        <h2>Fuentes primarias y verificación</h2>
        <ul>
          <li><a href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679">EUR-Lex · Reglamento General de Protección de Datos</a></li>
          <li><a href="https://www.aepd.es/documento/guia-basica-anonimizacion.pdf">AEPD · Guía básica de anonimización</a></li>
          <li><a href="https://www.aepd.es/preguntas-frecuentes/0-conceptos-basicos/FAQ-0005-sobre-los-datos-anonimizados">AEPD · datos anonimizados y reidentificación</a></li>
          <li><a href="https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/aepd-analiza-calidad-exactitud-y-minimizacion-de-datos-personales-en-tratamientos-con-ia">AEPD · exactitud y minimización en IA</a></li>
          <li><a href="https://openai.com/es-419/business-data/">OpenAI · privacidad y seguridad de datos empresariales</a></li>
          <li><a href="https://privacy.claude.com/en/articles/7996885-how-do-you-use-personal-data-in-model-training">Anthropic · datos personales y entrenamiento en productos comerciales</a></li>
        </ul>
        <p>
          <strong>Comprobado el 27 de julio de 2026.</strong> Revisa semanalmente las condiciones de los
          productos; los principios y la técnica educativa se revisarán cuando cambien las fuentes.
        </p>
      </div>

      <Guardar>
        No subas primero y preguntes después. Define la finalidad, retira lo innecesario, separa el mapa,
        audita lo residual y solo entonces decide si el proveedor, plan y controles son adecuados.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/ollama-piloto-seguro", label: "Piloto local seguro con Ollama" }}
        next={{ href: "/cursos/ia-pymes/flujo-fiable", label: "De piloto a flujo fiable" }}
      />
    </Chapter>
  );
}
