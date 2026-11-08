import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/marketplace/json-ld";
import { ScholarshipView } from "@/components/marketplace/scholarship-pages";
import { paths } from "@/lib/marketplace/paths";
import { getScholarship, listScholarships } from "@/lib/marketplace/queries";
import { pageMeta } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  return listScholarships().map((scholarship) => ({ slug: scholarship.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = getScholarship(slug);
  if (!scholarship) return { title: "Тэтгэлэг" };
  return pageMeta({
    title: scholarship.name.mn,
    description: `${scholarship.name.mn}. ${scholarship.name.zh}. Хамрах хүрээ, оноо, хугацаа нийтлэгдээгүй бол хоосон.`,
    path: paths.scholarship(scholarship.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scholarship = getScholarship(slug);
  if (!scholarship) notFound();
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
