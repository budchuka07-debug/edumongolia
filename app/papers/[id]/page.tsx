import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ProjectReading } from "@/components/pages/project-reading";
import { papers } from "@/lib/content/papers";
import { projectReading } from "@/lib/payments/reading";
import { isReaderId, READER_COOKIE } from "@/lib/payments/reader";

export function generateStaticParams() {
  return papers.filter((paper) => paper.kind === "project").map((paper) => ({ id: paper.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const paper = papers.find((item) => item.id === id && item.kind === "project");
  if (!paper) return { title: "Төсөл" };
  return { title: paper.title.mn, description: "Эхний 40% нээлттэй. Үргэлжлүүлэхэд 10,000₮." };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jar = await cookies();
  const reader = jar.get(READER_COOKIE)?.value ?? null;
  const reading = projectReading(id, isReaderId(reader) ? reader : null);
  const paper = papers.find((item) => item.id === id && item.kind === "project");
  if (!reading || !paper) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <ProjectReading
        id={paper.id}
        title={paper.title}
        field={paper.field}
        priceMnt={reading.priceMnt}
        preview={reading.preview}
        rest={reading.rest}
        paid={reading.paid}
      />
    </div>
  );
}
