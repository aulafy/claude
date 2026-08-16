const deepseekHarnessEnglishSlugs: Record<string, string> = {
  introduccion: "introduction",
  instalacion: "installation",
  modelos: "models",
  modos: "modes",
  workspaces: "workspaces",
  plugins: "plugins",
  subagentes: "subagents",
  "modelos-locales": "local-models",
  "casos-de-uso": "use-cases",
  produccion: "production",
};

const deepseekHarnessSourceSlugs = Object.fromEntries(
  Object.entries(deepseekHarnessEnglishSlugs).map(([source, english]) => [english, source]),
);

const deepseekHarnessEnglishTitles: Record<string, string> = {
  introduccion: "What is DSH and why does it matter?",
  instalacion: "Installation and a safe first session",
  modelos: "DeepSeek models, providers and cost",
  modos: "Execution modes: choosing the right one",
  workspaces: "Workspaces, permissions and safety",
  plugins: "Plugins and custom profiles",
  subagentes: "Subagents, skills and orchestration",
  "modelos-locales": "Local DeepSeek models and quantization",
  "casos-de-uso": "Use cases, metrics and benchmarks",
  produccion: "Troubleshooting and production operation",
};

export function getEnglishLessonSlug(courseSlug: string, sourceLessonSlug: string) {
  if (courseSlug !== "deepseek-harness") return sourceLessonSlug;
  return deepseekHarnessEnglishSlugs[sourceLessonSlug] ?? sourceLessonSlug;
}

export function getSourceLessonSlug(courseSlug: string, englishLessonSlug: string) {
  if (courseSlug !== "deepseek-harness") return englishLessonSlug;
  return deepseekHarnessSourceSlugs[englishLessonSlug] ?? englishLessonSlug;
}

export function getEnglishLessonTitleOverride(courseSlug: string, sourceLessonSlug: string) {
  if (courseSlug !== "deepseek-harness") return undefined;
  return deepseekHarnessEnglishTitles[sourceLessonSlug];
}
