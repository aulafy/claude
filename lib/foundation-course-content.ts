export type FoundationLessonBlock = {
  type: "h2" | "h3" | "p" | "bullet" | "code";
  text: string;
};

export type FoundationLessonContent = {
  slug: string;
  title: { es: string; en: string };
  lead: { es: string; en: string };
  blocks: { es: FoundationLessonBlock[]; en: FoundationLessonBlock[] };
};

export const foundationLessons: FoundationLessonContent[] = [
  {
    slug: "mapa-entorno",
    title: {
      es: "Mapa del entorno local-first",
      en: "Local-first environment map",
    },
    lead: {
      es: "Antes de instalar modelos, agentes o RAG, necesitas saber qué piezas forman un entorno de IA reproducible y privado.",
      en: "Before installing models, agents, or RAG, you need to understand the pieces that make an AI setup reproducible and private.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Por qué empezar aquí" },
        { type: "p", text: "Aulafy está pensado para construir con IA sin depender de una cuenta, una nube o una herramienta concreta. Eso exige una base mínima: terminal, Python, Git, entornos aislados, Docker y criterio para decidir qué corre en local y qué puede salir a una API externa." },
        { type: "p", text: "No necesitas ser administrador de sistemas. Sí necesitas poder repetir un proyecto mañana, explicarle a otra persona cómo arrancarlo y revisar qué cambió cuando la IA tocó archivos." },
        { type: "h2", text: "Las piezas del stack" },
        { type: "bullet", text: "Terminal: donde arrancas modelos, servidores, scripts y herramientas como Codex, Claude Code, Ollama o Docker." },
        { type: "bullet", text: "Python moderno: el pegamento para scripts, RAG, evals, automatizaciones y pruebas de modelos." },
        { type: "bullet", text: "Git: el historial de cambios, prompts, configuración y decisiones técnicas." },
        { type: "bullet", text: "Docker: la forma de levantar servicios como Qdrant, n8n, Open WebUI o bases de datos sin ensuciar tu ordenador." },
        { type: "bullet", text: "Modelos locales: útiles para privacidad, costes previsibles, tareas repetitivas y aprendizaje reproducible." },
        { type: "h2", text: "Regla de decisión local vs cloud" },
        { type: "p", text: "Usa local cuando el dato sea sensible, repetitivo, barato de procesar en tu máquina o cuando quieras aprender cómo funciona el sistema. Usa cloud cuando necesites máxima calidad, contexto enorme, razonamiento fuerte o integración que todavía no tienes local." },
        { type: "code", text: "decision:\n  datos_sensibles: local\n  prototipo_rapido: cloud_or_local\n  coste_repetitivo: local\n  maxima_calidad: frontier\n  aprendizaje_tecnico: local\n  produccion_hibrida: gateway_con_routing" },
        { type: "h2", text: "Entregable" },
        { type: "p", text: "Al terminar esta lección deberías poder dibujar tu stack: qué herramienta edita código, qué modelo responde, dónde viven los datos, cómo se versiona el proyecto y cómo se arranca de nuevo." },
      ],
      en: [
        { type: "h2", text: "Why start here" },
        { type: "p", text: "Aulafy is designed for building with AI without depending on one account, one cloud, or one tool. That requires a small foundation: terminal, Python, Git, isolated environments, Docker, and judgment about what runs locally and what can call an external API." },
        { type: "p", text: "You do not need to be a systems administrator. You do need to repeat a project tomorrow, explain how to run it, and review what changed when AI edited files." },
        { type: "h2", text: "The stack pieces" },
        { type: "bullet", text: "Terminal: where you start models, servers, scripts, and tools such as Codex, Claude Code, Ollama, or Docker." },
        { type: "bullet", text: "Modern Python: the glue for scripts, RAG, evals, automations, and model tests." },
        { type: "bullet", text: "Git: the history of code, prompts, configuration, and technical decisions." },
        { type: "bullet", text: "Docker: the practical way to run services such as Qdrant, n8n, Open WebUI, or databases without polluting your machine." },
        { type: "bullet", text: "Local models: useful for privacy, predictable cost, repetitive tasks, and reproducible learning." },
        { type: "h2", text: "Local vs cloud rule of thumb" },
        { type: "p", text: "Use local when data is sensitive, repetitive, cheap to process on your machine, or when you want to learn how the system works. Use cloud when you need the highest quality, huge context, stronger reasoning, or an integration you do not have locally yet." },
        { type: "code", text: "decision:\n  sensitive_data: local\n  fast_prototype: cloud_or_local\n  repetitive_cost: local\n  highest_quality: frontier\n  technical_learning: local\n  hybrid_production: gateway_with_routing" },
        { type: "h2", text: "Deliverable" },
        { type: "p", text: "By the end of this lesson you should be able to draw your stack: which tool edits code, which model answers, where data lives, how the project is versioned, and how it starts again." },
      ],
    },
  },
  {
    slug: "python-uv",
    title: {
      es: "Python moderno con uv",
      en: "Modern Python with uv",
    },
    lead: {
      es: "uv simplifica Python para proyectos de IA: instala versiones, crea entornos, fija dependencias y evita muchos problemas clásicos de pip y venv.",
      en: "uv simplifies Python for AI projects: it installs versions, creates environments, locks dependencies, and avoids many classic pip and venv problems.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Instalar uv" },
        { type: "p", text: "En proyectos nuevos de IA local, uv es una opción muy cómoda porque concentra varias tareas: gestor de paquetes, entornos virtuales y versiones de Python. Eso reduce fricción cuando pasas de una lección a otra." },
        { type: "code", text: "curl -LsSf https://astral.sh/uv/install.sh | sh\n\n# Windows PowerShell\npowershell -ExecutionPolicy ByPass -c \"irm https://astral.sh/uv/install.ps1 | iex\"" },
        { type: "h2", text: "Crear un proyecto limpio" },
        { type: "code", text: "uv init aulafy-practica\ncd aulafy-practica\nuv python install 3.12\nuv venv\nsource .venv/bin/activate\nuv add rich requests python-dotenv" },
        { type: "p", text: "Si usas Windows, activa el entorno con .venv\\Scripts\\activate. Lo importante es que cada proyecto tenga su propio entorno y sus dependencias declaradas." },
        { type: "h2", text: "Python mínimo para IA" },
        { type: "bullet", text: "Leer y escribir JSON, Markdown, CSV y texto plano." },
        { type: "bullet", text: "Crear funciones pequeñas con type hints." },
        { type: "bullet", text: "Usar try/except para errores de red, archivos y modelos." },
        { type: "bullet", text: "Entender async básico cuando una app llama a APIs o herramientas lentas." },
        { type: "code", text: "import json\nfrom pathlib import Path\n\ndef load_json(path: str) -> dict:\n    return json.loads(Path(path).read_text(encoding=\"utf-8\"))\n\nconfig = load_json(\"config.json\")\nprint(config.get(\"model\", \"sin modelo\"))" },
        { type: "h2", text: "Criterio Aulafy" },
        { type: "p", text: "Empieza con Python simple. Antes de sumar LangChain, LangGraph, LlamaIndex o frameworks grandes, asegúrate de que sabes hacer una llamada, guardar una traza y reproducir el resultado." },
      ],
      en: [
        { type: "h2", text: "Install uv" },
        { type: "p", text: "For new local AI projects, uv is comfortable because it combines several jobs: package management, virtual environments, and Python versions. That lowers friction when moving from one lesson to another." },
        { type: "code", text: "curl -LsSf https://astral.sh/uv/install.sh | sh\n\n# Windows PowerShell\npowershell -ExecutionPolicy ByPass -c \"irm https://astral.sh/uv/install.ps1 | iex\"" },
        { type: "h2", text: "Create a clean project" },
        { type: "code", text: "uv init aulafy-practice\ncd aulafy-practice\nuv python install 3.12\nuv venv\nsource .venv/bin/activate\nuv add rich requests python-dotenv" },
        { type: "p", text: "On Windows, activate the environment with .venv\\Scripts\\activate. The important part is that each project has its own environment and declared dependencies." },
        { type: "h2", text: "Minimum Python for AI" },
        { type: "bullet", text: "Read and write JSON, Markdown, CSV, and plain text." },
        { type: "bullet", text: "Write small functions with type hints." },
        { type: "bullet", text: "Use try/except for network, file, and model errors." },
        { type: "bullet", text: "Understand basic async when an app calls APIs or slow tools." },
        { type: "code", text: "import json\nfrom pathlib import Path\n\ndef load_json(path: str) -> dict:\n    return json.loads(Path(path).read_text(encoding=\"utf-8\"))\n\nconfig = load_json(\"config.json\")\nprint(config.get(\"model\", \"no model\"))" },
        { type: "h2", text: "Aulafy judgment" },
        { type: "p", text: "Start with plain Python. Before adding LangChain, LangGraph, LlamaIndex, or large frameworks, make sure you can make a call, save a trace, and reproduce the result." },
      ],
    },
  },
  {
    slug: "git-agents-md",
    title: {
      es: "Git, commits pequeños y AGENTS.md",
      en: "Git, small commits, and AGENTS.md",
    },
    lead: {
      es: "Git no es solo guardar código: en proyectos con IA es la forma de revisar, corregir y confiar menos en la magia.",
      en: "Git is not just saving code: in AI projects it is how you review, correct, and rely less on magic.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Configura tu identidad" },
        { type: "code", text: "git config --global user.name \"Tu Nombre\"\ngit config --global user.email \"tu@email.com\"\ngit config --global init.defaultBranch main" },
        { type: "h2", text: "El flujo mínimo" },
        { type: "code", text: "git status\ngit diff\ngit add .\ngit commit -m \"Add local AI prototype\"\ngit log --oneline -5" },
        { type: "p", text: "La IA puede escribir mucho en poco tiempo. Tu defensa es trabajar por cambios pequeños, revisar diffs y pedir verificación antes de aceptar una modificación grande." },
        { type: "h2", text: "AGENTS.md como contrato de trabajo" },
        { type: "p", text: "AGENTS.md sirve para decirle al agente cómo se trabaja en ese repositorio: comandos, estilo, límites, rutas importantes, pruebas y cosas que no debe tocar sin permiso." },
        { type: "code", text: "# AGENTS.md\n\n## Comandos\n- npm run lint\n- npm run build\n\n## Reglas\n- No editar .env ni secretos.\n- Mantener cambios pequeños y verificables.\n- Antes de tocar UI, comprobar mobile y desktop.\n- Explicar pruebas ejecutadas al terminar." },
        { type: "h2", text: "Archivos que no deberían entrar en Git" },
        { type: "code", text: "# .gitignore\n.venv/\n.env\n*.log\n*.gguf\nmodels/\n__pycache__/\n.DS_Store" },
        { type: "p", text: "No subas modelos grandes, claves, bases vectoriales privadas ni datos de clientes. Versiona recetas, scripts, prompts y configuración segura." },
      ],
      en: [
        { type: "h2", text: "Configure your identity" },
        { type: "code", text: "git config --global user.name \"Your Name\"\ngit config --global user.email \"you@email.com\"\ngit config --global init.defaultBranch main" },
        { type: "h2", text: "The minimum workflow" },
        { type: "code", text: "git status\ngit diff\ngit add .\ngit commit -m \"Add local AI prototype\"\ngit log --oneline -5" },
        { type: "p", text: "AI can write a lot very quickly. Your defense is small changes, reviewed diffs, and explicit verification before accepting a large modification." },
        { type: "h2", text: "AGENTS.md as a working contract" },
        { type: "p", text: "AGENTS.md tells the agent how work happens in that repository: commands, style, limits, important paths, tests, and things it should not touch without permission." },
        { type: "code", text: "# AGENTS.md\n\n## Commands\n- npm run lint\n- npm run build\n\n## Rules\n- Do not edit .env or secrets.\n- Keep changes small and verifiable.\n- Before touching UI, check mobile and desktop.\n- Explain tests run before finishing." },
        { type: "h2", text: "Files that should not enter Git" },
        { type: "code", text: "# .gitignore\n.venv/\n.env\n*.log\n*.gguf\nmodels/\n__pycache__/\n.DS_Store" },
        { type: "p", text: "Do not commit large models, keys, private vector databases, or customer data. Version recipes, scripts, prompts, and safe configuration." },
      ],
    },
  },
  {
    slug: "terminal-sin-miedo",
    title: {
      es: "Terminal sin miedo",
      en: "Terminal without fear",
    },
    lead: {
      es: "La terminal es la mesa de trabajo de la IA local. No hace falta memorizarlo todo, pero sí moverse con calma y saber diagnosticar.",
      en: "The terminal is the workbench for local AI. You do not need to memorize everything, but you do need to move calmly and diagnose problems.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Comandos que usarás cada día" },
        { type: "code", text: "pwd                 # dónde estoy\nls -la              # qué hay aquí\ncd carpeta          # entrar en carpeta\nmkdir proyecto      # crear carpeta\ncat archivo.txt     # ver archivo pequeño\ncode .              # abrir en editor si usas VS Code" },
        { type: "h2", text: "Procesos y puertos" },
        { type: "p", text: "Muchas herramientas de IA son servidores locales: Ollama en 11434, Next.js en 3000, n8n en 5678, Qdrant en 6333. Cuando algo falla, pregunta primero: ¿el proceso está vivo y el puerto responde?" },
        { type: "code", text: "curl http://localhost:11434/api/tags\nlsof -i :3000\nps aux | grep ollama" },
        { type: "h2", text: "Diagnóstico de 60 segundos" },
        { type: "bullet", text: "Lee el primer error real, no solo la última línea." },
        { type: "bullet", text: "Comprueba ruta, puerto, variable de entorno y proceso." },
        { type: "bullet", text: "Repite el comando mínimo fuera de la app." },
        { type: "bullet", text: "Si usas Docker, recuerda que localhost dentro del contenedor no siempre es tu máquina." },
        { type: "h2", text: "Atajos útiles" },
        { type: "p", text: "Ctrl+C cancela un proceso, flecha arriba recupera comandos anteriores y Tab autocompleta rutas. Parece poco, pero te ahorra horas cuando trabajas con agentes." },
      ],
      en: [
        { type: "h2", text: "Commands you will use every day" },
        { type: "code", text: "pwd                 # where am I\nls -la              # what is here\ncd folder           # enter folder\nmkdir project       # create folder\ncat file.txt        # view a small file\ncode .              # open in editor if you use VS Code" },
        { type: "h2", text: "Processes and ports" },
        { type: "p", text: "Many AI tools are local servers: Ollama on 11434, Next.js on 3000, n8n on 5678, Qdrant on 6333. When something fails, ask first: is the process alive and does the port answer?" },
        { type: "code", text: "curl http://localhost:11434/api/tags\nlsof -i :3000\nps aux | grep ollama" },
        { type: "h2", text: "60-second diagnosis" },
        { type: "bullet", text: "Read the first real error, not only the last line." },
        { type: "bullet", text: "Check path, port, environment variable, and process." },
        { type: "bullet", text: "Repeat the smallest command outside the app." },
        { type: "bullet", text: "If you use Docker, remember that localhost inside a container is not always your machine." },
        { type: "h2", text: "Useful shortcuts" },
        { type: "p", text: "Ctrl+C cancels a process, arrow up recovers previous commands, and Tab autocompletes paths. It sounds small, but it saves hours when working with agents." },
      ],
    },
  },
  {
    slug: "docker-servicios",
    title: {
      es: "Docker para servicios de IA",
      en: "Docker for AI services",
    },
    lead: {
      es: "Docker te permite arrancar servicios repetibles sin instalar media internet en tu ordenador.",
      en: "Docker lets you start repeatable services without installing half the internet on your computer.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Cuándo usar Docker" },
        { type: "p", text: "Úsalo para servicios persistentes: bases vectoriales, n8n, Open WebUI, Postgres, Redis o herramientas que quieras poder reiniciar igual mañana. Para scripts pequeños de Python, normalmente basta con uv." },
        { type: "h2", text: "Compose mínimo" },
        { type: "code", text: "services:\n  qdrant:\n    image: qdrant/qdrant:latest\n    ports:\n      - \"6333:6333\"\n    volumes:\n      - qdrant_data:/qdrant/storage\n\nvolumes:\n  qdrant_data:" },
        { type: "code", text: "docker compose up -d\ndocker compose ps\ndocker compose logs -f qdrant" },
        { type: "h2", text: "Errores típicos" },
        { type: "bullet", text: "Puerto ocupado: cambia el puerto izquierdo, por ejemplo 6334:6333." },
        { type: "bullet", text: "Datos que desaparecen: falta un volumen persistente." },
        { type: "bullet", text: "Ollama no conecta desde Docker: prueba host.docker.internal en macOS/Windows." },
        { type: "bullet", text: "Permisos raros en Linux: revisa usuario, grupo docker y rutas montadas." },
        { type: "h2", text: "Regla de mantenimiento" },
        { type: "p", text: "Todo servicio que vayas a usar más de una vez debería tener un docker-compose.yml, un README corto y un comando de verificación." },
      ],
      en: [
        { type: "h2", text: "When to use Docker" },
        { type: "p", text: "Use it for persistent services: vector databases, n8n, Open WebUI, Postgres, Redis, or tools you want to restart the same way tomorrow. For small Python scripts, uv is usually enough." },
        { type: "h2", text: "Minimum Compose" },
        { type: "code", text: "services:\n  qdrant:\n    image: qdrant/qdrant:latest\n    ports:\n      - \"6333:6333\"\n    volumes:\n      - qdrant_data:/qdrant/storage\n\nvolumes:\n  qdrant_data:" },
        { type: "code", text: "docker compose up -d\ndocker compose ps\ndocker compose logs -f qdrant" },
        { type: "h2", text: "Common errors" },
        { type: "bullet", text: "Port already used: change the left port, for example 6334:6333." },
        { type: "bullet", text: "Data disappears: you are missing a persistent volume." },
        { type: "bullet", text: "Ollama does not connect from Docker: try host.docker.internal on macOS/Windows." },
        { type: "bullet", text: "Strange Linux permissions: check user, docker group, and mounted paths." },
        { type: "h2", text: "Maintenance rule" },
        { type: "p", text: "Every service you will use more than once should have a docker-compose.yml, a short README, and a verification command." },
      ],
    },
  },
  {
    slug: "proyecto-base",
    title: {
      es: "Proyecto base listo para Aulafy",
      en: "Base project ready for Aulafy",
    },
    lead: {
      es: "Cerramos el onboarding creando una plantilla mínima que podrás reutilizar en cursos de RAG, agentes, MLOps o IA local.",
      en: "We close onboarding by creating a minimal template you can reuse in RAG, agents, MLOps, or local AI courses.",
    },
    blocks: {
      es: [
        { type: "h2", text: "Estructura recomendada" },
        { type: "code", text: "aulafy-proyecto/\n  AGENTS.md\n  README.md\n  .env.example\n  .gitignore\n  pyproject.toml\n  src/\n    main.py\n  data/\n    .gitkeep\n  scripts/\n    verify.sh\n  docker-compose.yml" },
        { type: "h2", text: "README mínimo" },
        { type: "code", text: "# Proyecto Aulafy\n\n## Requisitos\n- uv\n- Docker Desktop opcional\n- Ollama opcional\n\n## Arranque\nuv venv\nsource .venv/bin/activate\nuv sync\n\n## Verificación\nbash scripts/verify.sh" },
        { type: "h2", text: "Script de verificación" },
        { type: "code", text: "#!/usr/bin/env bash\nset -euo pipefail\n\nuv run python -m compileall src\nuv run python src/main.py\n\necho \"OK: proyecto verificable\"" },
        { type: "h2", text: "Checklist antes de seguir" },
        { type: "bullet", text: "El proyecto arranca desde cero siguiendo el README." },
        { type: "bullet", text: "No hay secretos ni datos privados en Git." },
        { type: "bullet", text: "Hay un comando claro para verificar que funciona." },
        { type: "bullet", text: "AGENTS.md explica cómo debe trabajar la IA en ese repo." },
        { type: "p", text: "Cuando tengas esto, los cursos avanzados dejan de ser una colección de comandos y se convierten en proyectos que puedes mantener." },
      ],
      en: [
        { type: "h2", text: "Recommended structure" },
        { type: "code", text: "aulafy-project/\n  AGENTS.md\n  README.md\n  .env.example\n  .gitignore\n  pyproject.toml\n  src/\n    main.py\n  data/\n    .gitkeep\n  scripts/\n    verify.sh\n  docker-compose.yml" },
        { type: "h2", text: "Minimum README" },
        { type: "code", text: "# Aulafy Project\n\n## Requirements\n- uv\n- Docker Desktop optional\n- Ollama optional\n\n## Start\nuv venv\nsource .venv/bin/activate\nuv sync\n\n## Verification\nbash scripts/verify.sh" },
        { type: "h2", text: "Verification script" },
        { type: "code", text: "#!/usr/bin/env bash\nset -euo pipefail\n\nuv run python -m compileall src\nuv run python src/main.py\n\necho \"OK: verifiable project\"" },
        { type: "h2", text: "Checklist before moving on" },
        { type: "bullet", text: "The project starts from scratch by following the README." },
        { type: "bullet", text: "There are no secrets or private data in Git." },
        { type: "bullet", text: "There is a clear command to verify it works." },
        { type: "bullet", text: "AGENTS.md explains how AI should work in that repository." },
        { type: "p", text: "Once you have this, advanced courses stop being a collection of commands and become projects you can maintain." },
      ],
    },
  },
];

export function getFoundationLesson(slug: string) {
  return foundationLessons.find((lesson) => lesson.slug === slug);
}
