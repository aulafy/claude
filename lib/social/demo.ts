import type { LearningProject, ProjectDetail, PublicProfile } from "@/lib/social/types";

const demoProfiles: PublicProfile[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    username: "laura_aprende",
    displayName: "Laura",
    bio: "Aprendiendo a convertir tareas cotidianas en proyectos pequeños y verificables.",
    website: null,
    interests: ["codex", "automatización", "productividad"],
    createdAt: "2026-07-12T10:00:00.000Z",
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    username: "miguel_construye",
    displayName: "Miguel",
    bio: "Diseñador que está aprendiendo a construir herramientas sin empezar por la programación.",
    website: null,
    interests: ["web", "diseño", "codex"],
    createdAt: "2026-07-11T10:00:00.000Z",
  },
];

export const DEMO_PROJECTS: LearningProject[] = [
  {
    id: "20000000-0000-4000-8000-000000000001",
    authorId: demoProfiles[0].id,
    courseSlug: "codex-desde-cero",
    lessonSlug: "automatizar-con-vista-previa",
    title: "Organizador seguro de facturas mensuales",
    summary: "Una automatización que propone nombres y carpetas antes de mover ningún archivo.",
    whatBuilt:
      "Preparé una carpeta de prueba con copias de doce facturas. Codex genera primero un inventario, propone los nombres normalizados y crea un informe de vista previa. Solo después de revisarlo autorizo los cambios.",
    whatLearned:
      "Aprendí que una automatización útil no empieza moviendo archivos: empieza enseñando exactamente lo que pretende cambiar.",
    obstacles: "Al principio dos facturas tenían la misma fecha. Añadí el proveedor al nombre para evitar colisiones.",
    technologies: ["codex", "csv", "archivos"],
    difficulty: "principiante",
    repositoryUrl: null,
    demoUrl: null,
    status: "published",
    publishedAt: "2026-07-14T09:30:00.000Z",
    createdAt: "2026-07-14T09:10:00.000Z",
    author: demoProfiles[0],
    unit: {
      courseSlug: "codex-desde-cero",
      lessonSlug: "automatizar-con-vista-previa",
      courseTitle: "Codex desde cero",
      lessonTitle: "Automatiza una tarea repetitiva con vista previa",
      projectPrompt: "Comparte una automatización segura.",
    },
    reviewCount: 2,
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    authorId: demoProfiles[1].id,
    courseSlug: "codex-desde-cero",
    lessonSlug: "primera-web-local",
    title: "Web local para preparar una reunión",
    summary: "Una página sencilla que convierte una lista de temas en una agenda clara para el equipo.",
    whatBuilt:
      "Construí una web que funciona sin servidor. Permite añadir temas, asignar minutos y comprobar si la reunión cabe en el tiempo disponible. Los datos solo permanecen en el navegador.",
    whatLearned:
      "Entendí la diferencia entre pedir una página bonita y definir primero el resultado que debía poder comprobar.",
    obstacles: null,
    technologies: ["html", "css", "javascript"],
    difficulty: "principiante",
    repositoryUrl: null,
    demoUrl: null,
    status: "published",
    publishedAt: "2026-07-13T17:00:00.000Z",
    createdAt: "2026-07-13T16:30:00.000Z",
    author: demoProfiles[1],
    unit: {
      courseSlug: "codex-desde-cero",
      lessonSlug: "primera-web-local",
      courseTitle: "Codex desde cero",
      lessonTitle: "Construye tu primera web local",
      projectPrompt: "Publica la web que has construido.",
    },
    reviewCount: 1,
  },
];

export const DEMO_PROJECT_DETAIL: ProjectDetail = {
  ...DEMO_PROJECTS[0],
  reviews: [
    {
      id: "30000000-0000-4000-8000-000000000001",
      projectId: DEMO_PROJECTS[0].id,
      reviewerId: demoProfiles[1].id,
      worksCorrectly: "not_tested",
      explanationRating: 5,
      educationalValue: 5,
      feedback:
        "La secuencia inventario → propuesta → autorización se entiende muy bien y permite que otra persona reproduzca el proceso sin arriesgar sus originales.",
      suggestion: "Podrías añadir al informe una columna que explique por qué se propone cada carpeta.",
      createdAt: "2026-07-14T10:00:00.000Z",
      reviewer: demoProfiles[1],
    },
  ],
};

export function getDemoProfile(username: string) {
  return demoProfiles.find((profile) => profile.username === username) ?? null;
}
