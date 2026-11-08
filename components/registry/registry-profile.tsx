import Link from "next/link";
import { FavoriteButton } from "@/components/registry/favorite-button";
import { levelLabel, moeNameLinks, moeSummary, unpublishedMn, type MoeInstitution } from "@/lib/registry/moe";
import { paths } from "@/lib/marketplace/paths";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[14rem_1fr]">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm leading-6">{value}</dd>
    </div>
  );
}

function Block({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <section className="rounded-2xl border border-border bg-card">
      <h2 className="border-b border-border px-4 py-3 font-heading text-xl font-semibold">{title}</h2>
      <dl>
        {rows.map(([label, value]) => (
          <Row key={label} label={label} value={value} />
        ))}
      </dl>
      <p className="px-4 py-3 text-xs text-muted-foreground">
        Эх: {moeSummary.noticeUrl} · Жагсаалтын өдөр {moeSummary.asOf} · Шалгасан {moeSummary.checkedOn}
      </p>
    </section>
  );
}

export function RegistryProfile({ institution }: { institution: MoeInstitution }) {
  const link = moeNameLinks[institution.code];
  const ownership = institution.ownership === "private" ? "Тусгай (民办), жагсаалтын тэмдэглэлээр" : unpublishedMn;
  return (
    <article className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">Боловсролын яамны бүртгэл</p>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{institution.nameZh}</h1>
        <FavoriteButton code={institution.code} />
      </div>
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Энэ хуудас 2026 оны 6 сарын 17-ны өдрийн улсын жагсаалтад байгаа мэдээллийг харуулна. Жагсаалтад байхгүй талбарыг хоосон үлдээнэ. Энэ сургууль гадаад оюутан авдаг эсэхийг яамны файл хэлээгүй.
      </p>
      <Block
        title="Үндсэн мэдээлэл"
        rows={[
          ["Монгол нэр", unpublishedMn],
          ["Англи нэр", unpublishedMn],
          ["Хятад нэр", institution.nameZh],
          ["Лого, зураг", unpublishedMn],
          ["Байгуулагдсан он", unpublishedMn],
          ["Төрийн эсвэл тусгай", ownership],
          ["Төрөл", levelLabel(institution)],
          ["Албан сайт", unpublishedMn],
          ["Гадаад оюутны элсэлтийн сайт", unpublishedMn],
          ["И-мэйл", unpublishedMn],
          ["Утас", unpublishedMn],
          ["Сургуулийн код", institution.code],
          ["Эрхлэх байгууллага", institution.authorityZh],
          ["Тэмдэглэл", institution.remarkZh ?? unpublishedMn],
          ["Бүртгэлд орсон эсэх", "Тийм, албан жагсаалтад байна"],
          ["Гадаад оюутан авдаг эсэх", unpublishedMn],
          ["Элсэлтийн төлөв", unpublishedMn],
        ]}
      />
      <Block
        title="Байршил"
        rows={[
          ["Муж", `${institution.provinceMn} · ${institution.provinceZh}`],
          ["Хот", institution.locationZh ?? unpublishedMn],
          ["Дүүрэг", unpublishedMn],
          ["Хаяг", unpublishedMn],
          ["Солбицол", unpublishedMn],
          ["Кампус", unpublishedMn],
          ["Газрын зураг", unpublishedMn],
          ["Тээвэр", unpublishedMn],
          ["Байр", unpublishedMn],
        ]}
      />
      <Block
        title="Тоон мэдээлэл"
        rows={[
          ["Нийт оюутан", unpublishedMn],
          ["Бакалавр", unpublishedMn],
          ["Магистр", unpublishedMn],
          ["Доктор", unpublishedMn],
          ["Гадаад оюутан", unpublishedMn],
          ["Багш, ажилтан", unpublishedMn],
          ["Факультет", unpublishedMn],
          ["Тайлант он", unpublishedMn],
        ]}
      />
      <Block
        title="Танилцуулга"
        rows={[
          ["Түүх", unpublishedMn],
          ["Давуу чиглэл", unpublishedMn],
          ["Факультет", unpublishedMn],
          ["Судалгаа", unpublishedMn],
          ["Лаборатори", unpublishedMn],
          ["Гадаад хамтын ажиллагаа", unpublishedMn],
          ["Магадлан итгэмжлэл", unpublishedMn],
          ["Зэрэглэл", unpublishedMn],
        ]}
      />
      <Block
        title="Элсэлт, хөтөлбөр, төлбөр, тэтгэлэг"
        rows={[
          ["Элсэлт нээх, хаах огноо", unpublishedMn],
          ["Хавар, намрын элсэлт", unpublishedMn],
          ["Хөтөлбөр, чиглэл", unpublishedMn],
          ["Сургалтын хэл", unpublishedMn],
          ["Сургалтын төлбөр", unpublishedMn],
          ["Байр, даатгал, бусад төлбөр", unpublishedMn],
          ["Амьжиргааны тооцоо", unpublishedMn],
          ["Тэтгэлэг", unpublishedMn],
          ["HSK, IELTS, TOEFL, CSCA, голч", unpublishedMn],
          ["Шаардлагатай бичиг баримт", unpublishedMn],
        ]}
      />
      {link ? (
        <section className="rounded-2xl border border-border px-4 py-4 text-sm leading-6">
          <h2 className="font-heading text-xl font-semibold">Өөр эх сурвалж</h2>
          <p className="mt-2 text-muted-foreground">
            Нэр нь давхцсан дараах хуудас яамны жагсаалтын орлуулагч биш. Тус бүрийнхээ эхээр уншина.
          </p>
          <p className="mt-3 flex flex-wrap gap-4">
            {link.chinaLink ? (
              <Link className="font-semibold text-primary" href={paths.university(link.chinaLink)}>
                China Link
              </Link>
            ) : null}
            {link.dongxueji ? (
              <Link className="font-semibold text-primary" href={paths.university(link.dongxueji)}>
                DongXueJi
              </Link>
            ) : null}
          </p>
        </section>
      ) : null}
      <p className="text-sm">
        <Link className="font-semibold text-primary" href={paths.registry}>
          Бүртгэлийн жагсаалт
        </Link>
      </p>
    </article>
  );
}
