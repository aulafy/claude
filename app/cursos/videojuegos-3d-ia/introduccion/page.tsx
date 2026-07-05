import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Fable 5 para videojuegos, 3D y simulaciones",
  description:
    "Aprende a usar Fable 5 con criterio para idear videojuegos, prototipos 3D, escenas interactivas y pipelines con Blender, Godot, Unity o CAD.",
  keywords: ["Fable 5 videojuegos", "Claude Fable 5 Blender", "IA para videojuegos 3D", "Godot IA", "Blender MCP"],
  alternates: { canonical: "/cursos/videojuegos-3d-ia/introduccion" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Introducción"
      title="Fable 5 para videojuegos, 3D y simulaciones"
      icon="cube"
      lead={<>Fable 5 puede acelerar diseño, código, assets y documentación, pero el resultado profesional nace de un flujo verificable: idea pequeña, escena reproducible, assets limpios, pruebas y límites claros.</>}
      courseHref="/cursos/videojuegos-3d-ia"
      courseLabel="Videojuegos, 3D y simulaciones con IA"
    >
      <Objetivos>
        <ul>
          <li>Entender dónde aporta Fable 5 en un proyecto 3D real.</li>
          <li>Separar creatividad, producción técnica y validación.</li>
          <li>Definir un primer prototipo jugable que puedas terminar.</li>
        </ul>
      </Objetivos>

      <Cristiano term="Fable 5 en 3D">
        No es un botón de “hazme un juego”. Es un copiloto capaz de ayudarte a razonar sobre escenas, scripts, materiales, formatos, errores y planes de producción.
      </Cristiano>

      <div className="prose">
        <h2>Qué tareas sí delegar</h2>
        <ul>
          <li><strong>Preproducción</strong>: idea, género, loop principal, referencias, restricciones y documento de diseño.</li>
          <li><strong>Diseño técnico</strong>: estructura de carpetas, nombres, convenciones, scripts, escenas y checklist de importación.</li>
          <li><strong>Programación</strong>: controladores, cámaras, triggers, UI, prototipos de enemigos y herramientas pequeñas.</li>
          <li><strong>Revisión</strong>: detectar piezas sin escala, assets demasiado pesados, lógica frágil o pasos no reproducibles.</li>
        </ul>

        <h2>Qué no delegar a ciegas</h2>
        <p>
          Un modelo puede proponer código y flujos, pero no puede garantizar por sí solo que una colisión sea correcta,
          que una licencia permita uso comercial, que una pieza CAD sea fabricable o que una escena sea cómoda para una
          persona que juega. La IA propone; tú verificas.
        </p>
      </div>

      <Terminal>{`Encargo inicial para Fable 5:

Quiero crear un prototipo 3D pequeño en Godot 4.
Perfil: principiante con nociones básicas.
Objetivo: una escena jugable en primera persona con 3 habitaciones, 3 objetos coleccionables y una puerta que se abre al completar el objetivo.
Herramientas: Blender para assets simples, Godot para el juego.
Restricciones:
- nada de sistemas online
- assets ligeros en GLB/glTF
- controles simples
- proyecto terminado en 6 horas

Devuélveme:
1. documento de diseño de una página
2. lista de escenas y scripts
3. carpeta recomendada
4. riesgos técnicos
5. checklist de verificación`}</Terminal>

      <Idea>
        Empieza con un juego de una sola mecánica. Si el loop principal no funciona en una habitación, tampoco funcionará en un mundo abierto.
      </Idea>

      <Cuidado>
        Las conversaciones en X sobre modelos frontier suelen mezclar pruebas reales, expectativas y marketing. Para decisiones de coste, acceso y límites, contrasta siempre con documentación oficial.
      </Cuidado>

      <Comprueba>
        Antes de abrir Blender o Godot, escribe el loop jugable en una frase: “el jugador hace X para conseguir Y mientras evita Z”. Si no cabe, reduce alcance.
      </Comprueba>

      <Guardar>
        Tu primer entregable no es un juego completo: es un repositorio con diseño, assets, escena, scripts y una forma clara de ejecutar el prototipo.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://www.anthropic.com/news/claude-fable-5-mythos-5" target="_blank" rel="noopener noreferrer">Anthropic: Claude Fable 5</a></li>
          <li><a href="https://docs.anthropic.com/en/docs/about-claude/models/overview" target="_blank" rel="noopener noreferrer">Claude models overview</a></li>
          <li><a href="https://docs.anthropic.com/en/docs/about-claude/pricing" target="_blank" rel="noopener noreferrer">Claude pricing</a></li>
        </ul>
      </div>

      <ChapterNav
        next={{ href: "/cursos/videojuegos-3d-ia/setup-blender-godot", label: "Setup Blender y Godot" }}
      />
    </Chapter>
  );
}
