import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "De piloto a flujo fiable: esquema, fuentes, abstención y validación",
  description:
    "Convierte un piloto de IA en un flujo fiable para una pyme: define entradas, fuentes, salida estructurada, abstención y validación antes de automatizar.",
  keywords: ["flujo IA fiable pyme", "validar salida IA", "abstención IA", "JSON schema IA", "RAG fuentes revisión humana"],
  alternates: { canonical: "/cursos/ia-pymes/flujo-fiable" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Flujo fiable"
      title="De piloto a flujo fiable: esquema, fuentes, abstención y validación"
      icon="briefcase"
      lead={<>Un piloto demuestra que una idea puede ayudar. Un flujo fiable deja claro qué entra, de dónde sale cada dato, qué formato debe devolver, cuándo debe decir «no sé» y qué comprobación impide que un error avance.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Convertir una petición vaga en un contrato de entrada, salida y límites.</li>
          <li>Hacer que un flujo basado en documentos cite su evidencia o se abstenga.</li>
          <li>Validar campos críticos antes de que una persona apruebe el resultado.</li>
        </ul>
      </Objetivos>

      <Cristiano term="contrato de flujo">
        Es una ficha breve que describe el propósito, los datos permitidos, la salida esperada, las acciones prohibidas, la persona revisora y qué ocurre si falta información. Sirve para que el flujo sea repetible y no dependa de una conversación improvisada.
      </Cristiano>

      <div className="prose">
        <h2>La diferencia entre una demo y un flujo</h2>
        <p>Una demo responde algo aparentemente bueno a un ejemplo. Un flujo debe responder de manera controlada a muchos ejemplos, incluidos los incompletos y los equivocados. Para conseguirlo, separa las etapas: recibe una entrada autorizada, limpia lo innecesario, busca evidencia si trabaja con documentos, genera un borrador estructurado, valida reglas simples y lo entrega para revisión. Solo una acción posterior y explícita podría usar ese resultado.</p>
      </div>

      <Terminal>{"Entrada autorizada\n  -> normalizar y minimizar datos\n  -> recuperar fuentes permitidas si hacen falta\n  -> generar borrador con esquema fijo\n  -> validar formato, campos y reglas de negocio\n  -> revisión humana\n  -> acción posterior solo si se aprueba"}</Terminal>

      <Idea>
        Cuantas menos decisiones invisibles haya entre una entrada y una salida, más fácil será explicar un error y corregirlo.
      </Idea>

      <div className="prose">
        <h2>Escribe el contrato antes del prompt</h2>
        <p>El prompt ayuda a orientar al modelo, pero no es el contrato completo. Primero define el trabajo sin mencionar marcas ni modelos. Para extraer una factura, por ejemplo, la salida no es «un resumen útil»: es un borrador con campos concretos, una fuente identificable y una lista de dudas. Si el campo no se encuentra o no pasa una regla básica, debe quedar vacío y marcado para revisión.</p>
      </div>

      <Terminal>{"nombre: extracción de factura a borrador\nfinalidad: preparar una fila revisable; no contabilizar\nentrada: PDF autorizado y su identificador interno\ndatos_no_permitidos: contraseñas, datos ajenos al documento\nsalida: emisor, fecha, número, base, IVA, total, dudas, fuente\nregla_de_evidencia: cada campo crítico indica página o zona leída\nabstención: si no puede leer o no encuentra un campo, usa null y explica por qué\nvalidación: fecha válida; importes numéricos; total coherente o marcado\nrevisor: administración\nacción_prohibida: exportar a contabilidad, pagar o modificar registros"}</Terminal>

      <div className="prose">
        <h2>Fuentes: evidencia antes que seguridad aparente</h2>
        <p>Si el flujo responde sobre una política, un catálogo o una base documental, el modelo no debe completar huecos con frases plausibles. Entrega junto a la respuesta el identificador, versión y fragmento de la fuente que la sostiene. Si no hay evidencia suficiente, la salida correcta es una abstención útil: «no encuentro una fuente autorizada para afirmarlo; revisa este documento o escala la consulta».</p>
        <ul>
          <li>Limita la búsqueda al conjunto de documentos y permisos correspondientes.</li>
          <li>Guarda versión, fecha y fragmento de la fuente, no solo el texto final.</li>
          <li>Distingue un dato extraído, una inferencia y una propuesta de redacción.</li>
          <li>No conviertas una puntuación de similitud en una garantía de que la respuesta es correcta.</li>
        </ul>
      </div>

      <Cuidado>
        «No sé» no es un fallo del producto. Es un resultado seguro cuando falta evidencia, la entrada está incompleta o la decisión excede el alcance del flujo. El peligro es obligar al sistema a responder siempre.
      </Cuidado>

      <div className="prose">
        <h2>Valida fuera del modelo lo que sea objetivo</h2>
        <p>Un modelo puede proponer una fecha, un importe o un código, pero una regla determinista debe comprobar después que el formato existe y tiene sentido. Valida tipos, campos obligatorios, rangos, duplicados y relaciones simples. La revisión humana decide el significado; las reglas evitan que una salida incompleta parezca lista para usar.</p>
      </div>

      <Terminal>{"salida_borrador:\n  emisor: ACME S.L.\n  fecha: 2026-07-18\n  numero: F-204\n  base: 100\n  iva: 21\n  total: 121\n  evidencia:\n    total: pagina 1, bloque inferior\n  dudas: []\n\nvalidaciones:\n  - todos los campos críticos existen o están marcados null\n  - total = base + iva, con tolerancia explícita\n  - fecha se puede interpretar\n  - número no está duplicado en la muestra\n  - si falla una regla: estado = revisar, nunca = listo"}</Terminal>

      <Comprueba>
        Elige un caso del piloto y escribe su contrato en una página. Después prueba seis entradas: tres normales, una incompleta, una ilegible y una que pida algo fuera del alcance. Debes poder señalar qué salida se acepta, cuál se marca para revisión y cuál se rechaza.
      </Comprueba>

      <Guardar>
        Usa el <a href="/recursos/ia-pymes/kit-flujo-fiable-pyme.md">kit de flujo fiable</a> para documentar el contrato, las fuentes y la validación. Aún no actives permisos de envío, pago, publicación o escritura en sistemas reales.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/rgpd-basico", label: "RGPD básico" }}
        next={{ href: "/cursos/ia-pymes/pruebas-metricas", label: "Pruebas de fallo y métricas" }}
      />
    </Chapter>
  );
}
