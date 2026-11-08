"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/language-provider";
import { Input } from "@/components/ui/input";
import { chinaLinkHosts, chinaLinkSource, type ChinaLinkHost } from "@/lib/marketplace/china-link-hosts";
import { dongxuejiSource, dongxuejiUniversities, type DongxuejiUniversity } from "@/lib/marketplace/dongxueji-universities";
import { paths } from "@/lib/marketplace/paths";

type DirectoryRow = {
  slug: string;
  nameEn: string;
  nameZh: string;
  provinceEn: string;
  provinceMn: string;
  provinceZh: string;
  link: ChinaLinkHost | null;
  partner: DongxuejiUniversity | null;
};

function directoryRows(): DirectoryRow[] {
  const bySlug = new Map<string, DirectoryRow>();
  for (const host of chinaLinkHosts) {
    bySlug.set(host.slug, {
      slug: host.slug,
      nameEn: host.nameEn,
      nameZh: host.nameZh,
      provinceEn: host.provinceEn,
      provinceMn: host.provinceMn,
      provinceZh: host.provinceZh,
      link: host,
      partner: null,
    });
  }
  for (const partner of dongxuejiUniversities) {
    const current = bySlug.get(partner.slug);
    if (current) {
      current.partner = partner;
      continue;
    }
    bySlug.set(partner.slug, {
      slug: partner.slug,
      nameEn: partner.nameEn,
      nameZh: partner.nameZh,
      provinceEn: partner.provinceEn,
      provinceMn: partner.provinceMn,
      provinceZh: partner.provinceZh,
      link: null,
      partner,
    });
  }
  return [...bySlug.values()].sort((a, b) => a.nameEn.localeCompare(b.nameEn));
}

const allDirectoryRows = directoryRows();

export function HostDirectory() {
  const { locale } = useI18n();
  const en = locale === "en";
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  const [source, setSource] = useState<"all" | "link" | "partner">("all");
  const provinces = useMemo(
    () => [...new Map(allDirectoryRows.map((item) => [item.provinceEn, item])).values()].sort((a, b) => a.provinceEn.localeCompare(b.provinceEn)),
    [],
  );
  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allDirectoryRows.filter((item) => {
      if (source === "link" && !item.link) return false;
      if (source === "partner" && !item.partner) return false;
      if (province && item.provinceEn !== province) return false;
      if (!needle) return true;
      const city = item.partner ? `${item.partner.cityEn} ${item.partner.cityZh}` : "";
      return `${item.nameEn} ${item.nameZh} ${item.provinceEn} ${item.provinceZh} ${city}`.toLowerCase().includes(needle);
    });
  }, [province, query, source]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <header>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">
          {en ? "International students" : "Гадаад оюутан"}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {en ? "Universities that publish an international route" : "Гадаад оюутны мэдээлэлтэй их сургуулиуд"}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          {en
            ? "Two published lists sit together. China Link Appendix 2, 21 January 2026, names 295 host universities and does not give each school’s majors, quota, or deadline. DongXueJi, the contracted partner, publishes 256 schools and 114 study-abroad programs, checked 8 November 2026. A program shows its majors, the seat count written on that program, dates, and the partner application page. Language scores, GPA, age, and CSCA minimums were empty, so they are not filled in."
            : "Хоёр нийтэлсэн жагсаалт хамт байна. 2026 оны 1 сарын 21-ний China Link-ийн 2-р хавсралт 295 хүлээн авагчийг нэрлэсэн бөгөөд сургууль бүрийн чиглэл, квот, хугацааг оруулаагүй. Гэрээт хамтрагч DongXueJi 256 сургууль, 114 элсэлтийн хөтөлбөр нийтэлсэн. Шалгасан өдөр 2026 оны 11 сарын 8. Хөтөлбөр дээр чиглэл, тэр хуудсанд бичсэн суудлын тоо, хугацаа, хамтрагчийн өргөдлийн хуудас харагдана. Хэл, голч, нас, CSCA-ийн доод оноо хоосон байсан тул нэмж бичээгүй."}
        </p>
        <p className="mt-3 text-sm">
          <a className="font-semibold text-primary" href={chinaLinkSource.programUrl}>
            {en ? "China Link notice" : "China Link-ийн зар"}
          </a>
          {" · "}
          <a className="font-semibold text-primary" href={dongxuejiSource.listUrl}>
            {en ? "DongXueJi study-abroad list" : "DongXueJi-ийн элсэлтийн жагсаалт"}
          </a>
          {" · "}
          <Link className="font-semibold text-primary" href={paths.registry}>
            {en ? "Ministry registry, 3,196 institutions" : "Яамны бүртгэл, 3,196 сургууль"}
          </Link>
          {" · "}
          <Link className="font-semibold text-primary" href={paths.chinaCities}>
            {en ? "City living" : "Хотын амьдрах орчин"}
          </Link>
          {" · "}
          <Link className="font-semibold text-primary" href={paths.chinaVideos}>
            {en ? "Videos" : "Видео"}
          </Link>
        </p>
      </header>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", en ? "All" : "Бүгд"],
            ["link", "China Link"],
            ["partner", "DongXueJi"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`rounded-full px-3 py-1 text-sm ${source === value ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-foreground/10"}`}
            onClick={() => setSource(value)}
          >
            {label}
          </button>
        ))}
      </div>
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
        {rows.length} / {allDirectoryRows.length}
      </p>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-3 py-2 font-medium">{en ? "University" : "Их сургууль"}</th>
              <th className="px-3 py-2 font-medium">{en ? "Province" : "Муж"}</th>
              <th className="px-3 py-2 font-medium">{en ? "Source" : "Эх"}</th>
              <th className="px-3 py-2 font-medium">{en ? "Majors and deadline" : "Чиглэл, хугацаа"}</th>
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
                <td className="px-3 py-2">
                  {[item.link ? "China Link" : "", item.partner ? "DongXueJi" : ""].filter(Boolean).join(" · ")}
                </td>
                <td className="px-3 py-2 text-muted-foreground">{rowSummary(item, en)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ChinaLinkFacts />
    </section>
  );
}

function rowSummary(item: DirectoryRow, en: boolean) {
  const count = item.partner?.programs.length ?? 0;
  if (count > 0) {
    const dates = item.partner?.programs.map((program) => program.closes).filter(Boolean).sort() ?? [];
    const closes = dates[dates.length - 1];
    return en ? `${count} program(s)${closes ? `, through ${closes}` : ""}` : `${count} хөтөлбөр${closes ? `, ${closes} хүртэл` : ""}`;
  }
  if (item.link) return en ? "No majors or deadline in the appendix" : "Хавсралтад чиглэл, хугацаа байхгүй";
  return en ? "No open program on DongXueJi" : "DongXueJi дээр нээлттэй хөтөлбөр байхгүй";
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
  const host = chinaLinkHosts.find((item) => item.slug === slug) ?? null;
  const partner = dongxuejiUniversities.find((item) => item.slug === slug) ?? null;
  if (!host && !partner) return null;
  const nameEn = host?.nameEn ?? partner?.nameEn ?? "";
  const nameZh = host?.nameZh ?? partner?.nameZh ?? "";
  const province = host
    ? en
      ? host.provinceEn
      : `${host.provinceMn} · ${host.provinceZh}`
    : en
      ? partner?.provinceEn
      : `${partner?.provinceMn} · ${partner?.provinceZh}`;
  const city = partner ? [en ? partner.cityEn : partner.cityZh || partner.cityEn].filter(Boolean).join("") : "";
  return (
    <article className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <p className="text-sm text-muted-foreground">{nameZh}</p>
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{en ? nameEn : nameZh}</h1>
      <p className="text-sm text-muted-foreground">{en ? nameZh : nameEn}</p>
      <dl className="rounded-2xl border border-border bg-card">
        {[
          [en ? "Province" : "Муж", province],
          [en ? "City" : "Хот", city || (en ? "Not published" : "Нийтлэгдээгүй")],
          [en ? "Mongolian name" : "Монгол нэр", en ? "Not published" : "Нийтлэгдээгүй"],
          [en ? "China Link host list" : "China Link-ийн жагсаалт", host ? (en ? `Yes, row ${host.n}` : `Тийм, ${host.n}-р мөр`) : en ? "Not in that appendix" : "Тэр хавсралтад байхгүй"],
          [en ? "DongXueJi partner list" : "DongXueJi-ийн хамтрагч", partner ? (en ? "Yes" : "Тийм") : en ? "Not published there" : "Тэнд нийтлэгдээгүй"],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[14rem_1fr]">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="text-sm leading-6">{value}</dd>
          </div>
        ))}
      </dl>
      {partner ? <PartnerPrograms partner={partner} /> : null}
      {host ? <ChinaLinkFacts /> : null}
      <p className="text-sm">
        <Link href={paths.universities} className="font-semibold text-primary">
          {en ? "University list" : "Их сургуулийн жагсаалт"}
        </Link>
      </p>
    </article>
  );
}

function PartnerPrograms({ partner }: { partner: DongxuejiUniversity }) {
  const { locale } = useI18n();
  const en = locale === "en";
  const money = (amount: number | null) => (amount == null ? (en ? "Not published" : "Нийтлэгдээгүй") : `${amount.toLocaleString("en-US")} CNY`);
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-heading text-2xl font-semibold">{en ? "DongXueJi programs" : "DongXueJi-ийн хөтөлбөр"}</h2>
      <p className="text-sm leading-6 text-muted-foreground">
        {en
          ? `Published by ${dongxuejiSource.partner} and checked on ${dongxuejiSource.checkedOn}. The seat count is the number written on that program. It is not a ministry quota. Tuition is in yuan, and the source does not say whether the figure is per year or for the whole program. HSK, IELTS, TOEFL, GPA, age, and CSCA minimums were empty. The university’s own application website was empty, so the link below is the partner’s program page.`
          : `${dongxuejiSource.partner} нийтэлсэн, шалгасан өдөр ${dongxuejiSource.checkedOn}. Суудлын тоо тухайн хөтөлбөр дээр бичсэн тоо. Энэ нь яамны квот биш. Төлбөр юаниар бөгөөд жил үү, бүтэн хөтөлбөр үү гэдгийг эхэд нь заагаагүй. HSK, IELTS, TOEFL, голч, нас, CSCA-ийн доод оноо хоосон. Сургуулийн өөрийн өргөдлийн сайт хоосон тул доорх холбоос хамтрагчийн хөтөлбөрийн хуудас.`}
      </p>
      <p className="text-sm">
        <a className="font-semibold text-primary" href={partner.partnerUrl}>
          {en ? "School page on DongXueJi" : "DongXueJi дээрх сургуулийн хуудас"}
        </a>
      </p>
      {partner.programs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border px-4 py-6 text-sm">
          {en ? "This partner school has no open study-abroad program in the current list. Majors, seats, and dates are unpublished." : "Энэ хамтрагч сургуульд одоогийн жагсаалтад нээлттэй хөтөлбөр алга. Чиглэл, суудал, хугацаа нийтлэгдээгүй."}
        </p>
      ) : null}
      {partner.programs.map((program) => (
        <article key={program.id} className="rounded-2xl border border-border bg-card">
          <h3 className="border-b border-border px-4 py-3 font-heading text-xl font-semibold">{program.name}</h3>
          <dl>
            {[
              [en ? "Degree" : "Зэрэг", program.degree || (en ? "Not published" : "Нийтлэгдээгүй")],
              [en ? "Teaching language" : "Сургалтын хэл", program.language || (en ? "Not published" : "Нийтлэгдээгүй")],
              [en ? "Scholarship name" : "Тэтгэлгийн нэр", program.award ?? (en ? "Not published" : "Нийтлэгдээгүй")],
              [en ? "Applications open" : "Элсэлт нээгдсэн", program.opens || (en ? "Not published" : "Нийтлэгдээгүй")],
              [en ? "Applications close" : "Элсэлт хаагдах", program.closes || (en ? "Not published" : "Нийтлэгдээгүй")],
              [en ? "Seats on this program" : "Энэ хөтөлбөрийн суудал", program.seats == null ? (en ? "Not published" : "Нийтлэгдээгүй") : String(program.seats)],
              [en ? "Application fee" : "Өргөдлийн хураамж", money(program.applicationFeeCny)],
              [en ? "Tuition figure" : "Сургалтын төлбөрийн дүн", money(program.tuitionCny)],
              [
                en ? "Majors" : "Чиглэл",
                program.majors.length
                  ? program.majors
                      .map((major) => {
                        const years = major.years == null ? (en ? "length unpublished" : "хугацаа нийтлэгдээгүй") : en ? `${major.years} years` : `${major.years} жил`;
                        return `${major.name} · ${major.language} · ${years} · ${money(major.tuitionCny)}`;
                      })
                      .join("\n")
                  : en
                    ? "Not published"
                    : "Нийтлэгдээгүй",
              ],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[14rem_1fr]">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm leading-6 whitespace-pre-line">{value}</dd>
              </div>
            ))}
          </dl>
          {program.figuresWithheld ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">
              {en
                ? "The partner’s duration and tuition fields for a major disagree, so those two figures are left unpublished."
                : "Нэг чиглэлийн хугацаа, төлбөрийн талбар хоорондоо зөрүүтэй тул тэр хоёр дүнг гаргаагүй."}
            </p>
          ) : null}
          <p className="px-4 py-3 text-sm">
            <a className="font-semibold text-primary" href={program.url}>
              {en ? "Official partner application page" : "Хамтрагчийн албан өргөдлийн хуудас"}
            </a>
          </p>
        </article>
      ))}
    </section>
  );
}
