import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createHmac } from "node:crypto";

// Upstash coordina el límite entre instancias de producción. Si no está
// configurado, se aplica un límite local de respaldo por cada instancia.

let limiter: Ratelimit | null = null;
const localWindows = new Map<string, { count: number; reset: number }>();

function privateIdentifier(identifier: string) {
  const secret = process.env.CHAT_RATE_LIMIT_SALT || process.env.GROQ_API_KEY || "aulafy-development-only";
  return createHmac("sha256", secret).update(identifier).digest("hex").slice(0, 32);
}

function checkLocalLimit(identifier: string): RateResult {
  const now = Date.now();
  const current = localWindows.get(identifier);
  if (!current || current.reset <= now) {
    localWindows.set(identifier, { count: 1, reset: now + 60_000 });
    return { allowed: true };
  }

  if (current.count >= 8) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.reset - now) / 1000)) };
  }

  current.count += 1;
  if (localWindows.size > 5_000) {
    for (const [key, value] of localWindows) {
      if (value.reset <= now) localWindows.delete(key);
    }
  }
  return { allowed: true };
}

function getLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  if (!limiter) {
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      // 15 peticiones por minuto por IP (ventana deslizante).
      limiter: Ratelimit.slidingWindow(15, "60 s"),
      analytics: false,
      prefix: "aulafy/chat",
    });
  }
  return limiter;
}

export type RateResult = {
  allowed: boolean;
  /** Segundos hasta que se reinicia el límite (solo si no se permite). */
  retryAfter?: number;
};

/** Comprueba el límite usando solo un identificador derivado de la IP. */
export async function checkRateLimit(identifier: string): Promise<RateResult> {
  const privateId = privateIdentifier(identifier);
  const rl = getLimiter();
  if (!rl) return checkLocalLimit(privateId);

  try {
    const { success, reset } = await rl.limit(privateId);
    if (success) return { allowed: true };
    const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return { allowed: false, retryAfter };
  } catch {
    // Si Upstash esta configurado pero falla, protegemos el coste del chat.
    return { allowed: false, retryAfter: 60 };
  }
}
