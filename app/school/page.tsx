import type { Metadata } from "next";
import { SchoolCatalog } from "@/components/pages/school-catalog";
import { schoolCatalog } from "@/lib/content/school-exams";
import { priceForPage } from "@/lib/payments/pricing";

export const metadata: Metadata = {
  title: "Дунд, ахлах, Cambridge, олон улсын шалгалт",
  description: "Шалгалт бүгд төлбөртэй. Хичээлийн эхний 40% нээлттэй. Үргэлжлүүлэхэд 5,000₮.",
};

export default function Page() {
  const cards = schoolCatalog().map((card) => ({ ...card, priceMnt: priceForPage("exam") }));
  return <SchoolCatalog cards={cards} />;
}
