"use client";

import { useState } from "react";
import Link from "next/link";
import type { Bilingual } from "@/lib/payments/preview";
import { ContinuePay, type UnlockedReading } from "@/components/payments/continue-pay";
import { useI18n } from "@/components/language-provider";

export function LessonView({
  slug,
  title,
  preview,
  rest,
  html,
  priceMnt,
  paid,
}: {
  slug: string;
  title: Bilingual;
  preview: Bilingual;
  rest: Bilingual | null;
  html: string | null;
  priceMnt: number;
  paid: boolean;
}) {
  const { locale } = useI18n();
  const [unlocked, setUnlocked] = useState<UnlockedReading | null>(null);
  const open = paid || Boolean(unlocked?.html || unlocked?.rest);
  const remainder = (unlocked?.rest ?? rest)?.[locale] ?? "";
  const interactive = unlocked?.html ?? html;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link href="/school" className="text-sm font-semibold text-primary">{locale === "en" ? "Exam bank" : "Шалгалтын сан"}</Link>
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{title[locale]}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {locale === "en"
          ? "The first 40% of the lesson is open. Continuing costs 5,000 MNT. The interactive tasks load after the payment is confirmed."
          : "Хичээлийн эхний 40% нээлттэй. Үргэлжлүүлэхэд 5,000₮. Интерактив даалгавар төлбөр баталгаажсаны дараа татагдана."}
      </p>
      <div className="mt-6 space-y-3 text-sm leading-6 whitespace-pre-wrap">
        <p>{preview[locale]}</p>
        {open && remainder ? <p>{remainder}</p> : null}
      </div>
      {open && interactive ? (
        <iframe title={title[locale]} srcDoc={interactive} sandbox="allow-scripts" className="mt-6 h-[48rem] w-full rounded-2xl border border-border bg-card" />
      ) : null}
      {open ? null : <ContinuePay kind="lesson" id={slug} priceMnt={priceMnt} onUnlocked={setUnlocked} />}
    </article>
  );
}
