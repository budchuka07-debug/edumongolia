"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shell, degreeLabel, languageLabel, useMarket } from "@/components/marketplace/chrome";
import { catalog } from "@/lib/marketplace/catalog";
import { EmptyState } from "@/components/empty-state";
import { cityOf, isPublicUniversity, programsForUniversity } from "@/lib/marketplace/queries";
import { cn } from "cn";

export function UniversityBrowser() {
  const { t, text } = useMarket();
  const [query, setQuery] = useState("");
  const [cityId, setCityId] = useState("");
  const [degree, setDegree] = useState("");
  const [language, setLanguage] = useState("");
  const [kind, setKind] = useState("");

  const rows = useMemo(() => {
    return catalog.universities.filter(isPublicUniversity).filter((university) => {
      const blob = `${university.name.mn} ${university.name.en} ${university.name.zh}`.toLowerCase();
      if (query && !blob.includes(query.trim().toLowerCase())) return false;
      if (cityId && university.cityId !== cityId) return false;
      if (kind && university.type !== kind) return false;
      const programs = programsForUniversity(university.id);
      if (degree && !programs.some((program) => program.degree === degree)) return false;
      if (language && !programs.some((program) => program.instructionLanguage === language)) return false;
      return true;
    });
  }, [query, cityId, degree, language, kind]);

  return (
    <Shell kicker={t.chinaKicker} title={t.universities} lead={t.previewLead}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="text-sm sm:col-span-2">
          <span className="mb-1 block text-muted-foreground">{t.search}</span>
          <Input value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <Select label={t.city} value={cityId} onChange={setCityId} options={[[ "", t.all ], ...catalog.cities.map((city) => [city.id, text(city.name)] as [string, string])]} />
        <Select label={t.degree} value={degree} onChange={setDegree} options={[["", t.all], ["bachelor", t.bachelor], ["master", t.master], ["phd", t.phd], ["non_degree", t.nonDegree]]} />
        <Select label={t.language} value={language} onChange={setLanguage} options={[["", t.all], ["zh", t.langZh], ["en", t.langEn]]} />
        <Select label={t.type} value={kind} onChange={setKind} options={[["", t.all], ["public", t.public], ["private", t.private]]} />
      </div>
      {rows.length === 0 ? <EmptyState title={t.nonePublished} lead={t.nonePublishedLead} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((university) => {
          const city = cityOf(university.cityId);
          const programs = programsForUniversity(university.id);
          return (
            <article key={university.id} className="flex flex-col rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
              <p className="text-sm text-muted-foreground">{university.name.zh}</p>
              <h2 className="mt-1 font-heading text-2xl font-semibold">{text(university.name)}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {city ? text(city.name) : t.unpublished}
                {university.type ? ` · ${university.type === "public" ? t.public : t.private}` : ""}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{text(university.introduction)}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {programs.length} {t.programCount}
                {programs[0] ? ` · ${degreeLabel(programs[0].degree, t)} · ${languageLabel(programs[0].instructionLanguage, t)}` : ""}
              </p>
              <Link href={`/china-universities/${university.slug}`} className={cn(buttonVariants({ size: "lg" }), "mt-4 h-10 w-fit px-4")}>
                {t.view}
              </Link>
            </article>
          );
        })}
      </div>
    </Shell>
  );
}

function Select({
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
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue || "all"} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
