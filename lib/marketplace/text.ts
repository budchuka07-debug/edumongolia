import type { Localized, LocaleCode } from "@/lib/marketplace/types";

export function L(mn: string, en: string, zh = ""): Localized {
  return { mn, en, zh };
}

export function pick(value: Localized, locale: "mn" | "en"): string {
  return value[locale] || value.mn || value.en || value.zh;
}

export function scriptOf(locale: "mn" | "en"): LocaleCode {
  return locale;
}
