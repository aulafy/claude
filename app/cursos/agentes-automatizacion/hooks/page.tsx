import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Hooks: automatización determinista — Agentes y automatización",
  description:
    "Usa hooks de Claude Code para ejecutar reglas, checks y logs en puntos concretos del ciclo de vida sin depender de que el modelo se acuerde.",
  alternates: { canonical: "/cursos/agentes-automatizacion/hooks" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Hooks: automatización determinista"
      title="Hooks: automatización determinista"
      icon="hook"
      lead={<>Un hook es una regla automática. No razona, no improvisa y no se olvida. Por eso es perfecto para todo lo que debe pasar siempre: formatear, bloquear secretos, registrar acciones o pedir confirmación ante comandos delicados.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Entender la diferencia entre un agente y una regla determinista.</li>
          <li>Diseñar hooks para calidad, seguridad y trazabilidad.</li>
          <li>Evitar hooks frágiles que bloquean el trabajo.</li>
        </ul>
      </Objetivos>

      <Cristiano term="hook">
        Es un “cuando pase X, ejecuta Y”. Por ejemplo: antes de permitir un comando, comprueba si intenta leer <code>.env</code>; después de editar código, ejecuta el formateador; al terminar una tarea, guarda un resumen.
      </Cristiano>

      <div className="prose">
        <h2>Tres hooks que sí cambian tu vida</h2>
        <ol>
          <li><strong>Bloqueo de secretos</strong>: impide leer o imprimir archivos sensibles.</li>
          <li><strong>Calidad automática</strong>: ejecuta lint, formatter o tests cortos tras cambios.</li>
          <li><strong>Registro de decisiones</strong>: añade un resumen a un log de trabajo.</li>
        </ol>
      </div>

      <Terminal>{`# Ejemplo conceptual: antes de ejecutar comandos, bloquea secretos
if echo "$COMMAND" | grep -E '\\.env|id_rsa|secret|token'; then
  echo "Bloqueado: posible secreto"
  exit 2
fi`}</Terminal>

      <Idea>
        Si algo es política de equipo, no lo dejes como sugerencia en un prompt. Ponlo en un hook o en CI. Los prompts educan; los hooks hacen cumplir.
      </Idea>

      <div className="prose">
        <h2>Buen hook, mal hook</h2>
        <p><strong>Buen hook:</strong> rápido, predecible, con mensaje claro y salida fácil. <strong>Mal hook:</strong> lento, opaco, toca archivos sin avisar o falla por detalles irrelevantes.</p>

        <h2>Orden recomendado</h2>
        <ul>
          <li>Primero registra lo que pasa.</li>
          <li>Después avisa.</li>
          <li>Solo cuando estés seguro, bloquea.</li>
        </ul>
      </div>

      <Cuidado>
        Un hook que bloquea demasiado enseña al equipo a saltárselo. Empieza con warnings y sube el nivel cuando veas falsos positivos bajos.
      </Cuidado>

      <Comprueba>
        Crea un hook de solo aviso que detecte <code>.env</code> en comandos. Intenta leer un archivo falso llamado <code>.env.example</code> y ajusta la regla para no bloquear documentación legítima.
      </Comprueba>

      <Guardar>
        Automatiza lo aburrido y lo peligroso. Lo que requiere juicio humano o contexto amplio, déjalo al agente o al PR.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/subagentes", label: "Subagentes" }}
        next={{ href: "/cursos/agentes-automatizacion/skills-seguras", label: "Skills seguras" }}
      />
    </Chapter>
  );
}
