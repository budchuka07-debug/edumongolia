"use client";

import Link from "next/link";
import { Fact, Shell, StatusPill, degreeLabel, languageLabel, money, useMarket } from "@/components/marketplace/chrome";
import { catalog } from "@/lib/marketplace/catalog";
import { cityOf, programsForUniversity, provinceOf, sourceOf } from "@/lib/marketplace/queries";
import type { University } from "@/lib/marketplace/types";

export function UniversityView({ university }: { university: University }) {
  const { t, text } = useMarket();
  const city = cityOf(university.cityId);
  const province = provinceOf(university.provinceId);
  const source = sourceOf(university.sourceId);
  const programs = programsForUniversity(university.id);

  return (
    <Shell kicker={university.name.zh} title={text(university.name)} lead={university.name.en}>
      <div className="flex flex-wrap gap-2 text-sm">
        {source ? <StatusPill status={source.status} /> : null}
        <span className="text-muted-foreground">{t.pending}</span>
      </div>
      <dl>
        <Fact label={t.city}>{city && province ? `${text(city.name)}, ${text(province.name)}` : t.unpublished}</Fact>
        <Fact label={t.type}>{university.type === "public" ? t.public : university.type === "private" ? t.private : t.notSpecified}</Fact>
        <Fact label={t.founded}>{university.foundedYear ?? t.notSpecified}</Fact>
        <Fact label={t.website}>
          {university.website ? (
            <a className="text-primary underline-offset-4 hover:underline" href={university.website}>
              {university.website}
            </a>
          ) : (
            t.notSpecified
          )}
        </Fact>
        <Fact label={t.internationalSite}>{university.internationalWebsite ?? t.notSpecified}</Fact>
        <Fact label={t.contact}>{university.email ?? university.phone ?? t.notSpecified}</Fact>
        <Fact label={t.introduction}>{text(university.introduction)}</Fact>
      </dl>
      {source ? (
        <p className="text-sm leading-6 text-muted-foreground">
          {t.source}:{" "}
          <a className="text-primary underline-offset-4 hover:underline" href={source.url}>
            {text(source.title)}
          </a>
          {source.note ? ` — ${text(source.note)}` : ""}
        </p>
      ) : null}
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.programs}</h2>
        <div className="mt-4 grid gap-3">
          {programs.map((program) => (
            <Link key={program.id} href={`/china-programs/${program.slug}`} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
              <p className="text-sm text-muted-foreground">{program.name.zh}</p>
              <p className="font-heading text-xl font-semibold">{text(program.name)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {degreeLabel(program.degree, t)} · {languageLabel(program.instructionLanguage, t)} ·{" "}
                {money(program.annualTuitionCny, t.notSpecified, t.cny)}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.requirements}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.yearNote}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {catalog.academicYears.map((year) => (
            <article key={year.id} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
              <h3 className="font-semibold">{year.label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.notSpecified}</p>
            </article>
          ))}
        </div>
      </section>
      <Link href={`/eligibility-checker?university=${university.slug}`} className="text-sm font-semibold text-primary">
        {t.checkFit}
      </Link>
    </Shell>
  );
}
