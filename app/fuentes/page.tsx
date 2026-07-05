import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export const metadata: Metadata = {
  title: "Fuentes oficiales de Aulafy",
  description:
    "Fuentes oficiales usadas por Aulafy para cursos de IA open source: Anthropic, Ollama, vLLM, llama.cpp, LangGraph, n8n, Qdrant, OWASP, NIST, Next.js y Vercel.",
  keywords: [
    "fuentes Aulafy",
    "documentación IA open source",
    "fuentes cursos IA",
    "documentación Claude Code",
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
      { name: "LM Studio", href: "https://lmstudio.ai/" },
      { name: "Open WebUI", href: "https://docs.openwebui.com/" },
      { name: "Open WebUI Tools & Functions", href: "https://docs.openwebui.com/features/extensibility/plugin/" },
      { name: "Qdrant Docs", href: "https://qdrant.tech/documentation/" },
      { name: "Google Gemma 4 model card", href: "https://ai.google.dev/gemma/docs/core/model_card_4" },
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
      { name: "Hermes Agent Docs", href: "https://hermes-agent.nousresearch.com/docs/" },
      { name: "Hermes Agent Providers", href: "https://hermes-agent.nousresearch.com/docs/integrations/providers" },
      { name: "LangGraph Docs", href: "https://docs.langchain.com/oss/python/langgraph/overview" },
      { name: "LangGraph Persistence", href: "https://docs.langchain.com/oss/python/langgraph/persistence" },
      { name: "n8n Docs", href: "https://docs.n8n.io/" },
      { name: "n8n Queue Mode", href: "https://docs.n8n.io/hosting/scaling/queue-mode/" },
      { name: "Model Context Protocol", href: "https://modelcontextprotocol.io/" },
      { name: "MCP Specification", href: "https://modelcontextprotocol.io/specification/2025-03-26" },
      { name: "MCP Tools", href: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools" },
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
