import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limiting OPCIONAL basado en Upstash Redis.
// Si no están configuradas las variables de entorno de Upstash,
// se desactiva silenciosamente (la web sigue funcionando sin límite).

let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  if (!limiter) {
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      // 15 peticiones por minuto por IP (ventana deslizante).
      limiter: Ratelimit.slidingWindow(15, "60 s"),
      analytics: true,
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

/** Comprueba el límite para una IP. Si Upstash no está configurado, permite siempre. */
export async function checkRateLimit(identifier: string): Promise<RateResult> {
  const rl = getLimiter();
  if (!rl) return { allowed: true };

  try {
    const { success, reset } = await rl.limit(identifier);
    if (success) return { allowed: true };
    const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return { allowed: false, retryAfter };
  } catch {
    // Si Upstash esta configurado pero falla, protegemos el coste del chat.
    return { allowed: false, retryAfter: 60 };
  }
}
