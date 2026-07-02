"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ThemeToggle from "@/components/ThemeToggle";

// Rutas que se muestran a pantalla completa, sin el chrome de la guía (sidebar).
const BARE_ROUTES = ["/", "/licencia", "/privacidad"];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.includes(pathname);

  if (bare) {
    return (
      <>
        {pathname !== "/" && (
          <div className="fixed right-4 top-4 z-50">
            <ThemeToggle />
          </div>
        )}
        {children}
      </>
    );
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
