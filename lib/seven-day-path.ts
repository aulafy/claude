export type PathLocale = "es" | "en";

export type SevenDayPathItem = {
  day: number;
  title: string;
  result: string;
  minutes: number;
  href: string;
};

export const sevenDayPath: Record<PathLocale, SevenDayPathItem[]> = {
  es: [
    { day: 1, title: "Haz una primera tarea útil", result: "Una instrucción pequeña que tú revisas", minutes: 15, href: "/empezar" },
    { day: 2, title: "Decide qué no debes delegar", result: "Una frontera clara entre ayuda y decisión", minutes: 25, href: "/cursos/ia-desde-cero/que-puede-hacer-ia-generativa" },
    { day: 3, title: "Pide un resultado comprobable", result: "Un encargo con objetivo, límites y formato", minutes: 25, href: "/cursos/ia-desde-cero/pedir-resultados-utiles" },
    { day: 4, title: "Detecta una respuesta inventada", result: "Una afirmación contrastada con evidencia", minutes: 30, href: "/cursos/ia-desde-cero/alucinaciones-verificar" },
    { day: 5, title: "Protege los datos antes de compartir", result: "Una regla personal de minimización", minutes: 30, href: "/cursos/ia-desde-cero/privacidad-derechos-seguridad" },
    { day: 6, title: "Elige herramienta según la tarea", result: "Una comparación justa, no un ranking", minutes: 25, href: "/cursos/ia-desde-cero/elegir-modelo-herramienta" },
    { day: 7, title: "Construye un flujo repetible", result: "Tu primer proyecto pequeño y documentado", minutes: 35, href: "/cursos/ia-desde-cero/primer-proyecto-repetible" },
  ],
  en: [
    { day: 1, title: "Complete a first useful task", result: "One small instruction that you review", minutes: 15, href: "/en/start" },
    { day: 2, title: "Decide what not to delegate", result: "A clear line between assistance and decision", minutes: 25, href: "/en/ai-course#que-es-ia-generativa" },
    { day: 3, title: "Ask for a verifiable result", result: "A brief with an outcome, limits, and format", minutes: 25, href: "/en/ai-course#encargos-claros" },
    { day: 4, title: "Detect an invented answer", result: "One claim checked against evidence", minutes: 30, href: "/en/ai-course#verificar-respuestas" },
    { day: 5, title: "Protect data before sharing", result: "A personal data minimization rule", minutes: 30, href: "/en/ai-course#privacidad-datos" },
    { day: 6, title: "Choose a tool for the task", result: "A fair comparison instead of a ranking", minutes: 25, href: "/en/paths" },
    { day: 7, title: "Build a repeatable workflow", result: "Your first small documented project", minutes: 35, href: "/en/ai-course#project-fundamentos" },
  ],
};
