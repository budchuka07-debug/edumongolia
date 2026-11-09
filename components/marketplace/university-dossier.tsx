import type { ReactNode } from "react";
import Link from "next/link";
import { MovingPhoto } from "@/components/marketplace/city-film";
import { UniversitySave } from "@/components/marketplace/university-save";
import { VideoFrame } from "@/components/marketplace/partner-media";
import { getChinaLinkHost } from "@/lib/marketplace/china-link-hosts";
import { cityForName, dongxuejiMedia, partnerMediaFor, videosForProfile } from "@/lib/marketplace/dongxueji-media";
import { dongxuejiSource, dongxuejiUniversities, getDongxuejiUniversity, type DongxuejiProgram } from "@/lib/marketplace/dongxueji-universities";
import { paths } from "@/lib/marketplace/paths";

const missing = "Албан ёсны мэдээлэл одоогоор нийтлэгдээгүй байна.";

const sections = [
  ["overview", "Товч танилцуулга"],
  ["history", "Түүх"],
  ["campus", "Байршил, кампус"],
  ["ranking", "Чансаа"],
  ["faculties", "Факультет, сургууль"],
  ["bachelor", "Бакалавр"],
  ["master", "Магистр"],
  ["phd", "Доктор"],
  ["language", "Хятад хэлний бэлтгэл"],
  ["admission", "Гадаад оюутны элсэлт"],
  ["scores", "Хэлний шаардлага"],
  ["tuition", "Сургалтын төлбөр"],
  ["dorm", "Дотуур байр"],
  ["scholarship", "Тэтгэлэг"],
  ["living", "Амьжиргааны зардал"],
  ["life", "Оюутны амьдрал"],
  ["services", "Гадаад оюутны үйлчилгээ"],
  ["steps", "Өргөдөл гаргах дараалал"],
  ["documents", "Баримт бичиг"],
  ["deadlines", "Хугацаа"],
  ["contact", "Холбоо барих"],
  ["links", "Албан холбоос"],
] as const;

function bucket(degree: string) {
  const value = degree.toLowerCase();
  if (value.includes("bachelor") || value.includes("undergraduate") || degree.includes("本科")) return "bachelor";
  if (value.includes("master") || degree.includes("硕士")) return "master";
  if (value.includes("doctor") || value.includes("phd") || degree.includes("博士")) return "phd";
  if (value.includes("language") || degree.includes("语言") || degree.includes("汉语")) return "language";
  return "other";
}

function money(amount: number | null) {
  return amount == null ? missing : `${amount.toLocaleString("en-US")} CNY`;
}

export function UniversityDossier({ slug }: { slug: string }) {
  const host = getChinaLinkHost(slug);
  const partner = getDongxuejiUniversity(slug);
  if (!host && !partner) return null;
  const nameEn = host?.nameEn ?? partner?.nameEn ?? "";
  const nameZh = host?.nameZh ?? partner?.nameZh ?? "";
  const media = partner ? partnerMediaFor(partner.slug) : null;
  const images = media?.images ?? [];
  const videos = partner ? videosForProfile(partner.slug) : [];
  const city = partner ? cityForName(partner.cityEn, partner.cityZh) : null;
  const programs = partner?.programs ?? [];
  const related = partner
    ? dongxuejiUniversities.filter((item) => item.slug !== partner.slug && item.cityZh && item.cityZh === partner.cityZh).slice(0, 4)
    : [];
  const hero = images[0] ?? city?.image ?? "";

  return (
    <div className="border-b border-border">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="text-primary">Нүүр</Link>
            {" / "}
            <Link href={paths.universities} className="text-primary">Их сургуулиуд</Link>
            {" / "}
            <span>{nameZh}</span>
          </nav>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight">{nameZh}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{nameEn}</p>
          <p className="mt-1 text-sm text-muted-foreground">Монгол нэр: {missing}</p>
          <p className="mt-4 max-w-xl text-sm leading-6">
            Энэ хуудас тухайн сургуулийн нэр, хот, хамтрагчийн зураг, нээлттэй хөтөлбөрийг харуулна. Төлбөр, байр, чансаа, элсэлтийн нөхцөл албан эхээр баталгаажаагүй бол хоосон үлдэнэ.
          </p>
          <div className="mt-4">
            <UniversitySave slug={slug} />
          </div>
        </div>
        {hero ? (
          <figure className="overflow-hidden rounded-3xl">
            <div className="h-64 sm:h-80">
              <MovingPhoto src={hero} alt={`${nameZh} зураг`} className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">
              {images[0]
                ? `${dongxuejiMedia.partner} нийтэлсэн зураг. Дотуур байр, номын сан, лаборатори гэж тусад нь тэмдэглээгүй тул төрөлд нь хуваагаагүй. Шалгасан ${dongxuejiMedia.checkedOn}.`
                : "Энэ нь сургуулийн зураг биш. Хамтрагчийн хотын амьдрах орчны зураг."}
            </figcaption>
          </figure>
        ) : (
          <p className="rounded-3xl border border-dashed border-border px-5 py-10 text-sm">{missing}</p>
        )}
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Хот", partner ? `${partner.cityZh || partner.cityEn}` : missing],
          ["Муж", host ? host.provinceMn : partner?.provinceMn || missing],
          ["Зураг", images.length ? `${images.length} хамтрагчийн зураг` : "Зураггүй"],
          ["Хөтөлбөр", programs.length ? `${programs.length} хамтрагчийн мөр` : "Нээлттэй мөр алга"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-2 font-heading text-lg font-semibold">{value}</p>
          </div>
        ))}
      </section>

      {images.length > 1 ? (
        <section className="mx-auto max-w-6xl px-4 pt-8">
          <h2 className="font-heading text-2xl font-semibold">Кампус, орчны зураг</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Зургийг {dongxuejiMedia.partner} нийтэлсэн. Аль нь байр, номын сан, лаборатори, оюутны амьдрал болохыг эхэд нь заагаагүй тул нэг цомогт үлдээсэн.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {images.slice(1).map((src) => (
              <img key={src} src={src} alt={nameZh} className="h-52 w-full rounded-2xl object-cover" />
            ))}
          </div>
        </section>
      ) : null}

      {videos.length > 0 ? (
        <section className="mx-auto grid max-w-6xl gap-4 px-4 pt-8">
          <h2 className="font-heading text-2xl font-semibold">Видео</h2>
          {videos.map((video) => <VideoFrame key={video.id} title={video.title} url={video.url} poster={video.poster} />)}
        </section>
      ) : null}

      {city?.image ? (
        <section className="mx-auto max-w-6xl px-4 pt-8">
          <h2 className="font-heading text-2xl font-semibold">Хотын амьдрах орчин</h2>
          <Link href={paths.chinaCity(city.slug)} className="mt-4 grid overflow-hidden rounded-3xl border border-border bg-card sm:grid-cols-[16rem_1fr]">
            <img src={city.image} alt={city.nameZh} className="h-40 w-full object-cover sm:h-full" />
            <span className="px-5 py-4">
              <span className="font-heading text-xl font-semibold">{city.nameZh}</span>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Хамтрагчийн хотын зураг. Сургуулийн дотуур байрны үнэ биш.</span>
            </span>
          </Link>
        </section>
      ) : null}

      <nav className="mx-auto mt-8 flex max-w-6xl gap-2 overflow-x-auto px-4 pb-2">
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`} className="shrink-0 rounded-full bg-card px-3 py-1 text-sm ring-1 ring-foreground/10">
            {label}
          </a>
        ))}
      </nav>

      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6">
        <Block id="overview" title="Товч танилцуулга">
          {media?.desZh || media?.desEn ? (
            <>
              <p className="text-sm leading-6 text-muted-foreground">Хамтрагчийн эх бичвэр. Монголоор хянагдаагүй тул орчуулаагүй. Төлөв: хамтрагчаас ирсэн. Шалгасан {dongxuejiMedia.checkedOn}.</p>
              <p className="mt-3 whitespace-pre-line text-sm leading-7">{media.desZh || media.desEn}</p>
            </>
          ) : <p className="text-sm">{missing}</p>}
        </Block>
        <Block id="history" title="Түүх"><p className="text-sm">{missing}</p></Block>
        <Block id="campus" title="Байршил, кампус">
          <p className="text-sm leading-6">{partner ? `${partner.cityZh || missing} · ${partner.provinceMn}` : host ? host.provinceMn : missing}</p>
          <p className="mt-2 text-sm">{missing} Хаяг, кампусын газрын зургийг сургуулийн сайтаас шалгаагүй.</p>
        </Block>
        <Block id="ranking" title="Чансаа">
          <p className="text-sm">{missing} Чансаа гаргасан байгууллага, оныг баталгаажуулаагүй тул байр энд алга.</p>
        </Block>
        <Block id="faculties" title="Факультет, сургууль"><p className="text-sm">{missing}</p></Block>
        <Block id="bachelor" title="Бакалавр"><ProgramList items={programs.filter((item) => bucket(item.degree) === "bachelor")} /></Block>
        <Block id="master" title="Магистр"><ProgramList items={programs.filter((item) => bucket(item.degree) === "master")} /></Block>
        <Block id="phd" title="Доктор"><ProgramList items={programs.filter((item) => bucket(item.degree) === "phd")} /></Block>
        <Block id="language" title="Хятад хэлний бэлтгэл">
          <p className="text-sm leading-6">Хятад хэлний бэлтгэл гэдэг нь мэргэжил эхлэхээс өмнө хэл сурах жил байж болно. Энэ сургууль хэнд, хэдэн сар олгохыг энд баталгаажуулаагүй.</p>
          <ProgramList items={programs.filter((item) => bucket(item.degree) === "language")} />
        </Block>
        <Block id="admission" title="Гадаад оюутны элсэлт"><p className="text-sm">{missing}</p></Block>
        <Block id="scores" title="Хэлний шаардлага">
          <p className="text-sm">HSK, IELTS, TOEFL, голч дүн: {missing}</p>
        </Block>
        <Block id="tuition" title="Сургалтын төлбөр">
          <p className="text-sm leading-6">Доорх дүн зөвхөн хамтрагчийн хөтөлбөрт бичигдсэн. Жил үү, бүтэн хөтөлбөр үү гэдэг нь нийтлэгдээгүй. Өөр мэргэжлийн үнэ алга.</p>
          {programs.some((item) => item.tuitionCny != null) ? (
            <ul className="mt-3 space-y-2 text-sm">
              {programs.filter((item) => item.tuitionCny != null).map((item) => (
                <li key={item.id}>{item.name}: {money(item.tuitionCny)}</li>
              ))}
            </ul>
          ) : <p className="mt-2 text-sm">{missing}</p>}
        </Block>
        <Block id="dorm" title="Дотуур байр"><p className="text-sm">{missing}</p></Block>
        <Block id="scholarship" title="Тэтгэлэг">
          {programs.some((item) => item.award) ? (
            <ul className="space-y-2 text-sm">
              {programs.filter((item) => item.award).map((item) => (
                <li key={item.id}>{item.award}. Хэн хамрагдахыг энэ хуудсанд задлаагүй.</li>
              ))}
            </ul>
          ) : <p className="text-sm">{missing}</p>}
        </Block>
        <Block id="living" title="Амьжиргааны зардал"><p className="text-sm">{missing}</p></Block>
        <Block id="life" title="Оюутны амьдрал"><p className="text-sm">{missing}</p></Block>
        <Block id="services" title="Гадаад оюутны үйлчилгээ"><p className="text-sm">{missing}</p></Block>
        <Block id="steps" title="Өргөдөл гаргах дараалал">
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-6">
            <li>Хот, зэргээ харна.</li>
            <li>Хамтрагчийн хөтөлбөр байвал түүний чиглэл, хугацааг уншина.</li>
            <li>Албан сайт, хугацаа баталгаажаагүй бол өргөдлийг эндээс илгээхгүй.</li>
            <li>Асуух зүйлээ зөвлөгөөний хуудсаар илгээнэ.</li>
          </ol>
          <p className="mt-2 text-sm text-muted-foreground">Энэ дараалал тухайн сургуулийн албан заавар биш.</p>
        </Block>
        <Block id="documents" title="Баримт бичиг"><p className="text-sm">{missing}</p></Block>
        <Block id="deadlines" title="Хугацаа">
          {programs.some((item) => item.opens || item.closes) ? (
            <ul className="space-y-2 text-sm">
              {programs.map((item) => (
                <li key={item.id}>{item.name}: {item.opens || "нээх огноо алга"} – {item.closes || "хаах огноо алга"}. Хамтрагчийн хөтөлбөрийн огноо.</li>
              ))}
            </ul>
          ) : <p className="text-sm">{missing}</p>}
        </Block>
        <Block id="contact" title="Холбоо барих"><p className="text-sm">{missing}</p></Block>
        <Block id="links" title="Албан холбоос">
          <ul className="space-y-2 text-sm">
            <li>Сургуулийн нүүр хуудас: {missing}</li>
            <li>Гадаад оюутны элсэлт: {missing}</li>
            <li>Бакалаврын элсэлт: {missing}</li>
            <li>Магистр, докторын элсэлт: {missing}</li>
            <li>Тэтгэлгийн хуудас: {missing}</li>
            <li>Сургуулийн өргөдлийн портал: {missing}</li>
            <li>Төлбөрийн албан хуудас: {missing}</li>
            <li>Дотуур байрны албан хуудас: {missing}</li>
            <li>Холбоо барих хуудас: {missing}</li>
            {partner ? (
              <li>
                <a className="font-semibold text-primary" href={partner.partnerUrl}>Хамтрагчийн сургуулийн хуудас</a>
                <span className="text-muted-foreground"> · {dongxuejiSource.partner} · {dongxuejiSource.checkedOn}</span>
              </li>
            ) : null}
            {programs.map((item) => (
              <li key={item.id}>
                <a className="font-semibold text-primary" href={item.url}>{item.name}</a>
                <span className="text-muted-foreground"> · хамтрагчийн хөтөлбөрийн хуудас, сургуулийн портал биш</span>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <h2 className="font-heading text-2xl font-semibold">Ижил хотын сургууль</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => {
              const photo = partnerMediaFor(item.slug)?.images[0];
              return (
                <Link key={item.slug} href={paths.university(item.slug)} className="overflow-hidden rounded-2xl border border-border bg-card">
                  {photo ? <img src={photo} alt={item.nameZh} className="h-36 w-full object-cover" /> : null}
                  <span className="block px-4 py-3">
                    <span className="font-semibold">{item.nameZh}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{item.nameEn}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ProgramList({ items }: { items: DongxuejiProgram[] }) {
  if (items.length === 0) return <p className="text-sm">{missing}</p>;
  return (
    <ul className="space-y-3 text-sm leading-6">
      {items.map((item) => (
        <li key={item.id}>
          <span className="font-semibold">{item.name}</span>
          <span className="block text-muted-foreground">
            {item.degree || "зэрэг нийтлэгдээгүй"} · {item.language || "хэл нийтлэгдээгүй"} · {money(item.tuitionCny)}
          </span>
        </li>
      ))}
    </ul>
  );
}
