import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Comparativa",
  description:
    "Comparativa equilibrada entre Claude Code, Cursor, Windsurf, GitHub Copilot y ChatGPT web.",
  alternates: { canonical: "/cursos/claude-code/comparativa" },
};

const tools = [
  {
    name: "Claude Code",
    type: "CLI",
    access: "Lee, edita y ejecuta comandos dentro de tu proyecto con permisos explícitos.",
    ideal: "Cambios de varios archivos, refactors, investigación del código y automatización desde terminal.",
  },
  {
    name: "Cursor",
    type: "Editor",
    access: "Trabaja dentro del editor, con contexto del workspace y asistencia integrada al flujo de edición.",
    ideal: "Programar con IA sin salir del IDE, autocompletado, chat sobre el código y cambios guiados.",
  },
  {
    name: "Windsurf",
    type: "Editor",
    access: "Accede al proyecto desde el editor y coordina ediciones con agentes y contexto del workspace.",
    ideal: "Flujos visuales dentro del IDE, navegación asistida y desarrollo iterativo con ayuda contextual.",
  },
  {
    name: "GitHub Copilot",
    type: "Editor",
    access: "Se integra en editores y repositorios de GitHub, con contexto del archivo y del proyecto según configuración.",
    ideal: "Autocompletado rápido, ayuda puntual, generación de funciones y asistencia continua mientras escribes.",
  },
  {
    name: "ChatGPT (web)",
    type: "Chat",
    access: "No actúa directamente sobre tu proyecto salvo que subas archivos o copies contexto manualmente.",
    ideal: "Explicaciones, diseño de soluciones, aprendizaje, revisión de ideas y consultas sin tocar el repositorio.",
  },
];

export default function Comparativa() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Comparativa</span>
      </div>

      <div className="mb-10">
        <PageTitle icon="compare">Comparativa</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          En qué se diferencia Claude Code de otras herramientas de IA para programar,
          para ayudarte a elegir.
        </p>
      </div>

      <div className="overflow-x-auto mb-8">
        <table>
          <thead>
            <tr>
              <th>Herramienta</th>
              <th>Tipo</th>
              <th>Acceso a tu proyecto</th>
              <th>Ideal para</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr key={tool.name}>
                <td><strong>{tool.name}</strong></td>
                <td>{tool.type}</td>
                <td>{tool.access}</td>
                <td>{tool.ideal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>¿Cuándo elegir Claude Code?</h2>
        <p>
          Claude Code encaja especialmente bien cuando quieres que la IA trabaje sobre
          el repositorio real: leer varios archivos, proponer un plan, editar código,
          ejecutar tests, revisar errores y dejar cambios listos para inspeccionar.
          Es fuerte en tareas largas donde importa entender el proyecto completo, no
          solo completar la línea actual.
        </p>

        <h2>Claude Code + tu editor (no es o lo uno o lo otro)</h2>
        <p>
          No tienes que elegir una sola herramienta. Claude Code funciona desde la
          terminal y también se integra con VS Code y JetBrains, así que puede convivir
          con Cursor, Windsurf o Copilot. Puedes usar el editor para escribir y navegar,
          y Claude Code para encargos más amplios como refactors, migraciones, pruebas
          o análisis de bugs.
        </p>
      </div>

      <div className="callout callout-tip">
        <strong>Recomendación práctica:</strong> usa Claude Code para tareas con varios
        pasos y validación en el proyecto; usa un editor con IA para el trabajo fino y
        continuo mientras programas.
      </div>

      <div className="prose">
        <h2>Resumen</h2>
        <p>
          Claude Code destaca como agente de terminal orientado a operar sobre tu
          código. Cursor, Windsurf y Copilot brillan dentro del editor. ChatGPT web es
          muy útil para pensar, aprender y explicar. La mejor elección depende de si
          necesitas conversación, autocompletado, edición asistida o ejecución real en
          el proyecto.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
        <Link href="/cursos/claude-code/recursos" className="text-sm text-zinc-500 hover:text-zinc-300">← Recursos</Link>
        <Link href="/" className="text-sm text-orange-400 hover:text-orange-300">Volver al inicio →</Link>
      </div>
    </div>
  );
}
