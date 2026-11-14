import { lessonFile, lessonPreview } from "@/lib/content/lessons";
import { projectBriefs } from "@/lib/content/project-briefs";
import { getSchoolTopic } from "@/lib/content/school-exams";
import type { SchoolQuestion, SchoolTopic } from "@/lib/content/school-play";
import { papers, type Paper } from "@/lib/content/papers";
import { splitBilingual, type Bilingual } from "./preview";
import { priceForPage, productKey, type PaidPage } from "./pricing";
import { findEntitlement } from "./store";
import { findTeacherForm, openTeacherForm } from "./teacher-forms-store";
import fs from "node:fs";

export type Reading = {
  kind: PaidPage;
  id: string;
  priceMnt: number;
  title: Bilingual;
  preview: Bilingual;
  rest: Bilingual | null;
  questions: SchoolQuestion[] | null;
  perAttempt: number;
  paid: boolean;
  embedUrl: string | null;
  html: string | null;
};

function entitled(readerId: string | null, kind: PaidPage, id: string) {
  if (!readerId) return false;
  return Boolean(findEntitlement(readerId, productKey(kind, id)));
}

export function presentExam(topic: SchoolTopic, readerId: string | null): Reading {
  const parts = splitBilingual(topic.lesson);
  const paid = entitled(readerId, "exam", topic.slug);
  return {
    kind: "exam",
    id: topic.slug,
    priceMnt: priceForPage("exam"),
    title: topic.title,
    preview: parts.preview,
    rest: paid ? parts.rest : null,
    questions: paid ? topic.questions : null,
    perAttempt: topic.perAttempt,
    paid,
    embedUrl: null,
    html: null,
  };
}

export function examReading(slug: string, readerId: string | null) {
  const topic = getSchoolTopic(slug);
  if (!topic || topic.custom) return null;
  return presentExam(topic, readerId);
}

export function projectPaper(id: string) {
  return papers.find((paper) => paper.id === id && paper.kind === "project") ?? null;
}

export function presentProject(paper: Paper, readerId: string | null): Reading {
  const brief = projectBriefs[paper.id] ?? [paper.summary];
  const parts = splitBilingual(brief);
  const paid = entitled(readerId, "project", paper.id);
  return {
    kind: "project",
    id: paper.id,
    priceMnt: priceForPage("project"),
    title: paper.title,
    preview: parts.preview,
    rest: paid ? parts.rest : null,
    questions: null,
    perAttempt: 0,
    paid,
    embedUrl: null,
    html: null,
  };
}

export function projectReading(id: string, readerId: string | null) {
  const paper = projectPaper(id);
  if (!paper) return null;
  return presentProject(paper, readerId);
}

export function formReading(id: string, readerId: string | null): Reading | null {
  const form = findTeacherForm(id);
  if (!form) return null;
  const opened = openTeacherForm(form, entitled(readerId, "form", id));
  return {
    kind: "form",
    id: form.id,
    priceMnt: opened.priceMnt,
    title: { mn: form.title, en: form.title },
    preview: { mn: form.teacher, en: form.teacher },
    rest: opened.embedUrl ? { mn: "Форм нээгдлээ.", en: "The form is open." } : null,
    questions: null,
    perAttempt: 0,
    paid: Boolean(opened.embedUrl),
    embedUrl: opened.embedUrl,
    html: null,
  };
}

export function lessonReading(id: string, readerId: string | null): Reading | null {
  const lesson = lessonPreview(id);
  if (!lesson) return null;
  const paid = entitled(readerId, "lesson", id);
  const file = lessonFile(id);
  return {
    kind: "lesson",
    id,
    priceMnt: priceForPage("lesson"),
    title: lesson.title,
    preview: lesson.preview,
    rest: paid ? lesson.rest : null,
    questions: null,
    perAttempt: 0,
    paid,
    embedUrl: null,
    html: paid && file ? fs.readFileSync(file, "utf8") : null,
  };
}

export function readingFor(kind: PaidPage, id: string, readerId: string | null) {
  if (kind === "exam") return examReading(id, readerId);
  if (kind === "project") return projectReading(id, readerId);
  if (kind === "form") return formReading(id, readerId);
  return lessonReading(id, readerId);
}

export function paidPayload(reading: Reading) {
  if (!reading.paid) return null;
  return {
    rest: reading.rest,
    questions: reading.questions,
    perAttempt: reading.perAttempt,
    embedUrl: reading.embedUrl,
    html: reading.html,
  };
}

