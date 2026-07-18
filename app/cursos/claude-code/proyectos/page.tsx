import type { Metadata } from "next";
import Link from "next/link";
import {
  Chapter,
  ChapterNav,
  Comprueba,
  Cuidado,
  Idea,
  Objetivos,
} from "@/components/Book";

export const metadata: Metadata = {
  title: "Proyectos guiados con Claude Code",
  description:
    "Cómo elegir, delimitar y terminar un proyecto pequeño con Claude Code sin perder el control del repositorio ni de las decisiones.",
  alternates: { canonical: "/cursos/claude-code/proyectos" },
};

const projectBrief = `Objetivo: una página que explique mi servicio y permita pedir información.
Persona que la usará: una persona interesada que llega desde móvil.
Primera versión: portada, servicios, preguntas frecuentes y formulario simulado.
No incluir todavía: pagos, cuentas, datos reales ni integraciones externas.
Cómo sabré que funciona: la abro en el navegador, pruebo los enlaces y la lee otra persona.`;

export default function ProyectosGuiadosClaudeCode() {
  return (
    <Chapter
      crumb="Proyectos guiados"
      courseHref="/cursos/claude-code"
      courseLabel="Claude Code, de 0 a pro"
      icon="hammer"
      title="Convierte una idea en un proyecto pequeño y comprobable"
      lead={<>Claude Code puede escribir archivos muy deprisa. Tu trabajo es elegir un resultado acotado, conservar el control y comprobar que lo construido responde a una necesidad real.</>}
    >
      <Objetivos>
        <ul>
          <li>Elegir un primer proyecto que puedas terminar y revisar.</li>
          <li>Escribir un encargo con resultado, límites y prueba de aceptación.</li>
          <li>Trabajar por iteraciones sin convertir una conversación en una caja negra.</li>
          <li>Guardar una evidencia que te permita continuar o volver atrás.</li>
        </ul>
      </Objetivos>

      <h2>Empieza por una salida, no por una tecnología</h2>
      <p>
        Un buen primer proyecto no es “hacer una aplicación con IA”. Es algo que una persona pueda abrir, usar y comprobar: una página de servicio, una lista de tareas local, un script que ordena archivos de ejemplo o una pequeña herramienta que transforma texto ficticio.
      </p>
      <p>
        Si necesitas elegir entre distintos resultados —incluidos web, automatización, RAG o agentes— consulta la <Link href="/proyectos">biblioteca de proyectos guiados</Link>. Esta lección se centra en el método para construir cualquiera de ellos con Claude Code.
      </p>

      <Idea>
        La primera versión no tiene que demostrar todo lo que imaginas. Tiene que demostrar una sola cosa útil de forma que puedas explicarla y verificarla.
      </Idea>

      <h2>Antes de abrir Claude Code: escribe un briefing de seis líneas</h2>
      <p>
        No necesitas saber programar para preparar bien el trabajo. Crea una carpeta de práctica y guarda dentro un archivo <code>BRIEF.md</code> con estas respuestas. Evita nombres, documentos, claves o datos de clientes: usa siempre ejemplos públicos, ficticios o autorizados.
      </p>
      <pre><code>{projectBrief}</code></pre>
      <p>
        Este documento hace dos cosas: evita que el alcance cambie cada cinco minutos y te permite comprobar si el resultado responde al encargo inicial. Si no puedes escribirlo todavía, el proyecto es demasiado grande o aún no está claro.
      </p>

      <h2>Una iteración segura: mirar, planificar, construir, comprobar</h2>
      <ol>
        <li><strong>Mira.</strong> Pide a Claude Code que lea el <code>BRIEF.md</code> y describa qué archivos necesitaría crear. No le pidas código todavía.</li>
        <li><strong>Planifica.</strong> Pide un plan de tres a cinco pasos, con una pregunta cuando tenga que elegir algo que te corresponda decidir a ti.</li>
        <li><strong>Construye una parte.</strong> Autoriza el primer paso pequeño: por ejemplo, una página estática sin formularios ni servicios externos.</li>
        <li><strong>Comprueba.</strong> Abre el resultado, sigue el flujo como si fueras la persona usuaria y anota lo que no entiendas o no funcione.</li>
        <li><strong>Guarda.</strong> Haz un commit o al menos escribe en el README qué funciona, qué falta y qué probarás después.</li>
      </ol>

      <h2>Un encargo que deja espacio para pensar</h2>
      <p>Después de escribir el briefing, puedes usar un encargo de este estilo:</p>
      <pre><code>{`Lee BRIEF.md. No modifiques archivos aún.
1. Resume el resultado que debemos conseguir.
2. Propón el árbol mínimo de archivos y un plan de 4 pasos.
3. Señala riesgos de privacidad, seguridad o alcance.
4. Espera mi confirmación antes de crear nada.`}</code></pre>
      <p>
        Cuando apruebes el plan, cambia una única cosa cada vez. Es más lento que pedir “hazme toda la app”, pero permite detectar decisiones erróneas cuando todavía son baratas de corregir.
      </p>

      <Cuidado>
        No conectes una base de datos real, una clave de API, pagos, correo ni acciones sobre cuentas de terceros solo para que la demo parezca completa. Primero demuestra el flujo con datos seguros y una vista previa.
      </Cuidado>

      <h2>La evidencia mínima al terminar una sesión</h2>
      <p>Antes de cerrar, deja estas cuatro huellas. Son más valiosas que una captura bonita sin contexto:</p>
      <ul>
        <li>una frase sobre el resultado que ya funciona;</li>
        <li>una prueba hecha por ti —por ejemplo, el enlace que abriste o el caso que ejecutaste—;</li>
        <li>la lista de límites que siguen pendientes;</li>
        <li>el siguiente cambio pequeño que harás, o el punto al que volverías atrás.</li>
      </ul>

      <Comprueba>
        Pídele a otra persona que pruebe la versión sin explicársela. Si no puede completar la tarea o no entiende qué hace, no añadas funciones: aclara primero la salida y la interfaz.
      </Comprueba>

      <h2>Tu práctica</h2>
      <p>
        Elige una tarea de menos de una tarde. Escribe tu <code>BRIEF.md</code>, pide el plan sin cambios y construye únicamente el primer paso. Al terminar, documenta una prueba y un límite. Esa es ya una forma profesional de trabajar: resultado, evidencia y control.
      </p>

      <ChapterNav
        prev={{ href: "/cursos/claude-code/recetas", label: "Recetas prácticas" }}
        next={{ href: "/cursos/claude-code/prompts", label: "Escribir buenos prompts" }}
      />
    </Chapter>
  );
}
