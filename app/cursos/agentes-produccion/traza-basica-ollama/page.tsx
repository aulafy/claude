import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Primera traza de Ollama con Langfuse",
  description: "Instrumenta una llamada local a Ollama mediante Langfuse y verifica una generación antes de añadir RAG o herramientas.",
  alternates: { canonical: "/cursos/agentes-produccion/traza-basica-ollama" },
};

export default function Page() {
  return (
    <Chapter crumb="Módulo 3" title="Primera traza con Ollama" icon="terminal" lead={<>Haz una sola cosa y mírala en el panel: una pregunta entra, Ollama responde y Langfuse registra la generación. Si esto no funciona, todavía no añadas RAG, agentes ni una base de datos.</>} courseHref="/cursos/agentes-produccion" courseLabel="Agentes en producción">
      <Objetivos><ul><li>Usar la API compatible con OpenAI de Ollama sin una clave de proveedor.</li><li>Crear una observación raíz y una generación anidada.</li><li>Añadir una versión y metadatos que permitan comparar ejecuciones.</li></ul></Objetivos>
      <div className="prose"><h2>El ejemplo mínimo en Python</h2><p>Langfuse proporciona un cliente compatible con OpenAI. Al apuntarlo a Ollama, el cambio está en la URL y el modelo; la instrumentación queda en el mismo recorrido. El código de Taller contiene la versión ejecutable y los requisitos fijados.</p></div>
      <Terminal>{`from langfuse import observe, propagate_attributes
from langfuse.openai import OpenAI
import os

client = OpenAI(
    base_url=os.environ["OLLAMA_BASE_URL"],
    api_key="ollama",  # Ollama la exige en la interfaz, no la usa.
)

@observe(name="responder-consulta", as_type="chain")
def responder(pregunta: str) -> str:
    with propagate_attributes(
        session_id="laboratorio-001",
        metadata={"entorno": "laboratorio", "prompt_version": "v1"},
        version="v1",
    ):
        respuesta = client.chat.completions.create(
            name="ollama-chat",
            model=os.environ["OLLAMA_MODEL"],
            messages=[{"role": "user", "content": pregunta}],
            temperature=0,
        )
        return respuesta.choices[0].message.content or ""

print(responder("Responde solo: traza recibida."))`}</Terminal>
      <div className="prose"><h2>Qué deberías ver</h2><ul><li>Una observación raíz llamada <code>responder-consulta</code>.</li><li>Una generación hija <code>ollama-chat</code> con modelo, entrada, salida y duración.</li><li>Los atributos de laboratorio y versión en la ejecución para filtrarla después.</li></ul><p>La documentación de Langfuse recomienda iniciar la instrumentación antes de la lógica que se quiere observar; en aplicaciones con arranque complejo, coloca esa inicialización en un módulo de instrumentación temprano.</p></div>
      <Cuidado>No uses correo, nombre completo, DNI, historia clínica, contratos ni prompts de producción como primera traza. La pregunta de prueba debe ser sintética y reconocible como tal.</Cuidado>
      <Comprueba><ol><li>Ejecuta el script dos veces con la misma pregunta.</li><li>Abre ambas ejecuciones en Langfuse.</li><li>Localiza la generación hija y compara duración, modelo y versión.</li><li>Detén el proceso y verifica que no queda ningún secreto escrito en el código.</li></ol></Comprueba>
      <Idea>La primera medida no es el coste: es la capacidad de enlazar respuesta, modelo y versión. Sin ese vínculo, no sabrás si una mejora aparente procede del prompt, el modelo o la casualidad.</Idea>
      <Guardar>Una buena primera traza es aburrida y completa: una tarea, una generación, un nombre legible y contexto mínimo.</Guardar>
      <ChapterNav prev={{ href: "/cursos/agentes-produccion/setup-langfuse-ollama", label: "Setup: Langfuse y Ollama" }} next={{ href: "/cursos/agentes-produccion/rag-trazabilidad", label: "RAG con trazabilidad" }} />
    </Chapter>
  );
}
