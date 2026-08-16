import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const socialRoutePrefixes = [
  "/comunidad",
  "/acceso",
  "/cuenta",
  "/perfil",
  "/admin",
  "/auth/callback",
];

function isSocialRoute(pathname: string) {
  return pathname.startsWith("/proyectos/") || socialRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function proxy(request: NextRequest) {
  const socialEnabled = process.env.NEXT_PUBLIC_AULAFY_SOCIAL_ENABLED === "true";
  if (isSocialRoute(request.nextUrl.pathname) && !socialEnabled) {
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
