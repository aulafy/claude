"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function storedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

const labels = {
  es: { toDay: "Activar modo día", toNight: "Activar modo noche", day: "Día", night: "Noche" },
  en: { toDay: "Switch to day mode", toNight: "Switch to night mode", day: "Day", night: "Night" },
} as const;

/**
 * Conmutador día/noche. La elección se recuerda en este navegador (clave aulafy:theme, sin cookies ni envío al servidor);
 * mientras no se elija nada, la web sigue la preferencia del sistema. El guion de components/ThemeScript.tsx aplica el tema
 * antes de pintar para evitar el parpadeo.
 */
export default function ThemeToggle({ compact = false, locale = "es" }: { compact?: boolean; locale?: "es" | "en" }) {
  const [theme, setTheme] = useState<Theme>("light");
  const t = labels[locale];

  useEffect(() => {
    const sync = () => setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    const frame = window.requestAnimationFrame(sync);
    // Sin elección guardada, se sigue el cambio de tema del sistema operativo.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = (event: MediaQueryListEvent) => {
      if (storedTheme()) return;
      applyTheme(event.matches ? "dark" : "light");
      sync();
    };
    // Otra pestaña cambió la preferencia.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const next = storedTheme() ?? (media.matches ? "dark" : "light");
      applyTheme(next);
      sync();
    };
    media.addEventListener("change", onSystem);
    window.addEventListener("storage", onStorage);
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", onSystem);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* navegación privada o almacenamiento bloqueado: el tema sigue valiendo en esta página */
    }
  }

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={dark}
      aria-label={dark ? t.toDay : t.toNight}
      title={dark ? t.toDay : t.toNight}
      suppressHydrationWarning
      className={`theme-toggle ${compact ? "theme-toggle-compact" : ""}`}
    >
      <Icon name={dark ? "sun" : "moon"} />
      {!compact && <span>{dark ? t.day : t.night}</span>}
    </button>
  );
}
