"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const next = document.documentElement.classList.contains("dark") ? "dark" : "light";
    applyTheme(next);

    const frame = window.requestAnimationFrame(() => setTheme(next));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Activar modo día" : "Activar modo noche"}
      title={theme === "dark" ? "Modo día" : "Modo noche"}
      suppressHydrationWarning
      className={`theme-toggle ${compact ? "theme-toggle-compact" : ""}`}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} />
      {!compact && <span>{theme === "dark" ? "Día" : "Noche"}</span>}
    </button>
  );
}
