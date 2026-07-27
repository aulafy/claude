import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Detener loops y controlar el coste de agentes de IA",
  description:
    "Tutorial práctico en español para limitar pasos, herramientas, tiempo y presupuesto de un agente de IA antes de ejecutar cada acción.",
  keywords: [
    "controlar coste agente IA",
    "detener loop agente IA",
    "límites agentes LLM",
    "presupuesto tokens agente",
    "circuit breaker agente IA",
    "LangGraph recursion limit",
  ],
  alternates: { canonical: "/cursos/agentes-automatizacion/loops-costes" },
};

const lab =
  "https://github.com/aulafy/taller/tree/main/cursos/agentes-automatizacion/laboratorios/guardas-coste-y-loops";

export default function Page() {
  return (
    <Chapter
      crumb="Loops y costes"
      title="Detén un agente antes de que entre en loop o agote el presupuesto"
      icon="warning"
      lead={<>Un límite escrito en el prompt es una preferencia. Un límite comprobado por código antes de cada efecto es una guarda. En esta lección construirás siete fallos reproducibles y aprenderás a cortar cada uno sin llamar a un proveedor real.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Distinguir coste reservado antes de una llamada y coste real después.</li>
          <li>Detectar repeticiones por intención, herramienta y argumentos normalizados.</li>
          <li>Limitar pasos, tiempo, llamadas por herramienta y falta de progreso.</li>
          <li>Guardar una traza que explique por qué se ejecutó o bloqueó una acción.</li>
          <li>Probar las guardas con fallos deterministas antes de conectar un modelo.</li>
        </ul>
      </Objetivos>

      <Cristiano term="guarda">
        Es una comprobación determinista colocada entre la propuesta del modelo y el efecto real. Puede
        permitir o bloquear una acción aunque el modelo insista en continuar.
      </Cristiano>

      <div className="prose">
        <h2>El problema no es solo un loop infinito</h2>
        <p>
          Un agente puede consumir demasiado sin repetir exactamente la misma acción: cambia una palabra,
          consulta veinte fuentes distintas o sigue produciendo texto sin acercarse al objetivo. OWASP
          denomina <em>unbounded consumption</em> al riesgo de permitir inferencia o consumo de recursos sin
          límites adecuados; sus consecuencias incluyen denegación de servicio y pérdidas económicas.
        </p>
        <p>
          Por eso no basta con <code>max_iterations</code>. Necesitas varias barreras independientes y una
          política clara para decidir cuál informa del corte.
        </p>

        <div className="table-wrap" role="region" aria-label="Guardas para controlar un agente de IA" tabIndex={0}>
          <table>
            <thead><tr><th>Guarda</th><th>Qué mide</th><th>Cuándo bloquea</th></tr></thead>
            <tbody>
              <tr><td>Pasos</td><td>Acciones ya ejecutadas</td><td>Antes de superar el máximo por tarea</td></tr>
              <tr><td>Tiempo</td><td>Duración total monotónica</td><td>Antes de ejecutar fuera de la ventana</td></tr>
              <tr><td>Presupuesto</td><td>Coste actual + reserva propuesta</td><td>Antes de contraer el gasto</td></tr>
              <tr><td>Cuota de tool</td><td>Llamadas por herramienta</td><td>Antes de exceder su cuota individual</td></tr>
              <tr><td>Fingerprint</td><td>Intención, tool y argumentos</td><td>Antes de la repetición sospechosa</td></tr>
              <tr><td>Progreso</td><td>Cambio de un marcador verificable</td><td>Tras varios pasos sin cambio</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <Idea>
        La guarda vive fuera del prompt. Si el modelo propone una acción prohibida, el orquestador la
        bloquea; no le pide amablemente que lo intente menos veces.
      </Idea>

      <div className="prose">
        <h2>Reserva primero, reconcilia después</h2>
        <p>
          Antes de llamar a un modelo no conoces los tokens reales de salida. Sí conoces una estimación de
          entrada y el máximo de salida permitido. Reserva ese peor caso antes de la llamada:
        </p>
      </div>

      <Terminal>{`reserva =
  tokens_entrada_estimados × tarifa_entrada
  + tokens_salida_maximos × tarifa_salida

si coste_acumulado + reserva > presupuesto:
  bloquear antes de llamar

si la llamada termina:
  sustituir reserva por uso_real
  guardar tokens, coste, latencia y resultado`}</Terminal>

      <Cuidado>
        Los precios, modalidades y tokens facturables cambian. El laboratorio usa tarifas deliberadamente
        ficticias: nunca las copies para presupuestar un proveedor real. Consulta su página oficial y
        registra modelo, región, modalidad y fecha.
      </Cuidado>

      <div className="prose">
        <h2>Laboratorio: siete formas de detenerse</h2>
        <p>
          El ejemplo MIT no instala paquetes, no usa la red y no contiene claves. Simula una ejecución sana
          y seis cortes: repetición, presupuesto, cuota de herramienta, pasos, tiempo y falta de progreso.
          Todos los importes se guardan como microdólares enteros para evitar errores de coma flotante.
        </p>
        <p><a href={lab}><strong>Abrir el laboratorio de guardas de coste y loops</strong></a></p>
      </div>

      <Terminal>{`git clone https://github.com/aulafy/taller.git
cd taller/cursos/agentes-automatizacion/laboratorios/guardas-coste-y-loops
npm run verificar`}</Terminal>

      <Comprueba>
        Debes obtener 8 pruebas correctas, 7 escenarios coincidentes y una auditoría que confirme tarifas
        ficticias, cero secretos, cero red y cero dependencias. El escenario sano completa cuatro pasos por
        4.200 microdólares ficticios.
      </Comprueba>

      <div className="prose">
        <h2>Qué debe ocurrir en cada escenario</h2>
        <div className="table-wrap" role="region" aria-label="Resultados esperados del laboratorio de guardas" tabIndex={0}>
          <table>
            <thead><tr><th>Escenario</th><th>Resultado esperado</th><th>Acción que no se ejecuta</th></tr></thead>
            <tbody>
              <tr><td><code>sano</code></td><td>Completa 4 pasos</td><td>Ninguna</td></tr>
              <tr><td><code>loop-fingerprint</code></td><td>Corta tras 2 llamadas</td><td>Tercera consulta idéntica</td></tr>
              <tr><td><code>presupuesto</code></td><td>Conserva el coste en 1.200</td><td>Reserva propuesta de 7.000</td></tr>
              <tr><td><code>cuota-tool</code></td><td>Permite 2 búsquedas</td><td>Tercera búsqueda</td></tr>
              <tr><td><code>max-pasos</code></td><td>Completa 8 pasos</td><td>Paso número 9</td></tr>
              <tr><td><code>timeout</code></td><td>Completa 1 paso</td><td>Acción fuera de 5 minutos</td></tr>
              <tr><td><code>sin-progreso</code></td><td>Completa 2 pasos</td><td>Tercera acción sin cambio</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Fingerprint: repetición semántica acotada</h2>
        <p>
          El laboratorio normaliza la intención, ordena recursivamente los argumentos y calcula un hash de
          <code>intención + tool + args</code>. Así, cambiar el orden de las claves JSON no evade el límite.
          No compara texto libre completo: una coma distinta no debería crear una acción nueva.
        </p>
      </div>

      <Terminal>{`fingerprint = sha256({
  intencion: normalizar("reintentar consulta"),
  tool: "consultar_crm",
  args: ordenar_claves({ cliente_id: "CLI-DEMO-99" })
})

si apariciones(fingerprint) >= 3:
  bloquear
  guardar "fingerprint_repetido"`}</Terminal>

      <div className="prose">
        <h2>No confundas repetición y falta de progreso</h2>
        <p>
          Tres búsquedas distintas producen fingerprints distintos, pero pueden aportar cero evidencia
          nueva. Define un marcador de progreso que el código pueda comprobar: registros pendientes,
          fuentes válidas encontradas, campos completados o estado de una máquina. «El agente cree que
          avanza» no es un marcador.
        </p>

        <h2>Orden seguro de una acción</h2>
        <ol>
          <li>Recibe una propuesta estructurada del modelo.</li>
          <li>Valida esquema, tipos, permisos y destino.</li>
          <li>Calcula fingerprint, cuota, tiempo, pasos y progreso.</li>
          <li>Reserva el coste máximo de la acción.</li>
          <li>Bloquea con un motivo trazable o ejecuta con idempotencia.</li>
          <li>Registra uso real, latencia, error y efecto.</li>
          <li>Reconcilia la reserva y persiste el nuevo estado.</li>
        </ol>
        <p>
          OpenTelemetry dispone de convenciones semánticas para observar llamadas a modelos y herramientas,
          incluidos los conteos de tokens. Úsalas para evitar nombres incompatibles entre proveedores, pero
          no registres prompts, respuestas o datos personales por defecto.
        </p>

        <h2>Modo degradado y revisión humana</h2>
        <p>
          Cortar no significa fallar en silencio. Devuelve un estado explícito: límite alcanzado, trabajo
          completado, evidencia reunida, acción pendiente y forma segura de continuar. Una operación
          sensible debe quedar pendiente de aprobación; no reinicies automáticamente el contador.
        </p>
      </div>

      <Terminal>{`{
  "estado": "detenido",
  "motivo": "presupuesto_reservado",
  "pasos_ejecutados": 1,
  "coste_microusd": 1200,
  "reserva_bloqueada_microusd": 7000,
  "siguiente_accion": "revisar alcance o aprobar nuevo presupuesto"
}`}</Terminal>

      <Cuidado>
        En producción, una variable en memoria no coordina varios procesos. Reserva presupuesto de forma
        atómica, usa claves de idempotencia, separa límites por organización, usuario y tarea, y combina
        estas guardas con los topes y alertas financieras del proveedor.
      </Cuidado>

      <div className="prose">
        <h2>Qué no demuestra este laboratorio</h2>
        <ul>
          <li>No calcula el precio real de ningún modelo ni proveedor.</li>
          <li>No decide el presupuesto aceptable para una empresa.</li>
          <li>No mide calidad, veracidad o utilidad de la respuesta.</li>
          <li>No sustituye permisos, sandboxing, idempotencia ni revisión humana.</li>
          <li>No prueba concurrencia entre procesos ni facturación agregada diaria.</li>
        </ul>

        <h2>Fuentes primarias</h2>
        <ul>
          <li><a href="https://developers.openai.com/api/docs/guides/cost-optimization">OpenAI · optimización de costes</a></li>
          <li><a href="https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/">OWASP · consumo no acotado</a></li>
          <li><a href="https://docs.langchain.com/oss/python/langgraph/graph-api#recursion-limit">LangGraph · límite de recursión</a></li>
          <li><a href="https://opentelemetry.io/blog/2026/genai-observability/">OpenTelemetry · observabilidad de IA generativa</a></li>
        </ul>
        <p><strong>Probado el 27 de julio de 2026.</strong> Node.js 20.11+, sin red ni dependencias externas.</p>
      </div>

      <Guardar>
        Un agente responsable reserva antes de gastar, demuestra progreso y sabe detenerse con evidencia.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/estado-recuperacion", label: "Estado persistente" }}
        next={{ href: "/cursos/agentes-automatizacion/mcp-governance", label: "Governance MCP" }}
      />
    </Chapter>
  );
}
