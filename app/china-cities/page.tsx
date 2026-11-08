import type { Metadata } from "next";
import Link from "next/link";
import { dongxuejiMedia, partnerCities } from "@/lib/marketplace/dongxueji-media";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Хотын амьдрах орчин",
  description: "DongXueJi-ийн нийтэлсэн хотын зураг, танилцуулга. Зураггүй хотыг нэмээгүй.",
  path: "/china-cities",
});

export default function Page() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <header>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Хамтрагч</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Хотын амьдрах орчин</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          {dongxuejiMedia.partner} зураг эсвэл танилцуулга нийтэлсэн {partnerCities.length} хот. Шалгасан {dongxuejiMedia.checkedOn}. Зураг, текстгүй хотыг оруулаагүй. Энэ нь Боловсролын яамны жагсаалт биш.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partnerCities.map((city) => (
          <Link key={city.slug} href={paths.chinaCity(city.slug)} className="overflow-hidden rounded-2xl border border-border bg-card">
            {city.image ? <img src={city.image} alt={city.nameZh} className="h-40 w-full object-cover" /> : null}
            <div className="px-4 py-3">
              <h2 className="font-heading text-xl font-semibold">{city.nameZh}</h2>
              <p className="text-sm text-muted-foreground">{city.provinceMn || city.provinceZh} · {city.nameEn}</p>
              <p className="mt-2 text-sm text-muted-foreground">{city.desZh || city.desEn ? "Танилцуулга бий" : "Танилцуулга нийтлэгдээгүй"}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
