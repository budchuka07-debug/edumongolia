import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/marketplace/json-ld";
import { GlobalProfile } from "@/components/scholarships/global-profile";
import { globalScholarships, scholarshipBySlug } from "@/lib/scholarships/global";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta, siteUrl } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  return globalScholarships.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = scholarshipBySlug(slug);
  if (!item) return { title: "Тэтгэлэг", robots: { index: false, follow: false } };
  return pageMeta({
    title: item.nameMn,
    description: `${item.nameOriginal}. ${item.academicYear}. Албан эхээр шалгасан мөр.`,
    path: paths.internationalScholarship(item.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const item = scholarshipBySlug(slug);
  if (!item || item.storedStatus === "draft" || item.storedStatus === "pending") notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          name: item.nameOriginal,
          alternateName: item.nameMn,
          url: item.applicationUrl ?? item.officialSourceUrl,
          provider: { "@type": "Organization", name: item.sponsorOriginal },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Нүүр", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Олон улсын тэтгэлэг", item: `${siteUrl}${paths.internationalScholarships}` },
            { "@type": "ListItem", position: 3, name: item.nameMn },
          ],
        }}
      />
      <GlobalProfile item={item} />
    </>
  );
}
