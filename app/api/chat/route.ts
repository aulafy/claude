import { buildChatbotSystemPrompt } from "@/lib/chatbot-knowledge";
import type { Locale } from "@/lib/i18n";

// Runtime de Node.js (más robusto en Vercel para fetch + streaming + Upstash).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

type Msg = { role: "user" | "assistant"; content: string };

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "anon";
}

export async function POST(req: Request) {
  try {
    return await handleChat(req);
  } catch {
    // Red de seguridad: nunca devolvemos un 500 en HTML; siempre JSON.
    return Response.json(
      { error: "Error interno del servidor del chat." },
      { status: 500 }
    );
  }
}

async function handleChat(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "El chat no está disponible temporalmente." },
      { status: 500 }
    );
  }

  // Límite de peticiones por IP (si Upstash está configurado). Import dinámico
  // y protegido para que nunca tumbe el endpoint si algo falla.
  try {
    const { checkRateLimit } = await import("@/lib/ratelimit");
    const { allowed, retryAfter } = await checkRateLimit(getClientIp(req));
    if (!allowed) {
      return Response.json(
        {
          error: `Has hecho demasiadas preguntas seguidas. Espera ${retryAfter ?? 60} segundos y vuelve a intentarlo.`,
        },
        { status: 429, headers: { "Retry-After": String(retryAfter ?? 60) } }
      );
    }
  } catch {
    // Si el rate limiter falla, seguimos sin bloquear.
  }

  const declaredLength = Number(req.headers.get("content-length") || 0);
  if (declaredLength > 24_000) {
    return Response.json({ error: "La pregunta es demasiado larga." }, { status: 413 });
  }

  let messages: Msg[] = [];
  let locale: Locale = "es";
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
    locale = body?.locale === "en" ? "en" : "es";
  } catch {
    return Response.json({ error: "Petición inválida." }, { status: 400 });
  }

  // Limpieza y límites básicos para evitar abusos.
  const cleaned = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-12) // últimos 12 turnos
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (cleaned.length === 0) {
    return Response.json({ error: "No hay mensaje que responder." }, { status: 400 });
  }

  if (cleaned[cleaned.length - 1]?.role !== "user") {
    return Response.json({ error: "La conversación debe terminar con una pregunta." }, { status: 400 });
  }

  const systemPrompt = buildChatbotSystemPrompt(cleaned, locale);

  let groqRes: Response;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.4,
        max_tokens: 1024,
        stream: true,
        messages: [{ role: "system", content: systemPrompt }, ...cleaned],
      }),
      signal: controller.signal,
    });
  } catch {
    return Response.json(
      { error: "No se pudo conectar con el servicio de IA." },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!groqRes.ok || !groqRes.body) {
    await groqRes.text().catch(() => "");
    return Response.json(
      { error: "El servicio de IA devolvió un error." },
      { status: 502 }
    );
  }

  // Transformamos el SSE de Groq (formato OpenAI) en texto plano en streaming.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = groqRes.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const delta = json?.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // fragmento incompleto: se completará en el siguiente chunk
            }
          }
        }
      } catch {
        controller.error(new Error("Error al recibir la respuesta de la IA."));
        return;
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
