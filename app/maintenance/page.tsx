import type { Metadata } from "next";
import Maintenance from "@/components/Maintenance";

type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const english = (await searchParams).lang === "en";
  return { title: english ? "Aulafy | Under construction" : "Aulafy | En construcción", description: english ? "We are rebuilding Aulafy. Free AI education will be back soon." : "Estamos renovando Aulafy. Enseñanza libre de IA. Volvemos pronto.", alternates: { canonical: english ? "/en" : "/" } };
}
export default async function MaintenancePage({ searchParams }: Props) {
  return <Maintenance english={(await searchParams).lang === "en"} />;
}
