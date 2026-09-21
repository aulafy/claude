import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Aulafy | Living book preview", robots: { index: false, follow: false }, alternates: { canonical: null } };
export const dynamic = "force-dynamic";
export default function Layout({ children }: { children: React.ReactNode }) {
  if (process.env.AULAFY_BOOK_PREVIEW !== "1") notFound();
  return children;
}
