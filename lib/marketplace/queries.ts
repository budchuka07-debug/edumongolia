import { catalog } from "@/lib/marketplace/catalog";
import { paths } from "@/lib/marketplace/paths";
import type {
  AcademicRequirement,
  City,
  Discipline,
  Program,
  Province,
  Scholarship,
  ScholarshipBenefit,
  ScholarshipDeadline,
  SourceReference,
  University,
} from "@/lib/marketplace/types";

export function listUniversities() {
  return catalog.universities;
}

export function getUniversity(slug: string): University | null {
  return catalog.universities.find((item) => item.slug === slug) ?? null;
}

export function listPrograms() {
  return catalog.programs;
}

export function getProgram(slug: string): Program | null {
  return catalog.programs.find((item) => item.slug === slug) ?? null;
}

export function getDiscipline(slug: string): Discipline | null {
  return catalog.disciplines.find((item) => item.slug === slug) ?? null;
}

export function listDisciplines() {
  return catalog.disciplines;
}

export function listScholarships() {
  return catalog.scholarships;
}

export function getScholarship(slug: string): Scholarship | null {
  return catalog.scholarships.find((item) => item.slug === slug) ?? null;
}

export function listArticles() {
  return catalog.articles;
}

export function getArticle(slug: string) {
  return catalog.articles.find((item) => item.slug === slug) ?? null;
}

export function listCities(): City[] {
  return catalog.cities;
}

export function cityOf(cityId: string): City | null {
  return catalog.cities.find((item) => item.id === cityId) ?? null;
}

export function provinceOf(provinceId: string): Province | null {
  return catalog.provinces.find((item) => item.id === provinceId) ?? null;
}

export function sourceOf(sourceId: string): SourceReference | null {
  return catalog.sources.find((item) => item.id === sourceId) ?? null;
}

export function disciplineOf(disciplineId: string): Discipline | null {
  return catalog.disciplines.find((item) => item.id === disciplineId) ?? null;
}

export function universityOf(universityId: string): University | null {
  return catalog.universities.find((item) => item.id === universityId) ?? null;
}

export function programsForUniversity(universityId: string) {
  return catalog.programs.filter((item) => item.universityId === universityId);
}

export function programsForDiscipline(disciplineId: string) {
  return catalog.programs.filter((item) => item.disciplineId === disciplineId);
}

export function requirementFor(ownerType: "program" | "scholarship", ownerId: string, academicYearId: string): AcademicRequirement | null {
  return (
    catalog.academicRequirements.find(
      (item) => item.ownerType === ownerType && item.ownerId === ownerId && item.academicYearId === academicYearId,
    ) ?? null
  );
}

export function benefitFor(scholarshipId: string, academicYearId: string): ScholarshipBenefit | null {
  return (
    catalog.scholarshipBenefits.find(
      (item) => item.scholarshipId === scholarshipId && item.academicYearId === academicYearId,
    ) ?? null
  );
}

export function deadlineFor(scholarshipId: string, academicYearId: string): ScholarshipDeadline | null {
  return (
    catalog.scholarshipDeadlines.find(
      (item) => item.scholarshipId === scholarshipId && item.academicYearId === academicYearId,
    ) ?? null
  );
}

export function scholarshipsForProgram(programId: string, academicYearId: string) {
  const universityId = catalog.programs.find((item) => item.id === programId)?.universityId;
  const ids = new Set(
    catalog.scholarshipPrograms
      .filter((item) => item.programId === programId && item.academicYearId === academicYearId)
      .map((item) => item.scholarshipId),
  );
  if (universityId) {
    for (const link of catalog.scholarshipUniversities) {
      if (link.universityId === universityId && link.academicYearId === academicYearId) ids.add(link.scholarshipId);
    }
  }
  return catalog.scholarships.filter((item) => ids.has(item.id));
}

export function academicYears() {
  return catalog.academicYears;
}

export function examinations() {
  return catalog.examinations;
}

export function subjectsFor(examinationId: string) {
  return catalog.examinationSubjects.filter((item) => item.examinationId === examinationId);
}

export function sessionsFor(examinationId: string) {
  return catalog.examinationSessions.filter((item) => item.examinationId === examinationId);
}

export function marketplacePaths() {
  const list = [
    paths.studyAbroad,
    paths.china,
    paths.universities,
    paths.programs,
    paths.compare,
    paths.scholarships,
    paths.eligibility,
    paths.admission,
    paths.exams,
    paths.csca,
    paths.apply,
    paths.account,
    paths.partners,
    ...catalog.universities.map((item) => paths.university(item.slug)),
    ...catalog.programs.map((item) => paths.program(item.slug)),
    ...catalog.disciplines.map((item) => paths.program(item.slug)),
    ...catalog.scholarships.map((item) => paths.scholarship(item.slug)),
    ...catalog.articles.map((item) => paths.article(item.slug)),
    ...catalog.examinations.filter((item) => item.slug !== "csca").map((item) => paths.exam(item.slug)),
  ];
  return [...new Set(list)];
}
