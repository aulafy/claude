import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "IA, CAD y validación profesional",
  description:
    "Usa Fable 5 con CAD, AutoCAD, Fusion, Blender y BIM: prompts espaciales, scripts, dimensiones, tolerancias y validación.",
  keywords: ["IA CAD AutoCAD Fusion", "Fable 5 CAD", "BIM IA validación", "AutoLISP IA", "diseño 3D validación"],
  alternates: { canonical: "/cursos/videojuegos-3d-ia/cad-validacion" },
};

export default function Page() {
  return (
    <Chapter
      crumb="CAD y validación"
      title="IA, CAD y validación profesional"
      icon="building"
      lead={<>En CAD y arquitectura la IA puede acelerar bocetos, documentación y automatización, pero nunca sustituye la revisión técnica: medidas, tolerancias, normativa, fabricación y responsabilidad siguen siendo humanas.</>}
      courseHref="/cursos/videojuegos-3d-ia"
      courseLabel="Videojuegos, 3D y simulaciones con IA"
    >
      <Objetivos>
        <ul>
          <li>Usar Fable 5 para razonar sobre diseño espacial y documentación técnica.</li>
          <li>Aplicar prompts que incluyan medidas, unidades, restricciones y validación.</li>
          <li>Distinguir prototipo visual, CAD fabricable y modelo BIM coordinado.</li>
        </ul>
      </Objetivos>

      <Cristiano term="CAD con IA">
        La IA ayuda a describir, comprobar, automatizar y documentar. El archivo final debe validarse con herramientas CAD/BIM y criterio profesional.
      </Cristiano>

      <Terminal>{`Prompt para diseño CAD:

Actúa como revisor técnico CAD.
Quiero diseñar una pieza simple para impresión 3D.
Uso: soporte de pared para un sensor pequeño.
Unidades: milímetros.
Restricciones:
- ancho máximo 80 mm
- carga estimada 500 g
- dos tornillos
- esquinas redondeadas
- debe ser fácil de imprimir sin soportes excesivos

Devuélveme:
1. dimensiones iniciales
2. riesgos de fabricación
3. tolerancias a revisar
4. checklist antes de exportar STL/STEP
5. preguntas que debo resolver antes de modelar`}</Terminal>

      <div className="prose">
        <h2>Usos razonables</h2>
        <ul>
          <li><strong>AutoCAD</strong>: generar borradores de comandos, rutinas AutoLISP, limpieza de capas y documentación.</li>
          <li><strong>Fusion</strong>: explorar restricciones, fabricación, materiales y diseño generativo con revisión.</li>
          <li><strong>Blender</strong>: visualización, assets, renders, simulaciones educativas y prototipos no fabricables.</li>
          <li><strong>BIM/Revit</strong>: detectar interferencias, revisar coordinación y preparar listas de comprobación.</li>
        </ul>
      </div>

      <Idea>
        En prompts espaciales, las palabras “grande”, “ligero” o “cerca” son débiles. Usa unidades, cotas, referencias, materiales, tolerancias y restricciones.
      </Idea>

      <Cuidado>
        No uses una respuesta de IA como plano de obra, cálculo estructural, instalación eléctrica, pieza médica o decisión de seguridad. Sirve como apoyo, no como firma técnica.
      </Cuidado>

      <Terminal>{`Checklist de validación:
- unidades correctas
- escala comprobada
- cotas críticas identificadas
- tolerancias documentadas
- materiales definidos
- interferencias revisadas
- licencia de assets o plantillas clara
- export STEP/STL/GLB probado
- revisión humana registrada`}</Terminal>

      <Comprueba>
        Si una pieza va a imprimirse, fabricarse o construirse, crea una tabla de cotas críticas y verifica cada una fuera del chat.
      </Comprueba>

      <Guardar>
        Guarda la conversación como ayuda de diseño, no como fuente de verdad. La fuente de verdad es el archivo CAD/BIM validado y su checklist de revisión.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://help.autodesk.com/cloudhelp/2026/PTB/AutoCAD-LT-AutoLISP/files/GUID-E1BD97BB-FAE6-40DF-B7B3-CE4BBD0241C4.htm" target="_blank" rel="noopener noreferrer">Autodesk: AutoLISP documentation</a></li>
          <li><a href="https://www.autodesk.com/solutions/generative-design/manufacturing" target="_blank" rel="noopener noreferrer">Autodesk Fusion: generative design for manufacturing</a></li>
          <li><a href="https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/How-to-run-an-interference-check-between-elements-in-Revit.html" target="_blank" rel="noopener noreferrer">Autodesk Revit: interference check</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/videojuegos-3d-ia/prototipo-godot", label: "Prototipo Godot" }}
      />
    </Chapter>
  );
}
