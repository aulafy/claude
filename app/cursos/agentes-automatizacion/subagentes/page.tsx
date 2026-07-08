import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Subagentes con roles y límites — Agentes y automatización",
  description:
    "Cómo diseñar subagentes especializados con herramientas mínimas, contexto aislado y salidas verificables para automatizaciones de IA.",
  keywords: ["subagentes Claude Code", "agentes especializados IA", "agent teams", "roles agentes IA"],
  alternates: { canonical: "/cursos/agentes-automatizacion/subagentes" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Subagentes"
      title="Subagentes con roles y límites"
      icon="users"
      lead={<>Un subagente sirve para aislar trabajo: investigar, revisar, probar, documentar o auditar sin llenar el contexto principal ni mezclar responsabilidades.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Definir subagentes con misión, herramientas y salida concreta.</li>
          <li>Separar investigación, edición y revisión para reducir errores.</li>
          <li>Evitar equipos de agentes innecesarios cuando basta una tarea simple.</li>
        </ul>
      </Objetivos>

      <Cristiano term="subagente">
        Es un agente secundario con su propio contexto. El agente principal le encarga una tarea y recibe un resumen o resultado.
      </Cristiano>

      <div className="prose">
        <h2>Roles útiles</h2>
        <ul>
          <li><strong>Investigador</strong>: solo lee, busca y resume fuentes.</li>
          <li><strong>Implementador</strong>: edita con un alcance pequeño.</li>
          <li><strong>Revisor</strong>: busca bugs, riesgos y tests ausentes.</li>
          <li><strong>Documentador</strong>: convierte cambios en guía, changelog o tutorial.</li>
          <li><strong>Guardia de seguridad</strong>: revisa permisos, secretos, red y dependencias.</li>
        </ul>
      </div>

      <Terminal>{`---
name: reviewer
description: Revisa cambios antes de commit. Prioriza bugs y riesgos.
tools: Read, Grep, Bash(npm test), Bash(npm run lint), Bash(git diff *)
model: sonnet
---
Actua como revisor senior.
No edites archivos.
Devuelve hallazgos con archivo, linea, severidad y prueba sugerida.
Si no ves problemas, dilo claramente.`}</Terminal>

      <Idea>
        Un buen subagente no necesita todas las herramientas. Cuanto más específico es su rol, más fácil es evaluar si hizo bien el trabajo.
      </Idea>

      <Cuidado>
        Evita crear varios agentes para tareas que no requieren aislamiento. Más agentes también significa más coste, más coordinación y más superficie de error.
      </Cuidado>

      <Comprueba>
        Crea tres roles para un flujo de PR: investigador, implementador y revisor. Para cada uno, limita herramientas y define qué debe devolver.
      </Comprueba>

      <Guardar>
        Subagentes no son magia: son separación de responsabilidades aplicada a IA.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/mapa", label: "Mapa de agentes" }}
        next={{ href: "/cursos/agentes-automatizacion/crear-cli-tipo-r", label: "CLI tipo R" }}
      />
    </Chapter>
  );
}
