import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeRunner } from "@/components/pages/practice-runner";
import { getPracticeExam, practiceExams } from "@/lib/content/practice-exams";

export function generateStaticParams() {
  return practiceExams.map((exam) => ({ slug: exam.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exam = getPracticeExam(slug);
  if (!exam) return { title: "Тест" };
  return { title: exam.title.mn, description: exam.summary.mn };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = getPracticeExam(slug);
  if (!exam) notFound();
  return <PracticeRunner exam={exam} />;
}
