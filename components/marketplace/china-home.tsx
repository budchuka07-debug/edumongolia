"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Shell, useMarket } from "@/components/marketplace/chrome";
import { catalog } from "@/lib/marketplace/catalog";
import { paths } from "@/lib/marketplace/paths";
import { cn } from "cn";

const links = [
  [paths.universities, "universities"],
  [paths.programs, "programs"],
  [paths.scholarships, "scholarships"],
  [paths.eligibility, "eligibilityTitle"],
  [paths.admission, "guides"],
  [paths.csca, "examTitle"],
] as const;

export function ChinaHome() {
  const { t, text } = useMarket();
  return (
    <Shell kicker={t.chinaKicker} title={t.chinaTitle} lead={t.chinaLead}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href={paths.universities} className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}>{t.findUniversity}</Link>
        <Link href={paths.eligibility} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-4")}>{t.checkFit}</Link>
        <Link href={paths.apply} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-4")}>{t.ask}</Link>
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
          {catalog.universities.map((university) => (
            <Link key={university.id} href={paths.university(university.slug)} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
              <p className="text-sm text-muted-foreground">{university.name.zh}</p>
              <p className="mt-1 font-heading text-xl font-semibold">{text(university.name)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{text(catalog.cities.find((city) => city.id === university.cityId)?.name ?? { mn: "", en: "", zh: "" })}</p>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.city}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {catalog.cities.map((city) => (
            <Link key={city.id} href={paths.universities} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm">
              {text(city.name)} · {city.name.zh}
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.degree}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={paths.programs} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">{t.bachelor}</Link>
          <Link href={paths.programs} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">{t.master}</Link>
          <Link href={paths.programs} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">{t.phd}</Link>
          <Link href={paths.programs} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">{t.nonDegree}</Link>
        </div>
      </section>
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.language}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link href={paths.programs} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">{t.langZh}</Link>
          <Link href={paths.programs} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">{t.langEn}</Link>
        </div>
      </section>
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.scholarships}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {catalog.scholarships.map((scholarship) => (
            <Link key={scholarship.id} href={paths.scholarship(scholarship.slug)} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
              <p className="text-sm text-muted-foreground">{scholarship.name.zh}</p>
              <p className="mt-1 font-heading text-xl font-semibold">{text(scholarship.name)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.unpublished}</p>
            </Link>
          ))}
        </div>
      </section>
      <p className="text-sm leading-6 text-muted-foreground">{t.unpublished}</p>
      <p className="text-sm leading-6 text-muted-foreground">{t.disclaimer}</p>
    </Shell>
  );
}
