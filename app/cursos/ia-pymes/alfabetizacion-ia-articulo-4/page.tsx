import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav } from "@/components/Book";

export const metadata: Metadata = {
  title: "Alfabetización en IA para pymes: inventario y política interna | Aulafy",
  description: "Crea un inventario de usos de IA y una política interna práctica para una pyme, con riesgos, responsables y evidencias.",
  keywords: ["alfabetización IA pymes", "AI Act artículo 4", "política interna IA", "IA responsable empresa"],
  alternates: { canonical: "/cursos/ia-pymes/alfabetizacion-ia-articulo-4" },
};

export default function Page() {
  return <Chapter crumb="IA para pymes y autónomos" title="Alfabetización en IA para pymes: inventario y política interna" icon="briefcase" lead={<>Una pyme no necesita un curso genérico de hype: necesita saber qué usos de IA tiene, quién los supervisa, qué datos salen y qué debe documentar.</>} courseHref="/cursos/ia-pymes" courseLabel="IA para pymes y autónomos">
    <Objetivos><ul><li>Inventariar usos reales de IA por tarea y rol.</li><li>Asignar una persona responsable y una revisión mínima.</li><li>Redactar una política interna de una página sin prometer cumplimiento automático.</li></ul></Objetivos>
    <div className="prose"><h2>Qué significa alfabetización en IA</h2><p>El artículo 4 del Reglamento europeo de IA exige que proveedores y responsables del despliegue adopten medidas para que las personas que operan sistemas de IA tengan un nivel suficiente de alfabetización, teniendo en cuenta sus conocimientos, experiencia, formación, contexto y colectivos afectados. La Comisión Europea aclara que no hay un curso único ni un certificado universal: la formación debe ser proporcional al uso y al riesgo.</p><p>Esta lección es educativa, no asesoramiento jurídico. Comprueba la aplicación de la norma con tu responsable de protección de datos o asesoría local.</p><h2>Inventario de diez minutos</h2><p>Para cada uso, registra: tarea, herramienta/modelo, datos introducidos, salida, persona que revisa, efecto de la salida, riesgo y fecha de revisión. Incluye usos cotidianos como redactar, traducir, resumir o clasificar; no limites el inventario a proyectos llamados «IA».</p><h2>Política mínima</h2><p>Una política útil dice qué usos están permitidos, qué datos nunca se introducen, cuándo hay que citar o etiquetar el uso de IA, quién aprueba una automatización y cómo se registra un error. Debe poder leerla una persona no técnica en menos de cinco minutos.</p><h2>Fuentes oficiales</h2><ul><li><a href="https://digital-strategy.ec.europa.eu/es/faqs/ai-literacy-questions-answers" rel="noreferrer">Preguntas y respuestas de la Comisión Europea sobre alfabetización en IA</a>.</li><li><a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=es" rel="noreferrer">Texto oficial del Reglamento (UE) 2024/1689</a>, artículo 4.</li><li><a href="https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/aepd-publica-decalogo-recomendaciones-proteger-privacidad-al-usar-ia" rel="noreferrer">Decálogo de privacidad de la AEPD</a>.</li></ul></div>
    <Idea><strong>Acción de la misión:</strong> crea una tabla con cinco usos reales de tu organización y redacta una política interna de una página a partir de esos riesgos.</Idea>
    <Cuidado>No presentes esta plantilla como certificado de cumplimiento. La norma, las autoridades competentes y las obligaciones sectoriales pueden variar; revisa la versión vigente y el contexto de tu empresa.</Cuidado>
    <Comprueba>Guarda el inventario, la política, el nombre del responsable, la fecha de revisión y una lista de tres datos que nunca deben copiarse en una herramienta sin autorización.</Comprueba>
    <Guardar>La evidencia terminada son dos archivos: `inventario-usos-ia.csv` y `politica-ia.md`, ambos con fecha y responsable.</Guardar>
    <ChapterNav next={{ href: "/cursos/ia-pymes/diagnostico-piloto", label: "Diagnóstico y primer piloto de IA para una pyme" }} />
  </Chapter>;
}
