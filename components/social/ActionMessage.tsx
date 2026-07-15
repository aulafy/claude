import type { ActionState } from "@/lib/social/types";

export default function ActionMessage({ state }: { state: ActionState }) {
  if (!state.message) return null;
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${
        state.status === "success"
          ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-200"
          : "border-rose-500/35 bg-rose-500/10 text-rose-200"
      }`}
      role={state.status === "error" ? "alert" : "status"}
    >
      {state.message}
    </div>
  );
}
