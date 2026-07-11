import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse(
    "Este contenido pertenecía a la versión anterior de Aulafy y ya no está disponible.",
    {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
        Link: '<https://www.aulafy.net/cursos>; rel="alternate"',
      },
    },
  );
}
