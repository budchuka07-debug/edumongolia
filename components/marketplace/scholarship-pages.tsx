"use client";

import Link from "next/link";
import { Fact, Shell, StatusPill, categoryLabel, degreeLabel, money, useMarket } from "@/components/marketplace/chrome";
import { catalog } from "@/lib/marketplace/catalog";
import { ChinaLinkFacts } from "@/components/marketplace/host-directory";
import { chinaLinkHosts, chinaLinkSource } from "@/lib/marketplace/china-link-hosts";
import { paths } from "@/lib/marketplace/paths";
import { innerMongoliaScholarshipPath } from "@/lib/scholarships/inner-mongolia";
import { benefitFor, deadlineFor, isPublicScholarship, requirementFor, sourceOf, universityOf } from "@/lib/marketplace/queries";
import type { Scholarship } from "@/lib/marketplace/types";

export function ScholarshipBrowser() {
  const { t, text, lang } = useMarket();
  return (
    <Shell kicker={t.chinaKicker} title={t.scholarships} lead={t.nationalBody}>
      <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
        <p className="text-xs font-medium text-primary">2026-01-21</p>
        <h2 className="mt-2 font-heading text-2xl font-semibold">China Link</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.hostLead}</p>
        <p className="mt-3 text-sm">
          <a className="font-semibold text-primary" href={chinaLinkSource.programUrl}>{t.website}</a>
          {" · "}
          <Link href={paths.universities} className="font-semibold text-primary">
            {chinaLinkHosts.length}
          </Link>
        </p>
      </article>
      <p className="text-sm">
        <Link className="font-semibold text-primary" href={paths.internationalScholarships}>
          {lang === "en" ? "Scholarships in other countries" : "Бусад улсын тэтгэлэг"}
        </Link>
      </p>
      <ChinaLinkFacts />
      <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
        <p className="text-xs font-medium text-primary">{lang === "en" ? "Separate program" : "Тусдаа хөтөлбөр"}</p>
        <h2 className="mt-2 font-heading text-2xl font-semibold">
          <Link href={innerMongoliaScholarshipPath} className="hover:underline">
            {lang === "en" ? "Inner Mongolia Government Scholarship" : "Өвөр Монголын Засгийн газрын тэтгэлэг"}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">内蒙古自治区政府奖学金</p>
        <p className="mt-3 text-sm leading-6">
          {lang === "en"
            ? "For Mongolian students. Not the Chinese Government Scholarship, and not a university or other provincial award. The 2026/2027 quota is historical."
            : "Монгол оюутанд. Хятадын засгийн газрын тэтгэлэг, их сургуулийн болон бусад мужийн тэтгэлэг биш. 2026/2027 оны квот нь өмнөх жилийн тоо."}
        </p>
      </article>
      <div className="grid gap-4 md:grid-cols-2">
        {catalog.scholarships.filter(isPublicScholarship).map((scholarship) => {
          const benefit = benefitFor(scholarship.id, scholarship.academicYearId);
          const year = catalog.academicYears.find((item) => item.id === scholarship.academicYearId);
          return (
            <article key={scholarship.id} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
              <p className="text-xs font-medium text-primary">{year?.label}</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold">
                <Link href={`/china-scholarships/${scholarship.slug}`} className="hover:underline">
                  {text(scholarship.name)}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{scholarship.name.zh}</p>
              <p className="mt-3 text-sm leading-6">
                {scholarship.categories.map((category) => categoryLabel(category, t)).join(" · ")}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {t.stipend}: {money(benefit?.monthlyStipendCny ?? null, t.unpublished, t.cny)}
              </p>
            </article>
          );
        })}
      </div>
      <p className="text-sm leading-6 text-muted-foreground">{t.yearNote}</p>
    </Shell>
  );
}

export function ScholarshipView({ scholarship }: { scholarship: Scholarship }) {
  const { t, text } = useMarket();
  const source = sourceOf(scholarship.sourceId);
  const benefit = benefitFor(scholarship.id, scholarship.academicYearId);
  const deadline = deadlineFor(scholarship.id, scholarship.academicYearId);
  const requirement = requirementFor("scholarship", scholarship.id, scholarship.academicYearId);
  const year = catalog.academicYears.find((item) => item.id === scholarship.academicYearId);
  const links = catalog.scholarshipUniversities.filter(
    (item) => item.scholarshipId === scholarship.id && item.academicYearId === scholarship.academicYearId,
  );

  return (
    <Shell kicker={year?.label} title={text(scholarship.name)} lead={scholarship.name.en}>
      <div className="flex flex-wrap gap-2">
        {source ? <StatusPill status={source.status} /> : null}
      </div>
      <dl>
        <Fact label={t.categories}>{scholarship.categories.map((category) => categoryLabel(category, t)).join(", ")}</Fact>
        <Fact label={t.year}>{year?.label}</Fact>
        <Fact label={t.degree}>{scholarship.degreeLevels.map((level) => degreeLabel(level, t)).join(", ")}</Fact>
        <Fact label={t.nationality}>{scholarship.eligibleNationalities?.join(", ") ?? t.unpublished}</Fact>
        <Fact label={t.age}>{requirement?.minAge == null && requirement?.maxAge == null ? t.notSpecified : `${requirement?.minAge ?? "—"}–${requirement?.maxAge ?? "—"}`}</Fact>
        <Fact label={t.gpa}>{requirement?.minGpa == null ? t.notSpecified : String(requirement.minGpa)}</Fact>
        <Fact label="HSK / IELTS / TOEFL / CSCA">{t.notSpecified}</Fact>
        <Fact label={t.benefits}>
          {t.coverage}: {benefit?.tuitionCoverage ?? t.unpublished}. {t.accommodation}: {benefit?.accommodationCoverage ?? t.unpublished}. {t.stipend}: {money(benefit?.monthlyStipendCny ?? null, t.unpublished, t.cny)}. {t.insurance}: {benefit?.medicalInsurance == null ? t.unpublished : benefit.medicalInsurance ? t.yes : t.no}.
        </Fact>
        <Fact label={t.applicationFee}>{money(benefit?.applicationFeeCny ?? null, t.unpublished, t.cny)}</Fact>
        <Fact label={t.opens}>{deadline?.opensOn ?? t.unpublished}</Fact>
        <Fact label={t.closes}>{deadline?.closesOn ?? t.unpublished}</Fact>
        <Fact label={t.procedure}>{scholarship.procedure ? text(scholarship.procedure) : t.unpublished}</Fact>
        <Fact label={t.website}>
          {scholarship.officialUrl ? (
            <a className="break-all text-primary underline-offset-4 hover:underline" href={scholarship.officialUrl}>
              {scholarship.officialUrl}
            </a>
          ) : (
            t.unpublished
          )}
        </Fact>
        <Fact label={t.linkedUniversities}>
          {links.length === 0
            ? t.noneLinked
            : links.map((link) => {
                const university = universityOf(link.universityId);
                return university ? (
                  <Link key={link.universityId} href={`/china-universities/${university.slug}`} className="block text-primary">
                    {text(university.name)}
                  </Link>
                ) : null;
              })}
        </Fact>
      </dl>
      {source ? (
        <p className="text-sm leading-6 text-muted-foreground">
          {t.source}:{" "}
          <a className="text-primary" href={source.url}>
            {text(source.title)}
          </a>
          {source.verifiedOn ? ` · ${source.verifiedOn}` : ""}
          {source.note ? ` — ${text(source.note)}` : ""}
        </p>
      ) : null}
      <p className="text-sm text-muted-foreground">{t.disclaimer}</p>
      <Link href="/eligibility-checker" className="text-sm font-semibold text-primary">
        {t.checkFit}
      </Link>
    </Shell>
  );
}
