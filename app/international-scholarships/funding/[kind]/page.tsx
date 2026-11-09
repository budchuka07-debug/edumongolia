import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { filterScholarships, fundingLabels, type ScholarshipFunding } from "@/lib/scholarships/global";
import { notPublished } from "@/lib/scholarships/status";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

const kinds = Object.keys(fundingLabels) as ScholarshipFunding[];

export function generateStaticParams() {
  return kinds.map((kind) => ({ kind }));
}

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }): Promise<Metadata> {
  const { kind } = await params;
  const label = fundingLabels[kind as ScholarshipFunding];
  if (!label) return { title: "Санхүүжилт", robots: { index: false, follow: false } };
  return pageMeta({
    title: label,
    description: `${label}. Бүрэн санхүүжилт гэж зөвхөн бүх зардлыг хаасан гэж эхэд нь бичсэн мөрийг оруулна.`,
    path: paths.scholarshipFunding(kind),
  });
}

export default async function Page({ params }: { params: Promise<{ kind: string }> }) {
  await connection();
  const { kind } = await params;
  const label = fundingLabels[kind as ScholarshipFunding];
  if (!label) notFound();
  const rows = filterScholarships({ funding: kind });
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8">
      <Link href={paths.internationalScholarships} className="text-sm font-semibold text-primary">Олон улсын тэтгэлэг</Link>
      <h1 className="font-heading text-4xl font-semibold">{label}</h1>
      {kind === "full" ? <p className="max-w-3xl text-sm leading-6">Амьжиргааг бүтнээр нь хаадаг гэж албан эхэд нь бичсэн мөр одоогоор алга. Сургалтын төлбөрөөс чөлөөлсөн ч амьжиргааг хэсэгчилсэн гэж заасан тэтгэлэг энд орохгүй.</p> : null}
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
