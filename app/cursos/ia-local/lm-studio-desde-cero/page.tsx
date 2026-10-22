import type { Metadata } from "next";
import Link from "next/link";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "LM Studio actualizado: app, llmster, API y MCP",
  description: "Aprende LM Studio 0.4: app, CLI lms, llmster headless, API REST v1, endpoints OpenAI y Anthropic, MCP y carga JIT de modelos.",
  keywords: ["LM Studio desde cero", "LM Studio 0.4", "llmster", "LM Studio API v1", "LM Studio MCP", "LM Studio Codex", "localhost 1234", "IA local"],
  alternates: { canonical: "/cursos/ia-local/lm-studio-desde-cero" },
};

export default function Page() {
  return (
    <Chapter
      crumb="LM Studio desde cero"
      title="LM Studio actualizado: app, servidor y herramientas locales"
      icon="desktop"
      lead={<>Instala LM Studio, elige un modelo que quepa en tu equipo y demuestra que el chat y la API local funcionan. La meta no es encontrar el mejor modelo, sino construir una prueba reproducible.</>}
    >
      <Objetivos>
        <ul>
          <li>Distinguir la app de LM Studio, el daemon <code>llmster</code> y la CLI <code>lms</code>.</li>
          <li>Descargar, cargar y probar un modelo local adecuado para tu memoria.</li>
          <li>Arrancar la API v1 en <code>localhost:1234</code> y comprobarla.</li>
          <li>Entender carga JIT, endpoints compatibles, Codex y MCP sin confundirlos.</li>
          <li>Guardar una evidencia que otra persona pueda repetir.</li>
        </ul>
      </Objetivos>

      <Cristiano term="LM Studio">
        Es la aplicación que descarga y ejecuta modelos en tu ordenador. LM Studio no es el modelo: Qwen, Gemma, Mistral o Llama son familias de modelos que el programa puede cargar mediante runtimes compatibles.
      </Cristiano>

      <div className="prose">
        <h2>Tres piezas, no una sola aplicación</h2>
        <ul>
          <li><strong>LM Studio:</strong> la app gráfica para descubrir modelos, conversar, usar documentos, configurar MCP y administrar el servidor.</li>
          <li><strong>llmster:</strong> el daemon headless recomendado para servidores Linux, equipos sin pantalla, CI o un servicio que arranca con la máquina.</li>
          <li><strong>lms:</strong> la CLI que controla la app o llmster: descarga, carga, chat, servidor, runtimes, logs y daemon.</li>
        </ul>
      </div>

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
        <p>Si necesitas un servidor sin interfaz gráfica, instala <strong>llmster</strong> en lugar de la app. Usa el instalador oficial y después levanta el daemon con <code>lms daemon up</code>.</p>
        <h2>Comprueba la CLI <code>lms</code></h2>
        <p><code>lms</code> viene incluido con LM Studio. Abre una terminal nueva después de iniciar la aplicación.</p>
      </div>
      <Terminal>{`# App de escritorio: abre LM Studio una vez y después usa
lms --help
lms ls
lms ps

# Servidor headless con llmster (Linux/macOS)
curl -fsSL https://lmstudio.ai/install.sh | bash
lms daemon up`}</Terminal>
      <Comprueba>Si <code>lms --help</code> devuelve la ayuda, la CLI está disponible. Si no aparece, abre LM Studio una vez y después una terminal nueva.</Comprueba>

      <div className="prose">
        <h2>Descarga y carga tu primer modelo</h2>
        <p>En <strong>Discover</strong>, elige una sola variante instruct o chat. Revisa tamaño, formato, cuantización y licencia. En Apple Silicon puedes encontrar modelos MLX; GGUF es otro formato habitual.</p>
        <p>Q4, Q5 y Q8 representan cuantizaciones distintas: menos bits suele reducir memoria a cambio de posible pérdida de fidelidad. La lección <Link href="/cursos/ia-local/cuantizacion-gguf">Cuantización GGUF</Link> explica el detalle.</p>
        <p>Carga el modelo con ajustes conservadores y escribe en el chat: <em>«Explica en una frase qué significa ejecutar una IA local»</em>.</p>
      </div>
      <Terminal>{`# También puedes buscar, descargar y cargar desde la CLI
lms get NOMBRE
lms load NOMBRE --context-length 8192 --gpu=auto
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
        <h2>Carga JIT: modelos bajo demanda</h2>
        <p>Con <strong>Just-In-Time model loading</strong> activado, <code>/v1/models</code> puede listar todos los modelos descargados y una petición carga automáticamente el que todavía no está en memoria. Sin JIT, la API solo ve los modelos cargados y debes ejecutar <code>lms load</code> primero.</p>
        <p>Los modelos cargados por JIT pueden descargarse de memoria tras un periodo de inactividad. Es cómodo para un equipo personal, pero en un servicio con latencia comprometida conviene medir el tiempo de carga en frío.</p>
      </div>
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
        <h2>API nativa v1 y APIs compatibles</h2>
        <p>Desde LM Studio 0.4, la API nativa recomendada vive en <code>/api/v1/*</code>. Añade chat con estado, MCP, autenticación y gestión de modelos —descarga, carga y descarga de memoria—. No es lo mismo que los endpoints compatibles:</p>
        <ul>
          <li><code>/api/v1/chat</code>: API nativa, chat con estado, MCP y eventos detallados de carga y generación.</li>
          <li><code>/v1/responses</code>: compatible con OpenAI Responses; admite estado, herramientas y MCP, y permite conectar Codex.</li>
          <li><code>/v1/chat/completions</code>: compatible con clientes OpenAI clásicos; chat sin estado y tool calling.</li>
          <li><code>/v1/messages</code>: compatible con clientes Anthropic.</li>
        </ul>
        <p>Compatibilidad significa que muchos SDK pueden cambiar solo la URL base; no garantiza que todas las funciones de un proveedor remoto sean idénticas.</p>
        <h2>¿Necesitas API key?</h2>
        <p>Por defecto el servidor no exige autenticación. Algunos SDK requieren un valor aunque el servidor local lo ignore; en ese caso puede usarse un marcador como <code>lm-studio</code>. Si activas <strong>Require Authentication</strong>, deberás crear y enviar un token real.</p>

        <h2>Comprueba la API nativa</h2>
      </div>

      <Terminal>{`curl http://127.0.0.1:1234/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "IDENTIFICADOR",
    "input": "Explica LM Studio en una frase.",
    "context_length": 8192,
    "temperature": 0.2
  }'`}</Terminal>

      <div className="prose">
        <h2>Codex, herramientas y MCP</h2>
        <p>LM Studio implementa <code>POST /v1/responses</code>, por lo que Codex puede conectarse al servidor local. El resultado real depende de que el modelo tenga contexto suficiente y sea capaz de llamar herramientas con fiabilidad.</p>
        <p>LM Studio también puede usar servidores MCP desde la app y desde la API v1. Puedes declarar un MCP remoto por petición o habilitar servidores guardados en <code>mcp.json</code>. Limita <code>allowed_tools</code> y revisa permisos: un modelo local con herramientas puede leer archivos o realizar acciones igual que uno remoto.</p>

        <h2>Comprueba la inferencia sin internet</h2>
        <p>Con el modelo ya descargado y cargado, desconecta temporalmente la red y repite una pregunta. Si responde, has demostrado inferencia local. Buscar o descargar modelos, comprobar actualizaciones, usar web search, modelos cloud o MCP remotos sí puede requerir red.</p>
      </div>
      <Idea>La pregunta útil no es «¿LM Studio es privado?», sino «¿esta petición concreta usa solo modelo, datos, herramientas y endpoints locales?».</Idea>

      <Cuidado>
        LM Studio puede servir en la red, autenticar con tokens y llamar servidores MCP remotos. Ninguna de esas opciones es necesaria para una primera práctica local. Mantén el bind en localhost, activa autenticación antes de ampliar acceso y evita entregar herramientas de escritura o ejecución sin una prueba aislada.
      </Cuidado>

      <div className="prose">
        <h2>Diagnóstico rápido</h2>
        <ul>
          <li><strong>El modelo no carga:</strong> reduce tamaño, cuantización o contexto.</li>
          <li><strong>El equipo se bloquea:</strong> deja margen para el sistema operativo.</li>
          <li><strong>Connection refused:</strong> ejecuta <code>lms server status</code> y arranca el servidor.</li>
          <li><strong>El chat funciona pero curl no:</strong> la interfaz puede funcionar con el servidor HTTP apagado.</li>
          <li><strong>La primera petición tarda mucho:</strong> con JIT puede estar cargando el modelo en memoria; compara después una segunda petición.</li>
          <li><strong>Un MCP no aparece:</strong> revisa los permisos del servidor y si están habilitados los MCP por petición o los definidos en <code>mcp.json</code>.</li>
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
App o llmster:
Modelo / formato / cuantización / contexto:
JIT: ON / OFF
Chat local: PASS / FAIL
/api/v1/chat: PASS / FAIL
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
        <p>Revisión editorial: 22 de octubre de 2026. Revisa de nuevo requisitos, botones y opciones si tu versión ha cambiado.</p>
        <ul>
          <li><a href="https://lmstudio.ai/docs/app/system-requirements" target="_blank" rel="noopener noreferrer">Requisitos del sistema</a></li>
          <li><a href="https://lmstudio.ai/docs/app/basics/lmstudio-vs-llmster-vs-lms" target="_blank" rel="noopener noreferrer">LM Studio, llmster y lms</a></li>
          <li><a href="https://lmstudio.ai/docs/cli" target="_blank" rel="noopener noreferrer">CLI lms</a></li>
          <li><a href="https://lmstudio.ai/docs/developer/core/server" target="_blank" rel="noopener noreferrer">Servidor local</a></li>
          <li><a href="https://lmstudio.ai/docs/developer/core/headless" target="_blank" rel="noopener noreferrer">Servidor headless y carga JIT</a></li>
          <li><a href="https://lmstudio.ai/docs/developer/rest" target="_blank" rel="noopener noreferrer">API REST v1</a></li>
          <li><a href="https://lmstudio.ai/docs/developer/core/authentication" target="_blank" rel="noopener noreferrer">Autenticación mediante tokens</a></li>
          <li><a href="https://lmstudio.ai/docs/developer/openai-compat" target="_blank" rel="noopener noreferrer">API compatible con OpenAI</a></li>
          <li><a href="https://lmstudio.ai/docs/developer/core/mcp" target="_blank" rel="noopener noreferrer">MCP mediante API</a></li>
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
