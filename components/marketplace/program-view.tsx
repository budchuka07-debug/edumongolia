"use client";

import Link from "next/link";
import { Fact, Shell, degreeLabel, languageLabel, money, useMarket } from "@/components/marketplace/chrome";
import { catalog } from "@/lib/marketplace/catalog";
import { cityOf, disciplineOf, requirementFor, scholarshipsForProgram, sourceOf, universityOf } from "@/lib/marketplace/queries";
import type { Program } from "@/lib/marketplace/types";

export function ProgramView({ program }: { program: Program }) {
  const { t, text } = useMarket();
  const university = universityOf(program.universityId);
  const discipline = disciplineOf(program.disciplineId);
  const source = sourceOf(program.sourceId);
  if (!university || !discipline) return null;
  const city = cityOf(university.cityId);

  return (
    <Shell kicker={program.name.zh} title={text(program.name)} lead={`${text(university.name)} · ${program.name.en}`}>
      <dl>
        <Fact label={t.universities}>
          <Link className="text-primary underline-offset-4 hover:underline" href={`/china-universities/${university.slug}`}>
            {text(university.name)}
          </Link>
          {city ? `, ${text(city.name)}` : ""}
        </Fact>
        <Fact label={t.major}>
          <Link className="text-primary underline-offset-4 hover:underline" href={`/china-programs/${discipline.slug}`}>
            {text(discipline.name)}
          </Link>
        </Fact>
        <Fact label={t.faculty}>{program.facultyName ? text(program.facultyName) : t.notSpecified}</Fact>
        <Fact label={t.degree}>{degreeLabel(program.degree, t)}</Fact>
        <Fact label={t.instruction}>{languageLabel(program.instructionLanguage, t)}</Fact>
        <Fact label={t.duration}>{program.durationYears == null ? t.notSpecified : `${program.durationYears} ${t.years}`}</Fact>
        <Fact label={t.tuition}>{money(program.annualTuitionCny, t.notSpecified, t.cny)}</Fact>
        <Fact label={t.applicationFee}>{money(program.applicationFeeCny, t.notSpecified, t.cny)}</Fact>
        <Fact label={t.accommodation}>{money(program.annualAccommodationCny, t.notSpecified, t.cny)}</Fact>
        <Fact label={t.intake}>{program.intake ? text(program.intake) : t.notSpecified}</Fact>
        <Fact label={t.website}>{program.officialUrl ?? t.notSpecified}</Fact>
        <Fact label={t.documents}>{t.documentsEmpty}</Fact>
      </dl>
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.requirements}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{t.yearNote}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {catalog.academicYears.map((year) => {
            const requirement = requirementFor("program", program.id, year.id);
            const linked = scholarshipsForProgram(program.id, year.id);
            return (
              <article key={year.id} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                <h3 className="font-semibold">{year.label}</h3>
                <dl className="mt-2">
                  <Fact label={t.age}>{requirement?.minAge == null && requirement?.maxAge == null ? t.notSpecified : `${requirement?.minAge ?? "—"}–${requirement?.maxAge ?? "—"}`}</Fact>
                  <Fact label={t.gpa}>{requirement?.minGpa == null ? t.notSpecified : String(requirement.minGpa)}</Fact>
                  <Fact label="HSK">{t.notSpecified}</Fact>
                  <Fact label="IELTS">{t.notSpecified}</Fact>
                  <Fact label="TOEFL">{t.notSpecified}</Fact>
                  <Fact label="CSCA">{t.notSpecified}</Fact>
                  <Fact label={t.deadline}>{t.notSpecified}</Fact>
                  <Fact label={t.scholarships}>
                    {linked.length === 0
                      ? t.noneLinked
                      : linked.map((item) => (
                          <Link key={item.id} href={`/scholarships/${item.slug}`} className="block text-primary">
                            {text(item.name)}
                          </Link>
                        ))}
                  </Fact>
                </dl>
              </article>
            );
          })}
        </div>
      </section>
      {source ? (
        <p className="text-sm text-muted-foreground">
          {t.source}: {text(source.title)}
          {source.note ? ` — ${text(source.note)}` : ""}
        </p>
      ) : null}
      <p className="text-sm text-muted-foreground">{t.disclaimer}</p>
      <div className="flex flex-wrap gap-4 text-sm font-semibold">
        <Link href={`/eligibility-checker?program=${program.slug}`} className="text-primary">{t.checkFit}</Link>
        <Link href={`/china-programs/compare?ids=${program.slug}`} className="text-primary">{t.compare}</Link>
        <Link href="/apply" className="text-primary">{t.ask}</Link>
      </div>
    </Shell>
  );
}
