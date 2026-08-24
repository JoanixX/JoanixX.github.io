export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

/** English is the default and is served without a URL prefix. */
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

/** BCP 47 tags for <html lang> and hreflang. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en",
  es: "es",
};

/**
 * Route table. Every page exists in both languages; the Spanish routes live
 * under /es/ and use Spanish slugs, which is what a Spanish-speaking visitor
 * (and Google's es-index) expects to see.
 */
export const ROUTES = {
  home: { en: "", es: "es/" },
  projects: { en: "projects/", es: "es/proyectos/" },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function routePath(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

/** The other locale, for the language switcher. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

/** Picks the right side of a bilingual value. */
export type Localized<T> = Record<Locale, T>;

export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
