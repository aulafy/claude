import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export const metadata: Metadata = {
  title: "Fuentes oficiales de Aulafy",
  description:
    "Fuentes oficiales usadas por Aulafy para cursos de IA open source: Anthropic, Fable 5, Ollama, Godot, Blender, CAD, vLLM, LangGraph, n8n, Qdrant, OWASP, NIST, Next.js y Vercel.",
  keywords: [
    "fuentes Aulafy",
    "documentación IA open source",
    "fuentes cursos IA",
    "documentación Claude Code",
    "documentación Fable 5",
    "documentación Godot Blender",
    "documentación Ollama",
    "OWASP LLM",
  ],
  alternates: { canonical: "/fuentes" },
  openGraph: {
    title: "Fuentes oficiales de Aulafy",
    description:
      "Documentación y repositorios usados para contrastar los cursos prácticos de IA open source en Aulafy.",
    url: "/fuentes",
    type: "article",
    locale: "es_ES",
    siteName: "Aulafy",
  },
};

const fuentes = [
  {
    area: "Claude Code y Claude",
    links: [
      { name: "Anthropic Claude Code", href: "https://www.anthropic.com/product/claude-code" },
      { name: "Claude Platform Docs", href: "https://platform.claude.com/docs" },
      { name: "Anthropic Claude Fable 5", href: "https://www.anthropic.com/news/claude-fable-5-mythos-5" },
      { name: "Claude Models Overview", href: "https://docs.anthropic.com/en/docs/about-claude/models/overview" },
      { name: "Claude Pricing", href: "https://docs.anthropic.com/en/docs/about-claude/pricing" },
      { name: "Anthropic Fable safeguards", href: "https://www.anthropic.com/news/fable-safeguards-jailbreak-framework" },
    ],
  },
  {
    area: "Videojuegos, 3D y CAD",
    links: [
      { name: "Godot Docs", href: "https://docs.godotengine.org/" },
      { name: "Godot CharacterBody3D", href: "https://docs.godotengine.org/en/stable/classes/class_characterbody3d.html" },
      { name: "Godot Web Export", href: "https://docs.godotengine.org/en/latest/tutorials/export/exporting_for_web.html" },
      { name: "Blender Python API", href: "https://docs.blender.org/api/current/" },
      { name: "Blender glTF 2.0", href: "https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html" },
      { name: "Three.js GLTFLoader", href: "https://threejs.org/docs/pages/GLTFLoader.html" },
      { name: "Unity importing Blender files", href: "https://docs.unity3d.com/530/Documentation/Manual/HOWTO-ImportObjectBlender.html" },
      { name: "Autodesk AutoLISP", href: "https://help.autodesk.com/cloudhelp/2026/PTB/AutoCAD-LT-AutoLISP/files/GUID-E1BD97BB-FAE6-40DF-B7B3-CE4BBD0241C4.htm" },
      { name: "Autodesk Fusion Generative Design", href: "https://www.autodesk.com/solutions/generative-design/manufacturing" },
      { name: "Autodesk Revit Interference Check", href: "https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/How-to-run-an-interference-check-between-elements-in-Revit.html" },
    ],
  },
  {
    area: "IA local y modelos abiertos",
    links: [
      { name: "Ollama Docs", href: "https://docs.ollama.com/" },
      { name: "Ollama API", href: "https://docs.ollama.com/api" },
      { name: "Ollama Hermes integration", href: "https://docs.ollama.com/integrations/hermes" },
      { name: "Ollama Claude Code integration", href: "https://docs.ollama.com/integrations/claude-code" },
      { name: "Ollama Context Length", href: "https://docs.ollama.com/context-length" },
      { name: "Ollama Library", href: "https://ollama.com/library" },
      { name: "MLX Docs", href: "https://ml-explore.github.io/mlx/" },
      { name: "MLX LM", href: "https://github.com/ml-explore/mlx-lm" },
      { name: "LM Studio", href: "https://lmstudio.ai/" },
      { name: "Open WebUI", href: "https://docs.openwebui.com/" },
      { name: "Open WebUI Tools & Functions", href: "https://docs.openwebui.com/features/extensibility/plugin/" },
      { name: "Qdrant Docs", href: "https://qdrant.tech/documentation/" },
      { name: "Qdrant Filtering", href: "https://qdrant.tech/documentation/concepts/filtering/" },
      { name: "Google Gemma 4 model card", href: "https://ai.google.dev/gemma/docs/core/model_card_4" },
      { name: "Obsidian Markdown syntax", href: "https://obsidian.md/help/syntax" },
      { name: "Obsidian Flavored Markdown", href: "https://obsidian.md/help/obsidian-flavored-markdown" },
    ],
  },
  {
    area: "Serving local, GPU y cuantización",
    links: [
      { name: "vLLM Quantized KV Cache", href: "https://docs.vllm.ai/en/latest/features/quantization/quantized_kvcache/" },
      { name: "llama.cpp multi-GPU", href: "https://github.com/ggml-org/llama.cpp/blob/master/docs/multi-gpu.md" },
      { name: "llama.cpp quantization", href: "https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md" },
      { name: "NVIDIA CUDA on WSL", href: "https://docs.nvidia.com/cuda/wsl-user-guide/index.html" },
      { name: "Microsoft CUDA on WSL 2", href: "https://learn.microsoft.com/en-us/windows/ai/directml/gpu-cuda-in-wsl" },
    ],
  },
  {
    area: "Agentes y automatización",
    links: [
      { name: "R CLI by Ramón Guillamón", href: "https://github.com/raym33/r" },
      { name: "Hermes Agent Docs", href: "https://hermes-agent.nousresearch.com/docs/" },
      { name: "Hermes Skills System", href: "https://hermes-agent.nousresearch.com/docs/user-guide/features/skills" },
      { name: "Hermes Mixture of Agents", href: "https://hermes-agent.nousresearch.com/docs/user-guide/features/mixture-of-agents" },
      { name: "Hermes Agent Providers", href: "https://hermes-agent.nousresearch.com/docs/integrations/providers" },
      { name: "LangGraph Docs", href: "https://docs.langchain.com/oss/python/langgraph/overview" },
      { name: "LangGraph Persistence", href: "https://docs.langchain.com/oss/python/langgraph/persistence" },
      { name: "n8n Docs", href: "https://docs.n8n.io/" },
      { name: "n8n Queue Mode", href: "https://docs.n8n.io/hosting/scaling/queue-mode/" },
      { name: "Model Context Protocol", href: "https://modelcontextprotocol.io/" },
      { name: "MCP Build Server", href: "https://modelcontextprotocol.io/docs/develop/build-server" },
      { name: "MCP Python SDK", href: "https://py.sdk.modelcontextprotocol.io/" },
      { name: "MCP Specification", href: "https://modelcontextprotocol.io/specification/2025-03-26" },
      { name: "MCP Tools", href: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools" },
    ],
  },
  {
    area: "CLI, empaquetado Python y terminal",
    links: [
      { name: "Click Documentation", href: "https://click.palletsprojects.com/" },
      { name: "Rich Documentation", href: "https://rich.readthedocs.io/" },
      { name: "Python Packaging: pyproject.toml", href: "https://packaging.python.org/en/latest/guides/writing-pyproject-toml/" },
      { name: "SQLite Documentation", href: "https://www.sqlite.org/docs.html" },
    ],
  },
  {
    area: "Gateways, routing y despliegue",
    links: [
      { name: "LiteLLM Docs", href: "https://docs.litellm.ai/" },
      { name: "LiteLLM Routing", href: "https://docs.litellm.ai/docs/routing-load-balancing" },
      { name: "LiteLLM Fallbacks", href: "https://docs.litellm.ai/docs/proxy/reliability" },
      { name: "Docker Compose", href: "https://docs.docker.com/compose/" },
      { name: "Docker Compose Profiles", href: "https://docs.docker.com/compose/how-tos/profiles/" },
      { name: "Chunkr GitHub", href: "https://github.com/lumina-ai-inc/chunkr" },
      { name: "Chunkr Docs", href: "https://legacy-docs.chunkr.ai/introduction" },
    ],
  },
  {
    area: "Observabilidad de LLMs y agentes",
    links: [
      { name: "Langfuse Observability", href: "https://langfuse.com/docs/observability/overview" },
      { name: "Langfuse Tracing", href: "https://langfuse.com/docs/observability/get-started" },
      { name: "OpenTelemetry Traces", href: "https://opentelemetry.io/docs/concepts/signals/traces/" },
    ],
  },
  {
    area: "Seguridad, privacidad y evaluación",
    links: [
      { name: "OWASP Top 10 for LLM Applications", href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
      { name: "OWASP GenAI Security Project", href: "https://genai.owasp.org/llm-top-10/" },
      { name: "NIST AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework" },
    ],
  },
  {
    area: "Despliegue web y documentación técnica",
    links: [
      { name: "Next.js Docs", href: "https://nextjs.org/docs" },
      { name: "Vercel Docs", href: "https://vercel.com/docs" },
      { name: "Schema.org", href: "https://schema.org/" },
      { name: "Google Search Central", href: "https://developers.google.com/search/docs" },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/fuentes#webpage`,
  url: `${SITE_URL}/fuentes`,
  name: "Fuentes oficiales de Aulafy",
  description:
    "Fuentes oficiales y documentación usadas para contrastar los cursos de inteligencia artificial open source de Aulafy.",
  inLanguage: "es",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: fuentes.map((fuente) => fuente.area),
};

export default function Fuentes() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Fuentes</span>
      </div>

      <div className="mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 text-xl border border-orange-500/20 mb-5">
          <Icon name="link" />
        </div>
        <h1 className="font-display font-extrabold text-4xl text-white mb-4">
          Fuentes oficiales de Aulafy
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Los cursos de Aulafy se contrastan con documentación oficial, repositorios públicos y
          pruebas reproducibles. Esta página reúne las fuentes principales para facilitar verificación,
          citación y actualización editorial.
        </p>
      </div>

      <div className="grid gap-5">
        {fuentes.map((grupo) => (
          <section key={grupo.area} className="rounded-2xl border border-zinc-800 bg-zinc-900/35 p-6">
            <h2 className="font-display font-bold text-xl text-white">{grupo.area}</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {grupo.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-300 hover:border-zinc-600 transition-colors"
                >
                  <span>{link.name}</span>
                  <Icon name="external" className="text-zinc-500" />
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="prose mt-10">
        <h2>Cómo se usan estas fuentes</h2>
        <p>
          Aulafy prioriza documentación oficial para comandos, APIs, instalación y seguridad.
          Cuando una herramienta cambia, las lecciones se revisan para mantener rutas reproducibles,
          advertencias de privacidad y límites claros. Las páginas educativas no sustituyen la
          documentación oficial: la traducen a proyectos prácticos en español.
        </p>
      </div>
    </div>
  );
}
