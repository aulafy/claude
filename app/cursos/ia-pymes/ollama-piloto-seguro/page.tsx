import type { Metadata } from "next";
import {
  Chapter,
  Objetivos,
  Idea,
  Cuidado,
  Cristiano,
  Comprueba,
  Guardar,
  ChapterNav,
  Terminal,
  Nota,
} from "@/components/Book";

export const metadata: Metadata = {
  title: "Ollama para pymes: prueba local, segura y medible",
  description:
    "Prueba Ollama con datos ficticios, mide latencia y tamaño, comprueba la red y decide si la IA local encaja en una pyme sin confundir local con gratis o privado.",
  keywords: [
    "Ollama para pymes",
    "IA local para empresas",
    "Ollama privacidad",
    "Ollama puerto 11434 seguridad",
    "medir rendimiento Ollama",
    "Ollama tutorial español",
  ],
  alternates: { canonical: "/cursos/ia-pymes/ollama-piloto-seguro" },
};

const labUrl =
  "https://github.com/aulafy/taller/tree/main/cursos/ia-pymes/laboratorios/ollama-piloto-seguro";

export default function Page() {
  return (
    <Chapter
      crumb="Piloto local con Ollama"
      title="Ollama para una pyme: prueba local, segura y medible"
      icon="desktop"
      lead={<>“Funciona en mi ordenador” no demuestra que una IA sea privada, económica ni útil para una empresa. En esta práctica comprobarás la dirección de red, ejecutarás una FAQ ficticia y guardarás métricas reales antes de decidir si merece un piloto.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
      mission={{
        minutes: 40,
        build: "Un informe reproducible de una prueba local de Ollama, sin datos de clientes y sin exponer el servicio.",
        evidence: "Versión, modelo y licencia revisada, dirección local, tamaño, respuesta, latencia, tokens por segundo y decisión razonada.",
        steps: [
          "Comprueba servicio y red",
          "Ejecuta el caso sintético",
          "Decide con métricas y riesgos",
        ],
      }}
    >
      <Objetivos>
        <ul>
          <li>Distinguir Ollama local, modelos cloud e integraciones externas.</li>
          <li>Medir una tarea concreta sin convertir una ejecución en un benchmark.</li>
          <li>Detectar una exposición de red y comprender por qué la API local exige control.</li>
          <li>Incluir licencia, hardware, energía, soporte y revisión en el coste real.</li>
        </ul>
      </Objetivos>

      <Nota title="Estado de verificación">
        Comandos y laboratorio comprobados el <strong>27 de julio de 2026</strong> con
        Ollama 0.32.1, Node.js 26, macOS 26, Apple M4 y 24 GB. La prueba manual
        usó <code>gemma3:4b</code> (3,34 GB aproximados) y datos ficticios. Las
        cifras solo describen ese equipo y esa ejecución.
      </Nota>

      <Cristiano term="local">
        El proceso ocurre en tu equipo cuando llamas a la API de
        <code>localhost</code> con un modelo instalado localmente. Ollama también
        ofrece modelos cloud: usar el mismo programa no garantiza que toda
        petición permanezca en el ordenador.
      </Cristiano>

      <div className="prose">
        <h2>1. Define una prueba que pueda fallar</h2>
        <p>Usaremos una empresa inventada. La única información autorizada dice que la tienda abre de lunes a viernes. La pregunta será si abre el sábado. Una respuesta responsable debe abstenerse: <em>No consta</em>.</p>
        <p>No empieces con contratos, facturas o conversaciones reales. Primero comprueba que sabes ejecutar, medir, detener y explicar el flujo con datos sintéticos.</p>
      </div>

      <Terminal>{`EMPRESA FICTICIA: Nube Clara
HECHO AUTORIZADO:
  La tienda abre de lunes a viernes de 09:00 a 18:00.

PREGUNTA:
  ¿La tienda abre el sábado?

RESPUESTA ESPERADA:
  No consta.`}</Terminal>

      <div className="prose">
        <h2>2. Comprueba versión, modelos y dirección de escucha</h2>
        <p>La documentación oficial sitúa la API local en <code>http://localhost:11434/api</code>. Además, la API local no exige autenticación. Esa comodidad es precisamente la razón por la que no debes publicarla en una LAN o en Internet sin diseñar otra capa de seguridad.</p>
      </div>

      <Terminal>{`ollama --version
ollama list
ollama ps

# macOS o Linux: la salida segura debe mostrar 127.0.0.1:11434
lsof -nP -iTCP:11434 -sTCP:LISTEN`}</Terminal>

      <Cuidado>
        Si ves <code>0.0.0.0:11434</code>, una IP de red o una configuración de
        <code>OLLAMA_HOST</code> que no reconoces, detente. No continúes con datos
        de empresa. Este curso no enseña a exponer la API: un servicio compartido
        necesita autenticación, autorización, TLS, segmentación, logs y una
        revisión de amenazas propia.
      </Cuidado>

      <div className="prose">
        <h2>3. Clona y verifica el laboratorio</h2>
        <p>El laboratorio MIT de Aulafy no descarga modelos, no usa claves y bloquea cualquier destino que no sea loopback. Sus pruebas emplean un servidor local simulado, por lo que pueden ejecutarse aunque Ollama esté apagado.</p>
      </div>

      <Terminal>{`git clone https://github.com/aulafy/taller.git
cd taller/cursos/ia-pymes/laboratorios/ollama-piloto-seguro

npm run verificar
npm run diagnostico`}</Terminal>

      <Comprueba>
        La verificación debe superar tres pruebas y una auditoría. El diagnóstico
        debe indicar <code>solo loopback; sin destino remoto</code>, la versión y
        los modelos ya instalados. No copies un comando de descarga hasta haber
        revisado tamaño, ficha y licencia del modelo.
      </Comprueba>

      <div className="prose">
        <h2>4. Elige un modelo sin aceptar un ranking</h2>
        <p>No hay un “mejor modelo pequeño” permanente. Elige uno que ya tengas o consulta su ficha oficial. Registra nombre y tag exactos, tamaño descargado, cuantización, licencia, idiomas y limitaciones. La licencia MIT de Ollama no convierte los pesos del modelo en MIT.</p>
        <p>Si el modelo no cabe con suficiente margen para el sistema, el contexto y otras aplicaciones, prueba uno menor. No compres hardware antes de medir una tarea representativa.</p>
      </div>

      <Terminal>{`# Inspecciona el modelo local y su licencia
curl http://127.0.0.1:11434/api/show -d '{
  "model": "gemma3:4b"
}'

# Sustituye el nombre por uno que aparezca en ollama list
OLLAMA_MODEL=gemma3:4b npm run probar`}</Terminal>

      <div className="prose">
        <h2>5. Lee la evidencia, no solo la respuesta</h2>
        <p>El endpoint de generación devuelve tiempos en nanosegundos y recuentos de tokens. El laboratorio convierte esas cifras y también mide el tiempo percibido. Separa la carga inicial de la generación: una segunda consulta puede ser más rápida si el modelo sigue en memoria.</p>
      </div>

      <Terminal>{`EJECUCIÓN DE REFERENCIA — NO ES UNA PROMESA

equipo: Apple M4; 24 GB de memoria unificada
ollama_servidor: 0.32.1
modelo: gemma3:4b
tamaño_aproximado: 3.34 GB
respuesta: "No consta."
coincide: true
tiempo_total: 2.08 s
tiempo_carga: 1.64 s
tokens_salida: 4
tokens_por_segundo: 44.67`}</Terminal>

      <Idea>
        Una respuesta correcta solo demuestra que una combinación concreta
        completó un caso. Un piloto necesita ejemplos normales, ambiguos,
        adversariales y fuera de alcance; además debe medir correcciones humanas,
        abstenciones, latencia alta y fallos, no solo aciertos.
      </Idea>

      <div className="prose">
        <h2>6. Decide con una matriz honesta</h2>
        <ul>
          <li><strong>Continúa investigando:</strong> la tarea funciona, la latencia es aceptable y puedes crear una batería autorizada.</li>
          <li><strong>Reduce el modelo o el contexto:</strong> hay esperas, presión de memoria o bloqueo del equipo.</li>
          <li><strong>Compara una opción cloud o híbrida:</strong> necesitas más calidad, concurrencia, soporte o disponibilidad de la que puedes operar localmente.</li>
          <li><strong>Descarta:</strong> la revisión cuesta más que el proceso manual, no puedes proteger los datos o el fallo tiene demasiado impacto.</li>
        </ul>
      </div>

      <Terminal>{`DECISIÓN DEL PILOTO

tarea:
modelo_y_licencia:
equipo_y_memoria:
datos_usados: sintéticos / autorizados / minimizados
api_confirmada_en_loopback: sí / no
latencia_mediana_de_varias_pruebas:
casos_correctos:
abstenciones_correctas:
correcciones_humanas:
coste: equipo + energía + soporte + revisión + mantenimiento
decisión: ampliar / ajustar / comparar / descartar
responsable:
próxima_revisión:`}</Terminal>

      <div className="prose">
        <h2>Privacidad, cloud y mantenimiento</h2>
        <p>Ollama afirma que no recibe prompts ni datos cuando el modelo se ejecuta localmente. Para un modo estrictamente local, su documentación permite desactivar las funciones cloud; hacerlo elimina modelos cloud y búsqueda web. Comprueba la configuración y los logs, no te limites a confiar en el nombre de la herramienta.</p>
        <p>Actualiza con control: registra la versión, relee las notas de lanzamiento y repite la batería después de cambiar Ollama, modelo, cuantización, prompt o contexto. La API pretende mantener compatibilidad, pero no está estrictamente versionada.</p>
      </div>

      <Terminal>{`# Configuración oficial para desactivar funciones cloud
# ~/.ollama/server.json
{
  "disable_ollama_cloud": true
}

# Alternativa mediante variable antes de iniciar el servidor
OLLAMA_NO_CLOUD=1`}</Terminal>

      <div className="prose">
        <h2>Fuentes oficiales consultadas</h2>
        <ul>
          <li><a href="https://docs.ollama.com/api/introduction">Introducción y URL base de la API</a>.</li>
          <li><a href="https://docs.ollama.com/api/authentication">Autenticación local y cloud</a>.</li>
          <li><a href="https://docs.ollama.com/api/generate">Generación, tiempos y recuentos</a>.</li>
          <li><a href="https://docs.ollama.com/faq">FAQ: privacidad, cloud y dirección de escucha</a>.</li>
          <li><a href="https://docs.ollama.com/gpu">Soporte oficial de hardware</a>.</li>
          <li><a href="https://github.com/ollama/ollama">Repositorio y licencia de Ollama</a>.</li>
        </ul>
      </div>

      <Guardar>
        Abre el <a href={labUrl}>laboratorio MIT en Aulafy/Taller</a>, ejecuta la
        prueba en tu equipo y conserva el informe. No subas prompts, documentos
        ni salidas sensibles al repositorio. La evidencia útil es la configuración
        minimizada, las métricas y la decisión.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/diagnostico-piloto", label: "Diagnóstico y piloto" }}
        next={{ href: "/cursos/ia-pymes/rgpd-basico", label: "RGPD básico" }}
      />
    </Chapter>
  );
}
