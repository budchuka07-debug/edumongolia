"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/language-provider";
import { Input } from "@/components/ui/input";
import { chinaLinkHosts, chinaLinkSource } from "@/lib/marketplace/china-link-hosts";
import { paths } from "@/lib/marketplace/paths";

export function HostDirectory() {
  const { locale } = useI18n();
  const en = locale === "en";
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  const provinces = useMemo(
    () => [...new Map(chinaLinkHosts.map((item) => [item.provinceEn, item])).values()],
    [],
  );
  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return chinaLinkHosts.filter((item) => {
      if (province && item.provinceEn !== province) return false;
      if (!needle) return true;
      return `${item.nameEn} ${item.nameZh} ${item.provinceEn} ${item.provinceZh}`.toLowerCase().includes(needle);
    });
  }, [province, query]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <header>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">
          {en ? "International students" : "Гадаад оюутан"}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {en ? "2026 China Link host universities" : "2026 оны China Link хүлээн авагч их сургуулиуд"}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          {en
            ? "Appendix 2 of the China Link Scholarship notice lists these Chinese host universities. This is not the full Ministry registry, and it does not say that every Chinese university is absent. A name here means the university may host this scholarship. It does not publish that university’s own quota, majors, or application deadline."
            : "China Link тэтгэлгийн зарлалын 2-р хавсралт эдгээр хүлээн авагч их сургуулийг нэрлэсэн. Энэ нь Боловсролын яамны бүх жагсаалт биш. Энд байхгүй гээд гадаад оюутан авахгүй гэсэн үг биш. Энд байгаа нэр нь энэ тэтгэлгийг хүлээн авч болно гэсэн үг. Тухайн сургуулийн квот, чиглэл, өөрийн элсэлтийн хугацааг энэ файлд оруулаагүй."}
        </p>
        <p className="mt-3 text-sm">
          <a className="font-semibold text-primary" href={chinaLinkSource.programUrl}>
            {en ? "Official program notice, 21 January 2026" : "Албан зар, 2026 оны 1 сарын 21"}
          </a>
          {" · "}
          <a className="font-semibold text-primary" href={chinaLinkSource.listUrl}>
            {en ? "University list (PDF)" : "Их сургуулийн жагсаалт (PDF)"}
          </a>
        </p>
      </header>
      <ChinaLinkFacts />
      <div className="grid gap-3 sm:grid-cols-[1fr_16rem]">
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{en ? "Search by name" : "Нэрээр хайх"}</span>
          <Input value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{en ? "Province" : "Муж"}</span>
          <select
            className="h-10 w-full rounded-lg border border-input bg-card px-2 text-sm"
            value={province}
            onChange={(event) => setProvince(event.target.value)}
          >
            <option value="">{en ? "All" : "Бүгд"}</option>
            {provinces.map((item) => (
              <option key={item.provinceEn} value={item.provinceEn}>
                {en ? item.provinceEn : item.provinceMn}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="text-sm text-muted-foreground">
        {rows.length} / {chinaLinkHosts.length}
      </p>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-3 py-2 font-medium">{en ? "University" : "Их сургууль"}</th>
              <th className="px-3 py-2 font-medium">{en ? "Province" : "Муж"}</th>
              <th className="px-3 py-2 font-medium">{en ? "Quota, majors, deadline" : "Квот, чиглэл, хугацаа"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.slug} className="border-b border-border">
                <td className="px-3 py-2">
                  <Link href={paths.university(item.slug)} className="font-medium text-primary">
                    {en ? item.nameEn : item.nameZh}
                  </Link>
                  <p className="text-muted-foreground">{en ? item.nameZh : item.nameEn}</p>
                </td>
                <td className="px-3 py-2">{en ? item.provinceEn : `${item.provinceMn} · ${item.provinceZh}`}</td>
                <td className="px-3 py-2 text-muted-foreground">{en ? "Not in this list" : "Энэ жагсаалтад байхгүй"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ChinaLinkFacts() {
  const { locale } = useI18n();
  const en = locale === "en";
  const rows = en
    ? [
        ["Direction", "All disciplines except Chinese language study. The host university chooses the actual program."],
        ["Who", "General scholar: a current undergraduate or graduate, under 45. Senior scholar: a current doctoral candidate or faculty member, under 50."],
        ["Quota", "Not published in the university list."],
        ["Requirements", "Citizen of a country other than China, in good health, enrolled or employed at a CSC foreign partner university, and already admitted by the Chinese host."],
        ["Watch for", "Each host sets its own review deadline. The list does not give that date. The host must send its nomination to CSC at least two months before arrival."],
        ["When", "Stay of 1–12 months. Study must start no later than 31 August 2027. The CSC application system for this program stays open through the year."],
        ["Official request", "Apply in the Chinese Government Scholarship Information System, then tell the host university your name, CSC serial number, and that you are applying for China Link. A per-university form link is not in the appendix."],
        ["Funding stated in the notice", "Tuition waiver, free on-campus housing, medical insurance, and a monthly stipend of 3,000 CNY for a general scholar or 3,500 CNY for a senior scholar."],
      ]
    : [
        ["Чиглэл", "Хятад хэлний сургалтаас бусад бүх чиглэл. Яг аль хөтөлбөр болохыг хүлээн авагч сургууль тогтооно."],
        ["Хэнд", "Ерөнхий судлаач: одоо сурч байгаа бакалавр эсвэл төгсөгч, 45 хүртэл. Ахлах судлаач: одоо сурч байгаа доктор эсвэл багш, 50 хүртэл."],
        ["Квот", "Их сургуулийн жагсаалтад нийтлэгдээгүй."],
        ["Шаардлага", "Хятадаас өөр улсын иргэн, эрүүл, CSC-ийн гадаад хамтрагч сургуульд бүтэн суралцагч эсвэл бүтэн багш, Хятадын хүлээн авагч сургуульд элсэх зөвшөөрөл авсан байх."],
        ["Анхаарах зүйл", "Хянах хугацааг сургууль бүр өөрөө тогтооно. Энэ жагсаалтад тэр огноо байхгүй. Сургууль оюутан ирэхээс хамгийн багадаа 2 сарын өмнө нэрсийг CSC-д өгнө."],
        ["Хэзээ", "1–12 сар. Сургалт 2027 оны 8 сарын 31-ээс өмнө эхэлнэ. Энэ хөтөлбөрийн CSC-ийн систем жилийн турш нээлттэй."],
        ["Албан хүсэлт", "Хятадын засгийн газрын тэтгэлгийн системд өргөдөл гаргаад, нэр, CSC-ийн дугаар, China Link гэж хүлээн авагч сургуульдаа мэдэгнэнэ. Сургууль бүрийн тусдаа маягтын холбоос хавсралтад байхгүй."],
        ["Зарлалд бичсэн санхүүжилт", "Сургалтын төлбөрөөс чөлөөлөлт, кампусын байр, эмнэлгийн даатгал, сар бүр ерөнхий судлаачид 3,000 юань, ахлах судлаачид 3,500 юань."],
      ];
  return (
    <div className="rounded-2xl border border-border bg-card">
      <h2 className="border-b border-border px-4 py-3 font-heading text-xl font-semibold">
        {en ? "What the 21 January 2026 notice actually says" : "2026 оны 1 сарын 21-ний зарлалд юу гэж байгаа вэ"}
      </h2>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[12rem_1fr]">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="text-sm leading-6">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function HostProfile({ slug }: { slug: string }) {
  const { locale } = useI18n();
  const en = locale === "en";
  const host = chinaLinkHosts.find((item) => item.slug === slug);
  if (!host) return null;
  return (
    <article className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <p className="text-sm text-muted-foreground">{host.nameZh}</p>
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{en ? host.nameEn : host.nameZh}</h1>
      <p className="text-sm text-muted-foreground">{en ? host.nameZh : host.nameEn}</p>
      <dl className="rounded-2xl border border-border bg-card">
        {[
          [en ? "Province" : "Муж", en ? host.provinceEn : `${host.provinceMn} · ${host.provinceZh}`],
          [en ? "Mongolian name" : "Монгол нэр", en ? "Not published" : "Нийтлэгдээгүй"],
          [en ? "On the host list" : "Хүлээн авагчийн жагсаалтад", en ? `Yes, number ${host.n}` : `Тийм, ${host.n}-р мөр`],
          [en ? "Own majors" : "Өөрийн чиглэл", en ? "Not in the appendix" : "Хавсралтад байхгүй"],
          [en ? "International quota" : "Гадаад оюутны квот", en ? "Not in the appendix" : "Хавсралтад байхгүй"],
          [en ? "Own requirements" : "Өөрийн шаардлага", en ? "Not in the appendix" : "Хавсралтад байхгүй"],
          [en ? "University deadline" : "Сургуулийн элсэлтийн хугацаа", en ? "Not in the appendix" : "Хавсралтад байхгүй"],
          [en ? "University application link" : "Сургуулийн элсэлтийн холбоос", en ? "Not in the appendix" : "Хавсралтад байхгүй"],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[14rem_1fr]">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="text-sm leading-6">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="text-sm leading-6">
        <a className="font-semibold text-primary" href={chinaLinkSource.listUrl}>
          {en ? "Source list" : "Эх жагсаалт"}
        </a>
        {" · "}
        <Link href={paths.universities} className="font-semibold text-primary">
          {en ? "All host universities" : "Бүх хүлээн авагч"}
        </Link>
      </p>
      <ChinaLinkFacts />
    </article>
  );
}
