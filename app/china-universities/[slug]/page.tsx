import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HostProfile } from "@/components/marketplace/host-directory";
import { JsonLd } from "@/components/marketplace/json-ld";
import { UniversityView } from "@/components/marketplace/university-view";
import { chinaLinkHosts, chinaLinkSource, getChinaLinkHost } from "@/lib/marketplace/china-link-hosts";
import { paths } from "@/lib/marketplace/paths";
import { getUniversity, isPublicUniversity, listPublishedUniversities } from "@/lib/marketplace/queries";
import { pageMeta, siteUrl } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  const slugs = new Set([
    ...listPublishedUniversities().map((university) => university.slug),
    ...chinaLinkHosts.map((host) => host.slug),
  ]);
  return slugs.size ? [...slugs].map((slug) => ({ slug })) : [{ slug: "__unpublished__" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const host = getChinaLinkHost(slug);
  if (host) {
    return pageMeta({
      title: host.nameEn,
      description: `${host.nameZh}. ${host.provinceEn}. 2026 China Link хүлээн авагч. Квот, чиглэл, хугацаа хавсралтад байхгүй.`,
      path: paths.university(host.slug),
    });
  }
  const university = getUniversity(slug);
  if (!university || !isPublicUniversity(university)) return { title: "Их сургууль", robots: { index: false, follow: false } };
  return pageMeta({
    title: university.name.mn,
    description: `${university.name.mn} (${university.name.zh}). ${university.introduction.mn}`,
    path: paths.university(university.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const host = getChinaLinkHost(slug);
  if (host) {
    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollegeOrUniversity",
            name: host.nameEn,
            alternateName: host.nameZh,
            url: chinaLinkSource.listUrl,
            address: { "@type": "PostalAddress", addressRegion: host.provinceEn, addressCountry: "CN" },
          }}
        />
        <HostProfile slug={host.slug} />
      </>
    );
  }
  const university = getUniversity(slug);
  if (!university || !isPublicUniversity(university)) notFound();
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
