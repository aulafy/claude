import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const socialRoutePrefixes = [
  "/comunidad",
  "/acceso",
  "/cuenta",
  "/perfil",
  "/admin",
  "/auth/callback",
  "/laboratorio/radar-editorial",
];

function isSocialRoute(pathname: string) {
  return pathname.startsWith("/proyectos/") || socialRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function proxy(request: NextRequest) {
  if (["/", "/en"].includes(request.nextUrl.pathname)) {
    const destination = new URL("/maintenance", request.url);
    destination.searchParams.set("lang", request.nextUrl.pathname === "/en" || request.nextUrl.searchParams.get("lang") === "en" ? "en" : "es");
    const page = await fetch(destination, { cache: "no-store", headers: { accept: "text/html" } });
    return new NextResponse(page.body, { status: 503, headers: { "Content-Type": "text/html; charset=utf-8", "Retry-After": "3600", "Cache-Control": "no-store" } });
  }
  if (request.nextUrl.pathname === "/api/editorial-intake") {
    return new NextResponse(null, { status: 410 });
  }
  if (isSocialRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url), 307);
  }

  // Etapa estática: no se crean ni renuevan sesiones y no se escriben cookies.
  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|woff2)$).*)",
  ],
};
