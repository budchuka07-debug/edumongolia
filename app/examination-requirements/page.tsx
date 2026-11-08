import type { Metadata } from "next";
import { GuideIndex } from "@/components/marketplace/guides";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Шалгалтын нөхцөл",
  description: "HSK, HSKK, IELTS, TOEFL, CSCA. Их сургууль бүрийн доод оноог зохиогоогүй.",
  path: "/examination-requirements",
});

export default function Page() {
  return <GuideIndex show="exams" />;
}
