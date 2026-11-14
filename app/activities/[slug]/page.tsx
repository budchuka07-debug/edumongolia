import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/pages/lesson-view";
import { lessonCatalog, lessonPreview } from "@/lib/content/lessons";
import { lessonReading } from "@/lib/payments/reading";
import { isReaderId, READER_COOKIE } from "@/lib/payments/reader";

export function generateStaticParams() {
  return lessonCatalog().map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessonPreview(slug);
  if (!lesson) return { title: "Хичээл" };
  return { title: lesson.title.mn, description: "Эхний 40% нээлттэй. Үргэлжлүүлэхэд 5,000₮." };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jar = await cookies();
  const reader = jar.get(READER_COOKIE)?.value ?? null;
  const reading = lessonReading(slug, isReaderId(reader) ? reader : null);
  if (!reading) notFound();
  return (
    <LessonView
      slug={slug}
      title={reading.title}
      preview={reading.preview}
      rest={reading.rest}
      html={reading.html}
      priceMnt={reading.priceMnt}
      paid={reading.paid}
    />
  );
}
