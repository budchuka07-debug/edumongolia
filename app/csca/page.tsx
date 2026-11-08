import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamView } from "@/components/marketplace/guides";
import { examinations } from "@/lib/marketplace/queries";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "CSCA",
  description: "CSCA-ийн нийтлэгдсэн шалгалтын өдөр. Их сургууль бүрийн доод оноог зохиогоогүй.",
  path: "/csca",
});

export default function Page() {
  const exam = examinations().find((item) => item.slug === "csca");
  if (!exam) notFound();
  return <ExamView exam={exam} />;
}
