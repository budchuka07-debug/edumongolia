import type { Metadata } from "next";
import { GradeCatalog } from "@/components/pages/grade-catalog";

export const metadata: Metadata = {
  title: "8–12-р ангийн шалгалтын сан",
  description: "Анги, хичээл бүрээр тусдаа шалгалт. Эхний 40% нээлттэй. Үргэлжлүүлэхэд 5,000₮.",
};

export default function Page() {
  return <GradeCatalog />;
}
