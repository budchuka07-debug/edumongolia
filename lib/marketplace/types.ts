/** Хятадын боловсролын захад хэрэглэх өгөгдлийн төрөл. Supabase-д холбоогүй. */

export type LocaleCode = "mn" | "en" | "zh";

export type Localized = Record<LocaleCode, string>;

export type VerificationStatus = "verified" | "pending" | "expired" | "needs_update";

export type SourceType =
  | "official_university"
  | "csc"
  | "embassy"
  | "csca"
  | "scholarship_notice"
  | "government_portal"
  | "exam_body"
  | "platform_note";

export type DegreeLevel = "bachelor" | "master" | "phd" | "non_degree";

export type UniversityType = "public" | "private";

export type InstructionLanguage = "zh" | "en" | "both";

export type EducationLevel = "middle" | "high_school" | "bachelor" | "master" | "doctor";

export type ScholarshipCategory =
  | "csc"
  | "university"
  | "provincial"
  | "municipal"
  | "silk_road"
  | "belt_road"
  | "confucius"
  | "full"
  | "partial"
  | "tuition_waiver";

export type Coverage = "full" | "partial" | "waiver" | "none";

export type MatchStatus = "eligible" | "potential" | "ineligible";

export type CheckVerdict = "pass" | "fail" | "unspecified" | "skipped";

export type Country = {
  id: string;
  code: string;
  name: Localized;
};

export type Province = {
  id: string;
  countryId: string;
  name: Localized;
};

export type City = {
  id: string;
  provinceId: string;
  name: Localized;
};

export type AcademicYear = {
  id: string;
  label: string;
  startsOn: string;
  endsOn: string;
};

export type SourceReference = {
  id: string;
  title: Localized;
  url: string;
  sourceType: SourceType;
  academicYearId: string | null;
  verifiedOn: string | null;
  updatedOn: string;
  status: VerificationStatus;
  note: Localized | null;
};

export type University = {
  id: string;
  slug: string;
  name: Localized;
  countryId: string;
  provinceId: string;
  cityId: string;
  address: Localized | null;
  type: UniversityType | null;
  foundedYear: number | null;
  introduction: Localized;
  website: string | null;
  internationalWebsite: string | null;
  email: string | null;
  phone: string | null;
  logoUrl: string | null;
  campusImageUrls: string[];
  demonstration: boolean;
  sourceId: string;
};

export type Discipline = {
  id: string;
  slug: string;
  name: Localized;
};

export type Program = {
  id: string;
  slug: string;
  universityId: string;
  disciplineId: string;
  facultyName: Localized | null;
  name: Localized;
  degree: DegreeLevel;
  instructionLanguage: InstructionLanguage;
  durationYears: number | null;
  annualTuitionCny: number | null;
  applicationFeeCny: number | null;
  annualAccommodationCny: number | null;
  intake: Localized | null;
  officialUrl: string | null;
  demonstration: boolean;
  sourceId: string;
};

export type AcademicRequirement = {
  id: string;
  ownerType: "program" | "scholarship";
  ownerId: string;
  academicYearId: string;
  minAge: number | null;
  maxAge: number | null;
  minEducation: EducationLevel | null;
  minGpa: number | null;
  gpaScale: number | null;
  qualificationNotes: Localized | null;
};

export type LanguageRequirement = {
  id: string;
  ownerType: "program" | "scholarship";
  ownerId: string;
  academicYearId: string;
  examinationId: string;
  /** Нэг groupId доторх шалгалтаас нэгийг хангахад болно. */
  groupId: string | null;
  hskLevel: number | null;
  minScore: number | null;
  mandatory: boolean;
};

export type ExamRequirement = {
  id: string;
  ownerType: "program" | "scholarship" | "university";
  ownerId: string;
  academicYearId: string;
  subjectId: string;
  minScore: number | null;
  mandatory: boolean;
};

export type Scholarship = {
  id: string;
  slug: string;
  name: Localized;
  categories: ScholarshipCategory[];
  countryId: string;
  academicYearId: string;
  degreeLevels: DegreeLevel[];
  /** null бол иргэншлийн хүрээ нийтлэгдээгүй. Хоосон массив бол хэнд ч нээлттэй гэсэн үг биш. */
  eligibleNationalities: string[] | null;
  officialUrl: string | null;
  procedure: Localized | null;
  demonstration: boolean;
  sourceId: string;
};

export type ScholarshipBenefit = {
  id: string;
  scholarshipId: string;
  academicYearId: string;
  tuitionCoverage: Coverage | null;
  accommodationCoverage: Coverage | null;
  monthlyStipendCny: number | null;
  medicalInsurance: boolean | null;
  applicationFeeCny: number | null;
};

export type ScholarshipDeadline = {
  id: string;
  scholarshipId: string;
  academicYearId: string;
  opensOn: string | null;
  closesOn: string | null;
};

export type ScholarshipUniversity = {
  scholarshipId: string;
  universityId: string;
  academicYearId: string;
};

export type ScholarshipProgram = {
  scholarshipId: string;
  programId: string;
  academicYearId: string;
};

export type Examination = {
  id: string;
  slug: string;
  name: Localized;
  family: "chinese" | "english" | "csca" | "other";
  officialUrl: string | null;
  scoreValidity: Localized | null;
  sourceId: string;
};

export type ExaminationSubject = {
  id: string;
  examinationId: string;
  slug: string;
  name: Localized;
  category: string;
  testLanguage: Localized | null;
  maximumScore: number | null;
  /** Шалгалт өөрийн тэнцэх оноо. Их сургуулийн доод оноо биш. */
  examPassScore: number | null;
};

export type ExaminationSession = {
  id: string;
  examinationId: string;
  academicYearId: string | null;
  startsOn: string;
  endsOn: string;
  registrationOpensOn: string | null;
  registrationClosesOn: string | null;
  note: Localized | null;
  sourceId: string;
};

export type Article = {
  slug: string;
  title: Localized;
  description: Localized;
  updatedOn: string;
  paragraphs: Record<"mn" | "en", string[]>;
};

export type StudentInput = {
  age: number | null;
  nationality: string;
  education: EducationLevel | "";
  graduationYear: number | null;
  gpa: number | null;
  gpaScale: number | null;
  hskLevel: number | null;
  hskScore: number | null;
  ielts: number | null;
  toefl: number | null;
  duolingo: number | null;
  csca: Record<string, number | null>;
  studyLanguage: InstructionLanguage | "any";
  degree: DegreeLevel | "any";
  disciplineSlug: string;
  budgetCny: number | null;
  cityId: string;
};

export type Check = {
  code: string;
  verdict: CheckVerdict;
  title: Localized;
  detail: Localized;
};

export type ScholarshipMatch = {
  scholarship: Scholarship;
  status: MatchStatus;
  checks: Check[];
};

export type ProgramMatch = {
  program: Program;
  university: University;
  academicYearId: string;
  status: MatchStatus;
  checks: Check[];
  scholarships: ScholarshipMatch[];
};
