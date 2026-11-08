import type { Metadata } from "next";
import Link from "next/link";
import { getMoeInstitution, levelLabel, moeSummary, unpublishedMn } from "@/lib/registry/moe";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Сургууль харьцуулах",
  description: "Боловсролын яамны жагсаалтын талбараар хоёроос дөрвөн сургууль харьцуулна. Хоосон талбарыг нөхөхгүй.",
  path: "/china-universities/registry/compare",
});

export default async function Page({ searchParams }: { searchParams: Promise<{ codes?: string }> }) {
  const { codes: raw } = await searchParams;
  const codes = [...new Set((raw ?? "").split(",").map((item) => item.trim()).filter((item) => /^\d{10}$/.test(item)))].slice(0, 4);
  const rows = codes.map((code) => getMoeInstitution(code)).filter((item) => item != null);
  const fields: [string, (code: string) => string][] = [
    ["Хятад нэр", (code) => getMoeInstitution(code)?.nameZh ?? unpublishedMn],
    ["Монгол нэр", () => unpublishedMn],
    ["Англи нэр", () => unpublishedMn],
    ["Код", (code) => code],
    ["Муж", (code) => {
      const item = getMoeInstitution(code);
      return item ? `${item.provinceMn} · ${item.provinceZh}` : unpublishedMn;
    }],
    ["Хот", (code) => getMoeInstitution(code)?.locationZh ?? unpublishedMn],
    ["Түвшин", (code) => {
      const item = getMoeInstitution(code);
      return item ? levelLabel(item) : unpublishedMn;
    }],
    ["Эрхлэх байгууллага", (code) => getMoeInstitution(code)?.authorityZh ?? unpublishedMn],
    ["Төрийн эсвэл тусгай", (code) => (getMoeInstitution(code)?.ownership === "private" ? "Тусгай (民办)" : unpublishedMn)],
    ["Гадаад оюутан", () => unpublishedMn],
    ["Төлбөр", () => unpublishedMn],
    ["Элсэлтийн огноо", () => unpublishedMn],
  ];
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">Сургууль харьцуулах</h1>
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Дөрөв хүртэлх сургуулийн кодыг яамны жагсаалтаас харьцуулна. Эх: {moeSummary.noticeUrl}. Шалгасан {moeSummary.checkedOn}.
      </p>
      <form className="flex flex-wrap gap-3" action={paths.registryCompare}>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Код, таслалаар</span>
          <input name="codes" defaultValue={codes.join(",")} className="h-10 w-72 rounded-lg border border-input bg-card px-2 text-sm" />
        </label>
        <div className="flex items-end">
          <button type="submit" className="h-10 rounded-lg bg-primary px-4 text-sm text-primary-foreground">Харьцуулах</button>
        </div>
      </form>
      {rows.length < 2 ? <p className="text-sm">Хоёроос доошгүй сургуулийн код оруулна. Жагсаалтын «Харьцуулах» холбоос нэг код нэмнэ.</p> : null}
      {rows.length >= 2 ? (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-3 py-2 font-medium">Талбар</th>
                {rows.map((item) => (
                  <th key={item.code} className="px-3 py-2 font-medium">
                    <Link className="text-primary" href={paths.registryInstitution(item.code)}>{item.nameZh}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map(([label, value]) => (
                <tr key={label} className="border-b border-border">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">{label}</th>
                  {rows.map((item) => (
                    <td key={item.code} className="px-3 py-2">{value(item.code)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <Link className="text-sm font-semibold text-primary" href={paths.registry}>Жагсаалт</Link>
    </section>
  );
}
