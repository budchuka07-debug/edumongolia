"use client";

import Link from "next/link";
import { useMarket } from "@/components/marketplace/chrome";
import { catalog } from "@/lib/marketplace/catalog";
import { cityOf } from "@/lib/marketplace/queries";

export function ChinaPreview() {
  const { t, text } = useMarket();
  return (
    <section id="china" className="scroll-mt-28">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">{t.chinaKicker}</h2>
        <Link href="/study-abroad/china" className="shrink-0 text-sm font-semibold text-primary">
          {t.seeAllChina}
        </Link>
      </div>
      <p className="mb-4 max-w-2xl text-sm leading-6 text-muted-foreground">{t.previewLead}</p>
      <div className="grid gap-3 md:grid-cols-3">
        {catalog.universities.slice(0, 3).map((university) => {
          const city = cityOf(university.cityId);
          return (
            <Link key={university.id} href={`/china-universities/${university.slug}`} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
              <p className="text-sm text-muted-foreground">{university.name.zh}</p>
              <p className="mt-1 font-heading text-xl font-semibold">{text(university.name)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{city ? text(city.name) : ""}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
