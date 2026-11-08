import { L } from "@/lib/marketplace/text";
import type { MarketplaceCatalog as Data } from "@/lib/marketplace/catalog";
import type {
  AcademicRequirement,
  Check,
  EducationLevel,
  ExamRequirement,
  ExaminationSubject,
  LanguageRequirement,
  MatchStatus,
  Program,
  ProgramMatch,
  Scholarship,
  ScholarshipMatch,
  StudentInput,
} from "@/lib/marketplace/types";

const educationRank: Record<EducationLevel, number> = {
  middle: 1,
  high_school: 2,
  bachelor: 3,
  master: 4,
  doctor: 5,
};

const educationLabel: Record<EducationLevel, ReturnType<typeof L>> = {
  middle: L("Суурь боловсрол", "Lower secondary", "初中"),
  high_school: L("Бүрэн дунд", "High school", "高中"),
  bachelor: L("Бакалавр", "Bachelor's", "学士"),
  master: L("Магистр", "Master's", "硕士"),
  doctor: L("Доктор", "Doctorate", "博士"),
};

function statusOf(checks: Check[]): MatchStatus {
  if (checks.some((check) => check.verdict === "fail")) return "ineligible";
  if (checks.some((check) => check.verdict === "unspecified")) return "potential";
  return "eligible";
}

function gpaPercent(value: number | null, scale: number | null): number | null {
  if (value == null || scale == null || scale <= 0 || value < 0) return null;
  if (scale !== 4 && scale !== 5 && scale !== 10 && scale !== 100) return null;
  if (value > scale) return null;
  return (value / scale) * 100;
}

function studentExamScore(examinationId: string, student: StudentInput, data: Data): number | null {
  const exam = data.examinations.find((item) => item.id === examinationId);
  if (!exam) return null;
  if (exam.slug === "hsk") return student.hskScore;
  if (exam.slug === "ielts-academic") return student.ielts;
  if (exam.slug === "toefl-ibt") return student.toefl;
  if (exam.slug === "duolingo-english-test") return student.duolingo;
  return null;
}

function academicChecks(
  requirement: AcademicRequirement | null,
  student: StudentInput,
  yearLabel: string,
): Check[] {
  const checks: Check[] = [];
  const ageMissing = requirement == null || (requirement.minAge == null && requirement.maxAge == null);
  if (ageMissing) {
    checks.push({
      code: "age",
      verdict: "unspecified",
      title: L("Нас", "Age", "年龄"),
      detail: L(
        `${yearLabel} онд насыг албан ёсоор тодорхойлоогүй.`,
        `Age is not officially specified for ${yearLabel}.`,
        `${yearLabel} 未公布年龄要求。`,
      ),
    });
  } else if (student.age == null) {
    checks.push({
      code: "age",
      verdict: "unspecified",
      title: L("Нас", "Age", "年龄"),
      detail: L("Насаа оруулна уу.", "Enter an age.", "请填写年龄。"),
    });
  } else if (
    (requirement.minAge != null && student.age < requirement.minAge) ||
    (requirement.maxAge != null && student.age > requirement.maxAge)
  ) {
    checks.push({
      code: "age",
      verdict: "fail",
      title: L("Нас", "Age", "年龄"),
      detail: L(
        `Нийтлэгдсэн хязгаар ${requirement.minAge ?? "—"}–${requirement.maxAge ?? "—"}. Оруулсан нас ${student.age}.`,
        `Published range ${requirement.minAge ?? "—"}–${requirement.maxAge ?? "—"}. Entered age ${student.age}.`,
        `公布范围为 ${requirement.minAge ?? "—"}–${requirement.maxAge ?? "—"}。填写年龄 ${student.age}。`,
      ),
    });
  } else {
    checks.push({
      code: "age",
      verdict: "pass",
      title: L("Нас", "Age", "年龄"),
      detail: L(
        `Нийтлэгдсэн хязгаарт багтаж байна (${student.age}).`,
        `Within the published range (${student.age}).`,
        `在公布范围内（${student.age}）。`,
      ),
    });
  }

  if (requirement?.minEducation == null) {
    checks.push({
      code: "education",
      verdict: "unspecified",
      title: L("Боловсрол", "Education", "学历"),
      detail: L(
        `${yearLabel} онд боловсролын доод түвшинг тодорхойлоогүй.`,
        `A minimum education level is not specified for ${yearLabel}.`,
        `${yearLabel} 未公布最低学历。`,
      ),
    });
  } else if (!student.education) {
    checks.push({
      code: "education",
      verdict: "unspecified",
      title: L("Боловсрол", "Education", "学历"),
      detail: L("Боловсролын түвшингээ сонгоно уу.", "Choose an education level.", "请选择学历。"),
    });
  } else if (educationRank[student.education] < educationRank[requirement.minEducation]) {
    checks.push({
      code: "education",
      verdict: "fail",
      title: L("Боловсрол", "Education", "学历"),
      detail: L(
        `Нийтлэгдсэн доод түвшин: ${educationLabel[requirement.minEducation].mn}.`,
        `Published minimum: ${educationLabel[requirement.minEducation].en}.`,
        `公布的最低学历：${educationLabel[requirement.minEducation].zh}.`,
      ),
    });
  } else {
    checks.push({
      code: "education",
      verdict: "pass",
      title: L("Боловсрол", "Education", "学历"),
      detail: L(
        "Нийтлэгдсэн боловсролын түвшинд хүрсэн.",
        "Meets the published education level.",
        "达到公布的学历。",
      ),
    });
  }

  if (requirement?.minGpa == null || requirement.gpaScale == null) {
    checks.push({
      code: "gpa",
      verdict: "unspecified",
      title: L("Голч", "GPA", "绩点"),
      detail: L(
        `${yearLabel} онд голчийн доод хэмжээг тодорхойлоогүй.`,
        `A minimum GPA is not specified for ${yearLabel}.`,
        `${yearLabel} 未公布最低绩点。`,
      ),
    });
  } else if (student.gpa == null || student.gpaScale == null) {
    checks.push({
      code: "gpa",
      verdict: "unspecified",
      title: L("Голч", "GPA", "绩点"),
      detail: L("Голч болон хэмжүүрээ оруулна уу.", "Enter a GPA and its scale.", "请填写绩点和分制。"),
    });
  } else {
    const studentPercent = gpaPercent(student.gpa, student.gpaScale);
    const requiredPercent = gpaPercent(requirement.minGpa, requirement.gpaScale);
    if (studentPercent == null || requiredPercent == null) {
      checks.push({
        code: "gpa",
        verdict: "unspecified",
        title: L("Голч", "GPA", "绩点"),
        detail: L(
          "Голчийн хэмжүүр 4, 5, 10, 100 биш тул харьцуулсангүй.",
          "The GPA scale is not 4, 5, 10, or 100, so it was not compared.",
          "绩点分制不是 4、5、10 或 100，因此未比较。",
        ),
      });
    } else if (studentPercent + 1e-9 < requiredPercent) {
      checks.push({
        code: "gpa",
        verdict: "fail",
        title: L("Голч", "GPA", "绩点"),
        detail: L(
          `Нийтлэгдсэн доод голч ${requirement.minGpa}/${requirement.gpaScale}. Оруулсан ${student.gpa}/${student.gpaScale}.`,
          `Published minimum ${requirement.minGpa}/${requirement.gpaScale}. Entered ${student.gpa}/${student.gpaScale}.`,
          `公布最低 ${requirement.minGpa}/${requirement.gpaScale}。填写 ${student.gpa}/${student.gpaScale}。`,
        ),
      });
    } else {
      checks.push({
        code: "gpa",
        verdict: "pass",
        title: L("Голч", "GPA", "绩点"),
        detail: L(
          "Нийтлэгдсэн голчид хүрч байна.",
          "Meets the published GPA.",
          "达到公布的绩点。",
        ),
      });
    }
  }

  return checks;
}

function languageChecks(
  requirements: LanguageRequirement[],
  student: StudentInput,
  data: Data,
  yearLabel: string,
): Check[] {
  if (requirements.length === 0) {
    return [
      {
        code: "language",
        verdict: "unspecified",
        title: L("Хэлний шалгалт", "Language tests", "语言考试"),
        detail: L(
          `${yearLabel} онд HSK, IELTS, TOEFL эсвэл өөр хэлний доод оноо нийтлэгдээгүй. Заавал гэж үзэхгүй.`,
          `No HSK, IELTS, TOEFL, or other language minimum is published for ${yearLabel}. It is not treated as mandatory.`,
          `${yearLabel} 未公布 HSK、雅思、托福或其他语言最低分。不视为必修。`,
        ),
      },
    ];
  }

  const groups = new Map<string, LanguageRequirement[]>();
  requirements.forEach((requirement, index) => {
    const key = requirement.groupId ?? requirement.id ?? String(index);
    groups.set(key, [...(groups.get(key) ?? []), requirement]);
  });

  return [...groups.entries()].map(([key, items]) => {
    const mandatory = items.some((item) => item.mandatory);
    const itemResults = items.map((item) => {
      if (item.minScore == null && item.hskLevel == null) return "unpublished" as const;
      let failed = false;
      let unknown = false;
      if (item.hskLevel != null) {
        if (student.hskLevel == null) unknown = true;
        else if (student.hskLevel < item.hskLevel) failed = true;
      }
      if (item.minScore != null) {
        const score = studentExamScore(item.examinationId, student, data);
        if (score == null) unknown = true;
        else if (score < item.minScore) failed = true;
      }
      if (failed) return "fail" as const;
      if (unknown) return "unknown" as const;
      return "pass" as const;
    });

    const names = items
      .map((item) => data.examinations.find((exam) => exam.id === item.examinationId)?.slug ?? item.examinationId)
      .join(", ");

    if (itemResults.includes("pass")) {
      return {
        code: `language-${key}`,
        verdict: "pass" as const,
        title: L("Хэлний шалгалт", "Language tests", "语言考试"),
        detail: L(
          `${names}: нийтлэгдсэн нөхцөлийн нэгийг хангасан.`,
          `${names}: one published option is met.`,
          `${names}：已满足一项公布条件。`,
        ),
      };
    }
    if (!mandatory) {
      return {
        code: `language-${key}`,
        verdict: "skipped" as const,
        title: L("Сонголтот хэлний шалгалт", "Optional language test", "可选语言考试"),
        detail: L(
          `${names} сонголтот. Өгөөгүй эсвэл оноо хүрээгүй нь энэ шалгуураар унагаахгүй.`,
          `${names} is optional. Missing it or scoring below the line does not fail this check.`,
          `${names} 为可选。未考或未达分数线不会因此不合格。`,
        ),
      };
    }
    if (itemResults.every((result) => result === "fail")) {
      return {
        code: `language-${key}`,
        verdict: "fail" as const,
        title: L("Хэлний шалгалт", "Language tests", "语言考试"),
        detail: L(
          `${names}: нийтлэгдсэн доод оноонд хүрээгүй.`,
          `${names}: below the published minimum.`,
          `${names}：未达到公布的最低分。`,
        ),
      };
    }
    return {
      code: `language-${key}`,
      verdict: "unspecified" as const,
      title: L("Хэлний шалгалт", "Language tests", "语言考试"),
      detail: L(
        `${names}: оноо нийтлэгдээгүй, эсвэл сурагч оноогоо оруулаагүй.`,
        `${names}: the score is unpublished, or the student did not enter it.`,
        `${names}：分数未公布，或申请人未填写。`,
      ),
    };
  });
}

function cscaChecks(
  requirements: ExamRequirement[],
  subjects: ExaminationSubject[],
  student: StudentInput,
  yearLabel: string,
): Check[] {
  if (requirements.length === 0) {
    return [
      {
        code: "csca",
        verdict: "unspecified",
        title: L("CSCA", "CSCA", "CSCA"),
        detail: L(
          `${yearLabel} онд CSCA-ийн заавал өгөх хичээл, доод оноо нийтлэгдээгүй. Заавал гэж үзэхгүй.`,
          `No required CSCA subject or minimum is published for ${yearLabel}. It is not treated as mandatory.`,
          `${yearLabel} 未公布必考 CSCA 科目或最低分。不视为必修。`,
        ),
      },
    ];
  }

  return requirements.map((requirement) => {
    const subject = subjects.find((item) => item.id === requirement.subjectId);
    const name = subject?.name ?? L(requirement.subjectId, requirement.subjectId, requirement.subjectId);
    const score = subject ? (student.csca[subject.slug] ?? null) : null;
    if (!requirement.mandatory) {
      return {
        code: `csca-${requirement.id}`,
        verdict: "skipped" as const,
        title: name,
        detail: L(
          "Энэ хичээл сонголтот. Өгөөгүй нь унагаахгүй.",
          "This subject is optional. Skipping it does not fail the check.",
          "该科目为可选。未考不会因此不合格。",
        ),
      };
    }
    if (requirement.minScore == null) {
      return {
        code: `csca-${requirement.id}`,
        verdict: "unspecified" as const,
        title: name,
        detail: L(
          "Хичээлийг заасан ч доод оноог тодорхойлоогүй.",
          "The subject is listed, but no minimum score is specified.",
          "列出了科目，但未规定最低分。",
        ),
      };
    }
    if (score == null) {
      return {
        code: `csca-${requirement.id}`,
        verdict: "unspecified" as const,
        title: name,
        detail: L("Оноогоо оруулна уу.", "Enter the score.", "请填写分数。"),
      };
    }
    if (score < requirement.minScore) {
      return {
        code: `csca-${requirement.id}`,
        verdict: "fail" as const,
        title: name,
        detail: L(
          `Нийтлэгдсэн доод оноо ${requirement.minScore}. Оруулсан ${score}.`,
          `Published minimum ${requirement.minScore}. Entered ${score}.`,
          `公布最低分 ${requirement.minScore}。填写 ${score}。`,
        ),
      };
    }
    return {
      code: `csca-${requirement.id}`,
      verdict: "pass" as const,
      title: name,
      detail: L("Нийтлэгдсэн оноонд хүрсэн.", "Meets the published score.", "达到公布分数。"),
    };
  });
}

function tuitionCheck(program: Program, student: StudentInput): Check {
  if (program.annualTuitionCny == null) {
    return {
      code: "tuition",
      verdict: "unspecified",
      title: L("Жилийн төлбөр", "Annual tuition", "年学费"),
      detail: L(
        "Их сургууль тодорхойлоогүй. Төсвөөс хассан гэж үзэхгүй.",
        "Not specified by the university. Budget is not used to reject it.",
        "学校未公布。不会因此按预算淘汰。",
      ),
    };
  }
  if (student.budgetCny == null) {
    return {
      code: "tuition",
      verdict: "unspecified",
      title: L("Жилийн төлбөр", "Annual tuition", "年学费"),
      detail: L(
        `Нийтлэгдсэн төлбөр ${program.annualTuitionCny} юань. Жилийн төсвөө оруулна уу.`,
        `Published tuition is ${program.annualTuitionCny} CNY. Enter an annual budget.`,
        `公布学费 ${program.annualTuitionCny} 元。请填写年度预算。`,
      ),
    };
  }
  if (student.budgetCny < program.annualTuitionCny) {
    return {
      code: "tuition",
      verdict: "fail",
      title: L("Жилийн төлбөр", "Annual tuition", "年学费"),
      detail: L(
        `Төлбөр ${program.annualTuitionCny} юань, төсөв ${student.budgetCny} юань.`,
        `Tuition is ${program.annualTuitionCny} CNY and the budget is ${student.budgetCny} CNY.`,
        `学费 ${program.annualTuitionCny} 元，预算 ${student.budgetCny} 元。`,
      ),
    };
  }
  return {
    code: "tuition",
    verdict: "pass",
    title: L("Жилийн төлбөр", "Annual tuition", "年学费"),
    detail: L(
      "Нийтлэгдсэн төлбөр төсөвт багтаж байна. Энэ нь элсэлт биш.",
      "Published tuition fits the budget. This is not an offer.",
      "公布学费在预算内。这不是录取。",
    ),
  };
}

export function preferenceMatch(program: Program, university: { cityId: string }, student: StudentInput, data: Data): boolean {
  if (student.degree !== "any" && program.degree !== student.degree) return false;
  if (student.cityId && university.cityId !== student.cityId) return false;
  if (student.studyLanguage !== "any" && program.instructionLanguage !== "both" && program.instructionLanguage !== student.studyLanguage) {
    return false;
  }
  if (student.disciplineSlug) {
    const discipline = data.disciplines.find((item) => item.id === program.disciplineId);
    if (discipline?.slug !== student.disciplineSlug) return false;
  }
  return true;
}

export function matchScholarship(
  scholarship: Scholarship,
  student: StudentInput,
  data: Data,
): ScholarshipMatch {
  const year = data.academicYears.find((item) => item.id === scholarship.academicYearId);
  const yearLabel = year?.label ?? scholarship.academicYearId;
  const academic = data.academicRequirements.find(
    (item) =>
      item.ownerType === "scholarship" &&
      item.ownerId === scholarship.id &&
      item.academicYearId === scholarship.academicYearId,
  );
  const checks = academicChecks(academic ?? null, student, yearLabel);
  if (scholarship.eligibleNationalities == null) {
    checks.push({
      code: "nationality",
      verdict: "unspecified",
      title: L("Иргэншил", "Nationality", "国籍"),
      detail: L(
        `${yearLabel} онд хамрагдах иргэншил нийтлэгдээгүй.`,
        `Eligible nationalities are not published for ${yearLabel}.`,
        `${yearLabel} 未公布可申请国籍。`,
      ),
    });
  } else if (!student.nationality) {
    checks.push({
      code: "nationality",
      verdict: "unspecified",
      title: L("Иргэншил", "Nationality", "国籍"),
      detail: L("Иргэншлээ оруулна уу.", "Enter a nationality.", "请填写国籍。"),
    });
  } else if (!scholarship.eligibleNationalities.includes(student.nationality)) {
    checks.push({
      code: "nationality",
      verdict: "fail",
      title: L("Иргэншил", "Nationality", "国籍"),
      detail: L(
        "Нийтлэгдсэн иргэншлийн жагсаалтад байхгүй.",
        "Not on the published nationality list.",
        "不在公布的国籍名单中。",
      ),
    });
  } else {
    checks.push({
      code: "nationality",
      verdict: "pass",
      title: L("Иргэншил", "Nationality", "国籍"),
      detail: L("Нийтлэгдсэн иргэншилд багтсан.", "Included in the published nationalities.", "在公布国籍范围内。"),
    });
  }

  if (student.degree !== "any" && !scholarship.degreeLevels.includes(student.degree)) {
    checks.push({
      code: "degree",
      verdict: "fail",
      title: L("Зэрэг", "Degree", "学位"),
      detail: L(
        "Энэ тэтгэлэг тухайн зэргийг нийтлээгүй.",
        "This scholarship does not list that degree.",
        "该奖学金未列出该学位层次。",
      ),
    });
  }

  const languages = data.languageRequirements.filter(
    (item) =>
      item.ownerType === "scholarship" &&
      item.ownerId === scholarship.id &&
      item.academicYearId === scholarship.academicYearId,
  );
  checks.push(...languageChecks(languages, student, data, yearLabel));
  const exams = data.examRequirements.filter(
    (item) =>
      item.ownerType === "scholarship" &&
      item.ownerId === scholarship.id &&
      item.academicYearId === scholarship.academicYearId,
  );
  checks.push(...cscaChecks(exams, data.examinationSubjects, student, yearLabel));

  return { scholarship, status: statusOf(checks), checks };
}

export function matchProgram(program: Program, student: StudentInput, academicYearId: string, data: Data): ProgramMatch {
  const university = data.universities.find((item) => item.id === program.universityId);
  if (!university) {
    throw new Error(`University missing for program ${program.id}`);
  }
  const year = data.academicYears.find((item) => item.id === academicYearId);
  const yearLabel = year?.label ?? academicYearId;
  const academic =
    data.academicRequirements.find(
      (item) => item.ownerType === "program" && item.ownerId === program.id && item.academicYearId === academicYearId,
    ) ?? null;
  const checks = [
    ...academicChecks(academic, student, yearLabel),
    ...languageChecks(
      data.languageRequirements.filter(
        (item) => item.ownerType === "program" && item.ownerId === program.id && item.academicYearId === academicYearId,
      ),
      student,
      data,
      yearLabel,
    ),
    ...cscaChecks(
      data.examRequirements.filter(
        (item) => item.ownerType === "program" && item.ownerId === program.id && item.academicYearId === academicYearId,
      ),
      data.examinationSubjects,
      student,
      yearLabel,
    ),
    tuitionCheck(program, student),
  ];

  const linkedIds = new Set(
    data.scholarshipPrograms
      .filter((link) => link.programId === program.id && link.academicYearId === academicYearId)
      .map((link) => link.scholarshipId),
  );
  for (const link of data.scholarshipUniversities) {
    if (link.universityId === university.id && link.academicYearId === academicYearId) {
      linkedIds.add(link.scholarshipId);
    }
  }
  const scholarships = data.scholarships
    .filter((scholarship) => linkedIds.has(scholarship.id) && scholarship.academicYearId === academicYearId)
    .map((scholarship) => matchScholarship(scholarship, student, data));

  return {
    program,
    university,
    academicYearId,
    status: statusOf(checks),
    checks,
    scholarships,
  };
}

export function evaluate(student: StudentInput, academicYearId: string, data: Data): ProgramMatch[] {
  return data.programs
    .filter((program) => {
      const university = data.universities.find((item) => item.id === program.universityId);
      return university ? preferenceMatch(program, university, student, data) : false;
    })
    .map((program) => matchProgram(program, student, academicYearId, data));
}

export function emptyStudent(): StudentInput {
  return {
    age: null,
    nationality: "MN",
    education: "",
    graduationYear: null,
    gpa: null,
    gpaScale: 4,
    hskLevel: null,
    hskScore: null,
    ielts: null,
    toefl: null,
    duolingo: null,
    csca: {
      "professional-chinese": null,
      mathematics: null,
      physics: null,
      chemistry: null,
    },
    studyLanguage: "any",
    degree: "any",
    disciplineSlug: "",
    budgetCny: null,
    cityId: "",
  };
}

