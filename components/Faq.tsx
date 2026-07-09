"use client";

import { useState } from "react";

export default function Faq({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-800 rounded-lg mb-3 overflow-hidden bg-zinc-900/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-zinc-900/60 transition-colors"
      >
        <span className="text-sm font-medium text-zinc-100">{question}</span>
        <span
          className={`text-zinc-500 text-lg flex-shrink-0 transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 text-sm text-zinc-400 leading-relaxed [&_a]:text-violet-400 [&_a:hover]:text-fuchsia-300 [&_code]:bg-zinc-800 [&_code]:text-violet-300 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_strong]:text-zinc-200">
          {children}
        </div>
      )}
    </div>
  );
}
