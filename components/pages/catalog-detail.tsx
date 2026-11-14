"use client";

import Link from "next/link";
import { ContinuePay, type UnlockedReading } from "@/components/payments/continue-pay";
import { useI18n } from "@/components/language-provider";
import type { Bilingual } from "@/lib/payments/preview";
import type { PaidPage } from "@/lib/payments/pricing";
import { useState } from "react";

export function CatalogDetail({
  backHref,
  kind,
  id,
  title,
  source,
  priceMnt,
  preview,
  rest,
  paid,
}: {
  backHref: string;
  kind: PaidPage;
  id: string;
  title: Bilingual;
  source: Bilingual;
  priceMnt: number;
  preview: Bilingual;
  rest: Bilingual | null;
  paid: boolean;
}) {
  const { locale } = useI18n();
  const [unlocked, setUnlocked] = useState<UnlockedReading | null>(null);
  const body = unlocked?.rest?.[locale] || rest?.[locale] || "";
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link href={backHref} className="text-sm font-medium text-primary">{locale === "en" ? "Back" : "Буцах"}</Link>
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">{title[locale]}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{source[locale]}</p>
      <div className="mt-6 space-y-3 text-sm leading-6 whitespace-pre-wrap">
        <p>{preview[locale]}</p>
        {body ? <p>{body}</p> : null}
      </div>
      {paid || body ? null : (
        <div className="mt-6">
          <ContinuePay kind={kind} id={id} priceMnt={priceMnt} onUnlocked={setUnlocked} />
        </div>
      )}
    </article>
  );
}
