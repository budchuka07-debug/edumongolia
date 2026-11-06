import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { OfferBrowser } from "@/components/pages/offer-browser";
import type { OfferKind } from "@/lib/content/directory";

const pages = {
  foreign: { pageKey: "foreign", kinds: ["foreign-teacher"] },
  international: { pageKey: "international", kinds: ["international"] },
  travel: { pageKey: "travel", kinds: ["travel"] },
} as const;

const titles = {
  foreign: "Гадаад багштай сургалт",
  international: "Олон улсын сургалтууд",
  travel: "Аялалтай сургалт",
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((kind) => ({ kind }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kind: string }>;
}): Promise<Metadata> {
  const { kind } = await params;
  if (!(kind in titles)) return { title: "Сургалт" };
  return { title: titles[kind as keyof typeof titles] };
}

export default async function Page({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!(kind in pages)) notFound();
  const page = pages[kind as keyof typeof pages];
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <OfferBrowser pageKey={page.pageKey} kinds={[...page.kinds] as OfferKind[]} />
    </Suspense>
  );
}
