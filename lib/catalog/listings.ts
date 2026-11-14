import { gradeLessons } from "@/lib/content/grade-bank";
import { lessonCatalog } from "@/lib/content/lessons";
import { schoolTopics } from "@/lib/content/school-exams";
import type { SchoolBand } from "@/lib/content/school-play";
import { catalogItems, type CatalogKind } from "./items";

export type Difficulty = "easy" | "medium" | "hard";

export type BrowseCard = {
  href: string;
  title: { mn: string; en: string };
  summary: { mn: string; en: string };
  grade: string;
  grades: string[];
  subject: string;
  difficulty: Difficulty;
  priceMnt: number;
};

function gradeLevel(grade: number): Difficulty {
  if (grade <= 8) return "easy";
  if (grade <= 10) return "medium";
  return "hard";
}

function gradeSpan(text: string) {
  const numbers = [...text.matchAll(/\d+/g)].map((match) => Number(match[0])).filter((value) => value >= 1 && value <= 12);
  if (numbers.length === 0) return [];
  const start = Math.min(...numbers);
  const end = Math.max(...numbers);
  return Array.from({ length: end - start + 1 }, (_, index) => String(start + index));
}

function bandLevel(band: SchoolBand): Difficulty {
  if (band === "middle") return "easy";
  if (band === "high") return "medium";
  return "hard";
}

export function examCards(priceMnt: number): BrowseCard[] {
  const bank = gradeLessons.map((lesson) => ({
    href: `/bank/${lesson.topic.slug}`,
    title: lesson.topic.title,
    summary: lesson.topic.summary,
    grade: `${lesson.grade}-р анги`,
    grades: [String(lesson.grade)],
    subject: lesson.topic.subject,
    difficulty: gradeLevel(lesson.grade),
    priceMnt,
  }));
  const school = schoolTopics.map((topic) => ({
    href: `/school/${topic.slug}`,
    title: topic.title,
    summary: topic.summary,
    grade: topic.grades.mn,
    grades: gradeSpan(topic.grades.mn),
    subject: topic.subject,
    difficulty: bandLevel(topic.band),
    priceMnt,
  }));
  const interactive = lessonCatalog().map((lesson) => ({
    href: `/activities/${lesson.slug}`,
    title: lesson.title,
    summary: { mn: "Интерактив даалгавар. Эхний 40% нээлттэй.", en: "Interactive tasks. The first 40% is open." },
    grade: "10-р анги",
    grades: ["10"],
    subject: "chemistry",
    difficulty: "hard" as const,
    priceMnt,
  }));
  return [...bank, ...school, ...interactive];
}

export function allTestCards(prices: { exam: number; quiz: number; iq: number }): BrowseCard[] {
  return [...examCards(prices.exam), ...kindCards("quiz", prices.quiz), ...kindCards("iq", prices.iq)];
}

export function kindCards(kind: CatalogKind, priceMnt: number): BrowseCard[] {
  return catalogItems.filter((item) => item.kind === kind).map((item) => ({
    href: `/${kind === "quiz" ? "quizzes" : kind === "iq" ? "iq" : "stories"}/${item.slug}`,
    title: item.title,
    summary: item.summary,
    grade: item.grade ? `${item.grade}-р анги` : "",
    grades: item.grade ? [String(item.grade)] : [],
    subject: item.subject,
    difficulty: item.difficulty,
    priceMnt,
  }));
}
