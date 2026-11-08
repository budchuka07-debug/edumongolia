import type { Metadata } from "next";
import { GuideIndex } from "@/components/marketplace/guides";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Элсэлтийн нөхцөл",
  description: "Элсэлтийн тайлбар. Шалгалтын нэр тусдаа хуудсанд. Элсэлт амлахгүй.",
  path: "/admission-requirements",
});

export default function Page() {
  return <GuideIndex show="articles" />;
}
