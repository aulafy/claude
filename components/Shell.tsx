"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

// Rutas que se muestran a pantalla completa, sin el chrome de la guía (sidebar).
const BARE_ROUTES = ["/"];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.includes(pathname);

  if (bare) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <div className="md:ml-[260px] min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <ChatWidget />
    </>
  );
}
