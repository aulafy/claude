"use client";

import { getCurso } from "@/lib/cursos";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export default function LessonStructuredData({ courseSlug, lessonSlug }: { courseSlug: string; lessonSlug: string }) {
  const course = getCurso(courseSlug);
  const lesson = course?.secciones.flatMap((section) => section.lecciones).find((item) => item.slug === lessonSlug);
  if (!course || !lesson) return null;
  const url = `${SITE_URL}/cursos/${courseSlug}/${lessonSlug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "@id": `${url}#learning-resource`,
        name: lesson.title,
        description: `${lesson.title}. Lección práctica y gratuita del curso ${course.title}.`,
        url,
        inLanguage: "es",
        isAccessibleForFree: true,
        learningResourceType: "Lesson",
        educationalLevel: course.level,
        dateModified: course.updatedAt,
        provider: { "@id": `${SITE_URL}/#organization` },
        author: { "@id": `${SITE_URL}/#author` },
        isPartOf: { "@id": `${SITE_URL}/cursos/${courseSlug}#learning-resource`, name: course.title },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cursos", item: `${SITE_URL}/cursos` },
          { "@type": "ListItem", position: 3, name: course.title, item: `${SITE_URL}/cursos/${courseSlug}` },
          { "@type": "ListItem", position: 4, name: lesson.title, item: url },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
