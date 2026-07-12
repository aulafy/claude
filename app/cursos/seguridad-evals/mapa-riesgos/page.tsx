import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Mapa de riesgos de IA generativa — Seguridad y evaluación",
  description:
    "Mapa práctico para entender riesgos de IA generativa con NIST AI RMF, AI Act europeo, daños, probabilidad, impacto y controles antes de producción.",
  keywords: ["riesgos IA generativa", "NIST AI RMF español", "AI Act IA generativa", "evaluar riesgos IA"],
  alternates: { canonical: "/cursos/seguridad-evals/mapa-riesgos" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Mapa de riesgos"
      title="Mapa de riesgos de IA generativa"
      icon="shield"
      lead={<>Un sistema de IA no es seguro porque “parece contestar bien”. Es seguro cuando sabes qué puede fallar, cómo lo mides, quién responde y qué controles reducen el daño.</>}
      courseHref="/cursos/seguridad-evals"
      courseLabel="Seguridad y evaluación"
    >
      <Objetivos>
        <ul>
          <li>Separar riesgos técnicos, legales, operativos y de usuario.</li>
          <li>Usar un mapa simple inspirado en NIST: gobernar, mapear, medir y gestionar.</li>
          <li>Decidir cuándo una app de IA puede publicarse y cuándo debe quedarse en piloto.</li>
        </ul>
      </Objetivos>

      <Cristiano term="gestión de riesgo">
        No es eliminar todos los fallos. Es saber cuáles importan, medirlos, reducirlos y tener una respuesta preparada si aparecen.
      </Cristiano>

      <div className="prose">
        <h2>Cuatro preguntas antes de publicar</h2>
        <ul>
          <li><strong>Gobernar</strong>: quién decide, quién revisa y qué está prohibido.</li>
          <li><strong>Mapear</strong>: qué usuarios, datos, herramientas y decisiones toca el sistema.</li>
          <li><strong>Medir</strong>: qué tests prueban errores, sesgos, privacidad y abuso.</li>
          <li><strong>Gestionar</strong>: qué límites, logs, permisos y procesos reducen el riesgo.</li>
        </ul>
      </div>

      <Idea>
        NIST AI RMF no es una lista de magia: es una forma ordenada de no olvidar gobierno, medición e incidentes.
      </Idea>

      <div className="prose">
        <h2>Ficha de riesgo mínima</h2>
      </div>

      <Terminal>{`riesgo:
  nombre: "responder con información médica inventada"
  sistema: "chatbot de atención"
  usuarios_afectados: ["clientes", "equipo soporte"]
  datos: ["preguntas", "historial de tickets"]
  probabilidad: media
  impacto: alto
  controles:
    - limitar dominio
    - responder con fuentes
    - abstención si no hay evidencia
    - revisión humana en casos sensibles
  tests:
    - preguntas sin evidencia
    - instrucciones maliciosas
    - datos personales en prompt
  responsable: "equipo producto"
  fecha_revision: "2026-07-03"`}</Terminal>

      <div className="prose">
        <h2>Responsible AI práctico</h2>
        <p>No lo conviertas en un manifiesto abstracto. Para cada sistema, revisa sesgo, accesibilidad, explicabilidad, privacidad, posibilidad de apelación y daño por automatizar demasiado.</p>
      </div>

      <Terminal>{`responsible_ai_check:
  usuarios_afectados:
    - clientes
    - empleados
  posibles_sesgos:
    - idioma
    - nivel_tecnico
    - acento_o_audio
  mitigaciones:
    - revisión humana en decisiones sensibles
    - alternativa manual disponible
    - logs sin datos personales completos
    - explicación breve de límites al usuario
  apelacion: "email de soporte humano"`}</Terminal>

      <Cuidado>
        En Europa, el AI Act ya aplica por fases. Las prácticas prohibidas y alfabetización en IA empezaron el 2 de febrero de 2025; las obligaciones para modelos de propósito general aplican desde el 2 de agosto de 2025. No conviertas esto en asesoría legal: úsalo como señal para revisar casos de uso.
      </Cuidado>

      <Comprueba>
        Coge una app de IA de Aulafy, por ejemplo un RAG con PDFs, y escribe tres riesgos: uno de privacidad, uno de respuesta incorrecta y uno de uso malicioso.
      </Comprueba>

      <Guardar>
        El mapa de riesgos es el primer archivo de producción. Si no sabes qué puede salir mal, no sabes qué estás desplegando.
      </Guardar>

      <ChapterNav next={{ href: "/cursos/seguridad-evals/owasp-llm", label: "OWASP Top 10 LLM" }} />
    </Chapter>
  );
}
