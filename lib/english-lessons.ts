import englishLessonContent from "@/lib/english-lesson-content.json";
import { aiRouterLessons } from "@/lib/ai-router-course-content";
import { codexLessons } from "@/lib/codex-course-content";
import { foundationLessons } from "@/lib/foundation-course-content";
import { ollamaContextWindowLesson } from "@/lib/ollama-context-window-lesson";
import type { Curso, Seccion } from "@/lib/cursos";

export type EnglishLessonBlock = {
  type: "h2" | "h3" | "p" | "bullet" | "code" | "link";
  text: string;
  href?: string;
  external?: boolean;
};

export type EnglishLesson = {
  courseSlug: string;
  courseTitle: string;
  slug: string;
  title: string;
  heading?: string;
  description?: string;
  href: string;
  alternateRoute?: string | null;
  blocks: EnglishLessonBlock[];
};

const content = englishLessonContent as {
  generatedAt: string;
  source: string;
  lessons: EnglishLesson[];
};

const titleOverrides: Record<string, string> = {
  "claude-code/prompts": "Writing good prompts for Claude Code",
  "ia-local/ollama-gpu-windows": "Ollama Not Using GPU on Windows? NVIDIA, AMD & WSL2 Fixes",
  "ia-local/ollama-desde-cero": "Ollama from Scratch: Install & Run Local AI in 2026",
  "ia-local/prompts": "Writing good prompts for local AI",
};

const descriptionOverrides: Record<string, string> = {
  "ia-local/ollama-gpu-windows": "Diagnose and fix Ollama running on CPU in Windows. Check NVIDIA or AMD drivers, VRAM, WSL2, Docker and logs step by step.",
  "ia-local/ollama-desde-cero": "Learn Ollama from scratch on Windows, macOS and Linux. Run local AI models, use the API, fix context and GPU issues, and connect Codex or Claude Code.",
};

const ollamaFromScratchLesson: EnglishLesson = {
  courseSlug: "ia-local",
  courseTitle: "Claude Code + Local AI",
  slug: "ollama-desde-cero",
  title: "Ollama from Scratch: Install & Run Local AI in 2026",
  heading: "Ollama from Scratch",
  description: "Learn Ollama from scratch on Windows, macOS and Linux. Run local AI models, use the API, fix context and GPU issues, and connect Codex or Claude Code.",
  href: "/cursos/ia-local/ollama-desde-cero",
  blocks: [
    { type: "p", text: "Ollama is one of the simplest ways to run AI models on your own computer. Install it, download a model, and you can have a local assistant responding in minutes. This updated hub keeps the first setup simple, then shows what changes when you use APIs, context windows, coding agents, cloud models, or private documents. Editorial review: September 4, 2026." },
    { type: "h2", text: "What you will learn" },
    { type: "bullet", text: "Install and verify Ollama on Windows, macOS, or Linux." },
    { type: "bullet", text: "Run a first local model, inspect the processor and test the local API." },
    { type: "bullet", text: "Understand context, GPU offloading, local versus cloud models, and the API." },
    { type: "bullet", text: "Know when Ollama is the model runtime and when an agent is doing the work." },
    { type: "h2", text: "Ollama is a runtime, not a model or agent" },
    { type: "p", text: "Ollama downloads models, loads them into memory, runs inference, manages context, and exposes an API. Qwen, Gemma, Llama, Mistral, and gpt-oss are models that can run through it. A coding agent such as Codex or Claude Code is another layer: it gives a model tools, permissions, and an action loop." },
    { type: "code", text: "Your application\n      ↓\n    Ollama\n      ↓\n  AI model\n      ↓\nCPU / GPU / unified memory" },
    { type: "p", text: "That distinction matters for safety. Ollama does not edit a repository or send an email by itself. The surrounding application or agent decides whether a tool can do that." },
    { type: "h2", text: "Is Ollama really local?" },
    { type: "p", text: "A downloaded local model can run on your machine and your application normally talks to http://localhost:11434. Ollama also supports cloud models, which are offloaded to Ollama's service and require an account. Do not treat the Ollama app itself as proof that inference is local: check the model and the endpoint before sending private data." },
    { type: "h2", text: "Choose realistic hardware expectations" },
    { type: "p", text: "There is no universal RAM number for a model. Quantization, model architecture, context length, KV cache, multimodal input, and GPU offloading all change memory use. Treat these as starting points, then measure on your own machine." },
    { type: "bullet", text: "8 GB RAM: small 1B-4B models, basic chat and experimentation." },
    { type: "bullet", text: "16 GB RAM: many 3B-8B quantized models and light local apps." },
    { type: "bullet", text: "32 GB RAM: more comfortable document, RAG, and longer-context experiments." },
    { type: "bullet", text: "64 GB or more: larger models, heavier contexts, agents, or several local services." },
    { type: "link", text: "Choose hardware and models that really fit your machine", href: "/en/courses/ia-local/hardware-minimo-2026" },
    { type: "h2", text: "Install Ollama" },
    { type: "p", text: "Download the official application for Windows or macOS. On macOS, Ollama requires Sonoma (14) or newer; Apple M series has CPU and GPU support while Intel Macs are CPU-only. On Linux, use the official installer and verify the service. Keep port 11434 on localhost until you have authentication and network controls in place." },
    { type: "code", text: "# Linux\ncurl -fsSL https://ollama.com/install.sh | sh\n\n# All systems\nollama --version\nollama list\n\n# Linux service check\nsystemctl status ollama" },
    { type: "h2", text: "Run your first model" },
    { type: "p", text: "Start with a small model available in the official library. The exact tags change, so copy the current tag rather than treating a tutorial example as permanent. Qwen3 4B is a reasonable small-model example when its current library tag fits your hardware." },
    { type: "code", text: "ollama run qwen3:4b\n\n# Inside the chat:\nExplain local AI in two sentences.\n\n# Leave the chat:\n/bye" },
    { type: "h2", text: "The commands you will actually use" },
    { type: "code", text: "ollama\nollama list\nollama ps\nollama run qwen3:4b\nollama pull qwen3:4b\nollama rm MODEL:TAG" },
    { type: "p", text: "ollama list shows stored models. ollama ps shows loaded models, their processor split, allocated context, and unload time. Run it before debugging a slow application." },
    { type: "h2", text: "Verify the local API before building anything" },
    { type: "p", text: "Ollama's local API is served by default at http://localhost:11434/api. First check the service, then make one non-streaming request. If these fail, fix Ollama before debugging RAG, Docker, or an agent." },
    { type: "code", text: "curl http://127.0.0.1:11434/api/tags\n\ncurl http://127.0.0.1:11434/api/generate -d '{\n  \"model\": \"qwen3:4b\",\n  \"prompt\": \"Reply with exactly: OLLAMA API WORKS\",\n  \"stream\": false\n}'" },
    { type: "h2", text: "Check CPU, GPU, and context" },
    { type: "p", text: "A successful response does not prove GPU acceleration. Run a model, then inspect ollama ps. On NVIDIA systems, nvidia-smi can provide a second signal while generation is running. Do not assume a GPU backend works from its name alone: driver, operating system, model size, and available VRAM all matter." },
    { type: "code", text: "ollama ps\n\n# NVIDIA, while a model is generating\nnvidia-smi" },
    { type: "link", text: "Ollama is not using the GPU on Windows: structured diagnosis", href: "/en/courses/ia-local/ollama-gpu-windows" },
    { type: "h2", text: "Context length: use enough, not the maximum" },
    { type: "p", text: "Ollama documents defaults of 4K below 24 GiB VRAM, 32K at 24-48 GiB, and 256K at 48 GiB or more. It recommends at least 64K for web search, coding tools, and agents. More context needs more memory, so increasing it blindly can make a usable setup slow or force CPU offloading." },
    { type: "code", text: "# One documented way to set a 64K context when serving Ollama\nOLLAMA_CONTEXT_LENGTH=64000 ollama serve\n\n# Check the effective context and processor split\nollama ps" },
    { type: "link", text: "Ollama context length: what 4K, 32K, and 64K change", href: "/en/courses/ia-local/ollama-context-window-32k" },
    { type: "h2", text: "Use the native API or OpenAI-compatible API" },
    { type: "p", text: "The native API is the most direct option for a local app. Ollama also supports parts of the OpenAI API, so an existing application can often use http://localhost:11434/v1/ as its base URL. Compatibility is endpoint- and field-specific, not a promise that every OpenAI feature behaves identically." },
    { type: "code", text: "from openai import OpenAI\n\nclient = OpenAI(\n    base_url=\"http://localhost:11434/v1/\",\n    api_key=\"ollama\",  # required by the client, ignored locally\n)\n\nresponse = client.chat.completions.create(\n    model=\"qwen3:4b\",\n    messages=[{\"role\": \"user\", \"content\": \"What does Ollama do?\"}],\n)\nprint(response.choices[0].message.content)" },
    { type: "h2", text: "Embeddings, RAG, vision, and tools come next" },
    { type: "p", text: "Ollama can serve embeddings for semantic search and RAG, and compatible models can support vision or tool calling. Those are separate design problems from getting a first chat running: an embedding model, retrieval quality, citations, permissions, and data retention all need their own evaluation." },
    { type: "link", text: "Build private document search with Open WebUI, Ollama, and Qdrant", href: "/en/courses/ia-local/open-webui-qdrant" },
    { type: "link", text: "Tool calling with local models", href: "/en/courses/ia-local/tool-calling-modelos-locales" },
    { type: "h2", text: "Codex and Claude Code: Ollama runs the model, the agent runs the workflow" },
    { type: "p", text: "Current Ollama integrations can launch supported coding tools. Codex and Claude Code need a model with adequate context, tool-call quality, speed, and memory; a small model that feels good in chat may fail on a repository. Start in a disposable project and keep normal permission and review controls." },
    { type: "code", text: "ollama launch codex\nollama launch claude\n\n# Inspect available integrations on your installed version\nollama" },
    { type: "link", text: "Connect Claude Code to local AI", href: "/en/courses/ia-local/conectar-ollama" },
    { type: "link", text: "Build coding agents with local models", href: "/en/courses/ia-local/agentes-codigo-locales" },
    { type: "h2", text: "Common mistakes" },
    { type: "bullet", text: "Installing a model that is too large, then blaming the prompt instead of memory or CPU offloading." },
    { type: "bullet", text: "Assuming the GPU is active without checking ollama ps or a hardware monitor." },
    { type: "bullet", text: "Raising context to 64K or 256K without measuring the additional memory cost." },
    { type: "bullet", text: "Exposing localhost:11434 to a network or the public internet without authentication and access controls." },
    { type: "bullet", text: "Treating a cloud model as local because it is launched from the Ollama CLI." },
    { type: "bullet", text: "Confusing a model runtime with an agent that can call tools or edit files." },
    { type: "h2", text: "Your practical mission" },
    { type: "p", text: "Save one short diagnostic note: operating system, Ollama version, model tag, output of ollama ps, and whether the API check passed. That is the evidence you need for the next lesson and the first thing to share when asking for help." },
    { type: "code", text: "ollama --version\nollama run qwen3:4b\nollama ps\ncurl http://127.0.0.1:11434/api/tags" },
    { type: "h2", text: "Official sources, checked September 4, 2026" },
    { type: "link", text: "Ollama Quickstart", href: "https://docs.ollama.com/quickstart", external: true },
    { type: "link", text: "Ollama context length", href: "https://docs.ollama.com/context-length", external: true },
    { type: "link", text: "Ollama API introduction and OpenAI compatibility", href: "https://docs.ollama.com/api/openai-compatibility", external: true },
    { type: "link", text: "Ollama Codex CLI integration", href: "https://docs.ollama.com/integrations/codex", external: true },
    { type: "link", text: "Ollama Claude Code integration", href: "https://docs.ollama.com/integrations/claude-code", external: true },
    { type: "link", text: "Ollama cloud models", href: "https://docs.ollama.com/cloud", external: true },
  ],
};

const claudeCodeAugustUpdates: Record<string, EnglishLessonBlock[]> = {
  permisos: [
    { type: "h2", text: "August 2026 update: Auto mode is not bypass" },
    { type: "p", text: "Auto mode uses a classifier to decide whether an action can run or must stop. Availability and activation may depend on your account and managed policy. Do not assume every session starts in Auto mode: check /permissions or /config for the effective mode." },
    { type: "p", text: "Auto mode is a decision layer, not a safety guarantee. Keep secrets out of context, inspect git diff before publishing, and use an isolated environment for tasks that can delete data or modify production." },
    { type: "h3", text: "Verified sources" },
    { type: "p", text: "Review the current Anthropic IAM and CLI reference together with the Claude Code v2.1.233 release notes. This lesson was reviewed on August 16, 2026." },
  ],
  subagentes: [
    { type: "h2", text: "What changed in v2.1.232" },
    { type: "p", text: "A subagent with subagent_type: \"fork\" can inherit the full conversation and prompt cache. Non-teammate agent spawns from interactive sessions now run in the background by default." },
    { type: "p", text: "Do not treat every subagent as a fork. Use isolated subagents for bounded research or review, use a fork when the full history is necessary, and use /fork when you want a separate visible background session. More agents add cost and coordination; start with one." },
    { type: "h3", text: "Verified source" },
    { type: "p", text: "Claude Code v2.1.232 release notes, reviewed August 16, 2026." },
  ],
  flujos: [
    { type: "h2", text: "Cross-session messages" },
    { type: "p", text: "Since Claude Code v2.1.232, type @ in the prompt to mention another live session by name. Claude uses SendMessage to pass the finding directly. Use claude agents to inspect available sessions." },
    { type: "p", text: "Use /config to accept, hold, or refuse incoming messages. Send a concise finding rather than secrets or hidden decisions, and verify the receiving session's result before integration." },
    { type: "h3", text: "Verified source" },
    { type: "p", text: "Claude Code v2.1.232 and v2.1.224 release notes, reviewed August 16, 2026." },
  ],
};

const translatedLessons = content.lessons.map((lesson) => ({
  ...(lesson.courseSlug === "ia-local" && lesson.slug === "ollama-desde-cero" ? ollamaFromScratchLesson : lesson),
  title: titleOverrides[`${lesson.courseSlug}/${lesson.slug}`] ?? (lesson.courseSlug === "ia-local" && lesson.slug === "ollama-desde-cero" ? ollamaFromScratchLesson.title : lesson.title),
  blocks: lesson.courseSlug === "ia-local" && lesson.slug === "ollama-desde-cero"
    ? ollamaFromScratchLesson.blocks
    : lesson.courseSlug === "claude-code" && claudeCodeAugustUpdates[lesson.slug]
      ? [...lesson.blocks, ...claudeCodeAugustUpdates[lesson.slug]]
      : lesson.blocks,
}));

const codexEnglishLessons: EnglishLesson[] = codexLessons.map((lesson) => ({
  courseSlug: "codex-programadores",
  courseTitle: "Codex for programmers",
  slug: lesson.slug,
  title: lesson.title.en,
  href: `/en/courses/codex-programadores/${lesson.slug}`,
  blocks: [{ type: "p", text: lesson.lead.en }, ...lesson.blocks.en],
}));

const foundationEnglishLessons: EnglishLesson[] = foundationLessons.map((lesson) => ({
  courseSlug: "fundamentos-aulafy",
  courseTitle: "Aulafy foundations",
  slug: lesson.slug,
  title: lesson.title.en,
  href: `/en/courses/fundamentos-aulafy/${lesson.slug}`,
  blocks: [{ type: "p", text: lesson.lead.en }, ...lesson.blocks.en],
}));

const aiRouterEnglishLessons: EnglishLesson[] = aiRouterLessons.map((lesson) => ({
  courseSlug: "ai-router",
  courseTitle: "AI Router and content system",
  slug: lesson.slug,
  title: lesson.title.en,
  href: `/en/courses/ai-router/${lesson.slug}`,
  blocks: [{ type: "p", text: lesson.lead.en }, ...lesson.blocks.en],
}));

const troubleshootingBacklink: EnglishLessonBlock = {
  type: "link",
  text: "Model works but forgets earlier files or instructions? Check the context window Ollama actually loaded.",
  href: "/en/courses/ia-local/ollama-context-window-32k",
};

const lessonsWithContextBacklink = translatedLessons.map((lesson) =>
  lesson.courseSlug === "ia-local" && lesson.slug === "troubleshooting-ollama"
    ? { ...lesson, blocks: [...lesson.blocks, troubleshootingBacklink] }
    : lesson,
);

const allLessons = [
  ...lessonsWithContextBacklink,
  ollamaContextWindowLesson,
  ...codexEnglishLessons,
  ...foundationEnglishLessons,
  ...aiRouterEnglishLessons,
];
const lessonsByKey = new Map(allLessons.map((lesson) => [`${lesson.courseSlug}/${lesson.slug}`, lesson]));

export function getEnglishLesson(courseSlug: string, lessonSlug: string) {
  return lessonsByKey.get(`${courseSlug}/${lessonSlug}`);
}

export function getEnglishLessons() {
  return allLessons;
}

export function getEnglishLessonsByCourse(courseSlug: string) {
  return allLessons.filter((lesson) => lesson.courseSlug === courseSlug);
}

export function getEnglishLessonTitle(courseSlug: string, lessonSlug: string, fallback: string) {
  return getEnglishLesson(courseSlug, lessonSlug)?.title ?? fallback;
}

export function getEnglishLessonHeading(courseSlug: string, lessonSlug: string, fallback: string) {
  const lesson = getEnglishLesson(courseSlug, lessonSlug);
  return lesson?.heading ?? lesson?.title ?? fallback;
}

export function getEnglishCourseSections(course: Curso): Seccion[] {
  if (course.slug !== "ia-local") return course.secciones;

  return course.secciones.map((section) => {
    const insertionIndex = section.lecciones.findIndex((lesson) => lesson.slug === "troubleshooting-ollama");
    if (insertionIndex < 0) return section;
    return {
      ...section,
      lecciones: [
        ...section.lecciones.slice(0, insertionIndex + 1),
        { slug: ollamaContextWindowLesson.slug, title: ollamaContextWindowLesson.heading ?? ollamaContextWindowLesson.title },
        ...section.lecciones.slice(insertionIndex + 1),
      ],
    };
  });
}

export function getEnglishLessonDescription(lesson: EnglishLesson) {
  if (lesson.description) return lesson.description;
  const override = descriptionOverrides[`${lesson.courseSlug}/${lesson.slug}`];
  if (override) return override;
  const firstParagraph = lesson.blocks.find((block) => block.type === "p")?.text ?? lesson.title;
  if (firstParagraph.length <= 155) return firstParagraph;
  const trimmed = firstParagraph.slice(0, 152);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 110 ? lastSpace : 152)}...`;
}

export const englishLessonGeneratedAt = content.generatedAt;
