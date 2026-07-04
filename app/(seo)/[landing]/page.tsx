import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/SeoLandingPage";
import { getSeoLanding, seoLandings } from "@/lib/seo-landings";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export const dynamicParams = false;

export function generateStaticParams() {
  return seoLandings.map((landing) => ({ landing: landing.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ landing: string }> }): Promise<Metadata> {
  const { landing: slug } = await params;
  const landing = getSeoLanding(slug);
  if (!landing) return {};

  return {
    title: landing.title,
    description: landing.description,
    keywords: landing.keywords,
    alternates: { canonical: `/${landing.slug}` },
    openGraph: {
      title: landing.title,
      description: landing.description,
      url: `/${landing.slug}`,
      type: "article",
      siteName: "Aulafy",
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: landing.title,
      description: landing.description,
      creator: "@learntouseai",
    },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ landing: string }> }) {
  const { landing: slug } = await params;
  const landing = getSeoLanding(slug);
  if (!landing) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${landing.slug}#webpage`,
        url: `${SITE_URL}/${landing.slug}`,
        name: landing.title,
        headline: landing.h1,
        description: landing.description,
        inLanguage: "es",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: landing.keywords,
        mainEntity: { "@id": `${SITE_URL}${landing.primaryHref}#course` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/${landing.slug}#faq`,
        mainEntity: landing.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cursos", item: `${SITE_URL}/cursos` },
          { "@type": "ListItem", position: 3, name: landing.title, item: `${SITE_URL}/${landing.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeoLandingPage landing={landing} />
    </>
  );
}
