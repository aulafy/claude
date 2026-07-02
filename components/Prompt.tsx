"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

export default function Prompt({
  children,
  label,
}: {
  children: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="my-4 rounded-lg border border-zinc-700 bg-zinc-900/60 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
        <span className="text-xs font-medium text-orange-400 flex items-center gap-1.5">
          <Icon name="chat" />
          {label ?? "Escribe esto a Claude Code"}
        </span>
        <button
          onClick={copy}
          className="text-xs px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <Icon name="check" className="text-emerald-400" /> Copiado
            </>
          ) : (
            <>
              <Icon name="copy" /> Copiar
            </>
          )}
        </button>
      </div>
      <div className="px-4 py-3 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap font-[family-name:var(--font-geist-mono)]">
        {children}
      </div>
    </div>
  );
}
