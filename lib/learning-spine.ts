// Columna vertebral: la secuencia recomendada para aprender IA de principio a fin, solo con cursos de profundidad «completa».
// El resto del catálogo son especialidades que se cursan después, según el objetivo. Se revisa con `npm run audit:depth`.
export type SpineStep = { level: 1 | 2 | 3; slug: string; why: string; outcome: string };

export const learningSpine: SpineStep[] = [
  { level: 1, slug: "ia-desde-cero", why: "Entender qué hace la IA, pedir bien y detectar errores antes de elegir una herramienta.", outcome: "Un proyecto breve con una rúbrica de revisión." },
  { level: 2, slug: "ia-pymes", why: "Llevar la IA a un negocio real con datos, privacidad, pruebas y revisión humana.", outcome: "Un piloto reversible con métricas." },
  { level: 3, slug: "codex-desde-cero", why: "Construir software con un agente de programación desde la terminal.", outcome: "Un proyecto funcional con pruebas." },
  { level: 3, slug: "claude-code", why: "Dominar el flujo de trabajo con Claude Code: skills, subagentes, MCP y permisos.", outcome: "Un flujo de desarrollo adaptado a tu trabajo." },
  { level: 3, slug: "ia-local", why: "Ejecutar modelos en tu equipo y construir aplicaciones privadas con RAG.", outcome: "Una aplicación local que funciona sin internet." },
  { level: 3, slug: "seguridad-evals", why: "Probar y proteger lo que construyes: evaluaciones, inyección de instrucciones y fallos.", outcome: "Un conjunto de pruebas y un informe de riesgos." },
];
