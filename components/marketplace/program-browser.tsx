"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Shell, degreeLabel, languageLabel, money, useMarket } from "@/components/marketplace/chrome";
import { catalog } from "@/lib/marketplace/catalog";
import { cityOf, disciplineOf, scholarshipsForProgram, universityOf } from "@/lib/marketplace/queries";
import { cn } from "cn";
import type { DegreeLevel, InstructionLanguage } from "@/lib/marketplace/types";

export function ProgramBrowser({
  disciplineSlug = "",
  degree = "",
}: {
  disciplineSlug?: string;
  degree?: DegreeLevel | "";
}) {
  const { t, text } = useMarket();
  const router = useRouter();
  const [cityId, setCityId] = useState("");
  const [level, setLevel] = useState(degree);
  const [language, setLanguage] = useState<InstructionLanguage | "">("");
  const [major, setMajor] = useState(disciplineSlug);
  const [publishedFee, setPublishedFee] = useState(false);
  const [linked, setLinked] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);

  const rows = useMemo(() => {
    return catalog.programs.filter((program) => {
      const university = universityOf(program.universityId);
      const discipline = disciplineOf(program.disciplineId);
      if (!university || !discipline) return false;
      if (cityId && university.cityId !== cityId) return false;
      if (level && program.degree !== level) return false;
      if (language && program.instructionLanguage !== language) return false;
      if (major && discipline.slug !== major) return false;
      if (publishedFee && program.annualTuitionCny == null) return false;
      if (linked && scholarshipsForProgram(program.id, catalog.academicYears[0].id).length === 0) return false;
      return true;
    });
  }, [cityId, level, language, major, publishedFee, linked]);

  function toggle(slug: string) {
    setPicked((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 3) return current;
      return [...current, slug];
    });
  }

  return (
    <Shell kicker={t.chinaKicker} title={t.programs} lead={t.previewLead}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={t.city} value={cityId} onChange={setCityId} options={[[ "", t.all ], ...catalog.cities.map((city) => [city.id, text(city.name)] as [string, string])]} />
        <Field label={t.degree} value={level} onChange={(value) => setLevel(value as DegreeLevel | "")} options={[["", t.all], ["bachelor", t.bachelor], ["master", t.master], ["phd", t.phd], ["non_degree", t.nonDegree]]} />
        <Field label={t.language} value={language} onChange={(value) => setLanguage(value as InstructionLanguage | "")} options={[["", t.all], ["zh", t.langZh], ["en", t.langEn]]} />
        <Field label={t.major} value={major} onChange={setMajor} options={[[ "", t.all ], ...catalog.disciplines.map((item) => [item.slug, text(item.name)] as [string, string])]} />
        <label className="flex items-center gap-2 text-sm sm:mt-6">
          <input type="checkbox" checked={publishedFee} onChange={(event) => setPublishedFee(event.target.checked)} />
          {t.withPublishedFee}
        </label>
        <label className="flex items-center gap-2 text-sm sm:mt-6">
          <input type="checkbox" checked={linked} onChange={(event) => setLinked(event.target.checked)} />
          {t.filterScholarship}
        </label>
      </div>
      {publishedFee && rows.length === 0 ? <p className="text-sm text-muted-foreground">{t.emptyFeeFilter}</p> : null}
      {rows.length === 0 && !publishedFee ? <p className="text-sm text-muted-foreground">{t.emptyList}</p> : null}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          disabled={picked.length < 2}
          onClick={() => router.push(`/programs/compare?ids=${picked.join(",")}`)}
        >
          {t.compare} ({picked.length}/3)
        </button>
      </div>
      <div className="grid gap-3">
        {rows.map((program) => {
          const university = universityOf(program.universityId);
          const city = university ? cityOf(university.cityId) : null;
          const discipline = disciplineOf(program.disciplineId);
          if (!university || !discipline) return null;
          return (
            <article key={program.id} className="grid gap-3 rounded-2xl bg-card p-4 ring-1 ring-foreground/10 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <input
                type="checkbox"
                aria-label={t.compare}
                checked={picked.includes(program.slug)}
                onChange={() => toggle(program.slug)}
              />
              <div>
                <p className="text-xs text-muted-foreground">{text(university.name)} · {city ? text(city.name) : ""}</p>
                <h2 className="font-heading text-xl font-semibold">
                  <Link href={`/programs/${program.slug}`} className="hover:underline">
                    {text(program.name)}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground">
                  {text(discipline.name)} · {degreeLabel(program.degree, t)} · {languageLabel(program.instructionLanguage, t)}
                </p>
              </div>
              <p className="text-sm">{money(program.annualTuitionCny, t.notSpecified, t.cny)}</p>
            </article>
          );
        })}
      </div>
    </Shell>
  );
}

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="text-sm">
      <span className="mb-1 block text-muted-foreground">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm">
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue || "all"} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
