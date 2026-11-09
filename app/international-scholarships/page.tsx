import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { degreeLabels, filterScholarships, fundingLabels, scholarshipCountries } from "@/lib/scholarships/global";
import { nextRoundUnannounced } from "@/lib/scholarships/status";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Олон улсын тэтгэлэг",
  description: "Монгол иргэнд нээлттэй эсэхийг нь шалгасан тэтгэлэг. Хятад нэг ангилал хэвээр. Баталгаажаагүй мөрийг гаргаагүй.",
  path: paths.internationalScholarships,
});

const statusOptions = [
  ["", "Бүх төлөв"],
  ["open", "Нээлттэй"],
  ["upcoming", "Нээгдээгүй"],
  ["closed", "Хаагдсан"],
  ["unannounced", "Хугацаа зарлагдаагүй"],
] as const;

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  await connection();
  const query = await searchParams;
  const rows = filterScholarships({
    q: query.q,
    country: query.country,
    degree: query.degree,
    funding: query.funding,
    status: query.status,
    citizenship: query.citizenship,
  });
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/" className="text-primary">Нүүр</Link>
        {" / "}
        <span>Олон улсын тэтгэлэг</span>
      </nav>
      <h1 className="font-heading text-4xl font-semibold tracking-tight">Олон улсын тэтгэлэг</h1>
      <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
        Хятадын тэтгэлэг тусдаа ангилал хэвээр. Бусад улсын мөрийг албан эхээс уншаагүй бол энд гаргаагүй. Хоосон жагсаалт нь тухайн улсад тэтгэлэг байхгүй гэсэн үг биш.
      </p>
      <p className="text-sm">
        <Link className="font-semibold text-primary" href={paths.scholarships}>Хятадын тэтгэлэг</Link>
        {" · "}
        <Link className="font-semibold text-primary" href={paths.innerMongoliaScholarship}>Өвөр Монгол</Link>
      </p>
      <form className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm">Хайх
          <input name="q" defaultValue={query.q ?? ""} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3" />
        </label>
        <label className="text-sm">Улс
          <select name="country" defaultValue={query.country ?? ""} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3">
            <option value="">Бүгд</option>
            {scholarshipCountries.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
        <label className="text-sm">Түвшин
          <select name="degree" defaultValue={query.degree ?? ""} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3">
            <option value="">Бүгд</option>
            {Object.entries(degreeLabels).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
        <label className="text-sm">Санхүүжилт
          <select name="funding" defaultValue={query.funding ?? ""} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3">
            <option value="">Бүгд</option>
            {Object.entries(fundingLabels).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
        <label className="text-sm">Төлөв
          <select name="status" defaultValue={query.status ?? ""} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3">
            {statusOptions.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
        <label className="text-sm">Иргэншил
          <select name="citizenship" defaultValue={query.citizenship ?? ""} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3">
            <option value="">Бүгд</option>
            <option value="mn">Монгол иргэнд нээлттэй гэж эхэд нь бичсэн</option>
          </select>
        </label>
        <button className="h-10 rounded-lg bg-primary px-4 text-sm text-primary-foreground sm:col-span-2 lg:col-span-3" type="submit">Шүүх</button>
      </form>
      <div className="flex flex-wrap gap-2 text-sm">
        {scholarshipCountries.map(([code, name]) => (
          <Link key={code} href={paths.scholarshipCountry(code)} className="rounded-full bg-card px-3 py-1 ring-1 ring-foreground/10">{name}</Link>
        ))}
      </div>
      {rows.length === 0 ? <p className="text-sm">{nextRoundUnannounced} Энэ шүүлтэнд нийтлэгдсэн мөр алга.</p> : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((item) => (
            <article key={item.slug} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
              <p className="text-xs font-medium text-primary">{countryName(item.countryCode)} · {item.academicYear} · {item.publicStatus}</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold">
                <Link href={item.detailHref ?? paths.internationalScholarship(item.slug)} className="hover:underline">{item.nameMn}</Link>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.nameOriginal}</p>
              <p className="mt-3 text-sm leading-6">{item.sponsorMn}</p>
              {item.scoreCardMn ? <p className="mt-3 text-sm leading-6">{item.scoreCardMn}</p> : null}
              {!item.nextAnnounced ? <p className="mt-3 text-sm">{nextRoundUnannounced}</p> : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function countryName(code: string) {
  return scholarshipCountries.find((item) => item[0] === code)?.[1] ?? code;
}
