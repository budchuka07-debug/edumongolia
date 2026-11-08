import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegistryProfile } from "@/components/registry/registry-profile";
import { JsonLd } from "@/components/marketplace/json-ld";
import { getMoeInstitution, moeInstitutions, moeSummary } from "@/lib/registry/moe";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  return moeInstitutions.map((item) => ({ code: item.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const institution = getMoeInstitution(code);
  if (!institution) return { title: "Их сургууль", robots: { index: false, follow: false } };
  return pageMeta({
    title: institution.nameZh,
    description: `${institution.nameZh}. Боловсролын яамны код ${institution.code}. ${institution.provinceMn}. Гадаад оюутны элсэлт энэ жагсаалтад байхгүй.`,
    path: paths.registryInstitution(institution.code),
  });
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const institution = getMoeInstitution(code);
  if (!institution) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          name: institution.nameZh,
          url: moeSummary.noticeUrl,
          address: {
            "@type": "PostalAddress",
            addressRegion: institution.provinceZh,
            addressLocality: institution.locationZh ?? undefined,
            addressCountry: "CN",
          },
        }}
      />
      <RegistryProfile institution={institution} />
    </>
  );
}
