/**
 * Joins a path onto Astro's configured base.
 *
 * import.meta.env.BASE_URL always carries a trailing slash ("/" at the domain
 * root, "/sub/" under a base), so naively templating `${BASE_URL}/foo` yields a
 * doubled slash. Join through here instead — this stays correct if a base is
 * ever reintroduced.
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
