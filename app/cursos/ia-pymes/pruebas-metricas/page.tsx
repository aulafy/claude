import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Pruebas de fallo y métricas antes de automatizar",
  description:
    "Aprende a probar fallos y medir calidad, abstenciones, tiempo, coste y errores críticos antes de automatizar un flujo de IA en una pyme.",
  keywords: ["pruebas IA pyme", "métricas automatización IA", "evaluación LLM empresa", "fallos IA revisión humana", "coste calidad IA"],
  alternates: { canonical: "/cursos/ia-pymes/pruebas-metricas" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Pruebas y métricas"
      title="Pruebas de fallo y métricas antes de automatizar"
      icon="check"
      lead={<>No preguntes solo «¿parece que funciona?». Pregunta qué ocurre con una entrada ambigua, un documento roto, una petición maliciosa, un dato fuera de alcance o un servicio que no responde. Medir esas respuestas decide si un flujo merece más permisos.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Crear una muestra de prueba que no esconda los casos difíciles.</li>
          <li>Medir calidad, errores críticos, abstenciones, tiempo y coste por resultado aceptado.</li>
          <li>Decidir con evidencia si mantener, corregir, limitar o descartar el flujo.</li>
        </ul>
      </Objetivos>

      <Cristiano term="caso de prueba">
        Es una entrada preparada con una respuesta o comportamiento esperado antes de ejecutar el flujo. No tiene que ser un examen sofisticado: puede ser un email, una factura ficticia o una pregunta documentada que una persona sabe cómo evaluar.
      </Cristiano>

      <div className="prose">
        <h2>Una muestra buena no contiene solo ejemplos fáciles</h2>
        <p>Reúne una muestra pequeña, autorizada o sintética, pero representativa. Incluye el caso habitual y también los que rompen el proceso: un PDF escaneado, una fecha imposible, dos facturas casi iguales, una pregunta sin fuente o un email que intenta cambiar las instrucciones. La prueba no busca humillar al modelo; busca descubrir dónde debe parar, pedir ayuda o recurrir al modo manual.</p>
      </div>

      <Terminal>{"MATRIZ MÍNIMA DE PRUEBA\n\n1. Normal: entrada clara y resultado conocido.\n2. Ambiguo: falta un dato o hay dos interpretaciones válidas.\n3. Difícil: formato malo, ruido, OCR pobre o documento largo.\n4. Fuera de alcance: pide una decisión que el flujo no puede tomar.\n5. Hostil: incluye instrucciones ajenas al objetivo del flujo.\n6. Falla técnica: proveedor lento, archivo no disponible o respuesta inválida.\n7. Duplicado: la misma entrada llega dos veces.\n\nPara cada fila define: resultado esperado, riesgo, revisor y decisión."}</Terminal>

      <Idea>
        La métrica más útil no es cuántas respuestas produce el sistema, sino cuántos resultados correctos y seguros entrega con el coste y revisión que aceptas.
      </Idea>

      <div className="prose">
        <h2>Cinco métricas sencillas que sí cambian decisiones</h2>
        <ul>
          <li><strong>Calidad aceptada:</strong> porcentaje de resultados que el revisor puede usar sin corregir un dato crítico.</li>
          <li><strong>Error crítico:</strong> una salida que habría provocado daño si se hubiera enviado, cobrado, publicado o registrado.</li>
          <li><strong>Abstención correcta:</strong> veces que el flujo se detiene o escala cuando de verdad no tiene evidencia.</li>
          <li><strong>Tiempo total:</strong> generación más revisión; si solo desplaza el trabajo, no ha mejorado el proceso.</li>
          <li><strong>Coste por resultado aceptado:</strong> API, suscripción, infraestructura y tiempo humano dividido entre salidas útiles.</li>
        </ul>
        <p>No conviertas estas métricas en una promesa universal. El umbral razonable depende del proceso: una clasificación interna puede tolerar más correcciones que un importe o un mensaje a un cliente.</p>
      </div>

      <Terminal>{"REGISTRO DE EVALUACIÓN\n\ncaso_id: factura-dificil-03\nresultado_esperado: marcar fecha como dudosa y no exportar\nresultado_obtenido: fecha 2026-08-31; estado listo\nrevision_humana: rechazo\nseveridad: crítica\ncausa_probable: el OCR confundió 31/08 con 08/31\naccion: añadir regla de fecha, ejemplo de prueba y bloqueo de exportación\ncoste: 0.04\nlatencia_segundos: 8.2\nrepetible: sí"}</Terminal>

      <div className="prose">
        <h2>La abstención también se prueba</h2>
        <p>Un flujo seguro debe distinguir entre «no encontré evidencia», «la evidencia se contradice» y «esto no está autorizado». Prueba que no inventa una respuesta para salir del paso. Una abstención debe indicar qué falta, qué fuente se revisó y cuál es la siguiente acción humana; no basta con un mensaje genérico de error.</p>
      </div>

      <Cuidado>
        No uses al mismo modelo como único juez de su propio trabajo. Una revisión humana sobre una muestra y reglas deterministas para los campos críticos son la base. Más adelante puedes añadir evaluadores automáticos, pero compáralos contra decisiones revisadas.
      </Cuidado>

      <div className="prose">
        <h2>Decide con una tabla de salida</h2>
        <p>Al terminar la muestra, no respondas «funciona» o «no funciona». Decide una de cuatro cosas: mantener el alcance porque los resultados son seguros, corregir un fallo concreto y repetir, reducir el alcance para que solo prepare borradores, o descartar el caso. Descartar una automatización que no aporta es una buena decisión de negocio.</p>
      </div>

      <Comprueba>
        Crea diez casos de prueba de tu flujo. No avances si hay un error crítico sin bloqueo, si no puedes explicar las abstenciones o si nadie sabe cuánto tiempo dedica a revisar las salidas.
      </Comprueba>

      <Guardar>
        Añade la matriz y el registro de resultados al <a href="/recursos/ia-pymes/kit-flujo-fiable-pyme.md">kit de flujo fiable</a>. Conserva solo datos permitidos; para ejercicios y demostraciones usa ejemplos sintéticos o minimizados.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/flujo-fiable", label: "De piloto a flujo fiable" }}
        next={{ href: "/cursos/ia-pymes/operacion-minima", label: "Operación mínima" }}
      />
    </Chapter>
  );
}
