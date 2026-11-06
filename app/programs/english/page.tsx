import type { Metadata } from "next";
import { EnglishImmersion } from "@/components/pages/english-immersion";

export const metadata: Metadata = {
  title: "Англи хэлний вакуум аялал",
  description:
    "Хөвсгөл, Тэрэлж, Цонжин болдог. 100% англи хичээл болон морь унах хичээл. Жижиг бүлэг малчин айлд байрлана.",
};

export default function Page() {
  return <EnglishImmersion />;
}
