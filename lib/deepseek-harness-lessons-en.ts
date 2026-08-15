import type { DshLesson } from "@/lib/deepseek-harness-lessons";

export const dshEnglishLessons: DshLesson[] = [
  {
    slug: "installation", title: "Installation and a safe first session",
    lead: "Your first DSH session should make the agent observable, not powerful. Use an empty workspace and a read-only task.",
    objectives: ["Prepare Node.js and a disposable workspace.", "Start DSH's local interface.", "Complete a read-only inspection with evidence."],
    sections: [
      { heading: "Prepare a safe workspace", paragraphs: ["Use a fresh folder or a throwaway copy of a repository. Do not start with client data, production systems, secrets or uncommitted work.", "Check the official README for the currently supported package name and command before installing."], code: "node -v\n# Confirm the current DSH installation command in its official documentation\nnpx @deepseek-ai/dsh web" },
      { heading: "The first task", paragraphs: ["Select the test workspace and choose the most restrictive permission level. The first mission is an inspection, not an edit."], bullets: ["Do not grant full-system access.", "Ask for file references behind the summary.", "Save the result and action trace as evidence."], code: "Summarize this workspace.\nList main folders, configuration files and entry points.\nDo not modify anything. Cite the files you used." },
    ], check: "You have a test workspace, a read-only session and a saved summary with file references.", takeaway: "Visibility and limits come before automation.",
  },
  {
    slug: "models", title: "Cloud models, Ollama and hardware",
    lead: "DSH is the runtime and the model is replaceable. Choose a provider by privacy, cost, latency and task quality, not hype.",
    objectives: ["Configure a cloud provider safely.", "Understand an OpenAI-compatible endpoint.", "Compare one task locally and in the cloud."],
    sections: [
      { heading: "Two operating paths", paragraphs: ["An API can offer speed and stronger capability, but requires a careful review of retention, data residency and cost. A local model reduces data exposure, while its quality and speed depend on your hardware."], bullets: ["Cloud: a practical start for complex work.", "Local: useful for private testing after data minimization.", "Hybrid: classify risk before sending a task to any model."] },
      { heading: "Connect Ollama", paragraphs: ["When DSH accepts an OpenAI-compatible provider, Ollama can usually be exposed on its standard local endpoint. Start with a small model and use the exact local model name."], code: "ollama serve\nollama list\n\n# Common OpenAI-compatible endpoint\nhttp://127.0.0.1:11434/v1" },
      { heading: "Configuration you can verify", paragraphs: ["Official documentation confirms partial OpenAI compatibility at /v1/chat/completions and /v1/responses. An API key is required by some clients but ignored by local Ollama; use a local placeholder such as ollama, not a real key.", "At this review, Ollama 0.32.13 supports reasoning control in compatible endpoints, tools, JSON, streaming and vision when the selected model supports them. Capability depends on the model as well as Ollama, so always check the downloaded model card."], code: "# Verify the local server and available models\ncurl http://127.0.0.1:11434/api/tags\n\n# Non-streaming chat test\ncurl http://127.0.0.1:11434/api/chat -d '{\n  \"model\": \"qwen3:8b\",\n  \"messages\": [{\"role\": \"user\", \"content\": \"Reply only: ready\"}],\n  \"stream\": false\n}'\n\n# OpenAI client: base_url=http://127.0.0.1:11434/v1/\n# api_key=ollama (required by client, ignored locally)" },
      { heading: "Privacy and network exposure", paragraphs: ["Ollama listens on 127.0.0.1:11434 by default. Changing OLLAMA_HOST to 0.0.0.0 makes it reachable on the network: do not do this for a home test without a firewall, authentication or reverse proxy. The local API does not provide a security boundary for an untrusted network by itself.", "Local mode does not send prompts to Ollama Cloud. To prevent cloud models and associated web search by policy, official documentation specifies OLLAMA_NO_CLOUD=1 or disable_ollama_cloud in ~/.ollama/server.json; restart the server afterwards."], code: "# List variables supported by the installed version\nollama serve --help\n\n# Keep a test service on loopback only\nOLLAMA_HOST=127.0.0.1:11434 ollama serve\n\n# Disable cloud features by policy\nOLLAMA_NO_CLOUD=1 ollama serve" },
      { heading: "Memory, concurrency and loading", paragraphs: ["OLLAMA_KEEP_ALIVE controls how long a model remains loaded; the default is five minutes. For a continuously used API, set keep_alive per request or at server level, but do not keep large models resident without measuring VRAM.", "OLLAMA_NUM_PARALLEL multiplies effective context and required memory. Before increasing concurrency, measure consumption and set a context limit. OLLAMA_MAX_LOADED_MODELS controls concurrent models and OLLAMA_MAX_QUEUE handles excess requests."], code: "# Preload and keep a model loaded for this request\ncurl http://127.0.0.1:11434/api/generate -d '{\"model\":\"qwen3:8b\",\"keep_alive\":-1}'\n\n# Unload and free memory\nollama stop qwen3:8b\n\n# Context and concurrency apply after server restart\nOLLAMA_CONTEXT_LENGTH=8192 OLLAMA_NUM_PARALLEL=1 ollama serve" },
    ], check: "Run the same non-sensitive task on one cloud and one local model; record time, quality, retries and approximate cost.", takeaway: "A fast model that makes you redo the work is not cheap.",
  },
  {
    slug: "modes", title: "Execution modes: choosing the right one",
    lead: "A mode or profile determines the agent's tools and permissions. Give it the least power required for the mission.",
    objectives: ["Separate inspection, editing and automation.", "Create conservative profiles for each task.", "Prevent an agent from doing more than requested."],
    sections: [
      { heading: "Profile before impulse", paragraphs: ["Specific profile names may change with the product, but the pattern is stable: one for inspection, one for controlled changes and one for experimentation. Do not use a full shell profile to summarize a folder."], bullets: ["Read-only: search and files, no writing.", "Bounded change: workspace edits plus explicit tests.", "Automation: only after repeatable proof and approvals for external actions."] },
      { heading: "Prompts that set boundaries", paragraphs: ["Prompt constraints do not replace permissions, but they reduce ambiguity and make the intended boundary auditable."], code: "Analyze the issue and propose a five-step plan.\nDo not write files or run commands until I approve the plan.\nState risks, affected files and verification steps." },
    ], check: "For one real task, write a permission profile and a prompt with an explicit boundary.", takeaway: "The right mode shrinks the blast radius of an error.",
  },
  {
    slug: "workspaces", title: "Workspaces, permissions and safety",
    lead: "The workspace is the agent's operating boundary. A well-defined boundary makes an experiment reviewable work.",
    objectives: ["Separate a sandbox from valuable repositories.", "Apply least privilege.", "Prepare recovery before allowing edits."],
    sections: [
      { heading: "Design the boundary", paragraphs: ["Create a dedicated working directory, limit the task to it and use Git before allowing writes. A workspace is not a complete security guarantee: review which tools the active profile can actually invoke."], code: "git status\ngit switch -c dsh/controlled-test\ngit add -A && git commit -m \"State before DSH\"" },
      { heading: "Operating rules", paragraphs: ["Define in advance what the agent may read, write, execute and communicate. Irreversible or external actions need a human approval."], bullets: ["Keep secrets out of prompts, logs and screenshots.", "Do not connect production during early tests.", "Review the diff before accepting changes.", "Stop the session when it leaves the stated goal."] },
    ], check: "Save the initial commit hash and the granted permissions. You should be able to return to the starting point without losing work.", takeaway: "Useful safety is workflow design, not a warning at the end.",
  },
  {
    slug: "plugins", title: "Plugins and custom profiles",
    lead: "Plugins give the agent capabilities; a profile chooses the appropriate combination. Add one piece at a time and measure its effect.",
    objectives: ["Identify the capabilities a task actually needs.", "Avoid collecting unnecessary tools.", "Create a reproducible profile."],
    sections: [
      { heading: "Minimum capabilities", paragraphs: ["A code review may need search, read access and tests. A document summary does not need shell access. Every extra tool increases the error surface and audit burden."], bullets: ["Model: provider, name and parameters.", "Tools: files, shell, web or APIs only when necessary.", "Policy: which actions need confirmation.", "Observability: logs and execution evidence."] },
      { heading: "Regression check", paragraphs: ["After adding a plugin, repeat a short task you already know. If it worsens the result, raises cost or introduces unrequested actions, revert to the previous profile."], code: "Profile: read-only-review\nTools: search, read\nForbidden: write, network, destructive commands\nOutput: findings with file and line evidence" },
    ], check: "Document one profile with a name, purpose, allowed tools and one check it must pass.", takeaway: "Modular does not mean installing everything; it means justifying every part.",
  },
  {
    slug: "subagents", title: "Subagents, skills and orchestration",
    lead: "Split work by evidence and boundaries. A subagent does not replace judgement: it needs a small mission, a concrete output and a verification method.",
    objectives: ["Delegate exploration without losing control.", "Write a reusable skill.", "Consolidate conflicting findings."],
    sections: [
      { heading: "Split by questions", paragraphs: ["A good division separates research, implementation and verification. Do not send several agents to edit the same files: it creates conflicts and makes changes hard to attribute."], bullets: ["Agent A: repository map, read-only.", "Agent B: tests and risks, read-only.", "Agent C: minimal patch proposal, no writing.", "Human owner: decide, apply and validate."] },
      { heading: "A useful skill", paragraphs: ["A skill is a working recipe with an objective, boundaries, steps and evidence. Start with one repeated task before generalizing."], code: "Goal: review changes before merge.\nInput: diff and requirements.\nLimits: do not modify files; do not invent tests.\nOutput: prioritized findings with evidence and missing tests." },
    ], check: "Run two read-only tasks in parallel and compare their references before making a decision.", takeaway: "More agents do not create more truth; without clear missions they create more coordination work.",
  },
  {
    slug: "local-models", title: "Local models and quantization",
    lead: "Locally, the model that fits and gives sufficient quality beats a huge model that makes you wait. Measure memory, context and speed on your own machine.",
    objectives: ["Distinguish VRAM, RAM and context.", "Choose a sensible quantization.", "Know when SSD offloading is not appropriate."],
    sections: [
      { heading: "Capacity rule", paragraphs: ["The model file is not the whole story: context, cache and other applications consume memory. On a 24 GB GPU, medium-sized quantized models are usually more practical than massive models partially offloaded to CPU or SSD."], bullets: ["Q4: a good starting point when fit and speed matter.", "Q5: try it when you need more fidelity and have headroom.", "SSD offloading: suitable for long batch work, not fluid conversation."] },
      { heading: "Minimum benchmark", paragraphs: ["Do not copy tokens-per-second figures from the internet. Run the same prompt, context and task several times and record quality plus time to a usable result."], code: "Record:\n- model and quantization\n- VRAM/RAM used\n- configured context\n- tokens per second\n- time to an acceptable result\n- retries needed" },
      { heading: "Acceleration diagnostics", paragraphs: ["After every load, inspect ollama ps. Its Processor column tells you whether the model is 100% GPU, 100% CPU or split between both. Do not blame a quantization for slow performance before checking where the model was loaded.", "Ollama uses Metal on Apple Silicon and supports NVIDIA with CUDA, AMD with ROCm, and additional Vulkan support on Windows and Linux when the backend is available. With several GPUs, deliberately choose the device before benchmarking."], code: "# Shows model, context, expiry and CPU/GPU split\nollama ps\n\n# NVIDIA: inspect GPU and memory before running\nnvidia-smi\n\n# GPU selection examples (only when you know the desired device)\nCUDA_VISIBLE_DEVICES=0 ollama serve\nROCR_VISIBLE_DEVICES=0 ollama serve" },
      { heading: "Optimize without losing quality", paragraphs: ["Flash Attention is enabled automatically when backend and hardware support it. OLLAMA_FLASH_ATTENTION=1 can force it, but use it after measuring. For large contexts, OLLAMA_KV_CACHE_TYPE=q8_0 uses roughly half the cache memory of f16 with usually small loss; q4_0 saves more but requires your own evaluation.", "On a 24 GB GPU, prioritize a model and context that fit entirely before extreme quantization or CPU/SSD offloading. For an agent, reliable tool calling and test completion matter more than nominal model size."], code: "# Controlled test: change one variable at a time\nOLLAMA_FLASH_ATTENTION=1 \\\nOLLAMA_KV_CACHE_TYPE=q8_0 \\\nOLLAMA_CONTEXT_LENGTH=16384 \\\nollama serve\n\n# Inspect with ollama ps and repeat the same task" },
    ], check: "Choose two quantizations that fit your hardware and compare a verifiable coding or summarization task.", takeaway: "The relevant speed is time to finish the task well.",
  },
  {
    slug: "use-cases", title: "Use cases, metrics and benchmarks",
    lead: "Evaluate DSH with recognizable work: a real issue, a cited document or a reversible automation. Generic benchmarks only provide context.",
    objectives: ["Design a small evaluation suite.", "Measure quality, safety, cost and time.", "Choose a production-ready use case."],
    sections: [
      { heading: "Five tests that matter", paragraphs: ["Build a short suite before adopting an agent in a team. Preserve prompts, versions and results so you can detect regressions."], bullets: ["Code: a small issue with existing tests.", "Documents: a summary with citations and no invented facts.", "Tools: a reversible action with approval.", "Safety: an ambiguous or hostile instruction that should be rejected.", "Cost: total time and retries to an acceptable result."] },
      { heading: "Decision table", paragraphs: ["A production recommendation needs repeatable benefit and contained failure. If you cannot explain how an error is detected and reversed, keep it in pilot mode."], code: "Metric              Goal\nAcceptance rate     Usable without major rewrite\nReversal rate       Changes undone because of error\nTotal time          Request through verification\nIncidents           Actions outside policy\nCost per outcome    Not only cost per token" },
    ], check: "Run three cases and keep a table with result, evidence, time and decision: adopt, adjust or reject.", takeaway: "Evaluation bridges an impressive demo and a trustworthy tool.",
  },
  {
    slug: "production", title: "Troubleshooting and production operation",
    lead: "A production-ready agent knows when to stop, ask for help and leave a trace. Begin with reversible tasks and increase autonomy only with evidence.",
    objectives: ["Resolve common failures without widening permissions.", "Design useful, minimized logs.", "Define stop and rollback criteria."],
    sections: [
      { heading: "Diagnose in order", paragraphs: ["When a session fails, do not increase model size, context and permissions at the same time. Isolate one variable: configuration, provider, tool, permission, prompt or input data."], bullets: ["Cannot find files: check the path and workspace.", "Weak answers: narrow the task, add verifiable context and compare models.", "Tool failure: run its manual version before delegating it.", "Loops: set a turn limit and an exit condition."] },
      { heading: "Minimum operation", paragraphs: ["Record enough to reproduce a decision without copying sensitive data. Schedule reviews and keep a kill switch for automations."], code: "Minimum log:\n- profile and model version\n- objective and outcome\n- invoked tools\n- human approvals\n- error and recovery\n- diff or artifact reference\n- review date" },
    ], check: "Write a one-page runbook: how to start, what to inspect, how to stop, how to roll back and who to escalate to.", takeaway: "Production is not full access: it is controlled repetition, observability and the ability to return safely.",
  },
];

export function getDshEnglishLesson(slug: string) {
  return dshEnglishLessons.find((lesson) => lesson.slug === slug);
}
