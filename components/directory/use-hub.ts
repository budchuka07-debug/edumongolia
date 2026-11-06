"use client";

import { hubCopy, type HubCopy } from "@/lib/i18n/hub";
import { useI18n } from "@/components/language-provider";

export function useHub(): HubCopy {
  const { locale } = useI18n();
  return hubCopy[locale];
}
