"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Shell, useMarket } from "@/components/marketplace/chrome";
import { catalog } from "@/lib/marketplace/catalog";
import { cn } from "cn";

const links = [
  ["/universities", "universities"],
  ["/programs", "programs"],
  ["/study/scholarships", "scholarships"],
  ["/eligibility", "eligibilityTitle"],
  ["/admission-guide", "guides"],
  ["/admission-guide/csca", "examTitle"],
] as const;

export function ChinaHome() {
  const { t, text } = useMarket();
  return (
    <Shell kicker={t.chinaKicker} title={t.chinaTitle} lead={t.chinaLead}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/universities" className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}>{t.findUniversity}</Link>
        <Link href="/eligibility" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-4")}>{t.checkFit}</Link>
        <Link href="/study/inquiry" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-4")}>{t.ask}</Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(([href, key]) => (
          <Link key={href} href={href} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <h2 className="font-heading text-xl font-semibold">{t[key]}</h2>
          </Link>
        ))}
      </div>
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.universities}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {catalog.universities.slice(0, 3).map((university) => (
            <Link key={university.id} href={`/universities/${university.slug}`} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
              <p className="text-sm text-muted-foreground">{university.name.zh}</p>
              <p className="mt-1 font-heading text-xl font-semibold">{text(university.name)}</p>
            </Link>
          ))}
        </div>
      </section>
      <p className="text-sm leading-6 text-muted-foreground">{t.disclaimer}</p>
    </Shell>
  );
}
