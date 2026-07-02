import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "MCP sin regalar tus llaves — Agentes y automatización",
  description:
    "Cómo conectar Claude Code a herramientas externas con MCP de forma útil y segura: permisos, tokens, alcance y auditoría.",
  alternates: { canonical: "/cursos/agentes-automatizacion/mcp-seguro" },
};

export default function Page() {
  return (
    <Chapter
      crumb="MCP sin regalar tus llaves"
      title="MCP sin regalar tus llaves"
      icon="plug"
      lead={<>MCP convierte a Claude Code en un operador de herramientas: GitHub, bases de datos, APIs, documentación o dashboards. El salto de poder es enorme; el salto de riesgo también. Aquí montamos MCP con mentalidad de mínimos permisos.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Decidir cuándo MCP merece la pena.</li>
          <li>Configurar servidores con tokens acotados.</li>
          <li>Evitar que un agente tenga permisos que no necesita.</li>
        </ul>
      </Objetivos>

      <Cristiano term="MCP">
        Es un estándar para enchufar herramientas a un modelo. En vez de copiar datos de GitHub, una base de datos o una API, Claude puede pedirlos directamente a un servidor MCP.
      </Cristiano>

      <div className="prose">
        <h2>La pregunta antes de conectar nada</h2>
        <p>¿Claude necesita leer esa herramienta, escribir en ella o ambas cosas? Si solo necesita consultar, no le des escritura. Si solo necesita un repositorio, no le des toda tu organización.</p>
      </div>

      <Terminal>{`# Modelo mental de permisos
LECTURA: buscar issues, leer docs, consultar tablas
ESCRITURA: crear issues, comentar PRs, modificar registros
ADMIN: cambiar configuración, borrar, rotar tokens

# Para agentes: casi nunca empieces por ADMIN.`}</Terminal>

      <Cuidado>
        El error clásico es usar un token personal con permisos amplios “para probar”. Lo que empieza como prueba se queda en producción. Crea tokens separados, con nombres claros y caducidad.
      </Cuidado>

      <div className="prose">
        <h2>Checklist de MCP seguro</h2>
        <ul>
          <li>Token específico para esa integración.</li>
          <li>Permisos mínimos.</li>
          <li>Lectura antes que escritura.</li>
          <li>Sin secretos en repositorios.</li>
          <li>Servidor MCP documentado en <code>CLAUDE.md</code>.</li>
          <li>Prueba en entorno de demo antes de datos reales.</li>
        </ul>
      </div>

      <Idea>
        Un MCP bueno convierte copiar-pegar en flujo. Un MCP mal configurado convierte un prompt ambiguo en una acción peligrosa.
      </Idea>

      <Comprueba>
        Monta una integración de solo lectura. Pide a Claude que liste datos. Luego pídele una acción de escritura y comprueba que no puede hacerla. Ese fallo controlado es una victoria.
      </Comprueba>

      <Guardar>
        MCP se documenta como infraestructura: para qué sirve, qué permisos tiene, dónde vive el token, cómo se revoca y quién lo mantiene.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/skills-seguras", label: "Skills seguras" }}
        next={{ href: "/cursos/agentes-automatizacion/github-routines", label: "GitHub Actions y routines" }}
      />
    </Chapter>
  );
}
