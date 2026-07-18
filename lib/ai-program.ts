import type { Locale } from "@/lib/i18n";

export type ProgramStage = {
  id: string;
  weeks: string;
  title: string;
  profile: string;
  objective: string;
  courses: string[];
  evidence: string[];
  gate: string;
};

export type ProgramTrack = {
  id: string;
  title: string;
  audience: string;
  entry: string;
  outcome: string;
  stages: string[];
};

export type ProgramCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  promiseTitle: string;
  promise: string;
  stagesTitle: string;
  tracksTitle: string;
  evidenceTitle: string;
  gateLabel: string;
  coursesLabel: string;
  evidenceLabel: string;
  startLabel: string;
  courseBase: string;
  stages: ProgramStage[];
  tracks: ProgramTrack[];
};

export const aiProgram: Record<Locale, ProgramCopy> = {
  es: {
    eyebrow: "Programa abierto / IA 2026",
    title: "Hoja de ruta completa para aprender IA de verdad",
    lead:
      "Un currículo abierto para convertir Aulafy en un programa educativo completo: empieza sin perfil técnico, avanza hacia construcción real y termina con sistemas evaluables, seguros y reproducibles.",
    promiseTitle: "La regla del programa",
    promise:
      "No se avanza por leer una página. Se avanza cuando puedes explicar la decisión, reproducir la práctica, romperla de forma controlada, depurarla, verificarla y guardar evidencia.",
    stagesTitle: "Fases del currículo",
    tracksTitle: "Rutas por perfil",
    evidenceTitle: "Qué contará como aprendizaje real",
    gateLabel: "Puerta de salida",
    coursesLabel: "Cursos base",
    evidenceLabel: "Evidencia",
    startLabel: "Abrir curso",
    courseBase: "/cursos",
    stages: [
      {
        id: "alfabetizacion",
        weeks: "Semana 0-2",
        title: "Alfabetización práctica en IA",
        profile: "No técnico",
        objective: "Entender qué puede hacer una IA, qué no debe hacer sola y cómo trabajar con privacidad, fuentes y revisión humana antes de elegir una herramienta concreta.",
        courses: ["ia-desde-cero", "codex-desde-cero", "ia-pymes"],
        evidence: ["Mapa de casos de uso propios", "Política personal de datos y permisos", "Primer flujo con revisión humana"],
        gate: "Puedes explicar cuándo usar IA local, cloud o no usar IA, sin vender humo.",
      },
      {
        id: "herramientas",
        weeks: "Semana 3-5",
        title: "Herramientas y entorno reproducible",
        profile: "No técnico avanzado / técnico inicial",
        objective: "Preparar terminal, Git, Python, Docker, modelos locales y una forma ordenada de pedir cambios o automatizaciones.",
        courses: ["fundamentos-aulafy", "codex-programadores", "claude-code"],
        evidence: ["Repositorio con README y AGENTS.md", "Cambio pequeño con diff", "Validación documentada"],
        gate: "Puedes pedir una tarea verificable y distinguir una respuesta bonita de un resultado probado.",
      },
      {
        id: "construccion",
        weeks: "Semana 6-10",
        title: "Construcción de aplicaciones de IA",
        profile: "Técnico / maker",
        objective: "Crear una primera web o demo SaaS y avanzar hacia herramientas con RAG, modelos locales, APIs compatibles, logs y manejo de errores.",
        courses: ["crear-webs-con-ia", "ia-local", "rag-seguro", "automatizacion-self-hosted"],
        evidence: ["App funcional", "Dataset o documentos de prueba", "Tests o checklist manual", "Registro de fallos encontrados"],
        gate: "Puedes construir una aplicación pequeña que responde con límites claros y evidencias.",
      },
      {
        id: "agentes",
        weeks: "Semana 11-15",
        title: "Agentes, automatización y seguridad",
        profile: "Técnico intermedio",
        objective: "Diseñar agentes con herramientas limitadas, permisos, memoria, retries, idempotencia, estado y revisión humana.",
        courses: ["agentes-automatizacion", "agentes-produccion", "seguridad-evals"],
        evidence: ["Agente con tools limitadas", "Matriz de permisos", "Evals básicas", "Plan de recuperación ante fallo"],
        gate: "Puedes demostrar que tu agente sabe parar, pedir ayuda y no repetir acciones peligrosas.",
      },
      {
        id: "produccion",
        weeks: "Semana 16-22",
        title: "Producción, modelos y evaluación",
        profile: "Técnico avanzado",
        objective: "Servir modelos, enrutar entre proveedores, medir calidad, observar costes, adaptar modelos y documentar riesgos.",
        courses: ["mlops-local", "ai-router", "fine-tuning-local", "seguridad-evals"],
        evidence: ["Gateway con métricas", "Evals comparativas", "Modelo o router versionado", "Informe de riesgos"],
        gate: "Puedes operar un sistema de IA pequeño con rollback, trazas, presupuesto y criterios de calidad.",
      },
      {
        id: "capstone",
        weeks: "Semana 23-28",
        title: "Proyecto final verificable",
        profile: "Todos, según ruta",
        objective: "Integrar lo aprendido en un proyecto completo: problema real, solución mínima, pruebas, documentación, demo y revisión externa.",
        courses: ["rag-seguro", "agentes-produccion", "mlops-local", "ai-router"],
        evidence: ["Repositorio público o privado revisable", "Demo", "Tests", "Informe de verificación", "Issue de revisión"],
        gate: "Otra persona puede ejecutar, revisar y criticar tu proyecto sin depender de tus explicaciones orales.",
      },
    ],
    tracks: [
      { id: "no-tecnico", title: "Perfil no técnico", audience: "Pymes, docentes, estudiantes, operaciones y creadores", entry: "Empieza con una tarea de estudio, trabajo o creación; la base técnica llega solo cuando tu objetivo la necesita.", outcome: "Automatizar trabajo real o publicar una primera web con revisión humana y privacidad.", stages: ["alfabetizacion", "herramientas", "construccion", "capstone"] },
      { id: "programador", title: "Programador", audience: "Frontend, backend, full stack, makers", entry: "Empieza por Codex y fundamentos.", outcome: "Entregar cambios y apps de IA verificables.", stages: ["herramientas", "construccion", "agentes", "produccion", "capstone"] },
      { id: "sistemas", title: "Ingeniería / MLOps", audience: "Backend, DevOps, ML engineers", entry: "Empieza por sistemas, RAG y serving.", outcome: "Operar IA con métricas, seguridad y costes controlados.", stages: ["herramientas", "construccion", "agentes", "produccion", "capstone"] },
    ],
  },
  en: {
    eyebrow: "Open program / AI 2026",
    title: "A complete roadmap for learning AI seriously",
    lead:
      "An open curriculum to turn Aulafy into a complete educational program: start without a technical background, move into real building, and finish with evaluated, secure, reproducible systems.",
    promiseTitle: "The program rule",
    promise:
      "You do not progress by reading a page. You progress when you can explain the decision, reproduce the practice, break it safely, debug it, verify it, and save evidence.",
    stagesTitle: "Curriculum stages",
    tracksTitle: "Tracks by profile",
    evidenceTitle: "What will count as real learning",
    gateLabel: "Exit gate",
    coursesLabel: "Base courses",
    evidenceLabel: "Evidence",
    startLabel: "Open course",
    courseBase: "/en/courses",
    stages: [
      {
        id: "alfabetizacion",
        weeks: "Week 0-2",
        title: "Practical AI literacy",
        profile: "Non-technical",
        objective: "Understand what AI can do, what it should not do alone, and how to work with privacy, sources, and human review.",
        courses: ["fundamentos-aulafy", "ia-pymes"],
        evidence: ["Map of your own use cases", "Personal data and permissions policy", "First workflow with human review"],
        gate: "You can explain when to use local AI, cloud AI, or no AI without hype.",
      },
      {
        id: "herramientas",
        weeks: "Week 3-5",
        title: "Tools and reproducible environment",
        profile: "Advanced non-technical / early technical",
        objective: "Prepare terminal, Git, Python, Docker, local models, and an orderly way to request changes or automations.",
        courses: ["fundamentos-aulafy", "codex-programadores", "claude-code"],
        evidence: ["Repository with README and AGENTS.md", "Small change with diff", "Documented validation"],
        gate: "You can request a verifiable task and distinguish a polished answer from a tested result.",
      },
      {
        id: "construccion",
        weeks: "Week 6-10",
        title: "Building AI applications",
        profile: "Technical / maker",
        objective: "Create tools with RAG, local models, compatible APIs, a minimal interface, logs, and error handling.",
        courses: ["ia-local", "rag-seguro", "automatizacion-self-hosted"],
        evidence: ["Working app", "Test dataset or documents", "Tests or manual checklist", "Log of failures found"],
        gate: "You can build a small application that answers with clear limits and evidence.",
      },
      {
        id: "agentes",
        weeks: "Week 11-15",
        title: "Agents, automation, and security",
        profile: "Intermediate technical",
        objective: "Design agents with limited tools, permissions, memory, retries, idempotency, state, and human review.",
        courses: ["agentes-automatizacion", "agentes-produccion", "seguridad-evals"],
        evidence: ["Agent with limited tools", "Permission matrix", "Basic evals", "Failure recovery plan"],
        gate: "You can prove that your agent can stop, ask for help, and avoid repeating dangerous actions.",
      },
      {
        id: "produccion",
        weeks: "Week 16-22",
        title: "Production, models, and evaluation",
        profile: "Advanced technical",
        objective: "Serve models, route across providers, measure quality, observe costs, adapt models, and document risks.",
        courses: ["mlops-local", "ai-router", "fine-tuning-local", "seguridad-evals"],
        evidence: ["Gateway with metrics", "Comparative evals", "Versioned model or router", "Risk report"],
        gate: "You can operate a small AI system with rollback, traces, budget, and quality criteria.",
      },
      {
        id: "capstone",
        weeks: "Week 23-28",
        title: "Verifiable final project",
        profile: "All, depending on track",
        objective: "Integrate everything into a complete project: real problem, minimal solution, tests, documentation, demo, and external review.",
        courses: ["rag-seguro", "agentes-produccion", "mlops-local", "ai-router"],
        evidence: ["Reviewable public or private repository", "Demo", "Tests", "Verification report", "Review issue"],
        gate: "Another person can run, review, and criticize your project without relying on your spoken explanation.",
      },
    ],
    tracks: [
      { id: "non-technical", title: "Non-technical profile", audience: "Small businesses, educators, operations, creators", entry: "Start with literacy and business workflows.", outcome: "Automate real work with human review and privacy.", stages: ["alfabetizacion", "herramientas", "construccion", "capstone"] },
      { id: "developer", title: "Developer", audience: "Frontend, backend, full stack, makers", entry: "Start with Codex and foundations.", outcome: "Ship verifiable AI-assisted changes and apps.", stages: ["herramientas", "construccion", "agentes", "produccion", "capstone"] },
      { id: "systems", title: "Engineering / MLOps", audience: "Backend, DevOps, ML engineers", entry: "Start with systems, RAG, and serving.", outcome: "Operate AI with metrics, security, and controlled costs.", stages: ["herramientas", "construccion", "agentes", "produccion", "capstone"] },
    ],
  },
};
