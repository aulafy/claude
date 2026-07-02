// Fuente única de verdad de los cursos de Aulafy.
// Cada lección re-exporta una página existente; las URLs antiguas redirigen aquí.

export type Leccion = { slug: string; title: string };
export type Seccion = { title: string; lecciones: Leccion[] };

export type Curso = {
  slug: string;
  title: string;
  short: string;
  desc: string;
  level: string;
  icon: string; // nombre de icono de components/Icon
  gradient: [string, string]; // portada
  secciones: Seccion[];
  pdf?: string;
};

export const cursos: Curso[] = [
  {
    slug: "claude-code",
    title: "Claude Code, de 0 a pro",
    short: "Domina la CLI de IA de Anthropic",
    desc: "Aprende a construir software y aplicaciones hablando con la IA en tu terminal: instalación, recetas, proyectos guiados, skills, subagentes, MCP y flujos profesionales.",
    level: "Principiante → avanzado",
    icon: "terminal",
    gradient: ["#fb923c", "#8b5cf6"],
    pdf: "/guia-claude-code.pdf",
    secciones: [
      {
        title: "Empezar",
        lecciones: [
          { slug: "instalacion", title: "Instalación" },
          { slug: "primeros-pasos", title: "Primeros pasos" },
          { slug: "donde-usar", title: "CLI, app y móvil" },
        ],
      },
      {
        title: "Práctica diaria",
        lecciones: [
          { slug: "recetas", title: "Recetas prácticas" },
          { slug: "proyectos", title: "Proyectos guiados" },
          { slug: "prompts", title: "Escribir buenos prompts" },
          { slug: "contexto-costes", title: "Controla el contexto y los costes" },
          { slug: "glosario", title: "Glosario" },
        ],
      },
      {
        title: "Según tu perfil",
        lecciones: [
          { slug: "pymes", title: "Pymes y oficina" },
          { slug: "equipos", title: "Perfiles técnicos" },
        ],
      },
      {
        title: "Extender Claude Code",
        lecciones: [
          { slug: "skills", title: "Skills" },
          { slug: "subagentes", title: "Subagentes" },
          { slug: "plugins", title: "Plugins" },
          { slug: "flujos", title: "Flujos de trabajo pro" },
        ],
      },
      {
        title: "Referencia",
        lecciones: [
          { slug: "comandos", title: "Comandos" },
          { slug: "configuracion", title: "Configuración" },
          { slug: "mcp", title: "Servidores MCP" },
          { slug: "hooks", title: "Hooks" },
          { slug: "permisos", title: "Permisos" },
          { slug: "avanzado", title: "Uso avanzado" },
        ],
      },
      {
        title: "Ayuda",
        lecciones: [
          { slug: "faq", title: "Preguntas frecuentes" },
          { slug: "problemas", title: "Solución de problemas" },
          { slug: "recursos", title: "Recursos" },
          { slug: "comparativa", title: "Comparativa" },
        ],
      },
    ],
  },
  {
    slug: "ia-local",
    title: "Claude Code + IA Local",
    short: "Construye apps de IA en tu ordenador",
    desc: "Construye herramientas de IA que se ejecutan en tu propio equipo (RAG, PDF, voz, 3D, WordPress…) y aprende a publicarlas en internet. La continuación práctica del curso de Claude Code.",
    level: "Intermedio",
    icon: "brain",
    gradient: ["#8b5cf6", "#22d3ee"],
    pdf: "/guia-claude-code-vol2.pdf",
    secciones: [
      {
        title: "Fundamentos",
        lecciones: [
          { slug: "terminal", title: "La terminal sin miedo (CLI)" },
          { slug: "proyectos", title: "Cómo trabajar con tus proyectos" },
          { slug: "prompts", title: "Escribir buenos encargos" },
          { slug: "ia-local", title: "IA local: elige tu modelo" },
          { slug: "conectar-ollama", title: "Conecta Claude Code con tu IA local" },
          { slug: "depurar", title: "Depurar y proteger tu trabajo" },
        ],
      },
      {
        title: "Construye tus herramientas",
        lecciones: [
          { slug: "chatbot-legal", title: "Chatbot que cita la ley (RAG)" },
          { slug: "pdf", title: "Pregúntale a tus PDF" },
          { slug: "voz", title: "Chatbot que escucha y habla" },
          { slug: "texto-a-audio", title: "Texto a audio" },
          { slug: "simulaciones-3d", title: "Simulaciones 3D" },
          { slug: "avatar", title: "Avatar que habla" },
          { slug: "wordpress", title: "Tema de WordPress con IA" },
          { slug: "landing", title: "Web para tu servicio" },
          { slug: "facturacion", title: "Asistente para autónomos" },
          { slug: "estudio", title: "App para estudiar" },
        ],
      },
      {
        title: "Sácalo al mundo",
        lecciones: [{ slug: "publicar", title: "Publica tu app en internet" }],
      },
      {
        title: "Anexos (avanzado)",
        lecciones: [{ slug: "cluster", title: "Clúster casero con exo" }],
      },
    ],
  },
  {
    slug: "agentes-automatizacion",
    title: "Agentes y automatización",
    short: "Diseña agentes útiles, seguros y mantenibles",
    desc: "Aprende a convertir tareas repetitivas en sistemas agénticos: subagentes, hooks, skills, MCP, GitHub Actions, routines y agentes 24/7 con límites claros de seguridad.",
    level: "Intermedio",
    icon: "robot",
    gradient: ["#22d3ee", "#10b981"],
    secciones: [
      {
        title: "Fundamentos",
        lecciones: [
          { slug: "mapa", title: "Mapa real de agentes en 2026" },
          { slug: "subagentes", title: "Subagentes con roles y límites" },
        ],
      },
      {
        title: "Automatizar con control",
        lecciones: [
          { slug: "hooks", title: "Hooks: automatización determinista" },
          { slug: "skills-seguras", title: "Skills seguras y auditables" },
          { slug: "mcp-seguro", title: "MCP sin regalar tus llaves" },
        ],
      },
      {
        title: "Del portátil a producción",
        lecciones: [
          { slug: "github-routines", title: "GitHub Actions y routines" },
          { slug: "agente-247", title: "Proyecto: agente 24/7 con bandeja de entrada" },
        ],
      },
    ],
  },
];

export const proximamente = [
  { icon: "palette", title: "IA generativa: imagen y voz", desc: "Genera imágenes, voz y vídeo con herramientas open source y en la nube." },
];

export function getCurso(slug: string): Curso | undefined {
  return cursos.find((c) => c.slug === slug);
}

export function lecciones(curso: Curso): Leccion[] {
  return curso.secciones.flatMap((s) => s.lecciones);
}

export function totalLecciones(curso: Curso): number {
  return lecciones(curso).length;
}
