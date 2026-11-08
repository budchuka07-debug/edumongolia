"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/empty-state";
import { MatchPill, Shell, degreeLabel, money, useMarket } from "@/components/marketplace/chrome";
import { catalog } from "@/lib/marketplace/catalog";
import { emptyStudent, evaluate, matchScholarship } from "@/lib/marketplace/eligibility";
import { id } from "@/lib/marketplace/ids";
import { disciplineOf, isPublicProgram, isPublicScholarship, isPublicUniversity } from "@/lib/marketplace/queries";
import { cn } from "cn";
import type { EducationLevel, StudentInput } from "@/lib/marketplace/types";

function numberOrNull(value: string) {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function EligibilityForm({ initialProgram = "" }: { initialProgram?: string }) {
  const { t, text, lang } = useMarket();
  const starting = emptyStudent();
  if (initialProgram) {
    const program = catalog.programs.find((item) => item.slug === initialProgram && isPublicProgram(item));
    const discipline = program ? disciplineOf(program.disciplineId) : null;
    if (program && discipline) {
      starting.degree = program.degree;
      starting.disciplineSlug = discipline.slug;
      starting.studyLanguage = program.instructionLanguage === "both" ? "any" : program.instructionLanguage;
      const university = catalog.universities.find((item) => item.id === program.universityId);
      if (university) starting.cityId = university.cityId;
    }
  }
  const [form, setForm] = useState<StudentInput>(starting);
  const [yearId, setYearId] = useState<string>(id.year2627);
  const [ran, setRan] = useState(false);

  const publicCatalog = useMemo(
    () => ({
      ...catalog,
      universities: catalog.universities.filter(isPublicUniversity),
      programs: catalog.programs.filter(isPublicProgram),
      scholarships: catalog.scholarships.filter(isPublicScholarship),
    }),
    [],
  );
  const matches = useMemo(
    () => (ran && publicCatalog.programs.length > 0 ? evaluate(form, yearId, publicCatalog) : []),
    [form, publicCatalog, ran, yearId],
  );
  const nationals = useMemo(
    () =>
      ran
        ? publicCatalog.scholarships
            .filter((item) => item.academicYearId === yearId)
            .map((item) => matchScholarship(item, form, publicCatalog))
        : [],
    [form, publicCatalog, yearId, ran],
  );

  function set<K extends keyof StudentInput>(key: K, value: StudentInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  const groups = {
    eligible: matches.filter((item) => item.status === "eligible"),
    potential: matches.filter((item) => item.status === "potential"),
    ineligible: matches.filter((item) => item.status === "ineligible"),
  };

  return (
    <Shell kicker={t.chinaKicker} title={t.eligibilityTitle} lead={t.eligibilityLead}>
      <form
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        onSubmit={(event) => {
          event.preventDefault();
          setRan(true);
        }}
      >
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.year}</span>
          <select className="h-8 w-full rounded-lg border border-input bg-transparent px-2" value={yearId} onChange={(event) => setYearId(event.target.value)}>
            {catalog.academicYears.map((year) => (
              <option key={year.id} value={year.id}>{year.label}</option>
            ))}
          </select>
        </label>
        <NumberField label={t.age} value={form.age} onChange={(value) => set("age", value)} />
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.nationality}</span>
          <Input value={form.nationality} onChange={(event) => set("nationality", event.target.value.toUpperCase())} />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.education}</span>
          <select className="h-8 w-full rounded-lg border border-input bg-transparent px-2" value={form.education} onChange={(event) => set("education", event.target.value as EducationLevel | "")}>
            <option value="">{t.educationUnset}</option>
            <option value="middle">{t.educationMiddle}</option>
            <option value="high_school">{t.educationHigh}</option>
            <option value="bachelor">{t.educationBachelor}</option>
            <option value="master">{t.educationMaster}</option>
            <option value="doctor">{t.educationDoctor}</option>
          </select>
        </label>
        <NumberField label={t.graduation} value={form.graduationYear} onChange={(value) => set("graduationYear", value)} />
        <NumberField label={t.gpa} value={form.gpa} onChange={(value) => set("gpa", value)} step="0.01" />
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.gpaScale}</span>
          <select className="h-8 w-full rounded-lg border border-input bg-transparent px-2" value={form.gpaScale ?? ""} onChange={(event) => set("gpaScale", numberOrNull(event.target.value))}>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="100">100</option>
          </select>
        </label>
        <NumberField label={t.hskLevel} value={form.hskLevel} onChange={(value) => set("hskLevel", value)} />
        <NumberField label={t.hskScore} value={form.hskScore} onChange={(value) => set("hskScore", value)} />
        <NumberField label={t.ielts} value={form.ielts} onChange={(value) => set("ielts", value)} step="0.5" />
        <NumberField label={t.toefl} value={form.toefl} onChange={(value) => set("toefl", value)} />
        <NumberField label={t.duolingo} value={form.duolingo} onChange={(value) => set("duolingo", value)} />
        <NumberField label={`${t.csca} · ${lang === "en" ? "Mathematics" : "Математик"}`} value={form.csca.mathematics} onChange={(value) => set("csca", { ...form.csca, mathematics: value })} />
        <NumberField label={`${t.csca} · ${lang === "en" ? "Physics" : "Физик"}`} value={form.csca.physics} onChange={(value) => set("csca", { ...form.csca, physics: value })} />
        <NumberField label={`${t.csca} · ${lang === "en" ? "Chemistry" : "Хими"}`} value={form.csca.chemistry} onChange={(value) => set("csca", { ...form.csca, chemistry: value })} />
        <NumberField label={`${t.csca} · ${lang === "en" ? "Professional Chinese" : "Мэргэжлийн хятад хэл"}`} value={form.csca["professional-chinese"]} onChange={(value) => set("csca", { ...form.csca, "professional-chinese": value })} />
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.language}</span>
          <select className="h-8 w-full rounded-lg border border-input bg-transparent px-2" value={form.studyLanguage} onChange={(event) => set("studyLanguage", event.target.value as StudentInput["studyLanguage"])}>
            <option value="any">{t.anyLanguage}</option>
            <option value="zh">{t.langZh}</option>
            <option value="en">{t.langEn}</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.degree}</span>
          <select className="h-8 w-full rounded-lg border border-input bg-transparent px-2" value={form.degree} onChange={(event) => set("degree", event.target.value as StudentInput["degree"])}>
            <option value="any">{t.levelAny}</option>
            <option value="bachelor">{t.bachelor}</option>
            <option value="master">{t.master}</option>
            <option value="phd">{t.phd}</option>
            <option value="non_degree">{t.nonDegree}</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.major}</span>
          <select className="h-8 w-full rounded-lg border border-input bg-transparent px-2" value={form.disciplineSlug} onChange={(event) => set("disciplineSlug", event.target.value)}>
            <option value="">{t.majorAny}</option>
            {catalog.disciplines.map((item) => (
              <option key={item.id} value={item.slug}>{text(item.name)}</option>
            ))}
          </select>
        </label>
        <NumberField label={t.budget} value={form.budgetCny} onChange={(value) => set("budgetCny", value)} />
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.city}</span>
          <select className="h-8 w-full rounded-lg border border-input bg-transparent px-2" value={form.cityId} onChange={(event) => set("cityId", event.target.value)}>
            <option value="">{t.cityAny}</option>
            {catalog.cities.map((city) => (
              <option key={city.id} value={city.id}>{text(city.name)}</option>
            ))}
          </select>
        </label>
        <div className="sm:col-span-2 lg:col-span-3">
          <button type="submit" className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}>{t.run}</button>
        </div>
      </form>
      <p className="text-sm leading-6 text-muted-foreground">{t.disclaimer}</p>
      {ran ? (
        <div className="flex flex-col gap-6">
          <p className="text-sm text-muted-foreground">{t.hiddenNote}</p>
          {publicCatalog.programs.length === 0 ? <EmptyState title={t.nonePublished} lead={t.nonePublishedLead} /> : null}
          {publicCatalog.programs.length > 0 && matches.length === 0 ? <p className="text-sm">{t.noResults}</p> : null}
          {(["potential", "eligible", "ineligible"] as const).map((status) =>
            groups[status].length ? (
              <section key={status}>
                <h2 className="font-heading text-2xl font-semibold">{status === "eligible" ? t.eligible : status === "potential" ? t.potential : t.ineligible}</h2>
                <div className="mt-3 grid gap-3">
                  {groups[status].map((match) => (
                    <article key={match.program.id} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                      <div className="flex flex-wrap items-center gap-2">
                        <MatchPill status={match.status} />
                        <h3 className="font-heading text-xl font-semibold">
                          <Link href={`/china-programs/${match.program.slug}`} className="hover:underline">{text(match.program.name)}</Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        <Link href={`/china-universities/${match.university.slug}`} className="hover:underline">{text(match.university.name)}</Link>
                        {" · "}
                        {degreeLabel(match.program.degree, t)}
                        {" · "}
                        {money(match.program.annualTuitionCny, t.notSpecified, t.cny)}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6">
                        {match.checks.map((check) => (
                          <li key={check.code}>
                            <span className="font-medium">{text(check.title)}: </span>
                            {text(check.detail)}
                          </li>
                        ))}
                      </ul>
                      {match.scholarships.length === 0 ? (
                        <p className="mt-3 text-sm text-muted-foreground">{t.noneLinked}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ) : null,
          )}
          <section>
            <h2 className="font-heading text-2xl font-semibold">{t.nationalTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.nationalBody}</p>
            <div className="mt-3 grid gap-3">
              {nationals.map((match) => (
                <article key={match.scholarship.id} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                  <div className="flex flex-wrap items-center gap-2">
                    <MatchPill status={match.status} />
                    <Link href={`/scholarships/${match.scholarship.slug}`} className="font-semibold hover:underline">
                      {text(match.scholarship.name)}
                    </Link>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm leading-6">
                    {match.checks.slice(0, 4).map((check) => (
                      <li key={check.code}>{text(check.title)}: {text(check.detail)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </Shell>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step = "1",
}: {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  step?: string;
}) {
  return (
    <label className="text-sm">
      <span className="mb-1 block text-muted-foreground">{label}</span>
      <Input type="number" step={step} value={value ?? ""} onChange={(event) => onChange(numberOrNull(event.target.value))} />
    </label>
  );
}
