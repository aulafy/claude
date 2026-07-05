import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Tool calling con modelos locales: troubleshooting — Claude Code + IA Local",
  description:
    "Diagnostica tool calling roto con modelos locales, Ollama, Open WebUI, Hermes, MCP y quants GGUF: parsers, formatos, permisos y pruebas pequeñas.",
  keywords: [
    "tool calling error ollama hermes fix",
    "tool calling modelos locales",
    "Ollama function calling troubleshooting",
    "MCP tools modelos locales",
  ],
  alternates: { canonical: "/cursos/ia-local/tool-calling-modelos-locales" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Tool calling local"
      title="Tool calling con modelos locales: troubleshooting"
      icon="tools"
      lead={<>Cuando un agente local falla, a veces el modelo no es “tonto”: simplemente no está emitiendo llamadas a herramientas en el formato que tu runtime espera. La solución empieza por pruebas pequeñas y trazas claras.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Distinguir fallo de razonamiento, fallo de parser y fallo de permisos.</li>
          <li>Probar tools con un caso mínimo antes de usar repos reales.</li>
          <li>Elegir cuándo usar Ollama, Open WebUI, Hermes, MCP o vLLM.</li>
        </ul>
      </Objetivos>

      <Cristiano term="tool calling">
        Es cuando el modelo no solo responde texto, sino que pide ejecutar una herramienta con argumentos estructurados: buscar, leer archivo, consultar API, calcular o modificar algo.
      </Cristiano>

      <div className="prose">
        <h2>Diagnóstico en capas</h2>
        <ol>
          <li><strong>Modelo</strong>: ¿sabe seguir formato JSON/tool?</li>
          <li><strong>Runtime</strong>: ¿Ollama, Hermes, Open WebUI o vLLM esperan el mismo formato?</li>
          <li><strong>Parser</strong>: ¿extrae argumentos o se queda con texto libre?</li>
          <li><strong>Permisos</strong>: ¿la tool existe y puede ejecutarse?</li>
        </ol>
      </div>

      <Terminal>{`Prueba mínima:
Herramienta disponible: get_time({ "timezone": "Europe/Madrid" })

Pregunta:
"Usa la herramienta get_time para decirme la hora en Madrid.
No inventes la hora. Si no puedes llamar la herramienta, dilo."

Resultado esperado:
- llamada estructurada a get_time
- argumentos válidos
- respuesta basada en salida real`}</Terminal>

      <Idea>
        Si el modelo no puede llamar una tool de juguete, no lo pongas a gestionar GitHub, archivos o bases de datos.
      </Idea>

      <div className="prose">
        <h2>Fallos típicos</h2>
        <ul>
          <li>El modelo describe la tool en texto, pero no la invoca.</li>
          <li>Genera JSON inválido o con campos inventados.</li>
          <li>El runtime oculta el error y parece que “no pasa nada”.</li>
          <li>Una cuantización o conversión ha degradado el comportamiento con tools.</li>
          <li>La tool ejecuta código arbitrario sin revisión humana.</li>
        </ul>
      </div>

      <Cuidado>
        Open WebUI advierte que Tools, Functions, Pipes, Filters y Pipelines ejecutan Python en el servidor. Trátalos como código con permisos, no como “plugins inocentes”.
      </Cuidado>

      <Terminal>{`Checklist:
- Log de prompt completo
- Log de tool schema
- Log de salida del modelo antes del parser
- Log de argumentos parseados
- Log de ejecución real
- Regla de aprobación humana para escritura`}</Terminal>

      <Comprueba>
        Haz una matriz modelo/runtime/tool. Si una combinación falla, no cambies todo: prueba el mismo modelo con otra tool o la misma tool con otro modelo.
      </Comprueba>

      <Guardar>
        Tool calling estable es ingeniería de interfaces: schema pequeño, parser compatible, permisos mínimos y trazas. Sin eso, el agente solo parece autónomo.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.ollama.com/api" target="_blank" rel="noopener noreferrer">Ollama API</a></li>
          <li><a href="https://docs.openwebui.com/features/extensibility/plugin/" target="_blank" rel="noopener noreferrer">Open WebUI: Tools & Functions</a></li>
          <li><a href="https://modelcontextprotocol.io/specification/2025-06-18/server/tools" target="_blank" rel="noopener noreferrer">MCP specification: tools</a></li>
          <li><a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener noreferrer">Hermes Agent documentation</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/hermes-agente-coding-local", label: "Hermes y Ollama" }}
        next={{ href: "/cursos/ia-local/open-webui-qdrant", label: "Open WebUI + Qdrant" }}
      />
    </Chapter>
  );
}
