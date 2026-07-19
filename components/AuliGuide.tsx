"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import styles from "@/components/AuliGuide.module.css";

function AuliMark() {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <rect x="8" y="8" width="80" height="80" rx="25" fill="currentColor" />
      <path d="M28 71 43 26h11l15 45H58l-3-10H42l-3 10H28Zm17-20h8l-4-14-4 14Z" fill="#fff" />
    </svg>
  );
}

function guidance(pathname: string, locale: Locale) {
  const english = locale === "en";
  if (pathname === "/" || pathname === "/en") {
    return {
      title: english ? "Start with one choice" : "Empieza con una decisión",
      text: english ? "Choose the situation closest to you. You do not need to browse every course." : "Elige la situación que más se parece a la tuya. No necesitas recorrer todos los cursos.",
      href: "#nx-guide-title",
      action: english ? "Show me" : "Ver orientador",
    };
  }
  if (pathname === "/cursos" || pathname === "/en/courses") {
    return {
      title: english ? "Ignore the full catalogue" : "Ignora el catálogo completo",
      text: english ? "If you are unsure, AI basics is the safest first course." : "Si tienes dudas, IA desde cero es el primer curso más seguro.",
      href: english ? "/en/courses/ia-desde-cero" : "/cursos/ia-desde-cero",
      action: english ? "Open AI basics" : "Abrir IA desde cero",
    };
  }
  if (pathname.includes("/laboratorio/ia-en-accion")) {
    return {
      title: "Libreta → pantalla → revisión",
      text: english ? "Follow the three stations. The 3D room is optional; the mission works without it." : "Sigue las tres estaciones. El espacio 3D es opcional; la misión funciona sin él.",
      href: "#learning-lab-mission",
      action: english ? "Continue the mission" : "Continuar la misión",
    };
  }
  if (/\/(cursos|courses)\/[^/]+\/[^/]+/.test(pathname)) {
    return {
      title: english ? "Do the mission first" : "Haz primero la misión",
      text: english ? "Complete the small action at the top. Open the full lesson index only if you need to move." : "Completa la acción pequeña de arriba. Abre el índice completo solo si necesitas cambiar de lección.",
      href: "#main-content",
      action: english ? "Back to the lesson" : "Volver a la lección",
    };
  }
  return {
    title: english ? "Need a clear next step?" : "¿Necesitas un siguiente paso?",
    text: english ? "Tell Aulafy where you are starting and it will recommend one route." : "Indica desde dónde partes y Aulafy te recomendará una sola ruta.",
    href: english ? "/en/paths" : "/que-aprender-ia",
    action: english ? "Find my route" : "Encontrar mi ruta",
  };
}

export default function AuliGuide({ locale = "es" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const tip = guidance(pathname, locale);
  const name = locale === "en" ? "Auli, learning guide" : "Auli, guía de aprendizaje";

  return (
    <aside className={styles.wrap} aria-label={name}>
      {open ? (
        <div className={styles.panel}>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={locale === "en" ? "Close Auli" : "Cerrar Auli"}>×</button>
          <p className={styles.name}>AULI · {locale === "en" ? "GUIDE" : "GUÍA"}</p>
          <strong>{tip.title}</strong>
          <p>{tip.text}</p>
          <Link href={tip.href} onClick={() => setOpen(false)}>{tip.action} <span aria-hidden="true">→</span></Link>
          <small>{locale === "en" ? "No account. No saved history." : "Sin cuenta. No guarda historial."}</small>
        </div>
      ) : null}
      <button type="button" className={styles.mascot} onClick={() => setOpen(true)} aria-label={locale === "en" ? "Open Auli learning guide" : "Abrir la guía de aprendizaje Auli"} aria-expanded={open}>
        <AuliMark />
        <span>{locale === "en" ? "Need help?" : "¿Te ayudo?"}</span>
      </button>
    </aside>
  );
}
