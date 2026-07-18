import KnowledgeCheck, { type KnowledgeCheckQuestion } from "@/components/KnowledgeCheck";

const questions: KnowledgeCheckQuestion[] = [
  {
    prompt: "Recibes una petición vaga: «ordena estos archivos». ¿Qué harías primero?",
    options: [
      "Pedir que la IA empiece y corregir después.",
      "Acordar resultado, límites, carpeta de prueba y forma de comprobarlo.",
      "Mover todo a la nube para que la IA tenga más contexto.",
    ],
    correct: 1,
    explanation: "Una tarea verificable define el resultado, protege los originales y permite revisar antes de aplicar cambios.",
  },
  {
    prompt: "Codex propone borrar varios archivos. ¿Cuál es la respuesta más segura?",
    options: [
      "Autorizar porque el modelo ya analizó el proyecto.",
      "Cancelar siempre cualquier borrado.",
      "Pedir una vista previa, comprobar copias y autorizar solo lo necesario.",
    ],
    correct: 2,
    explanation: "La seguridad no consiste en bloquearlo todo: consiste en entender el alcance, poder recuperar y conceder el mínimo permiso.",
  },
  {
    prompt: "Necesitas un dato que puede haber cambiado esta semana. ¿Qué evidencia pedirías?",
    options: [
      "Una respuesta convincente basada en el conocimiento del modelo.",
      "Una búsqueda actual y enlaces a fuentes primarias que puedas abrir.",
      "Tres respuestas de modelos distintos sin consultar fuentes.",
    ],
    correct: 1,
    explanation: "Cuando la información cambia, hay que consultar fuentes actuales y verificar que respaldan exactamente la afirmación.",
  },
  {
    prompt: "El agente dice que ha terminado una web. ¿Qué cierra bien la tarea?",
    options: [
      "Comprobar el resultado, revisar cambios y ejecutar las verificaciones adecuadas.",
      "Aceptar si no aparece ningún error en el chat.",
      "Publicar primero y revisar solo si un usuario avisa.",
    ],
    correct: 0,
    explanation: "Terminar significa aportar evidencia: resultado visible, cambios revisados y pruebas proporcionales al riesgo.",
  },
];

export default function CodexStartingCheck() {
  return (
    <KnowledgeCheck
      eyebrow="Comprobación inicial · 3 minutos"
      title="Comprueba cómo decides, no cuánto vocabulario recuerdas"
      description="Responde cuatro situaciones reales. Recibirás una explicación inmediata y una recomendación; no bloquea el curso ni guarda datos."
      questions={questions}
      successTitle="Ya aplicas un criterio inicial sólido"
      successDescription="Revisa el primer módulo para conocer las superficies de Codex y salta después a la primera práctica segura."
      developingTitle="El curso empieza exactamente donde lo necesitas"
      developingDescription="Empieza por la primera lección y repite esta comprobación cuando termines el módulo «Tu primer resultado seguro»."
      primaryHref="/cursos/codex-desde-cero/que-es-codex"
      primaryLabel="Empezar por la primera lección"
      advancedHref="/cursos/codex-desde-cero/primera-carpeta"
      advancedLabel="Ir a la primera práctica"
    />
  );
}
