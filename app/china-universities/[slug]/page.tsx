import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HostProfile } from "@/components/marketplace/host-directory";
import { UniversityDossier } from "@/components/marketplace/university-dossier";
import { JsonLd } from "@/components/marketplace/json-ld";
import { UniversityView } from "@/components/marketplace/university-view";
import { chinaLinkHosts, getChinaLinkHost } from "@/lib/marketplace/china-link-hosts";
import { dongxuejiUniversities, getDongxuejiUniversity } from "@/lib/marketplace/dongxueji-universities";
import { partnerMediaFor } from "@/lib/marketplace/dongxueji-media";
import { paths } from "@/lib/marketplace/paths";
import { getUniversity, isPublicUniversity, listPublishedUniversities } from "@/lib/marketplace/queries";
import { pageMeta, siteUrl } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  const slugs = new Set([
    ...listPublishedUniversities().map((university) => university.slug),
    ...chinaLinkHosts.map((host) => host.slug),
    ...dongxuejiUniversities.map((partner) => partner.slug),
  ]);
  return slugs.size ? [...slugs].map((slug) => ({ slug })) : [{ slug: "__unpublished__" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const host = getChinaLinkHost(slug);
  const partner = getDongxuejiUniversity(slug);
  if (host || partner) {
    const nameEn = host?.nameEn ?? partner?.nameEn ?? "University";
    const nameZh = host?.nameZh ?? partner?.nameZh ?? "";
    const image = partner ? partnerMediaFor(partner.slug)?.images[0] : undefined;
    return pageMeta({
      title: `${nameZh} · ${nameEn}`,
      description: `${nameZh}. Кампусын зураг, хот, хамтрагчийн хөтөлбөр. Төлбөр, чансаа, элсэлтийн нөхцөл баталгаажаагүй бол хоосон.`,
      path: paths.university(slug),
      image,
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
  const partner = getDongxuejiUniversity(slug);
  if (host || partner) {
    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollegeOrUniversity",
            name: host?.nameEn ?? partner?.nameEn,
            alternateName: host?.nameZh ?? partner?.nameZh,
            url: `${siteUrl}${paths.university(slug)}`,
            image: partner ? partnerMediaFor(partner.slug)?.images[0] : undefined,
            address: { "@type": "PostalAddress", addressRegion: host?.provinceEn ?? partner?.provinceEn, addressCountry: "CN" },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Нүүр", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Их сургуулиуд", item: `${siteUrl}${paths.universities}` },
              { "@type": "ListItem", position: 3, name: host?.nameZh ?? partner?.nameZh },
            ],
          }}
        />
        <UniversityDossier slug={slug} />
        <HostProfile slug={slug} />
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
