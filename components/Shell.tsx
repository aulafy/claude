"use client";

import { usePathname } from "next/navigation";
import CourseSidebar from "@/components/CourseSidebar";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import DocumentLanguage from "@/components/DocumentLanguage";
import { getCurso } from "@/lib/cursos";
import { isEnglishPath } from "@/lib/i18n";
import LessonStructuredData from "@/components/LessonStructuredData";
import LessonFeedback from "@/components/LessonFeedback";
import LessonCommunityCta from "@/components/social/LessonCommunityCta";
import AuliGuide from "@/components/AuliGuide";
import CourseCurriculumMap from "@/components/CourseCurriculumMap";
import AmbientLearningScene from "@/components/AmbientLearningScene";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const english = isEnglishPath(pathname);
  const locale = english ? "en" : "es";

  // 1) Landing: pantalla completa, con su propio header y footer.
  if (pathname === "/" || pathname === "/en" || pathname === "/laboratorio/landing" || pathname === "/laboratorio/portada-anterior") {
    return <><DocumentLanguage locale={locale} />{children}<AuliGuide locale={locale} /></>;
  }

  // 2) Lección de un curso: /cursos/<curso>/<leccion> → sidebar del curso.
  const parts = pathname.split("/").filter(Boolean);
  const esLeccion = parts[0] === "cursos" && parts.length >= 3 && getCurso(parts[1]);
  const enLeccion = parts[0] === "en" && parts[1] === "courses" && parts.length >= 4 && getCurso(parts[2]);
  if (esLeccion || enLeccion) {
    return (
      <>
        <DocumentLanguage locale={locale} />
        {esLeccion && <LessonStructuredData courseSlug={parts[1]} lessonSlug={parts[2]} />}
        <CourseSidebar locale={locale} />
        <div className="md:ml-[252px] min-h-screen flex flex-col">
          <a href="#main-content" className="aula-skip-link">{locale === "en" ? "Skip to content" : "Saltar al contenido"}</a>
          <AmbientLearningScene variant="lesson" />
          <main id="main-content" className="flex-1">
            {children}
            {esLeccion && <LessonCommunityCta courseSlug={parts[1]} lessonSlug={parts[2]} />}
            <LessonFeedback
              courseSlug={esLeccion ? parts[1] : parts[2]}
              lessonSlug={esLeccion ? parts[2] : parts[3]}
              locale={locale}
            />
            <CourseCurriculumMap currentSlug={esLeccion ? parts[1] : parts[2]} locale={locale} />
          </main>
          <Footer locale={locale} />
        </div>
        <AuliGuide locale={locale} />
      </>
    );
  }

  // 3) Resto (catálogo, páginas de curso, legales…): cabecera + pie del sitio.
  const esCurso = parts[0] === "cursos" && parts.length === 2 && getCurso(parts[1]);
  const enCurso = parts[0] === "en" && parts[1] === "courses" && parts.length === 3 && getCurso(parts[2]);
  return (
    <>
      <DocumentLanguage locale={locale} />
      <a href="#main-content" className="aula-skip-link">{locale === "en" ? "Skip to content" : "Saltar al contenido"}</a>
      <SiteHeader locale={locale} />
      <AmbientLearningScene variant="site" />
      <main id="main-content" className="min-h-screen">
        {children}
        {(esCurso || enCurso) && <CourseCurriculumMap currentSlug={esCurso ? parts[1] : parts[2]} locale={locale} />}
      </main>
      <Footer locale={locale} />
      <AuliGuide locale={locale} />
    </>
  );
}
