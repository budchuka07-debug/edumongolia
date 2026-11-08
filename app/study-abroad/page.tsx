import type { Metadata } from "next";
import { StudyAbroadEntry } from "@/components/pages/marketplace-entry";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Гадаадад суралцах",
  description: "Хятадын их сургууль, хөтөлбөр, тэтгэлэг. Аялал, англи хэл, гадаад багш тусдаа хэсэгтээ.",
  path: "/study-abroad",
});

export default function Page() {
  return <StudyAbroadEntry />;
}
