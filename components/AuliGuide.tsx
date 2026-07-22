"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "@/components/BrandMark";
import type { Locale } from "@/lib/i18n";
import styles from "@/components/AuliGuide.module.css";

function guidance(pathname: string, locale: Locale) {
  const english = locale === "en";
  if (pathname === "/" || pathname === "/en") {
    return {
      title: english ? "Choose one entry point" : "Elige una puerta de entrada",
      text: english ? "Choose the situation closest to you. You do not need to browse every course." : "Elige la situación que más se parece a la tuya. No necesitas recorrer todos los cursos.",
      href: "#nx-guide-title",
      action: english ? "See options" : "Ver opciones",
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
    title: english ? "Lost? Start smaller." : "¿Te pierdes? Empieza más pequeño.",
    text: english ? "Use the path finder. It does not ask for email or save history." : "Usa el orientador de rutas. No pide email ni guarda historial.",
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
          <p className={styles.name}>A · {locale === "en" ? "GUIDE" : "GUÍA"}</p>
          <strong>{tip.title}</strong>
          <p>{tip.text}</p>
          <Link href={tip.href} onClick={() => setOpen(false)}>{tip.action} <span aria-hidden="true">→</span></Link>
          <small>{locale === "en" ? "Static guidance. No tracking." : "Guía estática. Sin seguimiento."}</small>
        </div>
      ) : null}
      <button type="button" className={styles.mascot} onClick={() => setOpen(true)} aria-label={locale === "en" ? "Open Auli learning guide" : "Abrir la guía de aprendizaje Auli"} aria-expanded={open}>
        <BrandMark />
        <span>{locale === "en" ? "Guide" : "Guía"}</span>
      </button>
    </aside>
  );
}
