import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "DeepSeek Harness (DSH): what it is and how it works — Aulafy",
  description: "The first phase of Aulafy's DeepSeek Harness tutorial: models, plugins, sessions, workspaces, local models and agent safety.",
  alternates: { canonical: "/en/courses/deepseek-harness/introduction" },
};

export default function Page() {
  return (
    <Chapter
      crumb="DeepSeek Harness · Phase 1"
      title="What is DeepSeek Harness and why does it matter?"
      icon="terminal"
      lead={<>DeepSeek Harness (DSH) is an execution layer that turns a language model into an agent able to read and edit files, use tools, keep sessions and request approvals. This ten-phase series goes from the first safe run to local, auditable workflows.</>}
      courseHref="/cursos/deepseek-harness"
      courseLabel="DeepSeek Harness (DSH)"
    >
      <Cuidado>
        DSH is early-stage software. Its interface, packages and model names may change. Always check the official documentation and repository before using commands in production. Community performance figures are indicative, not guarantees.
      </Cuidado>

      <Objetivos>
        <ul>
          <li>Understand the difference between a model and the harness around it.</li>
          <li>Understand plugins, profiles, sessions, workspaces and subagents.</li>
          <li>Choose API or local models based on privacy, cost and hardware.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>The formula: model + harness</h2>
        <p>The model provides language understanding and generation. The harness provides the operating body: tools, permissions, session memory, interface, action logs and a loop that decides when to call each tool.</p>
      </div>

      <Terminal>{`Agent = Model + Harness

Model: reasoning and generation
Harness: tools, permissions, sessions and traceability`}</Terminal>

      <div className="prose">
        <h2>Everything is a plugin</h2>
        <p>DSH is built around the idea that models, tools, skills, sessions, storage and the interface can be swapped as components. This makes it possible to test providers and build specialized profiles without rewriting the whole agent.</p>
        <ul>
          <li><strong>Profile:</strong> a composable configuration of plugins and permissions.</li>
          <li><strong>Session:</strong> a record of prompts, decisions, calls and results.</li>
          <li><strong>Workspace:</strong> the explicit folder where the agent is allowed to work.</li>
          <li><strong>Skills:</strong> reusable instructions for focused tasks.</li>
          <li><strong>Subagents:</strong> secondary agents that split a complex mission.</li>
        </ul>
      </div>

      <Idea>
        The value is not that DSH magically makes a model smarter. The value is that it makes the surrounding system configurable and visible: what the agent can touch, which tools it uses, what gets logged and when it must ask for approval.
      </Idea>

      <div className="prose">
        <h2>Cloud and local</h2>
        <p>You can start with a cloud provider for speed, then connect an OpenAI-compatible endpoint such as Ollama to test local models. On a 24 GB GPU, smaller or distilled models are usually the realistic choice; very large models may run with SSD offloading, but often too slowly for fluid conversation.</p>
        <p>The right choice depends on the task: privacy and cost favour local models, while speed, context and peak capability may favour an API. Measure the complete result, not tokens per second alone.</p>
      </div>

      <div className="prose">
        <h2>The ten-phase roadmap</h2>
        <ol>
          <li>Introduction and architecture.</li>
          <li>Installation and a read-only first session.</li>
          <li>Official models, providers and Ollama.</li>
          <li>Standard, Code/PTC, Minimal and Creator modes.</li>
          <li>Workspaces, permissions and security.</li>
          <li>Plugins and custom profiles.</li>
          <li>Subagents, skills and orchestration.</li>
          <li>Quantization and local models.</li>
          <li>Use cases, metrics and benchmarks.</li>
          <li>Troubleshooting and production.</li>
        </ol>
      </div>

      <Comprueba>
        In your own words, explain which part is the model and which part is the harness. Then define a test workspace and write down one action that should require human approval.
      </Comprueba>

      <Guardar>
        Treat DSH as a configurable, auditable agent architecture, not as a magical clone of another tool. That distinction will help you choose models, plugins and permissions with care.
      </Guardar>

      <ChapterNav next={{ href: "/en/courses/deepseek-harness/installation", label: "Installation and a safe first session" }} />
    </Chapter>
  );
}
