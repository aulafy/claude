import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "NPC con LLM local y memoria en Godot — Videojuegos 3D con IA",
  description:
    "Diseña un NPC de Godot conectado a un LLM local con memoria simple, lore del mundo, límites de seguridad y fallback cuando el modelo no responde.",
  keywords: ["NPC LLM local Godot", "IA local videojuegos", "Godot Ollama NPC", "diálogos dinámicos IA", "Fable 5 Godot"],
  alternates: { canonical: "/cursos/videojuegos-3d-ia/npc-llm-local-godot" },
};

export default function Page() {
  return (
    <Chapter
      crumb="NPC local"
      title="NPC con LLM local y memoria en Godot"
      icon="robot"
      lead={<>Un NPC con IA no necesita ser infinito. Necesita personaje, lore, memoria pequeña, límites claros y una salida segura cuando el modelo tarda o inventa demasiado.</>}
      courseHref="/cursos/videojuegos-3d-ia"
      courseLabel="Videojuegos, 3D y simulaciones con IA"
    >
      <Objetivos>
        <ul>
          <li>Diseñar un NPC que responde con lore y estado de misión.</li>
          <li>Conectar Godot a un servidor local compatible con HTTP.</li>
          <li>Evitar diálogos lentos, contradictorios o fuera de tono.</li>
        </ul>
      </Objetivos>

      <Cristiano term="memoria de NPC">
        No es guardar todo el chat. Es conservar hechos útiles: nombre del jugador, misión activa, promesas hechas y relación con el personaje.
      </Cristiano>

      <Terminal>{`npc_memory:
  npc_id: "herrera_lina"
  player_name: "Ada"
  facts:
    - "Ada encontró la llave del molino"
    - "Lina no confía en el alcalde"
  quest_state: "buscar_mapa"
  tone: "directa, rural, algo seca"
  forbidden:
    - "revelar final"
    - "inventar ubicaciones fuera del mapa"`}</Terminal>

      <Idea>
        Para juegos pequeños, un prompt bien limitado y 10 hechos persistentes suelen funcionar mejor que una memoria vectorial compleja.
      </Idea>

      <Cuidado>
        Nunca bloquees el hilo principal esperando al modelo. Si tarda, muestra una respuesta fallback o una animación breve y recupera después.
      </Cuidado>

      <Terminal>{`Prompt de sistema para el NPC:
Eres Lina, herrera de Puerto Bruma.
Responde en máximo 2 frases.
Solo conoces lugares del mapa: molino, puerto, mina y plaza.
Si el jugador pregunta algo fuera del lore, redirige a la misión activa.
No reveles soluciones completas; da una pista verificable.`}</Terminal>

      <Comprueba>
        Haz 20 preguntas raras: fuera del mapa, repetidas, intentando saltarse la misión y pidiendo secretos. El NPC debe mantener tono, límites y estado.
      </Comprueba>

      <Guardar>
        Guarda el contrato del NPC como archivo de diseño: personalidad, lore permitido, estado, fallbacks y pruebas. Así podrás regenerar código sin perder coherencia.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/videojuegos-3d-ia/assets-3d-ia", label: "Assets 3D" }}
        next={{ href: "/cursos/videojuegos-3d-ia/prototipo-godot", label: "Prototipo Godot" }}
      />
    </Chapter>
  );
}
