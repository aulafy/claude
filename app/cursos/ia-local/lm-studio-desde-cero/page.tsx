import type { Metadata } from "next";
import Link from "next/link";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "LM Studio desde cero: instala y usa IA local",
  description: "Aprende a instalar LM Studio, descargar un modelo, ejecutar IA en tu ordenador y comprobar su API local en Windows, Mac y Linux.",
  keywords: ["LM Studio desde cero", "instalar LM Studio", "LM Studio Windows", "LM Studio Mac", "LM Studio Linux", "LM Studio API local", "localhost 1234", "IA local"],
  alternates: { canonical: "/cursos/ia-local/lm-studio-desde-cero" },
};

export default function Page() {
  return (
    <Chapter
      crumb="LM Studio desde cero"
      title="LM Studio desde cero: instala y usa tu primera IA local"
      icon="desktop"
      lead={<>Instala LM Studio, elige un modelo que quepa en tu equipo y demuestra que el chat y la API local funcionan. La meta no es encontrar el mejor modelo, sino construir una prueba reproducible.</>}
    >
      <Objetivos>
        <ul>
          <li>Distinguir LM Studio, el modelo, el formato y la cuantización.</li>
          <li>Descargar, cargar y probar un modelo local adecuado para tu memoria.</li>
          <li>Arrancar la API en <code>localhost:1234</code> y comprobarla.</li>
          <li>Guardar una evidencia que otra persona pueda repetir.</li>
        </ul>
      </Objetivos>

      <Cristiano term="LM Studio">
        Es la aplicación que descarga y ejecuta modelos en tu ordenador. LM Studio no es el modelo: Qwen, Gemma, Mistral o Llama son familias de modelos que el programa puede cargar mediante runtimes compatibles.
      </Cristiano>

      <div className="prose">
        <h2>Qué vas a construir</h2>
        <p>Primero probarás un chat. Después activarás el servidor para demostrar que otra aplicación puede usar el mismo modelo.</p>
      </div>
      <Terminal>{`TU TEXTO → LM STUDIO → MODELO → RESPUESTA

TU FUTURA APP → localhost:1234 → LM STUDIO → MODELO`}</Terminal>

      <div className="prose">
        <h2>LM Studio frente a Ollama</h2>
        <p>Los dos ejecutan modelos locales. LM Studio hace visibles la búsqueda, descarga, carga y configuración en una interfaz gráfica; Ollama resulta especialmente cómodo para terminal y automatización. Puedes usar ambos y comparar el mismo tipo de modelo para separar la calidad del modelo de la experiencia del runtime.</p>
        <p>Consulta <Link href="/cursos/ia-local/ollama-desde-cero">Ollama desde cero</Link> si quieres empezar por CLI.</p>

        <h2>Comprueba si tu equipo encaja</h2>
        <ul>
          <li><strong>macOS:</strong> Apple Silicon M1-M4, macOS 14 o posterior. Intel no está soportado actualmente.</li>
          <li><strong>Windows:</strong> x64 con AVX2 o ARM compatible. LM Studio recomienda 16 GB de RAM y 4 GB de VRAM dedicada como referencia.</li>
          <li><strong>Linux:</strong> x64 o ARM64; la aplicación se distribuye como AppImage y documenta Ubuntu 20.04 o posterior.</li>
        </ul>
        <p>LM Studio recomienda 16 GB de RAM. Un Mac de 8 GB puede ejecutar modelos pequeños con contexto modesto. Ninguna cifra garantiza que un modelo concreto vaya a caber: también cuentan cuantización, contexto, caché y memoria libre.</p>
      </div>

      <Cuidado>
        Empieza con un modelo instruct pequeño, aproximadamente entre 1B y 8B, y un contexto de 4K-8K. Cargar el modelo más grande o activar 128K de contexto no mejora una práctica básica y puede dejar el sistema sin memoria útil.
      </Cuidado>

      <div className="prose">
        <h2>Instala desde la fuente oficial</h2>
        <p>Descarga la aplicación desde <a href="https://lmstudio.ai" target="_blank" rel="noopener noreferrer">lmstudio.ai</a>, instálala y ábrela al menos una vez. No uses mirrors o instaladores enlazados por tutoriales antiguos.</p>
        <h2>Comprueba la CLI <code>lms</code></h2>
        <p><code>lms</code> viene incluido con LM Studio. Abre una terminal nueva después de iniciar la aplicación.</p>
      </div>
      <Terminal>{`lms --help
lms ls
lms ps`}</Terminal>
      <Comprueba>Si <code>lms --help</code> devuelve la ayuda, la CLI está disponible. Si no aparece, abre LM Studio una vez y después una terminal nueva.</Comprueba>

      <div className="prose">
        <h2>Descarga y carga tu primer modelo</h2>
        <p>En <strong>Discover</strong>, elige una sola variante instruct o chat. Revisa tamaño, formato, cuantización y licencia. En Apple Silicon puedes encontrar modelos MLX; GGUF es otro formato habitual.</p>
        <p>Q4, Q5 y Q8 representan cuantizaciones distintas: menos bits suele reducir memoria a cambio de posible pérdida de fidelidad. La lección <Link href="/cursos/ia-local/cuantizacion-gguf">Cuantización GGUF</Link> explica el detalle.</p>
        <p>Carga el modelo con ajustes conservadores y escribe en el chat: <em>«Explica en una frase qué significa ejecutar una IA local»</em>.</p>
      </div>
      <Terminal>{`# Comprueba qué modelo está cargado
lms ps`}</Terminal>

      <div className="prose">
        <h2>Arranca el servidor local</h2>
        <p>En la sección <strong>Developer</strong>, activa <strong>Start Server</strong>. También puedes hacerlo desde terminal. El puerto usado en los ejemplos oficiales es <code>1234</code>.</p>
      </div>
      <Terminal>{`lms server start
lms server status`}</Terminal>
      <Cuidado>
        Mantén desactivado <strong>Serve on Local Network</strong>. No uses <code>--bind 0.0.0.0</code> en esta práctica. LM Studio permite autenticación mediante tokens desde la versión 0.4.0, pero no necesitas exponer el servidor para aprender.
      </Cuidado>

      <div className="prose">
        <h2>Comprueba los modelos disponibles por API</h2>
        <p>Consulta el servidor y copia exactamente el identificador devuelto. No adivines el nombre.</p>
      </div>
      <Terminal>{`curl http://127.0.0.1:1234/v1/models`}</Terminal>
      <div className="prose">
        <h2>Genera una respuesta por API</h2>
      </div>
      <Terminal>{`curl http://127.0.0.1:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "IDENTIFICADOR",
    "messages": [{
      "role": "user",
      "content": "Resume en una frase qué significa ejecutar una IA local."
    }],
    "temperature": 0.2
  }'`}</Terminal>
      <Comprueba>Si <code>/v1/models</code> lista el modelo y <code>/v1/chat/completions</code> devuelve contenido dentro de <code>choices</code>, ya tienes una capa local de inferencia utilizable por otras aplicaciones.</Comprueba>

      <div className="prose">
        <h2>Por qué usamos una API compatible con OpenAI</h2>
        <p>LM Studio implementa endpoints como <code>/v1/models</code>, <code>/v1/responses</code>, <code>/v1/chat/completions</code> y <code>/v1/embeddings</code>. Muchos clientes pueden apuntar a <code>http://localhost:1234/v1</code> cambiando la URL base. Compatibilidad no significa que todas las funciones de un proveedor remoto sean idénticas.</p>
        <h2>¿Necesitas API key?</h2>
        <p>Por defecto el servidor no exige autenticación. Algunos SDK requieren un valor aunque el servidor local lo ignore; en ese caso puede usarse un marcador como <code>lm-studio</code>. Si activas <strong>Require Authentication</strong>, deberás crear y enviar un token real.</p>

        <h2>Comprueba la inferencia sin internet</h2>
        <p>Con el modelo ya descargado y cargado, desconecta temporalmente la red y repite una pregunta. Si responde, has demostrado inferencia local. Buscar o descargar modelos, comprobar actualizaciones, usar web search, modelos cloud o MCP remotos sí puede requerir red.</p>
      </div>
      <Idea>La pregunta útil no es «¿LM Studio es privado?», sino «¿esta petición concreta usa solo modelo, datos, herramientas y endpoints locales?».</Idea>

      <div className="prose">
        <h2>Diagnóstico rápido</h2>
        <ul>
          <li><strong>El modelo no carga:</strong> reduce tamaño, cuantización o contexto.</li>
          <li><strong>El equipo se bloquea:</strong> deja margen para el sistema operativo.</li>
          <li><strong>Connection refused:</strong> ejecuta <code>lms server status</code> y arranca el servidor.</li>
          <li><strong>El chat funciona pero curl no:</strong> la interfaz puede funcionar con el servidor HTTP apagado.</li>
          <li><strong>Puerto 11434:</strong> normalmente es Ollama; LM Studio usa 1234 en estos ejemplos.</li>
        </ul>
      </div>
      <Terminal>{`lms ls
lms ps
lms server status
lms log stream`}</Terminal>

      <div className="prose">
        <h2>Tu evidencia final</h2>
        <p>Guarda una nota sencilla. No necesitas un benchmark: necesitas una prueba que otra persona pueda repetir.</p>
      </div>
      <Terminal>{`Fecha:
Sistema operativo / CPU / RAM / GPU:
Versión de LM Studio:
Modelo / formato / cuantización / contexto:
Chat local: PASS / FAIL
/v1/models: PASS / FAIL
/v1/chat/completions: PASS / FAIL
Tiempo aproximado hasta responder:
Qué falló y qué cambiarías:
Fuente oficial consultada:`}</Terminal>

      <Guardar>
        Conserva hardware, versión, identificador exacto, formato, cuantización, contexto y resultados. Después compara con <Link href="/cursos/ia-local/ollama-desde-cero">Ollama</Link> o profundiza en <Link href="/cursos/ia-local/ollama-vllm-sglang-mlx">runtimes de inferencia</Link>.
      </Guardar>

      <div className="prose" id="fuentes-lm-studio">
        <h2>Fuentes oficiales verificadas</h2>
        <p>Revisión editorial: 4 de septiembre de 2026. Revisa de nuevo requisitos, botones y opciones si tu versión ha cambiado.</p>
        <ul>
          <li><a href="https://lmstudio.ai/docs/app/system-requirements" target="_blank" rel="noopener noreferrer">Requisitos del sistema</a></li>
          <li><a href="https://lmstudio.ai/docs/cli" target="_blank" rel="noopener noreferrer">CLI lms</a></li>
          <li><a href="https://lmstudio.ai/docs/developer/core/server" target="_blank" rel="noopener noreferrer">Servidor local</a></li>
          <li><a href="https://lmstudio.ai/docs/developer/core/authentication" target="_blank" rel="noopener noreferrer">Autenticación mediante tokens</a></li>
          <li><a href="https://lmstudio.ai/docs/developer/openai-compat" target="_blank" rel="noopener noreferrer">API compatible con OpenAI</a></li>
          <li><a href="https://lmstudio.ai/app-privacy" target="_blank" rel="noopener noreferrer">Privacidad de la aplicación</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/ollama-desde-cero", label: "Ollama desde cero" }}
        next={{ href: "/cursos/ia-local/cuantizacion-gguf", label: "Cuantización GGUF" }}
      />
    </Chapter>
  );
}
