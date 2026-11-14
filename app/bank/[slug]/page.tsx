import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SchoolRunner } from "@/components/pages/school-runner";
import { getGradeLesson, gradeLessons } from "@/lib/content/grade-bank";
import { examReading } from "@/lib/payments/reading";
import { isReaderId, READER_COOKIE } from "@/lib/payments/reader";

export function generateStaticParams() {
  return gradeLessons.map((lesson) => ({ slug: lesson.topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getGradeLesson(slug);
  if (!lesson) return { title: "Шалгалт" };
  return { title: `${lesson.topic.grades.mn}: ${lesson.topic.title.mn}`, description: "Эхний 40% нээлттэй. Үргэлжлүүлэхэд 5,000₮." };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getGradeLesson(slug);
  if (!lesson) notFound();
  const jar = await cookies();
  const reader = jar.get(READER_COOKIE)?.value ?? null;
  const reading = examReading(slug, isReaderId(reader) ? reader : null);
  const topic = lesson.topic;
  return (
    <SchoolRunner
      slug={slug}
      backHref="/bank"
      bank={reading ? {
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
