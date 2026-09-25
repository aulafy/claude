import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "RAG trazable: fuentes, recuperación y grounding",
  description: "Aprende a observar un RAG registrando consulta, fuentes, latencia y evidencia sin almacenar documentos completos en las trazas.",
  alternates: { canonical: "/cursos/agentes-produccion/rag-trazabilidad" },
};

export default function Page() {
  return (
    <Chapter crumb="Módulo 4" title="RAG con trazabilidad" icon="search" lead={<>Un RAG no mejora por tener una base vectorial. Mejora cuando puedes responder: «¿qué recuperó, por qué eligió esa fuente y la respuesta usó realmente esa evidencia?».</>} courseHref="/cursos/agentes-produccion" courseLabel="Agentes en producción">
      <Objetivos><ul><li>Separar recuperación y generación en observaciones distintas.</li><li>Registrar evidencia mínima de cada chunk.</li><li>Detectar un fallo de grounding antes de culpar al modelo.</li></ul></Objetivos>
      <div className="prose"><h2>Diseña primero el contrato de evidencia</h2><p>Una traza RAG no necesita guardar el PDF completo. Para cada resultado, guarda el identificador de documento, versión, página o sección, puntuación y un extracto breve permitido. El documento queda en su sistema de origen con sus permisos.</p></div>
      <Terminal>{`from langfuse import observe

@observe(name="recuperar-fuentes", as_type="retriever")
def recuperar(pregunta: str) -> list[dict]:
    # Datos sintéticos: sustituye por tu retriever real.
    resultados = [
        {"documento_id": "politica-v3", "seccion": "devoluciones",
         "score": 0.91, "extracto": "Las devoluciones se revisan en 14 días."}
    ]
    # La salida es evidencia mínima, no el documento entero.
    return resultados

@observe(name="responder-con-fuentes", as_type="generation")
def generar(pregunta: str, fuentes: list[dict]) -> str:
    contexto = "\n".join(f"[{f['documento_id']}:{f['seccion']}] {f['extracto']}" for f in fuentes)
    return llamar_a_ollama(pregunta, contexto)`}</Terminal>
      <div className="prose"><h2>Diagnóstico en tres preguntas</h2><ol><li><strong>¿Llegó una fuente relevante?</strong> Si no, el problema es índice, filtros, embedding o consulta.</li><li><strong>¿La respuesta cita la fuente recuperada?</strong> Si no, revisa prompt, formato y límite de contexto.</li><li><strong>¿La fuente permite afirmar eso?</strong> Si no, es un fallo de grounding: debe abstenerse o pedir revisión.</li></ol></div>
      <Cuidado>Un identificador estable no es un permiso de acceso. Antes de recuperar, aplica filtros de tenant, rol y documento. No uses trazas para saltarte RLS, ni muestres extractos en un panel al que no tendría acceso el usuario original.</Cuidado>
      <Comprueba>Prepara dos preguntas sintéticas: una que sí tenga evidencia y otra que no. La primera debe enlazar una fuente concreta; la segunda debe responder «no tengo evidencia suficiente» en vez de inventar una cita.</Comprueba>
      <Idea>El mejor indicador inicial de RAG no es «la respuesta suena convincente». Es la proporción de respuestas cuya afirmación se puede seguir hasta una fuente autorizada y pertinente.</Idea>
      <Guardar>Recuperación, generación y validación son pasos distintos. Si se mezclan en un único log, el error se vuelve una opinión.</Guardar>
      <ChapterNav prev={{ href: "/cursos/agentes-produccion/traza-basica-ollama", label: "Primera traza con Ollama" }} next={{ href: "/cursos/agentes-produccion/tools-loops-trazables", label: "Tools y loops trazables" }} />
    </Chapter>
  );
}
