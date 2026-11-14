import type { Metadata } from "next";
import { SchoolCatalog } from "@/components/pages/school-catalog";
import { lessonCatalog } from "@/lib/content/lessons";
import { schoolCatalog } from "@/lib/content/school-exams";
import { chargedPrice } from "@/lib/catalog/charge";

export const metadata: Metadata = {
  title: "Дунд, ахлах, Cambridge, олон улсын шалгалт",
  description: "Шалгалт бүгд төлбөртэй. Хичээлийн эхний 40% нээлттэй. Үргэлжлүүлэхэд 5,000₮.",
};

export default function Page() {
  const cards = [
    ...schoolCatalog().map((card) => ({ ...card, priceMnt: chargedPrice("exam") })),
    ...lessonCatalog().map((lesson) => ({
      slug: lesson.slug,
      band: "cambridge" as const,
      subject: "chemistry",
      grades: { mn: "10-р анги", en: "Grade 10" },
      title: lesson.title,
      summary: {
        mn: "Эхний 40% нээлттэй. Үргэлжлүүлэхэд интерактив даалгавар татагдана.",
        en: "The first 40% is open. Continuing loads the interactive tasks.",
      },
      questionCount: lesson.slug === "cambridge-balance-equation" ? 3 : 10,
      perAttempt: lesson.slug === "cambridge-balance-equation" ? 3 : 10,
      priceMnt: chargedPrice("lesson"),
      href: `/activities/${lesson.slug}`,
    })),
  ];
  return <SchoolCatalog cards={cards} />;
}
