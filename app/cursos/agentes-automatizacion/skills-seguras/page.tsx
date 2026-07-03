import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Skills seguras y auditables — Agentes y automatización",
  description:
    "Cómo crear y auditar skills de Claude Code con frontmatter, herramientas permitidas, scripts revisables y permisos mínimos.",
  keywords: ["skills Claude Code seguras", "auditar skills IA", "SKILL.md allowed-tools", "Agent Skills seguridad"],
  alternates: { canonical: "/cursos/agentes-automatizacion/skills-seguras" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Skills seguras"
      title="Skills seguras y auditables"
      icon="capsule"
      lead={<>Una skill buena empaqueta un procedimiento. Una skill peligrosa empaqueta permisos excesivos, scripts opacos y llamadas de red que nadie ha leído.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Crear skills pequeñas, versionables y fáciles de revisar.</li>
          <li>Auditar `SKILL.md`, scripts auxiliares y permisos antes de instalar.</li>
          <li>Evitar skills que mezclan conocimiento, ejecución y secretos.</li>
        </ul>
      </Objetivos>

      <Cristiano term="skill">
        Es una carpeta con instrucciones y recursos para enseñar a Claude un procedimiento reutilizable sin cargarlo todo siempre en contexto.
      </Cristiano>

      <Terminal>{`---
name: deploy-preview
description: Crea un deploy preview y resume el resultado.
allowed-tools: Bash(npm run build), Bash(vercel deploy --yes), Bash(git status *)
disable-model-invocation: true
---
1. Comprueba estado de git.
2. Ejecuta build.
3. Crea deploy preview.
4. Devuelve URL, commit y errores si los hay.
5. No hagas deploy a produccion.`}</Terminal>

      <div className="prose">
        <h2>Checklist de auditoría</h2>
        <ul>
          <li>Lee el `SKILL.md` entero, no solo la descripción.</li>
          <li>Busca `curl`, `wget`, `nc`, `ssh`, `gh auth token`, `.env` y dominios externos.</li>
          <li>Revisa `allowed-tools`: evita `Bash(*)` salvo que sea local y de confianza.</li>
          <li>Comprueba scripts incluidos en la carpeta de la skill.</li>
          <li>Prueba primero en proyecto limpio, sin credenciales reales.</li>
        </ul>
      </div>

      <Idea>
        Las mejores skills parecen documentación ejecutable: instrucciones claras, comandos concretos y alcance pequeño.
      </Idea>

      <Cuidado>
        Una skill instalada desde internet es código de terceros. Si puede ejecutar shell o leer archivos, trátala como tratarías un paquete npm desconocido.
      </Cuidado>

      <Comprueba>
        Audita una skill propia: reduce herramientas, elimina comandos genéricos y separa los pasos peligrosos en una aprobación manual.
      </Comprueba>

      <Guardar>
        Skill segura es skill aburrida: poco alcance, permisos mínimos y comportamiento fácil de explicar.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/hooks", label: "Hooks" }}
        next={{ href: "/cursos/agentes-automatizacion/mcp-seguro", label: "MCP seguro" }}
      />
    </Chapter>
  );
}
