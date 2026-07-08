import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Soluciona errores de Ollama en Windows, macOS y Linux",
  description:
    "Guía de troubleshooting de Ollama: connection refused, modelos lentos, falta de memoria, puerto 11434, nombres de modelos y problemas con apps locales.",
  keywords: [
    "problemas Ollama",
    "Ollama connection refused",
    "Ollama puerto 11434",
    "Ollama lento",
    "Ollama Windows errores",
    "Ollama no responde",
  ],
  alternates: { canonical: "/cursos/ia-local/troubleshooting-ollama" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Soluciona errores de Ollama"
      title="Soluciona errores de Ollama en Windows, macOS y Linux"
      icon="tools"
      lead={<>La mayoría de fallos con IA local no son misteriosos: servicio apagado, modelo mal escrito, puerto incorrecto, falta de memoria o expectativas demasiado altas para el hardware. Esta guía te da un diagnóstico rápido antes de perder la tarde.</>}
    >
      <Objetivos>
        <ul>
          <li>Diagnosticar si Ollama está instalado, arrancado y accesible.</li>
          <li>Resolver errores típicos al conectar apps, Claude Code o pasarelas.</li>
          <li>Ajustar modelo y flujo cuando el equipo se queda corto.</li>
        </ul>
      </Objetivos>

      <Cristiano term="localhost:11434">
        Es la dirección de Ollama dentro de tu propio ordenador. Si una app no puede conectar con esa dirección, el problema suele estar en que Ollama no está arrancado, el puerto cambió o la app está ejecutándose en otro entorno.
      </Cristiano>

      <div className="prose">
        <h2>Diagnóstico de 60 segundos</h2>
      </div>

      <Terminal>{`ollama --version
ollama list
ollama ps
curl http://localhost:11434/api/tags`}</Terminal>

      <Comprueba>
        Si <code>api/tags</code> devuelve una lista de modelos, Ollama está vivo. Si falla ahí, no sigas tocando tu app: arregla primero Ollama.
      </Comprueba>

      <div className="prose">
        <h2>Error: connection refused</h2>
        <p>Significa que tu programa llama a <code>localhost:11434</code>, pero no hay nada escuchando.</p>
      </div>

      <Terminal>{`ollama serve`}</Terminal>

      <div className="prose">
        <p>En macOS y Windows, Ollama normalmente arranca como app de escritorio. Si cerraste la app, vuelve a abrirla. En Linux, revisa el servicio:</p>
      </div>

      <Terminal>{`systemctl status ollama
sudo systemctl restart ollama`}</Terminal>

      <div className="prose">
        <h2>Error: model not found</h2>
        <p>El nombre que usas en tu app no coincide con el modelo instalado.</p>
      </div>

      <Terminal>{`ollama list
ollama pull qwen3:4b`}</Terminal>

      <Idea>
        Copia el nombre exacto que aparece en <code>ollama list</code>. <code>qwen3</code>, <code>qwen3:4b</code> y <code>ollama/qwen3:4b</code> pueden significar cosas distintas según la herramienta.
      </Idea>

      <div className="prose">
        <h2>Ollama responde muy lento</h2>
        <ul>
          <li>Baja a un modelo más pequeño: 1B, 3B o 4B.</li>
          <li>Cierra apps pesadas antes de lanzar el modelo.</li>
          <li>Reduce contexto y documentos de entrada.</li>
          <li>Usa el flujo híbrido: Claude Code para construir, Ollama para procesar datos privados o repetitivos.</li>
        </ul>
      </div>

      <Cuidado>
        Si tu equipo entra en intercambio de memoria, todo se vuelve lentísimo. No es “culpa de la IA”: el modelo no cabe cómodo. Cambia a uno más pequeño y vuelve a probar.
      </Cuidado>

      <div className="prose">
        <h2>La app funciona en terminal, pero no desde Docker</h2>
        <p>Dentro de un contenedor, <code>localhost</code> apunta al contenedor, no a tu ordenador. Prueba con el host de Docker:</p>
      </div>

      <Terminal>{`http://host.docker.internal:11434`}</Terminal>

      <div className="prose">
        <h2>LiteLLM o una pasarela no conecta</h2>
        <p>Primero prueba Ollama directo. Después revisa el archivo de configuración de la pasarela.</p>
      </div>

      <Terminal>{`curl http://localhost:11434/api/tags

# En LiteLLM, el modelo suele declararse así:
model: ollama/qwen3:4b
api_base: http://localhost:11434`}</Terminal>

      <div className="prose">
        <h2>Checklist final</h2>
        <ul>
          <li>El comando <code>ollama --version</code> funciona.</li>
          <li><code>ollama list</code> muestra el modelo exacto.</li>
          <li><code>curl /api/tags</code> responde.</li>
          <li>Tu app apunta a <code>http://localhost:11434</code> o al host correcto si usa Docker.</li>
          <li>El modelo cabe en tu RAM sin bloquear el equipo.</li>
        </ul>
      </div>

      <Guardar>
        Cuando algo falle, guarda el error exacto, el sistema operativo, el modelo y la salida de los cuatro comandos de diagnóstico. Con eso, cualquier asistente o foro puede ayudarte mucho mejor.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/conectar-ollama", label: "Conecta Claude Code con tu IA local" }}
        next={{ href: "/cursos/ia-local/ollama-gpu-windows", label: "Ollama no usa la GPU en Windows" }}
      />
    </Chapter>
  );
}
