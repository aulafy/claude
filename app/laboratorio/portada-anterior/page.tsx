import type { Metadata } from "next";
import LegacyHomePage from "@/components/LegacyHomePage";

export const metadata: Metadata = {
  title: "Portada anterior | Laboratorio Aulafy",
  robots: { index: false, follow: false },
};

export default function PreviousLandingPage() {
  return <LegacyHomePage />;
}
