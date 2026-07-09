"use client";

import { usePathname } from "next/navigation";
import CourseSidebar from "@/components/CourseSidebar";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { getCurso } from "@/lib/cursos";
import { isEnglishPath } from "@/lib/i18n";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const english = isEnglishPath(pathname);
  const locale = english ? "en" : "es";

  // 1) Landing: pantalla completa, con su propio header y footer.
  if (pathname === "/" || pathname === "/en") {
    return <>{children}</>;
  }

  // 2) Lección de un curso: /cursos/<curso>/<leccion> → sidebar del curso.
  const parts = pathname.split("/").filter(Boolean);
  const esLeccion = parts[0] === "cursos" && parts.length >= 3 && getCurso(parts[1]);
  if (esLeccion) {
    return (
      <>
        <CourseSidebar />
        <div className="md:ml-[280px] min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <Footer locale="es" />
        </div>
        <ChatWidget />
      </>
    );
  }

  // 3) Resto (catálogo, páginas de curso, legales…): cabecera + pie del sitio.
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} />
      {!english && <ChatWidget />}
    </>
  );
}
