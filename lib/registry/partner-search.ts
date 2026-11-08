import { dongxuejiSource, dongxuejiUniversities, type DongxuejiProgram, type DongxuejiUniversity } from "@/lib/marketplace/dongxueji-universities";

export type PartnerHit = {
  university: DongxuejiUniversity;
  program: DongxuejiProgram;
};

export function searchPartnerPrograms(input: {
  major?: string;
  language?: string;
  tuitionMin?: string;
  tuitionMax?: string;
  scholarship?: string;
}) {
  const major = (input.major ?? "").trim().toLowerCase();
  const language = input.language ?? "";
  const min = input.tuitionMin ? Number(input.tuitionMin) : null;
  const max = input.tuitionMax ? Number(input.tuitionMax) : null;
  const scholarship = input.scholarship === "yes";
  const active = Boolean(major || language || min != null || max != null || scholarship);
  if (!active) return { active, hits: [] as PartnerHit[], total: 0 };
  const hits: PartnerHit[] = [];
  for (const university of dongxuejiUniversities) {
    for (const program of university.programs) {
      if (language && program.language !== language) continue;
      if (scholarship && !program.award) continue;
      const amount = program.tuitionCny;
      if (min != null && (amount == null || amount < min)) continue;
      if (max != null && (amount == null || amount > max)) continue;
      if (major) {
        const blob = `${program.name} ${program.degree} ${program.majors.map((item) => item.name).join(" ")}`.toLowerCase();
        if (!blob.includes(major)) continue;
      }
      hits.push({ university, program });
    }
  }
  return { active, hits: hits.slice(0, 40), total: hits.length, source: dongxuejiSource };
}
