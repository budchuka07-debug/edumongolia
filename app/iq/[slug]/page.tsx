import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { CatalogDetail } from "@/components/pages/catalog-detail";
import { getCatalogItem } from "@/lib/catalog/items";
import { catalogReading } from "@/lib/payments/reading";
import { isReaderId, READER_COOKIE } from "@/lib/payments/reader";

export function generateStaticParams() {
  return [{ slug: "pattern-grids" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItem("iq", slug);
  return { title: item?.title.mn ?? "IQ тест" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jar = await cookies();
  const reader = jar.get(READER_COOKIE)?.value ?? null;
  const reading = catalogReading("iq", slug, isReaderId(reader) ? reader : null);
  const item = getCatalogItem("iq", slug);
  if (!reading || !item) notFound();
  return (
    <CatalogDetail
      backHref="/iq"
      kind="iq"
      id={item.slug}
      title={item.title}
      source={item.source}
      priceMnt={reading.priceMnt}
      preview={reading.preview}
      rest={reading.rest}
      paid={reading.paid}
    />
  );
}
