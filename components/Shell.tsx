"use client";

import { usePathname } from "next/navigation";
import CourseSidebar from "@/components/CourseSidebar";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { getCurso } from "@/lib/cursos";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 1) Landing: pantalla completa, con su propio header y footer.
  if (pathname === "/") {
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
          <Footer />
        </div>
        <ChatWidget />
      </>
    );
  }

  // 3) Resto (catálogo, páginas de curso, legales…): cabecera + pie del sitio.
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
