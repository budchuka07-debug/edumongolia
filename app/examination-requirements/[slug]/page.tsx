import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamView } from "@/components/marketplace/guides";
import { paths } from "@/lib/marketplace/paths";
import { examinations } from "@/lib/marketplace/queries";
import { pageMeta } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  return examinations()
    .filter((exam) => exam.slug !== "csca")
    .map((exam) => ({ slug: exam.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exam = examinations().find((item) => item.slug === slug);
  if (!exam) return { title: "Шалгалт" };
  return pageMeta({
    title: exam.name.mn,
    description: `${exam.name.mn}. ${exam.name.zh}. Их сургуулийн доод оноог зохиогоогүй.`,
    path: paths.exam(exam.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = examinations().find((item) => item.slug === slug);
  if (!exam || exam.slug === "csca") notFound();
  return <ExamView exam={exam} />;
}
