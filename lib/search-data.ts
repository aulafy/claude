export type SearchItem = {
  href: string;
  title: string;
  section: string;
  keywords: string;
};

export const searchData: SearchItem[] = [
  { href: "/", title: "Inicio", section: "Empezar", keywords: "home portada qué es claude code introducción" },
  { href: "/instalacion", title: "Instalación", section: "Empezar", keywords: "instalar npm node api key macos windows wsl linux setup actualizar" },
  { href: "/primeros-pasos", title: "Primeros pasos", section: "Empezar", keywords: "iniciar sesión modo auto plan primera vez interfaz prompt print headless" },
  { href: "/recetas", title: "Recetas prácticas", section: "Práctica diaria", keywords: "ejemplos prompts copiar aprender crear errores git datos automatizar terminal documentar día a día" },
  { href: "/proyectos", title: "Proyectos guiados", section: "Práctica diaria", keywords: "web personal app tareas to-do script python paso a paso tutorial construir proyecto" },
  { href: "/prompts", title: "Escribir buenos prompts", section: "Práctica diaria", keywords: "prompt engineering específico contexto plantillas antes después comunicar pedir" },
  { href: "/glosario", title: "Glosario", section: "Práctica diaria", keywords: "términos diccionario api commit backend frontend repositorio stack trace mcp deploy localhost json definiciones" },
  { href: "/skills", title: "Skills", section: "Extender", keywords: "agent skills skill.md frontmatter reutilizable comandos personalizados automatizar invocación" },
  { href: "/subagentes", title: "Subagentes", section: "Extender", keywords: "agentes paralelo .claude/agents revisor depurador delegar background especializado tools model" },
  { href: "/plugins", title: "Plugins", section: "Extender", keywords: "marketplace instalar bundle plugin install anthropics extensiones paquetes" },
  { href: "/flujos", title: "Flujos de trabajo pro", section: "Extender", keywords: "plan mode rewind checkpoint background output styles deshacer shift tab esc trucos mejores prácticas" },
  { href: "/comandos", title: "Comandos", section: "Referencia", keywords: "slash commands flags cli atajos teclado modelos opus sonnet haiku fable help clear doctor compact" },
  { href: "/configuracion", title: "Configuración", section: "Referencia", keywords: "settings.json claude.md memoria variables entorno modelo vscode jetbrains proxy perfiles" },
  { href: "/mcp", title: "Servidores MCP", section: "Referencia", keywords: "model context protocol postgres github puppeteer base datos navegador api herramientas externas" },
  { href: "/hooks", title: "Hooks", section: "Referencia", keywords: "pretoolcall posttoolcall stop automatizar prettier tests log bloquear matcher eventos" },
  { href: "/permisos", title: "Permisos", section: "Referencia", keywords: "allow deny seguridad confirmación dangerously skip permissions herramientas control" },
  { href: "/avanzado", title: "Uso avanzado", section: "Referencia", keywords: "subagentes worktree headless ci cd fast compact resume tmux git productividad" },
  { href: "/faq", title: "Preguntas frecuentes", section: "Ayuda", keywords: "precio coste seguridad privacidad reemplaza programadores modelo lenguajes dudas faq" },
  { href: "/problemas", title: "Solución de problemas", section: "Ayuda", keywords: "error command not found eacces node api key rate limit lento doctor troubleshooting arreglar" },
];
