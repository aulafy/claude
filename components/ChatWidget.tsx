"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Message = { role: "user" | "assistant"; content: string };

// Nombre de sección (normalizado) -> ruta. Permite enlazar [[Sección]].
const SECTION_LINKS: Record<string, string> = {
  "inicio": "/",
  "instalación": "/instalacion",
  "instalacion": "/instalacion",
  "primeros pasos": "/primeros-pasos",
  "recetas prácticas": "/recetas",
  "recetas practicas": "/recetas",
  "recetas": "/recetas",
  "proyectos guiados": "/proyectos",
  "proyectos": "/proyectos",
  "escribir buenos prompts": "/prompts",
  "buenos prompts": "/prompts",
  "prompts": "/prompts",
  "glosario": "/glosario",
  "skills": "/skills",
  "subagentes": "/subagentes",
  "plugins": "/plugins",
  "flujos de trabajo pro": "/flujos",
  "flujos de trabajo": "/flujos",
  "flujos": "/flujos",
  "comandos": "/comandos",
  "configuración": "/configuracion",
  "configuracion": "/configuracion",
  "servidores mcp": "/mcp",
  "mcp": "/mcp",
  "hooks": "/hooks",
  "permisos": "/permisos",
  "uso avanzado": "/avanzado",
  "avanzado": "/avanzado",
  "preguntas frecuentes": "/faq",
  "faq": "/faq",
  "solución de problemas": "/problemas",
  "solucion de problemas": "/problemas",
  "problemas": "/problemas",
  "recursos": "/recursos",
  "comparativa": "/comparativa",
  "pymes y oficina": "/pymes",
  "pymes": "/pymes",
  "oficina": "/pymes",
  "perfiles técnicos": "/equipos",
  "perfiles tecnicos": "/equipos",
  "equipos": "/equipos",
  "cli, app y móvil": "/donde-usar",
  "cli app y movil": "/donde-usar",
  "app de escritorio": "/donde-usar",
  "donde usar": "/donde-usar",
};

const SUGGESTIONS = [
  "¿Qué es Claude Code y para qué sirve?",
  "¿Cómo lo instalo paso a paso?",
  "¿Qué son las skills?",
  "Tengo un error al instalar, ayúdame",
];

const WELCOME =
  "¡Hola! 👋 Soy tu asistente para aprender **Claude Code**. Pregúntame lo que quieras: instalación, comandos, skills, errores… lo que necesites.";

/** Render ligero de markdown: bloques de código, `inline`, **negrita**, enlaces [[Sección]] y saltos de línea. */
function renderContent(text: string, onNavigate?: () => void) {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const inner = part.slice(3, -3).replace(/^[a-zA-Z]*\n/, "");
      return (
        <pre key={i} className="my-2 rounded-md bg-zinc-950 border border-zinc-700 p-2.5 overflow-x-auto text-xs">
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
            const href = SECTION_LINKS[name.toLowerCase()];
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

export default function ChatWidget() {
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
        body: JSON.stringify({ messages: next }),
      });

      // Errores con mensaje (p. ej. límite de peticiones 429).
      if (!res.ok) {
        let msg = "Ups, ha habido un problema al responder. Inténtalo de nuevo en un momento. 🙏";
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
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Ups, ha habido un problema al responder. Inténtalo de nuevo en un momento. 🙏",
        };
        return copy;
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
        aria-label="Abrir chat de ayuda"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-400 shadow-lg shadow-orange-500/30 flex items-center justify-center text-white text-2xl transition-transform hover:scale-105"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-[400px] h-[600px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-950">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-base">
              🤖
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white leading-tight">Asistente Claude Code</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> En línea
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-zinc-300 text-lg" aria-label="Cerrar">
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {/* Bienvenida */}
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-sm flex-shrink-0">🤖</div>
              <div className="rounded-2xl rounded-tl-sm bg-zinc-800 px-3.5 py-2.5 text-sm text-zinc-300 leading-relaxed max-w-[85%]">
                {renderContent(WELCOME)}
              </div>
            </div>

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="rounded-2xl rounded-tr-sm bg-orange-500 px-3.5 py-2.5 text-sm text-white leading-relaxed max-w-[85%] whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-sm flex-shrink-0">🤖</div>
                  <div className="rounded-2xl rounded-tl-sm bg-zinc-800 px-3.5 py-2.5 text-sm text-zinc-300 leading-relaxed max-w-[85%]">
                    {m.content ? (
                      renderContent(m.content, () => setOpen(false))
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
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full text-left text-sm px-3 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:border-orange-500/50 hover:bg-zinc-800/50 transition-colors"
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
                aria-label="Pregunta para el asistente"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Escribe tu pregunta..."
                className="flex-1 resize-none max-h-28 rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
                aria-label="Enviar"
              >
                ➤
              </button>
            </form>
            <p className="text-[10px] text-zinc-600 mt-1.5 text-center">
              IA con Groq · puede equivocarse, verifica con <code className="text-zinc-500">claude --version</code>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
