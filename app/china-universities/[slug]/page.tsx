import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/marketplace/json-ld";
import { UniversityView } from "@/components/marketplace/university-view";
import { paths } from "@/lib/marketplace/paths";
import { getUniversity, listUniversities } from "@/lib/marketplace/queries";
import { pageMeta, siteUrl } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  return listUniversities().map((university) => ({ slug: university.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const university = getUniversity(slug);
  if (!university) return { title: "Их сургууль" };
  return pageMeta({
    title: university.name.mn,
    description: `${university.name.mn} (${university.name.zh}). ${university.introduction.mn}`,
    path: paths.university(university.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = getUniversity(slug);
  if (!university) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          name: university.name.en,
          alternateName: [university.name.mn, university.name.zh],
          url: university.website ?? `${siteUrl}${paths.university(university.slug)}`,
          address: { "@type": "PostalAddress", addressCountry: "CN" },
          description: university.introduction.mn,
        }}
      />
      <UniversityView university={university} />
    </>
  );
}
