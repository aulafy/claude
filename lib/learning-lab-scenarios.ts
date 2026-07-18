export type LabStation = "brief" | "prompt" | "review";

export type LabChoice = {
  text: string;
  correct: boolean;
  feedback: string;
};

export type PromptDecision = {
  id: string;
  label: string;
  question: string;
  choices: LabChoice[];
};

export type LearningLabScenario = {
  id: "pyme" | "estudiante";
  shortLabel: string;
  place: string;
  title: string;
  mission: string;
  context: string[];
  objectiveQuestion: string;
  objectiveChoices: LabChoice[];
  promptDecisions: PromptDecision[];
  assembledPrompt: string;
  simulatedOutput: Array<{
    text: string;
    unsupported: boolean;
    explanation: string;
  }>;
  notebook: string[];
};

export const learningLabScenarios: LearningLabScenario[] = [
  {
    id: "pyme",
    shortLabel: "Oficina",
    place: "Una pequeña empresa de servicios",
    title: "Responder a un cliente sin inventar datos",
    mission: "Prepara un borrador útil con IA y evita que una promesa no confirmada llegue al cliente.",
    context: [
      "El cliente solicita 12 licencias y pregunta si puede empezar el lunes.",
      "No se ha facilitado el precio por licencia.",
      "Operaciones todavía no ha confirmado la fecha de inicio.",
    ],
    objectiveQuestion: "¿Cuál es el resultado profesional correcto?",
    objectiveChoices: [
      {
        text: "Enviar cuanto antes una oferta completa con precio y fecha aproximados.",
        correct: false,
        feedback: "Ser rápido no justifica inventar precio ni disponibilidad.",
      },
      {
        text: "Crear un borrador que responda lo conocido y marque lo que debe confirmar una persona.",
        correct: true,
        feedback: "Exacto: la IA prepara; una persona valida los compromisos comerciales.",
      },
      {
        text: "Pedir a la IA que decida si el cliente parece fiable.",
        correct: false,
        feedback: "Ese juicio no es necesario para responder y puede introducir sesgos.",
      },
    ],
    promptDecisions: [
      {
        id: "task",
        label: "Tarea",
        question: "¿Cómo defines el encargo?",
        choices: [
          {
            text: "Escribe un email comercial convincente.",
            correct: false,
            feedback: "Es demasiado abierto: no define destinatario, propósito ni límites.",
          },
          {
            text: "Redacta un borrador de respuesta al cliente para revisión humana.",
            correct: true,
            feedback: "Bien: delimita el resultado y deja claro que todavía es un borrador.",
          },
        ],
      },
      {
        id: "facts",
        label: "Datos",
        question: "¿Qué contexto entregas al modelo?",
        choices: [
          {
            text: "Cliente interesado en 12 licencias. Precio y fecha de inicio sin confirmar.",
            correct: true,
            feedback: "Bien: separas hechos disponibles de datos ausentes.",
          },
          {
            text: "Es un cliente importante; ofrécele nuestras mejores condiciones.",
            correct: false,
            feedback: "No aporta los hechos necesarios y sugiere condiciones que desconocemos.",
          },
        ],
      },
      {
        id: "limits",
        label: "Límites",
        question: "¿Qué regla reduce el riesgo?",
        choices: [
          {
            text: "Si falta un dato, indícalo como [PENDIENTE]; no lo inventes.",
            correct: true,
            feedback: "Correcto: la abstención queda convertida en una instrucción observable.",
          },
          {
            text: "Completa los huecos con valores habituales del sector.",
            correct: false,
            feedback: "Una estimación presentada como hecho puede crear un compromiso real.",
          },
        ],
      },
      {
        id: "format",
        label: "Entrega",
        question: "¿Qué salida puedes revisar mejor?",
        choices: [
          {
            text: "Email de menos de 120 palabras y una lista final de datos por confirmar.",
            correct: true,
            feedback: "Bien: el formato facilita revisar contenido y ausencias.",
          },
          {
            text: "Una respuesta excelente, profesional y completa.",
            correct: false,
            feedback: "Esos adjetivos no proporcionan un criterio comprobable.",
          },
        ],
      },
    ],
    assembledPrompt: `Redacta un borrador de respuesta al cliente para revisión humana.\n\nCONTEXTO\n- Solicita 12 licencias.\n- El precio y la fecha de inicio no están confirmados.\n\nREGLAS\n- No inventes datos.\n- Si falta un dato, escribe [PENDIENTE].\n\nFORMATO\nEmail de menos de 120 palabras y una lista final de datos por confirmar.`,
    simulatedOutput: [
      {
        text: "Gracias por su interés en 12 licencias. Estamos preparando una propuesta adaptada a su equipo.",
        unsupported: false,
        explanation: "Resume el dato recibido sin añadir compromisos.",
      },
      {
        text: "Podemos activar las licencias el lunes por 29 € al mes cada una.",
        unsupported: true,
        explanation: "La fecha y el precio no estaban en el contexto: hay que retirarlos y consultar a operaciones y ventas.",
      },
      {
        text: "Antes de enviarla necesitamos confirmar: [PENDIENTE: precio] y [PENDIENTE: fecha de inicio].",
        unsupported: false,
        explanation: "Hace visibles los datos que debe validar una persona.",
      },
    ],
    notebook: [
      "La IA redacta un borrador; no autoriza condiciones comerciales.",
      "Los datos ausentes se marcan, no se rellenan por intuición.",
      "Antes de enviar: revisar cifras, fechas, destinatario y tono.",
    ],
  },
  {
    id: "estudiante",
    shortLabel: "Campus",
    place: "El primer mes de universidad",
    title: "Crear un plan de estudio que respete tus datos",
    mission: "Usa IA para organizar una semana realista y detecta una fecha de examen inventada.",
    context: [
      "Asignaturas: Estadística, Historia y Programación.",
      "Tiempo disponible: martes y jueves de 18:00 a 20:00; sábado de 10:00 a 12:00.",
      "No se conocen todavía las fechas de los exámenes.",
    ],
    objectiveQuestion: "¿Qué debería producir la IA?",
    objectiveChoices: [
      {
        text: "Un plan semanal basado en el horario real y fácil de reajustar.",
        correct: true,
        feedback: "Exacto: la IA organiza los datos disponibles; tú decides y ajustas.",
      },
      {
        text: "La predicción más probable de las fechas de examen.",
        correct: false,
        feedback: "Una fecha probable no sustituye el calendario oficial.",
      },
      {
        text: "Un resumen de todas las asignaturas aunque no tenga los apuntes.",
        correct: false,
        feedback: "Sin fuentes no puede resumir el contenido real de tus materias.",
      },
    ],
    promptDecisions: [
      {
        id: "task",
        label: "Tarea",
        question: "¿Qué encargo es más concreto?",
        choices: [
          {
            text: "Ayúdame a estudiar mejor.",
            correct: false,
            feedback: "Falta un resultado observable y los datos para construirlo.",
          },
          {
            text: "Diseña un plan semanal para repartir tres asignaturas en mis seis horas disponibles.",
            correct: true,
            feedback: "Bien: especifica periodo, materias y tiempo total.",
          },
        ],
      },
      {
        id: "facts",
        label: "Datos",
        question: "¿Qué contexto es suficiente?",
        choices: [
          {
            text: "Soy universitario y voy bastante perdido.",
            correct: false,
            feedback: "Explica la situación, pero no permite crear un horario útil.",
          },
          {
            text: "Materias: Estadística, Historia y Programación. Huecos: mar/jue 18–20 y sáb 10–12.",
            correct: true,
            feedback: "Correcto: son datos concretos con los que el modelo puede trabajar.",
          },
        ],
      },
      {
        id: "limits",
        label: "Límites",
        question: "¿Qué instrucción evita falsas certezas?",
        choices: [
          {
            text: "No inventes fechas, temario ni prioridades; pregunta si falta información.",
            correct: true,
            feedback: "Bien: distingue organización de hechos que solo aporta la universidad.",
          },
          {
            text: "Usa calendarios universitarios habituales para completar lo que falte.",
            correct: false,
            feedback: "Los calendarios de otros centros pueden ser irrelevantes o incorrectos.",
          },
        ],
      },
      {
        id: "format",
        label: "Entrega",
        question: "¿Qué formato facilita cumplir el plan?",
        choices: [
          {
            text: "Tabla con día, hora, asignatura, tarea y una casilla de revisión.",
            correct: true,
            feedback: "Correcto: convierte una recomendación en acciones visibles.",
          },
          {
            text: "Una explicación motivadora y muy detallada.",
            correct: false,
            feedback: "Puede sonar bien, pero es más difícil de ejecutar y comprobar.",
          },
        ],
      },
    ],
    assembledPrompt: `Diseña un plan semanal para repartir tres asignaturas en seis horas.\n\nDATOS\n- Estadística, Historia y Programación.\n- Martes y jueves: 18:00–20:00.\n- Sábado: 10:00–12:00.\n\nREGLAS\n- No inventes fechas, temario ni prioridades.\n- Pregunta si falta información.\n\nFORMATO\nTabla con día, hora, asignatura, tarea y revisión.`,
    simulatedOutput: [
      {
        text: "Martes 18:00–19:00: Estadística; 19:00–20:00: Historia.",
        unsupported: false,
        explanation: "Utiliza uno de los huecos facilitados y distribuye materias conocidas.",
      },
      {
        text: "Conviene priorizar Programación porque el examen será el 14 de octubre.",
        unsupported: true,
        explanation: "No se proporcionó ninguna fecha oficial: el modelo ha creado una falsa certeza.",
      },
      {
        text: "Sábado 10:00–12:00: repaso y ajuste del plan según las tareas publicadas por el profesorado.",
        unsupported: false,
        explanation: "Mantiene el horario disponible y condiciona el ajuste a información real.",
      },
    ],
    notebook: [
      "Un plan útil parte de mi horario, no de supuestos del modelo.",
      "Las fechas académicas se verifican en el campus o guía docente.",
      "La IA propone una estructura; yo ajusto carga, descansos y prioridades.",
    ],
  },
];

export function getLearningLabScenario(id: LearningLabScenario["id"]) {
  return learningLabScenarios.find((scenario) => scenario.id === id) ?? learningLabScenarios[0];
}
