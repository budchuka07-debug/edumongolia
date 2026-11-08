"use client";

import Link from "next/link";
import { useMarket } from "@/components/marketplace/chrome";

export function ChinaPreview() {
  const { t } = useMarket();
  return (
    <section id="china" className="scroll-mt-20">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">{t.chinaKicker}</h2>
        <Link href="/study-abroad/china" className="shrink-0 text-sm font-semibold text-primary">
          {t.seeAllChina}
        </Link>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{t.nonePublishedLead}</p>
    </section>
  );
}
