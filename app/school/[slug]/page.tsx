import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SchoolRunner } from "@/components/pages/school-runner";
import { getSchoolTopic, schoolTopics } from "@/lib/content/school-exams";
import { examReading } from "@/lib/payments/reading";
import { isReaderId, READER_COOKIE } from "@/lib/payments/reader";

export function generateStaticParams() {
  return schoolTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getSchoolTopic(slug);
  if (!topic) return { title: "Шалгалт" };
  return { title: topic.title.mn, description: "Эхний 40% нээлттэй. Үргэлжлүүлэхэд 5,000₮." };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jar = await cookies();
  const reader = jar.get(READER_COOKIE)?.value ?? null;
  const reading = examReading(slug, isReaderId(reader) ? reader : null);
  const topic = getSchoolTopic(slug);
  return (
    <SchoolRunner
      slug={slug}
      bank={reading && topic ? {
        slug: topic.slug,
        band: topic.band,
        subject: topic.subject,
        grades: topic.grades,
        title: topic.title,
        priceMnt: reading.priceMnt,
        preview: reading.preview,
        rest: reading.rest,
        questions: reading.questions,
        perAttempt: reading.perAttempt,
        paid: reading.paid,
      } : null}
    />
  );
}
