import type { Metadata } from "next";
import { GuideIndex } from "@/components/marketplace/guides";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Элсэлтийн тайлбар",
  description: "CSCA, тэтгэлгийн ялгаа, элсэлтийн шалгуур хэрхэн уншигдах тухай.",
  path: "/admission-guide",
});

export default function Page() {
  return <GuideIndex />;
}
