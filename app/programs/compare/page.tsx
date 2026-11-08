import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareView } from "@/components/marketplace/compare-view";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Хөтөлбөр харьцуулах",
  description: "Хятадын их сургуулийн хөтөлбөрийн нийтлэгдсэн талбарыг зэрэгцүүлж харна.",
  path: "/programs/compare",
});

export default async function Page({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const { ids } = await searchParams;
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <CompareView ids={ids ?? ""} />
    </Suspense>
  );
}
