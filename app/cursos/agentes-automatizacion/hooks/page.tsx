import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Hooks: automatización determinista — Agentes y automatización",
  description:
    "Usa hooks para imponer reglas, ejecutar tests, bloquear comandos peligrosos y reducir errores en flujos agénticos.",
  keywords: ["hooks Claude Code", "automatización determinista IA", "PreToolUse PostToolUse", "seguridad agentes IA"],
  alternates: { canonical: "/cursos/agentes-automatizacion/hooks" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Hooks"
      title="Hooks: automatización determinista"
      icon="hook"
      lead={<>El modelo puede olvidar una regla. Un hook no. Por eso los hooks son la pieza correcta para bloquear acciones peligrosas, ejecutar verificaciones y dejar rastro.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Distinguir instrucciones blandas de controles obligatorios.</li>
          <li>Diseñar hooks para comandos, tests, logs y protección de ramas.</li>
          <li>Usar hooks sin convertir cada acción en una trampa de mantenimiento.</li>
        </ul>
      </Objetivos>

      <Cristiano term="hook">
        Es un comando o verificación que se ejecuta automáticamente en un punto del flujo, por ejemplo antes de usar una herramienta o después de editar.
      </Cristiano>

      <div className="prose">
        <h2>Cuándo usar hooks</h2>
        <ul>
          <li>Bloquear `git push` directo a `main`.</li>
          <li>Ejecutar lint o tests tras editar archivos críticos.</li>
          <li>Registrar comandos sensibles en un log.</li>
          <li>Impedir lectura de `.env`, claves o dumps privados.</li>
          <li>Forzar aprobación humana para deploy, borrados o migraciones.</li>
        </ul>
      </div>

      <Terminal>{`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/deny-dangerous.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint"
          }
        ]
      }
    ]
  }
}`}</Terminal>

      <Idea>
        La regla práctica: si el fallo sería caro, no lo dejes solo en el prompt. Ponlo en un hook, un test o una aprobación.
      </Idea>

      <Cuidado>
        Un hook demasiado agresivo puede bloquear el trabajo normal. Empieza con avisos y registros; convierte en bloqueo solo las acciones de alto riesgo.
      </Cuidado>

      <Comprueba>
        Escribe una lista de comandos que nunca quieres que un agente ejecute sin permiso: borrados, pushes, migraciones, exposición de puertos y lectura de secretos.
      </Comprueba>

      <Guardar>
        Hooks son cinturón de seguridad, no volante. El agente decide el camino; el hook evita que cruce líneas rojas.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/crear-cli-tipo-r", label: "CLI tipo R" }}
        next={{ href: "/cursos/agentes-automatizacion/skills-seguras", label: "Skills seguras" }}
      />
    </Chapter>
  );
}
