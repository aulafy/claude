import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Privacidad, logs y datos sensibles — Seguridad y evaluación",
  description:
    "Cómo manejar privacidad en apps de IA: minimización de datos, PII, secretos, logs, retención, anonimización y revisión humana.",
  keywords: ["privacidad IA", "logs LLM", "datos sensibles IA", "RGPD IA"],
  alternates: { canonical: "/cursos/seguridad-evals/privacidad-datos" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Privacidad"
      title="Privacidad, logs y datos sensibles"
      icon="lock"
      lead={<>La privacidad se rompe por sitios muy normales: prompts guardados, logs demasiado completos, capturas, vectores con datos personales, emails reenviados o herramientas con permisos amplios.</>}
      courseHref="/cursos/seguridad-evals"
      courseLabel="Seguridad y evaluación"
    >
      <Objetivos>
        <ul>
          <li>Reducir datos antes de enviarlos al modelo.</li>
          <li>Separar logs útiles de logs peligrosos.</li>
          <li>Diseñar retención, anonimización y revisión para apps educativas o de pyme.</li>
        </ul>
      </Objetivos>

      <Cristiano term="minimización">
        Enviar solo los datos necesarios para la tarea. Si el modelo no necesita DNI, teléfono o contrato completo, no se lo des.
      </Cristiano>

      <div className="prose">
        <h2>Qué no debe ir a logs sin pensar</h2>
        <ul>
          <li>Prompts completos con datos personales.</li>
          <li>Respuestas con contratos, facturas o historiales.</li>
          <li>Tokens, claves API, cookies o cabeceras.</li>
          <li>Documentos recuperados completos.</li>
          <li>Audio original de usuarios si no hay necesidad clara.</li>
        </ul>
      </div>

      <Idea>
        Un log bueno ayuda a depurar sin convertirse en una copia secreta de todos los datos privados.
      </Idea>

      <div className="prose">
        <h2>Log seguro mínimo</h2>
      </div>

      <Terminal>{`{
  "request_id": "req_20260703_001",
  "user_role": "soporte",
  "tenant_id_hash": "6f2a...",
  "route": "/api/chat",
  "model": "qwen3:8b",
  "risk_flags": ["pii_detected", "rag_used"],
  "retrieved_document_ids": ["doc_123", "doc_456"],
  "answer_length": 842,
  "refused": false,
  "latency_ms": 1840
}`}</Terminal>

      <Cuidado>
        Hash no siempre significa anonimización real. Si puedes volver a identificar a alguien combinando datos, sigue siendo información sensible.
      </Cuidado>

      <div className="prose">
        <h2>Filtro antes del modelo</h2>
      </div>

      <Terminal>{`def redact(text):
    text = text.replace("API_KEY=", "API_KEY=[REDACTED]")
    # En producción usa detectores más serios para emails, teléfonos, DNI y secretos.
    return text

safe_prompt = redact(user_prompt)
response = model.generate(safe_prompt)`}</Terminal>

      <div className="prose">
        <h2>Auditoría de dataset y permisos</h2>
        <p>Antes de indexar documentos o entrenar con datos internos, crea un inventario. La pregunta no es solo “¿tenemos estos datos?”, sino “¿podemos usarlos para esta finalidad?”.</p>
      </div>

      <Terminal>{`data_inventory:
  dataset: "tickets_soporte_2026"
  contiene_pii: true
  base_uso: "soporte interno"
  permitido_para:
    - "clasificación"
    - "borradores con revisión"
  prohibido_para:
    - "entrenamiento sin anonimizar"
    - "compartir con APIs externas"
  retencion_dias: 90
  owner: "operaciones"`}</Terminal>

      <Comprueba>
        Busca en tus logs locales tres tipos de dato: email, token y contrato. Si aparecen sin necesidad, tienes una tarea de privacidad.
      </Comprueba>

      <Guardar>
        Privacidad en IA significa diseñar qué no entra, qué no se guarda y quién puede ver cada traza.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/seguridad-evals/red-teaming", label: "Red teaming" }}
        next={{ href: "/cursos/seguridad-evals/supply-chain", label: "Supply chain" }}
      />
    </Chapter>
  );
}
