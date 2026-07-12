import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Assets 3D con IA: limpiar, exportar y reutilizar",
  description:
    "Aprende un pipeline práctico para generar, limpiar y usar assets 3D con IA, Blender, GLB/glTF, Godot, Unity y Three.js sin romper el rendimiento.",
  keywords: ["assets 3D IA", "GLB glTF Blender Godot Unity", "texturas PBR IA", "pipeline assets 3D"],
  alternates: { canonical: "/cursos/videojuegos-3d-ia/assets-3d-ia" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Assets"
      title="Assets 3D con IA: limpiar, exportar y reutilizar"
      icon="palette"
      lead={<>La IA puede crear o describir assets muy rápido. El salto de calidad está en convertir esa salida en piezas ligeras, nombradas, licenciadas y fáciles de importar.</>}
      courseHref="/cursos/videojuegos-3d-ia"
      courseLabel="Videojuegos, 3D y simulaciones con IA"
    >
      <Objetivos>
        <ul>
          <li>Diseñar prompts de assets con escala, función y restricciones.</li>
          <li>Limpiar mallas y materiales antes de exportar.</li>
          <li>Preparar assets reutilizables para Godot, Unity o web 3D.</li>
        </ul>
      </Objetivos>

      <Cristiano term="asset usable">
        Es un archivo que no solo se ve bien en una demo: tiene tamaño razonable, pivote correcto, materiales ordenados, licencia clara y funciona dentro del motor.
      </Cristiano>

      <Terminal>{`Prompt de asset:

Crea la especificación de un asset 3D para un juego educativo.
Asset: puerta de laboratorio modular.
Estilo: low-poly limpio, ciencia ficción sobria.
Uso: se abre al recoger 3 objetos.
Restricciones:
- escala humana
- una sola malla principal
- materiales PBR simples
- sin texto legible
- exportable a GLB
- debe funcionar en Godot y Unity

Devuélveme:
1. descripción visual
2. dimensiones aproximadas
3. partes de la malla
4. materiales
5. checklist de limpieza en Blender`}</Terminal>

      <div className="prose">
        <h2>Pipeline recomendado</h2>
        <ol>
          <li><strong>Especifica</strong> función, escala, estilo, cámara y restricciones.</li>
          <li><strong>Genera o modela</strong> una primera versión sencilla.</li>
          <li><strong>Limpia en Blender</strong>: nombres, origen, escala, normales, geometría y materiales.</li>
          <li><strong>Exporta GLB/glTF</strong> para Godot, Unity o Three.js.</li>
          <li><strong>Verifica en motor</strong>: tamaño, colisión, iluminación, rendimiento y warnings.</li>
        </ol>
      </div>

      <Idea>
        GLB/glTF suele ser una buena primera opción para prototipos porque conserva malla, materiales y jerarquía de forma práctica. Para pipelines de estudio pueden aparecer FBX, USD o formatos propios.
      </Idea>

      <Cuidado>
        Un asset bonito puede ser pésimo para juego: demasiados polígonos, texturas enormes, pivote roto, materiales duplicados o licencia dudosa. No lo aceptes por la miniatura.
      </Cuidado>

      <Terminal>{`Checklist de asset antes de commit:
- nombre: lab_door_01.glb
- licencia apuntada en docs/decisiones.md
- menos de 5 MB para prototipo web
- pivote correcto
- escala comprobada junto a un personaje
- colisión simple creada en motor
- textura máxima 1024 o 2048 si está justificado
- probado en una escena vacía`}</Terminal>

      <div className="prose">
        <h2>Presupuesto de rendimiento</h2>
        <p>Antes de llenar una escena, define límites. Un prototipo web educativo debe cargar rápido incluso en portátiles normales.</p>
      </div>

      <Terminal>{`asset_budget_web:
  max_glb_mb: 5
  max_texture_px: 2048
  target_fps: 60
  mobile_fallback: true
  lod_required_if:
    triangles: "> 20000"
  reject_if:
    - "texturas 4K sin motivo"
    - "materiales duplicados"
    - "escala no verificada"`}</Terminal>

      <Comprueba>
        Importa el mismo GLB en Godot y en un visor web con Three.js. Si se ve distinto, revisa materiales, luces, color management y texturas.
      </Comprueba>

      <Guardar>
        Versiona el archivo fuente de Blender y el GLB exportado. El fuente permite corregir; el exportado permite probar rápido.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html" target="_blank" rel="noopener noreferrer">Blender glTF 2.0 import/export</a></li>
          <li><a href="https://threejs.org/docs/pages/GLTFLoader.html" target="_blank" rel="noopener noreferrer">Three.js GLTFLoader</a></li>
          <li><a href="https://docs.unity3d.com/530/Documentation/Manual/HOWTO-ImportObjectBlender.html" target="_blank" rel="noopener noreferrer">Unity: importing objects from Blender</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/videojuegos-3d-ia/setup-blender-godot", label: "Setup Blender y Godot" }}
        next={{ href: "/cursos/videojuegos-3d-ia/prototipo-godot", label: "Prototipo Godot" }}
      />
    </Chapter>
  );
}
