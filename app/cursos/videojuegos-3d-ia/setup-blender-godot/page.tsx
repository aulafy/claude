import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Setup Blender, Godot y Fable 5 — Videojuegos 3D con IA",
  description:
    "Configura un entorno práctico para prototipos 3D con Fable 5, Blender y Godot: carpetas, prompts, exportación GLB y verificación básica.",
  keywords: ["setup Blender Godot IA", "Fable 5 Godot", "Claude Blender MCP", "crear juego 3D con IA"],
  alternates: { canonical: "/cursos/videojuegos-3d-ia/setup-blender-godot" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Setup"
      title="Setup Blender, Godot y Fable 5"
      icon="tools"
      lead={<>El objetivo del setup no es instalar muchas cosas: es dejar un circuito corto para pasar de idea a escena, de escena a asset y de asset a prototipo verificable.</>}
      courseHref="/cursos/videojuegos-3d-ia"
      courseLabel="Videojuegos, 3D y simulaciones con IA"
    >
      <Objetivos>
        <ul>
          <li>Preparar una estructura de proyecto limpia.</li>
          <li>Conectar el trabajo de Fable 5 con Blender y Godot sin perder trazabilidad.</li>
          <li>Crear un primer asset simple y exportarlo en formato GLB.</li>
        </ul>
      </Objetivos>

      <Cristiano term="pipeline">
        Es el camino repetible desde la idea hasta el juego: prompt, asset, limpieza, exportación, importación, escena, prueba y corrección.
      </Cristiano>

      <Terminal>{`mi-prototipo-3d/
  docs/
    design.md
    prompts.md
    decisiones.md
  blender/
    source/
    exports/
  godot/
    project.godot
    scenes/
    scripts/
    assets/
      models/
      textures/
  qa/
    checklist.md
    capturas/`}</Terminal>

      <div className="prose">
        <h2>Instala lo mínimo</h2>
        <ul>
          <li><strong>Blender</strong> para modelado, limpieza, materiales y exportación.</li>
          <li><strong>Godot 4</strong> para el prototipo jugable.</li>
          <li><strong>Git</strong> para guardar versiones antes de cambios grandes.</li>
          <li><strong>Fable 5 o Claude</strong> para diseño, scripts, revisión y prompts.</li>
        </ul>
      </div>

      <Terminal>{`Primer prompt de setup:

Actúa como director técnico de un prototipo 3D educativo.
Voy a usar Blender y Godot 4.
Revisa esta estructura de carpetas y dime:
- qué falta
- qué nombres cambiarías
- qué archivos no debo versionar
- qué checklist usar antes de importar un GLB en Godot

Estructura:
[pega aquí el árbol de carpetas]`}</Terminal>

      <Idea>
        Si usas MCP o scripts para controlar Blender, empieza con operaciones de lectura o creación de assets simples. La automatización que borra, sobreescribe o publica debe llegar mucho más tarde.
      </Idea>

      <Cuidado>
        No guardes claves de API, tokens ni sesiones dentro del repositorio del juego. En proyectos 3D también se filtran secretos por scripts de herramientas, logs y archivos de configuración.
      </Cuidado>

      <div className="prose">
        <h2>Primer asset de prueba</h2>
        <p>
          Crea en Blender un cubo, una puerta y una esfera coleccionable. No busques belleza todavía:
          busca escala correcta, origen limpio, nombre claro y exportación estable.
        </p>
      </div>

      <Terminal>{`Checklist de exportación GLB:
- escala aplicada
- origen donde tenga sentido
- nombre sin espacios raros
- materiales simples
- textura enlazada o empaquetada
- malla sin geometría accidental
- exportado a blender/exports/
- importado en Godot sin warnings críticos`}</Terminal>

      <Comprueba>
        Importa el GLB en una escena vacía de Godot, añade una luz y una cámara, y verifica que el tamaño tiene sentido antes de crear gameplay encima.
      </Comprueba>

      <Guardar>
        Guarda los prompts importantes en `docs/prompts.md`. Si un asset sale bien, necesitas poder reconstruir cómo lo pediste y qué tocaste después.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.godotengine.org/" target="_blank" rel="noopener noreferrer">Godot documentation</a></li>
          <li><a href="https://docs.blender.org/api/current/bpy.ops.mesh.html" target="_blank" rel="noopener noreferrer">Blender Python API: mesh operators</a></li>
          <li><a href="https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html" target="_blank" rel="noopener noreferrer">Blender manual: glTF 2.0</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/videojuegos-3d-ia/introduccion", label: "Introducción" }}
        next={{ href: "/cursos/videojuegos-3d-ia/assets-3d-ia", label: "Assets 3D con IA" }}
      />
    </Chapter>
  );
}
