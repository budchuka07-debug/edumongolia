import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { countryByCode, filterScholarships, scholarshipCountries } from "@/lib/scholarships/global";
import { notPublished } from "@/lib/scholarships/status";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  return scholarshipCountries.map(([code]) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const country = countryByCode(code);
  if (!country) return { title: "Улс", robots: { index: false, follow: false } };
  return pageMeta({
    title: `${country[1]} дахь тэтгэлэг`,
    description: `${country[1]} (${country[2]}). Монгол иргэнд нээлттэй эсэхийг нь шалгасан мөр л гарна.`,
    path: paths.scholarshipCountry(code),
  });
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  await connection();
  const { code } = await params;
  const country = countryByCode(code);
  if (!country) notFound();
  const rows = filterScholarships({ country: code });
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8">
      <nav className="text-sm text-muted-foreground">
        <Link href={paths.internationalScholarships} className="text-primary">Олон улсын тэтгэлэг</Link>
        {" / "}
        <span>{country[1]}</span>
      </nav>
      <h1 className="font-heading text-4xl font-semibold">{country[1]}</h1>
      <p className="text-sm text-muted-foreground">{country[2]}</p>
      {code === "cn" ? <Link href={paths.scholarships} className="text-sm font-semibold text-primary">Хятадын бүх тэтгэлгийн хуудас</Link> : null}
      {rows.length === 0 ? <p className="text-sm">{notPublished}</p> : rows.map((item) => (
        <article key={item.slug} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl font-semibold">
            <Link href={item.detailHref ?? paths.internationalScholarship(item.slug)} className="text-primary">{item.nameMn}</Link>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{item.nameOriginal}</p>
        </article>
      ))}
    </section>
  );
}
