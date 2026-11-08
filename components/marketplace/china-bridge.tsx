"use client";

import Link from "next/link";
import { useMarket } from "@/components/marketplace/chrome";

export function ChinaBridge() {
  const { t } = useMarket();
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <div className="rounded-2xl bg-card px-4 py-4 ring-1 ring-foreground/10 sm:px-5">
        <p className="font-heading text-lg font-semibold">{t.bridgeTitle}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{t.bridgeBody}</p>
        <Link href="/study/scholarships" className="mt-2 inline-block text-sm font-semibold text-primary">
          {t.openChinaScholarships}
        </Link>
      </div>
    </div>
  );
}
