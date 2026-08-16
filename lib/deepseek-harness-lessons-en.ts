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
    slug: "models", title: "DeepSeek models, providers and cost",
    lead: "DSH separates the harness from the model. In this phase you configure DeepSeek as the primary provider, compare official models and measure cost, latency and quality without mixing in other local AI tutorials.",
    objectives: ["Configure the DeepSeek API key and choose a model.", "Compare V4-Flash and V4-Pro by task, cost and latency.", "Add other providers only when they provide a clear advantage."],
    sections: [
      { heading: "DeepSeek first", paragraphs: ["Start with the official DeepSeek provider because that is what this tutorial evaluates. In Settings -> Models, paste the API key from platform.deepseek.com and select the model for the mission.", "Use V4-Flash for most exploration, documentation and controlled-change tasks. Reserve V4-Pro for missions where reasoning failure costs more than the extra price or latency."], bullets: ["V4-Flash: balance of speed, cost and context.", "V4-Pro: stronger option for difficult tasks, deep reviews or complex plans.", "Thinking/reasoning: raise it only when the task justifies it; measurement matters more than maxing every switch."] },
      { heading: "Additional providers", paragraphs: ["DSH lets you swap provider without changing the harness. That does not mean you should connect everything: every provider adds a data policy, a bill and a failure surface.", "Add OpenAI, Anthropic, Google, Kimi or another provider only when you need to compare a concrete task or cover a clear limitation of the primary model."], code: "Provider decision:\n- task DeepSeek does not solve well\n- data policy reviewed\n- cost per outcome estimated\n- same prompt and workspace tested\n- decision recorded in the Trajectory" },
      { heading: "Real cost in DSH", paragraphs: ["Cost is not just token price. In an agent you must count turns, repeated context, cache, failed tool calls, retries and the human review afterwards.", "DSH becomes useful when you keep the Trajectory and metrics for every session: input/output tokens, cache hit rate, total time, mode and approval count."], code: "Comparison record:\nmodel:\nmode: Standard / Code / Minimal / Creator\nexact prompt:\ninput tokens:\noutput tokens:\ncache hit rate:\ntotal time:\nretries:\naccepted result: yes / no\nestimated cost:" },
      { heading: "Local models belong to another phase", paragraphs: ["This phase does not teach installation, network security, GPU checks or local-runtime troubleshooting. Those belong in Aulafy's local AI course.", "Inside DSH, the architecture point is narrower: a local model can act as a provider if its server is already working and validated. The server setup is taught separately so the two tutorials stay clean."], bullets: ["Here: select and measure providers inside DSH.", "Local AI: install, serve models, expose endpoint, GPU and local privacy.", "Phase 8: DeepSeek local-model limits and quantization from the DSH point of view."] },
    ], check: "Configure the official DeepSeek provider, run the same mission with V4-Flash and V4-Pro, and record cost, cache, turns, quality and decision.", takeaway: "DSH does not get better by having more providers; it gets better when you choose and measure the right model.",
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
    slug: "local-models", title: "Local DeepSeek models and quantization",
    lead: "This phase does not teach a local runtime from scratch: it analyzes when local or quantized DeepSeek models make sense in DSH, and when the official API is the better choice.",
    objectives: ["Understand the real limits of local DeepSeek on consumer hardware.", "Compare distilled models with large quantized models.", "Choose local, API or slow batch execution by task."],
    sections: [
      { heading: "Three deployment families", paragraphs: ["For DSH there are three distinct routes: the official DeepSeek API, smaller distilled models, and large quantized models with offloading. Do not turn them into one promise: each one fits a different kind of work.", "On 24 GB VRAM, medium distilled models are usually more realistic than trying to run a full large model. Huge Q1/Q2 models with SSD offloading can be useful for batch work, but they are not a fluid agent experience."], bullets: ["API: best starting point for productivity and long context.", "Local distills: privacy, low variable cost and bounded tasks.", "Q1/Q2 with offload: experimentation and long non-interactive jobs."] },
      { heading: "DSH decision table", paragraphs: ["Choose by mission, not ranking. An agent needs stable tool calling, permission following, good repository reading and enough latency for iteration.", "If the local model is so slow that you stop reviewing its actions, the system becomes less safe even if it is more private."], code: "Hardware / route           Reasonable DSH use\n8-16 GB RAM                small tests with lightweight distills\n24 GB VRAM                 14B/32B R1 distills for bounded tasks\nMac 64-128 GB + SSD        slow batch with aggressive quantization\nDeepSeek API               daily work, long context and productivity" },
      { heading: "Minimum benchmark", paragraphs: ["Do not copy tokens-per-second figures from the internet. Run the same prompt, workspace and mode several times. Record quality and time to a usable result.", "Always compare against V4-Flash or V4-Pro so you know whether local savings compensate for speed, quality or coordination loss."], code: "Local vs API DSH measurement:\n- exact model and quantization\n- runtime used\n- hardware and memory\n- DSH mode\n- configured context\n- tokens per second\n- cache hit rate\n- total time\n- accepted result\n- retries needed" },
      { heading: "Connect without making this another tutorial", paragraphs: ["DSH only needs the local runtime to expose an endpoint compatible with the provider you declare. Installation, GPU, network security and runtime troubleshooting belong in the local AI tutorial.", "In this phase, only validate that the endpoint responds, the model name matches and the Trajectory clearly records whether a task ran locally or through the API."], code: "Before using a local model in DSH:\n- local runtime already tested outside DSH\n- exact model and license reviewed\n- endpoint exposed only where intended\n- first test uses no sensitive data\n- comparison against DeepSeek API saved" },
    ], check: "Compare one read-only mission with the DeepSeek API and with a local or distilled DeepSeek model. Record speed, quality, cache and decision.", takeaway: "Local is not automatically better; it is better when task, hardware and policy fit.",
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
