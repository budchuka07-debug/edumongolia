"use client";

import Link from "next/link";
import { useState } from "react";
import type { Copy } from "@/lib/i18n/types";
import type { Bilingual } from "@/lib/payments/preview";
import { ContinuePay, type UnlockedReading } from "@/components/payments/continue-pay";
import { useI18n } from "@/components/language-provider";

const copy = {
  mn: {
    back: "Төслүүд",
    note: "Энэ хуудасны үнэ 10,000₮. Эхний 40% нээлттэй. Үргэлжлүүлэхэд үлдсэн бүтэц татагдана. Файл зарагддаггүй.",
  },
  en: {
    back: "Projects",
    note: "This page costs 10,000 MNT. The first 40% is open. Continuing loads the rest of the brief. No file is sold.",
  },
} as const;

export function ProjectReading({
  id,
  title,
  field,
  priceMnt,
  preview,
  rest,
  paid,
}: {
  id: string;
  title: Copy;
  field: Copy;
  priceMnt: number;
  preview: Bilingual;
  rest: Bilingual | null;
  paid: boolean;
}) {
  const { locale } = useI18n();
  const t = copy[locale];
  const [unlocked, setUnlocked] = useState<UnlockedReading | null>(null);
  const open = paid || Boolean(unlocked?.rest);
  const remainder = (unlocked?.rest ?? rest)?.[locale] ?? "";

  return (
    <article>
      <Link href="/papers" className="text-sm font-semibold text-primary">{t.back}</Link>
      <p className="text-sm text-muted-foreground">{field[locale]}</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{title[locale]}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{t.note}</p>
      <div className="mt-6 space-y-3 text-sm leading-6 whitespace-pre-wrap">
        <p>{preview[locale]}</p>
        {open && remainder ? <p>{remainder}</p> : null}
      </div>
      {open ? null : (
        <ContinuePay kind="project" id={id} priceMnt={priceMnt} onUnlocked={setUnlocked} />
      )}
    </article>
  );
}
