import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type SocialAction = "project" | "review" | "report";

const limiters = new Map<SocialAction, Ratelimit>();
const rules: Record<SocialAction, { tokens: number; window: `${number} ${"s" | "m" | "h"}` }> = {
  project: { tokens: 5, window: "1 h" },
  review: { tokens: 12, window: "1 h" },
  report: { tokens: 6, window: "1 h" },
};

export async function checkSocialRateLimit(action: SocialAction, userId: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { allowed: true, retryAfter: 0 };

  let limiter = limiters.get(action);
  if (!limiter) {
    const rule = rules[action];
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(rule.tokens, rule.window),
      analytics: true,
      prefix: `aulafy/social/${action}`,
    });
    limiters.set(action, limiter);
  }

  try {
    const result = await limiter.limit(userId);
    return {
      allowed: result.success,
      retryAfter: Math.max(0, Math.ceil((result.reset - Date.now()) / 1000)),
    };
  } catch {
    return { allowed: false, retryAfter: 60 };
  }
}
