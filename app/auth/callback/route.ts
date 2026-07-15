import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/social/config";
import { safeInternalPath, siteUrl } from "@/lib/social/urls";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = safeInternalPath(request.nextUrl.searchParams.get("next"));

  if (!isSupabaseConfigured() || !code) {
    return NextResponse.redirect(new URL("/acceso?error=callback", siteUrl()));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/acceso?error=callback", siteUrl()));

  return NextResponse.redirect(new URL(next, siteUrl()));
}
