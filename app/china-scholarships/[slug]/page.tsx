import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/marketplace/json-ld";
import { ScholarshipView } from "@/components/marketplace/scholarship-pages";
import { paths } from "@/lib/marketplace/paths";
import { getScholarship, isPublicScholarship, listPublishedScholarships } from "@/lib/marketplace/queries";
import { pageMeta } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  const rows = listPublishedScholarships();
  return rows.length ? rows.map((scholarship) => ({ slug: scholarship.slug })) : [{ slug: "__unpublished__" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = getScholarship(slug);
  if (!scholarship || !isPublicScholarship(scholarship)) return { title: "Тэтгэлэг", robots: { index: false, follow: false } };
  return pageMeta({
    title: scholarship.name.mn,
    description: `${scholarship.name.mn}. ${scholarship.name.zh}. Хамрах хүрээ, оноо, хугацаа нийтлэгдээгүй бол хоосон.`,
    path: paths.scholarship(scholarship.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scholarship = getScholarship(slug);
  if (!scholarship || !isPublicScholarship(scholarship)) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          name: scholarship.name.en,
          alternateName: [scholarship.name.mn, scholarship.name.zh],
          url: scholarship.officialUrl ?? undefined,
          description: scholarship.procedure?.mn,
        }}
      />
      <ScholarshipView scholarship={scholarship} />
    </>
  );
}
