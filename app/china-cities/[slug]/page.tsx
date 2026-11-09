import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cityBySlug, dongxuejiMedia, partnerCities } from "@/lib/marketplace/dongxueji-media";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  return partnerCities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = cityBySlug(slug);
  if (!city) return { title: "Хот", robots: { index: false, follow: false } };
  return pageMeta({
    title: `${city.nameZh} хотын амьдрах орчин`,
    description: `${city.nameZh}. Хамтрагчийн зураг, танилцуулга. ${dongxuejiMedia.checkedOn}.`,
    path: paths.chinaCity(city.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = cityBySlug(slug);
  if (!city) notFound();
  const text = city.desZh || city.desEn;
  const map = city.lat != null && city.lng != null
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${city.lng - 0.08}%2C${city.lat - 0.08}%2C${city.lng + 0.08}%2C${city.lat + 0.08}&layer=mapnik&marker=${city.lat}%2C${city.lng}`
    : null;
  return (
    <article className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <p className="text-sm text-muted-foreground">{city.provinceMn || city.provinceZh}</p>
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{city.nameZh}</h1>
      <p className="text-sm text-muted-foreground">{city.nameEn}</p>
      {city.image ? (
        <div className="h-72 overflow-hidden rounded-2xl sm:h-[28rem]">
          <img src={city.image} alt={city.nameZh} className="city-still h-full w-full object-cover" />
        </div>
      ) : <p className="text-sm">Албан ёсны мэдээлэл одоогоор нийтлэгдээгүй.</p>}
      <p className="text-sm leading-6 text-muted-foreground">
        Зураг, танилцуулгын эх: {dongxuejiMedia.partner}. Шалгасан {dongxuejiMedia.checkedOn}.{" "}
        <a className="font-semibold text-primary" href={city.pageUrl}>DongXueJi дээрх хот</a>
      </p>
      <h2 className="font-heading text-2xl font-semibold">Амьдрах орчин</h2>
      {text ? <p className="whitespace-pre-line text-sm leading-7">{text}</p> : <p className="text-sm">Албан ёсны мэдээлэл одоогоор нийтлэгдээгүй.</p>}
      {map ? (
        <iframe className="h-80 w-full rounded-2xl border border-border" title={`${city.nameZh} газрын зураг`} src={map} />
      ) : (
        <p className="text-sm">Солбицол нийтлэгдээгүй.</p>
      )}
      <Link className="text-sm font-semibold text-primary" href={paths.chinaCities}>Бүх хот</Link>
    </article>
  );
}
