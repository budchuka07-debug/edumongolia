"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { Shell, useMarket } from "@/components/marketplace/chrome";
import { paths } from "@/lib/marketplace/paths";
import { cn } from "cn";

export function ChinaHome() {
  const { t } = useMarket();
  const sections = [
    [paths.universities, t.universities],
    [paths.programs, t.programs],
    [paths.scholarships, t.scholarships],
    [paths.exams, "HSK"],
    [paths.exams, "IELTS"],
    [paths.exams, "TOEFL"],
    [paths.csca, "CSCA"],
    [paths.admission, t.requirements],
    [paths.eligibility, t.eligibilityTitle],
    [paths.apply, t.ask],
  ] as const;

  return (
    <Shell kicker={t.chinaKicker} title={t.chinaTitle} lead={t.chinaLead}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href={paths.universities} className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}>{t.findUniversity}</Link>
        <Link href={paths.eligibility} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-4")}>{t.checkFit}</Link>
        <Link href={paths.apply} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-4")}>{t.ask}</Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(([href, label]) => (
          <Link key={label} href={href} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <h2 className="font-heading text-xl font-semibold">{label}</h2>
          </Link>
        ))}
      </div>
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.universities}</h2>
        <div className="mt-4">
          <EmptyState title={t.nonePublished} lead={t.nonePublishedLead} />
        </div>
      </section>
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.requirements}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{t.yearNote}</p>
        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          {[t.language, "HSK", "IELTS", "TOEFL", "CSCA", "GPA", t.degree].map((item) => (
            <li key={item} className="rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10">{item}</li>
          ))}
        </ul>
      </section>
      <p className="text-sm leading-6 text-muted-foreground">{t.disclaimer}</p>
    </Shell>
  );
}
