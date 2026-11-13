import type { Metadata } from "next";
import { SchoolRunner } from "@/components/pages/school-runner";
import { getSchoolTopic, schoolTopics } from "@/lib/content/school-exams";

export function generateStaticParams() {
  return schoolTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getSchoolTopic(slug);
  if (!topic) return { title: "Шалгалт" };
  return { title: topic.title.mn, description: topic.summary.mn };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SchoolRunner slug={slug} />;
}
