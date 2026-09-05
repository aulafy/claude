"use client";

import { usePathname } from "next/navigation";
import CourseSidebar from "@/components/CourseSidebar";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import DocumentLanguage from "@/components/DocumentLanguage";
import { getCurso, lecciones } from "@/lib/cursos";
import { getLocalizedCurso, isEnglishPath } from "@/lib/i18n";
import { getEnglishLessonHeading, getEnglishLessonTitle } from "@/lib/english-lessons";
import LessonStructuredData from "@/components/LessonStructuredData";
import LessonFeedback from "@/components/LessonFeedback";
import LessonCommunityCta from "@/components/social/LessonCommunityCta";
import CourseCurriculumMap from "@/components/CourseCurriculumMap";
import AmbientLearningScene from "@/components/AmbientLearningScene";
import LessonProgressTracker from "@/components/LessonProgressTracker";
import { getEnglishLessonTitleOverride, getSourceLessonSlug } from "@/lib/course-lesson-routing";
import ExternalLearningLinkTracker from "@/components/ExternalLearningLinkTracker";
import MobileLearningNav from "@/components/MobileLearningNav";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const english = isEnglishPath(pathname);
  const locale = english ? "en" : "es";

  if (pathname === "/en" || pathname.startsWith("/en/learn/") || pathname === "/en/privacy") {
    return <><DocumentLanguage locale="en" />{children}</>;
  }

  // 1) Landing: pantalla completa, con su propio header y footer.
  if (pathname === "/" || pathname === "/en" || pathname === "/curso-ia" || pathname === "/en/ai-course" || pathname === "/laboratorio/landing" || pathname === "/laboratorio/portada-anterior") {
    return <><DocumentLanguage locale={locale} /><ExternalLearningLinkTracker />{children}<MobileLearningNav locale={locale} /></>;
  }

  // 2) Lección de un curso: /cursos/<curso>/<leccion> → sidebar del curso.
  const parts = pathname.split("/").filter(Boolean);
  const esLeccion = parts[0] === "cursos" && parts.length >= 3 && getCurso(parts[1]);
  const enLeccion = parts[0] === "en" && parts[1] === "courses" && parts.length >= 4 && getCurso(parts[2]);
  if (esLeccion || enLeccion) {
    const courseSlug = esLeccion ? parts[1] : parts[2];
    const lessonSlug = esLeccion ? parts[2] : parts[3];
    const sourceCourse = getCurso(courseSlug);
    const localizedCourse = getLocalizedCurso(courseSlug, locale);
    const sourceLessonSlug = locale === "en" ? getSourceLessonSlug(courseSlug, lessonSlug) : lessonSlug;
    const sourceLesson = sourceCourse ? lecciones(sourceCourse).find((item) => item.slug === sourceLessonSlug) : undefined;
    const lessonTitle = sourceLesson
      ? (locale === "en" ? getEnglishLessonTitleOverride(courseSlug, sourceLessonSlug) ?? getEnglishLessonTitle(courseSlug, sourceLessonSlug, sourceLesson.title) : sourceLesson.title)
      : locale === "en" ? getEnglishLessonHeading(courseSlug, lessonSlug, lessonSlug) : lessonSlug;
    const lessonHref = locale === "en" ? `/en/courses/${courseSlug}/${lessonSlug}` : `/cursos/${courseSlug}/${lessonSlug}`;
    return (
      <>
        <DocumentLanguage locale={locale} />
        <ExternalLearningLinkTracker />
        <LessonProgressTracker
          href={lessonHref}
          title={lessonTitle}
          courseTitle={localizedCourse?.title ?? sourceCourse?.title ?? courseSlug}
          locale={locale}
        />
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
            <CourseCurriculumMap currentSlug={esLeccion ? parts[1] : parts[2]} locale={locale} compact />
          </main>
          <Footer locale={locale} />
        </div>
        <MobileLearningNav locale={locale} />
      </>
    );
  }

  // 3) Resto (catálogo, páginas de curso, legales…): cabecera + pie del sitio.
  const esCurso = parts[0] === "cursos" && parts.length === 2 && getCurso(parts[1]);
  const enCurso = parts[0] === "en" && parts[1] === "courses" && parts.length === 3 && getCurso(parts[2]);
  return (
    <>
      <DocumentLanguage locale={locale} />
      <ExternalLearningLinkTracker />
      <a href="#main-content" className="aula-skip-link">{locale === "en" ? "Skip to content" : "Saltar al contenido"}</a>
      <SiteHeader locale={locale} />
      <AmbientLearningScene variant="site" />
      <main id="main-content" className="min-h-screen">
        {children}
        {(esCurso || enCurso) && <CourseCurriculumMap currentSlug={esCurso ? parts[1] : parts[2]} locale={locale} />}
      </main>
      <Footer locale={locale} />
      <MobileLearningNav locale={locale} />
    </>
  );
}
