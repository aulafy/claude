export type CodexLessonBlock = {
  type: "h2" | "h3" | "p" | "bullet" | "code";
  text: string;
};

export type CodexLessonContent = {
  slug: string;
  title: { es: string; en: string };
  lead: { es: string; en: string };
  blocks: { es: CodexLessonBlock[]; en: CodexLessonBlock[] };
  practice?: CodexLessonPractice;
};

export type CodexLessonPractice = {
  build: { es: string; en: string };
  why: { es: string; en: string };
  starter: { es: string; en: string };
  steps: { es: string[]; en: string[] };
  codexPrompt: { es: string; en: string };
  expected: { es: string; en: string };
  verify: string;
  manualCheck: { es: string; en: string };
  commonError: { es: string; en: string };
  exercise: { es: string; en: string };
  solution: { es: string; en: string };
  evidence: { es: string; en: string };
  sources: { label: string; href: string }[];
  tested: string;
};

function practice(input: CodexLessonPractice) {
  return input;
}

export const codexLessons: CodexLessonContent[] = [
  {
    slug: "instalacion",
    title: { es: "Instala Codex y entiende sus superficies", en: "Install Codex and understand its surfaces" },
    lead: {
      es: "Prepara Codex CLI, autentícate y elige la superficie adecuada antes de tocar un repositorio real.",
      en: "Set up Codex CLI, sign in, and choose the right surface before touching a real repository.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Qué vas a aprender" },
        { type: "bullet", text: "Instalar y comprobar Codex CLI." },
        { type: "bullet", text: "Distinguir CLI, extensión de IDE, app y tareas en la nube." },
        { type: "bullet", text: "Abrir una primera sesión dentro de un repositorio." },
        { type: "h2", text: "Instalación mínima" },
        { type: "p", text: "Codex CLI trabaja sobre los archivos y herramientas de tu máquina. En macOS y Linux, OpenAI recomienda el instalador autónomo. npm sigue disponible como alternativa multiplataforma. Comprueba la versión antes de iniciar sesión." },
        { type: "code", text: "# Recomendado en macOS y Linux\ncurl -fsSL https://chatgpt.com/codex/install.sh | sh\n\n# Alternativa con npm\nnpm install -g @openai/codex\n\ncodex --version\ncd ~/codigo/mi-proyecto\ncodex" },
        { type: "p", text: "En el primer inicio, sigue el flujo de autenticación que muestra Codex. Dentro de la sesión, /status resume el directorio, modelo y permisos activos." },
        { type: "code", text: "/status\n/permissions\n/model" },
        { type: "h2", text: "Qué superficie elegir" },
        { type: "bullet", text: "CLI: trabajo local rápido, scripts y una relación directa con Git y la terminal." },
        { type: "bullet", text: "IDE: cambios ligados al archivo y selección que estás viendo." },
        { type: "bullet", text: "App: tareas largas, revisión visual y coordinación de varios trabajos." },
        { type: "bullet", text: "Nube: trabajo aislado y delegable cuando el entorno ya está configurado." },
        { type: "h2", text: "Codex junto a Cursor, Windsurf o tu IDE" },
        { type: "p", text: "No hace falta elegir una sola herramienta. Usa Cursor, Windsurf o tu IDE para edición localizada, navegación visual y refactors pequeños. Usa Codex cuando necesites recorrer un repo, ejecutar comandos, revisar Git, automatizar pruebas o cerrar una tarea completa con evidencia." },
        { type: "p", text: "La regla práctica: si el contexto está en una pantalla, el IDE va muy bien; si el contexto vive en muchos archivos, comandos, logs y commits, Codex suele darte más control operativo." },
        { type: "h2", text: "Primera comprobación" },
        { type: "p", text: "Pide una tarea de solo lectura: «Resume la arquitectura, dime cómo se ejecutan los tests y no cambies archivos». Revisa que Codex detecte correctamente el lenguaje, el gestor de paquetes y el estado de Git." },
      ],
      en: [
        { type: "h2", text: "What you will learn" },
        { type: "bullet", text: "Install and verify Codex CLI." },
        { type: "bullet", text: "Choose between the CLI, IDE extension, app, and cloud tasks." },
        { type: "bullet", text: "Open a first session inside a repository." },
        { type: "h2", text: "Minimal setup" },
        { type: "p", text: "Codex CLI works with the files and tools on your machine. OpenAI recommends the standalone installer on macOS and Linux; npm remains a cross-platform alternative. Check the version before signing in." },
        { type: "code", text: "# Recommended on macOS and Linux\ncurl -fsSL https://chatgpt.com/codex/install.sh | sh\n\n# npm alternative\nnpm install -g @openai/codex\n\ncodex --version\ncd ~/code/my-project\ncodex" },
        { type: "p", text: "On first launch, follow the sign-in flow shown by Codex. Inside a session, /status summarizes the active directory, model, and permissions." },
        { type: "code", text: "/status\n/permissions\n/model" },
        { type: "h2", text: "Choose a surface" },
        { type: "bullet", text: "CLI for fast local work, scripts, Git, and terminal-native workflows." },
        { type: "bullet", text: "IDE for changes closely tied to the file or selection in view." },
        { type: "bullet", text: "App for longer tasks, visual review, and coordinating parallel work." },
        { type: "bullet", text: "Cloud for delegated work in a prepared, isolated environment." },
        { type: "h2", text: "Codex alongside Cursor, Windsurf, or your IDE" },
        { type: "p", text: "You do not need to choose a single tool. Use Cursor, Windsurf, or your IDE for localized edits, visual navigation, and small refactors. Use Codex when you need to traverse a repository, run commands, review Git, automate checks, or complete a whole task with evidence." },
        { type: "p", text: "Practical rule: if the context fits on one screen, the IDE works well; if the context lives across files, commands, logs, and commits, Codex usually gives you more operational control." },
        { type: "h2", text: "First check" },
        { type: "p", text: "Start with a read-only request: “Summarize the architecture, tell me how tests run, and do not edit files.” Confirm that Codex identifies the language, package manager, and Git state correctly." },
      ],
    },
    practice: practice({
      build: { es: "Un entorno Codex funcional y una primera sesión de solo lectura.", en: "A working Codex setup and a first read-only session." },
      why: { es: "Antes de delegar cambios necesitas saber qué superficie usar, qué permisos están activos y cómo comprobar la instalación.", en: "Before delegating changes you need to know which surface to use, which permissions are active, and how to verify the setup." },
      starter: { es: "Cualquier repositorio pequeño con Git inicializado. Si no tienes uno, crea una carpeta vacía con README.md.", en: "Any small Git repository. If you do not have one, create an empty folder with README.md." },
      steps: { es: ["Instala Codex CLI.", "Comprueba la versión.", "Abre Codex dentro del repositorio.", "Ejecuta /status, /permissions y /model.", "Pide un análisis sin editar archivos."], en: ["Install Codex CLI.", "Check the version.", "Open Codex inside the repository.", "Run /status, /permissions, and /model.", "Ask for analysis without edits."] },
      codexPrompt: { es: "Resume la arquitectura de este repositorio, dime cómo se ejecutan los tests y no cambies archivos. Cita rutas concretas y separa hechos observados de inferencias.", en: "Summarize this repository's architecture, tell me how tests run, and do not edit files. Cite concrete paths and separate observed facts from inferences." },
      expected: { es: "Codex identifica el tipo de proyecto, comandos probables y límites de lo que todavía no ha inspeccionado.", en: "Codex identifies the project type, likely commands, and boundaries of what it has not inspected yet." },
      verify: "codex --version && git status --short",
      manualCheck: { es: "Confirma que no aparecen cambios en git status después del análisis.", en: "Confirm that git status shows no changes after the analysis." },
      commonError: { es: "Abrir Codex fuera del repositorio. Solución: entra primero en la carpeta raíz del proyecto.", en: "Opening Codex outside the repository. Fix: cd into the project root first." },
      exercise: { es: "Abre una segunda sesión y pide el mismo análisis limitándolo a una carpeta concreta.", en: "Open a second session and request the same analysis limited to one specific folder." },
      solution: { es: "Usa un prompt con alcance explícito: «Céntrate solo en app/ y di qué partes no has leído».", en: "Use explicit scope: “Focus only on app/ and state which parts you did not read.”" },
      evidence: { es: "Guarda versión de Codex, salida de /status y git status limpio.", en: "Save Codex version, /status output, and clean git status." },
      sources: [{ label: "OpenAI Codex", href: "https://developers.openai.com/codex" }],
      tested: "2026-07-12",
    }),
  },
  {
    slug: "explorar-repositorio",
    title: { es: "Explora un repositorio sin perderte", en: "Explore a repository without getting lost" },
    lead: {
      es: "Usa Codex para construir un mapa verificable del código antes de pedir cambios.",
      en: "Use Codex to build a verifiable map of the code before requesting changes.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Empieza por preguntas, no por cambios" },
        { type: "p", text: "En un repositorio desconocido, la primera tarea debe reducir incertidumbre. Pide rutas, símbolos y comandos concretos para poder comprobar cada afirmación." },
        { type: "code", text: "Analiza este repositorio sin editar archivos. Identifica:\n1. punto de entrada\n2. módulos principales\n3. flujo de una petición\n4. pruebas y comandos de validación\n5. tres riesgos técnicos\nCita archivos y líneas." },
        { type: "h2", text: "Sigue un flujo real" },
        { type: "p", text: "Una lista de carpetas no explica un sistema. Elige un comportamiento visible y pide a Codex que siga el recorrido desde la interfaz o endpoint hasta datos, efectos secundarios y tests." },
        { type: "bullet", text: "¿Dónde se valida la entrada?" },
        { type: "bullet", text: "¿Qué contrato une los módulos?" },
        { type: "bullet", text: "¿Dónde se transforma o persiste el dato?" },
        { type: "bullet", text: "¿Qué prueba fallaría si cambia este comportamiento?" },
        { type: "h2", text: "Repos grandes, monorepos y multi-repo" },
        { type: "p", text: "En un monorepo no pidas «entiende todo». Pide primero el mapa de workspaces, paquetes, comandos y dependencias internas. Después baja a una ruta concreta y exige que Codex diga qué no ha inspeccionado." },
        { type: "code", text: "Analiza este monorepo sin editar. Devuelve:\n- workspaces o paquetes detectados\n- comando para instalar y probar cada paquete relevante\n- dependencias internas del paquete que voy a tocar\n- límites de lo que no has leído\nDespués céntrate solo en packages/web." },
        { type: "p", text: "Si la tarea cruza varios repositorios, trabaja por contratos: API, eventos, esquema, paquete publicado o documentación versionada. No dejes que Codex parchee dos repos a la vez sin una verificación independiente en cada uno." },
        { type: "h2", text: "Haz que enseñe evidencia" },
        { type: "p", text: "Pide que diferencie hechos observados de inferencias. Si falta una prueba, que lo diga. Esa disciplina reduce respuestas plausibles pero incorrectas." },
        { type: "h2", text: "Ejercicio" },
        { type: "p", text: "Escoge una funcionalidad pequeña, obtén su mapa y verifica manualmente dos referencias. Guarda el resumen en tus notas, no dentro del repositorio salvo que el equipo quiera documentación nueva." },
      ],
      en: [
        { type: "h2", text: "Ask before changing" },
        { type: "p", text: "In an unfamiliar repository, the first task should reduce uncertainty. Ask for concrete paths, symbols, and commands so every claim can be checked." },
        { type: "code", text: "Analyze this repository without editing files. Identify:\n1. entry point\n2. main modules\n3. one request flow\n4. tests and validation commands\n5. three technical risks\nCite files and lines." },
        { type: "h2", text: "Trace real behavior" },
        { type: "p", text: "A folder list does not explain a system. Pick visible behavior and ask Codex to trace it from the UI or endpoint through data, side effects, and tests." },
        { type: "bullet", text: "Where is input validated?" },
        { type: "bullet", text: "Which contract connects the modules?" },
        { type: "bullet", text: "Where is data transformed or persisted?" },
        { type: "bullet", text: "Which test would fail if this behavior changed?" },
        { type: "h2", text: "Large repositories, monorepos, and multi-repo work" },
        { type: "p", text: "In a monorepo, do not ask “understand everything.” First request the map of workspaces, packages, commands, and internal dependencies. Then narrow to one path and require Codex to say what it did not inspect." },
        { type: "code", text: "Analyze this monorepo without editing. Return:\n- detected workspaces or packages\n- install and test command for each relevant package\n- internal dependencies of the package I will touch\n- boundaries of what you did not read\nThen focus only on packages/web." },
        { type: "p", text: "If work crosses several repositories, work through contracts: API, events, schema, published package, or versioned documentation. Do not let Codex patch two repos at once without independent verification in each." },
        { type: "h2", text: "Require evidence" },
        { type: "p", text: "Ask Codex to separate observed facts from inferences and to state when evidence is missing. This reduces plausible but incorrect answers." },
        { type: "h2", text: "Exercise" },
        { type: "p", text: "Choose one small feature, obtain its map, and manually verify two references. Keep the summary in your notes unless the team explicitly wants new repository documentation." },
      ],
    },
  },
  {
    slug: "pedir-cambios",
    title: { es: "Pide cambios que se puedan verificar", en: "Request changes that can be verified" },
    lead: {
      es: "Convierte una idea ambigua en un encargo con alcance, restricciones y definición de terminado.",
      en: "Turn an ambiguous idea into a task with scope, constraints, and a definition of done." },
    blocks: {
      es: [
        { type: "h2", text: "La anatomía de un buen encargo" },
        { type: "bullet", text: "Objetivo: qué comportamiento debe cambiar para el usuario." },
        { type: "bullet", text: "Contexto: dónde ocurre y qué patrón existente debe seguir." },
        { type: "bullet", text: "Límites: archivos, compatibilidad, seguridad y cosas que no debe tocar." },
        { type: "bullet", text: "Verificación: tests, build y comprobación visual esperados." },
        { type: "code", text: "Añade búsqueda por título al catálogo. Reutiliza el estilo y los datos actuales. No añadas dependencias ni cambies las URLs. Incluye estado sin resultados, navegación con teclado y una prueba. Ejecuta lint, tests y build; resume los archivos modificados." },
        { type: "h2", text: "Casos límite desde el encargo" },
        { type: "p", text: "Si no nombras los casos límite, el agente tenderá a optimizar el camino feliz. Añade dos o tres bordes relevantes: datos vacíos, permisos, móvil, errores de red, idioma, accesibilidad, concurrencia o migraciones." },
        { type: "code", text: "Casos límite obligatorios:\n- catálogo vacío: muestra estado claro\n- búsqueda con tildes y mayúsculas: debe encontrar resultados\n- móvil estrecho: el input no tapa las tarjetas\n- sin JavaScript durante carga: no romper navegación básica" },
        { type: "h2", text: "Divide por riesgo" },
        { type: "p", text: "Una tarea pequeña puede ejecutarse directamente. Para una migración o cambio transversal, pide primero análisis y plan, revisa las decisiones y después autoriza la implementación." },
        { type: "h2", text: "Corrige el rumbo con precisión" },
        { type: "p", text: "Evita «no me gusta». Señala el comportamiento observado, el esperado y una referencia del proyecto: «El filtro reinicia el scroll; conserva la posición como hace la lista de favoritos»." },
        { type: "h2", text: "Definición de terminado" },
        { type: "p", text: "Una respuesta convincente no basta. La tarea termina cuando el cambio está acotado, las verificaciones pasan y Codex explica cualquier riesgo o prueba que no pudo ejecutar." },
      ],
      en: [
        { type: "h2", text: "Anatomy of a strong request" },
        { type: "bullet", text: "Goal: which user-visible behavior must change." },
        { type: "bullet", text: "Context: where it happens and which existing pattern to follow." },
        { type: "bullet", text: "Boundaries: files, compatibility, security, and areas to leave untouched." },
        { type: "bullet", text: "Verification: expected tests, build, and visual checks." },
        { type: "code", text: "Add title search to the catalog. Reuse the current styling and data. Do not add dependencies or change URLs. Include an empty state, keyboard navigation, and a test. Run lint, tests, and build; summarize modified files." },
        { type: "h2", text: "Edge cases in the request" },
        { type: "p", text: "If you do not name edge cases, the agent tends to optimize the happy path. Add two or three relevant edges: empty data, permissions, mobile, network errors, language, accessibility, concurrency, or migrations." },
        { type: "code", text: "Required edge cases:\n- empty catalog: show a clear state\n- search with accents and uppercase: must find results\n- narrow mobile: input must not cover cards\n- during JavaScript loading: basic navigation must not break" },
        { type: "h2", text: "Split work by risk" },
        { type: "p", text: "A small task can be implemented directly. For migrations or cross-cutting changes, request analysis and a plan first, review the decisions, and then authorize implementation." },
        { type: "h2", text: "Correct course precisely" },
        { type: "p", text: "Avoid “I do not like it.” State observed behavior, expected behavior, and a project reference: “The filter resets scroll; preserve position as the favorites list does.”" },
        { type: "h2", text: "Definition of done" },
        { type: "p", text: "A convincing response is not enough. Work is done when the change is scoped, checks pass, and Codex explains any risk or verification it could not complete." },
      ],
    },
  },
  {
    slug: "agents-md",
    title: { es: "Enseña el repositorio con AGENTS.md", en: "Teach the repository with AGENTS.md" },
    lead: {
      es: "Guarda las reglas duraderas del proyecto para que cada tarea empiece con el contexto correcto.",
      en: "Store durable project rules so every task starts with the right context." },
    blocks: {
      es: [
        { type: "h2", text: "Qué debe contener" },
        { type: "p", text: "AGENTS.md sirve para convenciones estables del repositorio: arquitectura, comandos, estilo, límites y verificación. No lo conviertas en una enciclopedia ni guardes secretos." },
        { type: "code", text: "# AGENTS.md\n## Arquitectura\n- app/ contiene rutas; lib/ contiene datos compartidos.\n## Comandos\n- npm run lint\n- npm test\n- npm run build\n## Convenciones\n- Sigue los componentes existentes.\n- No añadas dependencias sin justificarlo.\n## Verificación\n- Prueba móvil y escritorio en cambios de UI." },
        { type: "h2", text: "Jerarquía por carpetas" },
        { type: "p", text: "Las instrucciones más cercanas al archivo tienen prioridad. Un AGENTS.md en la raíz define reglas generales y otro dentro de un módulo puede precisar comandos o convenciones de ese ámbito." },
        { type: "h2", text: "Créalo y audítalo" },
        { type: "p", text: "El comando /init puede crear un punto de partida. Después debes revisarlo como código: elimina vaguedades, confirma comandos y mantén el documento corto." },
        { type: "code", text: "/init\n\nLee todos los AGENTS.md aplicables y resume las reglas que gobernarán esta tarea antes de editar." },
        { type: "h2", text: "Señal de calidad" },
        { type: "p", text: "Una persona nueva debería poder ejecutar el proyecto y validar un cambio leyendo el archivo. Si una regla solo aplica a una tarea, déjala en el prompt y no la conviertas en norma permanente." },
      ],
      en: [
        { type: "h2", text: "What belongs in it" },
        { type: "p", text: "AGENTS.md stores stable repository conventions: architecture, commands, style, boundaries, and verification. Do not turn it into an encyclopedia or store secrets in it." },
        { type: "code", text: "# AGENTS.md\n## Architecture\n- app/ contains routes; lib/ contains shared data.\n## Commands\n- npm run lint\n- npm test\n- npm run build\n## Conventions\n- Follow existing components.\n- Do not add dependencies without justification.\n## Verification\n- Check mobile and desktop for UI changes." },
        { type: "h2", text: "Folder hierarchy" },
        { type: "p", text: "Instructions closest to a file take precedence. A root AGENTS.md defines general rules, while one inside a module can refine commands or conventions for that scope." },
        { type: "h2", text: "Create and audit it" },
        { type: "p", text: "The /init command can create a starting point. Review it like code: remove vague statements, verify commands, and keep the document concise." },
        { type: "code", text: "/init\n\nRead every applicable AGENTS.md and summarize the rules that govern this task before editing." },
        { type: "h2", text: "Quality signal" },
        { type: "p", text: "A new teammate should be able to run the project and validate a change from this file. If a rule applies to one task only, keep it in the prompt instead of making it permanent." },
      ],
    },
  },
  {
    slug: "implementar-verificar",
    title: { es: "Implementa, prueba y revisa la interfaz", en: "Implement, test, and review the interface" },
    lead: {
      es: "Haz que Codex cierre el ciclo completo: entender, editar, validar y mostrar evidencia.",
      en: "Have Codex close the full loop: understand, edit, validate, and show evidence." },
    blocks: {
      es: [
        { type: "h2", text: "El bucle profesional" },
        { type: "bullet", text: "Inspeccionar patrones y pruebas cercanas." },
        { type: "bullet", text: "Implementar el cambio mínimo que cumple el objetivo." },
        { type: "bullet", text: "Ejecutar primero pruebas focalizadas y después controles amplios." },
        { type: "bullet", text: "Revisar el diff y comprobar el comportamiento real." },
        { type: "code", text: "Implementa el cambio. Después ejecuta la prueba más cercana, lint y build. Si hay interfaz, abre la app y comprueba el flujo en móvil y escritorio. No des por terminado el trabajo si una verificación falla." },
        { type: "h2", text: "Tests con intención" },
        { type: "p", text: "No pidas cobertura por inercia. Pide una prueba que falle antes del arreglo y proteja el comportamiento importante: permisos, estados vacíos, errores de red, límites o accesibilidad." },
        { type: "h2", text: "La UI se mira" },
        { type: "p", text: "El build no detecta texto cortado, solapamientos ni una interacción confusa. En cambios visuales, Codex debe ejecutar la app, recorrer el flujo y comprobar tamaños representativos." },
        { type: "h2", text: "Evidencia final" },
        { type: "p", text: "La entrega debe indicar qué cambió, qué comandos pasaron y qué no se pudo comprobar. Una captura o un resultado de test ayuda; una afirmación sin ejecución, no." },
      ],
      en: [
        { type: "h2", text: "The professional loop" },
        { type: "bullet", text: "Inspect nearby patterns and tests." },
        { type: "bullet", text: "Implement the smallest change that meets the goal." },
        { type: "bullet", text: "Run focused tests first, then broader checks." },
        { type: "bullet", text: "Review the diff and verify real behavior." },
        { type: "code", text: "Implement the change. Then run the nearest test, lint, and build. For UI work, open the app and check the flow on mobile and desktop. Do not call the task complete while a verification is failing." },
        { type: "h2", text: "Tests with intent" },
        { type: "p", text: "Do not request coverage by habit. Ask for a test that would fail before the fix and protects important behavior such as permissions, empty states, network errors, limits, or accessibility." },
        { type: "h2", text: "Look at the UI" },
        { type: "p", text: "A successful build cannot detect clipped text, overlap, or confusing interaction. For visual changes, Codex should run the app, walk through the flow, and check representative viewport sizes." },
        { type: "h2", text: "Final evidence" },
        { type: "p", text: "The handoff should state what changed, which commands passed, and what could not be checked. A screenshot or test result is evidence; an unexecuted claim is not." },
      ],
    },
  },
  {
    slug: "git-revision",
    title: { es: "Trabaja con Git y revisa cambios", en: "Work with Git and review changes" },
    lead: {
      es: "Mantén commits comprensibles y usa Codex como revisor antes de publicar código.",
      en: "Keep commits understandable and use Codex as a reviewer before publishing code." },
    blocks: {
      es: [
        { type: "h2", text: "Empieza con un árbol conocido" },
        { type: "p", text: "Antes de editar, revisa git status y deja claro que no debe revertir cambios ajenos. En repositorios compartidos, una rama o worktree por tarea reduce colisiones." },
        { type: "code", text: "git status --short\ngit diff --stat\n\nConserva cualquier cambio existente que no pertenezca a esta tarea. Si afecta al mismo archivo, intégralo sin sobrescribirlo." },
        { type: "h2", text: "Revisa como un mantenedor" },
        { type: "p", text: "Usa /review o pide una revisión explícita. Una buena revisión prioriza fallos de comportamiento, seguridad, regresiones y pruebas ausentes; el estilo va después." },
        { type: "code", text: "/review\n\nRevisa el diff frente a main. Enumera hallazgos por gravedad con archivo y línea. Busca regresiones, casos límite, seguridad y tests ausentes." },
        { type: "h2", text: "Commits con una idea" },
        { type: "p", text: "Pide a Codex que compruebe el diff que va a incluir, ejecute validaciones y redacte un mensaje que describa el resultado. No mezcles arreglos sin relación en el mismo commit." },
        { type: "h2", text: "Antes del push" },
        { type: "bullet", text: "El autor de Git usa un email aceptado por el proveedor remoto." },
        { type: "bullet", text: "No hay secretos, artefactos pesados ni archivos accidentales." },
        { type: "bullet", text: "El commit contiene solo el alcance revisado y las pruebas relevantes pasan." },
      ],
      en: [
        { type: "h2", text: "Start from a known tree" },
        { type: "p", text: "Before editing, inspect git status and state that unrelated changes must be preserved. In shared repositories, one branch or worktree per task reduces collisions." },
        { type: "code", text: "git status --short\ngit diff --stat\n\nPreserve existing changes that do not belong to this task. If they touch the same file, integrate with them without overwriting them." },
        { type: "h2", text: "Review like a maintainer" },
        { type: "p", text: "Use /review or request an explicit review. A useful review prioritizes behavior bugs, security, regressions, and missing tests; style comes later." },
        { type: "code", text: "/review\n\nReview the diff against main. List findings by severity with file and line. Look for regressions, edge cases, security issues, and missing tests." },
        { type: "h2", text: "One idea per commit" },
        { type: "p", text: "Ask Codex to inspect the staged scope, run checks, and draft a message describing the outcome. Do not mix unrelated fixes in the same commit." },
        { type: "h2", text: "Before pushing" },
        { type: "bullet", text: "The Git author uses an email accepted by the remote provider." },
        { type: "bullet", text: "No secrets, large artifacts, or accidental files are included." },
        { type: "bullet", text: "The commit contains only the reviewed scope and relevant checks pass." },
      ],
    },
  },
  {
    slug: "higiene-repositorio-agentes",
    title: {
      es: "Higiene de repositorios: elimina redundancia sin romper comportamiento",
      en: "Repository hygiene: remove redundancy without breaking behavior",
    },
    lead: {
      es: "Convierte una refactorización vaga en un trabajo medible: línea base, alcance, eliminaciones justificadas, pruebas y diff final.",
      en: "Turn a vague refactor into measurable work: baseline, scope, justified deletions, tests, and a final diff.",
    },
    blocks: {
      es: [
        { type: "h2", text: "El problema no es que el agente escriba mucho" },
        { type: "p", text: "El problema aparece cuando cada iteración añade otra capa sin retirar la anterior: wrappers que solo delegan, alias legados sin consumidores, validaciones duplicadas y exports que agrandan el contrato público. Un repositorio puede seguir con tests verdes y, aun así, costar más entenderlo y cambiarlo." },
        { type: "p", text: "Una publicación de X detectada por el radar de Aulafy sirvió como señal de esta preocupación. La solución técnica de la lección procede de documentación oficial y de un laboratorio reproducible; una experiencia social no demuestra por sí sola que una herramienta cause deuda." },
        { type: "h2", text: "Cinco puertas para una refactorización segura" },
        { type: "bullet", text: "Línea base: ejecuta las pruebas y registra el estado de Git antes de editar." },
        { type: "bullet", text: "Contrato: identifica imports, exports, efectos y salidas que deben conservarse." },
        { type: "bullet", text: "Presupuesto: limita archivos y prohíbe nuevas dependencias o abstracciones innecesarias." },
        { type: "bullet", text: "Prueba: exige comportamiento verde y una auditoría estructural separada." },
        { type: "bullet", text: "Diff: explica cada eliminación y comprueba que no se tocaron pruebas para ocultar una regresión." },
        { type: "code", text: "git status --short\ngit diff --stat\nnpm test\n\n# Después del cambio\nnpm test\nnpm run auditar\ngit diff --numstat -- src/tasks.mjs\ngit diff -- src/tasks.mjs" },
        { type: "h2", text: "Tests verdes no significan repositorio limpio" },
        { type: "p", text: "Las pruebas de comportamiento responden «¿sigue funcionando?». Una auditoría estructural puede responder «¿retiramos los wrappers acordados?» o «¿la API pública conserva el tamaño previsto?». Necesitas ambas señales: una métrica de líneas aislada puede premiar código comprimido y una suite aislada puede ignorar código muerto." },
        { type: "h2", text: "Qué pedir al agente" },
        { type: "p", text: "La guía oficial de Codex recomienda declarar objetivo, contexto, restricciones y qué significa terminado; también pide ejecutar controles y revisar el diff. La documentación de Claude Code coincide en dar al agente una forma de verificar su trabajo y mantener las instrucciones de proyecto concisas." },
        { type: "code", text: "Objetivo: elimina wrappers redundantes sin alterar la API cubierta por tests.\nContexto: lee AGENTS.md, src/tasks.mjs y test/tasks.test.mjs.\nLímites: modifica solo src/tasks.mjs; no cambies pruebas ni package.json; no añadas dependencias ni nuevas abstracciones.\nTerminado cuando: npm test y npm run auditar pasan; el diff tiene más eliminaciones que adiciones; explica cada eliminación y cualquier riesgo restante." },
        { type: "h2", text: "Cómo revisar el resultado" },
        { type: "bullet", text: "Rechaza cambios en pruebas que solo adapten la expectativa a una regresión." },
        { type: "bullet", text: "Busca nuevos nombres para la misma abstracción antigua." },
        { type: "bullet", text: "Comprueba consumidores fuera del archivo antes de retirar un export real." },
        { type: "bullet", text: "No uses «menos líneas» como criterio único: legibilidad y contrato importan." },
        { type: "bullet", text: "Trabaja primero en un repositorio de práctica o una rama reversible." },
        { type: "h2", text: "Laboratorio MIT" },
        { type: "p", text: "El repositorio aulafy/taller contiene un estado inicial funcional pero redundante, una suite sin red ni dependencias, una auditoría que falla al principio y una solución de referencia. Así puedes repetir el proceso con Codex, Claude Code o manualmente y comparar el mismo resultado." },
      ],
      en: [
        { type: "h2", text: "The problem is not that the agent writes a lot" },
        { type: "p", text: "The problem starts when every iteration adds a layer without removing the previous one: forwarding wrappers, unused legacy aliases, duplicate validation, and exports that enlarge the public contract. Tests may remain green while the repository becomes harder to understand and change." },
        { type: "p", text: "A post detected by Aulafy's X radar was used only as a demand signal. The technical method comes from official documentation and a reproducible lab; a social report alone does not prove that a tool causes technical debt." },
        { type: "h2", text: "Five gates for a safe refactor" },
        { type: "bullet", text: "Baseline: run tests and record Git state before editing." },
        { type: "bullet", text: "Contract: identify imports, exports, effects, and outputs that must remain." },
        { type: "bullet", text: "Budget: limit files and forbid unnecessary dependencies or abstractions." },
        { type: "bullet", text: "Evidence: require green behavior tests and a separate structural audit." },
        { type: "bullet", text: "Diff: explain every deletion and confirm tests were not weakened to hide a regression." },
        { type: "code", text: "git status --short\ngit diff --stat\nnpm test\n\n# After the change\nnpm test\nnpm run auditar\ngit diff --numstat -- src/tasks.mjs\ngit diff -- src/tasks.mjs" },
        { type: "h2", text: "Green tests do not mean a clean repository" },
        { type: "p", text: "Behavior tests answer “does it still work?”. A structural audit can answer “were the agreed wrappers removed?” or “did the public API stay within its budget?”. You need both signals: line count alone can reward compressed code, while a suite alone may ignore dead code." },
        { type: "h2", text: "What to ask the agent" },
        { type: "p", text: "Official Codex guidance recommends stating the goal, context, constraints, and definition of done, then running checks and reviewing the diff. Claude Code documentation likewise recommends giving the agent a way to verify its work and keeping project instructions concise." },
        { type: "code", text: "Goal: remove redundant wrappers without changing the API covered by tests.\nContext: read AGENTS.md, src/tasks.mjs, and test/tasks.test.mjs.\nBoundaries: edit only src/tasks.mjs; do not change tests or package.json; add no dependency or abstraction.\nDone when: npm test and npm run auditar pass; the diff deletes more than it adds; explain every deletion and remaining risk." },
        { type: "h2", text: "Review the result" },
        { type: "bullet", text: "Reject test edits that merely adapt expectations to a regression." },
        { type: "bullet", text: "Look for new names hiding the same old abstraction." },
        { type: "bullet", text: "Check consumers outside the file before removing a real export." },
        { type: "bullet", text: "Do not use fewer lines as the only criterion: readability and contract matter." },
        { type: "bullet", text: "Start in a training repository or reversible branch." },
        { type: "h2", text: "MIT lab" },
        { type: "p", text: "The aulafy/taller repository provides a working but redundant baseline, a dependency-free test suite, an audit that intentionally fails at first, and a reference solution. You can repeat the same exercise with Codex, Claude Code, or manually." },
      ],
    },
    practice: practice({
      build: {
        es: "Una refactorización pequeña que reduce una API de seis a tres funciones sin cambiar ninguna salida probada.",
        en: "A small refactor that reduces an API from six functions to three without changing any tested output.",
      },
      why: {
        es: "Aprenderás a exigir eliminaciones justificadas y evidencia, en lugar de aceptar código nuevo porque el agente afirma que está limpio.",
        en: "You will require justified deletions and evidence instead of accepting new code merely because the agent calls it clean.",
      },
      starter: {
        es: "Clona aulafy/taller y abre cursos/codex-programadores/laboratorios/higiene-repositorio-agentes. Los datos son sintéticos y no hay dependencias.",
        en: "Clone aulafy/taller and open cursos/codex-programadores/laboratorios/higiene-repositorio-agentes. It uses synthetic data and no dependencies.",
      },
      steps: {
        es: [
          "Ejecuta npm test y confirma que las tres pruebas pasan.",
          "Ejecuta npm run auditar y conserva el fallo inicial esperado.",
          "Entrega a Codex el encargo acotado de la lección.",
          "Ejecuta de nuevo pruebas y auditoría sin modificar la suite.",
          "Lee git diff --numstat y el diff completo; justifica cada eliminación.",
        ],
        en: [
          "Run npm test and confirm all three tests pass.",
          "Run npm run auditar and preserve the expected initial failure.",
          "Give Codex the bounded task from this lesson.",
          "Run tests and the audit again without editing the suite.",
          "Read git diff --numstat and the full diff; justify every deletion.",
        ],
      },
      codexPrompt: {
        es: "Objetivo: reduce la redundancia de src/tasks.mjs sin cambiar comportamiento. Lee AGENTS.md y las pruebas. Modifica solo src/tasks.mjs; no cambies tests ni package.json; no añadas dependencias o abstracciones. Termina solo cuando npm test y npm run auditar pasen. Revisa el diff, explica cada eliminación y señala riesgos.",
        en: "Goal: reduce redundancy in src/tasks.mjs without changing behavior. Read AGENTS.md and the tests. Edit only src/tasks.mjs; do not change tests or package.json; add no dependencies or abstractions. Finish only when npm test and npm run auditar pass. Review the diff, explain each deletion, and state risks.",
      },
      expected: {
        es: "Tres funciones públicas, las mismas salidas, tres pruebas verdes y una auditoría estructural superada.",
        en: "Three public functions, identical outputs, three green tests, and a passing structural audit.",
      },
      verify: "npm test && npm run auditar && git diff --numstat -- src/tasks.mjs",
      manualCheck: {
        es: "Comprueba que solo cambió src/tasks.mjs, que no se debilitaron pruebas y que el resultado es más legible, no solo más corto.",
        en: "Confirm only src/tasks.mjs changed, no tests were weakened, and the result is clearer rather than merely shorter.",
      },
      commonError: {
        es: "Pedir «limpia todo el repo» produce cambios difíciles de atribuir. Limita archivo, contrato y verificaciones antes de ejecutar.",
        en: "Asking to “clean the whole repo” produces changes that are hard to attribute. Bound the file, contract, and checks first.",
      },
      exercise: {
        es: "Añade primero una prueba para owner vacío y repite la refactorización; decide si el valor por defecto pertenece a createTask o normalizeText.",
        en: "First add a test for an empty owner and repeat the refactor; decide whether the default belongs in createTask or normalizeText.",
      },
      solution: {
        es: "Conserva normalizeText, createTask y formatTask. Llama directamente a normalizeText desde createTask y retira los tres wrappers sin consumidores.",
        en: "Keep normalizeText, createTask, and formatTask. Call normalizeText directly from createTask and remove the three unconsumed wrappers.",
      },
      evidence: {
        es: "Guarda salidas antes y después, el fallo inicial de auditoría, el diff numérico, el diff completo y una explicación de las tres eliminaciones.",
        en: "Save before-and-after output, the initial audit failure, numeric diff, full diff, and an explanation of the three deletions.",
      },
      sources: [
        { label: "OpenAI · Codex best practices", href: "https://learn.chatgpt.com/guides/best-practices" },
        { label: "Anthropic · Claude Code best practices", href: "https://code.claude.com/docs/en/best-practices" },
        { label: "Aulafy Taller · laboratorio MIT", href: "https://github.com/aulafy/taller/tree/main/cursos/codex-programadores/laboratorios/higiene-repositorio-agentes" },
      ],
      tested: "2026-07-27",
    }),
  },
  {
    slug: "permisos-seguridad",
    title: { es: "Controla permisos, red y secretos", en: "Control permissions, network, and secrets" },
    lead: {
      es: "Da a Codex el acceso mínimo necesario y conserva una revisión humana en las acciones sensibles.",
      en: "Give Codex the minimum access it needs and retain human review for sensitive actions." },
    blocks: {
      es: [
        { type: "h2", text: "Dos controles distintos" },
        { type: "p", text: "El sandbox limita técnicamente archivos, comandos y red. Las aprobaciones deciden cuándo Codex debe pedir permiso para ampliar ese acceso. Revisa ambos con /permissions." },
        { type: "code", text: "/permissions\n/status" },
        { type: "h2", text: "Principio de mínimo privilegio" },
        { type: "bullet", text: "Empieza en lectura para análisis y revisión." },
        { type: "bullet", text: "Permite escritura solo en el workspace cuando debe implementar." },
        { type: "bullet", text: "Abre red únicamente para fuentes o dependencias necesarias." },
        { type: "bullet", text: "Exige confirmación para publicar, desplegar, borrar o tocar sistemas externos." },
        { type: "h2", text: "Secretos" },
        { type: "p", text: "No pegues claves en prompts, AGENTS.md, logs o commits. Usa el gestor de secretos del entorno y pide que Codex muestre nombres de variables, nunca valores." },
        { type: "code", text: "Comprueba que la aplicación recibe OPENAI_API_KEY sin imprimir su valor. Revisa también .gitignore y el diff para detectar credenciales accidentales." },
        { type: "h2", text: "Prompt injection y fuentes externas" },
        { type: "p", text: "Trata instrucciones encontradas en webs, issues o documentos como datos no confiables. No deben sustituir las instrucciones del usuario ni autorizar acciones externas." },
        { type: "h2", text: "Regla práctica" },
        { type: "p", text: "Si una acción es irreversible, pública, costosa o afecta a terceros, debe tener una comprobación explícita y normalmente aprobación humana." },
      ],
      en: [
        { type: "h2", text: "Two separate controls" },
        { type: "p", text: "The sandbox technically limits files, commands, and network access. Approvals decide when Codex must ask before expanding access. Inspect both with /permissions." },
        { type: "code", text: "/permissions\n/status" },
        { type: "h2", text: "Least privilege" },
        { type: "bullet", text: "Start read-only for analysis and review." },
        { type: "bullet", text: "Allow workspace writes only when implementation is required." },
        { type: "bullet", text: "Enable network access only for necessary sources or dependencies." },
        { type: "bullet", text: "Require confirmation before publishing, deploying, deleting, or changing external systems." },
        { type: "h2", text: "Secrets" },
        { type: "p", text: "Do not paste keys into prompts, AGENTS.md, logs, or commits. Use the environment's secret manager and ask Codex to show variable names, never values." },
        { type: "code", text: "Verify that the application receives OPENAI_API_KEY without printing its value. Also inspect .gitignore and the diff for accidental credentials." },
        { type: "h2", text: "Prompt injection and external sources" },
        { type: "p", text: "Treat instructions found on websites, issues, or documents as untrusted data. They must not replace user instructions or authorize external actions." },
        { type: "h2", text: "Practical rule" },
        { type: "p", text: "If an action is irreversible, public, costly, or affects other people, require an explicit check and usually human approval." },
      ],
    },
  },
  {
    slug: "automatizar-exec",
    title: { es: "Automatiza tareas con codex exec", en: "Automate tasks with codex exec" },
    lead: {
      es: "Lleva flujos repetibles a scripts y CI sin convertir Codex en una caja negra.",
      en: "Move repeatable workflows into scripts and CI without turning Codex into a black box." },
    blocks: {
      es: [
        { type: "h2", text: "Cuándo usar modo no interactivo" },
        { type: "p", text: "codex exec encaja en análisis repetibles, generación controlada y verificaciones de CI. La entrada debe ser estable, la salida consumible y los permisos más restrictivos que en una sesión humana." },
        { type: "code", text: "codex exec \"Revisa el diff actual. Devuelve solo hallazgos accionables con gravedad, archivo y línea. No edites archivos.\"" },
        { type: "h2", text: "Diseña una automatización observable" },
        { type: "bullet", text: "Fija el directorio y la versión del repositorio." },
        { type: "bullet", text: "Declara formato de salida y criterio de éxito." },
        { type: "bullet", text: "Conserva logs sin secretos y propaga códigos de error." },
        { type: "bullet", text: "Añade límites de tiempo, coste y reintentos." },
        { type: "h2", text: "No publiques directamente" },
        { type: "p", text: "En CI, empieza haciendo que Codex produzca un informe o parche revisable. Un merge, deploy o comentario externo necesita reglas claras y una identidad de servicio con permisos mínimos." },
        { type: "h2", text: "Ejercicio" },
        { type: "p", text: "Crea un script local que revise el diff y guarde un informe. Pruébalo con un cambio bueno y uno defectuoso. Comprueba que el fallo sea visible y que no modifique el árbol de trabajo." },
      ],
      en: [
        { type: "h2", text: "When to use non-interactive mode" },
        { type: "p", text: "codex exec fits repeatable analysis, controlled generation, and CI checks. Inputs should be stable, outputs machine-consumable, and permissions stricter than in a human-driven session." },
        { type: "code", text: "codex exec \"Review the current diff. Return only actionable findings with severity, file, and line. Do not edit files.\"" },
        { type: "h2", text: "Design observable automation" },
        { type: "bullet", text: "Pin the working directory and repository revision." },
        { type: "bullet", text: "Declare the output format and success criteria." },
        { type: "bullet", text: "Keep secret-free logs and propagate failure codes." },
        { type: "bullet", text: "Add time, cost, and retry limits." },
        { type: "h2", text: "Do not publish directly" },
        { type: "p", text: "In CI, begin by producing a reviewable report or patch. Merges, deployments, and external comments require clear rules and a service identity with minimal permissions." },
        { type: "h2", text: "Exercise" },
        { type: "p", text: "Create a local script that reviews the diff and stores a report. Test it with one good change and one defective change. Confirm that failure is visible and the working tree remains untouched." },
      ],
    },
  },
  {
    slug: "proyecto-final",
    title: { es: "Proyecto final: entrega un cambio completo", en: "Final project: deliver a complete change" },
    lead: {
      es: "Aplica el flujo entero en una mejora pequeña: contexto, implementación, pruebas, revisión y entrega.",
      en: "Apply the full workflow to a small improvement: context, implementation, tests, review, and handoff." },
    blocks: {
      es: [
        { type: "h2", text: "El reto" },
        { type: "p", text: "Elige un repositorio con tests y añade una mejora acotada: un filtro, un estado vacío, una validación o un comando pequeño. Debe poder completarse y revisarse en una sesión." },
        { type: "h2", text: "Fase 1: entender" },
        { type: "code", text: "No edites todavía. Traza el comportamiento actual, localiza patrones y tests, lee las instrucciones del repositorio y propón un plan de máximo cinco pasos con riesgos." },
        { type: "h2", text: "Fase 2: construir" },
        { type: "code", text: "Implementa el plan aprobado con el cambio mínimo. Añade o ajusta una prueba que proteja el comportamiento. Conserva cambios ajenos y sigue las convenciones existentes." },
        { type: "h2", text: "Fase 3: verificar" },
        { type: "code", text: "Ejecuta pruebas focalizadas, lint y build. Comprueba manualmente el flujo si hay interfaz. Revisa el diff y corrige cualquier regresión antes de resumir." },
        { type: "h2", text: "Rúbrica" },
        { type: "bullet", text: "Alcance: el diff contiene solo la mejora solicitada." },
        { type: "bullet", text: "Corrección: la prueba protege el comportamiento y pasa." },
        { type: "bullet", text: "Calidad: el código encaja con el repositorio y no duplica soluciones." },
        { type: "bullet", text: "Seguridad: no aparecen secretos ni permisos innecesarios." },
        { type: "bullet", text: "Entrega: el resumen distingue hechos comprobados de riesgos pendientes." },
        { type: "h2", text: "Cierre" },
        { type: "p", text: "Termina con git status, diff, comandos ejecutados y una revisión propia. Solo entonces crea un commit con una idea clara. El objetivo no es generar más código, sino entregar un cambio que otro programador pueda confiar y mantener." },
      ],
      en: [
        { type: "h2", text: "The challenge" },
        { type: "p", text: "Choose a repository with tests and add one scoped improvement: a filter, empty state, validation, or small command. It should fit within one reviewable session." },
        { type: "h2", text: "Phase 1: understand" },
        { type: "code", text: "Do not edit yet. Trace current behavior, locate patterns and tests, read repository instructions, and propose a plan of at most five steps with risks." },
        { type: "h2", text: "Phase 2: build" },
        { type: "code", text: "Implement the approved plan with the smallest change. Add or adjust a test that protects the behavior. Preserve unrelated work and follow existing conventions." },
        { type: "h2", text: "Phase 3: verify" },
        { type: "code", text: "Run focused tests, lint, and build. Manually inspect the flow when UI is involved. Review the diff and fix regressions before summarizing." },
        { type: "h2", text: "Rubric" },
        { type: "bullet", text: "Scope: the diff contains only the requested improvement." },
        { type: "bullet", text: "Correctness: the test protects the behavior and passes." },
        { type: "bullet", text: "Quality: the code fits the repository and avoids duplicate solutions." },
        { type: "bullet", text: "Security: no secrets or unnecessary permissions appear." },
        { type: "bullet", text: "Handoff: the summary separates verified facts from remaining risks." },
        { type: "h2", text: "Finish" },
        { type: "p", text: "End with git status, the diff, executed commands, and a self-review. Only then create a commit with one clear idea. The goal is not more code, but a change another programmer can trust and maintain." },
      ],
    },
  },
];

export function getCodexLesson(slug: string) {
  return codexLessons.find((lesson) => lesson.slug === slug);
}

export function getCodexLessonPractice(lesson: CodexLessonContent): CodexLessonPractice {
  if (lesson.practice) return lesson.practice;
  return practice({
    build: {
      es: `Una evidencia práctica para "${lesson.title.es}" aplicada a un repositorio real o de entrenamiento.`,
      en: `Practical evidence for "${lesson.title.en}" applied to a real or training repository.`,
    },
    why: {
      es: "El objetivo es convertir la idea de la lección en una acción verificable, no solo en una lectura.",
      en: "The goal is to turn the lesson into a verifiable action, not just reading.",
    },
    starter: {
      es: "Un repositorio pequeño con Git, README y un comando de validación conocido.",
      en: "A small Git repository with Git, README, and one known validation command.",
    },
    steps: {
      es: [
        "Revisa el estado de Git antes de empezar.",
        "Pide a Codex que trabaje con alcance limitado.",
        "Ejecuta el comando de verificación.",
        "Revisa el diff o la evidencia producida.",
        "Anota qué queda comprobado y qué queda pendiente.",
      ],
      en: [
        "Inspect Git status before starting.",
        "Ask Codex to work with limited scope.",
        "Run the verification command.",
        "Review the diff or produced evidence.",
        "Record what is verified and what remains open.",
      ],
    },
    codexPrompt: {
      es: `Aplica la lección "${lesson.title.es}" en este repositorio. Trabaja con cambios pequeños, cita archivos concretos, ejecuta una verificación y termina con resumen de evidencias y riesgos.`,
      en: `Apply the lesson "${lesson.title.en}" in this repository. Work in small changes, cite concrete files, run one verification, and finish with evidence and risks.`,
    },
    expected: {
      es: "Una salida revisable: mapa, plan, diff, prueba o informe según el tipo de lección.",
      en: "A reviewable output: map, plan, diff, test, or report depending on the lesson.",
    },
    verify: "git status --short && git diff --stat",
    manualCheck: {
      es: "Comprueba que el resultado coincide con el alcance pedido y que Codex no ha tocado archivos ajenos.",
      en: "Check that the result matches the requested scope and Codex did not touch unrelated files.",
    },
    commonError: {
      es: "Pedir una tarea demasiado grande. Solución: limita la carpeta, el comportamiento y la verificación esperada.",
      en: "Requesting too much at once. Fix: limit the folder, behavior, and expected verification.",
    },
    exercise: {
      es: "Repite la práctica en otra carpeta del mismo repositorio cambiando solo una restricción.",
      en: "Repeat the practice in another folder of the same repository, changing only one constraint.",
    },
    solution: {
      es: "Mantén el mismo objetivo, añade una restricción explícita y compara si la evidencia final mejora.",
      en: "Keep the same goal, add one explicit constraint, and compare whether the final evidence improves.",
    },
    evidence: {
      es: "Guarda el prompt usado, comandos ejecutados, salida relevante y git diff --stat.",
      en: "Save the prompt, commands run, relevant output, and git diff --stat.",
    },
    sources: [{ label: "OpenAI Codex", href: "https://developers.openai.com/codex" }],
    tested: "2026-07-12",
  });
}
