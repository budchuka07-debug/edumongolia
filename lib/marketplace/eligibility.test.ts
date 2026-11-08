import assert from "node:assert/strict";
import { catalog } from "./catalog";
import { id } from "./ids";
import { evaluate, matchProgram, matchScholarship, emptyStudent } from "./eligibility";
import type { LanguageRequirement, ExamRequirement, AcademicRequirement } from "./types";

const student = emptyStudent();
student.age = 19;
student.education = "high_school";
student.gpa = 3.5;
student.gpaScale = 4;
student.hskLevel = 4;
student.hskScore = 210;
student.ielts = 6.5;
student.csca.mathematics = 85;
student.budgetCny = 40000;
student.degree = "bachelor";

const results = evaluate(student, id.year2627, catalog);
assert.ok(results.length > 0);
assert.ok(results.every((result) => result.status === "potential"));
assert.ok(results.every((result) => result.scholarships.length === 0));

const csc = matchScholarship(catalog.scholarships[0], student, catalog);
assert.equal(csc.status, "potential");
assert.equal(csc.scholarship.academicYearId, id.year2627);
const later = matchScholarship(catalog.scholarships[1], student, catalog);
assert.notEqual(later.scholarship.academicYearId, csc.scholarship.academicYearId);

const data = structuredClone(catalog);
const program = data.programs[0];
const year = id.year2627;
const academic = data.academicRequirements.find(
  (item) => item.ownerType === "program" && item.ownerId === program.id && item.academicYearId === year,
) as AcademicRequirement;
academic.minAge = 18;
academic.maxAge = 25;
academic.minEducation = "high_school";
academic.minGpa = 3;
academic.gpaScale = 4;
program.annualTuitionCny = 20000;

const ielts: LanguageRequirement = {
  id: "lang-test",
  ownerType: "program",
  ownerId: program.id,
  academicYearId: year,
  examinationId: id.examIelts,
  groupId: null,
  hskLevel: null,
  minScore: 6,
  mandatory: true,
};
data.languageRequirements.push(ielts);
const math: ExamRequirement = {
  id: "exam-test",
  ownerType: "program",
  ownerId: program.id,
  academicYearId: year,
  subjectId: "70000000-0000-4000-8000-000000000062",
  minScore: 60,
  mandatory: true,
};
data.examRequirements.push(math);

const fit = matchProgram(program, student, year, data);
assert.equal(fit.status, "eligible", JSON.stringify(fit.checks, null, 2));

const young = { ...student, age: 17 };
assert.equal(matchProgram(program, young, year, data).status, "ineligible");

const missingIelts = { ...student, ielts: null };
assert.equal(matchProgram(program, missingIelts, year, data).status, "potential");

ielts.mandatory = false;
const optionalMiss = matchProgram(program, missingIelts, year, data);
assert.equal(optionalMiss.status, "eligible");
assert.ok(optionalMiss.checks.some((check) => check.code.startsWith("language") && check.verdict === "skipped"));

ielts.mandatory = true;
const oddScale = { ...student, gpa: 80, gpaScale: 7 };
assert.equal(matchProgram(program, oddScale, year, data).status, "potential");

const nextYear = matchProgram(program, young, id.year2728, data);
assert.equal(nextYear.status, "potential");
assert.ok(nextYear.checks.every((check) => check.verdict !== "fail"));

console.log("eligibility tests passed");
