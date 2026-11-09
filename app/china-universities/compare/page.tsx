import type { Metadata } from "next";
import Link from "next/link";
import { getChinaLinkHost } from "@/lib/marketplace/china-link-hosts";
import { partnerMediaFor } from "@/lib/marketplace/dongxueji-media";
import { getDongxuejiUniversity } from "@/lib/marketplace/dongxueji-universities";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

const missing = "Албан ёсны мэдээлэл одоогоор нийтлэгдээгүй байна.";

export const metadata: Metadata = pageMeta({
  title: "Их сургууль харьцуулах",
  description: "Сонгосон их сургуулийн нэр, хот, хамтрагчийн зураг, хөтөлбөр. Зохиосон үнэ, чансаа алга.",
  path: paths.universityCompare,
});

export default async function Page({ searchParams }: { searchParams: Promise<{ slugs?: string }> }) {
  const { slugs } = await searchParams;
  const picked = [...new Set((slugs ?? "").split(",").map((item) => item.trim()).filter(Boolean))].slice(0, 4);
  const rows = picked.flatMap((slug) => {
    const host = getChinaLinkHost(slug);
    const partner = getDongxuejiUniversity(slug);
    if (!host && !partner) return [];
    return [{
      slug,
      nameZh: host?.nameZh ?? partner?.nameZh ?? slug,
      nameEn: host?.nameEn ?? partner?.nameEn ?? "",
      city: partner?.cityZh || missing,
      photos: partner ? partnerMediaFor(partner.slug)?.images.length ?? 0 : 0,
      programs: partner?.programs.length ?? 0,
      image: partner ? partnerMediaFor(partner.slug)?.images[0] : undefined,
    }];
  });

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <h1 className="font-heading text-3xl font-semibold">Их сургууль харьцуулах</h1>
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Зөвхөн нийтлэгдсэн нэр, хот, зургийн тоо, хамтрагчийн хөтөлбөрийн тоо. Төлбөр, чансаа, байрны үнэ, элсэлтийн нөхцөлийг харьцуулалтад оруулаагүй.
      </p>
      {rows.length === 0 ? <p className="text-sm">{missing}</p> : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((row) => (
            <article key={row.slug} className="overflow-hidden rounded-2xl border border-border bg-card">
              {row.image ? <img src={row.image} alt={row.nameZh} className="h-40 w-full object-cover" /> : <p className="px-4 pt-4 text-sm">{missing}</p>}
              <div className="px-4 py-4">
                <h2 className="font-heading text-xl font-semibold">
                  <Link href={paths.university(row.slug)} className="text-primary">{row.nameZh}</Link>
                </h2>
                <p className="text-sm text-muted-foreground">{row.nameEn}</p>
                <dl className="mt-3 space-y-1 text-sm">
                  <div>Хот: {row.city}</div>
                  <div>Зураг: {row.photos || missing}</div>
                  <div>Хамтрагчийн хөтөлбөр: {row.programs || missing}</div>
                  <div>Чансаа: {missing}</div>
                  <div>Дотуур байрны үнэ: {missing}</div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      )}
      <Link href={paths.universities} className="text-sm font-semibold text-primary">Их сургуулийн жагсаалт</Link>
    </section>
  );
}
