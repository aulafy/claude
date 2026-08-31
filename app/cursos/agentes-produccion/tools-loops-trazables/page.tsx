import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Observar tools y detectar loops en agentes de IA",
  description: "Instrumenta herramientas de un agente, limita repeticiones y deja evidencia de permisos, errores y decisiones de parada.",
  alternates: { canonical: "/cursos/agentes-produccion/tools-loops-trazables" },
};

export default function Page() {
  return (
    <Chapter crumb="Módulo 5" title="Tools y loops trazables" icon="tools" lead={<>Una tool es una frontera de riesgo. No basta con saber que fue llamada: necesitas saber con qué intención resumida, qué permiso tenía, cuánto tardó, qué devolvió y por qué el agente decidió repetirla o parar.</>} courseHref="/cursos/agentes-produccion" courseLabel="Agentes en producción">
      <Objetivos><ul><li>Crear observaciones tipo <code>tool</code> con entradas y salidas minimizadas.</li><li>Establecer límites que corten un bucle antes de agotar recursos.</li><li>Separar un error recuperable de una acción que requiere aprobación.</li></ul></Objetivos>
      <Terminal>{`MAX_LLAMADAS_POR_TOOL = 2

@observe(name="consultar-estado-pedido", as_type="tool")
def consultar_estado(pedido_id: str, llamadas_previas: int) -> dict:
    if llamadas_previas >= MAX_LLAMADAS_POR_TOOL:
        raise RuntimeError("Límite de llamadas: escalar a revisión humana")
    # Nunca uses una shell general como herramienta inicial.
    return {"pedido_id": pedido_id, "estado": "pendiente", "dato_sintetico": True}

@observe(name="agente-soporte", as_type="agent")
def ejecutar_agente(pregunta: str) -> str:
    # Registra decisión, no razonamiento interno sensible.
    decision = {"accion": "consultar_estado", "motivo": "pedido identificado"}
    resultado = consultar_estado("demo-1042", llamadas_previas=0)
    return f"Borrador: el pedido está {resultado['estado']}. Requiere revisión."`}</Terminal>
      <div className="prose"><h2>Política mínima de parada</h2><ul><li>Máximo de llamadas por tool y por tarea.</li><li>Timeout por llamada y presupuesto total de tiempo.</li><li>Reintentos solo para fallos transitorios y con backoff.</li><li>Acciones de escritura, envío o publicación: aprobación humana explícita.</li><li>Salida segura: respuesta de abstención más identificador de revisión.</li></ul></div>
      <Cuidado>No registres cadenas de razonamiento privadas como sustituto de una auditoría. Registra la decisión observable, la herramienta, sus argumentos minimizados, el resultado y la política aplicada. Es más útil y reduce exposición de datos.</Cuidado>
      <Comprueba>Provoca una respuesta de la tool que no resuelve la tarea. Verifica que el agente no la llama más veces que el límite, deja una observación de error o advertencia y termina en revisión humana.</Comprueba>
      <Idea>Un loop no es solo un problema de coste. Puede duplicar llamadas externas, enviar mensajes dos veces o bloquear una cola. La traza debe demostrar que el sistema sabe parar.</Idea>
      <Guardar>El agente no gana autonomía porque llama a más tools; la gana cuando las llama dentro de permisos, presupuestos y salidas revisables.</Guardar>
      <ChapterNav prev={{ href: "/cursos/agentes-produccion/rag-trazabilidad", label: "RAG con trazabilidad" }} next={{ href: "/cursos/agentes-produccion/evals-scores-langfuse", label: "Evals y scores" }} />
    </Chapter>
  );
}
