import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { degreeLabels, filterScholarships, type ScholarshipDegree } from "@/lib/scholarships/global";
import { notPublished } from "@/lib/scholarships/status";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

const levels = Object.keys(degreeLabels) as ScholarshipDegree[];

export function generateStaticParams() {
  return levels.map((level) => ({ level }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  const label = degreeLabels[level as ScholarshipDegree];
  if (!label) return { title: "Түвшин", robots: { index: false, follow: false } };
  return pageMeta({
    title: `${label} түвшний тэтгэлэг`,
    description: `${label} түвшинд шалгасан тэтгэлэг. Баталгаажаагүй мөр алга.`,
    path: paths.scholarshipDegree(level),
  });
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  await connection();
  const { level } = await params;
  const label = degreeLabels[level as ScholarshipDegree];
  if (!label) notFound();
  const rows = filterScholarships({ degree: level });
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8">
      <Link href={paths.internationalScholarships} className="text-sm font-semibold text-primary">Олон улсын тэтгэлэг</Link>
      <h1 className="font-heading text-4xl font-semibold">{label}</h1>
      {rows.length === 0 ? <p className="text-sm">{notPublished}</p> : rows.map((item) => (
        <article key={item.slug} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl font-semibold">
            <Link className="text-primary" href={item.detailHref ?? paths.internationalScholarship(item.slug)}>{item.nameMn}</Link>
          </h2>
        </article>
      ))}
    </section>
  );
}
