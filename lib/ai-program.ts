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
  project: string;
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
  methodTitle: string;
  method: string[];
  horizonTitle: string;
  horizon: string;
  updateTitle: string;
  update: string;
  updateSources: string[];
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
    eyebrow: "Programa abierto / IA aplicada",
    title: "Programa modular de Inteligencia Artificial Aplicada",
    lead:
      "Un currículo abierto de 7 módulos para aprender IA desde cero hasta construir, evaluar y operar sistemas reales. La meta es que Aulafy sea una ruta clara, viva y práctica para hispanohablantes que necesitan actualizarse sin perderse entre cientos de herramientas.",
    promiseTitle: "La regla del programa",
    promise:
      "No se avanza por leer una página. Se avanza cuando puedes explicar la decisión, reproducir la práctica, romperla de forma controlada, depurarla, verificarla y guardar evidencia. Cada módulo termina con un proyecto que otra persona puede revisar.",
    methodTitle: "Método Aulafy",
    method: [
      "Diagnóstico rápido: el alumno elige qué quiere conseguir hoy y recibe una sola recomendación, no un catálogo.",
      "Misión corta: cada bloque debe acabar en una práctica de 20 a 90 minutos con resultado visible.",
      "Comprobación: se guarda prompt, decisión, salida, errores y una explicación de qué se entendió frente a qué se copió.",
      "Puente natural: al terminar una misión, el alumno sabe si debe ir a pymes, programación, webs, RAG, agentes o modelos locales.",
    ],
    horizonTitle: "Visión a 12 meses",
    horizon:
      "Durante el primer año Aulafy funcionará como programa abierto, gratuito y versionado. Cada actualización debe mejorar lecciones, prácticas, fuentes, rúbricas o proyectos. El objetivo es construir una base educativa cada vez más fiable: menos contenido disperso, más rutas claras, más ejercicios reproducibles y más evidencia de que el alumno sabe hacer algo real.",
    updateTitle: "Sistema de actualización semanal",
    update:
      "La IA cambia demasiado rápido para publicar un temario estático. El programa distingue fundamentos estables de herramientas volátiles y reserva una revisión semanal para modelos, APIs, precios, seguridad, regulación, benchmarks, casos reales y nuevas prácticas útiles.",
    updateSources: [
      "X: dudas reales de estudiantes, pymes, programadores y trabajadores que necesitan reciclarse.",
      "Reddit: problemas prácticos, errores frecuentes, experiencias de usuarios y debates técnicos.",
      "OpenAI, Anthropic, Google, Meta, xAI y Mistral: documentación oficial, modelos, APIs, pricing, seguridad y cambios de producto.",
      "Hugging Face: modelos abiertos, datasets, leaderboards, licencias, cuantización y tendencias de IA local.",
      "GitHub: repos educativos, frameworks de agentes, RAG, evaluación, MCP, observabilidad y ejemplos reproducibles.",
      "BOE, UE y fuentes oficiales: privacidad, IA Act, facturación, educación y cumplimiento para pymes.",
    ],
    stagesTitle: "7 módulos formativos",
    tracksTitle: "Rutas por perfil",
    evidenceTitle: "Qué contará como aprendizaje real",
    gateLabel: "Puerta de salida",
    coursesLabel: "Cursos base",
    evidenceLabel: "Evidencia",
    startLabel: "Abrir curso",
    courseBase: "/cursos",
    stages: [
      {
        id: "fundamentos",
        weeks: "Módulo 1 / 2-4 semanas",
        title: "Orientación y primera utilidad",
        profile: "Cero absoluto / urgencia laboral",
        objective: "Ayudar al alumno a dejar de sentirse perdido, elegir una situación concreta y conseguir una primera victoria útil con IA en menos de 45 minutos, sin empezar por teoría excesiva ni por diez herramientas a la vez.",
        courses: ["ia-desde-cero", "codex-desde-cero", "ia-pymes"],
        evidence: ["Diagnóstico de situación personal", "Primera tarea útil resuelta", "Prompt y resultado guardados", "Checklist de entendí frente a solo copié"],
        project: "Resolver un problema real del día —email, resumen, decisión, estudio o planificación— y documentar qué hizo la IA, qué revisaste tú y si realmente ahorró tiempo.",
        gate: "Puedes elegir una herramienta inicial, pedir una tarea concreta, revisar el resultado y explicar qué datos no deberías introducir todavía.",
      },
      {
        id: "pymes-automatizacion",
        weeks: "Módulo 2 / 4-6 semanas",
        title: "IA para pymes y automatización real",
        profile: "Autónomos, equipos pequeños y operaciones",
        objective: "Detectar tareas repetitivas, medir tiempo perdido y construir una primera automatización con control humano, costes visibles y reglas claras para que la IA prepare trabajo sin decidir por la empresa.",
        courses: ["ia-pymes", "automatizacion-self-hosted", "ia-desde-cero"],
        evidence: ["Mapa de tareas repetitivas", "Primer flujo con humano en el loop", "Estimación de ahorro de tiempo", "Aviso de costes, datos y límites"],
        project: "Automatizar una tarea de oficina —email, reseñas, formulario, resumen o entrada de datos— con n8n o una alternativa sencilla, dejando una aprobación humana antes de cualquier acción sensible.",
        gate: "Puedes explicar qué automatiza la IA, dónde interviene la persona, qué datos pasan por cada herramienta y cuándo conviene llevar el flujo a self-hosted.",
      },
      {
        id: "programacion",
        weeks: "Módulo 3 / 6-8 semanas",
        title: "Programar con IA",
        profile: "Técnico inicial / programador / maker",
        objective: "Pasar de pedir código en un chat a dirigir agentes de desarrollo con contexto permanente, AGENTS.md o CLAUDE.md, revisión de diffs, trazas, tests y control de seguridad.",
        courses: ["fundamentos-aulafy", "codex-programadores", "claude-code", "codex-desde-cero"],
        evidence: ["Repositorio con README y AGENTS.md", "Cambio pequeño con diff revisado", "Skill o instrucción reutilizable", "Revisión de seguridad de comandos y secretos"],
        project: "Entregar una mejora real en un repositorio usando IA: contexto del proyecto, rama, cambio, validación, explicación del diff y revisión de deuda cognitiva.",
        gate: "Puedes dirigir un agente de código, revisar lo que cambia, detectar cuándo inventa arquitectura y explicar por qué el cambio es mantenible.",
      },
      {
        id: "webs-ia",
        weeks: "Módulo 4 / 6-8 semanas",
        title: "Crear webs profesionales con IA",
        profile: "No técnico avanzado / maker / profesional",
        objective: "Construir y publicar una web útil con IA, evitando el resultado genérico de plantilla, cuidando responsive, SEO, velocidad, llamadas a la acción, dominio, mantenimiento y costes.",
        courses: ["crear-webs-con-ia", "fundamentos-aulafy", "codex-desde-cero", "ia-pymes"],
        evidence: ["Web o demo publicada", "Checklist anti-AI-slop", "Revisión responsive y SEO", "Variables, dominio, analítica y costes documentados"],
        project: "Publicar una web para un negocio, estudiante o profesional que tenga una propuesta clara, una CTA visible, revisión móvil, SEO básico y plan de mejora posterior.",
        gate: "Puedes publicar una web real y explicar por qué no es solo una demo bonita: qué problema resuelve, cómo convierte, cómo se mantiene y qué riesgos tiene.",
      },
      {
        id: "datos-rag",
        weeks: "Módulo 5 / 6-8 semanas",
        title: "RAG avanzado y seguro",
        profile: "Técnico intermedio / empresa",
        objective: "Construir sistemas que recuperan información correcta y solo autorizada, combinando chunking, metadatos, BM25, embeddings, re-ranking, evaluación y abstención para evitar respuestas elegantes pero falsas.",
        courses: ["rag-seguro", "ia-local", "ia-pymes", "automatizacion-self-hosted"],
        evidence: ["Corpus de documentos de prueba", "Pipeline de ingesta y recuperación", "Comparativa BM25/vectorial/híbrida", "Evaluación de casos correctos, dudosos y prohibidos"],
        project: "Construir un asistente documental pequeño que responda con citas, mida si recupera el fragmento correcto y bloquee información que el modelo no está autorizado a ver.",
        gate: "Puedes explicar por qué un RAG falla, medir la recuperación, proteger documentos y decidir cuándo SQLite/FTS5 basta y cuándo necesitas embeddings o vectorial.",
      },
      {
        id: "agentes-produccion",
        weeks: "Módulo 6 / 6-8 semanas",
        title: "Agentes controlados",
        profile: "Técnico avanzado",
        objective: "Crear agentes que tengan herramientas, contexto, memoria, harness, loop, trazas, criterios de parada, permisos mínimos y revisión humana para que la autonomía no se convierta en un bug caro.",
        courses: ["agentes-automatizacion", "agentes-produccion", "seguridad-evals", "mlops-local", "ai-router"],
        evidence: ["Agente con tools limitadas", "Matriz de permisos y lista blanca", "Trazas y evals mínimas", "Plan de fallo, recuperación y coste"],
        project: "Crear un agente o pequeño equipo de agentes que resuelva una tarea real, registre cada paso, falle de forma controlada y pida aprobación en acciones sensibles.",
        gate: "Puedes operar un agente con presupuesto, sandbox, trazas, parada segura, humano en el loop y criterios claros antes de darle más permisos.",
      },
      {
        id: "modelos-futuro",
        weeks: "Módulo 7 / 6-8 semanas",
        title: "Modelos locales y self-hosted",
        profile: "Técnico avanzado / especialización",
        objective: "Aprender cuándo usar nube y cuándo local, con una visión honesta de privacidad, coste, VRAM, cuantización, Ollama, Open WebUI, RAG local, n8n self-hosted y modelos abiertos.",
        courses: ["ia-local", "fine-tuning-local", "mlops-local", "ia-generativa", "videojuegos-3d-ia"],
        evidence: ["Tabla realista de hardware", "Prueba local documentada", "Comparativa local/cloud", "Sistema con datos sensibles que no salen de la máquina"],
        project: "Montar un sistema self-hosted básico —chat local, RAG o automatización con Ollama— y justificar qué tareas harías en local, cuáles en cloud y por qué.",
        gate: "Puedes elegir entre local, cloud o híbrido por evidencia, privacidad, coste y calidad, sin prometer milagros con hardware insuficiente.",
      },
    ],
    tracks: [
      { id: "no-tecnico", title: "Perfil no técnico", audience: "Pymes, docentes, estudiantes, operaciones y creadores", entry: "Empieza por orientación y pymes. La parte técnica aparece solo cuando tu objetivo la necesita.", outcome: "Usar IA con criterio, automatizar una primera tarea y publicar una solución útil sin perder privacidad ni revisión humana.", stages: ["fundamentos", "pymes-automatizacion", "webs-ia", "datos-rag"] },
      { id: "programador", title: "Programador", audience: "Frontend, backend, full stack, makers", entry: "Empieza por programación asistida, pero revisa fundamentos para no construir sobre humo.", outcome: "Entregar cambios, apps, RAG y agentes con tests, seguridad, documentación y despliegue.", stages: ["fundamentos", "programacion", "webs-ia", "datos-rag", "agentes-produccion", "modelos-futuro"] },
      { id: "sistemas", title: "Ingeniería / MLOps", audience: "Backend, DevOps, ML engineers", entry: "Empieza por datos, RAG, agentes y operación, manteniendo evaluación y costes desde el primer prototipo.", outcome: "Operar sistemas de IA con observabilidad, evaluación, rutas de modelo, seguridad y presupuesto.", stages: ["fundamentos", "datos-rag", "agentes-produccion", "modelos-futuro"] },
    ],
  },
  en: {
    eyebrow: "Open program / applied AI",
    title: "Modular program in Applied Artificial Intelligence",
    lead:
      "A seven-module open curriculum for learning AI from zero to building, evaluating, and operating real systems. The goal is to make Aulafy a clear, living, practical path for Spanish-speaking learners who need to update their skills without getting lost among hundreds of tools.",
    promiseTitle: "The program rule",
    promise:
      "You do not progress by reading a page. You progress when you can explain the decision, reproduce the practice, break it safely, debug it, verify it, and save evidence. Each module ends with a project that another person can review.",
    methodTitle: "Aulafy method",
    method: [
      "Quick diagnosis: the learner chooses what they want to achieve today and receives one recommendation, not a catalogue.",
      "Short mission: every block should end in a 20-to-90-minute practice with a visible result.",
      "Verification: the learner saves the prompt, decision, output, errors, and an explanation of what they understood versus copied.",
      "Natural bridge: after each mission, the learner knows whether to continue into small business, coding, web, RAG, agents, or local models.",
    ],
    horizonTitle: "12-month vision",
    horizon:
      "During the first year Aulafy will operate as an open, free, versioned program. Each update should improve lessons, practices, sources, rubrics, or projects. The objective is to build an increasingly reliable educational base: less scattered content, clearer paths, more reproducible exercises, and stronger evidence that the learner can do real work.",
    updateTitle: "Weekly update system",
    update:
      "AI changes too quickly for a static syllabus. The program separates stable foundations from volatile tools and keeps a weekly review loop for models, APIs, prices, security, regulation, benchmarks, real use cases, and useful new practices.",
    updateSources: [
      "X: real questions from learners, small businesses, developers, and workers who need to reskill.",
      "Reddit: practical problems, common errors, user experiences, and technical debates.",
      "OpenAI, Anthropic, Google, Meta, xAI, and Mistral: official docs, models, APIs, pricing, safety, and product changes.",
      "Hugging Face: open models, datasets, leaderboards, licenses, quantization, and local AI trends.",
      "GitHub: educational repos, agent frameworks, RAG, evaluation, MCP, observability, and reproducible examples.",
      "Official legal sources: privacy, AI regulation, invoicing, education, and compliance for small businesses.",
    ],
    stagesTitle: "Seven training modules",
    tracksTitle: "Tracks by profile",
    evidenceTitle: "What will count as real learning",
    gateLabel: "Exit gate",
    coursesLabel: "Base courses",
    evidenceLabel: "Evidence",
    startLabel: "Open course",
    courseBase: "/en/courses",
    stages: [
      {
        id: "fundamentos",
        weeks: "Module 1 / 2-4 weeks",
        title: "Orientation and first useful win",
        profile: "Absolute beginner / work urgency",
        objective: "Help the learner stop feeling lost, choose one concrete situation, and get a useful first AI win in under 45 minutes without starting with too much theory or too many tools.",
        courses: ["fundamentos-aulafy", "ia-pymes"],
        evidence: ["Personal situation diagnosis", "First useful task solved", "Prompt and output saved", "Understood versus copied checklist"],
        project: "Solve a real problem from today —email, summary, decision, study, or planning— and document what AI did, what you reviewed, and whether it saved time.",
        gate: "You can choose an initial tool, ask for one concrete task, review the result, and explain which data should not be entered yet.",
      },
      {
        id: "pymes-automatizacion",
        weeks: "Module 2 / 4-6 weeks",
        title: "AI for small businesses and real automation",
        profile: "Freelancers, small teams, and operations",
        objective: "Detect repetitive tasks, measure lost time, and build a first automation with human control, visible costs, and clear rules so AI prepares work without deciding for the business.",
        courses: ["ia-pymes", "automatizacion-self-hosted", "fundamentos-aulafy"],
        evidence: ["Repetitive task map", "First human-in-the-loop workflow", "Estimated time saved", "Cost, data, and limits note"],
        project: "Automate one office task —email, reviews, form, summary, or data entry— with n8n or a simpler alternative, keeping human approval before any sensitive action.",
        gate: "You can explain what AI automates, where a person intervenes, which data crosses each tool, and when the workflow should move to self-hosted.",
      },
      {
        id: "programacion",
        weeks: "Module 3 / 6-8 weeks",
        title: "Programming with AI",
        profile: "Early technical / developer / maker",
        objective: "Move from asking for code in chat to directing development agents with persistent context, AGENTS.md or CLAUDE.md, diff review, traces, tests, and security control.",
        courses: ["fundamentos-aulafy", "codex-programadores", "claude-code"],
        evidence: ["Repository with README and AGENTS.md", "Small reviewed diff", "Reusable skill or instruction", "Command and secret safety review"],
        project: "Ship one real repository improvement using AI: project context, branch, change, validation, diff explanation, and cognitive debt review.",
        gate: "You can direct a coding agent, review what changed, detect invented architecture, and explain why the change is maintainable.",
      },
      {
        id: "webs-ia",
        weeks: "Module 4 / 6-8 weeks",
        title: "Build professional websites with AI",
        profile: "Advanced non-technical / maker / professional",
        objective: "Build and publish a useful website with AI while avoiding generic template output and caring about responsive design, SEO, speed, calls to action, domain, maintenance, and cost.",
        courses: ["fundamentos-aulafy", "ia-pymes"],
        evidence: ["Published website or demo", "Anti-AI-slop checklist", "Responsive and SEO review", "Variables, domain, analytics, and costs documented"],
        project: "Publish a website for a business, student, or professional with a clear proposal, visible CTA, mobile review, basic SEO, and improvement plan.",
        gate: "You can publish a real website and explain why it is not just a pretty demo: what problem it solves, how it converts, how it is maintained, and what risks it has.",
      },
      {
        id: "datos-rag",
        weeks: "Module 5 / 6-8 weeks",
        title: "Advanced and safe RAG",
        profile: "Intermediate technical / business",
        objective: "Build systems that retrieve correct and authorized information only, combining chunking, metadata, BM25, embeddings, re-ranking, evaluation, and abstention to avoid elegant but false answers.",
        courses: ["rag-seguro", "ia-local", "automatizacion-self-hosted"],
        evidence: ["Test document corpus", "Ingestion and retrieval pipeline", "BM25/vector/hybrid comparison", "Evaluation of correct, uncertain, and forbidden cases"],
        project: "Build a small document assistant that answers with citations, measures whether it retrieved the right passage, and blocks information the model is not authorized to see.",
        gate: "You can explain why RAG fails, measure retrieval, protect documents, and decide when SQLite/FTS5 is enough or when embeddings/vector search are needed.",
      },
      {
        id: "agentes-produccion",
        weeks: "Module 6 / 6-8 weeks",
        title: "Controlled agents",
        profile: "Advanced technical",
        objective: "Create agents with tools, context, memory, harness, loop, traces, stop criteria, minimum permissions, and human review so autonomy does not become an expensive bug.",
        courses: ["agentes-automatizacion", "agentes-produccion", "seguridad-evals", "mlops-local", "ai-router"],
        evidence: ["Agent with limited tools", "Permission matrix and allowlist", "Minimum traces and evals", "Failure, recovery, and cost plan"],
        project: "Create an agent or small agent team that solves a real task, records every step, fails in a controlled way, and asks for approval on sensitive actions.",
        gate: "You can operate an agent with budget, sandbox, traces, safe stop, human-in-the-loop, and clear criteria before granting more permissions.",
      },
      {
        id: "modelos-futuro",
        weeks: "Module 7 / 6-8 weeks",
        title: "Local models and self-hosted AI",
        profile: "Advanced technical / specialization",
        objective: "Learn when to use cloud and when to use local AI, with an honest view of privacy, cost, VRAM, quantization, Ollama, Open WebUI, local RAG, self-hosted n8n, and open models.",
        courses: ["ia-local", "fine-tuning-local", "mlops-local", "ia-generativa", "videojuegos-3d-ia"],
        evidence: ["Realistic hardware table", "Documented local test", "Local/cloud comparison", "System where sensitive data does not leave the machine"],
        project: "Set up a basic self-hosted system —local chat, RAG, or automation with Ollama— and justify which tasks belong local, cloud, or hybrid.",
        gate: "You can choose local, cloud, or hybrid based on evidence, privacy, cost, and quality without promising miracles on insufficient hardware.",
      },
    ],
    tracks: [
      { id: "non-technical", title: "Non-technical profile", audience: "Small businesses, educators, operations, creators", entry: "Start with orientation and small business automation. Technical depth appears only when the goal requires it.", outcome: "Use AI with judgment, automate a first task, and publish a useful solution without losing privacy or human review.", stages: ["fundamentos", "pymes-automatizacion", "webs-ia", "datos-rag"] },
      { id: "developer", title: "Developer", audience: "Frontend, backend, full stack, makers", entry: "Start with AI-assisted programming, but review foundations so you do not build on hype.", outcome: "Ship changes, apps, RAG, and agents with tests, security, documentation, and deployment.", stages: ["fundamentos", "programacion", "webs-ia", "datos-rag", "agentes-produccion", "modelos-futuro"] },
      { id: "systems", title: "Engineering / MLOps", audience: "Backend, DevOps, ML engineers", entry: "Start with data, RAG, agents, and operations while keeping evaluation and cost in the first prototype.", outcome: "Operate AI systems with observability, evaluation, model routing, security, and budget control.", stages: ["fundamentos", "datos-rag", "agentes-produccion", "modelos-futuro"] },
    ],
  },
};
