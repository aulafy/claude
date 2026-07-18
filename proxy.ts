import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isSocialEnabled } from "@/lib/social/config";
import { refreshSupabaseSession } from "@/lib/supabase/proxy";

const socialRoutePrefixes = [
  "/comunidad",
  "/acceso",
  "/cuenta",
  "/perfil",
  "/admin/moderacion",
  "/auth/callback",
];

function isSocialRoute(pathname: string) {
  return pathname.startsWith("/proyectos/") || socialRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function proxy(request: NextRequest) {
  if (!isSocialEnabled() && isSocialRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url), 307);
  }

  return refreshSupabaseSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|woff2)$).*)",
  ],
};
