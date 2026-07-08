import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Respuestas estructuradas con citas en RAG",
  description:
    "Define contratos de respuesta para RAG profesional: answer, confidence, citations, missing_fields, no sé, evidencias y validación antes de responder.",
  keywords: ["RAG respuestas estructuradas citas", "RAG citations confidence JSON", "fix RAG hallucinations citations", "RAG no sé"],
  alternates: { canonical: "/cursos/rag-seguro/respuestas-estructuradas-citas" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Respuestas con citas"
      title="Respuestas estructuradas con citas en RAG"
      icon="quote"
      lead={<>Para usar RAG en una pyme o proyecto serio, “texto bonito” no basta. Necesitas contrato: respuesta, evidencia, confianza, campos faltantes y una salida clara cuando el contexto no alcanza.</>}
      courseHref="/cursos/rag-seguro"
      courseLabel="RAG avanzado y seguro"
    >
      <Objetivos>
        <ul>
          <li>Diseñar un contrato de respuesta validable.</li>
          <li>Forzar citas ligadas a chunks recuperados.</li>
          <li>Evitar alucinaciones con “no tengo evidencia suficiente”.</li>
        </ul>
      </Objetivos>

      <Cristiano term="contrato de respuesta">
        Es el formato obligatorio que la IA debe devolver. Permite validar si hay respuesta, citas, confianza y campos faltantes antes de enseñarlo al usuario.
      </Cristiano>

      <Terminal>{`{
  "answer": "Puedes devolver el producto durante 14 días naturales.",
  "confidence": "high",
  "citations": [
    {
      "document_id": "politica-devoluciones",
      "section": "Devoluciones",
      "page": 3,
      "quote": "plazo de 14 días naturales"
    }
  ],
  "missing_fields": [],
  "cannot_answer": false
}`}</Terminal>

      <Idea>
        Si una cita no apunta a un chunk recuperado, no es cita: es decoración.
      </Idea>

      <div className="prose">
        <h2>Reglas de generación</h2>
        <ul>
          <li>Responder solo con contexto recuperado.</li>
          <li>Cada afirmación importante debe tener cita.</li>
          <li>Si faltan datos, rellenar `missing_fields`.</li>
          <li>Si no hay evidencia, activar `cannot_answer`.</li>
          <li>Validar JSON antes de mostrarlo.</li>
        </ul>
      </div>

      <Cuidado>
        No dejes que el prompt “invente” confianza. La confianza debe depender de recuperación, concordancia entre fuentes y cobertura de campos.
      </Cuidado>

      <Terminal>{`regla_no_se:
  si:
    retrieved_chunks < 2
    o no hay cita directa
    o las fuentes se contradicen
  entonces:
    cannot_answer: true
    answer: "No tengo evidencia suficiente en los documentos recuperados."
    missing_fields: ["fuente verificable"]`}</Terminal>

      <Comprueba>
        Pregunta algo que no esté en los documentos. Si el sistema responde con seguridad, el contrato está mal diseñado o no se está validando.
      </Comprueba>

      <Guardar>
        RAG profesional no es responder más: es responder menos veces, pero con evidencia clara y formato verificable.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://qdrant.tech/documentation/" target="_blank" rel="noopener noreferrer">Qdrant documentation</a></li>
          <li><a href="https://qdrant.tech/documentation/search/hybrid-queries/" target="_blank" rel="noopener noreferrer">Qdrant hybrid queries</a></li>
          <li><a href="https://docs.openwebui.com/" target="_blank" rel="noopener noreferrer">Open WebUI documentation</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/rag-seguro/debugging-grounding", label: "Debugging RAG" }}
        next={{ href: "/cursos/rag-seguro/evals-metricas", label: "Evals RAG" }}
      />
    </Chapter>
  );
}
