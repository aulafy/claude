import KnowledgeCheck, { type KnowledgeCheckQuestion } from "@/components/KnowledgeCheck";

const questions: KnowledgeCheckQuestion[] = [
  {
    prompt: "Vas a resumir una reunión que contiene datos de clientes. ¿Qué haces antes de usar una herramienta de IA?",
    options: [
      "Pego la transcripción completa en el primer chat disponible para ahorrar tiempo.",
      "Reduzco o sustituyo los datos sensibles, compruebo si tengo autorización y decido quién revisará el resultado.",
      "La envío a varias herramientas para comparar cuál responde mejor.",
    ],
    correct: 1,
    explanation: "Primero defines qué datos pueden salir, qué herramienta está autorizada y quién conserva la decisión final. La rapidez no justifica exponer información ajena.",
  },
  {
    prompt: "Una respuesta incluye una cifra normativa importante. ¿Qué la convierte en algo utilizable?",
    options: [
      "Que esté explicada con seguridad y detalle.",
      "Que indique una fuente actual que puedas abrir y contrastar antes de tomar la decisión.",
      "Que otro modelo dé una cifra parecida.",
    ],
    correct: 1,
    explanation: "Para información que cambia o tiene consecuencias, el modelo puede ayudar a buscar o resumir; la aceptación exige una fuente pertinente y una comprobación humana.",
  },
  {
    prompt: "Necesitas mejorar un texto distinto cada semana y quieres revisar cada resultado antes de usarlo. ¿Qué forma de ayuda es más sensata para empezar?",
    options: [
      "Un chat con un encargo claro y una revisión humana antes de reutilizar el texto.",
      "Un agente con permiso para enviar el texto automáticamente a otras personas.",
      "Una automatización que publique cada borrador sin pedir confirmación.",
    ],
    correct: 0,
    explanation: "Empieza por la forma más simple que conserva control. Puedes automatizar pasos cuando la tarea sea estable, los límites estén claros y la evidencia demuestre que funciona.",
  },
  {
    prompt: "La IA te entrega un resultado que parece bueno. ¿Cuándo das la tarea por cerrada?",
    options: [
      "Cuando el texto suena convincente y no contiene errores evidentes.",
      "Cuando guardas el resultado, compruebas lo importante y anotas la fuente, límite o siguiente revisión necesaria.",
      "Cuando otra persona te dice que también usaría la misma herramienta.",
    ],
    correct: 1,
    explanation: "Cerrar bien una tarea deja una evidencia revisable: qué se consiguió, qué comprobaste y qué sigue siendo incierto. Eso permite repetirla y mejorarla con seguridad.",
  },
];

export default function IaBasicsStartingCheck() {
  return (
    <KnowledgeCheck
      eyebrow="Comprobación inicial · 3 minutos"
      title="Comprueba tu criterio antes de elegir una herramienta"
      description="Responde cuatro decisiones cotidianas. Obtendrás feedback inmediato; no se guarda nada y no tienes que acertar para empezar."
      questions={questions}
      successTitle="Ya partes de un criterio sólido"
      successDescription="Tienes una buena base para usar la IA sin delegar decisiones importantes. Recorre las lecciones para convertir ese criterio en un método repetible."
      developingTitle="Esta ruta empieza exactamente donde lo necesitas"
      developingDescription="No pasa nada por dudar: el curso te enseña a definir una tarea, elegir una forma de ayuda y comprobar el resultado antes de confiar en él."
      primaryHref="/cursos/ia-desde-cero/que-puede-hacer-ia-generativa"
      primaryLabel="Empezar por la primera lección"
    />
  );
}
