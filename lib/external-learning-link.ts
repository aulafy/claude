const EXCLUDED_HOSTS = new Set(["x.com", "www.x.com", "twitter.com", "www.twitter.com", "linkedin.com", "www.linkedin.com"]);

export function isExternalLearningSource(href: string, currentOrigin: string) {
  try {
    const url = new URL(href, `${currentOrigin.replace(/\/$/, "")}/`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    if (url.origin === new URL(currentOrigin).origin || EXCLUDED_HOSTS.has(url.hostname.toLowerCase())) return false;
    if (url.hostname.toLowerCase() === "github.com" && /^\/aulafy\/claude\/issues\/new\/?$/.test(url.pathname)) return false;
    return true;
  } catch {
    return false;
  }
}
