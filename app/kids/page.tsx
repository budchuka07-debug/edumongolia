import type { Metadata } from "next";
import { KidsPage } from "@/components/pages/kids-page";

export const metadata: Metadata = {
  title: "Хүүхдийн тест",
  description: "Хүүхдэд хэрэгтэй асуулт, ЭЕШ-ийн жишээ, мини олимпиад. Туршилт бүрт асуултын сангаас өөр багц гарна. Багш Google Form-оо энд холбоно.",
};

export default function Page() {
  return <KidsPage />;
}
