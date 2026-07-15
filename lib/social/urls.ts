export function safeInternalPath(value: FormDataEntryValue | string | null | undefined, fallback = "/comunidad") {
  const path = typeof value === "string" ? value : "";
  if (!path.startsWith("/") || path.startsWith("//")) return fallback;
  return path;
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net").replace(/\/$/, "");
}
