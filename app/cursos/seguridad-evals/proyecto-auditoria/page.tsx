import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Proyecto: auditoría de una app IA — Seguridad y evaluación",
  description:
    "Proyecto final para auditar una aplicación de IA antes de producción: riesgos, OWASP, evals, red teaming, privacidad, supply chain y decisión de salida.",
  keywords: ["auditoría IA", "checklist seguridad LLM", "evaluar app IA", "producción IA segura"],
  alternates: { canonical: "/cursos/seguridad-evals/proyecto-auditoria" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Auditoría"
      title="Proyecto: auditoría de una app IA"
      icon="clipboard"
      lead={<>El proyecto final es una auditoría práctica: coges una app de IA y produces un informe corto que diga qué hace, qué puede fallar, qué pruebas pasó y qué falta antes de producción.</>}
      courseHref="/cursos/seguridad-evals"
      courseLabel="Seguridad y evaluación"
    >
      <Objetivos>
        <ul>
          <li>Aplicar mapa de riesgos, OWASP, evals, privacidad y supply chain en una app real.</li>
          <li>Crear evidencia útil para decidir publicar, limitar o corregir.</li>
          <li>Dejar una plantilla repetible para futuros proyectos de Aulafy.</li>
        </ul>
      </Objetivos>

      <Cristiano term="decisión de salida">
        Es el veredicto final: publicar, publicar con límites, mantener en piloto o bloquear hasta corregir fallos críticos.
      </Cristiano>

      <div className="prose">
        <h2>Informe mínimo</h2>
      </div>

      <Terminal>{`# Auditoría IA

Sistema:
Responsable:
Fecha:
Usuarios:
Datos tratados:
Herramientas conectadas:

## Riesgos principales
- Riesgo:
  Impacto:
  Control:
  Estado:

## Evals
- Casos totales:
- Pasan:
- Fallan:
- Casos críticos:

## Red teaming
- Ataques probados:
- Fallos encontrados:
- Mitigaciones:

## Privacidad
- Datos sensibles:
- Logs:
- Retención:
- Accesos:

## Supply chain
- Modelos:
- Datasets:
- Dependencias:
- Licencias:

## Decisión
Resultado: publicar | publicar con límites | piloto | bloquear
Motivo:
Siguiente revisión:`}</Terminal>

      <Idea>
        Un informe de una página que se actualiza cada semana vale más que una auditoría enorme que nadie vuelve a mirar.
      </Idea>

      <div className="prose">
        <h2>Semáforo de salida</h2>
        <ul>
          <li><strong>Verde</strong>: no toca datos sensibles, no ejecuta acciones, evals básicas pasan.</li>
          <li><strong>Amarillo</strong>: toca datos internos o herramientas; requiere logs, límites y aprobación humana.</li>
          <li><strong>Rojo</strong>: puede afectar dinero, salud, empleo, derechos, clientes o datos personales; requiere revisión seria antes de producción.</li>
        </ul>
      </div>

      <Cuidado>
        Este curso no sustituye asesoría legal, de seguridad o cumplimiento. Sirve para que un equipo pequeño deje de improvisar y sepa cuándo necesita ayuda especializada.
      </Cuidado>

      <Comprueba>
        Audita una app ya creada en Aulafy: el RAG seguro, el agente de inbox o una automatización de pyme. El entregable debe ser una decisión de salida clara.
      </Comprueba>

      <Guardar>
        Una app de IA lista para producción no es la que responde bonito; es la que tiene límites, evals, trazas y una decisión responsable.
      </Guardar>

      <ChapterNav prev={{ href: "/cursos/seguridad-evals/supply-chain", label: "Supply chain" }} />
    </Chapter>
  );
}
