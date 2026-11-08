import type { Metadata } from "next";
import Link from "next/link";
import { filterMoeInstitutions, levelLabel, moeProvinces, moeSummary } from "@/lib/registry/moe";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Хятадын дээд боловсролын улсын бүртгэл",
  description: "Боловсролын яамны 2026 оны 6 сарын 17-ны жагсаалт. 3196 сургууль. Гадаад оюутны элсэлтийг энэ файлаас дүгнэхгүй.",
  path: "/china-universities/registry",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; province?: string; level?: string; page?: string }>;
}) {
  const query = await searchParams;
  const page = Number(query.page || "1");
  const result = filterMoeInstitutions({
    q: query.q,
    province: query.province,
    level: query.level,
    page: Number.isFinite(page) ? page : 1,
  });
  const provinces = moeProvinces();

  function href(nextPage: number) {
    const params = new URLSearchParams();
    if (query.q) params.set("q", query.q);
    if (query.province) params.set("province", query.province);
    if (query.level) params.set("level", query.level);
    if (nextPage > 1) params.set("page", String(nextPage));
    const text = params.toString();
    return text ? `${paths.registry}?${text}` : paths.registry;
  }

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <header>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Боловсролын яам</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Улсын дээд боловсролын бүртгэл
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          2026 оны 6 сарын 17-ны байдлаар 3,196 сургууль: ердийн 2,952 (бакалавр 1,412, мэргэжлийн дээд 1,540), насанд хүрэгчдийн 244. Энэ жагсаалт тухайн сургууль гадаад оюутан авдаг гэсэн үг биш. Монгол, англи нэр, вэбсайт, төлбөр, элсэлтийн огноо файлд байхгүй.
        </p>
        <p className="mt-3 text-sm">
          <a className="font-semibold text-primary" href={moeSummary.noticeUrl}>
            Яамны зар, 2026 оны 6 сарын 18
          </a>
          {" · "}
          <Link className="font-semibold text-primary" href={paths.universities}>
            China Link ба DongXueJi
          </Link>
        </p>
      </header>
      <form key={`${query.q ?? ""}-${query.province ?? ""}-${query.level ?? ""}`} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" action={paths.registry}>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Нэр эсвэл код</span>
          <input name="q" defaultValue={query.q ?? ""} className="h-10 w-full rounded-lg border border-input bg-card px-2 text-sm" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Муж</span>
          <select name="province" defaultValue={query.province ?? ""} className="h-10 w-full rounded-lg border border-input bg-card px-2 text-sm">
            <option value="">Бүгд</option>
            {provinces.map((item) => (
              <option key={item.provinceZh} value={item.provinceZh}>
                {item.provinceMn}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Түвшин</span>
          <select name="level" defaultValue={query.level ?? ""} className="h-10 w-full rounded-lg border border-input bg-card px-2 text-sm">
            <option value="">Бүгд</option>
            <option value="undergraduate">Бакалавр</option>
            <option value="vocational">Мэргэжлийн дээд</option>
            <option value="adult">Насанд хүрэгчдийн</option>
            <option value="private">Тусгай (民办)</option>
          </select>
        </label>
        <div className="flex items-end">
          <button type="submit" className="h-10 rounded-lg bg-primary px-4 text-sm text-primary-foreground">
            Хайх
          </button>
        </div>
      </form>
      <p className="text-sm text-muted-foreground">
        {result.total} / {moeSummary.total} · {result.page} / {result.pages}
      </p>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-3 py-2 font-medium">Сургууль</th>
              <th className="px-3 py-2 font-medium">Муж</th>
              <th className="px-3 py-2 font-medium">Түвшин</th>
              <th className="px-3 py-2 font-medium">Гадаад оюутан</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((item) => (
              <tr key={item.code} className="border-b border-border">
                <td className="px-3 py-2">
                  <Link className="font-medium text-primary" href={paths.registryInstitution(item.code)}>
                    {item.nameZh}
                  </Link>
                  <p className="text-muted-foreground">{item.code}</p>
                </td>
                <td className="px-3 py-2">{item.provinceMn} · {item.locationZh ?? item.provinceZh}</td>
                <td className="px-3 py-2">{levelLabel(item)}{item.ownership === "private" ? " · тусгай" : ""}</td>
                <td className="px-3 py-2 text-muted-foreground">Нийтлэгдээгүй</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="flex gap-4 text-sm">
        {result.page > 1 ? (
          <Link className="font-semibold text-primary" href={href(result.page - 1)}>
            Өмнөх
          </Link>
        ) : null}
        {result.page < result.pages ? (
          <Link className="font-semibold text-primary" href={href(result.page + 1)}>
            Дараах
          </Link>
        ) : null}
      </p>
    </section>
  );
}
