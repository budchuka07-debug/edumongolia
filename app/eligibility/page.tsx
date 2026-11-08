import type { Metadata } from "next";
import { Suspense } from "react";
import { EligibilityForm } from "@/components/marketplace/eligibility-form";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Элсэлтийн шалгуур",
  description: "Нас, голч, HSK, IELTS, CSCA-г нийтлэгдсэн нөхцөлтэй жишинэ. Элсэлт батлахгүй.",
  path: "/eligibility",
});

export default async function Page({ searchParams }: { searchParams: Promise<{ program?: string }> }) {
  const { program } = await searchParams;
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <EligibilityForm initialProgram={program ?? ""} />
    </Suspense>
  );
}
