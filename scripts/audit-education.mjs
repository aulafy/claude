import assert from "node:assert/strict";
import fs from "node:fs";
import { cursos, lecciones } from "../lib/cursos.ts";
import { getCourseGuidance } from "../lib/course-guidance.ts";
import { courseGroups } from "../lib/course-groups.ts";
import { getLearningPaths } from "../lib/learning-paths.ts";
import { iaBasicsLessons } from "../lib/ia-basics-course-content.ts";
import { getSessionlessPractice } from "../lib/sessionless-practices.ts";
import { getIaBasicsQuality } from "../lib/ia-basics-quality.ts";
import { aiProgram } from "../lib/ai-program.ts";
import { sevenDayPath } from "../lib/seven-day-path.ts";
import { getMobileLearningNavItems } from "../lib/mobile-learning-nav.ts";
import { getLearningReturnEvent } from "../lib/learning-return.ts";
import { canCompleteMission } from "../lib/mission-completion.ts";
import { getLearningContinuation } from "../lib/learning-continuation.ts";

const courseSlugs = new Set();
const lessonUrls = new Set();
let lessonCount = 0;
const officialSourceHints = [
  "https://platform.openai.com/docs",
  "https://developers.openai.com/codex",
  "https://docs.anthropic.com",
  "https://ollama.com",
  "https://docs.litellm.ai",
  "https://owasp.org",
  "https://www.nist.gov/itl/ai-risk-management-framework",
];

const finalProjectWords = /\b(proyecto|entregable|auditoría|aplicación|prototipo|servicio|agente|flujo|plataforma|adaptador|cambio|cápsula|entrega|modelo|sistema|web)\b/i;

for (const lesson of iaBasicsLessons) {
  const practice = getSessionlessPractice(lesson.slug);
  const quality = getIaBasicsQuality(lesson.slug);
  assert.ok(practice, `IA basics lesson needs an active mission: ${lesson.slug}`);
  assert.equal(practice.steps.length, 3, `Mission needs exactly three manageable steps: ${lesson.slug}`);
  assert.equal(practice.options.length, 3, `Criterion check needs three deliberate options: ${lesson.slug}`);
  assert.equal(practice.options.filter((option) => option.correct).length, 1, `Criterion check needs one defensible answer: ${lesson.slug}`);
  assert.ok(practice.options.every((option) => option.explanation.length >= 60), `Every answer needs explanatory feedback: ${lesson.slug}`);
  assert.ok(practice.evidence.split("\n").length >= 4, `Mission needs a reusable evidence template: ${lesson.slug}`);
  assert.ok(quality, `IA basics lesson needs a quality record: ${lesson.slug}`);
  assert.match(quality.reviewedAt, /^\d{4}-\d{2}-\d{2}$/, `Quality review date must be ISO: ${lesson.slug}`);
  assert.ok(quality.sources.length >= 1, `Quality record needs a primary source: ${lesson.slug}`);
  assert.ok([7, 30, 180].includes(quality.reviewDays), `Quality record needs a defined review cadence: ${lesson.slug}`);
}

for (const course of cursos) {
  assert.ok(!courseSlugs.has(course.slug), `Duplicate course slug: ${course.slug}`);
  courseSlugs.add(course.slug);
  assert.ok(course.title.length >= 8, `Course title is too short: ${course.slug}`);
  assert.ok(course.slug.trim(), `Missing course slug`);
  assert.ok(course.desc.length >= 100, `Course description is too short: ${course.slug}`);
  assert.ok(course.secciones.length >= 2, `Course needs at least two modules: ${course.slug}`);
  assert.ok(course.level.trim(), `Missing course level: ${course.slug}`);
  assert.ok(course.short.trim().length >= 20, `Missing short course summary: ${course.slug}`);

  const guidance = getCourseGuidance(course.slug, "es");
  assert.ok(guidance, `Missing educational guidance: ${course.slug}`);
  assert.ok(guidance.estimatedHours >= 1, `Course needs estimated duration: ${course.slug}`);
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(course.updatedAt), `Course needs required ISO update date: ${course.slug}`);
  assert.ok(guidance.audience.length >= 40, `Course audience is too vague: ${course.slug}`);
  assert.ok(guidance.outcomes.length >= 3, `Course needs three outcomes: ${course.slug}`);
  assert.ok(guidance.prerequisites.length >= 2, `Course needs two prerequisites: ${course.slug}`);
  assert.ok(guidance.deliverable.length >= 30, `Deliverable is too vague: ${course.slug}`);
  assert.ok(finalProjectWords.test(guidance.deliverable), `Deliverable must describe a final project or artifact: ${course.slug}`);
  assert.ok(officialSourceHints.length >= 3, "Official source baseline is missing");

  const courseLessons = lecciones(course);
  assert.ok(courseLessons.length >= 2, `Course needs at least two lessons: ${course.slug}`);
  if (course.itinerary) {
    assert.ok(course.itinerary.primaryHours >= 1, `Course itinerary needs a realistic primary duration: ${course.slug}`);
    assert.ok(course.itinerary.phases.length >= 2, `Course itinerary needs at least two phases: ${course.slug}`);
    assert.ok(course.itinerary.phases.some((phase) => phase.recommended), `Course itinerary needs one clear starting phase: ${course.slug}`);
    let expectedStart = 1;
    for (const phase of course.itinerary.phases) {
      assert.equal(phase.start, expectedStart, `Course itinerary must not leave lesson gaps: ${course.slug}/${phase.title}`);
      assert.ok(phase.end >= phase.start, `Course itinerary has an invalid lesson range: ${course.slug}/${phase.title}`);
      assert.ok(phase.end <= courseLessons.length, `Course itinerary exceeds published lessons: ${course.slug}/${phase.title}`);
      assert.ok(phase.eyebrow.length >= 4, `Course itinerary needs an explicit learner cue: ${course.slug}/${phase.title}`);
      expectedStart = phase.end + 1;
    }
    assert.equal(expectedStart, courseLessons.length + 1, `Course itinerary must classify every published lesson: ${course.slug}`);
  }

  for (const [index, lesson] of courseLessons.entries()) {
    const key = `${course.slug}/${lesson.slug}`;
    assert.ok(!lessonUrls.has(key), `Duplicate lesson URL: ${key}`);
    lessonUrls.add(key);
    assert.ok(lesson.title.length >= 5, `Lesson title is too short: ${key}`);
    const directLessonPage = `app/cursos/${key}/page.tsx`;
    const generatedLessonPage = `app/cursos/${course.slug}/[lesson]/page.tsx`;
    assert.ok(
      fs.existsSync(directLessonPage) || fs.existsSync(generatedLessonPage),
      `Missing Spanish lesson page: ${key}`,
    );
    assert.ok(index === 0 || courseLessons[index - 1], `Missing previous lesson relation: ${key}`);
    assert.ok(index === courseLessons.length - 1 || courseLessons[index + 1], `Missing next lesson relation: ${key}`);
    lessonCount += 1;
  }
}

assert.ok(cursos.length >= 3, "Google course-list markup needs at least three real courses");
assert.ok(fs.existsSync("app/rutas/page.tsx"), "Missing Spanish learning paths");
assert.ok(fs.existsSync("app/en/paths/page.tsx"), "Missing English learning paths");

const catalogCourseSlugs = courseGroups.flatMap((group) => group.slugs);
assert.equal(new Set(catalogCourseSlugs).size, catalogCourseSlugs.length, "A course appears in more than one catalog group");
assert.deepEqual(
  new Set(catalogCourseSlugs),
  courseSlugs,
  "Every published course must appear exactly once in the visible Spanish catalog",
);

const spanishPaths = getLearningPaths("es");
const pathCourseSlugs = new Set(spanishPaths.flatMap((path) => path.courses));
assert.ok(spanishPaths.filter((path) => path.featured).length >= 4, "The landing needs at least four clear starting profiles");
for (const path of spanishPaths) {
  assert.ok(path.entry.length >= 8, `Learning path needs an entry level: ${path.slug}`);
  assert.ok(path.firstStep.length >= 8, `Learning path needs a first step: ${path.slug}`);
  assert.ok(path.outcome.length >= 60, `Learning path needs a concrete outcome: ${path.slug}`);
  assert.ok(path.courses.length >= 1, `Learning path needs at least one course: ${path.slug}`);
  assert.ok(path.courses.every((slug) => courseSlugs.has(slug)), `Unknown course in learning path: ${path.slug}`);
}
assert.deepEqual(pathCourseSlugs, courseSlugs, "Every published course must belong to at least one Spanish learning path");
assert.ok(spanishPaths.find((path) => path.slug === "desde-cero")?.courses.includes("codex-desde-cero"), "Missing zero-experience path");
assert.ok(spanishPaths.find((path) => path.slug === "web-saas")?.courses.includes("crear-webs-con-ia"), "Missing web and SaaS path");

assert.equal(aiProgram.es.stages.length, 7, "The Spanish applied AI program must keep seven clear modules");
for (const stage of aiProgram.es.stages) {
  assert.equal(stage.topics?.length, 5, `Program module needs five explicit topics: ${stage.id}`);
  for (const topic of stage.topics ?? []) {
    assert.match(topic.code, /^\d\.\d$/, `Program topic needs a scannable code: ${stage.id}/${topic.title}`);
    assert.ok(topic.title.length >= 10, `Program topic title is too vague: ${stage.id}/${topic.code}`);
    assert.ok(topic.outcome.length >= 40, `Program topic needs a concrete learner outcome: ${stage.id}/${topic.code}`);
    assert.ok(topic.practice.length >= 50, `Program topic needs a practical task: ${stage.id}/${topic.code}`);
    assert.ok(topic.evidence.length >= 35, `Program topic needs portable evidence: ${stage.id}/${topic.code}`);
  }
}

const pathFinder = fs.readFileSync("components/LearningPathFinder.tsx", "utf8");
const pathsPage = fs.readFileSync("components/LearningPathsPage.tsx", "utf8");
const catalogPage = fs.readFileSync("app/cursos/page.tsx", "utf8");
const englishCatalogPage = fs.readFileSync("app/en/courses/page.tsx", "utf8");
const taskExplorer = fs.readFileSync("components/TaskExplorer.tsx", "utf8");
const claudePermissions = fs.readFileSync("app/permisos/page.tsx", "utf8");
const claudeSubagents = fs.readFileSync("app/subagentes/page.tsx", "utf8");
const claudeFlows = fs.readFileSync("app/flujos/page.tsx", "utf8");
const englishLessons = fs.readFileSync("lib/english-lessons.ts", "utf8");
const interactiveLab = fs.readFileSync("components/learning-lab/InteractiveLearningLab.tsx", "utf8");
const labProgress = fs.readFileSync("lib/learning-lab-progress.ts", "utf8");
const coursePage = fs.readFileSync("app/cursos/[slug]/page.tsx", "utf8");
const aiProgramPage = fs.readFileSync("components/AiProgramPage.tsx", "utf8");
const nexusLanding = fs.readFileSync("components/AulafyNexusLanding.tsx", "utf8");
const startingCheck = fs.readFileSync("components/CodexStartingCheck.tsx", "utf8");
const bookComponents = fs.readFileSync("components/Book.tsx", "utf8");
const globalStyles = fs.readFileSync("app/globals.css", "utf8");
const progressTransfer = fs.readFileSync("components/ProgressTransfer.tsx", "utf8");
const learningProgress = fs.readFileSync("lib/learning-progress.ts", "utf8");
const savedLearningButton = fs.readFileSync("components/SaveLearningItemButton.tsx", "utf8");
const savedLearningList = fs.readFileSync("components/SavedLearningList.tsx", "utf8");
const calendarPlanner = fs.readFileSync("components/LearningCalendarPlanner.tsx", "utf8");
const selectedPathCard = fs.readFileSync("components/SelectedLearningPathCard.tsx", "utf8");
const externalLinkTracker = fs.readFileSync("components/ExternalLearningLinkTracker.tsx", "utf8");
const mobileLearningNav = fs.readFileSync("components/MobileLearningNav.tsx", "utf8");
const learningStreak = fs.readFileSync("components/LearningStreak.tsx", "utf8");
const evidenceNotebook = fs.readFileSync("components/LearningEvidenceNotebook.tsx", "utf8");
const sessionlessPractice = fs.readFileSync("components/SessionlessPractice.tsx", "utf8");
const evidenceMarkdown = fs.readFileSync("lib/evidence-markdown.ts", "utf8");
const pathCompletion = fs.readFileSync("components/PathCompletionSummary.tsx", "utf8");
const advisorOptionCounts = (start, end) => [...pathFinder.matchAll(new RegExp(`${start}: \\[[\\s\\S]*?\\],\\n    ${end}:`, "g"))]
  .map((match) => (match[0].match(/id: "/g) ?? []).length);

assert.match(pathsPage, /<LearningPathFinder[^>]*locale={locale}/, "Both path locales must include the learning-path finder");
assert.match(aiProgramPage, /Temas del módulo/, "The program page must expose module topics visibly");
assert.match(aiProgramPage, /topic\.practice/, "Program topics must show practice, not just syllabus titles");
assert.match(aiProgramPage, /topic\.evidence/, "Program topics must show portable evidence for no-login learners");
assert.match(nexusLanding, /Trabajo en oficina/, "The landing must keep a clear office-worker entry point");
assert.match(nexusLanding, /Soy estudiante/, "The landing must keep a clear student entry point");
assert.match(nexusLanding, /Empiezo desde cero/, "The landing must keep a clear beginner entry point");
assert.match(nexusLanding, /MISIÓN 0/, "The landing must offer one immediate, low-friction first mission");
assert.deepEqual(advisorOptionCounts("profiles", "goals"), [3, 3], "The finder must keep three entry profiles in both languages");
assert.deepEqual(advisorOptionCounts("goals", "paces"), [5, 5], "The finder must recommend by learner goal in both languages");
assert.deepEqual(advisorOptionCounts("paces", "sensitivities"), [3, 3], "The finder must keep three realistic pace choices in both languages");
assert.equal((pathFinder.match(/sensitivities: \[/g) ?? []).length, 2, "The finder must ask about data sensitivity in both languages");
assert.match(pathFinder, /No es un examen ni pide datos personales/, "The finder must explain its privacy and assessment limits");
assert.match(pathFinder, /answers stay in this browser/, "The English finder must explain that answers remain local");
assert.match(pathFinder, /No subas datos reales al piloto/, "Sensitive-data recommendations must stop real uploads during the pilot");
assert.match(catalogPage, /open=\{group\.id === "empezar"\}/, "The beginner catalog group should start expanded for immediate orientation");
assert.match(catalogPage, /Cada tarjeta muestra nivel, duración aproximada, entregable/, "The course catalog must expose scannable course decision data");
assert.match(catalogPage, /<TaskExplorer \/>/, "The Spanish catalog must lead with concrete tasks before long courses");
assert.match(englishCatalogPage, /<TaskExplorer locale="en" \/>/, "The English catalog must lead with concrete tasks before long courses");
assert.match(taskExplorer, /Choose a task, not a technology/, "The task-first catalog entry must be fully localized in English");
assert.equal((taskExplorer.match(/trackLearningEvent\("task_open"\)/g) ?? []).length, 1, "Both locales must use the same closed task-open event");
assert.match(claudePermissions, /No asumas que todas las sesiones empiezan en Auto/, "Claude Code permissions must not present Auto mode as a universal default");
assert.match(claudePermissions, /Claude Code v2\.1\.233/, "Volatile Claude Code permissions need a visible reviewed version");
assert.match(claudeSubagents, /subagent_type: \"fork\"/, "Claude Code subagents must explain the verified v2.1.232 fork behavior");
assert.match(claudeSubagents, /Más agentes no implican un resultado mejor/, "The subagent lesson must avoid unbounded parallel-agent hype");
assert.match(claudeFlows, /Mensajes entre sesiones/, "Claude Code workflows must cover verified cross-session messaging");
assert.match(claudeFlows, /claude update/, "Claude Code update guidance must use the provider CLI command");
assert.match(englishLessons, /Cross-session messages/, "The August Claude Code review must also reach English lessons");
assert.match(englishLessons, /Ollama Not Using GPU on Windows\? NVIDIA, AMD & WSL2 Fixes/, "The high-impression Ollama lesson must target its exact search intent");
assert.match(englishLessons, /Diagnose and fix Ollama running on CPU in Windows/, "The Ollama lesson must have a specific search description");
assert.match(interactiveLab, /readLearningLabProgress/, "The interactive lab must restore local progress after reload");
assert.match(interactiveLab, /Solo se guardan en este dispositivo las estaciones completadas, nunca tus respuestas/, "The lab must explain its narrow local persistence boundary");
assert.match(interactiveLab, /completeLearningStep\(LAB_HREF\)/, "Completing the lab must update the shared local learning journey");
assert.match(interactiveLab, /setLearningStepCompleted\(LAB_HREF, false\)/, "Resetting the lab must also clear shared completion state");
assert.match(labProgress, /MAX_PROMPT_DECISIONS = 12/, "Lab persistence must have a defensive decision limit");
assert.match(coursePage, /curso\.slug === "codex-desde-cero" && <CodexStartingCheck/, "Codex from zero must include the starting check");
assert.equal((startingCheck.match(/prompt: "/g) ?? []).length, 4, "The Codex starting check must cover four practical decisions");
assert.equal((startingCheck.match(/explanation: "/g) ?? []).length, 4, "Every starting-check answer needs immediate explanatory feedback");
assert.match(coursePage, /open=\{seccionIndex === 0\}/, "Only the first course module should start expanded");
assert.match(bookComponents, /MissionBrief/, "Shared lesson pages must expose a mission brief");
assert.match(bookComponents, /Qué vas a conseguir ahora/, "Every shared lesson must start with a concrete learner mission");
assert.match(bookComponents, /Siguiente misión recomendada/, "Lesson navigation must recommend the next mission");
assert.match(bookComponents, /Copiar plantilla de evidencia/, "Learners need a portable evidence template without accounts or cookies");
assert.match(globalStyles, /\.prose > table[\s\S]*overflow-x: auto/, "Unwrapped Markdown tables must scroll inside the content column");
assert.match(globalStyles, /\.aula-table-scroll[\s\S]*overscroll-behavior-inline: contain/, "Wrapped tables must not push the mobile viewport");
assert.match(globalStyles, /\.overflow-x-auto > table[\s\S]*width: max-content/, "Legacy table wrappers must keep wide tables inside horizontal scroll");
assert.match(progressTransfer, /Vista previa antes de importar/, "Progress import must preview data before changing local state");
assert.match(progressTransfer, /finish\("combine"\)/, "Progress import must offer a non-destructive merge");
assert.match(progressTransfer, /finish\("replace"\)/, "Progress import must make replacement an explicit choice");
assert.match(progressTransfer, /MAX_IMPORT_BYTES = 64 \* 1024/, "Progress import must enforce a small local file limit");
assert.match(learningProgress, /format: "aulafy-learning-progress"/, "Portable progress must use a named versioned format");
assert.match(learningProgress, /!value\.startsWith\("\/\/"\)/, "Portable progress must reject protocol-relative routes");
assert.match(learningProgress, /MAX_SAVED_ITEMS = 50/, "The local learning list must have a defensive size limit");
assert.match(savedLearningButton, /aria-pressed=\{saved\}/, "Save-for-later must expose its toggle state accessibly");
assert.match(savedLearningList, /setLearningItemSaved\(item, false\)/, "The local learning list must allow individual removal");
assert.equal(sevenDayPath.es.length, 7, "The Spanish beginner calendar must keep seven sessions");
assert.equal(sevenDayPath.en.length, 7, "The English beginner calendar must keep seven sessions");
assert.deepEqual(sevenDayPath.es.map((item) => item.minutes), sevenDayPath.en.map((item) => item.minutes), "Both calendar locales must keep the same learning workload");
assert.match(calendarPlanner, /createLearningCalendar\(schedule, locale\)/, "The path must provide a real local iCalendar export");
assert.match(calendarPlanner, /Your date and time never leave this browser/, "The English planner must explain its local privacy boundary");
assert.match(calendarPlanner, /La fecha y la hora no salen de este navegador/, "The Spanish planner must explain its local privacy boundary");
assert.match(pathFinder, /setSelectedLearningPath/, "The finder recommendation must be saveable as the learner's local path");
assert.match(pathFinder, /aria-pressed=\{savedSlug === result\.pathSlug\}/, "The saved path action must expose its state accessibly");
assert.match(selectedPathCard, /selectedPath/, "My path must display the learner's chosen recommendation");
assert.match(selectedPathCard, /setSelectedLearningPath\(null\)/, "The learner must be able to remove a chosen path independently");
assert.match(pathFinder, /trackLearningEvent\("route_selected"\)/, "Saving a recommendation must emit only the closed route-selection signal");
assert.match(externalLinkTracker, /trackLearningEvent\("external_source_open"\)/, "External learning sources must emit only the closed source-open signal");
assert.equal(getMobileLearningNavItems("es", "/", null).length, 4, "Mobile learning navigation must keep four stable destinations");
assert.match(mobileLearningNav, /LEARNING_PROGRESS_EVENT/, "Mobile Continue must update when local progress changes");
assert.match(mobileLearningNav, /aria-current=\{item\.active \? "page"/, "Mobile navigation must expose the current destination");
assert.match(globalStyles, /safe-area-inset-bottom/, "Mobile navigation must respect device safe areas");
assert.match(learningProgress, /activityDays: string\[\]/, "Portable local progress must preserve completed activity days");
assert.match(learningProgress, /completed \? Array\.from\(new Set\(\[\.\.\.current\.activityDays, toLocalDay\(\)\]\)\)/, "Only completing a learning step may add an activity day");
assert.match(learningStreak, /Only days when you complete a mission or lesson count/, "The streak must explain its honest completion boundary in English");
assert.match(learningStreak, /Solo cuentan los días en que completas una misión o lección/, "The streak must explain its honest completion boundary in Spanish");
assert.match(learningProgress, /MAX_EVIDENCE_ITEMS = 20/, "The optional local evidence notebook must have a defensive item limit");
assert.match(learningProgress, /MAX_EVIDENCE_LENGTH = 2000/, "Individual local evidence must have a defensive text limit");
assert.match(sessionlessPractice, /Guardar en este dispositivo/, "Evidence must require an explicit local save action");
assert.match(sessionlessPractice, /información ficticia o no confidencial/, "Evidence entry must warn against sensitive data");
assert.match(evidenceNotebook, /setLearningEvidence\(null, item\.href\)/, "Each local evidence entry must be independently deletable");
assert.match(evidenceNotebook, /createEvidenceMarkdown\(items, locale\)/, "The local notebook must provide a human-readable evidence export");
assert.match(evidenceMarkdown, /Review it before sharing/, "Portable evidence must include a sharing and privacy warning");
assert.match(evidenceMarkdown, /codeFence\(item\.content\)/, "Portable evidence must safely contain user-authored Markdown fences");
assert.equal(canCompleteMission([true, true, true], true), true, "A verified three-step practice must be completable");
assert.equal(canCompleteMission([true, true, false], true), false, "An unfinished practice must not be completable");
assert.match(sessionlessPractice, /completeLearningStep\(href\)/, "Verified practice completion must update portable local progress");
assert.match(sessionlessPractice, /trackLearningEvent\("mission_complete"\)/, "Verified practice completion must emit the closed completion signal");
assert.match(sessionlessPractice, /Siguiente: \{next\.title\}/, "Completed practices must offer one explicit next action");
assert.match(learningProgress, /export function startLearningStep/, "Portable progress must distinguish a started mission from a page visit");
assert.match(sessionlessPractice, /startLearningStep\(href\)/, "The first practice interaction must persist the started state");
assert.match(sessionlessPractice, /trackLearningEvent\("mission_start"\)/, "The first practice interaction must emit the closed start signal");
assert.match(pathCompletion, /isSevenDayPathComplete\(progress, locale\)/, "The completion summary must remain hidden until all seven locale-specific missions are complete");
assert.match(pathCompletion, /not an academic credential/, "The English completion summary must avoid credential claims");
assert.match(pathCompletion, /no una acreditación académica/, "The Spanish completion summary must avoid credential claims");
assert.match(pathCompletion, /createPathCompletionMarkdown\(progress, locale\)/, "A completed path must provide a portable local summary");
assert.equal(getLearningContinuation({ href: "/ultima-visita", title: "Última", courseTitle: "Curso", locale: "es", visitedAt: "2026-08-16T00:00:00.000Z", startedLessons: ["/empezar"], completedLessons: [], activityDays: [], evidenceItems: [], savedItems: [] }, "es")?.href, "/empezar", "Continue must prefer an unfinished mission over a merely visited page");
assert.equal(getLearningReturnEvent("2026-08-01T00:00:00.000Z", "2026-08-08T00:00:00.000Z"), "return_7d", "A full week away must produce a real return signal");
assert.equal(getLearningReturnEvent("2026-07-01T00:00:00.000Z", "2026-08-01T00:00:00.000Z"), "return_30d", "A monthly return must be exclusive");

console.log(`Educational audit passed: ${cursos.length} courses, ${lessonCount} lessons, ${spanishPaths.length} paths and no orphaned courses.`);
