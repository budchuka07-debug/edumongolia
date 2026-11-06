import type { Metadata } from "next";
import { ResourceDetail } from "@/components/pages/resource-detail";
import { getResource, resources } from "@/lib/content/resources";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: getResource(slug)?.title.mn ?? "Нөөц" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ResourceDetail slug={slug} />;
}
