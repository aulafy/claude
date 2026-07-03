import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Governance MCP y conocimiento fiable — Agentes y automatización",
  description:
    "Cómo pasar de conectar MCP a gobernar herramientas, permisos, fuentes, documentos contradictorios y aprobaciones humanas.",
  keywords: ["MCP governance", "gobernanza MCP Claude", "tool permissions MCP", "conocimiento fiable agentes IA"],
  alternates: { canonical: "/cursos/agentes-automatizacion/mcp-governance" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Governance MCP"
      title="Governance MCP y conocimiento fiable"
      icon="userShield"
      lead={<>Conectar MCP es la parte fácil. Lo difícil es decidir qué fuentes son fiables, qué herramientas escriben, quién aprueba y cómo se resuelven contradicciones.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Diseñar inventario de servidores, herramientas y permisos reales.</li>
          <li>Separar conocimiento verificado de documentos obsoletos o contradictorios.</li>
          <li>Definir aprobaciones humanas para tools con impacto externo.</li>
        </ul>
      </Objetivos>

      <Cristiano term="governance">
        Es el conjunto de reglas para saber qué puede usar el agente, quién lo revisa y cómo se audita.
      </Cristiano>

      <Terminal>{`registro_mcp:
  server: github-readonly
  owner: equipo-dev
  entorno: produccion
  tools:
    - list_issues: allow
    - read_pull_request: allow
    - merge_pull_request: deny
  fuentes:
    prioridad:
      - docs/versionadas
      - runbooks/aprobados
      - issues/recientes
    prohibido:
      - borradores
      - documentos_sin_fecha
  revision:
    acciones_criticas: humana
    caducidad_fuentes_dias: 90`}</Terminal>

      <Idea>
        MCP con conocimiento viejo puede ser peor que no tener MCP: el agente gana confianza, pero usa material incorrecto.
      </Idea>

      <Cuidado>
        No mezcles lectura y escritura en el mismo servidor si no hace falta. Un MCP de consulta debería tener credenciales de consulta.
      </Cuidado>

      <Comprueba>
        Haz una matriz de cada MCP: tools de lectura, tools de escritura, datos sensibles, fuente de verdad, caducidad y aprobador.
      </Comprueba>

      <Guardar>
        El objetivo de MCP no es conectar más cosas. Es conectar menos cosas, mejor elegidas y con más control.
      </Guardar>

      <ChapterNav prev={{ href: "/cursos/agentes-automatizacion/loops-costes", label: "Loops y costes" }} />
    </Chapter>
  );
}
