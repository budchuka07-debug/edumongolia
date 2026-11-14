import { gradeLessons } from "@/lib/content/grade-bank";
import { schoolTopics } from "@/lib/content/school-exams";
import { catalogItems, type CatalogKind } from "./items";

export type BrowseCard = {
  href: string;
  title: { mn: string; en: string };
  summary: { mn: string; en: string };
  grade: string;
  subject: string;
  difficulty: string;
  priceMnt: number;
};

export function examCards(priceMnt: number): BrowseCard[] {
  const bank = gradeLessons.map((lesson) => ({
    href: `/bank/${lesson.topic.slug}`,
    title: lesson.topic.title,
    summary: lesson.topic.summary,
    grade: String(lesson.grade),
    subject: lesson.topic.subject,
    difficulty: "medium",
    priceMnt,
  }));
  const school = schoolTopics.map((topic) => ({
    href: `/school/${topic.slug}`,
    title: topic.title,
    summary: topic.summary,
    grade: topic.grades.mn,
    subject: topic.subject,
    difficulty: "medium",
    priceMnt,
  }));
  return [...bank, ...school];
}

export function kindCards(kind: CatalogKind, priceMnt: number): BrowseCard[] {
  return catalogItems.filter((item) => item.kind === kind).map((item) => ({
    href: `/${kind === "quiz" ? "quizzes" : kind === "iq" ? "iq" : "stories"}/${item.slug}`,
    title: item.title,
    summary: item.summary,
    grade: item.grade ? String(item.grade) : "",
    subject: item.subject,
    difficulty: item.difficulty,
    priceMnt,
  }));
}
