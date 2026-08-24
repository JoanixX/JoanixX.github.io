/**
 * import.meta.env.BASE_URL already carries a trailing slash ("/portafolio/"),
 * so naively templating `${BASE_URL}/foo` yields "/portafolio//foo".
 * Join through here instead.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const clean = path.replace(/^\/+/, "");
  return clean ? `${base}/${clean}` : `${base}/`;
}

/** Same join, but absolute — required for Open Graph, canonical and sitemap URLs. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  const rel = withBase(path);
  return site ? new URL(rel, site).href : rel;
}
