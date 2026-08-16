import { z } from "zod";

export const runtime = "nodejs";

const eventSchema = z.object({
  event: z.enum([
    "landing_view",
    "mission_start",
    "mission_complete",
    "route_view",
    "route_step_toggle",
    "route_selected",
    "search_used",
    "search_no_results",
    "lesson_25",
    "lesson_50",
    "lesson_90",
    "next_lesson_click",
    "continue_return",
    "return_7d",
    "return_30d",
    "feedback_useful",
    "task_open",
    "external_source_open",
  ]),
}).strict();

function disabled() {
  return process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED !== "true";
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;
  if (!origin) return process.env.NODE_ENV !== "production";
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (disabled()) return new Response(null, { status: 204 });
  if (!isSameOrigin(request)) return Response.json({ error: "Origen no permitido." }, { status: 403 });

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 256) return Response.json({ error: "Petición demasiado grande." }, { status: 413 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON no válido." }, { status: 400 });
  }
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Evento no permitido." }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return Response.json({ error: "Métricas no configuradas." }, { status: 503 });

  const response = await fetch(`${url}/rest/v1/rpc/record_learning_event`, {
    method: "POST",
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ p_event_name: parsed.data.event }),
    cache: "no-store",
  });

  if (!response.ok) return Response.json({ error: "No se pudo registrar el contador." }, { status: 502 });
  return new Response(null, { status: 204 });
}
