import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Primer prototipo 3D en Godot con IA — Aulafy",
  description:
    "Construye un prototipo jugable 3D en Godot con ayuda de Fable 5: escena, personaje, cámara, colisiones, coleccionables, puerta y exportación web.",
  keywords: ["Godot 4 prototipo 3D IA", "CharacterBody3D Godot tutorial", "crear juego 3D Godot", "Fable 5 GDScript"],
  alternates: { canonical: "/cursos/videojuegos-3d-ia/prototipo-godot" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Prototipo Godot"
      title="Primer prototipo 3D en Godot con IA"
      icon="rocket"
      lead={<>Aquí el objetivo es una vertical slice mínima: moverse, mirar, recoger objetos, abrir una puerta y exportar una versión jugable. Pequeño, completo y verificable.</>}
      courseHref="/cursos/videojuegos-3d-ia"
      courseLabel="Videojuegos, 3D y simulaciones con IA"
    >
      <Objetivos>
        <ul>
          <li>Crear una escena 3D sencilla con suelo, luz, cámara y jugador.</li>
          <li>Usar Fable 5 para generar scripts explicados, no cajas negras.</li>
          <li>Preparar una checklist de prueba antes de exportar.</li>
        </ul>
      </Objetivos>

      <Cristiano term="vertical slice">
        Es una porción pequeña del juego que demuestra el flujo completo: entrada del jugador, mecánica, feedback, objetivo y final.
      </Cristiano>

      <Terminal>{`Escenas sugeridas:

scenes/
  main.tscn
  player.tscn
  collectable.tscn
  door.tscn

scripts/
  player_controller.gd
  collectable.gd
  door.gd
  game_state.gd`}</Terminal>

      <div className="prose">
        <h2>Orden de construcción</h2>
        <ol>
          <li>Escena vacía con suelo, luz y cámara.</li>
          <li>Jugador con `CharacterBody3D` y movimiento básico.</li>
          <li>Tres coleccionables con área de detección.</li>
          <li>Estado global simple: contador y objetivo.</li>
          <li>Puerta que se abre cuando el contador llega a tres.</li>
          <li>Mensaje final y exportación.</li>
        </ol>
      </div>

      <Terminal>{`Prompt para script:

Actúa como profesor de Godot 4.
Necesito un script GDScript para un jugador 3D con CharacterBody3D.
Debe incluir:
- movimiento WASD
- gravedad
- salto simple
- rotación de cámara con ratón
- comentarios breves en las partes difíciles

Restricciones:
- no uses plugins
- no inventes APIs
- explica en qué nodo va cada script
- añade checklist de errores típicos si no se mueve`}</Terminal>

      <Idea>
        Pide siempre a la IA que diga dónde va cada script y qué nodos espera. Muchos errores de Godot no son de código, sino de árbol de escena, señales o nombres.
      </Idea>

      <Cuidado>
        No pegues un script largo sin entenderlo. Primero haz que Fable 5 lo divida por responsabilidades: movimiento, interacción, estado y UI.
      </Cuidado>

      <Terminal>{`QA mínimo:
- el jugador no atraviesa el suelo
- la cámara no rota al revés
- los 3 objetos se recogen una sola vez
- la puerta no se abre antes de tiempo
- hay feedback visual o textual
- el proyecto arranca desde main.tscn
- exportación web probada en navegador`}</Terminal>

      <Comprueba>
        Rompe el juego a propósito: recoge dos objetos, vuelve atrás, salta contra la puerta, recarga escena y exporta. Un prototipo educativo debe enseñar también a detectar fallos.
      </Comprueba>

      <Guardar>
        Antes de añadir enemigos, inventario o física compleja, etiqueta esta versión como `v0.1-prototipo-jugable`.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.godotengine.org/en/stable/classes/class_characterbody3d.html" target="_blank" rel="noopener noreferrer">Godot: CharacterBody3D</a></li>
          <li><a href="https://docs.godotengine.org/" target="_blank" rel="noopener noreferrer">Godot documentation</a></li>
          <li><a href="https://docs.godotengine.org/en/latest/tutorials/export/exporting_for_web.html" target="_blank" rel="noopener noreferrer">Godot: exporting for the web</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/videojuegos-3d-ia/assets-3d-ia", label: "Assets 3D con IA" }}
        next={{ href: "/cursos/videojuegos-3d-ia/cad-validacion", label: "CAD y validación" }}
      />
    </Chapter>
  );
}
