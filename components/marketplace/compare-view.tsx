"use client";

import Link from "next/link";
import { Shell, degreeLabel, languageLabel, money, useMarket } from "@/components/marketplace/chrome";
import { getProgram, isPublicProgram, universityOf } from "@/lib/marketplace/queries";

export function CompareView({ ids }: { ids: string }) {
  const { t, text } = useMarket();
  const programs = ids
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean)
    .slice(0, 3)
    .map((slug) => getProgram(slug))
    .filter((program): program is NonNullable<typeof program> => program != null && isPublicProgram(program));

  const rows: Array<[string, (program: NonNullable<(typeof programs)[number]>) => string]> = [
    [t.universities, (program) => text(universityOf(program.universityId)?.name ?? { mn: "", en: "", zh: "" })],
    [t.degree, (program) => degreeLabel(program.degree, t)],
    [t.instruction, (program) => languageLabel(program.instructionLanguage, t)],
    [t.duration, (program) => (program.durationYears == null ? t.notSpecified : String(program.durationYears))],
    [t.tuition, (program) => money(program.annualTuitionCny, t.notSpecified, t.cny)],
    [t.applicationFee, (program) => money(program.applicationFeeCny, t.notSpecified, t.cny)],
    [t.accommodation, (program) => money(program.annualAccommodationCny, t.notSpecified, t.cny)],
    ["HSK", () => t.notSpecified],
    ["IELTS", () => t.notSpecified],
    ["TOEFL", () => t.notSpecified],
    ["CSCA", () => t.notSpecified],
    [t.gpa, () => t.notSpecified],
    [t.deadline, () => t.notSpecified],
  ];

  return (
    <Shell kicker={t.programs} title={t.compare} lead={t.compareLead}>
      {programs.length < 2 ? (
        <p className="text-sm">
          {t.compareNeed}{" "}
          <Link href="/china-programs" className="font-semibold text-primary">{t.programs}</Link>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 pr-3" />
                {programs.map((program) => (
                  <th key={program.id} className="py-2 pr-3 font-heading text-base font-semibold">
                    <Link href={`/china-programs/${program.slug}`} className="hover:underline">{text(program.name)}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, cell]) => (
                <tr key={label} className="border-t border-border">
                  <th className="py-2 pr-3 font-medium text-muted-foreground">{label}</th>
                  {programs.map((program) => (
                    <td key={program.id} className="py-2 pr-3">{cell(program)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}
