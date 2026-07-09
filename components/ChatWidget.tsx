"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { getLocalizedCursos, type Locale } from "@/lib/i18n";
import { searchData } from "@/lib/search-data";

type Message = { role: "user" | "assistant"; content: string };

// Nombre de sección (normalizado) -> ruta. Permite enlazar [[Sección]].
function linkKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const SECTION_LINKS_ES: Record<string, string> = {
  ...Object.fromEntries(searchData.map((item) => [linkKey(item.title), item.href])),
  inicio: "/",
  aulafy: "/",
  instalacion: "/cursos/claude-code/instalacion",
  recetas: "/cursos/claude-code/recetas",
  prompts: "/cursos/claude-code/prompts",
  mcp: "/cursos/claude-code/mcp",
  faq: "/cursos/claude-code/faq",
  "ia local": "/cursos/ia-local",
  rag: "/cursos/rag-seguro",
  agentes: "/cursos/agentes-automatizacion",
  mlops: "/cursos/mlops-local",
  "fine tuning": "/cursos/fine-tuning-local",
  pymes: "/cursos/ia-pymes",
};

const SECTION_LINKS_EN: Record<string, string> = {
  ...Object.fromEntries(getLocalizedCursos("en").map((course) => [linkKey(course.title), `/en/courses/${course.slug}`])),
  home: "/en",
  aulafy: "/en",
  courses: "/en/courses",
  "claude code": "/en/courses/claude-code",
  "local ai": "/en/courses/ia-local",
  ollama: "/en/courses/ia-local",
  rag: "/en/courses/rag-seguro",
  agents: "/en/courses/agentes-automatizacion",
  automation: "/en/courses/agentes-automatizacion",
  mlops: "/en/courses/mlops-local",
  "fine tuning": "/en/courses/fine-tuning-local",
  security: "/en/courses/seguridad-evals",
  "small business": "/en/courses/ia-pymes",
};

const COPY = {
  es: {
    suggestions: [
      "¿Qué curso me recomiendas para empezar?",
      "Quiero montar IA local con Ollama",
      "¿Dónde aprendo RAG con documentos?",
      "¿Qué ruta sigo para agentes y automatización?",
    ],
    welcome:
      "Hola. Soy tu asistente de **Aulafy**. Pregúntame por cualquier curso: Claude Code, IA local, RAG, agentes, MLOps, fine-tuning, seguridad, pymes o multimedia.",
    openLabel: "Abrir chat de ayuda de Aulafy",
    title: "Asistente Aulafy",
    online: "En línea",
    close: "Cerrar",
    tryAsking: "Prueba a preguntar:",
    inputLabel: "Pregunta para el asistente",
    placeholder: "Escribe tu pregunta...",
    send: "Enviar",
    disclaimer: "IA con Groq · puede equivocarse, contrasta los pasos importantes",
    genericError: "Ups, ha habido un problema al responder. Inténtalo de nuevo en un momento.",
  },
  en: {
    suggestions: [
      "Which course should I start with?",
      "I want to run local AI with Ollama",
      "Where do I learn RAG with documents?",
      "What route should I follow for agents and automation?",
    ],
    welcome:
      "Hi. I am your **Aulafy** assistant. Ask me about Claude Code, local AI, RAG, agents, MLOps, fine-tuning, security, small business workflows or multimedia AI.",
    openLabel: "Open Aulafy help chat",
    title: "Aulafy Assistant",
    online: "Online",
    close: "Close",
    tryAsking: "Try asking:",
    inputLabel: "Question for the assistant",
    placeholder: "Write your question...",
    send: "Send",
    disclaimer: "AI via Groq · it can be wrong, verify important steps",
    genericError: "Something went wrong while answering. Try again in a moment.",
  },
} satisfies Record<Locale, {
  suggestions: string[];
  welcome: string;
  openLabel: string;
  title: string;
  online: string;
  close: string;
  tryAsking: string;
  inputLabel: string;
  placeholder: string;
  send: string;
  disclaimer: string;
  genericError: string;
}>;

/** Render ligero de markdown: bloques de código, `inline`, **negrita**, enlaces [[Sección]] y saltos de línea. */
function renderContent(text: string, locale: Locale, onNavigate?: () => void) {
  const links = locale === "en" ? SECTION_LINKS_EN : SECTION_LINKS_ES;

  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const inner = part.slice(3, -3).replace(/^[a-zA-Z]*\n/, "");
      return (
        <pre key={i} className="my-2 aula-terminal p-2.5 overflow-x-auto text-xs">
          <code>{inner.trim()}</code>
        </pre>
      );
    }
    // Texto normal con inline `code`, **bold** y enlaces de sección [[Sección]]
    const tokens = part.split(/(`[^`]+`|\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g);
    return (
      <span key={i} className="whitespace-pre-wrap">
        {tokens.map((tok, j) => {
          if (tok.startsWith("`") && tok.endsWith("`")) {
            return (
              <code key={j} className="bg-zinc-700/60 text-violet-300 px-1 py-0.5 rounded text-[0.85em]">
                {tok.slice(1, -1)}
              </code>
            );
          }
          if (tok.startsWith("**") && tok.endsWith("**")) {
            return <strong key={j} className="text-zinc-100 font-semibold">{tok.slice(2, -2)}</strong>;
          }
          if (tok.startsWith("[[") && tok.endsWith("]]")) {
            const name = tok.slice(2, -2).trim();
            const href = links[linkKey(name)];
            if (href) {
              return (
                <Link
                  key={j}
                  href={href}
                  onClick={onNavigate}
                  className="text-orange-400 underline underline-offset-2 hover:text-orange-300 font-medium"
                >
                  {name}
                </Link>
              );
            }
            return <span key={j}>{name}</span>;
          }
          return <span key={j}>{tok}</span>;
        })}
      </span>
    );
  });
}

export default function ChatWidget({ locale = "es" }: { locale?: Locale }) {
  const copy = COPY[locale];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, locale }),
      });

      // Errores con mensaje (p. ej. límite de peticiones 429).
      if (!res.ok) {
        let msg = copy.genericError;
        if (res.headers.get("content-type")?.includes("application/json")) {
          const data = await res.json().catch(() => null);
          if (data?.error) msg = data.error;
        }
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: msg };
          return copy;
        });
        return;
      }
      if (!res.body) throw new Error("error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      async function readStream(acc: string): Promise<string> {
        const { done, value } = await reader.read();
        if (done) return acc;

        const nextAcc = acc + decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: nextAcc };
          return copy;
        });
        return readStream(nextAcc);
      }

      const acc = await readStream("");
      if (!acc.trim()) throw new Error("empty");
    } catch {
      setMessages((prev) => {
        const nextMessages = [...prev];
        nextMessages[nextMessages.length - 1] = {
          role: "assistant",
          content: copy.genericError,
        };
        return nextMessages;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={copy.openLabel}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-lg border border-orange-300/35 bg-orange-500 hover:bg-orange-400 shadow-lg shadow-orange-500/25 flex items-center justify-center text-white text-2xl transition-transform hover:scale-105"
      >
        <Icon name={open ? "close" : "chat"} />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-[400px] h-[600px] max-h-[calc(100vh-8rem)] flex flex-col aula-frame bg-zinc-900 shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-950/80">
            <div className="w-8 h-8 rounded-lg border border-orange-400/30 bg-orange-500/20 flex items-center justify-center text-orange-200 text-base">
              <Icon name="robot" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white leading-tight">{copy.title}</div>
              <div className="aula-meta text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> {copy.online}
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-zinc-300 text-lg" aria-label={copy.close}>
              <Icon name="close" />
            </button>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {/* Bienvenida */}
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-lg border border-zinc-700 bg-zinc-800 flex items-center justify-center text-sm flex-shrink-0">
                <Icon name="robot" />
              </div>
              <div className="aula-panel px-3.5 py-2.5 text-sm text-zinc-300 leading-relaxed max-w-[85%]">
                {renderContent(copy.welcome, locale)}
              </div>
            </div>

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="rounded-lg border border-orange-300/25 bg-orange-500 px-3.5 py-2.5 text-sm text-white leading-relaxed max-w-[85%] whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg border border-zinc-700 bg-zinc-800 flex items-center justify-center text-sm flex-shrink-0">
                    <Icon name="robot" />
                  </div>
                  <div className="aula-panel px-3.5 py-2.5 text-sm text-zinc-300 leading-relaxed max-w-[85%]">
                    {m.content ? (
                      renderContent(m.content, locale, () => setOpen(false))
                    ) : (
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" />
                      </span>
                    )}
                  </div>
                </div>
              )
            )}

            {/* Sugerencias (solo al inicio) */}
            {messages.length === 0 && (
              <div className="pt-1 space-y-2">
                <p className="text-xs text-zinc-500 px-1">Prueba a preguntar:</p>
                {copy.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="aula-panel block w-full text-left text-sm px-3 py-2 text-zinc-300 hover:border-orange-500/50 hover:bg-zinc-800/50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-zinc-800 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                value={input}
                aria-label={copy.inputLabel}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder={copy.placeholder}
                className="flex-1 resize-none max-h-28 rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
                aria-label={copy.send}
              >
                <Icon name="paperPlane" />
              </button>
            </form>
            <p className="text-[10px] text-zinc-600 mt-1.5 text-center">
              {copy.disclaimer}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
